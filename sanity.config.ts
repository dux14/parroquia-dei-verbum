import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "@/sanity/schema";
import { projectId, dataset } from "@/sanity/env";

export default defineConfig({
  name: "dei-verbum",
  title: "Parroquia Dei Verbum",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool()],
  schema,
});
