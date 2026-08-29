"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, Loader2 } from "lucide-react";
import type { Locale } from "@/types";

type CatRow = {
  id: string;
  slug: string;
  icon: string;
  sort_order: number;
  translations: Record<Locale, { name: string; description: string }>;
};

const LOCALE_TABS: { key: Locale; label: string }[] = [
  { key: "ar", label: "العربية" },
  { key: "fr", label: "Français" },
  { key: "en", label: "English" },
];

export default function AdminCategoriesPage() {
  const [rows, setRows] = useState<CatRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Locale>("ar");
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data: cats } = await supabase.from("categories").select("*").order("sort_order");
    const { data: trs } = await supabase.from("category_translations").select("*");
    const rows: CatRow[] = (cats ?? []).map((c: any) => {
      const translations: any = { ar: { name: "", description: "" }, fr: { name: "", description: "" }, en: { name: "", description: "" } };
      (trs ?? []).filter((t: any) => t.category_id === c.id).forEach((t: any) => {
        translations[t.locale] = { name: t.name, description: t.description };
      });
      return { id: c.id, slug: c.slug, icon: c.icon, sort_order: c.sort_order, translations };
    });
    setRows(rows);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function save(row: CatRow) {
    setSaving(true);
    const supabase = createClient();
    await supabase.from("categories").update({ icon: row.icon, sort_order: row.sort_order }).eq("id", row.id);
    for (const locale of ["ar", "fr", "en"] as Locale[]) {
      await supabase.from("category_translations").upsert(
        { category_id: row.id, locale, name: row.translations[locale].name, description: row.translations[locale].description },
        { onConflict: "category_id,locale" }
      );
    }
    setSaving(false);
    setOpenId(null);
    load();
  }

  function updateRow(id: string, patch: Partial<CatRow>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function updateTranslation(id: string, locale: Locale, field: "name" | "description", value: string) {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, translations: { ...r.translations, [locale]: { ...r.translations[locale], [field]: value } } } : r
      )
    );
  }

  if (loading) return <div className="p-10 text-center text-fs-green-400">جارٍ التحميل...</div>;

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl font-extrabold text-fs-green-800 mb-2">الفئات</h1>
      <p className="text-sm text-fs-green-500 mb-8">
        الفئات ثابتة (مطابقة لأقسام المنتجات الفعلية)، ويمكنك تعديل الأيقونة والاسم والوصف بكل لغة.
      </p>

      <div className="grid gap-4">
        {rows.map((row) => (
          <div key={row.id} className="bg-white rounded-2xl border border-fs-green-100 p-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{row.icon}</span>
                <div>
                  <div className="font-bold text-fs-green-800">{row.translations.ar.name}</div>
                  <div className="text-xs text-fs-green-400">{row.slug}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  setOpenId(openId === row.id ? null : row.id);
                  setActiveTab("ar");
                }}
                className="rounded-lg border border-fs-green-200 px-4 py-2 text-sm font-semibold text-fs-green-700 hover:bg-fs-green-50"
              >
                {openId === row.id ? "إغلاق" : "تعديل"}
              </button>
            </div>

            {openId === row.id && (
              <div className="mt-5 pt-5 border-t border-fs-green-100 space-y-4">
                <div className="flex gap-4 flex-wrap">
                  <div>
                    <label className="block text-xs font-semibold text-fs-green-600 mb-1">الأيقونة (إيموجي)</label>
                    <input
                      value={row.icon}
                      onChange={(e) => updateRow(row.id, { icon: e.target.value })}
                      className="w-20 rounded-lg border border-fs-green-200 px-3 py-2 text-center text-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-fs-green-600 mb-1">الترتيب</label>
                    <input
                      type="number"
                      value={row.sort_order}
                      onChange={(e) => updateRow(row.id, { sort_order: Number(e.target.value) })}
                      className="w-24 rounded-lg border border-fs-green-200 px-3 py-2"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  {LOCALE_TABS.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setActiveTab(t.key)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold border ${
                        activeTab === t.key ? "bg-fs-green-800 text-white border-fs-green-800" : "border-fs-green-200 text-fs-green-700"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-fs-green-600 mb-1">الاسم</label>
                  <input
                    value={row.translations[activeTab].name}
                    onChange={(e) => updateTranslation(row.id, activeTab, "name", e.target.value)}
                    className="w-full rounded-lg border border-fs-green-200 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-fs-green-600 mb-1">الوصف</label>
                  <textarea
                    rows={2}
                    value={row.translations[activeTab].description}
                    onChange={(e) => updateTranslation(row.id, activeTab, "description", e.target.value)}
                    className="w-full rounded-lg border border-fs-green-200 px-3 py-2"
                  />
                </div>

                <button
                  onClick={() => save(row)}
                  disabled={saving}
                  className="flex items-center gap-2 rounded-lg bg-fs-green-800 text-white font-semibold px-5 py-2.5 text-sm hover:bg-fs-green-700 disabled:opacity-60"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  حفظ
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
