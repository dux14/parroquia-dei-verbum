import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HomePage() {
  const t = useTranslations("Home");

  return (
    <main className="flex-1">
      <section className="min-h-[80vh] flex items-center justify-center bg-primary/5 relative">
        <div className="text-center px-margin-mobile md:px-gutter">
          <Image
            src="/logo-dei-verbum.png"
            alt="Parroquia Dei Verbum"
            width={160}
            height={160}
            className="mx-auto mb-8"
            priority
          />
          <h1 className="font-headline text-headline-xl font-bold text-primary mb-4">
            {t("heroTitle")}
          </h1>
          <p className="font-headline text-headline-md font-semibold text-on-surface-variant">
            {t("heroSubtitle")}
          </p>
          <p className="text-body-lg text-on-surface-variant mt-4 italic">
            {t("heroDescription")}
          </p>
        </div>
      </section>
    </main>
  );
}
