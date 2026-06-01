"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function DonationFab() {
  const t = useTranslations("Home");

  return (
    <Link
      href="/#donations"
      aria-label={t("donateButton")}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-altar-gold text-pew-oak shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all rounded-full p-4 flex items-center justify-center z-40"
    >
      <span className="material-symbols-outlined">volunteer_activism</span>
    </Link>
  );
}
