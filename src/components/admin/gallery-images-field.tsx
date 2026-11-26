"use client";

import * as React from "react";
import {
  ArrowLeft,
  ArrowRight,
  ImagePlus,
  Link2,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import type { ShowcaseImageItem } from "@/types";
import { Button } from "@/components/ui/button";

interface GalleryImagesFieldProps {
  titleValue?: string;
  subtitleValue?: string;
  items: ShowcaseImageItem[];
  folder: "indicators" | "robots";
  onChange: (next: {
    showcaseTitle?: string;
    showcaseSubtitle?: string;
    showcaseGallery: ShowcaseImageItem[];
  }) => void;
}

async function uploadSingleImageDirect(
  file: File,
  folder: "indicators" | "robots"
): Promise<string> {
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
    throw new Error(signJson.error || "Không thể khởi tạo phiên tải ảnh.");
  }

  if (
    signJson.strategy === "supabase-signed" &&
    signJson.signedUrl &&
    signJson.publicUrl
  ) {
    const rawBytes = await file.arrayBuffer();
    const putRes = await fetch(signJson.signedUrl, {
      method: "PUT",
      headers: {
        "content-type": file.type,
        "cache-control": "max-age=3600",
        "x-upsert": "false",
      },
      body: rawBytes,
    });

    if (!putRes.ok) {
      throw new Error(`Tải ảnh lên Supabase thất bại (${putRes.status}).`);
    }
    return signJson.publicUrl;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const res = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });
  const data = (await res.json()) as { url?: string; error?: string };
  if (!res.ok || !data.url) {
    throw new Error(data.error || "Tải ảnh thất bại.");
  }
  return data.url;
}

export function GalleryImagesField({
  titleValue = "",
  subtitleValue = "",
  items,
  folder,
  onChange,
}: GalleryImagesFieldProps) {
  const multiInputRef = React.useRef<HTMLInputElement>(null);
  const [uploadingStatus, setUploadingStatus] = React.useState<string | null>(
    null
  );
  const [error, setError] = React.useState<string | null>(null);

  const handleMultiSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const files = Array.from(fileList);
    setError(null);

    const uploadedItems: ShowcaseImageItem[] = [];
    try {
      for (let i = 0; i < files.length; i++) {
        setUploadingStatus(`Đang tải ảnh ${i + 1}/${files.length}...`);
        const url = await uploadSingleImageDirect(files[i], folder);
        uploadedItems.push({ url });
      }

      onChange({
        showcaseTitle: titleValue,
        showcaseSubtitle: subtitleValue,
        showcaseGallery: [...items, ...uploadedItems],
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Có lỗi xảy ra khi tải ảnh lên."
      );
      if (uploadedItems.length > 0) {
        onChange({
          showcaseTitle: titleValue,
          showcaseSubtitle: subtitleValue,
          showcaseGallery: [...items, ...uploadedItems],
        });
      }
    } finally {
      setUploadingStatus(null);
      if (multiInputRef.current) {
        multiInputRef.current.value = "";
      }
    }
  };

  const updateItemUrl = (index: number, url: string) => {
    const next = items.map((it, idx) => (idx === index ? { url } : it));
    onChange({
      showcaseTitle: titleValue,
      showcaseSubtitle: subtitleValue,
      showcaseGallery: next,
    });
  };

  const moveItem = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const copy = [...items];
    const [picked] = copy.splice(index, 1);
    copy.splice(target, 0, picked);
    onChange({
      showcaseTitle: titleValue,
      showcaseSubtitle: subtitleValue,
      showcaseGallery: copy,
    });
  };

  const removeItem = (index: number) => {
    onChange({
      showcaseTitle: titleValue,
      showcaseSubtitle: subtitleValue,
      showcaseGallery: items.filter((_, idx) => idx !== index),
    });
  };

  const addBlankUrlSlot = () => {
    onChange({
      showcaseTitle: titleValue,
      showcaseSubtitle: subtitleValue,
      showcaseGallery: [...items, { url: "" }],
    });
  };

  return (
    <div className="space-y-4 rounded-xl border border-gold/35 bg-[#061224]/75 p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-gold-light">
            Thư viện Hình ảnh Thông số &amp; Lợi nhuận (Thuần Hình ảnh • 4–6 tấm)
          </span>
          <p className="mt-1 text-xs text-ink-secondary">
            Hiển thị thuần hình ảnh sắc nét ngay giữa mục{" "}
            <strong>Giới thiệu tổng quan</strong> và{" "}
            <strong>Nguyên lý vận hành</strong>. Bôi đen chọn 4–6 ảnh tải lên 1
            lần!
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={multiInputRef}
            type="file"
            multiple
            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
            onChange={handleMultiSelect}
            className="hidden"
          />

          <Button
            type="button"
            variant="primary"
            size="sm"
            disabled={Boolean(uploadingStatus)}
            onClick={() => multiInputRef.current?.click()}
          >
            {uploadingStatus ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                {uploadingStatus}
              </>
            ) : (
              <>
                <ImagePlus className="h-3.5 w-3.5" />
                Chọn tải nhiều ảnh từ máy
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="subtle"
            size="sm"
            onClick={addBlankUrlSlot}
          >
            <Plus className="h-3.5 w-3.5" />
            Dán link ảnh
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-danger/35 bg-danger-muted px-3 py-2 text-xs text-danger">
          {error}
        </div>
      )}

      {items.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-2 rounded-xl border border-line bg-card p-2.5"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-line bg-[#030811]">
                {item.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.url}
                    alt={`Ảnh #${idx + 1}`}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[11px] text-ink-muted">
                    Dán link ảnh bên dưới
                  </div>
                )}
                <span className="absolute left-2 top-2 rounded bg-[#040B16]/90 px-2 py-0.5 text-[10px] font-bold text-gold-light">
                  0{idx + 1}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="relative flex-1">
                  <Link2 className="pointer-events-none absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-ink-muted" />
                  <input
                    type="text"
                    value={item.url}
                    onChange={(e) => updateItemUrl(idx, e.target.value)}
                    placeholder="https://..."
                    className="h-7 w-full rounded border border-line bg-background-secondary pl-6 pr-2 text-[11px] text-ink-secondary focus:border-gold focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => moveItem(idx, -1)}
                  title="Đổi lên trước"
                  className="inline-flex h-7 w-7 items-center justify-center rounded border border-line bg-background-secondary text-ink-secondary hover:text-gold-light disabled:opacity-35"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  disabled={idx === items.length - 1}
                  onClick={() => moveItem(idx, 1)}
                  title="Đổi ra sau"
                  className="inline-flex h-7 w-7 items-center justify-center rounded border border-line bg-background-secondary text-ink-secondary hover:text-gold-light disabled:opacity-35"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  title="Xóa ảnh"
                  className="inline-flex h-7 w-7 items-center justify-center rounded border border-danger/30 bg-danger-muted text-danger hover:bg-danger/20"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-line-strong bg-background-secondary/50 px-4 py-5 text-center text-xs text-ink-muted">
          Chưa có ảnh nào. Bấm{" "}
          <strong className="text-gold-light">Chọn tải nhiều ảnh từ máy</strong>{" "}
          để tải 4–6 tấm ảnh thống kê/lợi nhuận hiển thị thuần hình ảnh ngoài
          trang.
        </div>
      )}
    </div>
  );
}
