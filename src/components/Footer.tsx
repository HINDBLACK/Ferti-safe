import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import type { Locale, Category, CompanySettings } from "@/types";

export default function Footer({
  locale,
  dict,
  companyName,
  categories,
  settings,
}: {
  locale: Locale;
  dict: Record<string, string>;
  companyName: string;
  categories: Category[];
  settings: CompanySettings;
}) {
  return (
    <footer className="bg-fs-green-800 text-fs-green-100 mt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-fs-gold-500 text-fs-green-900 font-bold">
              F
            </span>
            <span className="font-bold text-lg text-white">{companyName}</span>
          </div>
          <p className="text-sm text-fs-green-200 leading-relaxed max-w-xs">
            {settings.address}
          </p>
          <div className="flex gap-3 mt-4">
            {settings.facebook_url && (
              <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100">
                <Facebook size={20} />
              </a>
            )}
            {settings.instagram_url && (
              <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100">
                <Instagram size={20} />
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">{dict.footer_quick_links}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href={`/${locale}`} className="hover:text-fs-gold-400">{dict.nav_home}</Link></li>
            <li><Link href={`/${locale}/products`} className="hover:text-fs-gold-400">{dict.nav_products}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">{dict.footer_our_products}</h4>
          <ul className="space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/${locale}/products/${c.slug}`} className="hover:text-fs-gold-400">
                  {c.icon} {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">{dict.footer_contact_info}</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`}>{settings.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>{settings.address}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-fs-green-300">
        © {new Date().getFullYear()} {companyName} — {dict.footer_rights}
      </div>
    </footer>
  );
}
