"use client"

import { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/Logo';
import { navLinks } from '@/lib/site-data/nav';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  // After following a link, focus must not jump back to the menu button: that cancels the scroll to an anchor.
  const followedLink = useRef(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Navigation</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col"
        onCloseAutoFocus={(event) => {
          if (followedLink.current) event.preventDefault();
          followedLink.current = false;
        }}
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>
        <Logo />
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className="rounded-control px-3 py-3 text-subheading text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[current=page]:bg-accent aria-[current=page]:text-foreground"
              onClick={() => {
                followedLink.current = true;
                setIsOpen(false);
              }}
            >
              {link.name}
            </Link>))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
