/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/RIDCorix' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/RIDCorix/' : '',
}

module.exports = nextConfig