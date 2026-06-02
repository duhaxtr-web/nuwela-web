import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Değişim Politikası",
  description: "Nuwela Boutique değişim politikası ve şartları.",
};

export default function DegisimPage() {
  return (
    <div className="container-narrow py-12 md:py-20">
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.4em] text-muted mb-3">Değişim</p>
        <h1 className="font-serif text-4xl md:text-6xl italic">Değişim Politikası</h1>
      </div>
      <article className="space-y-6">
        <h2 className="font-serif text-2xl md:text-3xl italic">Nuwela'nın İade Politikası Nedir?</h2>
        <p className="text-muted leading-relaxed">
          Nuwela'da <strong className="text-primary">iade mevcut değildir</strong>. Değişim mevcuttur.
        </p>
        <div>
          <h3 className="font-serif text-xl mt-6 mb-4">Bilmeniz Gerekenler</h3>
          <ul className="space-y-3 text-muted">
            <li className="flex gap-3">
              <span className="text-secondary">•</span>
              Çevrimiçi sipariş teslimatı veya Nuwela mağazasından satın alımdan sonraki{" "}
              <strong className="text-primary">5 gün</strong> içinde değişim sağlayabilirsiniz.
            </li>
            <li className="flex gap-3">
              <span className="text-secondary">•</span>
              Değişim için satın alma belgesi ve ürün eksiksiz, kullanılmamış gönderilmesi gerekmektedir.
            </li>
          </ul>
        </div>
      </article>

      <div className="mt-12 border-t border-border pt-10 text-center">
        <p className="text-muted mb-6">Değişim talebinizi başlatmak için aşağıdaki butonu kullanabilirsiniz.</p>
        <Link
          href="/degisim-talep"
          className="inline-block bg-primary text-white px-10 py-4 hover:bg-secondary transition-colors text-sm uppercase tracking-[0.3em]"
        >
          Değişim Talebi Başlat
        </Link>
      </div>
    </div>
  );
}
