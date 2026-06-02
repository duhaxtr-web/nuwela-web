import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Truck, RefreshCcw, Shield } from "lucide-react";
import { getAllProducts, getProductBySlug } from "@/lib/store";
import { buildShopierUrl } from "@/lib/shopier";
import { formatPrice } from "@/lib/utils";
import { ProductImages } from "@/components/products/ProductImages";
import { VariantSelector } from "@/components/products/VariantSelector";
import { ShopierButton } from "@/components/products/ShopierButton";
import { ProductCard } from "@/components/products/ProductCard";
import { SITE } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "Ürün bulunamadı" };
  return {
    title: product.seo_baslik || product.baslik,
    description: product.seo_meta_aciklama || product.aciklama.slice(0, 160),
    openGraph: {
      title: product.seo_baslik || product.baslik,
      description: product.seo_meta_aciklama || product.aciklama.slice(0, 160),
      images: product.resimler.resim1 ? [product.resimler.resim1] : [],
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product || product.durum !== "aktif") notFound();

  const images = [
    product.resimler.resim1,
    product.resimler.resim2,
    product.resimler.resim3,
    product.resimler.resim4,
    product.resimler.resim5,
  ].filter(Boolean) as string[];

  const shopierUrl = buildShopierUrl(product.shopier_verileri);
  const indirimli = product.indirimli_fiyat && product.indirimli_fiyat < product.fiyat;

  const all = await getAllProducts();
  const similar = all
    .filter((p) => p.durum === "aktif" && p.id !== product.id && p.urun_turu === product.urun_turu)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.baslik,
    description: product.aciklama,
    image: images,
    sku: product.id,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      url: `${SITE.url}/urunler/${product.slug}`,
      priceCurrency: "TRY",
      price: product.indirimli_fiyat ?? product.fiyat,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container-wide py-8 md:py-12">
        <nav className="text-xs uppercase tracking-widest text-muted mb-8">
          <a href="/" className="hover:text-primary">Ana Sayfa</a>
          <span className="mx-2">/</span>
          <a href="/urunler" className="hover:text-primary">Ürünler</a>
          <span className="mx-2">/</span>
          <span className="text-primary">{product.baslik}</span>
        </nav>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-14">
          <div className="lg:col-span-3">
            <ProductImages images={images} alt={product.baslik} />
          </div>

          <div className="lg:col-span-2 lg:sticky lg:top-28 lg:self-start space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-muted mb-3">
                {product.koleksiyonlar?.[0] || "Yeni Sezon"}
              </p>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl italic leading-tight">
                {product.baslik}
              </h1>
              <div className="mt-5 flex items-baseline gap-3">
                {indirimli ? (
                  <>
                    <span className="text-2xl font-semibold text-error">
                      {formatPrice(product.indirimli_fiyat!)}
                    </span>
                    <span className="text-base text-muted line-through">
                      {formatPrice(product.fiyat)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-semibold">{formatPrice(product.fiyat)}</span>
                )}
              </div>
            </div>

            <VariantSelector varyant={product.varyant_secenekleri} />

            <div className="space-y-3">
              <ShopierButton url={shopierUrl} />
            </div>

            <details className="border-t border-border pt-5 group" open>
              <summary className="cursor-pointer list-none flex justify-between items-center text-xs uppercase tracking-widest font-medium">
                Ürün Açıklaması
                <span className="text-muted group-open:rotate-45 transition-transform">+</span>
              </summary>
              <div className="prose prose-sm max-w-none mt-4 text-muted leading-relaxed whitespace-pre-wrap">
                {product.aciklama}
              </div>
            </details>

            <div className="border-t border-border pt-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <Truck size={20} className="mx-auto mb-2 text-secondary" />
                <p className="text-[10px] uppercase tracking-widest text-muted">Hızlı Kargo</p>
              </div>
              <div>
                <RefreshCcw size={20} className="mx-auto mb-2 text-secondary" />
                <p className="text-[10px] uppercase tracking-widest text-muted">5 Gün Değişim</p>
              </div>
              <div>
                <Shield size={20} className="mx-auto mb-2 text-secondary" />
                <p className="text-[10px] uppercase tracking-widest text-muted">Güvenli Ödeme</p>
              </div>
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <section className="mt-24 md:mt-32">
            <h2 className="font-serif text-3xl md:text-4xl italic mb-10">Benzer Ürünler</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
              {similar.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
