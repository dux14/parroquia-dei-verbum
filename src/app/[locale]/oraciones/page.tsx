import { getLocale, getTranslations } from "next-intl/server";
import { getPrayers } from "@/data/prayers";
import PrayersView from "@/components/prayers/PrayersView";

export default async function OracionesPage() {
  const t = await getTranslations("Prayers");
  const locale = await getLocale();
  const prayers = getPrayers(locale);

  return (
    <main className="max-w-[820px] mx-auto px-4 md:px-6 pb-20">
      {/* Hero */}
      <section className="mt-12 mb-8 text-center">
        <h1 className="font-headline text-[48px] leading-[56px] font-bold text-primary mb-4">
          {t("heroTitle")}
        </h1>
        <p className="font-body text-[18px] leading-[28px] text-on-surface-variant">
          {t("heroSubtitle")}
        </p>
      </section>

      <PrayersView prayers={prayers} />
    </main>
  );
}
