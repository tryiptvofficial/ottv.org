import manifest from "../../../public/demo-assets/manifest.json";

/**
 * Typed access to public/demo-assets/manifest.json, the single list of homepage images with their sources and
 * licences. Every homepage image is an original illustration; components read them from here, never from a
 * hard-coded URL.
 */
export type Illustration = (typeof manifest.illustrations)[number];

export function illustration(id: string): Illustration {
  const found = manifest.illustrations.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown illustration "${id}" in public/demo-assets/manifest.json`);
  return found;
}
