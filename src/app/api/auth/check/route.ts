import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const authToken = request.cookies.get("auth-token")?.value;
  const sessionToken =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value ||
    request.cookies.get("session-token")?.value;

  const allCookies = request.cookies.getAll();
  let userData = null;

  // If we have a custom auth token (user ID), fetch user data
  if (authToken) {
    try {
      const userId = parseInt(authToken);
      if (!isNaN(userId)) {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
            avatarUrl: true,
            isActive: true,
          },
        });

        if (user && user.isActive) {
          userData = {
            id: user.id.toString(),
            name: `${user.firstName} ${user.lastName}`.trim() || user.email,
            email: user.email,
            avatar: user.avatarUrl || "",
            role: user.role,
          };
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  return NextResponse.json({
    authToken: authToken ? `${authToken.substring(0, 10)}...` : null,
    sessionToken: sessionToken ? `${sessionToken.substring(0, 10)}...` : null,
    isLoggedIn: !!(authToken || sessionToken),
    hasAuthToken: !!authToken,
    hasSessionToken: !!sessionToken,
    userData,
    totalCookies: allCookies.length,
    cookieNames: allCookies.map((cookie) => cookie.name),
    userAgent: request.headers.get("user-agent"),
    timestamp: new Date().toISOString(),
  });
}
