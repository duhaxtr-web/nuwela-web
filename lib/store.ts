import fs from "fs/promises";
import path from "path";
import { Octokit } from "@octokit/rest";
import type { Product } from "@/types/product";

const DATA_FILE = path.join(process.cwd(), "data", "products.json");

function hasGithub(): boolean {
  return Boolean(
    process.env.GITHUB_TOKEN &&
      process.env.GITHUB_OWNER &&
      process.env.GITHUB_REPO,
  );
}

function octo() {
  return new Octokit({ auth: process.env.GITHUB_TOKEN });
}

const githubCfg = () => ({
  owner: process.env.GITHUB_OWNER!,
  repo: process.env.GITHUB_REPO!,
  branch: process.env.GITHUB_BRANCH || "main",
  path: process.env.GITHUB_DATA_PATH || "data/products.json",
});

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
    // Vercel'de filesystem read-only, bu normaldir
  }
}

async function readGithub(): Promise<Product[]> {
  const cfg = githubCfg();
  try {
    const url = `https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents/${cfg.path}?ref=${cfg.branch}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[store] readGithub HTTP:", res.status);
      return [];
    }
    const data = await res.json();
    if (!data.content) return [];
    const b64 = data.content.replace(/\n/g, "");
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const decoded = new TextDecoder("utf-8").decode(bytes);
    return JSON.parse(decoded);
  } catch (e) {
    console.error("[store] readGithub failed:", e);
    return [];
  }
}

async function writeGithub(products: Product[], message: string): Promise<void> {
  const cfg = githubCfg();
  const client = octo();
  let sha: string | undefined;
  try {
    const { data } = await client.repos.getContent({
      owner: cfg.owner,
      repo: cfg.repo,
      path: cfg.path,
      ref: cfg.branch,
    });
    if ("sha" in data) sha = data.sha;
  } catch {
    /* file may not exist yet */
  }
  const content = Buffer.from(JSON.stringify(products, null, 2)).toString("base64");
  await client.repos.createOrUpdateFileContents({
    owner: cfg.owner,
    repo: cfg.repo,
    path: cfg.path,
    branch: cfg.branch,
    message,
    content,
    sha,
  });
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
  let saved = false;

  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (token && owner && repo) {
    try {
      await writeGithub(products, message);
      saved = true;
    } catch (e) {
      console.error("[store] GitHub write failed:", e);
    }
  } else {
    console.warn("[store] GitHub env vars missing — TOKEN:", !!token, "OWNER:", !!owner, "REPO:", !!repo);
  }

  try {
    await writeLocal(products);
    saved = true;
  } catch {
    // Vercel'de filesystem read-only olduğu için beklenen durum
  }

  if (!saved) {
    throw new Error("Ürünler kaydedilemedi: GitHub ve yerel depolama başarısız");
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
