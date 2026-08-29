"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("بيانات الدخول غير صحيحة");
      return;
    }
    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div dir="rtl" className="min-h-screen flex items-center justify-center bg-fs-green-900 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-fs-green-800 text-fs-gold-500 font-bold text-2xl mb-3">
            F
          </div>
          <h1 className="text-xl font-bold text-fs-green-800">لوحة تحكم FERTI SAFE</h1>
          <p className="text-sm text-fs-green-500 mt-1">تسجيل دخول الأدمن</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-fs-green-700 mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-fs-green-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-fs-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-fs-green-700 mb-1">كلمة المرور</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-fs-green-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-fs-gold-500"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-fs-green-800 text-white font-semibold py-3 hover:bg-fs-green-700 transition disabled:opacity-60"
          >
            <Lock size={16} />
            {loading ? "جارٍ الدخول..." : "دخول"}
          </button>
        </form>
      </div>
    </div>
  );
}
