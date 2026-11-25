import Link from "next/link";
import {
  ArrowRight,
  Download,
  Eye,
  Layers,
  MessageCircle,
} from "lucide-react";
import { IndicatorsLibrary } from "@/components/tools/indicators-library";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { getLiveIndicators } from "@/lib/cms";
import { SITE_CONFIG, constructMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const revalidate = 300;

export const metadata = constructMetadata({
  title: "Công cụ Trading — Thư viện Chỉ báo TradingView & MT5",
  description:
    "Khám phá bộ chỉ báo phân tích kỹ thuật TradingView và MetaTrader 5 hỗ trợ nhận diện phiên giao dịch, thanh khoản và quản trị rủi ro tại Backcom Mr Leo.",
  path: "/tools",
});

export default async function ToolsPage() {
  const indicators = await getLiveIndicators();

  return (
    <div className="bg-background">
      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b border-line bg-background-secondary py-14 sm:py-18">
        <div className="pointer-events-none absolute inset-0 bg-trading-grid opacity-55" />
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <Badge variant="gold">TECHNICAL INDICATOR SUITE</Badge>
            <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink-primary sm:text-5xl">
              Thư viện Chỉ báo TradingView &amp; MT5
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-secondary sm:text-lg">
              Bộ công cụ trực quan hóa cấu trúc phiên giao dịch, vùng thanh
              khoản và thông số rủi ro trực tiếp trên biểu đồ, thiết kế dành
              riêng cho thành viên hệ sinh thái Backcom Mr Leo.
            </p>
          </div>
        </div>
      </section>

      {/* 2 & 3. Indicator Library & Preview */}
      <section
        id="mt5-indicators"
        className="border-b border-line py-16 sm:py-20"
      >
        <div className="container">
          <SectionHeading
            align="left"
            eyebrow="INDICATOR LIBRARY & PREVIEW"
            title="Danh mục Chỉ báo & Minh họa Giao diện"
            subtitle="Chọn nền tảng bạn đang sử dụng để lọc danh sách công cụ phù hợp."
          />
          <div className="mt-8">
            <IndicatorsLibrary items={indicators} />
          </div>
        </div>
      </section>

      {/* 4. Core Features */}
      <section className="border-b border-line bg-background-secondary py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="DESIGN PRINCIPLES"
            title="Đặc điểm nổi bật của bộ chỉ báo"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card className="p-6">
              <Eye className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-heading text-lg font-bold text-ink-primary">
                Giao diện sạch, không rối biểu đồ
              </h3>
              <p className="mt-2 text-sm text-ink-secondary">
                Ưu tiên hiển thị các vùng giá và bảng thông số gọn gàng trên nền
                tối, giữ nguyên sự tập trung vào hành động giá (Price Action).
              </p>
            </Card>
            <Card className="p-6">
              <Layers className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-heading text-lg font-bold text-ink-primary">
                Không vẽ lại tín hiệu quá khứ (Non-Repaint)
              </h3>
              <p className="mt-2 text-sm text-ink-secondary">
                Các vùng biên độ phiên và xác nhận xu hướng đóng nến được cố
                định minh bạch, phục vụ kiểm chứng chiến lược thực tế.
              </p>
            </Card>
            <Card className="p-6">
              <Download className="h-6 w-6 text-gold" />
              <h3 className="mt-4 font-heading text-lg font-bold text-ink-primary">
                Hỗ trợ cài đặt trực tiếp 1-1
              </h3>
              <p className="mt-2 text-sm text-ink-secondary">
                Đi kèm tài liệu hướng dẫn thiết lập cảnh báo (Alert) trên
                TradingView và cài đặt vào thư mục MQL5/Indicators trên máy tính.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. How to Install */}
      <section className="border-b border-line py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="INSTALLATION GUIDE"
            title="Hướng dẫn kích hoạt & Cài đặt Chỉ báo"
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <Card className="p-6 sm:p-8">
              <Badge variant="gold">TRADINGVIEW (INVITE-ONLY)</Badge>
              <h3 className="mt-3 font-heading text-xl font-bold text-ink-primary">
                Cách kích hoạt chỉ báo trên TradingView
              </h3>
              <ol className="mt-4 space-y-3 text-sm text-ink-secondary">
                <li>
                  <strong className="text-ink-primary">Bước 1:</strong> Liên kết
                  tài khoản giao dịch với một trong 5 sàn đối tác của Backcom Mr
                  Leo.
                </li>
                <li>
                  <strong className="text-ink-primary">Bước 2:</strong> Gửi
                  Username TradingView và ID tài khoản sàn qua biểu mẫu Liên hệ
                  hoặc nhóm Zalo.
                </li>
                <li>
                  <strong className="text-ink-primary">Bước 3:</strong> Sau khi
                  được cấp quyền, mở biểu đồ TradingView → mục{" "}
                  <em>Indicators</em> → <em>Invite-only scripts</em> để thêm vào
                  biểu đồ.
                </li>
              </ol>
            </Card>

            <Card className="p-6 sm:p-8">
              <Badge variant="gold">METATRADER 4 / METATRADER 5</Badge>
              <h3 className="mt-3 font-heading text-xl font-bold text-ink-primary">
                Cách cài đặt tiện ích trên MT4 / MT5
              </h3>
              <ol className="mt-4 space-y-3 text-sm text-ink-secondary">
                <li>
                  <strong className="text-ink-primary">Bước 1:</strong> Nhận gói
                  tệp chỉ báo định dạng chuẩn (<code>.ex4</code> /{" "}
                  <code>.ex5</code>) từ đội ngũ kỹ thuật.
                </li>
                <li>
                  <strong className="text-ink-primary">Bước 2:</strong> Trên
                  phần mềm MetaTrader, chọn <em>File → Open Data Folder</em> và
                  dán tệp vào thư mục <code>MQL5/Indicators</code>.
                </li>
                <li>
                  <strong className="text-ink-primary">Bước 3:</strong> Nhấp
                  chuột phải vào cửa sổ <em>Navigator</em> chọn <em>Refresh</em>{" "}
                  rồi kéo chỉ báo thả vào biểu đồ XAUUSD hoặc cặp tiền cần theo
                  dõi.
                </li>
              </ol>
            </Card>
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="bg-background-secondary py-16 sm:py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl rounded-card-lg border border-gold/40 bg-card p-8 text-center sm:p-10">
            <h2 className="font-heading text-2xl font-bold text-ink-primary sm:text-3xl">
              Đăng ký nhận quyền sử dụng Bộ chỉ báo Hệ sinh thái
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-ink-secondary sm:text-base">
              Kết nối cùng đội ngũ Backcom Mr Leo để kiểm tra điều kiện cấp
              quyền thành viên và nhận hướng dẫn cài đặt chi tiết.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3.5">
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" })
                )}
              >
                Gửi yêu cầu cấp quyền
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={SITE_CONFIG.zaloGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" })
                )}
              >
                <MessageCircle className="h-4 w-4 text-gold" />
                Tham gia nhóm Zalo hỗ trợ
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
