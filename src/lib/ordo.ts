const ORDO_API =
  "https://74j2tngwfd.execute-api.us-east-1.amazonaws.com/api-app/ediciones/obtener-contenido-principal";

export interface OrdoDailyReading {
  fecha: string;
  encabezado: string;
  preludio: string;
  celebracion: string;
  colores_dia: string;
  misa: string;
  primera_lectura: string;
  segunda_lectura: string;
  salmo: string;
  aclamacion: string;
  evangelio: string;
  reflexion: string;
  reflexion_audio: string;
}

function stripHtml(html: string): string {
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
  try {
    const res = await fetch(ORDO_API, { next: { revalidate: 3600 } });
    if (!res.ok) return null;

    const json = await res.json();
    const today = getTodayDateString();
    const entry = json.data?.find(
      (item: { fecha: string }) => item.fecha === today
    );

    return entry ?? null;
  } catch {
    return null;
  }
}

export function extractReadingRef(html: string): string {
  const match = html.match(/<strong>([^<]+)<\/strong>/);
  return match ? match[1].trim() : "";
}

export function extractReadingBody(html: string): string {
  return stripHtml(html);
}
