import type { Metadata } from "next";
import { Home, CreditCard, ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "Ödeme Seçenekleri",
  description: "Nuwela Boutique ödeme yöntemleri — Kapıda nakit, kapıda kart, Shopier online ödeme.",
};

const OPTIONS = [
  { icon: Home, title: "Kapıda Nakit Ödeme", desc: "Siparişiniz kapınıza geldiğinde nakit olarak ödeyin." },
  { icon: CreditCard, title: "Kapıda Kart ile Ödeme", desc: "Kapıda kredi veya banka kartı ile güvenle ödeyin." },
  { icon: ShoppingBag, title: "Shopier ile Online Ödeme", desc: "Shopier üzerinden güvenli online ödeme yapın." },
];

export default function OdemePage() {
  return (
    <div className="container-narrow py-12 md:py-20">
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.4em] text-muted mb-3">Ödeme</p>
        <h1 className="font-serif text-4xl md:text-6xl italic">Ödeme Seçenekleri</h1>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {OPTIONS.map((o) => (
          <div key={o.title} className="bg-surface p-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white border border-border mb-5">
              <o.icon size={22} className="text-secondary" />
            </div>
            <h3 className="font-serif text-xl mb-3">{o.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{o.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
