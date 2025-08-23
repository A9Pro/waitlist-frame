"use client";

import { AuthKitProvider, useAuthKit } from "@farcaster/auth-kit";
import { useState } from "react";

export default function Page() {
  return (
    <AuthKitProvider>
      <Home />
    </AuthKitProvider>
  );
}

function Home() {
  const { isAuthenticated, user, signIn, signOut } = useAuthKit();
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">🚀 Farcaster Auth Demo</h1>

      {!isAuthenticated ? (
        <button
          onClick={async () => {
            setLoading(true);
            try {
              await signIn();
            } catch (err) {
              console.error(err);
            }
            setLoading(false);
          }}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded-md"
        >
          {loading ? "Connecting..." : "Login with Farcaster"}
        </button>
      ) : (
        <div className="text-center">
          <p className="mb-4">✅ Logged in as: {user?.username}</p>
          <button
            onClick={signOut}
            className="px-4 py-2 bg-gray-700 text-white rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
