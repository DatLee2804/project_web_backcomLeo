import Link from "next/link";
import {
  AlertTriangle,
  ExternalLink,
  Mail,
  MessageCircle,
  Send,
  ShieldAlert,
} from "lucide-react";
import { footerLinks } from "@/data/navigation";
import { SITE_CONFIG } from "@/lib/seo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-[#040A14] pb-20 sm:pb-0">
      {/* Top electric ocean hairline */}
      <div className="h-px w-full gold-hairline" />

      <div className="container py-14 lg:py-16">
        {/* Compact Sleek Risk Warning Strip at Top of Footer (like Images 1-4) */}
        <div className="mb-12 rounded-2xl border border-line-strong bg-[#071324]/90 px-5 py-4 shadow-card">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-vip" />
            <p className="text-xs leading-relaxed text-ink-secondary">
              <strong className="text-vip-light">Cảnh báo rủi ro (Risk Warning):</strong>{" "}
              Giao dịch ngoại hối (Forex), Vàng và CFD sử dụng đòn bẩy cao luôn
              tiềm ẩn rủi ro mất một phần hoặc toàn bộ vốn đầu tư và không phù
              hợp với mọi nhà đầu tư. Hoàn phí Backcom chỉ hỗ trợ giảm chi phí
              giao dịch theo điều kiện sàn, không phải cam kết lợi nhuận. Vui
              lòng đọc kỹ{" "}
              <Link
                href="/legal/risk-disclosure"
                className="font-semibold text-gold-light underline underline-offset-2 hover:text-white"
              >
                Tuyên bố Cảnh báo Rủi ro
              </Link>{" "}
              trước khi tham gia.
            </p>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/50 bg-[#09192E] text-gold-light shadow-[0_0_16px_rgba(0,194,255,0.22)]">
                <span className="font-heading text-sm font-extrabold">ML</span>
              </span>
              <div>
                <div className="font-heading text-base font-extrabold tracking-wider text-ink-primary">
                  BACKCOM <span className="text-gold-gradient">MR LEO</span>
                </div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                  {SITE_CONFIG.subSlogan}
                </div>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-secondary">
              Hệ sinh thái công nghệ hỗ trợ nhà giao dịch tối ưu chi phí qua cơ
              chế hoàn phí Forex (Rebate/Backcom), kết nối 5 sàn giao dịch đối
              tác, bộ chỉ báo kỹ thuật, Robot EA và cộng đồng Trading kỷ luật.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-3.5 py-1.5">
              <span className="h-2 w-2 rounded-full bg-gold-light shadow-[0_0_8px_#5CE6FF]" />
              <span className="font-heading text-xs font-bold tracking-wider text-gold-light">
                {SITE_CONFIG.slogan}
              </span>
            </div>
          </div>

          {/* Column 2: Ecosystem */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-ink-primary">
              Sản phẩm &amp; Dịch vụ
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.ecosystem.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-secondary transition-colors hover:text-gold-light"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-ink-primary">
              Hệ sinh thái
            </h3>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-secondary transition-colors hover:text-gold-light"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="lg:col-span-3">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-ink-primary">
              Kênh kết nối
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={SITE_CONFIG.zaloGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 text-ink-secondary transition-colors hover:text-gold-light"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 text-gold" />
                  <span>Cộng đồng Zalo chính thức</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center gap-2.5 text-ink-secondary transition-colors hover:text-gold-light"
                >
                  <Send className="h-4 w-4 shrink-0 text-gold" />
                  <span>Telegram: Liên hệ nhận link xác thực</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center gap-2.5 text-ink-secondary transition-colors hover:text-gold-light"
                >
                  <Mail className="h-4 w-4 shrink-0 text-gold" />
                  <span>Biểu mẫu tư vấn &amp; Hỗ trợ IB</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-line-strong bg-card px-3.5 py-2 text-xs font-medium text-ink-primary transition-colors hover:border-gold/50 hover:text-gold-light"
                >
                  <ShieldAlert className="h-3.5 w-3.5 text-gold" />
                  Quy tắc bảo mật (Không hỏi mật khẩu)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-xs text-ink-muted md:flex-row md:items-center">
          <p>
            © {currentYear} {SITE_CONFIG.name} (backcommrleo.com.vn). Bảo lưu mọi
            quyền.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footerLinks.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-gold-light"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
