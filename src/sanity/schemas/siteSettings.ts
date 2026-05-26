import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configuración del Sitio",
  type: "document",
  fields: [
    defineField({ name: "phone1", title: "Teléfono 1", type: "string" }),
    defineField({ name: "phone2", title: "Teléfono 2", type: "string" }),
    defineField({ name: "address", title: "Dirección", type: "string" }),
    defineField({ name: "email", title: "Correo Electrónico", type: "string" }),
    defineField({ name: "facebookUrl", title: "Facebook URL", type: "url" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "officeHours", title: "Horario de Oficina", type: "text" }),
  ],
});
