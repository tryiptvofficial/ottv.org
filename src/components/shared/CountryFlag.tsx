import { cn } from "@/lib/utils";

/** Circle flag from /public/flags, decorative. A file keeps long country lists out of the HTML. */
export function CountryFlag({ code, className, eager = false }: { code: string; className?: string; eager?: boolean }) {
  if (!code) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/flags/${code.toLowerCase()}.svg`}
      alt=""
      width={20}
      height={20}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={cn("shrink-0", className)}
    />
  );
}
