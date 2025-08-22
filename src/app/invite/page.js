"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function InviteContent() {
  const searchParams = useSearchParams();
  const fid = searchParams.get("fid");

  const referralLink = fid
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/?ref=${fid}`
    : `${process.env.NEXT_PUBLIC_SITE_URL}`;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-purple-900 to-black text-white">
      <h1 className="text-2xl font-bold mb-4">Invite Friends 🚀</h1>

      <div className="w-full max-w-md bg-purple-800/30 border border-purple-600 rounded-xl p-4 text-center">
        <p className="mb-4">Share this link with your friends:</p>
        <input
          type="text"
          readOnly
          value={referralLink}
          className="w-full px-3 py-2 rounded bg-black/40 border border-purple-600 text-yellow-300 font-mono text-sm"
        />
        <button
          className="mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white"
          onClick={() => {
            navigator.clipboard.writeText(referralLink);
            alert("Referral link copied! 🚀");
          }}
        >
          Copy Link
        </button>
      </div>
    </main>
  );
}

export default function InvitePage() {
  return (
    <Suspense fallback={<p className="text-center text-gray-400">Loading...</p>}>
      <InviteContent />
    </Suspense>
  );
}
