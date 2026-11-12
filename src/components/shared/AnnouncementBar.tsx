import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Full-width offer strip above the navigation. It must state a real, current offer. */
export function AnnouncementBar() {
  return (
    <aside aria-label="Current offer" className="border-b bg-card">
      <p className="flex min-h-10 items-center justify-center gap-3 px-6 py-2 text-center text-announcement text-foreground">
        <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
        24-hour free trial, no card needed
        <Link
          href="/iptv-free-trial"
          className="hidden items-center gap-1 rounded-sm text-muted-foreground underline decoration-subtle/40 underline-offset-4 transition-colors duration-fast hover:text-foreground hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:inline-flex"
        >
          How the trial works <ArrowRight aria-hidden className="h-3.5 w-3.5" />
        </Link>
      </p>
    </aside>
  );
}
