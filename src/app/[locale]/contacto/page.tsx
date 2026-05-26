import { useTranslations } from "next-intl";

const teamMembers = [
  { name: "P. Héctor Arbeláez Arenas", role: "Párroco", desc: "Sirviendo a nuestra comunidad con amor y dedicación.", icon: "person" },
  { name: "María García", role: "Presidenta del Consejo", desc: "Coordinando los esfuerzos pastorales y comunitarios.", icon: "person" },
  { name: "Carlos López", role: "Liturgia", desc: "Asegurando que nuestras celebraciones sean hermosas y reverentes.", icon: "person" },
  { name: "Ana Martínez", role: "Educación Religiosa", desc: "Guiando la formación en la fe de nuestros niños y jóvenes.", icon: "person" },
];

const faqs = [
  { q: "¿Cuáles son los requisitos para Bautizos?", a: "Para programar un bautizo, los padres deben estar registrados en la parroquia. Se requiere una copia del certificado de nacimiento del niño y tanto padres como padrinos deben asistir a una clase pre-bautismal. Los padrinos deben ser católicos practicantes, haber recibido el sacramento de la Confirmación y, si están casados, debe ser por la Iglesia." },
  { q: "¿Cómo iniciamos el proceso para Matrimonios?", a: "Las parejas deben contactar a la oficina parroquial al menos seis (6) meses antes de la fecha deseada para la boda. Se requiere una entrevista inicial con el párroco, certificados de bautismo actualizados, y completar un programa de preparación matrimonial aprobado por la diócesis." },
  { q: "¿Cuándo ofrecen confesiones?", a: "El Sacramento de la Reconciliación se ofrece todos los sábados de 3:30 PM a 4:30 PM, o con cita previa llamando a la oficina parroquial. Durante temporadas especiales como Adviento y Cuaresma, se anuncian horarios extendidos." },
  { q: "¿Cómo solicito una intención de Misa?", a: "Las intenciones de Misa pueden solicitarse en la oficina parroquial durante horas hábiles. Sugerimos hacer su solicitud con al menos un mes de anticipación si desea una fecha específica. Se sugiere una pequeña donación estipendio según las normas diocesanas." },
];

