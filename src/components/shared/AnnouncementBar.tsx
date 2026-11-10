import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Full-width offer strip above the navigation. It must state a real, current offer. */
export function AnnouncementBar() {
  return (
    <aside aria-label="Current offer" className="border-b bg-recessed py-2">
      <p className="flex items-center justify-center gap-2 px-4 text-center text-announcement text-foreground">
        Free 24-hour trial, no card needed
        <Link
          href="/iptv-free-trial"
          className="hidden items-center gap-1 rounded-control font-normal text-muted-foreground underline underline-offset-4 transition-colors duration-fast hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
        >
          See how it works <ArrowRight aria-hidden className="h-3.5 w-3.5" />
        </Link>
      </p>
    </aside>
  );
}
