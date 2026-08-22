import { NextRequest, NextResponse } from 'next/server';

// Carpeta compartida de ROMs del propietario del sitio.
const DEFAULT_FOLDER_ID = '1RpAfuCu6OmImp7lM4y3drRNnm8giR3qx';

const DRIVE_ID_RE = /^[A-Za-z0-9_-]{10,}$/;
const ROM_EXT_RE = /\.(smc|sfc|swc|fig|zip|nes|fds|unf|unif|md|gen|bin|sms|gg)$/i;

// Nombre de subcarpeta en Drive → EJS_core
const CORE_BY_FOLDER: [RegExp, string][] = [
  [/^(snes|super\s*nintendo|super\s*nes)$/i, 'snes'],
  [/^(arcade|mame|fbneo|fba|neogeo|neo\s*geo)$/i, 'arcade'],
  [/^(megadrive|mega\s*drive|genesis|md|sega)$/i, 'segaMD'],
  [/^(nes|famicom|nintendo)$/i, 'nes'],
];

interface Rom {
  id: string;
  name: string;
  core: string;
}

function coreForFolder(name: string, current: string): string {
  for (const [re, core] of CORE_BY_FOLDER) {
    if (re.test(name.trim())) return core;
  }
  return current;
}

async function listFolder(
  folderId: string,
  core: string,
  depth: number,
  seen: Set<string>,
  roms: Rom[],
): Promise<string | undefined> {
  const res = await fetch(
    `https://drive.google.com/embeddedfolderview?id=${encodeURIComponent(folderId)}`,
    { cache: 'no-store' },
  );
  if (!res.ok) throw new Error(`Drive respondió ${res.status}`);
  const html = await res.text();
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
        const subBios = await listFolder(id, coreForFolder(name, core), depth + 1, seen, roms);
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
    roms.push({ id, name, core });
  }
  return biosId;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');

  // Lista los ficheros de la carpeta pública sin usar la API oficial de Drive:
  // parsea el HTML de embeddedfolderview (recursivo, 2 niveles).
  if (action === 'list') {
    const folder = searchParams.get('folder') ?? DEFAULT_FOLDER_ID;
    if (!DRIVE_ID_RE.test(folder)) {
      return NextResponse.json({ error: 'ID de carpeta inválido' }, { status: 400 });
    }
    try {
      const seen = new Set<string>();
      const roms: Rom[] = [];
      const biosId = await listFolder(folder, 'snes', 0, seen, roms);
      roms.sort((a, b) => a.name.localeCompare(b.name));
      return NextResponse.json({ roms, biosId });
    } catch {
      return NextResponse.json({ error: 'No se pudo contactar con Drive' }, { status: 502 });
    }
  }

  // Proxy de descarga: mismo origen para el navegador (sin CORS) y así
  // EmulatorJS puede cargar EJS_gameUrl directamente.
  if (action === 'file') {
    const id = searchParams.get('id');
    if (!id || !DRIVE_ID_RE.test(id)) {
      return NextResponse.json({ error: 'ID de fichero inválido' }, { status: 400 });
    }
    try {
      const upstream = await fetch(
        `https://drive.usercontent.google.com/download?id=${encodeURIComponent(id)}&export=download&confirm=t`,
        { cache: 'no-store' },
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
