import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Nuwela Boutique — Modern, şık ve yüksek kaliteli ürünler için güvenilir markanız. Hikayemizi keşfedin.",
};

const HAKKIMIZDA_IMG = "/nuwela-hakkimizda-gorsel.jpeg";

export default function HakkimizdaPage() {
  return (
    <div>
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <Image src={HAKKIMIZDA_IMG} alt="Nuwela Boutique" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full container-wide flex flex-col justify-center text-white">
          <p className="text-xs uppercase tracking-[0.4em] mb-4">Hakkımızda</p>
          <h1 className="font-serif text-5xl md:text-7xl italic max-w-3xl leading-tight">
            Zarafetin yeni adresi
          </h1>
        </div>
      </section>

      <section className="container-narrow py-20 md:py-28 space-y-8 text-lg leading-relaxed text-primary/85">
        <ScrollReveal>
          <p>
            Günlük yaşamınızı geliştirmek için tasarlanmış modern, şık ve yüksek kaliteli ürünler için
            güvenilir markanız <strong className="text-primary">Nuwela</strong>'ya hoş geldiniz. Nuwela olarak yenilikçiliği, rahatlığı ve
            olağanüstü değeri birleştiren kusursuz bir alışveriş deneyimi yaratmaya inanıyoruz.
            Yolculuğumuz basit bir vizyonla başladı: müşterilere neşe, güven ve işlevsellik uyandıran
            seçilmiş ürün seçenekleri sunmak.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p>
            Özenle seçtiğimiz koleksiyonlarımızdan sürdürülebilirliğe olan bağlılığımıza kadar Nuwela,
            bir e-ticaret platformundan daha fazlası olarak öne çıkıyor. Müşterilerimizin ihtiyaçlarını
            anlayarak ve yaşam tarzlarına kusursuz bir şekilde uyan ürünler sunarak onlarla daha derin
            bir düzeyde bağlantı kurmaya çalışıyoruz.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p>
            Ekibimiz, müşterilerin kendilerini değerli ve desteklenmiş hissettikleri bir topluluk oluşturma
            konusunda tutkuludur. Kullanıcı dostu web sitemiz, olağanüstü müşteri hizmetlerimiz ve güvenli
            alışveriş ortamımız aracılığıyla Nuwela, her etkileşimi olumlu ve unutulmaz kılmayı amaçlamaktadır.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <p className="font-serif italic text-2xl text-center pt-8">
            Nuwela'yı yolculuğunuzun bir parçası haline getirdiğiniz için teşekkür ederiz.
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
}
