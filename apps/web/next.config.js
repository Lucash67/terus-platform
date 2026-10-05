/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@terus/ui", "@terus/types", "@terus/schemas"],
  async redirects() {
    return [
      { source: "/solicitar-demo", destination: "/comecar", permanent: true },
    ];
  },
};

module.exports = nextConfig;
