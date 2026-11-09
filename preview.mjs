import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createPages, redirects, notFound } from './site.mjs';
import contact from './api/contact.mjs';

const assets = new Map([['/styles.css', 'text/css; charset=utf-8'], ['/main.js', 'text/javascript; charset=utf-8'], ['/favicon.svg', 'image/svg+xml'], ['/fonts/geist.woff2', 'font/woff2'], ['/fonts/geist-mono.woff2', 'font/woff2']]);

export function createSiteServer({ contactHandler = contact } = {}) {
  const pages = createPages();
  return createServer(async (request, response) => {
    const headers = { 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin' };
    let url;
    try {
      url = new URL(request.url, 'http://localhost');
    } catch {
      response.writeHead(400, { ...headers, 'Content-Type': 'text/plain; charset=utf-8' });
      return response.end('Invalid request address.');
    }
    if (url.pathname === '/api/contact') {
      try {
        await contactHandler(request, response);
      } catch (error) {
        console.error('Unexpected contact error:', error.name);
        if (!response.headersSent) response.writeHead(500, { ...headers, 'Content-Type': 'application/json; charset=utf-8' });
        response.end(JSON.stringify({ error: 'Unable to process the enquiry. Please use email.' }));
      }
      return;
    }
    const page = pages.get(url.pathname);
    const assetType = assets.get(url.pathname);
    const redirect = redirects.get(url.pathname);
    if ((page || assetType || redirect) && !['GET', 'HEAD'].includes(request.method)) {
      response.writeHead(405, { ...headers, Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8' });
      return response.end('Method not allowed');
    }
    if (redirect) {
      response.writeHead(308, { ...headers, Location: redirect + url.search });
      return response.end();
    }
    if (page) {
      response.writeHead(200, { ...headers, 'Content-Type': 'text/html; charset=utf-8' });
      return response.end(request.method === 'HEAD' ? undefined : page);
    }
    if (assetType) {
      try {
        const content = await readFile(new URL(url.pathname.slice(1), import.meta.url));
        response.writeHead(200, { ...headers, 'Content-Type': assetType });
        return response.end(request.method === 'HEAD' ? undefined : content);
      } catch (error) {
        console.error('Unable to serve website asset:', error);
        response.writeHead(500, { ...headers, 'Content-Type': 'text/plain; charset=utf-8' });
        return response.end('Unable to load this asset. Please try again.');
      }
    }
    if (url.pathname === '/robots.txt') {
      response.writeHead(200, { ...headers, 'Content-Type': 'text/plain; charset=utf-8' });
      return response.end(request.method === 'HEAD' ? undefined : 'User-agent: *\nDisallow: /\n');
    }
    response.writeHead(404, { ...headers, 'Content-Type': 'text/html; charset=utf-8' });
    response.end(request.method === 'HEAD' ? undefined : notFound());
  });
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const port = Number(process.env.PORT || 3000);
  const server = createSiteServer();
  server.on('error', (error) => { console.error('Unable to start Cognitron:', error.message); process.exitCode = 1; });
  server.listen(port, '127.0.0.1', () => console.log(`COGNITRON is available at http://127.0.0.1:${port}`));
}
