/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  },
  images: {
    domains: ['imagedelivery.net', 'cloudflare.com'],
    formats: ['image/webp', 'image/avif']
  }
}

module.exports = withPWA(nextConfig)