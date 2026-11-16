import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  ExternalLink,
  Handshake,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { SITE_CONFIG, constructMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Cộng đồng Trader & Đối tác IB (Community)",
  description:
    "Tham gia cộng đồng đối tác Backcom Mr Leo trên Zalo — nơi kết nối trader, chia sẻ kiến thức thực chiến, công cụ phân tích và phát triển mạng lưới đối tác IB.",
  path: "/community",
});

const COMMUNITY_BENEFITS = [
  {
    icon: BookOpen,
    title: "Cập nhật kiến thức & Cấu trúc thị trường",
    description:
      "Thảo luận góc nhìn phân tích kỹ thuật XAUUSD & Forex hàng tuần, kinh nghiệm quản lý vốn và kiểm soát tâm lý giao dịch.",
  },
  {
    icon: Sparkles,
    title: "Hỗ trợ kỹ thuật Indicator & Robot EA",
    description:
      "Nhận hướng dẫn cài đặt công cụ trên TradingView, MetaTrader 5, cấu hình VPS và cập nhật các phiên bản tiện ích mới.",
  },
  {
    icon: ShieldCheck,
    title: "Tra cứu cấu hình sàn & Liên kết IB nhanh chóng",
    description:
      "Được đội ngũ quản trị viên hỗ trợ kiểm tra trạng thái mã IB, giải đáp quy định tài khoản từng sàn (Austex STD05, Exness, Tickmill, FxPro, BCR).",
  },
  {
    icon: Handshake,
    title: "Kết nối mạng lưới Sub-IB & Đối tác",
    description:
      "Cơ hội hợp tác phát triển cộng đồng bền vững trên nền tảng hạ tầng công cụ và cơ chế đối soát minh bạch.",
  },
];

export default function CommunityPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-background-secondary py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-trading-grid opacity-55" />
        <div className="container relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Badge variant="gold">BACKCOM MR LEO COMMUNITY</Badge>
              <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink-primary sm:text-5xl">
                TRADING IS BETTER TOGETHER
              </h1>
              <p className="mt-4 text-base leading-relaxed text-ink-secondary sm:text-lg">
                Giao dịch tài chính không nhất thiết phải là hành trình đơn độc.
                Cộng đồng đối tác Backcom Mr Leo là điểm hẹn của những nhà giao
                dịch đề cao tính kỷ luật, tối ưu hóa chi phí thực tế và nói
                không với những lời hứa hẹn lợi nhuận phi thực tế.
              </p>

              <div className="mt-8 flex flex-wrap gap-3.5">
                <a
                  href={SITE_CONFIG.zaloGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" })
                  )}
                >
                  <MessageCircle className="h-4 w-4" />
                  JOIN ZALO COMMUNITY
                  <ExternalLink className="h-4 w-4" />
                </a>
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" })
                  )}
                >
                  Đăng ký hợp tác IB Partner
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Image
                src="/images/community/community-network.svg"
                alt="Mạng lưới cộng đồng Backcom Mr Leo"
                width={560}
                height={360}
                className="w-full rounded-card border border-line shadow-card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-line py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="COMMUNITY VALUE"
            title="Quyền lợi khi đồng hành cùng Cộng đồng"
            subtitle="Xây dựng môi trường trao đổi lành mạnh, thực chất và tôn trọng nguyên tắc an toàn vốn."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {COMMUNITY_BENEFITS.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/35 bg-gold/10 text-gold-light">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-heading text-lg font-bold text-ink-primary">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner Community & Activities */}
      <section className="border-b border-line bg-background-secondary py-16 sm:py-20">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="p-7 sm:p-8">
              <Badge variant="gold">PARTNER NETWORK</Badge>
              <h2 className="mt-4 font-heading text-2xl font-bold text-ink-primary">
                Dành cho Đối tác phát triển Cộng đồng (IB Partners)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                Nếu bạn đang vận hành đội nhóm giao dịch, kênh chia sẻ kiến thức
                hoặc cung cấp công cụ kỹ thuật, hệ sinh thái Backcom Mr Leo hỗ
                trợ kết nối đa sàn và chuẩn hóa quy trình chăm sóc thành viên.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink-secondary">
                <li>• Hỗ trợ định hướng cấu hình tài khoản rõ ràng từng sàn</li>
                <li>• Đồng hành tài nguyên công cụ tính toán và chỉ báo</li>
                <li>• Nguyên tắc hợp tác minh bạch, tôn trọng uy tín dài hạn</li>
              </ul>
            </Card>

            <Card className="p-7 sm:p-8">
              <Badge variant="neutral">COMMUNITY ACTIVITIES</Badge>
              <h2 className="mt-4 font-heading text-2xl font-bold text-ink-primary">
                Hoạt động thường xuyên trên Nhóm Zalo
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink-secondary">
                <li className="flex items-start gap-2.5">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>
                    Điểm tin lịch kinh tế vĩ mô quan trọng đầu tuần (CPI, FOMC,
                    NFP) và cảnh báo khung giờ biến động giãn spread.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>
                    Giải đáp trực tiếp thắc mắc về liên kết tài khoản nhận
                    Backcom và thiết lập MT5 / TradingView.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>
                    Chia sẻ kinh nghiệm vận hành EA kỷ luật trên tài khoản Cent
                    và các bài học quản trị rủi ro thực tế.
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Zalo Group Direct CTA */}
      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-card-lg border border-gold/45 bg-card p-8 text-center shadow-gold sm:p-12">
            <MessageCircle className="mx-auto h-10 w-10 text-gold" />
            <h2 className="mt-4 font-heading text-2xl font-bold text-ink-primary sm:text-3xl">
              Tham gia Nhóm Zalo Cộng đồng Backcom Mr Leo
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-ink-secondary sm:text-base">
              Nhấp vào nút bên dưới để mở trực tiếp nhóm Zalo chính thức{" "}
              <code className="text-gold-light">zalo.me/g/tnhicz815</code> trong
              tab mới.
            </p>
            <div className="mt-7">
              <a
                href={SITE_CONFIG.zaloGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" })
                )}
              >
                JOIN ZALO COMMUNITY
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

