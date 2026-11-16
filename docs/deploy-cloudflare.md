# Deploy runbook: Cloudflare Pages

Owner steps to put the Next.js static export (`out/`) live at https://infyta.com. Do them in order.
Canonical origin: `https://infyta.com` (apex, no `www`, no trailing slash).

## 1. Create the Pages project

1. Cloudflare dashboard > Workers & Pages > Create > Pages > Connect to Git.
2. Select the GitHub repo `MdMirzaShihab/infyta-frontend`.
3. Production branch: `master`.
4. Build command: `npm run build`
5. Build output directory: `out`
6. Environment variable: `NODE_VERSION=22`
7. Save and deploy. The first build runs on `master`, which is still the Vite app (`vite build` writes `dist/`, not `out/`), so it is expected to fail with "output directory `out` not found". This is harmless: nothing goes live from it.
8. Get a preview of the new site. Preview builds start on a push after the project exists, so push a commit to `visual-redesign` (for example an empty one: `git commit --allow-empty -m "trigger preview" && git push`). Alternatively, in the project open Deployments > Create deployment (or "Retry deployment") and pick the `visual-redesign` branch. Cloudflare gives that build a `<hash>.<project>.pages.dev` URL and a `<branch>.<project>.pages.dev` alias.

## 2. Preview checks

Replace `<PREVIEW>` with the branch or hash preview URL from step 1.8 (for example `https://<hash>.<project>.pages.dev`). Do not use the plain `<project>.pages.dev` hostname yet: it serves the production branch, which is not the new site until you merge.

```bash
for p in /about /about.html /about/ /services /services/network-infrastructure /services/training-certification /services/mobile-applications /services/cloud-services /does-not-exist /robots.txt /sitemap.xml /llms.txt; do
  echo "== $p"; curl -sI <PREVIEW>$p | grep -iE '^(HTTP|location)'
done
curl -s <PREVIEW>/does-not-exist | grep -c "Page not found"
```

Expected:

| URL | Result |
|-----|--------|
| `/about` | 200 |
| `/about.html` | 301 or 308 to `/about` |
| `/about/` | 301 or 308 to `/about` |
| `/services` | 200 |
| `/services/network-infrastructure` | 200 |
| `/services/training-certification` | 301 to `/services` |
| `/services/mobile-applications` | 301 to `/services/software-development` |
| `/services/cloud-services` | 301 to `/services/server-cloud-solutions` |
| `/does-not-exist` | 404, and the `grep -c` command above prints 1 or more |
| `/robots.txt`, `/sitemap.xml`, `/llms.txt` | 200 |

The `X-Robots-Tag: noindex` check on previews:

- Preview URLs (`<hash>.<project>.pages.dev` and `<branch>.<project>.pages.dev`) are not matched by our `public/_headers` rule, but Cloudflare Pages adds `X-Robots-Tag: noindex` to preview deployments by default. Verify with `curl -sI <PREVIEW>/ | grep -i x-robots-tag`.
- If the header is absent on previews, add this block to `public/_headers` and redeploy:

```
https://:version.:project.pages.dev/*
  X-Robots-Tag: noindex
```

- The `<project>.pages.dev` hostname itself is checked after the merge (step 3.3).

Also on the preview:

- Schema: paste the built HTML of `/`, one service page (for example `/services/software-development`) and `/team` into https://validator.schema.org and the Google Rich Results Test. Expect 0 errors for `LocalBusiness`, `Service`, `BreadcrumbList`, `FAQPage` and `Person`.
- Visual: compare the preview with `docs/superpowers/specs/2026-11-16-visual-redesign-assets/mockup.html` in both themes.
- Lighthouse (mobile) on the preview: SEO 100, Performance 95 or more, Accessibility 98 or more.

## 3. Content review and merge

1. Read `docs/review-list.md` and approve or correct each item of new copy.
2. When happy, merge `visual-redesign` into `master`. Cloudflare builds production from `master`.
3. Once that production build succeeds, find the `<project>.pages.dev` subdomain (Deployments or Custom domains) and run `curl -sI https://<project>.pages.dev/ | grep -i x-robots-tag`. Our `public/_headers` rule must make it show `x-robots-tag: noindex`.

