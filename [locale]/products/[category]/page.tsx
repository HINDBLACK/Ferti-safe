import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n/dictionaries";
import { getCategories, getCategoryBySlug, getProductsByCategory } from "@/lib/data/queries";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import type { Locale } from "@/types";

export default async function CategoryPage({
  params,
}: {
  params: { locale: Locale; category: string };
}) {
  const { locale, category: categorySlug } = params;
  const dict = getDictionary(locale);

  const [categories, category] = await Promise.all([
    getCategories(locale),
    getCategoryBySlug(categorySlug, locale),
  ]);

  if (!category) notFound();

  const products = await getProductsByCategory(categorySlug, locale);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="text-4xl mb-3">{category.icon}</div>
        <h1 className="text-2xl md:text-4xl font-extrabold text-fs-green-800 mb-3">{category.name}</h1>
        <p className="text-fs-green-500">{category.description}</p>
      </div>

      <div className="mb-10">
        <CategoryFilter locale={locale} categories={categories} activeSlug={categorySlug} dict={dict} />
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} locale={locale} product={p} dict={dict} />
          ))}
        </div>
      ) : (
        <p className="text-center text-fs-green-500 py-16">{dict.no_products}</p>
      )}
    </div>
  );
}
