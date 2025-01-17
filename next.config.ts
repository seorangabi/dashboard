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
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;
