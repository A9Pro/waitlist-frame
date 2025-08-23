// src/app/layout.js
"use client";
import { AuthKitProvider } from "@farcaster/auth-kit";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthKitProvider config={{ rpcUrl: "https://mainnet.optimism.io" }}>
          {children}
        </AuthKitProvider>
      </body>
    </html>
  );
}
