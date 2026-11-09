
import { whatsappUrl } from "@/lib/site-config";
import { productFacts } from "@/lib/site-data/product-facts";

const features = [
  "HD and 4K Streams Where Available",
  productFacts.liveChannelsLabel,
  productFacts.vodLabel,
  "Pay-Per-View (PPV) Events Included",
  "Smart EPG (TV Guide) & Catch-Up TV",
  "Customer Support",
  "Multi-Device Compatibility",
];

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
    description: "Standard 1-month access",
    features,
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
    isPopular: true,
    url: "/checkout?plan=12-months",
    orderUrl: orderOnWhatsApp("12 Months"),
  },
];
