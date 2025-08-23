// src/lib/farcaster.ts
import { createConfig } from '@farcaster/auth-kit';

export const farcasterConfig = createConfig({
  rpcUrl: 'https://mainnet.optimism.io',
  domain: process.env.NODE_ENV === 'production' 
    ? 'waitlist-frame-six.vercel.app' 
    : 'localhost:3000',
  siweUri: process.env.NODE_ENV === 'production' 
    ? 'https://waitlist-frame-six.vercel.app' 
    : 'http://localhost:3000',
});