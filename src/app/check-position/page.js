"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function CheckPosition() {
  const searchParams = useSearchParams();
  const [fid, setFid] = useState("");
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Auto-check if fid exists in URL
  useEffect(() => {
    const fidFromUrl = searchParams.get("fid");
    if (fidFromUrl) {
      setFid(fidFromUrl);
      fetchPosition(fidFromUrl);
    }
  }, [searchParams]);

  async function fetchPosition(fidValue) {
    if (!fidValue) return;
    setLoading(true);
    setError(null);
    setPosition(null);

    try {
      const res = await fetch(`/api/position?fid=${encodeURIComponent(fidValue)}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Unable to check position.");
      } else {
        setPosition(data.position);
      }
    } catch (e) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-purple-900 to-black text-white">
      <h1 className="text-2xl font-bold mb-4">Check Your Waitlist Position</h1>

      <div className="w-full max-w-md bg-purple-800/30 border border-purple-600 rounded-xl p-4">
        <label className="block text-sm mb-2 opacity-80">Your Farcaster FID</label>
        <input
          type="text"
          placeholder="e.g. 12345"
          value={fid}
          onChange={(e) => setFid(e.target.value)}
          className="w-full px-3 py-2 rounded bg-black/40 border border-purple-600 outline-none"
        />

        <button
          onClick={() => fetchPosition(fid)}
          disabled={!fid || loading}
          className={`mt-4 w-full px-4 py-3 rounded-lg font-semibold transition
            ${!fid || loading ? "bg-gray-600 cursor-not-allowed" : "bg-yellow-500 text-black hover:bg-yellow-400"}`}
        >
          {loading ? "Checking..." : "Check"}
        </button>

        {loading && <p className="mt-4 text-center">⏳ Fetching your position...</p>}

        {position && (
          <p className="mt-4 text-lg text-center">
            🎉 You are{" "}
            <span className="text-yellow-300 font-bold">
              #{position}
            </span>{" "}
            on the waitlist!
          </p>
        )}

        {error && <p className="mt-4 text-red-300 text-center">{error}</p>}
      </div>
    </main>
  );
}
