import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const fid = searchParams.get("fid");
  const email = searchParams.get("email");

  if (!fid && !email) {
    return NextResponse.json(
      { error: "Missing identifier (fid or email required)" },
      { status: 400 }
    );
  }

  // --- 1) Find user by fid or email ---
  let query = supabase.from("waitlist").select("created_at").single();
  if (fid) query = query.eq("fid", fid);
  if (email) query = query.eq("email", email);

  const { data: user, error: userErr } = await query;

  if (userErr || !user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // --- 2) Count how many joined before them ---
  const { count: aheadCount } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true })
    .lt("created_at", user.created_at);

  // --- 3) Count total users ---
  const { count: totalCount } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true });

  const position = (aheadCount ?? 0) + 1;

  return NextResponse.json({
    position,
    total: totalCount ?? position,
  });
}
