export const services = [
  {
    slug: 'software-development', name: 'Digital Products & Custom Software', short: 'Software development',
    headline: 'Software built for the job it actually has to do',
    summary: 'Web and mobile applications, customer portals, and internal tools built around real users and the systems behind them.',
    lead: 'A new product or a better way to deliver an existing service. We help you decide what to build, design how it should work, and turn it into software your team can own and run.',
    problems: [
      ['You have a product idea but need to test the real scope before committing a large budget.', 'A working prototype and a realistic first-release plan.'],
      ['Customers abandon booking, application, or account journeys because the flow is confusing or status is invisible.', 'Journeys people can finish themselves, with status they can check without calling support.'],
      ['Your team is stuck with spreadsheets and workarounds because nothing off-the-shelf fits how the work actually happens.', 'An internal tool built around real processes, data, and permissions.'],
    ],
    outputs: ['User journeys, interface designs, and working software', 'Test and acceptance records', 'Source repository and deployment pipeline', 'Architecture notes and handover documentation'],
    start: { name: 'Product discovery', phrase: 'product discovery', text: 'We work with your product owner and a sample of real users to define the first useful release before development begins.', outputs: ['User journeys and a clickable prototype', 'Prioritised scope for the first release', 'Architecture outline and integration list', 'Estimate and delivery plan'] },
    exampleTitle: 'A customer portal, not another inbox',
    example: 'A service business lets customers request work, upload the required documents, and track progress. Staff work from the same shared record instead of reconstructing every request from email threads.',
    steps: ['Request', 'Review', 'Deliver', 'Update'],
    measures: 'Journey completion rate, support ticket volume, and time to process a request.',
    faqs: [
      ['Do we need a finished specification?', 'No. Discovery turns an outline into an agreed scope and separates what still needs testing from what is ready to build.'],
      ['Can you work on an existing product?', 'Yes. We start by reviewing architecture, code, deployment, and immediate risks so changes don’t break what already works.'],
      ['Do we need a mobile app?', 'Only if users need offline capability, device features, or frequent daily use. A well-built responsive web app is often the lower-cost, lower-maintenance answer.'],
    ],
    closing: { title: 'Let’s talk', text: 'Tell us what you have, what needs to change, and any constraints we should know about.' },
    related: ['cloud-infrastructure', 'integration-automation', 'modernisation-support'],
  },
  {
    slug: 'cloud-infrastructure', name: 'Cloud & Infrastructure', short: 'Cloud & infrastructure',
    headline: 'Cloud infrastructure your team can actually run with confidence',
    summary: 'Architecture, migration, identity, and operations on AWS, Azure, and Google Cloud that your team can actually run.',
    lead: 'Move a workload, fix an existing environment, or put a solid foundation under a new product. We connect the architecture to the practical questions: who has access, how it deploys, what it costs, and how it recovers.',
    problems: [
      ['You’re planning a migration and need a realistic path from the current environment.', 'Migration waves with dependencies, cutover steps, and rollback agreed before anything moves.'],
      ['Cloud costs, permissions, or deployments are getting harder to explain and control.', 'Infrastructure as code, permissions you can review, and spend broken down by workload and owner.'],
      ['A critical application needs better monitoring, recovery, or clear operating ownership.', 'Alerts with named owners, tested backups, and a recovery procedure your team has rehearsed.'],
    ],
    outputs: ['Target architecture and dependency map', 'Version-controlled infrastructure and deployment pipelines', 'Access model, monitoring, and recovery procedures', 'Runbooks, cost reporting, and an agreed operating model'],
    start: { name: 'Cloud assessment', phrase: 'a cloud assessment', text: 'Workload inventory, findings on access/cost/reliability, target architecture recommendation, and prioritised roadmap or migration waves.', outputs: ['Workload inventory', 'Findings on access, cost, and reliability', 'Target architecture recommendation', 'Prioritised roadmap or migration waves'] },
    exampleTitle: 'A migration that includes the morning after',
    example: 'The application moves with access, deployment, monitoring, backup, a tested rollback path, and named owners already agreed.',
    steps: ['Assess', 'Prepare', 'Validate', 'Operate'],
    measures: 'Cutover acceptance, deployment lead time, recovery test results, and cost against the agreed baseline.',
    faqs: [
      ['Do we have to use multiple clouds?', 'No. One well-run cloud is often enough. We recommend hybrid or multi-cloud only when a real requirement justifies the extra cost and operating complexity.'],
      ['Can you improve what we already have?', 'Yes. We can focus on a specific issue such as access, cost, deployment, or recovery. You do not need to commit to a migration to get useful improvements.'],
      ['Do you provide ongoing cloud operations?', 'Yes. We cover monitoring, patching, planned changes, and cost reviews under an operating agreement. It names the environments, coverage hours, response targets, and escalation contacts.'],
    ],
    closing: { title: 'Let’s talk', text: 'Tell us what you have and what needs to change.' },
    related: ['software-development', 'data-business-intelligence', 'modernisation-support'],
  },
  {
    slug: 'integration-automation', name: 'Systems Integration & Automation', short: 'Integration & automation',
    headline: 'Connect your systems. Cut the manual handoffs.',
    summary: 'Connect the tools you already use so data stops living in inboxes and spreadsheets.',
    lead: 'When an order, invoice, or request moves between systems, someone is usually filling the gap by hand. We connect those steps and make exceptions visible so the process no longer depends on retyping or chasing updates.',
    problems: [
      ['The same information is entered in several applications.', 'Entered once in the system that owns it and passed on automatically.'],
      ['Approvals live in email with no reliable status.', 'Routed to the right person with a status everyone involved can see.'],
      ['An integration exists but failures are discovered by customers or finance.', 'Failures caught, retried, or queued for a named person before they reach a customer.'],
    ],
    outputs: ['Workflow map and system responsibilities', 'Working integrations and documented data mappings', 'Exception queues and operational alerts', 'Runbooks and team training'],
    start: { name: 'Workflow session', phrase: 'a free workflow session', text: '60–90 minutes on one real process. You receive a short written summary of the current flow, where time and errors are lost, and two or three practical options with likely effort.', outputs: ['Map of the current process and systems', 'Where time and errors are lost', 'Two or three practical options', 'Likely effort for each option'] },
    exampleTitle: 'From approved job to invoice without retyping',
    example: 'A completed job creates a draft invoice and returns status to the service team. A missing reference goes to a review queue instead of creating a silent failure or duplicate.',
    steps: ['Complete', 'Validate', 'Create draft', 'Reconcile'],
    measures: 'Duplicate entry, processing time, reconciliation effort, and unresolved exceptions.',
    faqs: [
      ['What if a system does not have an API?', 'We check vendor connectors, supported exports, and scheduled file transfers. Each has limits on speed, completeness, and maintenance; we explain those before you choose a route.'],
      ['Will you always build custom code?', 'No. Your existing tools may already have the right connector or workflow feature. We use configuration where it works and custom code where the business rules need it.'],
    ],
    closing: { title: 'Let’s talk', text: 'Tell us what you have, what needs to change, and any constraints we should know about.' },
    related: ['software-development', 'ai-solutions', 'data-business-intelligence'],
  },
  {
    slug: 'ai-solutions', name: 'AI Solutions & Enablement', short: 'AI solutions & enablement',
    headline: 'Put AI to work on a specific problem',
    summary: 'Practical AI that fits into existing workflows, with clear human review points.',
    lead: 'Start with the task, the source material, and a clear way to judge the answer. We take you from an idea to an evaluated workflow with explicit rules on what the system can access and what a person must check.',
    problems: [
      ['Staff waste time hunting for information across documents and systems.', 'Answers drawn from approved sources, with a link to the exact passage.'],
      ['High volumes of documents need sorting, extraction, or review.', 'Classification and field extraction with uncertain cases sent to a human.'],
      ['You have a promising prototype but no evaluation or production path.', 'Measured quality on your own examples and a realistic plan to run it in production.'],
    ],
    outputs: ['Use-case definition and acceptance criteria', 'Evaluation set and results', 'Production integration with access controls', 'Review guidance, monitoring, and cost reporting'],
    start: { name: 'AI use-case sprint', phrase: 'an AI use-case sprint', text: 'One defined task, tested on your representative data. You receive the working prototype, evaluation results, and a production plan with controls.', outputs: ['Use-case definition and success criteria', 'Working prototype on representative data', 'Evaluation results for quality, latency, and cost', 'Production plan with data and review controls'] },
    exampleTitle: 'Find the policy. Show the source.',
    example: 'An internal assistant answers from approved procedures and always shows the supporting passage. When evidence is missing it says so instead of guessing.',
    steps: ['Ask', 'Retrieve', 'Reference', 'Review'],
    measures: 'Retrieval relevance, answer quality on your tasks, correction rates, and cost per useful task.',
    faqs: [
      ['Do we need to train our own model?', 'We almost never recommend training your own model. Most useful work is retrieval, evaluation, and human review design — not science projects.'],
    ],
    closing: { title: 'Let’s talk', text: 'Tell us what you have, what needs to change, and any constraints we should know about.' },
    related: ['integration-automation', 'data-business-intelligence', 'cloud-infrastructure'],
  },
  {
    slug: 'data-business-intelligence', name: 'Data & Business Intelligence', short: 'Data & business intelligence',
    headline: 'Get a clear, trustworthy view of your business data',
    summary: 'Reports and dashboards your team will actually trust and maintain.',
    lead: 'A useful report needs more than a chart. We bring the sources together, agree the definitions behind the numbers, and keep the information current and explainable.',
    problems: [
      ['Preparing a regular report means copying data from several systems every time.', 'Reports that refresh on schedule and show when they were last updated.'],
      ['Different teams report different numbers for the same measure.', 'One documented definition for each measure, agreed by the teams who use it.'],
      ['A dashboard exists but no one is sure how fresh or complete it is.', 'Pipelines that flag missing or late data instead of showing an incomplete total.'],
    ],
    outputs: ['Source inventory and data-quality findings', 'Documented data model and maintained pipelines', 'Agreed metrics, reports, and dashboards', 'Access, refresh schedule, and ownership'],
    start: { name: 'Reporting review', phrase: 'a reporting review', text: 'Source inventory, quality findings, draft metric definitions, recommended model, and a plan for the first reliable reports.', outputs: ['Source inventory and quality findings', 'Draft metric definitions', 'Recommended reporting model', 'Plan for the first reliable reports'] },
    exampleTitle: 'One agreed definition of an outstanding invoice',
    example: 'Invoice and payment records feed a reporting view with a documented reconciliation rule. The view shows when it last refreshed and surfaces unmatched items instead of hiding them.',
    steps: ['Collect', 'Reconcile', 'Define', 'Report'],
    measures: 'Preparation time, data freshness, completeness, and reconciliation differences.',
    faqs: [
      ['Do we need a new data platform?', 'Not always. Better source connections and a maintained reporting model may be enough. We recommend a new platform only when data volume, access, refresh needs, or upkeep justify it.'],
      ['Is AI part of every data project?', 'No. Consistent definitions and dependable data feeds solve most reporting problems. We consider AI only when there is a separate task it can usefully support.'],
    ],
    closing: { title: 'Let’s talk', text: 'Tell us what you have, what needs to change, and any constraints we should know about.' },
    related: ['cloud-infrastructure', 'integration-automation', 'ai-solutions'],
  },
  {
    slug: 'modernisation-support', name: 'Application Modernisation & Support', short: 'Modernisation & support',
    headline: 'Improve the software your business already depends on',
    summary: 'Improve what you have and put a clear owner in place after release.',
    lead: 'Replacing everything is rarely the right first move. We assess the current application, prioritise the changes that actually matter, and make them without breaking the behaviour people rely on.',
    problems: [
      ['Releases are risky because important behaviour is undocumented or untested.', 'Regression tests around the behaviour that matters, so changes can ship with confidence.'],
      ['The application depends on ageing components and manual deployments.', 'Supported dependencies and an automated, repeatable release process.'],
      ['Maintenance, monitoring, and the next improvements have no clear owner.', 'A support agreement that names who maintains, monitors, and improves the application.'],
    ],
    outputs: ['Prioritised modernisation roadmap', 'Delivered improvements with regression evidence', 'Deployment and recovery runbooks', 'Support agreement with coverage and response targets'],
    start: { name: 'Application assessment', phrase: 'an application assessment', text: 'Architecture and dependency map, risks ranked by business impact, options to refactor/replace/retain, and a recommended support model.', outputs: ['Architecture and dependency map', 'Risks ranked by business impact', 'Options to refactor, replace, or retain', 'Recommended support model'] },
    exampleTitle: 'Replace one difficult part, not the whole system',
    example: 'An ageing booking application keeps serving customers while its notification process is separated, tested, and replaced in phases. Safer and easier to roll back than a big-bang rewrite.',
    steps: ['Assess', 'Isolate', 'Test', 'Release'],
    measures: 'Release stability, defect trends, performance, maintenance effort, and response times.',
    faqs: [
      ['Can you take over an application built elsewhere?', 'Yes. First we review the code, access, licences, and operating history. The assessment shows what we can support now and what needs attention before we take it on.'],
      ['Can one agreement cover the application and its cloud environment?', 'Yes. We can cover both, with the systems and responsibilities listed together. Coverage hours, response targets, and escalation contacts are set out before support begins.'],
    ],
    closing: { title: 'Let’s talk', text: 'Tell us what you have, what needs to change, and any constraints we should know about.' },
    related: ['cloud-infrastructure', 'software-development', 'integration-automation'],
  },
];

