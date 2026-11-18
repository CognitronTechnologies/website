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
    faqs: [
      ['Do we need a finished specification?', 'No. Discovery turns an outline into an agreed scope and separates what still needs testing from what is ready to build.'],
      ['Can you work on an existing product?', 'Yes. We start by reviewing architecture, code, deployment, and immediate risks so changes don’t break what already works.'],
      ['Do we need a mobile app?', 'Only if users need offline capability, device features, or frequent daily use. A well-built responsive web app is often the lower-cost, lower-maintenance answer.'],
    ],
    closing: { title: 'Let’s talk', text: 'Tell us what you have, what needs to change, and any constraints we should know about.' },
    related: ['cloud-infrastructure', 'integration-automation', 'modernisation-support', 'cybersecurity'],
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
    faqs: [
      ['Do we have to use multiple clouds?', 'No. One well-run cloud is often enough. We recommend hybrid or multi-cloud only when a real requirement justifies the extra cost and operating complexity.'],
      ['Can you improve what we already have?', 'Yes. We can focus on a specific issue such as access, cost, deployment, or recovery. You do not need to commit to a migration to get useful improvements.'],
      ['Do you provide ongoing cloud operations?', 'Yes. We cover monitoring, patching, planned changes, and cost reviews under an operating agreement. It names the environments, coverage hours, response targets, and escalation contacts.'],
    ],
    closing: { title: 'Let’s talk', text: 'Tell us what you have and what needs to change.' },
    related: ['software-development', 'data-business-intelligence', 'modernisation-support', 'cybersecurity', 'technology-strategy-consulting'],
  },
  {
    slug: 'integration-automation', name: 'Systems Integration & Automation', short: 'Integration & automation',
    headline: 'Connect your systems. Cut the manual handoffs.',
    summary: 'Business-system integration, APIs, workflow automation, and transaction monitoring across enterprise applications.',
    lead: 'Connect applications, data, and business processes through supported interfaces and monitored workflows. We define record ownership, transaction rules, and recovery procedures so integrations can be operated as well as delivered.',
    problems: [
      ['The same information is entered in several applications.', 'Entered once in the system that owns it and passed on automatically.'],
      ['Approvals live in email with no reliable status.', 'Routed to the right person with a status everyone involved can see.'],
      ['An integration exists but failures are discovered by customers or finance.', 'Failures caught, retried, or queued for a named person before they reach a customer.'],
    ],
    outputs: ['Workflow map and system responsibilities', 'Working integrations and documented data mappings', 'Exception queues and operational alerts', 'Runbooks and team training'],
    start: { name: 'Workflow session', phrase: 'a free workflow session', text: '60–90 minutes on one real process. You receive a short written summary of the current flow, where time and errors are lost, and two or three practical options with likely effort.', outputs: ['Map of the current process and systems', 'Where time and errors are lost', 'Two or three practical options', 'Likely effort for each option'] },
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
    summary: 'AI applications, knowledge retrieval, document processing, agent workflows, and production evaluation.',
    lead: 'Design, evaluate, and integrate AI into business applications and operating processes. We work from representative tasks and data, compare model performance, and establish the access controls, review steps, and monitoring needed for production.',
    problems: [
      ['Staff waste time hunting for information across documents and systems.', 'Answers drawn from approved sources, with a link to the exact passage.'],
      ['High volumes of documents need sorting, extraction, or review.', 'Classification and field extraction with uncertain cases sent to a human.'],
      ['You have a promising prototype but no evaluation or production path.', 'Measured quality on your own examples and a realistic plan to run it in production.'],
    ],
    outputs: ['Use-case definition and acceptance criteria', 'Evaluation set and results', 'Production integration with access controls', 'Review guidance, monitoring, and cost reporting'],
    start: { name: 'AI use-case sprint', phrase: 'an AI use-case sprint', text: 'One defined task, tested on your representative data. You receive the working prototype, evaluation results, and a production plan with controls.', outputs: ['Use-case definition and success criteria', 'Working prototype on representative data', 'Evaluation results for quality, latency, and cost', 'Production plan with data and review controls'] },
    faqs: [
      ['Do we need to train our own model?', 'Not necessarily. We compare existing models, retrieval, and configuration against the task before considering fine-tuning or custom training. Training needs suitable data, measurable improvement over a baseline, and a plan for evaluation and ongoing operation.'],
    ],
    closing: { title: 'Let’s talk', text: 'Tell us what you have, what needs to change, and any constraints we should know about.' },
    related: ['integration-automation', 'data-business-intelligence', 'cloud-infrastructure'],
  },
  {
    slug: 'data-business-intelligence', name: 'Data & Business Intelligence', short: 'Data & business intelligence',
    headline: 'Get a clear, trustworthy view of your business data',
    summary: 'Data architecture, engineering, governance, and business intelligence with reconciled metrics and operational ownership.',
    lead: 'Build the data foundations behind reporting and analysis. We connect source systems, engineer processing pipelines, define shared metrics, and deliver governed datasets and dashboards with visible lineage, refresh status, and ownership.',
    problems: [
      ['Preparing a regular report means copying data from several systems every time.', 'Reports that refresh on schedule and show when they were last updated.'],
      ['Different teams report different numbers for the same measure.', 'One documented definition for each measure, agreed by the teams who use it.'],
      ['A dashboard exists but no one is sure how fresh or complete it is.', 'Pipelines that flag missing or late data instead of showing an incomplete total.'],
    ],
    outputs: ['Source inventory and data-quality findings', 'Documented data model and maintained pipelines', 'Agreed metrics, reports, and dashboards', 'Access, refresh schedule, and ownership'],
    start: { name: 'Data & reporting assessment', phrase: 'a data and reporting assessment', text: 'Review the sources, analytical requirements, quality issues, access model, and current platform costs. We assess a defined reporting domain or data-platform initiative and recommend the architecture and delivery sequence.', outputs: ['Source inventory and quality findings', 'Draft metric definitions and ownership', 'Recommended architecture and reporting model', 'Delivery priorities, costs, and operational requirements'] },
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
    summary: 'Application assessment, legacy modernisation, migration, reliability engineering, and ongoing support.',
    lead: 'Extend the useful life of existing applications or replace them in controlled stages. We assess architecture and dependencies, preserve critical business behaviour, and plan upgrades, migration, testing, and support around live operations.',
    problems: [
      ['Releases are risky because important behaviour is undocumented or untested.', 'Regression tests around the behaviour that matters, so changes can ship with confidence.'],
      ['The application depends on ageing components and manual deployments.', 'Supported dependencies and an automated, repeatable release process.'],
      ['Maintenance, monitoring, and the next improvements have no clear owner.', 'A support agreement that names who maintains, monitors, and improves the application.'],
    ],
    outputs: ['Prioritised modernisation roadmap', 'Delivered improvements with regression evidence', 'Deployment and recovery runbooks', 'Support agreement with coverage and response targets'],
    start: { name: 'Application assessment', phrase: 'an application assessment', text: 'Architecture and dependency map, risks ranked by business impact, options to refactor/replace/retain, and a recommended support model.', outputs: ['Architecture and dependency map', 'Risks ranked by business impact', 'Options to refactor, replace, or retain', 'Recommended support model'] },
    faqs: [
      ['Can you take over an application built elsewhere?', 'Yes. First we review the code, access, licences, and operating history. The assessment shows what we can support now and what needs attention before we take it on.'],
      ['Can one agreement cover the application and its cloud environment?', 'Yes. We can cover both, with the systems and responsibilities listed together. Coverage hours, response targets, and escalation contacts are set out before support begins.'],
    ],
    closing: { title: 'Let’s talk', text: 'Tell us what you have, what needs to change, and any constraints we should know about.' },
    related: ['cloud-infrastructure', 'software-development', 'integration-automation', 'cybersecurity', 'technology-strategy-consulting'],
  },
  {
    slug: 'cybersecurity', name: 'Cybersecurity', short: 'Cybersecurity',
    headline: 'Assess risk. Secure your systems. Prepare to respond.',
    summary: 'Security assessments, Zero Trust architecture, penetration testing, cloud and application security, and managed detection and response.',
    lead: 'Cybersecurity assessments, testing, implementation, and managed services for your applications, cloud environments, networks, and data. We work with your team and specialist delivery partners to identify weaknesses, address them, and maintain security as your business changes.',
    problems: [
      ['You need to understand which security weaknesses put your business at risk.', 'Evidence-backed findings ranked by business impact, with a plan for remediation.'],
      ['Users and devices have broad access once they connect to the network.', 'Zero Trust access controls based on identity, device security, and the permissions each task requires.'],
      ['Security alerts arrive, but investigation, escalation, and recovery responsibilities are unclear.', 'Documented response procedures, named contacts, and monitoring coverage agreed with your team.'],
    ],
    outputs: ['Assessment findings and supporting evidence', 'Prioritised remediation plan with assigned responsibilities', 'Implemented controls and validation results for the agreed scope', 'Operating procedures, escalation contacts, and handover documentation'],
    start: { name: 'Security assessment', phrase: 'a security assessment', text: 'Review a particular application, cloud environment, network, or a broader set of organisational controls. We agree the scope, access, and assessment methods before work begins.', outputs: ['Assessment of the systems and controls in scope', 'Findings supported by evidence and risk ratings', 'Prioritised remediation plan', 'Findings review with technical and business stakeholders'] },
    faqs: [
      ['Can you work with our internal IT team or existing providers?', 'Yes. We agree responsibilities with your team and existing providers before work begins, including access, change approval, remediation, and escalation.'],
      ['How is penetration testing carried out?', 'Testing starts with written authorisation and agreed rules of engagement. These define the systems, techniques, testing windows, exclusions, and contacts. Findings are documented, reviewed with your team, and retested where included in the engagement.'],
      ['Do you provide ongoing monitoring and response?', 'Yes, through our delivery partners. The service agreement defines the systems covered, monitoring hours, response responsibilities, escalation contacts, and service targets. Round-the-clock coverage is available where contracted.'],
    ],
    closing: { title: 'Let’s talk', text: 'Tell us which systems you need assessed, any known concerns, and the requirements or deadlines you are working towards.' },
    related: ['cloud-infrastructure', 'software-development', 'modernisation-support', 'technology-strategy-consulting'],
  },
  {
    slug: 'technology-strategy-consulting', name: 'Technology Strategy & Consulting', short: 'Technology strategy & consulting',
    headline: 'Decide where technology investment should go next',
    summary: 'Technology assessments, investment roadmaps, architecture reviews, platform selection, and transformation planning.',
    lead: 'Make technology decisions with a clear view of business priorities, costs, and operational constraints. We assess your current systems, compare the options, and develop a roadmap your team can fund, deliver, and maintain.',
    problems: [
      ['Technology spending keeps increasing, but the priorities and expected returns are unclear.', 'An investment plan that weighs business value, total cost, risk, and dependencies.'],
      ['You need to replace or connect systems, but competing proposals are difficult to compare.', 'Documented requirements and an options assessment covering architecture, vendors, migration, and ongoing operation.'],
      ['A transformation programme has a direction but no agreed delivery or ownership model.', 'A phased roadmap with accountable owners, resource requirements, decision points, and measures of progress.'],
    ],
    outputs: ['Current-state assessment and business capability map', 'Options appraisal and investment recommendations', 'Target architecture and prioritised technology roadmap', 'Delivery governance, ownership, and performance measures'],
    start: { name: 'Technology strategy review', phrase: 'a technology strategy review', text: 'Start with a business priority, a planned investment, or an existing technology estate. We review the relevant systems and costs, speak with business and technical stakeholders, and establish the decisions that need to be made.', outputs: ['Current-state findings and constraints', 'Comparison of viable options and trade-offs', 'Recommended priorities with indicative costs and dependencies', 'Stakeholder review and agreed next decisions'] },
    faqs: [
      ['Do we need a complete technology strategy before we engage?', 'No. We can focus on a single decision, such as selecting a platform, reviewing an architecture, or planning a replacement. A broader strategy engagement covers the capabilities, investments, and operating changes needed across the business.'],
      ['Can you work with our leadership team and existing suppliers?', 'Yes. We gather input from the people funding, using, and operating the systems. We review supplier proposals against agreed requirements and make responsibilities and dependencies explicit in the plan.'],
      ['Do you also support implementation?', 'Yes. We can oversee delivery, work alongside your team and suppliers, or deliver agreed work through our engineering services. Advisory and implementation scopes are agreed separately, and the recommendations remain yours to use with another provider.'],
    ],
    closing: { title: 'Let’s talk', text: 'Tell us which technology decisions you are facing, what the business needs to achieve, and any budget or timing constraints.' },
    related: ['cloud-infrastructure', 'software-development', 'cybersecurity', 'modernisation-support'],
  },
];

