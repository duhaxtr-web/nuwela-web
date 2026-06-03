import { notFound } from "next/navigation";
import { getProductById } from "@/lib/store";
import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function UrunDuzenlePage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  if (!product) notFound();
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
