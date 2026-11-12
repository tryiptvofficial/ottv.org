import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface GuideCardProps {
  href: string;
  title: string;
  description: string;
  /** The guide's image, an original OTTV drawing in the step-illustration style. Omit for a text-only card. */
  image?: { src: string; alt: string };
  /** The kind of device, shown as a tag on the image. */
  category?: string;
  /** A date line (for "latest updates"), shown as a stamp. */
  meta?: React.ReactNode;
  headingLevel?: 2 | 3;
  /**
   * Below 1024px, a compact row: a small thumbnail beside the category and title, without the excerpt. Used on
   * the homepage, whose three guide cards sit in one row from 1024px, where the card is the full version (narrower
   * cards would wrap the longest category tag over the drawing).
   */
  compact?: boolean;
  className?: string;
}

/**
 * The card's excerpt: the guide's first sentence when it is short enough, otherwise a cut at the last word
 * boundary with an ellipsis. A CSS line clamp would cut through the middle of a word.
 */
function excerpt(text: string, max = 120) {
  const first = /^.+?[.!?](?=\s|$)/.exec(text)?.[0] ?? text;
  if (first.length <= max) return first;
  const cut = first.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:(-]+$/, "")}…`;
}

/**
 * A setup guide as a card. The whole card is one link whose name is the guide's own question title, so
 * crawlers and screen readers get a descriptive anchor; "Read the guide" is its visible cue.
 */
export function GuideCard({ href, title, description, image, category, meta, headingLevel = 3, compact = false, className }: GuideCardProps) {
  return (
    <Card
      as="article"
      className={cn(
        "reveal group relative flex h-full transition-transform duration-standard ease-standard hover:-translate-y-0.5",
        compact ? "flex-row items-start lg:flex-col lg:items-stretch" : "flex-col",
        className,
      )}
    >
      {image && (
        <div
          className={cn(
            "relative aspect-[16/10] overflow-clip",
            compact
              ? "m-3 mr-0 w-28 shrink-0 rounded-control border lg:m-0 lg:w-auto lg:shrink lg:rounded-none lg:rounded-t-card lg:border-0 lg:border-b"
              : "rounded-t-card border-b",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1280px) 24rem, (min-width: 768px) 33vw, (min-width: 640px) 100vw, 7rem"
            unoptimized={image.src.endsWith(".svg")}
            className="object-cover"
          />
          {category && (
            <span className={cn("stamp absolute left-3 top-3 rounded-badge bg-black/80 px-2.5 py-1 text-[hsl(var(--green))] backdrop-blur-sm", compact && "hidden lg:inline")}>
              {category}
            </span>
          )}
        </div>
      )}
      <div className={cn("flex flex-1 flex-col", compact ? "p-4 lg:p-6" : "p-6")}>
        {/* In the compact row the thumbnail is too small for the tag, so the category sits above the title. */}
        {compact && image && category && <p className="stamp mb-1.5 text-subtle lg:hidden">{category}</p>}
        {meta && <p className={cn("stamp text-subtle", compact ? "mb-1.5 lg:mb-3" : "mb-3")}>{meta}</p>}
        <Heading level={headingLevel} size={compact ? "subheading" : "heading"} className={compact ? "lg:text-heading" : undefined}>
          <Link
            href={href}
            className="rounded-sm after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:after:ring-ring"
          >
            {title}
          </Link>
        </Heading>
        {compact ? (
          <div className="hidden flex-1 lg:block">
            <p className="mt-3 text-muted-foreground">{excerpt(description)}</p>
          </div>
        ) : (
          <p className="mt-3 flex-1 text-muted-foreground">{excerpt(description)}</p>
        )}
        <span aria-hidden className={cn("mt-6 items-center gap-2 text-label font-medium text-signal", compact ? "hidden lg:inline-flex" : "inline-flex")}>
          Read the guide
          <ArrowRight className="h-4 w-4 transition-transform duration-fast ease-standard group-hover:translate-x-0.5" />
        </span>
      </div>
    </Card>
  );
}
