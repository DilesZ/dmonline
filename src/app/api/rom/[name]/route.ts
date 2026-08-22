import { NextRequest, NextResponse } from 'next/server';

// Proxy de descarga cuyo URL termina en el nombre real del fichero
// (p. ej. /api/rom/snowbros.zip?id=...). FBNeo identifica el romset por el
// nombre del fichero, así que la ruta debe conservarlo.

const DRIVE_ID_RE = /^[A-Za-z0-9_-]{10,}$/;
// Nombres de ROM razonables: sin separadores de ruta ni caracteres peligrosos.
const NAME_RE = /^[A-Za-z0-9 ._()\-&+,!'\[\]]{1,120}$/;

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ name: string }> },
) {
  const { name } = await ctx.params;
  const id = req.nextUrl.searchParams.get('id');

  if (!id || !DRIVE_ID_RE.test(id) || !name || !NAME_RE.test(decodeURIComponent(name))) {
    return NextResponse.json({ error: 'Petición inválida' }, { status: 400 });
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
