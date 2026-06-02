import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { generateImage, IMAGE_PROMPTS, type ImagePromptKey } from "@/lib/fal-ai";

export async function POST(req: Request) {
  if (!isAuthenticated()) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  const body = await req.json();
  let prompt: string = body.prompt;
  if (!prompt && body.key && IMAGE_PROMPTS[body.key as ImagePromptKey]) {
    prompt = IMAGE_PROMPTS[body.key as ImagePromptKey];
  }
  if (!prompt) return NextResponse.json({ error: "prompt veya key gerekli" }, { status: 400 });

  try {
    const urls = await generateImage({
      prompt,
      width: body.width,
      height: body.height,
      num_images: body.num_images,
    });
    return NextResponse.json({ urls });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "fal.ai hatası" }, { status: 500 });
  }
}

export const runtime = "nodejs";
export const maxDuration = 60;
