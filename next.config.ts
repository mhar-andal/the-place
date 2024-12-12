import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'replicate.com',
        protocol: 'https',
      },
      {
        hostname: 'replicate.delivery',
        protocol: 'https',
      },
    ],
  },
  /* config options here */
  serverExternalPackages: ['knex'],
}

export default nextConfig
