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

function header(path) {
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header"><div class="header-inner">
    <a class="wordmark" href="/" aria-label="COGNITRON home">${mark}<span>cognitron<span class="brand-dot">.</span></span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="navigation" hidden>Menu <span aria-hidden="true">+</span></button>
    <nav id="navigation" aria-label="Main navigation">
      ${[['/services/', 'Services'], ['/industries/', 'Industries'], ['/approach/', 'Our approach'], ['/about/', 'About']].map(([href, text]) => `<a href="${href}"${path === href ? ' aria-current="page"' : path.startsWith(href) ? ' aria-current="true"' : ''}>${text}</a>`).join('')}
      <a class="nav-contact" href="/contact/"${path === '/contact/' ? ' aria-current="page"' : ''}>Discuss your project ${arrow}</a>
    </nav>
  </div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="wrap">
    <div class="footer-top"><a class="wordmark" href="/" aria-label="COGNITRON home">${mark}<span>cognitron.</span></a><p>Complex technology.<br>Clearer work.</p><a class="footer-email" href="mailto:dickson@cognitron.tech">dickson@cognitron.tech ${arrow}</a></div>
    <div class="footer-columns"><div><h2>Services</h2>${services.map((service) => `<a href="${servicePath(service)}">${e(service.short)}</a>`).join('')}</div>
    <div><h2>Explore</h2><a href="/industries/">Industries</a><a href="/approach/">Our approach</a><a href="/about/">About Cognitron</a><a href="/contact/">Contact</a></div>
    <div class="footer-note"><h2>A good place to start</h2><p>A product outline. An awkward process. A system that needs attention. You do not need a finished brief.</p>${link('/contact/', 'Let’s talk')}</div></div>
    <div class="footer-bottom"><p>© ${new Date().getFullYear()} COGNITRON</p><p>Software, cloud & AI services.</p><a href="/privacy/">Privacy & data</a></div>
  </div></footer>`;
}

function layout(path, title, description, body) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#111110"><title>${e(title)} — COGNITRON</title><meta name="description" content="${e(description)}">
<meta property="og:title" content="${e(title)} — COGNITRON"><meta property="og:description" content="${e(description)}"><meta property="og:type" content="website">
<script>document.documentElement.classList.add('js')</script><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="preload" href="/fonts/geist.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/styles.css"><script src="/app.js" defer onerror="document.documentElement.classList.remove('js')"></script></head>
<body>${header(path)}<main id="main">${body}</main>${footer()}</body></html>`;
}

function pageHero(eyebrow, title, lead, action = '/contact/', actionText = 'Discuss your project', crumb = '') {
  return `<section class="page-hero"><div class="wrap">${crumb}${label(eyebrow)}<h1>${e(title)}</h1><div class="page-hero-bottom"><p class="lead">${e(lead)}</p>${action ? button(action, actionText) : ''}</div></div></section>`;
}

function cta(title = 'What are you working on?', text = 'Tell us what needs to change. We’ll talk through the context and suggest a sensible next step.', href = '/contact/') {
  return `<section class="closing"><div class="wrap closing-inner"><div><h2>${e(title)}</h2><p>${e(text)}</p></div>${button(href, 'Let’s talk')}</div></section>`;
}

function serviceList() {
  return `<div class="service-list">${services.map((service, index) => `<a class="service-entry" href="${servicePath(service)}"><span class="entry-number">0${index + 1}</span><div><h3>${e(service.name)}</h3><p>${e(service.summary)}</p></div><span class="entry-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>`;
}

function architecture() {
  return `<figure class="architecture"><figcaption>Example architecture <span>Customer service portal</span></figcaption><div class="arch-users">Customers <span aria-hidden="true">↓</span> Service team</div>
    <div class="arch-app"><span class="diagram-kicker">Application</span><strong>One shared service record</strong><span>Requests · Documents · Updates</span></div>
    <div class="arch-connect" aria-hidden="true"><span></span><span></span><span></span></div>
    <div class="arch-tools"><div>Business systems<small>Integration & reconciliation</small></div><div>Data & reporting<small>Agreed metrics & access</small></div></div>
    <div class="arch-foundation"><span>Cloud foundation</span><p>Identity · Deployment · Monitoring · Recovery</p></div></figure>`;
}

