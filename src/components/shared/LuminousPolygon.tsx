import { useId } from "react";
import { cn } from "@/lib/utils";

const center = 220;

// Offset, rotated rounded squares. The centre stays hollow so the shape reads as light, not an illustration.
const outlines = [
  { size: 300, radius: 20, angle: 12, dx: 0, dy: 0, spectrum: false },
  { size: 248, radius: 18, angle: 33, dx: 10, dy: -8, spectrum: true },
  { size: 196, radius: 16, angle: 54, dx: -6, dy: 8, spectrum: false },
  { size: 146, radius: 12, angle: 74, dx: 4, dy: 4, spectrum: true },
];

function rectProps({ size, radius, angle, dx, dy }: (typeof outlines)[number]) {
  return {
    x: center - size / 2 + dx,
    y: center - size / 2 + dy,
    width: size,
    height: size,
    rx: radius,
    fill: "none",
    transform: `rotate(${angle} ${center} ${center})`,
  };
}

function SpectrumGradient({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0.15" stopColor="#ffb931" />
      <stop offset="0.3" stopColor="#ffffff" />
      <stop offset="0.4" stopColor="#ffffff" />
      <stop offset="0.7" stopColor="#2e73fc" />
    </linearGradient>
  );
}

/**
 * Decorative artwork: hollow outlines with a soft duplicate behind them, and points of light travelling
 * along the edges. The light is a separate SVG, so animating it never repaints the blurred layer.
 */
export function LuminousPolygon({ className }: { className?: string }) {
  const id = useId();
  const spectrum = `${id}-spectrum`;
  const trace = `${id}-trace`;
  const glow = `${id}-glow`;

  return (
    <div aria-hidden className={cn("relative aspect-square", className)}>
      <svg viewBox="0 0 440 440" fill="none" focusable="false" className="absolute inset-0 h-full w-full">
        <defs>
          <SpectrumGradient id={spectrum} />
          <filter id={glow} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>
        <g filter={`url(#${glow})`} opacity="0.4">
          {outlines.map((outline) => (
            <rect key={outline.size} {...rectProps(outline)} stroke="hsl(var(--foreground))" strokeWidth={3} />
          ))}
        </g>
        {outlines.map((outline) => (
          <rect
            key={outline.size}
            {...rectProps(outline)}
            stroke={outline.spectrum ? `url(#${spectrum})` : "hsl(var(--foreground))"}
            strokeOpacity={outline.spectrum ? 1 : 0.75}
            strokeWidth={1.25}
          />
        ))}
      </svg>
      <svg viewBox="0 0 440 440" fill="none" focusable="false" className="absolute inset-0 h-full w-full">
        <defs>
          <SpectrumGradient id={trace} />
        </defs>
        {outlines
          .filter((outline) => !outline.spectrum)
          .map((outline, i) => (
            <rect
              key={outline.size}
              {...rectProps(outline)}
              pathLength={1}
              stroke={`url(#${trace})`}
              strokeWidth={2}
              strokeLinecap="round"
              className={cn("polygon-trace", i === 1 && "polygon-trace-reverse")}
            />
          ))}
      </svg>
    </div>
  );
}
