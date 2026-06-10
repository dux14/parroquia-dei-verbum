import { unstable_cache } from "next/cache";

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

// Minúsculas + sin tildes (NFD) + trim. Compara títulos/fechas de forma tolerante
// a mayúsculas, acentuación y comas.
export function normalizeText(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

// Fragmento de fecha del día en horario Bogotá, ej. "7 de junio de 2026".
// El día de semana es redundante con la fecha → no se incluye ni se verifica.
export function expectedDateFragment(now: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    timeZone: "America/Bogota",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);
}

function decodeXmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

// Lógica pura (sin red): parsea las entradas del feed Atom del canal y devuelve
// el primer video cuyo título contiene la fecha de hoy en Bogotá — es la misa
// del día. El feed va por channel_id, así que la identidad del canal está
// garantizada por la fuente: no hace falta verificar autor. Testeable con
// fixtures XML.
export function findTodaysMass(
  xml: string,
  now: Date
): { videoId: string | null; title: string } {
  const expected = normalizeText(expectedDateFragment(now));
  const entries = xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g);
  for (const [, block] of entries) {
    const vid = block.match(/<yt:videoId>([a-zA-Z0-9_-]{11})<\/yt:videoId>/);
    const tit = block.match(/<title>([\s\S]*?)<\/title>/);
    if (!vid || !tit) continue;
    const title = decodeXmlEntities(tit[1]).trim();
    if (normalizeText(title).includes(expected)) {
      return { videoId: vid[1], title };
    }
  }
  return { videoId: null, title: "" };
}

// Detección vía feed RSS público del canal (sin API key). A diferencia de
// scrapear /channel/{id}/live —que YouTube intercepta desde IPs de datacenter y
// sirve lives ajenos sin videoDetails—, el feed Atom es estable desde cualquier
// IP y va atado a channel_id. Durante la ventana de misa, si el feed lista un
// video con la fecha de hoy en el título, esa es la transmisión del día. Nunca
// lanza. Emite una traza [live-track] por intento para diagnóstico.
async function fetchLiveStatusFromFeed(): Promise<{
  isLive: boolean;
  videoId: string | null;
}> {
  const now = new Date();
  const ts = now.toISOString();
  const expectedDate = expectedDateFragment(now);
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      console.warn(
        `[live-track] ${JSON.stringify({ ts, accepted: false, reason: "fetch-failed", status: res.status })}`
      );
      return { isLive: false, videoId: null };
    }

    const xml = await res.text();
    const { videoId, title } = findTodaysMass(xml, now);
    const accepted = videoId !== null;
    const line = JSON.stringify({
      ts,
      videoId,
      title,
      expectedDate,
      accepted,
      reason: accepted ? "accepted" : "no-mass-today",
    });
    if (accepted) console.log(`[live-track] ${line}`);
    else console.warn(`[live-track] ${line}`);

    return { isLive: accepted, videoId };
  } catch (err) {
    console.warn(
      `[live-track] ${JSON.stringify({ ts, accepted: false, reason: "fetch-failed", error: String(err) })}`
    );
    return { isLive: false, videoId: null };
  }
}

// Caché compartida entre peticiones (anti thundering herd): N clientes
// concurrentes dentro del intervalo provocan a lo sumo UN fetch al feed.
const getCachedLiveStatus = unstable_cache(
  fetchLiveStatusFromFeed,
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
