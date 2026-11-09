import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LegalValue } from "@/components/shared/LegalPage";
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import { generateMetadata as generatePageMetadata } from "@/lib/site-config";

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: "Terms of Service | OTTV",
    description: "The terms for ordering and using an OTTV subscription: plans, payment, the free trial, streams, player apps and content rights.",
    canonical: "/terms",
  });
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lead="The terms that apply when you order or use an OTTV subscription.">
      <h2>Who provides OTTV</h2>
      <p>
        OTTV is provided by <LegalValue field="legalName" label="registered business name" />, registered at{" "}
        <LegalValue field="registeredAddress" label="registered address" />. You can reach us on{" "}
        <WhatsAppLink>WhatsApp</WhatsAppLink> or at <LegalValue field="contactEmail" label="contact email" />.
      </p>

      <h2>The service</h2>
      <p>
        OTTV is an IPTV subscription. You watch it through a player app on your own device, using login details we give you.
        Setup steps for each device are in our guides.
      </p>

      <h2>Ordering and payment</h2>
      <p>
        You order a 1, 3, 6 or 12 month plan on WhatsApp, and the purchase is completed in that chat. Prices are in US dollars
        and are shown on the <Link href="/pricing">pricing page</Link>. Each plan is one payment, and nothing renews on its own.
        If you pay in another currency, your payment provider converts the amount at its own rate.
      </p>
      <p>
        Accepted payment methods: <LegalValue field="paymentMethods" label="payment methods and who processes them" />
      </p>

      <h2>Free trial</h2>
      <p>
        You can request a free 24-hour trial on WhatsApp. No card is needed and there is nothing to cancel. See{" "}
        <Link href="/iptv-free-trial">how the free trial works</Link>.
      </p>

      <h2>Streams and connections</h2>
      <p>
        A standard plan allows one stream at a time. Watching on two devices at once needs an additional connection, which you
        can ask about on WhatsApp.
      </p>

      <h2>Player apps and devices</h2>
      <p>
        Player apps are made by other companies. Some charge their own fee, which is paid to the developer and is separate from
        your OTTV plan. Check that an app supports your device before you pay for it.
      </p>

      <h2>Content and rights</h2>
      <p>
        <LegalValue field="contentRights" label="who holds the rights to the content, approved by a lawyer" />
      </p>

      <h2>Acceptable use</h2>
      <p>
        <LegalValue field="acceptableUse" label="who may use the service, minimum age, login sharing and prohibited use" />
      </p>

      <h2>Refunds</h2>
      <p>
        Refunds are covered by our <Link href="/refund-policy">refund policy</Link>.
      </p>

      <h2>Liability</h2>
      <p>
        <LegalValue field="liability" label="limits of liability, approved by a lawyer" />
      </p>

      <h2>Governing law</h2>
      <p>
        <LegalValue field="governingLaw" label="governing law and courts" />
      </p>

      <h2>Changes to these terms</h2>
      <p>When these terms change, we update the effective date at the top of this page.</p>
    </LegalPage>
  );
}
