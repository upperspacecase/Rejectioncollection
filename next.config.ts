import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/__/auth/:path*",
        destination: "https://rejection-collection.firebaseapp.com/__/auth/:path*",
      },
      {
        source: "/__/firebase/:path*",
        destination: "https://rejection-collection.firebaseapp.com/__/firebase/:path*",
      },
    ];
  },
};

export default nextConfig;
