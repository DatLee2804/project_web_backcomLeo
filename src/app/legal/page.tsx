import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { footerLinks } from "@/data/navigation";
import { Badge } from "@/components/ui/badge";
import { InteractiveCard } from "@/components/ui/card";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Trung tâm Thông tin Pháp lý & Cảnh báo Rủi ro",
  description:
    "Tổng hợp dự thảo Chính sách bảo mật, Điều khoản dịch vụ, Cảnh báo rủi ro giao dịch Forex/CFD và Tuyên bố miễn trừ trách nhiệm của Backcom Mr Leo.",
  path: "/legal",
});

export default function LegalIndexPage() {
  return (
    <div className="bg-background py-16 sm:py-20">
      <div className="container max-w-4xl">
        <Badge variant="gold">LEGAL CENTER</Badge>
        <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink-primary sm:text-5xl">
          Tài liệu Pháp lý &amp; Cảnh báo Rủi ro
        </h1>
        <p className="mt-4 text-base text-ink-secondary">
          Vui lòng đọc kỹ các quy định về bảo mật thông tin, nguyên tắc sử dụng
          công cụ và cảnh báo rủi ro giao dịch đòn bẩy tài chính trước khi sử
          dụng hệ sinh thái.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {footerLinks.legal.map((item) => (
            <Link key={item.href} href={item.href}>
              <InteractiveCard className="flex items-center justify-between p-6">
                <div className="flex items-center gap-3.5">
                  <FileText className="h-6 w-6 text-gold" />
                  <span className="font-heading text-lg font-bold text-ink-primary">
                    {item.title}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-gold" />
              </InteractiveCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

