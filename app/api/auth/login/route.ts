import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkCredentials, makeToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  if (!checkCredentials(username, password)) {
    return NextResponse.json({ error: "Geçersiz kullanıcı adı veya şifre" }, { status: 401 });
  }
  const token = makeToken(username);
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return NextResponse.json({ ok: true });
}
