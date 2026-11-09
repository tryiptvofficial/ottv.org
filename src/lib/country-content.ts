import { allCountries, historicalEntries, nameInSentence, type Country } from "@/lib/countries";
import factsData from "@/lib/site-data/country-facts.json";
import { factCorrections } from "@/lib/site-data/country-fact-corrections";
import { plans } from "@/lib/site-data/pricing";

export interface CountryFacts {
  subregion: string;
  continent: string;
  currencies: { code: string; name: string }[];
  languages: string[];
  /** "official" when the languages have official status, "spoken" when none does. */
  languageBasis: "official" | "spoken";
  /** True when the country has more official languages than the ones listed. */
  languagesPartial?: boolean;
  /** Standard-time UTC offsets in minutes, ascending. */
  utcOffsets: number[];
  zoneCount: number;
  dst: boolean;
}

// Generated once from Unicode CLDR 49 and the ICU time zone database. Refresh the file rather than editing
// values; known errors are fixed in country-fact-corrections.ts.
const facts = factsData as Record<string, CountryFacts>;

export function countryFacts(country: Country): CountryFacts | undefined {
  const base = facts[country.code];
  return base && { ...base, ...factCorrections[country.code] };
}

// Amazon's device specification for the Fire TV Stick HD (2026) names these markets.
// https://developer.amazon.com/docs/device-specs/device-specifications-fire-tv-streaming-media-player.html
const fireTvMarkets = new Set(["us", "gb", "jp", "es", "be", "it", "fr", "de", "ca", "in", "mx", "br", "au", "se", "nl", "pl", "ch", "nz"]);
// Roku's developer documentation names these Roku Streaming Store countries.
// https://developer.roku.com/dev/docs/channel-localization
const rokuStores = new Set(["us", "ca", "gb", "ie", "de", "at", "ar", "br", "cl", "co", "cr", "sv", "gt", "hn", "mx", "ni", "pa", "pe", "au"]);

export const guideLabels: Record<string, string> = {
  "fire-tv": "Fire TV Stick (Fire OS models)",
  "samsung-tv": "Samsung smart TV",
  "lg-tv": "LG smart TV",
  "apple-tv": "Apple TV",
  roku: "Roku (screen mirroring)",
  ios: "iPhone and iPad",
  android: "Android phones and tablets",
  windows: "Windows PC",
  macos: "Mac",
  mag: "MAG box",
};

