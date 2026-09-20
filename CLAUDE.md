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

Images divide by how they are used. Photography belongs in `src/assets/` and
is rendered with `<Image>` from `astro:assets`, which resizes and re-encodes
it: the hero JPEG is 3 MB on disk and ships as four WebPs of 38–261 KB. Files
that must reach the output untouched or at a fixed URL — the logo, favicons,
`CNAME`, `.nojekyll` — stay in `public/`. Dropping a photograph into `public/`
publishes it at full weight, which is the mistake this note exists to stop.

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
one accent. Match it when adding sections.

The accent is not the reference's: Zentari's colours are blue and black, so
`--color-primary` carries everything the orange used to — buttons, the step
numerals, the `Unverified` and `ImageSlot` frames, the skip link, the focus
ring. Black is the secondary, and stays where it is. There is no orange in
the theme any more; do not reintroduce one from the reference.

One blue does both jobs, which the orange could not. It fills a shape and it
carries text on the light bands, 6.8:1 on white and 6.0:1 on the shell grey.
As a fill it carries white, since black reaches only 3.1:1 on it — the
opposite of the rule the orange needed. The black bands are where it gives
out: `--color-primary-light` exists for those, and is what the footer's small
print uses.

The hero is the one band that departs from that rhythm: a full-bleed
photograph under a 70% black wash, with white type on top. Every pair there
was checked against the brightest pixel the photograph can put behind the
text, so a lighter wash or a lighter photograph needs re-checking. Neither
blue reaches AA on that band — `--color-primary-light` gets to 3.7:1 there —
so the `Unverified` block passes `tone="dark"` and marks itself in white.

The bar is fixed and out of the flow so that photograph can run up behind
it: clear over the hero, and dark from 8px of scroll onwards, toggled by a
`data-scrolled` attribute an inline script sets. Its type is white in both
states, which is why the small-screen menu panel is dark too.

Copy and photography are Zentari's own and must stay that way. Do not paste
text or images across from the reference.

The reference's own small print, `#999999`, fails WCAG AA on white, so the
theme carries `--color-muted-text` in its place. Check any new pair before
using it — every colour decision in here was made by checking one.

## Decisions

- Tailwind utilities only. Recurring patterns become components, never `@apply`.
- Anything not yet true is wrapped in `Unverified.astro` or `ImageSlot.astro`,
  which mark themselves visibly on the page. Delete the wrapper when the real
  content lands — never quietly restyle a placeholder to look finished.
- Empty fields in `contact` are hidden rather than printed, and the
  schema.org block omits them. Search engines read that block as fact.
- `ConstructionGate.astro` curtains the site while it is being built. It is
  not access control and must never be described as any: the whole page is in
  the response before the gate runs, and the published files are readable
  without it. Anything behind it is public. It asks for a password, keeps the
  answer's digest in `localStorage` under `zentari:preview`, and changing the
  password in the component turns away everyone who unlocked the old one.
  Delete the component and its line in `Base.astro` when the site opens.
- The quote form has no backend. Its submit button is disabled and labelled
  as such, rather than silently doing nothing.
