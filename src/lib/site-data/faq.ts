import { plans } from "@/lib/site-data/pricing";
import { productFacts } from "@/lib/site-data/product-facts";

const planPrices = plans
    .map((plan) => `$${plan.price.toFixed(2)} for ${plan.name.toLowerCase()}`)
    .join(", ")
    .replace(/, ([^,]*)$/, " or $1");
const longest = plans[plans.length - 1];

export const faqs = [
    {
        question: "What is IPTV and how does OTTV work?",
        answer: `IPTV (Internet Protocol Television) delivers live TV and on-demand video over your internet connection instead of cable or satellite. With OTTV you order a plan on WhatsApp, receive your login details in the chat, and watch ${productFacts.summary} through a player app on your device.`,
    },
    {
        question: "Can I get a free trial of OTTV?",
        answer: "Yes. We offer a free 24-hour trial with full access, and no credit card is needed. You request it on WhatsApp from our IPTV Free Trial page.",
    },
    {
        question: "How much does OTTV cost?",
        answer: `Plans are priced in US dollars: ${planPrices}. The 12-month plan works out to $${longest.price_monthly.toFixed(2)} a month.`,
    },
    {
        question: "Which devices can I use with OTTV?",
        answer: "Amazon Fire TV Stick, Samsung and LG smart TVs, Apple TV, iPhone and iPad, Android phones and tablets, Windows PCs, Macs and MAG boxes. Roku works through screen mirroring. Each device has a step-by-step setup guide.",
    },
    {
        question: "What is the best IPTV player app to use with OTTV?",
        answer: "It depends on your device. Our setup guides use IPTV Smarters Pro or TiviMate on Fire TV and Android, GSE Smart IPTV on iPhone, iPad and Apple TV, Smart IPTV, SET IPTV or NET IPTV on Samsung and LG TVs, and MyIPTV Player or VLC on Windows. MAG boxes use a portal instead of an app.",
    },
    {
        question: "How do I set up OTTV on my device?",
        answer: "Open the setup guide for your device, install the player app it recommends, and sign in with the login details we send you. Each guide walks through the steps in order.",
    },
    {
        question: "How do I get my login details after ordering?",
        answer: "Our team sends them in the same WhatsApp chat where you placed your order. A person handles each order, so allow a short wait for the reply.",
    },
    {
        question: "Does my OTTV plan renew automatically?",
        answer: "No. Each plan is a one-time payment for its full length. When it ends, you can order a new plan on WhatsApp if you want to keep watching.",
    },
    {
        question: "Why is my OTTV stream buffering?",
        answer: "Buffering usually comes from the connection or the device. Restart your devices, use a wired Ethernet connection instead of Wi-Fi where you can, and clear the player app's cache. Our buffering troubleshooting guide covers each step.",
    },
    {
        question: "What is your refund policy?",
        answer: "Paid plans come with a 7-day money-back guarantee. Contact us on WhatsApp within 7 days of your order.",
    },
    {
        question: "How do I contact OTTV support?",
        answer: "All support runs through WhatsApp. Message us from the contact page and our team replies in the same chat.",
    },
];
