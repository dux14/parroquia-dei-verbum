import {
  getLiturgicalCalendar,
  parseSaint,
  extractReadingBody,
} from "@/lib/ordo";

export default async function CalendarioPage() {
  const liturgicalDays = await getLiturgicalCalendar();

  return (
    <main className="max-w-[1200px] mx-auto px-4 md:px-6 pb-20">
      {/* Hero */}
      <section className="mt-12 mb-16 text-center max-w-3xl mx-auto">
        <h1 className="font-headline text-[48px] leading-[56px] font-bold text-primary mb-4">
          Calendario
        </h1>
        <p className="font-body text-[18px] leading-[28px] text-on-surface-variant">
          Calendario litúrgico y actividades parroquiales.
        </p>
      </section>

      {/* Calendario Litúrgico */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-primary text-[28px]">church</span>
          <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary">
            Calendario Litúrgico
          </h2>
        </div>
        <p className="text-[16px] leading-[24px] text-on-surface-variant mb-8 max-w-2xl">
          Santos del día, celebraciones litúrgicas, tiempos litúrgicos y más — datos en vivo del Ordo Colombiano de la Conferencia Episcopal.
        </p>
        <div className="space-y-3">
          {liturgicalDays.map((day) => {
            const date = new Date(day.fecha + "T12:00:00");
            const dayNum = date.getDate();
            const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
            const monthNames = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
            const dayName = dayNames[date.getDay()];
            const monthLabel = monthNames[date.getMonth()];
            const saint = parseSaint(day.celebracion_santo);
            const preludio = extractReadingBody(day.preludio);
            const title = saint || preludio || day.celebracion;

            const colorMap: Record<string, string> = {
              "Blanco": "#e8e8e8",
              "Rojo": "#ba1a1a",
              "Verde": "#2e7d32",
              "Morado": "#6a1b9a",
              "Rosa": "#e91e63",
            };
            const colorKey = Object.keys(colorMap).find((c) => day.colores_dia.includes(c));
            const dotColor = colorKey ? colorMap[colorKey] : "#e8e8e8";

            const today = new Date();
            const isToday = date.toDateString() === today.toDateString();

            return (
              <div
                key={day.fecha}
                className={`rounded-lg p-5 flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center transition-colors ${
                  isToday
                    ? "bg-primary/5 border-l-4 border-primary"
                    : "bg-surface-container-lowest border-l-4 border-transparent hover:bg-surface-mist"
                }`}
              >
                <div className="flex-shrink-0 text-center md:w-20">
                  <span className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">{dayName}</span>
                  <span className="block font-headline text-[28px] leading-[36px] font-bold text-primary">{dayNum}</span>
                  <span className="block text-xs text-on-surface-variant">{monthLabel}</span>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block w-3 h-3 rounded-full border border-outline-variant/50" style={{ backgroundColor: dotColor }} />
                    <span className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider">{day.tiempo_liturgico}</span>
                  </div>
                  <h4 className="font-headline text-lg font-semibold text-on-surface">{title}</h4>
                  <p className="text-sm text-on-surface-variant mt-1">{day.celebracion} · {day.colores_dia}</p>
                </div>
                {isToday && (
                  <span className="bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Hoy</span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Actividades Parroquiales */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-altar-gold text-[28px]">groups</span>
          <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary">
            Actividades Parroquiales
          </h2>
        </div>
        <p className="text-[16px] leading-[24px] text-on-surface-variant mb-8 max-w-2xl">
          Retiros, formación, encuentros comunitarios y otras actividades organizadas por la parroquia.
        </p>
        <div className="space-y-4">
          {[
            { title: "Encuentro Juvenil", desc: "Espacio de reflexión, alabanza y convivencia para jóvenes de 15 a 25 años.", schedule: "Sábados, 16:00 hrs", border: "border-pew-oak" },
            { title: "Estudio Bíblico", desc: "Profundiza en las Sagradas Escrituras con nuestro grupo de estudio semanal.", schedule: "Jueves, 19:30 hrs", border: "border-altar-gold" },
            { title: "Coro Parroquial", desc: "Acompaña nuestras celebraciones eucarísticas a través del canto y la música.", schedule: "Martes, 18:00 hrs", border: "border-sky-pastel" },
          ].map((event) => (
            <div key={event.title} className={`bg-surface-container-lowest rounded-lg p-6 shadow-sm border-l-4 ${event.border} flex flex-col md:flex-row gap-4 items-start md:items-center hover:bg-surface-mist transition-colors`}>
              <div className="flex-grow">
                <h4 className="font-headline text-lg font-semibold text-on-surface mb-1">{event.title}</h4>
                <p className="text-sm text-on-surface-variant">{event.desc}</p>
              </div>
              <div className="flex-shrink-0 flex items-center gap-2 text-on-surface-variant text-sm font-semibold">
                <span className="material-symbols-outlined text-sm">schedule</span>
                {event.schedule}
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-on-surface-variant mt-6 italic">
          Estas actividades son administradas por la parroquia. Para más información o inscripciones, contacta la oficina parroquial.
        </p>
      </section>
    </main>
  );
}
