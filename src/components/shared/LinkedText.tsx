import { Fragment } from "react";
import Link from "next/link";
import type { InlineLink } from "@/lib/inline-links";
import { keepTogether } from "@/lib/keep-together";

interface LinkedTextProps {
  text: string;
  links?: InlineLink[];
}

/**
 * Plain text with some phrases turned into links. The words stay exactly as written, so one string can feed
 * both the page and structured data such as an FAQ answer. Each phrase links at its first occurrence; a phrase
 * missing from the text throws, so a reworded answer fails the build instead of silently losing its link.
 */
export function LinkedText({ text, links = [] }: LinkedTextProps) {
  const located = links
    .map((link) => ({ ...link, at: text.indexOf(link.text) }))
    .sort((a, b) => a.at - b.at);

  const parts: React.ReactNode[] = [];
  let cursor = 0;
  for (const link of located) {
    if (link.at === -1) throw new Error(`LinkedText: "${link.text}" is not in "${text}"`);
    if (link.at < cursor) throw new Error(`LinkedText: "${link.text}" overlaps another link in "${text}"`);
    parts.push(<Fragment key={`text-${cursor}`}>{keepTogether(text.slice(cursor, link.at))}</Fragment>);
    parts.push(
      <Link key={link.at} href={link.href} className="text-link">
        {link.text}
      </Link>,
    );
    cursor = link.at + link.text.length;
  }
  parts.push(<Fragment key={`text-${cursor}`}>{keepTogether(text.slice(cursor))}</Fragment>);

  return <>{parts}</>;
}
