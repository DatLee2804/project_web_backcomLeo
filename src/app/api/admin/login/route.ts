import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_MAX_AGE,
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  verifyAdminCredentials,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      username?: string;
      password?: string;
    };

    const username = body.username ?? "";
    const password = body.password ?? "";

    const result = verifyAdminCredentials(username, password);
    if (!result.valid) {
      return NextResponse.json(
        { error: result.error ?? "Đăng nhập thất bại." },
        { status: 401 }
      );
    }

    const token = createAdminSessionToken(username.trim());
    const response = NextResponse.json({ ok: true });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: ADMIN_COOKIE_MAX_AGE,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Yêu cầu đăng nhập không hợp lệ." },
      { status: 400 }
    );
  }
}
