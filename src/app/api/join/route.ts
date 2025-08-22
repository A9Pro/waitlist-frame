import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { fid }: { fid: string } = await req.json();

    if (!fid) {
      return NextResponse.json({ error: "Missing fid" }, { status: 400 });
    }

    // Insert only if not exists (idempotent)
    const { error } = await supabase
      .from("waitlist")
      .upsert({ fid }, { onConflict: "fid" });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
  console.error('Join API error:', error);  // Now we're using the error
  return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
}
}