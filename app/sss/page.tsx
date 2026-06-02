import type { Metadata } from "next";
import { FaqAccordion } from "./FaqAccordion";
import { FAQ } from "./faq-data";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular",
  description: "Nuwela Boutique sıkça sorulan sorular ve yanıtları.",
};

export default function SssPage() {
  return (
    <div className="container-narrow py-12 md:py-20">
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.4em] text-muted mb-3">SSS</p>
        <h1 className="font-serif text-4xl md:text-6xl italic">Sık Sorulan Sorular</h1>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      <FaqAccordion />
    </div>
  );
}
