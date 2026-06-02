import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getAllProducts } from "@/lib/store";
import { KOLEKSIYONLAR } from "@/lib/constants";
import { slugify } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const now = new Date();
  const staticRoutes = [
    "",
    "/urunler",
    "/koleksiyonlar",
    "/hakkimizda",
    "/iletisim",
    "/sss",
    "/kargo",
    "/degisim",
    "/siparis-iptali",
    "/odeme-secenekleri",
  ].map((r) => ({ url: `${base}${r}`, lastModified: now }));

  const koleksiyonRoutes = KOLEKSIYONLAR.map((k) => ({
    url: `${base}/koleksiyonlar/${slugify(k)}`,
    lastModified: now,
  }));

  const products = await getAllProducts();
  const productRoutes = products
    .filter((p) => p.durum === "aktif")
    .map((p) => ({
      url: `${base}/urunler/${p.slug}`,
      lastModified: new Date(p.guncelleme_tarihi),
    }));

  return [...staticRoutes, ...koleksiyonRoutes, ...productRoutes];
}
