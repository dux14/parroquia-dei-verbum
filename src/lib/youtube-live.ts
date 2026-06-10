import { unstable_cache } from "next/cache";
import { extractVideoId } from "@/lib/youtube";

const CHANNEL_ID = "UCxENqnnNPigauO91jVmEcXA";

// Nombre del canal tal cual lo expone YouTube en videoDetails.author. Aserción
// dura: si el video servido no pertenece a este canal, se rechaza.
const EXPECTED_CHANNEL_NAME = "Parroquia Dei Verbum Bogotá";

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

// Decodifica el contenido de un string JSON capturado con escapes intactos
// (\uXXXX, \", \\, …). El grupo proviene de un patrón balanceado, así que
// re-parsear como string JSON es seguro; ante cualquier rareza, deja el crudo.
function jsonUnescape(raw: string): string {
  try {
    return JSON.parse(`"${raw}"`);
  } catch {
    return raw;
  }
}

function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

// Resultado de evaluar las aserciones de identidad sobre un HTML de live.
export interface LiveAssertion {
  videoId: string | null;
  author: string;
  title: string;
  channelOk: boolean;
  dateOk: boolean;
  accepted: boolean;
  reason:
    | "accepted"
    | "no-video-id"
    | "channel-mismatch"
    | "title-date-mismatch";
}

// Lógica pura (sin red): extrae videoId/título/autor del MISMO bloque videoDetails
// y exige (1) canal === EXPECTED_CHANNEL_NAME y (2) que el título contenga la fecha
// de hoy. Testeable contra fixtures HTML.
export function assertLiveIdentity(html: string, now: Date): LiveAssertion {
  let videoId: string | null = null;
  let title = "";

  // videoId + título atados al mismo video (videoDetails empieza por videoId,
  // seguido inmediatamente por title).
  const details = html.match(
    /"videoDetails":\{"videoId":"([a-zA-Z0-9_-]{11})","title":"((?:[^"\\]|\\.)*)"/
  );
  if (details) {
    videoId = details[1];
    title = jsonUnescape(details[2]);
  } else {
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
    if (canonical) videoId = extractVideoId(canonical[1]);
    if (!videoId) {
      const fb = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
      if (fb) videoId = fb[1];
    }
  }
  if (!title) {
    const og = html.match(/<meta property="og:title" content="([^"]*)"/);
    if (og) title = decodeHtmlEntities(og[1]);
  }

  let author = "";
  const authorMatch = html.match(/"author":"((?:[^"\\]|\\.)*)"/);
  if (authorMatch) author = jsonUnescape(authorMatch[1]);

  const channelOk = author.trim() === EXPECTED_CHANNEL_NAME;
  const dateOk = normalizeText(title).includes(
    normalizeText(expectedDateFragment(now))
  );

  let reason: LiveAssertion["reason"];
  let accepted = false;
  if (!videoId) reason = "no-video-id";
  else if (!channelOk) reason = "channel-mismatch";
  else if (!dateOk) reason = "title-date-mismatch";
  else {
    reason = "accepted";
    accepted = true;
  }

  return { videoId, author, title, channelOk, dateOk, accepted, reason };
}

// Scrape sin API key. En vivo sólo si el cuerpo marca isLiveNow/isLive Y las
// aserciones de identidad pasan (canal + fecha del título). Cualquier fallo o
// no-coincidencia → no en vivo, y el siguiente sondeo reintenta. Nunca lanza.
// Emite una traza [live-track] por intento para diagnóstico (vercel logs).
async function scrapeLiveStatus(): Promise<{
  isLive: boolean;
  videoId: string | null;
}> {
  const now = new Date();
  const ts = now.toISOString();
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
    if (!res.ok) {
      console.warn(
        `[live-track] ${JSON.stringify({ ts, accepted: false, reason: "fetch-failed", status: res.status })}`
      );
      return { isLive: false, videoId: null };
    }

    const html = await res.text();
    const liveFlag =
      html.includes('"isLiveNow":true') || html.includes('"isLive":true');
    if (!liveFlag) {
      console.log(
        `[live-track] ${JSON.stringify({ ts, accepted: false, reason: "not-live" })}`
      );
      return { isLive: false, videoId: null };
    }

    const r = assertLiveIdentity(html, now);
    const line = JSON.stringify({
      ts,
      videoId: r.videoId,
      author: r.author,
      title: r.title,
      expectedChannel: EXPECTED_CHANNEL_NAME,
      expectedDate: expectedDateFragment(now),
      channelOk: r.channelOk,
      dateOk: r.dateOk,
      accepted: r.accepted,
      reason: r.reason,
    });
    if (r.accepted) console.log(`[live-track] ${line}`);
    else console.warn(`[live-track] ${line}`);

    if (!r.accepted) return { isLive: false, videoId: null };
    return { isLive: true, videoId: r.videoId };
  } catch (err) {
    console.warn(
      `[live-track] ${JSON.stringify({ ts, accepted: false, reason: "fetch-failed", error: String(err) })}`
    );
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
