import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Edge proxy: Basic Auth for /admin.
 * Set ADMIN_USER and ADMIN_PASSWORD on Vercel (strong values).
 */
export function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");
  const ADMIN_USER = process.env.ADMIN_USER || "admin";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "knits2026";

  if (!authHeader) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Knits by Muna Admin"' },
    });
  }

  const basic = authHeader.split(" ")[1];
  if (!basic) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Knits by Muna Admin"' },
    });
  }

  let decoded = "";
  try {
    decoded = atob(basic);
  } catch {
    return new NextResponse("Invalid credentials", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Knits by Muna Admin"' },
    });
  }

  const colon = decoded.indexOf(":");
  const user = colon === -1 ? decoded : decoded.slice(0, colon);
  const pwd = colon === -1 ? "" : decoded.slice(colon + 1);

  if (user === ADMIN_USER && pwd === ADMIN_PASSWORD) {
    return NextResponse.next();
  }

  return new NextResponse("Invalid credentials", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Knits by Muna Admin"' },
  });
}

export const config = {
  matcher: ["/admin/:path*"],
};
