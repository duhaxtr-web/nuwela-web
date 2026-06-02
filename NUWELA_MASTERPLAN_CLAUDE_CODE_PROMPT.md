# 🛍️ NUWELA BOUTİQUE — CLAUDE CODE MASTER PROMPT & MASTERPLAN

> **Bu dosya Claude Code'a verilecek tam sistem promptudur.**
> Tüm geliştirme sürecini, mimariyi, sayfa içeriklerini ve yayına alma adımlarını kapsar.

---

## 📋 PROJE ÖZETİ

**Marka:** Nuwela Boutique  
**Sektör:** Kadın Giyim (Tesettür & Açık Giyim)  
**Hedef:** Minna Framer şablonuna (https://minna.framer.website) benzer, ancak özgün tasarımlı, animasyonlu, profesyonel bir e-ticaret web sitesi + yönetim paneli  
**Deployment:** GitHub Branch → Vercel  
**Tech Stack:** Next.js 14 (App Router) + Tailwind CSS + Framer Motion + Shopier Entegrasyonu + fal.ai (nano-banana-2 görsel üretimi) + LocalStorage/JSON tabanlı ürün yönetimi (başlangıç için)

---

## 🏢 İŞLETME BİLGİLERİ

| Alan | Değer |
|---|---|
| Marka Adı | Nuwela Boutique |
| Adres | Yazır Mahallesi Turhanlar Sokak 10/J KONYA/SELÇUKLU |
| Çalışma Saatleri | 09:00 – 19:00 |
| E-posta | nuwelaboutique@gmail.com |
| Telefon / WhatsApp | 0533 321 73 95 |
| Instagram | https://www.instagram.com/nuwelaboutique |
| TikTok | https://www.tiktok.com/@nuwela.boutique |
| Shopier | Shopier ürün sayfasına yönlendirme (deep link) |

---

## 🗂️ PROJE KLASÖR YAPISI

```
nuwela-boutique/
├── app/
│   ├── layout.tsx                  # Root layout, font, metadata
│   ├── page.tsx                    # Ana sayfa (Homepage)
│   ├── urunler/
│   │   ├── page.tsx                # Ürün listeleme
│   │   └── [slug]/page.tsx        # Ürün detay
│   ├── koleksiyonlar/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── hakkimizda/page.tsx
│   ├── iletisim/page.tsx
│   ├── sss/page.tsx               # Sık Sorulan Sorular
│   ├── kargo/page.tsx
│   ├── degisim/page.tsx
│   ├── siparis-iptali/page.tsx
│   ├── odeme-secenekleri/page.tsx
│   └── admin/
│       ├── page.tsx               # Admin giriş
│       ├── dashboard/page.tsx     # Genel panel
│       ├── urunler/
│       │   ├── page.tsx           # Ürün listesi
│       │   ├── yeni/page.tsx      # Yeni ürün ekle
│       │   └── [id]/page.tsx     # Ürün düzenle
│       └── ayarlar/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   └── AnnouncementBar.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── CollectionBanner.tsx
│   │   ├── MarqueeStrip.tsx       # "YENİ SEZON * %20 İNDİRİM" kayan yazı
│   │   ├── NewsletterSection.tsx
│   │   └── InstagramFeed.tsx
│   ├── products/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── ProductImages.tsx
│   │   ├── VariantSelector.tsx
│   │   └── ShopierButton.tsx
│   ├── ui/
│   │   ├── AnimatedButton.tsx
│   │   ├── PageTransition.tsx
│   │   ├── ScrollReveal.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── Badge.tsx
│   └── admin/
│       ├── AdminSidebar.tsx
│       ├── ProductForm.tsx
│       ├── ImageUploader.tsx
│       └── StatsCard.tsx
├── lib/
│   ├── products.ts                # Ürün CRUD işlemleri (JSON/localStorage)
│   ├── shopier.ts                 # Shopier URL builder
│   ├── fal-ai.ts                  # fal.ai nano-banana-2 entegrasyonu
│   └── constants.ts
├── types/
│   └── product.ts
├── public/
│   ├── fonts/
│   └── images/
├── styles/
│   └── globals.css
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## 🎨 TASARIM SİSTEMİ

### Renk Paleti
```css
/* globals.css içine ekle */
:root {
  --color-primary: #1a1a1a;        /* Koyu siyah - ana metin */
  --color-secondary: #8B7355;      /* Sıcak kahve - vurgu */
  --color-accent: #C4A882;         /* Krem altın - hover/detay */
  --color-background: #FAFAF8;     /* Kırık beyaz - arka plan */
  --color-surface: #F5F2EE;        /* Açık krem - kart arka planı */
  --color-border: #E8E2DA;         /* Açık bej - kenarlık */
  --color-text-muted: #9E9189;     /* Soluk kahve - ikincil metin */
  --color-success: #4A7C59;
  --color-error: #C0392B;
}
```

### Tipografi
```
- Başlık (H1-H2): "Cormorant Garamond" - serif, zarif, moda dünyasına uygun
- Alt başlık (H3-H4): "Inter" - sans-serif, temiz
- Gövde metni: "Inter" - 400/500 weight
- Logo / Marka adı: "Cormorant Garamond" italic bold
```

### Animasyon Standartları (Framer Motion)
```typescript
// Sayfa geçişleri
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Kart hover efekti
export const cardVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }
};

