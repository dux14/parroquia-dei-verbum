import { defineType, defineField } from "sanity";

export const homily = defineType({
  name: "homily",
  title: "Homilía",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "date", title: "Fecha", type: "date" }),
    defineField({ name: "scriptureRef", title: "Referencia Bíblica", type: "string" }),
    defineField({ name: "body", title: "Texto", type: "text" }),
    defineField({ name: "audioUrl", title: "URL de Audio", type: "url" }),
  ],
});
