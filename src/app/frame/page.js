import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    title: "Farcaster Ringer Waitlist",
    description: "Join the waitlist 🚀 Be among the first 100 for early access!",

    // Preview image (must live in /public)
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/frame-image.png`,

    // Buttons for Warpcast
    buttons: [
      { label: "🚀 Join Waitlist", action: "post", target: "/api/join" },
      { label: "🔍 Check Position", action: "post", target: "/check-position" },
    ],

    post_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/join`,
  });
}
