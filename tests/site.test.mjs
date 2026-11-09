import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createSiteServer } from '../preview.mjs';
import { createPages, redirects, escapeHtml } from '../site.mjs';
import { services, industries } from '../content.mjs';
import { serviceDetails, industryDetails } from '../detail-content.mjs';
import { buildSite } from '../build.mjs';

const pages = createPages();

test('violet theme separates white-label actions from lavender graphic accents', async () => {
  const css = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  const client = await readFile(new URL('../main.js', import.meta.url), 'utf8');
  const favicon = await readFile(new URL('../favicon.svg', import.meta.url), 'utf8');
  assert.match(css, /--action:#6250d8;--action-hover:#5140bc/);
  assert.match(css, /--volt:#b4a4f4;--volt-hover:#ded6ff/);
  assert.match(css, /\.button\{[^}]*background:var\(--action\);color:var\(--white\)/);
  assert.match(css, /\.closing-inner\{[^}]*background:var\(--ink\)/);
  assert.match(client, /getPropertyValue\('--action'\)/);
  assert.match(client, /ctx\.ellipse/);
  assert.doesNotMatch(css + client + favicon, /#d4f04a|#e2f87d/i);
});

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
    for (const path of ['/agency-positioning.md', '/website-plan.md', '/messaging.md', '/industry-pages-messaging.md', '/content.mjs', '/site.mjs', '/package.json', '/preview.mjs', '/.env.local', '/not-found', '/%2e%2e/package.json', '/api/anything']) {
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
  for (const id of ['outcomes', 'approach', 'about', 'contact']) assert.ok(pages.get('/').includes(`id="${id}"`));
});

test('homepage omits the architecture pitch and keeps a full-width stone industry section', () => {
  const html = pages.get('/');
  assert.doesNotMatch(html, /The screen is only half the job|A customer submits a request|A better-looking portal|See how we work|class="architecture"|id="fieldnotes"/);
  assert.match(html, /<section class="feature-section"><div class="section wrap"><div class="section-heading"><h2>What could we build for your industry/);
  assert.ok(html.indexOf('id="outcomes"') < html.indexOf('class="industry-index"'));
  assert.ok(html.indexOf('class="industry-index"') < html.indexOf('id="approach"'));
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
  assert.match(pages.get('/about/'), /more than five years at Microsoft/i);
  assert.match(pages.get('/about/'), /4,000/);
});

test('team positioning is site-wide; founder biography is confined to About', () => {
  for (const [path, html] of pages) {
    if (path === '/about/') continue;
    assert.doesNotMatch(html, /Dickson Mwendia|Meet the founder|Your first email goes to Dickson|4,000|Senior Knowledge Engineer/, path);
  }
  assert.match(pages.get('/'), /Product, cloud, integration, data, and AI people working as one team/);
  assert.match(pages.get('/about/'), /Specialists who stay connected/);
  assert.match(pages.get('/contact/'), /Our team reads your outline/);
});

test('audience-led copy reaches shared summaries, service pages, and contextual calls to action', () => {
  assert.match(pages.get('/'), /Software that works<br><span>the way your business actually runs/);
  assert.match(pages.get('/approach/'), /Clear scope\. Visible progress\. No surprises at handover/);
  for (const service of services) assert.equal(service.closing.title, 'Let’s talk');
  for (const service of services) {
    const html = pages.get(`/services/${service.slug}/`);
    assert.ok(html.includes(escapeHtml(service.headline)), service.slug);
    assert.ok(html.includes(service.summary), `${service.slug}: metadata`);
    assert.ok(pages.get('/').includes(service.summary), `${service.slug}: homepage summary`);
    assert.ok(pages.get('/services/').includes(service.summary), `${service.slug}: overview summary`);
    assert.ok(html.includes(escapeHtml(service.closing.title)), `${service.slug}: closing title`);
    assert.ok(html.includes(escapeHtml(service.closing.text)), `${service.slug}: closing text`);
    assert.ok(html.includes(`href="/contact/?interest=${service.slug}"`), `${service.slug}: prefilled contact`);
  }
  for (const path of ['/', '/services/', '/approach/', '/about/', '/contact/', ...services.map((service) => `/services/${service.slug}/`)]) {
    assert.doesNotMatch(pages.get(path), /Better software\.|Stronger systems\.|Six services, one delivery team\.|You always know|Different disciplines\. One delivery team\./, path);
  }
  assert.match(pages.get('/services/ai-solutions/'), /consequential or irreversible actions require approval/i);
  assert.match(pages.get('/services/integration-automation/'), /60–90 minutes/);
  assert.match(pages.get('/contact/'), /Please leave out passwords, customer records/);
});

test('expanded Services menu uses the supplied messaging blurbs verbatim', () => {
  const summaries = [
    'Web and mobile applications, customer portals, and internal tools built around real users and the systems behind them.',
    'Architecture, migration, identity, and operations on AWS, Azure, and Google Cloud that your team can actually run.',
    'Connect the tools you already use so data stops living in inboxes and spreadsheets.',
    'Practical AI that fits into existing workflows, with clear human review points. No science projects.',
    'Reports and dashboards your team will actually trust and maintain.',
    'Improve what you have and put a clear owner in place after release.',
  ];
  assert.deepEqual(services.map((service) => service.summary), summaries);
  for (const [path, html] of pages) {
    const menu = html.match(/id="menu-services">([\s\S]*?)<a class="nav-panel-all"/)[1];
    for (const summary of summaries) assert.ok(menu.includes(`<span>${escapeHtml(summary)}</span>`), `${path}: ${summary}`);
  }
});

test('service pages and general pages retain the supplied messaging rather than substitute slogans', () => {
  const headlines = [
    'Software built for the job it actually has to do',
    'Cloud infrastructure your team can actually run with confidence',
    'Connect your systems. Cut the manual handoffs.',
    'Put AI to work on a specific problem',
    'Get a clear, trustworthy view of your business data',
    'Improve the software your business already depends on',
  ];
  assert.deepEqual(services.map((service) => service.headline), headlines);
  for (const service of services) {
    const html = pages.get(`/services/${service.slug}/`);
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
    for (const text of [service.lead, service.exampleTitle, service.example, service.start.text, ...service.problems.flat(), ...service.start.outputs]) {
      assert.ok(main.includes(escapeHtml(text)), `${service.slug}: ${text}`);
    }
    for (const [title, description] of serviceDetails[service.slug].solutions) {
      assert.ok(main.includes(escapeHtml(title)));
      assert.ok(main.includes(escapeHtml(description)));
    }
    assert.doesNotMatch(main, /\bundefined\b/);
  }
  const home = pages.get('/');
  for (const text of [
    'We design and build digital products, cloud platforms, and integrations that cut manual work, reduce risk, and stay maintainable after go-live.',
    'One team for the full stack of work.',
    'Whether you need a new customer portal, cleaner cloud infrastructure, or the glue between the systems you already pay for — we put the right specialists on it and keep decisions connected.',
    'What’s broken or holding you back?',
    'Tell us the context — systems, users, constraints — and we’ll tell you the sensible next step. No pitch deck required.',
  ]) assert.ok(home.includes(escapeHtml(text)), text);
  for (const text of [
    'When you need a clear starting point before committing budget.',
    'When there’s a defined project that needs to ship.',
    'When your team needs extra firepower on a specific workstream.',
    'When the system needs a reliable ongoing owner.',
    'We lock priorities, acceptance criteria, and budget early. Assumptions get written down so they can’t drift.',
    'You see progress in the actual product on a fixed cadence, not just status reports.',
    'When priorities shift, you see the impact on scope, cost, and timeline before anything extra is started.',
  ]) assert.ok(pages.get('/approach/').includes(escapeHtml(text)), text);
  for (const text of [
    'Product, cloud, integration, data, and AI people working as one team — so architecture decisions don’t get made in isolation from the people who have to run the system.',
    'Technology that people can actually operate.',
    'That experience made one thing obvious: a system isn’t finished when the code ships. People need to understand it, own it, and keep it running. That’s the standard we bring to every engagement.',
  ]) assert.ok(pages.get('/about/').includes(escapeHtml(text)), text);
  assert.ok(pages.get('/services/ai-solutions/').includes('We almost never recommend training your own model.'));
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

test('industry pages preserve the supplied headlines and show a scoped starting point', () => {
  const headlines = {
    'finance-fintech': 'Software for financial services that keeps the controls visible',
    insurance: 'Connect the policy, the claim, and the people handling it',
    'procurement-supply-chain': 'Make purchasing and supplier work easier to follow',
    'compliance-risk': 'Keep evidence, reviews, and accountability in one place',
    healthcare: 'Better digital services around the delivery of care',
    education: 'Learning platforms that work for learners and the people who run them',
    'retail-ecommerce': 'Join up the storefront and the work behind every order',
    'logistics-transport': 'Keep dispatch, delivery, and customer updates on the same record',
    agriculture: 'Connect field records to the people who need them',
    'public-sector-non-profit': 'Digital services that make access and accountability easier',
  };
  assert.match(pages.get('/industries/'), /We design and build custom portals, business applications, integrations, and dashboards/);
  assert.equal(new Set(industries.map(({ slug }) => industryDetails[slug].closing.title)).size, industries.length);
  assert.equal(new Set(industries.map(({ slug }) => industryDetails[slug].start.name)).size, industries.length);
  for (const industry of industries) {
    const detail = industryDetails[industry.slug];
    const html = pages.get(`/industries/${industry.slug}/`);
    const hero = html.match(/<section class="page-hero">([\s\S]*?)<\/section>/)[1];
    assert.match(hero, /Custom software/);
    assert.equal(detail.headline, headlines[industry.slug]);
    assert.ok(hero.includes(`<h1>${escapeHtml(headlines[industry.slug])}</h1>`));
    assert.ok(hero.includes(escapeHtml(industry.intro)));
    assert.ok(html.includes(`name="description" content="${escapeHtml(industry.intro)}"`));
    assert.ok(pages.get('/industries/').includes(escapeHtml(industry.intro)), `${industry.slug}: overview offer`);
    assert.equal(detail.challenges.length, 3);
    assert.equal(detail.start.outputs.length, 3);
    assert.equal(detail.scenario.steps.length, 4);
    for (const id of ['challenges', 'solutions', 'example', 'systems', 'considerations', 'start', 'questions']) {
      assert.ok(html.includes(`id="${id}"`), `${industry.slug}: section ${id}`);
      assert.ok(html.includes(`href="#${id}"`), `${industry.slug}: section link ${id}`);
    }
    for (const text of [detail.start.name, ...detail.start.outputs, detail.closing.title, detail.closing.text, detail.closing.action]) {
      assert.ok(html.includes(escapeHtml(text)), `${industry.slug}: ${text}`);
    }
    assert.match(html, /Assessment scope and price agreed before work starts/);
    assert.match(html, /What we measure/);
    for (const [title, description] of detail.solutions) {
      assert.ok(html.includes(escapeHtml(title)));
      assert.ok(html.includes(escapeHtml(description)));
    }
    const example = html.match(/<section id="example"[\s\S]*?<\/section>/)[0];
    assert.equal(detail.scenario.text.split('\n\n').length, 2, `${industry.slug}: original example paragraphs`);
    for (const paragraph of detail.scenario.text.split('\n\n')) assert.ok(example.includes(`<p>${escapeHtml(paragraph)}</p>`));
    assert.ok(example.includes(escapeHtml(detail.scenario.measures)));
    const contextualLinks = [...html.matchAll(/href="(\/contact\/\?industry=[^"]+)"/g)];
    assert.equal(contextualLinks.length, 3, `${industry.slug}: hero, assessment, and closing contact`);
    for (const [, href] of contextualLinks) {
      assert.equal(new URL(href, 'http://localhost').searchParams.get('industry'), industry.slug);
    }
    assert.ok(html.indexOf('id="example"') < html.indexOf('id="systems"'), `${industry.slug}: show the project before technical detail`);
    for (const slug of industry.services) assert.ok(services.some((service) => service.slug === slug), `${industry.slug}: related ${slug}`);
  }
});

test('industry examples name exceptions and preserve decision and data boundaries', () => {
  const scenarios = {
    'finance-fintech': /notification arrives twice or arrives late/,
    insurance: /links it to the existing case instead of creating a duplicate/,
    'procurement-supply-chain': /Partial deliveries stay open with a named owner/,
    'compliance-risk': /never silently treated as approvals/,
    healthcare: /Once the appointment is confirmed in the scheduling system/,
    education: /progress and submissions stay consistent/,
    'retail-ecommerce': /without creating duplicate orders or incorrect refunds/,
    'logistics-transport': /without creating two delivery records/,
    agriculture: /Unmatched or disputed quantities appear in a review queue/,
    'public-sector-non-profit': /point back to the source records/,
  };
  for (const [slug, pattern] of Object.entries(scenarios)) assert.match(industryDetails[slug].scenario.text, pattern, slug);
  assert.match(pages.get('/industries/finance-fintech/'), /authorised credit officer reviews the exceptions and makes the required credit decisions/);
  assert.match(pages.get('/industries/insurance/'), /AI does not determine coverage or authorise settlement/);
  assert.match(pages.get('/industries/healthcare/'), /Clinical notes and decisions remain outside the administrative workflow/);
  assert.match(pages.get('/industries/education/'), /Grading and safeguarding decisions stay with staff/);
  assert.match(pages.get('/industries/compliance-risk/'), /does not certify that the organisation meets a regulation/);
  assert.match(pages.get('/industries/logistics-transport/'), /must not require drivers to read instructions, enter data, or respond to prompts while driving/);
  assert.match(pages.get('/industries/public-sector-non-profit/'), /not, on its own, evidence that the programme caused an impact/);
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
