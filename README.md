# Treverse website

A simple React + Vite website. No server, Python, Framer, or Sites hosting is needed. Build it and upload `dist/` to an S3 bucket serving the root of your domain.

## Develop and build

Requires Node.js 20.19+ (20.x) or 22.12+ and npm.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`npm run check` builds the app and validates page entry points, bundled references, and the optional CloudFront routing function. Equivalent `make` targets are available.

## Source structure

- `src/pages/`: React components for Home, About, Locations, Jobs, and the error page.
- `src/App.jsx`: shared navigation, footer, and page selection.
- `src/styles.css`: responsive styling.
- `public/assets/`: local photos, logos, and font.
- `index.html`, `about/index.html`, `locations/index.html`, `jobs/index.html`, `404.html`: HTML entry points with page-specific metadata.
- `public/robots.txt` and `public/sitemap.xml`: production indexing metadata.

The app uses normal links and separate HTML entry points rather than client-side routing. Vite bundles React and copies public assets into `dist/`. Do not edit `dist/`; it is regenerated on each build. Changes to page titles/descriptions belong in the corresponding HTML entry point. The build pre-renders every page from the React components into HTML. Content, navigation, FAQs, and external links work before JavaScript loads; React hydrates the same markup in the browser. No server runtime or extra framework is deployed. The temporary build-time renderer is removed after each build.

## Upload to S3

After configuring the target bucket and AWS CLI credentials:

```sh
npm ci
npm run check
aws s3 sync dist/ s3://YOUR_BUCKET_NAME/ --cache-control "no-cache"
```

Upload the **contents** of `dist/`, not the enclosing directory. The command deliberately retains old objects so it cannot remove unrelated bucket contents or assets used by already-open pages. No AWS upload is performed by the build.

For an **S3 website endpoint**, configure `index.html` as the index document and `404.html` as the error document. Nested entries such as `about/index.html` support `/about/` and direct page refreshes. Website endpoint access permissions must already be configured. See [AWS index-document behavior](https://docs.aws.amazon.com/AmazonS3/latest/userguide/IndexDocumentSupport.html).

For **CloudFront with a private S3 REST origin**, set the default root object to `index.html`, configure origin access control, and associate `deploy/cloudfront-function.js` with the viewer-request event. S3 REST origins do not automatically resolve nested directory indexes; the function maps known page URLs to their exact object keys. Configure custom 403/404 responses to `/404.html` with response code 404. See [AWS CloudFront URL rewriting](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example_cloudfront_functions_url_rewrite_single_page_apps_section.html).

If a CloudFront distribution already caches a previous deployment, invalidate it after upload:

```sh
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

Use CloudFront for HTTPS on a custom domain. Production canonical URLs and the sitemap retain `https://www.treversellc.com`. Attach the domain only after validating the deployment; preserve existing email DNS records. No AWS resources, domain records, or Framer subscriptions have been changed.

## Content and launch review

Reviewed September 29, 2026:
- The live marketplace at https://astock.com identifies itself as Haggle. Business pages now focus on Treverse services, with a separate shopper route to Haggle. No parent/subsidiary relationship is asserted without owner confirmation.
- Facebook uses the owner-provided https://www.facebook.com/hagglebids. Instagram and YouTube retain the exact handles linked from the current Haggle marketplace; update `src/site.js` if replacements are supplied.
- `src/data/locations.js` reflects the 14 locations listed at https://astock.com/locations. The old Bartlett address is absent from that directory; this does not imply it is closed. Johnson City is now listed as 2506 S Roan St; Ohio is Princeton Pike. New locations and FHL Cookeville are included.
- Rainsville is the marketplace's location label, while its address says Fort Payne. Its published ZIP 35698 needs confirmation and has been omitted rather than replaced with a guess.
- The 500+ monthly truckload claim and filled job advertisements were removed. Careers provides the existing resume invitation without implying a current opening.
- The About page uses the existing actual pickup-entrance photo with an honest A-Stock signage caption. Other existing imagery is illustrative; no team photos or customer results have been fabricated.

Pending owner information:
1. Set `businessEmail` in `src/site.js` to the confirmed business inquiry address. Until supplied, no email link or nonfunctional form is shown. The business inquiry section is ready; its email action appears when configured.
2. Confirm the intended wording for Treverse's relationship to Haggle and A-Stock, any updated social accounts, and any location corrections.
3. Supply approved facility/team photos and case-study metrics before adding customer outcomes or testimonials.

The S3 build remains runnable while these editorial inputs are pending. No live domain, AWS resources, or external accounts have been changed.

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
