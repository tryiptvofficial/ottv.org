import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Check, MessageCircle, PenLine } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { IconTile } from '@/components/ui/icon-tile';
import { Heading } from '@/components/ui/typography';
import { Callout } from '@/components/shared/Callout';
import { ContactForm } from '@/components/shared/ContactForm';
import { Container } from '@/components/shared/Container';
import { FaqList } from '@/components/shared/FaqList';
import { Grid } from '@/components/shared/Grid';
import { PageHeader } from '@/components/shared/PageHeader';
import { Schema } from '@/components/shared/Schema';
import { Section } from '@/components/shared/Section';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { WhatsAppLink } from '@/components/shared/WhatsAppLink';
import { getContactPageData } from '@/lib/data/contact-page';
import { generateMetadata as generatePageMetadata } from '@/lib/site-config';
import { generateWebPageSchema } from '@/lib/schema';
import { LastUpdated } from "@/components/shared/LastUpdated";

const supportMessage = "Hi, I need help with my OTTV service.";

export function generateMetadata(): Metadata {
  const title = "Contact OTTV Support: Help With Orders, Login & Setup";
  const description = "Contact OTTV support on WhatsApp for help with orders, login details, setup and buffering. See what to include in your message, plus quick answers.";
  return {
    ...generatePageMetadata({ title, description, canonical: "/contact" }),
    title: { absolute: title },
  };
}

const checklist = [
  "The plan you ordered, and roughly when",
  "Your device (Fire TV Stick, Android box, smart TV, iPhone)",
  "The player app you use (IPTV Smarters Pro, TiviMate, GSE Smart IPTV)",
  "What happens, in one or two lines",
  "A screenshot of the error, if you have one",
];

const guideLinks = [
  { href: "/devices/fire-tv", label: "Fire TV Stick" },
  { href: "/devices/samsung-tv", label: "Samsung smart TV" },
  { href: "/devices/ios", label: "iPhone and iPad" },
  { href: "/devices/android", label: "Android" },
  { href: "/devices/troubleshooting", label: "Buffering fixes" },
  { href: "/faq", label: "FAQ" },
];

export default function ContactPage() {
  const { breadcrumbSchema, faqSchema, quickAnswers } = getContactPageData();
  const faqItems = quickAnswers.map((item) => ({
    question: item.question,
    answer: (
      <>
        {item.answer}
        {item.link && (
          <>
            {" "}
            <Link href={item.link.href} className="text-link">{item.link.label}</Link>
          </>
        )}
      </>
    ),
  }));

  return (
    <>
      <Schema id="breadcrumb" schema={breadcrumbSchema} />
      <Schema id="webpage" schema={generateWebPageSchema({ type: "ContactPage", path: "/contact", name: "Contact OTTV Support" })} />
      <Schema id="faq" schema={faqSchema} />

      <Section>
        <Container>
          <PageHeader
            breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
            title="OTTV Support Center"
            lead="All OTTV support runs through WhatsApp. Message us and our team replies in the same chat."
            className="mb-0 md:mb-0"
          />
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <SectionHeader title="Choose How to Contact Us" />
          <Grid as="ul" cols={3}>
            <Card as="li" className="flex flex-col p-6">
              <IconTile className="mb-6"><MessageCircle aria-hidden /></IconTile>
              <Heading level={3} size="subheading">Chat with us on WhatsApp</Heading>
              <p className="mt-2 flex-grow text-muted-foreground">Orders, login details, setup or anything else. Tell us your device and what happens.</p>
              <Button asChild className="mt-6 w-full">
                <WhatsAppLink message={supportMessage}>
                  <SiWhatsapp aria-hidden />
                  Open WhatsApp
                </WhatsAppLink>
              </Button>
            </Card>
            <Card as="li" className="flex flex-col p-6">
              <IconTile className="mb-6"><PenLine aria-hidden /></IconTile>
              <Heading level={3} size="subheading">Write your message here</Heading>
              <p className="mt-2 flex-grow text-muted-foreground">Prefer to type it out first? The form below opens WhatsApp with your name, email and message already filled in.</p>
              <Button asChild variant="secondary" className="mt-6 w-full">
                <Link href="#contact-form">Go to the form</Link>
              </Button>
            </Card>
            <Card as="li" className="flex flex-col p-6">
              <IconTile className="mb-6"><BookOpen aria-hidden /></IconTile>
              <Heading level={3} size="subheading">Browse setup guides</Heading>
              <p className="mt-2 text-muted-foreground">Step-by-step setup for each device we support, plus fixes for buffering.</p>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-caption">
                {guideLinks.map((link) => (
                  <li key={link.href}><Link href={link.href} className="text-link">{link.label}</Link></li>
                ))}
              </ul>
            </Card>
          </Grid>
        </Container>
      </Section>

      <Section>
        <Container>
          <Grid cols="aside" gap="loose">
            <div>
              <Heading level={2} size="heading">Include This in Your Message</Heading>
              <p className="mt-4 text-body text-muted-foreground">These details help us solve the problem in fewer messages.</p>
              <ul className="mt-6 space-y-3 text-body text-muted-foreground">
                {checklist.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Card id="contact-form" className="scroll-mt-24 p-6">
              <Heading level={2} size="subheading">Send us a message</Heading>
              <p className="mt-2 text-caption text-muted-foreground">Submitting opens WhatsApp with your message ready to send.</p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </Card>
          </Grid>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <SectionHeader
            title="Common Support Questions"
            subtitle="The questions we hear most, with the fix for each."
          />
          <FaqList items={faqItems} />
        </Container>
      </Section>

      <Section>
        <Container>
          <Callout
            title="Still Need Help?"
            action={
              <Button asChild size="lg">
                <WhatsAppLink message={supportMessage}>
                  <SiWhatsapp aria-hidden />
                  Message us on WhatsApp
                </WhatsAppLink>
              </Button>
            }
          >
            Send us a message and we reply in the same chat.
          </Callout>
        </Container>
      </Section>
      <LastUpdated />
    </>
  );
}
