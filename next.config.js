
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
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images-cdn.ubuy.co.in',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'iptvwell.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'r2.thesportsdb.com',
        port: '',
        pathname: '/images/media/**',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/**',
      }
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
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
  async redirects() {
    return [
      {
        source: '/iptv-subscription',
        destination: '/pricing',
        permanent: true,
      },
      // Legacy iptvprovider.me paths, so path-preserving redirects from the old domain land in one hop.
      { source: '/tv', destination: '/', permanent: true },
      { source: '/tv/pricing', destination: '/pricing', permanent: true },
      { source: '/tv/faq', destination: '/faq', permanent: true },
      { source: '/tv/iptv-free-trial', destination: '/iptv-free-trial', permanent: true },
      { source: '/tv/devices/:device', destination: '/devices/:device', permanent: true },
      { source: '/tv/guides/iptv-buffering-troubleshooting', destination: '/devices/troubleshooting', permanent: true },
      { source: '/tv/country/us', destination: '/country/united-states', permanent: true },
      { source: '/tv/country/uk', destination: '/country/united-kingdom', permanent: true },
      { source: '/tv/country/ca', destination: '/country/canada', permanent: true },
      { source: '/tv/country/:slug', destination: '/country/:slug', permanent: true },
      // Old-domain country slugs that differ from this site's slugs (both had Search Console impressions).
      { source: '/country/south-korea', destination: '/country/korea', permanent: true },
      { source: '/country/myanmar', destination: '/country/burma', permanent: true },
    ]
  },
};

export default nextConfig;
