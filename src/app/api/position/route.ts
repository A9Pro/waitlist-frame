import { NextRequest, NextResponse } from 'next/server';

interface WaitlistEntry {
  fid: string;
  position: number;
  joinedAt: string;
}

// In-memory storage (replace with database in production)
const waitlist: WaitlistEntry[] = [
  // Example entries for testing
  { fid: "12345", position: 1, joinedAt: new Date().toISOString() },
  { fid: "67890", position: 2, joinedAt: new Date().toISOString() },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fid = searchParams.get('fid');

    if (!fid) {
      return NextResponse.json(
        { error: 'FID parameter is required' },
        { status: 400 }
      );
    }

    // Validate FID format (should be numeric)
    if (!/^\d+$/.test(fid)) {
      return NextResponse.json(
        { error: 'FID must be a valid number' },
        { status: 400 }
      );
    }

    // Find user in waitlist
    const userEntry = waitlist.find(entry => entry.fid === fid);

    if (!userEntry) {
      return NextResponse.json(
        { error: 'FID not found in waitlist. Please make sure you have joined the waitlist.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      position: userEntry.position,
      total: waitlist.length,
      fid: userEntry.fid,
      joinedAt: userEntry.joinedAt
    });

  } catch (error) {
    console.error('Position API error:', error);
    return NextResponse.json(
      { error: 'Internal server error occurred' },
      { status: 500 }
    );
  }
}