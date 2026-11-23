"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, Plus, Save, Trash2 } from "lucide-react";
import type { SitePagesContent } from "@/types";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { Tabs, type TabOption } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PAGE_TABS: TabOption[] = [
  { id: "home", label: "1. Trang chủ & Video Hero (/)" },
  { id: "backcom", label: "2. Trang Backcom (/backcom)" },
  { id: "brokers", label: "3. Trang Danh sách Sàn (/brokers)" },
];

export function PagesContentManager({
  initialContent,
}: {
  initialContent: SitePagesContent;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<string>("home");
  const [content, setContent] = React.useState<SitePagesContent>(() =>
    structuredClone(initialContent)
  );
  const [saving, setSaving] = React.useState(false);
  const [feedback, setFeedback] = React.useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    const normalized: SitePagesContent = {
      ...content,
      home: {
        ...content.home,
        promoVideo: {
          ...content.home.promoVideo,
          videoSrc: content.home.promoVideo.videoSrc?.trim() || null,
          posterSrc: content.home.promoVideo.posterSrc?.trim() || null,
        },
        faqs: content.home.faqs
          .filter((f) => f.question.trim())
          .map((f, idx) => ({ ...f, id: f.id || `faq-${idx + 1}` })),
      },
    };

    try {
      const res = await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalized),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        content?: SitePagesContent;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        setFeedback({
          type: "err",
          text: data.error || "Không thể lưu nội dung trang.",
        });
      } else {
        if (data.content) setContent(data.content);
        setFeedback({
          type: "ok",
          text: "Đã cập nhật nội dung, hình ảnh và video ra ngoài Website thành công!",
        });
        router.refresh();
      }
    } catch {
      setFeedback({ type: "err", text: "Lỗi kết nối tới máy chủ." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Badge variant="gold">PAGES &amp; MEDIA CMS</Badge>
          <h1 className="mt-2 font-heading text-2xl font-extrabold text-ink-primary sm:text-3xl">
            Quản lý Nội dung, Hình ảnh &amp; Video Các Trang
          </h1>
          <p className="mt-1 text-xs text-ink-secondary sm:text-sm">
            Chỉnh sửa tiêu đề, bài viết, tải Video Quảng cáo Dọc 9:16 và hình
            ảnh cho Trang chủ, Trang Backcom và Trang Sàn giao dịch.
          </p>
        </div>

        <Button type="submit" variant="primary" size="lg" disabled={saving}>
          <Save className="h-4 w-4" />
          {saving ? "Đang lưu thay đổi..." : "Lưu Tất Cả Thay Đổi"}
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

      <Tabs options={PAGE_TABS} value={activeTab} onChange={setActiveTab} />

      {/* ================================================================= */}
      {/* TAB 1: HOMEPAGE & HERO VIDEO                                      */}
      {/* ================================================================= */}
      {activeTab === "home" && (
        <div className="space-y-6">
          {/* 1A. Top Promo Bar */}
          <Card className="space-y-4 p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
              <h2 className="font-heading text-lg font-bold text-ink-primary">
                1. Thanh Thông báo Trên cùng (Top Promo Strip)
              </h2>
              <label className="inline-flex cursor-pointer items-center gap-2 text-xs font-semibold text-gold-light">
                <input
                  type="checkbox"
                  checked={content.home.promoBar.enabled}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        promoBar: {
                          ...prev.home.promoBar,
                          enabled: e.target.checked,
                        },
                      },
                    }))
                  }
                  className="h-4 w-4 accent-[#00C2FF]"
                />
                <span>Hiển thị thanh thông báo</span>
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                  Nhãn Badge
                </label>
                <input
                  type="text"
                  value={content.home.promoBar.badge}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        promoBar: {
                          ...prev.home.promoBar,
                          badge: e.target.value,
                        },
                      },
                    }))
                  }
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-xs text-ink-primary"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                  Nội dung thông báo
                </label>
                <input
                  type="text"
                  value={content.home.promoBar.text}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        promoBar: {
                          ...prev.home.promoBar,
                          text: e.target.value,
                        },
                      },
                    }))
                  }
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-xs text-ink-primary"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                  Đường dẫn nút bấm
                </label>
                <input
                  type="text"
                  value={content.home.promoBar.ctaHref}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        promoBar: {
                          ...prev.home.promoBar,
                          ctaHref: e.target.value,
                        },
                      },
                    }))
                  }
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 font-mono text-xs text-gold-light"
                />
              </div>
            </div>
          </Card>

          {/* 1B. Hero Left Copy */}
          <Card className="space-y-4 p-6">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h2 className="font-heading text-lg font-bold text-ink-primary">
                2. Khu vực Hero Trang chủ (Cột nội dung bên trái)
              </h2>
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1 text-xs font-semibold text-gold-light hover:underline"
              >
                Xem Trang chủ <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                  Nhãn nhỏ phía trên (Eyebrow)
                </label>
                <input
                  type="text"
                  value={content.home.hero.eyebrow}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        hero: { ...prev.home.hero, eyebrow: e.target.value },
                      },
                    }))
                  }
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-xs text-ink-primary"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                  Tiêu đề lớn — Dòng 1
                </label>
                <input
                  type="text"
                  value={content.home.hero.titleLine1}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        hero: { ...prev.home.hero, titleLine1: e.target.value },
                      },
                    }))
                  }
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm font-bold text-ink-primary"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                  Tiêu đề lớn — Dòng 2 (Phát sáng Xanh)
                </label>
                <input
                  type="text"
                  value={content.home.hero.titleLine2}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        hero: { ...prev.home.hero, titleLine2: e.target.value },
                      },
                    }))
                  }
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm font-bold text-gold-light"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                Đoạn mô tả dưới tiêu đề Hero
              </label>
              <textarea
                rows={2}
                value={content.home.hero.description}
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    home: {
                      ...prev.home,
                      hero: { ...prev.home.hero, description: e.target.value },
                    },
                  }))
                }
                className="w-full rounded-input border border-line-strong bg-background-secondary p-3 text-sm text-ink-primary"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                  Chữ Nút Chính
                </label>
                <input
                  type="text"
                  value={content.home.hero.primaryCtaLabel}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        hero: {
                          ...prev.home.hero,
                          primaryCtaLabel: e.target.value,
                        },
                      },
                    }))
                  }
                  className="h-9 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-xs text-ink-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                  Link Nút Chính
                </label>
                <input
                  type="text"
                  value={content.home.hero.primaryCtaHref}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        hero: {
                          ...prev.home.hero,
                          primaryCtaHref: e.target.value,
                        },
                      },
                    }))
                  }
                  className="h-9 w-full rounded-input border border-line-strong bg-background-secondary px-3 font-mono text-xs text-gold-light"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                  Chữ Nút Phụ
                </label>
                <input
                  type="text"
                  value={content.home.hero.secondaryCtaLabel}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        hero: {
                          ...prev.home.hero,
                          secondaryCtaLabel: e.target.value,
                        },
                      },
                    }))
                  }
                  className="h-9 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-xs text-ink-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                  Link Nút Phụ
                </label>
                <input
                  type="text"
                  value={content.home.hero.secondaryCtaHref}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        hero: {
                          ...prev.home.hero,
                          secondaryCtaHref: e.target.value,
                        },
                      },
                    }))
                  }
                  className="h-9 w-full rounded-input border border-line-strong bg-background-secondary px-3 font-mono text-xs text-gold-light"
                />
              </div>
            </div>

            {/* 4 Hero Stats */}
            <div>
              <span className="mb-2 block text-xs font-semibold text-ink-secondary">
                4 Ô Chỉ số Dưới Hero
              </span>
              <div className="grid gap-3 sm:grid-cols-4">
                {content.home.hero.stats.map((st, idx) => (
                  <div
                    key={idx}
                    className="space-y-1.5 rounded-xl border border-line bg-background-secondary p-3"
                  >
                    <input
                      type="text"
                      value={st.value}
                      onChange={(e) => {
                        const val = e.target.value;
                        setContent((prev) => {
                          const nextStats = [...prev.home.hero.stats];
                          nextStats[idx] = { ...nextStats[idx], value: val };
                          return {
                            ...prev,
                            home: {
                              ...prev.home,
                              hero: { ...prev.home.hero, stats: nextStats },
                            },
                          };
                        });
                      }}
                      placeholder="Giá trị (VD: 5)"
                      className="h-8 w-full rounded border border-line-strong bg-card px-2.5 text-xs font-bold text-gold-light"
                    />
                    <input
                      type="text"
                      value={st.label}
                      onChange={(e) => {
                        const val = e.target.value;
                        setContent((prev) => {
                          const nextStats = [...prev.home.hero.stats];
                          nextStats[idx] = { ...nextStats[idx], label: val };
                          return {
                            ...prev,
                            home: {
                              ...prev.home,
                              hero: { ...prev.home.hero, stats: nextStats },
                            },
                          };
                        });
                      }}
                      placeholder="Nhãn dưới"
                      className="h-8 w-full rounded border border-line-strong bg-card px-2.5 text-[11px] text-ink-secondary"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* 1C. Vertical Promo Video 9:16 */}
          <Card className="space-y-4 border-gold/45 p-6">
            <h2 className="border-b border-line pb-3 font-heading text-lg font-bold text-gold-light">
              3. Video Quảng cáo Dọc 9:16 trên Hero (Cột bên phải)
            </h2>

            <ImageUploadField
              label="Tệp Video Quảng cáo Dọc (.mp4 / .webm) — Tối đa 50MB"
              value={content.home.promoVideo.videoSrc ?? ""}
              onChange={(url) =>
                setContent((prev) => ({
                  ...prev,
                  home: {
                    ...prev.home,
                    promoVideo: {
                      ...prev.home.promoVideo,
                      videoSrc: url || null,
                    },
                  },
                }))
              }
              folder="videos"
              acceptVideo
              helperText="Tải video dọc tỷ lệ 9:16 (.mp4 hoặc .webm) từ máy tính lên hoặc dán link URL. Để trống để hiện khung chờ mặc định."
            />

            <ImageUploadField
              label="Ảnh Bìa Chờ Video (Poster Image — Tùy chọn)"
              value={content.home.promoVideo.posterSrc ?? ""}
              onChange={(url) =>
                setContent((prev) => ({
                  ...prev,
                  home: {
                    ...prev.home,
                    promoVideo: {
                      ...prev.home.promoVideo,
                      posterSrc: url || null,
                    },
                  },
                }))
              }
              folder="pages"
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                  Nhãn góc Video
                </label>
                <input
                  type="text"
                  value={content.home.promoVideo.badge}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        promoVideo: {
                          ...prev.home.promoVideo,
                          badge: e.target.value,
                        },
                      },
                    }))
                  }
                  className="h-9 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-xs text-ink-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                  Tiêu đề chân Video
                </label>
                <input
                  type="text"
                  value={content.home.promoVideo.title}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        promoVideo: {
                          ...prev.home.promoVideo,
                          title: e.target.value,
                        },
                      },
                    }))
                  }
                  className="h-9 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-xs text-ink-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                  Thẻ nổi cạnh Video (Tiêu đề)
                </label>
                <input
                  type="text"
                  value={content.home.hero.floatingTagTitle}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        hero: {
                          ...prev.home.hero,
                          floatingTagTitle: e.target.value,
                        },
                      },
                    }))
                  }
                  className="h-9 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-xs text-ink-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                  Thẻ nổi cạnh Video (Dòng phụ)
                </label>
                <input
                  type="text"
                  value={content.home.hero.floatingTagSub}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        hero: {
                          ...prev.home.hero,
                          floatingTagSub: e.target.value,
                        },
                      },
                    }))
                  }
                  className="h-9 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-xs text-gold-light"
                />
              </div>
            </div>
          </Card>

          {/* 1D. Rebate Loop & Community */}
          <Card className="space-y-4 p-6">
            <h2 className="border-b border-line pb-3 font-heading text-lg font-bold text-ink-primary">
              4. Khối &ldquo;Backcom là gì?&rdquo; &amp; Khu vực Cộng đồng Zalo
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                  Tiêu đề khối Rebate Loop
                </label>
                <input
                  type="text"
                  value={content.home.rebateLoop.title}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        rebateLoop: {
                          ...prev.home.rebateLoop,
                          title: e.target.value,
                        },
                      },
                    }))
                  }
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm text-ink-primary"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                  Link Nhóm Zalo Cộng đồng
                </label>
                <input
                  type="url"
                  value={content.home.community.zaloGroupUrl}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        community: {
                          ...prev.home.community,
                          zaloGroupUrl: e.target.value,
                        },
                      },
                    }))
                  }
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 font-mono text-xs text-gold-light"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                  Đoạn giải thích 1 (Rebate Loop)
                </label>
                <textarea
                  rows={3}
                  value={content.home.rebateLoop.paragraph1}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        rebateLoop: {
                          ...prev.home.rebateLoop,
                          paragraph1: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full rounded-input border border-line-strong bg-background-secondary p-3 text-xs text-ink-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                  Đoạn giải thích 2 (Rebate Loop)
                </label>
                <textarea
                  rows={3}
                  value={content.home.rebateLoop.paragraph2}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      home: {
                        ...prev.home,
                        rebateLoop: {
                          ...prev.home.rebateLoop,
                          paragraph2: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full rounded-input border border-line-strong bg-background-secondary p-3 text-xs text-ink-primary"
                />
              </div>
            </div>

            <ImageUploadField
              label="Ảnh Minh họa Khu vực Cộng đồng (Community Banner)"
              value={content.home.community.imageUrl}
              onChange={(url) =>
                setContent((prev) => ({
                  ...prev,
                  home: {
                    ...prev.home,
                    community: { ...prev.home.community, imageUrl: url },
                  },
                }))
              }
              folder="pages"
            />
          </Card>

          {/* 1E. Global FAQs */}
          <Card className="space-y-3 p-6">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h2 className="font-heading text-lg font-bold text-ink-primary">
                5. Danh sách Câu hỏi Thường gặp (FAQ Trang chủ &amp; /faq)
              </h2>
              <Button
                type="button"
                variant="subtle"
                size="sm"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    home: {
                      ...prev.home,
                      faqs: [
                        ...prev.home.faqs,
                        {
                          id: `faq-${Date.now()}`,
                          category: "backcom",
                          question: "",
                          answer: "",
                        },
                      ],
                    },
                  }))
                }
              >
                <Plus className="h-3.5 w-3.5" /> Thêm câu hỏi
              </Button>
            </div>

            {content.home.faqs.map((faq, idx) => (
              <div
                key={faq.id || idx}
                className="space-y-2 rounded-xl border border-line bg-background-secondary p-3.5"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Câu hỏi"
                    value={faq.question}
                    onChange={(e) => {
                      const val = e.target.value;
                      setContent((prev) => {
                        const copy = [...prev.home.faqs];
                        copy[idx] = { ...copy[idx], question: val };
                        return { ...prev, home: { ...prev.home, faqs: copy } };
                      });
                    }}
                    className="h-9 flex-1 rounded-lg border border-line-strong bg-card px-3 text-xs font-bold text-ink-primary"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setContent((prev) => ({
                        ...prev,
                        home: {
                          ...prev.home,
                          faqs: prev.home.faqs.filter((_, i) => i !== idx),
                        },
                      }))
                    }
                    className="rounded-lg p-2 text-danger hover:bg-danger-muted"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <textarea
                  rows={2}
                  placeholder="Câu trả lời"
                  value={faq.answer}
                  onChange={(e) => {
                    const val = e.target.value;
                    setContent((prev) => {
                      const copy = [...prev.home.faqs];
                      copy[idx] = { ...copy[idx], answer: val };
                      return { ...prev, home: { ...prev.home, faqs: copy } };
                    });
                  }}
                  className="w-full rounded-lg border border-line-strong bg-card p-2.5 text-xs text-ink-secondary"
                />
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* ================================================================= */}
      {/* TAB 2: BACKCOM PAGE & WHAT IS BACKCOM                             */}
      {/* ================================================================= */}
      {activeTab === "backcom" && (
        <div className="space-y-6">
          <Card className="space-y-4 p-6">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h2 className="font-heading text-lg font-bold text-ink-primary">
                1. Hero &amp; Giải thích Dịch vụ Backcom (/backcom)
              </h2>
              <Link
                href="/backcom"
                target="_blank"
                className="inline-flex items-center gap-1 text-xs font-semibold text-gold-light hover:underline"
              >
                Xem trang /backcom <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                  Tiêu đề Hero (Phần chữ trắng)
                </label>
                <input
                  type="text"
                  value={content.backcom.hero.title}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      backcom: {
                        ...prev.backcom,
                        hero: { ...prev.backcom.hero, title: e.target.value },
                      },
                    }))
                  }
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm text-ink-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                  Cụm từ nhấn màu xanh (Highlight)
                </label>
                <input
                  type="text"
                  value={content.backcom.hero.highlightWord}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      backcom: {
                        ...prev.backcom,
                        hero: {
                          ...prev.backcom.hero,
                          highlightWord: e.target.value,
                        },
                      },
                    }))
                  }
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm font-bold text-gold-light"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                Mô tả mở đầu Hero (/backcom)
              </label>
              <textarea
                rows={3}
                value={content.backcom.hero.description}
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    backcom: {
                      ...prev.backcom,
                      hero: {
                        ...prev.backcom.hero,
                        description: e.target.value,
                      },
                    },
                  }))
                }
                className="w-full rounded-input border border-line-strong bg-background-secondary p-3 text-sm text-ink-primary"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                  Giải thích Hoa hồng IB — Đoạn 1
                </label>
                <textarea
                  rows={3}
                  value={content.backcom.explanation.paragraph1}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      backcom: {
                        ...prev.backcom,
                        explanation: {
                          ...prev.backcom.explanation,
                          paragraph1: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full rounded-input border border-line-strong bg-background-secondary p-3 text-xs text-ink-primary"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                  Giải thích Hoa hồng IB — Đoạn 2
                </label>
                <textarea
                  rows={3}
                  value={content.backcom.explanation.paragraph2}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      backcom: {
                        ...prev.backcom,
                        explanation: {
                          ...prev.backcom.explanation,
                          paragraph2: e.target.value,
                        },
                      },
                    }))
                  }
                  className="w-full rounded-input border border-line-strong bg-background-secondary p-3 text-xs text-ink-primary"
                />
              </div>
            </div>

            {/* Benefits Repeater */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-gold-light">
                  Danh sách Lợi ích của Backcom
                </span>
                <Button
                  type="button"
                  variant="subtle"
                  size="sm"
                  onClick={() =>
                    setContent((prev) => ({
                      ...prev,
                      backcom: {
                        ...prev.backcom,
                        benefits: [
                          ...prev.backcom.benefits,
                          { title: "", description: "" },
                        ],
                      },
                    }))
                  }
                >
                  <Plus className="h-3.5 w-3.5" /> Thêm lợi ích
                </Button>
              </div>
              {content.backcom.benefits.map((b, idx) => (
                <div key={idx} className="grid gap-2 sm:grid-cols-12">
                  <input
                    type="text"
                    placeholder="Tiêu đề lợi ích"
                    value={b.title}
                    onChange={(e) => {
                      const val = e.target.value;
                      setContent((prev) => {
                        const copy = [...prev.backcom.benefits];
                        copy[idx] = { ...copy[idx], title: val };
                        return {
                          ...prev,
                          backcom: { ...prev.backcom, benefits: copy },
                        };
                      });
                    }}
                    className="h-9 rounded border border-line-strong bg-background-secondary px-3 text-xs font-bold text-ink-primary sm:col-span-4"
                  />
                  <input
                    type="text"
                    placeholder="Mô tả chi tiết"
                    value={b.description}
                    onChange={(e) => {
                      const val = e.target.value;
                      setContent((prev) => {
                        const copy = [...prev.backcom.benefits];
                        copy[idx] = { ...copy[idx], description: val };
                        return {
                          ...prev,
                          backcom: { ...prev.backcom, benefits: copy },
                        };
                      });
                    }}
                    className="h-9 rounded border border-line-strong bg-background-secondary px-3 text-xs text-ink-secondary sm:col-span-7"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setContent((prev) => ({
                        ...prev,
                        backcom: {
                          ...prev.backcom,
                          benefits: prev.backcom.benefits.filter(
                            (_, i) => i !== idx
                          ),
                        },
                      }))
                    }
                    className="flex h-9 items-center justify-center rounded text-danger hover:bg-danger-muted sm:col-span-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Deep Guide /backcom/what-is-backcom */}
          <Card className="space-y-4 p-6">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h2 className="font-heading text-lg font-bold text-ink-primary">
                2. Bài viết Chuyên sâu (/backcom/what-is-backcom)
              </h2>
              <Button
                type="button"
                variant="subtle"
                size="sm"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    backcom: {
                      ...prev.backcom,
                      deepGuide: {
                        ...prev.backcom.deepGuide,
                        sections: [
                          ...prev.backcom.deepGuide.sections,
                          { heading: "", content: "" },
                        ],
                      },
                    },
                  }))
                }
              >
                <Plus className="h-3.5 w-3.5" /> Thêm mục nội dung
              </Button>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                Tiêu đề bài viết chuyên sâu
              </label>
              <input
                type="text"
                value={content.backcom.deepGuide.title}
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    backcom: {
                      ...prev.backcom,
                      deepGuide: {
                        ...prev.backcom.deepGuide,
                        title: e.target.value,
                      },
                    },
                  }))
                }
                className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm font-bold text-ink-primary"
              />
            </div>

            {content.backcom.deepGuide.sections.map((sec, idx) => (
              <div
                key={idx}
                className="space-y-2 rounded-xl border border-line bg-background-secondary p-4"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Tiêu đề mục (VD: 1. Forex Rebate là gì?)"
                    value={sec.heading}
                    onChange={(e) => {
                      const val = e.target.value;
                      setContent((prev) => {
                        const copy = [...prev.backcom.deepGuide.sections];
                        copy[idx] = { ...copy[idx], heading: val };
                        return {
                          ...prev,
                          backcom: {
                            ...prev.backcom,
                            deepGuide: {
                              ...prev.backcom.deepGuide,
                              sections: copy,
                            },
                          },
                        };
                      });
                    }}
                    className="h-9 flex-1 rounded border border-line-strong bg-card px-3 text-xs font-bold text-gold-light"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setContent((prev) => ({
                        ...prev,
                        backcom: {
                          ...prev.backcom,
                          deepGuide: {
                            ...prev.backcom.deepGuide,
                            sections: prev.backcom.deepGuide.sections.filter(
                              (_, i) => i !== idx
                            ),
                          },
                        },
                      }))
                    }
                    className="rounded p-2 text-danger hover:bg-danger-muted"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <textarea
                  rows={4}
                  placeholder="Nội dung chi tiết (xuống dòng kép để tách đoạn)"
                  value={sec.content}
                  onChange={(e) => {
                    const val = e.target.value;
                    setContent((prev) => {
                      const copy = [...prev.backcom.deepGuide.sections];
                      copy[idx] = { ...copy[idx], content: val };
                      return {
                        ...prev,
                        backcom: {
                          ...prev.backcom,
                          deepGuide: {
                            ...prev.backcom.deepGuide,
                            sections: copy,
                          },
                        },
                      };
                    });
                  }}
                  className="w-full rounded border border-line-strong bg-card p-3 text-xs leading-relaxed text-ink-primary"
                />
              </div>
            ))}
          </Card>
        </div>
      )}

      {/* ================================================================= */}
      {/* TAB 3: BROKERS LISTING LANDING PAGE (/brokers)                    */}
      {/* ================================================================= */}
      {activeTab === "brokers" && (
        <Card className="space-y-5 p-6">
          <div className="flex items-center justify-between border-b border-line pb-3">
            <h2 className="font-heading text-lg font-bold text-ink-primary">
              Nội dung Trang Tổng hợp Sàn giao dịch (/brokers)
            </h2>
            <Link
              href="/admin/brokers"
              className="text-xs font-bold text-gold-light hover:underline"
            >
              Chuyển sang Thêm/Xóa/Sửa từng Sàn chi tiết →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                Nhãn Badge Hero
              </label>
              <input
                type="text"
                value={content.brokersPage.hero.badge}
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    brokersPage: {
                      ...prev.brokersPage,
                      hero: { ...prev.brokersPage.hero, badge: e.target.value },
                    },
                  }))
                }
                className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-xs text-ink-primary"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                Tiêu đề chính trang /brokers
              </label>
              <input
                type="text"
                value={content.brokersPage.hero.title}
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    brokersPage: {
                      ...prev.brokersPage,
                      hero: { ...prev.brokersPage.hero, title: e.target.value },
                    },
                  }))
                }
                className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm font-bold text-ink-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-ink-secondary">
              Mô tả giới thiệu đầu trang /brokers
            </label>
            <textarea
              rows={3}
              value={content.brokersPage.hero.description}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  brokersPage: {
                    ...prev.brokersPage,
                    hero: {
                      ...prev.brokersPage.hero,
                      description: e.target.value,
                    },
                  },
                }))
              }
              className="w-full rounded-input border border-line-strong bg-background-secondary p-3 text-sm text-ink-primary"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                Tiêu đề Bảng So sánh Sàn bên dưới
              </label>
              <input
                type="text"
                value={content.brokersPage.comparisonTable.title}
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    brokersPage: {
                      ...prev.brokersPage,
                      comparisonTable: {
                        ...prev.brokersPage.comparisonTable,
                        title: e.target.value,
                      },
                    },
                  }))
                }
                className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm text-ink-primary"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-ink-secondary">
                Mô tả phụ Bảng So sánh Sàn
              </label>
              <input
                type="text"
                value={content.brokersPage.comparisonTable.subtitle}
                onChange={(e) =>
                  setContent((prev) => ({
                    ...prev,
                    brokersPage: {
                      ...prev.brokersPage,
                      comparisonTable: {
                        ...prev.brokersPage.comparisonTable,
                        subtitle: e.target.value,
                      },
                    },
                  }))
                }
                className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-xs text-ink-primary"
              />
            </div>
          </div>
        </Card>
      )}

      <div className="flex justify-end border-t border-line pt-4">
        <Button type="submit" variant="primary" size="lg" disabled={saving}>
          <Save className="h-4 w-4" />
          {saving ? "Đang lưu..." : "Lưu Tất Cả Thay Đổi"}
        </Button>
      </div>
    </form>
  );
}