function home() {
  const body = `<section class="home-hero"><div class="wrap">${label('Software, cloud & AI services')}
    <div class="hero-heading"><h1>Better software.<br><span>Stronger systems.</span></h1></div>
    <div class="hero-bottom"><p>We build digital products, improve cloud infrastructure, and connect the systems your business depends on, from the first decision to what happens after launch.</p><div class="hero-actions">${button()}${link('/services/', 'Explore our services')}</div></div>
    <div class="hero-footline"><span>From product to platform</span><ul aria-label="Cloud platforms"><li>AWS</li><li>Microsoft Azure</li><li>Google Cloud</li></ul></div>
  </div></section>
  <section id="outcomes" class="section wrap"><div class="section-heading"><h2>Six services, one delivery team.</h2><p>One project needs a new application. Another needs better connections between the tools you already use. Start with the problem; we bring the right specialists.</p></div>${serviceList()}</section>
  <section id="fieldnotes" class="feature-section"><div class="wrap feature-layout"><div><h2>A better product needs more than a good interface.</h2><p>A customer portal depends on the systems behind it: identity, integrations, reliable infrastructure, and information people can trust.</p><p>We design those pieces together, so the application and the environment it runs in are never two separate projects.</p>${link('/approach/', 'See how we work')}</div>${architecture()}</div></section>
  <section class="section wrap"><div class="section-heading"><h2>Industries we work in.</h2><p>Each sector has its own users, systems, and rules. See what we build for yours.</p></div><div class="industry-index">${industries.map((industry) => `<a href="${industryPath(industry)}">${e(industry.name)} ${arrow}</a>`).join('')}</div></section>
  <section id="approach" class="approach-section section"><div class="wrap"><div class="section-heading"><h2>Four ways to work with us.</h2></div><div class="engagement-grid">${engagements.map(([name, summary]) => `<article><h3>${e(name)}</h3><p>${e(summary)}</p></article>`).join('')}</div>${link('/approach/', 'How each one works')}</div></section>
  <section id="about" class="section wrap people-section"><div><h2>Specialists who see the whole system.</h2></div><div><p class="large-copy">Software engineers, cloud architects, designers, and AI and data specialists working as one team.</p><p>Each engagement brings together the disciplines it needs, from product decisions to infrastructure and the people who will run it. You always know who is responsible and who to ask.</p>${link('/about/', 'Meet Cognitron')}</div></section>
  <div id="contact">${cta()}</div>`;
  return layout('/', 'Software, cloud & AI services', 'COGNITRON builds digital products, improves cloud infrastructure across AWS, Azure and Google Cloud, and connects business systems.', body);
}