// Scroll reveal
export const revealVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// Stagger children
export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};
```

---

## 📦 VERİ MODELİ — ÜRÜN TİPİ

```typescript
// types/product.ts
export interface Product {
  id: string;                        // UUID
  slug: string;                      // URL-friendly isim
  
  // Temel Bilgiler
  baslik: string;                    // Ürün başlığı
  aciklama: string;                  // Detaylı açıklama (HTML/Markdown)
  durum: "aktif" | "pasif" | "taslak";
  
  // Görseller (max 5)
  resimler: {
    resim1: string;                  // URL veya base64
    resim2?: string;
    resim3?: string;
    resim4?: string;
    resim5?: string;
  };
  
  // Fiyatlandırma
  fiyat: number;
  indirimli_fiyat?: number;
  para_birimi: "TRY";
  
  // Sınıflandırma
  koleksiyonlar: string[];           // ["Tesettür", "Yazlık Koleksiyon"]
  etiketler: string[];               // ["yeni", "indirim", "çok satan"]
  urun_turu: "tesettur" | "acik_giyim" | "aksesuar";
  
  // SEO
  seo_baslik: string;
  seo_meta_aciklama: string;
  
  // Varyantlar
  varyant_secenekleri: {
    beden?: string[];                // ["XS", "S", "M", "L", "XL", "XXL"]
    renk?: string[];                 // ["Siyah", "Beyaz", "Lacivert"]
    kumas?: string[];
  };
  
  // Shopier Entegrasyonu
  shopier_verileri: {
    urun_id?: string;                // Shopier'daki ürün ID
    shopier_url?: string;            // Doğrudan Shopier ürün URL'si
    shopier_magaza_id?: string;      // Shopier mağaza ID
  };
  
  // Meta
  olusturulma_tarihi: string;
  guncelleme_tarihi: string;
  sira: number;                      // Sıralama
}

