import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { isAuthenticated } from "@/lib/auth";
import { getAllProducts, upsertProduct } from "@/lib/store";
import { slugify } from "@/lib/utils";
import type { Product, ProductInput } from "@/types/product";

export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  if (!isAuthenticated()) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  const body = (await req.json()) as ProductInput;
  if (!body.baslik) return NextResponse.json({ error: "Başlık zorunlu" }, { status: 400 });

  const now = new Date().toISOString();
  const product: Product = {
    ...body,
    id: uuid(),
    slug: body.slug || slugify(body.baslik),
    olusturulma_tarihi: now,
    guncelleme_tarihi: now,
    para_birimi: "TRY",
  };
  await upsertProduct(product);
  return NextResponse.json(product, { status: 201 });
}
