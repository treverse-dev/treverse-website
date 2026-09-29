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

The app uses normal links and separate HTML entry points rather than client-side routing. Vite bundles React and copies public assets into `dist/`. Do not edit `dist/`; it is regenerated on each build. Changes to page titles/descriptions belong in the corresponding HTML entry point. The page contents are rendered by React in the browser.

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

## Content review notes

Source captured September 29, 2026:
- Home, About, Locations, and Jobs from the current Treverse website.
- All three engineering positions remain marked **Position filled**. Resume submissions continue to use the existing Notion destination; no new application backend was invented.
- The old location heading “Paducah, TN” was normalized to **Paducah, KY** to match its published address.
- Bartlett's published address is `1981 Fletcher Creek Dr, Memphis, TN 37133`. That ZIP code and the Bartlett/Memphis naming need owner verification; the address was preserved.
- Marketing copy was lightly edited for readability. No new contact email or business performance claims were invented.

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
