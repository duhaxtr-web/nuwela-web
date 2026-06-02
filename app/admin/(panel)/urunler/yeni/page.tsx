import { ProductForm } from "@/components/admin/ProductForm";

export default function YeniUrunPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted mb-1">Yeni Ürün</p>
        <h1 className="font-serif text-3xl md:text-4xl italic">Ürün Ekle</h1>
      </div>
      <ProductForm />
    </div>
  );
}
