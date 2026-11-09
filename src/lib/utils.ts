import { type ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Teach tailwind-merge the design-system scale (tailwind.config.ts) so `text-heading` is merged as
// a font size and `shadow-key` as a shadow, instead of being mistaken for colours and dropped.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["display-2xl", "display-xl", "display", "heading-lg", "heading", "heading-sm", "subheading", "serif-lg", "serif-sm", "stat", "body-lg", "body", "label", "caption", "meta"] },
      ],
      shadow: [{ shadow: ["nav", "mockup", "overlay"] }],
      "font-family": [{ font: ["sans", "body", "headline", "display", "serif", "mono"] }],
      rounded: [{ rounded: ["badge", "control", "panel", "card", "card-lg", "input", "pill", "nav"] }],
      "max-w": [{ "max-w": ["form", "narrow", "medium", "page"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculates the cosine similarity between two vectors.
 * @param vecA The first vector.
 * @param vecB The second vector.
 * @returns A number between -1 and 1, where 1 means identical.
 */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (!Array.isArray(vecA) || !Array.isArray(vecB)) {
    return 0;
  }
  
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * (vecB[i] || 0), 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0; // Avoid division by zero
  }
  
  return dotProduct / (magnitudeA * magnitudeB);
}
