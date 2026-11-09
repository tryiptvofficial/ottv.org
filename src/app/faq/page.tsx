
import Link from "next/link";
import { FAQ } from "@/components/sections/FAQ";
import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { Breadcrumb } from "@/components/shared/PageHeader";
import { getFaqPageData } from "@/lib/data/faq-page";
import { Schema } from "@/components/shared/Schema";
import { generateMetadata as generatePageMetadata } from "@/lib/site-config";

export function generateMetadata(): Metadata {
    return generatePageMetadata({
        title: "Frequently Asked Questions | OTTV",
        description: "Answers to common OTTV questions: the free trial, prices, devices and player apps, setup, buffering, refunds and how to reach support.",
        canonical: "/faq",
    });
}

export default async function FaqPage() {
  const { 
    faqSchema, 
    breadcrumbSchema 
  } = await getFaqPageData();

  return (
    <>
      <Schema id="faq" schema={faqSchema} />
      <Schema id="breadcrumb" schema={breadcrumbSchema} />

      <Section data-fab-avoid>
        <Container>
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "FAQ" }]} className="mb-8" />
          <FAQ bare />
          <nav aria-label="Related pages" className="mx-auto mt-12 max-w-narrow">
            <h2 className="text-subheading text-foreground">Where to go next</h2>
            <ul className="mt-4 grid gap-2 text-body sm:grid-cols-2">
              <li><Link href="/pricing" className="text-link">Plans and prices</Link></li>
              <li><Link href="/iptv-free-trial" className="text-link">How the 24-hour free trial works</Link></li>
              <li><Link href="/devices/troubleshooting" className="text-link">Fix IPTV buffering</Link></li>
              <li><Link href="/locations" className="text-link">Pages by country and territory</Link></li>
              <li><Link href="/contact" className="text-link">Contact support on WhatsApp</Link></li>
            </ul>
          </nav>
        </Container>
      </Section>
    </>
  );
}
