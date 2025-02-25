/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone', // Optimized for container deployments like Render
  experimental: {
    serverActions: true
  }
};

module.exports = nextConfig; 