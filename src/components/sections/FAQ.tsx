import { faqs } from "@/lib/site-data/faq";
import { Container } from "../shared/Container";
import { FaqList } from "../shared/FaqList";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { Reveal } from "../shared/Reveal";

interface FAQProps {
  /** /faq supplies its own Section and Container, and the header acts as the page header. */
  bare?: boolean;
}

export function FAQ({ bare = false }: FAQProps) {
  const content = (
    <>
      <SectionHeader
        level={bare ? 1 : 2}
        className={bare ? "md:mb-16" : undefined}
        title="Frequently Asked Questions"
        subtitle="Answers on cost, setup and the free trial. Still stuck? Message us on WhatsApp."
      />
      <Reveal delay={0.1}>
        <FaqList items={faqs} headingLevel={bare ? 2 : 3} />
      </Reveal>
    </>
  );

  if (bare) return content;

  return (
    <Section tone="light" id="faq" spacing="compact">
      <Container>{content}</Container>
    </Section>
  );
}
