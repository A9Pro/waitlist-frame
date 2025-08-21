"use client";

import { useEffect, useState } from "react";

export default function WaitlistPosition({ fidFromAuth }: { fidFromAuth?: string }) {
  const [fid, setFid] = useState(fidFromAuth || "");
  const [position, setPosition] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Auto-fetch if fidFromAuth exists (Farcaster login)
  useEffect(() => {
    if (fidFromAuth) {
      fetchPosition(fidFromAuth);
    }
  }, [fidFromAuth]);

  const fetchPosition = async (fidValue: string) => {
    if (!fidValue) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/position?fid=${fidValue}`);
      const data = await res.json();
      if (res.ok) {
        setPosition(data.position);
      } else {
        console.error("Error fetching position:", data.error);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {/* Auto-detect mode */}
      {fidFromAuth ? (
        <div>
          <p className="text-lg font-semibold">Welcome back 👋</p>
          {loading ? (
            <p>Fetching your position...</p>
          ) : position !== null ? (
            <p>You're <span className="font-bold">#{position}</span> in line 🚀</p>
          ) : (
            <p>Could not find your position.</p>
          )}
        </div>
      ) : (
        // Manual FID input mode
        <div className="space-y-2">
          <input
            type="text"
            value={fid}
            onChange={(e) => setFid(e.target.value)}
            placeholder="Enter your Farcaster FID"
            className="border rounded p-2 w-full"
          />
          <button
            onClick={() => fetchPosition(fid)}
            disabled={!fid || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {loading ? "Checking..." : "Check Position"}
          </button>

          {position !== null && (
            <p>
              You're <span className="font-bold">#{position}</span> in line 🎉
            </p>
          )}
        </div>
      )}
    </div>
  );
}