export interface Collection {
  id: string;
  isim: string;
  slug: string;
  aciklama: string;
  kapak_gorseli: string;
  urun_sayisi: number;
}
```

---

## 🌐 SAYFALAR VE İÇERİKLER

### 1. ANA SAYFA (/)

**Bölümler (yukarıdan aşağıya):**

1. **Duyuru Çubuğu:** "ÜCRETSİZ KARGO • YENİ KOLEKSİYON GELDİ • KAPIДА ÖDEME"
2. **Navbar:** Logo (NUWELA), Ürünlerimiz, Koleksiyonlar, Hakkımızda, [Menü İkonu]
3. **Hero Section:** Tam ekran video/görsel, büyük başlık "Zarafetin Yeni Adresi", CTA butonu
4. **Kayan Yazı Şeridi:** "YENİ SEZON ✦ KOLEKSİYON 2025 ✦ TESETTÜR ✦ AÇIK GİYİM ✦"
5. **Öne Çıkan Ürünler:** 4'lü grid, "Tümünü Gör" butonu
6. **Koleksiyon Banner'ı (2 bölüm):**
   - Sol: Tesettür Koleksiyonu
   - Sağ: Açık Giyim Koleksiyonu
7. **"Neden Nuwela?" Bölümü:** Kalite, Ücretsiz Kargo, Kolay Değişim
8. **Newsletter:** E-posta kaydı
9. **Footer**

---

### 2. ÜRÜNLER SAYFASI (/urunler)

- Filtreler: Ürün Türü, Koleksiyon, Beden, Fiyat Aralığı, Sıralama
- Animasyonlu ProductCard grid (hover: görsel zoom + overlay)
- Sayfalama (pagination)
- "Yeni Sezon" badge'i

---

### 3. ÜRÜN DETAY SAYFASI (/urunler/[slug])

- Sağ-sol layout: Sol 3/5 görsel galerisi, Sağ 2/5 bilgi
- Görsel galerisi: Thumbnail'lar + büyük görsel, zoom özelliği
- Beden seçici (animasyonlu)
- Renk seçici
- **Shopier'da Satın Al** butonu → Shopier URL'ye yönlendir
- Ürün açıklaması (accordion ile)
- Benzer ürünler bölümü

---

### 4. HAKKIMIZDA (/hakkimizda)

**İçerik:**
> Günlük yaşamınızı geliştirmek için tasarlanmış modern, şık ve yüksek kaliteli ürünler için güvenilir markanız Nuwela'ya hoş geldiniz. Nuwela olarak yenilikçiliği, rahatlığı ve olağanüstü değeri birleştiren kusursuz bir alışveriş deneyimi yaratmaya inanıyoruz. Yolculuğumuz basit bir vizyonla başladı: müşterilere neşe, güven ve işlevsellik uyandıran seçilmiş ürün seçenekleri sunmak.
>
> Özenle seçtiğimiz koleksiyonlarımızdan sürdürülebilirliğe olan bağlılığımıza kadar Nuwela, bir e-ticaret platformundan daha fazlası olarak öne çıkıyor. Müşterilerimizin ihtiyaçlarını anlayarak ve yaşam tarzlarına kusursuz bir şekilde uyan ürünler sunarak onlarla daha derin bir düzeyde bağlantı kurmaya çalışıyoruz.
>
> Ekibimiz, müşterilerin kendilerini değerli ve desteklenmiş hissettikleri bir topluluk oluşturma konusunda tutkuludur. Kullanıcı dostu web sitemiz, olağanüstü müşteri hizmetlerimiz ve güvenli alışveriş ortamımız aracılığıyla Nuwela, her etkileşimi olumlu ve unutulmaz kılmayı amaçlamaktadır.
>
> Nuwela'yı yolculuğunuzun bir parçası haline getirdiğiniz için teşekkür ederiz.

**Sayfada görseller:** fal.ai ile üretilecek — şık kadın giyim mağaza interioru, giyinik mankenler

---

### 5. İLETİŞİM (/iletisim)

**İçerik:**
> Sorularınız, Endişeleriniz veya Geri Bildirimleriniz mi var? Sizin için buradayız!

**Bilgiler:**
- **Adres:** Yazır Mahallesi Turhanlar Sokak 10/J KONYA/SELÇUKLU
- **Saat:** 09:00 – 19:00
- **E-posta:** nuwelaboutique@gmail.com
- **Telefon:** 0533 321 73 95
- **WhatsApp:** +90 533 321 73 95
- **Instagram:** @nuwelaboutique
- **TikTok:** @nuwela.boutique

**Sayfada:** Google Maps embed, iletişim formu (WhatsApp'a yönlendiren)

---

### 6. SIK SORULAN SORULAR (/sss)

**SSS Listesi (Accordion bileşeni):**

1. **Bu platformda ne tür ürünler satın alabilirim?**
   > Platformumuz giyim ürünleri içeren geniş bir ürün yelpazesi sunmaktadır. İster modaya uygun modern parçalar, ister günlük zamansız parçalar arıyor olun, ihtiyacınız olan her şeyi tek bir yerde bulacaksınız.

2. **Alışverişe başlamak için nasıl hesap oluşturabilirim?**
   > Hesap oluşturmak kolaydır! Ana sayfamızın sağ üst köşesindeki "Kayıt Ol" düğmesine tıklamanız, bilgilerinizi doldurmanız ve e-posta adresinizi doğrulamanız yeterlidir.

3. **Hangi ödeme yöntemleri kabul edilir?**
   > Kapıda nakit ödeme, kapıda kart ile ödeme ve Shopier üzerinden online ödeme seçeneklerimiz mevcuttur.

4. **Siparişimi nasıl takip edebilirim?**
   > Siparişinizi verdikten sonra izleme bağlantısı içeren bir onay e-postası alacaksınız.

5. **Değişim politikanız nedir?**
   > Ürünleri teslimattan sonraki 5 gün içinde, kullanılmamış ve orijinal durumunda olmaları koşuluyla değişim yapmanıza olanak tanıyan sorunsuz bir değişim politikamız vardır.

6. **İndirim mi sunuyorsunuz?**
   > Evet, kayıtlı kullanıcılar için düzenli olarak indirimler, sezonluk satışlar ve özel fırsatlar sunuyoruz.

7. **Ödeme detaylarım güvenli mi?**
   > Kesinlikle. Kişisel ve finansal bilgilerinizi korumak için endüstri standardı şifreleme ve güvenli ödeme ağ geçitlerini kullanıyoruz.

8. **Siparişimle ilgili sorun yaşarsam ne yapmalıyım?**
   > Müşteri destek ekibimiz yardım etmek için burada. Bizimle telefon yoluyla iletişime geçebilirsiniz, biz de konuyu derhal çözeceğiz.

---

### 7. KARGO (/kargo)

**İçerik:**
> Nuwela Siparişimi İptal Edebilir veya Değiştirebilir miyim?
>
> Bir siparişte değişiklik yapamazsınız, ancak sipariş oluşturduktan sonraki 30 dakika içinde iptal edebilirsiniz.
>
> **Bir siparişi iptal etmek için:**
> - Nuwela Üyesiyseniz siparişinizi açmak için oturum açın.
> - İptal etmek istediğiniz sipariş için "Görüntüle veya Yönet"e tıklayın.
> - "Siparişi İptal Et" düğmesine tıklayın ve istemleri takip edin.
>
> ⚠️ **İade Garantisi Yoktur.**

---

### 8. DEĞİŞİM (/degisim)

**İçerik:**
> Nuwela'nın İade Politikası Nedir?
>
> Nuwela'da iade mevcut değildir. Değişim mevcuttur.
>
> **Bilmeniz gerekenler:**
> - Çevrimiçi sipariş teslimatı veya Nuwela mağazasından satın alımdan sonraki **5 gün** içinde değişim sağlayabilirsiniz.
> - Değişim için satın alma belgesi ve ürün eksiksiz, kullanılmamış gönderilmesi gerekmektedir.

---

### 9. SİPARİŞ İPTALİ (/siparis-iptali)

**İçerik:**
> **Siparişimi İptal Etmek İstiyorum**
>
> Siparişi iptal etmek için:
> 1. Nuwela hesabınıza giriş yapın.
> 2. İptal etmek istediğiniz sipariş için "Görüntüle veya Yönet"e tıklayın.
> 3. "Siparişi İptal Et" düğmesine tıklayın.

---

### 10. ÖDEME SEÇENEKLERİ (/odeme-secenekleri)

**İçerik:**
- 🏠 **Kapıda Nakit Ödeme**
- 💳 **Kapıda Kart ile Ödeme**
- 🛒 **Shopier ile Online Ödeme**

---

## 🛒 SHOPİER ENTEGRASYONU

```typescript
// lib/shopier.ts

