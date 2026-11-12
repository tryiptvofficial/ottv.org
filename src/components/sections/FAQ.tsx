import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { faqs } from "@/lib/site-data/faq";
import { Container } from "../shared/Container";
import { FaqList } from "../shared/FaqList";
import { LinkedText } from "../shared/LinkedText";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { Reveal } from "../shared/Reveal";
import { WhatsAppLink } from "../shared/WhatsAppLink";

interface FAQProps {
  /** /faq supplies its own Section and Container, and the header acts as the page header. */
  bare?: boolean;
}

export function FAQ({ bare = false }: FAQProps) {
  // The answers are plain text in the data (they also feed structured data); the pages they mention become links here.
  const items = faqs.map((faq) => ({ question: faq.question, answer: <LinkedText text={faq.answer} links={faq.links} /> }));

  const content = (
    <>
      <SectionHeader
        level={bare ? 1 : 2}
        className={bare ? "md:mb-16" : undefined}
        title={bare ? "IPTV Questions and Answers" : "Frequently Asked Questions"}
        subtitle={
          <>
            Answers on cost, setup and the free trial. Still stuck?{" "}
            <WhatsAppLink className="text-link">Message us on WhatsApp</WhatsAppLink>.
          </>
        }
      />
      <Reveal>
        <FaqList items={items} headingLevel={bare ? 2 : 3} />
      </Reveal>
      {/* On the homepage, the trial follows the answers. Without this button, a phone ran over seven screens from the
          explainer's buttons to the closing band with nothing to tap. /faq ends with its own "Where to go next". */}
      {!bare && (
        <div data-fab-avoid className="mt-10 md:mt-12">
          <Button asChild size="lg">
            <Link href="/iptv-free-trial">
              Get IPTV Free Trial
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </div>
      )}
    </>
  );

  if (bare) return content;

  return (
    <Section id="faq" tone="light">
      <Container>{content}</Container>
    </Section>
  );
}