function servicesPage() {
  return layout('/services/', 'Services', 'Software development, cloud infrastructure, integration, AI, data and application modernisation. Find the right starting point with COGNITRON.',
    `${pageHero('Our services', 'What do you need to build or improve?', 'A new product, a cloud environment, or a process that no longer works well. Choose the closest starting point; we bring the related work into one plan.')}
    <section class="wrap section service-overview">${serviceList()}</section>
    <section class="feature-section"><div class="wrap section"><div class="section-heading"><h2>How the services combine.</h2><p>Most projects need more than one discipline. Two common combinations:</p></div><div class="two-columns"><article><h3>Launching a product</h3><p>Design the user journey and first release, then plan the application, cloud foundation, identity, and connections to existing systems together. Handover is agreed before launch, not after.</p>${serviceLinks(['software-development', 'cloud-infrastructure'])}</article><article><h3>Improving an existing system</h3><p>Assess the application and its environment, then fix the part that hurts most first: a fragile integration, an unreliable deployment, or a reporting gap.</p>${serviceLinks(['modernisation-support', 'integration-automation'])}</article></div></div></section>
    <section class="wrap section faq-section"><h2>Common questions.</h2>${faq([
      ['Can several services form one project?', 'Yes. You get one delivery plan, one delivery lead, and explicit responsibilities for the application, infrastructure, integrations, and handover.'],
      ['Can you work alongside our existing team?', 'Yes. We can take a defined role or workstream inside your delivery organisation, or own an agreed scope end to end.'],
      ['Will we own the work?', 'The agreement sets out ownership of source code, designs, repositories, and cloud accounts, along with any pre-existing components and third-party licences.'],
      ['What happens after launch?', 'You receive documentation, runbooks, and training. If you want us to keep running or improving the system, a support agreement sets the coverage and response times.'],
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
    ${cloud ? `<section class="platform-section"><div class="wrap"><div class="platforms"><span>Amazon Web Services<small>AWS</small></span><span>Microsoft Azure<small>Azure</small></span><span>Google Cloud<small>GCP</small></span></div><p>We recommend a platform based on your existing estate, skills, data-residency needs, and cost, and work in single-cloud, hybrid, and multi-cloud environments.</p></div></section>` : ''}
    <section id="problems" class="section wrap"><div class="section-heading"><h2>Problems we solve.</h2></div><div class="problem-list" role="list">${service.problems.map(([problem, result]) => `<div role="listitem"><p class="problem">${e(problem)}</p><span aria-hidden="true">→</span><p class="result">${e(result)}</p></div>`).join('')}</div></section>
    <section id="deliver" class="feature-section"><div class="wrap section"><div class="section-heading"><h2>What we deliver.</h2><p>${e(detail.overview)}</p></div><div class="deliver-layout">${detailRows(detail.solutions)}<aside class="deliver-outputs"><h3>You receive</h3><ul>${service.outputs.map((text) => `<li>${e(text)}</li>`).join('')}</ul></aside></div></div></section>
    <section class="example-section"><div class="wrap example-layout"><div>${label('Example scenario')}<h2>${e(service.exampleTitle)}</h2><p>${e(service.example)}</p></div><div class="example-steps"><ol>${service.steps.map((step, index) => `<li><span>0${index + 1}</span>${e(step)}</li>`).join('')}</ol><p><span>What we measure</span>${e(service.measures)}</p></div></div></section>
    <section id="start" class="section wrap start-section"><div><h2>Start with ${e(service.start.phrase)}.</h2><p class="large-copy">${e(service.start.text)}</p>${button(contactPath(service.slug), `Ask about ${service.start.phrase}`)}</div><div><h3>What you receive</h3><ul class="deliverable-list">${service.start.outputs.map((text) => `<li><span aria-hidden="true">↳</span>${e(text)}</li>`).join('')}</ul><p class="start-note">Yours to keep, whether or not we deliver the next phase.</p></div></section>
    <section id="technology" class="feature-section"><div class="wrap section"><div class="section-heading"><h2>Technology we work with.</h2><p>The final stack follows your workload, existing systems, and the team that will maintain it.</p></div>${contentGrid(detail.technologies, 'tech-grid')}</div></section>
    <section id="questions" class="section wrap faq-section"><h2>Frequently asked questions.</h2>${faq([...service.faqs, ...detail.faqs])}</section>
    <section class="related-section wrap"><h2>Related services</h2><div>${serviceLinks(service.related)}</div></section>
    ${cta('Talk to our team about the work.', 'Tell us what you have, what needs to change, and any constraints we should know about.', contactPath(service.slug))}`);
}

function industriesPage() {
  return layout('/industries/', 'Industries & applications', 'Explore software, cloud, integration, AI and data applications for finance, insurance, healthcare, education, retail, agriculture and more.',
    `${pageHero('Industries & applications', 'Technology shaped around your industry.', 'A claims workflow is not a retail order. Each industry has its own users, systems, and rules. Choose yours to see what we build and how we approach it.')}
    <section class="wrap section industry-grid">${industries.map((industry) => `<article id="${industry.slug}">${industry.type ? `<span class="industry-type">${e(industry.type)}</span>` : ''}<h2><a href="${industryPath(industry)}">${e(industry.name)}</a></h2><p>${e(industry.intro)}</p><ul>${industry.applications.map((text) => `<li>${e(text)}</li>`).join('')}</ul>${link(industryPath(industry), `Explore ${industry.name}`)}</article>`).join('')}</section>
    <section class="wrap other-contexts"><h2>We also work with</h2><p>Professional services firms, hospitality and travel operators, field-service businesses, and member organisations, on client portals, bookings, dispatch, renewals, and the integrations behind them.</p></section>
    ${cta('Don’t see your industry?', 'Describe the work and the systems behind it. We’ll tell you honestly whether we are the right fit.')}`);
}

