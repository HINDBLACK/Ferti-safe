import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@/lib/supabase/server";

// يترجم محتوى منتج من لغة المصدر إلى اللغتين الأخريين باستخدام Claude.
// محمي: يتطلب جلسة أدمن صالحة (Supabase Auth) حتى لا يُستخدم من خارج اللوحة.
export async function POST(req: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY غير مضبوط في الخادم. أضفه في Environment Variables لتفعيل الترجمة التلقائية." },
      { status: 500 }
    );
  }

  const body = await req.json();
  const { sourceLocale, name, description, technical_info, usage_info, features, suitable_crops } = body;

  const targetLocales = ["ar", "fr", "en"].filter((l) => l !== sourceLocale);
  const langNames: Record<string, string> = { ar: "Arabic", fr: "French", en: "English" };

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const prompt = `You are translating agricultural product catalog content for "FERTI SAFE", an Algerian agricultural inputs company, from ${langNames[sourceLocale]} into ${targetLocales
    .map((l) => langNames[l])
    .join(" and ")}.

Keep all technical terms, percentages, formulation codes (EC, SC, WP, WG, DP...) and product names accurate. Keep the same professional, concise tone. Do not invent information that is not present in the source.

Source content (JSON):
${JSON.stringify({ name, description, technical_info, usage_info, features, suitable_crops }, null, 2)}

Return ONLY a valid JSON object with this exact shape, no markdown, no explanation:
{
  ${targetLocales.map((l) => `"${l}": { "name": "...", "description": "...", "technical_info": "...", "usage_info": "...", "features": ["..."], "suitable_crops": ["..."] }`).join(",\n  ")}
}`;

  try {
    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });
    const textBlock = msg.content.find((b) => b.type === "text");
    const raw = textBlock && "text" in textBlock ? textBlock.text : "{}";
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return NextResponse.json({ translations: parsed });
  } catch (e: any) {
    return NextResponse.json({ error: "فشلت الترجمة الآلية، يمكنك كتابة الترجمة يدويًا." }, { status: 500 });
  }
}
