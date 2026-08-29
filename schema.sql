-- ============================================================
-- FERTI SAFE — Database Schema (Supabase / PostgreSQL)
-- شغّل هذا الملف في: Supabase Dashboard > SQL Editor > New query
-- ============================================================

create extension if not exists "uuid-ossp";

-- ---------- الفئات ----------
create table if not exists categories (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,          -- fertilizers / nutrients / pesticides ...
  icon text default '🌿',
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists category_translations (
  category_id uuid references categories(id) on delete cascade,
  locale text not null check (locale in ('ar','fr','en')),
  name text not null,
  description text default '',
  primary key (category_id, locale)
);

-- ---------- المنتجات ----------
create table if not exists products (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  category_id uuid references categories(id) on delete set null,
  image_url text,                     -- null = يظهر Placeholder
  is_visible boolean default true,
  sort_order int default 0,
  whatsapp_override text,             -- رقم مخصص لهذا المنتج (اختياري)
  source_locale text default 'ar',    -- اللغة التي كُتب بها المحتوى أصلاً
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists product_translations (
  product_id uuid references products(id) on delete cascade,
  locale text not null check (locale in ('ar','fr','en')),
  name text not null,
  description text default '',
  technical_info text default '',     -- التركيبة / المعلومات التقنية
  usage_info text default '',         -- الاستخدامات
  features jsonb default '[]',        -- ["ميزة 1", "ميزة 2", ...]
  suitable_crops jsonb default '[]',  -- ["طماطم", "بطاطا", ...]
  is_auto_translated boolean default false,
  primary key (product_id, locale)
);

create index if not exists idx_products_category on products(category_id);
create index if not exists idx_ptr_locale on product_translations(locale);

-- ---------- إعدادات الشركة (سطر واحد فقط) ----------
create table if not exists company_settings (
  id int primary key default 1,
  phone text default '+213 770 016 221',
  whatsapp text default '213770016221',
  email text default 'contact@fertisafe.dz',
  address text default 'الجزائر',
  logo_url text,
  facebook_url text,
  instagram_url text,
  constraint single_row check (id = 1)
);

create table if not exists company_settings_translations (
  locale text primary key check (locale in ('ar','fr','en')),
  hero_title text,
  hero_subtitle text,
  about_text text
);

insert into company_settings (id) values (1) on conflict (id) do nothing;

-- ---------- Row Level Security ----------
alter table categories enable row level security;
alter table category_translations enable row level security;
alter table products enable row level security;
alter table product_translations enable row level security;
alter table company_settings enable row level security;
alter table company_settings_translations enable row level security;

-- قراءة عامة للجميع (الموقع العام)
create policy "public read categories" on categories for select using (true);
create policy "public read category_translations" on category_translations for select using (true);
create policy "public read products" on products for select using (is_visible = true);
create policy "public read product_translations" on product_translations for select using (true);
create policy "public read company_settings" on company_settings for select using (true);
create policy "public read company_settings_translations" on company_settings_translations for select using (true);

-- الكتابة فقط للمستخدمين المسجّلين (الأدمن، عبر Supabase Auth)
create policy "admin write categories" on categories for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write category_translations" on category_translations for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write products" on products for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write product_translations" on product_translations for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write company_settings" on company_settings for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write company_settings_translations" on company_settings_translations for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ملاحظة: الأدمن يرى أيضًا المنتجات المخفية (is_visible=false) عبر service_role key من الـ API routes الخاصة بلوحة التحكم.

-- ---------- Storage bucket لصور المنتجات ----------
insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true)
  on conflict (id) do nothing;

create policy "public read product images" on storage.objects for select using (bucket_id = 'product-images');
create policy "admin upload product images" on storage.objects for insert with check (bucket_id = 'product-images' and auth.role() = 'authenticated');
create policy "admin update product images" on storage.objects for update using (bucket_id = 'product-images' and auth.role() = 'authenticated');
create policy "admin delete product images" on storage.objects for delete using (bucket_id = 'product-images' and auth.role() = 'authenticated');
