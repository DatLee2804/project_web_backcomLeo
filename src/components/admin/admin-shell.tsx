"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart2,
  Bot,
  Building2,
  Database,
  ExternalLink,
  FileEdit,
  LayoutDashboard,
  LineChart,
  LogOut,
  UserCheck,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface AdminShellProps {
  children: React.ReactNode;
  storageMode: "supabase" | "local";
  supabaseReady: boolean;
  newLeadsCount?: number;
}

const ADMIN_NAV = [
  {
    href: "/admin",
    label: "Tổng quan",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/admin/pages",
    label: "Nội Dung Trang Chủ",
    icon: FileEdit,
  },
  {
    href: "/admin/brokers",
    label: "Quản lý Sàn",
    icon: Building2,
  },
  {
    href: "/admin/indicators",
    label: "Chỉ báo Indicator",
    icon: BarChart2,
  },
  {
    href: "/admin/robots",
    label: "Bot Trading (EA)",
    icon: Bot,
  },
  {
    href: "/admin/masters",
    label: "Master Copy Trade",
    icon: LineChart,
  },
  {
    href: "/admin/leads",
    label: "Khách hàng Tư vấn",
    icon: Users,
    isLeads: true,
  },
  {
    href: "/admin/users",
    label: "Tài khoản Thành viên",
    icon: UserCheck,
  },
];

export function AdminShell({
  children,
  storageMode,
  supabaseReady,
  newLeadsCount = 0,
}: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full shrink-0 border-b border-line bg-[#050C17] lg:w-64 lg:border-b-0 lg:border-r">
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <Link href="/admin" className="flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gold/45 bg-[#162029] shadow-[0_0_14px_rgba(0,194,255,0.22)]">
              <Image
                src="/images/brand/leo-emblem.png"
                alt="Backcom Mr Leo Admin"
                width={72}
                height={72}
                className="h-full w-full object-cover"
              />
            </span>
            <div>
              <div className="font-heading text-xs font-extrabold tracking-wider text-ink-primary">
                BACKCOM <span className="text-gold-light">ADMIN</span>
              </div>
              <div className="text-[10px] text-ink-muted">CMS Control Panel</div>
            </div>
          </Link>
        </div>

        {/* Storage Status */}
        <div className="border-b border-line px-4 py-3">
          <div className="flex items-center justify-between gap-2 rounded-xl border border-line bg-card px-3 py-2 text-xs">
            <span className="flex items-center gap-1.5 text-ink-secondary">
              <Database className="h-3.5 w-3.5 text-gold" />
              Database:
            </span>
            {storageMode === "supabase" && supabaseReady ? (
              <Badge variant="success">Supabase Cloud</Badge>
            ) : storageMode === "supabase" ? (
              <Badge variant="pending">Chờ chạy SQL</Badge>
            ) : (
              <Badge variant="neutral">Local Dev</Badge>
            )}
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex gap-1 overflow-x-auto p-3 lg:flex-col">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const active = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname?.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex shrink-0 items-center justify-between gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all sm:text-sm",
                  active
                    ? "border border-gold/45 bg-card-hover text-gold-light shadow-sm"
                    : "text-ink-secondary hover:bg-card hover:text-ink-primary"
                )}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="whitespace-nowrap">{item.label}</span>
                </span>
                {item.isLeads && newLeadsCount > 0 && (
                  <span className="rounded-full bg-gold-gradient px-2 py-0.5 text-[10px] font-extrabold text-[#020813]">
                    {newLeadsCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between gap-2 border-t border-line p-3 lg:mt-auto lg:flex-col lg:items-stretch">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 rounded-xl border border-line bg-card px-3 py-2 text-xs font-semibold text-ink-secondary transition-colors hover:border-gold/45 hover:text-gold-light"
          >
            <span>Xem Website ngoài</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 rounded-xl border border-danger/30 bg-danger-muted px-3 py-2 text-xs font-semibold text-danger transition-colors hover:bg-danger/20"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-5 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