function industryPage(industry) {
  const detail = industryDetails[industry.slug];
  return layout(industryPath(industry), `${industry.name} software & technology`, `${industry.intro} Explore specialist software, cloud, integration and data services from Cognitron.`,
    `${pageHero(industry.name, detail.headline, industry.intro, contactPath('', industry.slug), 'Talk to our team', `<nav class="breadcrumb" aria-label="Breadcrumb"><a href="/industries/">Industries</a><span aria-hidden="true">/</span><span aria-current="page">${e(industry.name)}</span></nav>`)}
    ${pageIndex([['challenges', 'Challenges'], ['solutions', 'What we build'], ['systems', 'Systems'], ['considerations', 'Considerations'], ['questions', 'FAQs']])}
    <section id="challenges" class="section wrap split-section"><div><h2>Common challenges.</h2><p class="context-note"><strong>Who we work with:</strong> ${e(detail.audiences)}</p></div><div><p class="large-copy">${e(detail.overview)}</p><ul class="situation-list challenge-list">${detail.challenges.map((text) => `<li>${e(text)}</li>`).join('')}</ul></div></section>
    <section id="solutions" class="feature-section"><div class="wrap section"><div class="section-heading"><h2>What we build.</h2></div>${detailRows(detail.solutions)}</div></section>
    <section id="systems" class="wrap section"><div class="section-heading"><h2>Systems and integrations.</h2></div>${contentGrid(detail.integrations, 'outcome-grid')}</section>
    <section id="considerations" class="wrap section border-top"><div class="section-heading"><h2>Design considerations.</h2></div>${contentGrid(detail.quality, 'outcome-grid')}</section>
    <section class="example-section"><div class="wrap example-layout"><div>${label('Example scenario')}<h2>${e(detail.scenario.title)}</h2><p>${e(detail.scenario.text)}</p></div><div class="example-steps"><ol>${detail.scenario.steps.map((step, index) => `<li><span>0${index + 1}</span>${e(step)}</li>`).join('')}</ol><p><span>What we measure</span>${e(detail.scenario.measures)}</p></div></div></section>
    <section id="questions" class="wrap section faq-section"><h2>Frequently asked questions.</h2>${faq(detail.faqs)}</section>
    <section class="related-section wrap"><h2>Services for this work</h2><div>${serviceLinks(industry.services)}${link('/approach/', 'How we work')}</div></section>
    ${cta('Bring the context. We’ll bring the specialists.', 'Talk through the users, systems, and responsibilities involved in your project.', contactPath('', industry.slug))}`);
}

