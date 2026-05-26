import { useTranslations } from "next-intl";

const sacraments: Array<{ icon: string; titleKey: string; desc: string; requirements: string[]; ctaLabel?: string }> = [
  {
    icon: "water_drop",
    titleKey: "baptismTitle",
    desc: "El fundamento de toda la vida cristiana, el pórtico de la vida en el espíritu y la puerta que abre el acceso a los otros sacramentos.",
    requirements: ["Pláticas pre-bautismales", "Acta de nacimiento", "Padrinos confirmados"],
  },
  {
    icon: "restaurant",
    titleKey: "firstCommunionTitle",
    desc: "La Sagrada Eucaristía completa la iniciación cristiana. Los que han sido elevados a la dignidad del sacerdocio real por el Bautismo y configurados más profundamente con Cristo por la Confirmación, participan por medio de la Eucaristía con toda la comunidad en el sacrificio mismo del Señor.",
    requirements: ["1 año de catequesis", "Fe de bautismo"],
  },
  {
    icon: "local_fire_department",
    titleKey: "confirmationTitle",
    desc: "Con ella los bautizados se vinculan más estrechamente a la Iglesia y se enriquecen con una fortaleza especial del Espíritu Santo.",
    requirements: ["Jóvenes de 16+ años", "Preparación dominical"],
  },
  {
    icon: "favorite",
    titleKey: "marriageTitle",
    desc: "La alianza matrimonial, por la que un varón y una mujer constituyen entre sí un consorcio de toda la vida, ordenado por su naturaleza al bien de los cónyuges.",
    requirements: ["Pláticas pre-matrimoniales", "Presentación matrimonial"],
  },
  {
    icon: "self_improvement",
    titleKey: "reconciliationTitle",
    desc: "El perdón de los pecados cometidos después del Bautismo se concede mediante el sacramento de la Reconciliación (o confesión, sacramento de la penitencia o de la conversión).",
    requirements: ["Previa cita disponible"],
  },
  {
    icon: "healing",
    titleKey: "anointingTitle",
    desc: "Con la sagrada unción de los enfermos y con la oración de los presbíteros, toda la Iglesia encomienda a los enfermos al Señor.",
    requirements: ["Visita a domicilio", "Disponible las 24 horas"],
  },
  {
    icon: "church",
    titleKey: "holyOrdersTitle",
    desc: "Es el sacramento por el cual la misión confiada por Cristo a sus Apóstoles sigue siendo ejercida en la Iglesia hasta el fin de los tiempos.",
    requirements: ["Discernimiento vocacional"],
    ctaLabel: "Contactar Párroco",
  },
] as const;

export default function SacramentosPage() {
  const t = useTranslations("Sacraments");

  return (
    <main className="max-w-[1200px] mx-auto px-4 md:px-6 pb-20">
      {/* Hero */}
      <section className="mt-12 mb-16 text-center max-w-3xl mx-auto">
        <h1 className="font-headline text-[48px] leading-[56px] font-bold text-primary mb-4">
          {t("heroTitle")}
        </h1>
        <p className="font-body text-[18px] leading-[28px] text-on-surface-variant">
          {t("heroSubtitle")}
        </p>
      </section>

      {/* Sacraments Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {sacraments.map((sacrament) => (
          <div
            key={sacrament.titleKey}
            className="bg-surface-container-lowest rounded-xl p-8 soft-shadow border border-outline-variant/20 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined">{sacrament.icon}</span>
              </div>
              <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-primary">
                {t(sacrament.titleKey)}
              </h3>
            </div>
            <p className="text-[16px] leading-[24px] text-on-surface-variant mb-6">
              {sacrament.desc}
            </p>
            <div className="mb-6">
              <span className="text-[14px] tracking-[0.05em] font-semibold text-altar-gold uppercase tracking-wider block mb-3">
                {t("requirementsLabel")}
              </span>
              <ul className="space-y-2">
                {sacrament.requirements.map((req) => (
                  <li key={req} className="flex items-center gap-2 text-[16px] leading-[24px] text-on-surface-variant">
                    <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-on-primary px-5 py-2.5 rounded-full text-[14px] tracking-[0.05em] font-semibold transition-colors"
            >
              {sacrament.ctaLabel || t("moreInfo")}
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
        ))}
      </section>
    </main>
  );
}
