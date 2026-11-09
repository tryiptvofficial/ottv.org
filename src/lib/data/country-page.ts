import { notFound } from 'next/navigation';
import { type Country, getCountryById, nameInSentence } from "@/lib/countries";
import { faqs } from "@/lib/site-data/faq";
import { plans } from "@/lib/site-data/pricing";
import { productFacts } from "@/lib/site-data/product-facts";
import { siteConfig } from "@/lib/site-config";
import { generateBreadcrumbSchema, generateFAQPageSchema, generateServiceSchema } from '@/lib/schema';

const lowestMonthly = Math.min(...plans.map((plan) => plan.price_monthly)).toFixed(2);

// Shared answers come from the site FAQ so every page states the same verified facts.
const sharedQuestions = [
  "How much does OTTV cost?",
  "Can I get a free trial of OTTV?",
  "Which devices can I use with OTTV?",
  "What is the best IPTV player app to use with OTTV?",
  "How do I get my login details after ordering?",
  "Does my OTTV plan renew automatically?",
  "Why is my OTTV stream buffering?",
  "What is your refund policy?",
];
const sharedFaqs = sharedQuestions.map((question) => {
  const faq = faqs.find((item) => item.question === question);
  if (!faq) throw new Error(`Missing site FAQ: ${question}`);
  return faq;
});

function countryFaqs(country: Country) {
  return [
    {
      question: `What is the best IPTV service in ${nameInSentence(country)}?`,
      answer: `The best IPTV service is the one that fits how you watch: enough channels and on-demand titles, support for the devices you own, clear prices and a way to try it first. OTTV offers ${productFacts.summary}, setup guides for 10 kinds of device, plans from $${lowestMonthly} a month and a free 24-hour trial.`,
    },
    ...sharedFaqs,
  ];
}

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

  const pageFaqs = countryFaqs(country);
  const faqSchema = generateFAQPageSchema(pageFaqs);

  return { country, breadcrumbSchema, serviceSchema, pageFaqs, faqSchema };
}
