import { defineType, defineField } from "sanity";

export const sacrament = defineType({
  name: "sacrament",
  title: "Sacramento",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nombre", type: "string" }),
    defineField({ name: "description", title: "Descripción", type: "text" }),
    defineField({
      name: "requirements",
      title: "Requisitos",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "icon", title: "Icono Material", type: "string" }),
    defineField({ name: "order", title: "Orden", type: "number" }),
  ],
});
