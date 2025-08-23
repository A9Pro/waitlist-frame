"use client";

import React from 'react';
import { AuthKitProvider } from '@farcaster/auth-kit';
import { farcasterConfig } from '../lib/farcaster';

interface FarcasterProviderProps {
  children: React.ReactNode;
}

export function FarcasterProvider({ children }: FarcasterProviderProps) {
  return (
    <AuthKitProvider config={farcasterConfig}>
      {children}
    </AuthKitProvider>
  );
}