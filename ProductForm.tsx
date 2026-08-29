"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ImageUploader from "@/components/ImageUploader";
import { Sparkles, Save, Loader2 } from "lucide-react";
import type { Locale } from "@/types";

type LocaleContent = {
  name: string;
  description: string;
  technical_info: string;
  usage_info: string;
  features: string; // سطر لكل ميزة
  suitable_crops: string; // سطر لكل محصول
};

const emptyContent: LocaleContent = { name: "", description: "", technical_info: "", usage_info: "", features: "", suitable_crops: "" };

const LOCALE_TABS: { key: Locale; label: string }[] = [
  { key: "ar", label: "العربية" },
  { key: "fr", label: "Français" },
  { key: "en", label: "English" },
];

export default function ProductForm({ productId }: { productId?: string }) {
  const router = useRouter();
  const supabase = createClient();

  const [categories, setCategories] = useState<{ id: string; slug: string; name: string }[]>([]);
  const [categoryId, setCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [whatsappOverride, setWhatsappOverride] = useState("");

  const [sourceLocale, setSourceLocale] = useState<Locale>("ar");
  const [activeTab, setActiveTab] = useState<Locale>("ar");
  const [content, setContent] = useState<Record<Locale, LocaleContent>>({
    ar: { ...emptyContent },
    fr: { ...emptyContent },
    en: { ...emptyContent },
  });
  const [autoTranslated, setAutoTranslated] = useState<Record<Locale, boolean>>({ ar: false, fr: false, en: false });

  const [loading, setLoading] = useState(!!productId);
  const [saving, setSaving] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const { data: cats } = await supabase
        .from("categories")
        .select("id, slug, category_translations!inner(locale, name)")
        .eq("category_translations.locale", "ar")
        .order("sort_order");
      setCategories((cats ?? []).map((c: any) => ({ id: c.id, slug: c.slug, name: c.category_translations[0]?.name ?? c.slug })));
      if (cats && cats.length > 0 && !productId) setCategoryId(cats[0].id);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!productId) return;
    (async () => {
      const { data: product } = await supabase.from("products").select("*").eq("id", productId).single();
      const { data: translations } = await supabase.from("product_translations").select("*").eq("product_id", productId);
      if (product) {
        setCategoryId(product.category_id);
        setImageUrl(product.image_url);
        setWhatsappOverride(product.whatsapp_override ?? "");
        setSourceLocale(product.source_locale ?? "ar");
      }
      if (translations) {
        const next: Record<Locale, LocaleContent> = { ar: { ...emptyContent }, fr: { ...emptyContent }, en: { ...emptyContent } };
        const auto: Record<Locale, boolean> = { ar: false, fr: false, en: false };
        for (const t of translations) {
          next[t.locale as Locale] = {
            name: t.name ?? "",
            description: t.description ?? "",
            technical_info: t.technical_info ?? "",
            usage_info: t.usage_info ?? "",
            features: (t.features ?? []).join("\n"),
            suitable_crops: (t.suitable_crops ?? []).join("\n"),
          };
          auto[t.locale as Locale] = t.is_auto_translated ?? false;
        }
        setContent(next);
        setAutoTranslated(auto);
      }
      setLoading(false);
    })();
  }, [productId]); // eslint-disable-line react-hooks/exhaustive-deps

  function updateField(locale: Locale, field: keyof LocaleContent, value: string) {
    setContent((prev) => ({ ...prev, [locale]: { ...prev[locale], [field]: value } }));
  }

  async function handleTranslate() {
    setTranslating(true);
    setError("");
    try {
      const src = content[sourceLocale];
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceLocale,
          name: src.name,
          description: src.description,
          technical_info: src.technical_info,
          usage_info: src.usage_info,
          features: src.features.split("\n").filter(Boolean),
          suitable_crops: src.suitable_crops.split("\n").filter(Boolean),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "translation failed");
      const next = { ...content };
      const nextAuto = { ...autoTranslated };
      for (const locale of Object.keys(json.translations) as Locale[]) {
        const t = json.translations[locale];
        next[locale] = {
          name: t.name ?? "",
          description: t.description ?? "",
          technical_info: t.technical_info ?? "",
          usage_info: t.usage_info ?? "",
          features: (t.features ?? []).join("\n"),
          suitable_crops: (t.suitable_crops ?? []).join("\n"),
        };
        nextAuto[locale] = true;
      }
      setContent(next);
      setAutoTranslated(nextAuto);
    } catch (e: any) {
      setError(e.message === "translation failed" ? "فشلت الترجمة الآلية، تحقق من ANTHROPIC_API_KEY أو أكمل الترجمة يدويًا." : e.message);
    } finally {
      setTranslating(false);
    }
  }

  function slugify(text: string) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 60);
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      if (!categoryId) throw new Error("الرجاء اختيار فئة");
      if (!content[sourceLocale].name) throw new Error("الرجاء إدخال اسم المنتج على الأقل باللغة المصدر");

      let id = productId;
      if (!id) {
        const slug = slugify(content[sourceLocale].name) || `product-${Date.now()}`;
        const { data, error } = await supabase
          .from("products")
          .insert({ slug, category_id: categoryId, image_url: imageUrl, whatsapp_override: whatsappOverride || null, source_locale: sourceLocale })
          .select("id")
          .single();
        if (error) throw error;
        id = data.id;
      } else {
        const { error } = await supabase
          .from("products")
          .update({ category_id: categoryId, image_url: imageUrl, whatsapp_override: whatsappOverride || null, source_locale: sourceLocale, updated_at: new Date().toISOString() })
          .eq("id", id);
        if (error) throw error;
      }

      for (const locale of ["ar", "fr", "en"] as Locale[]) {
        const c = content[locale];
        if (!c.name) continue; // تخطَّ اللغات غير المكتوبة بعد
        const { error } = await supabase.from("product_translations").upsert(
          {
            product_id: id,
            locale,
            name: c.name,
            description: c.description,
            technical_info: c.technical_info,
            usage_info: c.usage_info,
            features: c.features.split("\n").map((s) => s.trim()).filter(Boolean),
            suitable_crops: c.suitable_crops.split("\n").map((s) => s.trim()).filter(Boolean),
            is_auto_translated: autoTranslated[locale] && locale !== sourceLocale,
          },
          { onConflict: "product_id,locale" }
        );
        if (error) throw error;
      }

      router.push("/admin/dashboard/products");
      router.refresh();
    } catch (e: any) {
      setError(e.message ?? "حدث خطأ أثناء الحفظ");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-10 text-center text-fs-green-400">جارٍ التحميل...</div>;

  return (
    <div className="p-6 md:p-10 max-w-4xl">
      <h1 className="text-2xl font-extrabold text-fs-green-800 mb-8">
        {productId ? "تعديل المنتج" : "إضافة منتج جديد"}
      </h1>

      <div className="grid md:grid-cols-[220px_1fr] gap-8 mb-8">
        <div>
          <label className="block text-sm font-semibold text-fs-green-700 mb-2">صورة المنتج</label>
          <ImageUploader value={imageUrl} onChange={setImageUrl} />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-fs-green-700 mb-1.5">الفئة</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-lg border border-fs-green-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-fs-gold-500"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-fs-green-700 mb-1.5">رقم واتساب مخصص (اختياري)</label>
            <input
              value={whatsappOverride}
              onChange={(e) => setWhatsappOverride(e.target.value)}
              placeholder="اتركه فارغًا لاستخدام رقم الشركة الافتراضي"
              className="w-full rounded-lg border border-fs-green-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-fs-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-fs-green-700 mb-1.5">لغة الكتابة الأصلية</label>
            <select
              value={sourceLocale}
              onChange={(e) => setSourceLocale(e.target.value as Locale)}
              className="w-full rounded-lg border border-fs-green-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-fs-gold-500"
            >
              {LOCALE_TABS.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-fs-green-400 mt-1">اكتب المحتوى بهذه اللغة فقط، ثم استخدم زر الترجمة التلقائية أدناه.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex gap-2">
          {LOCALE_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold border transition ${
                activeTab === t.key ? "bg-fs-green-800 text-white border-fs-green-800" : "border-fs-green-200 text-fs-green-700"
              }`}
            >
              {t.label}
              {content[t.key].name && autoTranslated[t.key] && t.key !== sourceLocale && (
                <span className="ms-1.5 text-[10px] opacity-70">(آلي)</span>
              )}
            </button>
          ))}
        </div>
        <button
          onClick={handleTranslate}
          disabled={translating || !content[sourceLocale].name}
          className="flex items-center gap-1.5 rounded-full bg-fs-gold-500 text-fs-green-900 font-semibold px-4 py-2 text-sm hover:bg-fs-gold-300 disabled:opacity-50"
        >
          {translating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
          ترجمة تلقائية بالذكاء الاصطناعي
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-fs-green-100 p-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-fs-green-700 mb-1.5">اسم المنتج</label>
          <input
            value={content[activeTab].name}
            onChange={(e) => updateField(activeTab, "name", e.target.value)}
            className="w-full rounded-lg border border-fs-green-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-fs-gold-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-fs-green-700 mb-1.5">الوصف الكامل</label>
          <textarea
            rows={3}
            value={content[activeTab].description}
            onChange={(e) => updateField(activeTab, "description", e.target.value)}
            className="w-full rounded-lg border border-fs-green-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-fs-gold-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-fs-green-700 mb-1.5">المعلومات التقنية</label>
          <input
            value={content[activeTab].technical_info}
            onChange={(e) => updateField(activeTab, "technical_info", e.target.value)}
            placeholder="مثال: مركز قابل للاستحلاب (EC) — أباميكتين 1.8%"
            className="w-full rounded-lg border border-fs-green-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-fs-gold-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-fs-green-700 mb-1.5">الاستخدام</label>
          <textarea
            rows={2}
            value={content[activeTab].usage_info}
            onChange={(e) => updateField(activeTab, "usage_info", e.target.value)}
            className="w-full rounded-lg border border-fs-green-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-fs-gold-500"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-fs-green-700 mb-1.5">المميزات (سطر لكل ميزة)</label>
            <textarea
              rows={3}
              value={content[activeTab].features}
              onChange={(e) => updateField(activeTab, "features", e.target.value)}
              className="w-full rounded-lg border border-fs-green-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-fs-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-fs-green-700 mb-1.5">المحاصيل المناسبة (سطر لكل محصول)</label>
            <textarea
              rows={3}
              value={content[activeTab].suitable_crops}
              onChange={(e) => updateField(activeTab, "suitable_crops", e.target.value)}
              className="w-full rounded-lg border border-fs-green-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-fs-gold-500"
            />
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-600 mt-4">{error}</p>}

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-fs-green-800 text-white font-semibold px-6 py-3 text-sm hover:bg-fs-green-700 disabled:opacity-60"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          حفظ
        </button>
        <button
          onClick={() => router.push("/admin/dashboard/products")}
          className="rounded-lg border border-fs-green-200 text-fs-green-700 font-semibold px-6 py-3 text-sm hover:bg-fs-green-50"
        >
          إلغاء
        </button>
      </div>
    </div>
  );
}
