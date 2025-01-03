import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  if (
    !token &&
    !request.nextUrl.pathname.startsWith("/auth/login") &&
    !request.nextUrl.pathname.startsWith("/auth/signup")
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|auth/|[^/]+\\.[^/]+).*)",
  ],
};
