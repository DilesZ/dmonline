import { NextRequest, NextResponse } from 'next/server';

// Carpeta compartida de ROMs del propietario del sitio.
const DEFAULT_FOLDER_ID = '1RpAfuCu6OmImp7lM4y3drRNnm8giR3qx';

const DRIVE_ID_RE = /^[A-Za-z0-9_-]{10,}$/;
const ROM_EXT_RE = /\.(smc|sfc|swc|fig|zip)$/i;

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');

  // Lista los ficheros de la carpeta pública sin usar la API oficial de Drive:
  // parsea el HTML de embeddedfolderview.
  if (action === 'list') {
    const folder = searchParams.get('folder') ?? DEFAULT_FOLDER_ID;
    if (!DRIVE_ID_RE.test(folder)) {
      return NextResponse.json({ error: 'ID de carpeta inválido' }, { status: 400 });
    }
    try {
      const res = await fetch(
        `https://drive.google.com/embeddedfolderview?id=${encodeURIComponent(folder)}`,
        { cache: 'no-store' },
      );
      if (!res.ok) {
        return NextResponse.json({ error: `Drive respondió ${res.status}` }, { status: 502 });
      }
      const html = await res.text();
      const entryRe = /id="entry-([A-Za-z0-9_-]{10,})"[\s\S]*?flip-entry-title">([^<]+)</g;
      const seen = new Set<string>();
      const roms: { id: string; name: string }[] = [];
      let m: RegExpExecArray | null;
      while ((m = entryRe.exec(html)) !== null) {
        const [, id, name] = m;
        if (seen.has(id) || !ROM_EXT_RE.test(name)) continue;
        seen.add(id);
        roms.push({ id, name });
      }
      roms.sort((a, b) => a.name.localeCompare(b.name));
      return NextResponse.json({ roms });
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
