import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';
import { Heading, Lead } from '@/components/ui/typography';
import { Home, Compass, HelpCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404: Page Not Found',
  // Override the layout's index/follow and homepage canonical, which don't apply to a 404.
  robots: { index: false, follow: true },
  alternates: { canonical: null, languages: {} },
};

export default function NotFound() {
  return (
    <Section spacing="spacious" className="flex min-h-[60vh] items-center">
      <Container size="narrow" className="text-center">
        <Heading level={1} size="heading-lg">
          Page Not Found
        </Heading>
        <Lead className="mt-4">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
        </Lead>
        <Button asChild size="lg" className="mt-8">
          <Link href="/">
            <Home aria-hidden />
            Go Back to Homepage
          </Link>
        </Button>

        <div className="mt-16 border-t pt-8">
          <Heading level={2} size="subheading">Or try one of these pages:</Heading>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild variant="secondary">
              <Link href="/pricing">
                <Compass aria-hidden />
                View Pricing
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/faq">
                <HelpCircle aria-hidden />
                Read FAQ
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
