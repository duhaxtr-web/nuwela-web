import type { ShopierVerileri } from "@/types/product";

const STORE_URL = process.env.NEXT_PUBLIC_SHOPIER_STORE_URL || process.env.SHOPIER_STORE_URL || "";

export function buildShopierUrl(verileri?: ShopierVerileri): string {
  if (!verileri) return STORE_URL || "#";
  if (verileri.shopier_url) return verileri.shopier_url;
  const magaza = verileri.shopier_magaza_id || STORE_URL;
  if (magaza && verileri.urun_id) {
    const base = magaza.startsWith("http") ? magaza : `https://www.shopier.com/${magaza}`;
    return `${base.replace(/\/$/, "")}/products/${verileri.urun_id}`;
  }
  if (magaza) {
    return magaza.startsWith("http") ? magaza : `https://www.shopier.com/${magaza}`;
  }
  return STORE_URL || "#";
}
