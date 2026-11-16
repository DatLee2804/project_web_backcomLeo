import { Coins, Cpu, Globe2, Users2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { InteractiveCard } from "@/components/ui/card";

const FEATURES = [
  {
    icon: Coins,
    number: "01",
    title: "Forex Rebate",
    subtitle: "Tối ưu chi phí giao dịch thông qua cơ chế hoàn phí.",
    detail:
      "Chuyển hóa một phần chi phí spread và commission đã trả cho sàn thành dòng tiền hoàn lại định kỳ theo đúng cơ chế đối tác IB minh bạch.",
  },
  {
    icon: Globe2,
    number: "02",
    title: "Multiple Brokers",
    subtitle: "Lựa chọn nhiều sàn giao dịch.",
    detail:
      "Kết nối linh hoạt cùng Austex Markets, Exness, Tickmill, FxPro và BCR để phân bổ vốn hợp lý mà không bị phụ thuộc vào một nền tảng duy nhất.",
  },
  {
    icon: Cpu,
    number: "03",
    title: "Trading Ecosystem",
    subtitle: "Robot, Indicator và Trading Tools.",
    detail:
      "Hỗ trợ toàn diện từ công cụ tính toán Backcom, thư viện chỉ báo TradingView/MT5 đến giải pháp EA tự động hóa Amix Gold Cent Bot.",
  },
  {
    icon: Users2,
    number: "04",
    title: "Trader Community",
    subtitle: "Kết nối cộng đồng và đối tác.",
    detail:
      "Đồng hành cùng cộng đồng Trader và mạng lưới IB đối tác tại Việt Nam, cập nhật kiến thức quản trị rủi ro và hỗ trợ kỹ thuật trực tiếp.",
  },
];

export function WhyUsSection() {
  return (
    <section className="border-b border-line bg-background py-12 sm:py-14 lg:py-16">
      <div className="container">
        <SectionHeading
          eyebrow="CORE VALUE PROPOSITION"
          title="WHY TRADE WITH BACKCOM MR LEO?"
          subtitle="Hệ sinh thái kết hợp đồng bộ giữa hoàn phí giao dịch, hạ tầng đa sàn và bộ công cụ kỹ thuật thực chiến."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <InteractiveCard
                key={feature.title}
                className="group relative overflow-hidden p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/35 bg-gold/10 text-gold-light transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-heading text-2xl font-bold text-white/[0.08] transition-colors group-hover:text-gold/25">
                    {feature.number}
                  </span>
                </div>

                <h3 className="mt-6 font-heading text-xl font-bold text-ink-primary">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm font-medium text-gold-light/90">
                  {feature.subtitle}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-ink-secondary">
                  {feature.detail}
                </p>
              </InteractiveCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

