/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Optimized for container deployments like Render
  
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    
    // Different CSP for development vs production
    const cspValue = isDev
      ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.clarity.ms; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.clarity.ms https://formspree.io https://api.rss2json.com ws: wss:; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://formspree.io"
      : "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.clarity.ms; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.clarity.ms https://formspree.io https://api.rss2json.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://formspree.io";

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: cspValue
          }
        ]
      }
    ]
  }
};

module.exports = nextConfig; 