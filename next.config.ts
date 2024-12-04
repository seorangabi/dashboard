import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: "/admin/project-management",
      destination: "/admin/project-management/statistics",
    },
  ],
};

export default nextConfig;
