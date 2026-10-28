import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let phones and other devices on the local network load dev JS (e.g. http://192.168.1.62:3000).
  // Without this, Next.js blocks the scripts, so nothing hydrates on mobile during development.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    agentUpgrade: "security",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
