import Link from "next/link";
import Image from "next/image";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  Info,
  Layers,
  Lock,
  ShieldCheck,
} from "lucide-react";
import type { Broker } from "@/types";
import { BackcomCalculator } from "@/components/backcom/backcom-calculator";
import { SectionHeading } from "@/components/shared/section-heading";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { globalFaqs } from "@/data/faq";
import { cn } from "@/lib/utils";

interface BrokerDetailTemplateProps {
  broker: Broker;
}

export function BrokerDetailTemplate({ broker }: BrokerDetailTemplateProps) {
  const combinedFaqs = [
    ...broker.faqs,
    ...globalFaqs.filter((f) => f.category === "broker").slice(0, 3),
  ];

  return (
    <div className="bg-background">
      {/* 1. Broker Hero */}
      <section className="relative overflow-hidden border-b border-line bg-background-secondary py-14 sm:py-18">
        <div className="pointer-events-none absolute inset-0 bg-trading-grid opacity-55" />
        <div className="container relative z-10">
          <Link
            href="/brokers"
            className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary transition-colors hover:text-gold-light"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Quay lại danh sách Sàn giao dịch
          </Link>

          <div className="mt-6 grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5">
                {broker.featured ? (
                  <Badge variant="featured">FEATURED BROKER</Badge>
                ) : (
                  <Badge variant="gold">BROKER PARTNER</Badge>
                )}
                {broker.slug === "austex" && (
                  <Badge variant="gold">Mặc định: Tài khoản STD05</Badge>
                )}
                <Badge variant="pending">
                  Biểu phí chính thức: Đang cập nhật
                </Badge>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-4">
                <Image
                  src={broker.logo}
                  alt={`Logo minh họa đối tác ${broker.name}`}
                  width={176}
                  height={52}
                  className="h-12 w-auto"
                />
                <h1 className="font-heading text-3xl font-bold tracking-tight text-ink-primary sm:text-5xl">
                  {broker.name}
                </h1>
              </div>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
                {broker.tagline}. {broker.shortDescription}
              </p>

              {/* Hero CTAs */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {broker.referralUrl ? (
                  <a
                    href={broker.referralUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "primary", size: "lg" })
                    )}
                  >
                    Mở tài khoản {broker.shortName}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "lg" }),
                      "cursor-not-allowed opacity-65"
                    )}
                  >
                    <Lock className="h-4 w-4" />
                    Link mở tài khoản: Đang cập nhật
                  </button>
                )}

                <a
                  href="#broker-calculator"
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" })
                  )}
                >
                  Tính Backcom {broker.shortName}
                  <ArrowRight className="h-4 w-4" />
                </a>

                <Link
                  href={`/contact?broker=${broker.slug}`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" })
                  )}
                >
                  Liên hệ nhận mã IB
                </Link>
              </div>
            </div>

            {/* Quick Summary Box */}
            <div className="lg:col-span-4">
              <Card
                className={cn(
                  "p-5 sm:p-6",
                  broker.featured && "border-gold/45 shadow-gold"
                )}
              >
                <div className="text-xs font-bold uppercase tracking-wider text-gold-light">
                  Tóm tắt thông số {broker.shortName}
                </div>
                <dl className="mt-4 space-y-3 text-xs sm:text-sm">
                  {broker.tradingConditions.slice(0, 4).map((cond) => (
                    <div
                      key={cond.label}
                      className="flex items-center justify-between gap-2 border-b border-line pb-2.5 last:border-0 last:pb-0"
                    >
                      <dt className="text-ink-muted">{cond.label}</dt>
                      <dd
                        className={cn(
                          "text-right font-semibold",
                          cond.isPending
                            ? "text-amber-300"
                            : "text-ink-primary"
                        )}
                      >
                        {cond.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Special Section for BCR Portal & Rebate Check Separation (Section 8.4) */}
      {broker.slug === "bcr" && broker.externalPortal && (
        <section className="border-b border-line bg-[#0D1420] py-10">
          <div className="container">
            <div className="rounded-card-lg border border-gold/40 bg-card p-6 sm:p-8">
              <div className="grid items-center gap-6 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <Badge variant="gold">CỔNG KHÁCH HÀNG BCR &amp; KIỂM TRA REBATE</Badge>
                  <h2 className="mt-3 font-heading text-xl font-bold text-ink-primary sm:text-2xl">
                    Truy cập Cổng BCR &amp; Quy trình đối soát hoàn phí độc lập
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                    {broker.externalPortal.rebateCheckNote}
                  </p>
                  <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-400/30 bg-amber-500/10 p-3.5 text-xs text-amber-200">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>
                      <strong>Lưu ý bảo mật:</strong> Khi bấm &ldquo;Login BCR&rdquo;,
                      bạn sẽ chuyển trực tiếp tới trang cổng khách hàng chính
                      thức của sàn BCR (<code>thebcr.com</code>) ở tab mới. Để
                      kiểm tra trạng thái hoàn phí của Mr Leo, vui lòng xem
                      hướng dẫn bên cạnh — chỉ gửi ID tài khoản, không cung cấp
                      mật khẩu.
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 lg:col-span-4">
                  <a
                    href={broker.externalPortal.loginUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "primary", size: "lg" }),
                      "w-full"
                    )}
                  >
                    Login BCR (thebcr.com)
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  <a
                    href="#bcr-rebate-guide"
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "lg" }),
                      "w-full"
                    )}
                  >
                    <HelpCircle className="h-4 w-4 text-gold" />
                    Hướng dẫn kiểm tra Rebate
                  </a>
                </div>
              </div>

              {/* Explicit Rebate Check Steps for BCR */}
              <div
                id="bcr-rebate-guide"
                className="mt-6 scroll-mt-24 grid gap-4 border-t border-line pt-6 sm:grid-cols-3"
              >
                <div className="rounded-xl border border-line bg-background-secondary p-4">
                  <div className="text-xs font-bold text-gold-light">
                    Bước 1 • Lấy ID giao dịch
                  </div>
                  <p className="mt-1.5 text-xs text-ink-secondary">
                    Đăng nhập cổng khách hàng chính thức của BCR để xem số ID tài
                    khoản giao dịch của bạn.
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-background-secondary p-4">
                  <div className="text-xs font-bold text-gold-light">
                    Bước 2 • Gửi yêu cầu đối chiếu
                  </div>
                  <p className="mt-1.5 text-xs text-ink-secondary">
                    Gửi số ID tài khoản qua trang Liên hệ hoặc Zalo hỗ trợ của
                    Backcom Mr Leo để kiểm tra trạng thái mã IB.
                  </p>
                </div>
                <div className="rounded-xl border border-line bg-background-secondary p-4">
                  <div className="text-xs font-bold text-gold-light">
                    Bước 3 • Nhận xác nhận đối soát
                  </div>
                  <p className="mt-1.5 text-xs text-ink-secondary">
                    Đội ngũ đối chiếu thủ công trên cổng đối tác IB của Mr Leo và
                    phản hồi lịch hoàn phí áp dụng.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. Broker Overview */}
      <section className="border-b border-line py-14 sm:py-18">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionHeading
                align="left"
                eyebrow="01 • BROKER OVERVIEW"
                title={`Tổng quan về ${broker.name}`}
              />
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-secondary sm:text-base">
                {broker.overview.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <Card className="p-6">
                <h3 className="font-heading text-base font-bold text-ink-primary">
                  Điểm nhấn khi kết nối qua Backcom Mr Leo
                </h3>
                <ul className="mt-4 space-y-3">
                  {broker.highlights.map((hl) => (
                    <li
                      key={hl}
                      className="flex items-start gap-2.5 text-sm text-ink-secondary"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 3, 4 & 5. Account Types + Trading Conditions + Spread & Commission */}
      <section className="border-b border-line bg-background-secondary py-14 sm:py-18">
        <div className="container">
          <SectionHeading
            align="left"
            eyebrow="02 • ACCOUNTS, CONDITIONS & SPREAD"
            title={`Các loại tài khoản & Thông số giao dịch tại ${broker.name}`}
            subtitle="Đối chiếu cấu hình tài khoản trước khi đăng ký. Những thông số chưa được xác minh chính thức được ghi rõ Đang cập nhật."
          />

          {/* Account Cards */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {broker.accounts.map((acc) => (
              <Card
                key={acc.id}
                className={cn(
                  "p-6",
                  acc.isDefault && broker.slug === "austex"
                    ? "border-gold/55 bg-gradient-to-br from-card-hover to-card shadow-gold"
                    : ""
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-light">
                      Mã cấu hình: {acc.code}
                    </span>
                    <h3 className="mt-1 font-heading text-xl font-bold text-ink-primary">
                      {acc.name}
                    </h3>
                  </div>
                  {acc.isDefault ? (
                    <Badge variant="featured">TÀI KHOẢN MẶC ĐỊNH</Badge>
                  ) : (
                    <Badge variant="neutral">PHƯƠNG ÁN ĐỐI CHIẾU</Badge>
                  )}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                  {acc.description}
                </p>

                <dl className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-line bg-background-secondary p-4 text-xs">
                  <div>
                    <dt className="text-ink-muted">Thông số XAUUSD Spread</dt>
                    <dd className="mt-1 font-heading text-base font-bold text-gold-light tabular-nums-fin">
                      {acc.goldSpread !== null ? acc.goldSpread : "Đang cập nhật"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-muted">Phí Commission</dt>
                    <dd className="mt-1 font-semibold text-ink-primary">
                      {acc.commission ?? "Đang cập nhật"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-muted">Tiền nạp tối thiểu</dt>
                    <dd className="mt-1 font-semibold text-ink-primary">
                      {acc.minDeposit ?? "Đang cập nhật"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-muted">Đòn bẩy tối đa</dt>
                    <dd className="mt-1 font-semibold text-ink-primary">
                      {acc.leverage ?? "Đang cập nhật"}
                    </dd>
                  </div>
                </dl>

                {acc.spreadNote && (
                  <p className="mt-3 text-xs text-ink-muted">
                    * {acc.spreadNote}
                  </p>
                )}
              </Card>
            ))}
          </div>

          {/* Trading Conditions & Spread Table */}
          <div className="mt-8 rounded-card border border-line bg-card p-6">
            <h3 className="font-heading text-lg font-bold text-ink-primary">
              Bảng tổng hợp Điều kiện giao dịch, Spread &amp; Commission
            </h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {broker.tradingConditions.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-line bg-background-secondary p-4"
                >
                  <div className="text-xs text-ink-muted">{item.label}</div>
                  <div
                    className={cn(
                      "mt-1 font-heading text-sm font-bold",
                      item.isPending ? "text-amber-300" : "text-ink-primary"
                    )}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6 & 7. Trading Platforms + Trading Products */}
      <section className="border-b border-line py-14 sm:py-18">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Card className="h-full p-6">
                <div className="flex items-center gap-2">
                  <Layers className="h-5 w-5 text-gold" />
                  <h2 className="font-heading text-xl font-bold text-ink-primary">
                    Nền tảng giao dịch (Trading Platforms)
                  </h2>
                </div>
                <p className="mt-3 text-sm text-ink-secondary">
                  {broker.platformsNote}
                </p>

                {broker.platforms.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {broker.platforms.map((plat) => (
                      <div
                        key={plat}
                        className="rounded-xl border border-gold/35 bg-gold/10 px-4 py-2.5 font-heading text-sm font-bold text-gold-light"
                      >
                        {plat}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 rounded-xl border border-dashed border-line-strong bg-background-secondary p-4 text-xs text-ink-secondary">
                    Danh sách nền tảng giao dịch chính thức đang được đội ngũ kỹ
                    thuật xác nhận với {broker.name} trước khi niêm yết cố định.
                  </div>
                )}
              </Card>
            </div>

            <div className="lg:col-span-7">
              <Card className="h-full p-6">
                <h2 className="font-heading text-xl font-bold text-ink-primary">
                  Danh mục sản phẩm giao dịch (Trading Products)
                </h2>
                <div className="mt-4 space-y-3">
                  {broker.tradingProducts.map((prod) => (
                    <div
                      key={prod.code}
                      className="rounded-xl border border-line bg-background-secondary p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-heading text-sm font-bold text-ink-primary">
                          {prod.name}
                        </span>
                        <Badge variant="neutral">{prod.symbolExample}</Badge>
                      </div>
                      <p className="mt-1.5 text-xs text-ink-secondary">
                        {prod.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 8 & 9. Backcom Policy + Rebate Calculator */}
      <section
        id="broker-calculator"
        className="scroll-mt-20 border-b border-line bg-background-secondary py-14 sm:py-18"
      >
        <div className="container">
          <SectionHeading
            align="left"
            eyebrow="03 • BACKCOM POLICY & CALCULATOR"
            title={`Chính sách Backcom & Công cụ tính hoàn phí ${broker.name}`}
            subtitle={broker.rebateConfig?.policySummary}
          />

          <div className="mt-8">
            <BackcomCalculator initialBrokerSlug={broker.slug} />
          </div>
        </div>
      </section>

      {/* 10. Broker Review & Ratings (Section 8.5) */}
      <section className="border-b border-line py-14 sm:py-18">
        <div className="container">
          <SectionHeading
            align="left"
            eyebrow="04 • TRUST & VERIFICATION SOURCES"
            title={`Thông tin Pháp lý & Đánh giá độc lập — ${broker.name}`}
            subtitle="Mọi thông tin đánh giá, điểm số và giấy phép đều yêu cầu trích dẫn nguồn gốc và ngày cập nhật. Không hiển thị điểm số tự tạo."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {broker.trustReviews.map((review) => (
              <Card
                key={review.platform}
                className="flex flex-col justify-between p-5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-heading text-sm font-bold text-ink-primary">
                      {review.platform}
                    </span>
                    <ShieldCheck className="h-4 w-4 text-gold" />
                  </div>
                  <p className="mt-1 text-xs text-ink-muted">{review.label}</p>

                  <div className="mt-4 rounded-lg border border-line bg-background-secondary px-3 py-2.5">
                    <div className="text-[10px] uppercase tracking-wider text-ink-muted">
                      Dữ liệu / Điểm số
                    </div>
                    <div className="mt-0.5 text-sm font-semibold text-amber-300">
                      {review.value ?? "Chưa cập nhật"}
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-1 border-t border-line pt-3 text-[11px] text-ink-muted">
                  <div>Nguồn: {review.sourceName}</div>
                  <div>
                    Ngày cập nhật: {review.updatedAt ?? "Chưa cập nhật"}
                  </div>
                  {review.sourceUrl ? (
                    <a
                      href={review.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-gold-light hover:underline"
                    >
                      Trang chủ nguồn tra cứu
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span>Link hồ sơ gốc: Chưa cập nhật</span>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 text-xs text-ink-muted">
            <Info className="h-4 w-4 shrink-0 text-gold" />
            <span>
              Chủ sở hữu website có thể bổ sung link hồ sơ xác thực và ngày kiểm
              tra trực tiếp trong file cấu hình <code>src/data/brokers.ts</code>.
            </span>
          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="border-b border-line bg-background-secondary py-14 sm:py-18">
        <div className="container max-w-4xl">
          <SectionHeading
            eyebrow="BROKER FAQ"
            title={`Câu hỏi thường gặp về ${broker.name}`}
          />
          <div className="mt-8">
            <Accordion items={combinedFaqs} />
          </div>
        </div>
      </section>

      {/* 12. Registration CTA */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl rounded-card-lg border border-gold/40 bg-card p-8 text-center sm:p-10">
            <h2 className="font-heading text-2xl font-bold text-ink-primary sm:text-3xl">
              Kết nối tài khoản {broker.name} cùng Backcom Mr Leo
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-ink-secondary sm:text-base">
              Liên hệ đội ngũ hỗ trợ để nhận hướng dẫn mở tài khoản đúng cấu
              hình đối tác hoặc chuyển mã IB cho tài khoản sẵn có.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3.5">
              <Link
                href={`/contact?broker=${broker.slug}`}
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" })
                )}
              >
                Yêu cầu hướng dẫn liên kết {broker.shortName}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/brokers"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" })
                )}
              >
                So sánh với các sàn khác
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

