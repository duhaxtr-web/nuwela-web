import type { Product } from "@/types/product";

// Tüm ürün depolama işlemleri GitHub üzerinden (Vercel'de filesystem read-only).
// Saf fetch kullanır — hem Node.js hem Edge runtime'da çalışır.

const cfg = () => ({
  token: process.env.GITHUB_TOKEN || "",
  owner: process.env.GITHUB_OWNER || "",
  repo: process.env.GITHUB_REPO || "",
  branch: process.env.GITHUB_BRANCH || "main",
  path: process.env.GITHUB_DATA_PATH || "data/products.json",
});

export function hasGithub(): boolean {
  const c = cfg();
  return !!(c.token && c.owner && c.repo);
}

function base() {
  const c = cfg();
  return `https://api.github.com/repos/${c.owner}/${c.repo}/contents/${c.path}`;
}

function headers() {
  return {
    Authorization: `token ${cfg().token}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };
}

export async function ghReadProducts(): Promise<Product[]> {
  if (!hasGithub()) return [];
  try {
    const res = await fetch(`${base()}?ref=${cfg().branch}`, {
      headers: headers(),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[gh-store] read HTTP:", res.status);
      return [];
    }
    const data = await res.json();
    if (!data.content) return [];
    const b64 = (data.content as string).replace(/\n/g, "");
    const bytes = Uint8Array.from(atob(b64), (ch) => ch.charCodeAt(0));
    const json = new TextDecoder("utf-8").decode(bytes);
    return JSON.parse(json);
  } catch (e) {
    console.error("[gh-store] read failed:", e);
    return [];
  }
}

export async function ghWriteProducts(products: Product[], message: string): Promise<void> {
  if (!hasGithub()) {
    throw new Error("GitHub ayarları eksik (GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO)");
  }

  // UTF-8 JSON → base64
  const json = JSON.stringify(products, null, 2);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  const content = btoa(binary);

  // Mevcut dosyanın SHA'sını al (güncelleme için gerekli)
  let sha: string | undefined;
  try {
    const getRes = await fetch(`${base()}?ref=${cfg().branch}`, {
      headers: headers(),
      cache: "no-store",
    });
    if (getRes.ok) sha = (await getRes.json()).sha;
  } catch {
    // dosya henüz yok
  }

  const body: Record<string, unknown> = { message, content, branch: cfg().branch };
  if (sha) body.sha = sha;

  const putRes = await fetch(base(), {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(body),
  });

  if (!putRes.ok) {
    const errText = await putRes.text();
    throw new Error(`GitHub yazma hatası: ${putRes.status} ${errText}`);
  }
}
