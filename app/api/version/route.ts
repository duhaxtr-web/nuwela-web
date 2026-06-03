import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    version: "gh-store-v2-409retry",
    deployedAt: "2026-06-03T16:45",
    hasGithubEnv: !!(process.env.GITHUB_TOKEN && process.env.GITHUB_OWNER && process.env.GITHUB_REPO),
  });
}
