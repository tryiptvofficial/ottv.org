import { cn } from "@/lib/utils";

/** Server-rendered circle flag: in the HTML on first paint, no client JavaScript. Decorative. */
export async function CountryFlag({ code, className }: { code: string; className?: string }) {
  if (!code) return null;
  const icon: { default: { body: string; width: number; height: number } } | null = await import(
    `@iconify-icons/circle-flags/${code.toLowerCase()}.js`
  ).catch(() => null);
  if (!icon) return null;
  const { body, width, height } = icon.default;
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox={`0 0 ${width} ${height}`}
      className={cn("shrink-0", className)}
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}
