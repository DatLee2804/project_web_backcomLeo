import { ExternalLink, MessageCircle, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/shared/contact-form";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { getLiveBrokers } from "@/lib/cms";
import { SITE_CONFIG, constructMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const revalidate = 300;

export const metadata = constructMetadata({
  title: "Liên hệ Tư vấn Liên kết Sàn & Nhận Backcom",
  description:
    "Liên hệ đội ngũ Backcom Mr Leo để nhận hướng dẫn mở tài khoản đối tác (ưu tiên Austex STD05), chuyển mã IB, cài đặt chỉ báo hoặc Robot EA.",
  path: "/contact",
});

interface ContactPageProps {
  searchParams: Promise<{ broker?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const [resolvedParams, brokers] = await Promise.all([
    searchParams,
    getLiveBrokers(),
  ]);
  const defaultBroker = resolvedParams.broker ?? "austex";

  return (
    <div className="bg-background py-14 sm:py-18 lg:py-22">
      <div className="container">
        <div className="max-w-3xl">
          <Badge variant="gold">SUPPORT &amp; ONBOARDING</Badge>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink-primary sm:text-5xl">
            Liên hệ Đội ngũ Backcom Mr Leo
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-secondary sm:text-lg">
            Gửi thông tin sàn giao dịch bạn đang quan tâm để nhận hướng dẫn mở
            đúng mã tài khoản đối tác, đối chiếu hoàn phí hoặc kích hoạt bộ công
            cụ Trading.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ContactForm defaultBroker={defaultBroker} brokersList={brokers} />
          </div>

          <div className="space-y-6 lg:col-span-4">
            <Card className="border-gold/40 p-6">
              <div className="flex items-center gap-2 text-gold-light">
                <MessageCircle className="h-5 w-5" />
                <h2 className="font-heading text-base font-bold">
                  Kênh phản hồi nhanh nhất
                </h2>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-secondary">
                Tham gia trực tiếp Cộng đồng Zalo chính thức của Backcom Mr Leo
                để kết nối với quản trị viên và nhận hỗ trợ theo thời gian thực.
              </p>
              <a
                href={SITE_CONFIG.zaloGroupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "primary", size: "md" }),
                  "mt-5 w-full"
                )}
              >
                Mở Nhóm Zalo Chính thức
                <ExternalLink className="h-4 w-4" />
              </a>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 text-ink-primary">
                <ShieldCheck className="h-5 w-5 text-gold" />
                <h2 className="font-heading text-base font-bold">
                  Nguyên tắc Bảo mật Khách hàng
                </h2>
              </div>
              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-ink-secondary">
                <li>
                  • Chúng tôi <strong>chỉ cần ID tài khoản giao dịch</strong> để
                  tra cứu liên kết dưới cây đối tác IB.
                </li>
                <li>
                  • <strong>Tuyệt đối không cung cấp</strong> mật khẩu đăng nhập
                  cổng sàn, mật khẩu Master MT4/MT5 hoặc mã OTP cho bất kỳ ai.
                </li>
                <li>
                  • Backcom Mr Leo không thu hộ tiền nạp và không giữ hộ tiền
                  ký quỹ của nhà giao dịch.
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

