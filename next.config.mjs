/** @type {import('next').NextConfig} */
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';
import { createRequire } from 'node:module';
import { realpathSync } from 'node:fs';
import { dirname } from 'node:path';

const resolvePackage = createRequire(import.meta.url);

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.instagram.com https://*.cdninstagram.com https://www.googletagmanager.com https://connect.facebook.net https://*.facebook.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: blob: https://res.cloudinary.com https://*.cloudinary.com https://*.cdninstagram.com https://*.fbcdn.net https://www.facebook.com https://images.unsplash.com;
  font-src 'self' data: https://fonts.gstatic.com;
  frame-src 'self' https://www.instagram.com https://*.instagram.com https://www.facebook.com https://*.facebook.com;
  connect-src 'self' https://www.instagram.com https://*.cdninstagram.com https://www.google-analytics.com https://www.facebook.com https://res.cloudinary.com https://*.cloudinary.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();

const nextConfig = {
  // Keep metadata in the initial head for search, social, and link-preview clients.
  htmlLimitedBots: /.*/,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  productionBrowserSourceMaps: true,
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons', 'framer-motion', '@gsap/react'],
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      // pnpm links must resolve to the same App Router React runtime for every importer.
      config.resolve.alias = {
        ...config.resolve.alias,
        'next/dist/compiled/react': realpathSync(dirname(resolvePackage.resolve('next/dist/compiled/react'))),
        'next/dist/compiled/react-dom': realpathSync(dirname(resolvePackage.resolve('next/dist/compiled/react-dom'))),
      };
    }
    return config;
  },
  async redirects() {
    return [
      { source: '/services/web-development', destination: '/services/custom-software-development', permanent: true },
      { source: '/services/saas-development', destination: '/services/custom-software-development', permanent: true },
      { source: '/services/custom-software', destination: '/services/custom-software-development', permanent: true },
      { source: '/services/saas-products', destination: '/services/custom-software-development', permanent: true },
      { source: '/services/mobile-apps', destination: '/services/mobile-app-development', permanent: true },
      { source: '/services/e-commerce', destination: '/services/ecommerce-development', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
      {
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default (phase) => ({
  ...nextConfig,
  // Keep production builds and dev servers on other ports from replacing live chunks.
  // Next sets PORT to the actual listening port before loading the server config.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? `.next-dev-${process.env.PORT || '3000'}` : '.next',
  async headers() {
    const rules = await nextConfig.headers();
    if (phase !== PHASE_DEVELOPMENT_SERVER) {
      rules[0].headers.find(header => header.key === 'Content-Security-Policy').value = cspHeader.replace(" 'unsafe-eval'", '');
    }
    return rules;
  },
});
