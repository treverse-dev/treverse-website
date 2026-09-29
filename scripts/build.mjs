import { build } from 'vite';
import { mkdir, mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';

// Only static client files go into dist/. React's server renderer runs at build time.
await build();
const cache = resolve('node_modules/.cache');
await mkdir(cache, { recursive: true });
const temporary = await mkdtemp(join(cache, 'treverse-prerender-'));
try {
  await build({
    configFile: false,
    build: {
      ssr: 'src/entry-server.jsx',
      outDir: temporary,
      rolldownOptions: { output: { entryFileNames: 'render.mjs' } },
    },
  });
  const { render } = await import(pathToFileURL(join(temporary, 'render.mjs')));
  const year = new Date().getFullYear();
  for (const file of ['index.html', 'about/index.html', 'locations/index.html', 'jobs/index.html', '404.html']) {
    const path = resolve('dist', file);
    const template = await readFile(path, 'utf8');
    const root = /<div id="root" data-page="([a-z-]+)">\s*<\/div>/;
    if (!root.test(template)) throw new Error(`Missing prerender root in ${file}`);
    const html = template.replace(root, (_, page) =>
      `<div id="root" data-page="${page}" data-year="${year}">${render(page, year)}</div>`);
    await writeFile(path, html);
  }
  console.log('Prerendered all 5 pages. dist/ is ready for S3.');
} finally {
  await rm(temporary, { recursive: true, force: true });
}
