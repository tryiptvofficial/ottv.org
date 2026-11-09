
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
        </Container>
      </Section>
    </>
  );
}
