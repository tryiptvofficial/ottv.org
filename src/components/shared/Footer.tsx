import Link from "next/link";
import { Container } from "./Container";
import { ConsentSettingsButton } from "./ConsentManager";
import { Logo } from "./Logo";
import { WhatsAppLink } from "./WhatsAppLink";
import { footerLinks } from "@/lib/site-data/footer";

// On phones every footer link is a 44px row, so the rows need no gap between them; from 768px, where a pointer is
// likely, the links go back to compact text lines.
const linkClasses =
  "inline-flex min-h-11 items-center rounded-sm text-label text-muted-foreground transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:min-h-0";

// The footer on black: brand, quick links, every setup guide and contact, then the legal line.
export function Footer() {
  return (
    <footer data-fab-avoid className="band-ink border-t">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-16 md:py-20 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-3">
            <Logo />
            <p className="mt-6 max-w-xs text-pretty text-caption text-muted-foreground">
              OTTV, formerly IPTVMax, is an IPTV subscription with plans in US dollars, a 24-hour free trial and support on WhatsApp.
            </p>
          </div>
          <div className="lg:col-span-2 lg:col-start-5">
            <p className="stamp text-foreground">Quick Links</p>
            <ul className="mt-2 md:mt-5 md:space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className={linkClasses}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 lg:col-span-4">
            <Link href="/devices" className="stamp flex min-h-11 w-fit items-center rounded-sm text-foreground underline decoration-subtle/40 underline-offset-4 transition-colors duration-fast hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:block md:min-h-0">
              Setup Guides
            </Link>
            <ul className="mt-0 grid grid-cols-2 gap-x-6 md:mt-5 md:gap-y-3">
              {footerLinks.setupGuides.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className={linkClasses}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 lg:col-span-2 lg:col-start-11">
            <p className="stamp text-foreground">Contact</p>
            <ul className="mt-2 md:mt-5 md:space-y-3">
              <li>
                <WhatsAppLink className={linkClasses}>
                  Chat on WhatsApp
                </WhatsAppLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t py-6">
          <p className="stamp text-subtle">
            &copy; {new Date().getFullYear()} OTTV. All rights reserved.
          </p>
          <ConsentSettingsButton className="stamp min-h-11 rounded-sm text-subtle underline decoration-subtle/40 underline-offset-4 transition-colors duration-fast hover:text-foreground hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:min-h-6" />
        </div>
      </Container>
    </footer>
  );
}
