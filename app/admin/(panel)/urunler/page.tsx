import Link from "next/link";
import Image from "next/image";
import { getAllProducts } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { DeleteButton } from "./DeleteButton";

export default async function AdminUrunlerPage() {
  const products = await getAllProducts();
  const sorted = [...products].sort(
    (a, b) => new Date(b.guncelleme_tarihi).getTime() - new Date(a.guncelleme_tarihi).getTime(),
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted mb-1">Yönetim</p>
          <h1 className="font-serif text-3xl md:text-4xl italic">Ürünler</h1>
        </div>
        <Link href="/admin/urunler/yeni" className="btn-primary">+ Yeni Ürün</Link>
      </div>

      <div className="bg-white border border-border overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-surface">
            <tr className="text-left text-xs uppercase tracking-widest text-muted">
              <th className="p-4">Görsel</th>
              <th className="p-4">Başlık</th>
              <th className="p-4">Koleksiyon</th>
              <th className="p-4">Durum</th>
              <th className="p-4">Fiyat</th>
              <th className="p-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && (
              <tr><td colSpan={6} className="p-12 text-center text-muted">Henüz ürün eklenmedi.</td></tr>
            )}
            {sorted.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="p-3">
                  <div className="relative w-14 h-16 bg-surface overflow-hidden">
                    {p.resimler.resim1 && (
                      <Image src={p.resimler.resim1} alt={p.baslik} fill sizes="56px" className="object-cover" />
                    )}
                  </div>
                </td>
                <td className="p-4 font-medium">{p.baslik}</td>
                <td className="p-4 text-muted text-xs">{p.koleksiyonlar?.length ? p.koleksiyonlar.join(", ") : "—"}</td>
                <td className="p-4">
                  <span className={`text-xs uppercase tracking-widest ${
                    p.durum === "aktif" ? "text-success" : p.durum === "taslak" ? "text-secondary" : "text-muted"
                  }`}>{p.durum}</span>
                </td>
                <td className="p-4">{formatPrice(p.fiyat)}</td>
                <td className="p-4 text-right space-x-3">
                  <Link href={`/urunler/${p.slug}`} target="_blank" className="text-xs underline hover:text-secondary">Önizle</Link>
                  <Link href={`/admin/urunler/${p.id}`} className="text-xs underline hover:text-secondary">Düzenle</Link>
                  <DeleteButton id={p.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
