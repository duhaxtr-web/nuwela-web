import { Suspense } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CollectionBanner } from "@/components/home/CollectionBanner";
import { WhyNuwela } from "@/components/home/WhyNuwela";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { SITE } from "@/lib/constants";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phoneIntl,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Yazır Mahallesi Turhanlar Sokak 10/J",
      addressLocality: "Selçuklu",
      addressRegion: "Konya",
      addressCountry: "TR",
    },
    openingHours: "Mo-Su 09:00-19:00",
    sameAs: [SITE.social.instagram, SITE.social.tiktok],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <MarqueeStrip />
      <Suspense fallback={<div className="py-20 text-center text-muted">Yükleniyor…</div>}>
        <FeaturedProducts />
      </Suspense>
      <CollectionBanner />
      <WhyNuwela />
      <NewsletterSection />
    </>
  );
}
