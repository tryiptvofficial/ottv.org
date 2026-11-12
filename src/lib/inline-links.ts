/** A phrase inside a sentence that links to a page. `text` must appear in the sentence exactly as written. */
export type InlineLink = { text: string; href: string };

/**
 * An FAQ entry. The answer stays plain text, so the same string feeds FAQPage structured data, and `links`
 * turns the pages it mentions into links on the page (see `LinkedText`).
 */
export type FaqEntry = { question: string; answer: string; links?: InlineLink[] };
