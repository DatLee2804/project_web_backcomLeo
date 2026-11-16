import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="container flex min-h-[65vh] flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/40 bg-card text-gold-light">
        <Compass className="h-8 w-8" />
      </div>
      <h1 className="mt-6 font-heading text-3xl font-bold text-ink-primary sm:text-4xl">
        Không tìm thấy trang yêu cầu (404)
      </h1>
      <p className="mt-3 max-w-md text-sm text-ink-secondary sm:text-base">
        Đường dẫn bạn truy cập không tồn tại hoặc đã được di chuyển trong hệ
        sinh thái Backcom Mr Leo.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "primary", size: "md" }))}
        >
          <ArrowLeft className="h-4 w-4" />
          Về Trang chủ
        </Link>
        <Link
          href="/brokers"
          className={cn(buttonVariants({ variant: "secondary", size: "md" }))}
        >
          Xem Sàn giao dịch
        </Link>
      </div>
    </div>
  );
}

