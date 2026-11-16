import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { constructMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Backcom là gì? Giải thích chuyên sâu về Forex Rebate & IB Commission",
  description:
    "Tài liệu hướng dẫn chi tiết Backcom (Forex Rebate) là gì, cơ chế hoa hồng IB, 3 mô hình hoàn phí phổ biến, điều kiện nhận tiền và các lưu ý quan trọng cho trader.",
  path: "/backcom/what-is-backcom",
});

export default function WhatIsBackcomPage() {
  return (
    <div className="bg-background py-12 sm:py-16 lg:py-20">
      <div className="container max-w-4xl">
        <Link
          href="/backcom"
          className="inline-flex items-center gap-2 text-xs font-semibold text-ink-secondary transition-colors hover:text-gold-light"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Quay lại trang Dịch vụ Backcom
        </Link>

        <div className="mt-6">
          <Badge variant="gold">IN-DEPTH GUIDE</Badge>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-ink-primary sm:text-4xl lg:text-5xl">
            Backcom là gì? Toàn tập về Forex Rebate &amp; Hoa hồng IB
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-secondary sm:text-lg">
            Bài viết chuyên sâu giải thích minh bạch cơ chế hình thành hoàn phí
            giao dịch ngoại hối, cách đối tác IB chia sẻ lại hoa hồng và những
            nguyên tắc cốt lõi nhà giao dịch cần nắm vững trước khi liên kết tài
            khoản.
          </p>
        </div>

        <div className="mt-10 space-y-8">
          {/* 1. Rebate là gì */}
          <Card className="p-6 sm:p-8">
            <h2 className="font-heading text-xl font-bold text-gold-light sm:text-2xl">
              1. Forex Rebate (Backcom) là gì?
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-secondary sm:text-base">
              <p>
                <strong className="text-ink-primary">Forex Rebate</strong> — tại
                thị trường Việt Nam thường được gọi phổ biến là{" "}
                <strong className="text-ink-primary">
                  Backcom (Back Commission)
                </strong>{" "}
                — là cơ chế hoàn trả lại một phần chi phí giao dịch (Spread hoặc
                Commission) cho nhà giao dịch sau khi họ thực hiện các lệnh mua
                bán trên sàn môi giới ngoại hối/CFD.
              </p>
              <p>
                Về mặt bản chất kinh tế, Backcom tương tự chương trình hoàn tiền
                (Cashback) dựa trên doanh số giao dịch thực tế. Dù vị thế đóng
                lại ở trạng thái có lãi hay dừng lỗ, miễn là lệnh đáp ứng quy
                định hợp lệ của sàn giao dịch thì phí giao dịch phát sinh đều
                được tính vào khối lượng xét hoàn phí.
              </p>
            </div>
          </Card>

          {/* 2. IB Commission là gì */}
          <Card className="p-6 sm:p-8">
            <h2 className="font-heading text-xl font-bold text-gold-light sm:text-2xl">
              2. IB Commission (Hoa hồng đại lý giới thiệu) là gì?
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-secondary sm:text-base">
              <p>
                Các sàn giao dịch quốc tế thay vì chi toàn bộ ngân sách cho
                quảng cáo đại chúng sẽ hợp tác với mạng lưới{" "}
                <strong className="text-ink-primary">
                  Introducing Broker (IB)
                </strong>{" "}
                — những đơn vị tư vấn, phát triển cộng đồng và hỗ trợ kỹ thuật
                cho khách hàng.
              </p>
              <p>
                Khi một khách hàng mở tài khoản dưới mã định danh đối tác của IB
                và giao dịch, sàn trích một phần doanh thu từ phí spread/commission
                để trả cho IB (gọi là <strong>IB Commission</strong>). Khoản chi
                trả này lấy từ ngân sách chia sẻ doanh thu của sàn trong cấu
                trúc loại tài khoản tương ứng.
              </p>
            </div>
          </Card>

          {/* 3. Trader nhận lại hoa hồng như thế nào */}
          <Card className="p-6 sm:p-8">
            <h2 className="font-heading text-xl font-bold text-gold-light sm:text-2xl">
              3. Nhà giao dịch nhận lại hoa hồng như thế nào?
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-secondary sm:text-base">
              <p>
                Thay vì giữ lại toàn bộ hoa hồng IB, hệ thống{" "}
                <strong className="text-ink-primary">Backcom Mr Leo</strong>{" "}
                thiết lập cơ chế chia sẻ ngược lại cho nhà giao dịch theo hai
                phương thức phổ biến tùy hạ tầng kỹ thuật của từng sàn:
              </p>
              <ul className="space-y-2.5 pt-2">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <span>
                    <strong className="text-ink-primary">
                      Auto-Rebate trực tiếp từ hệ thống sàn:
                    </strong>{" "}
                    Một số sàn cho phép cài đặt tỷ lệ hoàn trả tự động ngay trên
                    cổng đối tác, tiền hoàn phí sẽ được cộng trực tiếp vào ví
                    hoặc tài khoản giao dịch của khách hàng theo chu kỳ của sàn.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <span>
                    <strong className="text-ink-primary">
                      Đối soát định kỳ qua bảng kê khối lượng:
                    </strong>{" "}
                    Với những sàn chưa hỗ trợ chia tự động trực tiếp, đội ngũ sẽ
                    đối soát báo cáo khối lượng đóng lệnh hợp lệ từ cổng đối tác
                    và thanh toán theo lịch trình thỏa thuận rõ ràng.
                  </span>
                </li>
              </ul>
            </div>
          </Card>

          {/* 4. Các loại mô hình hoàn phí */}
          <Card className="p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <Layers className="h-5 w-5 text-gold" />
              <h2 className="font-heading text-xl font-bold text-gold-light sm:text-2xl">
                4. Các loại mô hình tính hoàn phí phổ biến
              </h2>
            </div>
            <p className="mt-3 text-sm text-ink-secondary">
              Mỗi sàn giao dịch và mỗi nhóm tài khoản áp dụng một đơn vị tính
              khác nhau. Bạn không nên giả định mọi sàn đều trả một mức cố định
              giống nhau:
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-line bg-background-secondary p-4">
                <div className="font-heading text-sm font-bold text-ink-primary">
                  Mô hình PER_LOT
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
                  Tính bằng số USD cố định trên mỗi Lot tiêu chuẩn đóng lệnh (ví
                  dụ X USD/lot cho XAUUSD hoặc EURUSD). Thường gặp ở các tài
                  khoản Standard.
                </p>
              </div>
              <div className="rounded-xl border border-line bg-background-secondary p-4">
                <div className="font-heading text-sm font-bold text-ink-primary">
                  Mô hình PER_COMMISSION
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
                  Tính theo tỷ lệ % trên tổng phí Commission mà nhà giao dịch đã
                  trả cho sàn. Thường áp dụng cho các tài khoản Raw Spread / ECN.
                </p>
              </div>
              <div className="rounded-xl border border-line bg-background-secondary p-4">
                <div className="font-heading text-sm font-bold text-ink-primary">
                  Mô hình PER_VOLUME
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-secondary">
                  Tính bằng số USD trên mỗi 1 triệu USD giá trị hợp đồng danh
                  nghĩa (Notional Volume). Phổ biến với CFD Crypto, Cổ phiếu hoặc
                  một số sàn châu Âu.
                </p>
              </div>
            </div>
          </Card>

          {/* 5. Điều kiện nhận tiền */}
          <Card className="p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 text-gold" />
              <h2 className="font-heading text-xl font-bold text-gold-light sm:text-2xl">
                5. Điều kiện ghi nhận lệnh nhận hoàn phí
              </h2>
            </div>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-ink-secondary">
              <li>
                • Tài khoản giao dịch phải được xác nhận nằm dưới mã đối tác IB
                của Backcom Mr Leo trước thời điểm phát sinh lệnh.
              </li>
              <li>
                • Vị thế phải được thực hiện bằng vốn thực (không tính phần giao
                dịch bằng Credit/Bonus khuyến mãi nếu sàn loại trừ).
              </li>
              <li>
                • Một số sàn quy định thời gian giữ lệnh tối thiểu (Minimum
                Holding Time) hoặc biên độ điểm tối thiểu (MTP - Minimum
                Transaction Points) giữa giá mở và giá đóng lệnh để tính hoa
                hồng IB.
              </li>
              <li>
                • Không vi phạm quy tắc giao dịch của sàn (như Arbitrage độ trễ,
                lạm dụng lỗi báo giá hoặc hedging chéo gian lận khuyến mãi).
              </li>
            </ul>
          </Card>

          {/* 6. Các lưu ý quan trọng */}
          <div className="rounded-card border border-amber-400/30 bg-amber-500/[0.07] p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-gold" />
              <div>
                <h2 className="font-heading text-lg font-bold text-ink-primary sm:text-xl">
                  6. Các lưu ý quan trọng dành cho nhà giao dịch
                </h2>
                <ul className="mt-3 space-y-2 text-xs leading-relaxed text-ink-secondary sm:text-sm">
                  <li>
                    <strong>Không giao dịch quá mức vì hoàn phí:</strong> Tuyệt
                    đối không nhồi lệnh hoặc tăng khối lượng bất chấp rủi ro chỉ
                    để nhận thêm rebate. Bảo toàn vốn luôn là ưu tiên số một.
                  </li>
                  <li>
                    <strong>Kiểm tra kỹ loại tài khoản:</strong> Ví dụ tại
                    Austex Markets, tài khoản mặc định trong luồng đối tác là{" "}
                    <strong className="text-gold-light">
                      STD05 (XAUUSD Spread: 36)
                    </strong>{" "}
                    trong khi phương án đối chiếu là{" "}
                    <strong className="text-ink-primary">
                      STD (XAUUSD Spread: 31)
                    </strong>
                    . Hãy hiểu rõ tổng chi phí ròng (Spread trừ đi Rebate) trước
                    khi chọn.
                  </li>
                  <li>
                    <strong>Bảo mật tuyệt đối:</strong> Backcom Mr Leo chỉ cần
                    ID tài khoản để kiểm tra liên kết IB, tuyệt đối không bao
                    giờ yêu cầu mật khẩu giao dịch, mã OTP hay quyền rút tiền.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-card border border-line bg-card p-6">
          <div>
            <div className="font-heading text-lg font-bold text-ink-primary">
              Bạn muốn kiểm tra mức hoàn phí cho sàn đang giao dịch?
            </div>
            <p className="text-xs text-ink-secondary sm:text-sm">
              Sử dụng công cụ tính toán hoặc gửi yêu cầu xác nhận biểu phí chính
              thức.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/calculator"
              className={cn(buttonVariants({ variant: "primary", size: "md" }))}
            >
              Mở Backcom Calculator
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "secondary", size: "md" })
              )}
            >
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

