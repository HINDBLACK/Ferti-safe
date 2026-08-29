import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";

const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-arabic", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "FERTI SAFE",
};

// هذا هو الـ Root Layout الوحيد المسموح به في Next.js (يحوي <html>/<body>).
// كل من [locale]/layout.tsx (الموقع العام) و admin/** (لوحة التحكم) يضبطان
// اتجاه RTL/LTR والخط بأنفسهما عبر عنصر داخلي (div dir=...)، وليس هنا،
// لأن هذا الملف لا يعرف اللغة الحالية (فوق مستوى [locale]).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" className={`${cairo.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
