import { NextRequest, NextResponse } from 'next/server';
import arcadeCovers from './arcade-covers.json';

// Carpeta compartida de ROMs del propietario del sitio.
const DEFAULT_FOLDER_ID = '1RpAfuCu6OmImp7lM4y3drRNnm8giR3qx';

const DRIVE_ID_RE = /^[A-Za-z0-9_-]{10,}$/;
const ROM_EXT_RE = /\.(smc|sfc|swc|fig|zip|nes|fds|unf|unif|md|gen|bin|sms|gg|nds|gba)$/i;

// Nombre de subcarpeta en Drive → EJS_core
const CORE_BY_FOLDER: [RegExp, string][] = [
  [/^(snes|super\s*nintendo|super\s*nes)$/i, 'snes'],
  [/^(arcade|mame|fbneo|fba|neogeo|neo\s*geo)$/i, 'arcade'],
  [/^(megadrive|mega\s*drive|genesis|md|sega)$/i, 'segaMD'],
  [/^(nes|famicom|nintendo)$/i, 'nes'],
  [/^(nds|nintendo\s*ds|ds)$/i, 'nds'],
  [/^(gba|game\s*boy\s*advance|gameboy\s*advance)$/i, 'gba'],
];

interface Rom {
  id: string;
  name: string;
  core: string;
  // Nombre de carátula en LibretRO para juegos arcade (basado en la descripción
  // del set de FBNeo, no en el nombre del fichero).
  cover?: string;
}

function coreForFolder(name: string, current: string): string {
  for (const [re, core] of CORE_BY_FOLDER) {
    if (re.test(name.trim())) return core;
  }
  return current;
}

// Google limita peticiones sin cabeceras de navegador y por IP (las IPs de
// Vercel reciben mucho tráfico). UA de navegador + caché + reintentos lo mitigan.
const BROWSER_HEADERS = {
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
  'accept-language': 'es-ES,es;q=0.9,en;q=0.8',
};

async function driveFetch(
  url: string,
  extraHeaders: Record<string, string> = {},
): Promise<Response> {
  return fetch(url, {
    cache: 'no-store',
    headers: { ...BROWSER_HEADERS, ...extraHeaders },
    signal: AbortSignal.timeout(15000),
  });
}

// El HTML de Drive trae los nombres con entidades escapadas ("Sonic &amp; Knuckles")
function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;/g, "'");
}

interface ListData {
  roms: Rom[];
  biosId?: string;
}

// Caché en memoria (vive mientras la instancia esté caliente).
let listCache: { at: number; data: ListData } | null = null;
const LIST_TTL_MS = 15 * 60 * 1000;

