"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

const FALLBACK =
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop";

export function ProductCard({ product }: { product: Product }) {
  const indirimli = product.indirimli_fiyat && product.indirimli_fiyat < product.fiyat;
  const hover = product.resimler.resim2 || product.resimler.resim1 || FALLBACK;
  const main = product.resimler.resim1 || FALLBACK;
  const isYeni = product.etiketler?.includes("yeni");

  return (
    <Link href={`/urunler/${product.slug}`} className="block group">
      <motion.div
        whileHover="hover"
        initial="rest"
        animate="rest"
        className="relative overflow-hidden bg-surface aspect-[3/4]"
      >
        <motion.div
          variants={{ rest: { opacity: 1 }, hover: { opacity: 0 } }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <Image
            src={main}
            alt={product.baslik}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>
        <motion.div
          variants={{ rest: { opacity: 0, scale: 1.05 }, hover: { opacity: 1, scale: 1 } }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={hover}
            alt={product.baslik}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isYeni && <Badge variant="dark">Yeni</Badge>}
          {indirimli && <Badge variant="accent">İndirim</Badge>}
        </div>
      </motion.div>

      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium text-primary group-hover:text-secondary transition-colors line-clamp-1">
          {product.baslik}
        </h3>
        <div className="flex items-baseline gap-2">
          {indirimli ? (
            <>
              <span className="text-sm font-semibold text-error">
                {formatPrice(product.indirimli_fiyat!)}
              </span>
              <span className="text-xs text-muted line-through">
                {formatPrice(product.fiyat)}
              </span>
            </>
          ) : (
            <span className="text-sm font-semibold">{formatPrice(product.fiyat)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
