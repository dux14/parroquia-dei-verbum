import { useTranslations } from "next-intl";

export default function LecturasPage() {
  const t = useTranslations("Readings");

  return (
    <>
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

        {/* Featured Gospel */}
        <section className="mb-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-surface-mist to-surface-container-low rounded-xl -z-10" />
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-8 md:p-12 soft-shadow relative overflow-hidden">
            <span className="material-symbols-outlined absolute -top-10 -right-10 text-[200px] text-surface-container/30 rotate-12 pointer-events-none select-none">
              swords
            </span>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-sky-pastel text-on-primary-fixed text-[14px] tracking-[0.05em] font-semibold px-3 py-1 rounded-full">
                {t("gospelLabel")}
              </span>
              <span className="text-on-surface-variant text-[14px] tracking-[0.05em] font-semibold uppercase tracking-wider">
                Juan 1:1-5
              </span>
            </div>
            <h2 className="font-headline text-[32px] leading-[40px] md:text-[48px] md:leading-[56px] font-semibold text-primary mb-8 leading-snug">
              &ldquo;En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.&rdquo;
            </h2>
            <div className="text-[16px] leading-[24px] text-on-surface-variant max-w-none">
              <p className="mb-4">
                Este era en el principio con Dios. Todas las cosas por él fueron hechas, y sin él nada de lo que ha sido hecho, fue hecho. En él estaba la vida, y la vida era la luz de los hombres. La luz en las tinieblas resplandece, y las tinieblas no prevalecieron contra ella.
              </p>
            </div>
          </div>
        </section>

        {/* Bento Grid: First Reading, Psalm, Reflection */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {/* Primera Lectura */}
          <div className="bg-surface-container-lowest rounded-xl p-6 soft-shadow border-l-2 border-pew-oak flex flex-col">
            <div className="mb-4">
              <span className="text-altar-gold text-[14px] tracking-[0.05em] font-semibold uppercase tracking-wider block mb-1">
                {t("firstReadingLabel")}
              </span>
              <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-primary">Isaías 52:7-10</h3>
            </div>
            <p className="text-[16px] leading-[24px] text-on-surface-variant flex-grow">
              ¡Cuán hermosos son sobre los montes los pies del que trae alegres nuevas, del que anuncia la paz, del que trae nuevas del bien, del que publica salvación, del que dice a Sion: ¡Tu Dios reina!...
            </p>
            <button className="text-primary text-[14px] tracking-[0.05em] font-semibold flex items-center gap-1 mt-4 hover:text-altar-gold transition-colors self-start">
              Leer Completo <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Salmo */}
          <div className="bg-surface-container-lowest rounded-xl p-6 soft-shadow border-l-2 border-pew-oak flex flex-col">
            <div className="mb-4">
              <span className="text-altar-gold text-[14px] tracking-[0.05em] font-semibold uppercase tracking-wider block mb-1">
                {t("psalmLabel")}
              </span>
              <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-primary">Salmo 98</h3>
            </div>
            <p className="text-[16px] leading-[24px] text-on-surface-variant flex-grow italic">
              &ldquo;Los confines de la tierra han contemplado la victoria de nuestro Dios.&rdquo;
            </p>
            <button className="text-primary text-[14px] tracking-[0.05em] font-semibold flex items-center gap-1 mt-4 hover:text-altar-gold transition-colors self-start">
              Leer Completo <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* Reflexion */}
          <div className="bg-primary-container text-on-primary-container rounded-xl p-6 soft-shadow flex flex-col">
            <div className="mb-4 flex justify-between items-start">
              <div>
                <span className="text-inverse-primary text-[14px] tracking-[0.05em] font-semibold uppercase tracking-wider block mb-1">
                  {t("reflectionLabel")}
                </span>
                <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-surface-container-lowest">
                  Luz en las Tinieblas
                </h3>
              </div>
              <span className="material-symbols-outlined text-altar-gold text-[32px]">wb_sunny</span>
            </div>
            <p className="text-[16px] leading-[24px] text-inverse-primary/90 flex-grow">
              El Padre Mateo reflexiona sobre la profunda sencillez del Evangelio de Juan, recordándonos que no importa la oscuridad que enfrentemos, la luz de Cristo permanece inextinguible.
            </p>
            <button className="border border-inverse-primary text-surface-container-lowest text-[14px] tracking-[0.05em] font-semibold rounded-full px-4 py-2 mt-6 hover:bg-inverse-primary hover:text-primary-container transition-colors self-start">
              Escuchar Homilía
            </button>
          </div>
        </section>

        {/* Repositorio de Homilias */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary mb-2">
              {t("homiliesTitle")}
            </h2>
            <p className="text-[16px] leading-[24px] text-on-surface-variant">
              Escucha o lee las homilías de domingos anteriores.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { date: "12 de Noviembre, 2023", title: "La Parábola de las Diez Vírgenes", desc: "Una profunda reflexión sobre la importancia de estar preparados espiritualmente para el encuentro con el Señor, manteniendo siempre viva la llama de la fe y el amor en nuestros corazones." },
              { date: "5 de Noviembre, 2023", title: "El Mayor entre Ustedes", desc: "Una llamada de Cristo al servicio humilde y sincero hacia los demás, advirtiendo contra la hipocresía y el deseo de buscar reconocimiento por encima del bienestar del prójimo." },
              { date: "29 de Octubre, 2023", title: "El Gran Mandamiento", desc: "Explorando el corazón de la ley de Dios: amar al Señor con todo nuestro ser y amar a nuestro prójimo como a nosotros mismos." },
            ].map((homily) => (
              <div key={homily.title} className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-[14px] tracking-[0.05em] font-semibold text-outline mb-2 block">{homily.date}</span>
                <h4 className="font-headline text-[24px] leading-[32px] font-semibold text-primary mb-3">{homily.title}</h4>
                <p className="text-[16px] leading-[24px] text-on-surface-variant mb-4 line-clamp-3">{homily.desc}</p>
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-primary/10 text-primary hover:bg-primary hover:text-on-primary transition-colors py-2 rounded-lg text-[14px] tracking-[0.05em] font-semibold">
                    <span className="material-symbols-outlined text-[20px]">play_arrow</span> {t("listen")}
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors py-2 rounded-lg text-[14px] tracking-[0.05em] font-semibold">
                    <span className="material-symbols-outlined text-[20px]">description</span> {t("read")}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="text-primary font-semibold text-[14px] tracking-[0.05em] hover:text-altar-gold hover:underline transition-colors">
              Ver todas las homilías
            </button>
          </div>
        </section>

        {/* Recursos Espirituales */}
        <section className="max-w-4xl mx-auto border-t border-outline-variant/30 pt-12">
          <div className="text-center mb-8">
            <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary mb-2">
              {t("resourcesTitle")}
            </h2>
            <p className="text-[16px] leading-[24px] text-on-surface-variant">
              Continúa tu estudio y oración con estas fuentes confiables.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: "menu_book", title: "Lecturas Diarias de la USCCB", desc: "Texto oficial para los Estados Unidos." },
              { icon: "headphones", title: "Biblia en Audio", desc: "Escucha las escrituras." },
            ].map((resource) => (
              <a key={resource.title} className="flex items-center p-4 rounded-lg bg-surface-mist hover:bg-surface-container-low border border-transparent hover:border-outline-variant/20 transition-all group" href="#">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined">{resource.icon}</span>
                </div>
                <div>
                  <h4 className="text-[16px] leading-[24px] font-semibold text-primary">{resource.title}</h4>
                  <p className="text-[14px] tracking-[0.05em] font-semibold text-on-surface-variant">{resource.desc}</p>
                </div>
                <span className="material-symbols-outlined ml-auto text-outline group-hover:text-primary transition-colors">open_in_new</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Prayer Request FAB */}
      <a
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 bg-altar-gold text-pew-oak shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all rounded-full px-5 py-4 flex items-center gap-2 z-40 group"
        href="#pedidos-oracion"
      >
        <span className="material-symbols-outlined">volunteer_activism</span>
        <span className="font-semibold text-[14px] tracking-[0.05em] font-bold hidden md:inline-block pr-1">
          {t("prayerRequest")}
        </span>
      </a>
    </>
  );
}
