import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] container-narrow flex flex-col items-center justify-center text-center py-20">
      <p className="text-xs uppercase tracking-[0.4em] text-muted mb-4">404</p>
      <h1 className="font-serif text-5xl md:text-7xl italic mb-6">Sayfa Bulunamadı</h1>
      <p className="text-muted mb-10 max-w-md">
        Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
      </p>
      <Link href="/" className="btn-primary">Ana Sayfaya Dön</Link>
    </div>
  );
}