export interface ShopierConfig {
  magazaId: string;
  urunId?: string;
  dogrudan_url?: string;
}

/**
 * Shopier ürün satın alma URL'si oluşturur
 * Eğer doğrudan URL varsa onu kullanır,
 * yoksa mağaza ID + ürün ID ile URL oluşturur
 */
export function buildShopierUrl(config: ShopierConfig): string {
  if (config.dogrudan_url) {
    return config.dogrudan_url;
  }
  
  if (config.magazaId && config.urunId) {
    return `https://www.shopier.com/${config.magazaId}/products/${config.urunId}`;
  }
  
  // Fallback: mağaza ana sayfası
  return `https://www.shopier.com/${config.magazaId}`;
}

/**
 * Kullanım:
 * <ShopierButton url={buildShopierUrl(product.shopier_verileri)} />
 * → Yeni sekmede Shopier'a yönlendirir
 */
```

```tsx
// components/products/ShopierButton.tsx
"use client";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export function ShopierButton({ url, disabled }: { url: string; disabled?: boolean }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        w-full flex items-center justify-center gap-3 
        bg-[#1a1a1a] text-white py-4 px-8 
        text-sm font-medium tracking-widest uppercase
        transition-colors hover:bg-[#8B7355]
        ${disabled ? "opacity-50 pointer-events-none" : ""}
      `}
    >
      <ShoppingBag size={18} />
      Shopier'da Satın Al
    </motion.a>
  );
}
```

---

## 🖼️ FAL.AI GÖRSEL ÜRETME ENTEGRASYonu

```typescript
// lib/fal-ai.ts
// Model: fal-ai/nano-banana-2 (veya mevcut en güncel model)

const FAL_API_KEY = process.env.FAL_API_KEY!;

interface FalImageRequest {
  prompt: string;
  negative_prompt?: string;
  width?: number;
  height?: number;
  num_images?: number;
}

export async function generateImage(request: FalImageRequest): Promise<string[]> {
  const response = await fetch("https://fal.run/fal-ai/nano-banana-2", {
    method: "POST",
    headers: {
      "Authorization": `Key ${FAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: request.prompt,
      negative_prompt: request.negative_prompt || "blurry, low quality, watermark, text, logo, brand name",
      image_size: { width: request.width || 1024, height: request.height || 1024 },
      num_images: request.num_images || 1,
    }),
  });
  
  const data = await response.json();
  return data.images.map((img: any) => img.url);
}

