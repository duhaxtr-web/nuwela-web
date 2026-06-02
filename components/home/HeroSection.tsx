"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HERO_IMAGE = "/nuwela-hero-gorsel.jpeg";

export function HeroSection({ imageUrl }: { imageUrl?: string }) {
  const src = imageUrl || HERO_IMAGE;
  return (
    <section className="relative h-[88vh] min-h-[600px] w-full overflow-hidden bg-surface">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt="Nuwela Boutique — Zarafetin Yeni Adresi"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />
      </motion.div>

      <div className="relative h-full container-wide flex flex-col justify-end pb-20 md:pb-28">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/90 text-xs uppercase tracking-[0.4em] mb-6"
        >
          Koleksiyon 2026
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-white text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-4xl italic"
        >
          Zarafetin<br />Yeni Adresi
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-white/85 text-base md:text-lg max-w-md mt-6"
        >
          2026 koleksiyonumuzla zamansız zarafeti yeniden keşfedin.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="/koleksiyonlar"
            className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 text-xs uppercase tracking-widest font-medium hover:bg-accent transition-colors"
          >
            Koleksiyonu Keşfet <ArrowRight size={16} />
          </Link>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 border border-white/60 text-white px-8 py-4 text-xs uppercase tracking-widest font-medium hover:bg-white hover:text-primary transition-colors"
          >
            Bizimle İletişime Geç
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
