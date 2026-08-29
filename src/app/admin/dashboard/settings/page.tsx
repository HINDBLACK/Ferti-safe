"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ImageUploader from "@/components/ImageUploader";
import { Save, Loader2 } from "lucide-react";
import type { Locale } from "@/types";

const LOCALE_TABS: { key: Locale; label: string }[] = [
  { key: "ar", label: "العربية" },
  { key: "fr", label: "Français" },
  { key: "en", label: "English" },
];

export default function AdminSettingsPage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");

  const [activeTab, setActiveTab] = useState<Locale>("ar");
  const [hero, setHero] = useState<Record<Locale, { hero_title: string; hero_subtitle: string; about_text: string }>>({
    ar: { hero_title: "", hero_subtitle: "", about_text: "" },
    fr: { hero_title: "", hero_subtitle: "", about_text: "" },
    en: { hero_title: "", hero_subtitle: "", about_text: "" },
  });

  useEffect(() => {
    (async () => {
      const { data: s } = await supabase.from("company_settings").select("*").eq("id", 1).maybeSingle();
      if (s) {
        setPhone(s.phone ?? "");
        setWhatsapp(s.whatsapp ?? "");
        setEmail(s.email ?? "");
        setAddress(s.address ?? "");
        setLogoUrl(s.logo_url);
        setFacebook(s.facebook_url ?? "");
        setInstagram(s.instagram_url ?? "");
      }
      const { data: trs } = await supabase.from("company_settings_translations").select("*");
      if (trs) {
        const next = { ...hero };
        trs.forEach((t: any) => {
          next[t.locale as Locale] = { hero_title: t.hero_title ?? "", hero_subtitle: t.hero_subtitle ?? "", about_text: t.about_text ?? "" };
        });
        setHero(next);
      }
      setLoading(false);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    await supabase
      .from("company_settings")
      .update({ phone, whatsapp, email, address, logo_url: logoUrl, facebook_url: facebook || null, instagram_url: instagram || null })
      .eq("id", 1);
    for (const locale of ["ar", "fr", "en"] as Locale[]) {
      await supabase.from("company_settings_translations").upsert(
        { locale, ...hero[locale] },
        { onConflict: "locale" }
      );
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (loading) return <div className="p-10 text-center text-fs-green-400">جارٍ التحميل...</div>;

  return (
    <div className="p-6 md:p-10 max-w-3xl">
      <h1 className="text-2xl font-extrabold text-fs-green-800 mb-8">إعدادات الشركة</h1>

      <div className="bg-white rounded-2xl border border-fs-green-100 p-6 space-y-5 mb-8">
        <h2 className="font-bold text-fs-green-800">معلومات التواصل</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-fs-green-600 mb-1">الهاتف (للعرض)</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-lg border border-fs-green-200 px-4 py-2.5" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-fs-green-600 mb-1">رقم واتساب (بصيغة دولية بدون +)</label>
            <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="213770016221" className="w-full rounded-lg border border-fs-green-200 px-4 py-2.5" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-fs-green-600 mb-1">البريد الإلكتروني</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-fs-green-200 px-4 py-2.5" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-fs-green-600 mb-1">العنوان</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full rounded-lg border border-fs-green-200 px-4 py-2.5" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-fs-green-600 mb-1">رابط فيسبوك (اختياري)</label>
            <input value={facebook} onChange={(e) => setFacebook(e.target.value)} className="w-full rounded-lg border border-fs-green-200 px-4 py-2.5" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-fs-green-600 mb-1">رابط إنستغرام (اختياري)</label>
            <input value={instagram} onChange={(e) => setInstagram(e.target.value)} className="w-full rounded-lg border border-fs-green-200 px-4 py-2.5" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-fs-green-600 mb-1">شعار الشركة (Logo)</label>
          <ImageUploader value={logoUrl} onChange={setLogoUrl} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-fs-green-100 p-6 space-y-4">
        <h2 className="font-bold text-fs-green-800">محتوى الصفحة الرئيسية (Hero)</h2>
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
          <label className="block text-xs font-semibold text-fs-green-600 mb-1">العنوان الرئيسي</label>
          <input
            value={hero[activeTab].hero_title}
            onChange={(e) => setHero({ ...hero, [activeTab]: { ...hero[activeTab], hero_title: e.target.value } })}
            className="w-full rounded-lg border border-fs-green-200 px-4 py-2.5"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-fs-green-600 mb-1">الوصف الفرعي</label>
          <textarea
            rows={2}
            value={hero[activeTab].hero_subtitle}
            onChange={(e) => setHero({ ...hero, [activeTab]: { ...hero[activeTab], hero_subtitle: e.target.value } })}
            className="w-full rounded-lg border border-fs-green-200 px-4 py-2.5"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-fs-green-600 mb-1">نبذة عن الشركة</label>
          <textarea
            rows={3}
            value={hero[activeTab].about_text}
            onChange={(e) => setHero({ ...hero, [activeTab]: { ...hero[activeTab], about_text: e.target.value } })}
            className="w-full rounded-lg border border-fs-green-200 px-4 py-2.5"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-fs-green-800 text-white font-semibold px-6 py-3 text-sm hover:bg-fs-green-700 disabled:opacity-60"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          حفظ الإعدادات
        </button>
        {saved && <span className="text-sm text-fs-green-600 font-medium">تم الحفظ ✓</span>}
      </div>
    </div>
  );
}