// SAYFALAR İÇİN PROMPT ŞEMALARı:

export const IMAGE_PROMPTS = {
  hero: "Elegant Turkish woman in modest fashion boutique, soft natural lighting, luxury store interior, warm beige tones, editorial photography style, high fashion",
  
  tesettur: "Beautiful woman wearing elegant hijab and modest fashion clothing, soft draped fabrics, warm studio lighting, luxury boutique setting, editorial style, no brand logos",
  
  acik_giyim: "Stylish Turkish woman in contemporary fashion outfit, natural daylight, clean minimal background, editorial photography, high quality fabric details, no brand logos",
  
  magaza_ic: "Modern luxury women's boutique interior, warm beige and cream tones, elegant clothing racks, soft lighting, marble floor, editorial style",
  
  koleksiyon_banner: "Flat lay of elegant women's clothing collection, soft cream and earth tones, minimal styling, overhead shot, luxury fashion editorial",
  
  hakkimizda: "Two elegant women in a boutique, smiling, trying on clothes, warm natural light, cozy luxury atmosphere, no brand logos or text",
};
```

### Görsel Üretim Kuralları:
1. Her sayfada en az 1 fal.ai ile üretilmiş görsel kullanılmalı
2. Hiçbir görselde başka marka ismi/logosu olmamalı
3. Tesettür görselleri için her zaman kapalı/örtülü giyim
4. Renk paleti ile uyumlu (krem, bej, sıcak kahve tonları)
5. `negative_prompt` her zaman marka/logo içermemeli

---

## 🔐 YÖNETİM PANELİ (/admin)

### Giriş Sayfası (/admin)
```
Kullanıcı adı: admin
Şifre: .env.local içinde ADMIN_PASSWORD olarak saklanır
Session: localStorage token ile basit doğrulama
```

### Dashboard (/admin/dashboard)
- Toplam ürün sayısı
- Aktif/Pasif ürün sayısı
- Koleksiyon sayısı
- Son eklenen 5 ürün

### Ürün Formu — Tüm Alanlar (/admin/urunler/yeni veya /[id])

```typescript
// Formda bulunması GEREKEN tüm alanlar:

