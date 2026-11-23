import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  SESSION_TTL_SECONDS,
  USER_COOKIE_NAME,
  createAdminSessionToken,
  createUserSessionToken,
  getAdminAuthStatus,
  verifyAdminCredentials,
  verifyPasswordHash,
} from "@/lib/auth";
import { findUserByEmail } from "@/lib/cms";
import type { SessionUser } from "@/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      identifier?: string;
      password?: string;
    };

    const identifier = (body.identifier || "").trim();
    const password = body.password || "";

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Vui lòng nhập đầy đủ Email/Tài khoản và Mật khẩu." },
        { status: 400 }
      );
    }

    // 1. Check Master Admin credentials from Environment Variables
    const adminCheck = verifyAdminCredentials(identifier, password);
    if (adminCheck.valid) {
      const adminStatus = getAdminAuthStatus();
      const adminUser: SessionUser = {
        id: "env-admin",
        email: adminStatus.expectedEmail,
        fullName: "Quản trị viên (Admin)",
        role: "admin",
        provider: "env-admin",
        avatarUrl: null,
      };

      const userToken = createUserSessionToken(adminUser);
      const adminToken = createAdminSessionToken(adminStatus.expectedUsername);

      const response = NextResponse.json({
        ok: true,
        user: adminUser,
        redirectTo: "/admin",
      });

      response.cookies.set({
        name: USER_COOKIE_NAME,
        value: userToken,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: SESSION_TTL_SECONDS,
      });

      response.cookies.set({
        name: ADMIN_COOKIE_NAME,
        value: adminToken,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: SESSION_TTL_SECONDS,
      });

      return response;
    }

    // 2. Check Registered Member / User in Database by Email
    const user = await findUserByEmail(identifier);
    if (!user) {
      return NextResponse.json(
        { error: "Tài khoản hoặc mật khẩu không chính xác." },
        { status: 401 }
      );
    }

    if (!user.passwordHash) {
      return NextResponse.json(
        {
          error:
            "Tài khoản này được đăng ký qua Google. Vui lòng bấm nút 'Tiếp tục với Google'.",
        },
        { status: 400 }
      );
    }

    const validPass = verifyPasswordHash(password, user.passwordHash);
    if (!validPass) {
      return NextResponse.json(
        { error: "Tài khoản hoặc mật khẩu không chính xác." },
        { status: 401 }
      );
    }

    const sessionUser: SessionUser = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      provider: user.provider,
      avatarUrl: user.avatarUrl ?? null,
    };

    const userToken = createUserSessionToken(sessionUser);
    const response = NextResponse.json({
      ok: true,
      user: sessionUser,
      redirectTo: user.role === "admin" ? "/admin" : "/account",
    });

    response.cookies.set({
      name: USER_COOKIE_NAME,
      value: userToken,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_TTL_SECONDS,
    });

    if (user.role === "admin") {
      response.cookies.set({
        name: ADMIN_COOKIE_NAME,
        value: createAdminSessionToken(user.email),
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: SESSION_TTL_SECONDS,
      });
    }

    return response;
  } catch {
    return NextResponse.json(
      { error: "Yêu cầu đăng nhập không hợp lệ." },
      { status: 400 }
    );
  }
}
