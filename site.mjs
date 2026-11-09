import { services, industries, engagements, servicePath, contactPath } from './content.mjs';
import { serviceDetails, industryDetails } from './detail-content.mjs';

export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const e = escapeHtml;
const arrow = '<span aria-hidden="true">↗</span>';
const mark = '<svg viewBox="0 0 34 30" aria-hidden="true"><path d="M29 4H14L3 15l11 11h15M21 4 10 15l11 11"/></svg>';
const link = (href, text, cls = 'text-link') => `<a class="${cls}" href="${e(href)}">${e(text)} ${arrow}</a>`;
const button = (href = '/contact/', text = 'Discuss your project') => link(href, text, 'button');
const label = (text) => `<p class="eyebrow">${e(text)}</p>`;
const serviceBySlug = (slug) => services.find((service) => service.slug === slug);
const industryPath = (industry) => `/industries/${industry.slug}/`;
const serviceLinks = (slugs) => slugs.map((slug) => {
  const service = serviceBySlug(slug);
  return link(servicePath(service), service.short);
}).join('');

function navPanel(id, label, overview, items, wide) {
  return `<div class="nav-panel${wide ? ' nav-panel-wide' : ''}" id="${id}"><div class="nav-panel-inner"><ul>${items.join('')}</ul><a class="nav-panel-all" href="${overview}">${e(label)} <span aria-hidden="true">→</span></a></div></div>`;
}

function header(path) {
  const current = (href) => path === href ? ' aria-current="page"' : path.startsWith(href) ? ' aria-current="true"' : '';
  const group = (href, text, panelId, panel) => `<div class="nav-group"><a href="${href}"${current(href)}>${text}</a><button class="nav-toggle" type="button" aria-expanded="false" aria-controls="${panelId}" aria-label="Show ${text.toLowerCase()}" hidden><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 4.5 6 8l3.5-3.5"/></svg></button>${panel}</div>`;
  const servicePanel = navPanel('menu-services', 'All services', '/services/', services.map((service) => `<li><a href="${servicePath(service)}"><strong>${e(service.name)}</strong><span>${e(service.summary)}</span></a></li>`), true);
  const industryPanel = navPanel('menu-industries', 'All industries', '/industries/', industries.map((industry) => `<li><a href="${industryPath(industry)}">${e(industry.name)}</a></li>`), false);
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header"><div class="header-inner">
    <a class="wordmark" href="/" aria-label="COGNITRON home">${mark}<span>cognitron<span class="brand-dot">.</span></span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="navigation" hidden>Menu <span aria-hidden="true">+</span></button>
    <nav id="navigation" aria-label="Main navigation">
      ${group('/services/', 'Services', 'menu-services', servicePanel)}
      ${group('/industries/', 'Industries', 'menu-industries', industryPanel)}
      <a href="/approach/"${current('/approach/')}>Our approach</a><a href="/about/"${current('/about/')}>About</a>
      <a class="nav-contact" href="/contact/"${path === '/contact/' ? ' aria-current="page"' : ''}>Discuss your project ${arrow}</a>
    </nav>
  </div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="wrap">
    <div class="footer-top"><a class="wordmark" href="/" aria-label="COGNITRON home">${mark}<span>cognitron.</span></a><p>Build what’s missing.<br>Improve what’s there.</p><a class="footer-email" href="mailto:dickson@cognitron.tech">dickson@cognitron.tech ${arrow}</a></div>
    <div class="footer-columns"><div><h2>Services</h2>${services.map((service) => `<a href="${servicePath(service)}">${e(service.short)}</a>`).join('')}</div>
    <div><h2>Explore</h2><a href="/industries/">Industries</a><a href="/approach/">Our approach</a><a href="/about/">About Cognitron</a><a href="/contact/">Contact</a></div>
    <div class="footer-note"><h2>No finished brief needed</h2><p>Tell us where the work gets stuck, what your team uses today, and what you want to change.</p>${link('/contact/', 'Let’s talk')}</div></div>
    <div class="footer-bottom"><p>© ${new Date().getFullYear()} COGNITRON</p><p>Software, cloud & AI services.</p><a href="/privacy/">Privacy & data</a></div>
  </div></footer>`;
}

function layout(path, title, description, body) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#111110"><title>${e(title)} — COGNITRON</title><meta name="description" content="${e(description)}">
<meta property="og:title" content="${e(title)} — COGNITRON"><meta property="og:description" content="${e(description)}"><meta property="og:type" content="website">
<script>document.documentElement.classList.add('js')</script><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preload" href="/fonts/geist.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/styles.css"><script src="/main.js" defer onerror="document.documentElement.classList.remove('js')"></script></head>
<body>${header(path)}<main id="main">${body}</main>${footer()}</body></html>`;
}

