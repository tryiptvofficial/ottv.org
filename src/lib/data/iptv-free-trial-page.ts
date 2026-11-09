import { generateBreadcrumbSchema, generateFAQPageSchema, generateServiceSchema } from '@/lib/schema';
import { plans } from "@/lib/site-data/pricing";
import { productFacts } from "@/lib/site-data/product-facts";
import { siteConfig } from '@/lib/site-config';

const planPrices = plans
  .map((plan) => `$${plan.price.toFixed(2)} for ${plan.name.toLowerCase()}`)
  .join(", ")
  .replace(/, ([^,]*)$/, " or $1");
const longestPlan = plans[plans.length - 1];

export const trialFaqs = [
  {
    question: "How long does the OTTV free trial last?",
    answer: "24 hours. The trial gives you full access for one day, then it ends on its own.",
  },
  {
    question: "Do I need a credit card for the IPTV free trial?",
    answer: "No. You request the trial in a WhatsApp chat, and we never ask for card or bank details, so there is nothing to charge when it ends.",
  },
  {
    question: "How do I receive my trial login details?",
    answer: "Our team sends them in the same WhatsApp chat where you asked for the trial. A person handles each request, so allow a short wait for the reply.",
  },
  {
    question: "Which devices can I use during the trial?",
    answer: "Any device that runs a player app: Amazon Fire TV Stick, Samsung and LG smart TVs, Apple TV, iPhone and iPad, Android phones and tablets, Windows PCs, Macs and MAG boxes. Roku works through screen mirroring. Each one has a step-by-step setup guide.",
  },
  {
    question: "Is the free trial the same as a paid plan?",
    answer: `Yes. The trial opens the same ${productFacts.summary}, with the same features as a paid plan. Only the length is different.`,
  },
  {
    question: "What happens when the 24 hours end?",
    answer: "Your access stops automatically. There is nothing to cancel and nothing is charged. If you want to keep watching, choose a plan and order it on WhatsApp.",
  },
  {
    question: "How much does OTTV cost after the trial?",
    answer: `Plans are priced in US dollars and paid once per plan: ${planPrices}. The 12-month plan works out to $${longestPlan.price_monthly.toFixed(2)} a month.`,
  },
];

export function getIptvFreeTrialPageData() {
  const pageUrl = `${siteConfig.url}/iptv-free-trial`;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${siteConfig.url}/` },
    { name: "IPTV Free Trial", item: pageUrl },
  ]);

  const faqSchema = generateFAQPageSchema(trialFaqs);

  const serviceSchema = generateServiceSchema({
    serviceType: "IPTV free trial",
    name: "OTTV 24-hour free trial",
    description: `Free 24-hour OTTV trial with full access to ${productFacts.summary}. Requested on WhatsApp; no payment details needed.`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      url: pageUrl,
    },
  });

  return { breadcrumbSchema, faqSchema, serviceSchema, trialFaqs };
}
