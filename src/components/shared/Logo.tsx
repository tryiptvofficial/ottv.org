import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 rounded-control focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="IPTVMax homepage">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/favicon.svg" alt="" width={28} height={28} className="shrink-0" />
      <strong className="whitespace-nowrap font-headline text-subheading">
        <span className="font-normal">IPTV</span>Max
      </strong>
    </Link>
  );
}
