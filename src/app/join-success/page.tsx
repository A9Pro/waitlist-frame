"use client";

import WaitlistPosition from "@/components/WaitlistPosition";

export default function JoinSuccessPage() {
  // If you’re using Neynar Farcaster login, you’ll usually have the user’s FID
  // from auth context/session. For now we’ll fake it:
  const fidFromAuth = null; // replace with actual FID from Farcaster auth

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-purple-900 to-black text-white text-center">
      <h1 className="text-4xl font-bold mb-6 text-green-400">🎉 You joined the Waitlist!</h1>
      <p className="mb-6 opacity-80">Let’s check where you stand:</p>

      {/* Here’s the new position checker (auto or manual) */}
      <WaitlistPosition fidFromAuth={fidFromAuth} />
    </main>
  );
}
