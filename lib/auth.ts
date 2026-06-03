import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE = "nuwela_admin";
const SECRET = process.env.ADMIN_SESSION_SECRET || "nuwela-fallback-secret";

function sign(value: string): string {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

export function makeToken(username: string): string {
  const payload = `${username}:${Date.now()}`;
  return `${Buffer.from(payload).toString("base64url")}.${sign(payload)}`;
}

export function verifyToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [b64, sig] = token.split(".");
  if (!b64 || !sig) return false;
  try {
    const payload = Buffer.from(b64, "base64url").toString("utf-8");
    return sign(payload) === sig;
  } catch {
    return false;
  }
}

export function isAuthenticated(): boolean {
  const c = cookies().get(COOKIE)?.value;
  return verifyToken(c);
}

export function checkCredentials(username: string, password: string): boolean {
  const u = process.env.ADMIN_USERNAME || "admin";
  const p = process.env.ADMIN_PASSWORD || "";
  return username === u && password === p && p.length > 0;
}

export const COOKIE_NAME = COOKIE;

export function getTokenFromReq(req: Request): string | undefined {
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.split(";").map((c) => c.trim()).find((c) => c.startsWith(`${COOKIE}=`));
  return match ? match.split("=").slice(1).join("=") : undefined;
}
