import type { NextConfig } from "next";

// Use basePath only for GitHub Pages deployment (when building for production)
const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isGithubPages ? '/RIDCorix' : '',
  assetPrefix: isGithubPages ? '/RIDCorix/' : '',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
