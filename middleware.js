import { NextResponse } from "next/server";
export function middleware(request) {
const { pathname } = request.nextUrl;
// Mock authentication check: change to true/false to test redirection
const isAuthenticated = false;
// Protect admin routes from non-authenticated access
if (pathname.startsWith("/admin") && !isAuthenticated) {
return NextResponse.redirect(new URL("/login", request.url));
}
return NextResponse.next();
}
export const config = {
matcher: ["/admin/:path*", "/dashboard/:path*"],
};