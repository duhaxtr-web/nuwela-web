import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProducts } from "@/lib/store";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductFilters } from "@/components/products/ProductFilters";

export const metadata: Metadata = {
  title: "Ürünlerimiz",
  description: "Nuwela Boutique tesettür ve açık giyim ürünleri. Yeni sezon koleksiyonu.",
};

export const dynamic = "force-dynamic";

export default async function UrunlerPage({
  searchParams,
}: {
  searchParams: { tur?: string; koleksiyon?: string; sira?: string };
}) {
  const all = await getAllProducts();
  let products = all.filter((p) => p.durum === "aktif");

  if (searchParams.tur) products = products.filter((p) => p.urun_turu === searchParams.tur);
  if (searchParams.koleksiyon) products = products.filter((p) => p.koleksiyonlar?.includes(searchParams.koleksiyon!));

  const sira = searchParams.sira || "yeni";
  if (sira === "ucuz") products.sort((a, b) => (a.indirimli_fiyat ?? a.fiyat) - (b.indirimli_fiyat ?? b.fiyat));
  else if (sira === "pahali") products.sort((a, b) => (b.indirimli_fiyat ?? b.fiyat) - (a.indirimli_fiyat ?? a.fiyat));
  else products.sort((a, b) => new Date(b.olusturulma_tarihi).getTime() - new Date(a.olusturulma_tarihi).getTime());

  return (
    <div className="container-wide py-12 md:py-16">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.4em] text-muted mb-3">Tümü</p>
        <h1 className="font-serif text-4xl md:text-6xl italic">Ürünlerimiz</h1>
      </div>
      <Suspense>
        <ProductFilters />
      </Suspense>
      <ProductGrid products={products} />
    </div>
  );
}
