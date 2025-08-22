import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const { fid } = await req.json();
    const { searchParams } = new URL(req.url);
    const ref = searchParams.get("ref"); // referral fid

    if (!fid) {
      return NextResponse.json({ error: "Missing fid" }, { status: 400 });
    }

    // Insert or update user
    const { data, error } = await supabase
      .from("waitlist")
      .upsert({ fid }, { onConflict: "fid" })
      .select();

    if (error) throw error;

    // Reward referrer
    if (ref && ref !== fid) {
      await supabase.from("referrals").insert({ referrer: ref, referred: fid });
    }

    const { count } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    const position = count;

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    return NextResponse.json({
      type: "frame",
      version: "vNext",
      image: `${baseUrl}/frame-image.png`,
      buttons: [
        { label: `🎉 You’re #${position}`, action: "post", target: `${baseUrl}/api/position?fid=${fid}` },
        { label: "📈 Leaderboard", action: "link", target: `${baseUrl}/leaderboard` },
        { label: "🔗 Share Invite", action: "link", target: `${baseUrl}/invite?fid=${fid}` },
      ],
      post_url: `${baseUrl}/api/frame`,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 });
  }
}
