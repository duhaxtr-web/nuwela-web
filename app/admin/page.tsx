import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Giriş",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminLoginPage({ searchParams }: { searchParams: { next?: string } }) {
  if (isAuthenticated()) redirect(searchParams.next || "/admin/dashboard");
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center py-12 px-4">
      <div className="bg-white w-full max-w-md p-8 md:p-12 border border-border">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.4em] text-muted mb-2">Yönetim Paneli</p>
          <h1 className="font-serif text-3xl italic">Nuwela Admin</h1>
        </div>
        <LoginForm next={searchParams.next} />
      </div>
    </div>
  );
}
