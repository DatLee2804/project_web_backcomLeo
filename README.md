# BACKCOM MR LEO — Financial & Trading Ecosystem Website

> **TRADE SMARTER. GET MORE BACK.** — *Your Trading Ecosystem.*
> Domain mục tiêu: `https://backcommrleo.com.vn` | Ngôn ngữ: `vi-VN`

Bộ khung website đa trang hoàn chỉnh cho thương hiệu **BACKCOM MR LEO**, thiết kế theo phong cách **Dark Luxury Fintech**, tối ưu trải nghiệm người dùng, minh bạch nguồn dữ liệu và sẵn sàng mở rộng tích hợp Backend / API trong tương lai.

---

## 1. Project Overview

**BACKCOM MR LEO** là nền tảng giới thiệu hệ sinh thái hỗ trợ nhà giao dịch Forex & CFD tại Việt Nam, bao gồm:
1. **Forex Rebate / Backcom:** Giải thích cơ chế hoàn phí IB và công cụ ước tính hoàn phí trực tuyến.
2. **Broker Partnership:** Hệ thống so sánh & trang chi tiết cho 5 sàn đối tác (**Austex Markets** ưu tiên mặc định `STD05`, **Exness**, **Tickmill**, **FxPro**, **BCR**).
3. **Trading Tools & Indicators:** Công cụ tính toán mở rộng & thư viện chỉ báo TradingView / MT5.
4. **Robot Trading:** Chuyên trang giới thiệu giải pháp EA `AMIX TRADE – GOLD CENT BOT` trên MT5.
5. **Copy Trading:** Giao diện phân tích chỉ số Master Traders với biểu đồ Recharts (gắn nhãn `DEMO` minh bạch).
6. **Trading Community & IB Partnership:** Cổng kết nối nhóm Zalo chính thức và biểu mẫu tư vấn xác thực bằng Zod.

---

## 2. Tech Stack

- **Framework:** Next.js 15 (App Router) + React 19
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS 3.4 + `class-variance-authority` + `tailwind-merge`
- **Typography:** `Space Grotesk` (Headings) & `Inter` (Body + Tabular Financial Numbers) hỗ trợ đầy đủ tiếng Việt
- **Icons:** `lucide-react`
- **Animation:** `framer-motion` (Scroll reveal, Dropdown, Mobile Drawer)
- **Charts:** `recharts` (Equity Curve, Monthly Returns, Drawdown)
- **Forms & Validation:** `react-hook-form` + `@hookform/resolvers` + `zod`
- **SEO:** Next.js Metadata API, `sitemap.xml`, `robots.txt`, JSON-LD Structured Data

---

## 3. Installation

Yêu cầu hệ thống: **Node.js >= 20.x** và **npm >= 10.x**.

```bash
# 1. Di chuyển vào thư mục dự án
cd WebBackComLeo

# 2. Cài đặt dependencies
npm install

# 3. Tạo file biến môi trường (tùy chọn)
copy .env.example .env.local
```

---

## 4. Development Commands

```bash
# Chạy máy chủ phát triển tại http://localhost:3000
npm run dev

# Kiểm tra kiểu dữ liệu TypeScript
npm run typecheck

# Kiểm tra ESLint
npm run lint

# Build bản Production
npm run build

# Khởi chạy bản Production sau khi build
npm run start
```

---

## 5. Project Structure

