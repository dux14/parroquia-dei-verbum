import { getTranslations } from "next-intl/server";

const FOUNDATION_ARTICLE_URL =
  "https://pdeiverbum.arquibogota.org.co/centro-de-informacion/articulos/fundacion-buenos-aires?shem=rimspwouoe";

export default async function FundacionPage() {
  const t = await getTranslations("Foundation");

  const impact = [
    { icon: "child_care", value: "115", label: t("impactChildren") },
    { icon: "elderly", value: "16", label: t("impactElders") },
    { icon: "pregnant_woman", value: "11", label: t("impactMothers") },
    { icon: "accessible", value: "2", label: t("impactDisabled") },
  ];

  const services = [
    { icon: "restaurant", title: t("serviceMeals"), text: t("serviceMealsText") },
    { icon: "school", title: t("serviceSchool"), text: t("serviceSchoolText") },
    { icon: "computer", title: t("serviceComputers"), text: t("serviceComputersText") },
    { icon: "content_cut", title: t("serviceSewing"), text: t("serviceSewingText") },
    { icon: "checkroom", title: t("serviceCloset"), text: t("serviceClosetText") },
  ];

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative py-20 px-4 md:px-6 bg-surface-mist overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(#003e6f 1px, transparent 1px)", backgroundSize: "20px 20px" }}
        />
        <div className="relative z-10 max-w-[820px] mx-auto text-center">
          <span className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-altar-gold uppercase mb-4 block">
            {t("heroEyebrow")}
          </span>
          <h1 className="font-headline text-[40px] leading-[48px] md:text-[48px] md:leading-[56px] font-bold text-primary mb-6">
            {t("heroTitle")}
          </h1>
          <p className="font-body text-[18px] leading-[28px] text-on-surface-variant mb-4">{t("heroText")}</p>
          <p className="text-[14px] text-altar-gold font-semibold">{t("sistersNote")}</p>
        </div>
      </section>

      {/* Impacto */}
      <section className="py-12 px-4 md:px-6 max-w-[1200px] mx-auto">
        <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary mb-8 text-center">
          {t("impactTitle")}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {impact.map((item) => (
            <div
              key={item.icon}
              className="bg-surface-container-low rounded-2xl p-6 border-t-4 border-altar-gold soft-shadow text-center"
            >
              <span className="material-symbols-outlined text-primary text-[36px] mb-2" aria-hidden="true">{item.icon}</span>
              <p className="font-headline text-[36px] leading-[44px] font-bold text-primary">{item.value}</p>
              <p className="text-[14px] leading-[20px] text-on-surface-variant mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Servicios */}
      <section className="py-12 px-4 md:px-6 max-w-[1200px] mx-auto">
        <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary mb-8 text-center">
          {t("servicesTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.icon} className="bg-surface-container-lowest rounded-xl p-8 soft-shadow border-l-2 border-pew-oak">
              <span className="material-symbols-outlined text-altar-gold text-[32px] mb-4" aria-hidden="true">{service.icon}</span>
              <h3 className="font-headline text-[20px] leading-[28px] font-semibold text-primary mb-2">{service.title}</h3>
              <p className="text-[16px] leading-[24px] text-on-surface-variant">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Donación */}
      <section className="py-12 px-4 md:px-6 max-w-[1200px] mx-auto" id="donar">
        <div className="bg-surface-container-low rounded-3xl p-8 md:p-12 soft-shadow flex flex-col lg:flex-row gap-10 items-center relative overflow-hidden border border-altar-gold/20">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-altar-gold/5 rounded-full blur-3xl z-0" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl z-0" />
          <div className="lg:w-1/2 relative z-10">
            <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary mb-4">{t("donationTitle")}</h2>
            <p className="font-body text-[18px] leading-[28px] text-on-surface-variant mb-6">{t("donationText")}</p>
            <div className="flex items-center gap-2 text-altar-gold font-semibold text-[14px] tracking-[0.05em]">
              <span className="material-symbols-outlined" aria-hidden="true">favorite</span>
              <span className="uppercase tracking-widest">{t("donationTagline")}</span>
            </div>
          </div>
          <div className="lg:w-1/2 w-full relative z-10">
            <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border-t-4 border-altar-gold soft-shadow">
              <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-primary mb-6 text-center">
                {t("selectAmount")}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {["$10", "$25", "$50", t("otherAmount")].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    className="bg-surface text-on-surface border border-outline-variant hover:border-altar-gold hover:text-altar-gold rounded-xl py-3 font-semibold text-[14px] tracking-[0.05em] transition-all focus:ring-2 focus:ring-altar-gold outline-none"
                  >
                    {amount}
                  </button>
                ))}
              </div>
              <button type="button" className="w-full bg-altar-gold text-surface-container-lowest font-semibold text-[14px] tracking-[0.05em] py-4 rounded-xl hover:bg-[#b5952f] transition-colors shadow-lg flex justify-center items-center gap-2">
                {t("donateButton")}
                <span className="material-symbols-outlined" aria-hidden="true">volunteer_activism</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo ayudar + link externo */}
      <section className="py-12 px-4 md:px-6 max-w-[820px] mx-auto mb-16 text-center">
        <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary mb-8">{t("helpTitle")}</h2>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            { icon: "shopping_basket", label: t("helpMarkets") },
            { icon: "checkroom", label: t("helpClothes") },
            { icon: "payments", label: t("helpMoney") },
          ].map((item) => (
            <span
              key={item.icon}
              className="bg-sky-pastel text-primary-container px-4 py-2 rounded-full inline-flex items-center gap-2 text-[14px] tracking-[0.05em] font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">{item.icon}</span>
              {item.label}
            </span>
          ))}
        </div>
        <p className="text-[16px] leading-[24px] text-on-surface-variant mb-4">{t("helpContact")}</p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
          <a
            className="flex items-center gap-2 text-primary font-bold text-lg hover:text-primary-container transition-colors"
            href="tel:3107533534"
          >
            <span className="material-symbols-outlined" aria-hidden="true">call</span>310 753 3534
          </a>
          <a
            className="flex items-center gap-2 text-primary font-bold text-sm hover:text-primary-container transition-colors"
            href="mailto:pdeiverbum@arquibogota.org.co"
          >
            <span className="material-symbols-outlined" aria-hidden="true">mail</span>pdeiverbum@arquibogota.org.co
          </a>
        </div>
        <a
          href={FOUNDATION_ARTICLE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary font-semibold text-[14px] tracking-[0.05em] hover:text-primary-container transition-colors border-b border-primary pb-1"
        >
          {t("externalCta")}
          <span className="material-symbols-outlined text-sm" aria-hidden="true">open_in_new</span>
        </a>
      </section>
    </main>
  );
}
