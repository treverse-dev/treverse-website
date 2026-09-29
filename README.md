# Treverse website

A standalone, responsive rebuild of https://www.treversellc.com/. The deployable website is in `dist/`: ordinary HTML, CSS, images, and a locally hosted Esteban font. No Framer account, JavaScript runtime, npm install, database, or paid framework is required to serve it.

## Preview and edit

- `make dev` (or `npm run dev`) serves http://localhost:4173.
- Edit page content and shared markup in `scripts/build.py`.
- Edit styles directly in `dist/styles.css`; the page generator preserves styles and assets.
- `make build` regenerates HTML, robots.txt, and the sitemap.
- `make check` verifies routes, assets, metadata, and internal navigation.

Python 3 is only used for generation and the local preview; the hosted site needs no Python. Commit the generated `dist/` files along with the generator.

## Hosting and domain migration

Upload the **contents** of `dist/` to any static web host. Configure directory indexes and the custom `404.html`; keep `/about`, `/locations`, and `/jobs` working with or without a trailing slash. No SPA fallback is needed. Cloudflare Pages, Netlify, and ordinary Nginx/Apache hosting can serve this output.

A private Sites preview is configured separately in `.openai/hosting.json`. The website is portable and does not require that host. Production canonicals and sitemap intentionally retain `https://www.treversellc.com`.

Before replacing Framer:
1. Confirm location details, current job availability, and the 500+ monthly truckload claim with the business owner.
2. Check the existing A-Stock newsletter, LinkedIn, and Notion application destinations; they are preserved from the current site and are owned externally.
3. Deploy to the chosen production host and test all four routes, mobile layouts, links, and the error page.
4. Attach `www.treversellc.com` and the apex domain, using the host's exact DNS records. Preserve MX/TXT email records. Set a single canonical www redirect and verify HTTPS.
5. Keep the Framer site available until DNS and the production checks succeed, then cancel Framer hosting if desired.

No DNS, existing hosting, email, or Framer subscriptions were changed by this rebuild.

## Content review notes

Source captured September 29, 2026:
- Home, About, Locations, and Jobs from the current Treverse website.
- All three engineering positions remain marked **Position filled**. Resume submissions continue to use the existing Notion destination; no new application backend was invented.
- The old location heading “Paducah, TN” was normalized to **Paducah, KY** to match its published address.
- Bartlett's published address is `1981 Fletcher Creek Dr, Memphis, TN 37133`. That ZIP code and the Bartlett/Memphis naming need owner verification; the address was preserved.
- Marketing copy was lightly edited for readability. No new contact email or business performance claims were invented.
- Static checks ran; browser visual and interaction QA have not been completed.

## Asset provenance

All images were migrated from the owner's existing Framer site. The photos have been resized for delivery, and all assets are served locally. Original Framer image IDs:

| Local file | Original image ID |
| --- | --- |
| logo.png | AeAfPVbq2VGl2I1MQtIuQj2sE.png |
| mark.png | K3tlo9ydH6qIrMAxEmj1liLMjI.png |
| favicon.png | BErN0Hao3O18lcF7IA1czOv9tA.png |
| trucks.jpg | 1UVKL9Mm6UmYnQI9ayGI8zQU8I.jpg |
| logistics.jpg | 7cz6eQ6juEK04U07amhkLefyHtE.jpg |
| distribution.jpg | H0GrbHxwUWuqZBEI4TZIMPtI.jpg |
| export.jpg | CyDkUvYbmnJTvi51Pu83hiF0NuA.jpg |
| warehouse.jpg | OjpuvlqKsxp5AKTnOk8o301040.jpg |
| marketplace.jpg | 0FBQ5f5Rvddc7LaEk5k9UnxBd0.jpg |

Esteban font: https://fonts.gstatic.com/s/esteban/v15/r05bGLZE-bdGdN-GdO6D5jokU8E.woff2 (same typeface as the source site).
