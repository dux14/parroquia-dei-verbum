import { unstable_cache } from "next/cache";
import { extractVideoId } from "@/lib/youtube";

const CHANNEL_ID = "UCxENqnnNPigauO91jVmEcXA";

// Único intervalo: alinea (a) TTL de caché del scrape, (b) delta de nextCheck
// mientras se sondea, (c) cadencia de re-sondeo del cliente.
const POLL_INTERVAL_SECONDS = 120;

// Colombia es UTC-5 todo el año (sin horario de verano).
const BOGOTA_UTC_OFFSET_HOURS = 5;

// Ventana de misa en hora de Bogotá: Lun–Sáb 17:59–19:30, Dom 11:59–13:30.
// Arranca un minuto antes del inicio real para empezar a sondear a tiempo.
const SUN_START = 11 * 60 + 59;
const SUN_END = 13 * 60 + 30;
const WEEK_START = 17 * 60 + 59;
const WEEK_END = 19 * 60 + 30;

export interface LiveStreamStatus {
  isLive: boolean;
  videoId: string | null;
  nextCheck: string; // ISO 8601
}

type Phase = "asleep" | "polling";

interface BogotaDateParts {
  year: number;
  month: number;
  day: number;
  weekdayIndex: number; // 0 = Sun … 6 = Sat
  minutes: number; // minutos desde medianoche
}

function getBogotaDateParts(now: Date): BogotaDateParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const weekdayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const hour = Number(get("hour"));
  const minute = Number(get("minute"));

  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    weekdayIndex: weekdayMap[get("weekday")] ?? 0,
    minutes: hour * 60 + minute,
  };
}

function windowStartMinutes(weekdayIndex: number): number {
  return weekdayIndex === 0 ? SUN_START : WEEK_START;
}

// Fase pura: dentro de la ventana → "polling"; fuera → "asleep". Sin I/O.
export function getPhase(now: Date): Phase {
  const { weekdayIndex, minutes } = getBogotaDateParts(now);
  if (weekdayIndex === 0) {
    return minutes >= SUN_START && minutes < SUN_END ? "polling" : "asleep";
  }
  return minutes >= WEEK_START && minutes < WEEK_END ? "polling" : "asleep";
}

// Instante absoluto del próximo chequeo. Sondeando → ahora + intervalo.
// Dormido → inicio de la próxima ventana (mismo día aún no iniciada, siguiente
// día hábil, o transición sábado-tarde → domingo-mediodía). Sin I/O.
export function getNextCheck(now: Date): Date {
  if (getPhase(now) === "polling") {
    return new Date(now.getTime() + POLL_INTERVAL_SECONDS * 1000);
  }

  const { year, month, day, weekdayIndex } = getBogotaDateParts(now);
  for (let offset = 0; offset <= 7; offset++) {
    const weekday = (weekdayIndex + offset) % 7;
    const startMin = windowStartMinutes(weekday);
    const candidate = Date.UTC(
      year,
      month - 1,
      day + offset,
      Math.floor(startMin / 60) + BOGOTA_UTC_OFFSET_HOURS,
      startMin % 60
    );
    if (candidate > now.getTime()) {
      return new Date(candidate);
    }
  }

  // Defensivo: nunca debería alcanzarse (siempre hay ventana dentro de 7 días).
  return new Date(now.getTime() + POLL_INTERVAL_SECONDS * 1000);
}

// Scrape sin API key. En vivo sólo si el cuerpo marca isLiveNow/isLive y se
// puede extraer un videoId. Cualquier fallo → no en vivo. Nunca lanza.
async function scrapeLiveStatus(): Promise<{
  isLive: boolean;
  videoId: string | null;
}> {
  try {
    const res = await fetch(
      `https://www.youtube.com/channel/${CHANNEL_ID}/live`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": "es-CO,es",
        },
        cache: "no-store",
      }
    );
    if (!res.ok) return { isLive: false, videoId: null };

    const html = await res.text();
    const isLive =
      html.includes('"isLiveNow":true') || html.includes('"isLive":true');
    if (!isLive) return { isLive: false, videoId: null };

    let videoId: string | null = null;
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
    if (canonical) videoId = extractVideoId(canonical[1]);
    if (!videoId) {
      const fallback = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
      if (fallback) videoId = fallback[1];
    }
    if (!videoId) return { isLive: false, videoId: null };

    return { isLive: true, videoId };
  } catch {
    return { isLive: false, videoId: null };
  }
}

// Caché compartida entre peticiones (anti thundering herd): N clientes
// concurrentes dentro del intervalo provocan a lo sumo UN fetch a YouTube.
const getCachedLiveStatus = unstable_cache(
  scrapeLiveStatus,
  ["youtube-live-status"],
  { revalidate: POLL_INTERVAL_SECONDS }
);

export async function getLiveStatus(): Promise<LiveStreamStatus> {
  const now = new Date();
  const nextCheck = getNextCheck(now).toISOString();

  // Corto-circuito: fuera de la ventana no se toca la red.
  if (getPhase(now) === "asleep") {
    return { isLive: false, videoId: null, nextCheck };
  }

  const { isLive, videoId } = await getCachedLiveStatus();
  return { isLive, videoId, nextCheck };
}
