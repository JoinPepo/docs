# Documentation project instructions

## About this project

- The public documentation for [Pepo](https://pepo.ai), built on [Mintlify](https://mintlify.com).
- Pages are MDX with YAML frontmatter. Configuration lives in `docs.json`.
- `openapi.json` drives the entire **API reference** tab and its playground. It is the contract customers generate clients from — a stale field here becomes a broken integration somewhere else.
- Source of truth for the API and MCP server is the `pepo-marketing` repo (`convex/http.ts`, `mcp/`). Its `docs/api/README.md` and `docs/mcp/README.md` are the **internal** contracts, and they intentionally document more than this site does. See [Content boundaries](#content-boundaries).
- For Mintlify product knowledge (components, configuration): `npx skills add https://mintlify.com/docs`, or the docs MCP server at `https://www.mintlify.com/docs/mcp`.

## Terminology

Use the product's own vocabulary; these words carry specific meaning and are not interchangeable.

| Use | Not | Why |
|---|---|---|
| **workspace** | account, tenant, project | One brand's data and members. An API key belongs to exactly one. |
| **brand profile** | brand settings, config | The approved memory file every workflow reads. Distinct from workspace presentation settings. |
| **observed content views** / **potential exposures** | impressions | Real ad impressions need first-party or Ads Manager data. Never call public views impressions. |
| **snapshot** | data point, reading | One timestamped observation of a video's metrics. The unit the trending gate counts. |
| **coverage** | sample size | How much of the underlying data actually carried the value being aggregated. |
| **classification** | status, label | `watchlist` / `trending` / `breakout` / `peaked` / `fading`. |
| **credits** | tokens, units | A prepaid dollar balance. |
| **observed lift** vs **attributed lift** | lift | Two different claims. Never collapse them. |

## Style preferences

- Active voice, second person ("you").
- One idea per sentence. Sentence case for headings.
- Bold for UI elements: click **Settings**. Code formatting for file names, commands, paths, fields, and endpoints.
- Prefer a table or a callout over a long paragraph when the content is a list of rules.
- **State the reason, not just the rule.** "A video is only called trending with three snapshots across twelve hours" is half a doc; the other half is *why* — one observation is not a trajectory. Readers who understand the reason can extrapolate to cases we did not document.

## Content boundaries

**Document only what is live.** This is the rule most likely to be broken by a well-meaning edit.

- Endpoints and MCP tools that are specified but not shipped do **not** belong on this site, even in a "coming soon" list. A documented endpoint that 404s costs more trust than a short reference, and it costs it with exactly the developer you were trying to win.
- Where something is partially shipped, say so inline with a `<Note>` rather than leaving a reader to discover it by calling it. Example: `GET /v1/brand-profile` is live while `propose`/`approve` are not.
- When an endpoint ships, three things change together: the code, the internal status table in `pepo-marketing/docs/api/README.md`, and this site.

**Never remove a caveat to make the docs read better.** The following are load-bearing product claims, not hedging, and each exists because its absence causes a specific failure:

- The impressions disclaimer.
- `search_method` — that search covers captions and creator handles only, so an empty result means "not found in captions," never "no such video exists."
- The snapshot gate, and that `gated_by` results must not be described as trending.
- Coverage alongside any aggregate, especially comment tone.
- That `null` means unobserved and is never rendered as `0`.

**Do not document internals**: Convex function names, table schemas, deployment URLs, the dev deployment hostname, or roadmap sequencing. Customers get the contract, not the implementation.

**Numbers and prices need a source.** Do not invent rate limits, prices, or SLAs. If a figure is not in `openapi.json` or the internal contract, leave it out and flag it.

## Diagrams

Mermaid works, in fenced ```mermaid blocks. Two things learned the hard way:

- **Use `flowchart LR`, never `flowchart TD`.** `TD` renders as *nothing* — no error, no empty box, the block simply does not appear. `LR` renders fine and the layout engine reflows it vertically anyway, so you get a top-down reading order regardless.
- **A malformed diagram fails silently.** There is no error in the console and no placeholder on the page. Always look at the rendered page after adding or editing one; a diagram that "looks fine in the diff" is not verified.

Keep node counts low — around eight — and put detail in the prose underneath. A diagram dense enough to need zooming has stopped being a diagram.

## Working locally

```bash
npx mint@latest dev            # preview on :3000
npx mint@latest broken-links   # link check — run before every PR
npx @redocly/cli@latest lint openapi.json
```

Pushing to the default branch publishes. Verify a rendered page rather than trusting that the MDX compiled — the API reference tab in particular fails in ways that only show up visually.
