import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/RIDCorix',
  assetPrefix: '/RIDCorix/',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
