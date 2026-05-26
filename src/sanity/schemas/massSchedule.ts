import { defineType, defineField } from "sanity";

export const massSchedule = defineType({
  name: "massSchedule",
  title: "Horario de Misas",
  type: "document",
  fields: [
    defineField({ name: "dayLabel", title: "Día", type: "string" }),
    defineField({
      name: "times",
      title: "Horarios",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "order", title: "Orden", type: "number" }),
  ],
});
