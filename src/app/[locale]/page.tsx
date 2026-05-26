import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import ShareButton from "@/components/ui/ShareButton";
import {
  getTodayReading,
  extractReadingRef,
  extractGospelQuote,
  parseSaint,
  getLiturgicalCalendar,
  extractReadingBody,
} from "@/lib/ordo";

export default async function HomePage() {
  const t = await getTranslations("Home");
  const reading = await getTodayReading();
  const liturgicalDays = await getLiturgicalCalendar();

  const gospelRef = reading ? extractReadingRef(reading.evangelio) : "Jn 14, 6";
  const gospelQuote = reading
    ? extractGospelQuote(reading.evangelio)
    : "Yo soy el camino, la verdad y la vida. Nadie va al Padre sino por mí.";
  const gospelSource = reading
    ? `Evangelio — ${gospelRef}`
    : "Evangelio según San Juan";

  const saintOfDay = reading ? parseSaint(reading.celebracion_santo) : "";
  const saintPreludio = reading ? extractReadingBody(reading.preludio) : "";

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
          <div className="bg-surface-container-low rounded-2xl p-8 border-t-4 border-primary soft-shadow">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">church</span>
              <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-primary">
                {t("eucharistTitle")}
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[14px] leading-[20px] font-bold text-secondary uppercase tracking-wider mb-1">{t("sundayLabel")}</p>
                <p className="text-[16px] leading-[24px] text-on-surface-variant">{t("sundayTimes")}</p>
              </div>
              <div>
                <p className="text-[14px] leading-[20px] font-bold text-secondary uppercase tracking-wider mb-1">{t("weekdayLabel")}</p>
                <p className="text-[16px] leading-[24px] text-on-surface-variant">{t("weekdayTimes")}</p>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-low rounded-2xl p-8 border-t-4 border-altar-gold soft-shadow">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-altar-gold">desk</span>
              <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-primary">{t("officeTitle")}</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-[14px] leading-[20px] font-bold text-secondary uppercase tracking-wider mb-1">{t("officeSchedule")}</p>
                <p className="text-[16px] leading-[24px] text-on-surface-variant">{t("officeHours")}</p>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-low rounded-2xl p-8 border-t-4 border-sky-pastel soft-shadow">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary">contact_phone</span>
              <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-primary">{t("contactTitle")}</h3>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-[16px] leading-[24px] text-on-surface-variant">Para trámites e información general:</p>
              <a className="flex items-center gap-2 text-primary font-bold text-lg hover:text-primary-container transition-colors" href="tel:3107533534">
                <span className="material-symbols-outlined">call</span>310 7533534
              </a>
              <a className="flex items-center gap-2 text-primary font-bold text-sm hover:text-primary-container transition-colors" href="mailto:pdeiverbum@arquibogota.org.co">
                <span className="material-symbols-outlined">mail</span>pdeiverbum@arquibogota.org.co
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
            <span className="text-[14px] leading-[20px] tracking-[0.05em] font-semibold text-altar-gold uppercase mb-4 block">Nuestra Comunidad</span>
            <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary mb-6">{t("architectureTitle")}</h2>
            <p className="text-[16px] leading-[24px] text-on-surface-variant mb-6 leading-relaxed">{t("architectureText")}</p>
          </div>
        </div>
      </section>

      {/* Donations */}
      <section className="py-20 px-4 md:px-6 max-w-[1200px] mx-auto mb-20" id="donations">
        <div className="bg-surface-container-low rounded-3xl p-8 md:p-12 soft-shadow flex flex-col lg:flex-row gap-10 items-center relative overflow-hidden border border-altar-gold/20">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-altar-gold/5 rounded-full blur-3xl z-0" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl z-0" />
          <div className="lg:w-1/2 relative z-10">
            <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary mb-4">{t("donationTitle")}</h2>
            <p className="font-body text-[18px] leading-[28px] text-on-surface-variant mb-6">{t("donationText")}</p>
            <div className="flex items-center gap-2 text-altar-gold font-semibold text-[14px] tracking-[0.05em]">
              <span className="material-symbols-outlined">favorite</span>
              <span className="uppercase tracking-widest">Cada aporte hace la diferencia</span>
            </div>
          </div>
          <div className="lg:w-1/2 w-full relative z-10">
            <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border-t-4 border-altar-gold soft-shadow">
              <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-primary mb-6 text-center">Selecciona tu donación</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {["$10", "$25", "$50", t("otherAmount")].map((amount) => (
                  <button key={amount} className="bg-surface text-on-surface border border-outline-variant hover:border-altar-gold hover:text-altar-gold rounded-xl py-3 font-semibold text-[14px] tracking-[0.05em] transition-all focus:ring-2 focus:ring-altar-gold outline-none">
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

      {/* Lectio Divina — live from Ordo API */}
      <section className="py-20 px-4 md:px-6 max-w-[1200px] mx-auto bg-surface-mist rounded-3xl mb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(#003e6f 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 flex flex-col justify-center">
            <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-primary mb-2">{t("lectioTitle")}</h3>
            <p className="text-[16px] leading-[24px] text-on-surface-variant mb-6">{t("lectioText")}</p>
            <div className="bg-sky-pastel text-primary-container px-4 py-2 rounded-full inline-flex items-center gap-2 w-max text-[14px] tracking-[0.05em] font-semibold mb-4">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
              Hoy
            </div>
            {(saintOfDay || saintPreludio) && (
              <p className="text-[14px] text-altar-gold font-semibold">
                {saintOfDay || saintPreludio}
              </p>
            )}
          </div>
          <div className="lg:col-span-2">
            <div className="glass-panel p-8 rounded-2xl">
              <span className="text-[14px] tracking-[0.05em] font-semibold text-secondary block mb-4">{gospelSource}</span>
              <blockquote className="font-headline text-[20px] leading-[28px] md:text-[24px] md:leading-[32px] font-semibold text-primary-container italic mb-6">
                &ldquo;{gospelQuote.length > 300 ? gospelQuote.slice(0, 300) + "..." : gospelQuote}&rdquo;
              </blockquote>
              <div className="border-t border-outline-variant/30 pt-4 flex justify-between items-center">
                <span className="text-[16px] leading-[24px] text-on-surface-variant">{gospelRef}</span>
                <ShareButton text={`${gospelQuote.slice(0, 200)} — ${gospelRef}`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Actividades Parroquiales — managed via Sanity */}
      <section className="py-20 px-4 md:px-6 max-w-[1200px] mx-auto mb-20">
        <div className="text-center mb-12">
          <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary mb-4">{t("parishLifeTitle")}</h2>
          <p className="text-[16px] leading-[24px] text-on-surface-variant max-w-2xl mx-auto">Únete a nuestras actividades y crece en comunidad.</p>
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
              <p className="text-[14px] leading-[24px] text-on-surface-variant mb-4">{activity.desc}</p>
              <div className="flex items-center gap-2 text-on-surface-variant text-sm">
                <span className="material-symbols-outlined text-base">event</span>
                {activity.time}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/calendario" className="text-primary font-semibold text-[14px] tracking-[0.05em] hover:text-primary-container transition-colors border-b border-primary pb-1">
            Ver todo el calendario
          </Link>
        </div>
      </section>

      {/* Calendario Litúrgico — live from Ordo API */}
      <section className="py-20 px-4 md:px-6 max-w-[1200px] mx-auto mb-20">
        <div className="text-center mb-12">
          <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary mb-4">{t("eventsTitle")}</h2>
          <p className="text-[16px] leading-[24px] text-on-surface-variant max-w-2xl mx-auto">
            Calendario litúrgico de los próximos días.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {liturgicalDays.slice(0, 6).map((day, i) => {
            const date = new Date(day.fecha + "T12:00:00");
            const dayNum = String(date.getDate());
            const monthNames = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
            const monthLabel = monthNames[date.getMonth()];
            const saint = parseSaint(day.celebracion_santo);
            const title = saint || extractReadingBody(day.preludio) || day.celebracion;
            const borders = ["border-primary", "border-altar-gold", "border-sky-pastel"];
            const dateBgs = ["bg-primary/10 text-primary", "bg-altar-gold/10 text-altar-gold", "bg-sky-pastel/30 text-primary"];
            return (
              <div key={day.fecha} className={`bg-surface-container-lowest rounded-xl p-6 soft-shadow border-t-4 ${borders[i % 3]} hover:-translate-y-1 transition-transform duration-300`}>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <div className={`${dateBgs[i % 3]} p-3 rounded-lg text-center min-w-[70px]`}>
                      <span className="block text-2xl font-bold leading-none mb-1">{dayNum}</span>
                      <span className="block text-xs font-bold uppercase tracking-wider">{monthLabel}</span>
                    </div>
                    <div>
                      <h4 className="font-headline text-lg font-semibold text-primary leading-tight">{title}</h4>
                      <p className="text-xs text-on-surface-variant mt-1">{day.celebracion}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: day.colores_dia === "Blanco" ? "#f0f0f0" : day.colores_dia === "Rojo" ? "#ba1a1a" : day.colores_dia === "Verde" ? "#2e7d32" : day.colores_dia === "Morado" ? "#6a1b9a" : "#f0f0f0", border: "1px solid #ccc" }} />
                    <span className="text-xs text-on-surface-variant">{day.colores_dia} · {day.tiempo_liturgico}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-10">
          <Link href="/calendario" className="text-primary font-semibold text-[14px] tracking-[0.05em] hover:text-primary-container transition-colors border-b border-primary pb-1">
            Ver calendario completo
          </Link>
        </div>
      </section>

      {/* Social Media Embeds */}
      <section className="py-20 px-4 md:px-6 max-w-[1200px] mx-auto mb-20">
        <div className="text-center mb-12">
          <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary mb-4">Síguenos</h2>
          <p className="text-[16px] leading-[24px] text-on-surface-variant max-w-2xl mx-auto">Mantente conectado con nuestra comunidad en redes sociales.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Facebook */}
          <div className="rounded-xl overflow-hidden soft-shadow bg-surface-container-lowest">
            <div className="p-4 border-b border-outline-variant/20 flex items-center gap-3">
              <svg className="w-6 h-6 fill-[#1877F2]" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              <span className="font-semibold text-on-surface">Facebook</span>
            </div>
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fparroquiadeiverbumbogota%2F&tabs=timeline&width=400&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true"
              className="w-full h-[400px] border-0 overflow-hidden"
              allow="encrypted-media"
              loading="lazy"
            />
          </div>

          {/* YouTube */}
          <div className="rounded-xl overflow-hidden soft-shadow bg-surface-container-lowest">
            <div className="p-4 border-b border-outline-variant/20 flex items-center gap-3">
              <svg className="w-6 h-6 fill-[#FF0000]" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              <span className="font-semibold text-on-surface">YouTube</span>
            </div>
            <iframe
              src="https://www.youtube.com/embed?listType=user_uploads&list=ParroquiaDeiVerbum"
              className="w-full h-[400px] border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Instagram */}
          <div className="rounded-xl overflow-hidden soft-shadow bg-surface-container-lowest">
            <div className="p-4 border-b border-outline-variant/20 flex items-center gap-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24"><defs><linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#feda75" /><stop offset="25%" stopColor="#fa7e1e" /><stop offset="50%" stopColor="#d62976" /><stop offset="75%" stopColor="#962fbf" /><stop offset="100%" stopColor="#4f5bd5" /></linearGradient></defs><path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              <span className="font-semibold text-on-surface">Instagram</span>
            </div>
            <div className="h-[400px] flex flex-col items-center justify-center p-8 text-center">
              <span className="material-symbols-outlined text-primary/20 text-[80px] mb-4">photo_camera</span>
              <p className="text-on-surface-variant mb-4">Síguenos en Instagram para ver fotos y momentos de nuestra comunidad.</p>
              <a
                href="https://www.instagram.com/parroquiadeiverbum"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-on-primary px-6 py-2.5 rounded-full text-[14px] tracking-[0.05em] font-semibold hover:bg-primary-container hover:text-on-primary-container transition-colors"
              >
                @parroquiadeiverbum
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
