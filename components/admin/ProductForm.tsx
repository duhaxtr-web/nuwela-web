"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Plus, X } from "lucide-react";
import type { Product, ProductInput } from "@/types/product";
import { KOLEKSIYONLAR, BEDENLER, URUN_TURLERI } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import { ImageUploader } from "./ImageUploader";
import { TagsInput } from "./TagsInput";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-border p-6 md:p-8 space-y-5">
      <h2 className="font-serif text-xl italic border-b border-border pb-3">{title}</h2>
      {children}
    </div>
  );
}

const blank: ProductInput = {
  slug: "",
  baslik: "",
  aciklama: "",
  durum: "taslak",
  resimler: { resim1: "" },
  fiyat: 0,
  indirimli_fiyat: undefined,
  para_birimi: "TRY",
  koleksiyonlar: [],
  etiketler: [],
  urun_turu: "gunluk_zarafet",
  seo_baslik: "",
  seo_meta_aciklama: "",
  varyant_secenekleri: { beden: [], renk: [], kumas: [] },
  shopier_verileri: {},
  sira: 0,
};

export function ProductForm({ initial }: { initial?: Product }) {
  const router = useRouter();
  const [form, setForm] = useState<ProductInput | Product>(initial || blank);
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(initial);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }
  function setResim(slot: keyof typeof form.resimler, url: string) {
    setForm((f) => ({ ...f, resimler: { ...f.resimler, [slot]: url || undefined } }));
  }
  function setVaryant<K extends keyof typeof form.varyant_secenekleri>(
    key: K,
    value: (typeof form.varyant_secenekleri)[K],
  ) {
    setForm((f) => ({ ...f, varyant_secenekleri: { ...f.varyant_secenekleri, [key]: value } }));
  }
  function setShopier<K extends keyof typeof form.shopier_verileri>(
    key: K,
    value: (typeof form.shopier_verileri)[K],
  ) {
    setForm((f) => ({ ...f, shopier_verileri: { ...f.shopier_verileri, [key]: value } }));
  }

  function toggleKoleksiyon(k: string) {
    const next = form.koleksiyonlar.includes(k)
      ? form.koleksiyonlar.filter((x) => x !== k)
      : [...form.koleksiyonlar, k];
    set("koleksiyonlar", next);
  }
  function toggleBeden(b: string) {
    const arr = form.varyant_secenekleri.beden || [];
    const next = arr.includes(b) ? arr.filter((x) => x !== b) : [...arr, b];
    setVaryant("beden", next);
  }
  function addRenk(isim: string, kod: string) {
    if (!isim || !kod) return;
    const arr = form.varyant_secenekleri.renk || [];
    if (arr.some((r) => r.isim === isim)) return;
    setVaryant("renk", [...arr, { isim, kod }]);
  }
  function removeRenk(isim: string) {
    setVaryant("renk", (form.varyant_secenekleri.renk || []).filter((r) => r.isim !== isim));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.baslik) { toast.error("Başlık zorunlu"); return; }
    if (!form.resimler.resim1) { toast.error("En az 1 görsel zorunlu"); return; }
    if (form.fiyat <= 0) { toast.error("Fiyat 0'dan büyük olmalı"); return; }

    const payload = { ...form, slug: form.slug || slugify(form.baslik) };
    setSaving(true);
    const res = await fetch(isEdit ? `/api/products/${(form as Product).id}` : "/api/products", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      toast.error(j.error || "Kaydetme başarısız");
      return;
    }
    toast.success(isEdit ? "Ürün güncellendi" : "Ürün eklendi");
    router.push("/admin/urunler");
    router.refresh();
  }

  const [renkIsim, setRenkIsim] = useState("");
  const [renkKod, setRenkKod] = useState("#000000");

  return (
    <form onSubmit={submit} className="space-y-6 max-w-5xl">
      {/* 1. Başlık & 2. Durum */}
      <Section title="Temel Bilgiler">
        <div className="grid md:grid-cols-3 gap-5">
          <div className="md:col-span-2">
            <label className="label-base">Ürün Başlığı *</label>
            <input
              value={form.baslik}
              onChange={(e) => {
                set("baslik", e.target.value);
                if (!isEdit && !form.slug) set("slug", slugify(e.target.value));
              }}
              className="input-base"
              placeholder="Örn: Zarif Tesettür Elbise"
              required
            />
          </div>
          <div>
            <label className="label-base">Durum</label>
            <select
              value={form.durum}
              onChange={(e) => set("durum", e.target.value as any)}
              className="input-base"
            >
              <option value="taslak">Taslak</option>
              <option value="aktif">Aktif</option>
              <option value="pasif">Pasif</option>
            </select>
          </div>
        </div>

        <div>
          <label className="label-base">Slug (URL)</label>
          <input
            value={form.slug}
            onChange={(e) => set("slug", slugify(e.target.value))}
            className="input-base"
            placeholder="otomatik oluşturulur"
          />
        </div>

        {/* 3. Açıklama */}
        <div>
          <label className="label-base">Açıklama *</label>
          <textarea
            value={form.aciklama}
            onChange={(e) => set("aciklama", e.target.value)}
            className="input-base h-32"
            placeholder="Ürün açıklamasını yazın…"
          />
        </div>
      </Section>

      {/* 4-8. Resimler */}
      <Section title="Görseller (max 5)">
        <p className="text-xs text-muted -mt-2">İlk görsel ana görsel olarak kullanılır.</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {(["resim1", "resim2", "resim3", "resim4", "resim5"] as const).map((slot, i) => (
            <ImageUploader
              key={slot}
              label={i === 0 ? "Ana Görsel *" : `Görsel ${i + 1}`}
              value={form.resimler[slot] || ""}
              onChange={(url) => setResim(slot, url)}
            />
          ))}
        </div>
      </Section>

      {/* 9. Fiyat */}
      <Section title="Fiyatlandırma">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="label-base">Fiyat (₺) *</label>
            <input
              type="number"
              min="0"
              step="1"
              value={form.fiyat || ""}
              onChange={(e) => set("fiyat", Number(e.target.value))}
              className="input-base"
              required
            />
          </div>
          <div>
            <label className="label-base">İndirimli Fiyat (₺)</label>
            <input
              type="number"
              min="0"
              step="1"
              value={form.indirimli_fiyat ?? ""}
              onChange={(e) => set("indirimli_fiyat", e.target.value ? Number(e.target.value) : undefined)}
              className="input-base"
            />
          </div>
        </div>
      </Section>

      {/* 10. Koleksiyonlar, 11. Etiketler, 12. Ürün Türü */}
      <Section title="Sınıflandırma">
        <div>
          <label className="label-base">Koleksiyonlar</label>
          <div className="flex flex-wrap gap-2">
            {KOLEKSIYONLAR.map((k) => {
              const sel = form.koleksiyonlar.includes(k);
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => toggleKoleksiyon(k)}
                  className={`px-3 py-2 text-xs uppercase tracking-widest border transition-colors ${
                    sel ? "bg-primary text-white border-primary" : "border-border hover:border-primary"
                  }`}
                >
                  {k}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="label-base">Ürün Türü</label>
          <div className="flex gap-3">
            {URUN_TURLERI.map((t) => (
              <label
                key={t.value}
                className={`flex-1 cursor-pointer border p-4 text-center transition-colors ${
                  form.urun_turu === t.value ? "border-primary bg-primary text-white" : "border-border hover:border-primary"
                }`}
              >
                <input
                  type="radio"
                  name="urun_turu"
                  value={t.value}
                  checked={form.urun_turu === t.value}
                  onChange={() => set("urun_turu", t.value as any)}
                  className="sr-only"
                />
                <span className="text-xs uppercase tracking-widest">{t.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="label-base">Etiketler</label>
          <TagsInput
            value={form.etiketler}
            onChange={(v) => set("etiketler", v)}
            placeholder="yeni, indirim, çok satan — Enter ile ekle"
          />
        </div>

      </Section>

      {/* 13. SEO Başlık, 14. SEO Meta */}
      <Section title="SEO">
        <div>
          <label className="label-base flex justify-between">
            <span>SEO Başlığı</span>
            <span className="text-muted normal-case tracking-normal">{form.seo_baslik.length}/60</span>
          </label>
          <input
            value={form.seo_baslik}
            onChange={(e) => set("seo_baslik", e.target.value.slice(0, 60))}
            className="input-base"
            placeholder="Google'da görünecek başlık"
          />
        </div>
        <div>
          <label className="label-base flex justify-between">
            <span>SEO Meta Açıklama</span>
            <span className="text-muted normal-case tracking-normal">{form.seo_meta_aciklama.length}/160</span>
          </label>
          <textarea
            value={form.seo_meta_aciklama}
            onChange={(e) => set("seo_meta_aciklama", e.target.value.slice(0, 160))}
            className="input-base h-20"
            placeholder="Arama sonuçlarında görünecek açıklama"
          />
        </div>
      </Section>

      {/* 15. Varyant Seçenekleri */}
      <Section title="Varyant Seçenekleri">
        <div>
          <label className="label-base">Bedenler</label>
          <div className="flex flex-wrap gap-2">
            {BEDENLER.map((b) => {
              const sel = (form.varyant_secenekleri.beden || []).includes(b);
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => toggleBeden(b)}
                  className={`min-w-[48px] h-10 px-3 text-xs uppercase tracking-widest border ${
                    sel ? "bg-primary text-white border-primary" : "border-border hover:border-primary"
                  }`}
                >
                  {b}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="label-base">Renkler</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {(form.varyant_secenekleri.renk || []).map((r) => (
              <span key={r.isim} className="inline-flex items-center gap-2 border border-border px-2 py-1 text-xs">
                <span className="w-4 h-4 rounded-full border border-border" style={{ background: r.kod }} />
                {r.isim}
                <button type="button" onClick={() => removeRenk(r.isim)}><X size={12} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={renkIsim}
              onChange={(e) => setRenkIsim(e.target.value)}
              placeholder="Renk adı (Siyah)"
              className="input-base flex-1"
            />
            <input
              type="color"
              value={renkKod}
              onChange={(e) => setRenkKod(e.target.value)}
              className="h-[46px] w-16 border border-border cursor-pointer"
            />
            <button
              type="button"
              onClick={() => { addRenk(renkIsim, renkKod); setRenkIsim(""); }}
              className="btn-outline px-4 py-3"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        <div>
          <label className="label-base">Kumaş Seçenekleri</label>
          <TagsInput
            value={form.varyant_secenekleri.kumas || []}
            onChange={(v) => setVaryant("kumas", v)}
            placeholder="Pamuk, Krep, Şifon — Enter ile ekle"
          />
        </div>
      </Section>

      {/* 16. Shopier */}
      <Section title="Shopier Entegrasyonu">
        <div>
          <label className="label-base">Shopier Ürün URL'si</label>
          <input
            type="url"
            value={form.shopier_verileri.shopier_url || ""}
            onChange={(e) => setShopier("shopier_url", e.target.value)}
            placeholder="https://www.shopier.com/..."
            className="input-base"
          />
          <p className="text-xs text-muted mt-1">"Satın Al" butonu bu URL'ye yönlendirir.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="label-base">Shopier Ürün ID</label>
            <input
              value={form.shopier_verileri.urun_id || ""}
              onChange={(e) => setShopier("urun_id", e.target.value)}
              className="input-base"
            />
          </div>
          <div>
            <label className="label-base">Shopier Mağaza ID</label>
            <input
              value={form.shopier_verileri.shopier_magaza_id || ""}
              onChange={(e) => setShopier("shopier_magaza_id", e.target.value)}
              className="input-base"
            />
          </div>
        </div>
      </Section>

      <Section title="Sıralama">
        <div>
          <label className="label-base">Sıralama Numarası</label>
          <input
            type="number"
            value={form.sira}
            onChange={(e) => set("sira", Number(e.target.value))}
            className="input-base max-w-[200px]"
          />
          <p className="text-xs text-muted mt-1">Küçük sayılar üstte görünür.</p>
        </div>
      </Section>

      <div className="flex gap-3 sticky bottom-0 bg-surface py-4 -mx-6 px-6 border-t border-border">
        <button type="submit" disabled={saving} className="btn-primary flex-1 disabled:opacity-50">
          {saving ? "Kaydediliyor…" : isEdit ? "Güncelle" : "Ürünü Oluştur"}
        </button>
        <button type="button" onClick={() => router.push("/admin/urunler")} className="btn-outline">
          İptal
        </button>
      </div>
    </form>
  );
}
