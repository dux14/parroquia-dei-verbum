import { useTranslations } from "next-intl";
import Image from "next/image";

export default function HomePage() {
  const t = useTranslations("Home");

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-primary/5" />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/30 via-surface/10 to-surface" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-6 flex flex-col items-center text-center">
          <Image
            src="/logo-dei-verbum.png"
            alt="Dei Verbum Logo"
            width={192}
            height={192}
            className="h-32 md:h-48 w-auto mb-8 drop-shadow-md"
            priority
          />
          <h1 className="font-headline text-[48px] leading-[56px] font-bold text-primary mb-6 max-w-3xl">
            {t("heroTitle")}
          </h1>
          <p className="font-body text-[18px] leading-[28px] text-on-surface-variant mb-10 max-w-2xl">
            {t("heroDescription")}
          </p>
        </div>
      </section>

      {/* Horarios y Despacho */}
      <section className="py-20 px-4 md:px-6 max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary mb-4">
            {t("scheduleSectionTitle")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Eucaristias */}
          <div className="bg-surface-container-low rounded-2xl p-8 border-t-4 border-primary soft-shadow">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">church</span>
              <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-primary">
                {t("eucharistTitle")}
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[14px] leading-[20px] font-bold text-secondary uppercase tracking-wider mb-1">
                  {t("sundayLabel")}
                </p>
                <p className="text-[16px] leading-[24px] text-on-surface-variant">
                  {t("sundayTimes")}
                </p>
              </div>
              <div>
                <p className="text-[14px] leading-[20px] font-bold text-secondary uppercase tracking-wider mb-1">
                  {t("weekdayLabel")}
                </p>
                <p className="text-[16px] leading-[24px] text-on-surface-variant">
                  {t("weekdayTimes")}
                </p>
              </div>
            </div>
          </div>

          {/* Despacho */}
          <div className="bg-surface-container-low rounded-2xl p-8 border-t-4 border-altar-gold soft-shadow">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-altar-gold">desk</span>
              <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-primary">
                {t("officeTitle")}
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[14px] leading-[20px] font-bold text-secondary uppercase tracking-wider mb-1">
                  {t("officeSchedule")}
                </p>
                <p className="text-[16px] leading-[24px] text-on-surface-variant">
                  {t("officeHours")}
                </p>
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div className="bg-surface-container-low rounded-2xl p-8 border-t-4 border-sky-pastel soft-shadow">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">contact_phone</span>
              <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-primary">
                {t("contactTitle")}
              </h3>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-[16px] leading-[24px] text-on-surface-variant">
                Para trámites e información general, puedes comunicarte a nuestra línea directa:
              </p>
              <a
                className="flex items-center gap-2 text-primary font-bold text-lg hover:text-primary-container transition-colors"
                href="tel:3107533534"
              >
                <span className="material-symbols-outlined">call</span>
                310 7533534
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Arquitectura de la Fe */}
      <section className="py-20 px-4 md:px-6 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden soft-shadow relative z-10 bg-surface-container-low aspect-[4/5]">
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-surface-container flex items-center justify-center">
                <span className="material-symbols-outlined text-primary/20 text-[120px]">church</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-2/3 h-full border-r-2 border-b-2 border-pew-oak/20 rounded-br-3xl z-0" />
          </div>
          <div className="md:col-span-6 md:col-start-7 mt-10 md:mt-0">
            <span className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-altar-gold uppercase tracking-widest mb-4 block">
              Nuestra Comunidad
            </span>
            <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary mb-6">
              {t("architectureTitle")}
            </h2>
            <p className="text-[16px] leading-[24px] text-on-surface-variant mb-6 leading-relaxed">
              {t("architectureText")}
            </p>
            <a className="inline-flex items-center gap-2 text-primary font-semibold text-[14px] tracking-[0.05em] hover:text-primary-container transition-colors group" href="#">
              Conoce nuestra historia
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      {/* Donations Section */}
      <section className="py-20 px-4 md:px-6 max-w-[1200px] mx-auto mb-20" id="donations">
        <div className="bg-surface-container-low rounded-3xl p-8 md:p-12 soft-shadow flex flex-col lg:flex-row gap-10 items-center relative overflow-hidden border border-altar-gold/20">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-altar-gold/5 rounded-full blur-3xl z-0" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl z-0" />
          <div className="lg:w-1/2 relative z-10">
            <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary mb-4">
              {t("donationTitle")}
            </h2>
            <p className="font-body text-[18px] leading-[28px] text-on-surface-variant mb-6">
              {t("donationText")}
            </p>
            <div className="flex items-center gap-2 text-altar-gold font-semibold text-[14px] tracking-[0.05em]">
              <span className="material-symbols-outlined">favorite</span>
              <span className="uppercase tracking-widest">Cada aporte hace la diferencia</span>
            </div>
          </div>
          <div className="lg:w-1/2 w-full relative z-10">
            <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border-t-4 border-altar-gold soft-shadow">
              <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-primary mb-6 text-center">
                Selecciona tu donación
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {["$10", "$25", "$50", t("otherAmount")].map((amount) => (
                  <button
                    key={amount}
                    className="bg-surface text-on-surface border border-outline-variant hover:border-altar-gold hover:text-altar-gold rounded-xl py-3 font-semibold text-[14px] tracking-[0.05em] transition-all focus:ring-2 focus:ring-altar-gold focus:border-altar-gold focus:text-altar-gold outline-none"
                  >
                    {amount}
                  </button>
                ))}
              </div>
              <button className="w-full bg-altar-gold text-surface-container-lowest font-semibold text-[14px] tracking-[0.05em] py-4 rounded-xl hover:bg-[#b5952f] transition-colors shadow-lg flex justify-center items-center gap-2">
                {t("donateButton")}
                <span className="material-symbols-outlined">volunteer_activism</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lectio Divina Section */}
      <section className="py-20 px-4 md:px-6 max-w-[1200px] mx-auto bg-surface-mist rounded-3xl mb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(#003e6f 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 flex flex-col justify-center">
            <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-primary mb-2">
              {t("lectioTitle")}
            </h3>
            <p className="text-[16px] leading-[24px] text-on-surface-variant mb-6">
              {t("lectioText")}
            </p>
            <div className="bg-sky-pastel text-primary-container px-4 py-2 rounded-full inline-flex items-center gap-2 w-max text-[14px] tracking-[0.05em] font-semibold mb-6">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
              Hoy
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="glass-panel p-8 rounded-2xl">
              <span className="text-[14px] tracking-[0.05em] font-semibold text-secondary block mb-4">Evangelio según San Juan</span>
              <blockquote className="font-headline text-[24px] leading-[32px] font-semibold text-primary-container italic mb-6">
                &ldquo;Yo soy el camino, la verdad y la vida. Nadie va al Padre sino por mí.&rdquo;
              </blockquote>
              <div className="border-t border-outline-variant/30 pt-4 flex justify-between items-center">
                <span className="text-[16px] leading-[24px] text-on-surface-variant">Jn 14, 6</span>
                <button className="text-primary hover:text-primary-container transition-colors" aria-label="Compartir">
                  <span className="material-symbols-outlined">share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vida Parroquial Preview */}
      <section className="py-20 px-4 md:px-6 max-w-[1200px] mx-auto mb-20">
        <div className="text-center mb-12">
          <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary mb-4">
            {t("parishLifeTitle")}
          </h2>
          <p className="text-[16px] leading-[24px] text-on-surface-variant max-w-2xl mx-auto">
            Únete a nuestras actividades y crece en comunidad.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Jóvenes", icon: "groups", title: "Encuentro Juvenil", desc: "Espacio de reflexión, alabanza y convivencia para jóvenes de 15 a 25 años.", time: "Sábados, 16:00 hrs", border: "border-pew-oak" },
            { label: "Formación", icon: "menu_book", title: "Estudio Bíblico", desc: "Profundiza en las Sagradas Escrituras con nuestro grupo de estudio semanal.", time: "Jueves, 19:30 hrs", border: "border-altar-gold" },
            { label: "Liturgia", icon: "music_note", title: "Coro Parroquial", desc: "Acompaña nuestras celebraciones eucarísticas a través del canto y la música.", time: "Martes, 18:00 hrs", border: "border-sky-pastel" },
          ].map((activity) => (
            <div key={activity.title} className={`bg-surface-container-lowest rounded-xl p-6 soft-shadow border-l-4 ${activity.border} hover:-translate-y-1 transition-transform duration-300`}>
              <div className="flex justify-between items-start mb-4">
                <span className="bg-surface-container-low text-primary px-3 py-1 rounded-full text-xs font-semibold tracking-wide">{activity.label}</span>
                <span className="material-symbols-outlined text-outline">{activity.icon}</span>
              </div>
              <h4 className="font-headline text-lg font-semibold text-primary mb-2">{activity.title}</h4>
              <p className="text-[16px] leading-[24px] text-on-surface-variant mb-4 text-sm">{activity.desc}</p>
              <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                <span className="material-symbols-outlined text-base">event</span>
                {activity.time}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="text-primary font-semibold text-[14px] tracking-[0.05em] hover:text-primary-container transition-colors border-b border-primary pb-1">
            Ver todo el calendario
          </button>
        </div>
      </section>

      {/* Proximos Eventos */}
      <section className="py-20 px-4 md:px-6 max-w-[1200px] mx-auto mb-20">
        <div className="text-center mb-12">
          <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary mb-4">
            {t("eventsTitle")}
          </h2>
          <p className="text-[16px] leading-[24px] text-on-surface-variant max-w-2xl mx-auto">
            Acompáñanos en nuestras próximas celebraciones y eventos especiales de la comunidad.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { day: "15", month: "Ago", title: "Fiesta Patronal", desc: "Celebramos juntos a nuestra patrona con misa solemne y actividades para toda la familia.", border: "border-primary", dateBg: "bg-primary/10 text-primary" },
            { day: "22", month: "Sep", title: "Retiro Espiritual", desc: "Un fin de semana de recogimiento, oración y encuentro personal con Dios para renovar tu fe.", border: "border-altar-gold", dateBg: "bg-altar-gold/10 text-altar-gold" },
            { day: "10", month: "Oct", title: "Bazar Parroquial", desc: "Disfruta de comida tradicional, juegos y música mientras apoyas las obras de nuestra parroquia.", border: "border-sky-pastel", dateBg: "bg-sky-pastel/30 text-primary" },
          ].map((event) => (
            <div key={event.title} className={`bg-surface-container-lowest rounded-xl p-6 soft-shadow border-t-4 ${event.border} hover:-translate-y-1 transition-transform duration-300`}>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className={`${event.dateBg} p-3 rounded-lg text-center min-w-[70px]`}>
                    <span className="block text-2xl font-bold leading-none mb-1">{event.day}</span>
                    <span className="block text-xs font-bold uppercase tracking-wider">{event.month}</span>
                  </div>
                  <h4 className="font-headline text-lg font-semibold text-primary leading-tight">{event.title}</h4>
                </div>
                <p className="text-[16px] leading-[24px] text-on-surface-variant text-sm">{event.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
