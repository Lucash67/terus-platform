/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@terus/ui", "@terus/types", "@terus/schemas"],
  /**
   * Proxy same-origin para a API (cookies HttpOnly de sessão). Só ativo quando
   * API_INTERNAL_URL existe; sem ele, a jornada mostra "serviço indisponível".
   */
  async rewrites() {
    const api = process.env.API_INTERNAL_URL;
    if (!api) return [];
    return [{ source: "/api/v1/:path*", destination: `${api}/v1/:path*` }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/solicitar-demo", destination: "/comecar", permanent: true },
      { source: "/plataforma", destination: "/", permanent: true },
    ];
  },
};

module.exports = nextConfig;
