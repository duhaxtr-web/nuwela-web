import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import path from "path";
import fs from "fs/promises";

export async function POST(req: Request) {
  if (!isAuthenticated()) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Dosya yok" }, { status: 400 });

  // Vercel Blob varsa kullan, yoksa public/uploads/ klasörüne kaydet
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const blob = await put(`products/${safeName}`, file, {
      access: "public",
      addRandomSuffix: false,
    });
    return NextResponse.json({ url: blob.url });
  }

  // Local fallback: public/uploads/
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadsDir, safeName), buffer);
  return NextResponse.json({ url: `/uploads/${safeName}` });
}

export const runtime = "nodejs";
export const maxDuration = 30;
