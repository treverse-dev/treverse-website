# Treverse website

A simple React + Vite website. No server, Python, Framer, or Sites hosting is needed. Build it and upload `dist/` to an S3 bucket serving the root of your domain.

## Build locally

Requirements: Node.js 20.19+ (20.x) or 22.12+, npm, and AWS CLI v2 for uploading. Run these commands from this repository's root.

```sh
npm ci
npm run check
```

`npm run check` creates the production build and validates the generated pages, assets, and CloudFront route mapping. To build without those checks, use `npm run build`.

Preview the **production build** locally:

```sh
npm run preview
```

Open the URL printed by Vite (normally http://127.0.0.1:4173). Press Ctrl+C to stop. For development with automatic reload, use `npm run dev` instead. Neither command uploads anything.

The generated output is:

```text
dist/
  index.html
  about/index.html
  locations/index.html
  jobs/index.html
  404.html
  assets/                 # Bundled JS/CSS, images, and font
  robots.txt
  sitemap.xml
```

Deploy only the contents of `dist/`. Node.js and React's build-time renderer run on your computer; S3 serves the finished files. There is no application server to start in AWS. The build assumes the website is served at the root of its domain, not a subfolder. Equivalent `make` targets are available.

## Source structure

- `src/pages/`: React components for Home, About, Locations, Jobs, and the error page.
- `src/App.jsx`: shared navigation, footer, and page selection.
- `src/styles.css`: responsive styling.
- `public/assets/`: local photos, logos, and font.
- `index.html`, `about/index.html`, `locations/index.html`, `jobs/index.html`, `404.html`: HTML entry points with page-specific metadata.
- `public/robots.txt` and `public/sitemap.xml`: production indexing metadata.

The app uses normal links and separate HTML entry points rather than client-side routing. Vite bundles React and copies public assets into `dist/`. Do not edit `dist/`; it is regenerated on each build. Changes to page titles/descriptions belong in the corresponding HTML entry point. The build pre-renders every page from the React components into HTML. Content, navigation, FAQs, and external links work before JavaScript loads; React hydrates the same markup in the browser. No server runtime or extra framework is deployed. The temporary build-time renderer is removed after each build.

## Current deployment

AWS resources created September 29, 2026:

| Resource | Value |
| --- | --- |
| HTTPS website | https://d38l62u264f56m.cloudfront.net/ |
| CloudFront distribution | `E1Y0INJRF5BAJA` |
| S3 bucket | `treverse-website-347888304949` |
| AWS account / region | `347888304949` / `us-east-1` |
| CLI profile | Configured default profile (no `--profile` flag) |
| Origin access control | `E4WJ5BQGIG4MY` |
| Routing function | `treverse-website-routing` (LIVE, viewer-request) |
| Custom domain | Certificate issued; both domain aliases deployed and HTTPS verified; ready for DNS cutover |

CloudFront redirects HTTP to HTTPS, resolves each static page route, and serves a custom 404. S3 access is restricted to this distribution through signed origin requests. The original public S3 website URL is no longer the delivery URL. The default CloudFront hostname has a working AWS-managed certificate; the Treverse-domain certificate is also issued and attached for both domain names.

### Deploy another local build

```sh
aws sts get-caller-identity
npm ci
npm run check
aws s3 sync dist/ s3://treverse-website-347888304949/ --exclude "*.html" --cache-control "no-cache" --region us-east-1 --no-progress
aws s3 cp dist/ s3://treverse-website-347888304949/ --recursive --exclude "*" --include "*.html" --content-type "text/html; charset=utf-8" --cache-control "no-cache" --region us-east-1 --no-progress
aws cloudfront create-invalidation --distribution-id E1Y0INJRF5BAJA --paths "/*"
```

Confirm the identity command reports account `347888304949`. If you move to a named profile, append `--profile YOUR_PROFILE` to AWS commands. Configuration snapshots and identifiers are in `deploy/aws-resources.json`, `deploy/cloudfront-distribution.json`, and `deploy/s3-cloudfront-policy.json`. These contain no credentials. Do not recreate the distribution to publish content updates.

### Connect the Treverse domain using GCP DNS

**Certificate validation and alias attachment are complete, and CloudFront reports `Deployed`.** HTTPS was verified for both names directly against CloudFront without changing public website DNS. Proceed to steps 4–6 to switch website traffic. Steps 1–3 document the completed setup. Keep both validation CNAME records for renewal.

1. In the GCP public DNS zone for `treversellc.com`, add these two records with TTL `300`. Names and targets are fully qualified; avoid appending the zone name a second time if the console already supplies it.

   | Type | Name | Target |
   | --- | --- | --- |
   | CNAME | `_b4581b275dfa961d12fc9e6fc8dbead8.www.treversellc.com.` | `_f9b3ed4e4dbee56ce4ea3b1a5235054c.wzccmgtwzk.acm-validations.aws.` |
   | CNAME | `_1f221a8b0338070752c03dff328b98e0.treversellc.com.` | `_54aa10c25fd2209c12b833b44d270e3a.wzccmgtwzk.acm-validations.aws.` |

   These records are also in `deploy/acm-validation-records.json`. Keep them for automatic certificate renewal. [AWS DNS validation](https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html).

2. Confirm the certificate is `ISSUED`:

   ```sh
   aws acm describe-certificate --certificate-arn arn:aws:acm:us-east-1:347888304949:certificate/8a3e8e06-6b1f-4db5-b725-994fcf13160b --region us-east-1 --query 'Certificate.Status' --output text
   ```

3. In CloudFront distribution `E1Y0INJRF5BAJA`, attach that certificate and add both alternate domain names: `www.treversellc.com` and `treversellc.com`. Use SNI and a minimum TLS 1.2 policy. Wait until the distribution status is `Deployed` before changing the website DNS. The certificate must be in `us-east-1` and cover both aliases. [CloudFront certificate requirements](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html).

4. Change `www.treversellc.com` to a **CNAME** targeting `d38l62u264f56m.cloudfront.net.` (TTL 300). Replace conflicting website records for `www`, while preserving certificate validation and email records.

5. The bare domain `treversellc.com` cannot use a standard CNAME at the zone apex. Google Cloud DNS supports an apex **ALIAS** pointing to `d38l62u264f56m.cloudfront.net.`, but ALIAS is incompatible with DNSSEC and must be configured through the gcloud CLI or API rather than the console. If DNSSEC is enabled, keep it enabled and arrange a compatible apex redirect or DNS-provider setup instead. Confirm the zone configuration before replacing existing apex website records. Do not copy CloudFront's resolved IPs into static A records. [Google Cloud DNS record types](https://docs.cloud.google.com/dns/docs/records-overview).

6. Verify HTTPS on both domain names and direct navigation to `/about/`, `/locations/`, and `/jobs/`. Keep Framer available until that verification succeeds. Current canonical metadata prefers `www.treversellc.com`; the apex serves the same content unless an apex-to-www redirect is added later.

The general instructions below are for a new deployment. **Do not apply the public-bucket option to the current private CloudFront origin.**

## One-time AWS setup

Choose one hosting option:

| Option | Delivery | Bucket access | Page routing |
| --- | --- | --- | --- |
| S3 website hosting | S3 website endpoint, HTTP only | Public read for website files | S3 resolves directory indexes |
| S3 + CloudFront | HTTPS, with an optional custom domain | Private bucket with Origin Access Control | Included CloudFront function |

For the public production domain, use CloudFront in front of S3. For direct S3 hosting, follow option A. Do not combine the public website endpoint with the private-origin instructions in option B. [AWS hosting overview](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html).

### Authenticate and select a bucket

Configure your AWS CLI profile through your normal AWS login process. For an IAM Identity Center profile:

```sh
aws configure sso --profile treverse
aws sso login --profile treverse
aws sts get-caller-identity --profile treverse
```

If a profile already exists, use it instead of `treverse` throughout. Keep credentials outside this repository.

Use a dedicated website bucket. Replace `YOUR_BUCKET_NAME` with its actual, globally unique name and `YOUR_REGION` with your region in every command. If it does not exist yet:

```sh
aws s3 mb s3://YOUR_BUCKET_NAME --region YOUR_REGION --profile treverse
```

Your deployment identity needs permission to list the bucket and upload objects. Hosting setup additionally needs permission to configure the bucket or CloudFront. The upload commands below do not delete objects or change access permissions.

### Option A: Serve directly from an S3 website endpoint

1. In the bucket's **Properties → Static website hosting**, enable website hosting with `index.html` as the index document and `404.html` as the error document. The equivalent command is:

   ```sh
   aws s3 website s3://YOUR_BUCKET_NAME --index-document index.html --error-document 404.html --profile treverse
   ```

2. In **Permissions → Block public access**, allow public bucket policies for this website bucket by disabling **BlockPublicPolicy** and **RestrictPublicBuckets**. Keep **BlockPublicAcls** and **IgnorePublicAcls** enabled; this workflow uses a bucket policy, not object ACLs. If organization/account settings prevent public policies, use option B.

3. Add the following read-only bucket policy, replacing `YOUR_BUCKET_NAME`. These files will be publicly readable; keep only public website material in this bucket.

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Sid": "PublicWebsiteRead",
       "Effect": "Allow",
       "Principal": "*",
       "Action": "s3:GetObject",
       "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
     }]
   }
   ```

4. Upload the build using the next section. Open the **website endpoint** shown under Static website hosting, not an S3 REST object URL. `/about/`, `/locations/`, and `/jobs/` resolve to their own index files, including on refresh. Direct S3 website endpoints do not provide HTTPS. [AWS website permissions](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteAccessPermissionsReqd.html).

### Option B: Serve S3 through CloudFront with HTTPS

1. Keep S3 **Block all public access enabled**, and leave S3 website hosting disabled. Create a CloudFront distribution using the bucket's regional **S3 REST origin**, not its website endpoint.
2. Configure **Origin Access Control (OAC)** with request signing. Apply CloudFront's generated bucket policy, scoped to that distribution, to grant `s3:GetObject`. No public-read policy or upload ACL is needed. [AWS OAC instructions](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html).
3. Set the distribution's **Default root object** to `index.html` and the viewer protocol policy to **Redirect HTTP to HTTPS**. Use the **CachingDisabled** cache policy initially for predictable updates.
4. Create a CloudFront Function using JavaScript runtime 2.0 and paste `deploy/cloudfront-function.js`. Publish it to LIVE and associate it with the default behavior's **viewer-request** event. It maps `/about` and `/about/` to `/about/index.html`, and likewise for the other pages. A default root object alone does not handle nested directories. [AWS routing example](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example_cloudfront_functions_url_rewrite_single_page_apps_section.html).
5. Configure custom error responses for origin 403 and 404: response page `/404.html`, HTTP response code **404**, and error caching minimum TTL **0**. Do not return the homepage with status 200 for missing routes.
6. Upload the build and test the distribution's HTTPS URL. To use `www.treversellc.com`, attach a matching certificate and alternate domain name to CloudFront, then point the domain's DNS to the distribution. Keep existing email DNS records. The canonical URLs and sitemap already use `https://www.treversellc.com`.

