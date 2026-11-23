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
import type { MasterTrader } from "@/types";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { slugifyVietnamese } from "@/lib/utils";

function createBlankMaster(): MasterTrader {
  return {
    slug: "",
    name: "",
    code: "LEO-M01",
    avatar: "/images/masters/master-01.svg",
    isDemo: false,
    isPublished: true,
    sortOrder: 1,
    strategyName: "XAUUSD Trend & Liquidity",
    primaryMarkets: ["XAUUSD", "EURUSD"],
    roiPct: 35.0,
    maxDrawdownPct: 12.0,
    winRatePct: 65.0,
    tradingDurationMonths: 6,
    tradingDurationLabel: "6 tháng",
    riskLevel: "Moderate",
    riskScore: 4,
    minCopyBalanceUsd: 500,
    summary: "",
    strategyDescription: [""],
    riskManagementRules: [
      "Luôn đặt Stop Loss cố định trên mọi vị thế",
      "Không giữ lệnh lớn qua tin tức lãi suất FOMC / Non-Farm",
    ],
    equityCurve: [
      { period: "T1", equity: 10000, balance: 10000, drawdown: 0 },
      { period: "T2", equity: 10800, balance: 10850, drawdown: -2.5 },
      { period: "T3", equity: 11650, balance: 11700, drawdown: -4.1 },
      { period: "T4", equity: 12400, balance: 12450, drawdown: -3.2 },
      { period: "T5", equity: 13500, balance: 13500, drawdown: -1.9 },
    ],
    monthlyReturns: [
      { month: "Thg 1", returnPct: 8.0 },
      { month: "Thg 2", returnPct: 7.8 },
      { month: "Thg 3", returnPct: 6.4 },
      { month: "Thg 4", returnPct: 8.8 },
    ],
    sampleHistory: [
      {
        id: "TR-01",
        symbol: "XAUUSD",
        type: "BUY",
        lots: 0.2,
        resultNote: "+45 pips",
        closedPeriod: "Tuần gần nhất",
      },
    ],
  };
}

