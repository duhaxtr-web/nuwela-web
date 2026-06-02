"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

interface Props {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-secondary",
  outline:
    "border border-primary text-primary hover:bg-primary hover:text-white",
  ghost:
    "text-primary hover:text-secondary",
};

export function AnimatedButton({
  href,
  onClick,
  variant = "primary",
  className,
  children,
  type = "button",
  disabled,
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 px-8 py-4 text-xs uppercase tracking-widest font-medium transition-colors";
  const cls = cn(base, styles[variant], className, disabled && "opacity-50 pointer-events-none");

  const inner = (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cls}
    >
      {children}
    </motion.span>
  );

  if (href) return <Link href={href} className="inline-block">{inner}</Link>;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className="inline-block">
      {inner}
    </button>
  );
}
