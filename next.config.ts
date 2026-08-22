import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // /api/rom/snowbros.zip?id=... → /api/romfile?name=snowbros.zip&id=...
  // (la URL pública conserva el nombre del fichero: FBNeo lo necesita para
  // identificar el romset; el handler vive en una ruta sin corchetes porque
  // las carpetas dinámicas [name] no se suben bien desde Windows con la CLI).
  async rewrites() {
    return [
      {
        source: '/api/rom/:name',
        destination: '/api/romfile?name=:name',
      },
    ];
  },
};

export default nextConfig;
