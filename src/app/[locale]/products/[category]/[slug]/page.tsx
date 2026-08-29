import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getDictionary } from "@/i18n/dictionaries";
import { getProductBySlug, getCompanySettings } from "@/lib/data/queries";
import WhatsAppButton from "@/components/WhatsAppButton";
import { RTL_LOCALES, type Locale } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; category: string; slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug, params.locale);
  if (!product) return {};
  return {
    title: `${product.name} | FERTI SAFE`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.image_url ? [product.image_url] : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { locale: Locale; category: string; slug: string };
}) {
  const { locale, category } = params;
  const dict = getDictionary(locale);
  const isRtl = RTL_LOCALES.includes(locale);
  const BackIcon = isRtl ? ChevronRight : ChevronLeft;

  const [product, settings] = await Promise.all([
    getProductBySlug(params.slug, locale),
    getCompanySettings(),
  ]);

  if (!product) notFound();

  const whatsappPhone = product.whatsapp_override || settings.whatsapp;

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6 py-10 md:py-14">
      <Link
        href={`/${locale}/products/${category}`}
        className="inline-flex items-center gap-1 text-sm text-fs-green-600 hover:text-fs-green-800 mb-6"
      >
        <BackIcon size={16} />
        {dict.back_to_products}
      </Link>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="relative aspect-square w-full rounded-2xl bg-fs-green-50 overflow-hidden border border-fs-green-100">
          {product.image_url ? (
            <Image src={product.image_url} alt={product.name} fill className="object-cover" priority />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-fs-green-300">
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9" cy="9" r="2" />
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wide text-fs-gold-600 mb-2">
            {product.category_slug}
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-fs-green-800 mb-4">{product.name}</h1>
          <p className="text-fs-green-700 leading-relaxed mb-6">{product.description}</p>

          {product.features?.length > 0 && (
            <div className="mb-6">
              <h2 className="font-bold text-fs-green-800 mb-2 text-sm">{dict.product_features}</h2>
              <ul className="space-y-1.5">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-fs-green-700">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-fs-gold-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.technical_info && (
            <div className="mb-6">
              <h2 className="font-bold text-fs-green-800 mb-2 text-sm">{dict.product_technical}</h2>
              <p className="text-sm text-fs-green-700 bg-fs-green-50 rounded-lg px-4 py-3">
                {product.technical_info}
              </p>
            </div>
          )}

          {product.usage_info && (
            <div className="mb-6">
              <h2 className="font-bold text-fs-green-800 mb-2 text-sm">{dict.product_usage}</h2>
              <p className="text-sm text-fs-green-700 leading-relaxed">{product.usage_info}</p>
            </div>
          )}

          {product.suitable_crops?.length > 0 && (
            <div className="mb-8">
              <h2 className="font-bold text-fs-green-800 mb-2 text-sm">{dict.product_crops}</h2>
              <div className="flex flex-wrap gap-2">
                {product.suitable_crops.map((c, i) => (
                  <span key={i} className="rounded-full bg-fs-green-100 text-fs-green-800 text-xs font-medium px-3 py-1.5">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto">
            <WhatsAppButton phone={whatsappPhone} productName={product.name} locale={locale} label={dict.whatsapp_ask} full />
          </div>
        </div>
      </div>
    </div>
  );
}
