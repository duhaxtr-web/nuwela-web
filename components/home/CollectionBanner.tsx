"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CARDS = [
  {
    href: "/urunler?tur=gunluk_zarafet",
    title: "Günlük Zarafet",
    subtitle: "Her Gün, Her An",
    src: "/banner/gunluk-zarafet.jpg",
    delay: 0,
  },
  {
    href: "/urunler?tur=ozel_gunler",
    title: "Özel Günler",
    subtitle: "Unutulmaz Anlar",
    src: "/banner/ozel-gunler.jpg",
    delay: 0.12,
  },
  {
    href: "/urunler?tur=ofis_sikligi",
    title: "Ofis Şıklığı",
    subtitle: "Profesyonel & Zarif",
    src: "/banner/ofis-sikligi.jpg",
    delay: 0.24,
  },
];

function Card({
  href,
  title,
  subtitle,
  src,
  delay,
}: (typeof CARDS)[number]) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden bg-surface aspect-[3/4]"
    >
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-[1500ms] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
      </motion.div>

      <div className="relative h-full flex flex-col justify-end p-7 md:p-9 text-white">
        <p className="text-xs uppercase tracking-[0.4em] mb-2 opacity-80">{subtitle}</p>
        <h3 className="font-serif text-3xl md:text-4xl italic mb-4 leading-tight">{title}</h3>
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest border-b border-white/50 pb-1 self-start group-hover:border-accent group-hover:text-accent transition-colors">
          Keşfet <ArrowRight size={13} />
        </span>
      </div>
    </Link>
  );
}

export function CollectionBanner() {
  return (
    <section className="container-wide py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <p className="text-xs uppercase tracking-[0.4em] text-muted mb-3">Koleksiyonlarımız</p>
        <h2 className="font-serif text-3xl md:text-5xl italic">Yaşam Tarzına Göre Seç</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 md:gap-5">
        {CARDS.map((card) => (
          <Card key={card.href} {...card} />
        ))}
      </div>
    </section>
  );
}
