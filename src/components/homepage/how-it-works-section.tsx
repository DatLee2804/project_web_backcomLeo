import {
  Building2,
  Link2,
  MousePointerClick,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";

const STEPS = [
  {
    step: "01",
    title: "Choose Broker",
    vnTitle: "Chọn sàn phù hợp",
    description:
      "Đối chiếu điều kiện giao dịch giữa Austex Markets (mặc định STD05), Exness, Tickmill, FxPro hoặc BCR.",
    icon: Building2,
  },
  {
    step: "02",
    title: "Register Account",
    vnTitle: "Đăng ký hoặc chuyển IB",
    description:
      "Mở tài khoản mới theo hướng dẫn đối tác hoặc gửi yêu cầu chuyển mã IB đối với tài khoản hiện có.",
    icon: MousePointerClick,
  },
  {
    step: "03",
    title: "Connect Your Account",
    vnTitle: "Xác nhận liên kết ID",
    description:
      "Cung cấp số ID tài khoản giao dịch (không cần mật khẩu) để đội ngũ xác nhận nằm trong hệ thống đối tác.",
    icon: Link2,
  },
  {
    step: "04",
    title: "Start Trading",
    vnTitle: "Giao dịch bình thường",
    description:
      "Thực hiện chiến lược giao dịch như thường lệ trên nền tảng của sàn với điều kiện thanh khoản gốc.",
    icon: TrendingUp,
  },
  {
    step: "05",
    title: "Receive Rebate",
    vnTitle: "Nhận hoàn phí định kỳ",
    description:
      "Khoản hoàn phí được tổng hợp và chi trả minh bạch theo chu kỳ đối soát của từng sàn giao dịch.",
    icon: Wallet,
  },
];

export function HowItWorksSection() {
  return (
    <section className="border-b border-line bg-background py-12 sm:py-14 lg:py-16">
      <div className="container">
        <SectionHeading
          eyebrow="REBATE WORKFLOW"
          title="HOW DOES BACKCOM WORK?"
          subtitle="Quy trình 5 bước đơn giản, minh bạch và an toàn tuyệt đối để bắt đầu nhận hoàn phí giao dịch Forex."
        />

        {/* Desktop Horizontal Timeline / Mobile Vertical Timeline */}
        <div className="relative mt-14">
          {/* Desktop connecting line */}
          <div className="pointer-events-none absolute left-10 right-10 top-8 hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent lg:block" />

          <div className="grid gap-6 lg:grid-cols-5">
            {STEPS.map((item, idx) => {
              const Icon = item.icon;
              const isLast = idx === STEPS.length - 1;
              return (
                <div
                  key={item.step}
                  className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center"
                >
                  {/* Mobile vertical line */}
                  {!isLast && (
                    <div className="pointer-events-none absolute bottom-[-24px] left-7 top-14 w-px bg-gold/30 lg:hidden" />
                  )}

                  {/* Step Node */}
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold/45 bg-card text-gold-light shadow-card lg:h-16 lg:w-16">
                    <Icon className="h-6 w-6" />
                    <span className="absolute -right-1.5 -top-1.5 rounded-full bg-gold px-1.5 py-0.5 text-[10px] font-extrabold text-[#080B12]">
                      {item.step}
                    </span>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 rounded-card border border-line bg-card/70 p-4 lg:mt-4 lg:w-full lg:p-5">
                    <h3 className="font-heading text-base font-bold text-ink-primary">
                      {item.title}
                    </h3>
                    <div className="mt-0.5 text-xs font-semibold text-gold-light">
                      {item.vnTitle}
                    </div>
                    <p className="mt-2.5 text-xs leading-relaxed text-ink-secondary">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

