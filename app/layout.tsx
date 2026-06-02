import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { PublicChrome } from "@/components/layout/PublicChrome";
import { SITE } from "@/lib/constants";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Nuwela Boutique", "tesettür giyim", "açık giyim", "kadın giyim",
    "abiye", "tunik", "elbise", "Konya butik", "online alışveriş",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <PublicChrome>{children}</PublicChrome>
        <Toaster position="top-center" toastOptions={{ style: { background: "#1a1a1a", color: "#fff", borderRadius: 0 } }} />
      </body>
    </html>
  );
}
