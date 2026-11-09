import type { Metadata } from "next";
import { type Country, historicalEntries, nameInSentence } from "@/lib/countries";
import { buildCountryContent, countryFacts } from "@/lib/country-content";
import { plans } from "@/lib/site-data/pricing";
import { generateMetadata as generatePageMetadata } from "@/lib/site-config";

const lowestMonthly = Math.min(...plans.map((p) => p.price_monthly)).toFixed(2);
const maxTitle = 60;
const maxDescription = 155;

export function countryTitle(country: Country): string {
  const history = historicalEntries[country.id];
  if (history) return `${country.name} (${history.period}): IPTV Information | OTTV`;
  const where = nameInSentence(country);
  const options = [
    `Best IPTV in ${where}: USD Plans, Setup & 24h Trial | OTTV`,
    `Best IPTV in ${where}: Plans & 24h Trial | OTTV`,
    `Best IPTV in ${where} | OTTV`,
  ];
  return options.find((title) => title.length <= maxTitle) ?? options[options.length - 1];
}

export function countryH1(country: Country): string {
  const history = historicalEntries[country.id];
  return history ? `${country.name} (${history.period})` : `Best IPTV in ${nameInSentence(country)}`;
}

export function countryDescription(country: Country): string {
  const history = historicalEntries[country.id];
  if (history) return history.description;
  const where = nameInSentence(country);
  const data = countryFacts(country);
  const language = data?.languages[0];
  const check = language ? `, a free 24-hour trial to check for ${language} channels` : ", a free 24-hour trial";
  const full = `Best IPTV in ${where}: plans from $${lowestMonthly} a month charged in US dollars${check}, and device setup guides.`;
  if (full.length <= maxDescription) return full;
  return `Best IPTV in ${where}: plans from $${lowestMonthly} a month in US dollars${check}.`;
}

/** Every country page stays indexable with a self-referencing canonical. */
export function countryMetadata(country: Country): Metadata {
  return generatePageMetadata({
    title: countryTitle(country),
    description: countryDescription(country),
    canonical: `/country/${country.id}`,
  });
}

export { buildCountryContent };
