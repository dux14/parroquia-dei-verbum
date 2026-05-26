import { getTranslations } from "next-intl/server";
import {
  getTodayReading,
  extractReadingRef,
  extractReadingBody,
} from "@/lib/ordo";
import HomilySection from "@/components/sections/HomilySection";

export default async function LecturasPage() {
  const t = await getTranslations("Readings");
  const reading = await getTodayReading();

  const gospelRef = reading ? extractReadingRef(reading.evangelio) : "Juan 1:1-5";
  const gospelBody = reading
    ? extractReadingBody(reading.evangelio)
    : "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.";

  const firstReadingRef = reading ? extractReadingRef(reading.primera_lectura) : "Isaías 52:7-10";
  const firstReadingBody = reading
    ? extractReadingBody(reading.primera_lectura)
    : "¡Cuán hermosos son sobre los montes los pies del que trae alegres nuevas...";

  const psalmRef = reading ? extractReadingRef(reading.salmo) : "Salmo 98";
  const psalmBody = reading
    ? extractReadingBody(reading.salmo)
    : '"Los confines de la tierra han contemplado la victoria de nuestro Dios."';

  const secondReadingRef = reading?.segunda_lectura ? extractReadingRef(reading.segunda_lectura) : "";
  const secondReadingBody = reading?.segunda_lectura ? extractReadingBody(reading.segunda_lectura) : "";
  const hasSecondReading = secondReadingBody.length > 10;

  const liturgicalHeader = reading?.encabezado ?? "";

  return (
    <>
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

        {/* Featured Gospel */}
        <section className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-surface-mist to-surface-container-low rounded-xl -z-10" />
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-8 md:p-12 soft-shadow relative overflow-hidden">
            <span className="material-symbols-outlined absolute -top-10 -right-10 text-[200px] text-surface-container/30 rotate-12 pointer-events-none select-none">
              swords
            </span>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-sky-pastel text-on-primary-fixed text-[14px] tracking-[0.05em] font-semibold px-3 py-1 rounded-full">
                {t("gospelLabel")}
              </span>
              <span className="text-on-surface-variant text-[14px] tracking-[0.05em] font-semibold uppercase tracking-wider">
                {gospelRef}
              </span>
            </div>
            <div className="text-[16px] leading-[26px] text-on-surface-variant max-w-none whitespace-pre-line">
              {gospelBody}
            </div>
          </div>
        </section>

        {/* Readings Grid — expands to fit content */}
        <section className={`grid grid-cols-1 ${hasSecondReading ? "md:grid-cols-3" : "md:grid-cols-2"} gap-6 mb-20`}>
          {/* Primera Lectura */}
          <div className="bg-surface-container-lowest rounded-xl p-6 soft-shadow border-l-2 border-pew-oak flex flex-col">
            <div className="mb-4">
              <span className="text-altar-gold text-[14px] tracking-[0.05em] font-semibold uppercase block mb-1">
                {t("firstReadingLabel")}
              </span>
              <h3 className="font-headline text-[20px] leading-[28px] font-semibold text-primary">{firstReadingRef}</h3>
            </div>
            <div className="text-[15px] leading-[24px] text-on-surface-variant whitespace-pre-line">
              {firstReadingBody}
            </div>
          </div>

          {/* Salmo */}
          <div className="bg-surface-container-lowest rounded-xl p-6 soft-shadow border-l-2 border-pew-oak flex flex-col">
            <div className="mb-4">
              <span className="text-altar-gold text-[14px] tracking-[0.05em] font-semibold uppercase block mb-1">
                {t("psalmLabel")}
              </span>
              <h3 className="font-headline text-[20px] leading-[28px] font-semibold text-primary">{psalmRef}</h3>
            </div>
            <div className="text-[15px] leading-[24px] text-on-surface-variant italic whitespace-pre-line">
              {psalmBody}
            </div>
          </div>

          {/* Segunda Lectura — solo domingos/solemnidades */}
          {hasSecondReading && (
            <div className="bg-surface-container-lowest rounded-xl p-6 soft-shadow border-l-2 border-pew-oak flex flex-col">
              <div className="mb-4">
                <span className="text-altar-gold text-[14px] tracking-[0.05em] font-semibold uppercase block mb-1">
                  Segunda Lectura
                </span>
                <h3 className="font-headline text-[20px] leading-[28px] font-semibold text-primary">{secondReadingRef}</h3>
              </div>
              <div className="text-[15px] leading-[24px] text-on-surface-variant whitespace-pre-line">
                {secondReadingBody}
              </div>
            </div>
          )}
        </section>

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

      {/* Floating Prayer Request FAB */}
      <a
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-altar-gold text-pew-oak shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all rounded-full px-5 py-4 flex items-center gap-2 z-40 group"
        href="#pedidos-oracion"
      >
        <span className="material-symbols-outlined">volunteer_activism</span>
        <span className="font-semibold text-[14px] tracking-[0.05em] hidden md:inline-block pr-1">
          {t("prayerRequest")}
        </span>
      </a>
    </>
  );
}
