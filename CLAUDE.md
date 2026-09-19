# Zentari Landing Page

## Company Information
Zentari is a freight forwarder: ocean, air and road freight, warehousing,
customs clearance and final delivery.

Still unconfirmed, and placeholder on the page until someone supplies it:
office address, phone, inbox, the four headline figures, customer quotes,
article content, and all photography.

## Technical

Astro 5 with React 19 islands, Tailwind CSS 4, TypeScript in strict mode.
Same stack as `~/Projects/personal/hoiansushi`, which has worked examples of
components, layout and theming.

- `npm run dev` — dev server
- `npm run clean` — `rm -rf docs`
- `npm run build` — cleans, then a static build into `docs/`. Astro empties
  `outDir` on its own, so the clean step is belt and braces: it states the
  intent, and it still holds if `outDir` moves or that behaviour changes.
- `npm run check` — `astro check`, type-checks `.astro` and `.ts`

Tailwind is wired through the Vite plugin (`@tailwindcss/vite`), not PostCSS
and not `@astrojs/tailwind`. There is no `tailwind.config.js`: version 4 is
configured in CSS, and the design tokens live in the `@theme` block in
`src/styles/global.css`.

`global.css` carries `@source not '../../*.md'`. Without it Tailwind scans
this file for class names and generates utilities out of prose.

Detection is automatic over everything `.gitignore` does not exclude, so a
stray build directory left in the tree is read as source: an old `dist/` put
`.fixed`, `.block`, `.transition` and a dozen more unused rules into the
stylesheet, lifted out of the previous build's own markup. `docs/` escapes
this only because Astro empties it before Tailwind runs. Delete build output
you are no longer publishing rather than leaving it to be scanned.

Deployed on GitHub Pages, serving `/docs` off `main`. There is no CI: the
build is run locally and `docs/` is committed with the source change, or the
live site does not move. `site` is the custom domain `https://zentari.one`.
`outDir` is `./docs` and Astro empties it at the start of every build, so
nothing may be hand-written there — files the deploy needs are generated from
`public/`, which is copied across verbatim:

- `public/CNAME` holds the custom domain. GitHub expects CNAME inside the
  published folder, so a hand-placed one in `docs/` dies on the next build.
- `public/.nojekyll` stops Pages running the output through Jekyll, which
  skips underscore-prefixed directories and would serve nothing out of
  `_astro/` — every stylesheet and script the page loads.

## Design

The layout follows a reference the owner chose: `ciketo.framer.website`.
Tokens in `@theme` were measured off that page — Inter, 2px corners, a 1199px
content column, `-0.03em` on headings, white bands alternating with `#f4f0f0`,
one orange accent. Match it when adding sections.

Copy and photography are Zentari's own and must stay that way. Do not paste
text or images across from the reference.

Two of the reference's own colour pairs fail WCAG AA, so the theme carries
darkened variants for text: `--color-accent-text` and `--color-muted-text`.
The orange `--color-accent` is a fill only, and text on it is black, not
white. Check any new pair before using it.

## Decisions

- Tailwind utilities only. Recurring patterns become components, never `@apply`.
- Anything not yet true is wrapped in `Unverified.astro` or `ImageSlot.astro`,
  which mark themselves visibly on the page. Delete the wrapper when the real
  content lands — never quietly restyle a placeholder to look finished.
- Empty fields in `contact` are hidden rather than printed, and the
  schema.org block omits them. Search engines read that block as fact.
- The quote form has no backend. Its submit button is disabled and labelled
  as such, rather than silently doing nothing.
