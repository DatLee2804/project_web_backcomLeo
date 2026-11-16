import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Coins,
  FileCheck2,
  Scale,
  ShieldAlert,
} from "lucide-react";
import { BackcomCalculator } from "@/components/backcom/backcom-calculator";
import { HowItWorksSection } from "@/components/homepage/how-it-works-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { getOrderedBrokers } from "@/data/brokers";
import { globalFaqs } from "@/data/faq";
import { constructMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Dịch vụ Hoàn phí Forex (Backcom / Rebate)",
  description:
    "Tìm hiểu cơ chế hoàn phí giao dịch Forex (Backcom/Rebate) tại Backcom Mr Leo: cách thức hoa hồng IB vận hành, công cụ tính toán và so sánh 5 sàn đối tác.",
  path: "/backcom",
});

const BENEFITS = [
  {
    title: "Giảm trực tiếp chi phí hòa vốn mỗi lệnh",
    description:
      "Mỗi lot giao dịch đóng lệnh đều phát sinh phí spread hoặc commission. Khoản hoàn phí giúp thu hẹp chi phí thực tế mà nhà giao dịch phải gánh chịu theo thời gian.",
  },
  {
    title: "Nhận hoàn phí bất kể lệnh Lãi hay Lỗ",
    description:
      "Cơ chế Backcom tính trên khối lượng hoặc phí giao dịch thực tế phát sinh của các lệnh hợp lệ, không phụ thuộc kết quả lời/lỗ của vị thế đó.",
  },
  {
    title: "Giữ nguyên quyền kiểm soát tài khoản tại sàn",
    description:
      "Tiền ký quỹ của bạn nằm trực tiếp tại sàn giao dịch. Backcom Mr Leo chỉ kết nối qua mã giới thiệu IB, không can thiệp nạp rút hay mật khẩu giao dịch.",
  },
  {
    title: "Cộng hưởng cùng hệ sinh thái công cụ Trading",
    description:
      "Thành viên liên kết tài khoản được ưu tiên hỗ trợ bộ chỉ báo TradingView/MT5, giải pháp EA Amix Gold Cent Bot và đồng hành cùng cộng đồng.",
  },
];

