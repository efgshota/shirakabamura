import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
  async redirects() {
    return [
      // /business/ → /stories/（301永続リダイレクト）
      { source: "/business", destination: "/stories", permanent: true },
      { source: "/business/", destination: "/stories/", permanent: true },
      { source: "/business/:slug*", destination: "/stories/:slug*", permanent: true },
      // /useful/ → /info/（301永続リダイレクト）
      { source: "/useful", destination: "/info", permanent: true },
      { source: "/useful/", destination: "/info/", permanent: true },
      { source: "/useful/:slug*", destination: "/info/:slug*", permanent: true },
    ];
  },
};

export default nextConfig;
