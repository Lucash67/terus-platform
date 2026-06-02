/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@terus/ui", "@terus/types", "@terus/schemas"],
};

module.exports = nextConfig;
