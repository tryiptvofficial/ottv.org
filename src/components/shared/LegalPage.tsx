import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";
import { legalDetails, legalPagesReady, type LegalField } from "@/lib/site-data/legal-details";

/** Shows an owner-supplied legal fact, or a marked blank while it is missing. */
export function LegalValue({ field, label }: { field: LegalField; label: string }) {
  const value = legalDetails[field].trim();
  if (value) return <>{value}</>;
  return <mark className="rounded-control bg-accent px-1 text-foreground">[To complete: {label}]</mark>;
}

/** Layout for legal pages. Unfinished pages exist only on the dev server. */
export function LegalPage({ title, lead, children }: { title: string; lead: string; children: ReactNode }) {
  if (!legalPagesReady && process.env.NODE_ENV === "production") notFound();

  return (
    <Section data-fab-avoid>
      <Container>
        <PageHeader breadcrumb={[{ label: "Home", href: "/" }, { label: title }]} title={title} lead={lead} />
        <div className="prose max-w-narrow">
          {!legalPagesReady && (
            <p role="note" className="not-prose mb-6 rounded-card border p-4 text-body text-foreground">
              Draft for the owner and a lawyer. It is not legal advice, and it returns a 404 in production until every
              blank is completed and <code>legalReviewComplete</code> is set.
            </p>
          )}
          <p>
            Effective date: <LegalValue field="effectiveDate" label="effective date" />
          </p>
          {children}
        </div>
      </Container>
    </Section>
  );
}
