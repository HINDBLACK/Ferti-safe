"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import type { Locale } from "@/types";

const LOCALE_LABEL: Record<Locale, string> = { ar: "العربية", fr: "Français", en: "English" };

export default function Navbar({
  locale,
  dict,
  companyName,
}: {
  locale: Locale;
  dict: Record<string, string>;
  companyName: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const switchLocale = (l: Locale) => {
    const rest = pathname.split("/").slice(2).join("/");
    router.push(`/${l}/${rest}`);
    setLangOpen(false);
  };

  const links = [
    { href: `/${locale}`, label: dict.nav_home },
    { href: `/${locale}/products`, label: dict.nav_products },
  ];

  return (
    <header className="sticky top-0 z-50 bg-fs-cream/95 backdrop-blur border-b border-fs-green-100">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-fs-green-800 text-fs-gold-500 font-bold text-lg">
              F
            </span>
            <span className="font-bold text-lg md:text-xl text-fs-green-800 tracking-tight">
              {companyName}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-fs-green-800 font-medium hover:text-fs-gold-600 transition"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1.5 rounded-full border border-fs-green-200 px-3 py-1.5 text-sm text-fs-green-800 hover:bg-fs-green-50 transition"
              >
                <Globe size={16} />
                {LOCALE_LABEL[locale]}
              </button>
              {langOpen && (
                <div className="absolute end-0 mt-2 w-36 rounded-xl border border-fs-green-100 bg-white shadow-lg overflow-hidden">
                  {(Object.keys(LOCALE_LABEL) as Locale[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => switchLocale(l)}
                      className={`block w-full text-start px-4 py-2 text-sm hover:bg-fs-green-50 ${
                        l === locale ? "text-fs-gold-600 font-semibold" : "text-fs-green-800"
                      }`}
                    >
                      {LOCALE_LABEL[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="md:hidden rounded-lg p-2 text-fs-green-800"
              onClick={() => setOpen((v) => !v)}
              aria-label="menu"
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-fs-green-100 bg-fs-cream px-4 py-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-fs-green-800 font-medium py-2 text-lg"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            {(Object.keys(LOCALE_LABEL) as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => switchLocale(l)}
                className={`rounded-full border px-3 py-1.5 text-sm ${
                  l === locale
                    ? "border-fs-gold-500 text-fs-gold-600 font-semibold"
                    : "border-fs-green-200 text-fs-green-800"
                }`}
              >
                {LOCALE_LABEL[l]}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
