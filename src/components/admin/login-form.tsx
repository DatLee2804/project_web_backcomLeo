"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LoginFormProps {
  configured: boolean;
  defaultUsername: string;
  configReason?: string;
}

export function AdminLoginForm({
  configured,
  defaultUsername,
  configReason,
}: LoginFormProps) {
  const router = useRouter();
  const [username, setUsername] = React.useState(defaultUsername);
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Đăng nhập không thành công.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch {
      setError("Không thể kết nối máy chủ xác thực.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-trading-grid opacity-70" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-hero-glow" />

      <div className="relative z-10 w-full max-w-md">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary hover:text-gold-light"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Về trang chủ Backcom Mr Leo
        </Link>

        <Card className="border-line-strong p-7 sm:p-8">
          <div className="flex items-center justify-between">
            <span className="inline-flex h-10 items-center overflow-hidden rounded-xl border border-gold/40 bg-[#162029] px-2 py-1">
              <Image
                src="/images/brand/leo-logo.png"
                alt="Leo Trading"
                width={160}
                height={63}
                className="h-full w-auto object-contain"
              />
            </span>
            <Badge variant="gold">ADMIN PORTAL</Badge>
          </div>

          <h1 className="mt-4 font-heading text-2xl font-extrabold text-ink-primary">
            Đăng nhập Quản trị Hệ thống
          </h1>
          <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary">
            Quản lý Chỉ báo Indicator, Bot Trading, Master Copy Trade, Sàn giao
            dịch và Danh sách khách hàng.
          </p>

          {!configured && (
            <div className="mt-5 rounded-xl border border-vip/40 bg-vip/10 p-4 text-xs leading-relaxed text-vip-light">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-vip" />
                <div>
                  <strong>Chưa cấu hình mật khẩu Admin:</strong> {configReason}
                  <div className="mt-2 text-ink-secondary">
                    Tạo file <code>.env.local</code> (hoặc thêm trên Vercel
                    Settings → Environment Variables):
                    <pre className="mt-1.5 overflow-x-auto rounded bg-[#03070E] p-2 font-mono text-[11px] text-gold-light">
                      {`ADMIN_USERNAME=admin\nADMIN_PASSWORD=MatKhauCuaBan123!`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="admin-user"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-secondary"
              >
                Tài khoản Admin
              </label>
              <input
                id="admin-user"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-11 w-full rounded-input border border-line-strong bg-background-secondary px-3.5 text-sm text-ink-primary focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="admin-pass"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-secondary"
              >
                Mật khẩu Admin
              </label>
              <input
                id="admin-pass"
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-input border border-line-strong bg-background-secondary px-3.5 text-sm text-ink-primary focus:border-gold focus:outline-none"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-danger/35 bg-danger-muted px-3.5 py-2.5 text-xs text-danger">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading || !configured}
              className="w-full"
            >
              <Lock className="h-4 w-4" />
              {loading ? "Đang xác thực..." : "Đăng nhập Admin"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
