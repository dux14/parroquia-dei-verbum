import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  getLiturgicalCalendar,
  parseSaint,
  extractReadingBody,
} from "@/lib/ordo";

const pastoralGroups = [
  {
    name: "Revolución Juvenil",
    icon: "bolt",
    color: "bg-[#FF6B35]",
    image: "/images/groups/revolucion-juvenil.jpg",
    desc: "Movimiento juvenil parroquial que busca transformar la vida de los jóvenes a través del encuentro con Cristo, la formación en la fe y el servicio a la comunidad.",
    tag: "Jóvenes",
  },
  {
    name: "Emaús",
    icon: "directions_walk",
    color: "bg-[#8B6914]",
    image: "/images/groups/emaus.jpg",
    desc: "Comunidad de discípulos que caminan juntos en la fe, inspirados en el encuentro de los discípulos con Jesús resucitado en el camino a Emaús.",
    tag: "Comunidad",
  },
  {
    name: "Hakuna",
    icon: "music_note",
    color: "bg-[#1E88E5]",
    image: "/images/groups/hakuna.png",
    desc: "Grupo de alabanza y adoración que vive la fe con alegría a través de la música, la oración y el testimonio. Inspirado en el movimiento católico nacido en España.",
    tag: "Alabanza",
  },
  {
    name: "Patah",
    icon: "door_open",
    color: "bg-[#7B1FA2]",
    image: "/images/groups/patah.png",
    desc: "Movimiento de evangelización que abre puertas al encuentro con Dios. Su nombre en hebreo significa 'abrir', invitando a todos a abrirse a la gracia.",
    tag: "Evangelización",
  },
  {
    name: "Legión de María",
    icon: "star",
    color: "bg-[#0D47A1]",
    image: "/images/groups/legion-de-maria.jpg",
    desc: "Asociación mariana de fieles católicos que, bajo la guía de María, se dedican al servicio de la Iglesia y la evangelización mediante la oración y el apostolado activo.",
    tag: "Mariano",
  },
  {
    name: "Movimiento de Schoenstatt",
    icon: "home",
    color: "bg-[#2E7D32]",
    image: "/images/groups/schoenstatt.png",
    desc: "Movimiento apostólico mariano que busca la renovación espiritual mediante la alianza de amor con la Virgen María y la formación de cristianos libres y comprometidos.",
    tag: "Mariano",
  },
];

