import Link from "next/link";
import Image from "next/image";
import type { Locale, Product } from "@/types";

export default function ProductCard({ locale, product, dict }: { locale: Locale; product: Product; dict: Record<string, string> }) {
  return (
    <Link
      href={`/${locale}/products/${product.category_slug}/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-fs-green-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-square w-full bg-fs-green-50 flex items-center justify-center overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-fs-green-300">
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 16l4.586-4.586a2 2 0 0 1 2.828 0L16 16" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="9" r="2" />
              <rect x="3" y="3" width="18" height="18" rx="2" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1 flex-1">
        <h3 className="font-semibold text-fs-green-800 text-sm md:text-base line-clamp-2">{product.name}</h3>
        <p className="text-xs md:text-sm text-fs-green-500 line-clamp-2 flex-1">{product.description}</p>
        <span className="mt-2 text-xs md:text-sm font-semibold text-fs-gold-600 group-hover:underline">
          {dict.view_details} ←
        </span>
      </div>
    </Link>
  );
}
