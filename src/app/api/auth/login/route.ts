import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/utils/passwordHash";

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.issues,
        },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        isActive: true,
        failedLogins: true,
        lockedUntil: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      return NextResponse.json(
        { error: "Account is temporarily locked. Please try again later." },
        { status: 423 }
      );
    }

    const isPasswordValid = await verifyPassword(password, user.password || "");

    if (!isPasswordValid) {
      const newFailedLogins = user.failedLogins + 1;
      const shouldLock = newFailedLogins >= 5;

      await prisma.user.update({
        where: { id: user.id },
        data: {
          failedLogins: newFailedLogins,
          lockedUntil: shouldLock
            ? new Date(Date.now() + 30 * 60 * 1000) // Lock for 30 minutes
            : null,
        },
      });

      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: "FAILED_LOGIN",
          ipAddress:
            request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            "unknown",
        },
      });

      const errorMessage = shouldLock
        ? "Too many failed attempts. Account locked for 30 minutes."
        : "Invalid credentials";

      return NextResponse.json({ error: errorMessage }, { status: 401 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLogin: new Date(),
        failedLogins: 0,
        lockedUntil: null,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "LOGIN",
        ipAddress:
          request.headers.get("x-forwarded-for") ||
          request.headers.get("x-real-ip") ||
          "unknown",
      },
    });

    // Return user data (excluding sensitive info)
    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
