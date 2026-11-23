import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/auth";
import { seedDefaultDataToStorage } from "@/lib/cms";

export async function POST() {
  const session = await getAdminSession();
  if (!session.authenticated) {
    return NextResponse.json({ error: "Chưa đăng nhập Admin." }, { status: 401 });
  }

  try {
    const counts = await seedDefaultDataToStorage();
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, counts });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Không thể đồng bộ dữ liệu mẫu.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
