"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Edit3,
  ExternalLink,
  Eye,
  EyeOff,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import type { TradingIndicator } from "@/types";
import { GalleryImagesField } from "@/components/admin/gallery-images-field";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { slugifyVietnamese } from "@/lib/utils";

function createBlankIndicator(): TradingIndicator {
  return {
    id: "",
    slug: "",
    name: "",
    platform: "TradingView",
    category: "Market Structure",
    status: "confirmed",
    isPublished: true,
    sortOrder: 10,
    subtitle: "",
    summary: "",
    previewImage: "/images/indicators/indicator-session-preview.svg",
    targetMarkets: ["XAUUSD", "EURUSD"],
    recommendedTimeframes: ["M15", "H1", "H4"],
    introduction: [""],
    features: [""],
    howItWorks: [{ title: "", description: "" }],
    parameters: [
      { label: "Nền tảng vận hành", value: "TradingView" },
      { label: "Cơ chế cấp quyền", value: "Invite-Only thành viên" },
    ],
    installationSteps: [
      {
        step: 1,
        title: "Liên kết tài khoản đối tác",
        description: "Mở hoặc chuyển mã IB về hệ thống Backcom Mr Leo.",
      },
      {
        step: 2,
        title: "Gửi thông tin cấp quyền",
        description: "Gửi ID tài khoản và Username qua Zalo hỗ trợ.",
      },
    ],
    usageNotes: [
      "Chỉ báo hỗ trợ phân tích xác suất kỹ thuật, luôn đặt Stop Loss đầy đủ.",
    ],
    faqs: [
      {
        id: "faq-1",
        question: "Làm sao để được cấp quyền sử dụng chỉ báo này?",
        answer:
          "Bạn chỉ cần liên kết tài khoản giao dịch tại một trong các sàn đối tác của Backcom Mr Leo và gửi thông tin qua mục Liên hệ.",
      },
    ],
  };
}

