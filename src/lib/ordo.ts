const ORDO_API =
  "https://74j2tngwfd.execute-api.us-east-1.amazonaws.com/api-app/ediciones/obtener-contenido-principal";

export interface OrdoDailyReading {
  fecha: string;
  encabezado: string;
  preludio: string;
  celebracion: string;
  colores_dia: string;
  tiempo_liturgico: string;
  celebracion_santo: string;
  misa: string;
  primera_lectura: string;
  segunda_lectura: string;
  salmo: string;
  aclamacion: string;
  evangelio: string;
  reflexion: string;
  reflexion_audio: string;
}

function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&ntilde;/g, "ñ")
    .replace(/&aacute;/g, "á")
    .replace(/&eacute;/g, "é")
    .replace(/&iacute;/g, "í")
    .replace(/&oacute;/g, "ó")
    .replace(/&uacute;/g, "ú")
    .replace(/&Aacute;/g, "Á")
    .replace(/&Eacute;/g, "É")
    .replace(/&Iacute;/g, "Í")
    .replace(/&Oacute;/g, "Ó")
    .replace(/&Uacute;/g, "Ú")
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»")
    .replace(/&ordf;/g, "ª")
    .trim();
}

function getTodayDateString(): string {
  const now = new Date();
  const bogota = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Bogota" })
  );
  const y = bogota.getFullYear();
  const m = String(bogota.getMonth() + 1).padStart(2, "0");
  const d = String(bogota.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export async function getTodayReading(): Promise<OrdoDailyReading | null> {
  const data = await fetchOrdoData();
  if (!data) return null;
  const today = getTodayDateString();
  return data.find((item) => item.fecha === today) ?? null;
}

export interface OrdoLiturgicalDay {
  fecha: string;
  encabezado: string;
  preludio: string;
  celebracion: string;
  tiempo_liturgico: string;
  colores_dia: string;
  celebracion_santo: string;
}

async function fetchOrdoData(): Promise<OrdoDailyReading[] | null> {
  try {
    const res = await fetch(ORDO_API, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}

export async function getLiturgicalCalendar(): Promise<OrdoLiturgicalDay[]> {
  const data = await fetchOrdoData();
  if (!data) return [];

  const today = getTodayDateString();
  const todayIndex = data.findIndex((d) => d.fecha === today);
  if (todayIndex === -1) return data.slice(0, 14);

  return data.slice(todayIndex, todayIndex + 14);
}

export function parseSaint(raw: string): string {
  try {
    const arr = JSON.parse(raw);
    if (Array.isArray(arr) && arr.length > 0) return arr[0].nombresanto;
  } catch { /* ignore */ }
  return "";
}

export function extractReadingRef(html: string): string {
  const match = html.match(/<strong>([^<]+)<\/strong>/);
  return match ? match[1].trim() : "";
}

export function extractReadingBody(html: string): string {
  return stripHtml(html);
}

export function extractGospelQuote(html: string): string {
  const body = stripHtml(html);
  const lines = body.split("\n").filter((l) => l.trim().length > 0);
  const titleLine = lines.findIndex((l) => l.includes("Lectura del santo Evangelio"));
  if (titleLine === -1) return lines.slice(2, 5).join(" ");
  const contentLines = lines.slice(titleLine + 1);
  const endIndex = contentLines.findIndex((l) => l.startsWith("Palabra del"));
  const content = endIndex > 0 ? contentLines.slice(0, endIndex) : contentLines.slice(0, 4);
  return content.join(" ").trim();
}