const ProductFormFields = {
  // 1. BAŞLIK
  baslik: {
    type: "text",
    label: "Ürün Başlığı",
    required: true,
    placeholder: "Örn: Zarif Tesettür Elbise"
  },
  
  // 2. DURUM
  durum: {
    type: "select",
    label: "Durum",
    options: ["aktif", "pasif", "taslak"],
    required: true
  },
  
  // 3. AÇIKLAMA
  aciklama: {
    type: "richtext",        // Quill.js veya basit textarea
    label: "Ürün Açıklaması",
    required: true
  },
  
  // 4-8. RESİMLER (1'den 5'e)
  resimler: {
    type: "image-upload",
    label: "Ürün Görselleri",
    fields: ["Resim 1 (Ana)*", "Resim 2", "Resim 3", "Resim 4", "Resim 5"],
    maxCount: 5,
    note: "İlk resim ana görsel olarak kullanılır"
  },
  
  // 9. FİYAT
  fiyat: {
    type: "number",
    label: "Fiyat (₺)",
    required: true
  },
  indirimli_fiyat: {
    type: "number",
    label: "İndirimli Fiyat (₺) — Opsiyonel"
  },
  
  // 10. KOLEKSİYONLAR
  koleksiyonlar: {
    type: "multi-select",
    label: "Koleksiyonlar",
    options: ["Tesettür", "Açık Giyim", "Yazlık", "Kışlık", "Abiye", "Günlük", "İş Kıyafetleri"]
  },
  
  // 11. ETİKETLER
  etiketler: {
    type: "tags-input",
    label: "Etiketler",
    placeholder: "yeni, indirim, çok satan — Enter ile ekle"
  },
  
  // 12. ÜRÜN TÜRÜ
  urun_turu: {
    type: "radio",
    label: "Ürün Türü",
    options: [
      { value: "tesettur", label: "Tesettür" },
      { value: "acik_giyim", label: "Açık Giyim" },
      { value: "aksesuar", label: "Aksesuar" }
    ]
  },
  
  // 13. SEO BAŞLIĞI
  seo_baslik: {
    type: "text",
    label: "SEO Başlığı",
    maxLength: 60,
    hint: "Google'da görünecek başlık (max 60 karakter)"
  },
  
  // 14. SEO META AÇIKLAMASI
  seo_meta_aciklama: {
    type: "textarea",
    label: "SEO Meta Açıklaması",
    maxLength: 160,
    hint: "Google arama sonuçlarında görünecek açıklama (max 160 karakter)"
  },
  
  // 15. VARYANT SEÇENEKLERİ
  varyant_secenekleri: {
    type: "variant-builder",
    label: "Varyant Seçenekleri",
    subFields: {
      beden: {
        label: "Bedenler",
        options: ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "Standart", "36", "38", "40", "42", "44", "46"]
      },
      renk: {
        label: "Renkler",
        type: "color-picker-with-name"   // Renk ismi + renk kodu
      },
      kumas: {
        label: "Kumaş Seçenekleri",
        type: "tags-input"
      }
    }
  },
  
  // 16. SHOPİER VERİLERİ
  shopier_verileri: {
    type: "shopier-section",
    label: "Shopier Entegrasyonu",
    subFields: {
      shopier_url: {
        type: "url",
        label: "Shopier Ürün URL'si",
        placeholder: "https://www.shopier.com/...",
        hint: "Shopier'daki ürün sayfasının tam URL'si"
      },
      urun_id: {
        type: "text",
        label: "Shopier Ürün ID (Opsiyonel)",
      },
      magaza_id: {
        type: "text",
        label: "Shopier Mağaza ID (Opsiyonel)"
      }
    }
  }
};
```

### Admin UI Özellikleri
- **Sidebar navigasyon:** Dashboard, Ürünler, Koleksiyonlar, Ayarlar, Çıkış
- **Ürün listesi:** Arama, filtrele, sırala, toplu silme
- **Drag & drop** görsel sıralama
- **Otomatik slug üretimi** başlıktan
- **Karakter sayacı** SEO alanları için
- **Önizleme butonu:** Ürünü public sayfada nasıl görüneceğini göster

---

## ⚙️ ORTAM DEĞİŞKENLERİ (.env.local)

```bash
# fal.ai
FAL_API_KEY=your_fal_api_key_here

# Admin Panel
ADMIN_PASSWORD=nuwela2025admin
ADMIN_USERNAME=admin

# Shopier (opsiyonel — her üründe ayrı URL girilebilir)
SHOPIER_STORE_ID=your_shopier_store_id

# Next.js
NEXT_PUBLIC_SITE_URL=https://nuwelaboutique.com
NEXT_PUBLIC_SITE_NAME=Nuwela Boutique
```

---

## 📦 BAĞIMLILIKLAR (package.json)

```json
{
  "dependencies": {
    "next": "14.2.x",
    "react": "^18.3.x",
    "react-dom": "^18.3.x",
    "framer-motion": "^11.x",
    "tailwindcss": "^3.4.x",
    "lucide-react": "^0.400.x",
    "@headlessui/react": "^2.x",
    "clsx": "^2.x",
    "uuid": "^10.x",
    "react-hook-form": "^7.x",
    "zod": "^3.x",
    "@hookform/resolvers": "^3.x",
    "react-hot-toast": "^2.x",
    "react-image-gallery": "^1.x",
    "embla-carousel-react": "^8.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "@types/react": "^18.x",
    "@types/node": "^20.x",
    "autoprefixer": "^10.x",
    "postcss": "^8.x"
  }
}
```

---

## 🧭 NAVİGASYON YAPISI

### Navbar (Desktop)
```
NUWELA  [Ürünlerimiz] [Koleksiyonlar] [Hakkımızda]  [🔍] [☰]
```

### Hamburger Menü (üç nokta / ☰) açıldığında:
```
├── Ürünlerimiz
│   ├── Tesettür Giyim
│   └── Açık Giyim
├── Koleksiyonlar
├── Hakkımızda
├── ─────────────────
├── Sık Sorulan Sorular
├── Kargo Bilgileri
├── Değişim Politikası
├── Sipariş İptali
├── Ödeme Seçenekleri
├── ─────────────────
└── İletişim
```

### Footer
```
[NUWELA]
Zarafetin Yeni Adresi

