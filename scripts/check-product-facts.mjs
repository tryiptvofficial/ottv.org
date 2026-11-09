// Usage: node scripts/check-product-facts.mjs
// Fails if public-facing source states a channel or VOD figure other than the approved product facts.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const approved = { channels: '25,000', vod: '120,000' };
const scanDirs = ['src', 'public'];
const exts = new Set(['.ts', '.tsx', '.js', '.jsx', '.json', '.webmanifest', '.md', '.html']);

// A number (25,000 / 25000 / 25k) followed within a few words by what it counts.
const claim = /(?:over\s+|more than\s+)?(\d{1,3}(?:,\d{3})+|\d{3,}|\d+(?:\.\d+)?\s?[kK])\s*\+?\s*((?:hd\/4k\s+|hd\s+|4k\s+|live\s+|tv\s+|premium\s+){0,3})(channels?|vod|movies?|titles|shows|series|on-demand)/gi;

const normalise = (n) => {
  const s = n.replace(/\s/g, '');
  if (/k$/i.test(s)) return (parseFloat(s) * 1000).toLocaleString('en-US');
  return Number(s.replace(/,/g, '')).toLocaleString('en-US');
};

const violations = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (exts.has(path.extname(entry.name))) {
      const lines = fs.readFileSync(full, 'utf8').split('\n');
      lines.forEach((line, i) => {
        for (const m of line.matchAll(claim)) {
          const value = normalise(m[1]);
          const kind = /channel/i.test(m[3]) ? 'channels' : 'vod';
          if (value !== approved[kind]) {
            violations.push(`${path.relative(root, full)}:${i + 1}  "${m[0].trim()}"  (approved ${kind}: ${approved[kind]}+)`);
          }
        }
      });
    }
  }
}
scanDirs.forEach((d) => fs.existsSync(path.join(root, d)) && walk(path.join(root, d)));

if (violations.length) {
  console.error(`Product fact check FAILED: ${violations.length} conflicting figure(s). Use src/lib/site-data/product-facts.ts instead.\n`);
  violations.forEach((v) => console.error(`  ${v}`));
  process.exit(1);
}
console.log(`Product fact check passed: only ${approved.channels}+ channels and ${approved.vod}+ VOD titles found.`);
