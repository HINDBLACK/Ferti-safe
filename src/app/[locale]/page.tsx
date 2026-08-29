import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/i18n/dictionaries";
import {
  getCategories,
  getFeaturedProducts,
  getCompanySettings,
  getCompanySettingsTranslation,
} from "@/lib/data/queries";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { LOCALES, type Locale } from "@/types";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const dict = getDictionary(locale);
  const [categories, featured, settings, hero] = await Promise.all([
    getCategories(locale),
    getFeaturedProducts(locale, 8),
    getCompanySettings(),
    getCompanySettingsTranslation(locale),
  ]);

  const totalCategories = categories.length;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-fs-green-900">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2400&auto=format&fit=crop"
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-fs-green-900 via-fs-green-900/80 to-fs-green-900/40" />
        <div className="relative mx-auto max-w-5xl px-4 md:px-6 py-24 md:py-36 text-center">
          <span className="inline-block rounded-full bg-fs-gold-500/15 border border-fs-gold-500/40 text-fs-gold-400 text-sm font-semibold px-4 py-1.5 mb-6">
            {dict.company_name}
          </span>
          <h1 className="text-3xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            {hero.hero_title}
          </h1>
          <p className="text-fs-green-100 text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {hero.hero_subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/${locale}/products`}
              className="w-full sm:w-auto rounded-full bg-fs-gold-500 text-fs-green-900 font-bold px-8 py-4 hover:bg-fs-gold-300 transition text-base"
            >
              {dict.hero_cta_products}
            </Link>
            <a
              href={`tel:${settings.phone.replace(/\s/g, "")}`}
              className="w-full sm:w-auto rounded-full border-2 border-white/40 text-white font-bold px-8 py-4 hover:bg-white/10 transition text-base"
            >
              {dict.hero_cta_contact}
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-fs-green-100 bg-white">
        <div className="mx-auto max-w-5xl px-4 md:px-6 py-10 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl md:text-4xl font-extrabold text-fs-green-800">61+</div>
            <div className="text-xs md:text-sm text-fs-green-500 mt-1">{dict.stat_products}</div>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-extrabold text-fs-green-800">{totalCategories}</div>
            <div className="text-xs md:text-sm text-fs-green-500 mt-1">{dict.stat_categories}</div>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-extrabold text-fs-green-800">+1000</div>
            <div className="text-xs md:text-sm text-fs-green-500 mt-1">{dict.stat_farmers}</div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold text-fs-green-800 mb-3">
            {dict.section_categories_title}
          </h2>
          <p className="text-fs-green-500">{dict.section_categories_subtitle}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((c) => (
            <CategoryCard key={c.id} locale={locale} category={c} />
          ))}
        </div>
      </section>

      {/* Featured products */}
      {featured.length > 0 && (
        <section className="bg-white border-t border-fs-green-100">
          <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24">
            <div className="flex items-end justify-between mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-fs-green-800">
                {dict.products_title}
              </h2>
              <Link href={`/${locale}/products`} className="text-fs-gold-600 font-semibold text-sm hover:underline">
                {dict.nav_products} ←
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {featured.map((p) => (
                <ProductCard key={p.id} locale={locale} product={p} dict={dict} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
