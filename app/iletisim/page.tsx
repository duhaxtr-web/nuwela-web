import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react";
import { SITE } from "@/lib/constants";


export const metadata: Metadata = {
  title: "İletişim",
  description: "Nuwela Boutique iletişim bilgileri ve adres. Konya/Selçuklu mağazamızı ziyaret edin.",
};

export default function IletisimPage() {
  const wpMessage = encodeURIComponent("Merhaba, Nuwela Boutique hakkında bilgi almak istiyorum.");
  return (
    <div className="container-wide py-12 md:py-20">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.4em] text-muted mb-3">Bize Ulaşın</p>
        <h1 className="font-serif text-4xl md:text-6xl italic mb-6">İletişim</h1>
        <p className="text-muted">
          Sorularınız, endişeleriniz veya geri bildirimleriniz mi var? Sizin için buradayız!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="bg-surface p-8 md:p-12 space-y-8">
          <h2 className="font-serif text-3xl italic">Mağaza Bilgileri</h2>
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <MapPin size={20} className="text-secondary mt-1 shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted mb-1">Adres</p>
                <p>{SITE.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock size={20} className="text-secondary mt-1 shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted mb-1">Çalışma Saatleri</p>
                <p>{SITE.hours}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={20} className="text-secondary mt-1 shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted mb-1">Telefon</p>
                <a href={`tel:${SITE.phoneIntl}`} className="hover:text-secondary">{SITE.phone}</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail size={20} className="text-secondary mt-1 shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted mb-1">E-posta</p>
                <a href={`mailto:${SITE.email}`} className="hover:text-secondary">{SITE.email}</a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <p className="text-xs uppercase tracking-widest text-muted mb-4">Sosyal Medya</p>
            <div className="flex items-center gap-3">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-border px-4 py-2 hover:border-primary transition-colors text-sm"
              >
                <Instagram size={16} /> @nuwelaboutique
              </a>
              <a
                href={SITE.social.tiktok}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-border px-4 py-2 hover:border-primary transition-colors text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                </svg>
                TikTok
              </a>
              <a
                href={`https://wa.me/905333217395?text=${wpMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-border px-4 py-2 hover:border-primary transition-colors text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="relative min-h-[480px] bg-surface overflow-hidden">
          <iframe
            title="Nuwela Boutique Konum"
            src="https://maps.google.com/maps?q=Yaz%C4%B1r%20Mahallesi%20Turhanlar%20Sokak%2010%20Sel%C3%A7uklu%20Konya&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <a
        href={`https://wa.me/905333217395?text=${wpMessage}`}
        target="_blank"
        rel="noreferrer"
        className="mt-12 block bg-primary text-white text-center py-6 hover:bg-secondary transition-colors"
      >
        <span className="text-xs uppercase tracking-[0.4em]">WhatsApp ile Hemen Yazın</span>
      </a>
    </div>
  );
}
