import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import { getSitePagesContentAdmin, saveSitePagesContent } from "@/lib/cms";
import type { SitePagesContent } from "@/types";

export async function GET() {
  const session = await getAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const content = await getSitePagesContentAdmin();
  return NextResponse.json({ content });
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await request.json()) as SitePagesContent;
    const saved = await saveSitePagesContent(body);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, content: saved });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Không thể lưu nội dung trang.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
