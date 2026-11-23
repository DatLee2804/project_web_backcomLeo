import { NextResponse } from "next/server";
import { z } from "zod";
import { createLead } from "@/lib/cms";

const leadPayloadSchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  phoneOrZalo: z
    .string()
    .trim()
    .regex(/^(0|\+84)[0-9]{8,11}$/),
  interestedBroker: z.string().trim().min(1).max(80),
  message: z.string().trim().min(10).max(1000),
});

export async function POST(request: Request) {
  try {
    const raw = await request.json();
    const parsed = leadPayloadSchema.safeParse(raw);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dữ liệu gửi lên không hợp lệ." },
        { status: 400 }
      );
    }

    const result = await createLead(parsed.data);
    return NextResponse.json({
      ok: true,
      savedToDb: result.savedToDb,
    });
  } catch {
    return NextResponse.json(
      { error: "Không thể xử lý yêu cầu tư vấn lúc này." },
      { status: 500 }
    );
  }
}