Hızlı Linkler    |  Politikalar       |  İletişim
Ürünlerimiz      |  Kargo             |  📍 Konya/Selçuklu
Koleksiyonlar    |  Değişim           |  📞 0533 321 73 95
Hakkımızda       |  Sipariş İptali    |  ✉️ nuwelaboutique@gmail.com
İletişim         |  Ödeme Seçenekleri |
SSS              |                    |  [Instagram] [TikTok] [WhatsApp]

© 2025 Nuwela Boutique. Tüm hakları saklıdır.
```

---

## 🚀 MASTERPLAN — YAYINA ALMA SÜRECİ

### AŞAMA 1: Proje Kurulumu (Gün 1)
```bash
# 1. Next.js projesi oluştur
npx create-next-app@latest nuwela-boutique \
  --typescript --tailwind --eslint --app --src-dir=false

# 2. Bağımlılıkları yükle
npm install framer-motion lucide-react @headlessui/react \
  clsx uuid react-hook-form zod @hookform/resolvers \
  react-hot-toast embla-carousel-react

# 3. Font kurulumu (Google Fonts — Cormorant Garamond + Inter)
# app/layout.tsx içinde next/font/google ile ekle

# 4. Renk değişkenleri ve global CSS
# 5. Tailwind config — custom colors, fonts
```

### AŞAMA 2: Temel Bileşenler (Gün 1-2)
- [ ] Navbar + MobileMenu
- [ ] Footer
- [ ] AnnouncementBar
- [ ] PageTransition (Framer Motion)
- [ ] ScrollReveal wrapper
- [ ] AnimatedButton

### AŞAMA 3: Ana Sayfa (Gün 2)
- [ ] HeroSection (video/görsel + overlay metin)
- [ ] MarqueeStrip
- [ ] FeaturedProducts grid
- [ ] CollectionBanner (2 kolum)
- [ ] NewsletterSection

### AŞAMA 4: Ürün Sayfaları (Gün 3)
- [ ] ProductCard bileşeni
- [ ] /urunler listing page + filtreler
- [ ] /urunler/[slug] detay sayfası
- [ ] ShopierButton entegrasyonu
- [ ] VariantSelector

### AŞAMA 5: Statik Sayfalar (Gün 3)
- [ ] /hakkimizda
- [ ] /iletisim (harita + form)
- [ ] /sss (accordion)
- [ ] /kargo
- [ ] /degisim
- [ ] /siparis-iptali
- [ ] /odeme-secenekleri

### AŞAMA 6: fal.ai Görsel Üretimi (Gün 4)
- [ ] lib/fal-ai.ts entegrasyonu
- [ ] Her sayfa için uygun görseller üret
- [ ] Hero görseli
- [ ] Koleksiyon banner görselleri
- [ ] Hakkımızda görselleri
- [ ] Placeholder ürün görselleri

### AŞAMA 7: Admin Paneli (Gün 4-5)
- [ ] Admin giriş sayfası
- [ ] Dashboard istatistikleri
- [ ] Ürün CRUD işlemleri
- [ ] ProductForm — tüm 16 alan
- [ ] Görsel yükleme (base64 → localStorage)
- [ ] Shopier URL doğrulama

### AŞAMA 8: Test & Optimizasyon (Gün 5)
- [ ] Mobile responsive test
- [ ] Lighthouse performans testi
- [ ] SEO meta tagları
- [ ] Open Graph görselleri
- [ ] Animasyon performans ayarları (will-change, GPU)

### AŞAMA 9: GitHub & Vercel Deploy (Gün 6)
```bash
# 1. Git init ve branch oluştur (kullanıcı branch adı verecek)
git init
git checkout -b [KULLANICI_BRANCH_ADI]
git add .
git commit -m "feat: Nuwela Boutique ilk kurulum"

# 2. Remote ekle
git remote add origin [REPO_URL]
git push -u origin [BRANCH_ADI]

# 3. Vercel deploy
# vercel.com → Import Project → GitHub repo → Branch seç
# Environment Variables'ı Vercel dashboard'dan ekle
# FAL_API_KEY, ADMIN_PASSWORD vb.

