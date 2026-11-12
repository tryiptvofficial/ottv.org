"use client"

import { useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared/Logo';
import { navCurrent, navLinks } from '@/lib/site-data/nav';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  // After following a link, focus must not jump back to the menu button: that cancels the scroll to an anchor.
  const followedLink = useRef(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="h-11 w-11 rounded-pill px-0 lg:hidden">
          <Menu className="!size-5" />
          <span className="sr-only">Toggle Navigation</span>
        </Button>
      </SheetTrigger>
      {/* Opens from the right, the side the menu button is on. */}
      <SheetContent
        side="right"
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
        <nav className="mt-10 flex flex-1 flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              aria-current={navCurrent(pathname, link.href)}
              className="-mx-3 rounded-control px-3 py-3 text-body-lg font-medium text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[current=page]:text-foreground aria-[current=true]:text-foreground"
              onClick={() => {
                followedLink.current = true;
                setIsOpen(false);
              }}
            >
              {link.name}
            </Link>))}
        </nav>
        {/* The menu covers the header's free trial button, so the menu carries it too, at the bottom where a thumb reaches. */}
        <Button asChild size="lg" className="mt-6 w-full">
          <Link
            href="/iptv-free-trial"
            onClick={() => {
              followedLink.current = true;
              setIsOpen(false);
            }}
          >
            Get IPTV Free Trial
          </Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
