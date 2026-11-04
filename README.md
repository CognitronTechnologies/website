# COGNITRON

A responsive, team-led agency website with six detailed service pages, ten dedicated industry pages and their overview, Approach, About, Contact, and Privacy. Static HTML is generated from shared templates and content; the only server function is enquiry delivery through Resend.

Internal references: [positioning brief](agency-positioning.md) and [website plan](website-plan.md). Do not publish these documents or the workspace root.

## Local development

Requires Node.js 22.9 or newer. Preview, build, and functional tests have no runtime package dependencies. Optional Lighthouse release audits use a pinned development dependency; run `npm ci` to install it.

```sh
npm start
```

Open http://127.0.0.1:3000. Set `PORT` to use another port. The local server binds to loopback, renders the shared templates, exposes only public pages/assets, and serves the same enquiry handler as Vercel.

Use `npm run dev` for automatic server restart when source files change.

```sh
npm test
npm run build
```

The build produces 23 core pages, a legacy information landing page, assets, a 404, and crawler metadata in `dist`. Preview builds disallow indexing. Set `SITE_URL` to the final public origin to generate canonical links, the production sitemap, and an indexable robots file.

## Source structure

- [content.mjs](content.mjs): services (problems and results, deliverables, starter engagement, example, FAQs), industry summaries, engagement models, and contextual links.
- [detail-content.mjs](detail-content.mjs): service solutions, technologies, and FAQs, plus sector-specific challenges, solutions, integrations, design considerations, examples, and FAQs.
- [site.mjs](site.mjs): shared header/footer and page templates, public route manifest, legacy redirects.
- [styles.css](styles.css): responsive visual system: dark hero and footer bands, warm off-white content, a single chartreuse accent (`--volt`) used only as a fill, Geist and Geist Mono typography, pill buttons, and rounded cards. No gradients or external font requests.
- [fonts/](fonts/): self-hosted Geist variable fonts (SIL Open Font License 1.1; see [fonts/LICENSE.md](fonts/LICENSE.md)).
- [app.js](app.js): mobile navigation, enquiry prefill, validation, optional sending, and explicit draft/copy fallback.
- [api/contact.mjs](api/contact.mjs): Resend delivery with server validation, origin/token checks, body limits, idempotency, honeypot, bounded timeouts, and per-instance attempt limits.
- [server.mjs](server.mjs): local public-route preview server.
- [build.mjs](build.mjs): static export and redirect-parity check.
- [vercel.json](vercel.json): build settings, public rewrites, legacy redirects, and response headers.

HTML is generated into `dist`, not edited by hand. The templates replace the previous root HTML and four outcome-led service files. Old URLs remain supported by redirects and the dedicated legacy information page. Homepage anchors and the four old interest values are preserved.

## Enquiry delivery

The user approved Resend, also used by Docuweave. This project does not copy credentials, use Docuweave's mailbox, or add a submission database.

Copy `.env.example` to `.env.local` and supply:

```text
RESEND_API_KEY=<Cognitron Resend key>
RESEND_FROM_EMAIL=<sender on your verified domain>
CONTACT_NOTIFICATION_EMAIL=dickson@cognitron.tech
SITE_URL=<final public origin when deploying>
```

Never commit `.env.local`. Both local start and build load it if present; set the same values through Vercel's environment settings for deployment.

Without sender credentials, the contact page explicitly offers email drafts only. With credentials, it also offers **Send enquiry**. A success message appears only when Resend accepts the request and returns an ID. Acceptance is not an inbox-delivery guarantee. A retry of unchanged details reuses an idempotency key. Failure preserves the form and leaves the draft/copy option available.

The draft button never submits enquiry data, opens an email app automatically, or claims to send. The prepared message can be copied or opened by a separate action. Form contents are not saved to browser storage. No analytics, advertising cookies, booking scripts, or external fonts are loaded.

### Abuse controls and operational limits

The handler requires an allowed browser origin and a short-lived signed form token. It validates field types, lengths, selections, and email, rejects a honeypot, caps request bodies, and limits five attempts per network identifier per 15-minute function instance. IP identifiers are hashed and kept temporarily in memory, not persisted.

