import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { WhatsAppLink } from "./WhatsAppLink";
import { footerLinks } from "@/lib/site-data/footer";

export function Footer() {
  return (
    <footer data-fab-avoid className="border-t">
      <Container>
        <div className="grid grid-cols-2 gap-8 py-16 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-pretty text-caption text-muted-foreground">
              OTTV, formerly IPTVMax, is an IPTV subscription with plans in US dollars, a free 24-hour trial and support on WhatsApp.
            </p>
          </div>
          <div>
            <p className="text-label text-foreground">Quick Links</p>
            <ul className="mt-4 space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="rounded-sm text-caption text-muted-foreground transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-label text-foreground">Setup Guides</p>
            <ul className="mt-4 space-y-2">
              {footerLinks.setupGuides.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="rounded-sm text-caption text-muted-foreground transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <p className="text-label text-foreground">Contact</p>
            <ul className="mt-4 space-y-2">
              <li>
                <WhatsAppLink className="rounded-sm text-caption text-muted-foreground transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                  Chat on WhatsApp
                </WhatsAppLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t py-6">
          <p className="text-meta text-subtle">
            &copy; {new Date().getFullYear()} OTTV. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