export const industries = [
  { slug: 'finance-fintech', name: 'Finance & Fintech', intro: 'Make customer journeys and internal operations easier to follow without losing the audit trail, approvals, or reconciliation discipline your business depends on.', applications: ['Onboarding & account services', 'Payment & reconciliation workflows', 'Shared operations and case management'], services: ['software-development', 'integration-automation', 'cloud-infrastructure', 'data-business-intelligence'] },
  { slug: 'insurance', name: 'Insurance', intro: 'Give policyholders, brokers, and operations teams one clear view of the work instead of forcing them to piece it together from multiple systems and email threads.', applications: ['Policyholder & broker portals', 'Claims coordination and document intelligence', 'Operations reporting on workload and bottlenecks'], services: ['software-development', 'integration-automation', 'ai-solutions', 'data-business-intelligence'] },
  { slug: 'procurement-supply-chain', name: 'Procurement & Supply Chain', type: 'Cross-industry solutions', intro: 'Give the process a clear route from request to receipt — with approvals, exceptions, and reconciliation that do not live in email.', applications: ['Supplier onboarding & portals', 'Requisitions and approval workflows', 'Receipt, inventory, and spend reporting'], services: ['integration-automation', 'software-development', 'data-business-intelligence'] },
  { slug: 'compliance-risk', name: 'Compliance & Risk', type: 'Cross-industry solutions', intro: 'Stop reconstructing decisions from folders and email threads when an auditor or regulator asks what happened.', applications: ['Due-diligence workflows', 'Policy management and attestations', 'Access reviews and audit reporting'], services: ['software-development', 'integration-automation', 'cloud-infrastructure', 'data-business-intelligence'] },
  { slug: 'healthcare', name: 'Healthcare', intro: 'Improve the administrative layer patients and staff actually use — booking, documents, status, and handovers — while keeping clear boundaries between administration and clinical decisions.', applications: ['Appointment & patient service journeys', 'Patient portals and secure document exchange', 'Administrative integrations and operational reporting'], services: ['software-development', 'integration-automation', 'cloud-infrastructure', 'data-business-intelligence'] },
  { slug: 'education', name: 'Education', intro: 'Make it straightforward for learners, educators, and administrators to complete everyday tasks without fighting the tools.', applications: ['Learning platforms and structured course delivery', 'Assessment and feedback tools', 'Educator tools and learner portals'], services: ['software-development', 'integration-automation', 'data-business-intelligence', 'ai-solutions'] },
  { slug: 'retail-ecommerce', name: 'Retail & E-Commerce', intro: 'Customers see one purchase. Behind it are stock, payments, fulfilment, returns, and service. We keep those connected so the experience does not break after checkout.', applications: ['Commerce and account journeys', 'Order and stock integration', 'Payments, returns, and service coordination'], services: ['software-development', 'integration-automation', 'cloud-infrastructure', 'data-business-intelligence'] },
  { slug: 'logistics-transport', name: 'Logistics & Transport', intro: 'Help planners, drivers, and customers work from timely, consistent information about the same job — including when connectivity is poor.', applications: ['Dispatch and work allocation', 'Driver and mobile workflows', 'Customer visibility and fleet-system integration'], services: ['software-development', 'integration-automation', 'data-business-intelligence'] },
  { slug: 'agriculture', name: 'Agriculture', intro: 'Design for seasonal work, shared devices, cooperatives, and uneven connectivity — not for permanent broadband and a dedicated desktop.', applications: ['Farmer and cooperative records', 'Produce and batch traceability', 'Field data collection and payment connections'], services: ['software-development', 'integration-automation', 'data-business-intelligence'] },
  { slug: 'public-sector-non-profit', name: 'Public Sector & Non-Profit', intro: 'Make programmes easier for citizens or beneficiaries to use and easier for the teams running them to administer and report on.', applications: ['Citizen and beneficiary portals', 'Case and programme workflows', 'Monitoring and evaluation reporting'], services: ['software-development', 'integration-automation', 'cloud-infrastructure', 'data-business-intelligence'] },
];

export const engagements = [
  ['Assess & Plan', 'When you need a clear starting point before committing budget.', 'Test a product idea, review a cloud environment, map a workflow, or check whether AI fits a task. You leave with findings, options, and a costed next step, not a commitment to a larger project.'],
  ['Design & Deliver', 'When there’s a defined project that needs to ship.', 'We design and build the agreed scope, with working reviews along the way. Testing, migration, and handover are part of the delivery plan, not jobs left for someone else at the end.'],
  ['Embedded Expertise', 'When your team needs extra firepower on a specific workstream.', 'Bring in specialists for a role or workstream inside your team. We set the availability and responsibilities up front and work with your delivery tools and decision-making process.'],
  ['Operate & Improve', 'When the system needs a reliable ongoing owner.', 'Keep applications and cloud environments maintained while making planned improvements. The support agreement sets coverage, response targets, escalation, third-party costs, and how new work gets approved.'],
];

export const servicePath = (service) => `/services/${service.slug}/`;
export const contactPath = (slug, industry) => {
  const query = new URLSearchParams();
  if (slug) query.set('interest', slug);
  if (industry) query.set('industry', industry);
  return `/contact/${query.size ? `?${query}` : ''}`;
};
