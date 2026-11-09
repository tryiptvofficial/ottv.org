import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="OTTV homepage">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/favicon.svg" alt="" width={28} height={28} className="shrink-0" />
      <strong className="whitespace-nowrap font-headline text-heading-sm font-bold text-foreground">
        OT<span className="text-brand">TV</span>
      </strong>
    </Link>
  );
}
