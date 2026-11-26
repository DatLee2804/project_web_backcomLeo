import type { Broker, BrokerTrustItem } from "@/types";
import { brokerRebateConfigs } from "./rebate-rates";
import { SITE_CONFIG } from "@/lib/seo";

const createPendingTrustReviews = (brokerName: string): BrokerTrustItem[] => [
  {
    platform: "Regulation",
    label: "Cơ quan quản lý (Regulation)",
    value: null,
    sourceName: `Hồ sơ pháp lý ${brokerName}`,
    sourceUrl: null,
    updatedAt: null,
    status: "pending",
  },
  {
    platform: "License",
    label: "Thông tin giấy phép (License)",
    value: null,
    sourceName: `Sổ đăng ký pháp nhân ${brokerName}`,
    sourceUrl: null,
    updatedAt: null,
    status: "pending",
  },
  {
    platform: "Trustpilot",
    label: "Đánh giá người dùng trên Trustpilot",
    value: null,
    sourceName: "Trustpilot",
    sourceUrl: "https://www.trustpilot.com",
    updatedAt: null,
    status: "pending",
  },
  {
    platform: "WikiFX",
    label: "Hồ sơ tra cứu trên WikiFX",
    value: null,
    sourceName: "WikiFX",
    sourceUrl: "https://www.wikifx.com/vi",
    updatedAt: null,
    status: "pending",
  },
  {
    platform: "Myfxbook",
    label: "Thống kê cộng đồng trên Myfxbook",
    value: null,
    sourceName: "Myfxbook",
    sourceUrl: "https://www.myfxbook.com",
    updatedAt: null,
    status: "pending",
  },
];

