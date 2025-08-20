import Link from 'next/link';

export default function JoinSuccess() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-purple-900 to-black text-white text-center">
      {/* Success Message */}
      <h1 className="text-4xl font-bold mb-6 text-green-400">
        🎉 You're on the Waitlist!
      </h1>

      <p className="text-lg max-w-xl mb-8 opacity-90">
        Congratulations — you've secured your early-access spot for <strong>Farcaster Ringer</strong>.
        <br />
        You'll be among the first to know when we launch.
      </p>

      {/* Community Section */}
      <div className="bg-purple-800/40 border border-purple-500 rounded-xl p-4 max-w-md mb-8">
        <p className="text-sm opacity-75">
          Others are joining too — together, we'll shape the future of how people connect on Farcaster.
        </p>
      </div>

      {/* Placeholder for other users */}
      <div className="bg-purple-900/30 rounded-xl p-4 border border-purple-600 w-full max-w-sm mb-10">
        <p className="text-sm opacity-60">👥 248 users already joined</p>
      </div>

      {/* Back to Home */}
      <Link
        href="/"
        className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
      >
        Back to Home
      </Link>

      {/* Footer */}
      <p className="mt-8 text-xs opacity-50 max-w-sm">
        Keep an eye on your inbox for updates. We can't wait to show you what's next.
      </p>
    </main>
  );
}