"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  BarChart2,
  Bot,
  Building2,
  CheckCircle2,
  Database,
  FileEdit,
  LineChart,
  RefreshCw,
  Users,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, InteractiveCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface DashboardOverviewProps {
  counts: {
    indicators: number;
    robots: number;
    masters: number;
    brokers: number;
    totalLeads: number;
    newLeads: number;
  };
  storageInfo: {
    mode: "supabase" | "local";
    supabaseReady: boolean;
    error?: string;
  };
}

export function DashboardOverview({
  counts,
  storageInfo,
}: DashboardOverviewProps) {
  const router = useRouter();
  const [seeding, setSeeding] = React.useState(false);
  const [seedMessage, setSeedMessage] = React.useState<string | null>(null);

  const handleSeed = async () => {
    setSeeding(true);
    setSeedMessage(null);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        counts?: {
          indicators: number;
          robots: number;
          masters: number;
          brokers: number;
        };
      };
      if (!res.ok || !data.ok) {
        setSeedMessage(`Lỗi: ${data.error ?? "Không thể đồng bộ."}`);
      } else {
        setSeedMessage(
          `Đã đồng bộ thành công dữ liệu gốc lên Database (${data.counts?.indicators} Chỉ báo, ${data.counts?.robots} Bot, ${data.counts?.masters} Master, ${data.counts?.brokers} Sàn)!`
        );
        router.refresh();
      }
    } catch {
      setSeedMessage("Lỗi kết nối khi đồng bộ dữ liệu.");
    } finally {
      setSeeding(false);
    }
  };

  const statCards = [
    {
      label: "Nội dung & Video Các Trang",
      count: 3,
      badge: "Home • Backcom • Sàn",
      href: "/admin/pages",
      cta: "Chỉnh sửa Nội dung & Video",
      icon: FileEdit,
    },
    {
      label: "Sàn giao dịch & Chi tiết Sàn",
      count: counts.brokers,
      href: "/admin/brokers",
      cta: "Thêm / Xóa / Sửa Sàn",
      icon: Building2,
    },
    {
      label: "Chỉ báo Indicator",
      count: counts.indicators,
      href: "/admin/indicators",
      cta: "Đăng / Sửa Chỉ báo",
      icon: BarChart2,
    },
    {
      label: "Bot Trading (EA)",
      count: counts.robots,
      href: "/admin/robots",
      cta: "Đăng / Sửa Bot",
      icon: Bot,
    },
    {
      label: "Master Copy Trade",
      count: counts.masters,
      href: "/admin/masters",
      cta: "Đăng / Sửa Master",
      icon: LineChart,
    },
    {
      label: "Khách hàng Tư vấn",
      count: counts.totalLeads,
      badge: counts.newLeads > 0 ? `${counts.newLeads} mới` : undefined,
      href: "/admin/leads",
      cta: "Xem danh sách khách",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <Badge variant="gold">SYSTEM OVERVIEW</Badge>
        <h1 className="mt-3 font-heading text-2xl font-extrabold text-ink-primary sm:text-3xl">
          Bảng điều khiển Quản trị Nội dung
        </h1>
        <p className="mt-1.5 text-sm text-ink-secondary">
          Mọi thay đổi sản phẩm tại đây sẽ được tự động cập nhật trực tiếp ra
          ngoài giao diện trang người dùng.
        </p>
      </div>

      {/* Database Status & 1-Click Seed Card */}
      <Card className="border-line-strong p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <Database className="h-5 w-5 text-gold" />
              <h2 className="font-heading text-base font-bold text-ink-primary">
                Trạng thái Cơ sở dữ liệu &amp; Lưu trữ Ảnh
              </h2>
              {storageInfo.mode === "supabase" && storageInfo.supabaseReady ? (
                <Badge variant="success">Supabase Cloud Đã Sẵn Sàng</Badge>
              ) : (
                <Badge variant="pending">
                  {storageInfo.mode === "supabase"
                    ? "Cần chạy file SQL"
                    : "Chế độ Local JSON (Máy cá nhân)"}
                </Badge>
              )}
            </div>

            {storageInfo.error ? (
              <p className="flex items-start gap-2 text-xs text-vip-light">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-vip" />
                <span>{storageInfo.error}</span>
              </p>
            ) : storageInfo.mode === "local" ? (
              <p className="text-xs leading-relaxed text-ink-secondary">
                Bạn đang chạy ở chế độ thử nghiệm trên máy cá nhân (lưu vào{" "}
                <code>data/local-cms-db.json</code> &amp;{" "}
                <code>public/uploads/</code>). Khi đưa lên Vercel, hãy gắn biến
                môi trường <strong>Supabase</strong> theo hướng dẫn trong{" "}
                <code>README.md</code> để lưu dữ liệu và ảnh vĩnh viễn trên
                Cloud.
              </p>
            ) : (
              <p className="flex items-center gap-1.5 text-xs text-success">
                <CheckCircle2 className="h-4 w-4" />
                <span>
                  Đã kết nối Supabase PostgreSQL &amp; Storage Bucket! Bạn có thể
                  bấm nút bên phải lần đầu để chép sẵn các dữ liệu mẫu lên bảng
                  Supabase.
                </span>
              </p>
            )}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleSeed}
            disabled={seeding}
            className="shrink-0"
          >
            <RefreshCw className={cn("h-4 w-4", seeding && "animate-spin")} />
            {seeding
              ? "Đang đồng bộ..."
              : "Khởi tạo dữ liệu gốc lên Database"}
          </Button>
        </div>

        {seedMessage && (
          <div className="mt-4 rounded-xl border border-gold/35 bg-gold/10 px-4 py-2.5 text-xs text-gold-light">
            {seedMessage}
          </div>
        )}
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <InteractiveCard
              key={card.href}
              className="flex flex-col justify-between p-6"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/40 bg-gold/10 text-gold-light">
                    <Icon className="h-5 w-5" />
                  </span>
                  {card.badge && <Badge variant="featured">{card.badge}</Badge>}
                </div>

                <div className="mt-4 font-heading text-3xl font-extrabold text-ink-primary tabular-nums-fin">
                  {card.count}
                </div>
                <div className="mt-1 text-sm font-medium text-ink-secondary">
                  {card.label}
                </div>
              </div>

              <Link
                href={card.href}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "mt-5 w-full justify-between"
                )}
              >
                <span>{card.cta}</span>
                <ArrowRight className="h-3.5 w-3.5 text-gold-light" />
              </Link>
            </InteractiveCard>
          );
        })}
      </div>
    </div>
  );
}
