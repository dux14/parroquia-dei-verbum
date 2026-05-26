"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useEffect } from "react";

const navLinks = [
  { href: "/", labelKey: "inicio" },
  { href: "/vida-parroquial", labelKey: "vidaParroquial" },
  { href: "/lecturas", labelKey: "lecturas" },
  { href: "/sacramentos", labelKey: "sacramentos" },
  { href: "/contacto", labelKey: "contacto" },
] as const;

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const locale = useLocale();
  const otherLocale = locale === "es" ? "en" : "es";

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-surface z-50 shadow-xl transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-on-surface-variant"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>

        <nav className="flex flex-col px-6 gap-2">
          {navLinks.map(({ href, labelKey }) => {
            const isActive =
              href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={`py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary font-bold border-l-4 border-altar-gold"
                    : "text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                {t(labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="px-6 mt-8 flex flex-col gap-4">
          <div className="flex items-center gap-3 text-sm font-semibold">
            <Link
              href={pathname}
              locale="es"
              onClick={onClose}
              className={locale === "es" ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary transition-colors"}
            >
              ES
            </Link>
            <span className="text-outline-variant">|</span>
            <Link
              href={pathname}
              locale="en"
              onClick={onClose}
              className={locale === "en" ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary transition-colors"}
            >
              EN
            </Link>
          </div>

          <Link
            href="/#donations"
            onClick={onClose}
            className="bg-primary text-on-primary px-6 py-3 rounded-full text-sm font-semibold text-center hover:bg-primary-container hover:text-on-primary-container transition-colors soft-shadow"
          >
            {t("donaciones")}
          </Link>
        </div>
      </div>
    </>
  );
}
