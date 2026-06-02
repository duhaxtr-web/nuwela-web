import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "accent" | "dark";
  className?: string;
}) {
  const styles = {
    default: "bg-white/90 text-primary",
    accent: "bg-accent text-primary",
    dark: "bg-primary text-white",
  } as const;
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 text-[10px] uppercase tracking-widest font-medium",
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
