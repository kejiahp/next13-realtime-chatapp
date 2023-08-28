import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("working");
  // return NextResponse.redirect(new URL("/term", request.url))
}

export const config = {
  matcher: ["/"],
};