export default function BackcomPage() {
  const brokers = getOrderedBrokers();
  const backcomFaqs = globalFaqs.filter(
    (f) => f.category === "backcom" || f.category === "broker"
  );

  return (
    <div>
      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b border-line bg-background py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-trading-grid opacity-60" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-hero-glow" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <Badge variant="gold">FOREX REBATE / BACKCOM SERVICE</Badge>
            <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink-primary sm:text-5xl">
              Tối ưu chi phí giao dịch với cơ chế{" "}
              <span className="text-gold-gradient">Forex Backcom</span> minh
              bạch
            </h1>
            <p className="mt-5 text-base leading-relaxed text-ink-secondary sm:text-lg">
              Trong giao dịch tần suất đều đặn, phí spread và commission chiếm tỷ
              trọng đáng kể trên tổng vốn. Dịch vụ Backcom Mr Leo giúp nhà giao
              dịch nhận lại một phần chi phí giao dịch từ nguồn hoa hồng đối tác
              IB của sàn một cách rõ ràng, đúng quy chuẩn.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#calculator"
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" })
                )}
              >
                Ước tính Backcom ngay
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/backcom/what-is-backcom"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" })
                )}
              >
                <BookOpen className="h-4 w-4 text-gold" />
                Tìm hiểu chuyên sâu: Backcom là gì?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2 & 3. What is Backcom + IB Commission Mechanism */}
      <section className="border-b border-line bg-background-secondary py-16 sm:py-20">
        <div className="container">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHeading
                align="left"
                eyebrow="TRANSPARENT MODEL"
                title="Backcom là gì &amp; Hoa hồng IB vận hành như thế nào?"
                subtitle="Hiểu rõ bản chất dòng tiền hoàn phí để giao dịch an tâm và tránh những hiểu lầm không đáng có."
              />
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink-secondary sm:text-base">
                <p>
                  Khi bạn mở lệnh trên bất kỳ sàn Forex/CFD nào, bạn luôn trả
                  phí giao dịch thông qua chênh lệch giá mua-bán (
                  <strong className="text-ink-primary">Spread</strong>) hoặc phí
                  hoa hồng (
                  <strong className="text-ink-primary">Commission</strong>).
                </p>
                <p>
                  Đối với khách hàng đăng ký qua đối tác giới thiệu (
                  <strong className="text-ink-primary">
                    IB – Introducing Broker
                  </strong>
                  ), sàn giao dịch sẽ trích một phần từ doanh thu phí đó để trả
                  thù lao phát triển khách hàng cho IB. Hệ thống{" "}
                  <strong className="text-gold-light">Backcom Mr Leo</strong>{" "}
                  chủ động chia sẻ lại phần lớn khoản hoa hồng này về cho chính
                  nhà giao dịch dưới dạng hoàn phí (Rebate).
                </p>
                <div className="rounded-xl border border-gold/30 bg-gold/5 p-4 text-xs text-ink-secondary">
                  <strong className="text-gold-light">Lưu ý quan trọng:</strong>{" "}
                  Backcom là khoản giảm trừ chi phí giao dịch, không phải lợi
                  nhuận đầu tư được cam kết. Mức hoàn trả thực tế luôn phụ thuộc
                  vào điều khoản hợp đồng đối tác của từng sàn và từng loại tài
                  khoản.
                </div>
              </div>
            </div>

            {/* IB Cashflow Architecture Diagram */}
            <div className="lg:col-span-6">
              <Card className="p-6 sm:p-8">
                <div className="text-xs font-bold uppercase tracking-wider text-gold-light">
                  Sơ đồ luân chuyển phí &amp; Hoàn phí IB
                </div>
                <div className="mt-6 space-y-4">
                  {[
                    {
                      step: "Bước 1",
                      actor: "Nhà giao dịch (Trader)",
                      desc: "Thực hiện giao dịch trên nền tảng của sàn và phát sinh phí Spread / Commission như thông thường.",
                    },
                    {
                      step: "Bước 2",
                      actor: "Sàn giao dịch (Broker)",
                      desc: "Ghi nhận khối lượng đóng lệnh hợp lệ và trích phần hoa hồng đối tác (IB Commission) từ doanh thu phí.",
                    },
                    {
                      step: "Bước 3",
                      actor: "Hệ thống Backcom Mr Leo",
                      desc: "Đối soát minh bạch theo cấu hình tài khoản (ví dụ Austex STD05, Exness, Tickmill, FxPro, BCR).",
                    },
                    {
                      step: "Bước 4",
                      actor: "Hoàn trả về Trader (Rebate)",
                      desc: "Nhà giao dịch nhận lại khoản hoàn phí định kỳ theo cơ chế chi trả của từng sàn.",
                    },
                  ].map((node, index) => (
                    <div
                      key={node.step}
                      className="flex items-start gap-4 rounded-xl border border-line bg-background-secondary p-4"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gold/40 bg-gold/15 font-heading text-xs font-bold text-gold-light">
                        0{index + 1}
                      </span>
                      <div>
                        <div className="font-heading text-sm font-bold text-ink-primary">
                          {node.actor}
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-ink-secondary">
                          {node.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Process */}
      <HowItWorksSection />

      {/* 5. Calculator */}
      <section
        id="calculator"
        className="scroll-mt-20 border-b border-line bg-background-secondary py-16 sm:py-20"
      >
        <div className="container">
          <SectionHeading
            eyebrow="INTERACTIVE REBATE SIMULATOR"
            title="Công cụ ước tính hoàn phí Backcom"
            subtitle="Chọn sàn giao dịch, cấu hình tài khoản và phương thức quy đổi để ước tính chi phí được hoàn lại."
          />
          <div className="mt-10">
            <BackcomCalculator initialBrokerSlug="austex" />
          </div>
        </div>
      </section>

      {/* 6. Broker Comparison */}
      <section className="border-b border-line bg-background py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="PARTNER MATRIX"
            title="So sánh cấu hình Backcom giữa các sàn đối tác"
            subtitle="Các thông số chưa có công bố chính thức được ghi nhận rõ ở trạng thái Đang cập nhật."
          />

          <div className="mt-10 overflow-x-auto rounded-card border border-line bg-card">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-background-secondary text-xs uppercase tracking-wider text-ink-secondary">
                  <th className="px-5 py-4">Sàn giao dịch</th>
                  <th className="px-5 py-4">Cấu hình tài khoản</th>
                  <th className="px-5 py-4">Nền tảng xác nhận</th>
                  <th className="px-5 py-4">Phương thức tính mẫu</th>
                  <th className="px-5 py-4">Trạng thái biểu phí</th>
                  <th className="px-5 py-4 text-right">Chi tiết</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {brokers.map((broker) => (
                  <tr
                    key={broker.slug}
                    className={cn(
                      "transition-colors hover:bg-card-hover/60",
                      broker.featured && "bg-gold/[0.04]"
                    )}
                  >
                    <td className="px-5 py-4 font-heading font-bold text-ink-primary">
                      <div className="flex items-center gap-2">
                        <span>{broker.name}</span>
                        {broker.featured && (
                          <Badge variant="featured">FEATURED</Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-ink-secondary">
                      {broker.slug === "austex" ? (
                        <span className="font-semibold text-gold-light">
                          STD05 (Mặc định) / STD
                        </span>
                      ) : (
                        "Đang cập nhật cấu hình"
                      )}
                    </td>
                    <td className="px-5 py-4 text-ink-secondary">
                      {broker.platforms.length > 0
                        ? broker.platforms.join(" / ")
                        : "Đang cập nhật"}
                    </td>
                    <td className="px-5 py-4 text-xs text-ink-secondary">
                      {broker.rebateConfig?.defaultMethod ?? "Đang cập nhật"}
                    </td>
                    <td className="px-5 py-4">
                      <Badge variant="pending">Liên hệ / Đang cập nhật</Badge>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/brokers/${broker.slug}`}
                        className="text-xs font-semibold text-gold-light hover:underline"
                      >
                        Xem sàn →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. Benefits */}
      <section className="border-b border-line bg-background-secondary py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="WHY REBATE MATTERS"
            title="Lợi ích thiết thực của Backcom đối với Trader"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {BENEFITS.map((b) => (
              <Card key={b.title} className="p-6">
                <div className="flex items-start gap-3.5">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-ink-primary">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                      {b.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl border border-line bg-card p-4 text-xs text-ink-secondary">
              <Coins className="h-5 w-5 shrink-0 text-gold" />
              <span>Không thu phí dịch vụ ẩn đối với thành viên liên kết</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-line bg-card p-4 text-xs text-ink-secondary">
              <Scale className="h-5 w-5 shrink-0 text-gold" />
              <span>Đối chiếu minh bạch từng loại tài khoản trước khi mở</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-line bg-card p-4 text-xs text-ink-secondary">
              <ShieldAlert className="h-5 w-5 shrink-0 text-gold" />
              <span>Chỉ xác thực bằng ID tài khoản — Không cần mật khẩu</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="border-b border-line bg-background py-16 sm:py-20">
        <div className="container max-w-4xl">
          <SectionHeading
            eyebrow="BACKCOM FAQ"
            title="Giải đáp thắc mắc về dịch vụ Backcom"
          />
          <div className="mt-10">
            <Accordion items={backcomFaqs} />
          </div>
        </div>
      </section>

      {/* 9. Registration CTA */}
      <section className="bg-background-secondary py-16 sm:py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl rounded-card-lg border border-gold/40 bg-card p-8 text-center sm:p-12">
            <FileCheck2 className="mx-auto h-10 w-10 text-gold" />
            <h2 className="mt-4 font-heading text-2xl font-bold text-ink-primary sm:text-3xl">
              Sẵn sàng kết nối tài khoản nhận Backcom?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-secondary sm:text-base">
              Gửi yêu cầu tư vấn sàn giao dịch và loại tài khoản bạn đang quan
              tâm để nhận hướng dẫn liên kết mã đối tác chính xác nhất.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3.5">
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" })
                )}
              >
                Đăng ký tư vấn liên kết IB
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/brokers"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" })
                )}
              >
                Xem danh sách 5 sàn đối tác
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

