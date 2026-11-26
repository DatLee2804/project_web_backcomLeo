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
import type { TradingRobot } from "@/types";
import { GalleryImagesField } from "@/components/admin/gallery-images-field";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { slugifyVietnamese } from "@/lib/utils";

function createBlankRobot(): TradingRobot {
  return {
    slug: "",
    name: "",
    shortName: "",
    subtitle: "",
    badge: "MT5 EXPERT ADVISOR",
    status: "confirmed",
    isPublished: true,
    sortOrder: 10,
    heroImage: "/images/robots/amix-gold-cent-preview.svg",
    supportedPlatforms: ["MetaTrader 5 (MT5)", "Windows VPS 24/5"],
    targetSymbols: ["XAUUSDc", "XAUUSD"],
    recommendedAccount: "Tài khoản Cent hoặc Standard theo cấu hình",
    introduction: [""],
    strategyPoints: [{ title: "", description: "" }],
    features: [{ title: "", description: "" }],
    accountRequirements: [
      { label: "Nền tảng bắt buộc", value: "MetaTrader 5 (MT5)" },
      { label: "Hạ tầng treo máy", value: "VPS Windows 24/5" },
    ],
    riskNotes: [
      "Giao dịch tự động bằng Bot (EA) luôn tiềm ẩn rủi ro biến động thị trường; không cam kết lợi nhuận cố định.",
    ],
    installationSteps: [
      {
        step: 1,
        title: "Chuẩn bị tài khoản & VPS",
        description: "Mở tài khoản đối tác Backcom Mr Leo và đăng nhập trên VPS.",
      },
      {
        step: 2,
        title: "Nhận bản quyền & Cài đặt vào MQL5/Experts",
        description: "Gửi ID tài khoản MT5 để kích hoạt và nạp file preset.",
      },
    ],
    performancePlaceholderNote:
      "Báo cáo hiệu suất kiểm chứng độc lập đang được cập nhật. Chúng tôi không hiển thị số liệu backtest giả định.",
    faqs: [
      {
        id: "bot-faq-1",
        question: "Làm thế nào để nhận quyền sử dụng con Bot này?",
        answer:
          "Vui lòng liên hệ đội ngũ Backcom Mr Leo kèm ID tài khoản sàn đối tác để được kiểm tra tương thích và hỗ trợ cài đặt.",
      },
    ],
  };
}

