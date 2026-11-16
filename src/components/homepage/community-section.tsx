import Image from "next/image";
import Link from "next/link";
import { ExternalLink, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { SITE_CONFIG } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CommunitySection() {
  return (
    <section className="border-b border-line bg-background py-12 sm:py-14 lg:py-16">
      <div className="container">
        <div className="overflow-hidden rounded-card-lg border border-line-strong bg-surface-gradient p-6 sm:p-10 lg:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Badge variant="gold">TRADER &amp; PARTNER HUB</Badge>
              <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-ink-primary sm:text-3xl lg:text-4xl">
                JOIN OUR TRADING COMMUNITY
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-secondary">
                Cộng đồng đối tác Backcom Mr Leo – nơi kết nối trader, chia sẻ
                kiến thức và hỗ trợ hệ sinh thái giao dịch.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl border border-line bg-background-secondary/80 p-4">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <div className="font-heading text-sm font-bold text-ink-primary">
                      Thảo luận &amp; Hỗ trợ trực tiếp
                    </div>
                    <p className="mt-1 text-xs text-ink-secondary">
                      Cập nhật thông tin cấu hình sàn, hướng dẫn liên kết IB và
                      sử dụng công cụ Trading.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-line bg-background-secondary/80 p-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <div className="font-heading text-sm font-bold text-ink-primary">
                      Môi trường minh bạch
                    </div>
                    <p className="mt-1 text-xs text-ink-secondary">
                      Tôn trọng kỷ luật quản trị vốn, không lôi kéo ủy thác hay
                      cam kết lợi nhuận ảo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <a
                  href={SITE_CONFIG.zaloGroupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "primary", size: "lg" })
                  )}
                >
                  <MessageCircle className="h-4 w-4" />
                  JOIN OUR COMMUNITY
                  <ExternalLink className="h-4 w-4" />
                </a>
                <Link
                  href="/community"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" })
                  )}
                >
                  Tìm hiểu thêm về Cộng đồng
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <Image
                src="/images/community/community-network.svg"
                alt="Mạng lưới cộng đồng đối tác Backcom Mr Leo"
                width={560}
                height={360}
                className="w-full rounded-card border border-line"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

