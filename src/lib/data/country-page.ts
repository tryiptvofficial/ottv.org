import { notFound } from 'next/navigation';
import { getCountryById, historicalEntries } from "@/lib/countries";
import { buildCountryContent, countryFacts } from "@/lib/country-content";
import { plans } from "@/lib/site-data/pricing";
import { productFacts } from "@/lib/site-data/product-facts";
import { siteConfig } from "@/lib/site-config";
import { generateBreadcrumbSchema, generateFAQPageSchema, generateServiceSchema } from '@/lib/schema';

export function getCountryPageData(countryId: string) {
  const country = getCountryById(countryId);
  if (!country) {
    notFound();
  }

  const pageUrl = `${siteConfig.url}/country/${country.id}`;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${siteConfig.url}/` },
    { name: "Locations", item: `${siteConfig.url}/locations` },
    { name: country.name, item: pageUrl },
  ]);

  const history = historicalEntries[country.id];
  const data = countryFacts(country);
  if (history || !data) {
    return { country, breadcrumbSchema, history, content: null, serviceSchema: null, pageFaqs: [], faqSchema: null };
  }

  const content = buildCountryContent(country, data);

  // No areaServed: availability per country has not been confirmed by the owner yet.
  const serviceSchema = generateServiceSchema({
    serviceType: "IPTV subscription",
    name: "OTTV subscription",
    description: `IPTV subscription with ${productFacts.summary}, ordered on WhatsApp and watched through a player app, in 1, 3, 6 and 12 month plans priced in US dollars.`,
    offers: plans.map((plan) => ({
      "@type": "Offer" as const,
      name: plan.name,
      price: plan.price.toFixed(2),
      priceCurrency: "USD",
      url: `${siteConfig.url}/pricing`,
    })),
  });

  const pageFaqs = content.faqs;
  const faqSchema = generateFAQPageSchema(pageFaqs);

  return { country, breadcrumbSchema, history, content, serviceSchema, pageFaqs, faqSchema };
}
