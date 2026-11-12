"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navCurrent, navLinks } from "@/lib/site-data/nav";

export function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {navLinks.map((link) => {
        const current = navCurrent(pathname, link.href);
        return (
          <Link
            key={link.name}
            href={link.href}
            aria-current={current}
            className="touch-target rounded-sm text-label text-muted-foreground transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-[current=page]:text-foreground aria-[current=true]:text-foreground"
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
}
