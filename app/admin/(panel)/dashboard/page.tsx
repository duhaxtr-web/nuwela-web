import { getAllProducts } from "@/lib/store";
import { KOLEKSIYONLAR } from "@/lib/constants";
import Link from "next/link";
import { Package, CheckCircle, PauseCircle, FileText, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default async function DashboardPage() {
  const all = await getAllProducts();
  const stats = {
    toplam: all.length,
    aktif: all.filter((p) => p.durum === "aktif").length,
    pasif: all.filter((p) => p.durum === "pasif").length,
    taslak: all.filter((p) => p.durum === "taslak").length,
  };
  const son = [...all]
    .sort((a, b) => new Date(b.olusturulma_tarihi).getTime() - new Date(a.olusturulma_tarihi).getTime())
    .slice(0, 5);

  const cards = [
    { label: "Toplam Ürün", value: stats.toplam, icon: Package },
    { label: "Aktif", value: stats.aktif, icon: CheckCircle, color: "text-success" },
    { label: "Pasif", value: stats.pasif, icon: PauseCircle, color: "text-muted" },
    { label: "Taslak", value: stats.taslak, icon: FileText, color: "text-secondary" },
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted mb-1">Yönetim Paneli</p>
          <h1 className="font-serif text-3xl md:text-4xl italic">Dashboard</h1>
        </div>
        <Link href="/admin/urunler/yeni" className="btn-primary">
          + Yeni Ürün
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-white border border-border p-6">
            <div className="flex items-center justify-between mb-3">
              <c.icon size={18} className={c.color || "text-primary"} />
              <span className="text-xs uppercase tracking-widest text-muted">{c.label}</span>
            </div>
            <div className="font-serif text-4xl">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-border">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-serif text-xl italic">Son Eklenen Ürünler</h2>
          <Link href="/admin/urunler" className="text-xs uppercase tracking-widest hover:text-secondary flex items-center gap-1">
            Tümü <ArrowRight size={12} />
          </Link>
        </div>
        {son.length === 0 ? (
          <div className="p-12 text-center text-muted">
            <p>Henüz ürün eklenmedi.</p>
            <Link href="/admin/urunler/yeni" className="inline-block mt-3 text-primary underline">İlk ürünü ekleyin</Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-widest text-muted">
                <th className="p-4">Başlık</th>
                <th className="p-4">Durum</th>
                <th className="p-4">Fiyat</th>
                <th className="p-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {son.map((p) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="p-4">{p.baslik}</td>
                  <td className="p-4 capitalize">{p.durum}</td>
                  <td className="p-4">{formatPrice(p.fiyat)}</td>
                  <td className="p-4 text-right">
                    <Link href={`/admin/urunler/${p.id}`} className="text-secondary hover:text-primary underline text-xs">
                      Düzenle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="bg-white border border-border p-6">
        <h2 className="font-serif text-xl italic mb-4">Koleksiyonlar</h2>
        <div className="flex flex-wrap gap-2">
          {KOLEKSIYONLAR.map((k) => (
            <span key={k} className="px-3 py-1 bg-surface text-xs uppercase tracking-widest">
              {k} ({all.filter((p) => p.koleksiyonlar?.includes(k)).length})
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
