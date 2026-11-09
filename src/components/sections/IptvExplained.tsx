import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/typography";
import { Container } from "../shared/Container";
import { Grid } from "../shared/Grid";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";

const blocks = [
  {
    title: "What is IPTV?",
    body: "IPTV stands for Internet Protocol Television: live TV channels and on-demand video delivered over your internet connection instead of a cable or satellite line. You watch through an app on your TV, streaming stick, phone or computer.",
  },
  {
    title: "How does OTTV work?",
    body: "You choose a plan and order it on WhatsApp. Our team sends your login details in the chat, you install a player app with the setup guide for your device, sign in and start watching.",
  },
  {
    title: "What do you need?",
    body: "A stable internet connection, a compatible device and a player app. If streams buffer, a wired Ethernet connection and a restart of your devices fix most problems.",
  },
];

export function IptvExplained() {
  return (
    <Section divided spacing="compact">
      <Container>
        <SectionHeader
          eyebrow="The basics"
          title="IPTV Service Explained"
          subtitle="What IPTV is, how an OTTV subscription works, and what you need to start watching."
        />
        <Grid cols={3}>
          {blocks.map((block) => (
            <Card key={block.title} className="p-6">
              <Heading level={3} size="subheading">{block.title}</Heading>
              <p className="mt-3 text-muted-foreground">{block.body}</p>
            </Card>
          ))}
        </Grid>
        <p className="mx-auto mt-10 max-w-narrow text-center text-body text-muted-foreground">
          Ready to set up? Start with the{" "}
          <Link href="/devices/fire-tv" className="text-link">Fire TV</Link>,{" "}
          <Link href="/devices/samsung-tv" className="text-link">Samsung TV</Link> or{" "}
          <Link href="/devices/android" className="text-link">Android</Link> guide, or read the{" "}
          <Link href="/devices/troubleshooting" className="text-link">buffering guide</Link>.
        </p>
      </Container>
    </Section>
  );
}
