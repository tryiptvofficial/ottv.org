import type { Metadata } from "next";
import { LegalPage, LegalValue } from "@/components/shared/LegalPage";
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import { generateMetadata as generatePageMetadata } from "@/lib/site-config";

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title: "Refund Policy | OTTV",
    description: "How the OTTV 7-day money-back guarantee works on paid plans, how to ask for a refund, and what happens with player app fees.",
    canonical: "/refund-policy",
  });
}

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund Policy" lead="How refunds work on OTTV plans.">
      <h2>7-day money-back guarantee</h2>
      <p>
        Paid plans come with a 7-day money-back guarantee. To ask for a refund, message us on{" "}
        <WhatsAppLink>WhatsApp</WhatsAppLink> within 7 days of your order.
      </p>

      <h2>Conditions</h2>
      <p>
        <LegalValue field="refundConditions" label="any conditions on the guarantee, or a statement that there are none" />
      </p>

      <h2>How you are paid back</h2>
      <p>
        <LegalValue field="refundProcess" label="how refunds are paid and how long they take" />
      </p>

      <h2>Free trials</h2>
      <p>The free 24-hour trial takes no payment and needs no card, so there is nothing to refund or cancel.</p>

      <h2>Player app fees</h2>
      <p>
        Some player apps charge their own fee. That fee goes to the app&apos;s developer, not to OTTV, and any refund of it
        depends on the developer or app store.
      </p>

      <h2>Your legal rights</h2>
      <p>This policy does not remove any consumer rights you have under the law where you live.</p>
    </LegalPage>
  );
}