export function IndicatorsManager({
  initialItems,
}: {
  initialItems: TradingIndicator[];
}) {
  const router = useRouter();
  const [items, setItems] = React.useState<TradingIndicator[]>(initialItems);
  const [editing, setEditing] = React.useState<TradingIndicator | null>(null);
  const [isNew, setIsNew] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [feedback, setFeedback] = React.useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);

  // Textarea helpers for string arrays
  const [introText, setIntroText] = React.useState("");
  const [featuresText, setFeaturesText] = React.useState("");
  const [notesText, setNotesText] = React.useState("");
  const [marketsText, setMarketsText] = React.useState("");
  const [timeframesText, setTimeframesText] = React.useState("");

  const openEditor = (item: TradingIndicator, createMode: boolean) => {
    setEditing(structuredClone(item));
    setIsNew(createMode);
    setIntroText(item.introduction.join("\n\n"));
    setFeaturesText(item.features.join("\n"));
    setNotesText(item.usageNotes.join("\n"));
    setMarketsText(item.targetMarkets.join(", "));
    setTimeframesText(item.recommendedTimeframes.join(", "));
    setFeedback(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    const finalSlug = editing.slug.trim() || slugifyVietnamese(editing.name);
    const payload: TradingIndicator = {
      ...editing,
      id: editing.id || finalSlug,
      slug: finalSlug,
      introduction: introText
        .split(/\n{2,}|\n/)
        .map((s) => s.trim())
        .filter(Boolean),
      features: featuresText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      usageNotes: notesText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      targetMarkets: marketsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      recommendedTimeframes: timeframesText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      showcaseGallery: (editing.showcaseGallery ?? []).filter((g) =>
        Boolean(g.url?.trim())
      ),
      howItWorks: editing.howItWorks.filter((h) => h.title.trim()),
      parameters: editing.parameters.filter((p) => p.label.trim()),
      installationSteps: editing.installationSteps
        .filter((st) => st.title.trim())
        .map((st, idx) => ({ ...st, step: idx + 1 })),
      faqs: editing.faqs
        .filter((f) => f.question.trim())
        .map((f, idx) => ({ ...f, id: f.id || `${finalSlug}-faq-${idx + 1}` })),
    };

    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/admin/indicators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        item?: TradingIndicator;
        error?: string;
      };
      if (!res.ok || !data.item) {
        setFeedback({
          type: "err",
          text: data.error || "Không thể lưu chỉ báo.",
        });
      } else {
        setItems((prev) => {
          const exists = prev.some((x) => x.slug === data.item!.slug);
          return exists
            ? prev.map((x) => (x.slug === data.item!.slug ? data.item! : x))
            : [...prev, data.item!];
        });
        setEditing(null);
        setFeedback({
          type: "ok",
          text: `Đã lưu và xuất bản chỉ báo "${data.item.name}" thành công!`,
        });
        router.refresh();
      }
    } catch {
      setFeedback({ type: "err", text: "Lỗi kết nối máy chủ." });
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (item: TradingIndicator) => {
    const updated: TradingIndicator = {
      ...item,
      isPublished: item.isPublished === false ? true : false,
    };
    const res = await fetch("/api/admin/indicators", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) {
      setItems((prev) =>
        prev.map((x) => (x.slug === item.slug ? updated : x))
      );
      router.refresh();
    }
  };

  const handleDelete = async (slug: string, name: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa chỉ báo "${name}" không?`)) {
      return;
    }
    const res = await fetch(
      `/api/admin/indicators?slug=${encodeURIComponent(slug)}`,
      { method: "DELETE" }
    );
    if (res.ok) {
      setItems((prev) => prev.filter((x) => x.slug !== slug));
      setFeedback({ type: "ok", text: `Đã xóa chỉ báo "${name}".` });
      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Badge variant="gold">INDICATORS CMS</Badge>
          <h1 className="mt-2 font-heading text-2xl font-extrabold text-ink-primary sm:text-3xl">
            Quản lý Công cụ Chỉ báo (Indicators)
          </h1>
          <p className="mt-1 text-xs text-ink-secondary sm:text-sm">
            Đăng mới, chỉnh sửa thông số kỹ thuật, tải ảnh minh họa và hướng dẫn
            cài đặt trên trang <code>/tools</code>.
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          onClick={() => openEditor(createBlankIndicator(), true)}
        >
          <Plus className="h-4 w-4" />
          Đăng Chỉ báo mới
        </Button>
      </div>

      {feedback && (
        <div
          className={`rounded-xl border px-4 py-3 text-xs sm:text-sm ${
            feedback.type === "ok"
              ? "border-success/40 bg-success-muted text-success"
              : "border-danger/40 bg-danger-muted text-danger"
          }`}
        >
          {feedback.text}
        </div>
      )}

      {/* Editor Modal / Panel */}
      {editing && (
        <Card className="border-gold/50 p-6 shadow-gold sm:p-8">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h2 className="font-heading text-xl font-bold text-ink-primary">
              {isNew
                ? "Đăng Chỉ báo Indicator mới"
                : `Chỉnh sửa: ${editing.name}`}
            </h2>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="rounded-lg p-1.5 text-ink-muted hover:bg-card-hover hover:text-ink-primary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="mt-6 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Tên Chỉ báo *
                </label>
                <input
                  type="text"
                  required
                  value={editing.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setEditing((prev) =>
                      prev
                        ? {
                            ...prev,
                            name,
                            slug: isNew ? slugifyVietnamese(name) : prev.slug,
                          }
                        : null
                    );
                  }}
                  placeholder="Ví dụ: Leo Smart OrderBlock Pro"
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm text-ink-primary focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Đường dẫn Slug *
                </label>
                <input
                  type="text"
                  required
                  readOnly={!isNew}
                  value={editing.slug}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev
                        ? { ...prev, slug: slugifyVietnamese(e.target.value) }
                        : null
                    )
                  }
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 font-mono text-xs text-gold-light focus:border-gold focus:outline-none read-only:opacity-70"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Nền tảng *
                </label>
                <select
                  value={editing.platform}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev
                        ? {
                            ...prev,
                            platform: e.target
                              .value as TradingIndicator["platform"],
                          }
                        : null
                    )
                  }
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm text-ink-primary focus:border-gold focus:outline-none"
                >
                  <option value="TradingView">TradingView</option>
                  <option value="MT5">MT5</option>
                  <option value="MT4/MT5">MT4/MT5</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Phân nhóm (Category)
                </label>
                <input
                  type="text"
                  value={editing.category}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, category: e.target.value } : null
                    )
                  }
                  placeholder="Market Structure & Sessions"
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm text-ink-primary focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Cặp tiền áp dụng (ngăn cách dấu phẩy)
                </label>
                <input
                  type="text"
                  value={marketsText}
                  onChange={(e) => setMarketsText(e.target.value)}
                  placeholder="XAUUSD, EURUSD, GBPUSD"
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm text-ink-primary focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Khung thời gian (ngăn cách dấu phẩy)
                </label>
                <input
                  type="text"
                  value={timeframesText}
                  onChange={(e) => setTimeframesText(e.target.value)}
                  placeholder="M5, M15, H1, H4"
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm text-ink-primary focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <ImageUploadField
              label="Ảnh Minh họa Giao diện Chỉ báo"
              value={editing.previewImage}
              onChange={(url) =>
                setEditing((prev) =>
                  prev ? { ...prev, previewImage: url } : null
                )
              }
              folder="indicators"
              helperText="Khung chuẩn 16:9 ngang (ví dụ 1280×720 hoặc 1920×1080) — tự động căn vừa khung chuẩn không viền."
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Mô tả tiêu đề phụ (Trang chi tiết)
                </label>
                <textarea
                  rows={2}
                  value={editing.subtitle}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, subtitle: e.target.value } : null
                    )
                  }
                  className="w-full rounded-input border border-line-strong bg-background-secondary p-3 text-sm text-ink-primary focus:border-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Tóm tắt ngắn ngoài thẻ danh sách
                </label>
                <textarea
                  rows={2}
                  value={editing.summary}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, summary: e.target.value } : null
                    )
                  }
                  className="w-full rounded-input border border-line-strong bg-background-secondary p-3 text-sm text-ink-primary focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Bài viết giới thiệu (Mỗi dòng là 1 đoạn văn)
                </label>
                <textarea
                  rows={5}
                  value={introText}
                  onChange={(e) => setIntroText(e.target.value)}
                  className="w-full rounded-input border border-line-strong bg-background-secondary p-3 text-sm text-ink-primary focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Danh sách tính năng nổi bật (Mỗi dòng 1 ý)
                </label>
                <textarea
                  rows={5}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  className="w-full rounded-input border border-line-strong bg-background-secondary p-3 text-sm text-ink-primary focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            {/* Showcase Gallery (4-6 Images between Intro & How It Works) */}
            <GalleryImagesField
              folder="indicators"
              titleValue={editing.showcaseTitle ?? ""}
              subtitleValue={editing.showcaseSubtitle ?? ""}
              items={editing.showcaseGallery ?? []}
              onChange={({
                showcaseTitle,
                showcaseSubtitle,
                showcaseGallery,
              }) =>
                setEditing((prev) =>
                  prev
                    ? {
                        ...prev,
                        showcaseTitle,
                        showcaseSubtitle,
                        showcaseGallery,
                      }
                    : null
                )
              }
            />

            {/* How It Works Repeater */}
            <div className="space-y-3 rounded-xl border border-line bg-background-secondary/60 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-light">
                  Nguyên lý hoạt động (How It Works)
                </span>
                <Button
                  type="button"
                  variant="subtle"
                  size="sm"
                  onClick={() =>
                    setEditing((prev) =>
                      prev
                        ? {
                            ...prev,
                            howItWorks: [
                              ...prev.howItWorks,
                              { title: "", description: "" },
                            ],
                          }
                        : null
                    )
                  }
                >
                  <Plus className="h-3.5 w-3.5" /> Thêm mục
                </Button>
              </div>
              {editing.howItWorks.map((hw, idx) => (
                <div
                  key={idx}
                  className="grid gap-2.5 rounded-lg border border-line bg-card p-3 sm:grid-cols-12"
                >
                  <input
                    type="text"
                    placeholder="Tiêu đề nguyên lý"
                    value={hw.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditing((prev) => {
                        if (!prev) return null;
                        const copy = [...prev.howItWorks];
                        copy[idx] = { ...copy[idx], title: val };
                        return { ...prev, howItWorks: copy };
                      });
                    }}
                    className="h-9 rounded-lg border border-line-strong bg-background-secondary px-3 text-xs text-ink-primary sm:col-span-4"
                  />
                  <input
                    type="text"
                    placeholder="Mô tả chi tiết"
                    value={hw.description}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditing((prev) => {
                        if (!prev) return null;
                        const copy = [...prev.howItWorks];
                        copy[idx] = { ...copy[idx], description: val };
                        return { ...prev, howItWorks: copy };
                      });
                    }}
                    className="h-9 rounded-lg border border-line-strong bg-background-secondary px-3 text-xs text-ink-primary sm:col-span-7"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setEditing((prev) =>
                        prev
                          ? {
                              ...prev,
                              howItWorks: prev.howItWorks.filter(
                                (_, i) => i !== idx
                              ),
                            }
                          : null
                      )
                    }
                    className="flex h-9 items-center justify-center rounded-lg text-danger hover:bg-danger-muted sm:col-span-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Parameters Repeater */}
            <div className="space-y-3 rounded-xl border border-line bg-background-secondary/60 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-light">
                  Bảng Thông số Kỹ thuật (Parameters)
                </span>
                <Button
                  type="button"
                  variant="subtle"
                  size="sm"
                  onClick={() =>
                    setEditing((prev) =>
                      prev
                        ? {
                            ...prev,
                            parameters: [
                              ...prev.parameters,
                              { label: "", value: "" },
                            ],
                          }
                        : null
                    )
                  }
                >
                  <Plus className="h-3.5 w-3.5" /> Thêm thông số
                </Button>
              </div>
              {editing.parameters.map((param, idx) => (
                <div key={idx} className="grid gap-2.5 sm:grid-cols-12">
                  <input
                    type="text"
                    placeholder="Tên thông số (VD: Tính chất tín hiệu)"
                    value={param.label}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditing((prev) => {
                        if (!prev) return null;
                        const copy = [...prev.parameters];
                        copy[idx] = { ...copy[idx], label: val };
                        return { ...prev, parameters: copy };
                      });
                    }}
                    className="h-9 rounded-lg border border-line-strong bg-card px-3 text-xs text-ink-primary sm:col-span-5"
                  />
                  <input
                    type="text"
                    placeholder="Giá trị (VD: Non-Repaint)"
                    value={param.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditing((prev) => {
                        if (!prev) return null;
                        const copy = [...prev.parameters];
                        copy[idx] = { ...copy[idx], value: val };
                        return { ...prev, parameters: copy };
                      });
                    }}
                    className="h-9 rounded-lg border border-line-strong bg-card px-3 text-xs text-ink-primary sm:col-span-6"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setEditing((prev) =>
                        prev
                          ? {
                              ...prev,
                              parameters: prev.parameters.filter(
                                (_, i) => i !== idx
                              ),
                            }
                          : null
                      )
                    }
                    className="flex h-9 items-center justify-center rounded-lg text-danger hover:bg-danger-muted sm:col-span-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Installation Steps Repeater */}
            <div className="space-y-3 rounded-xl border border-line bg-background-secondary/60 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-light">
                  Các bước Cài đặt (Installation Steps)
                </span>
                <Button
                  type="button"
                  variant="subtle"
                  size="sm"
                  onClick={() =>
                    setEditing((prev) =>
                      prev
                        ? {
                            ...prev,
                            installationSteps: [
                              ...prev.installationSteps,
                              {
                                step: prev.installationSteps.length + 1,
                                title: "",
                                description: "",
                              },
                            ],
                          }
                        : null
                    )
                  }
                >
                  <Plus className="h-3.5 w-3.5" /> Thêm bước
                </Button>
              </div>
              {editing.installationSteps.map((st, idx) => (
                <div key={idx} className="grid gap-2.5 sm:grid-cols-12">
                  <input
                    type="text"
                    placeholder={`Bước ${idx + 1}: Tiêu đề`}
                    value={st.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditing((prev) => {
                        if (!prev) return null;
                        const copy = [...prev.installationSteps];
                        copy[idx] = { ...copy[idx], title: val };
                        return { ...prev, installationSteps: copy };
                      });
                    }}
                    className="h-9 rounded-lg border border-line-strong bg-card px-3 text-xs text-ink-primary sm:col-span-4"
                  />
                  <input
                    type="text"
                    placeholder="Hướng dẫn thao tác"
                    value={st.description}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditing((prev) => {
                        if (!prev) return null;
                        const copy = [...prev.installationSteps];
                        copy[idx] = { ...copy[idx], description: val };
                        return { ...prev, installationSteps: copy };
                      });
                    }}
                    className="h-9 rounded-lg border border-line-strong bg-card px-3 text-xs text-ink-primary sm:col-span-7"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setEditing((prev) =>
                        prev
                          ? {
                              ...prev,
                              installationSteps: prev.installationSteps.filter(
                                (_, i) => i !== idx
                              ),
                            }
                          : null
                      )
                    }
                    className="flex h-9 items-center justify-center rounded-lg text-danger hover:bg-danger-muted sm:col-span-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                Lưu ý sử dụng &amp; Quản trị rủi ro (Mỗi dòng 1 ý)
              </label>
              <textarea
                rows={3}
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                className="w-full rounded-input border border-line-strong bg-background-secondary p-3 text-sm text-ink-primary focus:border-gold focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-ink-primary">
                <input
                  type="checkbox"
                  checked={editing.isPublished !== false}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, isPublished: e.target.checked } : null
                    )
                  }
                  className="h-4 w-4 accent-[#00C2FF]"
                />
                <span>Hiển thị công khai trên Website</span>
              </label>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setEditing(null)}
                >
                  Hủy
                </Button>
                <Button type="submit" variant="primary" disabled={saving}>
                  <Save className="h-4 w-4" />
                  {saving ? "Đang lưu..." : "Lưu & Xuất bản Chỉ báo"}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      )}

      {/* Items List */}
      <div className="grid gap-4">
        {items.map((item) => (
          <Card
            key={item.slug}
            className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
          >
            <div className="flex items-start gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.previewImage}
                alt={item.name}
                className="hidden h-16 w-28 shrink-0 rounded-lg border border-line bg-[#050D1A] object-cover sm:block"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="gold">{item.platform}</Badge>
                  {item.isPublished !== false ? (
                    <Badge variant="success">Đang hiển thị</Badge>
                  ) : (
                    <Badge variant="neutral">Đang ẩn</Badge>
                  )}
                  <span className="font-mono text-xs text-ink-muted">
                    /tools/indicators/{item.slug}
                  </span>
                </div>
                <h3 className="mt-1.5 font-heading text-lg font-bold text-ink-primary">
                  {item.name}
                </h3>
                <p className="mt-0.5 line-clamp-1 text-xs text-ink-secondary">
                  {item.summary}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/tools/indicators/${item.slug}`}
                target="_blank"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-background-secondary px-3 text-xs font-semibold text-ink-secondary hover:border-gold/45 hover:text-gold-light"
              >
                <span>Xem</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
              <Button
                type="button"
                variant="subtle"
                size="sm"
                onClick={() => handleTogglePublish(item)}
              >
                {item.isPublished !== false ? (
                  <>
                    <EyeOff className="h-3.5 w-3.5" /> Ẩn
                  </>
                ) : (
                  <>
                    <Eye className="h-3.5 w-3.5" /> Hiện
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => openEditor(item, false)}
              >
                <Edit3 className="h-3.5 w-3.5 text-gold-light" />
                Sửa
              </Button>
              <button
                type="button"
                onClick={() => handleDelete(item.slug, item.name)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-danger/30 bg-danger-muted text-danger hover:bg-danger/20"
                title="Xóa chỉ báo"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
