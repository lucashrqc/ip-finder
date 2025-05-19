import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ip-finder",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