function pageHero(eyebrow, title, lead, action = '/contact/', actionText = 'Discuss your project', crumb = '') {
  return `<section class="page-hero"><div class="wrap">${crumb}${label(eyebrow)}<h1>${e(title)}</h1><div class="page-hero-bottom"><p class="lead">${e(lead)}</p>${action ? button(action, actionText) : ''}</div></div></section>`;
}

function cta(title = 'What’s broken or holding you back?', text = 'Tell us the context — systems, users, constraints — and we’ll tell you the sensible next step. No pitch deck required.', href = '/contact/', actionText = 'Let’s talk') {
  return `<section class="closing"><div class="wrap closing-inner"><div><h2>${e(title)}</h2><p>${e(text)}</p></div>${button(href, actionText)}</div></section>`;
}

const serviceArt = {
  'software-development': '<rect x="40" y="18" width="160" height="104" rx="10"/><path d="M40 40h160"/><circle cx="54" cy="29" r="3"/><circle cx="65" cy="29" r="3"/><circle cx="76" cy="29" r="3"/><path d="M60 62l-12 12 12 12M92 62l12 12-12 12"/><path d="M122 62h44M122 76h30M122 90h38"/><rect class="art-accent" x="152" y="70" width="8" height="12" rx="1"/>',
  'cloud-infrastructure': '<path d="M120 22 196 54 120 86 44 54Z" class="art-accent-fill"/><path d="M44 72 120 104 196 72"/><path d="M44 90 120 122 196 90"/><path d="M44 54v36M196 54v36"/>',
  'integration-automation': '<rect x="28" y="44" width="52" height="52" rx="12"/><rect x="160" y="44" width="52" height="52" rx="12"/><path d="M80 70h80"/><path d="M148 62l12 8-12 8"/><circle class="art-accent-fill" cx="120" cy="70" r="12"/><path d="M42 62h24M42 72h16M174 62h24M174 72h18"/>',
  'ai-solutions': '<rect x="36" y="22" width="112" height="96" rx="10"/><path d="M52 42h80M52 56h64M52 84h72M52 98h56"/><rect class="art-accent-fill" x="50" y="64" width="84" height="12" rx="3"/><circle cx="170" cy="86" r="22"/><path d="M186 102l16 16"/>',
  'data-business-intelligence': '<path d="M40 118h168M40 118V22"/><rect x="56" y="80" width="22" height="38" rx="3"/><rect x="92" y="60" width="22" height="58" rx="3"/><rect class="art-accent-fill" x="128" y="40" width="22" height="78" rx="3"/><rect x="164" y="70" width="22" height="48" rx="3"/><path d="M58 70 103 48 139 30 175 54"/>',
  'modernisation-support': '<rect x="30" y="36" width="70" height="70" rx="10" stroke-dasharray="5 5"/><rect class="art-accent-fill" x="140" y="36" width="70" height="70" rx="10"/><path d="M106 71h28"/><path d="M124 63l10 8-10 8"/><path d="M152 60h46M152 72h34M152 84h40"/><path d="M44 60h42M44 72h28M44 84h36"/>',
};

function serviceList(withArt = false) {
  return `<div class="service-list${withArt ? ' service-list-art' : ''}">${services.map((service, index) => `<a class="service-entry" href="${servicePath(service)}"><span class="entry-number">0${index + 1}</span><span class="entry-arrow" aria-hidden="true">↗</span>${withArt ? `<svg class="service-art" viewBox="0 0 240 140" aria-hidden="true">${serviceArt[service.slug]}</svg>` : ''}<div><h3>${e(service.name)}</h3><p>${e(service.summary)}</p></div></a>`).join('')}</div>`;
}