const shortest = plans[0];
const longest = plans[plans.length - 1];
const lowestMonthly = longest.price_monthly.toFixed(2);

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function joinList(items: string[]): string {
  if (items.length < 2) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function formatOffset(minutes: number): string {
  if (minutes === 0) return "UTC";
  const sign = minutes < 0 ? "-" : "+";
  const abs = Math.abs(minutes);
  const hours = Math.floor(abs / 60);
  const rest = abs % 60;
  return `UTC${sign}${hours}${rest ? `:${String(rest).padStart(2, "0")}` : ""}`;
}

/** Local time of a 20:00 London kick-off in winter, when London is on UTC. */
function londonKickoff(offset: number): string {
  const total = 20 * 60 + offset;
  const day = Math.floor(total / (24 * 60));
  const minutes = ((total % 1440) + 1440) % 1440;
  const time = `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
  return day > 0 ? `${time} the next day` : time;
}

function kickoffAdvice(offset: number): string {
  const hour = Math.floor((((20 * 60 + offset) % 1440) + 1440) % 1440 / 60);
  if (hour < 6) return "That is the middle of the night, so catch-up TV, on channels that offer it, is the practical way to watch.";
  if (hour < 12) return "That falls in your morning, so catch-up TV, on channels that offer it, helps if you are busy then.";
  if (hour < 18) return "That falls in your afternoon, so catch-up TV, on channels that offer it, helps during working hours.";
  return "That is an evening slot, so watching live is practical.";
}

export interface CountryContent {
  where: string;
  lead: string;
  availabilityNote: string;
  priceAnswer: string;
  formerStates: Country[];
  quickFacts: { label: string; value: string }[];
  paying: string;
  languageTitle: string;
  language: string;
  time: string;
  devices: string;
  guideOrder: string[];
  nearby: Country[];
  nearbyRegion: string;
  faqs: { question: string; answer: string }[];
}

function nearbyCountries(country: Country, region: string): Country[] {
  const peers = allCountries.filter((c) => !historicalEntries[c.id] && countryFacts(c)?.subregion === region);
  const index = peers.findIndex((c) => c.id === country.id);
  const count = Math.min(4, peers.length - 1);
  return Array.from({ length: count }, (_, i) => peers[(index + i + 1) % peers.length]);
}

export function buildCountryContent(country: Country, data: CountryFacts): CountryContent {
  const where = nameInSentence(country);
  const Where = capitalize(where);
  const usesUsd = data.currencies.some((c) => c.code === "USD");
  const others = data.currencies.filter((c) => c.code !== "USD");
  const currency = others[0]?.name ?? "US Dollar";
  const firstLanguage = data.languages[0];
  const officialLanguages = data.languageBasis === "official";
  const fire = fireTvMarkets.has(country.code);
  const roku = rokuStores.has(country.code);

  const lead = usesUsd
    ? `Watching from ${where}? OTTV plans are charged in US dollars, which ${where} also uses, so there is no currency conversion. You order on WhatsApp.`
    : `Watching from ${where}? OTTV plans are charged in US dollars, not the ${currency}, and you order on WhatsApp.`;

  const paying = usesUsd
    ? others.length
      ? `${Where} uses the US Dollar alongside the ${joinList(others.map((c) => c.name))}. OTTV prices are set in US dollars, so paying in dollars avoids a conversion. If you pay in another currency, your payment provider converts the amount at its own rate.`
      : `${Where} uses the US Dollar, so the prices below are the amounts you pay, apart from any fee your own payment provider adds.`
    : `OTTV does not price plans in the ${currency}. Plans are set in US dollars and your payment provider converts the amount at its own rate, so the final cost in ${where} can shift with the exchange rate. A 12-month plan is one payment of $${longest.price.toFixed(2)}, which fixes your cost for the year.`;

  const languageList = joinList(data.languages);
  const languageIntro = officialLanguages
    ? data.languages.length > 1
      ? `${Where} has several official languages, including ${languageList}.`
      : `${firstLanguage} is the official language of ${where}.`
    : `${languageList} ${data.languages.length > 1 ? "are" : "is"} widely spoken in ${where}.`;
  const language = `${languageIntro} The free trial opens the full lineup, so search for the ${data.languages.length > 1 ? "languages" : `${firstLanguage}-language channels`} you want before you pay.`;

  const first = data.utcOffsets[0];
  const last = data.utcOffsets[data.utcOffsets.length - 1];
  const zones =
    data.zoneCount > 1
      ? `${Where} spans ${data.zoneCount} standard time offsets, from ${formatOffset(first)} to ${formatOffset(last)}${data.dst ? ", and parts of it change clocks for daylight saving" : ""}.`
      : `${Where} is on ${formatOffset(first)}${data.dst ? " in standard time and changes clocks for daylight saving" : " all year"}.`;
  const kickoff =
    data.zoneCount > 1
      ? `A 20:00 winter kick-off in London falls between ${londonKickoff(first)} and ${londonKickoff(last)} local time, depending on where you are.`
      : `A 20:00 winter kick-off in London is ${londonKickoff(first)} local time.`;
  const advice =
    data.zoneCount > 1
      ? "Catch-up TV, on channels that offer it, helps where that falls at an awkward hour."
      : kickoffAdvice(first);
  const time = `${zones} ${kickoff} ${advice}`;

  const fireLine = fire
    ? `Amazon's specification for the Fire TV Stick HD (2026) names ${where} among its markets, but that model runs Vega OS, which does not support the player apps in our Fire TV guide. If you buy a stick for OTTV, choose one running Fire OS.`
    : `Amazon's specification for the Fire TV Stick HD (2026) does not name ${where} among its listed markets. If you buy a Fire TV Stick elsewhere, choose one running Fire OS, because Vega OS models do not support the player apps in our guide.`;
  const rokuLine = roku
    ? ` Roku lists ${where} as a Roku Streaming Store country, but OTTV on Roku still relies on screen mirroring from a phone or computer.`
    : "";
  const devices = `${fireLine}${rokuLine}`;

  const tvs = ["samsung-tv", "lg-tv", "apple-tv"];
  const personal = ["android", "ios", "windows", "macos"];
  const guideOrder = [
    ...(fire ? [...tvs, "fire-tv", ...personal] : [...personal, ...tvs, "fire-tv"]),
    ...(roku ? ["roku", "mag"] : ["mag", "roku"]),
  ];

  const faqs: CountryContent["faqs"] = [
    usesUsd
      ? {
          question: `Do I pay a currency conversion fee in ${where}?`,
          answer: `OTTV prices are in US dollars${others.length ? ", one of the currencies used in " + where : ", the currency used in " + where}, so paying in dollars needs no conversion. Your own payment provider may still add its fees.`,
        }
      : {
          question: `Can I pay for OTTV in the ${currency}?`,
          answer: `Plans are priced in US dollars only. If you pay in the ${currency}, your payment provider converts the amount at its own exchange rate.`,
        },
    {
      question: `Is OTTV available in ${where}?`,
      answer: `OTTV has not published a country-by-country availability list. Message us on WhatsApp before ordering, or request the free 24-hour trial to test the service on your own connection in ${where}.`,
    },
    {
      question: `Does OTTV have ${firstLanguage}-language channels?`,
      answer: `OTTV does not publish a channel list by language. The free trial opens the full lineup, so you can search for ${firstLanguage}-language channels yourself before paying.`,
    },
    {
      question: `Which device should I use for OTTV in ${where}?`,
      answer: fire
        ? `Start with a device you already own: OTTV has setup guides for smart TVs, phones, tablets and computers. If you want a streaming stick, choose a Fire TV model running Fire OS, such as the 4K Plus, because Vega OS models do not support the player apps in our guide.`
        : `Start with a device you already own. OTTV has setup guides for Android, iPhone and iPad, Windows, Mac and smart TVs, and these do not depend on buying a Fire TV Stick locally.`,
    },
  ];

  return {
    where,
    lead,
    availabilityNote: `OTTV has not published a country-by-country availability or channel list. The free 24-hour trial, with no card, is the way to test it in ${where}.`,
    priceAnswer: `OTTV costs $${shortest.price.toFixed(2)} for 1 month or $${longest.price.toFixed(2)} for 12 months, which works out to $${lowestMonthly} a month. Every plan includes the same service.`,
    formerStates: Object.entries(historicalEntries).filter(([, entry]) => entry.successorId === country.id).map(([id]) => allCountries.find((c) => c.id === id)!),
    quickFacts: [
      { label: "Region", value: data.subregion },
      { label: data.currencies.length > 1 ? "Currencies" : "Currency", value: joinList(data.currencies.map((c) => `${c.name} (${c.code})`)) },
      { label: officialLanguages ? (data.languages.length > 1 ? "Official languages" : "Official language") : "Widely spoken", value: data.languagesPartial ? joinList([...data.languages, "others"]) : languageList },
      { label: data.zoneCount > 1 ? "Standard time" : "Time zone", value: data.zoneCount > 1 ? `${formatOffset(first)} to ${formatOffset(last)}` : formatOffset(first) },
      { label: "OTTV billing currency", value: "US Dollar (USD)" },
    ],
    paying,
    languageTitle: data.languages.length > 1 ? "Checking for channels in your language" : `Checking for ${firstLanguage}-language channels`,
    language,
    time,
    devices,
    guideOrder,
    nearby: nearbyCountries(country, data.subregion),
    nearbyRegion: data.subregion,
    faqs,
  };
}
