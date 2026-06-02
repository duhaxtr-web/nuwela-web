"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ProductVaryant } from "@/types/product";

export function VariantSelector({ varyant }: { varyant: ProductVaryant }) {
  const [beden, setBeden] = useState<string | null>(null);
  const [renk, setRenk] = useState<string | null>(null);
  const [kumas, setKumas] = useState<string | null>(null);

  const hasAny = (varyant.beden?.length || varyant.renk?.length || varyant.kumas?.length);
  if (!hasAny) return null;

  return (
    <div className="space-y-6">
      {varyant.beden?.length ? (
        <div>
          <div className="flex justify-between items-baseline mb-3">
            <span className="label-base">Beden</span>
            {beden && <span className="text-xs text-muted">Seçili: {beden}</span>}
          </div>
          <div className="flex flex-wrap gap-2">
            {varyant.beden.map((b) => (
              <motion.button
                key={b}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setBeden(b)}
                className={cn(
                  "min-w-[44px] h-11 px-3 border text-xs uppercase tracking-widest transition-colors",
                  beden === b
                    ? "border-primary bg-primary text-white"
                    : "border-border hover:border-primary",
                )}
              >
                {b}
              </motion.button>
            ))}
          </div>
        </div>
      ) : null}

      {varyant.renk?.length ? (
        <div>
          <div className="flex justify-between items-baseline mb-3">
            <span className="label-base">Renk</span>
            {renk && <span className="text-xs text-muted">Seçili: {renk}</span>}
          </div>
          <div className="flex flex-wrap gap-3">
            {varyant.renk.map((r) => (
              <motion.button
                key={r.isim}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setRenk(r.isim)}
                aria-label={r.isim}
                title={r.isim}
                className={cn(
                  "w-10 h-10 rounded-full border-2 transition-all",
                  renk === r.isim ? "border-primary ring-2 ring-primary/20 ring-offset-2" : "border-border",
                )}
                style={{ backgroundColor: r.kod }}
              />
            ))}
          </div>
        </div>
      ) : null}

      {varyant.kumas?.length ? (
        <div>
          <span className="label-base">Kumaş</span>
          <div className="flex flex-wrap gap-2">
            {varyant.kumas.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKumas(k)}
                className={cn(
                  "px-4 h-11 border text-xs uppercase tracking-widest transition-colors",
                  kumas === k ? "border-primary bg-primary text-white" : "border-border hover:border-primary",
                )}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
