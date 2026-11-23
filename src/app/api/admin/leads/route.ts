import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import {
  deleteLeadAdmin,
  getAllLeadsAdmin,
  updateLeadAdmin,
} from "@/lib/cms";
import type { LeadStatus } from "@/types";

export async function GET() {
  const session = await getAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = await getAllLeadsAdmin();
  return NextResponse.json({ items });
}

export async function PATCH(request: Request) {
  const session = await getAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await request.json()) as {
      id?: string;
      status?: LeadStatus;
      adminNote?: string;
    };
    if (!body.id) {
      return NextResponse.json({ error: "Thiếu ID khách hàng." }, { status: 400 });
    }
    await updateLeadAdmin(body.id, {
      status: body.status,
      adminNote: body.adminNote,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Không thể cập nhật trạng thái.";
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
      return NextResponse.json({ error: "Thiếu ID khách hàng." }, { status: 400 });
    }
    await deleteLeadAdmin(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Không thể xóa phiếu tư vấn.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
