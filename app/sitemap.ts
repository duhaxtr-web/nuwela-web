import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getAllProducts } from "@/lib/store";
import { KOLEKSIYONLAR } from "@/lib/constants";
import { slugify } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/urunler`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/koleksiyonlar`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/hakkimizda`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/iletisim`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/sss`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/kargo`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/degisim`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/siparis-iptali`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/odeme-secenekleri`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  const koleksiyonRoutes: MetadataRoute.Sitemap = KOLEKSIYONLAR.map((k) => ({
    url: `${base}/koleksiyonlar/${slugify(k)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const products = await getAllProducts();
  const productRoutes: MetadataRoute.Sitemap = products
    .filter((p) => p.durum === "aktif")
    .map((p) => ({
      url: `${base}/urunler/${p.slug}`,
      lastModified: new Date(p.guncelleme_tarihi),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...koleksiyonRoutes, ...productRoutes];
}