export function MastersManager({
  initialItems,
}: {
  initialItems: MasterTrader[];
}) {
  const router = useRouter();
  const [items, setItems] = React.useState<MasterTrader[]>(initialItems);
  const [editing, setEditing] = React.useState<MasterTrader | null>(null);
  const [isNew, setIsNew] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [feedback, setFeedback] = React.useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);

  const [marketsText, setMarketsText] = React.useState("");
  const [strategyDescText, setStrategyDescText] = React.useState("");
  const [riskRulesText, setRiskRulesText] = React.useState("");

  const openEditor = (master: MasterTrader, createMode: boolean) => {
    setEditing(structuredClone(master));
    setIsNew(createMode);
    setMarketsText(master.primaryMarkets.join(", "));
    setStrategyDescText(master.strategyDescription.join("\n\n"));
    setRiskRulesText(master.riskManagementRules.join("\n"));
    setFeedback(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    const finalSlug = editing.slug.trim() || slugifyVietnamese(editing.name);
    const payload: MasterTrader = {
      ...editing,
      slug: finalSlug,
      tradingDurationLabel:
        editing.tradingDurationLabel ||
        `${editing.tradingDurationMonths} tháng`,
      primaryMarkets: marketsText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      strategyDescription: strategyDescText
        .split(/\n{2,}|\n/)
        .map((s) => s.trim())
        .filter(Boolean),
      riskManagementRules: riskRulesText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      equityCurve: editing.equityCurve.filter((pt) => pt.period.trim()),
      monthlyReturns: editing.monthlyReturns.filter((m) => m.month.trim()),
      sampleHistory: editing.sampleHistory.filter((h) => h.symbol.trim()),
    };

    setSaving(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/admin/masters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        item?: MasterTrader;
        error?: string;
      };

      if (!res.ok || !data.item) {
        setFeedback({
          type: "err",
          text: data.error || "Không thể lưu hồ sơ Master.",
        });
      } else {
        setItems((prev) => {
          const exists = prev.some((x) => x.slug === data.item!.slug);
          return exists
            ? prev.map((x) => (x.slug === data.item!.slug ? data.item! : x))
            : [data.item!, ...prev];
        });
        setEditing(null);
        setFeedback({
          type: "ok",
          text: `Đã lưu và cập nhật Master "${data.item.name}" lên trang Copy Trading!`,
        });
        router.refresh();
      }
    } catch {
      setFeedback({ type: "err", text: "Lỗi kết nối máy chủ." });
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (master: MasterTrader) => {
    const updated: MasterTrader = {
      ...master,
      isPublished: master.isPublished === false ? true : false,
    };
    const res = await fetch("/api/admin/masters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    if (res.ok) {
      setItems((prev) =>
        prev.map((x) => (x.slug === master.slug ? updated : x))
      );
      router.refresh();
    }
  };

  const handleDelete = async (slug: string, name: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa Master "${name}" không?`)) {
      return;
    }
    const res = await fetch(
      `/api/admin/masters?slug=${encodeURIComponent(slug)}`,
      { method: "DELETE" }
    );
    if (res.ok) {
      setItems((prev) => prev.filter((x) => x.slug !== slug));
      setFeedback({ type: "ok", text: `Đã xóa Master "${name}".` });
      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Badge variant="gold">COPY TRADING MASTERS CMS</Badge>
          <h1 className="mt-2 font-heading text-2xl font-extrabold text-ink-primary sm:text-3xl">
            Quản lý Master Copy Trading
          </h1>
          <p className="mt-1 text-xs text-ink-secondary sm:text-sm">
            Đăng hồ sơ Master thật (hoặc Demo), nhập chỉ số ROI, Drawdown, Win
            Rate và dữ liệu biểu đồ Equity Curve trực tiếp.
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          onClick={() => openEditor(createBlankMaster(), true)}
        >
          <Plus className="h-4 w-4" />
          Đăng Master mới
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
              {isNew
                ? "Đăng Hồ sơ Master mới"
                : `Chỉnh sửa Master: ${editing.name}`}
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
            {/* Basic Identity */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Tên Master Trader *
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
                  placeholder="Mr Leo Gold Master"
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm text-ink-primary focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Mã định danh (Code)
                </label>
                <input
                  type="text"
                  value={editing.code}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, code: e.target.value } : null
                    )
                  }
                  placeholder="LEO-M01"
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

            {/* Real vs Demo Toggle + Strategy */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Phân loại Hồ sơ (Thật / Demo) *
                </label>
                <select
                  value={editing.isDemo ? "demo" : "real"}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, isDemo: e.target.value === "demo" } : null
                    )
                  }
                  className="h-10 w-full rounded-input border border-gold/45 bg-background-secondary px-3 text-sm font-semibold text-gold-light focus:border-gold focus:outline-none"
                >
                  <option value="real">
                    Hồ sơ Master THẬT (Không gắn nhãn DEMO)
                  </option>
                  <option value="demo">Hồ sơ dữ liệu DEMO minh họa</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Tên chiến lược
                </label>
                <input
                  type="text"
                  value={editing.strategyName}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, strategyName: e.target.value } : null
                    )
                  }
                  placeholder="XAUUSD Intraday Structure"
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm text-ink-primary focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Cặp giao dịch chính (phân cách dấu phẩy)
                </label>
                <input
                  type="text"
                  value={marketsText}
                  onChange={(e) => setMarketsText(e.target.value)}
                  placeholder="XAUUSD, EURUSD"
                  className="h-10 w-full rounded-input border border-line-strong bg-background-secondary px-3 text-sm text-ink-primary focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <ImageUploadField
              label="Ảnh đại diện Master (Avatar)"
              value={editing.avatar}
              onChange={(url) =>
                setEditing((prev) => (prev ? { ...prev, avatar: url } : null))
              }
              folder="masters"
              helperText="Ảnh vuông tỷ lệ 1:1 (PNG, JPG, WEBP, SVG)."
            />

            {/* Core Performance Metrics */}
            <div className="grid grid-cols-2 gap-4 rounded-xl border border-line bg-background-secondary/70 p-4 sm:grid-cols-4 lg:grid-cols-7">
              <div>
                <label className="mb-1 block text-[11px] font-semibold text-ink-secondary">
                  ROI (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={editing.roiPct}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev ? { ...prev, roiPct: Number(e.target.value) } : null
                    )
                  }
                  className="h-9 w-full rounded-lg border border-line-strong bg-card px-2.5 text-sm font-bold text-success tabular-nums-fin"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-semibold text-ink-secondary">
                  Max DD (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={editing.maxDrawdownPct}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev
                        ? {
                            ...prev,
                            maxDrawdownPct: Math.abs(Number(e.target.value)),
                          }
                        : null
                    )
                  }
                  className="h-9 w-full rounded-lg border border-line-strong bg-card px-2.5 text-sm font-bold text-danger tabular-nums-fin"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-semibold text-ink-secondary">
                  Win Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={editing.winRatePct}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev
                        ? { ...prev, winRatePct: Number(e.target.value) }
                        : null
                    )
                  }
                  className="h-9 w-full rounded-lg border border-line-strong bg-card px-2.5 text-sm font-bold text-ink-primary tabular-nums-fin"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-semibold text-ink-secondary">
                  Số tháng chạy
                </label>
                <input
                  type="number"
                  min={1}
                  value={editing.tradingDurationMonths}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev
                        ? {
                            ...prev,
                            tradingDurationMonths: Number(e.target.value),
                          }
                        : null
                    )
                  }
                  className="h-9 w-full rounded-lg border border-line-strong bg-card px-2.5 text-sm font-bold text-gold-light tabular-nums-fin"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-semibold text-ink-secondary">
                  Mức rủi ro
                </label>
                <select
                  value={editing.riskLevel}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev
                        ? {
                            ...prev,
                            riskLevel: e.target
                              .value as MasterTrader["riskLevel"],
                          }
                        : null
                    )
                  }
                  className="h-9 w-full rounded-lg border border-line-strong bg-card px-2 text-xs text-ink-primary"
                >
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-semibold text-ink-secondary">
                  Điểm rủi ro (1-10)
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={editing.riskScore}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev
                        ? { ...prev, riskScore: Number(e.target.value) }
                        : null
                    )
                  }
                  className="h-9 w-full rounded-lg border border-line-strong bg-card px-2.5 text-sm text-ink-primary tabular-nums-fin"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-semibold text-ink-secondary">
                  Vốn Copy tối thiểu ($)
                </label>
                <input
                  type="number"
                  placeholder="Để trống nếu chưa có"
                  value={editing.minCopyBalanceUsd ?? ""}
                  onChange={(e) =>
                    setEditing((prev) =>
                      prev
                        ? {
                            ...prev,
                            minCopyBalanceUsd:
                              e.target.value === ""
                                ? null
                                : Number(e.target.value),
                          }
                        : null
                    )
                  }
                  className="h-9 w-full rounded-lg border border-line-strong bg-card px-2.5 text-sm text-ink-primary tabular-nums-fin"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                Tóm tắt ngắn ngoài danh sách Master
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

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Mô tả chi tiết chiến lược (Mỗi dòng 1 đoạn)
                </label>
                <textarea
                  rows={4}
                  value={strategyDescText}
                  onChange={(e) => setStrategyDescText(e.target.value)}
                  className="w-full rounded-input border border-line-strong bg-background-secondary p-3 text-sm text-ink-primary focus:border-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase text-ink-secondary">
                  Nguyên tắc quản trị rủi ro (Mỗi dòng 1 ý)
                </label>
                <textarea
                  rows={4}
                  value={riskRulesText}
                  onChange={(e) => setRiskRulesText(e.target.value)}
                  className="w-full rounded-input border border-line-strong bg-background-secondary p-3 text-sm text-ink-primary focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            {/* Equity Curve Builder */}
            <div className="space-y-3 rounded-xl border border-line bg-background-secondary/60 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-light">
                  Dữ liệu Biểu đồ Đường cong Vốn &amp; Drawdown (Equity Curve)
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
                            equityCurve: [
                              ...prev.equityCurve,
                              {
                                period: `T${prev.equityCurve.length + 1}`,
                                equity: 10000,
                                balance: 10000,
                                drawdown: 0,
                              },
                            ],
                          }
                        : null
                    )
                  }
                >
                  <Plus className="h-3.5 w-3.5" /> Thêm mốc
                </Button>
              </div>
              <div className="grid grid-cols-12 gap-2 text-[11px] text-ink-muted">
                <span className="col-span-3">Kỳ / Tháng</span>
                <span className="col-span-3">Equity ($)</span>
                <span className="col-span-3">Balance ($)</span>
                <span className="col-span-2">Drawdown (%)</span>
                <span className="col-span-1" />
              </div>
              {editing.equityCurve.map((pt, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2">
                  <input
                    type="text"
                    value={pt.period}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditing((prev) => {
                        if (!prev) return null;
                        const copy = [...prev.equityCurve];
                        copy[idx] = { ...copy[idx], period: val };
                        return { ...prev, equityCurve: copy };
                      });
                    }}
                    className="col-span-3 h-8 rounded border border-line-strong bg-card px-2 text-xs text-ink-primary"
                  />
                  <input
                    type="number"
                    value={pt.equity}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setEditing((prev) => {
                        if (!prev) return null;
                        const copy = [...prev.equityCurve];
                        copy[idx] = { ...copy[idx], equity: val };
                        return { ...prev, equityCurve: copy };
                      });
                    }}
                    className="col-span-3 h-8 rounded border border-line-strong bg-card px-2 text-xs text-ink-primary tabular-nums-fin"
                  />
                  <input
                    type="number"
                    value={pt.balance}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setEditing((prev) => {
                        if (!prev) return null;
                        const copy = [...prev.equityCurve];
                        copy[idx] = { ...copy[idx], balance: val };
                        return { ...prev, equityCurve: copy };
                      });
                    }}
                    className="col-span-3 h-8 rounded border border-line-strong bg-card px-2 text-xs text-ink-primary tabular-nums-fin"
                  />
                  <input
                    type="number"
                    step="0.1"
                    value={pt.drawdown}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setEditing((prev) => {
                        if (!prev) return null;
                        const copy = [...prev.equityCurve];
                        copy[idx] = { ...copy[idx], drawdown: val };
                        return { ...prev, equityCurve: copy };
                      });
                    }}
                    className="col-span-2 h-8 rounded border border-line-strong bg-card px-2 text-xs text-danger tabular-nums-fin"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setEditing((prev) =>
                        prev
                          ? {
                              ...prev,
                              equityCurve: prev.equityCurve.filter(
                                (_, i) => i !== idx
                              ),
                            }
                          : null
                      )
                    }
                    className="col-span-1 flex h-8 items-center justify-center rounded text-danger hover:bg-danger-muted"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Monthly Returns Builder */}
            <div className="space-y-3 rounded-xl border border-line bg-background-secondary/60 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-light">
                  Biểu đồ Lợi nhuận theo Tháng (Monthly Returns %)
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
                            monthlyReturns: [
                              ...prev.monthlyReturns,
                              {
                                month: `Thg ${prev.monthlyReturns.length + 1}`,
                                returnPct: 5.0,
                              },
                            ],
                          }
                        : null
                    )
                  }
                >
                  <Plus className="h-3.5 w-3.5" /> Thêm tháng
                </Button>
              </div>
              <div className="grid gap-2.5 sm:grid-cols-3">
                {editing.monthlyReturns.map((mr, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-lg border border-line bg-card p-2"
                  >
                    <input
                      type="text"
                      value={mr.month}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditing((prev) => {
                          if (!prev) return null;
                          const copy = [...prev.monthlyReturns];
                          copy[idx] = { ...copy[idx], month: val };
                          return { ...prev, monthlyReturns: copy };
                        });
                      }}
                      className="h-8 w-20 rounded border border-line-strong bg-background-secondary px-2 text-xs text-ink-primary"
                    />
                    <input
                      type="number"
                      step="0.1"
                      value={mr.returnPct}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setEditing((prev) => {
                          if (!prev) return null;
                          const copy = [...prev.monthlyReturns];
                          copy[idx] = { ...copy[idx], returnPct: val };
                          return { ...prev, monthlyReturns: copy };
                        });
                      }}
                      className="h-8 flex-1 rounded border border-line-strong bg-background-secondary px-2 text-xs font-bold text-ink-primary tabular-nums-fin"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setEditing((prev) =>
                          prev
                            ? {
                                ...prev,
                                monthlyReturns: prev.monthlyReturns.filter(
                                  (_, i) => i !== idx
                                ),
                              }
                            : null
                        )
                      }
                      className="text-danger hover:opacity-80"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
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
                <span>Hiển thị trên trang Copy Trading &amp; Trang chủ</span>
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
                  {saving ? "Đang lưu..." : "Lưu & Xuất bản Master"}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      )}

      {/* Masters List */}
      <div className="grid gap-4">
        {items.map((master) => (
          <Card
            key={master.slug}
            className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={master.avatar}
                alt={master.name}
                className="h-14 w-14 shrink-0 rounded-2xl border border-line bg-[#050D1A] object-cover"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {master.isDemo ? (
                    <Badge variant="demo">DEMO</Badge>
                  ) : (
                    <Badge variant="featured">MASTER THẬT</Badge>
                  )}
                  {master.isPublished !== false ? (
                    <Badge variant="success">Đang hiển thị</Badge>
                  ) : (
                    <Badge variant="neutral">Đang ẩn</Badge>
                  )}
                  <span className="text-xs font-bold text-success tabular-nums-fin">
                    ROI: +{master.roiPct}%
                  </span>
                  <span className="text-xs font-bold text-danger tabular-nums-fin">
                    DD: -{master.maxDrawdownPct}%
                  </span>
                </div>
                <h3 className="mt-1 font-heading text-lg font-bold text-ink-primary">
                  {master.name}
                </h3>
                <p className="text-xs text-ink-secondary">
                  {master.strategyName} • {master.primaryMarkets.join(", ")}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/copy-trading/masters/${master.slug}`}
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
                onClick={() => handleTogglePublish(master)}
              >
                {master.isPublished !== false ? (
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
                onClick={() => openEditor(master, false)}
              >
                <Edit3 className="h-3.5 w-3.5 text-gold-light" />
                Sửa
              </Button>
              <button
                type="button"
                onClick={() => handleDelete(master.slug, master.name)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-danger/30 bg-danger-muted text-danger hover:bg-danger/20"
                title="Xóa Master"
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
