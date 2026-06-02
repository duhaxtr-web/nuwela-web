"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function ProductImages({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const main = images[active];
  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[640px]">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={`relative shrink-0 w-20 h-24 md:w-20 md:h-24 overflow-hidden border-2 transition-colors ${
              active === i ? "border-primary" : "border-transparent hover:border-border"
            }`}
            aria-label={`${alt} görsel ${i + 1}`}
          >
            <Image src={img} alt={`${alt} ${i + 1}`} fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
      <div className="relative flex-1 aspect-[3/4] bg-surface overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <Image src={main} alt={alt} fill priority sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
