import type { FaqEntry } from "@/lib/inline-links";
import { legalPagesReady } from "@/lib/site-data/legal-details";
import { plans } from "@/lib/site-data/pricing";
import { productFacts } from "@/lib/site-data/product-facts";

const shortest = plans[0];
const longest = plans[plans.length - 1];
const planPrices = plans
    .map((plan) => `$${plan.price.toFixed(2)} for ${plan.name.toLowerCase()}`)
    .join(", ")
    .replace(/, ([^,]*)$/, " or $1");
const yearOfMonthly = shortest.price_monthly * 12;
const yearlySaving = (yearOfMonthly - longest.price).toFixed(2);
// List items start with a capital; mid-sentence, lower-case the first letter unless it starts an acronym (HD).
const midSentence = (item: string) => (/^[A-Z][a-z]/.test(item) ? item[0].toLowerCase() + item.slice(1) : item);
const featureItems = shortest.features.map(midSentence);
// "and" goes before the last item itself: items can contain commas, so it cannot go after the last comma.
const features = `${featureItems.slice(0, -1).join(", ")} and ${featureItems[featureItems.length - 1]}`;

// The answers stay plain text for the FAQPage structured data; `links` makes the pages they mention into links.
export const pricingPageFaqs: FaqEntry[] = [
    {
        question: "How much does an OTTV subscription cost?",
        answer: `Plans are priced in US dollars: ${planPrices}. The 12-month plan works out to $${longest.price_monthly.toFixed(2)} a month.`,
    },
    {
        question: "Which IPTV subscription plan offers the best value?",
        answer: `The 12-month plan. At $${longest.price.toFixed(2)} it costs $${longest.price_monthly.toFixed(2)} a month, ${longest.savings?.replace("Save ", "")} less than paying $${shortest.price.toFixed(2)} every month, which would come to $${yearOfMonthly.toFixed(2)} over a year: a saving of $${yearlySaving}.`,
    },
    {
        question: "What does every OTTV plan include?",
        answer: `Every plan includes the same service: ${features}. Plans differ only in length and price, and a standard plan allows one stream at a time.`,
    },
    {
        question: "Does my plan renew automatically?",
        answer: "No. Each plan is a one-time payment for its full length. When it ends, you can order a new plan on WhatsApp if you want to keep watching.",
    },
    {
        question: "How do I order a plan?",
        answer: "Tap Order on WhatsApp on the plan you want. WhatsApp opens with an order message for that plan already written, and the purchase is completed in that chat.",
    },
    {
        question: "Which devices can I use?",
        answer: "Any device that runs a player app: Amazon Fire TV Stick (Firestick) models running Fire OS, Samsung and LG smart TVs, Apple TV, iPhone and iPad, Android phones and tablets, Windows PCs, Macs and MAG boxes. Roku works through screen mirroring. Each one has a step-by-step setup guide.",
        links: [
            { text: "screen mirroring", href: "/devices/roku" },
            { text: "step-by-step setup guide", href: "/devices" },
        ],
    },
    {
        question: "Is there a free trial available?",
        answer: `Yes. OTTV offers a 24-hour free trial with full access to the same ${productFacts.summary} as a paid plan. You request it on WhatsApp and no credit card is needed; the IPTV Free Trial page explains how it works.`,
        links: [{ text: "IPTV Free Trial page", href: "/iptv-free-trial" }],
    },
    {
        question: "Do you offer refunds?",
        answer: "Paid plans come with a 7-day money-back guarantee. Contact us on WhatsApp within 7 days of your order.",
        // The refund policy returns 404 until the legal pages are published (legal-details.ts), so the link waits too.
        links: legalPagesReady ? [{ text: "7-day money-back guarantee", href: "/refund-policy" }] : undefined,
    },
];
