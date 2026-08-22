import { NextRequest, NextResponse } from 'next/server';
import { unzipSync, zipSync } from 'fflate';

// Proxy de descarga cuyo URL termina en el nombre real del fichero
// (p. ej. /api/rom/snowbros.zip?id=...). FBNeo identifica el romset por el
// nombre del fichero, así que la ruta debe conservarlo.
//
// Con &extractbios=1 no sirve el fichero tal cual: descarga el zip de Drive,
// extrae los ficheros BIOS de Neo Geo que contenga y devuelve un neogeo.zip.
// Así los packs tipo "juego + BIOS mezclados" funcionan sin fichero BIOS aparte.

const DRIVE_ID_RE = /^[A-Za-z0-9_-]{10,}$/;
// Nombres de ROM razonables: sin separadores de ruta ni caracteres peligrosos.
const NAME_RE = /^[A-Za-z0-9 ._()\-&+,!'\[\]]{1,120}$/;

const NEOGEO_BIOS_FILES = new Set([
  '000-lo.lo',
  'sfix.sfix',
  'sm1.sm1',
  'neo-geo.rom',
  'sp-1.sp1',
  'sp-1v1_3db8c.bin',
  'sp-e.sp1',
  'sp-j2.sp1',
  'sp-s.sp1',
  'sp-s2.sp1',
  'sp-45.sp1',
  'sp1.jipan.1024',
  'asia-s3.rom',
  'japan-j3.bin',
  'usa_2slt.bin',
  'vs-bios.rom',
]);

export const runtime = 'nodejs';
export const maxDuration = 60;

async function streamFromDrive(id: string): Promise<Response | null> {
  const upstream = await fetch(
    `https://drive.usercontent.google.com/download?id=${encodeURIComponent(id)}&export=download&confirm=t`,
    { cache: 'no-store' },
  );
  const type = upstream.headers.get('content-type') ?? '';
  // Si Drive devuelve HTML en vez del binario, el fichero no es público.
  if (!upstream.ok || !upstream.body || type.includes('text/html')) return null;
  const headers = new Headers({
    'content-type': 'application/octet-stream',
    'cache-control': 'public, max-age=86400',
  });
  const len = upstream.headers.get('content-length');
  if (len) headers.set('content-length', len);
  return new Response(upstream.body, { status: 200, headers });
}

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ name: string }> },
) {
  const { name } = await ctx.params;
  const id = req.nextUrl.searchParams.get('id');
  const extractBios = req.nextUrl.searchParams.get('extractbios') === '1';

  if (!id || !DRIVE_ID_RE.test(id) || !name || !NAME_RE.test(decodeURIComponent(name))) {
    return NextResponse.json({ error: 'Petición inválida' }, { status: 400 });
  }

  try {
    if (!extractBios) {
      const res = await streamFromDrive(id);
      if (!res) {
        return NextResponse.json(
          { error: 'El fichero no está disponible públicamente en Drive' },
          { status: 502 },
        );
      }
      return res;
    }

    // Modo extracción de BIOS: juego zip → neogeo.zip con lo que contenga.
    const upstream = await fetch(
      `https://drive.usercontent.google.com/download?id=${encodeURIComponent(id)}&export=download&confirm=t`,
      { cache: 'no-store' },
    );
    if (!upstream.ok) {
      return NextResponse.json({ error: 'Descarga fallida' }, { status: 502 });
    }
    const buf = new Uint8Array(await upstream.arrayBuffer());
    let files: Record<string, Uint8Array>;
    try {
      files = unzipSync(buf);
    } catch {
      return NextResponse.json({ error: 'El zip no se pudo abrir' }, { status: 502 });
    }
    const bios: Record<string, Uint8Array> = {};
    for (const [path, data] of Object.entries(files)) {
      const base = path.split('/').pop()?.toLowerCase() ?? '';
      if (NEOGEO_BIOS_FILES.has(base)) bios[base] = data;
    }
    if (!bios['000-lo.lo'] || !bios['sfix.sfix']) {
      return NextResponse.json(
        { error: 'El zip no contiene los ficheros BIOS de Neo Geo' },
        { status: 502 },
      );
    }
    const zipped = zipSync(bios, { level: 0 });
    return new Response(zipped, {
      status: 200,
      headers: {
        'content-type': 'application/octet-stream',
        'content-length': String(zipped.length),
        'cache-control': 'public, max-age=86400',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Descarga fallida' }, { status: 502 });
  }
}
