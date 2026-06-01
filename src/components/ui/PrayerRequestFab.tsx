"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function PrayerRequestFab() {
  const t = useTranslations("Readings");

  return (
    <Link
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-altar-gold text-pew-oak shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all rounded-full px-5 py-4 flex items-center gap-2 z-40 group"
      href="/contacto"
    >
      <span className="material-symbols-outlined">volunteer_activism</span>
      <span className="font-semibold text-[14px] tracking-[0.05em] hidden md:inline-block pr-1">
        {t("prayerRequest")}
      </span>
    </Link>
  );
}
