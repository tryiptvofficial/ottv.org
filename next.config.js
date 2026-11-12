
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Keep optimised remote images cached for 30 days (default is 60 s)
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Include 144 and 256 so small UI images (brand logos, avatars) aren't
    // served at the next deviceSize step (640 px) which is 4× oversized.
    imageSizes: [16, 32, 48, 64, 96, 128, 144, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    // Puts the site's CSS in each page's HTML instead of a separate file the browser has to fetch before it can draw
    // anything: one round trip less on a first visit from a phone. The CSS is about 13 KB compressed.
    inlineCss: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
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
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
        ],
      },
    ]
  },
  // All redirects live in src/lib/redirects.ts (run from middleware) so the old host reaches its
  // final URL in one hop. Next's own trailing-slash redirect would run first and add a hop.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
