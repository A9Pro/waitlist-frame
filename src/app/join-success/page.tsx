"use client";

import WaitlistPosition from "@/components/WaitlistPosition";

export default function JoinSuccessPage() {
  const fidFromAuth = null; // replace with actual FID from Farcaster auth

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-purple-900 to-black text-white text-center">
      <h1 className="text-4xl font-bold mb-6 text-green-400">🎉 You joined the Waitlist!</h1>
      <p className="mb-8 opacity-80 text-lg">Let's check where you stand:</p>

      {/* Position checker component */}
      <div className="w-full max-w-md">
        <WaitlistPosition fidFromAuth={fidFromAuth} />
      </div>

      {/* Optional: Add a back to home link */}
      <div className="mt-8">
        <a 
          href="/" 
          className="text-purple-300 hover:text-white underline"
        >
          ← Back to Home
        </a>
      </div>
    </main>
  );
}