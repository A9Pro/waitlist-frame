// src/app/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Waitlist Frame 🚀",
  description: "Join the waitlist and invite friends to climb up!",
  openGraph: {
    title: "Waitlist Frame 🚀",
    description: "Join the waitlist and invite friends to climb up!",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/frame-image.png`],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:post_url": `${process.env.NEXT_PUBLIC_SITE_URL}/api/frame`,
    "fc:frame:image": `${process.env.NEXT_PUBLIC_SITE_URL}/frame-image.png`,
    "fc:frame:button:1": "🚀 Join Waitlist",
    "fc:frame:button:2": "🔍 Check Position",
    "fc:frame:button:3": "🤝 Invite Friends",
  },
};

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">🚀 Waitlist Frame</h1>
      <p className="mt-2 text-lg">
        Share this link on Warpcast to activate the frame:
      </p>
      <pre className="mt-4 bg-gray-900 text-white p-2 rounded">
        {process.env.NEXT_PUBLIC_SITE_URL}
      </pre>
    </main>
  );
}
