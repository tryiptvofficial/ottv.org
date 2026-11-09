import { Container } from "../shared/Container";
import { Section } from "../shared/Section";
import { SectionHeader } from "../shared/SectionHeader";
import { devices } from "@/lib/site-data/devices";
import { DeviceIcon } from "./DeviceIcon";
import { Reveal } from "../shared/Reveal";
import { SetupMockup } from "../shared/SetupMockup";

export function Devices() {
  return (
    <Section id="devices" spacing="compact" className="isolate overflow-x-clip">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
        <div>
          <SectionHeader
            align="start"
            className="mb-8"
            title="Works on TVs, Phones and Computers"
            subtitle="Install a player app on the devices you use. A standard plan plays one stream at a time, so only one screen can watch at once."
          />
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-3">
              {devices.map((device) => (
                <DeviceIcon key={device.name} name={device.name} iconName={device.icon} href={device.href} />
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <SetupMockup />
        </Reveal>
      </Container>
    </Section>
  );
}
