"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { KOLEKSIYONLAR } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ProductFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const kol = params.get("koleksiyon");
  const sira = params.get("sira") || "yeni";

  function setParam(key: string, value: string | null) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`/urunler?${next.toString()}`);
  }

  const tabs = [
    { value: null, label: "Tümü" },
    ...KOLEKSIYONLAR.map((k) => ({ value: k, label: k })),
  ];

  return (
    <div className="border-y border-border py-5 mb-10 flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-1">
        {tabs.map((t) => (
          <button
            key={t.value ?? "all"}
            type="button"
            onClick={() => setParam("koleksiyon", t.value)}
            className={cn(
              "px-4 py-2 text-xs uppercase tracking-widest transition-colors",
              (kol ?? null) === t.value ? "bg-primary text-white" : "hover:text-secondary",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <select
        value={sira}
        onChange={(e) => setParam("sira", e.target.value)}
        className="text-xs uppercase tracking-widest bg-transparent border-b border-border py-1 focus:outline-none focus:border-primary"
      >
        <option value="yeni">Sıralama: Yeni</option>
        <option value="ucuz">Fiyat: Artan</option>
        <option value="pahali">Fiyat: Azalan</option>
      </select>
    </div>
  );
}
