import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fid = searchParams.get("fid");
    
    if (!fid) {
      return NextResponse.json({ error: "Missing fid parameter" }, { status: 400 });
    }

    // Get total count
    const { count: total } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    // Find user's position (1-indexed)
    const { data: userRecord } = await supabase
      .from("waitlist")
      .select("created_at")
      .eq("fid", fid)
      .single();

    if (!userRecord) {
      return NextResponse.json({ error: "User not found in waitlist" }, { status: 404 });
    }

    // Count how many users joined before this user
    const { count: beforeCount } = await supabase
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .lt("created_at", userRecord.created_at);

    const position = (beforeCount || 0) + 1;

    return NextResponse.json({ 
      position, 
      total: total || 0 
    });
  } catch (error) {
    console.error("Position API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}