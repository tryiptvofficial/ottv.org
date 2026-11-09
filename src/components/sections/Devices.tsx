
"use client";

import { Container } from "../shared/Container";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { devices } from "@/lib/site-data/devices";
import { DeviceIcon } from "./DeviceIcon";
import { Reveal, blurFade } from "../shared/Reveal";
import { SectionBackdrop } from "../shared/SectionBackdrop";

export function Devices() {
  return (
    <Section id="devices" spacing="compact" className="isolate overflow-x-clip">
      <SectionBackdrop />
      <Container>
        <SectionHeader
          eyebrow="Compatibility"
          title="Works on All Your Devices"
          subtitle="Watch on your TV, computer, tablet, or phone. OTTV is compatible with a wide range of devices."
        />
        <Reveal variants={blurFade} delay={0.1}>
          <div className="mx-auto flex max-w-medium flex-wrap justify-center gap-4">
            {devices.map((device) => (
              <DeviceIcon key={device.name} name={device.name} iconName={device.icon} href={device.href} />
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
