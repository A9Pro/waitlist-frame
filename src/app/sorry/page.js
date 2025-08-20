"use client";

export default function Sorry() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-purple-900 to-black text-white">
      {/* Headline */}
      <h1 className="text-4xl font-bold text-center mb-6">
        We’re sorry to hear that...
      </h1>

      {/* Subheading */}
      <p className="text-lg text-center max-w-2xl mb-10 opacity-80">
        It seems <strong>Farcaster Ringer</strong> isn’t your thing right now — and that’s totally okay.
      </p>

      {/* Message Box */}
      <div className="bg-purple-800/40 border border-purple-500 rounded-xl p-4 text-center max-w-md mb-10">
        <p className="text-sm opacity-75">
          You can try again in <strong>2 hours</strong> if you change your mind.  
          We’d love to have you join us when the time is right.
        </p>
      </div>

      {/* Retry Button */}
      <button
        className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition"
        onClick={() => window.location.href = "/"}
      >
        Return to Home
      </button>

      {/* Footer Note */}
      <p className="mt-8 text-xs opacity-50 text-center max-w-sm">
        Thank you for your honesty. We appreciate your feedback and hope to see you soon.
      </p>
    </main>
  );
}
