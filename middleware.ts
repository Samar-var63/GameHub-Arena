// import { NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;

//   const isProtectedRoute =
//     path.startsWith("/dashboard") || path.startsWith("/profile");

//   const hasToken = request.cookies.has("auth_token");

//   if (isProtectedRoute && !hasToken) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/profile/:path*"],
// };