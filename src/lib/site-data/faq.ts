import type { FaqEntry } from "@/lib/inline-links";
import { legalPagesReady } from "@/lib/site-data/legal-details";
import { plans } from "@/lib/site-data/pricing";
import { productFacts } from "@/lib/site-data/product-facts";

const planPrices = plans
    .map((plan) => `$${plan.price.toFixed(2)} for ${plan.name.toLowerCase()}`)
    .join(", ")
    .replace(/, ([^,]*)$/, " or $1");
const longest = plans[plans.length - 1];

// The answers stay plain text because /faq also turns them into FAQPage structured data. `links` makes the pages
// an answer mentions into links on the page.
export const faqs: FaqEntry[] = [
    {
        question: "What is IPTV and how does OTTV work?",
        answer: `IPTV (Internet Protocol Television) delivers live TV and on-demand video over your internet connection instead of cable or satellite. OTTV, formerly IPTVMax, is an IPTV subscription: you order a plan on WhatsApp, receive your login details in the chat, and watch ${productFacts.summary} through a player app on your device.`,
    },
    {
        question: "Can I get a free trial of OTTV?",
        answer: "Yes. We offer a 24-hour free trial with full access, and no credit card is needed. You request it on WhatsApp from our IPTV Free Trial page.",
        links: [{ text: "IPTV Free Trial page", href: "/iptv-free-trial" }],
    },
    {
        question: "How much does OTTV cost?",
        answer: `OTTV costs $${plans[0].price.toFixed(2)} for one month, or $${longest.price_monthly.toFixed(2)} a month on the 12-month plan. All four plans are priced in US dollars: ${planPrices}.`,
    },
    {
        question: "Which devices can I use with OTTV?",
        answer: "Amazon Fire TV Stick (Firestick) models running Fire OS, Samsung and LG smart TVs, Apple TV, iPhone and iPad, Android phones and tablets, Windows PCs, Macs and MAG boxes. Roku works through screen mirroring. Each device has a step-by-step setup guide. You can install the app on several devices, but a standard plan plays one stream at a time.",
        links: [
            { text: "screen mirroring", href: "/devices/roku" },
            { text: "step-by-step setup guide", href: "/devices" },
        ],
    },
    {
        question: "What is the best IPTV player app to use with OTTV?",
        answer: "It depends on your device. On Fire TV and Android, our guides use IPTV Smarters Pro or TiviMate, which is made for TV screens. On iPhone, iPad and Apple TV, they use GSE SMART IPTV PRO or iPlayTV, which are paid apps. On Samsung and LG TVs, they use SET IPTV or NET IPTV, which charge a fee paid to their developers. On Windows, they use MyIPTV Player or VLC. MAG boxes use a portal instead of an app.",
        links: [{ text: "our guides", href: "/devices" }],
    },
    {
        question: "How do I set up OTTV on my device?",
        answer: "Open the setup guide for your device, install the player app it recommends, and sign in with the login details we send you. Each guide walks through the steps in order.",
        links: [{ text: "setup guide for your device", href: "/devices" }],
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
        question: "Can I watch OTTV on two devices at the same time?",
        answer: "A standard plan allows one stream at a time. To watch on two devices at once you need an additional connection, so message us on WhatsApp about a custom plan.",
    },
    {
        question: "Should I use an M3U link or an Xtream Codes login?",
        answer: "Use the Xtream Codes login when your app offers it. You enter a username, password and server URL, which is quicker and easier to correct than a long link. An M3U link is one web address for the whole playlist, for apps that only ask for a URL. MAG boxes use a portal address instead.",
    },
    {
        question: "What internet speed do I need for OTTV?",
        answer: "We recommend a steady download speed of 25 to 30 Mbps for HD and 4K. Stability matters more than peak speed, and everyone streaming at home shares the same connection. The 24-hour free trial lets you test your own connection before paying.",
        links: [{ text: "24-hour free trial", href: "/iptv-free-trial" }],
    },
    {
        question: "How do the TV guide and catch-up TV work?",
        answer: "The TV guide (EPG) shows what is on now and next inside your player app. Catch-up lets you go back to programmes you missed, on channels that offer it. If the guide is empty after you sign in, reload or update it from the app's settings.",
    },
    {
        question: "Why is my OTTV stream buffering?",
        answer: "Buffering usually comes from the connection or the device. Restart your devices, use a wired Ethernet connection instead of Wi-Fi where you can, and clear the player app's cache. Our buffering troubleshooting guide covers each step.",
        links: [{ text: "buffering troubleshooting guide", href: "/devices/troubleshooting" }],
    },
    {
        question: "What is your refund policy?",
        answer: "Paid plans come with a 7-day money-back guarantee. Contact us on WhatsApp within 7 days of your order.",
        // The refund policy returns 404 until the legal pages are published (legal-details.ts), so the link waits too.
        links: legalPagesReady ? [{ text: "7-day money-back guarantee", href: "/refund-policy" }] : undefined,
    },
    {
        question: "How do I contact OTTV support?",
        answer: "All support runs through WhatsApp. Message us from the contact page and our team replies in the same chat.",
        links: [{ text: "contact page", href: "/contact" }],
    },
];
