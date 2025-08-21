"use client";

import { useEffect, useState } from "react";

interface WaitlistPositionProps {
  fidFromAuth?: string;
}

interface PositionResponse {
  position: number;
  total?: number;
  error?: string;
}

export default function WaitlistPosition({ fidFromAuth }: WaitlistPositionProps) {
  const [fid, setFid] = useState(fidFromAuth || "");
  const [position, setPosition] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-fetch if fidFromAuth exists (Farcaster login)
  useEffect(() => {
    if (fidFromAuth) {
      fetchPosition(fidFromAuth);
    }
  }, [fidFromAuth]);

  const fetchPosition = async (fidValue: string) => {
    if (!fidValue) return;
    
    setLoading(true);
    setError(null);
    setPosition(null);
    
    try {
      const res = await fetch(`/api/position?fid=${encodeURIComponent(fidValue)}`);
      const data: PositionResponse = await res.json();
      
      if (res.ok && typeof data.position === 'number') {
        setPosition(data.position);
      } else {
        const errorMessage = data.error || 'Could not find your position';
        setError(errorMessage);
        console.error("Error fetching position:", errorMessage);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Network error occurred';
      setError(errorMessage);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckPosition = () => {
    fetchPosition(fid);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFid(e.target.value);
    // Clear previous results when user starts typing
    if (position !== null || error) {
      setPosition(null);
      setError(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Auto-detect mode */}
      {fidFromAuth ? (
        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
          <p className="text-lg font-semibold mb-4">Welcome back 👋</p>
          
          {loading ? (
            <div className="space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600">Fetching your position...</p>
            </div>
          ) : error ? (
            <div className="text-red-600">
              <p className="font-medium">⚠️ {error}</p>
              <button 
                onClick={() => fetchPosition(fidFromAuth)}
                className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : position !== null ? (
            <div className="space-y-2">
              <p className="text-xl">
                You&apos;re <span className="font-bold text-blue-600">#{position}</span> in line 🚀
              </p>
              <p className="text-sm text-gray-600">
                We&apos;ll notify you when it&apos;s your turn!
              </p>
            </div>
          ) : null}
        </div>
      ) : (
        // Manual FID input mode
        <div className="space-y-4 max-w-md mx-auto">
          <div className="space-y-2">
            <label htmlFor="fid-input" className="block text-sm font-medium text-gray-700">
              Check Your Waitlist Position
            </label>
            <input
              id="fid-input"
              type="text"
              value={fid}
              onChange={handleInputChange}
              placeholder="Enter your Farcaster FID"
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              disabled={loading}
            />
            <p className="text-xs text-gray-500">
              Your FID is your unique Farcaster identifier number
            </p>
          </div>

          <button
            onClick={handleCheckPosition}
            disabled={!fid.trim() || loading}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Checking...
              </span>
            ) : (
              "Check Position"
            )}
          </button>

          {/* Results */}
          {position !== null && (
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-lg">
                You&apos;re <span className="font-bold text-green-600">#{position}</span> in line 🎉
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Thanks for joining our waitlist!
              </p>
            </div>
          )}

          {error && (
            <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 font-medium">⚠️ {error}</p>
              <button 
                onClick={handleCheckPosition}
                className="mt-2 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}