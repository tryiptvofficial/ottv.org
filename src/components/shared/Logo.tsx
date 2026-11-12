import Link from "next/link";
import { OttvMark } from "./OttvMark";

export function Logo() {
  return (
    <Link href="/" className="flex min-h-11 items-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background" aria-label="OTTV homepage">
      <OttvMark className="h-7 w-7" />
      <strong className="whitespace-nowrap font-headline text-body-lg font-medium leading-none tracking-tight text-foreground">
        OTTV
      </strong>
    </Link>
  );
}
