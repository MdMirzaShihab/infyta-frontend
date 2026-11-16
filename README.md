# Infyta website

Marketing site for Infyta, an IT company in Dhaka, Bangladesh. Built with Next.js (App Router) as a static export, with Tailwind CSS, Framer Motion and Swiper.

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Build the static site into `out/` |
| `npm test` | Unit tests (`tests/unit`) |
| `npm run test:build` | Tests that inspect the built `out/` (run `npm run build` first) |
| `npm run check` | Unit tests, build, build tests and lint in one go |
| `npm run preview` | Serve `out/` locally with Cloudflare's runtime (`wrangler pages dev`) |
| `node scripts/make-logo.mjs` | Rebuild the vector logo (outlined wordmark and tagline) into `src/components/logo-paths.js` and `public/images/infyta-logo*.svg`; then run `node scripts/make-brand-images.mjs` to regenerate the logo PNG, icons and social image |

## Content

All business data and copy live in `src/content/`:

- `site.js`: name, address, phone, email, hours, geo and social links (one source of truth)
- `services.js`: the five services, with their page content and FAQs
- `pages.js`: page metadata, home intro and the list of routes

`docs/review-list.md` lists the copy the owner should review.

## Email switch

`domainEmailActive` in `src/content/site.js` is `false`, so the site publishes `infytaofficial@gmail.com`. Set it to `true` only after `info@infyta.com` receives mail (see the runbook).

## Deployment

`out/` is deployed to Cloudflare Pages by the owner. See [docs/deploy-cloudflare.md](docs/deploy-cloudflare.md) for the step-by-step runbook. Redirects and headers live in `public/_redirects` and `public/_headers`.
