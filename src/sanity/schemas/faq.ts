import { defineType, defineField } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "Pregunta Frecuente",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Pregunta", type: "string" }),
    defineField({ name: "answer", title: "Respuesta", type: "text" }),
    defineField({ name: "category", title: "Categoría", type: "string" }),
    defineField({ name: "order", title: "Orden", type: "number" }),
  ],
});
