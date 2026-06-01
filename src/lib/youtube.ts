export function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/live\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function buildEmbedUrl(videoId: string, timestampSeconds?: number): string {
  const base = `https://www.youtube.com/embed/${videoId}`;
  const params = new URLSearchParams();
  if (timestampSeconds && timestampSeconds > 0) {
    params.set("start", String(timestampSeconds));
  }
  params.set("rel", "0");
  return `${base}?${params.toString()}`;
}

export async function fetchVideoTitle(url: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.title ?? null;
  } catch {
    return null;
  }
}

// Último video subido al canal, vía el feed RSS público (sin API key).
export async function getLatestVideoId(): Promise<string | null> {
  try {
    const res = await fetch(
      "https://www.youtube.com/feeds/videos.xml?channel_id=UCxENqnnNPigauO91jVmEcXA",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const xml = await res.text();
    const match = xml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export function formatTimestamp(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}
