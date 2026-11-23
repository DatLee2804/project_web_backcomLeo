"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, Copy, Save, Trash2 } from "lucide-react";
import type { LeadStatus, LeadSubmission } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, type TabOption } from "@/components/ui/tabs";

export function LeadsManager({
  initialItems,
}: {
  initialItems: LeadSubmission[];
}) {
  const router = useRouter();
  const [items, setItems] = React.useState<LeadSubmission[]>(initialItems);
  const [statusFilter, setStatusFilter] = React.useState<string>("all");
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const [savingId, setSavingId] = React.useState<string | null>(null);

  const filterTabs: TabOption[] = [
    { id: "all", label: "Tất cả", badge: String(items.length) },
    {
      id: "new",
      label: "Mới gửi",
      badge: String(items.filter((i) => i.status === "new").length),
    },
    {
      id: "contacted",
      label: "Đang tư vấn",
      badge: String(items.filter((i) => i.status === "contacted").length),
    },
    {
      id: "completed",
      label: "Đã hoàn tất",
      badge: String(items.filter((i) => i.status === "completed").length),
    },
  ];

  const filtered = React.useMemo(() => {
    if (statusFilter === "all") return items;
    return items.filter((item) => item.status === statusFilter);
  }, [items, statusFilter]);

  const handleSaveLead = async (lead: LeadSubmission) => {
    setSavingId(lead.id);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: lead.id,
          status: lead.status,
          adminNote: lead.adminNote,
        }),
      });
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (
      !window.confirm(
        `Bạn có chắc chắn muốn xóa phiếu tư vấn của "${name}" không?`
      )
    ) {
      return;
    }
    const res = await fetch(`/api/admin/leads?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setItems((prev) => prev.filter((x) => x.id !== id));
      router.refresh();
    }
  };

  const copyPhone = async (id: string, phone: string) => {
    await navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="gold">CUSTOMER LEADS CRM</Badge>
        <h1 className="mt-2 font-heading text-2xl font-extrabold text-ink-primary sm:text-3xl">
          Danh sách Khách hàng Điền Form Liên hệ
        </h1>
        <p className="mt-1 text-xs text-ink-secondary sm:text-sm">
          Tất cả thông tin khách hàng gửi từ trang <code>/contact</code> được
          lưu trữ tập trung tại đây để đội ngũ chăm sóc.
        </p>
      </div>

      <Tabs
        options={filterTabs}
        value={statusFilter}
        onChange={setStatusFilter}
      />

      {filtered.length === 0 ? (
        <Card className="p-10 text-center text-sm text-ink-secondary">
          Chưa có phiếu yêu cầu tư vấn nào trong mục này.
        </Card>
      ) : (
        <div className="space-y-4">
          {filtered.map((lead) => (
            <Card key={lead.id} className="space-y-4 p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-heading text-lg font-bold text-ink-primary">
                      {lead.fullName}
                    </h3>
                    {lead.status === "new" && (
                      <Badge variant="featured">MỚI</Badge>
                    )}
                    {lead.status === "contacted" && (
                      <Badge variant="gold">ĐANG TƯ VẤN</Badge>
                    )}
                    {lead.status === "completed" && (
                      <Badge variant="success">HOÀN TẤT</Badge>
                    )}
                    <Badge variant="neutral">
                      Quan tâm: {lead.interestedBroker}
                    </Badge>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-ink-secondary">
                    <span>Email: {lead.email}</span>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => copyPhone(lead.id, lead.phoneOrZalo)}
                      className="inline-flex items-center gap-1 font-semibold text-gold-light hover:underline"
                    >
                      SĐT / Zalo: {lead.phoneOrZalo}
                      {copiedId === lead.id ? (
                        <Check className="h-3.5 w-3.5 text-success" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                    <span>•</span>
                    <span className="text-ink-muted">
                      {new Date(lead.createdAt).toLocaleString("vi-VN")}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(lead.id, lead.fullName)}
                  className="rounded-lg border border-danger/30 bg-danger-muted p-2 text-danger hover:bg-danger/20"
                  title="Xóa phiếu"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="rounded-xl border border-line bg-background-secondary p-3.5 text-sm text-ink-primary">
                {lead.message}
              </div>

              <div className="grid gap-3 border-t border-line pt-4 sm:grid-cols-12">
                <div className="sm:col-span-3">
                  <select
                    value={lead.status}
                    onChange={(e) => {
                      const nextStatus = e.target.value as LeadStatus;
                      setItems((prev) =>
                        prev.map((x) =>
                          x.id === lead.id ? { ...x, status: nextStatus } : x
                        )
                      );
                    }}
                    className="h-9 w-full rounded-lg border border-line-strong bg-background-secondary px-3 text-xs font-semibold text-ink-primary"
                  >
                    <option value="new">Trạng thái: Mới gửi</option>
                    <option value="contacted">Trạng thái: Đang tư vấn</option>
                    <option value="completed">Trạng thái: Đã hoàn tất</option>
                  </select>
                </div>

                <div className="sm:col-span-7">
                  <input
                    type="text"
                    placeholder="Ghi chú nội bộ của Admin (VD: Đã kết bạn Zalo, gửi mã IB Austex...)"
                    value={lead.adminNote}
                    onChange={(e) => {
                      const note = e.target.value;
                      setItems((prev) =>
                        prev.map((x) =>
                          x.id === lead.id ? { ...x, adminNote: note } : x
                        )
                      );
                    }}
                    className="h-9 w-full rounded-lg border border-line-strong bg-background-secondary px-3 text-xs text-ink-primary"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    disabled={savingId === lead.id}
                    onClick={() => handleSaveLead(lead)}
                    className="h-9 w-full"
                  >
                    <Save className="h-3.5 w-3.5 text-gold-light" />
                    {savingId === lead.id ? "Lưu..." : "Cập nhật"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
