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
const features = shortest.features.join(", ").replace(/, ([^,]*)$/, " and $1");

export const pricingPageFaqs = [
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
        answer: `Every plan includes the same service: ${features}. Plans differ only in length and price.`,
    },
    {
        question: "Does my plan renew automatically?",
        answer: "No. Each plan is a one-time payment for its full length. When it ends, you can order a new plan on WhatsApp if you want to keep watching.",
    },
    {
        question: "How do I order a plan?",
        answer: "Tap the plan's Choose button. WhatsApp opens with an order message for that plan already written, and the purchase is completed in that chat.",
    },
    {
        question: "Which devices can I use?",
        answer: "Any device that runs a player app: Amazon Fire TV Stick, Samsung and LG smart TVs, Apple TV, iPhone and iPad, Android phones and tablets, Windows PCs, Macs and MAG boxes. Roku works through screen mirroring. Each one has a step-by-step setup guide.",
    },
    {
        question: "Is there a free trial available?",
        answer: `Yes. OTTV offers a free 24-hour trial with full access to the same ${productFacts.summary} as a paid plan. You request it on WhatsApp and no credit card is needed; the IPTV Free Trial page explains how it works.`,
    },
    {
        question: "Do you offer refunds?",
        answer: "Paid plans come with a 7-day money-back guarantee. Contact us on WhatsApp within 7 days of your order.",
    },
];
