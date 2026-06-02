"use client";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export function ShopierButton({ url, disabled }: { url: string; disabled?: boolean }) {
  const valid = url && url !== "#";
  return (
    <motion.a
      href={valid ? url : undefined}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={valid ? { scale: 1.01 } : {}}
      whileTap={valid ? { scale: 0.99 } : {}}
      aria-disabled={!valid || disabled}
      className={`w-full flex items-center justify-center gap-3 bg-primary text-white py-5 px-8 text-xs font-medium tracking-[0.3em] uppercase transition-colors ${
        valid && !disabled ? "hover:bg-secondary cursor-pointer" : "opacity-60 pointer-events-none"
      }`}
    >
      <ShoppingBag size={16} />
      Shopier'da Satın Al
    </motion.a>
  );
}
