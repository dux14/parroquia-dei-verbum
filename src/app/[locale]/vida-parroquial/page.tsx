import { useTranslations } from "next-intl";

export default function VidaParroquialPage() {
  const t = useTranslations("ParishLife");

  return (
    <main className="flex-1">
      <section className="py-section-gap px-margin-mobile md:px-gutter max-w-[1200px] mx-auto">
        <h1 className="font-headline text-headline-xl font-bold text-primary">
          {t("heroTitle")}
        </h1>
        <p className="text-body-lg text-on-surface-variant mt-4">
          {t("heroSubtitle")}
        </p>
      </section>
    </main>
  );
}
