import { generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site-config';

export const quickAnswers: { question: string; answer: string; link?: { href: string; label: string } }[] = [
  {
    question: "I ordered. When do I get my login details?",
    answer: "Our team sends them in the same WhatsApp chat where you placed the order. A person handles each order, so allow a short wait. If you have not heard back, reply in that chat.",
  },
  {
    question: "My app says \"expired\" or asks me to pay. Is my subscription over?",
    answer: "Not necessarily. The player app is made by another company, and some, such as Smart IPTV, SET IPTV or NET IPTV on smart TVs, can ask for their own activation fee after a trial period. That message is about the app, not your IPTVMax plan, which runs for the full length you paid for. Message us and we can suggest another app from our setup guides.",
  },
  {
    question: "My login says invalid.",
    answer: "Usually it is a typing mistake or an extra space. Copy the username, password and server URL exactly as we sent them, then sign in again.",
    link: { href: "/devices/fire-tv", label: "See how to sign in on a Fire TV Stick." },
  },
  {
    question: "Channels buffer or freeze.",
    answer: "Restart your devices, try a wired Ethernet connection, and clear the player app's cache. The buffering guide walks through each step.",
    link: { href: "/devices/troubleshooting", label: "Open the buffering troubleshooting guide." },
  },
];

export function getContactPageData() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", item: `${siteConfig.url}/` },
    { name: "Contact Us", item: `${siteConfig.url}/contact` },
  ]);
  const faqSchema = generateFAQPageSchema(quickAnswers.map(({ question, answer }) => ({ question, answer })));
  return { breadcrumbSchema, faqSchema, quickAnswers };
}
