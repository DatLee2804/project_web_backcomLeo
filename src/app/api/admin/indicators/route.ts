import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import {
  deleteIndicator,
  getAllIndicatorsAdmin,
  upsertIndicator,
} from "@/lib/cms";
import type { TradingIndicator } from "@/types";

export async function GET() {
  const session = await getAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = await getAllIndicatorsAdmin();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const payload = (await request.json()) as TradingIndicator;
    if (!payload.slug || !payload.name) {
      return NextResponse.json(
        { error: "Tên chỉ báo và đường dẫn Slug là bắt buộc." },
        { status: 400 }
      );
    }
    const saved = await upsertIndicator(payload);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, item: saved });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Không thể lưu chỉ báo.";
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
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "Thiếu tham số slug." }, { status: 400 });
    }
    await deleteIndicator(slug);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Không thể xóa chỉ báo.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
