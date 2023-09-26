import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMiddlewareCurrentUser } from "./lib/authUtils/getServerSideUser";

export function middleware(request: NextRequest) {
  const user = getMiddlewareCurrentUser(request);

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/chat/:path"],
};
