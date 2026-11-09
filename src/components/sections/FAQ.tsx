import { faqs } from "@/lib/site-data/faq";
import { Container } from "../shared/Container";
import { FaqList } from "../shared/FaqList";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { Reveal, blurFade } from "../shared/Reveal";

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
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        subtitle="Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us."
      />
      <Reveal variants={blurFade} delay={0.1}>
        <FaqList items={faqs} />
      </Reveal>
    </>
  );

  if (bare) return content;

  return (
    <Section id="faq" spacing="compact">
      <Container>{content}</Container>
    </Section>
  );
}
