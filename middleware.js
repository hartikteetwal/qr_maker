import { NextResponse } from "next/server"

export function middleware(req) {
    const token = req.cookies.get("token")?.value
    const { pathname } = req.nextUrl

    // 🚫 If not logged in & trying to access dashboard
    if (!token && pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    // 🚫 If logged in & trying to access login/signup
    if (token && pathname.startsWith("/auth")) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*", "/auth/:path*"],
}
