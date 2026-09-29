import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';

for (const route of ['index.html', 'about/index.html', 'locations/index.html', 'jobs/index.html', '404.html']) {
  const html = await readFile(join('dist', route), 'utf8');
  assert.match(html, /<title>.+<\/title>/, `Missing title: ${route}`);
  assert.match(html, /name="description"/, `Missing description: ${route}`);
  assert.match(html, /id="root" data-page="[a-z-]+"/, `Missing React page: ${route}`);
  assert.match(html, /type="module"/, `Missing built JavaScript: ${route}`);
  for (const [, path] of html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)) {
    await access(join('dist', path.slice(1)));
  }
  assert.doesNotMatch(html, /framerusercontent|\/src\/main/, `Unbundled dependency: ${route}`);
}
const source = await readFile('deploy/cloudfront-function.js', 'utf8');
const handler = runInNewContext(`${source}\nhandler;`);
for (const [uri, output] of [['/', '/index.html'], ['/about', '/about/index.html'], ['/jobs/', '/jobs/index.html'], ['/locations/', '/locations/index.html'], ['/assets/logo.png', '/assets/logo.png'], ['/missing', '/missing']]) {
  assert.equal(handler({ request: { uri } }).uri, output);
}
console.log('PASS: built entry points, local assets, React bundles, and S3/CloudFront route mapping.');
