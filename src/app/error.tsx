'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { Heading, Lead } from '@/components/ui/typography';

// Shown inside the root layout when a page throws. Keeps the error message out of the UI;
// the digest lets server logs be matched to a report.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section spacing="spacious" className="flex min-h-[60vh] items-center">
      <Container size="narrow" className="text-center">
        <Heading level={1} size="heading-lg">
          Something went wrong
        </Heading>
        <Lead className="mt-4">
          This page didn&apos;t load properly. Please try again.
        </Lead>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" onClick={reset}>
            Try again
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/">Go to homepage</Link>
          </Button>
        </div>
        {error.digest && (
          <p className="mt-6 font-mono text-meta text-subtle">Reference: {error.digest}</p>
        )}
      </Container>
    </Section>
  );
}
