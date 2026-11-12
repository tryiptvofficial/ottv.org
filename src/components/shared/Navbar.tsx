
import Link from 'next/link';
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import { Logo } from '@/components/shared/Logo';
import { MobileNav } from '@/components/shared/MobileNav';
import { NavLinks } from '@/components/shared/NavLinks';
import { SiWhatsapp } from 'react-icons/si';

// One 64px bar on black with a backdrop blur and a fine bottom border. The free trial is the green action;
// WhatsApp sits beside it as an icon button. Every control has a 44px tap area that touches no other: the icon
// buttons are 44px squares, and the 36px pill reaches 44px through an invisible strip above and below it.
export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center">
          <Logo />
          <nav className="ml-10 hidden items-center gap-5 lg:flex xl:gap-7">
            <NavLinks />
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <Button asChild size="nav" className="relative px-3.5 after:absolute after:inset-x-0 after:-inset-y-1 min-[360px]:px-4">
              <Link href="/iptv-free-trial">Free Trial</Link>
            </Button>
            <Button asChild variant="ghost" size="nav" className="h-11 w-11 px-0">
              <WhatsAppLink>
                <SiWhatsapp aria-hidden className="!size-[1.125rem]" />
                <span className="sr-only">WhatsApp</span>
              </WhatsAppLink>
            </Button>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
