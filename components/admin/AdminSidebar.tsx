"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, PlusCircle, LogOut, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const items = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/urunler", label: "Ürünler", icon: Package },
  { href: "/admin/urunler/yeni", label: "Yeni Ürün", icon: PlusCircle },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Çıkış yapıldı");
    router.push("/admin");
    router.refresh();
  }

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-border min-h-screen p-6 flex flex-col">
      <Link href="/admin/dashboard" className="font-serif text-2xl italic mb-10 block">
        Nuwela <span className="text-xs uppercase tracking-widest text-muted not-italic font-sans">Admin</span>
      </Link>
      <nav className="space-y-1 flex-1">
        {items.map((it) => {
          const active = pathname === it.href || (it.href === "/admin/urunler" && pathname?.startsWith("/admin/urunler") && !pathname.startsWith("/admin/urunler/yeni"));
          return (
            <Link
              key={it.href}
              href={it.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm transition-colors",
                active ? "bg-primary text-white" : "text-primary hover:bg-surface",
              )}
            >
              <it.icon size={16} />
              {it.label}
            </Link>
          );
        })}
      </nav>
      <div className="pt-6 border-t border-border space-y-1">
        <Link href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 text-sm text-muted hover:text-primary">
          <Home size={16} /> Siteyi Görüntüle
        </Link>
        <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-error hover:bg-error/5">
          <LogOut size={16} /> Çıkış
        </button>
      </div>
    </aside>
  );
}
