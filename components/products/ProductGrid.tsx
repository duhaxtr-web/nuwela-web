"use client";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { staggerContainer, slideUp } from "@/lib/animations";

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <div className="py-20 text-center text-muted">
        <p className="font-serif text-2xl italic mb-2">Henüz ürün eklenmedi</p>
        <p className="text-sm">Yakında burada yepyeni parçalar göreceksiniz.</p>
      </div>
    );
  }
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14"
    >
      {products.map((p) => (
        <motion.div key={p.id} variants={slideUp}>
          <ProductCard product={p} />
        </motion.div>
      ))}
    </motion.div>
  );
}
