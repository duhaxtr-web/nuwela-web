export const SITE = {
  name: "Nuwela Boutique",
  tagline: "Zarafetin Yeni Adresi",
  description:
    "Nuwela Boutique — Tesettür ve açık giyim koleksiyonlarıyla zarafetin yeni adresi. Modern, şık ve yüksek kaliteli kadın giyim ürünleri.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nuwelaboutique.vercel.app",
  email: "nuwelaboutique@gmail.com",
  phone: "0533 321 73 95",
  phoneIntl: "+905333217395",
  whatsapp: "+905333217395",
  address: "Yazır Mahallesi Turhanlar Sokak 10/J KONYA/SELÇUKLU",
  hours: "09:00 – 19:00",
  social: {
    instagram: "https://www.instagram.com/nuwelaboutique",
    tiktok: "https://www.tiktok.com/@nuwela.boutique",
    whatsapp: "https://wa.me/905333217395",
  },
};

export const NAV_MAIN = [
  { label: "Ürünlerimiz", href: "/urunler" },
  { label: "Koleksiyonlar", href: "/koleksiyonlar" },
  { label: "Hakkımızda", href: "/hakkimizda" },
];

export const NAV_MENU_GROUPS = [
  {
    title: "Alışveriş",
    items: [
      { label: "Günlük Zarafet", href: "/urunler?tur=gunluk_zarafet" },
      { label: "Özel Günler", href: "/urunler?tur=ozel_gunler" },
      { label: "Ofis Şıklığı", href: "/urunler?tur=ofis_sikligi" },
      { label: "Tüm Koleksiyonlar", href: "/koleksiyonlar" },
      { label: "Hakkımızda", href: "/hakkimizda" },
    ],
  },
  {
    title: "Yardım",
    items: [
      { label: "Sık Sorulan Sorular", href: "/sss" },
      { label: "Kargo Bilgileri", href: "/kargo" },
      { label: "Değişim Politikası", href: "/degisim" },
      { label: "Sipariş İptali", href: "/siparis-iptali" },
      { label: "Ödeme Seçenekleri", href: "/odeme-secenekleri" },
    ],
  },
  {
    title: "İletişim",
    items: [{ label: "Bize Ulaşın", href: "/iletisim" }],
  },
];

export const KOLEKSIYONLAR = [
  "Yeni Sezon",
  "Takım",
  "Dış Giyim",
  "Alt Giyim",
  "Üst Giyim",
  "Elbise",
  "Çanta",
  "Eşarp/Şal",
];

export const BEDENLER = [
  "XS", "S", "M", "L", "XL", "XXL", "XXXL", "Standart",
  "36", "38", "40", "42", "44", "46", "48", "50", "52", "54", "56", "58", "60",
  "1", "2", "3", "4",
];

export const URUN_TURLERI = [
  { value: "gunluk_zarafet", label: "Günlük Zarafet" },
  { value: "ozel_gunler", label: "Özel Günler" },
  { value: "ofis_sikligi", label: "Ofis Şıklığı" },
] as const;

export const ANNOUNCEMENT = [
  "YENİ KOLEKSİYON GELDİ",
  "KAPIDA ÖDEME",
];

export const MARQUEE_ITEMS = [
  "YENİ SEZON",
  "KOLEKSİYON 2026",
  "ZARAFET",
  "KALİTE",
  "ŞIKLIK",
  "ELEGANs",
];
