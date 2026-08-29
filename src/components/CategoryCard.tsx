import Link from "next/link";
import type { Locale, Category } from "@/types";

export default function CategoryCard({ locale, category }: { locale: Locale; category: Category }) {
  return (
    <Link
      href={`/${locale}/products/${category.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-fs-green-100 bg-white p-6 md:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="text-4xl md:text-5xl mb-4">{category.icon}</div>
      <h3 className="text-lg md:text-xl font-bold text-fs-green-800 mb-2 group-hover:text-fs-gold-600 transition">
        {category.name}
      </h3>
      <p className="text-sm text-fs-green-600 leading-relaxed line-clamp-2">{category.description}</p>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-fs-green-700 to-fs-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-start" />
    </Link>
  );
}
