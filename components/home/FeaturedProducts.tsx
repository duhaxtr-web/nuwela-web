import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllProducts } from "@/lib/store";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export async function FeaturedProducts() {
  const all = await getAllProducts();
  const featured = all
    .filter((p) => p.durum === "aktif")
    .sort((a, b) => a.sira - b.sira)
    .slice(0, 8);

  return (
    <section className="container-wide py-20 md:py-28">
      <ScrollReveal className="flex items-end justify-between mb-12">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-muted mb-4">Yeni Sezon</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl italic">Öne Çıkan Ürünler</h2>
        </div>
        <Link
          href="/urunler"
          className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-widest hover:text-secondary transition-colors"
        >
          Tümünü Gör <ArrowRight size={14} />
        </Link>
      </ScrollReveal>

      <ProductGrid products={featured} />

      <div className="mt-12 text-center md:hidden">
        <Link href="/urunler" className="btn-outline inline-flex">
          Tümünü Gör <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
