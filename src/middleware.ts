// https://github.com/hiteshchoudhary/nextjs-fullstack-auth/tree/main
import { type NextRequest, NextResponse } from "next/server";
import type { JWT } from "next-auth/jwt";
// import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

// start with /admin

export const isPublicPath = (path: string) => {
	const publicPaths = ["/", "/admin/login"];
	return publicPaths.includes(path);
};

const middleware = (request: NextRequest) => {
	// @ts-expect-error next-auth
	const token = request?.nextauth?.token as JWT | undefined;
	const path = request.nextUrl.pathname;

	// after login can't access public path
	if (isPublicPath(path) && token) {
		return NextResponse.redirect(new URL("/admin", request.nextUrl));
	}
};

export default withAuth(middleware, {
	callbacks: {
		authorized: ({ req, token }) => {
			const { pathname } = req.nextUrl;

			if (isPublicPath(pathname)) return true;

			return !!token;
		},
	},
});

export const config = {
	matcher: [
		"/admin/:path*",

		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
