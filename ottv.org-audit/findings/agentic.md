# Agent-readiness audit: OTTV (production build at http://localhost:9010, checked 2026-11-09)

## Score
- Lighthouse Agentic Browsing: Not verified. The tool rejected localhost ("Invalid URL. Only http/https URLs to public hosts"). No fraction is estimated.
- Agent-UX heuristic (agent_ux_check.py): unavailable (url_safety blocked localhost). Not run, no score from the tool.
- Manual readiness score: 78/100. This is my own curl-based estimate, not the Agent-UX heuristic and not a Lighthouse figure. Method: start at 100. Deduct 10 for the policy inconsistency in robots.txt, 6 for no Content-Signal, 3 for no sitemap/llms-full or other optional discovery, and 3 for the unverified accessibility tree. Nothing is deducted for absent WebMCP, Markdown or ai-catalog (opportunities, not defects).

## What works (evidence from curl)
- Server-rendered HTML. Home 507 KB, /pricing 184 KB, /contact 98 KB. Each has one h1, one main, nav, a title, a canonical, an html lang attribute, and 0 images without alt (home has 70 images).
- WhatsApp order links are plain anchors (wa.me or api.whatsapp: 16 on home, 16 on /pricing, 10 on /contact), so an agent can follow them. JSON-LD blocks are present (8 to 10 per page).
- /llms.txt returns 200 with a clear H1, a blockquote summary, plans with USD prices, key page links and setup guides. Google ignores llms.txt, so treat it as optional.
- /sitemap.xml returns 200 (application/xml). Unknown URLs return a real 404.
- Security headers are in place (HSTS, nosniff and others).

## Findings

### Medium
1. robots.txt AI policy is internally inconsistent.
   - Evidence: GPTBot is `Disallow: /`. ChatGPT-User, Google-Extended, anthropic-ai and PerplexityBot are `Allow: /`. ClaudeBot, Claude-User, OAI-SearchBot, Applebot-Extended, CCBot and Bytespider are unlisted and fall to `*` (allowed).
   - Access lines:
     - Training: GPTBot blocked, Google-Extended allowed, anthropic-ai allowed (a legacy token). ClaudeBot, Applebot-Extended and CCBot are not addressed and fall to `*`, which allows them.
     - Search: OAI-SearchBot and PerplexityBot are not blocked, so they are allowed. GPTBot is blocked, but it is OpenAI's training crawler rather than its search crawler.
     - User-triggered: ChatGPT-User is allowed. Claude-User and Perplexity-User are unlisted and fall to `*` (allowed).
   - Fix: decide the intent, then list each crawler explicitly. If the aim is "visible in AI search but not used for training", the current file is close, but add `OAI-SearchBot: Allow` and `ClaudeBot: Disallow` (or allow it) so the file matches that intent. If you want to be found by agents, no change is needed beyond making the intent explicit. This also affects the line `User-Agent: *` capitalisation, which is harmless.
   - Relevance for this site: moderate. It decides whether AI assistants can quote the plan and price info.

### Low
2. No Content-Signal in robots.txt or response headers (a draft proposal; facts date 2026-09-23). Optional. Add `Content-Signal: search=yes, ai-input=yes, ai-train=no` under `*` only if you want to declare preferences. It is not enforced.
3. Accessibility tree is not verified (see Not verified). Static HTML signals are good: 14 aria-labels on home, one h1 and one main per page. The home page has 61 links and 6 buttons. The interactive controls (plan selectors, WhatsApp CTA) need a real browser check for accessible names.
4. Duplicate-structure note: /pricing and /contact each have 2 nav elements. If neither has an aria-label, agents can't tell them apart. Fix: add aria-label="Primary" or "Footer".

### Optional opportunities (not defects)
- Markdown delivery: `Accept: text/markdown` returns HTML (no Vary: Accept, no .md sibling, /index.md is 404). Skip unless you want it.
- WebMCP (draft proposal): no navigator.modelContext or toolname markup. Orders go via WhatsApp, so there is no form flow for a tool to wrap. Low value.
- ai-catalog.json (draft), /.well-known/mcp.json, agent-card.json, OAuth and API catalog files: all 404. Not applicable, because there is no API, MCP server or A2A agent. Web Bot Auth (proposal): not needed.
- llms-full.txt: 404. Optional.

## Not verified
- Lighthouse Agentic Browsing X/N (mobile and desktop): the tool refuses localhost. Re-run against https://www.ottv.org once the domain is live.
- Agent-UX heuristic score and the rendered accessibility tree: render_page is blocked on localhost. Counts above come from raw HTML only.
- Behaviour of the live domain: headers (Content-Signal, Link, Vary) may differ behind a CDN. The 200 on the localhost origin does not prove the production host serves the same robots.txt.
- The snapshot at the scratchpad crawl directory contains robots.txt and sitemap.xml, which I did not diff against the live build.
- No agent user-agent matrix was run (not authorised).

## Standards status
WebMCP, Content-Signal, ai-catalog.json and Web Bot Auth are drafts or proposals (facts checked 2026-09-23 in vendor-matrix.md). llms.txt is a community convention that Google ignores.
