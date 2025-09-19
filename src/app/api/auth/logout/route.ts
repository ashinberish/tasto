import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Create response with cleared auth cookie
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );

    // Clear the auth token cookie
    response.cookies.set("auth-token", "", {
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
