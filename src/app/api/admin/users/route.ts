import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  deleteUserAdmin,
  getAllUsersAdmin,
  updateUserRoleAdmin,
} from "@/lib/cms";
import type { UserRole } from "@/types";

export async function GET() {
  const session = await getAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = await getAllUsersAdmin();
  return NextResponse.json({
    items: items.map((u) => ({
      id: u.id,
      email: u.email,
      fullName: u.fullName,
      phoneOrZalo: u.phoneOrZalo,
      provider: u.provider,
      googleId: u.googleId,
      avatarUrl: u.avatarUrl,
      role: u.role,
      createdAt: u.createdAt,
    })),
  });
}

export async function PATCH(request: Request) {
  const session = await getAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await request.json()) as { id?: string; role?: UserRole };
    if (!body.id || (body.role !== "user" && body.role !== "admin")) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
    }
    await updateUserRoleAdmin(body.id, body.role);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Không thể cập nhật quyền.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Thiếu ID tài khoản." }, { status: 400 });
    }
    await deleteUserAdmin(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Không thể xóa tài khoản.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