export function RobotsManager({
  initialItems,
}: {
  initialItems: TradingRobot[];
}) {
  const router = useRouter();
  const [items, setItems] = React.useState<TradingRobot[]>(initialItems);
  const [editing, setEditing] = React.useState<TradingRobot | null>(null);
  const [isNew, setIsNew] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [feedback, setFeedback] = React.useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);

  const [introText, setIntroText] = React.useState("");
  const [riskText, setRiskText] = React.useState("");
  const [platformsText, setPlatformsText] = React.useState("");
  const [symbolsText, setSymbolsText] = React.useState("");

  const openEditor = (bot: TradingRobot, createMode: boolean) => {
    setEditing(structuredClone(bot));
    setIsNew(createMode);
    setIntroText(bot.introduction.join("\n\n"));
    setRiskText(bot.riskNotes.join("\n"));
    setPlatformsText(bot.supportedPlatforms.join(", "));
    setSymbolsText(bot.targetSymbols.join(", "));
    setFeedback(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    const finalSlug = editing.slug.trim() || slugifyVietnamese(editing.name);
    const payload: TradingRobot = {
      ...editing,
      slug: finalSlug,
      shortName: editing.shortName.trim() || editing.name.trim(),
      introduction: introText
        .split(/\n{2,}|\n/)
        .map((s) => s.trim())
        .filter(Boolean),
      riskNotes: riskText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      supportedPlatforms: platformsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      targetSymbols: symbolsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      showcaseGallery: (editing.showcaseGallery ?? []).filter((g) =>
        Boolean(g.url?.trim())
      ),
      strategyPoints: editing.strategyPoints.filter((s) => s.title.trim()),
      features: editing.features.filter((f) => f.title.trim()),
      accountRequirements: editing.accountRequirements.filter((r) =>
        r.label.trim()
      ),
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
      const res = await fetch("/api/admin/robots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        item?: TradingRobot;
        error?: string;
      };

      if (!res.ok || !data.item) {
        setFeedback({ type: "err", text: data.error || "Không thể lưu Bot." });
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
          text: `Đã lưu và xuất bản Bot "${data.item.name}" thành công!`,
        });
        router.refresh();
      }
    } catch {
      setFeedback({ type: "err", text: "Lỗi kết nối máy chủ." });
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (bot: TradingRobot) => {
    const updated: TradingRobot = {
      ...bot,
      isPublished: bot.isPublished === false ? true : false,
    };
    const res = await fetch("/api/admin/robots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) {
      setItems((prev) => prev.map((x) => (x.slug === bot.slug ? updated : x)));
      router.refresh();
    }
  };

  const handleDelete = async (slug: string, name: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa Bot "${name}" không?`)) {
      return;
    }
    const res = await fetch(
      `/api/admin/robots?slug=${encodeURIComponent(slug)}`,
      { method: "DELETE" }
    );
    if (res.ok) {
      setItems((prev) => prev.filter((x) => x.slug !== slug));
      setFeedback({ type: "ok", text: `Đã xóa Bot "${name}".` });
      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Badge variant="gold">BOT TRADING CMS</Badge>
          <h1 className="mt-2 font-heading text-2xl font-extrabold text-ink-primary sm:text-3xl">
            Quản lý Sản phẩm Bot Trading (EA)
          </h1>
          <p className="mt-1 text-xs text-ink-secondary sm:text-sm">
            Thêm các con Bot mới vào trang <code>/robots</code> và tự động khởi
            tạo trang chi tiết <code>/robots/[slug]</code>.
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          onClick={() => openEditor(createBlankRobot(), true)}
        >
          <Plus className="h-4 w-4" />
          Đăng Bot mới
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

      {editing && (
        <Card className="border-gold/50 p-6 shadow-gold sm:p-8">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <h2 className="font-heading text-xl font-bold text-ink-primary">
              {isNew ? "Đăng Bot Trading mới" : `Chỉnh sửa: ${editing.name}`}
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
                  Tên đầy đủ của Bot *
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
                  placeholder="AMIX TRADE – GOLD CENT BOT"
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm text-ink-primary focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Tên rút gọn
                </label>
                <input
                  type="text"
                  value={editing.shortName}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, shortName: e.target.value } : null
                    )
                  }
                  placeholder="Amix Gold Cent Bot"
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
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Nhãn Badge nổi bật
                </label>
                <input
                  type="text"
                  value={editing.badge}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, badge: e.target.value } : null
                    )
                  }
                  placeholder="MT5 EXPERT ADVISOR"
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm text-ink-primary focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Nền tảng hỗ trợ (phân cách dấu phẩy)
                </label>
                <input
                  type="text"
                  value={platformsText}
                  onChange={(e) => setPlatformsText(e.target.value)}
                  placeholder="MetaTrader 5 (MT5), Windows VPS 24/5"
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm text-ink-primary focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Mã giao dịch mục tiêu (phân cách dấu phẩy)
                </label>
                <input
                  type="text"
                  value={symbolsText}
                  onChange={(e) => setSymbolsText(e.target.value)}
                  placeholder="XAUUSDc, XAUUSD"
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm text-ink-primary focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <ImageUploadField
              label="Ảnh Giao diện Minh họa Bot (Hero Image)"
              value={editing.heroImage}
              onChange={(url) =>
                setEditing((prev) => (prev ? { ...prev, heroImage: url } : null))
              }
              folder="robots"
              helperText="Tải ảnh chụp giao diện Bot trên MT5 từ máy tính hoặc dán link URL."
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Mô tả tiêu đề phụ (Subtitle)
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
                  Khuyến nghị loại tài khoản
                </label>
                <textarea
                  rows={2}
                  value={editing.recommendedAccount}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev
                        ? { ...prev, recommendedAccount: e.target.value }
                        : null
                    )
                  }
                  className="w-full rounded-input border border-line-strong bg-background-secondary p-3 text-sm text-ink-primary focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Giới thiệu tổng quan (Mỗi dòng 1 đoạn văn)
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
                  Cảnh báo rủi ro vận hành Bot (Mỗi dòng 1 ý)
                </label>
                <textarea
                  rows={5}
                  value={riskText}
                  onChange={(e) => setRiskText(e.target.value)}
                  className="w-full rounded-input border border-line-strong bg-background-secondary p-3 text-sm text-ink-primary focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            {/* Showcase Gallery (4-6 Images between Intro & Strategy Points) */}
            <GalleryImagesField
              folder="robots"
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

            {/* Strategy Points Repeater */}
            <div className="space-y-3 rounded-xl border border-line bg-background-secondary/60 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-light">
                  Nguyên lý Chiến lược (Strategy Points)
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
                            strategyPoints: [
                              ...prev.strategyPoints,
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
              {editing.strategyPoints.map((sp, idx) => (
                <div key={idx} className="grid gap-2.5 sm:grid-cols-12">
                  <input
                    type="text"
                    placeholder="Tiêu đề chiến lược"
                    value={sp.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditing((prev) => {
                        if (!prev) return null;
                        const copy = [...prev.strategyPoints];
                        copy[idx] = { ...copy[idx], title: val };
                        return { ...prev, strategyPoints: copy };
                      });
                    }}
                    className="h-9 rounded-lg border border-line-strong bg-card px-3 text-xs text-ink-primary sm:col-span-4"
                  />
                  <input
                    type="text"
                    placeholder="Giải thích cơ chế"
                    value={sp.description}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditing((prev) => {
                        if (!prev) return null;
                        const copy = [...prev.strategyPoints];
                        copy[idx] = { ...copy[idx], description: val };
                        return { ...prev, strategyPoints: copy };
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
                              strategyPoints: prev.strategyPoints.filter(
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

            {/* Features Repeater */}
            <div className="space-y-3 rounded-xl border border-line bg-background-secondary/60 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-light">
                  Tính năng nổi bật ( hiển thị ngoài danh sách &amp; chi tiết )
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
                            features: [
                              ...prev.features,
                              { title: "", description: "" },
                            ],
                          }
                        : null
                    )
                  }
                >
                  <Plus className="h-3.5 w-3.5" /> Thêm tính năng
                </Button>
              </div>
              {editing.features.map((ft, idx) => (
                <div key={idx} className="grid gap-2.5 sm:grid-cols-12">
                  <input
                    type="text"
                    placeholder="Tên tính năng"
                    value={ft.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditing((prev) => {
                        if (!prev) return null;
                        const copy = [...prev.features];
                        copy[idx] = { ...copy[idx], title: val };
                        return { ...prev, features: copy };
                      });
                    }}
                    className="h-9 rounded-lg border border-line-strong bg-card px-3 text-xs text-ink-primary sm:col-span-4"
                  />
                  <input
                    type="text"
                    placeholder="Mô tả ngắn"
                    value={ft.description}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditing((prev) => {
                        if (!prev) return null;
                        const copy = [...prev.features];
                        copy[idx] = { ...copy[idx], description: val };
                        return { ...prev, features: copy };
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
                              features: prev.features.filter(
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

            {/* Account Requirements Repeater */}
            <div className="space-y-3 rounded-xl border border-line bg-background-secondary/60 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-light">
                  Yêu cầu cấu hình tài khoản (Account Requirements)
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
                            accountRequirements: [
                              ...prev.accountRequirements,
                              { label: "", value: "" },
                            ],
                          }
                        : null
                    )
                  }
                >
                  <Plus className="h-3.5 w-3.5" /> Thêm dòng
                </Button>
              </div>
              {editing.accountRequirements.map((req, idx) => (
                <div key={idx} className="grid gap-2.5 sm:grid-cols-12">
                  <input
                    type="text"
                    placeholder="Hạng mục (VD: Vốn tối thiểu)"
                    value={req.label}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditing((prev) => {
                        if (!prev) return null;
                        const copy = [...prev.accountRequirements];
                        copy[idx] = { ...copy[idx], label: val };
                        return { ...prev, accountRequirements: copy };
                      });
                    }}
                    className="h-9 rounded-lg border border-line-strong bg-card px-3 text-xs text-ink-primary sm:col-span-5"
                  />
                  <input
                    type="text"
                    placeholder="Giá trị yêu cầu"
                    value={req.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditing((prev) => {
                        if (!prev) return null;
                        const copy = [...prev.accountRequirements];
                        copy[idx] = { ...copy[idx], value: val };
                        return { ...prev, accountRequirements: copy };
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
                              accountRequirements:
                                prev.accountRequirements.filter(
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
                Ghi chú khu vực Báo cáo Hiệu suất (Performance Report)
              </label>
              <textarea
                rows={2}
                value={editing.performancePlaceholderNote}
                onChange={(e) =>
                  setEditing((prev) =>
                    prev
                      ? { ...prev, performancePlaceholderNote: e.target.value }
                      : null
                  )
                }
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
                <span>Hiển thị công khai trên trang Bot Trading</span>
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
                  {saving ? "Đang lưu..." : "Lưu & Xuất bản Bot"}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      )}

      {/* Bot List */}
      <div className="grid gap-4">
        {items.map((bot) => (
          <Card
            key={bot.slug}
            className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
          >
            <div className="flex items-start gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bot.heroImage}
                alt={bot.name}
                className="hidden h-16 w-28 shrink-0 rounded-lg border border-line bg-[#050D1A] object-cover sm:block"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="featured">{bot.badge}</Badge>
                  {bot.isPublished !== false ? (
                    <Badge variant="success">Đang hiển thị</Badge>
                  ) : (
                    <Badge variant="neutral">Đang ẩn</Badge>
                  )}
                  <span className="font-mono text-xs text-ink-muted">
                    /robots/{bot.slug}
                  </span>
                </div>
                <h3 className="mt-1.5 font-heading text-lg font-bold text-ink-primary">
                  {bot.name}
                </h3>
                <p className="mt-0.5 line-clamp-1 text-xs text-ink-secondary">
                  {bot.subtitle}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/robots/${bot.slug}`}
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
                onClick={() => handleTogglePublish(bot)}
              >
                {bot.isPublished !== false ? (
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
                onClick={() => openEditor(bot, false)}
              >
                <Edit3 className="h-3.5 w-3.5 text-gold-light" />
                Sửa
              </Button>
              <button
                type="button"
                onClick={() => handleDelete(bot.slug, bot.name)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-danger/30 bg-danger-muted text-danger hover:bg-danger/20"
                title="Xóa Bot"
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
