export type Locale = "ar" | "fr" | "en";
export const LOCALES: Locale[] = ["ar", "fr", "en"];
export const DEFAULT_LOCALE: Locale = "ar";
export const RTL_LOCALES: Locale[] = ["ar"];

export interface Category {
  id: string;
  slug: string;
  icon: string;
  sort_order: number;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  category_id: string;
  category_slug?: string;
  category_name?: string;
  image_url: string | null;
  is_visible: boolean;
  sort_order: number;
  whatsapp_override: string | null;
  name: string;
  description: string;
  technical_info: string;
  usage_info: string;
  features: string[];
  suitable_crops: string[];
  is_auto_translated?: boolean;
}

export interface ProductTranslationRow {
  locale: Locale;
  name: string;
  description: string;
  technical_info: string;
  usage_info: string;
  features: string[];
  suitable_crops: string[];
  is_auto_translated: boolean;
}

export interface CompanySettings {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  logo_url: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
}

export interface CompanySettingsTranslation {
  locale: Locale;
  hero_title: string;
  hero_subtitle: string;
  about_text: string;
}
