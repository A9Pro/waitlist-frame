"use client";
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import WaitlistPosition from '../../components/WaitlistPosition';
import Link from 'next/link';

function CheckPositionContent() {
  const searchParams = useSearchParams();
  const fidFromUrl = searchParams.get('fid');

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-b from-purple-900 to-black text-white text-center">
      <h1 className="text-4xl font-bold mb-6 text-blue-400">Check Your Waitlist Position</h1>
      <p className="mb-8 opacity-80 text-lg">Enter your FID or check via URL parameter</p>

      <div className="w-full max-w-md">
        <WaitlistPosition fidFromAuth={fidFromUrl || undefined} />
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="text-purple-300 hover:text-white underline"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}

export default function CheckPositionPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center text-white bg-gradient-to-b from-purple-900 to-black">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <div>Loading...</div>
        </div>
      </div>
    }>
      <CheckPositionContent />
    </Suspense>
  );
}