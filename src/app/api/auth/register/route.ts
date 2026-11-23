import { NextResponse } from "next/server";
import { z } from "zod";
import {
  SESSION_TTL_SECONDS,
  USER_COOKIE_NAME,
  createUserSessionToken,
  hashPassword,
} from "@/lib/auth";
import { registerCredentialsUser } from "@/lib/cms";
import type { SessionUser } from "@/types";

const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Họ và tên cần tối thiểu 2 ký tự.")
    .max(80, "Họ và tên không quá 80 ký tự."),
  email: z.string().trim().email("Địa chỉ Email không hợp lệ."),
  phoneOrZalo: z
    .string()
    .trim()
    .max(20, "Số điện thoại / Zalo không hợp lệ.")
    .optional()
    .default(""),
  password: z
    .string()
    .min(6, "Mật khẩu cần tối thiểu 6 ký tự.")
    .max(100, "Mật khẩu quá dài."),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      const firstErr =
        parsed.error.issues[0]?.message || "Thông tin đăng ký không hợp lệ.";
      return NextResponse.json({ error: firstErr }, { status: 400 });
    }

    const passwordHash = hashPassword(parsed.data.password);
    const created = await registerCredentialsUser({
      email: parsed.data.email,
      fullName: parsed.data.fullName,
      phoneOrZalo: parsed.data.phoneOrZalo || "",
      passwordHash,
      role: "user",
    });

    const sessionUser: SessionUser = {
      id: created.id,
      email: created.email,
      fullName: created.fullName,
      role: created.role,
      provider: created.provider,
      avatarUrl: created.avatarUrl ?? null,
    };

    const token = createUserSessionToken(sessionUser);
    const response = NextResponse.json({
      ok: true,
      user: sessionUser,
      redirectTo: "/account",
    });

    response.cookies.set({
      name: USER_COOKIE_NAME,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_TTL_SECONDS,
    });

    return response;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Không thể hoàn tất đăng ký.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
