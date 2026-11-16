import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { roomsData } from '../src/data/rooms.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT, 'dist');
const SSR_DIR = path.join(ROOT, 'dist-ssr');

const ROUTES = [
  '/',
  '/about',
  '/rooms',
  ...roomsData.map((r) => `/rooms/${r.slug}`),
  '/events',
  '/gallery',
  '/contact',
  '/404',
];

function stripDefaultMeta(template) {
  return template
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\s+name="description"[^>]*>\s*/gi, '')
    .replace(/<meta\s+property="og:(?:title|description|type|site_name|image|image:width|image:height)"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="twitter:(?:card|title|description|image)"[^>]*>\s*/gi, '');
}

async function main() {
  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html not found. Run vite build before prerender.');
  }

  const rawTemplate = fs.readFileSync(templatePath, 'utf-8');
  const cleanTemplate = stripDefaultMeta(rawTemplate);
  const entryPath = path.join(SSR_DIR, 'entry-server.js');
  const { render } = await import(pathToFileURL(entryPath).href);

  let count = 0;

  for (const route of ROUTES) {
    const { html, helmet } = render(route);
    const headTags = [
      helmet?.title?.toString() || '',
      helmet?.meta?.toString() || '',
      helmet?.link?.toString() || '',
      helmet?.script?.toString() || '',
    ]
      .filter(Boolean)
      .join('\n    ');

    const finalHtml = cleanTemplate
      .replace('</head>', `    ${headTags}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

    let targetFile;
    if (route === '/') {
      targetFile = path.join(DIST_DIR, 'index.html');
    } else if (route === '/404') {
      targetFile = path.join(DIST_DIR, '404.html');
    } else {
      const subDir = path.join(DIST_DIR, route.replace(/^\//, ''));
      fs.mkdirSync(subDir, { recursive: true });
      targetFile = path.join(subDir, 'index.html');
    }

    fs.writeFileSync(targetFile, finalHtml, 'utf-8');
    count += 1;
    console.log(`Prerendered ${route} -> ${path.relative(ROOT, targetFile)}`);
  }

  fs.rmSync(SSR_DIR, { recursive: true, force: true });
  console.log(`\nStatic prerender complete for ${count} routes.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
