import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { Locale } from "@/types";

export default function WhatsAppButton({
  phone,
  productName,
  locale,
  label,
  full,
}: {
  phone: string;
  productName: string;
  locale: Locale;
  label: string;
  full?: boolean;
}) {
  const href = buildWhatsAppLink(phone, productName, locale);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-white font-semibold text-sm md:text-base shadow-md hover:brightness-95 active:scale-[0.98] transition ${
        full ? "w-full" : ""
      }`}
    >
      <svg viewBox="0 0 32 32" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.36.688 4.56 1.875 6.406L4 29l7.781-1.828A11.94 11.94 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3Zm0 21.75c-1.969 0-3.797-.578-5.328-1.578l-.383-.235-4.617 1.086 1.11-4.5-.25-.398A9.71 9.71 0 0 1 5.25 15c0-5.938 4.813-10.75 10.75-10.75S26.75 9.063 26.75 15 21.938 24.75 16 24.75Zm5.906-8.086c-.32-.164-1.906-.945-2.203-1.055-.297-.109-.516-.164-.734.164-.219.328-.844 1.055-1.031 1.273-.188.219-.383.242-.703.078-.32-.164-1.352-.5-2.578-1.594-.953-.852-1.594-1.906-1.781-2.234-.188-.328-.02-.504.14-.668.145-.144.32-.375.484-.563.164-.187.219-.32.328-.539.11-.219.055-.406-.023-.57-.078-.164-.734-1.766-1.008-2.422-.266-.64-.535-.554-.734-.563-.187-.008-.406-.008-.625-.008-.219 0-.57.078-.867.406-.297.328-1.133 1.11-1.133 2.703 0 1.594 1.16 3.133 1.32 3.352.164.219 2.281 3.484 5.531 4.887.773.336 1.375.535 1.844.684.774.246 1.477.211 2.031.129.62-.094 1.906-.781 2.176-1.531.27-.75.27-1.395.188-1.531-.078-.14-.297-.219-.617-.383Z" />
      </svg>
      {label}
    </a>
  );
}
