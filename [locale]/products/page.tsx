import { Suspense } from "react";
import { getDictionary } from "@/i18n/dictionaries";
import { getCategories, searchProducts } from "@/lib/data/queries";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import type { Locale } from "@/types";

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: { locale: Locale };
  searchParams: { q?: string };
}) {
  const locale = params.locale;
  const dict = getDictionary(locale);
  const query = searchParams.q?.trim() ?? "";

  const categories = await getCategories(locale);
  const results = query ? await searchProducts(query, locale) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
      <div className="text-center max-w-xl mx-auto mb-8">
        <h1 className="text-2xl md:text-4xl font-extrabold text-fs-green-800 mb-3">{dict.products_title}</h1>
        <p className="text-fs-green-500">{dict.products_subtitle}</p>
      </div>

      <div className="max-w-xl mx-auto mb-12">
        <Suspense>
          <SearchBar placeholder={dict.search_placeholder} />
        </Suspense>
      </div>

      {query ? (
        results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {results.map((p) => (
              <ProductCard key={p.id} locale={locale} product={p} dict={dict} />
            ))}
          </div>
        ) : (
          <p className="text-center text-fs-green-500 py-16">{dict.no_results}</p>
        )
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((c) => (
            <CategoryCard key={c.id} locale={locale} category={c} />
          ))}
        </div>
      )}
    </div>
  );
}
