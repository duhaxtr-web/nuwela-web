import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KOLEKSIYONLAR } from "@/lib/constants";
import { getAllProducts } from "@/lib/store";
import { ProductGrid } from "@/components/products/ProductGrid";
import { slugify } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const name = KOLEKSIYONLAR.find((k) => slugify(k) === params.slug);
  return {
    title: name ? `${name} Koleksiyonu` : "Koleksiyon",
    description: name ? `${name} koleksiyonundaki ürünleri keşfedin.` : undefined,
  };
}

export default async function KoleksiyonDetayPage({ params }: { params: { slug: string } }) {
  const name = KOLEKSIYONLAR.find((k) => slugify(k) === params.slug);
  if (!name) notFound();
  const all = await getAllProducts();
  const products = all.filter((p) => p.durum === "aktif" && p.koleksiyonlar?.includes(name));
  return (
    <div className="container-wide py-12 md:py-16">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.4em] text-muted mb-3">Koleksiyon</p>
        <h1 className="font-serif text-4xl md:text-6xl italic">{name}</h1>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
