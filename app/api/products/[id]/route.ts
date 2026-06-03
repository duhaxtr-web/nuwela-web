import { NextResponse } from "next/server";
import { verifyToken, getTokenFromReq } from "@/lib/auth";
import { getProductById, upsertProduct, deleteProduct } from "@/lib/store";
import type { Product } from "@/types/product";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  if (!product) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    if (!verifyToken(getTokenFromReq(req))) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    const existing = await getProductById(params.id);
    if (!existing) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
    const body = (await req.json()) as Partial<Product>;
    const updated: Product = {
      ...existing,
      ...body,
      id: existing.id,
      olusturulma_tarihi: existing.olusturulma_tarihi,
      guncelleme_tarihi: new Date().toISOString(),
      para_birimi: "TRY",
    };
    await upsertProduct(updated);
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[products PUT] failed:", err);
    return NextResponse.json({ error: "Hata: " + (err instanceof Error ? err.message : String(err)) }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    if (!verifyToken(getTokenFromReq(_req))) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
    await deleteProduct(params.id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[products DELETE] failed:", err);
    return NextResponse.json({ error: "Silme hatası: " + (err instanceof Error ? err.message : String(err)) }, { status: 500 });
  }
}
