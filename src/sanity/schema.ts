import { type SchemaTypeDefinition } from "sanity";
import { massSchedule } from "./schemas/massSchedule";
import { event } from "./schemas/event";
import { homily } from "./schemas/homily";
import { teamMember } from "./schemas/teamMember";
import { sacrament } from "./schemas/sacrament";
import { dailyReading } from "./schemas/dailyReading";
import { faq } from "./schemas/faq";
import { siteSettings } from "./schemas/siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    massSchedule,
    event,
    homily,
    teamMember,
    sacrament,
    dailyReading,
    faq,
    siteSettings,
  ],
};
