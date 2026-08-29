"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, FolderTree, Settings, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const items = [
  { href: "/admin/dashboard", label: "نظرة عامة", icon: LayoutDashboard },
  { href: "/admin/dashboard/products", label: "المنتجات", icon: Package },
  { href: "/admin/dashboard/categories", label: "الفئات", icon: FolderTree },
  { href: "/admin/dashboard/settings", label: "إعدادات الشركة", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside dir="rtl" className="w-64 shrink-0 bg-fs-green-900 text-fs-green-100 min-h-screen p-4 flex flex-col">
      <div className="flex items-center gap-2 px-2 py-4 mb-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-fs-gold-500 text-fs-green-900 font-bold">
          F
        </span>
        <span className="font-bold text-white">FERTI SAFE</span>
      </div>
      <nav className="flex-1 space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active ? "bg-fs-gold-500 text-fs-green-900" : "hover:bg-white/10 text-fs-green-100"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={logout}
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-fs-green-200 hover:bg-white/10 transition"
      >
        <LogOut size={18} />
        تسجيل الخروج
      </button>
    </aside>
  );
}