export const brokers: Broker[] = [
  {
    slug: "austex",
    name: "Austex Markets",
    shortName: "Austex",
    logo: "/images/brokers/austex-logo.png",
    featured: true,
    priorityOrder: 1,
    badge: "FEATURED BROKER",
    tagline: "Đối tác trọng tâm với cấu hình tài khoản mặc định STD05 (XAUUSD Spread: 36)",
    shortDescription:
      "Sàn giao dịch trọng điểm trong hệ sinh thái Backcom Mr Leo, cung cấp cấu hình tài khoản mặc định STD05 tối ưu cho đối tác nhận hoàn phí và so sánh trực quan với tài khoản STD.",
    overview: [
      "Austex Markets là đối tác sàn giao dịch được ưu tiên tích hợp trong hệ sinh thái Backcom Mr Leo, hướng tới các nhà giao dịch Forex và Kim loại quý (đặc biệt là cặp XAUUSD).",
      "Khi kết nối qua hệ thống đối tác Backcom Mr Leo, tài khoản STD05 được thiết lập làm phương án mặc định với thông số cấu hình XAUUSD Spread: 36. Bên cạnh đó, nhà giao dịch có thể tham khảo phương án tài khoản STD (thông số cấu hình XAUUSD Spread: 31) để đối chiếu cấu trúc chi phí trước khi lựa chọn.",
      "Mọi thông số chưa được xác minh chính thức (như đơn vị quy đổi chi tiết của spread, phí commission hoặc đường dẫn referral trực tiếp) đều được đánh dấu minh bạch ở trạng thái chờ cập nhật để đảm bảo tính chính xác tuyệt đối.",
    ],
    categories: ["Forex", "Metals"],
    platforms: [],
    platformsStatus: "pending",
    platformsNote: "Đang cập nhật xác nhận nền tảng giao dịch chính thức",
    accountsTableLabel: "STD05 (Mặc định) / STD",
    accounts: [
      {
        id: "austex-std05",
        name: "Tài khoản STD05 (Mặc định)",
        code: "STD05",
        isDefault: true,
        description:
          "Tài khoản mặc định dành cho khách hàng kết nối hoàn phí qua hệ sinh thái Backcom Mr Leo.",
        goldSpread: 36,
        spreadNote: "Thông số cấu hình cung cấp: 36 (đơn vị chi tiết chờ xác nhận chính thức)",
        commission: null,
        minDeposit: null,
        leverage: null,
        status: "confirmed",
      },
      {
        id: "austex-std",
        name: "Tài khoản STD (Phương án đối chiếu)",
        code: "STD",
        isDefault: false,
        description:
          "Phương án tài khoản tiêu chuẩn dùng để đối chiếu thông số cấu hình spread Vàng trước khi mở tài khoản.",
        goldSpread: 31,
        spreadNote: "Thông số cấu hình đối chiếu: 31 (không tự động chọn mặc định)",
        commission: null,
        minDeposit: null,
        leverage: null,
        status: "confirmed",
      },
    ],
    tradingProducts: [
      {
        code: "METALS",
        name: "Kim loại quý (Spot Metals)",
        symbolExample: "XAUUSD, XAGUSD",
        description: "Sản phẩm trọng tâm với thông số cấu hình XAUUSD được phân tách rõ giữa STD05 và STD.",
      },
      {
        code: "FOREX",
        name: "Cặp tiền tệ ngoại hối (Forex)",
        symbolExample: "EURUSD, GBPUSD, USDJPY",
        description: "Các cặp tiền chính, cặp chéo và ngoại tệ thanh khoản cao.",
      },
      {
        code: "CFD",
        name: "Danh mục CFD mở rộng",
        symbolExample: "Đang cập nhật",
        description: "Danh sách mã CFD năng lượng và chỉ số đang chờ cập nhật từ bảng thông số sàn.",
      },
    ],
    tradingConditions: [
      { label: "Tài khoản ưu tiên mặc định", value: "STD05" },
      { label: "Thông số XAUUSD Spread (STD05)", value: "36 (theo cấu hình cung cấp)" },
      { label: "Thông số XAUUSD Spread (STD so sánh)", value: "31 (phương án đối chiếu)" },
      { label: "Phí Commission", value: "Đang cập nhật", isPending: true },
      { label: "Đòn bẩy tối đa", value: "Đang cập nhật", isPending: true },
      { label: "Nền tảng giao dịch xác nhận", value: "Đang cập nhật", isPending: true },
    ],
    rebateConfig: brokerRebateConfigs.austex,
    rebateTableLabel: "Cấu hình theo STD05 / Đang cập nhật",
    referralUrl: "https://crm.austexmarkets.com/#/registration/i/IHsPmNGt",
    trustReviews: createPendingTrustReviews("Austex Markets"),
    highlights: [
      "Tài khoản mặc định STD05 (thông số cấu hình Gold Spread: 36)",
      "Minh bạch đối chiếu song song với tài khoản STD (Gold Spread: 31)",
      "Hỗ trợ tư vấn trực tiếp cấu hình hoàn phí tối ưu cho XAUUSD",
    ],
    faqs: [
      {
        id: "austex-std05-vs-std",
        question: "Tại sao tài khoản STD05 được đặt làm mặc định tại Austex Markets?",
        answer:
          "Tài khoản STD05 (thông số cấu hình XAUUSD Spread: 36) là cấu hình tài khoản mặc định dành cho luồng đối tác Backcom Mr Leo. Hệ thống vẫn hiển thị minh bạch phương án STD (XAUUSD Spread: 31) để nhà giao dịch chủ động so sánh cấu trúc chi phí trước khi quyết định, tuyệt đối không tự động áp đặt nhầm sang STD.",
      },
      {
        id: "austex-referral",
        question: "Làm thế nào để mở tài khoản Austex Markets dưới mã đối tác?",
        answer:
          "Bạn chỉ cần bấm nút Mở tài khoản Austex trên trang này để đăng ký trực tiếp dưới đường link đối tác IB chính thức của Mr Leo (tài khoản STD05), sau đó gửi ID tài khoản giao dịch cho đội ngũ hỗ trợ để xác nhận kích hoạt Backcom.",
      },
    ],
    status: "pending",
  },
  {
    slug: "exness",
    name: "Exness",
    shortName: "Exness",
    logo: "/images/brokers/exness-logo.png",
    featured: false,
    priorityOrder: 2,
    tagline: "Đối tác sàn giao dịch đa tài khoản trên nền tảng MT4 & MT5",
    shortDescription:
      "Kết nối hoàn phí giao dịch Forex & CFD trên nền tảng MT4/MT5 với quy trình liên kết mã đối tác linh hoạt cho cả tài khoản mới và hiện hữu.",
    overview: [
      "Exness là một trong những sàn giao dịch phổ biến tại thị trường Việt Nam, hỗ trợ hai nền tảng giao dịch quen thuộc là MetaTrader 4 (MT4) và MetaTrader 5 (MT5).",
      "Trong hệ sinh thái Backcom Mr Leo, nhà giao dịch sử dụng Exness có thể liên hệ để cấu hình liên kết hoàn phí phù hợp với loại tài khoản đang vận hành (đánh tay ngắn hạn, swing hoặc chạy EA).",
      "Các thông số về mức hoàn phí từng mã sản phẩm, danh sách phân hạng tài khoản chi tiết và đường dẫn referral chính thức đang được cập nhật đồng bộ.",
    ],
    categories: ["Forex", "Metals", "Crypto", "Indices"],
    platforms: ["MT4", "MT5"],
    platformsStatus: "confirmed",
    platformsNote: "Hỗ trợ nền tảng MT4 / MT5",
    accountsTableLabel: "Cấu hình linh hoạt (Đang cập nhật)",
    accounts: [
      {
        id: "exness-configurable-1",
        name: "Nhóm tài khoản Tiêu chuẩn / Cent (Chờ cấu hình)",
        code: "CONFIG-STD",
        isDefault: true,
        description: "Cấu hình tài khoản không thu phí commission riêng biệt, chi phí tính trong spread (đang cập nhật thông số chính thức).",
        goldSpread: null,
        commission: null,
        minDeposit: null,
        leverage: null,
        status: "pending",
      },
      {
        id: "exness-configurable-2",
        name: "Nhóm tài khoản Chuyên nghiệp / Raw (Chờ cấu hình)",
        code: "CONFIG-PRO",
        isDefault: false,
        description: "Cấu hình tài khoản chênh lệch thấp kèm commission theo từng sản phẩm (đang cập nhật thông số chính thức).",
        goldSpread: null,
        commission: null,
        minDeposit: null,
        leverage: null,
        status: "pending",
      },
    ],
    tradingProducts: [
      {
        code: "FOREX",
        name: "Ngoại hối (Forex)",
        symbolExample: "EURUSD, GBPUSD, USDJPY",
        description: "Nhóm cặp tiền chính, cặp chéo và ngoại tệ mới nổi.",
      },
      {
        code: "METALS",
        name: "Kim loại quý",
        symbolExample: "XAUUSD, XAGUSD",
        description: "Giao dịch Vàng và Bạc CFD trên MT4/MT5.",
      },
      {
        code: "INDICES_CRYPTO",
        name: "Chỉ số & Tài sản số CFD",
        symbolExample: "US30, BTCUSD",
        description: "Danh mục sản phẩm mở rộng theo quy định hiện hành của sàn.",
      },
    ],
    tradingConditions: [
      { label: "Nền tảng hỗ trợ", value: "MT4 / MT5" },
      { label: "Phân loại tài khoản", value: "Đang cập nhật cấu hình chi tiết", isPending: true },
      { label: "Spread & Commission", value: "Đang cập nhật", isPending: true },
      { label: "Chính sách hoàn phí", value: "Liên hệ / Cấu hình theo tài khoản", isPending: true },
    ],
    rebateConfig: brokerRebateConfigs.exness,
    rebateTableLabel: "Liên hệ / Đang cập nhật",
    referralUrl: "https://one.toexness.com/a/uh88l3hg",
    trustReviews: createPendingTrustReviews("Exness"),
    highlights: [
      "Hỗ trợ đầy đủ nền tảng giao dịch MT4 và MT5",
      "Linh hoạt cho cả chiến lược giao dịch tay và Robot EA",
      "Hỗ trợ hướng dẫn kiểm tra liên kết IB minh bạch",
    ],
    faqs: [
      {
        id: "exness-transfer-ib",
        question: "Tôi đã có tài khoản Exness thì có chuyển về nhận Backcom được không?",
        answer:
          "Bạn có thể gửi yêu cầu thay đổi đối tác giới thiệu trong khu vực cá nhân của sàn (nếu đủ điều kiện theo quy định hiện hành của Exness) rồi mở tiểu khoản giao dịch mới để áp dụng mã đối tác. Hãy liên hệ đội ngũ Backcom Mr Leo để được hướng dẫn từng bước.",
      },
    ],
    status: "pending",
  },
  {
    slug: "tickmill",
    name: "Tickmill",
    shortName: "Tickmill",
    logo: "/images/brokers/tickmill-logo.png",
    featured: false,
    priorityOrder: 3,
    tagline: "Giải pháp giao dịch Forex & CFD chuyên nghiệp trên MT4/MT5",
    shortDescription:
      "Đối tác sàn giao dịch hỗ trợ nền tảng MT4/MT5, phù hợp với nhà giao dịch ưu tiên cấu trúc phí minh bạch và thực thi lệnh kỷ luật.",
    overview: [
      "Tickmill là sàn giao dịch quốc tế cung cấp dịch vụ giao dịch Forex và CFD trên nền tảng MetaTrader 4 và MetaTrader 5.",
      "Thông qua hệ sinh thái Backcom Mr Leo, nhà giao dịch tại Tickmill được hỗ trợ đối chiếu loại tài khoản, hướng dẫn kết nối mã IB và ước tính khoản hoàn phí theo khối lượng giao dịch hoặc tỷ lệ commission.",
      "Biểu phí hoàn trả chính thức và đường dẫn mở tài khoản đối tác đang trong quá trình cập nhật dữ liệu xác thực.",
    ],
    categories: ["Forex", "Metals", "Indices"],
    platforms: ["MT4", "MT5"],
    platformsStatus: "confirmed",
    platformsNote: "Hỗ trợ nền tảng MT4 / MT5",
    accountsTableLabel: "Cấu hình linh hoạt (Đang cập nhật)",
    accounts: [
      {
        id: "tickmill-classic-cfg",
        name: "Tài khoản Tiêu chuẩn / Classic (Chờ cấu hình)",
        code: "CFG-CLASSIC",
        isDefault: true,
        description: "Phí giao dịch tích hợp vào spread, thuận tiện tính toán khối lượng (đang cập nhật thông số).",
        goldSpread: null,
        commission: null,
        minDeposit: null,
        leverage: null,
        status: "pending",
      },
      {
        id: "tickmill-raw-cfg",
        name: "Tài khoản Raw / Commission (Chờ cấu hình)",
        code: "CFG-RAW",
        isDefault: false,
        description: "Cấu trúc spread nguyên bản kết hợp phí commission trên mỗi lot giao dịch (đang cập nhật thông số).",
        goldSpread: null,
        commission: null,
        minDeposit: null,
        leverage: null,
        status: "pending",
      },
    ],
    tradingProducts: [
      {
        code: "FOREX",
        name: "Cặp tiền tệ Forex",
        symbolExample: "EURUSD, GBPUSD, AUDUSD",
        description: "Danh mục các cặp ngoại hối thanh khoản cao.",
      },
      {
        code: "METALS",
        name: "Kim loại quý CFD",
        symbolExample: "XAUUSD, XAGUSD",
        description: "Giao dịch Vàng và Bạc trên nền tảng MT4/MT5.",
      },
    ],
    tradingConditions: [
      { label: "Nền tảng hỗ trợ", value: "MT4 / MT5" },
      { label: "Loại tài khoản", value: "Đang cập nhật", isPending: true },
      { label: "Spread & Commission", value: "Đang cập nhật", isPending: true },
      { label: "Cơ chế hoàn phí", value: "Liên hệ / Cấu hình theo tài khoản", isPending: true },
    ],
    rebateConfig: brokerRebateConfigs.tickmill,
    rebateTableLabel: "Liên hệ / Đang cập nhật",
    referralUrl:
      "https://my.tickmill.com?utm_campaign=ib_link&utm_content=IB21878722_MT&utm_medium=Open+Account&utm_source=link&lp=https%3a%2f%2fmy.tickmill.com%2fvi%2fsign-up%2f",
    trustReviews: createPendingTrustReviews("Tickmill"),
    highlights: [
      "Tương thích hệ thống chỉ báo và EA trên MT4/MT5",
      "Hỗ trợ mô phỏng hoàn phí theo cả Commission và Lot",
      "Đồng hành kỹ thuật cùng cộng đồng Backcom Mr Leo",
    ],
    faqs: [
      {
        id: "tickmill-rebate-model",
        question: "Hoàn phí tại Tickmill được tính theo Lot hay theo phần trăm Commission?",
        answer:
          "Phương thức tính phụ thuộc vào loại tài khoản bạn đăng ký tại Tickmill. Bạn có thể sử dụng Backcom Calculator trên trang này hoặc liên hệ trực tiếp để nhận bảng cấu hình mới nhất.",
      },
    ],
    status: "pending",
  },
  {
    slug: "fxpro",
    name: "FxPro",
    shortName: "FxPro",
    logo: "/images/brokers/fxpro-logo.png",
    featured: false,
    priorityOrder: 4,
    tagline: "Sàn giao dịch quốc tế đa tài sản hỗ trợ hệ sinh thái MT4/MT5",
    shortDescription:
      "Lựa chọn đa dạng hóa danh mục sàn giao dịch cho nhà đầu tư Forex & CFD với nền tảng MT4/MT5 quen thuộc.",
    overview: [
      "FxPro là thương hiệu môi giới Forex & CFD lâu năm trên thị trường tài chính quốc tế, cung cấp hạ tầng giao dịch trên cả MT4 và MT5.",
      "Backcom Mr Leo tích hợp FxPro vào danh mục đối tác nhằm giúp các nhà giao dịch có nhu cầu phân bổ vốn đa sàn vẫn tối ưu được chi phí giao dịch định kỳ.",
      "Thông tin chi tiết về từng hạng tài khoản, mức spread tiêu chuẩn và tỷ lệ hoàn phí chính thức hiện đang ở trạng thái chờ cập nhật từ dữ liệu đối tác.",
    ],
    categories: ["Forex", "Metals", "Indices"],
    platforms: ["MT4", "MT5"],
    platformsStatus: "confirmed",
    platformsNote: "Hỗ trợ nền tảng MT4 / MT5",
    accountsTableLabel: "Cấu hình linh hoạt (Đang cập nhật)",
    accounts: [
      {
        id: "fxpro-mt4-cfg",
        name: "Tài khoản cấu hình MT4 (Chờ cập nhật)",
        code: "CFG-MT4",
        isDefault: true,
        description: "Tài khoản giao dịch trên nền tảng MetaTrader 4 (thông số chi tiết đang cập nhật).",
        goldSpread: null,
        commission: null,
        minDeposit: null,
        leverage: null,
        status: "pending",
      },
      {
        id: "fxpro-mt5-cfg",
        name: "Tài khoản cấu hình MT5 (Chờ cập nhật)",
        code: "CFG-MT5",
        isDefault: false,
        description: "Tài khoản giao dịch trên nền tảng MetaTrader 5 (thông số chi tiết đang cập nhật).",
        goldSpread: null,
        commission: null,
        minDeposit: null,
        leverage: null,
        status: "pending",
      },
    ],
    tradingProducts: [
      {
        code: "FOREX",
        name: "Cặp tiền tệ Forex",
        symbolExample: "EURUSD, USDJPY, GBPUSD",
        description: "Giao dịch CFD các cặp tiền tệ quốc tế.",
      },
      {
        code: "METALS_INDICES",
        name: "Kim loại & Chỉ số CFD",
        symbolExample: "XAUUSD, US500",
        description: "Danh mục CFD kim loại quý và chỉ số chứng khoán.",
      },
    ],
    tradingConditions: [
      { label: "Nền tảng xác nhận", value: "MT4 / MT5" },
      { label: "Cấu hình tài khoản", value: "Đang cập nhật", isPending: true },
      { label: "Spread & Commission", value: "Đang cập nhật", isPending: true },
      { label: "Mức hoàn phí chính thức", value: "Đang cập nhật", isPending: true },
    ],
    rebateConfig: brokerRebateConfigs.fxpro,
    rebateTableLabel: "Liên hệ / Đang cập nhật",
    referralUrl: "https://direct-vn.pro/vi/partner/NpoV4phV?platform=web",
    trustReviews: createPendingTrustReviews("FxPro"),
    highlights: [
      "Đa dạng hóa danh mục sàn giao dịch cùng MT4/MT5",
      "Hỗ trợ tính toán hoàn phí theo khối lượng USD quy đổi",
      "Quy trình xác minh liên kết tài khoản rõ ràng, bảo mật",
    ],
    faqs: [
      {
        id: "fxpro-account-check",
        question: "Cần cung cấp thông tin gì để kiểm tra liên kết Backcom tại FxPro?",
        answer:
          "Bạn chỉ cần gửi ID tài khoản giao dịch để đội ngũ kiểm tra trạng thái nằm dưới mã đối tác. Chúng tôi không bao giờ yêu cầu mật khẩu đăng nhập hay mật khẩu giao dịch của bạn.",
      },
    ],
    status: "pending",
  },
  {
    slug: "bcr",
    name: "BCR",
    shortName: "BCR",
    logo: "/images/brokers/bcr-logo.png",
    featured: false,
    priorityOrder: 5,
    tagline: "Kết nối đối tác BCR với hướng dẫn cổng khách hàng & đối soát hoàn phí tách biệt",
    shortDescription:
      "Hỗ trợ nhà giao dịch tại BCR liên kết nhận hoàn phí, truy cập nhanh cổng đăng nhập BCR chính thức và hướng dẫn quy trình kiểm tra rebate minh bạch.",
    overview: [
      "BCR là một trong 5 đối tác sàn giao dịch thuộc hệ sinh thái Backcom Mr Leo, phục vụ nhóm nhà giao dịch Forex và CFD đang tìm kiếm cơ chế tối ưu chi phí giao dịch dài hạn.",
      "Trang thông tin BCR trên Backcom Mr Leo cung cấp lối tắt dẫn thẳng tới cổng đăng nhập khách hàng của BCR để thuận tiện quản lý tài khoản, đồng thời hướng dẫn quy trình kiểm tra hoàn phí thông qua đội ngũ hỗ trợ của Mr Leo.",
      "Lưu ý minh bạch: Cổng đăng nhập khách hàng của BCR và hệ thống đối soát/kiểm tra hoàn phí của Backcom Mr Leo là hai chức năng hoàn toàn độc lập; website này không can thiệp hay tự động đọc dữ liệu tài khoản BCR của khách hàng.",
    ],
    categories: ["Forex", "Metals"],
    platforms: [],
    platformsStatus: "pending",
    platformsNote: "Đang cập nhật xác nhận nền tảng giao dịch chính thức",
    accountsTableLabel: "Cấu hình linh hoạt (Đang cập nhật)",
    accounts: [
      {
        id: "bcr-standard-cfg",
        name: "Tài khoản giao dịch BCR (Chờ cập nhật thông số)",
        code: "BCR-CFG",
        isDefault: true,
        description: "Các hạng tài khoản và thông số spread/commission tại BCR đang được cập nhật chính thức.",
        goldSpread: null,
        commission: null,
        minDeposit: null,
        leverage: null,
        status: "pending",
      },
    ],
    tradingProducts: [
      {
        code: "FOREX",
        name: "Ngoại hối (Forex CFD)",
        symbolExample: "EURUSD, GBPUSD, AUDUSD",
        description: "Giao dịch các cặp tiền tệ chính và chéo.",
      },
      {
        code: "METALS",
        name: "Kim loại quý CFD",
        symbolExample: "XAUUSD, XAGUSD",
        description: "Giao dịch Vàng và kim loại quý theo điều kiện sàn BCR.",
      },
    ],
    tradingConditions: [
      { label: "Nền tảng giao dịch", value: "Đang cập nhật xác nhận", isPending: true },
      { label: "Loại tài khoản", value: "Đang cập nhật", isPending: true },
      { label: "Spread & Commission", value: "Đang cập nhật", isPending: true },
      { label: "Cổng khách hàng BCR", value: "thebcr.com (Liên kết ngoài độc lập)" },
    ],
    rebateConfig: brokerRebateConfigs.bcr,
    rebateTableLabel: "Liên hệ / Đang cập nhật",
    referralUrl:
      "https://thebcrglobal.com/sign-up?code=RACK7PO3W6D&siteId=5&lang=vi-vn",
    externalPortal: {
      loginUrl: SITE_CONFIG.bcrPortalLoginUrl,
      loginLabel: "Đăng nhập Cổng BCR (thebcr.com)",
      rebateCheckNote:
        "Cổng đăng nhập quản lý tài khoản của sàn BCR (thebcr.com) và quy trình kiểm tra hoàn phí (Rebate) của Backcom Mr Leo là hai hệ thống hoàn toàn khác nhau. Website Backcom Mr Leo không tự động truy xuất dữ liệu tài khoản BCR của bạn.",
    },
    trustReviews: createPendingTrustReviews("BCR"),
    highlights: [
      "Tích hợp nút truy cập nhanh cổng khách hàng chính thức BCR",
      "Phân tách minh bạch giữa cổng sàn và quy trình tra cứu hoàn phí",
      "Hướng dẫn từng bước kiểm tra liên kết IB an toàn, không cần mật khẩu",
    ],
    faqs: [
      {
        id: "bcr-portal-difference",
        question: "Đăng nhập vào cổng BCR trên nút liên kết có xem được luôn tiền hoàn phí của Mr Leo không?",
        answer:
          "Cổng đăng nhập BCR (thebcr.com) là trang quản trị tài khoản giao dịch trực tiếp của sàn BCR. Trong khi đó, việc kiểm tra trạng thái liên kết và đối soát hoàn phí của hệ thống Backcom Mr Leo là chức năng riêng biệt. Để kiểm tra hoàn phí, vui lòng xem hướng dẫn trên trang này hoặc liên hệ trực tiếp đội ngũ hỗ trợ.",
      },
    ],
    status: "pending",
  },
];

export function getBrokerBySlug(slug: string): Broker | undefined {
  return brokers.find((b) => b.slug === slug);
}

export function getOrderedBrokers(): Broker[] {
  return [...brokers].sort((a, b) => a.priorityOrder - b.priorityOrder);
}

