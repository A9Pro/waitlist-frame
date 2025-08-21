"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function JoinSuccessContent() {
  const searchParams = useSearchParams();
  const [fid, setFid] = useState<string | null>(null);
  const [position, setPosition] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const qFid = searchParams.get("fid");
    setFid(qFid);
    if (qFid) {
      fetch(`/api/position?fid=${encodeURIComponent(qFid)}`)
        .then((r) => r.json().then((d) => ({ ok: r.ok, d })))
        .then(({ ok, d }) => {
          if (ok) {
            setPosition(d.position);
            setTotal(d.total);
          } else {
            console.error(d.error);
          }
        })
        .catch((e) => console.error(e))
        .finally(() => setLoading(false));
    } else {
      // Fallback: just show total if there's no fid
      fetch(`/api/position?email=__dummy__`)
        .then((r) => r.json())
        .then((d) => setTotal(d.total ?? null))
        .finally(() => setLoading(false));
    }
  }, [searchParams]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center text-white bg-gradient-to-b from-purple-900 to-black">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div>Getting your waitlist position…</div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-purple-900 to-black text-white text-center">
      <div className="text-6xl mb-6">{position ? "🔥" : "✨"}</div>

      <h1 className="text-4xl font-bold mb-6 text-green-400">
        {position ? `You're #${position} on the waitlist!` : `You're on the Waitlist!`}
      </h1>

      {fid && (
        <p className="text-sm opacity-80 mb-6">FID: <span className="font-mono">{fid}</span></p>
      )}

      <div className="bg-gradient-to-r from-green-800/40 to-blue-800/40 border border-green-500 rounded-xl p-6 max-w-md mb-8">
        <div className="text-2xl font-bold text-green-400 mb-2">{total ?? "…"}</div>
        <p className="text-sm opacity-90">Total users on the waitlist</p>
      </div>

      <Link
        href="/"
        className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition mb-4"
      >
        Back to Home
      </Link>

      <button
        onClick={() => {
          const shareText = position
            ? `I just joined the Farcaster Ringer waitlist! I'm #${position}.`
            : `I just joined the Farcaster Ringer waitlist!`;
          const url = window.location.origin;
          if (navigator.share) {
            navigator.share({ title: "Farcaster Ringer", text: shareText, url });
          } else {
            navigator.clipboard.writeText(`${url}?ref=${fid || "friend"}`);
            alert("Share link copied!");
          }
        }}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
      >
        📤 Share with Friends
      </button>
    </main>
  );
}

export default function JoinSuccess() {
  return (
    <Suspense fallback={
      <main className="flex min-h-screen items-center justify-center text-white bg-gradient-to-b from-purple-900 to-black">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div>Loading...</div>
        </div>
      </main>
    }>
      <JoinSuccessContent />
    </Suspense>
  );
}