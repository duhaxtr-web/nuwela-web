import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Sipariş İptali",
  description: "Nuwela Boutique sipariş iptali prosedürü.",
};

export default function SiparisIptaliPage() {
  return (
    <div className="container-narrow py-12 md:py-20">
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.4em] text-muted mb-3">Sipariş İptali</p>
        <h1 className="font-serif text-4xl md:text-6xl italic">Siparişimi İptal Etmek İstiyorum</h1>
      </div>

      <article className="space-y-8">
        <p className="text-muted leading-relaxed">
          Nuwela siparişleri <strong className="text-primary">Shopier</strong> altyapısı üzerinden işlenmektedir.
          Sipariş iptalini Shopier hesabınız üzerinden gerçekleştirebilirsiniz. İptal işlemi yalnızca
          sipariş oluşturulduktan sonraki <strong className="text-primary">30 dakika</strong> içinde mümkündür.
        </p>

        <div>
          <h2 className="font-serif text-xl mb-5">Shopier'dan iptal etmek için:</h2>
          <ol className="space-y-4 text-muted">
            <li className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0 font-medium">1</span>
              <span><strong className="text-primary">shopier.com</strong> adresine gidin ve hesabınıza giriş yapın.</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0 font-medium">2</span>
              <span>Sağ üstten <strong className="text-primary">Siparişlerim</strong> bölümüne gidin.</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0 font-medium">3</span>
              <span>İptal etmek istediğiniz sipariş için <strong className="text-primary">"Görüntüle veya Yönet"</strong>e tıklayın.</span>
            </li>
            <li className="flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0 font-medium">4</span>
              <span><strong className="text-primary">"Siparişi İptal Et"</strong> düğmesine tıklayın ve adımları takip edin.</span>
            </li>
          </ol>
        </div>

        <p className="text-muted leading-relaxed">
          30 dakikalık süre geçtiyse veya kargo zaten teslimata çıktıysa sipariş iptali yapılamamaktadır.
          Bu durumda <a href="/iletisim" className="underline hover:text-secondary">bizimle iletişime geçin</a>, en kısa sürede yardımcı olalım.
        </p>

        <div className="p-6 bg-error/5 border-l-4 border-error flex gap-4 items-start">
          <AlertTriangle className="text-error shrink-0 mt-1" size={20} />
          <p className="text-primary font-medium">
            30 dakika sonrasında yapılan iptal talepleri kabul edilmemektedir. İade garantisi yoktur.
          </p>
        </div>
      </article>
    </div>
  );
}
