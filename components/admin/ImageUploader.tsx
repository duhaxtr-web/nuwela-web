"use client";
import { useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label: string;
}

export function ImageUploader({ value, onChange, label }: Props) {
  const [loading, setLoading] = useState(false);

  async function upload(file: File) {
    setLoading(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    setLoading(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      toast.error(j.error || "Yükleme başarısız");
      return;
    }
    const { url } = await res.json();
    onChange(url);
    toast.success("Görsel yüklendi");
  }

  return (
    <div className="space-y-2">
      <div className="label-base">{label}</div>
      <div className="relative aspect-[3/4] bg-surface border-2 border-dashed border-border overflow-hidden group">
        {value ? (
          <>
            <Image src={value} alt={label} fill sizes="200px" className="object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-error hover:text-white transition-colors"
              aria-label="Görseli kaldır"
            >
              <X size={14} />
            </button>
          </>
        ) : (
          <label className="absolute inset-0 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-accent/20 transition-colors">
            {loading ? <Loader2 size={18} className="animate-spin text-muted" /> : <Upload size={18} className="text-muted" />}
            <span className="text-xs uppercase tracking-widest text-muted">Yükle</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
            />
          </label>
        )}
      </div>
    </div>
  );
}
