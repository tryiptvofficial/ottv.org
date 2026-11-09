import type { CountryFacts } from "@/lib/country-content";

/**
 * Hand-made corrections applied over the generated country-facts.json, keyed by country code.
 * CLDR records which languages have official status only roughly, and ICU lists every time zone
 * identifier even where a state uses one official time. Keeping these here means refreshing the
 * generated file cannot bring the errors back.
 */
export const factCorrections: Record<string, Partial<CountryFacts>> = {
  // Official languages that CLDR got wrong, or left incomplete in a way readers would notice.
  af: { languages: ["Dari", "Pashto"] },
  ck: { languages: ["English", "Cook Islands Māori"] },
  ch: { languages: ["German", "French", "Italian", "Romansh"] },
  dz: { languages: ["Arabic", "Tamazight"] },
  ec: { languages: ["Spanish", "Kichwa", "Shuar"] },
  iq: { languages: ["Arabic", "Kurdish"] },
  km: { languages: ["Comorian", "Arabic", "French"] },
  kz: { languages: ["Kazakh", "Russian"] },
  li: { languages: ["German"] },
  ma: { languages: ["Arabic", "Tamazight"] },
  me: { languages: ["Montenegrin"] },
  mg: { languages: ["Malagasy", "French"] },
  ng: { languages: ["English"] },
  no: { languages: ["Norwegian", "Sami"] },
  nz: { languages: ["English", "Māori", "New Zealand Sign Language"] },
  sc: { languages: ["English", "French", "Seychellois Creole"] },
  sn: { languages: ["French"] },
  tn: { languages: ["Arabic"] },

  // No language has official status in law; these are the ones in everyday public use.
  mu: { languageBasis: "spoken" },

  // Many official languages: the page names the main ones and says there are others.
  bo: { languages: ["Spanish", "Quechua", "Aymara", "Guaraní"], languagesPartial: true },
  pe: { languages: ["Spanish", "Quechua", "Aymara"], languagesPartial: true },
  za: { languages: ["English", "Zulu", "Xhosa", "Afrikaans"], languagesPartial: true },
  zw: { languages: ["English", "Shona", "North Ndebele"], languagesPartial: true },

  // One official time, although ICU also lists another zone identifier.
  cn: { utcOffsets: [480], zoneCount: 1 },
  // Ukrainian is the sole state language. UTC+3 came from the zone entry for occupied Crimea.
  ua: { languages: ["Ukrainian"], utcOffsets: [120], zoneCount: 1 },
};
