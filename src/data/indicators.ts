import type { TradingIndicator } from "@/types";

export const tradingIndicators: TradingIndicator[] = [
  {
    id: "leo-session-liquidity",
    slug: "leo-session-liquidity",
    name: "Leo Session & Liquidity Zones",
    platform: "TradingView",
    category: "Market Structure & Sessions",
    status: "pending",
    subtitle:
      "Chỉ báo tự động xác lập biên độ phiên Á – Âu – Mỹ kết hợp đánh dấu các ngưỡng thanh khoản đỉnh/đáy phiên trước dành cho giao dịch XAUUSD và Forex trong ngày.",
    summary:
      "Chỉ báo đánh dấu tự động biên độ phiên Á – Âu – Mỹ (Asian Range, London Killzone, NY Session) cùng các vùng đỉnh/đáy thanh khoản quan trọng trên biểu đồ XAUUSD và Forex.",
    features: [
      "Tự động đóng khung biên độ cao/thấp từng phiên theo múi giờ Việt Nam (UTC+7)",
      "Đánh dấu trực quan vùng Previous Day High/Low (PDH/PDL) và Weekly High/Low",
      "Cảnh báo khi giá quét qua vùng biên thanh khoản phiên trước",
      "Tùy chọn ẩn/hiện đường trung vị (Midline 50%) của biên độ phiên Á",
    ],
    previewImage: "/images/indicators/indicator-session-preview.svg",
    targetMarkets: ["XAUUSD (Gold)", "EURUSD", "GBPUSD", "US30 / NAS100"],
    recommendedTimeframes: ["M5", "M15", "M30", "H1"],
    introduction: [
      "Trong giao dịch Intraday trên cặp XAUUSD và các cặp ngoại hối chính, phần lớn các cú bứt phá mạnh hoặc đảo chiều giả (Liquidity Sweep) đều diễn ra xung quanh thời điểm chuyển giao giữa phiên Á sang phiên Âu (London Open) và phiên Mỹ (New York Open).",
      "Leo Session & Liquidity Zones giúp nhà giao dịch loại bỏ thao tác kẻ khung thủ công mỗi ngày bằng cách tự động hóa toàn bộ hộp biên độ phiên và kéo dài các mốc thanh khoản đỉnh/đáy chưa bị quét trên biểu đồ TradingView.",
      "Công cụ được thiết kế theo triết lý tối giản trên nền tối, hỗ trợ quan sát hành động giá nguyên bản mà không che khuất thân nến.",
    ],
    howItWorks: [
      {
        title: "Khoanh vùng Asian Range & Killzones chuẩn UTC+7",
        description:
          "Tự động đồng bộ múi giờ, vẽ khung biên độ tích lũy phiên Á làm cơ sở tham chiếu cho kịch bản quét hai đầu khi vào phiên Âu và Mỹ.",
      },
      {
        title: "Theo dõi trạng thái đường thanh khoản PDH / PDL",
        description:
          "Vẽ tự động đỉnh và đáy của ngày giao dịch liền trước (Previous Day High/Low) và đổi trạng thái hiển thị ngay khi giá chạm hoặc đóng nến vượt qua.",
      },
      {
        title: "Hệ thống Alert chủ động trên TradingView",
        description:
          "Cho phép cài đặt cảnh báo đẩy về điện thoại/máy tính ngay khi giá vừa quét qua đỉnh/đáy phiên Á để người giao dịch kiểm tra tín hiệu xác nhận.",
      },
      {
        title: "Tích hợp đường cân bằng Equilibrium (50% Range)",
        description:
          "Xác định nhanh vùng Premium / Discount trong biên độ ngày để tối ưu vị trí đặt lệnh và tỷ lệ Risk:Reward.",
      },
    ],
    parameters: [
      { label: "Nền tảng vận hành", value: "TradingView (Pine Script v5)" },
      { label: "Cơ chế cấp quyền", value: "Invite-Only Script (Theo Username TV)" },
      { label: "Múi giờ mặc định", value: "UTC+7 (Giờ Việt Nam — Có thể tùy chỉnh)" },
      { label: "Khung thời gian tối ưu", value: "M5 – M15 – H1 (Tự ẩn trên khung D1+)" },
      { label: "Tính chất tín hiệu", value: "Non-Repaint (Cố định theo giá thực tế)" },
      { label: "Hỗ trợ Alert", value: "Có (Asian High/Low Sweep & PDH/PDL Touch)" },
    ],
    installationSteps: [
      {
        step: 1,
        title: "Liên kết tài khoản giao dịch đối tác",
        description:
          "Đảm bảo bạn đã có ít nhất một tài khoản giao dịch nằm dưới mã đối tác của hệ sinh thái Backcom Mr Leo.",
      },
      {
        step: 2,
        title: "Gửi Username TradingView xác thực",
        description:
          "Gửi ID tài khoản sàn kèm tên tài khoản TradingView (Username) qua trang Liên hệ hoặc nhóm Zalo hỗ trợ.",
      },
      {
        step: 3,
        title: "Mở mục Invite-Only Scripts trên TradingView",
        description:
          "Sau khi nhận thông báo đã cấp quyền, mở biểu đồ TradingView → nhấn nút Indicators → chọn tab Invite-only scripts.",
      },
      {
        step: 4,
        title: "Thêm vào biểu đồ & Lưu Template",
        description:
          "Nhấp chọn Leo Session & Liquidity Zones, tinh chỉnh màu sắc hộp phiên theo sở thích và lưu thành Indicator Template.",
      },
    ],
    usageNotes: [
      "Chỉ báo đóng vai trò xác định vùng giá đáng chú ý theo thời gian phiên, không phải tín hiệu tự động Mua/Bán mù quáng khi giá vừa chạm biên.",
      "Trong những ngày có tin tức vĩ mô đặc biệt mạnh (CPI, FOMC, Non-Farm), biên độ phiên có thể bị phá vỡ một chiều không hồi lại — luôn bắt buộc đặt Stop Loss.",
      "Kết hợp hiệu quả nhất khi đồng thuận cùng cấu trúc xu hướng khung lớn từ chỉ báo Leo Multi-Timeframe Trend Matrix.",
    ],
    faqs: [
      {
        id: "session-free-tv",
        question: "Tài khoản TradingView miễn phí (Basic) có dùng được chỉ báo này không?",
        answer:
          "Hoàn toàn dùng được. Các script dạng Invite-Only khi đã được cấp quyền theo Username đều hoạt động đầy đủ trên cả tài khoản TradingView miễn phí lẫn trả phí, chỉ tính là 1 slot chỉ báo trên biểu đồ.",
      },
      {
        id: "session-dst",
        question: "Khi thị trường Âu – Mỹ đổi giờ mùa Đông / mùa Hè (DST) chỉ báo có bị lệch không?",
        answer:
          "Trong phần Settings của chỉ báo có sẵn tùy chọn chế độ giờ phiên London/NY theo sàn hoặc tự động điều chỉnh DST để đảm bảo khung giờ mở cửa luôn khớp thực tế.",
      },
    ],
  },
  {
    id: "leo-trend-confluence",
    slug: "leo-trend-confluence",
    name: "Leo Multi-Timeframe Trend Matrix",
    platform: "TradingView",
    category: "Trend & Momentum",
    status: "pending",
    subtitle:
      "Bảng điều khiển tổng hợp đồng thuận xu hướng đa khung thời gian (M15 – H1 – H4 – D1) kết hợp dải EMA động hỗ trợ giao dịch thuận cấu trúc lớn.",
    summary:
      "Bảng tổng hợp đồng thuận xu hướng đa khung thời gian (M15, H1, H4, D1) ngay trên góc biểu đồ, hỗ trợ trader giao dịch thuận cấu trúc thị trường lớn.",
    features: [
      "Ma trận trạng thái xu hướng 4 khung thời gian theo thời gian thực",
      "Hiển thị dải EMA động hỗ trợ nhận diện vùng hồi quy hợp lưu",
      "Giao diện tối giản chuẩn Dark Theme không gây rối nến giá",
      "Cảnh báo khi cả 3–4 khung thời gian chuyển sang đồng thuận cùng chiều",
    ],
    previewImage: "/images/indicators/indicator-trend-preview.svg",
    targetMarkets: ["XAUUSD", "Cặp tiền chính G7", "BTCUSD", "Chỉ số CFD"],
    recommendedTimeframes: ["M15", "H1", "H4"],
    introduction: [
      "Một trong những nguyên nhân phổ biến khiến nhà giao dịch thua lỗ liên tiếp là mải nhìn biểu đồ khung nhỏ (M5/M15) và vào lệnh ngược hoàn toàn với xu hướng chủ đạo trên H1/H4.",
      "Leo Multi-Timeframe Trend Matrix giải quyết bài toán này bằng một bảng HUD nhỏ gọn ở góc màn hình, liên tục đọc cấu trúc EMA và xung lượng đóng nến của 4 khung thời gian độc lập để báo trạng thái Bullish, Bearish hoặc Pullback.",
      "Nhờ đó, bạn không cần liên tục chuyển qua lại giữa nhiều tab biểu đồ mà vẫn nắm bắt trọn vẹn bức tranh toàn cảnh.",
    ],
    howItWorks: [
      {
        title: "Đọc dữ liệu đa khung thời gian chuẩn xác (Confirmed Candle)",
        description:
          "Sử dụng cơ chế truy xuất dữ liệu đóng nến chuẩn trên Pine Script để tránh hiện tượng nhấp nháy giả (repainting) của các khung thời gian lớn.",
      },
      {
        title: "Dải băng xu hướng Dynamic EMA Ribbon",
        description:
          "Vẽ cặp đường trung bình động thích ứng trực tiếp trên khung hiện tại, đóng vai trò vùng đệm động khi giá điều chỉnh (Pullback) trong xu hướng mạnh.",
      },
      {
        title: "Phân loại 3 trạng thái thị trường rõ ràng",
        description:
          "Tách bạch rõ trạng thái Tăng (Bullish), Giảm (Bearish) và Đi ngang/Điều chỉnh (Pullback/Neutral) để hạn chế giao dịch khi thị trường nhiễu.",
      },
      {
        title: "Tùy biến vị trí & kích thước bảng HUD",
        description:
          "Cho phép đặt bảng ma trận ở bất kỳ góc nào trên màn hình (Top-Right, Bottom-Right...) phù hợp cả màn hình máy tính lẫn điện thoại.",
      },
    ],
    parameters: [
      { label: "Nền tảng vận hành", value: "TradingView (Pine Script v5)" },
      { label: "Khung mặc định trong Matrix", value: "M15 • H1 • H4 • D1 (Tùy chỉnh được)" },
      { label: "Bộ lọc xu hướng lõi", value: "EMA Structure + ATR Momentum Filter" },
      { label: "Chế độ chống vẽ lại", value: "Bật mặc định (Confirmed Bar Close)" },
      { label: "Tùy chỉnh giao diện", value: "Compact / Normal HUD Mode" },
      { label: "Cơ chế cấp quyền", value: "Invite-Only dành cho thành viên hệ sinh thái" },
    ],
    installationSteps: [
      {
        step: 1,
        title: "Xác nhận tài khoản thành viên",
        description:
          "Liên kết tài khoản giao dịch tại một trong các sàn đối tác của Backcom Mr Leo.",
      },
      {
        step: 2,
        title: "Đăng ký Username TradingView",
        description:
          "Cung cấp Username TradingView qua biểu mẫu Liên hệ để đội ngũ kích hoạt quyền truy cập thư viện chỉ báo.",
      },
      {
        step: 3,
        title: "Kích hoạt trong mục Invite-Only",
        description:
          "Vào biểu đồ TradingView → Indicators → Invite-only scripts → chọn Leo Multi-Timeframe Trend Matrix.",
      },
      {
        step: 4,
        title: "Cấu hình bộ khung thời gian theo phong cách đánh",
        description:
          "Nếu đánh Scalping có thể chọn bộ M5-M15-H1-H4; nếu đánh Swing chọn bộ H1-H4-D1-W1 trong phần Settings.",
      },
    ],
    usageNotes: [
      "Các chỉ báo theo xu hướng (Trend-following) phát huy hiệu quả tốt nhất khi thị trường có sóng rõ ràng và sẽ có độ trễ nhất định tại vùng đảo chiều đỉnh/đáy.",
      "Khi bảng Matrix hiển thị các khung thời gian mâu thuẫn nhau (ví dụ M15 Tăng nhưng H1 và H4 Giảm), nên ưu tiên giảm khối lượng hoặc đứng ngoài chờ đồng thuận.",
      "Luôn kết hợp quản lý khối lượng hợp lý và không sử dụng chỉ báo như công cụ đảm bảo tỷ lệ thắng tuyệt đối.",
    ],
    faqs: [
      {
        id: "mtf-repaint",
        question: "Chỉ báo đa khung thời gian này có bị vẽ lại (repaint) khi nến H4 chưa đóng không?",
        answer:
          "Mặc định chỉ báo khóa trạng thái theo nến đã đóng xác nhận của khung lớn để đảm bảo tính trung thực khi kiểm tra lịch sử, đồng thời hiển thị ký hiệu riêng cho nến đang chạy thời gian thực.",
      },
      {
        id: "mtf-mobile",
        question: "Xem trên ứng dụng TradingView điện thoại bảng thông số có bị che nến không?",
        answer:
          "Trong cài đặt có sẵn chế độ kích thước Tiny/Small dành riêng cho màn hình điện thoại giúp bảng ma trận thu gọn cực kỳ tinh tế ở góc dưới.",
      },
    ],
  },
  {
    id: "leo-mt5-spread-risk-hud",
    slug: "leo-mt5-spread-risk-hud",
    name: "Leo Spread & Position Risk HUD",
    platform: "MT5",
    category: "Execution & Risk Utility",
    status: "pending",
    subtitle:
      "Tiện ích màn hình thực thi trên MetaTrader 5 giúp giám sát Spread trực tiếp theo từng tick, thời gian đóng nến và quy đổi rủi ro USD tức thời.",
    summary:
      "Tiện ích hiển thị trực tiếp trên màn hình MetaTrader 5 các thông số thực thi: Spread hiện tại, thời gian đóng nến, giá trị pip và mức rủi ro USD dự kiến trước khi vào lệnh.",
    features: [
      "Theo dõi biến động Spread trực tiếp theo từng tick trên XAUUSD & Forex",
      "Đếm ngược thời gian đóng nến hiện hành (Candle Countdown)",
      "Hiển thị thông số tỷ lệ Margin, Equity và mức sụt giảm tài khoản tức thời",
      "Cảnh báo đổi màu khi Spread giãn vượt ngưỡng an toàn cài đặt trước",
    ],
    previewImage: "/images/indicators/indicator-mt5-hud.svg",
    targetMarkets: ["XAUUSD / XAUUSDc", "Tất cả cặp Forex & CFD trên MT5"],
    recommendedTimeframes: ["Mọi khung thời gian trên MT5"],
    introduction: [
      "Khi giao dịch trực tiếp trên phần mềm MetaTrader 5 máy tính, nhà giao dịch thường phải tự nhẩm tính chênh lệch Bid/Ask, không để ý thời điểm giãn spread lúc giao phiên hoặc vào lệnh nhầm khối lượng dẫn đến rủi ro vượt dự tính.",
      "Leo Spread & Position Risk HUD là tiện ích nhẹ (Lightweight Indicator) gắn trực tiếp lên góc biểu đồ MT5, gom toàn bộ thông số sống còn về chi phí khớp lệnh và sức khỏe tài khoản vào một bảng điều khiển duy nhất.",
      "Đặc biệt hữu ích cho trader giao dịch Vàng (XAUUSD) cần kiểm tra thông số spread thực tế (như đối chiếu tài khoản STD05 và STD) ngay trước khi bấm nút vào lệnh.",
    ],
    howItWorks: [
      {
        title: "Giám sát Live Spread & Cảnh báo giãn Spread",
        description:
          "Đọc trực tiếp chênh lệch Bid - Ask theo từng tick từ máy chủ sàn; tự động chuyển màu cảnh báo nếu spread giãn cao bất thường vào giờ ra tin hoặc giao phiên.",
      },
      {
        title: "Đồng hồ đếm ngược đóng nến (Bar Timer)",
        description:
          "Hiển thị chính xác số phút và giây còn lại trước khi cây nến M5/M15/H1/H4 hiện tại đóng cửa để tránh vào lệnh vội vàng khi nến chưa xác nhận.",
      },
      {
        title: "Thống kê nhanh Trạng thái Tài khoản & Floating P/L",
        description:
          "Tổng hợp số tổng Lot đang mở trên cặp tiền hiện tại, mức lời/lỗ tạm tính quy ra cả USD lẫn % tài khoản.",
      },
      {
        title: "Siêu nhẹ, không làm chậm MT5 hay ảnh hưởng EA",
        description:
          "Chỉ thực hiện phép tính số học trên tick hiện hành, không quét lại hàng vạn nến lịch sử nên hoàn toàn mượt mà ngay cả khi mở 6–8 biểu đồ cùng lúc.",
      },
    ],
    parameters: [
      { label: "Nền tảng hỗ trợ", value: "MetaTrader 5 (Windows / VPS)" },
      { label: "Định dạng tệp cài đặt", value: "Compiled MQL5 Indicator (.ex5)" },
      { label: "Ngưỡng cảnh báo Spread", value: "Tùy chỉnh theo điểm (Points) từng mã" },
      { label: "Hỗ trợ tài khoản Cent", value: "Tương thích cả Standard (USD) và Cent (USC)" },
      { label: "Tài nguyên CPU tiêu thụ", value: "Rất thấp (< 1%)" },
      { label: "Quyền truy cập", value: "Miễn phí cho thành viên liên kết sàn đối tác" },
    ],
    installationSteps: [
      {
        step: 1,
        title: "Nhận tệp cài đặt .ex5 chính thức",
        description:
          "Liên hệ đội ngũ hỗ trợ Backcom Mr Leo kèm ID tài khoản MT5 đối tác để nhận file tiện ích chuẩn.",
      },
      {
        step: 2,
        title: "Mở thư mục dữ liệu gốc của MT5",
        description:
          "Trên giao diện MetaTrader 5, chọn menu File → Open Data Folder → mở tiếp thư mục MQL5 → Indicators.",
      },
      {
        step: 3,
        title: "Sao chép tệp & Làm mới Navigator",
        description:
          "Dán file Leo Spread & Position Risk HUD.ex5 vào thư mục trên, quay lại MT5 nhấp chuột phải vào mục Indicators trong cửa sổ Navigator và chọn Refresh.",
      },
      {
        step: 4,
        title: "Kéo thả lên biểu đồ & Đặt ngưỡng cảnh báo",
        description:
          "Kéo tiện ích thả vào biểu đồ XAUUSD, nhập ngưỡng Max Spread cảnh báo phù hợp với loại tài khoản của bạn rồi nhấn OK.",
      },
    ],
    usageNotes: [
      "Đây là chỉ báo hiển thị thông tin (Indicator), hoàn toàn không tự động mở hay đóng bất kỳ lệnh giao dịch nào trên tài khoản của bạn.",
      "Bạn có thể chạy song song tiện ích HUD này trên một biểu đồ riêng bên cạnh biểu đồ đang chạy Bot EA để tiện giám sát từ xa qua VPS.",
    ],
    faqs: [
      {
        id: "hud-conflict-ea",
        question: "Cài tiện ích HUD này chung trên MT5 đang chạy Amix Gold Cent Bot có gây xung đột không?",
        answer:
          "Không gây xung đột. Tiện ích chỉ đọc thông tin tài khoản và giá để hiển thị lên màn hình (Read-only), không can thiệp vào lệnh của EA. Tuy nhiên để giao diện gọn gàng nhất, bạn nên mở một tab biểu đồ phụ riêng để gắn HUD.",
      },
      {
        id: "hud-mac-mobile",
        question: "Tiện ích file .ex5 có cài được trên app MT5 điện thoại không?",
        answer:
          "Theo giới hạn chung của nhà phát triển MetaQuotes, các chỉ báo tùy chỉnh định dạng .ex5 chỉ cài đặt được trên bản MT5 máy tính hoặc VPS Windows, không hỗ trợ nạp file ngoài vào ứng dụng di động.",
      },
    ],
  },
  {
    id: "leo-key-sr-structure",
    slug: "leo-key-sr-structure",
    name: "Leo Dynamic Supply & Demand Mapper",
    platform: "MT4/MT5",
    category: "Supply / Demand",
    status: "pending",
    subtitle:
      "Công cụ tự động khoanh vùng Cung – Cầu mất cân bằng (Supply/Demand & Order Block) chưa được kiểm định trên cả hai nền tảng MT4 và MT5.",
    summary:
      "Công cụ hỗ trợ khoanh vùng cung cầu mất cân bằng (Order Block / Imbalance) chưa được kiểm định lại, giúp chuẩn hóa góc nhìn phân tích kỹ thuật.",
    features: [
      "Tự động cập nhật và làm mờ các vùng cung cầu đã bị phá vỡ (Mitigated)",
      "Tùy chỉnh độ nhạy biên độ ATR theo từng cặp tiền tệ và Vàng",
      "Hỗ trợ gửi thông báo đẩy (Push Notification) qua ứng dụng MetaTrader di động",
      "Phân biệt rõ vùng chưa chạm lần nào (Fresh Zone) và vùng đã kiểm định (Tested Zone)",
    ],
    previewImage: "/images/indicators/indicator-sr-preview.svg",
    targetMarkets: ["XAUUSD", "EURUSD", "GBPUSD", "USDJPY", "AUDUSD"],
    recommendedTimeframes: ["M15", "H1", "H4"],
    introduction: [
      "Việc xác định vùng Cung – Cầu (Supply & Demand) hoặc khối lệnh (Order Block) bằng mắt thường dễ dẫn đến thiên kiến chủ quan: mỗi lúc vẽ một kiểu hoặc giữ lại quá nhiều vùng cũ đã hết giá trị sử dụng.",
      "Leo Dynamic Supply & Demand Mapper áp dụng công thức đo lường xung lượng nến thoát ly kết hợp khoảng trống thanh khoản (Imbalance) để vẽ khách quan các vùng giá có sự tham gia mạnh của dòng tiền.",
      "Khi giá quay lại chạm vùng hoặc phá vỡ hoàn toàn qua vùng đó, chỉ báo tự động cập nhật trạng thái hoặc xóa bỏ vùng nhiễu để biểu đồ luôn thoáng sạch.",
    ],
    howItWorks: [
      {
        title: "Thuật toán lọc xung lượng thoát ly (Impulse Filter)",
        description:
          "Chỉ ghi nhận vùng Cung/Cầu khi nhịp nến rời đi đạt tỷ lệ biên độ tối thiểu so với chỉ số ATR trung bình, loại bỏ các vùng đi ngang yếu.",
      },
      {
        title: "Phân loại Fresh Zone & Tested Zone trực quan",
        description:
          "Hiển thị viền nét liền đậm cho các vùng mới hình thành chưa từng được giá quay lại kiểm chứng và chuyển sang nét mảnh khi đã chạm một lần.",
      },
      {
        title: "Tự động dọn dẹp vùng bị vô hiệu hóa",
        description:
          "Ngay khi thân nến đóng cửa xuyên thủng hoàn toàn vùng kháng cự/hỗ trợ, vùng đó được ẩn đi tự động để người dùng không bắt dao rơi ngược xu hướng.",
      },
      {
        title: "Thông báo về điện thoại khi giá tiến vào vùng chờ",
        description:
          "Tích hợp tính năng MetaQuotes ID Push Alert gửi tin nhắn thẳng về điện thoại khi giá vừa chạm vào vùng Supply/Demand tiềm năng.",
      },
    ],
    parameters: [
      { label: "Nền tảng hỗ trợ", value: "MetaTrader 4 (.ex4) & MetaTrader 5 (.ex5)" },
      { label: "Hệ số nhạy ATR", value: "1.5 – 3.0 (Tùy chỉnh độ khắt khe của vùng)" },
      { label: "Số vùng hiển thị tối đa", value: "Giới hạn thông minh tránh rối biểu đồ" },
      { label: "Cảnh báo hỗ trợ", value: "Pop-up MT4/5, Sound & Mobile Push Notification" },
      { label: "Khung thời gian khuyến nghị", value: "M15, H1 và H4" },
      { label: "Cơ chế cấp quyền", value: "Cấp theo ID tài khoản MT4/MT5 đối tác" },
    ],
    installationSteps: [
      {
        step: 1,
        title: "Chọn đúng phiên bản MT4 hoặc MT5",
        description:
          "Thông báo với đội ngũ hỗ trợ nền tảng bạn đang dùng (MT4 hay MT5) kèm số ID tài khoản để nhận đúng gói tệp .ex4 hoặc .ex5.",
      },
      {
        step: 2,
        title: "Chép vào thư mục Indicators của phần mềm",
        description:
          "Vào File → Open Data Folder → mở MQL4/Indicators (hoặc MQL5/Indicators) và dán tệp chỉ báo vào.",
      },
      {
        step: 3,
        title: "Cấu hình MetaQuotes ID nếu muốn nhận báo điện thoại",
        description:
          "Vào Tools → Options → Notifications trên MetaTrader máy tính, nhập mã MetaQuotes ID trên app điện thoại để đồng bộ thông báo.",
      },
      {
        step: 4,
        title: "Áp dụng lên biểu đồ H1 / M15",
        description:
          "Làm mới Navigator, kéo chỉ báo vào biểu đồ và bật tùy chọn Push Alert nếu bạn muốn nhận cảnh báo từ xa.",
      },
    ],
    usageNotes: [
      "Vùng Supply/Demand trên khung lớn (H1/H4) luôn có trọng số tin cậy cao hơn các vùng nhỏ trên M5.",
      "Không nên đặt lệnh Limit tự động ở mọi vùng mà không kiểm tra lịch tin tức kinh tế quan trọng trong ngày.",
      "Mọi công cụ phân tích kỹ thuật đều mang tính xác suất — luôn tuân thủ giới hạn rủi ro tối đa 1%–2% tài khoản trên mỗi giao dịch.",
    ],
    faqs: [
      {
        id: "sr-both-mt4-mt5",
        question: "Tôi dùng sàn Exness hoặc Tickmill trên MT4 thì có bản tương thích không?",
        answer:
          "Có đầy đủ. Công cụ này được biên dịch song song cho cả hai nền tảng MetaTrader 4 (.ex4) và MetaTrader 5 (.ex5) với giao diện và bộ thông số tương đồng.",
      },
      {
        id: "sr-alert-spam",
        question: "Tính năng báo về điện thoại có bị báo lặp liên tục mỗi khi giá nhấp nháy trong vùng không?",
        answer:
          "Không. Bộ cảnh báo được lập trình cơ chế One-Alert-Per-Zone-Entry (chỉ báo duy nhất 1 lần khi giá bắt đầu chạm vào vùng trên cây nến đó) để tránh làm phiền người dùng.",
      },
    ],
  },
];

export function getIndicatorBySlug(slug: string): TradingIndicator | undefined {
  return tradingIndicators.find((ind) => ind.slug === slug);
}
