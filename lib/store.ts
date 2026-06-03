import fs from "fs/promises";
import path from "path";
import type { Product } from "@/types/product";
import { hasGithub, ghReadProducts, ghWriteProducts } from "@/lib/gh-store";

const DATA_FILE = path.join(process.cwd(), "data", "products.json");

async function readLocal(): Promise<Product[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function getAllProducts(): Promise<Product[]> {
  if (hasGithub()) {
    const remote = await ghReadProducts();
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
  // Vercel'de filesystem read-only olduğu için yalnızca GitHub'a yazılır.
  await ghWriteProducts(products, message);
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