function approachPage() {
  return layout('/approach/', 'Our approach', 'How COGNITRON scopes, delivers and hands over software and cloud projects, with clear responsibilities and defined ongoing support.',
    `${pageHero('Our approach', 'Know what is being built, and what happens next.', 'Good delivery depends on clear decisions as much as good engineering. We agree the work, keep progress visible, and plan for the people who will run the result.')}
    <section class="section wrap split-section"><div><h2>You don’t need a finished brief.</h2></div><div class="prose"><p>Bring an outline of the problem, the systems involved, and any deadlines. In the first conversation, we work out what is already known and what still needs investigating.</p><p>The first conversation is free. If an assessment or proof of concept would help, we agree its scope and cost before any work starts.</p><p>Keep credentials, customer records, and sensitive data out of the first message. We set up a secure way to share them once an engagement begins.</p></div></section>
    <section class="feature-section"><div class="section wrap"><div class="section-heading"><h2>Four ways to engage.</h2><p>Use one, or move between them as the work develops.</p></div><div class="engagement-rows">${engagements.map(([name, summary, detail]) => `<article><div><h3>${e(name)}</h3><p>${e(summary)}</p></div><p>${e(detail)}</p></article>`).join('')}</div></div></section>
    <section class="section wrap"><div class="section-heading"><h2>How we run delivery.</h2></div><div class="work-grid"><article><h3>Agree what matters</h3><p>Priorities, deliverables, acceptance criteria, dependencies, and budget are set at the start. Assumptions and decisions that affect scope are written down.</p></article><article><h3>Show working software</h3><p>Progress is demonstrated in the product itself at a regular cadence agreed at kickoff, backed by a shared board you can check at any time.</p></article><article><h3>Test what people rely on</h3><p>Code review, automated and manual testing, migration checks, and sign-off by the people responsible for the system.</p></article><article><h3>Handle change openly</h3><p>When priorities or assumptions change, you see the effect on scope, cost, and timing before any extra work is committed.</p></article></div></section>
    <section class="section wrap split-section border-top"><div><h2>Ownership and handover.</h2></div><div class="prose"><h3>What we agree with your team</h3><p>Named owners for access, decisions, feedback, data approvals, and third-party dependencies, so risks and delays are visible to both sides.</p><h3>What the agreement covers</h3><p>Ownership of source code, designs, repositories, and cloud accounts, plus how pre-existing components and third-party licences are treated.</p><h3>What you receive at handover</h3><p>Documentation, training, deployment and recovery runbooks, and a clear list of operating responsibilities. If we continue supporting the system, the agreement lists the covered systems, hours, response targets, and escalation route.</p></div></section>
    <section class="section wrap faq-section"><h2>Before we begin.</h2>${faq([
      ['Can you work under a confidentiality agreement?', 'Yes. We can sign an NDA before you share sensitive project information.'],
      ['How do you estimate the work?', 'From the agreed scope and assumptions. Where those are still uncertain, a short paid assessment gives a firmer basis for the estimate.'],
      ['How does remote collaboration work?', 'We agree overlapping working hours, communication channels, review points, and where decisions are recorded at the start of the engagement.'],
      ['Do you still offer a free workflow session?', 'Yes. For integration and automation work, a free 60–90 minute session examines one process and ends with a short written summary of practical options.'],
    ])}</section>${cta()}`);
}

function aboutPage() {
  return layout('/about/', 'About Cognitron', 'Meet Cognitron: a team of software, cloud, design, AI and data specialists working together on digital products and enterprise systems.',
    `${pageHero('About Cognitron', 'Different disciplines. One delivery team.', 'We are engineers, architects, designers, and technology specialists. We work together to build digital products and improve enterprise systems, from the user experience to the infrastructure behind it.')}
    <section class="section wrap"><div class="section-heading"><h2>Our disciplines.</h2><p>Each service has its specialists. Working as one team keeps product decisions, architecture, implementation, and operations connected.</p></div>${contentGrid([
      ['Product & software engineering', 'Designers, application engineers, and QA specialists shape user journeys, build the product, and verify the behaviour people rely on.'],
      ['Cloud, DevOps & identity', 'Cloud architects and platform specialists work across AWS, Microsoft Azure, and Google Cloud, including infrastructure automation, identity, and operations.'],
      ['Integration & automation', 'Engineers connect business systems, map data, and design workflows with practical exception handling and clear ownership.'],
      ['AI, data & analytics', 'AI engineers, data practitioners, and BI specialists connect approved sources, evaluate useful applications, and make information easier to use.'],
    ])}</section>
    <section class="feature-section"><div class="section wrap split-section"><div><h2>How the team works.</h2></div><div class="prose"><p>We assemble the disciplines each engagement needs, whether it is a product build, a cloud programme, or a focused integration. Your proposal names the roles, the delivery lead, and their responsibilities.</p><p>Application and infrastructure decisions are made together, in shared architecture reviews, so ownership never falls between teams.</p><p>We can work alongside your internal team or take responsibility for an agreed scope. Either way, you have one route for decisions, progress, and support.</p></div></div></section>
    <section class="section wrap founder-profile"><div class="founder-name">${label('Founder')}<h2>Dickson<br>Mwendia<span>.</span></h2><p>Technology, explained.<br>Systems, made useful.</p></div><div class="prose"><p class="large-copy">I spent more than five years at Microsoft across technical content, developer enablement, and AI-focused knowledge work.</p><p>Most recently, as a Senior Knowledge Engineer, I led documentation strategy and AI transformation for Microsoft Entra Agent ID. Earlier, identity-platform onboarding guidance and sample applications I helped create supported more than 4,000 internal Microsoft engineers.</p><p>That work taught me that a system is not ready just because it has been built. People need to understand how it works, where its limits are, and how to use it well. Cognitron brings that standard to every engagement.</p></div></section>
    <section class="section wrap"><div class="section-heading"><h2>What you can expect from us.</h2></div><div class="work-grid"><article><h3>The simplest thing that works</h3><p>If configuration, an existing product, or an integration solves the problem, we recommend it over another custom application.</p></article><article><h3>Knowledge you keep</h3><p>Documentation, runbooks, and training are part of every engagement, so your team can run and change the system without us.</p></article><article><h3>Named responsibility</h3><p>You always know what is included, who approves the work, and who looks after the system after release.</p></article><article><h3>Plain explanations</h3><p>Technical trade-offs explained in terms of cost, risk, and effect on your users, so decisions are made by the people accountable for them.</p></article></div></section>${cta()}`);
}

