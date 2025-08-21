"use client";
import { useRouter } from "next/navigation";

interface JoinWaitlistButtonProps {
  fid?: string;
}

export default function JoinWaitlistButton({ fid }: JoinWaitlistButtonProps) {
  const router = useRouter();

  const handleJoin = async () => {
    if (!fid) {
      alert("No FID found. Please sign in with Farcaster first.");
      return;
    }

    // 1) Add to waitlist (idempotent)
    const res = await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fid }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error("Join error:", data.error || res.statusText);
      alert("Failed to join waitlist.");
      return;
    }

    // 2) Redirect to success page with FID
    router.push(`/join-success?fid=${encodeURIComponent(fid)}`);
  };

  return (
    <button
      onClick={handleJoin}
      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
    >
      🚀 Join Waitlist
    </button>
  );
}