import { useTranslations } from "next-intl";

export default function VidaParroquialPage() {
  const t = useTranslations("ParishLife");

  return (
    <main className="max-w-[1200px] mx-auto px-4 md:px-6 pb-20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 flex flex-col items-center text-center">
        <h1 className="font-headline text-[28px] leading-[36px] md:text-[48px] md:leading-[56px] font-bold text-primary mb-6 max-w-3xl">
          {t("heroTitle")}
        </h1>
        <p className="font-body text-[18px] leading-[28px] text-on-surface-variant max-w-2xl mb-10">
          {t("heroSubtitle")}
        </p>
        <div className="w-full max-w-4xl h-64 md:h-96 rounded-xl overflow-hidden shadow-sm relative group bg-surface-container-low">
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-surface-container flex items-center justify-center">
            <span className="material-symbols-outlined text-primary/20 text-[120px]">diversity_3</span>
          </div>
        </div>
      </section>

      {/* Grupos Pastorales */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary">
            {t("groupsTitle")}
          </h2>
          <div className="w-16 h-1 bg-altar-gold mx-auto mt-4 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "groups", title: t("youthTitle"), desc: t("youthDesc") },
            { icon: "family_restroom", title: t("familiesTitle"), desc: t("familiesDesc") },
            { icon: "elderly", title: t("seniorsTitle"), desc: t("seniorsDesc") },
          ].map((group) => (
            <div
              key={group.title}
              className="bg-surface-mist rounded-xl p-8 soft-shadow hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined" style={{ fontSize: "80px" }}>{group.icon}</span>
              </div>
              <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-primary mb-3">{group.title}</h3>
              <p className="text-[16px] leading-[24px] text-on-surface-variant mb-6">{group.desc}</p>
              <a className="inline-flex items-center gap-2 text-primary font-semibold text-[14px] tracking-[0.05em] group-hover:text-altar-gold transition-colors" href="#">
                Más Información <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Directorio de Ministerios */}
      <section className="mb-20">
        <div className="bg-surface-mist rounded-2xl p-8 md:p-12 border border-outline-variant/30 soft-shadow">
          <div className="text-center mb-10">
            <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary">
              {t("ministryTitle")}
            </h2>
            <div className="w-16 h-1 bg-altar-gold mx-auto mt-4 mb-6 rounded-full" />
            <p className="text-[16px] leading-[24px] text-on-surface-variant max-w-2xl mx-auto">
              Nuestra parroquia prospera gracias a la dedicación de nuestros voluntarios. Descubra cómo puede servir a Dios y a nuestra comunidad.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {[
              { icon: "menu_book", title: t("lectorsTitle"), desc: "Proclaman la Palabra de Dios durante la Misa, ayudando a la congregación a escuchar y reflexionar sobre las Escrituras." },
              { icon: "local_dining", title: t("eucharistMinistersTitle"), desc: "Asisten al sacerdote en la distribución del Cuerpo y la Sangre de Cristo durante las celebraciones eucarísticas." },
              { icon: "school", title: t("catechesisTitle"), desc: "Guían a niños, jóvenes y adultos en su preparación para recibir los sacramentos y profundizar su fe católica." },
            ].map((ministry) => (
              <div key={ministry.title} className="flex flex-col gap-3">
                <div className="w-12 h-12 bg-primary-container/10 text-primary rounded-full flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined">{ministry.icon}</span>
                </div>
                <h3 className="font-headline text-[20px] leading-7 font-semibold text-primary">{ministry.title}</h3>
                <p className="text-[16px] leading-[24px] text-on-surface-variant">{ministry.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center border-t border-outline-variant/30 pt-8">
            <h4 className="font-headline text-xl text-on-surface mb-4">¿Siente el llamado a servir?</h4>
            <a className="inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary font-semibold text-[14px] tracking-[0.05em] px-6 py-3 rounded-full transition-all shadow-sm hover:shadow-md" href="#">
              {t("joinMinistry")} <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary">
            {t("galleryTitle")}
          </h2>
          <div className="w-16 h-1 bg-altar-gold mx-auto mt-4 rounded-full" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["church", "groups", "volunteer_activism", "music_note"].map((icon, i) => (
            <div key={i} className="aspect-square bg-surface-variant rounded-lg overflow-hidden group shadow-sm">
              <div className="w-full h-full bg-gradient-to-br from-primary/5 to-surface-container flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <span className="material-symbols-outlined text-primary/20 text-[64px]">{icon}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proximas Actividades */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary">
              {t("activitiesTitle")}
            </h2>
            <p className="text-[16px] leading-[24px] text-on-surface-variant mt-2">
              Únase a nosotros en nuestros próximos eventos parroquiales.
            </p>
          </div>
          <button className="text-primary font-semibold text-[14px] tracking-[0.05em] hover:text-altar-gold transition-colors inline-flex items-center gap-1">
            Ver Calendario Completo <span className="material-symbols-outlined text-sm">calendar_month</span>
          </button>
        </div>
        <div className="space-y-4">
          {[
            { month: "Oct", day: "15", title: "Picnic Parroquial y Compañerismo", desc: "Una maravillosa tarde de comida, juegos y unión comunitaria en el parque local.", time: "12:00 PM", border: "border-altar-gold" },
            { month: "Oct", day: "22", title: "Ensayo del Coro de Jóvenes", desc: "Práctica semanal para la próxima misa dominical. ¡Siempre se anima a que se unan nuevas voces!", time: "6:30 PM", border: "border-pew-oak" },
          ].map((event) => (
            <div key={event.title} className={`bg-surface-container-lowest rounded-lg p-6 shadow-sm border-l-4 ${event.border} flex flex-col md:flex-row gap-6 items-start md:items-center hover:bg-surface-mist transition-colors`}>
              <div className="flex-shrink-0 text-center md:w-24">
                <span className="block font-semibold text-[14px] tracking-[0.05em] text-primary uppercase tracking-wider">{event.month}</span>
                <span className="block font-headline text-[32px] leading-[40px] font-semibold text-primary">{event.day}</span>
              </div>
              <div className="flex-grow">
                <h4 className="font-headline text-[24px] leading-[32px] font-semibold text-on-surface mb-1">{event.title}</h4>
                <p className="text-[16px] leading-[24px] text-on-surface-variant line-clamp-2">{event.desc}</p>
              </div>
              <div className="flex-shrink-0 flex items-center gap-2 text-on-surface-variant font-semibold text-[14px] tracking-[0.05em]">
                <span className="material-symbols-outlined text-sm">schedule</span> {event.time}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
