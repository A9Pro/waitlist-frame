"use client";

import { useState, useEffect } from 'react';
import { useProfile, useSignIn } from '@farcaster/auth-kit';

export default function FarcasterWaitlist() {
  const [stats, setStats] = useState({ total: 0, isJoined: false });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { isAuthenticated, profile } = useProfile();
  const { signIn, isSuccess, isError, data } = useSignIn({
    onSuccess: ({ fid, username }) => {
      console.log('Sign in successful:', { fid, username });
      setMessage('Successfully signed in!');
    },
    onError: (error) => {
      console.error('Sign in error:', error);
      setMessage('Failed to sign in. Please try again.');
    }
  });

  // Fetch stats when component mounts or auth state changes
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/waitlist/stats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fid: profile?.fid || data?.fid }),
        });
        
        if (response.ok) {
          const responseData = await response.json();
          setStats(responseData);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Fallback to basic stats
        setStats({ total: 1247, isJoined: false });
      }
    };

    fetchStats();
  }, [isAuthenticated, profile?.fid, data?.fid]);

  const handleJoinWaitlist = async () => {
    const userFid = profile?.fid || data?.fid;
    const userName = profile?.username || data?.username;
    const displayName = profile?.displayName || data?.displayName;
    const pfpUrl = profile?.pfpUrl || data?.pfpUrl;

    if (!isAuthenticated || !userFid) {
      setMessage('Please sign in with Farcaster first');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/waitlist/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fid: userFid,
          username: userName,
          displayName: displayName,
          pfpUrl: pfpUrl,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setStats(prev => ({
          ...prev,
          position: responseData.position,
          total: responseData.total,
          isJoined: true,
        }));
        setMessage('Successfully joined the waitlist!');
      } else {
        setMessage(responseData.error || 'Failed to join waitlist');
      }
    } catch (error) {
      console.error('Error joining waitlist:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Farcaster Ringer
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join the exclusive waitlist for early access to the next generation 
            of Farcaster tools and experiences.
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
          {/* Stats */}
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-white mb-2">
              {stats.total} members
            </div>
          </div>

              {/* User Section */}
          {isAuthenticated && (profile || data) ? (
            <div className="space-y-6">
              {/* User Profile */}
              <div className="flex items-center space-x-3 p-4 bg-white/10 rounded-xl">
                {(profile?.pfpUrl || data?.pfpUrl) && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={profile?.pfpUrl || data?.pfpUrl} 
                    alt={(profile?.displayName || data?.displayName) || (profile?.username || data?.username)} 
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <div>
                  <p className="text-white font-semibold">
                    {(profile?.displayName || data?.displayName) || (profile?.username || data?.username)}
                  </p>
                  <p className="text-blue-200 text-sm">@{profile?.username || data?.username}</p>
                </div>
              </div>

              {/* Action Button */}
              {stats.isJoined ? (
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-2">You&apos;re In! 🎉</div>
                  <p className="text-blue-200">We&apos;ll notify you when it&apos;s time!</p>
                </div>
              ) : (
                <button
                  onClick={handleJoinWaitlist}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? 'Joining...' : 'Join Waitlist'}
                </button>
              )}
            </div>
          ) : (
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold text-white mb-2">Ready to Join?</h3>
              <p className="text-blue-200 mb-6">
                Sign in with your Farcaster account to secure your spot.
              </p>
              <button
                onClick={() => signIn()}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 disabled:opacity-50"
              >
                {loading ? 'Connecting...' : 'Sign in with Farcaster'}
              </button>
            </div>
          )}

          {/* Message */}
          {message && (
            <div className={`mt-4 p-3 rounded-lg text-center text-sm ${
              message.includes('Success') 
                ? 'bg-green-500/20 text-green-200' 
                : 'bg-red-500/20 text-red-200'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}