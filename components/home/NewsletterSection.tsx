"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      toast.error("Geçerli bir e-posta girin");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("Aboneliğiniz alındı, teşekkürler!");
      setEmail("");
      setLoading(false);
    }, 800);
  }

  return (
    <section className="py-20 md:py-28">
      <div className="container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-muted mb-4">Bültenimize Katılın</p>
          <h2 className="font-serif text-4xl md:text-5xl italic mb-4">
            Yeni koleksiyonlardan ilk siz haberdar olun
          </h2>
          <p className="text-sm text-muted max-w-md mx-auto mb-8">
            Özel indirimler, yeni gelenler ve stil önerileri için bültenimize abone olun.
          </p>
          <form onSubmit={submit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-base flex-1"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary whitespace-nowrap disabled:opacity-50"
            >
              {loading ? "Gönderiliyor…" : "Abone Ol"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
