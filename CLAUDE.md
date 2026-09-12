# Zentari Landing Page

## Company Information
TBD

## Technical

Astro 5 with React 19 islands, Tailwind CSS 4, TypeScript in strict mode.
Same stack as `~/Projects/personal/hoiansushi`, which is where to look for
worked examples of components, layout and theming.

- `npm run dev` — dev server
- `npm run build` — static build into `dist/`
- `npm run check` — `astro check`, type-checks `.astro` and `.ts`

Tailwind is wired through the Vite plugin (`@tailwindcss/vite`), not a
PostCSS config and not `@astrojs/tailwind`. There is no `tailwind.config.js`:
Tailwind 4 is configured in CSS. The design system belongs in the `@theme`
block in `src/styles/global.css`, which is empty until the brand is decided.

`global.css` carries `@source not '../../*.md'`. Without it Tailwind scans
this file and README for class names and generates utilities out of prose.

Deploy target is not decided yet. `site` in `astro.config.mjs` is
`https://zentari.one`; the build writes to the default `dist/`, which is
gitignored.

## Decisions

- Tailwind utilities only. Recurring patterns become components, never `@apply`.
- The home page is deliberately near-empty. Do not invent copy, services,
  claims or numbers about Zentari — the company details are still TBD above.