## 4. Custom domains

In the Pages project > Custom domains, add `infyta.com` and `www.infyta.com`. These replace the existing A records that point to `103.65.138.26`. The zone is already on Cloudflare, so no nameserver change is needed.

## 5. Domain rules

1. Rules > Redirect Rules > Create rule (Single Redirect), and choose "Wildcard pattern":
   - Request URL: `https://www.infyta.com/*`
   - Target URL: `https://infyta.com/${1}`
   - Status code: 301
   - Enable "Preserve query string".
   - The `www` DNS record must exist and be proxied (orange cloud) for the rule to fire. It will be once `www.infyta.com` is added as a Pages custom domain in step 4. (`_redirects` cannot do host-level redirects.)
2. SSL/TLS > Edge Certificates: turn on "Always Use HTTPS".

## 6. Bot and AI settings

These decide whether AI search engines can read the site.

1. Security > Bots: set AI crawler blocking / AI Crawl Control to allow (do not block).
2. Turn off the Cloudflare-managed robots.txt, so `/robots.txt` serves exactly the built file.
3. Turn off Bot Fight Mode. Make sure no WAF or challenge rules apply to the site.
4. Caching > Crawler Hints: turn on.

## 7. Optional: domain email

1. Email > Email Routing on the `infyta.com` zone: enable it (adds the MX records) and forward `info@infyta.com` to `infytaofficial@gmail.com`.
2. Send a test email to `info@infyta.com` and confirm it arrives.
3. Set `domainEmailActive: true` in `src/content/site.js`, run `npm run check`, commit and push.

Until then the site publishes only `infytaofficial@gmail.com`.

## 8. Vercel

If a Vercel project exists for this repo, delete it or disconnect its Git integration so no old copy stays live on `*.vercel.app`.

## 9. Post-launch checks

```bash
for ua in GPTBot ClaudeBot PerplexityBot Googlebot; do
  echo -n "$ua => "; curl -s -A "$ua" -o /dev/null -w "%{http_code}\n" https://infyta.com/
done
curl -s https://infyta.com/robots.txt | diff - out/robots.txt && echo robots OK
curl -sI https://www.infyta.com/ | head -3
curl -sI http://infyta.com/ | head -3
```

- Each user agent returns 200 with real page content (not a challenge page). Spot-check the body with `curl -s -A GPTBot https://infyta.com/ | grep -i "<h1"`.
- `robots.txt` matches the built file exactly (run `npm run build` first so `out/robots.txt` exists locally).
- `www` to apex and `http` to `https` both return 301.

## 10. Search setup

1. Google Search Console: add a domain property for `infyta.com`, verify with the DNS TXT record in Cloudflare, submit `https://infyta.com/sitemap.xml`, then request indexing for `/` and the 5 service pages.
2. Bing Webmaster Tools: import the site from Search Console and submit the sitemap. (Bing feeds ChatGPT search and Copilot.)

## 11. Google Business Profile

1. Create or claim the profile with exactly this information:
   - Name: Infyta
   - Address: 4A, 44/3 Swarnolota, Sha-sab bari, Bottola, Azimpur, Dhaka, Bangladesh
   - Phone: +880 1318 121558
   - Hours: Saturday–Thursday 9 AM–6 PM, Friday closed
   - Website: https://infyta.com
   - Primary category: your choice (for example IT services or software company). Add photos and ask clients for reviews.
2. Afterwards edit `src/content/site.js`: make these edits:
   - `geo`: replace `null` with `{ latitude: <number>, longitude: <number> }` using the profile's map pin coordinates.
   - `socials`: add objects of the form `{ name: 'Facebook', url: 'https://...' }` (plain strings break the build), including the profile URL and real social profile URLs.
   - Postal code, if known: add `postalCode: '<code>'` inside `address` (this feeds the structured data only), and also add the code by hand to the `addressDisplay` text at the top of the file so the visible address matches the profile exactly.

   Run `npm run check`, then commit and push to rebuild.

## 12. Consistent listings

Use the same name, address and phone as above on the Facebook page, LinkedIn page and Bangladeshi business directories.
