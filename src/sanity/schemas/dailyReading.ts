import { defineType, defineField } from "sanity";

export const dailyReading = defineType({
  name: "dailyReading",
  title: "Lectura Diaria",
  type: "document",
  fields: [
    defineField({ name: "date", title: "Fecha", type: "date" }),
    defineField({ name: "gospelRef", title: "Referencia del Evangelio", type: "string" }),
    defineField({ name: "gospelText", title: "Texto del Evangelio", type: "text" }),
    defineField({ name: "firstReadingRef", title: "Referencia Primera Lectura", type: "string" }),
    defineField({ name: "firstReadingText", title: "Texto Primera Lectura", type: "text" }),
    defineField({ name: "psalmRef", title: "Referencia del Salmo", type: "string" }),
    defineField({ name: "psalmText", title: "Texto del Salmo", type: "text" }),
    defineField({ name: "reflection", title: "Reflexión Parroquial", type: "text" }),
  ],
});
