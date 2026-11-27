"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const OAUTH_MESSAGES: Record<string, string> = {
  cancelled: "Bạn đã hủy thao tác đăng nhập.",
  invalid_state: "Phiên xác thực đã hết hạn, vui lòng thử lại.",
  token_failed: "Không thể xác thực mã truy cập.",
  profile_failed: "Không thể lấy thông tin hồ sơ.",
  server_error: "Đã xảy ra lỗi khi đồng bộ tài khoản.",
};

export function LoginCard({
  oauthNoticeKey,
}: {
  oauthNoticeKey?: string;
  googleConfigured?: boolean;
}) {
  const router = useRouter();
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const oauthBanner =
    oauthNoticeKey && oauthNoticeKey !== "pending_config"
      ? OAUTH_MESSAGES[oauthNoticeKey]
      : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = (await res.json()) as {
        ok?: boolean;
        redirectTo?: string;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        setError(data.error || "Đăng nhập không thành công.");
      } else {
        router.push(data.redirectTo || "/account");
        router.refresh();
      }
    } catch {
      setError("Không thể kết nối tới máy chủ xác thực.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="tech-glass-panel mx-auto w-full max-w-md border-line-strong p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-10 items-center overflow-hidden rounded-xl border border-gold/40 bg-[#162029] px-2 py-1">
          <Image
            src="/images/brand/leo-logo.png"
            alt="Leo Trading - Backcom Mr Leo"
            width={160}
            height={63}
            className="h-full w-auto object-contain"
          />
        </span>
        <div className="flex items-center gap-1.5">
          <Badge variant="gold">MEMBER &amp; ADMIN</Badge>
          <ShieldCheck className="h-4 w-4 text-gold" />
        </div>
      </div>

      <h1 className="mt-4 font-heading text-2xl font-extrabold text-ink-primary sm:text-3xl">
        Đăng nhập Hệ sinh thái
      </h1>
      <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary sm:text-sm">
        Đăng nhập tài khoản thành viên hoặc tài khoản Quản trị viên (Admin) tại
        đây.
      </p>

      {oauthBanner && (
        <div className="mt-4 rounded-xl border border-danger/35 bg-danger-muted px-3.5 py-2.5 text-xs text-danger">
          {oauthBanner}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="login-id"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-secondary"
          >
            Email hoặc Tài khoản Admin
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              id="login-id"
              type="text"
              required
              placeholder="ban@gmail.com hoặc admin"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="h-11 w-full rounded-input border border-line-strong bg-background-secondary pl-10 pr-3.5 text-sm text-ink-primary placeholder:text-ink-muted focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="login-pass"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-secondary"
          >
            Mật khẩu
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              id="login-pass"
              type={showPass ? "text" : "password"}
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full rounded-input border border-line-strong bg-background-secondary pl-10 pr-10 text-sm text-ink-primary placeholder:text-ink-muted focus:border-gold focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPass((p) => !p)}
              aria-label={showPass ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink-primary"
            >
              {showPass ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-danger/35 bg-danger-muted px-3.5 py-2.5 text-xs text-danger">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={loading}
          className="w-full"
        >
          <span>{loading ? "Đang đăng nhập..." : "Đăng nhập ngay"}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <div className="mt-6 border-t border-line pt-5 text-center text-xs text-ink-secondary">
        Chưa có tài khoản thành viên?{" "}
        <Link
          href="/register"
          className="font-bold text-gold-light hover:underline"
        >
          Đăng ký miễn phí ngay
        </Link>
      </div>
    </Card>
  );
}

export function RegisterCard(_props: { googleConfigured?: boolean }) {
  void _props;
  const router = useRouter();
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneOrZalo, setPhoneOrZalo] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Mật khẩu cần có ít nhất 6 ký tự.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu nhập lại không khớp.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phoneOrZalo, password }),
      });

      const data = (await res.json()) as {
        ok?: boolean;
        redirectTo?: string;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        setError(data.error || "Đăng ký tài khoản thất bại.");
      } else {
        router.push(data.redirectTo || "/account");
        router.refresh();
      }
    } catch {
      setError("Lỗi kết nối máy chủ khi tạo tài khoản.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="tech-glass-panel mx-auto w-full max-w-md border-line-strong p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-10 items-center overflow-hidden rounded-xl border border-gold/40 bg-[#162029] px-2 py-1">
          <Image
            src="/images/brand/leo-logo.png"
            alt="Leo Trading - Backcom Mr Leo"
            width={160}
            height={63}
            className="h-full w-auto object-contain"
          />
        </span>
        <div className="flex items-center gap-1.5">
          <Badge variant="gold">CREATE ACCOUNT</Badge>
          <ShieldCheck className="h-4 w-4 text-gold" />
        </div>
      </div>

      <h1 className="mt-4 font-heading text-2xl font-extrabold text-ink-primary sm:text-3xl">
        Đăng ký Thành viên
      </h1>
      <p className="mt-1.5 text-xs leading-relaxed text-ink-secondary sm:text-sm">
        Tạo tài khoản miễn phí để lưu thông tin kết nối Backcom, nhận quyền sử
        dụng Indicator và Bot Trading.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="reg-name"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-secondary"
          >
            Họ và tên *
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              id="reg-name"
              type="text"
              required
              placeholder="Nguyễn Văn A"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-11 w-full rounded-input border border-line-strong bg-background-secondary pl-10 pr-3.5 text-sm text-ink-primary placeholder:text-ink-muted focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="reg-email"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-secondary"
          >
            Địa chỉ Email *
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              id="reg-email"
              type="email"
              required
              placeholder="trader@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-input border border-line-strong bg-background-secondary pl-10 pr-3.5 text-sm text-ink-primary placeholder:text-ink-muted focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="reg-phone"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-secondary"
          >
            Số điện thoại / Zalo *
          </label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              id="reg-phone"
              type="tel"
              required
              placeholder="0901234567"
              value={phoneOrZalo}
              onChange={(e) => setPhoneOrZalo(e.target.value)}
              className="h-11 w-full rounded-input border border-line-strong bg-background-secondary pl-10 pr-3.5 text-sm text-ink-primary placeholder:text-ink-muted focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="reg-pass"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-secondary"
            >
              Mật khẩu *
            </label>
            <div className="relative">
              <input
                id="reg-pass"
                type={showPass ? "text" : "password"}
                required
                minLength={6}
                placeholder="Tối thiểu 6 ký tự"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-input border border-line-strong bg-background-secondary px-3.5 pr-9 text-sm text-ink-primary placeholder:text-ink-muted focus:border-gold focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPass((p) => !p)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink-primary"
              >
                {showPass ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="reg-confirm"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-secondary"
            >
              Nhập lại mật khẩu *
            </label>
            <input
              id="reg-confirm"
              type={showPass ? "text" : "password"}
              required
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-11 w-full rounded-input border border-line-strong bg-background-secondary px-3.5 text-sm text-ink-primary placeholder:text-ink-muted focus:border-gold focus:outline-none"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-danger/35 bg-danger-muted px-3.5 py-2.5 text-xs text-danger">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={loading}
          className="w-full"
        >
          <span>{loading ? "Đang khởi tạo..." : "Đăng ký Tài khoản"}</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <div className="mt-6 border-t border-line pt-5 text-center text-xs text-ink-secondary">
        Đã có tài khoản thành viên?{" "}
        <Link
          href="/login"
          className="font-bold text-gold-light hover:underline"
        >
          Đăng nhập tại đây
        </Link>
      </div>
    </Card>
  );
}