## Upload a local build

Run the following for each release. `npm ci` is needed on a fresh checkout or after the lockfile changes.

```sh
npm ci
npm run check

# Preview what will be uploaded without changing the bucket.
aws s3 sync dist/ s3://YOUR_BUCKET_NAME/ --dryrun --profile treverse

# Upload assets first so new HTML never references files that are not there yet.
aws s3 sync dist/ s3://YOUR_BUCKET_NAME/ --exclude "*.html" --cache-control "no-cache" --profile treverse

# Upload all HTML last, including nested pages, and explicitly refresh its metadata.
aws s3 cp dist/ s3://YOUR_BUCKET_NAME/ --recursive --exclude "*" --include "*.html" --content-type "text/html; charset=utf-8" --cache-control "no-cache" --profile treverse
```

The trailing `dist/` uploads its contents at the bucket root. Do not upload the source folder, `node_modules`, or a directory named `dist` inside the bucket. Avoid `--acl public-read`; access comes from the selected hosting policy.

These commands deliberately omit `--delete`, retaining older hashed bundles for visitors with an already-open page. `sync` skips unchanged files, including metadata-only changes; to refresh cache metadata on existing non-HTML files, use `aws s3 cp dist/ s3://YOUR_BUCKET_NAME/ --recursive --exclude "*.html" --cache-control "no-cache" --profile treverse` once. `no-cache` permits storage but requires revalidation. [AWS sync behavior](https://docs.aws.amazon.com/cli/latest/reference/s3/sync.html).

If using CloudFront, refresh previously cached content after uploading:

```sh
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*" --profile treverse
```

This command returns an invalidation ID. If you need to wait for completion:

```sh
aws cloudfront wait invalidation-completed --distribution-id YOUR_DISTRIBUTION_ID --id YOUR_INVALIDATION_ID --profile treverse
```

## Verify the deployed site

Open the actual S3 website or CloudFront URL and check:

- `/`, `/about/`, `/locations/`, and `/jobs/` load directly and after refreshing.
- `/about`, `/locations`, and `/jobs` also resolve.
- A nonexistent path shows the custom error page with HTTP status 404.
- Images, fonts, footer links, mobile layout, and FAQ expansion work.
- Page source includes the page content before JavaScript runs.

Example HTTP checks (replace the origin with the exact endpoint):

```sh
curl -I https://YOUR_DISTRIBUTION_DOMAIN/about/
curl -I https://YOUR_DISTRIBUTION_DOMAIN/this-page-does-not-exist
```

Use `http://` and the console-provided website hostname for direct S3 hosting. If all pages return 403, check the bucket policy/OAC and the uploaded object keys. If only nested pages fail through CloudFront, check the function's LIVE viewer-request association. If updates look stale, check the upload destination, cache policy, and invalidation status.

The local build validates files, not your AWS permissions, DNS, or live hosting configuration. Build commands never change AWS resources or domains; deployment requires the explicit AWS CLI commands above.

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

The S3 build remains runnable while these editorial inputs are pending. The current S3 deployment is documented above. The existing live domain and other external accounts remain unchanged.

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
