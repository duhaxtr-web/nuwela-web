import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Edge-runtime middleware: shallow cookie presence check.
// Full HMAC verification happens server-side via app/admin/layout.tsx.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin" || pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("nuwela_admin")?.value;
    if (!token || !token.includes(".")) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
