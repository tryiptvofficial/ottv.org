import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../shared/Container";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { devices } from "@/lib/site-data/devices";

const links = [...devices, { name: "Fix buffering", href: "/devices/troubleshooting" }];

export function Devices() {
  return (
    <Section id="devices" spacing="compact">
      <Container>
        <div className="grid overflow-hidden rounded-card border lg:grid-cols-2">
          <div className="p-4 md:p-8">
            <SectionHeader
              className="mb-0"
              title="Works on TVs, Phones and Computers"
              subtitle="Install a player app on the devices you use. A standard plan plays one stream at a time, so only one screen can watch at once."
            />
          </div>
          <ul className="grid grid-cols-2 gap-px border-t bg-border sm:grid-cols-3 lg:border-l lg:border-t-0">
            {links.map((device) => (
              <li key={device.name} className="bg-background">
                <Link
                  href={device.href}
                  className="group flex h-full min-h-14 items-center justify-between gap-2 p-4 text-label text-muted-foreground transition-colors duration-fast hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                >
                  {device.name}
                  <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-signal transition-transform duration-fast ease-standard group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
