import { mkdir, writeFile, copyFile, readFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createPages, redirects, notFound, escapeHtml } from './site.mjs';

const analyticsSnippet = '<script>window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};</script><script defer src="/_vercel/insights/script.js"></script>';

// Vercel serves the analytics script only on its own deployments, so local builds omit it.
export const analyticsEnabled = (env = process.env) => env.ENABLE_ANALYTICS === '1' || (env.VERCEL === '1' && env.ENABLE_ANALYTICS !== '0');

export async function buildSite() {
  const pages = createPages();
  const analytics = analyticsEnabled();
  const rawUrl = process.env.SITE_URL;
  let origin = '';
  if (rawUrl) {
    const site = new URL(rawUrl);
    if (!['https:', 'http:'].includes(site.protocol) || site.pathname !== '/' || site.search || site.hash || site.username || site.password) throw new Error('SITE_URL must be an HTTP(S) origin without a path or credentials.');
    origin = site.origin;
  }
  const finalise = (html, path) => {
    let head = '';
    if (origin && path) head += `<link rel="canonical" href="${escapeHtml(origin + path)}">`;
    if (analytics) head += analyticsSnippet;
    return head ? html.replace('</head>', `${head}</head>`) : html;
  };
  await rm(new URL('dist/', import.meta.url), { recursive: true, force: true });
  for (const [path, html] of pages) {
    const relative = path === '/' ? 'index.html' : path.endsWith('/') ? `${path.slice(1)}index.html` : path.slice(1);
    const output = new URL(`dist/${relative}`, import.meta.url);
    await mkdir(new URL('.', output), { recursive: true });
    await writeFile(output, finalise(html, path));
  }
  await mkdir(new URL('dist/fonts/', import.meta.url), { recursive: true });
  for (const asset of ['styles.css', 'main.js', 'favicon.svg', 'fonts/geist.woff2', 'fonts/geist-mono.woff2', 'fonts/LICENSE.md']) await copyFile(new URL(asset, import.meta.url), new URL(`dist/${asset}`, import.meta.url));
  await writeFile(new URL('dist/404.html', import.meta.url), finalise(notFound(), ''));
  if (origin) {
    await writeFile(new URL('dist/sitemap.xml', import.meta.url), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...pages.keys()].filter((path) => path !== '/services/information.html').map((path) => `<url><loc>${escapeHtml(origin + path)}</loc></url>`).join('')}</urlset>`);
    await writeFile(new URL('dist/robots.txt', import.meta.url), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
  } else {
    await writeFile(new URL('dist/robots.txt', import.meta.url), 'User-agent: *\nDisallow: /\n');
    await writeFile(new URL('dist/sitemap.xml', import.meta.url), '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>');
  }
  const vercel = JSON.parse(await readFile(new URL('vercel.json', import.meta.url), 'utf8'));
  for (const [source, destination] of redirects) {
    if (!vercel.redirects.some((rule) => rule.source === source && rule.destination === destination)) throw new Error(`Missing Vercel redirect for ${source}`);
  }
  console.log(`Built ${pages.size} pages and public assets in dist. ${origin ? 'Production metadata included.' : 'Preview indexing disabled; set SITE_URL for production.'} ${analytics ? 'Vercel Web Analytics included.' : 'Analytics omitted (local build).'}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) await buildSite();
