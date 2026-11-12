import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "../shared/Container";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { guideGroupIcons } from "../shared/guide-group-icons";
import { guideGroups } from "@/lib/site-data/devices";

// The device grid on black: the devices OTTV has setup guides for, grouped by kind, each linking to its guide
// with that device's catch (a paid app, mirroring, a MAC address) under its name. The buffering guide helps on
// any device, so it sits under the grid instead of posing as a kind of device.
const deviceGroups = guideGroups.filter((group) => group.icon !== "help");
const helpGuide = guideGroups.find((group) => group.icon === "help")?.guides[0];

export function Devices() {
  return (
    <Section id="devices">
      <Container>
        <SectionHeader
          title="Works on TVs, Phones and Computers"
          subtitle="Each device below has a setup guide, with a note when it needs a paid player app or an extra step. A standard plan plays one stream at a time."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {deviceGroups.map((group) => {
            const Icon = guideGroupIcons[group.icon];
            return (
              <div key={group.label} className="reveal rounded-card bg-card p-4 shadow-card md:p-5">
                <div className="flex items-center gap-2.5">
                  <Icon aria-hidden className="h-5 w-5 shrink-0 text-signal" />
                  <h3 className="stamp text-subtle">{group.label}</h3>
                </div>
                <ul className="mt-3 grid grid-cols-2 gap-x-4 sm:grid-cols-1">
                  {group.guides.map((guide) => (
                    <li key={guide.name}>
                      <Link
                        href={`/devices/${guide.id}`}
                        className="group -mx-2 flex min-h-11 items-center justify-between gap-3 rounded-control px-2 py-1.5 text-label text-foreground transition-colors duration-fast hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span className="flex flex-col">
                          {guide.name}
                          {guide.note && (
                            <span className="text-caption text-muted-foreground">
                              <span className="sr-only">: </span>
                              {guide.note}
                            </span>
                          )}
                        </span>
                        <ArrowRight aria-hidden className="h-4 w-4 shrink-0 text-signal transition-transform duration-fast ease-standard group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        {helpGuide && (
          <p className="mt-6 text-label text-muted-foreground">
            Already set up and the stream buffers?{" "}
            <Link href={`/devices/${helpGuide.id}`} className="text-link">
              Read how to fix buffering
            </Link>
            .
          </p>
        )}
      </Container>
    </Section>
  );
}
