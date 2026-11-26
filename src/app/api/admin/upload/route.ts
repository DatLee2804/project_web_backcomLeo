import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { getAdminSession } from "@/lib/auth";
import { getSupabaseAdmin, getSupabaseBucketName } from "@/lib/supabase";

const ALLOWED_MEDIA_TYPES: Record<
  string,
  { ext: string; maxBytes: number; kind: "image" | "video" }
> = {
  "image/png": { ext: "png", maxBytes: 8 * 1024 * 1024, kind: "image" },
  "image/jpeg": { ext: "jpg", maxBytes: 8 * 1024 * 1024, kind: "image" },
  "image/webp": { ext: "webp", maxBytes: 8 * 1024 * 1024, kind: "image" },
  "image/svg+xml": { ext: "svg", maxBytes: 5 * 1024 * 1024, kind: "image" },
  "image/gif": { ext: "gif", maxBytes: 8 * 1024 * 1024, kind: "image" },
  "video/mp4": { ext: "mp4", maxBytes: 50 * 1024 * 1024, kind: "video" },
  "video/webm": { ext: "webm", maxBytes: 50 * 1024 * 1024, kind: "video" },
};

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session.authenticated) {
    return NextResponse.json(
      { error: "Chưa đăng nhập Admin." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const intent = searchParams.get("intent");

    // Step 1: Issue Direct-to-Supabase Signed Upload URL (bypasses Vercel's 4.5MB body limit!)
    if (intent === "sign") {
      const body = (await request.json()) as {
        folder?: string;
        mimeType?: string;
        size?: number;
      };
      const folderRaw = String(body.folder || "media").replace(
        /[^a-z0-9-_]/gi,
        ""
      );
      const mimeType = String(body.mimeType || "");
      const size = Number(body.size || 0);

      const spec = ALLOWED_MEDIA_TYPES[mimeType];
      if (!spec) {
        return NextResponse.json(
          {
            error:
              "Định dạng không hỗ trợ. Chấp nhận Ảnh (PNG, JPG, WEBP, SVG, GIF) hoặc Video (MP4, WEBM).",
          },
          { status: 400 }
        );
      }

      if (size > spec.maxBytes) {
        const limitMb = Math.round(spec.maxBytes / (1024 * 1024));
        return NextResponse.json(
          { error: `Dung lượng tệp vượt quá giới hạn ${limitMb}MB.` },
          { status: 400 }
        );
      }

      const sb = getSupabaseAdmin();
      if (sb) {
        const bucket = getSupabaseBucketName();
        const fileName = `${folderRaw}/${Date.now()}-${randomUUID().slice(0, 8)}.${spec.ext}`;
        const { data: signData, error: signErr } = await sb.storage
          .from(bucket)
          .createSignedUploadUrl(fileName);

        if (signErr || !signData?.signedUrl) {
          return NextResponse.json(
            {
              error: `Không tạo được link tải lên Supabase Storage (Bucket "${bucket}"): ${signErr?.message || "Kiểm tra lại NEXT_PUBLIC_SUPABASE_URL và SUPABASE_SERVICE_ROLE_KEY"}.`,
            },
            { status: 500 }
          );
        }

        const { data: pubData } = sb.storage
          .from(bucket)
          .getPublicUrl(fileName);

        return NextResponse.json({
          strategy: "supabase-signed",
          signedUrl: signData.signedUrl,
          publicUrl: pubData.publicUrl,
          kind: spec.kind,
        });
      }

      if (process.env.VERCEL === "1") {
        return NextResponse.json(
          {
            error:
              "Trên Vercel cần cấu hình đúng NEXT_PUBLIC_SUPABASE_URL và SUPABASE_SERVICE_ROLE_KEY để tải tệp trực tiếp.",
          },
          { status: 500 }
        );
      }

      return NextResponse.json({ strategy: "local-form" });
    }

    // Step 2: Direct FormData Fallback (for Local Development or small files)
    const formData = await request.formData();
    const file = formData.get("file");
    const folderRaw = String(formData.get("folder") || "media").replace(
      /[^a-z0-9-_]/gi,
      ""
    );

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Vui lòng chọn một tệp hình ảnh hoặc video hợp lệ." },
        { status: 400 }
      );
    }

    const spec = ALLOWED_MEDIA_TYPES[file.type];
    if (!spec) {
      return NextResponse.json(
        {
          error:
            "Định dạng không hỗ trợ. Chấp nhận Ảnh (PNG, JPG, WEBP, SVG, GIF) hoặc Video (MP4, WEBM).",
        },
        { status: 400 }
      );
    }

    if (file.size > spec.maxBytes) {
      const limitMb = Math.round(spec.maxBytes / (1024 * 1024));
      return NextResponse.json(
        { error: `Dung lượng tệp vượt quá giới hạn ${limitMb}MB.` },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `${folderRaw}/${Date.now()}-${randomUUID().slice(0, 8)}.${spec.ext}`;

    const sb = getSupabaseAdmin();
    if (sb) {
      const bucket = getSupabaseBucketName();
      const { error: uploadError } = await sb.storage
        .from(bucket)
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        return NextResponse.json(
          {
            error: `Lỗi tải tệp lên Supabase Storage (Bucket "${bucket}"): ${uploadError.message}.`,
          },
          { status: 500 }
        );
      }

      const { data: pubData } = sb.storage.from(bucket).getPublicUrl(fileName);
      return NextResponse.json({ url: pubData.publicUrl, kind: spec.kind });
    }

    if (process.env.VERCEL === "1") {
      return NextResponse.json(
        {
          error:
            "Trên Vercel cần cấu hình Supabase Storage để tải tệp trực tiếp, hoặc bạn có thể dán đường dẫn link URL.",
        },
        { status: 500 }
      );
    }

    const localRelative = `/uploads/${fileName}`;
    const localFullPath = path.join(process.cwd(), "public", localRelative);
    await fs.mkdir(path.dirname(localFullPath), { recursive: true });
    await fs.writeFile(localFullPath, buffer);

    return NextResponse.json({ url: localRelative, kind: spec.kind });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Không thể xử lý tải tệp lên.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
