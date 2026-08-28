import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/config'
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
const withNextIntal = createNextIntlPlugin();