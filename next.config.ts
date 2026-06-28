import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'image.thum.io' },
      { protocol: 'https', hostname: 'opengraph.githubassets.com' },
    ],
  },
};

export default nextConfig;
