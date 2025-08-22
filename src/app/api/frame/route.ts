import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET → shows preview of your frame
export async function GET() {
  return NextResponse.json({
    type: "frame",
    version: "vNext",
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/frame-image.png`,
    buttons: [
      { label: "🚀 Join Waitlist", action: "post", target: "/api/frame" },
      { label: "🔍 Check Position", action: "post", target: "/api/frame" },
    ],
    post_url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/frame`
  });
}

// POST → handles button clicks
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const buttonIndex = body.buttonIndex; // 1 = first button, 2 = second
    const fid = body.untrustedData?.fid; // Get user's Farcaster ID

    if (buttonIndex === 1) {
      // 🚀 Join Waitlist button clicked
      if (fid) {
        // Add user to waitlist via Supabase
        const { error } = await supabase
          .from("waitlist")
          .upsert({ fid }, { onConflict: "fid" });

        if (error) {
          console.error("Supabase error:", error);
          return NextResponse.json({
            type: "frame",
            version: "vNext",
            image: `${process.env.NEXT_PUBLIC_SITE_URL}/frame-image.png`,
            buttons: [
              { label: "❌ Error - Try Again", action: "post", target: "/api/frame" }
            ]
          });
        }

        // Success - show confirmation
        return NextResponse.json({
          type: "frame",
          version: "vNext",
          image: `${process.env.NEXT_PUBLIC_SITE_URL}/frame-image.png`,
          buttons: [
            { label: "✅ Successfully Joined!", action: "link", target: `${process.env.NEXT_PUBLIC_SITE_URL}/join-success` },
            { label: "🔍 Check My Position", action: "post", target: "/api/frame" }
          ]
        });
      }
    }

    if (buttonIndex === 2) {
      // 🔍 Check Position button clicked
      return NextResponse.json({
        type: "frame",
        version: "vNext",
        image: `${process.env.NEXT_PUBLIC_SITE_URL}/frame-image.png`,
        buttons: [
          { label: "➡️ View Your Position", action: "link", target: `${process.env.NEXT_PUBLIC_SITE_URL}/check-position?fid=${fid}` }
        ]
      });
    }

    // Default response (if no buttonIndex or unknown button)
    return NextResponse.json({
      type: "frame",
      version: "vNext",
      image: `${process.env.NEXT_PUBLIC_SITE_URL}/frame-image.png`,
      buttons: [
        { label: "🚀 Join Waitlist", action: "post", target: "/api/frame" },
        { label: "🔍 Check Position", action: "post", target: "/api/frame" }
      ]
    });

  } catch (error) {
    console.error("Frame POST error:", error);
    return NextResponse.json({
      type: "frame",
      version: "vNext", 
      image: `${process.env.NEXT_PUBLIC_SITE_URL}/frame-image.png`,
      buttons: [
        { label: "❌ Error - Try Again", action: "post", target: "/api/frame" }
      ]
    });
  }
}