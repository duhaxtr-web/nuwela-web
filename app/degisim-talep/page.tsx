"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageCircle } from "lucide-react";

const schema = z.object({
  adSoyad: z.string().min(2, "Ad soyad en az 2 karakter olmalı"),
  eposta: z.string().email("Geçerli bir e-posta adresi girin"),
  telefon: z.string().min(10, "Geçerli bir telefon numarası girin"),
  siparisNo: z.string().min(1, "Sipariş numarası zorunlu"),
  degistirilecekUrun: z.string().min(2, "Ürün adı ve bedeni girin"),
  istenenUrun: z.string().min(2, "İstenen ürün/beden girin"),
  neden: z.enum(["Beden Uyumsuzluğu", "Renk/Model Değişikliği", "Ürün Hasarlı", "Diğer"]),
  aciklama: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function DegisimTalepPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  function onSubmit(data: FormValues) {
    const mesaj = [
      "🔄 Değişim Talebi",
      "",
      `Ad Soyad: ${data.adSoyad}`,
      `E-posta: ${data.eposta}`,
      `Telefon: ${data.telefon}`,
      `Sipariş No: ${data.siparisNo}`,
      `Değiştirilecek Ürün: ${data.degistirilecekUrun}`,
      `İstenen Ürün: ${data.istenenUrun}`,
      `Neden: ${data.neden}`,
      data.aciklama ? `Açıklama: ${data.aciklama}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/905333217395?text=${encodeURIComponent(mesaj)}`,
      "_blank"
    );
  }

  return (
    <div className="container-narrow py-12 md:py-20">
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-[0.4em] text-muted mb-3">Değişim</p>
        <h1 className="font-serif text-4xl md:text-6xl italic">Değişim Talebi</h1>
        <p className="mt-6 text-muted max-w-xl mx-auto">
          Formu doldurun, göndere tıkladığınızda bilgileriniz WhatsApp üzerinden mağazamıza iletilecektir.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-surface p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest mb-2">Ad Soyad *</label>
            <input
              {...register("adSoyad")}
              className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-secondary"
              placeholder="Adınız ve soyadınız"
            />
            {errors.adSoyad && <p className="mt-1 text-xs text-red-500">{errors.adSoyad.message}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2">E-posta *</label>
            <input
              {...register("eposta")}
              type="email"
              className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-secondary"
              placeholder="ornek@eposta.com"
            />
            {errors.eposta && <p className="mt-1 text-xs text-red-500">{errors.eposta.message}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2">Telefon *</label>
            <input
              {...register("telefon")}
              type="tel"
              className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-secondary"
              placeholder="0533 000 00 00"
            />
            {errors.telefon && <p className="mt-1 text-xs text-red-500">{errors.telefon.message}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2">Sipariş Numarası *</label>
            <input
              {...register("siparisNo")}
              className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-secondary"
              placeholder="Shopier onay e-postanızdaki numara"
            />
            {errors.siparisNo && <p className="mt-1 text-xs text-red-500">{errors.siparisNo.message}</p>}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2">Değiştirilecek Ürün / Beden *</label>
            <input
              {...register("degistirilecekUrun")}
              className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-secondary"
              placeholder="Ör: Siyah Tesettür Elbise — L"
            />
            {errors.degistirilecekUrun && (
              <p className="mt-1 text-xs text-red-500">{errors.degistirilecekUrun.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2">İstenen Ürün / Beden *</label>
            <input
              {...register("istenenUrun")}
              className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-secondary"
              placeholder="Ör: Aynı ürün — XL"
            />
            {errors.istenenUrun && (
              <p className="mt-1 text-xs text-red-500">{errors.istenenUrun.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest mb-2">Değişim Nedeni *</label>
          <select
            {...register("neden")}
            className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-secondary"
          >
            <option value="">Seçiniz</option>
            <option>Beden Uyumsuzluğu</option>
            <option>Renk/Model Değişikliği</option>
            <option>Ürün Hasarlı</option>
            <option>Diğer</option>
          </select>
          {errors.neden && <p className="mt-1 text-xs text-red-500">{errors.neden.message}</p>}
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest mb-2">Ek Açıklama</label>
          <textarea
            {...register("aciklama")}
            rows={4}
            className="w-full border border-border bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-secondary resize-none"
            placeholder="Eklemek istediğiniz bilgiler..."
          />
        </div>

        <p className="text-xs text-muted">
          * Değişim talebiniz teslimattan itibaren <strong>5 gün</strong> içinde yapılabilir. Ürünün kullanılmamış ve orijinal kutusuyla gönderilmesi gerekmektedir.
        </p>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-3 bg-primary text-white py-4 hover:bg-secondary transition-colors text-sm uppercase tracking-[0.3em]"
        >
          <MessageCircle size={18} />
          WhatsApp ile Gönder
        </button>
      </form>
    </div>
  );
}
