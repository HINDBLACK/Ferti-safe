// طبقة الوصول للبيانات — تُستخدم من الصفحات العامة (Server Components)
// تقرأ عبر عميل Supabase العام (anon key)، وتحترم RLS (is_visible = true فقط)
import { createClient } from "@/lib/supabase/server";
import type { Category, Product, Locale, CompanySettings, CompanySettingsTranslation } from "@/types";

export async function getCategories(locale: Locale): Promise<Category[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("categories")
    .select(
      "id, slug, icon, sort_order, category_translations!inner(locale, name, description)"
    )
    .eq("category_translations.locale", locale)
    .order("sort_order");

  if (error || !data) return [];
  return data.map((c: any) => ({
    id: c.id,
    slug: c.slug,
    icon: c.icon,
    sort_order: c.sort_order,
    name: c.category_translations[0]?.name ?? c.slug,
    description: c.category_translations[0]?.description ?? "",
  }));
}

export async function getCategoryBySlug(slug: string, locale: Locale): Promise<Category | null> {
  const cats = await getCategories(locale);
  return cats.find((c) => c.slug === slug) ?? null;
}

function mapProductRow(p: any, locale: Locale): Product {
  const tr = p.product_translations[0] ?? {};
  return {
    id: p.id,
    slug: p.slug,
    category_id: p.category_id,
    category_slug: p.categories?.slug,
    image_url: p.image_url,
    is_visible: p.is_visible,
    sort_order: p.sort_order,
    whatsapp_override: p.whatsapp_override,
    name: tr.name ?? p.slug,
    description: tr.description ?? "",
    technical_info: tr.technical_info ?? "",
    usage_info: tr.usage_info ?? "",
    features: tr.features ?? [],
    suitable_crops: tr.suitable_crops ?? [],
    is_auto_translated: tr.is_auto_translated ?? false,
  };
}

export async function getProductsByCategory(categorySlug: string, locale: Locale): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, slug, category_id, image_url, is_visible, sort_order, whatsapp_override, categories!inner(slug), product_translations!inner(locale, name, description, technical_info, usage_info, features, suitable_crops, is_auto_translated)"
    )
    .eq("categories.slug", categorySlug)
    .eq("product_translations.locale", locale)
    .eq("is_visible", true)
    .order("sort_order");

  if (error || !data) return [];
  return data.map((p: any) => mapProductRow(p, locale));
}

export async function getProductBySlug(slug: string, locale: Locale): Promise<Product | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, slug, category_id, image_url, is_visible, sort_order, whatsapp_override, categories!inner(slug), product_translations!inner(locale, name, description, technical_info, usage_info, features, suitable_crops, is_auto_translated)"
    )
    .eq("slug", slug)
    .eq("product_translations.locale", locale)
    .eq("is_visible", true)
    .maybeSingle();

  if (error || !data) return null;
  return mapProductRow(data, locale);
}

export async function searchProducts(query: string, locale: Locale): Promise<Product[]> {
  if (!query.trim()) return [];
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, slug, category_id, image_url, is_visible, sort_order, whatsapp_override, categories!inner(slug), product_translations!inner(locale, name, description, technical_info, usage_info, features, suitable_crops, is_auto_translated)"
    )
    .eq("product_translations.locale", locale)
    .eq("is_visible", true)
    .ilike("product_translations.name", `%${query}%`)
    .order("sort_order");

  if (error || !data) return [];
  return data.map((p: any) => mapProductRow(p, locale));
}

export async function getFeaturedProducts(locale: Locale, limit = 6): Promise<Product[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, slug, category_id, image_url, is_visible, sort_order, whatsapp_override, categories!inner(slug), product_translations!inner(locale, name, description, technical_info, usage_info, features, suitable_crops, is_auto_translated)"
    )
    .eq("product_translations.locale", locale)
    .eq("is_visible", true)
    .order("sort_order")
    .limit(limit);

  if (error || !data) return [];
  return data.map((p: any) => mapProductRow(p, locale));
}

export async function getCompanySettings(): Promise<CompanySettings> {
  const supabase = createClient();
  const { data } = await supabase.from("company_settings").select("*").eq("id", 1).maybeSingle();
  return (
    data ?? {
      phone: "+213 770 016 221",
      whatsapp: "213770016221",
      email: "contact@fertisafe.dz",
      address: "الجزائر",
      logo_url: null,
      facebook_url: null,
      instagram_url: null,
    }
  );
}

export async function getCompanySettingsTranslation(locale: Locale): Promise<CompanySettingsTranslation> {
  const supabase = createClient();
  const { data } = await supabase
    .from("company_settings_translations")
    .select("*")
    .eq("locale", locale)
    .maybeSingle();
  return (
    data ?? {
      locale,
      hero_title: "FERTI SAFE",
      hero_subtitle: "",
      about_text: "",
    }
  );
}
