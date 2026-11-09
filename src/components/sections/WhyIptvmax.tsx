import { Heading } from "@/components/ui/typography";
import { Container } from "../shared/Container";
import { Grid } from "../shared/Grid";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { plans } from "@/lib/site-data/pricing";
import { productFacts } from "@/lib/site-data/product-facts";

const shortest = plans[0];
const longest = plans[plans.length - 1];

const reasons = [
  {
    title: "One service, four plan lengths",
    body: `Every plan includes ${productFacts.summary}, the TV guide, catch-up TV and HD or 4K streams where available. Only the length and the price change.`,
  },
  {
    title: "Ordering and help in one place",
    body: "You order on WhatsApp, receive your login details in the same chat, and come back to that chat whenever you need help with setup.",
  },
  {
    title: "Clear prices in US dollars",
    body: `Plans run from $${shortest.price.toFixed(2)} for one month to $${longest.price.toFixed(2)} for twelve months ($${longest.price_monthly.toFixed(2)} a month). Each plan is one payment, and nothing renews on its own.`,
  },
  {
    title: "Try it before you pay",
    body: "Start with a free 24-hour trial, with no card needed. Paid plans also come with a 7-day money-back guarantee.",
  },
];

export function WhyIptvmax() {
  return (
    <Section divided spacing="compact">
      <Container>
        <SectionHeader
          eyebrow="Why IPTVMax"
          title="Why Choose IPTVMax?"
          subtitle="Straightforward plans, setup help for your devices and a free trial before you commit."
        />
        <Grid cols={2} gap="loose" className="mx-auto max-w-medium">
          {reasons.map((reason) => (
            <div key={reason.title}>
              <Heading level={3} size="subheading">{reason.title}</Heading>
              <p className="mt-2 text-muted-foreground">{reason.body}</p>
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
