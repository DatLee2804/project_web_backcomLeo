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
  Info,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function GoogleLogoSvg() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.2 1.2-.9 2.3-2 3l3.2 2.5c1.9-1.7 3-4.3 3-7.4 0-.7-.1-1.4-.2-2H12z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 5-.9 6.7-2.4l-3.2-2.5c-.9.6-2.1 1-3.5 1-2.7 0-5-1.8-5.8-4.3l-3.3 2.6C4.6 19.8 8 22 12 22z"
      />
      <path
        fill="#4A90E2"
        d="M6.2 13.8c-.2-.6-.3-1.2-.3-1.8s.1-1.2.3-1.8L2.9 7.6C2.3 8.9 2 10.4 2 12s.3 3.1.9 4.4l3.3-2.6z"
      />
      <path
        fill="#FBBC05"
        d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9C16.9 2.9 14.7 2 12 2 8 2 4.6 4.2 2.9 7.6l3.3 2.6c.8-2.5 3.1-4.3 5.8-4.3z"
      />
    </svg>
  );
}

const OAUTH_MESSAGES: Record<string, string> = {
  pending_config:
    "Tính năng Đăng nhập bằng Google đã được tích hợp sẵn! Chủ website chỉ cần điền GOOGLE_CLIENT_ID và GOOGLE_CLIENT_SECRET vào file .env.local (hoặc trên Vercel) để kích hoạt.",
  cancelled: "Bạn đã hủy thao tác đăng nhập bằng Google.",
  invalid_state: "Phiên xác thực Google đã hết hạn, vui lòng thử lại.",
  token_failed: "Không thể xác thực mã truy cập từ Google.",
  profile_failed: "Không thể lấy thông tin hồ sơ từ Google.",
  server_error: "Đã xảy ra lỗi khi đồng bộ tài khoản Google.",
};

export function LoginCard({
  oauthNoticeKey,
  googleConfigured,
}: {
  oauthNoticeKey?: string;
  googleConfigured: boolean;
}) {
  const router = useRouter();
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showGoogleGuide, setShowGoogleGuide] = React.useState(
    oauthNoticeKey === "pending_config"
  );

  const oauthBanner =
    oauthNoticeKey && oauthNoticeKey !== "pending_config"
      ? OAUTH_MESSAGES[oauthNoticeKey]
      : null;

  const handleGoogleClick = () => {
    if (!googleConfigured) {
      setShowGoogleGuide(true);
      return;
    }
    window.location.href = "/api/auth/google";
  };

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

      {/* Google Sign-In Button */}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleGoogleClick}
          className="flex h-11 w-full items-center justify-center gap-2.5 rounded-btn border border-line-strong bg-[#0A192F] px-4 text-sm font-semibold text-ink-primary transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:bg-card-hover"
        >
          <GoogleLogoSvg />
          <span>Tiếp tục với Google</span>
        </button>
      </div>

      {showGoogleGuide && (
        <div className="mt-4 rounded-xl border border-gold/35 bg-gold/10 p-3.5 text-xs leading-relaxed text-ink-secondary">
          <div className="flex items-start gap-2">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" />
            <div>
              <strong className="text-gold-light">
                Luồng Google OAuth 2.0 đã sẵn sàng!
              </strong>{" "}
              Để bật đăng nhập Google trực tuyến, thêm 2 khóa từ Google Cloud
              Console vào <code>.env.local</code> / Vercel:
              <pre className="mt-1.5 overflow-x-auto rounded bg-[#03070E] p-2 font-mono text-[10px] text-gold-light">
                {`GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com\nGOOGLE_CLIENT_SECRET=GOCSPX-xxx`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {oauthBanner && (
        <div className="mt-4 rounded-xl border border-danger/35 bg-danger-muted px-3.5 py-2.5 text-xs text-danger">
          {oauthBanner}
        </div>
      )}

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-line" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-ink-muted">
          HOẶC TÀI KHOẢN / MẬT KHẨU
        </span>
        <div className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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

export function RegisterCard({
  googleConfigured,
}: {
  googleConfigured: boolean;
}) {
  const router = useRouter();
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneOrZalo, setPhoneOrZalo] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [showGoogleGuide, setShowGoogleGuide] = React.useState(false);

  const handleGoogleClick = () => {
    if (!googleConfigured) {
      setShowGoogleGuide(true);
      return;
    }
    window.location.href = "/api/auth/google";
  };

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

      {/* Google Fast Sign-Up */}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleGoogleClick}
          className="flex h-11 w-full items-center justify-center gap-2.5 rounded-btn border border-line-strong bg-[#0A192F] px-4 text-sm font-semibold text-ink-primary transition-all hover:-translate-y-0.5 hover:border-gold/60 hover:bg-card-hover"
        >
          <GoogleLogoSvg />
          <span>Đăng ký nhanh bằng Google</span>
        </button>
      </div>

      {showGoogleGuide && (
        <div className="mt-4 rounded-xl border border-gold/35 bg-gold/10 p-3.5 text-xs leading-relaxed text-ink-secondary">
          <div className="flex items-start gap-2">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" />
            <div>
              <strong className="text-gold-light">
                Đăng ký bằng Google đã chuẩn bị sẵn!
              </strong>{" "}
              Thêm <code>GOOGLE_CLIENT_ID</code> và{" "}
              <code>GOOGLE_CLIENT_SECRET</code> vào <code>.env.local</code> /
              Vercel để kích hoạt đăng ký 1 chạm bằng tài khoản Google.
            </div>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-line" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-ink-muted">
          HOẶC ĐĂNG KÝ BẰNG EMAIL
        </span>
        <div className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            Số điện thoại / Zalo (Tùy chọn)
          </label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              id="reg-phone"
              type="tel"
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
