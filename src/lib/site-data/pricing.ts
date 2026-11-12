
import { whatsappUrl } from "@/lib/site-config";
import { productFacts } from "@/lib/site-data/product-facts";

const features = [
  "HD and 4K streams where available",
  productFacts.liveChannelsLabel,
  productFacts.vodLabel,
  "Pay-per-view (PPV) events included",
  "Smart EPG (TV guide) & catch-up TV",
  "Support on WhatsApp",
  "Works on TVs, phones and computers",
];

// What a plan does not include, shown apart from the features so a limit never reads as a benefit.
const limits = ["One stream at a time"];

/** Every plan includes the same service, so the pricing section lists these once under the plans, not on each card. */
export const planFeatures = features;
export const planLimits = limits;

const orderOnWhatsApp = (planName: string) =>
  whatsappUrl(`I would like to order the ${planName} IPTV plan.`);

export const plans = [
  {
    id: "1-month",
    name: "1 Month",
    duration: "1 month",
    price: 15.82,
    price_monthly: 15.82,
    savings: null,
    description: "One month of full service",
    features,
    limits,
    isPopular: false,
    url: "/checkout?plan=1-month",
    orderUrl: orderOnWhatsApp("1 Month"),
  },
  {
    id: "3-months",
    name: "3 Months",
    duration: "3 months",
    price: 38.30,
    price_monthly: 12.77,
    savings: "Save 19%",
    description: null,
    features,
    limits,
    isPopular: false,
    url: "/checkout?plan=3-months",
    orderUrl: orderOnWhatsApp("3 Months"),
  },
  {
    id: "6-months",
    name: "6 Months",
    duration: "6 months",
    price: 59.15,
    price_monthly: 9.86,
    savings: "Save 38%",
    description: null,
    features,
    limits,
    isPopular: false,
    url: "/checkout?plan=6-months",
    orderUrl: orderOnWhatsApp("6 Months"),
  },
  {
    id: "12-months",
    name: "12 Months",
    duration: "12 months",
    price: 88.23,
    price_monthly: 7.35,
    savings: "Save 54%",
    description: null,
    features,
    limits,
    isPopular: true,
    url: "/checkout?plan=12-months",
    orderUrl: orderOnWhatsApp("12 Months"),
  },
];
