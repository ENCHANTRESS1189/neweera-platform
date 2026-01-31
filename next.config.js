/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  distDir: 'out',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/neweeras-platform' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/neweeras-platform' : '',
}

module.exports = nextConfig
