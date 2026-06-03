"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  async function del() {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Ürün silindi");
      router.refresh();
    } else {
      const j = await res.json().catch(() => ({}));
      toast.error(j.error || "Silme başarısız");
    }
  }
  return (
    <button onClick={del} className="text-xs underline text-error hover:opacity-70">Sil</button>
  );
}
