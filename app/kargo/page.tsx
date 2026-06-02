import type { Metadata } from "next";
import { AlertTriangle, Package, Clock, MapPin, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Kargo Bilgileri",
  description: "Nuwela Boutique kargo ve sipariş iptal politikası.",
};

export default function KargoPage() {
  return (
    <div className="container-narrow py-12 md:py-20">
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.4em] text-muted mb-3">Kargo</p>
        <h1 className="font-serif text-4xl md:text-6xl italic">Kargo Bilgileri</h1>
      </div>

      <article className="space-y-10">

        <div>
          <h2 className="font-serif text-2xl md:text-3xl italic mb-4">Siparişlerim Shopier Üzerinden İşlenir</h2>
          <p className="text-muted leading-relaxed">
            Nuwela Boutique siparişleri <strong className="text-primary">Shopier</strong> altyapısı üzerinden güvenle işlenmektedir.
            Ödemenizi tamamladıktan sonra Shopier tarafından sipariş onay e-postası alırsınız. Kargo takibinizi
            bu e-postadaki bağlantı üzerinden yapabilirsiniz.
          </p>
        </div>

        <div>
          <h3 className="font-serif text-xl mb-4 flex items-center gap-2"><Package size={18} className="text-secondary" /> Kargo Süreci</h3>
          <ul className="space-y-3 text-muted">
            <li className="flex gap-3"><span className="text-secondary">•</span> Siparişiniz onaylandıktan sonra <strong className="text-primary">1–3 iş günü</strong> içinde kargoya verilir.</li>
            <li className="flex gap-3"><span className="text-secondary">•</span> Kargo firması ve takip numaranız Shopier üzerinden e-posta ile iletilir.</li>
            <li className="flex gap-3"><span className="text-secondary">•</span> Kargo teslimat süresi, bulunduğunuz konuma göre <strong className="text-primary">1–3 iş günü</strong> arasında değişir.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-xl mb-4 flex items-center gap-2"><Clock size={18} className="text-secondary" /> Siparişimi İptal Edebilir miyim?</h3>
          <p className="text-muted leading-relaxed">
            Bir siparişte değişiklik yapamazsınız, ancak sipariş oluşturduktan sonraki{" "}
            <strong className="text-primary">30 dakika</strong> içinde iptal edebilirsiniz.
          </p>
          <ul className="space-y-3 text-muted mt-4">
            <li className="flex gap-3"><span className="text-secondary">•</span> Shopier hesabınıza giriş yapın.</li>
            <li className="flex gap-3"><span className="text-secondary">•</span> İptal etmek istediğiniz sipariş için "Görüntüle veya Yönet"e tıklayın.</li>
            <li className="flex gap-3"><span className="text-secondary">•</span> "Siparişi İptal Et" düğmesine tıklayın ve adımları takip edin.</li>
          </ul>
        </div>

        <div>
          <h3 className="font-serif text-xl mb-4 flex items-center gap-2"><MapPin size={18} className="text-secondary" /> Adres Değişikliği</h3>
          <p className="text-muted leading-relaxed">
            Kargo teslimata çıkmadan önce adres değişikliği için lütfen{" "}
            <strong className="text-primary">WhatsApp veya telefon</strong> aracılığıyla bizimle iletişime geçin.
            Kargoya verildikten sonra adres değişikliği yapılamamaktadır.
          </p>
        </div>

        <div>
          <h3 className="font-serif text-xl mb-4 flex items-center gap-2"><Phone size={18} className="text-secondary" /> Kargo Sorunları</h3>
          <p className="text-muted leading-relaxed">
            Ürününüz hasarlı veya eksik geldiyse, teslim tarihinden itibaren{" "}
            <strong className="text-primary">24 saat</strong> içinde fotoğraflı olarak bizimle iletişime geçin.
            Shopier güvencesi kapsamında çözüm sağlanacaktır.
          </p>
        </div>

        <div className="p-6 bg-error/5 border-l-4 border-error flex gap-4 items-start">
          <AlertTriangle className="text-error shrink-0 mt-1" size={20} />
          <p className="text-primary font-medium">İade Garantisi Yoktur. Değişim talepleri için <a href="/degisim" className="underline hover:text-secondary">Değişim Politikası</a> sayfamızı inceleyiniz.</p>
        </div>

      </article>
    </div>
  );
}