Instance-local limits are not a distributed production rate limiter. Configure Vercel Firewall/WAF rate limiting for `/api/contact` before public launch, and set Resend account quotas/alerts. Do not treat the signed form token or honeypot as comprehensive bot prevention.

The endpoint is limited to the configured mailbox; visitors cannot choose a recipient. Enquiry bodies are not logged. No real email is sent by automated tests; provider acceptance/rejection and timeouts are mocked.

## Vercel

1. Select `AGENCY` as the project root and the **Other** framework preset.
2. Use `npm run build` and `dist` as the output directory (configured in `vercel.json`).
3. Configure the environment values above. `SITE_URL` is the canonical production origin; Vercel preview hosts are separately accepted by the function.
4. Configure WAF limits and check sender-domain verification in Resend.
5. Deploy and verify redirects, function routing, a real enquiry received in the destination mailbox, error states, Privacy, and crawler metadata.

Do not upload only `dist` if online sending is required: Vercel also needs the root `api` function and its imported content module through the project build. A static-only host can use the generated HTML, but online sending requires routing `/api/contact` to the approved function and applying equivalent redirects.

For a preview deployment, leave `SITE_URL` unset to disallow indexing. Add it for the production release. Do not invent a domain in source.

## Verification

`npm test` covers public/private routes, redirects and query preservation, all internal links and fragments, unique metadata and IDs, service/industry coverage, explicit draft states, static export, validation, origin/session checks, size limits, provider failure, rate limiting, and retry idempotency.

Also check Home, Cloud, Industries, and Contact in a browser at 320, 390, 768, 1024, and 1440 CSS pixels; keyboard navigation, 200% zoom, reduced motion, draft/copy, sending success/failure, and no-JavaScript reading. The website plan defines release performance and accessibility targets; automated route tests alone do not prove them.

For an optional local mobile audit with Chrome installed:

```sh
npx --no-install lighthouse http://127.0.0.1:3000/ --chrome-flags="--headless=new" --only-categories=performance,accessibility,best-practices
```

Lighthouse is pinned to 13.5.0 because the initially tested 13.6.0 introduced a reported vulnerable development-only dependency chain. Preview SEO scores deliberately reflect robots blocking; production crawler configuration depends on `SITE_URL`. Do not mistake a local lab score for production field performance.

### Local verification, 4 November 2026

- All 17 functional, content, routing, migration, and build tests pass.
- Browser checks on Home, Cloud, AI, Education, Insurance, and Contact at 320, 390, 768, 1024, and 1440px found no horizontal overflow or JavaScript errors.
- Synthetic, intercepted browser submissions verified accepted/rejected states, duplicate prevention, retained input, draft generation, contextual selections, and mobile menu/Escape behaviour. No real email was sent.
- Three mobile Lighthouse runs each for Home, Cloud, Industries, and Contact returned median Performance 100 and Accessibility 100, with CLS 0. Median lab LCP ranged from approximately 1.05 to 1.21 seconds.
- The largest initial page and owned assets total approximately 53KB uncompressed; first-party JavaScript is approximately 3KB gzipped.

These are local lab and functional results, not a full WCAG certification, production field metrics, Vercel deployment verification, or proof of mailbox delivery. Repeat release checks on the actual deployed host.

## Before public launch

- Approve claims, final copy, delivery capability, and legal/business details.
- Add permissioned portraits and project evidence when available; the site currently uses honest text and labelled illustrations rather than invented clients or imagery.
- Configure and verify real enquiry sending. No live mailbox verification has been performed by the source build.
- Verify public hosting, HTTPS, canonical host, Privacy, support scope, WAF configuration, and performance/accessibility targets.
- Keep a previous deployment available for rollback.

Online booking is not enabled. The full industry overview and ten standalone pages are available. Founder biography appears only on About; the rest of the site describes the specialist team rather than an individual practice. Client case studies and staff portraits remain permission-dependent; no identities, qualifications, or results are invented.
