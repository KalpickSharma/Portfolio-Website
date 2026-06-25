const fs = require('fs');
const path = require('path');

// Change this to your production URL
const BASE = process.env.SITE_URL || 'https://your-domain.example';

// Load routes from routes.json (fallback to a default set)
const routesPath = path.join(__dirname, '..', 'routes.json');
let routes = ['/'];
if (fs.existsSync(routesPath)) {
  try {
    routes = JSON.parse(fs.readFileSync(routesPath, 'utf8'));
  } catch (e) {
    console.error('Failed to parse routes.json, using default routes', e);
  }
}

const urls = routes
  .map((r) => {
    const loc = `${BASE}${r === '/' ? '' : r}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

const outDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap, 'utf8');
console.log('Wrote public/sitemap.xml with', routes.length, 'entries');

// write robots.txt with sitemap reference
const robots = `User-agent: *\nAllow: /\nSitemap: ${BASE}/sitemap.xml\n`;
fs.writeFileSync(path.join(outDir, 'robots.txt'), robots, 'utf8');
console.log('Wrote public/robots.txt');
