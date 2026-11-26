"use client";

import * as React from "react";
import { Film, ImagePlus, Link2, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder:
    | "indicators"
    | "robots"
    | "masters"
    | "brokers"
    | "pages"
    | "videos";
  acceptVideo?: boolean;
  helperText?: string;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  folder,
  acceptVideo = false,
  helperText,
}: ImageUploadFieldProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const isVideoUrl = React.useMemo(() => {
    const lower = value.toLowerCase().split("?")[0];
    return lower.endsWith(".mp4") || lower.endsWith(".webm");
  }, [value]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      // 1. Request a Direct-to-Supabase Signed Upload URL (avoids Vercel 4.5MB Serverless body limit)
      const signRes = await fetch("/api/admin/upload?intent=sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          folder,
          mimeType: file.type,
          size: file.size,
        }),
      });

      const signJson = (await signRes.json()) as {
        strategy?: "supabase-signed" | "local-form";
        signedUrl?: string;
        publicUrl?: string;
        error?: string;
      };

      if (!signRes.ok) {
        setError(signJson.error || "Không thể khởi tạo phiên tải tệp.");
        return;
      }

      if (
        signJson.strategy === "supabase-signed" &&
        signJson.signedUrl &&
        signJson.publicUrl
      ) {
        const rawBytes = await file.arrayBuffer();
        const directUploadRes = await fetch(signJson.signedUrl, {
          method: "PUT",
          headers: {
            "content-type": file.type,
            "cache-control": "max-age=3600",
            "x-upsert": "false",
          },
          body: rawBytes,
        });

        if (!directUploadRes.ok) {
          const errText = await directUploadRes.text().catch(() => "");
          setError(
            `Tải trực tiếp lên Supabase Storage thất bại (${directUploadRes.status}): ${errText || "Vui lòng kiểm tra Bucket 'media' trên Supabase."}`
          );
          return;
        }

        onChange(signJson.publicUrl);
        return;
      }

      // 2. Local Development FormData upload fallback
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error || "Tải tệp thất bại.");
      } else {
        onChange(data.url);
      }
    } catch {
      setError("Lỗi kết nối khi tải tệp lên máy chủ.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const acceptAttr = acceptVideo
    ? "video/mp4,video/webm,image/png,image/jpeg,image/webp,image/svg+xml"
    : "image/png,image/jpeg,image/webp,image/svg+xml,image/gif";

  return (
    <div className="space-y-2.5">
      <label className="block text-xs font-semibold uppercase tracking-wider text-ink-secondary">
        {label}
      </label>

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <div className="relative flex-1">
          <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={
              acceptVideo
                ? "Dán link Video .mp4 / .webm hoặc tải từ máy tính"
                : "Dán link ảnh https://... hoặc tải tệp lên từ máy tính"
            }
            className="h-10 w-full rounded-input border border-line-strong bg-background-secondary pl-9 pr-3 text-xs text-ink-primary placeholder:text-ink-muted focus:border-gold focus:outline-none sm:text-sm"
          />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept={acceptAttr}
          onChange={handleFileSelect}
          className="hidden"
        />

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
          className="h-10 shrink-0"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Đang tải lên...
            </>
          ) : acceptVideo ? (
            <>
              <Film className="h-4 w-4" />
              Tải Video / Ảnh từ máy
            </>
          ) : (
            <>
              <ImagePlus className="h-4 w-4" />
              Tải ảnh từ máy
            </>
          )}
        </Button>

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            title="Xóa đường dẫn tệp"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-input border border-danger/30 bg-danger-muted text-danger hover:bg-danger/20"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {error && <p className="text-xs text-danger">{error}</p>}
      {helperText && <p className="text-[11px] text-ink-muted">{helperText}</p>}

      {value && (
        <div className="inline-flex items-center gap-3 rounded-xl border border-line bg-[#050D1A] p-2.5">
          {isVideoUrl ? (
            <video
              src={value}
              controls
              muted
              className="h-28 w-auto max-w-[200px] rounded-lg bg-black object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt="Preview"
              className="h-16 w-auto max-w-[180px] rounded-lg object-contain"
            />
          )}
          <span className="max-w-[240px] truncate text-[11px] text-ink-muted">
            {value}
          </span>
        </div>
      )}
    </div>
  );
}
