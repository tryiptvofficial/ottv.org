
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
        <div className="flex h-14 items-center rounded-nav border bg-background/90 px-4 shadow-nav backdrop-blur-sm">
          <Logo />
          <nav className="ml-10 hidden items-center space-x-6 lg:flex">
            <NavLinks />
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button asChild className="w-9 px-0 sm:w-auto sm:px-4">
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