export default async function VidaParroquialPage() {
  const t = await getTranslations("ParishLife");
  const liturgicalDays = await getLiturgicalCalendar();

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
          <Image
            src="/images/vida-parroquial-hero.jpg"
            alt="Comunidad parroquial Dei Verbum"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 900px"
            priority
            quality={75}
          />
        </div>
      </section>

      {/* Grupos Pastorales */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary">
            {t("groupsTitle")}
          </h2>
          <div className="w-16 h-1 bg-altar-gold mx-auto mt-4 rounded-full" />
          <p className="text-[16px] leading-[24px] text-on-surface-variant max-w-2xl mx-auto mt-4">
            Conoce los grupos que hacen vida en nuestra parroquia y encuentra tu lugar en la comunidad.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastoralGroups.map((group) => (
            <div
              key={group.name}
              className="bg-surface-container-lowest rounded-xl soft-shadow hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group/card border border-outline-variant/10"
            >
              <div className="h-40 bg-gradient-to-br from-surface-mist to-surface-container-low flex items-center justify-center relative overflow-hidden">
                <Image
                  src={group.image}
                  alt={group.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized
                />
                <span className="absolute top-3 right-3 bg-surface/80 backdrop-blur-sm text-on-surface-variant px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide z-10">
                  {group.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-headline text-[20px] leading-[28px] font-semibold text-primary mb-3">{group.name}</h3>
                <p className="text-[14px] leading-[22px] text-on-surface-variant mb-5">{group.desc}</p>
                <a
                  className="inline-flex items-center gap-2 text-primary font-semibold text-[14px] tracking-[0.05em] group-hover/card:text-altar-gold transition-colors"
                  href="#"
                >
                  Más Información <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Directorio de Ministerios */}
      <section className="mb-20">
        <div className="rounded-2xl overflow-hidden soft-shadow relative">
          <div className="h-48 md:h-64 relative overflow-hidden">
            <Image
              src="/images/ministerios-bg.jpg"
              alt="Ministerios parroquiales"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
              quality={70}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-surface-mist/95" />
          </div>

          <div className="bg-surface-mist p-8 md:p-12 -mt-16 relative z-10">
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
                <div key={ministry.title} className="bg-surface-container-lowest rounded-xl p-6 soft-shadow flex flex-col gap-3">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined">{ministry.icon}</span>
                  </div>
                  <h3 className="font-headline text-[20px] leading-7 font-semibold text-primary">{ministry.title}</h3>
                  <p className="text-[14px] leading-[22px] text-on-surface-variant">{ministry.desc}</p>
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
        </div>
      </section>

      {/* Galería */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary">
            {t("galleryTitle")}
          </h2>
          <div className="w-16 h-1 bg-altar-gold mx-auto mt-4 rounded-full" />
          <p className="text-[16px] leading-[24px] text-on-surface-variant max-w-2xl mx-auto mt-4">
            Momentos de fe, comunidad y celebración en nuestra parroquia.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { src: "/images/gallery-1.jpg", alt: "Comunidad parroquial", tall: true },
            { src: "/images/banner-parroquia.jpg", alt: "Parroquia Dei Verbum" },
            { src: "/images/hero-home.jpg", alt: "Interior de la parroquia" },
            { src: "/images/gallery-2.jpg", alt: "Celebración litúrgica" },
            { src: "/images/vida-parroquial-hero.jpg", alt: "Vida parroquial" },
            { src: "/images/gallery-3.jpg", alt: "Comunidad en oración", tall: true },
            { src: "/images/ministerios-bg.jpg", alt: "Ministerios" },
            { src: "/images/parroco.jpg", alt: "Padre Héctor" },
          ].map((photo, i) => (
            <div
              key={i}
              className={`bg-surface-variant rounded-lg overflow-hidden group shadow-sm relative ${photo.tall ? "row-span-2" : ""}`}
            >
              <div className="w-full h-full min-h-[180px] relative">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={70}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Próximas Actividades — from Ordo API */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary">
              {t("activitiesTitle")}
            </h2>
            <p className="text-[16px] leading-[24px] text-on-surface-variant mt-2">
              Calendario litúrgico y actividades parroquiales.
            </p>
          </div>
          <Link
            href="/calendario"
            className="text-primary font-semibold text-[14px] tracking-[0.05em] hover:text-altar-gold transition-colors inline-flex items-center gap-1"
          >
            Ver Calendario Completo <span className="material-symbols-outlined text-sm">calendar_month</span>
          </Link>
        </div>
        <div className="space-y-3">
          {liturgicalDays.slice(0, 7).map((day) => {
            const date = new Date(day.fecha + "T12:00:00");
            const dayNum = date.getDate();
            const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
            const monthNames = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
            const dayName = dayNames[date.getDay()];
            const monthLabel = monthNames[date.getMonth()];
            const saint = parseSaint(day.celebracion_santo);
            const preludio = extractReadingBody(day.preludio);
            const title = saint || preludio || day.celebracion;

            const today = new Date();
            const isToday = date.toDateString() === today.toDateString();
            const borders = ["border-altar-gold", "border-pew-oak", "border-primary", "border-sky-pastel"];

            return (
              <div
                key={day.fecha}
                className={`bg-surface-container-lowest rounded-lg p-5 shadow-sm border-l-4 ${isToday ? "border-primary bg-primary/5" : borders[dayNum % 4]} flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center hover:bg-surface-mist transition-colors`}
              >
                <div className="flex-shrink-0 text-center md:w-20">
                  <span className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">{dayName}</span>
                  <span className="block font-headline text-[28px] leading-[36px] font-bold text-primary">{dayNum}</span>
                  <span className="block text-xs text-on-surface-variant">{monthLabel}</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-headline text-lg font-semibold text-on-surface">{title}</h4>
                  <p className="text-sm text-on-surface-variant mt-1">{day.celebracion} · {day.colores_dia} · {day.tiempo_liturgico}</p>
                </div>
                {isToday && (
                  <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex-shrink-0">Hoy</span>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