function contactPage() {
  return layout('/contact/', 'Contact', 'Discuss your software, cloud, integration or AI project with COGNITRON. Send an enquiry when online delivery is enabled, or prepare an email draft.',
    `${pageHero('Contact', 'Tell us what you are planning.', 'An outline is enough. Tell us what needs to change, what you already use, and any timing constraints.', null)}
    <section class="wrap contact-layout"><aside><h2>A conversation, not a sales funnel.</h2><p>Our team reviews your outline and brings the right specialists to the first conversation. We’ll discuss the context, whether we are a good fit, and a sensible next step. Paid work starts only once we have both agreed it.</p><a class="contact-address" href="mailto:dickson@cognitron.tech">dickson@cognitron.tech ${arrow}</a><div class="contact-disclosure"><h3>How this form works</h3><p id="delivery-disclosure">You can prepare an email on your device. Nothing is sent until you send it from your email app.</p></div></aside>
    <form id="enquiry-form"><h2>A little about the project.</h2><p id="form-help">Required fields are marked *. Please leave out credentials, customer records, and sensitive information.</p>
    <div class="form-row"><label>Your name *<input name="name" autocomplete="name" required maxlength="100"></label><label>Work email *<input name="email" type="email" autocomplete="email" required maxlength="254"></label></div>
    <label>Organisation <span class="optional">optional</span><input name="organisation" autocomplete="organization" maxlength="160"></label>
    <div class="form-row"><label>Service interest <span class="optional">optional</span><select name="interest" id="interest"><option value="">Not sure yet</option>${services.map((service) => `<option value="${service.slug}">${e(service.name)}</option>`).join('')}<option value="several">Several services</option></select></label>
    <label>Industry or context <span class="optional">optional</span><select name="industry" id="industry"><option value="">Select if relevant</option>${industries.map((industry) => `<option value="${industry.slug}">${e(industry.name)}</option>`).join('')}<option value="professional-services">Professional & Business Services</option><option value="hospitality">Hospitality & Travel</option><option value="field-services">Field Services</option><option value="membership">Member Organisations</option><option value="other">Other</option></select></label></div>
    <label>What needs to change? *<textarea name="challenge" rows="6" required minlength="10" maxlength="3000" aria-describedby="form-help" placeholder="The situation today, what you would like to improve, and any constraints…"></textarea></label>
    <div class="form-trap" aria-hidden="true"><label>Leave this field empty<input name="website" tabindex="-1" autocomplete="off"></label></div>
    <p class="form-privacy">We use these details only to respond to your enquiry. ${link('/privacy/', 'Privacy & data')}</p>
    <div class="draft-actions"><button id="send-enquiry" class="button" type="submit" value="send" hidden>Send enquiry ${arrow}</button><button id="enquiry-submit" class="secondary-button" type="submit" value="draft" hidden>Prepare an email draft</button></div>
    <noscript><p>This form needs JavaScript to prepare a draft. You can email <a href="mailto:dickson@cognitron.tech">dickson@cognitron.tech</a> directly instead. No message has been sent.</p></noscript>
    <p id="form-status" role="status" aria-live="polite"></p>
    <div id="email-fallback" class="email-fallback" hidden><h3>Your draft is ready. It has not been sent.</h3><p>Open your email app, or copy the message and send it to dickson@cognitron.tech. Your form stays here if you need to make changes.</p><label>Prepared message<textarea id="email-preview" rows="10" readonly></textarea></label><div class="draft-actions"><a id="open-email" class="button" href="mailto:dickson@cognitron.tech">Open email app ${arrow}</a><button type="button" id="copy-message" class="secondary-button">Copy message</button></div><p id="copy-status" role="status"></p></div></form></section>`);
}

