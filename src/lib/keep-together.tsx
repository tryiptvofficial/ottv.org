import type React from "react";

// A number joined to its unit by a hyphen: "12-month", "7-day", "24-hour". On a narrow screen the browser may
// break the line after the hyphen and leave "12-" at the end of a line.
const COMPOUND = /(\b\d+-(?:month|day|hour|minute)s?\b)/;

/**
 * Keeps number-unit compounds such as "12-month" on one line by wrapping each in a no-wrap span. The text itself
 * is unchanged (a real hyphen, not U+2011), so in-page search and copied text still match. Shared text
 * components (fact labels, step text, FAQ rows, linked text) run their strings through it.
 */
export function keepTogether(text: string | null | undefined): React.ReactNode {
  if (!text) return text;
  const parts = text.split(COMPOUND);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