function home() {
  const body = `<section class="home-hero"><div class="hero-visual" aria-hidden="true"><canvas id="hero-globe"></canvas></div><div class="wrap">${label('Software, cloud & AI services')}
    <div class="hero-heading"><h1>Software that works<br><span>the way your business actually runs.</span></h1></div>
    <div class="hero-bottom"><p>We design and build digital products, cloud platforms, and integrations that cut manual work, reduce risk, and stay maintainable after go-live.</p><div class="hero-actions">${button()}${link('/services/', 'Explore our services')}</div></div>
    <div class="hero-footline"><span>Products, platforms & the connections between them</span><ul aria-label="Cloud platforms"><li>AWS</li><li>Microsoft Azure</li><li>Google Cloud</li></ul></div>
  </div></section>
  <section id="outcomes" class="section wrap"><div class="section-heading"><h2>One team for the full stack of work.</h2><p>Whether you need a new customer portal, cleaner cloud infrastructure, or the glue between the systems you already pay for — we put the right specialists on it and keep decisions connected.</p></div>${serviceList(true)}</section>
  <section class="feature-section"><div class="section wrap"><div class="section-heading"><h2>What could we build for your industry?</h2><p>Claims portals, driver apps, learning platforms, and more. Find the software and integration work relevant to your team.</p></div><div class="industry-index">${industries.map((industry) => `<a href="${industryPath(industry)}">${e(industry.name)} ${arrow}</a>`).join('')}</div></div></section>
  <section id="approach" class="approach-section section"><div class="wrap"><div class="section-heading"><h2>Four ways to work with us.</h2></div><div class="engagement-grid">${engagements.map(([name, summary]) => `<article><h3>${e(name)}</h3><p>${e(summary)}</p></article>`).join('')}</div>${link('/approach/', 'How each one works')}</div></section>
  <section id="about" class="section wrap people-section"><div><h2>Specialists who stay connected.</h2></div><div><p class="large-copy">Product, cloud, integration, data, and AI people working as one team — so architecture decisions don’t get made in isolation from the people who have to run the system.</p>${link('/about/', 'Meet Cognitron')}</div></section>
  <div id="contact">${cta()}</div>`;
  return layout('/', 'Software, cloud & AI services', 'Software that fits how your business runs. COGNITRON builds digital products, cloud platforms, and integrations to cut manual work and improve services.', body);
}

function servicesPage() {
  return layout('/services/', 'Services', 'Build a product, connect business systems, get cloud costs under control, or fix unreliable reporting. Explore six services from COGNITRON.',
    `${pageHero('Our services', 'One team for the full stack of work.', 'Whether you need a new customer portal, cleaner cloud infrastructure, or the glue between the systems you already pay for — we put the right specialists on it and keep decisions connected.')}
    <section class="wrap section service-overview">${serviceList()}</section>
    <section class="feature-section"><div class="wrap section"><div class="section-heading"><h2>Some jobs cross service lines.</h2><p>You should not have to coordinate separate projects to solve one problem.</p></div><div class="two-columns"><article><h3>A new product needs somewhere to run</h3><p>The first release includes more than screens and code. We plan hosting, sign-in, deployments, monitoring, and connections to existing systems alongside the product, so launch does not expose a second unfinished project.</p>${serviceLinks(['software-development', 'cloud-infrastructure'])}</article><article><h3>An existing system needs room to improve</h3><p>A slow process might need an integration, not a replacement application. We trace the problem and tackle the part causing the most trouble, whether that is a manual handoff, a risky release, or missing data.</p>${serviceLinks(['modernisation-support', 'integration-automation'])}</article></div></div></section>
    <section class="wrap section faq-section"><h2>Common questions.</h2>${faq([
      ['Can several services form one project?', 'Yes. One delivery lead coordinates the work across product, infrastructure, and integrations. You get one plan and a clear point of contact, rather than separate teams asking you to resolve the gaps.'],
      ['Can you work alongside our existing team?', 'Yes. We can take on a specific piece of work or add specialist skills inside your team. The proposal names the role, availability, and responsibilities so the arrangement is clear from the start.'],
      ['Will we own the work?', 'Ownership is set out in the agreement before work starts, covering code, designs, repositories, and cloud accounts. It also identifies existing components and third-party licences, so you know what you can keep, use, and change.'],
      ['What happens after launch?', 'You receive documentation, runbooks, and training. We can hand the system to your team or continue supporting it under an agreement with named systems, coverage hours, and response targets.'],
    ])}${link('/approach/', 'Ways to engage')}</section>${cta()}`);
}

function faq(items) {
  return `<div class="faq-list">${items.map(([question, answer]) => `<details><summary>${e(question)}<span aria-hidden="true">+</span></summary><p>${e(answer)}</p></details>`).join('')}</div>`;
}

function detailRows(items) {
  return `<div class="detail-rows">${items.map(([name, text], index) => `<article><span class="entry-number">${String(index + 1).padStart(2, '0')}</span><h3>${e(name)}</h3><p>${e(text)}</p></article>`).join('')}</div>`;
}

function contentGrid(items, className = 'work-grid') {
  return `<div class="${className}">${items.map(([name, text]) => `<article><h3>${e(name)}</h3><p>${e(text)}</p></article>`).join('')}</div>`;
}

