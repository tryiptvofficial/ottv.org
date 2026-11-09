import Link from "next/link";
import { ArrowRight, CalendarClock, Film, MessageCircle, MonitorPlay, Smartphone, Ticket } from "lucide-react";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
import { Heading } from "@/components/ui/typography";
import { Container } from "../shared/Container";
import { Grid } from "../shared/Grid";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { productFacts } from "@/lib/site-data/product-facts";

const features = [
  { icon: MonitorPlay, title: "HD and 4K streaming", body: "HD and 4K streams on the channels and titles that offer them.", href: "/pricing", cta: "See plans" },
  { icon: Film, title: `${productFacts.vodTitles} movies & TV shows`, body: "A large on-demand library of films and series, included in every plan.", href: "/pricing", cta: "See plans" },
  { icon: CalendarClock, title: `${productFacts.liveChannels} live channels`, body: "Live channels from around the world, with a Smart EPG TV guide and catch-up TV.", href: "/pricing", cta: "See plans" },
  { icon: Ticket, title: "Pay-per-view events included", body: "PPV events come with every plan at no extra cost.", href: "/pricing", cta: "See plans" },
  { icon: Smartphone, title: "Setup guides by device", body: "Step-by-step guides for Fire TV, smart TVs, Apple TV, phones, computers and MAG boxes.", href: "/#devices", cta: "Setup guides" },
  { icon: MessageCircle, title: "Support on WhatsApp", body: "Questions before you order and help with setup afterwards, in one WhatsApp chat.", href: "/contact", cta: "Contact us" },
];

export function Features() {
  return (
    <Section spacing="compact">
      <Container>
        <SectionHeader
          title="What You Get With OTTV"
          subtitle="The same service on every plan, whichever length you choose."
        />
        <Grid as="ul" cols={3}>
          {features.map((feature) => (
            <Card as="li" key={feature.title} className="flex flex-col p-6">
              <Heading level={3} size="subheading">{feature.title}</Heading>
              <p className="mt-2 flex-grow text-muted-foreground">{feature.body}</p>
              <div className="mt-6 flex items-center justify-between gap-4">
                <Link href={feature.href} className="inline-flex items-center gap-2 text-link">
                  {feature.cta} <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
                <IconTile>
                  <feature.icon aria-hidden />
                </IconTile>
              </div>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
