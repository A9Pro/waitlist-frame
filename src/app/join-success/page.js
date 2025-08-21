"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function JoinSuccess() {
  const [position, setPosition] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [fid, setFid] = useState("");
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fidParam = searchParams.get("fid");
    if (fidParam) {
      setFid(fidParam);
      fetchUserPosition(fidParam);
    } else {
      fetchTotalUsers();
    }
  }, [searchParams]);

  const fetchUserPosition = async (fid) => {
    try {
      const res = await fetch(`/api/position?fid=${encodeURIComponent(fid)}`);
      const data = await res.json();

      if (res.ok) {
        setPosition(data.position);
        setTotalUsers(data.total);
      } else {
        console.error("API error:", data.error);
        fetchTotalUsers();
      }
    } catch (err) {
      console.error("Network error:", err);
      fetchTotalUsers();
    } finally {
      setLoading(false);
    }
  };

  const fetchTotalUsers = async () => {
    try {
      const res = await fetch(`/api/position?fid=__dummy__`);
      const data = await res.json();
      setTotalUsers(data.total || 0);
    } catch (err) {
      console.error("Error fetching total:", err);
    } finally {
      setLoading(false);
    }
  };

  const getPositionText = () => {
    if (position === 1) return "🥇 You're FIRST on the waitlist!";
    if (position === 2) return "🥈 You're #2 on the waitlist!";
    if (position === 3) return "🥉 You're #3 on the waitlist!";
    if (position <= 10) return `🔥 You're #${position} on the waitlist!`;
    if (position <= 50) return `⚡ You're #${position} on the waitlist!`;
    if (position <= 100) return `🚀 You're #${position} on the waitlist!`;
    return `🎯 You're #${position} on the waitlist!`;
  };

  const getPositionEmoji = () => {
    if (position === 1) return "🎉";
    if (position <= 10) return "🔥";
    if (position <= 50) return "⚡";
    if (position <= 100) return "🚀";
    return "✨";
  };

  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-purple-900 to-black text-white text-center">
        <div className="animate-spin text-4xl mb-4">⏳</div>
        <p className="text-lg opacity-80">Getting your waitlist position...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-purple-900 to-black text-white text-center">
      {/* Success Animation */}
      <div className="text-6xl mb-6 animate-bounce">{getPositionEmoji()}</div>

      {/* Position Announcement */}
      {position ? (
        <h1 className="text-4xl font-bold mb-6 text-green-400">
          {getPositionText()}
        </h1>
      ) : (
        <h1 className="text-4xl font-bold mb-6 text-green-400">
          🎉 You&apos;re on the Waitlist!
        </h1>
      )}

      {/* User FID */}
      {fid && (
        <p className="text-lg mb-4 opacity-90">
          Welcome, <strong>FID {fid}</strong>!
        </p>
      )}

      {/* Waitlist Stats */}
      <div className="bg-gradient-to-r from-green-800/40 to-blue-800/40 border border-green-500 rounded-xl p-6 max-w-md mb-8">
        <div className="text-2xl font-bold text-green-400 mb-2">
          {totalUsers || "..."}
        </div>
        <p className="text-sm opacity-90">Total users joined the waitlist</p>
        {position && position <= 100 && (
          <p className="text-xs opacity-75 mt-2">
            🎁 Top 100 users get exclusive early access!
          </p>
        )}
      </div>

      {/* Main Message */}
      <p className="text-lg max-w-xl mb-8 opacity-90">
        Congratulations — you&apos;ve secured your early-access spot for{" "}
        <strong>Farcaster Ringer</strong>.
        <br />
        You&apos;ll be among the first to know when we launch.
      </p>

      {/* Sharing Incentive */}
      <div className="bg-purple-800/40 border border-purple-500 rounded-xl p-4 max-w-md mb-8">
        <p className="text-sm opacity-75 mb-3">
          💡 <strong>Want to move up the list?</strong>
        </p>
        <p className="text-xs opacity-60">
          Share with friends who might be interested. The more early adopters,
          the better we can make Farcaster Ringer!
        </p>
      </div>

      {/* Social Proof */}
      {totalUsers && totalUsers > 10 && (
        <div className="bg-purple-900/30 rounded-xl p-4 border border-purple-600 w-full max-w-sm mb-10">
          <p className="text-sm opacity-60">
            👥 {totalUsers} users are already building the future of Farcaster
            together
          </p>
        </div>
      )}

      {/* Back to Home */}
      <Link
        href="/"
        className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition mb-4"
      >
        Back to Home
      </Link>

      {/* ✅ New: Check Position Again */}
<Link
  href={`/check-position?fid=${fid}`}
  className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition mb-4"
>
  🔍 Check Your Position Again
</Link>


      {/* Share Button */}
      <button
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: "Farcaster Ringer - Early Access",
              text: `I just joined the Farcaster Ringer waitlist! ${
                position ? `I'm #${position}!` : ""
              } Join me:`,
              url: window.location.origin,
            });
          } else {
            navigator.clipboard.writeText(
              `${window.location.origin}?ref=${fid}`
            );
            alert("Link copied to clipboard!");
          }
        }}
        className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition text-sm"
      >
        📤 Share with Friends
      </button>

      {/* Footer */}
      <p className="mt-8 text-xs opacity-50 max-w-sm">
        Keep an eye on your inbox for updates. We can&apos;t wait to show you
        what&apos;s next.
      </p>
    </main>
  );
}
