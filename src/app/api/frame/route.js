import { NextResponse } from "next/server";

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const ref = searchParams.get("ref"); // optional referral

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return NextResponse.json({
    type: "frame",
    version: "vNext",
    image: `${baseUrl}/frame-image.png`,
    buttons: [
      { label: "🚀 Join Waitlist", action: "post", target: `${baseUrl}/api/join${ref ? `?ref=${ref}` : ""}` },
      { label: "🔍 Check Position", action: "post", target: `${baseUrl}/api/position` },
    ],
    post_url: `${baseUrl}/api/frame`,
  });
}
