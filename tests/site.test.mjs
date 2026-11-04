import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createSiteServer } from '../preview.mjs';
import { createPages, redirects } from '../site.mjs';
import { services, industries } from '../content.mjs';
import { serviceDetails, industryDetails } from '../detail-content.mjs';
import { buildSite } from '../build.mjs';

const pages = createPages();

async function withServer(run) {
  const server = createSiteServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  try { await run(`http://127.0.0.1:${server.address().port}`); }
  finally { await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve())); }
}

test('all core pages, legacy information page, and assets are served; private files are not', async () => {
  assert.equal(pages.size, 24);
  await withServer(async (base) => {
    for (const path of [...pages.keys(), '/styles.css', '/main.js', '/favicon.svg', '/fonts/geist.woff2', '/fonts/geist-mono.woff2']) {
      const response = await fetch(base + path);
      assert.equal(response.status, 200, path);
      assert.ok((await response.text()).length > 100, path);
      assert.equal((await fetch(base + path, { method: 'HEAD' })).status, 200, path);
    }
    for (const path of ['/agency-positioning.md', '/website-plan.md', '/content.mjs', '/site.mjs', '/package.json', '/preview.mjs', '/.env.local', '/not-found', '/%2e%2e/package.json', '/api/anything']) {
      assert.equal((await fetch(base + path)).status, 404, path);
    }
    assert.equal((await fetch(base, { method: 'POST' })).status, 405);
    assert.equal(await (await fetch(base, { method: 'HEAD' })).text(), '');
    assert.match(await (await fetch(base + '/robots.txt')).text(), /Disallow: \//);
  });
});

test('redirects preserve enquiry parameters and resolve directly', async () => {
  await withServer(async (base) => {
    for (const [source, destination] of redirects) {
      const response = await fetch(base + source + '?interest=Streamline%20operations', { redirect: 'manual' });
      assert.equal(response.status, 308, source);
      assert.equal(response.headers.get('location'), destination + '?interest=Streamline%20operations');
      assert.ok(pages.has(destination), `${source} destination`);
    }
  });
});

test('all internal links, fragments, prefill values, and assets resolve', async () => {
  const assets = ['/styles.css', '/main.js', '/favicon.svg', '/fonts/geist.woff2'];
  const validInterests = services.map((service) => service.slug);
  const validIndustries = industries.map((industry) => industry.slug);
  for (const [path, html] of pages) {
    for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^(mailto:|https?:)/.test(href)) continue;
      const url = new URL(href.replaceAll('&amp;', '&'), `http://localhost${path}`);
      assert.ok(pages.has(url.pathname) || assets.includes(url.pathname), `${path}: missing ${href}`);
      if (url.hash) assert.ok(pages.get(url.pathname).includes(`id="${url.hash.slice(1)}"`), `${path}: missing fragment ${href}`);
      if (url.searchParams.has('interest')) assert.ok(validInterests.includes(url.searchParams.get('interest')), href);
      if (url.searchParams.has('industry')) assert.ok(validIndustries.includes(url.searchParams.get('industry')), href);
    }
  }
});

test('pages have consistent accessible landmarks and unique meaningful metadata', () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const [path, html] of pages) {
    assert.equal((html.match(/<h1\b/g) || []).length, 1, path);
    assert.equal((html.match(/<main\b/g) || []).length, 1, path);
    assert.match(html, /<html lang="en">/);
    assert.match(html, /Skip to content/);
    assert.match(html, /aria-label="Main navigation"/);
    assert.match(html, /<footer/);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(ids.length, new Set(ids).size, `${path}: duplicate IDs`);
    titles.add(html.match(/<title>(.*?)<\/title>/)[1]);
    descriptions.add(html.match(/name="description" content="([^"]+)"/)[1]);
    assert.doesNotMatch(html, /\b(lorem ipsum|unlock your potential|future-proof|supercharge|cutting-edge)\b/i);
  }
  assert.equal(titles.size, pages.size);
  assert.equal(descriptions.size, pages.size);
  for (const id of ['outcomes', 'approach', 'fieldnotes', 'about', 'contact']) assert.ok(pages.get('/').includes(`id="${id}"`));
});

test('six distinct services, ten industry contexts, and honest evidence are visible', () => {
  assert.equal(services.length, 6);
  assert.equal(industries.length, 10);
  for (const service of services) {
    const html = pages.get(`/services/${service.slug}/`);
    assert.match(html, /Example scenario/);
    assert.match(html, /aria-current="page"/);
    assert.ok(html.includes(`interest=${service.slug}`));
  }
  const cloud = pages.get('/services/cloud-infrastructure/');
  for (const name of ['Amazon Web Services', 'Microsoft Azure', 'Google Cloud', 'Microsoft Entra', 'AWS IAM', 'Google Cloud IAM']) assert.ok(cloud.includes(name));
  for (const industry of industries) {
    assert.ok(pages.get('/industries/').includes(`id="${industry.slug}"`));
    assert.ok(pages.has(`/industries/${industry.slug}/`));
    assert.ok(pages.get('/industries/').includes(`href="/industries/${industry.slug}/"`));
  }
  assert.match(pages.get('/industries/'), /Insurance/);
  assert.match(pages.get('/about/'), /more than five years at Microsoft/);
  assert.match(pages.get('/about/'), /4,000/);
});

