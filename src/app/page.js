"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [votedYes, setVotedYes] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleJoinWaitlist = async () => {
    if (!votedYes || !email.trim()) return;

    setIsSubmitting(true);

    // Insert vote and email into Supabase
    const { error } = await supabase
      .from("waitlist")
      .insert([{ vote: "yes", email: email.trim() }]);

    if (error) {
      console.error(
        "Supabase insert error:",
        error.message || "No message",
        error.details || "No details",
        error.hint || "No hint"
      );
      setIsSubmitting(false);
      return; // Stop navigation if insert fails
    }

    // Redirect to success page with email parameter
    router.push(`/join-success?email=${encodeURIComponent(email.trim())}`);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-purple-900 to-black text-white">
      {/* Headline */}
      <h1 className="text-4xl font-bold text-center mb-6">
        Ringer is Coming to Farcaster...
      </h1>

      {/* Subheading */}
      <p className="text-lg text-center max-w-2xl mb-10 opacity-80">
        Imagine a way to connect on Farcaster that&apos;s faster, smarter, and more personal than anything before.
        <br />
        We call it <strong>Farcaster Ringer</strong> — Never miss a moment.
      </p>

      {/* Mystery Teaser */}
      <div className="bg-purple-800/40 border border-purple-500 rounded-xl p-4 text-center max-w-md mb-10">
        <p className="text-sm opacity-75">
          <em>For early eyes only.</em>{" "}
          Vote now to unlock the inside scoop and secure your spot before launch.
        </p>
      </div>

      {/* Voting Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          className="px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition"
          onClick={() => setVotedYes(true)}
        >
          👍 Yes, I&apos;d use this
        </button>
        <button
          className="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition"
          onClick={() => {
            setVotedYes(false);
            supabase.from("waitlist").insert([{ vote: "no" }]); // Track "no" vote
            router.push("/sorry");
          }}
        >
          👎 Not for me
        </button>
      </div>

      {/* Email Input - Shows only after voting Yes */}
      {votedYes && (
        <div className="w-full max-w-md mb-6">
          <input
            type="email"
            placeholder="Enter your email to join the waitlist"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-purple-800/50 border border-purple-500 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
      )}

      {/* Join Waitlist */}
      <button
        className={`px-8 py-4 font-bold rounded-lg transition ${
          votedYes && email.trim() && !isSubmitting
            ? "bg-yellow-500 text-black hover:bg-yellow-400"
            : "bg-gray-500 text-gray-300 cursor-not-allowed"
        }`}
        disabled={!votedYes || !email.trim() || isSubmitting}
        onClick={handleJoinWaitlist}
      >
        {isSubmitting ? "Joining..." : "Join Waitlist"}
      </button>

      {/* Footer Note */}
      <p className="mt-8 text-xs opacity-50 text-center max-w-sm">
        This is a private early-access campaign. Please do not share details publicly.
      </p>
    </main>
  );
}