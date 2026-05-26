import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Navigation");

  return (
    <footer className="w-full mt-auto bg-pew-oak py-16 px-6">
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1: Brand & Logo */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo-dei-verbum.png"
                alt="Parroquia Dei Verbum Logo"
                width={80}
                height={80}
                className="h-20 w-auto brightness-0 invert shadow-sm"
              />
            </Link>
            <p className="text-base text-surface-mist/80 leading-relaxed">
              {t("tagline")}
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-altar-gold uppercase tracking-widest">
              {t("navTitle")}
            </h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-surface-mist/80 hover:text-white transition-colors">
                {nav("inicio")}
              </Link>
              <Link href="/vida-parroquial" className="text-surface-mist/80 hover:text-white transition-colors">
                {nav("vidaParroquial")}
              </Link>
              <Link href="/lecturas" className="text-surface-mist/80 hover:text-white transition-colors">
                {nav("lecturas")}
              </Link>
              <Link href="/sacramentos" className="text-surface-mist/80 hover:text-white transition-colors">
                {nav("sacramentos")}
              </Link>
              <Link href="/contacto" className="text-surface-mist/80 hover:text-white transition-colors">
                {nav("contacto")}
              </Link>
            </nav>
          </div>

          {/* Column 3: Contact & Giving */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-altar-gold uppercase tracking-widest">
              {t("contactTitle")}
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3 text-surface-mist/80">
                <span className="material-symbols-outlined text-altar-gold text-xl">location_on</span>
                <span>{t("address")}</span>
              </div>
              <div className="flex items-center gap-3 text-surface-mist/80">
                <span className="material-symbols-outlined text-altar-gold text-xl">call</span>
                <span>{t("phone1")}</span>
              </div>
              <div className="flex items-center gap-3 text-surface-mist/80">
                <span className="material-symbols-outlined text-altar-gold text-xl">call</span>
                <span>{t("phone2")}</span>
              </div>
              <a className="flex items-center gap-3 text-surface-mist/80 hover:text-white transition-colors" href="mailto:pdeiverbum@arquibogota.org.co">
                <span className="material-symbols-outlined text-altar-gold text-xl">mail</span>
                <span>pdeiverbum@arquibogota.org.co</span>
              </a>
              <Link
                href="/#donations"
                className="mt-4 inline-flex items-center gap-2 bg-altar-gold text-pew-oak px-6 py-2 rounded-full text-sm font-bold hover:bg-white transition-colors w-fit"
              >
                <span className="material-symbols-outlined">volunteer_activism</span>
                {nav("donaciones")}
              </Link>
            </div>
          </div>

          {/* Column 4: Social Media */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-altar-gold uppercase tracking-widest">
              {t("socialTitle")}
            </h4>
            <div className="flex gap-4">
              <a
                aria-label="Facebook"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-altar-gold hover:text-pew-oak transition-all"
                href="https://www.facebook.com/parroquiadeiverbumbogota/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                aria-label="YouTube"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-altar-gold hover:text-pew-oak transition-all"
                href="https://www.youtube.com/@ParroquiaDeiVerbum"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                aria-label="Instagram"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-altar-gold hover:text-pew-oak transition-all"
                href="#"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-surface-mist/40 text-sm">
          <span>{t("copyright", { year: new Date().getFullYear() })}</span>
        </div>
      </div>
    </footer>
  );
}
