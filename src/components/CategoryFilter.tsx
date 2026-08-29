"use client";

import Link from "next/link";
import type { Category, Locale } from "@/types";

export default function CategoryFilter({
  locale,
  categories,
  activeSlug,
  dict,
}: {
  locale: Locale;
  categories: Category[];
  activeSlug: string;
  dict: Record<string, string>;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
      <Link
        href={`/${locale}/products`}
        className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold border transition ${
          !activeSlug
            ? "bg-fs-green-800 text-white border-fs-green-800"
            : "bg-white text-fs-green-700 border-fs-green-200 hover:border-fs-green-400"
        }`}
      >
        {dict.filter_all}
      </Link>
      {categories.map((c) => (
        <Link
          key={c.id}
          href={`/${locale}/products/${c.slug}`}
          className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold border transition ${
            activeSlug === c.slug
              ? "bg-fs-green-800 text-white border-fs-green-800"
              : "bg-white text-fs-green-700 border-fs-green-200 hover:border-fs-green-400"
          }`}
        >
          {c.icon} {c.name}
        </Link>
      ))}
    </div>
  );
}
