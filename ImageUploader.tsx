"use client";

import { useRef, useState } from "react";
import { Upload, Trash2, RefreshCw } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ImageUploader({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setError("");
    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `products/${crypto.randomUUID()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(path, file, { upsert: true, cacheControl: "3600" });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (e: any) {
      setError("فشل رفع الصورة، حاول مجددًا");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div className="relative aspect-square w-full max-w-[220px] rounded-xl border-2 border-dashed border-fs-green-200 bg-fs-green-50 overflow-hidden flex items-center justify-center">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="product" className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-fs-green-300 text-xs px-4 text-center">
            <Upload size={28} />
            لا توجد صورة بعد
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <RefreshCw className="animate-spin text-fs-green-600" />
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      <div className="flex gap-2 mt-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-1.5 rounded-lg bg-fs-green-800 text-white text-xs font-semibold px-3 py-2 hover:bg-fs-green-700"
        >
          <Upload size={14} />
          {value ? "استبدال الصورة" : "رفع صورة"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="flex items-center gap-1.5 rounded-lg border border-red-200 text-red-600 text-xs font-semibold px-3 py-2 hover:bg-red-50"
          >
            <Trash2 size={14} />
            حذف
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
    </div>
  );
}
