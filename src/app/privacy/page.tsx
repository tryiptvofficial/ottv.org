import type { Metadata } from "next";
import { LegalPage, LegalValue } from "@/components/shared/LegalPage";
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import { generateMetadata as generatePageMetadata } from "@/lib/site-config";

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: "Privacy Policy | OTTV",
    description: "What OTTV collects when you use the site or order on WhatsApp, which analytics tools the site uses, and how to contact us about your data.",
    canonical: "/privacy",
  });
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lead="What information OTTV handles, why, and who else receives it.">
      <h2>Who is responsible</h2>
      <p>
        <LegalValue field="legalName" label="registered business name" /> is responsible for this website and for customer
        information. For privacy requests, write to <LegalValue field="contactEmail" label="contact email" />.
      </p>

      <h2>Contact form</h2>
      <p>
        The contact form asks for your name, email address and message. Submitting it opens WhatsApp with that text ready to
        send. The form does not send it to our website servers. We receive it only if you send the WhatsApp message.
      </p>

      <h2>WhatsApp conversations</h2>
      <p>
        Orders, trial requests and support happen on WhatsApp, so we receive your phone number, WhatsApp profile name and what
        you write to us, such as the plan you want. For some devices you also give us the device&apos;s MAC address. We use this
        to deliver and support your service. WhatsApp handles your chat under{" "}
        <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">its own privacy policy</a>.
      </p>

      <h2>Payments</h2>
      <p>
        <LegalValue field="paymentMethods" label="payment methods and who processes them" />
      </p>

      <h2>Analytics</h2>
      <p>
        We measure how the site is used with{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Analytics</a>, where it is
        switched on, along with{" "}
        Visitors (visitors.now) and{" "}
        <a href="https://ahrefs.com/web-analytics" target="_blank" rel="noopener noreferrer">Ahrefs Web Analytics</a>. These
        services receive technical information about your visit.
      </p>
      <p>
        <LegalValue field="analyticsConsent" label="how analytics consent is handled" />
      </p>

      <h2>Browser storage</h2>
      <p>Your browser stores your analytics choice, and can store your light or dark display preference.</p>

      <h2>How long we keep information</h2>
      <p>
        <LegalValue field="dataRetention" label="how long customer details and chats are kept" />
      </p>

      <h2>Your rights</h2>
      <p>
        <LegalValue field="privacyRights" label="legal basis and customer rights in the countries served" />
      </p>
      <p>
        You can also ask about your information on <WhatsAppLink>WhatsApp</WhatsAppLink>.
      </p>

      <h2>Changes to this policy</h2>
      <p>When this policy changes, we update the effective date at the top of this page.</p>
    </LegalPage>
  );
}