```text
WebBackComLeo/
├── public/
│   ├── icons/                  # Biểu tượng thương hiệu SVG
│   └── images/
│       ├── brokers/            # Placeholder đồng nhất của 5 sàn đối tác
│       ├── community/          # Đồ họa mạng lưới cộng đồng
│       ├── hero/               # Open Graph cover
│       ├── indicators/         # Minh họa chỉ báo TradingView & MT5
│       ├── masters/            # Avatar hồ sơ Master DEMO
│       └── robots/             # Minh họa giao diện EA MT5
├── src/
│   ├── app/                    # Toàn bộ hệ thống App Router (21 routes)
│   │   ├── about/
│   │   ├── backcom/
│   │   │   └── what-is-backcom/
│   │   ├── brokers/
│   │   │   ├── austex/
│   │   │   ├── bcr/
│   │   │   ├── exness/
│   │   │   ├── fxpro/
│   │   │   └── tickmill/
│   │   ├── community/
│   │   ├── contact/
│   │   ├── copy-trading/
│   │   │   └── masters/[slug]/
│   │   ├── faq/
│   │   ├── legal/
│   │   │   ├── disclaimer/
│   │   │   ├── privacy-policy/
│   │   │   ├── risk-disclosure/
│   │   │   └── terms/
│   │   ├── robots/
│   │   │   └── amix-gold-cent/
│   │   ├── tools/
│   │   │   ├── calculator/
│   │   │   └── indicators/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── backcom/            # <BackcomCalculator /> dùng chung
│   │   ├── brokers/            # Bộ lọc sàn & Template chi tiết sàn
│   │   ├── copy-trading/       # Bộ lọc Master & Biểu đồ Recharts
│   │   ├── homepage/           # Các section chuyên biệt của Trang chủ
│   │   ├── layout/             # Header, Footer, Floating Zalo & Mobile CTA
│   │   ├── shared/             # SectionHeading, ScrollReveal, ContactForm, LegalLayout
│   │   ├── tools/              # CalculatorHub & IndicatorsLibrary
│   │   └── ui/                 # Button, Badge, Card, Accordion, Tabs
│   ├── data/                   # Tầng dữ liệu tách biệt hoàn toàn khỏi JSX
│   │   ├── brokers.ts
│   │   ├── faq.ts
│   │   ├── indicators.ts
│   │   ├── masters.ts
│   │   ├── navigation.ts
│   │   ├── rebate-rates.ts
│   │   └── robots.ts
│   ├── lib/
│   │   ├── calculator.ts       # Công thức tính PER_LOT, PER_COMMISSION, PER_VOLUME
│   │   ├── seo.ts              # Helper khởi tạo Metadata & Canonical URL
│   │   └── utils.ts            # Format tiền tệ USD & gộp class Tailwind
│   └── types/
│       └── index.ts            # Định nghĩa TypeScript interfaces toàn cục
├── .env.example
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 6. Data Configuration

Toàn bộ dữ liệu nghiệp vụ nằm tập trung trong thư mục `src/data/`. Bạn **không cần sửa mã JSX** khi cập nhật thông tin kinh doanh thực tế:
- `src/data/brokers.ts`: Cấu hình 5 sàn đối tác, danh sách tài khoản, nền tảng, link referral và nguồn đánh giá.
- `src/data/rebate-rates.ts`: Quy tắc tính hoàn phí theo từng mã giao dịch của từng sàn.
- `src/data/robots.ts`: Nội dung sản phẩm EA, yêu cầu tài khoản và hướng dẫn cài đặt.
- `src/data/indicators.ts`: Danh mục chỉ báo TradingView & MT5.
- `src/data/masters.ts`: Danh sách Master Copy Trade (hiện đang ở chế độ `isDemo: true`).
- `src/data/faq.ts`: Bộ 10 câu hỏi thường gặp dùng chung.

---

## 7. Broker Configuration

Mở file `src/data/brokers.ts` để cập nhật dữ liệu chính thức khi sẵn sàng:
1. **Cập nhật Referral Link:** Thay `referralUrl: null` bằng URL đăng ký đối tác thật (ví dụ `"https://..."`). Ngay khi có URL, các nút **Register Now / Mở tài khoản** đang khóa sẽ tự động kích hoạt mở tab mới.
2. **Cấu hình Austex Markets:** Tài khoản `STD05` (`isDefault: true`, `goldSpread: 36`) luôn được ưu tiên chọn mặc định, trong khi `STD` (`isDefault: false`, `goldSpread: 31`) đóng vai trò phương án đối chiếu thủ công.
3. **Cập nhật Logo chính thức:** Thay thế các file SVG placeholder trong `public/images/brokers/` bằng bộ nhận diện được sàn cấp phép sử dụng cho IB.
4. **Cập nhật Đánh giá & Giấy phép:** Điền `value`, `sourceUrl`, `updatedAt` và đổi `status: "confirmed"` trong mảng `trustReviews` của từng sàn.

---

## 8. Rebate Configuration

Mở file `src/data/rebate-rates.ts`:
- Mỗi sàn có danh sách `symbolRules` hỗ trợ 3 phương thức tính:
  - `"PER_LOT"`: Số USD hoàn lại trên mỗi Lot tiêu chuẩn.
  - `"PER_COMMISSION"`: Tỷ lệ `%` hoàn lại trên phí Commission.
  - `"PER_VOLUME"`: Số USD hoàn lại trên mỗi `1,000,000 USD` khối lượng giao dịch.
- Khi có biểu phí chính thức, chỉ cần cập nhật `officialRate` từ `null` sang con số thực tế (ví dụ `officialRate: 6.5`) và đặt `officialStatus: "confirmed"`. `<BackcomCalculator />` sẽ tự động tắt nhãn `"Dữ liệu minh họa"` và chuyển sang hiển thị `"Biểu phí chính thức"`.

---

## 9. Deployment Guide (backcommrleo.com.vn)

### Phương án A: Deploy lên Vercel (Khuyến nghị cho Next.js)
1. Đẩy mã nguồn lên kho lưu trữ GitHub / GitLab cá nhân.
2. Đăng nhập Vercel, chọn **Add New Project** và kết nối repository.
3. Thiết lập biến môi trường trong phần **Environment Variables** theo `.env.example` (`NEXT_PUBLIC_SITE_URL=https://backcommrleo.com.vn`).
4. Bấm **Deploy**.
5. Vào mục **Settings → Domains**, thêm `backcommrleo.com.vn` và `www.backcommrleo.com.vn`, sau đó trỏ bản ghi `A` / `CNAME` tại nhà đăng ký tên miền `.vn` theo hướng dẫn của Vercel (SSL tự động kích hoạt).

