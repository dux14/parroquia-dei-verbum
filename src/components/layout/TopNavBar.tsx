"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { href: "/", labelKey: "inicio" },
  { href: "/vida-parroquial", labelKey: "vidaParroquial" },
  { href: "/lecturas", labelKey: "lecturas" },
  { href: "/sacramentos", labelKey: "sacramentos" },
  { href: "/contacto", labelKey: "contacto" },
] as const;

export default function TopNavBar() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  const otherLocale = locale === "es" ? "en" : "es";

  return (
    <>
      <header className="bg-surface/80 backdrop-blur-md shadow-sm fixed top-0 w-full z-50 border-b border-outline-variant/30">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center px-6 py-2">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-dei-verbum.png"
                alt="Parroquia Dei Verbum"
                width={120}
                height={120}
                className="h-20 md:h-24 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, labelKey }) => {
              const isActive =
                href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href}
                  className={
                    isActive
                      ? "text-primary border-b-2 border-altar-gold pb-1 font-bold text-sm tracking-[0.05em] transition-all"
                      : "text-on-surface-variant hover:text-primary transition-colors text-sm tracking-[0.05em] hover:bg-surface-container-low px-2 py-1 rounded"
                  }
                >
                  {t(labelKey)}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <div className="text-sm tracking-[0.05em] font-semibold flex items-center gap-2">
              <Link
                href={pathname}
                locale="es"
                className={locale === "es" ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary transition-colors"}
              >
                ES
              </Link>
              <span className="text-outline-variant">|</span>
              <Link
                href={pathname}
                locale="en"
                className={locale === "en" ? "text-primary font-bold" : "text-on-surface-variant hover:text-primary transition-colors"}
              >
                EN
              </Link>
            </div>
            <Link
              href="/#donations"
              className="bg-primary text-on-primary px-6 py-2 rounded-full text-sm tracking-[0.05em] font-semibold hover:bg-primary-container hover:text-on-primary-container transition-colors soft-shadow inline-block"
            >
              {t("donaciones")}
            </Link>
          </div>

          <button
            className="md:hidden text-primary"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
