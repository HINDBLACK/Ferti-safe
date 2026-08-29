export function buildWhatsAppLink(phone: string, productName: string, locale: string) {
  const digits = phone.replace(/[^0-9]/g, "");
  const messages: Record<string, string> = {
    ar: `السلام عليكم، أريد معلومات عن منتج ${productName}.`,
    fr: `Bonjour, je souhaite avoir des informations sur le produit ${productName}.`,
    en: `Hello, I would like information about the product ${productName}.`,
  };
  const text = encodeURIComponent(messages[locale] ?? messages.ar);
  return `https://wa.me/${digits}?text=${text}`;
}
