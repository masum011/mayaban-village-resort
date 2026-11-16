import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { roomsData } from '../src/data/rooms.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const SITE_URL = process.env.SITE_URL || 'https://mayabanvillageresort.com';
const today = new Date().toISOString().split('T')[0];

const staticRoutes = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/about', changefreq: 'monthly', priority: '0.8' },
  { loc: '/rooms', changefreq: 'weekly', priority: '0.9' },
  { loc: '/events', changefreq: 'weekly', priority: '0.85' },
  { loc: '/gallery', changefreq: 'monthly', priority: '0.75' },
  { loc: '/contact', changefreq: 'monthly', priority: '0.8' },
];

const roomRoutes = roomsData.map((room) => ({
  loc: `/rooms/${room.slug}`,
  changefreq: 'monthly',
  priority: '0.85',
}));

const allRoutes = [...staticRoutes, ...roomRoutes];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(rootDir, 'public', 'sitemap.xml'), xml, 'utf8');
console.log(`Generated public/sitemap.xml with ${allRoutes.length} routes.`);
