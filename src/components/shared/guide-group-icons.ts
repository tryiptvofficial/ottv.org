import { Cast, Laptop, LifeBuoy, Smartphone, Tv, type LucideIcon } from "lucide-react";
import type { GuideGroupIcon } from "@/lib/site-data/devices";

/** Generic line icons for each kind of device. Never a manufacturer's logo. */
export const guideGroupIcons: Record<GuideGroupIcon, LucideIcon> = {
  tv: Tv,
  stick: Cast,
  phone: Smartphone,
  computer: Laptop,
  help: LifeBuoy,
};
