import { createClient } from "@/lib/supabase/server";
import { Package, FolderTree, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default async function AdminOverviewPage() {
  const supabase = createClient();
  const { count: totalProducts } = await supabase.from("products").select("*", { count: "exact", head: true });
  const { count: visibleProducts } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("is_visible", true);
  const { count: totalCategories } = await supabase.from("categories").select("*", { count: "exact", head: true });

  const stats = [
    { label: "إجمالي المنتجات", value: totalProducts ?? 0, icon: Package, color: "bg-fs-green-800" },
    { label: "منتجات ظاهرة للزوار", value: visibleProducts ?? 0, icon: Eye, color: "bg-fs-gold-500" },
    { label: "منتجات مخفية", value: (totalProducts ?? 0) - (visibleProducts ?? 0), icon: EyeOff, color: "bg-fs-green-400" },
    { label: "الفئات", value: totalCategories ?? 0, icon: FolderTree, color: "bg-fs-green-600" },
  ];

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl font-extrabold text-fs-green-800 mb-8">نظرة عامة</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-fs-green-100 p-5">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${s.color} text-white mb-3`}>
              <s.icon size={20} />
            </div>
            <div className="text-2xl font-extrabold text-fs-green-800">{s.value}</div>
            <div className="text-xs text-fs-green-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/admin/dashboard/products/new" className="rounded-lg bg-fs-green-800 text-white font-semibold px-5 py-3 text-sm hover:bg-fs-green-700 transition">
          ➕ إضافة منتج جديد
        </Link>
        <Link href="/admin/dashboard/products" className="rounded-lg border border-fs-green-200 text-fs-green-800 font-semibold px-5 py-3 text-sm hover:bg-fs-green-50 transition">
          إدارة المنتجات
        </Link>
        <Link href="/admin/dashboard/settings" className="rounded-lg border border-fs-green-200 text-fs-green-800 font-semibold px-5 py-3 text-sm hover:bg-fs-green-50 transition">
          إعدادات الشركة
        </Link>
      </div>
    </div>
  );
}
