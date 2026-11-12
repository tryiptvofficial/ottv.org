import { Check, Info, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/typography";
import { Container } from "../shared/Container";
import { Grid } from "../shared/Grid";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { productFacts } from "@/lib/site-data/product-facts";

const cable = [
  "Usually watched where the cable box is installed",
  "Channel packages chosen by the provider",
  "A monthly bill, often on a contract",
  "Extra boxes for extra TVs",
];

const ottv = [
  "Watch on TVs, streaming sticks, phones and computers",
  `${productFacts.liveChannels} live channels and ${productFacts.vodTitles} on-demand titles on every plan`,
  "One payment per plan, with nothing renewing on its own",
  "Setup guides for 11 devices",
];

export function Comparison() {
  return (
    <Section>
      <Container>
        <SectionHeader
          title="How Is IPTV Different From Cable?"
          subtitle="Thinking of dropping cable? Here is how an OTTV subscription compares with a typical cable package."
        />
        <Grid cols={2}>
          <Card variant="edge" className="p-6 md:p-8">
            <Heading level={3} size="heading" className="text-muted-foreground">Typical cable TV</Heading>
            <ul className="mt-8 space-y-4 text-body text-muted-foreground">
              {cable.map((item) => (
                <li key={item} className="flex gap-3">
                  <X aria-hidden className="mt-1 h-4 w-4 shrink-0 text-subtle" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card variant="key" className="p-6 md:p-8">
            <Heading level={3} size="heading">OTTV</Heading>
            <ul className="mt-8 space-y-4 text-body text-foreground">
              {ottv.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-signal" />
                  {item}
                </li>
              ))}
            </ul>
            {/* The limit is stated under a neutral icon, not checked off: it is not a benefit. */}
            <p className="mt-6 flex gap-3 border-t pt-6 text-label text-muted-foreground">
              <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-subtle" />
              A standard plan plays one stream at a time.
            </p>
          </Card>
        </Grid>
      </Container>
    </Section>
  );
}
