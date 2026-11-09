import { Container } from "../shared/Container";
import { Section } from "../shared/Section";
import { Heading } from "../ui/typography";
import { plans } from "@/lib/site-data/pricing";

const shortest = plans[0];
const longest = plans[plans.length - 1];

const facts = [
  { term: "Price", detail: `$${shortest.price.toFixed(2)} for 1 month, or $${longest.price_monthly.toFixed(2)} a month on the 12-month plan` },
  { term: "Free trial", detail: "24 hours of full access, with no card" },
  { term: "Billing", detail: "One payment in US dollars per plan. Nothing renews on its own" },
  { term: "Refunds", detail: "7-day money-back guarantee on paid plans" },
  { term: "Streams", detail: "One at a time on a standard plan" },
  { term: "Orders and support", detail: "On WhatsApp, in one chat" },
];

/** The facts most visitors look for first, in one scannable block. */
export function KeyFacts() {
  return (
    <Section spacing="none" className="pb-20 md:pb-24">
      <Container>
        <Heading level={2} size="heading-sm" className="text-center">OTTV at a Glance</Heading>
        <dl className="mx-auto mt-8 grid max-w-page gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.term}>
              <dt className="text-meta text-subtle">{fact.term}</dt>
              <dd className="mt-1 text-label text-foreground">{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
