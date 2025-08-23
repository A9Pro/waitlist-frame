import { createConfig } from "@farcaster/auth-kit";

export const farcasterConfig = createConfig({
  rpcUrl: "https://mainnet.optimism.io",
  domain:
    process.env.NODE_ENV === "production"
      ? "waitlist-frame-six.vercel.app"
      : "localhost:3000",
  redirectUri: "/auth", // page where Farcaster will redirect back
  siweUri: "/api/siwe", // your Sign-In With Ethereum endpoint
});
