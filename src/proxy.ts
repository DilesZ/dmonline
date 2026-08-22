import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Reescritura en runtime: /api/rom/snowbros.zip?id=... → /api/romfile?name=snowbros.zip&id=...
// La URL pública conserva el nombre del fichero (FBNeo identifica el romset por él),
// pero el handler vive en una ruta estática porque las carpetas dinámicas [name]
// no se despliegan bien desde Windows con la CLI de Vercel.
export function proxy(request: NextRequest) {
  const m = request.nextUrl.pathname.match(/^\/api\/rom\/([^/]+)$/);
  if (m) {
    const url = request.nextUrl.clone();
    url.pathname = '/api/romfile';
    url.searchParams.set('name', m[1]);
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/api/rom/:path*',
};
