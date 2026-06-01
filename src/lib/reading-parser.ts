// src/lib/reading-parser.ts

export type ReadingBlock =
  | { kind: "citation"; text: string; isTitleDuplicate: boolean }
  | { kind: "comment"; text: string }
  | { kind: "intro"; text: string }
  | { kind: "closing"; text: string }
  | { kind: "alternate"; text: string }
  | { kind: "psalmResponse"; marker: string; text: string }
  | { kind: "psalmVerse"; marker: string; text: string; repeatCue: boolean }
  | { kind: "body"; text: string };

const ENTITIES: Record<string, string> = {
  "&nbsp;": " ", "&ntilde;": "ñ", "&Ntilde;": "Ñ",
  "&aacute;": "á", "&eacute;": "é", "&iacute;": "í", "&oacute;": "ó", "&uacute;": "ú",
  "&Aacute;": "Á", "&Eacute;": "É", "&Iacute;": "Í", "&Oacute;": "Ó", "&Uacute;": "Ú",
  "&laquo;": "«", "&raquo;": "»", "&ordf;": "ª", "&amp;": "&", "&quot;": '"', "&#39;": "'",
};

function decodeEntities(s: string): string {
  return s.replace(/&[a-zA-Z]+;|&#\d+;/g, (m) =>
    ENTITIES[m] ?? (m.startsWith("&#") ? String.fromCharCode(parseInt(m.slice(2), 10)) : m),
  );
}

// Strip tags, turn single <br> into newline, collapse intra-line whitespace.
function toText(html: string): string {
  return decodeEntities(html.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, ""))
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim())
    .join("\n")
    .trim();
}

export function parseReading(html: string | null | undefined): ReadingBlock[] {
  if (!html) return [];
  const inner = html.replace(/<\/?p[^>]*>/gi, "").trim();
  const rawBlocks = inner
    .split(/(?:<br\s*\/?>\s*){2,}/i)
    .map((b) => b.trim())
    .filter((b) => b.length > 0);

  let seenCitation = false;
  const blocks: ReadingBlock[] = [];

  for (const raw of rawBlocks) {
    // Psalm response / verse markers (must come before citation/comment checks)
    if (/^<strong>\s*R\.?\s*<\/strong>/i.test(raw)) {
      const rest = raw.replace(/^<strong>\s*R\.?\s*<\/strong>/i, "");
      blocks.push({ kind: "psalmResponse", marker: "R.", text: toText(rest) });
      continue;
    }
    if (/^<strong>\s*V\.?\s*<\/strong>/i.test(raw)) {
      let rest = raw.replace(/^<strong>\s*V\.?\s*<\/strong>/i, "");
      const repeatCue = /<strong>\s*R\.?\s*<\/strong>\s*$/i.test(rest);
      rest = rest.replace(/<strong>\s*R\.?\s*<\/strong>\s*$/i, "");
      blocks.push({ kind: "psalmVerse", marker: "V.", text: toText(rest), repeatCue });
      continue;
    }

    const text = toText(raw);

    if (/^o\s+bien/i.test(text)) {
      blocks.push({ kind: "alternate", text });
      continue;
    }
    if (/^<em\b/i.test(raw)) {
      blocks.push({ kind: "comment", text });
      continue;
    }
    if (/^<strong>[^<]*<\/strong>$/i.test(raw)) {
      // The FIRST citation is the one rendered as the blue title, so flag it as a
      // duplicate (the UI skips it in the body to avoid showing the citation twice).
      // Later citations (e.g. an "o bien" alternate) are kept and shown as subtitles.
      const isTitleDuplicate = !seenCitation;
      seenCitation = true;
      blocks.push({ kind: "citation", text, isTitleDuplicate });
      continue;
    }
    if (/^Lectura\b/i.test(text)) {
      blocks.push({ kind: "intro", text });
      continue;
    }
    if (/^Palabra (del Señor|de Dios)\.?$/i.test(text)) {
      blocks.push({ kind: "closing", text });
      continue;
    }
    blocks.push({ kind: "body", text });
  }

  return blocks;
}

// The title shown in blue = first citation, or "" if none.
export function readingTitle(blocks: ReadingBlock[]): string {
  const first = blocks.find((b) => b.kind === "citation");
  return first ? first.text : "";
}
