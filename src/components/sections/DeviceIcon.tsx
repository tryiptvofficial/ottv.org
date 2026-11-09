import type { ComponentType } from "react";
import {
  SiAmazonfiretv,
  SiAndroid,
  SiAppletv,
  SiLg,
  SiMacos,
  SiRoku,
  SiSamsung,
} from "react-icons/si";
import { Tv } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DeviceIconProps {
  name: string;
  iconName: string;
  href: string;
}

// Named imports keep the bundle to these icons; `import *` shipped every simple-icon.
// Names in devices.ts without an entry here (SiIphone, SiIpad, SiWindows) aren't in
// react-icons/si, so those devices render nothing, as before.
const icons: Record<string, ComponentType<{ className?: string }>> = {
  SiAmazonfiretv,
  SiAndroid,
  SiAppletv,
  SiLg,
  SiMacos,
  SiRoku,
  SiSamsung,
  Tv,
};

export function DeviceIcon({ name, iconName, href }: DeviceIconProps) {
  const Icon = icons[iconName];

  if (!Icon) {
    return null;
  }

  const isInternal = href.startsWith('/');
  const Component = isInternal ? Link : 'a';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Component href={href} aria-label={name} className={cn(
            "group flex h-16 w-16 items-center justify-center rounded-panel border bg-card transition-colors duration-fast hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            !isInternal && "cursor-pointer",
            href === '#' && "pointer-events-none opacity-50"
          )}>
            <Icon aria-hidden className="h-8 w-8 text-muted-foreground transition-colors duration-fast group-hover:text-foreground" />
          </Component>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
