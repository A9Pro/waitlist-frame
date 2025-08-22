"use client";

import { useSearchParams } from "next/navigation";

export default function InvitePage() {
  const searchParams = useSearchParams();
  const fid = searchParams.get("fid");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const shareUrl = `${siteUrl}/api/frame?ref=${fid}`;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 to-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🎉 Invite Your Friends!</h1>
      <p className="mb-6 text-lg text-center">
        Share this link — each friend that joins with your link helps you move up the waitlist 🚀
      </p>

      <div className="bg-purple-800/30 border border-purple-600 rounded-xl p-4 w-full max-w-lg">
        <input
          type="text"
          readOnly
          value={shareUrl}
          className="w-full px-3 py-2 rounded bg-black/40 border border-purple-600 text-yellow-300"
        />
        <button
          onClick={() => navigator.clipboard.writeText(shareUrl)}
          className="mt-4 w-full px-4 py-3 rounded-lg font-semibold transition bg-yellow-500 text-black hover:bg-yellow-400"
        >
          📋 Copy Link
        </button>
      </div>
    </main>
  );
}
