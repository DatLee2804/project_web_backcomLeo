import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import { deleteBroker, getAllBrokersAdmin, upsertBroker } from "@/lib/cms";
import type { Broker } from "@/types";

export async function GET() {
  const session = await getAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const items = await getAllBrokersAdmin();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const payload = (await request.json()) as Broker;
    if (!payload.slug || !payload.name) {
      return NextResponse.json(
        { error: "Tên sàn giao dịch và đường dẫn Slug là bắt buộc." },
        { status: 400 }
      );
    }
    const saved = await upsertBroker(payload);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, item: saved });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Không thể lưu thông tin sàn.";
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
    await deleteBroker(slug);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Không thể xóa sàn giao dịch.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
