import { NextResponse } from "next/server";

export function proxy(req) {
    const { pathname } = req.nextUrl;

    // read authUser cookie
    const authUserCookie = req.cookies.get("authUser")?.value;
    const isLoggedIn = Boolean(authUserCookie);

    // public routes
    const publicRoutes = ["/auth/login", "/auth/signup"];

    // private routes (protect everything else if needed)
    const protectedRoutes = [
        "/dashboard",
        "/generate",
        "/history",
        "/transactions",
        "/settings",
    ];

    // 🚫 Not logged in & accessing protected route
    if (
        !isLoggedIn &&
        protectedRoutes.some((route) => pathname.startsWith(route))
    ) {
        return NextResponse.redirect(
            new URL("/auth/login", req.url)
        );
    }

    // 🚫 Logged in & accessing auth pages
    if (
        isLoggedIn &&
        publicRoutes.some((route) => pathname.startsWith(route))
    ) {
        return NextResponse.redirect(
            new URL("/dashboard", req.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/generate/:path*",
        "/history/:path*",
        "/transactions/:path*",
        "/settings/:path*",
        "/auth/:path*",
    ],
};
