import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary } from "@/i18n/dictionaries";
import { getCategories, getCompanySettings } from "@/lib/data/queries";
import { LOCALES, RTL_LOCALES, type Locale } from "@/types";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.locale);
  return {
    title: `${dict.company_name} | ${dict.nav_products}`,
    description: dict.section_categories_subtitle,
  };
}

// هذا Layout متداخل (وليس Root) — لا يحوي <html>/<body> (موجودان في
// src/app/layout.tsx فقط). هنا فقط نضبط اتجاه RTL/LTR والخط المناسب
// على عنصر <div> يغلّف الصفحة، بحسب اللغة الحالية.
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const locale = LOCALES.includes(params.locale) ? params.locale : "ar";
  const dir = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
  const dict = getDictionary(locale);

  const [categories, settings] = await Promise.all([getCategories(locale), getCompanySettings()]);

  return (
    <div dir={dir} lang={locale} className={`${dir === "rtl" ? "font-arabic" : "font-sans"} text-fs-green-900`}>
      <Navbar locale={locale} dict={dict} companyName={dict.company_name} />
      <main className="min-h-[70vh]">{children}</main>
      <Footer locale={locale} dict={dict} companyName={dict.company_name} categories={categories} settings={settings} />
    </div>
  );
}
