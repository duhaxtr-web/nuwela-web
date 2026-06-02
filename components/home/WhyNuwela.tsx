import { Sparkles, Truck, RefreshCcw } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const items = [
  {
    icon: Sparkles,
    title: "Özenle Seçilmiş Kalite",
    desc: "Her parça, yüksek kaliteli kumaşlar ve zarif kesimlerle özenle seçildi.",
  },
  {
    icon: Truck,
    title: "Hızlı Teslimat",
    desc: "Tüm Türkiye'ye hızlı ve güvenli kargo seçeneği.",
  },
  {
    icon: RefreshCcw,
    title: "Kolay Değişim",
    desc: "Teslimattan sonra 5 gün içinde sorunsuz değişim imkânı.",
  },
];

export function WhyNuwela() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="container-wide">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-muted mb-4">Neden Nuwela?</p>
          <h2 className="font-serif text-4xl md:text-5xl italic">Sizin için değer yaratıyoruz</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {items.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.1} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-border bg-white mb-5">
                <item.icon size={22} className="text-secondary" />
              </div>
              <h3 className="font-serif text-2xl mb-3">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed max-w-xs mx-auto">{item.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