test('team positioning is site-wide; founder biography is confined to About', () => {
  for (const [path, html] of pages) {
    if (path === '/about/') continue;
    assert.doesNotMatch(html, /Dickson Mwendia|Meet the founder|Your first email goes to Dickson|4,000|Senior Knowledge Engineer/, path);
  }
  assert.match(pages.get('/'), /Software engineers, cloud architects, designers/);
  assert.match(pages.get('/about/'), /Different disciplines\. One delivery team/);
  assert.match(pages.get('/contact/'), /Our team reviews your outline/);
});

test('service and industry pages have substantive differentiated detail, navigation and FAQs', () => {
  const wordCount = (html) => html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1].replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  for (const service of services) {
    const detail = serviceDetails[service.slug];
    assert.ok(detail.solutions.length >= 4);
    assert.equal(service.problems.length, 3);
    assert.equal(service.start.outputs.length, 4);
    assert.ok(detail.technologies.length >= 4);
    const html = pages.get(`/services/${service.slug}/`);
    assert.ok(wordCount(html) >= 600, `${service.slug}: ${wordCount(html)} words`);
    for (const id of ['problems', 'deliver', 'start', 'technology', 'questions']) assert.ok(html.includes(`id="${id}"`), `${service.slug}: ${id}`);
    for (const removed of ['id="overview"', 'id="capabilities"', 'id="deliverables"', 'id="delivery"', 'Before we start']) assert.ok(!html.includes(removed), `${service.slug}: ${removed}`);
    assert.ok((html.match(/<details>/g) || []).length >= 4);
  }
  for (const industry of industries) {
    const detail = industryDetails[industry.slug];
    assert.ok(detail.solutions.length >= 4);
    assert.equal(detail.integrations.length, 3);
    assert.equal(detail.quality.length, 3);
    const html = pages.get(`/industries/${industry.slug}/`);
    assert.ok(wordCount(html) >= 500, `${industry.slug}: ${wordCount(html)} words`);
    assert.match(html, /Example scenario/);
    assert.ok(html.includes(`industry=${industry.slug}`));
    assert.ok((html.match(/<details>/g) || []).length >= 3);
  }
  const education = pages.get('/industries/education/');
  for (const term of ['Learning platforms', 'Assessment', 'SCORM', 'xAPI', 'LTI', 'Children', 'educator']) assert.ok(education.includes(term), term);
});

test('no boilerplate is shared across industry pages and no section restates another', () => {
  const sentences = new Map();
  for (const industry of industries) {
    const text = pages.get(`/industries/${industry.slug}/`).match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1].replace(/<(nav|footer)[\s\S]*?<\/\1>/g, '').replace(/<section class="(related-section|closing)[\s\S]*?<\/section>/g, '').replace(/<[^>]+>/g, ' ');
    for (const sentence of text.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.split(/\s+/).length >= 10)) {
      sentences.set(sentence, (sentences.get(sentence) || 0) + 1);
    }
  }
  const shared = [...sentences].filter(([, count]) => count > 1).map(([sentence]) => sentence);
  assert.deepEqual(shared, [], 'Long sentences repeated across industry pages');
  assert.ok(!pages.get('/services/').includes('engagement-grid'), 'Services overview must not repeat engagement models');
  assert.ok(!pages.get('/industries/').includes('What shapes the work'), 'Industries overview must not duplicate detail pages');
});

test('public copy avoids defensive and internal-policy phrasing', () => {
  const banned = [/not a client case study/i, /not a claim/i, /not a portfolio/i, /not an implied/i, /not a Microsoft endorsement/i, /does not automatically include/i, /rather than promising/i, /not implied by a website promise/i, /zero leakage/i, /Show evidence honestly/i, /no universal coverage/i, /not universally promised/i, /Online booking is not currently enabled/i];
  for (const [path, html] of pages) {
    if (path === '/privacy/') continue;
    for (const pattern of banned) assert.doesNotMatch(html, pattern, `${path}: ${pattern}`);
  }
});

