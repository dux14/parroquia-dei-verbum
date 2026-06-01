import { getTranslations } from "next-intl/server";
import { getTodayReading, extractReadingRef, extractReadingBody } from "@/lib/ordo";
import { parseReading, readingTitle } from "@/lib/reading-parser";
import ReadingsView, { type ReadingSectionData } from "@/components/readings/ReadingsView";
import HomilySection from "@/components/sections/HomilySection";

function buildSection(
  label: string,
  html: string | null | undefined,
  fallbackTitle: string,
  fallbackBody: string,
): ReadingSectionData {
  if (!html) {
    return { label, title: fallbackTitle, blocks: [{ kind: "body", text: fallbackBody }] };
  }
  const blocks = parseReading(html);
  const title = readingTitle(blocks) || extractReadingRef(html);
  return { label, title, blocks };
}

export default async function LecturasPage() {
  const t = await getTranslations("Readings");
  const reading = await getTodayReading();

  const gospel = buildSection(
    t("gospelLabel"),
    reading?.evangelio,
    "Juan 1:1-5",
    "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.",
  );
  const first = buildSection(
    t("firstReadingLabel"),
    reading?.primera_lectura,
    "Isaías 52:7-10",
    "¡Cuán hermosos son sobre los montes los pies del que trae alegres nuevas...",
  );
  const psalm = buildSection(
    t("psalmLabel"),
    reading?.salmo,
    "Salmo 98",
    '"Los confines de la tierra han contemplado la victoria de nuestro Dios."',
  );
  const secondHtml = reading?.segunda_lectura ?? "";
  const second =
    secondHtml && extractReadingBody(secondHtml).length > 10
      ? buildSection("Segunda Lectura", secondHtml, "", "")
      : null;

  const liturgicalHeader = reading?.encabezado ?? "";

  return (
    <main className="max-w-[1200px] mx-auto px-4 md:px-6 pb-20">
        {/* Hero */}
        <section className="mt-12 mb-16 text-center max-w-3xl mx-auto">
          <h1 className="font-headline text-[48px] leading-[56px] font-bold text-primary mb-4">
            {t("heroTitle")}
          </h1>
          <p className="font-body text-[18px] leading-[28px] text-on-surface-variant">
            {t("heroSubtitle")}
          </p>
          {liturgicalHeader && (
            <p className="mt-4 text-[14px] tracking-[0.05em] font-semibold text-altar-gold">
              {liturgicalHeader}
            </p>
          )}
        </section>

        <ReadingsView gospel={gospel} first={first} psalm={psalm} second={second} />

        {/* Homilías */}
        <HomilySection title={t("homiliesTitle")} />

        {/* Recursos Espirituales */}
        <section className="max-w-4xl mx-auto border-t border-outline-variant/30 pt-12">
          <div className="text-center mb-8">
            <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary mb-2">
              {t("resourcesTitle")}
            </h2>
            <p className="text-[16px] leading-[24px] text-on-surface-variant">
              Continúa tu estudio y oración con estas fuentes confiables.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a className="flex items-center p-4 rounded-lg bg-surface-mist hover:bg-surface-container-low border border-transparent hover:border-outline-variant/20 transition-all group" href="https://web-ordo-colombiano.cec.org.co/lectura-dia" target="_blank" rel="noopener noreferrer">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">menu_book</span>
              </div>
              <div>
                <h4 className="text-[16px] leading-[24px] font-semibold text-primary">Ordo Colombiano</h4>
                <p className="text-[14px] text-on-surface-variant">Conferencia Episcopal de Colombia</p>
              </div>
              <span className="material-symbols-outlined ml-auto text-outline group-hover:text-primary transition-colors">open_in_new</span>
            </a>
            <a className="flex items-center p-4 rounded-lg bg-surface-mist hover:bg-surface-container-low border border-transparent hover:border-outline-variant/20 transition-all group" href="https://www.youtube.com/@ParroquiaDeiVerbum" target="_blank" rel="noopener noreferrer">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">headphones</span>
              </div>
              <div>
                <h4 className="text-[16px] leading-[24px] font-semibold text-primary">Canal YouTube</h4>
                <p className="text-[14px] text-on-surface-variant">Parroquia Dei Verbum</p>
              </div>
              <span className="material-symbols-outlined ml-auto text-outline group-hover:text-primary transition-colors">open_in_new</span>
            </a>
          </div>
        </section>
      </main>
  );
}
