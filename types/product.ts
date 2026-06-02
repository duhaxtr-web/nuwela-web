export type UrunTuru = "gunluk_zarafet" | "ozel_gunler" | "ofis_sikligi";
export type UrunDurum = "aktif" | "pasif" | "taslak";

export interface ProductResimler {
  resim1: string;
  resim2?: string;
  resim3?: string;
  resim4?: string;
  resim5?: string;
}

export interface ProductVaryant {
  beden?: string[];
  renk?: { isim: string; kod: string }[];
  kumas?: string[];
}

export interface ShopierVerileri {
  urun_id?: string;
  shopier_url?: string;
  shopier_magaza_id?: string;
}

export interface Product {
  id: string;
  slug: string;
  baslik: string;
  aciklama: string;
  durum: UrunDurum;
  resimler: ProductResimler;
  fiyat: number;
  indirimli_fiyat?: number;
  para_birimi: "TRY";
  koleksiyonlar: string[];
  etiketler: string[];
  urun_turu: UrunTuru;
  seo_baslik: string;
  seo_meta_aciklama: string;
  varyant_secenekleri: ProductVaryant;
  shopier_verileri: ShopierVerileri;
  olusturulma_tarihi: string;
  guncelleme_tarihi: string;
  sira: number;
}

export interface Collection {
  id: string;
  isim: string;
  slug: string;
  aciklama: string;
  kapak_gorseli: string;
  urun_sayisi: number;
}

export type ProductInput = Omit<Product, "id" | "olusturulma_tarihi" | "guncelleme_tarihi">;
