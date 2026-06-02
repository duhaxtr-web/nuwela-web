import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { KOLEKSIYONLAR } from "@/lib/constants";
import { getAllProducts } from "@/lib/store";
import { slugify } from "@/lib/utils";
import collectionImages from "@/data/collections.json";

export const metadata: Metadata = {
  title: "Koleksiyonlar",
  description: "Nuwela Boutique koleksiyonları — Yeni Sezon, Elbise, Abiye, Takım, Dış Giyim ve daha fazlası.",
};

export const dynamic = "force-dynamic";

export default async function KoleksiyonlarPage() {
  const all = await getAllProducts();
  const data = KOLEKSIYONLAR.map((isim) => {
    const slug = slugify(isim);
    return {
      isim,
      slug,
      sayi: all.filter((p) => p.koleksiyonlar?.includes(isim) && p.durum === "aktif").length,
      gorsel: (collectionImages as Record<string, string | null>)[slug] ?? null,
    };
  });

  return (
    <div className="container-wide py-12 md:py-20">
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.4em] text-muted mb-3">Tüm Koleksiyonlar</p>
        <h1 className="font-serif text-4xl md:text-6xl italic">Koleksiyonlarımız</h1>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {data.map((c) => (
          <Link
            key={c.slug}
            href={`/urunler?koleksiyon=${encodeURIComponent(c.isim)}`}
            className="group relative block overflow-hidden bg-surface aspect-[4/3]"
          >
            {c.gorsel ? (
              <Image
                src={c.gorsel}
                alt={c.isim}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-7 text-white">
              <p className="text-xs uppercase tracking-widest text-white/70 mb-2">{c.sayi} ürün</p>
              <h3 className="font-serif text-3xl md:text-4xl italic mb-3">{c.isim}</h3>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border-b border-white/50 pb-1 self-start group-hover:border-accent group-hover:text-accent transition-colors">
                Keşfet <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
