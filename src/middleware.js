import { NextResponse } from "next/server";

const allowedPaths = ["/"];

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";
  if (token && path === "/") {
    console.log("Redirecting to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }
  if (token && !allowedPaths.includes(path)) {
    return NextResponse.next();
  }
  if (!token && !allowedPaths.includes(path)) {
    console.log("Redirecting to /login");
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
  ],
};
