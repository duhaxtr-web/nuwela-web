import { notFound } from "next/navigation";
import { getProductById } from "@/lib/store";
import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function UrunDuzenlePage({ params }: { params: { id: string } }) {
  const { getAllProducts } = await import("@/lib/store");
  const all = await getAllProducts();
  console.log("[edit] aranan id:", JSON.stringify(params.id), "| bulunan idler:", all.map(p => p.id).join(", "));
  const product = all.find(p => p.id === params.id) ?? null;
  if (!product) {
    console.log("[edit] urun bulunamadi - toplam urun:", all.length);
    notFound();
  }
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted mb-1">Düzenle</p>
        <h1 className="font-serif text-3xl md:text-4xl italic">{product.baslik}</h1>
      </div>
      <ProductForm initial={product} />
    </div>
  );
}
