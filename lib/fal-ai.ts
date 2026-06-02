const FAL_API_KEY = process.env.FAL_API_KEY!;

const NEGATIVE_BASE =
  "blurry, low quality, watermark, text, logo, brand name, brand logos, nike, zara, h&m, mango, lc waikiki, deformed, ugly";

export interface FalImageRequest {
  prompt: string;
  negative_prompt?: string;
  width?: number;
  height?: number;
  num_images?: number;
}

export async function generateImage(req: FalImageRequest): Promise<string[]> {
  if (!FAL_API_KEY) throw new Error("FAL_API_KEY tanımlı değil");
  const res = await fetch("https://fal.run/fal-ai/nano-banana-2", {
    method: "POST",
    headers: {
      Authorization: `Key ${FAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: req.prompt,
      negative_prompt: req.negative_prompt
        ? `${req.negative_prompt}, ${NEGATIVE_BASE}`
        : NEGATIVE_BASE,
      image_size: { width: req.width ?? 1024, height: req.height ?? 1024 },
      num_images: req.num_images ?? 1,
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`fal.ai isteği başarısız: ${res.status} ${txt}`);
  }
  const data = await res.json();
  const images: { url: string }[] = data.images ?? [];
  return images.map((i) => i.url).filter(Boolean);
}

export const IMAGE_PROMPTS = {
  hero: "Elegant Turkish woman in modest fashion boutique, soft natural lighting, luxury store interior, warm beige and cream tones, editorial photography style, high fashion magazine quality, dreamy atmosphere",
  hero_secondary: "Two elegant women in luxury boutique trying on modest fashion, soft draped silk fabrics, warm beige cream tones, editorial photography, no brand logos or text",
  tesettur: "Beautiful Turkish woman wearing elegant hijab and modest fashion clothing, soft draped fabrics in cream beige tones, warm studio lighting, luxury boutique setting, editorial style, sophisticated, no brand logos",
  acik_giyim: "Stylish Turkish woman in contemporary elegant fashion outfit, natural daylight, clean minimal background, editorial photography, high quality fabric details, modern silhouette, no brand logos",
  magaza_ic: "Modern luxury women's boutique interior, warm beige and cream tones, elegant clothing racks with flowing dresses, soft lighting, marble floor, editorial style, sophisticated atmosphere",
  koleksiyon_banner: "Flat lay composition of elegant women's clothing collection, soft cream and earth tones, minimal styling, overhead shot, luxury fashion editorial, natural fabrics",
  hakkimizda: "Two elegant women in a boutique, smiling warmly, trying on modest fashion clothing, warm natural light, cozy luxury atmosphere, no brand logos or text",
  iletisim: "Elegant boutique counter with flowers, warm lighting, hospitality atmosphere, cream and beige tones, editorial photography",
  product_placeholder_tesettur: "Modest fashion long dress on hanger, cream tones, soft lighting, minimal clean background, editorial product photography",
  product_placeholder_acik: "Contemporary elegant dress on hanger, soft tones, clean minimal background, editorial product photography",
  kol_yeni_sezon: "New season women's fashion collection display, elegant clothing on rack, fresh neutral palette cream and sand tones, luxury boutique, editorial photography, soft natural light",
  kol_takim: "Elegant women's tailored suit set blazer and trousers, sophisticated styling, cream and camel tones, editorial fashion photography, clean studio background",
  kol_dis_giyim: "Elegant women's outerwear long coat, flowing silhouette, warm camel and beige tones, luxury fashion editorial, minimal clean background",
  kol_alt_giyim: "Elegant women's wide-leg trousers and flowing midi skirt, soft neutral earth tones, editorial fashion photography, clean background",
  kol_ust_giyim: "Elegant women's blouse and top collection, soft draped fabric, cream and ivory tones, minimal clean background, editorial fashion photography",
  kol_elbise: "Elegant women's midi dress, flowing fabric, soft earth tones cream and beige, luxury fashion editorial, clean minimal background",
  kol_abiye: "Luxurious women's evening gown, formal dress, champagne and gold soft tones, editorial photography, sophisticated atmosphere",
  kol_canta: "Luxury women's structured leather handbag, elegant accessory, cream and tan tones, minimal white background, editorial product photography",
  kol_esarp: "Elegant women's silk scarf and shawl draped gracefully, soft cream and ivory tones, minimal background, editorial fashion photography",
};

export type ImagePromptKey = keyof typeof IMAGE_PROMPTS;