function privacyPage() {
  return layout('/privacy/', 'Privacy & data', 'How COGNITRON handles website visits, email drafts, and enquiries submitted through Resend. No analytics or advertising cookies.',
    `${pageHero('Privacy & data · Updated 4 November 2026', 'A clear starting point.', 'This notice covers the Cognitron website and initial enquiries. For questions about your information, email dickson@cognitron.tech.', null)}
    <div class="wrap legal-content prose"><h2>What happens in the enquiry form</h2><p>The email-draft option prepares a message locally in your browser. It does not submit your fields, save them in browser storage, or automatically open your email app. You choose whether to copy the message or open a draft and send it through your own provider.</p><p>When online sending is configured, a separate Send enquiry button is shown. Using it submits your name, email, optional organisation and selections, and project outline to our delivery endpoint. The message is passed to Resend to send to our enquiry mailbox. A confirmation means the email service accepted the message, not that it has been read or guaranteed delivered.</p><p>Please do not include passwords, customer records, financial records, health information, or other sensitive project data.</p>
    <h2>When you send an email</h2><p>We receive what you include, such as your name, email address, organisation, and project outline. We use this information to respond, discuss a possible engagement, and maintain relevant business correspondence. The email providers involved process the message under their own terms.</p>
    <h2>Website services</h2><p>The site does not use analytics, advertising trackers, site-set cookies, or browser storage. Typography uses fonts served from this website; no external font service is requested. The hosting provider may process standard request information, such as IP addresses and browser details, to serve and protect the website. The enquiry endpoint uses short-lived, hashed network identifiers in memory to limit repeated attempts. It does not keep a separate database of enquiry messages.</p><p>Resend processes submitted messages under its <a href="https://resend.com/legal/privacy-policy">privacy policy</a>. Website hosting and email processing may involve other jurisdictions; appropriate project-data arrangements are agreed separately before sensitive operational information is shared.</p>
    <h2>Booking</h2><p>There is no embedded booking calendar on this version of the website. Arrange a conversation by email. This notice will be updated before a booking service is introduced.</p>
    <h2>Retention and your choices</h2><p>We retain relevant enquiry correspondence as needed to handle the conversation, maintain business records, and meet applicable obligations. You can ask about access, correction, or deletion by emailing <a href="mailto:dickson@cognitron.tech">dickson@cognitron.tech</a>. We will consider the request under applicable law and explain any information we need to retain.</p>
    <h2>Before sharing project data</h2><p>Initial contact is not a secure project-data transfer process. We agree appropriate access, handling, responsibilities, and any cross-border arrangements before receiving operational data for an engagement.</p>${link('/contact/', 'Contact Cognitron')}</div>`);
}

function informationPage() {
  return layout('/services/information.html', 'Information, AI & reporting', 'Find the right service for reporting, business intelligence, knowledge search and AI-assisted workflows.',
    `${pageHero('Information & AI', 'Find the right route to better answers.', 'Our information services now have two dedicated areas. Choose reporting and dependable data, or explore AI-assisted search and document workflows.', null)}<section class="section wrap two-columns">${['data-business-intelligence', 'ai-solutions'].map((slug) => { const service = serviceBySlug(slug); return `<article><h2>${e(service.name)}</h2><p>${e(service.summary)}</p>${link(servicePath(service), 'Explore this service')}</article>`; }).join('')}</section>${cta()}`);
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
    `${pageHero('404 / Page not found', 'This is not the page you were looking for.', 'The address may have changed. Explore our services or get in touch if you need a hand.', '/services/', 'Explore our services')}`);
}
