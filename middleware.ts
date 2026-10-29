import { NextResponse, type NextRequest } from "next/server";

/** The nah.meter admin page (and its form posts) sits behind HTTP Basic auth: any user name, the admin password. */
export function middleware(request: NextRequest) {
  const password = process.env.NAHMETER_ADMIN_PASSWORD;
  const header = request.headers.get("authorization") ?? "";
  if (password && password.length >= 16 && header.startsWith("Basic ")) {
    const decoded = atob(header.slice(6));
    const given = decoded.slice(decoded.indexOf(":") + 1);
    if (sameText(given, password)) return NextResponse.next();
  }
  return new NextResponse("Sign in required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="nah.meter admin", charset="UTF-8"' },
  });
}

/** Compares without stopping at the first difference. */
function sameText(a: string, b: string): boolean {
  let diff = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}

export const config = { matcher: ["/nahmeter/admin", "/nahmeter/admin/:path*"] };