// Google bloquea por IP las peticiones a drive.google.com desde datacenters
// (las IPs de Vercel). Si el acceso directo falla, se reintenta a través de
// r.jina.ai (que sirve el HTML crudo desde sus propios servidores).
async function fetchFolderViewHtml(folderId: string): Promise<string> {
  const url = `https://drive.google.com/embeddedfolderview?id=${encodeURIComponent(folderId)}`;
  const candidates: { url: string; headers?: Record<string, string> }[] = [
    { url },
    { url: `https://r.jina.ai/${url}`, headers: { 'x-return-format': 'html' } },
  ];
  let lastError: unknown = null;
  for (const candidate of candidates) {
    try {
      const res = await driveFetch(candidate.url, candidate.headers);
      if (!res.ok) {
        lastError = new Error(`HTTP ${res.status}`);
        continue;
      }
      const html = await res.text();
      if (html.includes('flip-entry')) return html;
      lastError = new Error('Respuesta sin entradas');
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError instanceof Error ? lastError : new Error('Listado no disponible');
}

async function listFolder(
  folderId: string,
  core: string,
  depth: number,
  seen: Set<string>,
  roms: Rom[],
): Promise<string | undefined> {
  const html = await fetchFolderViewHtml(folderId);
  const entryRe = /id="entry-([A-Za-z0-9_-]{10,})"[\s\S]*?flip-entry-title">([^<]+)</g;
  let biosId: string | undefined;
  let m: RegExpExecArray | null;
  while ((m = entryRe.exec(html)) !== null) {
    const [, id, name] = m;
    if (seen.has(id)) continue;
    seen.add(id);

    // Sin punto en el nombre → lo tratamos como subcarpeta de sistema.
    if (!name.includes('.')) {
      if (depth < 2) {
        const subBios = await listFolder(id, coreForFolder(decodeHtmlEntities(name), core), depth + 1, seen, roms);
        biosId ??= subBios;
      }
      continue;
    }

    // BIOS de Neo Geo para el núcleo arcade (Windjammers y compañía).
    if (/^neogeo\.zip$/i.test(name)) {
      biosId = id;
      continue;
    }

    if (!ROM_EXT_RE.test(name)) continue;
    const rom: Rom = { id, name: decodeHtmlEntities(name), core };
    if (core === 'arcade') {
      const setName = name.replace(/\.zip$/i, '').toLowerCase();
      const cover = (arcadeCovers as Record<string, string>)[setName];
      if (cover) rom.cover = cover;
    }
    roms.push(rom);
  }
  return biosId;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');

  // Lista los ficheros de la carpeta pública sin usar la API oficial de Drive:
  // parsea el HTML de embeddedfolderview (recursivo, 2 niveles).
  if (action === 'list') {
    // Servir desde caché si es reciente.
    if (listCache && Date.now() - listCache.at < LIST_TTL_MS) {
      return NextResponse.json(listCache.data);
    }
    const folder = searchParams.get('folder') ?? DEFAULT_FOLDER_ID;
    if (!DRIVE_ID_RE.test(folder)) {
      return NextResponse.json({ error: 'ID de carpeta inválido' }, { status: 400 });
    }
    let lastError: unknown = null;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const seen = new Set<string>();
        const roms: Rom[] = [];
        const biosId = await listFolder(folder, 'snes', 0, seen, roms);
        roms.sort((a, b) => a.name.localeCompare(b.name));
        const data: ListData = { roms, biosId };
        listCache = { at: Date.now(), data };
        return NextResponse.json(data);
      } catch (err) {
        lastError = err;
        if (attempt < 3) await new Promise((r) => setTimeout(r, attempt * 2000));
      }
    }
    // Si alguna vez conseguimos la lista, servirla caducada antes que fallar.
    if (listCache) {
      return NextResponse.json({ ...listCache.data, stale: true });
    }
    console.error(
      '[drive:list] fallo tras reintentos:',
      lastError instanceof Error ? lastError.message : lastError,
    );
    return NextResponse.json({ error: 'No se pudo contactar con Drive' }, { status: 502 });
  }

  // Proxy de descarga: mismo origen para el navegador (sin CORS) y así
  // EmulatorJS puede cargar EJS_gameUrl directamente.
  if (action === 'file') {
    const id = searchParams.get('id');
    if (!id || !DRIVE_ID_RE.test(id)) {
      return NextResponse.json({ error: 'ID de fichero inválido' }, { status: 400 });
    }
    try {
      const upstream = await driveFetch(
        `https://drive.usercontent.google.com/download?id=${encodeURIComponent(id)}&export=download&confirm=t`,
      );
      const type = upstream.headers.get('content-type') ?? '';
      // Si Drive devuelve HTML en vez del binario, el fichero no es público.
      if (!upstream.ok || !upstream.body || type.includes('text/html')) {
        return NextResponse.json(
          { error: 'El fichero no está disponible públicamente en Drive' },
          { status: 502 },
        );
      }
      const headers = new Headers({
        'content-type': 'application/octet-stream',
        'cache-control': 'public, max-age=86400',
      });
      const len = upstream.headers.get('content-length');
      if (len) headers.set('content-length', len);
      return new Response(upstream.body, { status: 200, headers });
    } catch {
      return NextResponse.json({ error: 'Descarga fallida' }, { status: 502 });
    }
  }

  return NextResponse.json({ error: 'Acción desconocida' }, { status: 400 });
}
