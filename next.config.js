/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/neweeras-platform',
  assetPrefix: '/neweeras-platform/',
}

module.exports = nextConfig
