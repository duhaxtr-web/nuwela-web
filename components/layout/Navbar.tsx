"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, X } from "lucide-react";
import { NAV_MAIN, SITE } from "@/lib/constants";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "sticky top-0 z-40 transition-all backdrop-blur",
          scrolled ? "bg-background/95 border-b border-border" : "bg-background/80",
        )}
      >
        <nav className="container-wide flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="font-serif text-2xl md:text-3xl tracking-tight italic font-semibold">
            {SITE.name.split(" ")[0]}
          </Link>

          <ul className="hidden md:flex items-center gap-10">
            {NAV_MAIN.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs uppercase tracking-widest hover:text-secondary transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Link
              href="/urunler"
              aria-label="Ürünleri ara"
              className="p-2 hover:text-secondary transition-colors"
            >
              <Search size={18} />
            </Link>
            <button
              type="button"
              aria-label="Menüyü aç"
              onClick={() => setOpen(true)}
              className="p-2 hover:text-secondary transition-colors"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && <MobileMenu onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
