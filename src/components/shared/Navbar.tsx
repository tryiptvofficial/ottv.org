
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import { Logo } from '@/components/shared/Logo';
import { MobileNav } from '@/components/shared/MobileNav';
import { NavLinks } from '@/components/shared/NavLinks';
import { SiWhatsapp } from 'react-icons/si';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full pt-3 md:pt-6">
      <Container>
        <div className="flex h-14 items-center rounded-nav bg-onyx/90 pl-5 pr-2 shadow-nav">
          <Logo />
          <nav className="ml-10 hidden items-center space-x-6 lg:flex">
            <NavLinks />
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button asChild className="max-sm:w-11 max-sm:px-0">
              <WhatsAppLink>
                <SiWhatsapp aria-hidden />
                <span className='sr-only sm:not-sr-only'>WhatsApp</span>
              </WhatsAppLink>
            </Button>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