### Phương án B: Deploy lên VPS Ubuntu (PM2 + Nginx)
```bash
# Trên máy chủ VPS (Node.js 20+)
npm ci
npm run build
pm2 start npm --name "backcom-mr-leo" -- start
```
Sau đó cấu hình Nginx Reverse Proxy từ cổng `80/443` của tên miền `backcommrleo.com.vn` về `http://127.0.0.1:3000` và cài đặt chứng chỉ SSL bằng Certbot (`Let's Encrypt`).



---

## 10. Hướng dẫn Thiết lập Admin Backend (`/admin`) & Supabase

Hệ thống tích hợp sẵn trang quản trị đầy đủ tại đường dẫn `/admin` (quản lý **Indicators**, **Bot Trading**, **Master Copy Trade**, **Sàn & Biểu phí Backcom** và **Khách hàng Tư vấn**).

### Bước 1: Tạo Project trên Supabase (Miễn phí)
1. Truy cập https://supabase.com/dashboard và tạo một Project mới.
2. Mở mục **SQL Editor** ở thanh bên trái → bấm **New Query**.
3. Copy toàn bộ nội dung file `supabase/schema.sql` trong dự án này dán vào rồi bấm **Run** (lệnh này tự tạo 5 bảng dữ liệu + bucket lưu trữ ảnh `media`).
4. Vào mục **Project Settings → API** để lấy:
   - `Project URL` → gán vào `NEXT_PUBLIC_SUPABASE_URL`
   - `service_role` (secret key) → gán vào `SUPABASE_SERVICE_ROLE_KEY`

### Bước 2: Cấu hình Biến Môi trường (`.env.local` & Vercel)
Thêm các biến sau vào file `.env.local` (khi chạy máy cá nhân) và mục **Settings → Environment Variables** trên Vercel:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=MatKhauManhCuaBan_2026!
ADMIN_SESSION_SECRET=ChuoiBiMatNgauNhienDai32KyTuTroLen

NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI...
SUPABASE_STORAGE_BUCKET=media
```

### Bước 3: Đăng nhập & Khởi tạo dữ liệu lần đầu
1. Truy cập `/admin/login` (ví dụ `https://backcommrleo.vercel.app/admin/login` hoặc `http://localhost:3000/admin/login`).
2. Đăng nhập bằng `ADMIN_USERNAME` và `ADMIN_PASSWORD`.
3. Tại màn hình Tổng quan `/admin`, nhấn nút **"Khởi tạo dữ liệu gốc lên Database"** 1 lần đầu tiên để chép toàn bộ dữ liệu mẫu lên bảng Supabase, sau đó tự do Thêm / Sửa / Ẩn / Xóa sản phẩm và tải ảnh trực tiếp từ máy tính!
