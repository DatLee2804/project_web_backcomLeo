-- ============================================================================
-- BACKCOM MR LEO — SUPABASE POSTGRESQL & STORAGE SCHEMA
-- Chạy toàn bộ file này trong mục "SQL Editor" trên trang quản trị Supabase
-- ============================================================================

-- 1. Bảng quản lý Chỉ báo (Indicators)
CREATE TABLE IF NOT EXISTS public.cms_indicators (
  slug TEXT PRIMARY KEY,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  payload JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Bảng quản lý Bot Trading (Robots / EA)
CREATE TABLE IF NOT EXISTS public.cms_robots (
  slug TEXT PRIMARY KEY,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  payload JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Bảng quản lý Master Copy Trading
CREATE TABLE IF NOT EXISTS public.cms_masters (
  slug TEXT PRIMARY KEY,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  payload JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Bảng quản lý Sàn giao dịch & Biểu phí Backcom (Brokers)
CREATE TABLE IF NOT EXISTS public.cms_brokers (
  slug TEXT PRIMARY KEY,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  payload JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Bảng lưu danh sách khách hàng đăng ký tư vấn (Leads / Contacts)
CREATE TABLE IF NOT EXISTS public.cms_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_or_zalo TEXT NOT NULL,
  interested_broker TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  admin_note TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bật Row Level Security (RLS) để bảo vệ dữ liệu (chỉ cho phép đọc public với các bảng sản phẩm đã publish, ghi qua Service Role Key ở phía Server)
ALTER TABLE public.cms_indicators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_robots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_masters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_brokers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published indicators" ON public.cms_indicators;
CREATE POLICY "Public read published indicators"
  ON public.cms_indicators FOR SELECT
  USING (is_published = TRUE);

DROP POLICY IF EXISTS "Public read published robots" ON public.cms_robots;
CREATE POLICY "Public read published robots"
  ON public.cms_robots FOR SELECT
  USING (is_published = TRUE);

DROP POLICY IF EXISTS "Public read published masters" ON public.cms_masters;
CREATE POLICY "Public read published masters"
  ON public.cms_masters FOR SELECT
  USING (is_published = TRUE);

DROP POLICY IF EXISTS "Public read published brokers" ON public.cms_brokers;
CREATE POLICY "Public read published brokers"
  ON public.cms_brokers FOR SELECT
  USING (is_published = TRUE);

-- 6. Khởi tạo Storage Bucket "media" để lưu ảnh upload (Indicator, Bot, Avatar Master, Logo Sàn)
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', TRUE)
ON CONFLICT (id) DO UPDATE SET public = TRUE;

DROP POLICY IF EXISTS "Public read media bucket" ON storage.objects;
CREATE POLICY "Public read media bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media');


-- 7. Bảng lưu Tài khoản Người dùng & Thành viên (Hỗ trợ cả Email/Password và Google OAuth)
CREATE TABLE IF NOT EXISTS public.cms_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone_or_zalo TEXT DEFAULT '',
  password_hash TEXT,
  provider TEXT NOT NULL DEFAULT 'credentials',
  google_id TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.cms_users ENABLE ROW LEVEL SECURITY;


-- 8. Bảng lưu Nội dung & Hình ảnh/Video của các trang (Trang chủ, Backcom, Sàn giao dịch...)
CREATE TABLE IF NOT EXISTS public.cms_pages (
  page_key TEXT PRIMARY KEY,
  payload JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read cms_pages" ON public.cms_pages;
CREATE POLICY "Public read cms_pages"
  ON public.cms_pages FOR SELECT
  USING (TRUE);
