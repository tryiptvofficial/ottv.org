
import { WhatsAppLink } from "@/components/shared/WhatsAppLink";
import { Button } from '@/components/ui/button';
import { Container } from '@/components/shared/Container';
import { Logo } from '@/components/shared/Logo';
import { MobileNav } from '@/components/shared/MobileNav';
import { NavLinks } from '@/components/shared/NavLinks';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { SiWhatsapp } from 'react-icons/si';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full pt-3">
      <Container>
        <div className="flex h-14 items-center rounded-control border bg-background/60 pl-4 pr-2 shadow-edge backdrop-blur-3xl">
          <Logo />
          <nav className="ml-10 hidden items-center space-x-6 lg:flex">
            <NavLinks />
          </nav>
          <div className="ml-auto flex items-center gap-2">
            {/* Below sm the toggle lives in the mobile menu only, so the header has room for the logo */}
            <div className="hidden sm:flex">
              <ThemeToggle />
            </div>
            <Button asChild className="max-sm:w-11 max-sm:px-0">
              <WhatsAppLink>
                <SiWhatsapp />
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