export const industries = [
  { slug: 'finance-fintech', name: 'Finance & Fintech', intro: 'Technology delivery for banks, lenders, payment providers, and fintech businesses: digital channels, payment integration, lending workflows, and financial data. We connect customer services to core systems with transaction controls, security, and recovery planned from the outset.', applications: ['Digital channels, lending & customer onboarding', 'Payments, settlement & financial reporting', 'Financial-crime workflows, security & platform strategy'], services: ['software-development', 'integration-automation', 'cloud-infrastructure', 'data-business-intelligence', 'cybersecurity', 'technology-strategy-consulting'] },
  { slug: 'insurance', name: 'Insurance', intro: 'Digital distribution, policy and claims operations, underwriting workflows, and analytics for insurers, brokers, and InsurTech businesses. We integrate customer and intermediary channels with core platforms while preserving product rules, authority limits, and decision history.', applications: ['Distribution, policy administration & underwriting', 'Claims operations, document processing & fraud review', 'Insurance analytics, core modernisation & security'], services: ['software-development', 'integration-automation', 'ai-solutions', 'data-business-intelligence', 'cybersecurity', 'modernisation-support'] },
  { slug: 'procurement-supply-chain', name: 'Procurement & Supply Chain', type: 'Cross-industry solutions', intro: 'Connect supplier qualification, sourcing, purchasing, inventory, and payment across procurement and finance systems. We implement workflows and integrations that preserve approval authority, contract terms, and the records needed to reconcile goods and invoices.', applications: ['Supplier qualification, sourcing & contracts', 'Requisition-to-pay & warehouse integration', 'Spend analytics & procurement platform planning'], services: ['integration-automation', 'software-development', 'data-business-intelligence', 'technology-strategy-consulting'] },
  { slug: 'compliance-risk', name: 'Compliance & Risk', type: 'Cross-industry solutions', intro: 'Technology for risk registers, due diligence, policy management, access reviews, and audit evidence. We implement the workflows, integrations, and reporting that support your control framework, working with the legal, risk, and audit owners responsible for requirements and assurance.', applications: ['Risk, third-party due diligence & policy workflows', 'Identity governance & control evidence', 'GRC integration, remediation & reporting'], services: ['software-development', 'integration-automation', 'cybersecurity', 'data-business-intelligence', 'technology-strategy-consulting'] },
  { slug: 'healthcare', name: 'Healthcare', intro: 'Digital health platforms, health-record integrations, data analytics, and cybersecurity for healthcare providers and health-tech businesses. We connect patient services and operational systems, protect health information, and plan technology investments around the delivery of care.', applications: ['Digital health, patient portals & virtual care', 'EHR integration, interoperability & revenue-cycle workflows', 'Health analytics, cybersecurity & technology strategy'], services: ['software-development', 'integration-automation', 'cloud-infrastructure', 'data-business-intelligence', 'ai-solutions', 'cybersecurity', 'technology-strategy-consulting'] },
  { slug: 'education', name: 'Education', intro: 'Learning platforms, assessment systems, institutional integrations, and analytics for schools, universities, training providers, and EdTech businesses. We connect the learning experience with student records, access, and administration while accounting for accessibility, safeguarding, and limited connectivity.', applications: ['LMS delivery, assessment & educator tools', 'Student records, fees & institutional portals', 'Learning analytics, AI assistance & platform security'], services: ['software-development', 'integration-automation', 'data-business-intelligence', 'ai-solutions', 'cybersecurity', 'cloud-infrastructure'] },
  { slug: 'retail-ecommerce', name: 'Retail & E-Commerce', intro: 'Commerce platforms, omnichannel integrations, and operational analytics for retailers and distributors. We connect product, order, stock, payment, and fulfilment records so customer commitments reflect what stores, warehouses, and carriers can deliver.', applications: ['Digital commerce & omnichannel customer experience', 'Inventory, fulfilment, payments & returns', 'Merchandising analytics & commerce resilience'], services: ['software-development', 'integration-automation', 'cloud-infrastructure', 'data-business-intelligence', 'cybersecurity', 'technology-strategy-consulting'] },
  { slug: 'logistics-transport', name: 'Logistics & Transport', intro: 'Transport, warehouse, fleet, and customer-system integration for carriers, distributors, and logistics operators. We build dispatch and mobile workflows, connect operational evidence to billing, and make shipment and capacity data usable across the transport lifecycle.', applications: ['Transport planning, driver mobility & delivery evidence', 'TMS, WMS, telematics & carrier integration', 'Freight billing, customer visibility & operational analytics'], services: ['software-development', 'integration-automation', 'data-business-intelligence', 'cloud-infrastructure', 'technology-strategy-consulting'] },
  { slug: 'agriculture', name: 'Agriculture', intro: 'Digital systems for cooperatives, produce buyers, agricultural service providers, and field networks. We connect producer records, collection, grading, traceability, inputs, and payments, with workflows designed for seasonal demand, shared devices, and uneven connectivity.', applications: ['Producer services, collection & quality grading', 'Traceability, inputs & buyer-payment integration', 'Offline field tools, seasonal analytics & advisory platforms'], services: ['software-development', 'integration-automation', 'data-business-intelligence', 'ai-solutions', 'technology-strategy-consulting'] },
  { slug: 'public-sector-non-profit', name: 'Public Sector & Non-Profit', intro: 'Digital public services and programme systems for agencies, nonprofits, and delivery partners. We support citizen applications, beneficiary casework, grant administration, and monitoring and evaluation, with accessible channels and traceable use of information and funds.', applications: ['Citizen services & beneficiary case management', 'Grants, field operations & partner integration', 'Monitoring, evaluation & information governance'], services: ['software-development', 'integration-automation', 'cloud-infrastructure', 'data-business-intelligence', 'cybersecurity', 'technology-strategy-consulting'] },
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
