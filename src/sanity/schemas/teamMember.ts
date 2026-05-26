import { defineType, defineField } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Miembro del Equipo",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nombre", type: "string" }),
    defineField({ name: "role", title: "Cargo", type: "string" }),
    defineField({ name: "bio", title: "Biografía", type: "text" }),
    defineField({ name: "photo", title: "Foto", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Orden", type: "number" }),
  ],
});
