import fs from "fs/promises";
import path from "path";
import type { Product } from "@/types/product";

const DATA_FILE = path.join(process.cwd(), "data", "products.json");

const GH_TOKEN = () => process.env.GITHUB_TOKEN || "";
const GH_OWNER = () => process.env.GITHUB_OWNER || "";
const GH_REPO = () => process.env.GITHUB_REPO || "";
const GH_BRANCH = () => process.env.GITHUB_BRANCH || "main";
const GH_PATH = () => process.env.GITHUB_DATA_PATH || "data/products.json";

function hasGithub(): boolean {
  return !!(GH_TOKEN() && GH_OWNER() && GH_REPO());
}

function ghBase() {
  return `https://api.github.com/repos/${GH_OWNER()}/${GH_REPO()}/contents/${GH_PATH()}`;
}

function ghHeaders() {
  return {
    Authorization: `token ${GH_TOKEN()}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  } as const;
}

async function readLocal(): Promise<Product[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLocal(products: Product[]): Promise<void> {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), "utf-8");
  } catch {
    // Vercel'de filesystem read-only — normaldir, yoksay
  }
}

async function readGithub(): Promise<Product[]> {
  if (!hasGithub()) return [];
  try {
    const res = await fetch(`${ghBase()}?ref=${GH_BRANCH()}`, {
      headers: ghHeaders(),
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.content) return [];
    const b64 = (data.content as string).replace(/\n/g, "");
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    return JSON.parse(new TextDecoder("utf-8").decode(bytes));
  } catch (e) {
    console.error("[store] readGithub failed:", e);
    return [];
  }
}

async function writeGithub(products: Product[], message: string): Promise<void> {
  // UTF-8 JSON → base64
  const json = JSON.stringify(products, null, 2);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  const content = btoa(binary);

  // Mevcut SHA
  let sha: string | undefined;
  try {
    const getRes = await fetch(`${ghBase()}?ref=${GH_BRANCH()}`, {
      headers: ghHeaders(),
      cache: "no-store",
    });
    if (getRes.ok) {
      const d = await getRes.json();
      sha = d.sha;
    }
  } catch {
    // yeni dosya
  }

  const body: Record<string, unknown> = { message, content, branch: GH_BRANCH() };
  if (sha) body.sha = sha;

  const putRes = await fetch(ghBase(), {
    method: "PUT",
    headers: ghHeaders(),
    body: JSON.stringify(body),
  });

  if (!putRes.ok) {
    const err = await putRes.text();
    throw new Error(`GitHub write failed: ${putRes.status} ${err}`);
  }
}

export async function getAllProducts(): Promise<Product[]> {
  if (hasGithub()) {
    const remote = await readGithub();
    if (remote.length) return remote;
  }
  return readLocal();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getAllProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getProductById(id: string): Promise<Product | null> {
  const all = await getAllProducts();
  return all.find((p) => p.id === id) ?? null;
}

export async function saveAllProducts(products: Product[], message = "chore: update products"): Promise<void> {
  writeLocal(products); // async, sonucu önemsiz
  if (hasGithub()) {
    await writeGithub(products, message);
  } else {
    throw new Error("GitHub env vars eksik (GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO)");
  }
}

export async function upsertProduct(product: Product): Promise<void> {
  const all = await getAllProducts();
  const idx = all.findIndex((p) => p.id === product.id);
  if (idx >= 0) all[idx] = product;
  else all.push(product);
  await saveAllProducts(all, `chore: upsert product ${product.slug}`);
}

export async function deleteProduct(id: string): Promise<void> {
  const all = await getAllProducts();
  const filtered = all.filter((p) => p.id !== id);
  await saveAllProducts(filtered, `chore: delete product ${id}`);
}
