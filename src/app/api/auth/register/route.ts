import { NextResponse } from "next/server";
import db from "@/lib/db";
import { hashPassword, createSessionToken, COOKIE_NAME } from "@/lib/auth";
import { cookies } from "next/headers";
import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  displayName: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = registerSchema.parse(json);

    // Check if user already exists
    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ email: data.email.toLowerCase() }, { username: data.username.toLowerCase() }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username or email already in use." },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(data.password);

    // Create user in database
    const user = await db.user.create({
      data: {
        username: data.username.toLowerCase(),
        displayName: data.displayName,
        email: data.email.toLowerCase(),
        passwordHash,
      },
    });

    const token = await createSessionToken({
      userId: user.id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
    });

    // Set secure HttpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || "Invalid input" }, { status: 400 });
    }
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