test('contact offers a single send action and accessible delivery status', () => {
  const html = pages.get('/contact/');
  assert.match(html, /What happens next/);
  assert.doesNotMatch(html, /sales funnel|How this form works|Paid work starts/);
  assert.doesNotMatch(html, /draft|email-fallback|copy-message|delivery-disclosure/);
  assert.match(html, /id="send-enquiry"[^>]+disabled/);
  assert.match(html, /id="form-status" role="status"/);
  assert.match(html, /<noscript>/);
  assert.match(html, /name="website" tabindex="-1"/);
  for (const service of services) assert.ok(html.includes(`<option value="${service.slug}">`));
});

test('mobile navigation prevents initial shift and recovers when its script fails', async () => {
  const html = pages.get('/');
  assert.ok(html.indexOf("classList.add('js')") < html.indexOf('href="/styles.css"'));
  assert.match(html, /onerror="document\.documentElement\.classList\.remove\('js'\)"/);
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  assert.match(css, /\.js \.menu-toggle\[aria-expanded="false"\]\+#navigation/);
});

test('no root file matches Vercel server entrypoint detection', async () => {
  const { readdir } = await import('node:fs/promises');
  const detected = /^(app|server|index)\.(js|mjs|cjs|ts|mts|cts)$/;
  for (const dir of ['../', '../src/']) {
    const entries = await readdir(new URL(dir, import.meta.url)).catch(() => []);
    assert.deepEqual(entries.filter((name) => detected.test(name)), [], `${dir} contains a file Vercel would run as a server`);
  }
  const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
  assert.equal(config.framework, null);
  assert.equal(config.outputDirectory, 'dist');
});

test('Vercel builds include Web Analytics; local builds omit it', async () => {
  const { analyticsEnabled } = await import('../build.mjs');
  assert.equal(analyticsEnabled({}), false);
  assert.equal(analyticsEnabled({ VERCEL: '1' }), true);
  assert.equal(analyticsEnabled({ VERCEL: '1', ENABLE_ANALYTICS: '0' }), false);
  assert.equal(analyticsEnabled({ ENABLE_ANALYTICS: '1' }), true);
  const original = process.env.VERCEL;
  try {
    process.env.VERCEL = '1';
    await buildSite();
    for (const file of ['index.html', 'services/cloud-infrastructure/index.html', 'industries/education/index.html', '404.html']) {
      const html = await readFile(new URL(`../dist/${file}`, import.meta.url), 'utf8');
      assert.match(html, /<script defer src="\/_vercel\/insights\/script\.js"><\/script><\/head>/, file);
      assert.equal((html.match(/_vercel\/insights/g) || []).length, 1, file);
    }
    delete process.env.VERCEL;
    await buildSite();
    assert.doesNotMatch(await readFile(new URL('../dist/index.html', import.meta.url), 'utf8'), /_vercel\/insights/);
  } finally {
    if (original === undefined) delete process.env.VERCEL;
    else process.env.VERCEL = original;
    await buildSite();
  }
});

test('production build contains only public files and Vercel redirects match preview', async () => {
  await buildSite();
  for (const path of pages.keys()) {
    const file = path === '/' ? 'index.html' : path.endsWith('/') ? `${path.slice(1)}index.html` : path.slice(1);
    assert.ok((await stat(new URL(`../dist/${file}`, import.meta.url))).isFile());
  }
  const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
  for (const [source, destination] of redirects) assert.ok(config.redirects.some((rule) => rule.source === source && rule.destination === destination), source);
  assert.match(await readFile(new URL('../dist/contact/index.html', import.meta.url), 'utf8'), /Send enquiry/);
  assert.ok((await stat(new URL('../dist/styles.css', import.meta.url))).size < 50000);
  assert.ok((await stat(new URL('../dist/main.js', import.meta.url))).size < 20000);
});

test('public origin enables canonical links and sitemap; preview builds remove production metadata', async () => {
  const original = process.env.SITE_URL;
  try {
    process.env.SITE_URL = 'https://cognitron.example';
    await buildSite();
    const html = await readFile(new URL('../dist/industries/education/index.html', import.meta.url), 'utf8');
    assert.match(html, /rel="canonical" href="https:\/\/cognitron\.example\/industries\/education\/"/);
    const sitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
    assert.equal((sitemap.match(/<url>/g) || []).length, 23);
    assert.match(sitemap, /\/industries\/insurance\//);
    assert.doesNotMatch(sitemap, /information\.html/);
    assert.match(await readFile(new URL('../dist/robots.txt', import.meta.url), 'utf8'), /Allow: \//);
    delete process.env.SITE_URL;
    await buildSite();
    assert.match(await readFile(new URL('../dist/robots.txt', import.meta.url), 'utf8'), /Disallow: \//);
    assert.doesNotMatch(await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8'), /cognitron\.example/);
  } finally {
    if (original === undefined) delete process.env.SITE_URL;
    else process.env.SITE_URL = original;
    await buildSite();
  }
});