function pageIndex(items) {
  return `<nav class="wrap page-index" aria-label="On this page"><span>On this page</span>${items.map(([id, name]) => `<a href="#${id}">${e(name)}</a>`).join('')}</nav>`;
}

function servicePage(service) {
  const path = servicePath(service);
  const cloud = service.slug === 'cloud-infrastructure';
  const detail = serviceDetails[service.slug];
  return layout(path, service.name, service.summary,
    `${pageHero(service.name, service.headline, service.lead, contactPath(service.slug), 'Discuss your project', `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/services/">Services</a><span aria-hidden="true">/</span><span aria-current="page">${e(service.short)}</span></nav>`)}
    ${pageIndex([['problems', 'Problems we solve'], ['deliver', 'What we deliver'], ['start', 'How to start'], ['technology', 'Technology'], ['questions', 'FAQs']])}
    ${cloud ? `<section class="platform-section"><div class="wrap"><div class="platforms"><span>Amazon Web Services<small>AWS</small></span><span>Microsoft Azure<small>Azure</small></span><span>Google Cloud<small>GCP</small></span></div><p>The right platform depends on what you already run, your team’s skills, where data needs to stay, and cost. We work in single-cloud, hybrid, and multi-cloud environments without assuming more clouds means a better solution.</p></div></section>` : ''}
    <section id="problems" class="section wrap"><div class="section-heading"><h2>Problems we solve.</h2></div><div class="problem-list" role="list">${service.problems.map(([problem, result]) => `<div role="listitem"><p class="problem">${e(problem)}</p><span aria-hidden="true">→</span><p class="result">${e(result)}</p></div>`).join('')}</div></section>
    <section id="deliver" class="feature-section"><div class="wrap section"><div class="section-heading"><h2>What we deliver.</h2>${detail.overview ? `<p>${e(detail.overview)}</p>` : ''}</div><div class="deliver-layout">${detailRows(detail.solutions)}<aside class="deliver-outputs"><h3>You receive</h3><ul>${service.outputs.map((text) => `<li>${e(text)}</li>`).join('')}</ul></aside></div></div></section>
    <section class="example-section"><div class="wrap example-layout"><div>${label('Example scenario')}<h2>${e(service.exampleTitle)}</h2><p>${e(service.example)}</p></div><div class="example-steps"><ol>${service.steps.map((step, index) => `<li><span>0${index + 1}</span>${e(step)}</li>`).join('')}</ol><p><span>What we measure</span>${e(service.measures)}</p></div></div></section>
    <section id="start" class="section wrap start-section"><div><h2>Start with ${e(service.start.phrase)}.</h2><p class="large-copy">${e(service.start.text)}</p>${button(contactPath(service.slug), `Ask about ${service.start.phrase}`)}</div><div><h3>What you receive</h3><ul class="deliverable-list">${service.start.outputs.map((text) => `<li><span aria-hidden="true">↳</span>${e(text)}</li>`).join('')}</ul><p class="start-note">Yours to keep, whether or not we build the next phase.</p></div></section>
    <section id="technology" class="feature-section"><div class="wrap section"><div class="section-heading"><h2>Technology we work with.</h2><p>${e(detail.technologyIntro || 'The final stack follows your existing systems, the product requirements, and the team that will maintain it.')}</p></div>${contentGrid(detail.technologies, 'tech-grid')}</div></section>
    <section id="questions" class="section wrap faq-section"><h2>Frequently asked questions.</h2>${faq([...service.faqs, ...detail.faqs])}</section>
    <section class="related-section wrap"><h2>Related services</h2><div>${serviceLinks(service.related)}</div></section>
    ${cta(service.closing.title, service.closing.text, contactPath(service.slug))}`);
}

function industriesPage() {
  return layout('/industries/', 'Custom software by industry', 'Customer portals, workflow software, business-system integrations, and reporting built for your organisation. Explore the projects COGNITRON can deliver in your industry.',
    `${pageHero('Industries & applications', 'Software for the work your team does every day.', 'We design and build custom portals, business applications, integrations, and dashboards. Choose your industry to see specific projects you can hire us for, the problems they address, and where a first project could start.')}
    <section class="wrap section industry-grid">${industries.map((industry) => `<article id="${industry.slug}">${industry.type ? `<span class="industry-type">${e(industry.type)}</span>` : ''}<h2><a href="${industryPath(industry)}">${e(industry.name)}</a></h2><p>${e(industry.intro)}</p><ul>${industry.applications.map((text) => `<li>${e(text)}</li>`).join('')}</ul>${link(industryPath(industry), `Explore ${industry.name}`)}</article>`).join('')}</section>
    <section class="wrap other-contexts"><h2>Other projects we can help with</h2><p>Client portals for professional services. Booking tools for hospitality and travel. Dispatch apps for field-service businesses. Renewal workflows for member organisations. We scope the application and its integrations around your process, rather than sell a fixed industry package.</p></section>
    ${cta('Don’t see your industry?', 'Tell us what your team needs to do and where the current software falls short. We’ll discuss whether a custom application, an integration, or a smaller change is the right fit.')}`);
}

function industryPage(industry) {
  const detail = industryDetails[industry.slug];
  return layout(industryPath(industry), `${industry.name} software development & integrations`, industry.intro,
    `${pageHero(`Custom software · ${industry.name}`, detail.headline, industry.intro, contactPath('', industry.slug), detail.closing.action, `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/industries/">Industries</a><span aria-hidden="true">/</span><span aria-current="page">${e(industry.name)}</span></nav>`)}
    ${pageIndex([['challenges', 'Common challenges'], ['solutions', 'What we build'], ['example', 'Example project'], ['systems', 'Integrations'], ['considerations', 'What we check'], ['start', 'First project'], ['questions', 'FAQs']])}
    <section id="challenges" class="section wrap split-section"><div><h2>Common challenges.</h2><p class="context-note"><strong>Who we work with:</strong> ${e(detail.audiences)}</p></div><div><ul class="situation-list challenge-list">${detail.challenges.map((text) => `<li>${e(text)}</li>`).join('')}</ul></div></section>
    <section id="solutions" class="feature-section"><div class="wrap section"><div class="section-heading"><h2>What we build.</h2></div>${detailRows(detail.solutions)}</div></section>
    <section id="example" class="example-section"><div class="wrap example-layout"><div>${label('Example scenario')}<h2>${e(detail.scenario.title)}</h2>${detail.scenario.text.split('\n\n').map((paragraph) => `<p>${e(paragraph)}</p>`).join('')}</div><div class="example-steps"><ol>${detail.scenario.steps.map((step, index) => `<li><span>0${index + 1}</span>${e(step)}</li>`).join('')}</ol><p><span>What we measure</span>${e(detail.scenario.measures)}</p></div></div></section>
    <section id="systems" class="wrap section"><div class="section-heading"><h2>How it connects to your existing systems.</h2></div>${contentGrid(detail.integrations, 'outcome-grid')}</section>
    <section id="considerations" class="wrap section border-top"><div class="section-heading"><h2>What we check before it goes live.</h2></div>${contentGrid(detail.quality, 'outcome-grid')}</section>
    <section id="start" class="section wrap start-section"><div>${label('A focused first project')}<h2>${e(detail.start.name)}</h2><p class="large-copy">${e(detail.start.text)}</p>${button(contactPath('', industry.slug), 'Discuss this starting point')}</div><div><h3>Assessment deliverables</h3><ul class="deliverable-list">${detail.start.outputs.map((text) => `<li><span aria-hidden="true">↳</span>${e(text)}</li>`).join('')}</ul><p class="start-note">Assessment scope and price agreed before work starts.</p></div></section>
    <section id="questions" class="wrap section faq-section"><h2>Frequently asked questions.</h2>${faq(detail.faqs)}</section>
    <section class="related-section wrap"><h2>Services for this work</h2><div>${serviceLinks(industry.services)}${link('/approach/', 'How we work')}</div></section>
    ${cta(detail.closing.title, detail.closing.text, contactPath('', industry.slug), detail.closing.action)}`);
}

function approachPage() {
  return layout('/approach/', 'Our approach', 'Clear scope, working reviews, and a planned handover. See how COGNITRON takes software and cloud projects from an initial problem to release and support.',
    `${pageHero('Our approach', 'Clear scope. Visible progress. No surprises at handover.', 'See the work as it takes shape, make decisions with the trade-offs in view, and know who is taking over at launch. That is how we run a project, whether we are building a product or fixing one part of an existing system.')}
    <section class="section wrap split-section"><div><h2>Start with the problem, not a specification.</h2></div><div class="prose"><p>Tell us where the work gets stuck, which systems are involved, and what deadline or budget we need to work within. We use the first conversation to separate what is known from what needs a closer look.</p><p>That conversation is free. If discovery, an assessment, or a prototype is the right next step, you see its scope and price before committing.</p><p>Leave credentials, customer records, and sensitive data out of the first message. We arrange secure sharing when the work needs it.</p></div></section>
    <section class="feature-section"><div class="section wrap"><div class="section-heading"><h2>Four ways to engage.</h2><p>Use one, or move between them as the work develops.</p></div><div class="engagement-rows">${engagements.map(([name, summary, detail]) => `<article><div><h3>${e(name)}</h3><p>${e(summary)}</p></div><p>${e(detail)}</p></article>`).join('')}</div></div></section>
    <section class="section wrap"><div class="section-heading"><h2>How we run delivery.</h2></div><div class="work-grid"><article><h3>Agree what matters</h3><p>We lock priorities, acceptance criteria, and budget early. Assumptions get written down so they can’t drift.</p></article><article><h3>Show working software</h3><p>You see progress in the actual product on a fixed cadence, not just status reports.</p></article><article><h3>Test what people rely on</h3><p>Code review and automated tests are backed by checks with real users and system owners. Migrations and recovery steps are rehearsed where live operations are at risk.</p></article><article><h3>Handle change openly</h3><p>When priorities shift, you see the impact on scope, cost, and timeline before anything extra is started.</p></article></div></section>
    <section class="section wrap split-section border-top"><div><h2>Handover is part of the build.</h2></div><div class="prose"><h3>Decisions have an owner</h3><p>We name who approves scope, provides access, checks data, and signs off the result. Vendor dependencies and delayed decisions go on the shared plan, not into a last-minute surprise.</p><h3>Ownership is settled up front</h3><p>The agreement covers code, designs, repositories, and cloud accounts. It identifies existing components and third-party licences so you know what is yours and what comes with separate terms.</p><h3>Your team can run what we deliver</h3><p>You receive documentation, training, and deployment and recovery runbooks. We make the operating responsibilities clear before launch. If we stay on to support the system, the agreement names the systems, coverage hours, response targets, and escalation contacts.</p></div></section>
    <section class="section wrap faq-section"><h2>Before we begin.</h2>${faq([
      ['Can you work under a confidentiality agreement?', 'Yes. We can sign an NDA before you share sensitive project information.'],
      ['How do you estimate the work?', 'We estimate against the scope, dependencies, and assumptions, and show where uncertainty remains. If too much is unknown, a short paid assessment is a better starting point than a precise-looking number based on guesses.'],
      ['How does remote collaboration work?', 'We set overlapping hours, review dates, and communication channels at the start. Decisions live in a shared record, so progress does not depend on being in every call.'],
      ['Do you still offer a free workflow session?', 'Yes. We spend 60–90 minutes on one integration or automation process and follow up with a short written summary of the friction points and practical options.'],
    ])}</section>${cta()}`);
}

function aboutPage() {
  return layout('/about/', 'About Cognitron', 'Meet the software, cloud, integration, AI, and data specialists at COGNITRON, and the experience behind our focus on software people can use and maintain.',
    `${pageHero('About Cognitron', 'Specialists who stay connected.', 'Product, cloud, integration, data, and AI people working as one team — so architecture decisions don’t get made in isolation from the people who have to run the system.')}
    <section class="section wrap"><div class="section-heading"><h2>The skills behind the work.</h2><p>We bring in the disciplines the job needs, not a separate team for every layer of the system.</p></div>${contentGrid([
      ['Product & software engineering', 'Designers, engineers, and QA specialists turn customer and staff needs into usable software, then check the journeys and business rules against real scenarios.'],
      ['Cloud, DevOps & identity', 'Cloud and platform specialists set up hosting, deployment, access, and recovery across AWS, Microsoft Azure, and Google Cloud, including connections to on-premises systems.'],
      ['Integration & automation', 'Integration engineers connect records and workflows across business tools, with duplicate checks, review queues, and recovery paths for the cases that need attention.'],
      ['AI, data & analytics', 'AI engineers and data specialists help teams find information, process documents, and use reports, with tested answers and definitions that can be explained.'],
    ])}</section>
    <section class="feature-section"><div class="section wrap split-section"><div><h2>One project, not a relay race.</h2></div><div class="prose"><p>A portal needs product design, sign-in, integrations, and somewhere reliable to run. We bring those people into the same conversations, rather than leaving you to reconcile separate plans.</p><p>The proposal names your delivery lead, the specialist roles, and their responsibilities. Shared architecture reviews keep the application and infrastructure decisions together.</p><p>We can take on a project or work alongside your internal team on a specific workstream. The arrangement fits the work and the skills you already have.</p></div></div></section>
    <section class="section wrap founder-profile"><div class="founder-name">${label('Founder')}<h2>Dickson<br>Mwendia<span>.</span></h2><p>Technology that people can actually operate.</p></div><div class="prose"><p class="large-copy">More than five years at Microsoft across technical content, developer enablement, and AI knowledge work.</p><p>Most recently led documentation strategy and AI transformation for Microsoft Entra Agent ID. Earlier work on identity-platform guidance supported over 4,000 internal engineers.</p><p>That experience made one thing obvious: a system isn’t finished when the code ships. People need to understand it, own it, and keep it running. That’s the standard we bring to every engagement.</p></div></section>
    <section class="section wrap"><div class="section-heading"><h2>What you can expect from us.</h2></div><div class="work-grid"><article><h3>No custom build for its own sake</h3><p>If a tool you already own can solve the problem through configuration or an integration, we recommend that. More code is not automatically a better result.</p></article><article><h3>Knowledge stays with you</h3><p>Documentation, runbooks, and training are part of the work. Your team should not need to call us just to understand how a release or recovery works.</p></article><article><h3>A person to ask</h3><p>Your delivery lead coordinates decisions and progress. At launch, it is clear who supports the system, what is covered, and where to raise an issue.</p></article><article><h3>Trade-offs in plain language</h3><p>We explain what a technical choice means for your budget, users, and maintenance. You should be able to make the decision without decoding a diagram or a list of acronyms.</p></article></div></section>${cta()}`);
}

function contactPage() {
  return layout('/contact/', 'Contact', 'Tell COGNITRON where the work gets stuck or what you want to build. Start a conversation about software, cloud, integrations, AI, or reporting.',
    `${pageHero('Contact', 'What’s broken or holding you back?', 'Tell us the context — systems, users, constraints — and we’ll tell you the sensible next step. No pitch deck required.', null)}
    <section class="wrap contact-layout"><aside><h2>What happens next.</h2><p>Our team reads your outline and brings the relevant specialists into the conversation. We’ll ask about priorities, budget, and constraints, then suggest a next step. If the work is not a fit, we’ll say so.</p><p>The first conversation is free. Prefer email? Write to us directly.</p><a class="contact-address" href="mailto:dickson@cognitron.tech">dickson@cognitron.tech ${arrow}</a></aside>
    <form id="enquiry-form"><h2>A few details to get started.</h2><p id="form-help">Fields marked * are required. Please leave out passwords, customer records, and other sensitive information.</p>
    <div class="form-row"><label>Your name *<input name="name" autocomplete="name" required maxlength="100"></label><label>Work email *<input name="email" type="email" autocomplete="email" required maxlength="254"></label></div>
    <label>Organisation <span class="optional">optional</span><input name="organisation" autocomplete="organization" maxlength="160"></label>
    <div class="form-row"><label>What kind of help? <span class="optional">optional</span><select name="interest" id="interest"><option value="">Not sure yet</option>${services.map((service) => `<option value="${service.slug}">${e(service.name)}</option>`).join('')}<option value="several">Several services</option></select></label>
    <label>Industry or context <span class="optional">optional</span><select name="industry" id="industry"><option value="">Select if relevant</option>${industries.map((industry) => `<option value="${industry.slug}">${e(industry.name)}</option>`).join('')}<option value="professional-services">Professional & Business Services</option><option value="hospitality">Hospitality & Travel</option><option value="field-services">Field Services</option><option value="membership">Member Organisations</option><option value="other">Other</option></select></label></div>
    <label>What needs to change? *<textarea name="challenge" rows="6" required minlength="10" maxlength="3000" aria-describedby="form-help" placeholder="What happens today, what you want to change, and any budget or deadline we should know about…"></textarea></label>
    <div class="form-trap" aria-hidden="true"><label>Leave this field empty<input name="website" tabindex="-1" autocomplete="off"></label></div>
    <p class="form-privacy">We use these details only to respond to your enquiry. ${link('/privacy/', 'Privacy & data')}</p>
    <button id="send-enquiry" class="button" type="submit" disabled>Send enquiry ${arrow}</button>
    <noscript><p>This form needs JavaScript to send an enquiry. You can email <a href="mailto:dickson@cognitron.tech">dickson@cognitron.tech</a> directly instead.</p></noscript>
    <p id="form-status" role="status" aria-live="polite"></p>
    </form></section>`);
}

function privacyPage() {
  return layout('/privacy/', 'Privacy & data', 'How COGNITRON handles website visits, cookie-free analytics, and enquiries submitted through Resend. No advertising trackers.',
    `${pageHero('Privacy & data · Updated 9 November 2026', 'How we handle your information.', 'This notice covers the Cognitron website and initial enquiries. For questions about your information, email dickson@cognitron.tech.', null)}
    <div class="wrap legal-content prose"><h2>What happens in the enquiry form</h2><p>Send enquiry submits your name, email, optional organisation and selections, and project outline to our delivery endpoint. The message is passed to Resend to send to our enquiry mailbox. A confirmation means the email service accepted the message, not that it has been read or guaranteed delivered. Form contents are not saved in browser storage.</p><p>Please do not include passwords, customer records, financial records, health information, or other sensitive project data.</p>
    <h2>When you send an email</h2><p>We receive what you include, such as your name, email address, organisation, and project outline. We use this information to respond, discuss a possible engagement, and maintain relevant business correspondence. The email providers involved process the message under their own terms.</p>
    <h2>Website services</h2><p>We use Vercel Web Analytics to understand which pages are visited. It does not use cookies or browser storage. It records the page viewed, the referring site, and general browser, operating system, device type, and country information. Visitors are counted using a hash of the request that resets daily and is not used to identify individuals across days. We do not use advertising trackers.</p><p>Typography uses fonts served from this website; no external font service is requested. The hosting provider may process standard request information, such as IP addresses and browser details, to serve and protect the website. The enquiry endpoint uses short-lived, hashed network identifiers in memory to limit repeated attempts. It does not keep a separate database of enquiry messages.</p><p>Resend processes submitted messages under its <a href="https://resend.com/legal/privacy-policy">privacy policy</a>. Website hosting and email processing may involve other jurisdictions; appropriate project-data arrangements are agreed separately before sensitive operational information is shared.</p>
    <h2>Booking</h2><p>There is no embedded booking calendar on this version of the website. Arrange a conversation by email. This notice will be updated before a booking service is introduced.</p>
    <h2>Retention and your choices</h2><p>We retain relevant enquiry correspondence as needed to handle the conversation, maintain business records, and meet applicable obligations. You can ask about access, correction, or deletion by emailing <a href="mailto:dickson@cognitron.tech">dickson@cognitron.tech</a>. We will consider the request under applicable law and explain any information we need to retain.</p>
    <h2>Before sharing project data</h2><p>Initial contact is not a secure project-data transfer process. We agree appropriate access, handling, responsibilities, and any cross-border arrangements before receiving operational data for an engagement.</p>${link('/contact/', 'Contact Cognitron')}</div>`);
}

function informationPage() {
  return layout('/services/information.html', 'Information, AI & reporting', 'Find the right service for reporting, business intelligence, knowledge search and AI-assisted workflows.',
    `${pageHero('Information & AI', 'Reports you can trust, or answers you can check.', 'If you need consistent business numbers, start with data and reporting. If staff need help finding information or processing documents, explore AI. These services now have separate pages so you can get straight to the relevant work.', null)}<section class="section wrap two-columns">${['data-business-intelligence', 'ai-solutions'].map((slug) => { const service = serviceBySlug(slug); return `<article><h2>${e(service.name)}</h2><p>${e(service.summary)}</p>${link(servicePath(service), 'Explore this service')}</article>`; }).join('')}</section>${cta()}`);
}

export function createPages() {
  return new Map([
    ['/', home()], ['/services/', servicesPage()], ...services.map((service) => [servicePath(service), servicePage(service)]),
    ['/industries/', industriesPage()], ['/approach/', approachPage()], ['/about/', aboutPage()], ['/contact/', contactPage()], ['/privacy/', privacyPage()],
    ...industries.map((industry) => [industryPath(industry), industryPage(industry)]),
    ['/services/information.html', informationPage()],
  ]);
}

export const redirects = new Map([
  ['/index.html', '/'], ['/privacy.html', '/privacy/'],
  ['/services/operations.html', '/services/integration-automation/'],
  ['/services/customer-experience.html', '/services/software-development/'],
  ['/services/dependability.html', '/services/modernisation-support/'],
  ...['services', 'industries', 'approach', 'about', 'contact', 'privacy'].map((slug) => [`/${slug}`, `/${slug}/`]),
  ...services.map((service) => [servicePath(service).slice(0, -1), servicePath(service)]),
  ...industries.map((industry) => [industryPath(industry).slice(0, -1), industryPath(industry)]),
]);

export function notFound() {
  return layout('', 'Page not found', 'This page is not available. Explore Cognitron services or contact us.',
    `${pageHero('404 / Page not found', 'We can’t find that page.', 'The link may be out of date. Browse our services or get in touch and we’ll help you find the right place.', '/services/', 'Explore our services')}`);
}
