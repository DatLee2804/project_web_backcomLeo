import * as React from "react";
import Link from "next/link";
import { FileText, Info } from "lucide-react";
import { footerLinks } from "@/data/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  currentPath: string;
  children: React.ReactNode;
}

export function LegalLayout({
  title,
  subtitle,
  currentPath,
  children,
}: LegalLayoutProps) {
  return (
    <div className="bg-background py-14 sm:py-18">
      <div className="container max-w-5xl">
        <div className="max-w-3xl">
          <Badge variant="gold">LEGAL &amp; COMPLIANCE DRAFT</Badge>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink-primary sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-secondary sm:text-base">
            {subtitle}
          </p>
        </div>

        {/* Mandatory Draft Notice per Section 20 */}
        <div className="mt-6 flex items-start gap-3 rounded-card border border-amber-400/30 bg-amber-500/10 p-4 text-xs leading-relaxed text-amber-100 sm:text-sm">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <span>
            <strong>Ghi chú tình trạng văn bản:</strong> Nội dung trang pháp lý
            dưới đây là bản dự thảo khung thông tin để chủ sở hữu website{" "}
            <strong>backcommrleo.com.vn</strong> rà soát và hoàn thiện trước khi
            vận hành thương mại chính thức; không tuyên bố thay thế tư vấn pháp
            lý chuyên biệt tại từng quốc gia/vùng lãnh thổ.
          </span>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-4">
            <Card className="p-4">
              <div className="px-2 pb-2 text-xs font-bold uppercase tracking-wider text-ink-muted">
                Danh mục tài liệu pháp lý
              </div>
              <nav className="space-y-1">
                {footerLinks.legal.map((doc) => {
                  const active = doc.href === currentPath;
                  return (
                    <Link
                      key={doc.href}
                      href={doc.href}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "bg-card-hover text-gold-light border border-gold/30"
                          : "text-ink-secondary hover:bg-background-secondary hover:text-ink-primary"
                      )}
                    >
                      <FileText className="h-4 w-4 shrink-0 text-gold" />
                      <span>{doc.title}</span>
                    </Link>
                  );
                })}
              </nav>
            </Card>
          </aside>

          {/* Main Document Content */}
          <div className="lg:col-span-8">
            <Card className="space-y-6 p-6 text-sm leading-relaxed text-ink-secondary sm:p-8 sm:text-base">
              {children}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

