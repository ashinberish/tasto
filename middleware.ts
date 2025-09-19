import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  // Check if user is logged in by looking for auth token
  const authToken = req.cookies.get("auth-token")?.value;
  const sessionToken =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value ||
    req.cookies.get("session-token")?.value;

  const isLoggedIn = !!(authToken || sessionToken);

  // Debug logging for development
  if (process.env.NODE_ENV === "development") {
    console.log(
      `Middleware: ${nextUrl.pathname}, isLoggedIn: ${isLoggedIn}, authToken: ${
        authToken ? "exists" : "none"
      }`
    );
  }

  const protectedRoutes = ["/feeds", "/profile", "/create-recipe"];
  const authRoutes = ["/login", "/signup"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // Handle root path redirection first
  if (nextUrl.pathname === "/") {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/feeds", nextUrl));
    } else {
      return NextResponse.redirect(new URL("/login", nextUrl));
    }
  }

  // Redirect to login if trying to access protected route without authentication
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // Redirect to feeds if trying to access auth routes while authenticated
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/feeds", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
