// utils/waitlist.js

export async function fetchWaitlistPosition(fid) {
  try {
    const res = await fetch(`/api/position?fid=${fid}`);
    if (!res.ok) throw new Error("Failed to fetch position");
    const data = await res.json();
    return data; // { position, total }
  } catch (err) {
    console.error("Error fetching waitlist position:", err);
    return null;
  }
}
