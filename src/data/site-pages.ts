import type { SitePagesContent } from "@/types";
import { globalFaqs } from "@/data/faq";
import { SITE_CONFIG } from "@/lib/seo";

export const defaultSitePagesContent: SitePagesContent = {
  home: {
    promoBar: {
      enabled: true,
      badge: "AUSTEX PRIORITY",
      text: "Cấu hình tài khoản mặc định STD05 (XAUUSD Spread: 36) — Tối ưu hoàn phí hệ sinh thái",
      ctaLabel: "Xem chi tiết",
      ctaHref: "/brokers/austex",
    },
    hero: {
      eyebrow: "Hệ sinh thái 5 Sàn • Tối ưu phí giao dịch Forex",
      titleLine1: "TRADE SMARTER.",
      titleLine2: "GET MORE BACK.",
      description:
        "Tối ưu chi phí giao dịch Forex cùng Backcom Mr Leo. Kết nối hệ sinh thái sàn giao dịch đối tác, công cụ Trading, Bot EA và giải pháp hoàn phí minh bạch trọn đời tài khoản.",
      primaryCtaLabel: "Khám phá sàn giao dịch",
      primaryCtaHref: "/brokers",
      secondaryCtaLabel: "Tính Backcom chi tiết",
      secondaryCtaHref: "#backcom-calculator",
      floatingTagTitle: "Austex STD05",
      floatingTagSub: "XAUUSD Spread: 36",
      stats: [
        { value: "5", label: "BROKER PARTNERS" },
        { value: "STD05", label: "AUSTEX DEFAULT" },
        { value: "MT5 / TV", label: "EA & INDICATORS" },
        { value: "VI-VN", label: "TRADER COMMUNITY" },
      ],
    },
    promoVideo: {
      videoSrc: null,
      posterSrc: null,
      badge: "PROMO REEL • 9:16",
      title: "Hệ sinh thái Backcom Mr Leo",
      subtitle: "Trade Smarter. Get More Back.",
      ctaLabel: "Nhận tư vấn Backcom",
      ctaHref: "/contact",
    },
    rebateLoop: {
      badge: "CƠ CHẾ HOÀN PHÍ TỰ ĐỘNG & MINH BẠCH",
      title: "Backcom là gì?",
      paragraph1:
        "Backcom (Back Commission / Forex Rebate) là chương trình hoàn trả một phần phí giao dịch (Spread hoặc Commission) cho nhà giao dịch thông qua đối tác giới thiệu chính thức của sàn (Introducing Broker - IB).",
      paragraph2:
        "Khi bạn kết nối tài khoản dưới mã đối tác Backcom Mr Leo, điều kiện khớp lệnh tại sàn được giữ nguyên minh bạch, trong khi phần hoa hồng IB phát sinh trên mỗi Lot đóng lệnh sẽ được luân chuyển hoàn lại về cho bạn theo chính sách từng sàn.",
      footnote:
        "Miễn phí tham gia • Không hỏi mật khẩu giao dịch • 5 Sàn đối tác",
    },
    community: {
      badge: "TRADER & PARTNER HUB",
      title: "JOIN OUR TRADING COMMUNITY",
      description:
        "Cộng đồng đối tác Backcom Mr Leo – nơi kết nối trader, chia sẻ kiến thức và hỗ trợ hệ sinh thái giao dịch.",
      zaloGroupUrl: SITE_CONFIG.zaloGroupUrl,
      ctaLabel: "JOIN OUR COMMUNITY",
      imageUrl: "/images/community/community-network.svg",
    },
    finalCta: {
      title: "READY TO OPTIMIZE YOUR TRADING COST?",
      subtitle: "Bắt đầu khám phá hệ sinh thái Backcom Mr Leo ngay hôm nay.",
      primaryLabel: "Tính Backcom",
      primaryHref: "/tools/calculator",
      secondaryLabel: "Liên hệ tư vấn",
      secondaryHref: "/contact",
    },
    faqs: globalFaqs,
  },
  backcom: {
    hero: {
      badge: "FOREX REBATE / BACKCOM SERVICE",
      title: "Tối ưu chi phí giao dịch với cơ chế",
      highlightWord: "Forex Backcom minh bạch",
      description:
        "Trong giao dịch tần suất đều đặn, phí spread và commission chiếm tỷ trọng đáng kể trên tổng vốn. Dịch vụ Backcom Mr Leo giúp nhà giao dịch nhận lại một phần chi phí giao dịch từ nguồn hoa hồng đối tác IB của sàn một cách rõ ràng, đúng quy chuẩn.",
    },
    explanation: {
      eyebrow: "TRANSPARENT MODEL",
      title: "Backcom là gì & Hoa hồng IB vận hành như thế nào?",
      subtitle:
        "Hiểu rõ bản chất dòng tiền hoàn phí để giao dịch an tâm và tránh những hiểu lầm không đáng có.",
      paragraph1:
        "Khi bạn mở lệnh trên bất kỳ sàn Forex/CFD nào, bạn luôn trả phí giao dịch thông qua chênh lệch giá mua-bán (Spread) hoặc phí hoa hồng (Commission).",
      paragraph2:
        "Đối với khách hàng đăng ký qua đối tác giới thiệu (IB – Introducing Broker), sàn giao dịch sẽ trích một phần từ doanh thu phí đó để trả thù lao phát triển khách hàng cho IB. Hệ thống Backcom Mr Leo chủ động chia sẻ lại phần lớn khoản hoa hồng này về cho chính nhà giao dịch dưới dạng hoàn phí (Rebate).",
      importantNote:
        "Backcom là khoản giảm trừ chi phí giao dịch, không phải lợi nhuận đầu tư được cam kết. Mức hoàn trả thực tế luôn phụ thuộc vào điều khoản hợp đồng đối tác của từng sàn và từng loại tài khoản.",
      flowSteps: [
        {
          actor: "Nhà giao dịch (Trader)",
          desc: "Thực hiện giao dịch trên nền tảng của sàn và phát sinh phí Spread / Commission như thông thường.",
        },
        {
          actor: "Sàn giao dịch (Broker)",
          desc: "Ghi nhận khối lượng đóng lệnh hợp lệ và trích phần hoa hồng đối tác (IB Commission) từ doanh thu phí.",
        },
        {
          actor: "Hệ thống Backcom Mr Leo",
          desc: "Đối soát minh bạch theo cấu hình tài khoản (ví dụ Austex STD05, Exness, Tickmill, FxPro, BCR).",
        },
        {
          actor: "Hoàn trả về Trader (Rebate)",
          desc: "Nhà giao dịch nhận lại khoản hoàn phí định kỳ theo cơ chế chi trả của từng sàn.",
        },
      ],
    },
    benefits: [
      {
        title: "Giảm trực tiếp chi phí hòa vốn mỗi lệnh",
        description:
          "Mỗi lot giao dịch đóng lệnh đều phát sinh phí spread hoặc commission. Khoản hoàn phí giúp thu hẹp chi phí thực tế mà nhà giao dịch phải gánh chịu theo thời gian.",
      },
      {
        title: "Nhận hoàn phí bất kể lệnh Lãi hay Lỗ",
        description:
          "Cơ chế Backcom tính trên khối lượng hoặc phí giao dịch thực tế phát sinh của các lệnh hợp lệ, không phụ thuộc kết quả lời/lỗ của vị thế đó.",
      },
      {
        title: "Giữ nguyên quyền kiểm soát tài khoản tại sàn",
        description:
          "Tiền ký quỹ của bạn nằm trực tiếp tại sàn giao dịch. Backcom Mr Leo chỉ kết nối qua mã giới thiệu IB, không can thiệp nạp rút hay mật khẩu giao dịch.",
      },
      {
        title: "Cộng hưởng cùng hệ sinh thái công cụ Trading",
        description:
          "Thành viên liên kết tài khoản được ưu tiên hỗ trợ bộ chỉ báo TradingView/MT5, giải pháp Bot EA và đồng hành cùng cộng đồng.",
      },
    ],
    bottomCta: {
      title: "Sẵn sàng kết nối tài khoản nhận Backcom?",
      description:
        "Gửi yêu cầu tư vấn sàn giao dịch và loại tài khoản bạn đang quan tâm để nhận hướng dẫn liên kết mã đối tác chính xác nhất.",
    },
    deepGuide: {
      badge: "IN-DEPTH GUIDE",
      title: "Backcom là gì? Toàn tập về Forex Rebate & Hoa hồng IB",
      intro:
        "Bài viết chuyên sâu giải thích minh bạch cơ chế hình thành hoàn phí giao dịch ngoại hối, cách đối tác IB chia sẻ lại hoa hồng và những nguyên tắc cốt lõi nhà giao dịch cần nắm vững trước khi liên kết tài khoản.",
      sections: [
        {
          heading: "1. Forex Rebate (Backcom) là gì?",
          content:
            "Forex Rebate — tại thị trường Việt Nam thường được gọi phổ biến là Backcom (Back Commission) — là cơ chế hoàn trả lại một phần chi phí giao dịch (Spread hoặc Commission) cho nhà giao dịch sau khi họ thực hiện các lệnh mua bán trên sàn môi giới ngoại hối/CFD.\n\nDù vị thế đóng lại ở trạng thái có lãi hay dừng lỗ, miễn là lệnh đáp ứng quy định hợp lệ của sàn giao dịch thì phí giao dịch phát sinh đều được tính vào khối lượng xét hoàn phí.",
        },
        {
          heading: "2. IB Commission (Hoa hồng đại lý giới thiệu) là gì?",
          content:
            "Các sàn giao dịch quốc tế hợp tác với mạng lưới Introducing Broker (IB) — những đơn vị tư vấn, phát triển cộng đồng và hỗ trợ kỹ thuật cho khách hàng.\n\nKhi khách hàng mở tài khoản dưới mã định danh đối tác của IB và giao dịch, sàn trích một phần doanh thu từ phí spread/commission để trả cho IB (IB Commission).",
        },
        {
          heading: "3. Nhà giao dịch nhận lại hoa hồng như thế nào?",
          content:
            "Thay vì giữ lại toàn bộ hoa hồng IB, hệ thống Backcom Mr Leo thiết lập cơ chế chia sẻ ngược lại cho nhà giao dịch thông qua hai phương thức tùy hạ tầng từng sàn: Auto-Rebate tự động trực tiếp từ cổng sàn hoặc Đối soát định kỳ qua bảng kê khối lượng minh bạch.",
        },
        {
          heading: "4. Điều kiện ghi nhận lệnh nhận hoàn phí",
          content:
            "Tài khoản giao dịch phải nằm dưới mã đối tác IB của Backcom Mr Leo trước thời điểm phát sinh lệnh, thực hiện bằng vốn thực và tuân thủ quy định thời gian giữ lệnh tối thiểu / biên độ điểm tối thiểu (nếu sàn áp dụng).",
        },
      ],
      warnings: [
        "Không giao dịch quá mức vì hoàn phí: Tuyệt đối không nhồi lệnh hoặc tăng khối lượng bất chấp rủi ro chỉ để nhận thêm rebate.",
        "Kiểm tra kỹ loại tài khoản: Ví dụ tại Austex Markets, tài khoản mặc định là STD05 (XAUUSD Spread: 36) trong khi phương án đối chiếu là STD (XAUUSD Spread: 31). Hãy hiểu rõ tổng chi phí ròng trước khi chọn.",
        "Bảo mật tuyệt đối: Backcom Mr Leo chỉ cần ID tài khoản để kiểm tra liên kết IB, không bao giờ yêu cầu mật khẩu giao dịch hay mã OTP.",
      ],
    },
  },
  brokersPage: {
    hero: {
      badge: "BROKER ECOSYSTEM",
      title: "EXPLORE OUR BROKERS",
      description:
        "Lựa chọn đối tác sàn giao dịch phù hợp với phương pháp của bạn, đối chiếu minh bạch cấu hình tài khoản (ưu tiên Austex Markets STD05) và kết nối nhận hoàn phí giao dịch an toàn.",
    },
    comparisonTable: {
      title: "Bảng tổng hợp & So sánh thông số Sàn giao dịch",
      subtitle:
        "Đối chiếu nhanh các hạng mục tài khoản, nền tảng và chính sách hoàn phí của tất cả các sàn trong hệ sinh thái.",
    },
  },
};
