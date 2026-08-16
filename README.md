# Pepo docs

Public documentation for [Pepo](https://pepo.ai) — the REST API and the MCP server. Built on [Mintlify](https://mintlify.com); content is MDX in this repo, so moving to another host later is a port rather than a rewrite.

## Layout

| | |
|---|---|
| `openapi.json` | The API contract. Drives the **API reference** tab, its playground, and any future SDK generation. |
| `index.mdx`, `quickstart.mdx`, `authentication.mdx` | Getting started. |
| `brand-profile.mdx`, `credits.mdx`, `measurement.mdx` | Core concepts. `measurement.mdx` is the method behind trending — the refusals are the product, so they are public. |
| `mcp/*.mdx` | Using Pepo from Claude and ChatGPT. |
| `docs.json` | Navigation, theme, branding. |
| `AGENTS.md` | Conventions for anyone — human or agent — editing this repo. Read it first. |

## Development

```bash
npm i -g mint        # or use npx mint@latest below
mint dev             # preview on http://localhost:3000
mint broken-links    # run before every PR
npx @redocly/cli@latest lint openapi.json
```

If a page 404s, check you are running in the folder containing `docs.json`. If the dev server misbehaves, `mint update`.

## Publishing

The Mintlify GitHub app deploys automatically on push to the default branch. Install it from the [dashboard](https://dashboard.mintlify.com/settings/organization/github-app).

## Two rules

**1. Document only what is live.** This site covers the endpoints and MCP tools that actually work today. Workflows still in build — share of voice, competitor and consumer intelligence, creator discovery, campaign analysis, datasets, monitors — are deliberately absent. A documented endpoint that 404s costs more trust than a short reference.

**2. Keep `openapi.json` in step with the API.** It is generated from, and must match, the live response shapes in `pepo-marketing` (`convex/http.ts`). When a response shape changes, change the spec in the same piece of work — customers generate clients from it.

Full conventions, including the caveats that must never be edited away, are in [`AGENTS.md`](./AGENTS.md).
