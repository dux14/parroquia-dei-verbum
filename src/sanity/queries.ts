import { projectId } from "./env";

export interface SanityHomily {
  youtubeUrl: string;
  timestamp: number;
  date: string;
  scriptureRef: string | null;
  notes: string | null;
}

export async function getLatestHomilies(limit = 6): Promise<SanityHomily[]> {
  if (!projectId) return [];
  try {
    const { client } = await import("./client");
    return await client.fetch(
      `*[_type == "homily"] | order(date desc)[0...$limit]{
        youtubeUrl, timestamp, date, scriptureRef, notes
      }`,
      { limit }
    );
  } catch {
    return [];
  }
}