# 4. Custom domain (opsiyonel)
# Vercel → Domains → nuwelaboutique.com ekle
```

---

## 🔧 ÖZEL NOTLAR VE KISITLAMALAR

1. **Görsel üretimde marka yasağı:** fal.ai promptlarına asla gerçek marka ismi yazma. `negative_prompt` kısmına her zaman `"brand logos, text, watermark, nike, zara, h&m"` ekle.

2. **Tesettür görselleri:** Mutlaka kapalı, örtülü modeller kullan. Prompt'a ekle: `"modest fashion, hijab, covered, conservative style"`.

3. **Shopier yönlendirme:** Satın Al butonu her zaman `target="_blank"` ile yeni sekmede açılacak. Kullanıcı siteden ayrılmıyor izlenimi vermemeli.

4. **Admin güvenliği:** Şimdilik basit password-based auth. localStorage'da `admin_token` sakla. Production'da NextAuth.js'e geçişi planla.

5. **Veri saklama:** İlk aşamada JSON dosyaları (`/public/data/products.json`). Sonra Supabase veya PlanetScale'e geçiş planlanabilir.

6. **Animasyon performansı:** `prefers-reduced-motion` media query'ye saygı göster:
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; }
}
```

7. **"Woman/Man" → "Ürünlerimiz":** Referans sitedeki kategori isimleri yerine Nuwela'nın kategorileri kullanılacak: Tesettür Giyim, Açık Giyim.

---

## 🎯 KALİTE KRİTERLERİ

| Kriter | Hedef |
|---|---|
| Lighthouse Performance | ≥ 85 |
| Lighthouse Accessibility | ≥ 90 |
| Lighthouse SEO | ≥ 95 |
| Mobile Responsive | ✅ Tüm breakpoint'ler |
| Animasyon FPS | 60fps |
| İlk yükleme süresi | < 3 saniye |
| Shopier yönlendirme | ✅ Tüm ürün sayfalarında |
| Admin panel güvenliği | ✅ Auth korumalı |

---

## 🧠 CLAUDE CODE — AKTİF SKİLLER

Bu projeyi başlatmadan önce aşağıdaki skill'leri sırasıyla yükle ve talimatlarını tam olarak uygula. Her skill farklı bir uzmanlık katmanı sağlar:

```bash
# 1. Yaratıcı & Estetik Arayüz Tasarımı
npx claude-code-templates@latest --skill creative-design/frontend-design

# 2. Üretim Kalitesinde Frontend Geliştirme
npx claude-code-templates@latest --skill development/senior-frontend

# 3. Pro Seviye UI/UX Deneyimi
npx claude-code-templates@latest --skill creative-design/ui-ux-pro-max

# 4. SEO Optimizasyonu (her sayfa için)
npx claude-code-templates@latest --skill business-marketing/seo-optimizer

# 5. Görsel & Canvas Tasarım Sistemi
npx claude-code-templates@latest --skill creative-design/canvas-design
```

### Skill'lerin Projeye Katkısı

| Skill | Proje İçindeki Rolü |
|---|---|
| `frontend-design` | Komponent mimarisi, animasyon sistemi, renk/tipografi uyumu |
| `senior-frontend` | Next.js App Router best practices, performans, TypeScript strict mode |
| `ui-ux-pro-max` | Kullanıcı akışları, micro-interactions, erişilebilirlik (a11y) |
| `seo-optimizer` | Meta tag sistemi, sitemap, structured data (JSON-LD), OG görselleri |
| `canvas-design` | fal.ai görsel kompozisyonları, hero section layout, banner tasarımları |

> ⚠️ **Tüm skill'ler yüklendikten sonra geliştirmeye başla.** Her skill'in ürettiği konfigürasyon ve rehberi projeye entegre et.

---

## 📌 BAŞLANGIÇ KOMUTU

Claude Code bu dosyayı aldıktan sonra şu sırayla ilerleyecek:

1. Yukarıdaki **5 skill'i sırasıyla yükle** (`frontend-design`, `senior-frontend`, `ui-ux-pro-max`, `seo-optimizer`, `canvas-design`) ve her birinin rehberini tam oku
2. `npx create-next-app@latest nuwela-boutique` ile projeyi kur
2. Tasarım sistemini (renkler, fontlar, animasyonlar) uygula
3. Navbar ve Footer'ı oluştur
4. Ana sayfayı yap
5. Ürün sayfalarını yap + Shopier entegre et
6. Statik sayfaları ekle (içerikleri yukarıdan kopyala)
7. fal.ai ile görselleri üret (API key kullanıcıdan alınacak)
8. Admin panelini yap
9. Test et ve optimize et
10. GitHub'a push et, Vercel'e deploy et

**Kullanıcıdan gerekli bilgiler:**
- [ ] fal.ai API Key
- [ ] GitHub repo URL ve branch adı
- [ ] Shopier mağaza URL/ID (eğer varsa)
- [ ] Admin şifresi (varsayılan: nuwela2025admin)

---

*Son güncelleme: Mayıs 2026 | Hazırlayan: Claude | Proje: Nuwela Boutique E-Ticaret*
