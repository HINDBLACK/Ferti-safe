// عميل Supabase للاستخدام داخل Server Components / Route Handlers
// يقرأ جلسة الأدمن من الكوكيز — يُستخدم في الصفحات العامة (قراءة فقط) وصفحات الأدمن
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch {
            // يُستدعى أحيانًا من Server Component لا يمكنه الكتابة — يتم تجاهله بأمان
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch {
            // نفس الملاحظة أعلاه
          }
        },
      },
    }
  );
}
