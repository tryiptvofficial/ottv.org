import type { Metadata } from "next";
import { type Country, nameInSentence } from "@/lib/countries";
import { plans } from "@/lib/site-data/pricing";
import { productFacts } from "@/lib/site-data/product-facts";
import { generateMetadata as generatePageMetadata } from "@/lib/site-config";

const lowestMonthly = Math.min(...plans.map((p) => p.price_monthly)).toFixed(2);

/** `Best IPTV Service in [Country] | OTTV` — the one title pattern for every country page. */
export function countryTitle(country: Country): string {
  return `Best IPTV Service in ${country.name} | OTTV`;
}

export function countryH1(country: Country): string {
  return `Best IPTV Service in ${nameInSentence(country)}`;
}

export function countryDescription(country: Country): string {
  return `Best IPTV Service in ${nameInSentence(country)}: OTTV brings ${productFacts.liveChannels} live channels and ${productFacts.vodTitles} movies & TV shows, with plans from $${lowestMonthly} a month.`;
}

/** Every country page stays indexable with a self-referencing canonical. */
export function countryMetadata(country: Country): Metadata {
  return generatePageMetadata({
    title: countryTitle(country),
    description: countryDescription(country),
    canonical: `/country/${country.id}`,
  });
}
