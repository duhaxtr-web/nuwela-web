# Nuwela Boutique — E-Ticaret Web Sitesi

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion ile geliştirilmiş, fal.ai görsel üretimi ve Shopier ödeme entegrasyonu içeren kadın giyim (tesettür + açık giyim) e-ticaret platformu.

## Özellikler

- **Ana sayfa**: Animasyonlu hero, kayan marquee, öne çıkan ürünler, koleksiyon banner'ları
- **Ürün sayfaları**: Görsel galerisi, beden/renk varyantları, Shopier "Satın Al" butonu
- **7 statik sayfa**: Hakkımızda, İletişim, SSS, Kargo, Değişim, Sipariş İptali, Ödeme Seçenekleri
- **Admin paneli** (16 alan): Ürün CRUD, görsel yükleme (Vercel Blob), fal.ai görsel üretimi
- **Veritabanı**: JSON + GitHub API (admin değişiklikleri commit → redeploy)
- **SEO**: Metadata, Open Graph, JSON-LD (Store + Product + FAQ), sitemap.xml, robots.txt
- **Animasyon**: 60 FPS Framer Motion sayfa geçişleri + scroll reveal + stagger

## Yerel Çalıştırma

```bash
npm install
cp .env.example .env.local
# .env.local içinde API key'leri doldur
npm run dev
```

Site: http://localhost:3000
Admin: http://localhost:3000/admin (kullanıcı `admin` / şifre `.env.local` içindeki `ADMIN_PASSWORD`)

## Çevre Değişkenleri

| Anahtar | Açıklama |
|---|---|
| `FAL_API_KEY` | fal.ai API anahtarı (görsel üretimi) |
| `ADMIN_USERNAME` | Admin kullanıcı adı (varsayılan: `admin`) |
| `ADMIN_PASSWORD` | Admin şifresi |
| `ADMIN_SESSION_SECRET` | Cookie imzalama için rastgele uzun bir string |
| `NEXT_PUBLIC_SITE_URL` | Yayın URL'si (örn: `https://nuwelaboutique.vercel.app`) |
| `NEXT_PUBLIC_SITE_NAME` | Site adı |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token (ürün görselleri için) |
| `SHOPIER_STORE_URL` | Shopier mağaza URL'si |
| `GITHUB_TOKEN` | GitHub Personal Access Token (repo write erişimi) |
| `GITHUB_OWNER` | GitHub kullanıcı adı |
| `GITHUB_REPO` | Repo adı |
| `GITHUB_BRANCH` | Branch (varsayılan: `main`) |
| `GITHUB_DATA_PATH` | JSON dosya yolu (varsayılan: `data/products.json`) |

## Vercel Deploy

1. **GitHub'a push**
   ```bash
   git init
   git add .
   git commit -m "feat: Nuwela Boutique ilk kurulum"
   git branch -M main
   git remote add origin https://github.com/KULLANICI/REPO.git
   git push -u origin main
   ```

2. **vercel.com → New Project**
   - GitHub repo'yu seç
   - Framework: Next.js (otomatik)
   - Region: Frankfurt (fra1) — `vercel.json` içinde tanımlı

3. **Environment Variables** ekle (Settings → Environment Variables):
   - `.env.local` içindeki tüm anahtarları kopyala
   - `BLOB_READ_WRITE_TOKEN`: Vercel Dashboard → Storage → Blob → Create
   - `GITHUB_TOKEN`: GitHub Settings → Developer Settings → Personal Access Tokens → Fine-grained → repo'ya `contents: read/write` izni ver

4. **Deploy** — Vercel otomatik build alır.

5. **Custom domain** (opsiyonel): Vercel → Domains → `nuwelaboutique.com` ekle.

## Vercel Blob Kurulumu

1. Vercel Dashboard → Storage → Create → Blob → Public
2. Name: `nuwela-images`, Region: Frankfurt
3. `.env.local` token'ı oluştur (Connect to Project) ve Vercel Dashboard'a da gir

## GitHub Veri Saklama Akışı

- Ürün verisi `data/products.json` dosyasında tutulur.
- Admin paneli, `@octokit/rest` ile GitHub API üzerinden bu dosyayı commit'ler.
- Her commit Vercel'de otomatik redeploy tetikler (~1 dakika).
- `GITHUB_TOKEN` tanımlı değilse, sadece local filesystem'e yazılır (development modu).

## fal.ai Görsel Üretimi

Admin paneli > Ürün formu > Görsel kutuları > "fal.ai ile Üret"
- Model: `fal-ai/nano-banana-2`
- Negatif prompt'a otomatik olarak `brand logos, watermark, text` eklenir.
- Tesettür görsellerinde her zaman "modest fashion, hijab, covered" anahtar kelimeleri prompt'a eklenmelidir.

## Shopier Entegrasyonu

Her ürün formunda **"Shopier Ürün URL'si"** alanı vardır. Buraya Shopier'daki ürün sayfasının tam URL'sini girin. Ürün detay sayfasındaki "Satın Al" butonu, yeni sekmede bu URL'yi açar.

## Klasör Yapısı

```
app/
  (root pages)             - Public sayfalar
  admin/                   - Yönetim paneli (route group ile korunan alt yollar)
  api/                     - REST endpoint'ler
components/
  layout/  ui/  home/  products/  admin/
lib/
  store.ts                 - JSON + GitHub veri katmanı
  shopier.ts  fal-ai.ts  auth.ts  constants.ts  animations.ts  utils.ts
data/
  products.json            - Ürün veritabanı (git'te commit'lenir)
styles/globals.css
```

## Komutlar

```bash
npm run dev          # Geliştirme sunucusu
npm run build        # Production build
npm run start        # Production sunucusu
npm run lint         # ESLint
```

## Yapım

Tasarım: Minna Framer şablonundan ilham alındı (özgün uygulama).
Stack: Next.js 14, Tailwind CSS 3.4, Framer Motion 11, Lucide React, Vercel Blob, @octokit/rest.

— Konya / Selçuklu, 2025
