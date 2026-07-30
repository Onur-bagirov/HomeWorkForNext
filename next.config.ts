import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin root to this app — a lockfile in ~/ otherwise confuses Turbopack
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