export default function ContactoPage() {
  const t = useTranslations("Contact");

  return (
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 md:px-6 py-12 md:py-20 flex flex-col gap-20">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="font-headline text-[48px] leading-[56px] font-bold text-primary mb-6">
          {t("heroTitle")}
        </h1>
        <p className="font-body text-[18px] leading-[28px] text-on-surface-variant">
          {t("heroSubtitle")}
        </p>
      </section>

      {/* Bento Grid: Office Hours + Contact Form */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Office Hours */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="bg-surface-mist rounded-xl p-8 soft-shadow border-l-2 border-pew-oak h-full flex flex-col justify-center">
            <h2 className="font-headline text-[24px] leading-[32px] font-semibold text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-altar-gold" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
              {t("officeHoursTitle")}
            </h2>
            <ul className="space-y-4 text-[16px] leading-[24px] text-on-surface">
              <li className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
                <span className="font-medium text-on-surface-variant">Lunes - Viernes</span>
                <span>9:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
                <span className="font-medium text-on-surface-variant">Sábado</span>
                <span>10:00 AM - 2:00 PM</span>
              </li>
              <li className="flex justify-between items-center pb-2">
                <span className="font-medium text-on-surface-variant">Domingo</span>
                <span className="text-altar-gold font-bold">Cerrado (Solo Misa)</span>
              </li>
            </ul>
            <div className="mt-8">
              <h3 className="text-[14px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase tracking-wider mb-3">
                Contacto Directo
              </h3>
              <div className="flex flex-col gap-3">
                <a className="flex items-center gap-3 text-primary hover:text-altar-gold transition-colors" href="tel:3107533534">
                  <span className="material-symbols-outlined">call</span>
                  310 7533534
                </a>
                <a className="flex items-center gap-3 text-primary hover:text-altar-gold transition-colors" href="tel:6139763">
                  <span className="material-symbols-outlined">call</span>
                  613 97 63
                </a>
                <a className="flex items-center gap-3 text-primary hover:text-altar-gold transition-colors" href="mailto:pdeiverbum@arquibogota.org.co">
                  <span className="material-symbols-outlined">mail</span>
                  pdeiverbum@arquibogota.org.co
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7">
          <div className="bg-surface-container-lowest rounded-xl p-8 md:p-12 soft-shadow border border-surface-variant">
            <h2 className="font-headline text-[24px] leading-[32px] font-semibold text-primary mb-2">
              {t("formTitle")}
            </h2>
            <p className="text-[16px] leading-[24px] text-on-surface-variant mb-8">
              Complete el formulario a continuación y un miembro de nuestro equipo se comunicará con usted en breve.
            </p>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="sr-only" htmlFor="firstName">{t("nameLabel")}</label>
                  <input
                    className="w-full input-underline px-0 py-3 text-[16px] text-on-surface placeholder:text-outline"
                    id="firstName"
                    placeholder={t("nameLabel")}
                    type="text"
                  />
                </div>
                <div>
                  <label className="sr-only" htmlFor="email">{t("emailLabel")}</label>
                  <input
                    className="w-full input-underline px-0 py-3 text-[16px] text-on-surface placeholder:text-outline"
                    id="email"
                    placeholder={t("emailLabel")}
                    type="email"
                  />
                </div>
              </div>
              <div>
                <label className="sr-only" htmlFor="subject">{t("subjectLabel")}</label>
                <select
                  className="w-full input-underline px-0 py-3 text-[16px] text-on-surface appearance-none bg-transparent"
                  id="subject"
                  defaultValue=""
                >
                  <option disabled value="">Seleccione un Asunto</option>
                  <option value="general">Consulta General</option>
                  <option value="prayer">Petición de Oración</option>
                  <option value="sacraments">Sacramentos (Bautismo, Matrimonio)</option>
                  <option value="volunteering">Voluntariado</option>
                </select>
              </div>
              <div>
                <label className="sr-only" htmlFor="message">{t("messageLabel")}</label>
                <textarea
                  className="w-full input-underline px-0 py-3 text-[16px] text-on-surface placeholder:text-outline resize-none"
                  id="message"
                  placeholder="¿Cómo podemos ayudarle?"
                  rows={4}
                />
              </div>
              <div className="pt-4 text-right">
                <button
                  className="bg-primary text-on-primary px-8 py-3 rounded-full text-[14px] tracking-[0.05em] font-semibold hover:opacity-90 transition-all soft-shadow hover:-translate-y-0.5 inline-flex items-center gap-2"
                  type="submit"
                >
                  {t("sendButton")}
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Equipo Pastoral */}
      <section className="flex flex-col gap-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary mb-4">
            {t("teamTitle")}
          </h2>
          <p className="text-[16px] leading-[24px] text-on-surface-variant">
            Conozca a las personas dedicadas a guiar y servir a nuestra comunidad parroquial.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-surface-container-lowest rounded-xl p-6 soft-shadow text-center flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary/40 text-[48px]">{member.icon}</span>
              </div>
              <h3 className="font-headline text-xl font-semibold text-primary mb-1">{member.name}</h3>
              <p className="text-[14px] tracking-[0.05em] text-altar-gold uppercase tracking-wider mb-2 font-semibold">{member.role}</p>
              <p className="text-[16px] leading-[24px] text-on-surface-variant text-sm">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="flex flex-col gap-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary mb-4">
            {t("faqTitle")}
          </h2>
          <p className="text-[16px] leading-[24px] text-on-surface-variant">
            Encuentre respuestas rápidas sobre los sacramentos y otros servicios parroquiales.
          </p>
        </div>
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="group bg-surface-container-lowest rounded-xl soft-shadow border border-surface-variant [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-primary">
                <h3 className="font-headline text-lg font-semibold">{faq.q}</h3>
                <span className="shrink-0 rounded-full bg-surface-variant p-1.5 text-primary sm:p-3 group-open:-rotate-180 transition-transform duration-300">
                  <span className="material-symbols-outlined">expand_more</span>
                </span>
              </summary>
              <div className="px-6 pb-6 text-[16px] leading-[24px] text-on-surface-variant">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Location / Map */}
      <section className="mt-8 flex flex-col gap-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-headline text-[32px] leading-[40px] font-semibold text-primary mb-4">
            {t("locationTitle")}
          </h2>
          <p className="text-[16px] leading-[24px] text-on-surface-variant">
            Estamos ubicados en el corazón de la comunidad.
          </p>
        </div>
        <div className="rounded-xl overflow-hidden soft-shadow relative h-[400px] w-full bg-surface-variant">
          <iframe
            src="https://maps.google.com/maps?q=Parroquia+Dei+Verbum+Calle+106A+59-26+Bogota+Colombia&t=&z=16&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t("mapAlt")}
          />
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-surface/95 backdrop-blur-sm p-6 rounded-lg soft-shadow max-w-sm border border-outline-variant/20 z-10">
            <h3 className="font-headline text-[24px] leading-[32px] font-semibold text-primary mb-2">Parroquia Dei Verbum</h3>
            <p className="text-[16px] leading-[24px] text-on-surface-variant mb-4">
              Calle 106 A No. 59-26<br />
              Bogotá, Colombia
            </p>
            <a
              className="inline-flex items-center gap-2 text-altar-gold hover:text-primary transition-colors text-[14px] tracking-[0.05em] font-bold"
              href="https://www.google.com/maps/search/Parroquia+Dei+Verbum+Calle+106A+59-26+Bogota"
              target="_blank"
              rel="noopener noreferrer"
            >
              Obtener Direcciones
              <span className="material-symbols-outlined">directions</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
