"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Pencil, Trash2, ArrowUp, ArrowDown, Plus } from "lucide-react";

type Row = {
  id: string;
  slug: string;
  image_url: string | null;
  is_visible: boolean;
  sort_order: number;
  category_id: string;
  category_slug: string;
  name: string;
};

export default function AdminProductsPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("products")
      .select(
        "id, slug, image_url, is_visible, sort_order, category_id, categories(slug), product_translations(locale, name)"
      )
      .order("sort_order");
    const mapped: Row[] = (data ?? []).map((p: any) => ({
      id: p.id,
      slug: p.slug,
      image_url: p.image_url,
      is_visible: p.is_visible,
      sort_order: p.sort_order,
      category_id: p.category_id,
      category_slug: p.categories?.slug ?? "",
      name: p.product_translations.find((t: any) => t.locale === "ar")?.name ?? p.slug,
    }));
    setRows(mapped);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function toggleVisible(row: Row) {
    const supabase = createClient();
    await supabase.from("products").update({ is_visible: !row.is_visible }).eq("id", row.id);
    load();
  }

  async function remove(row: Row) {
    if (!confirm(`حذف المنتج "${row.name}" نهائيًا؟`)) return;
    const supabase = createClient();
    await supabase.from("products").delete().eq("id", row.id);
    load();
  }

  async function move(row: Row, direction: "up" | "down") {
    const siblings = rows.filter((r) => r.category_id === row.category_id).sort((a, b) => a.sort_order - b.sort_order);
    const idx = siblings.findIndex((r) => r.id === row.id);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= siblings.length) return;
    const other = siblings[swapIdx];
    const supabase = createClient();
    await Promise.all([
      supabase.from("products").update({ sort_order: other.sort_order }).eq("id", row.id),
      supabase.from("products").update({ sort_order: row.sort_order }).eq("id", other.id),
    ]);
    load();
  }

  const filtered = rows.filter((r) => r.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-extrabold text-fs-green-800">المنتجات ({rows.length})</h1>
        <Link
          href="/admin/dashboard/products/new"
          className="flex items-center gap-1.5 rounded-lg bg-fs-green-800 text-white font-semibold px-4 py-2.5 text-sm hover:bg-fs-green-700"
        >
          <Plus size={16} />
          إضافة منتج جديد
        </Link>
      </div>

      <input
        placeholder="بحث في المنتجات..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full max-w-sm rounded-lg border border-fs-green-200 px-4 py-2.5 mb-6 focus:outline-none focus:ring-2 focus:ring-fs-gold-500"
      />

      <div className="bg-white rounded-2xl border border-fs-green-100 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-fs-green-400">جارٍ التحميل...</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-fs-green-400">لا توجد منتجات</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-fs-green-50 text-fs-green-600 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-start">الصورة</th>
                <th className="px-4 py-3 text-start">الاسم</th>
                <th className="px-4 py-3 text-start">الفئة</th>
                <th className="px-4 py-3 text-start">الحالة</th>
                <th className="px-4 py-3 text-start">الترتيب</th>
                <th className="px-4 py-3 text-start">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className="border-t border-fs-green-50">
                  <td className="px-4 py-3">
                    <div className="h-10 w-10 rounded-lg bg-fs-green-50 overflow-hidden flex items-center justify-center">
                      {row.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={row.image_url} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-fs-green-300 text-[10px]">لا صورة</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-fs-green-800">{row.name}</td>
                  <td className="px-4 py-3 text-fs-green-500">{row.category_slug}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleVisible(row)}
                      className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        row.is_visible ? "bg-fs-green-100 text-fs-green-700" : "bg-red-50 text-red-600"
                      }`}
                    >
                      {row.is_visible ? <Eye size={12} /> : <EyeOff size={12} />}
                      {row.is_visible ? "ظاهر" : "مخفي"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => move(row, "up")} className="rounded p-1 hover:bg-fs-green-50 text-fs-green-500">
                        <ArrowUp size={14} />
                      </button>
                      <button onClick={() => move(row, "down")} className="rounded p-1 hover:bg-fs-green-50 text-fs-green-500">
                        <ArrowDown size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/admin/dashboard/products/${row.id}/edit`} className="rounded p-1.5 hover:bg-fs-green-50 text-fs-green-600">
                        <Pencil size={16} />
                      </Link>
                      <button onClick={() => remove(row)} className="rounded p-1.5 hover:bg-red-50 text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
