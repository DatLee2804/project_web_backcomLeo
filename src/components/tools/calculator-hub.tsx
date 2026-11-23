"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Clock, Layers } from "lucide-react";
import { BackcomCalculator } from "@/components/backcom/backcom-calculator";
import type { Broker } from "@/types";
import { Tabs, type TabOption } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CalcModuleId = "backcom" | "lot-size" | "risk" | "volume";

const MODULE_TABS: TabOption[] = [
  { id: "backcom", label: "Backcom Calculator", badge: "Active" },
  { id: "lot-size", label: "Lot Size Calculator", badge: "Phase 2" },
  { id: "risk", label: "Risk Calculator", badge: "Phase 2" },
  { id: "volume", label: "Trading Volume Calculator", badge: "Phase 2" },
];

const ROADMAP_MODULES: Record<
  Exclude<CalcModuleId, "backcom">,
  { title: string; summary: string; plannedSpecs: string[] }
> = {
  "lot-size": {
    title: "Lot Size Calculator (Đang phát triển giai đoạn 2)",
    summary:
      "Công cụ tính khối lượng vào lệnh chuẩn xác dựa trên số dư tài khoản, tỷ lệ % chấp nhận rủi ro và khoảng cách điểm dừng lỗ (Stop Loss pips/points) theo từng mã XAUUSD và Forex.",
    plannedSpecs: [
      "Tự động quy đổi Contract Size cho cả tài khoản Standard và tài khoản Cent",
      "Tính giá trị Pip Value cho các cặp tiền chéo (Cross Pairs) và Kim loại quý",
      "Không hiển thị ô tính giả lập khi chưa kết nối bảng tỷ giá quy đổi chuẩn",
    ],
  },
  risk: {
    title: "Risk & Drawdown Calculator (Đang phát triển giai đoạn 2)",
    summary:
      "Công cụ mô phỏng xác suất sụt giảm tài khoản qua chuỗi lệnh thua liên tiếp và tỷ lệ lãi cần thiết để phục hồi vốn ban đầu.",
    plannedSpecs: [
      "Bảng đối chiếu mức sụt giảm vốn (Drawdown %) so với mức tăng trưởng cần bù đắp",
      "Tính ngưỡng dừng giao dịch ngày (Daily Loss Limit) cho tài khoản cá nhân",
      "Tích hợp cảnh báo tỷ lệ ký quỹ an toàn trên MT5",
    ],
  },
  volume: {
    title: "Trading Volume Calculator (Đang phát triển giai đoạn 2)",
    summary:
      "Công cụ quy đổi giữa số Lot giao dịch và giá trị hợp đồng danh nghĩa (Notional USD Volume) phục vụ các sàn tính hoàn phí theo triệu USD giao dịch.",
    plannedSpecs: [
      "Quy đổi trực tiếp Lot tiêu chuẩn sang Notional Volume USD cho Forex, Gold và Crypto",
      "Ước tính tổng khối lượng tích lũy theo tuần, tháng và quý",
      "Liên thông trực tiếp với mô hình PER_VOLUME của Backcom Calculator",
    ],
  },
};

export function CalculatorHub({
  brokersList,
}: {
  brokersList?: Broker[];
}) {
  const [activeModule, setActiveModule] =
    React.useState<CalcModuleId>("backcom");

  return (
    <div>
      <Tabs
        options={MODULE_TABS}
        value={activeModule}
        onChange={(v) => setActiveModule(v as CalcModuleId)}
      />

      <div className="mt-8">
        {activeModule === "backcom" ? (
          <BackcomCalculator
            initialBrokerSlug="austex"
            brokersList={brokersList}
          />
        ) : (
          <Card className="p-8 sm:p-10">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="pending">ROADMAP • GIAI ĐOẠN TIẾP THEO</Badge>
              <Badge variant="neutral">Kiến trúc mô-đun mở rộng</Badge>
            </div>

            <div className="mt-5 flex items-start gap-3.5">
              <Clock className="mt-1 h-6 w-6 shrink-0 text-gold" />
              <div>
                <h2 className="font-heading text-xl font-bold text-ink-primary sm:text-2xl">
                  {ROADMAP_MODULES[activeModule].title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-secondary sm:text-base">
                  {ROADMAP_MODULES[activeModule].summary}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-line bg-background-secondary p-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-light">
                <Layers className="h-4 w-4" />
                Hạng mục kỹ thuật dự kiến tích hợp
              </div>
              <ul className="mt-3 space-y-2 text-xs text-ink-secondary sm:text-sm">
                {ROADMAP_MODULES[activeModule].plannedSpecs.map((spec) => (
                  <li key={spec}>• {spec}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveModule("backcom")}
                className={cn(
                  buttonVariants({ variant: "primary", size: "md" })
                )}
              >
                Chuyển về Backcom Calculator (Đang hoạt động)
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/contact"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "md" })
                )}
              >
                Đề xuất tính năng với đội ngũ
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

