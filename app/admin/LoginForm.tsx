"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function LoginForm({ next }: { next?: string }) {
  const router = useRouter();
  const [u, setU] = useState("admin");
  const [p, setP] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: u, password: p }),
    });
    setLoading(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      toast.error(j.error || "Giriş başarısız");
      return;
    }
    toast.success("Hoş geldiniz");
    router.push(next || "/admin/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label className="label-base">Kullanıcı Adı</label>
        <input value={u} onChange={(e) => setU(e.target.value)} className="input-base" required />
      </div>
      <div>
        <label className="label-base">Şifre</label>
        <input
          type="password"
          value={p}
          onChange={(e) => setP(e.target.value)}
          className="input-base"
          required
          autoFocus
        />
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
        {loading ? "Giriş yapılıyor…" : "Giriş Yap"}
      </button>
    </form>
  );
}
