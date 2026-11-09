import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { WhatsAppLink } from "./WhatsAppLink";
import { footerLinks } from "@/lib/site-data/footer";

export function Footer() {
  return (
    <footer data-fab-avoid>
      <Container>
        <div className="grid grid-cols-2 gap-8 py-16 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-pretty text-caption text-muted-foreground">
              Your premier IPTV service for unlocking a world of entertainment. The most reliable choice for all your streaming needs.
            </p>
          </div>
          <div>
            <h3 className="font-mono text-eyebrow uppercase text-subtle">Quick Links</h3>
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
            <h3 className="font-mono text-eyebrow uppercase text-subtle">Setup Guides</h3>
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
            <h3 className="font-mono text-eyebrow uppercase text-subtle">Contact</h3>
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
          <p className="font-mono text-meta text-subtle">
            &copy; {new Date().getFullYear()} OTTV. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
