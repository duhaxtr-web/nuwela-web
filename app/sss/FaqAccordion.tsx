"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQ } from "./faq-data";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-border">
      {FAQ.map((item, i) => (
        <div key={i} className="border-b border-border">
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full py-6 flex items-start justify-between gap-6 text-left group"
            aria-expanded={open === i}
          >
            <span className="font-serif text-xl md:text-2xl group-hover:text-secondary transition-colors">
              {item.q}
            </span>
            <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="shrink-0 text-muted mt-1">
              <Plus size={20} />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="pb-6 text-muted leading-relaxed pr-12">{item.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
