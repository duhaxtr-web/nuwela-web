import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const FAL_API_KEY = "f3b0c2d9-d244-4d24-bae0-baf8c5a53ef4:9281983f7740407d8bcd2a3d288a2a66";
const NEGATIVE = "blurry, low quality, watermark, text, logo, brand name, deformed, ugly, nsfw";

const COLLECTIONS = [
  { slug: "yeni-sezon", prompt: "New season women's fashion collection display, elegant clothing on rack, fresh neutral palette cream and sand tones, luxury boutique, editorial photography, soft natural light" },
  { slug: "takim", prompt: "Elegant women's tailored suit set blazer and trousers, sophisticated styling, cream and camel tones, editorial fashion photography, clean studio background" },
  { slug: "dis-giyim", prompt: "Elegant women's outerwear long coat, flowing silhouette, warm camel and beige tones, luxury fashion editorial, minimal clean background" },
  { slug: "alt-giyim", prompt: "Elegant women's wide-leg trousers and flowing midi skirt, soft neutral earth tones, editorial fashion photography, clean background" },
  { slug: "ust-giyim", prompt: "Elegant women's blouse and top collection, soft draped fabric, cream and ivory tones, minimal clean background, editorial fashion photography" },
  { slug: "elbise", prompt: "Elegant women's midi dress, flowing fabric, soft earth tones cream and beige, luxury fashion editorial, clean minimal background" },
  { slug: "abiye", prompt: "Luxurious women's evening gown, formal dress, champagne and gold soft tones, editorial photography, sophisticated atmosphere" },
  { slug: "canta", prompt: "Luxury women's structured leather handbag, elegant accessory, cream and tan tones, minimal white background, editorial product photography" },
  { slug: "esarpsal", prompt: "Elegant women's silk scarf and shawl draped gracefully, soft cream and ivory tones, minimal background, editorial fashion photography" },
];

const OUT_DIR = path.resolve("public/collections");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const mod = url.startsWith("https") ? https : http;
    mod.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", (e) => { fs.unlink(dest, () => {}); reject(e); });
  });
}

async function generate(prompt) {
  const res = await fetch("https://fal.run/fal-ai/nano-banana-2", {
    method: "POST",
    headers: {
      Authorization: `Key ${FAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      negative_prompt: NEGATIVE,
      image_size: { width: 800, height: 1000 },
      num_images: 1,
    }),
  });
  if (!res.ok) throw new Error(`fal.ai hata: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.images?.[0]?.url;
}

const results = {};

for (const col of COLLECTIONS) {
  const destFile = path.join(OUT_DIR, `${col.slug}.jpg`);
  if (fs.existsSync(destFile)) {
    console.log(`⏭  ${col.slug} — zaten mevcut, atlandı`);
    results[col.slug] = `/collections/${col.slug}.jpg`;
    continue;
  }
  try {
    process.stdout.write(`🎨 ${col.slug} üretiliyor…`);
    const url = await generate(col.prompt);
    if (!url) throw new Error("URL döndürülmedi");
    await download(url, destFile);
    results[col.slug] = `/collections/${col.slug}.jpg`;
    console.log(" ✓");
  } catch (e) {
    console.log(` ✗ ${e.message}`);
    results[col.slug] = null;
  }
}

fs.writeFileSync(
  path.resolve("data/collections.json"),
  JSON.stringify(results, null, 2)
);
console.log("\n✅ data/collections.json güncellendi");
