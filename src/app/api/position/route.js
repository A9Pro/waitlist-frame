// src/app/api/position/route.js
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

  // --- 1) Get the user row (by fid or email) ---
  const { data: user, error: userErr } = await supabase
    .from("waitlist")
    .select("created_at")
    .eq(fid ? "fid" : "email", fid || email)
    .single();

  if (userErr || !user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // --- 2) Count how many signed up before them ---
  const { count: aheadCount, error: countErr } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true })
    .lt("created_at", user.created_at);

  if (countErr) {
    return NextResponse.json(
      { error: "Count failed", details: countErr.message },
      { status: 500 }
    );
  }

  // --- 3) Count total waitlist users ---
  const { count: totalCount, error: totalErr } = await supabase
    .from("waitlist")
    .select("*", { count: "exact", head: true });

  if (totalErr) {
    return NextResponse.json(
      { error: "Total count failed", details: totalErr.message },
      { status: 500 }
    );
  }

  const position = (aheadCount ?? 0) + 1;

  return NextResponse.json({
    position,
    total: totalCount ?? 0,
  });
}
