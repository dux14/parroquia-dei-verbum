import { defineType, defineField } from "sanity";

export const event = defineType({
  name: "event",
  title: "Evento",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "date", title: "Fecha", type: "datetime" }),
    defineField({ name: "description", title: "Descripción", type: "text" }),
    defineField({ name: "image", title: "Imagen", type: "image", options: { hotspot: true } }),
  ],
});
