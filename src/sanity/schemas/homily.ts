import { defineType, defineField } from "sanity";

export const homily = defineType({
  name: "homily",
  title: "Homilía",
  type: "document",
  fields: [
    defineField({
      name: "youtubeUrl",
      title: "URL de YouTube",
      type: "url",
      description: "URL del video de la misa en YouTube (ej: https://www.youtube.com/watch?v=xxx)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "timestamp",
      title: "Timestamp de la Homilía (segundos)",
      type: "number",
      description: "Segundo exacto donde empieza la homilía en el video (ej: 1800 para 30:00)",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "date",
      title: "Fecha",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "scriptureRef",
      title: "Referencia Bíblica",
      type: "string",
      description: "Referencia del Evangelio del día (ej: Mc 10, 28-31)",
    }),
    defineField({
      name: "notes",
      title: "Notas adicionales",
      type: "text",
      description: "Resumen breve o notas sobre la homilía (opcional)",
    }),
  ],
  orderings: [
    { title: "Fecha (reciente)", name: "dateDesc", by: [{ field: "date", direction: "desc" }] },
  ],
  preview: {
    select: { title: "date", subtitle: "scriptureRef" },
    prepare({ title, subtitle }) {
      return { title: title ?? "Sin fecha", subtitle: subtitle ?? "" };
    },
  },
});
