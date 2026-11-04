export const services = [
  {
    slug: 'software-development', name: 'Digital Products & Custom Software', short: 'Software development',
    headline: 'Software built around the job it needs to do.',
    summary: 'Web and mobile applications, customer portals, and internal tools designed around the people using them.',
    lead: 'A new product or a better way to deliver an existing service. We help you work out what to build, design how it should work, and turn it into software your team can own.',
    problems: [
      ['You have a product idea, but need to test the scope before committing to a build.', 'A tested prototype and a scoped first release before the larger budget is committed.'],
      ['Customers are working around a difficult booking, application, or account journey.', 'A journey people can finish on their own, with a status they can check without calling you.'],
      ['Your team needs an internal tool that off-the-shelf software cannot reasonably provide.', 'A tool built around how your team actually works, with the data and permissions it needs.'],
    ],
    outputs: ['User journeys, interface designs, and working software', 'Test and acceptance records', 'Source repository and deployment pipeline', 'Architecture notes and handover documentation'],
    start: { name: 'Product discovery', phrase: 'product discovery', text: 'We work with your product owner and a sample of real users to define the first release before development begins.', outputs: ['User journeys and a clickable prototype', 'Prioritised scope for the first release', 'Architecture outline and integration list', 'Estimate and delivery plan'] },
    exampleTitle: 'A customer portal, not another inbox.',
    example: 'A service business lets customers request a job, upload the required documents, and check progress. Staff work from the same record instead of reconstructing each request from email threads.',
    steps: ['Request', 'Review', 'Deliver', 'Update'],
    measures: 'Journey completion, support enquiries, and time to process a request.',
    faqs: [
      ['Do we need a finished specification?', 'No. Discovery turns an initial outline into an agreed scope and separates what needs testing from what is ready to build.'],
      ['Can you work on an existing product?', 'Yes. We start by reviewing its architecture, code, deployment, and immediate priorities so changes do not put existing users at risk.'],
      ['Do we need a mobile app?', 'Only if your users need what a native app does well: offline use, device features, or frequent daily use. A responsive web application often serves the journey at a lower cost to maintain.'],
    ],
    related: ['cloud-infrastructure', 'integration-automation', 'modernisation-support'],
  },
  {
    slug: 'cloud-infrastructure', name: 'Cloud & Infrastructure', short: 'Cloud & infrastructure',
    headline: 'Cloud infrastructure your team can run with confidence.',
    summary: 'Architecture, migration, access, and operations across AWS, Microsoft Azure, and Google Cloud.',
    lead: 'Move a workload, improve an existing environment, or establish a sound foundation for a new product. We connect the architecture to the practical questions: who has access, how it is deployed, what it costs, and how it recovers.',
    problems: [
      ['You are planning a migration and need a workable route from the current environment.', 'Migration waves with dependencies, cutover steps, and rollback agreed before anything moves.'],
      ['Cloud costs, permissions, or deployments are getting harder to explain and control.', 'Infrastructure defined in code, permissions you can review, and spend broken down by workload and owner.'],
      ['A critical application needs better monitoring, recovery, or operating responsibilities.', 'Alerts with named owners, tested backups, and a recovery procedure your team has rehearsed.'],
    ],
    outputs: ['Target architecture and dependency map', 'Version-controlled infrastructure and deployment pipelines', 'Access model, monitoring, and recovery procedures', 'Runbooks, cost reporting, and an agreed operating model'],
    start: { name: 'Cloud assessment', phrase: 'a cloud assessment', text: 'We review your current environment with your platform and application owners, then recommend where to start.', outputs: ['Workload and dependency inventory', 'Findings on access, cost, and reliability', 'Target architecture and platform recommendation', 'Prioritised roadmap or migration waves'] },
    exampleTitle: 'A migration that includes the morning after.',
    example: 'A business application moves to cloud with more than a transfer plan. Access, deployment, monitoring, backup, a tested rollback route, and the people responsible after cutover are all agreed in advance.',
    steps: ['Assess', 'Prepare', 'Validate', 'Operate'],
    measures: 'Cutover acceptance, deployment lead time, recovery test results, and cost against the agreed baseline.',
    faqs: [
      ['Do we have to use multiple clouds?', 'No. A well-run single-cloud environment is often the right answer. Hybrid and multi-cloud designs make sense when there is a specific requirement, such as an existing estate or a workload constraint.'],
      ['Can you improve what we already have?', 'Yes. An assessment can focus on permissions, reliability, deployment, or cost before any larger migration is proposed.'],
      ['Do you provide ongoing cloud operations?', 'Yes. A managed operations agreement covers monitoring, patching, planned changes, and cost reviews, with coverage hours, response targets, and escalation agreed up front.'],
    ],
    related: ['software-development', 'data-business-intelligence', 'modernisation-support'],
  },
  {
    slug: 'integration-automation', name: 'Systems Integration & Automation', short: 'Integration & automation',
    headline: 'Connect your systems. Cut the manual handoffs.',
    summary: 'Connect business applications and remove repeated manual handling between them.',
    lead: 'When an order, invoice, or request moves between systems, somebody often fills the gap by hand. We connect those steps and make exceptions visible, so the process no longer depends on copying information or chasing updates.',
    problems: [
      ['The same information is entered in several applications.', 'Each record entered once, in the system that owns it, and passed on automatically.'],
      ['Approvals happen in email, with no reliable view of status.', 'Requests routed to the right approver, with a status everyone involved can see.'],
      ['An integration exists, but failures are discovered by customers or finance staff.', 'Failures caught, retried, or queued for a named person before they reach a customer.'],
    ],
    outputs: ['Workflow map and system responsibilities', 'Working integrations and documented data mappings', 'Exception queues and operational alerts', 'Runbooks and team training'],
    start: { name: 'Workflow session', phrase: 'a free workflow session', text: 'A free 60–90 minute session on one process, with the people who run it. Within a few days, you receive a short written summary.', outputs: ['Map of the current process and systems', 'Where time and errors are lost', 'Two or three practical options, including configuration', 'Likely effort for each option'] },
    exampleTitle: 'From approved job to invoice, without retyping.',
    example: 'A completed job creates a draft invoice in the accounting system and returns its status to the service team. A missing customer reference goes to a review queue instead of producing a silent failure or a duplicate invoice.',
    steps: ['Complete', 'Validate', 'Create draft', 'Reconcile'],
    measures: 'Duplicate entry, processing time, reconciliation effort, and unresolved exceptions.',
    faqs: [
      ['What if a system does not have an API?', 'We look at supported exports, vendor connectors, and scheduled file transfers, and tell you up front what each option costs to maintain.'],
      ['Will you always build custom code?', 'No. Where your applications or an integration platform can do the job through configuration, we recommend that. Custom services are for logic configuration cannot reasonably handle.'],
    ],
    related: ['software-development', 'ai-solutions', 'data-business-intelligence'],
  },
  {
    slug: 'ai-solutions', name: 'AI Solutions & Enablement', short: 'AI solutions & enablement',
    headline: 'Put AI to work on a specific problem.',
    summary: 'Test useful AI applications, integrate them into real work, and establish how people review the results.',
    lead: 'Start with the task, the source material, and a way to judge the answer. We take you from an AI idea to an evaluated workflow, with clear rules on what it can access and what a person checks.',
    problems: [
      ['Staff spend too long finding information across documents and systems.', 'Answers drawn from approved sources, with a link to the passage behind each one.'],
      ['A high volume of documents needs sorting, extraction, or review.', 'Documents classified and key fields extracted, with uncertain results sent to a reviewer.'],
      ['You have an AI prototype, but no evaluation or production plan.', 'Measured quality on your own examples and a plan to run the prototype in production.'],
    ],
    outputs: ['Use-case definition and acceptance criteria', 'Evaluation set and results', 'Production integration with access controls', 'Review guidance, monitoring, and cost reporting'],
    start: { name: 'AI use-case sprint', phrase: 'an AI use-case sprint', text: 'We take one task and test an approach on representative examples from your organisation.', outputs: ['Use-case definition and success criteria', 'Working prototype on representative data', 'Evaluation results for quality, latency, and cost', 'Production plan with data and review controls'] },
    exampleTitle: 'Find the policy. Show the source.',
    example: 'An internal assistant helps staff search approved procedures and returns the passage behind each answer. When the evidence is missing or access is restricted, it says so instead of guessing.',
    steps: ['Ask', 'Retrieve', 'Reference', 'Review'],
    measures: 'Retrieval relevance, answer quality on your tasks, correction rates, and cost per useful task.',
    faqs: [
      ['Do we need to train our own model?', 'Rarely. Existing models with good retrieval, or conventional software, usually do the job. The task, data, and operating requirements guide the choice.'],
    ],
    related: ['integration-automation', 'data-business-intelligence', 'cloud-infrastructure'],
  },
  {
    slug: 'data-business-intelligence', name: 'Data & Business Intelligence', short: 'Data & business intelligence',
    headline: 'Get a clear view of your business data.',
    summary: 'Bring information together into reports and dashboards your team can use and maintain.',
    lead: 'A useful report needs more than a chart. We bring sources together, resolve the definitions behind the numbers, and keep the information current.',
    problems: [
      ['Preparing a regular report involves copying information from several systems.', 'Reports that refresh on schedule and show when they were last updated.'],
      ['Different teams report different numbers for the same measure.', 'One documented definition for each measure, agreed by the teams who use it.'],
      ['A dashboard exists, but nobody is sure how fresh or complete it is.', 'Pipelines that flag missing or late data instead of showing an incomplete total.'],
    ],
    outputs: ['Source inventory and data-quality findings', 'Documented data model and maintained pipelines', 'Agreed metrics, reports, and dashboards', 'Access, refresh schedule, and ownership'],
    start: { name: 'Reporting review', phrase: 'a reporting review', text: 'We review your current reports, their sources, and the decisions they are meant to support.', outputs: ['Source inventory and quality findings', 'Draft metric definitions to agree', 'Recommended reporting model and tools', 'Plan for the first reports'] },
    exampleTitle: 'One definition of an outstanding invoice.',
    example: 'Invoice and payment records combine into a reporting view with a documented reconciliation rule. The view shows when it last refreshed and surfaces unmatched transactions instead of hiding them in a total.',
    steps: ['Collect', 'Reconcile', 'Define', 'Report'],
    measures: 'Preparation time, data freshness, completeness, and reconciliation differences.',
    faqs: [
      ['Do we need a new data platform?', 'Not always. Improving the existing sources and reports may be enough. A new platform is justified by volume, access, refresh, or maintenance requirements.'],
      ['Is AI part of every data project?', 'No. Most reporting needs are best served by clear definitions, dependable pipelines, and conventional analytics.'],
    ],
    related: ['cloud-infrastructure', 'integration-automation', 'ai-solutions'],
  },
  {
    slug: 'modernisation-support', name: 'Application Modernisation & Support', short: 'Modernisation & support',
    headline: 'Improve the software your business already depends on.',
    summary: 'Improve existing applications and agree who looks after them after release.',
    lead: 'Replacing everything is rarely the right first move. We assess the current application, prioritise the changes that matter, and make them without losing the behaviour people rely on.',
    problems: [
      ['Releases are risky because important behaviour is undocumented or untested.', 'Regression tests around the behaviour that matters, so changes can ship with confidence.'],
      ['The application depends on ageing components and manual deployments.', 'Supported dependencies and an automated, repeatable release process.'],
      ['Maintenance, monitoring, and the next improvements have no clear owner.', 'A support agreement that names who maintains, monitors, and improves the application.'],
    ],
    outputs: ['Prioritised modernisation roadmap', 'Delivered improvements with regression evidence', 'Deployment and recovery runbooks', 'Support agreement with coverage and response targets'],
    start: { name: 'Application assessment', phrase: 'an application assessment', text: 'We review the code, dependencies, deployment, and how the application is operated today.', outputs: ['Architecture and dependency map', 'Risks ranked by business impact', 'Options to refactor, replace, or retain each part', 'Support model and first priorities'] },
    exampleTitle: 'Replace one difficult part, not the whole system.',
    example: 'An ageing booking application keeps serving customers while its notification process is separated, tested, and replaced. A phased change is easier to accept and roll back than a single large rewrite.',
    steps: ['Assess', 'Isolate', 'Test', 'Release'],
    measures: 'Release stability, defect trends, performance, maintenance effort, and response times.',
    faqs: [
      ['Can you take over an application built elsewhere?', 'Yes. We start with an assessment of its condition, access, licensing, and operation, then agree exactly what we take responsibility for.'],
      ['Can one agreement cover the application and its cloud environment?', 'Yes. Application support and cloud operations can sit in one agreement that lists the systems, hours, and responsibilities.'],
    ],
    related: ['cloud-infrastructure', 'software-development', 'integration-automation'],
  },
];

export const industries = [
  { slug: 'finance-fintech', name: 'Finance & Fintech', intro: 'Make customer journeys and financial operations easier to follow, without losing the controls behind them.', applications: ['Customer onboarding and document collection', 'Payment integration and reconciliation', 'Operational and financial reporting'], services: ['software-development', 'integration-automation', 'cloud-infrastructure', 'data-business-intelligence'] },
  { slug: 'insurance', name: 'Insurance', intro: 'Connect policyholders, brokers, and operations teams around a clear view of the work.', applications: ['Policyholder and broker portals', 'Claims coordination and status updates', 'Document processing with a review path'], services: ['software-development', 'integration-automation', 'ai-solutions'] },
  { slug: 'procurement-supply-chain', name: 'Procurement & Supply Chain', type: 'Cross-industry solutions', intro: 'Give purchasing and supplier processes a clear route from request to receipt.', applications: ['Supplier onboarding and vendor portals', 'Purchase requisitions and approval workflows', 'Inventory visibility and spend reporting'], services: ['integration-automation', 'software-development', 'data-business-intelligence'] },
  { slug: 'compliance-risk', name: 'Compliance & Risk', type: 'Cross-industry solutions', intro: 'Keep evidence, responsibilities, and review status together instead of scattered across inboxes.', applications: ['Evidence collection and due-diligence workflows', 'Policy attestations and scheduled reviews', 'Access-review and audit-reporting workflows'], services: ['integration-automation', 'cloud-infrastructure', 'data-business-intelligence'] },
  { slug: 'healthcare', name: 'Healthcare', intro: 'Improve the administrative work around care, with appropriate boundaries for patient information.', applications: ['Appointments, reminders, and patient services', 'Patient portals and document collection', 'Administrative and billing-system integrations'], services: ['software-development', 'integration-automation', 'cloud-infrastructure'] },
  { slug: 'education', name: 'Education', intro: 'Make it easier for learners, families, and staff to get information and complete everyday tasks.', applications: ['Admissions and enrolment journeys', 'Learner services and communication portals', 'Fee reconciliation and administrative reporting'], services: ['software-development', 'integration-automation', 'data-business-intelligence'] },
  { slug: 'retail-ecommerce', name: 'Retail & E-Commerce', intro: 'Join up the customer order and the operational work needed to fulfil it.', applications: ['Online stores and customer account journeys', 'Order, payment, and stock-system integration', 'Inventory and fulfilment reporting'], services: ['software-development', 'integration-automation', 'cloud-infrastructure', 'data-business-intelligence'] },
  { slug: 'logistics-transport', name: 'Logistics & Transport', intro: 'Help dispatchers, drivers, and customers work from timely information about the same delivery.', applications: ['Scheduling and dispatch workflows', 'Shipment tracking and customer updates', 'Proof of delivery and exception handling'], services: ['software-development', 'integration-automation', 'data-business-intelligence'] },
  { slug: 'agriculture', name: 'Agriculture', intro: 'Connect field activity, cooperative records, and buyer requirements without assuming constant connectivity.', applications: ['Farmer registration and cooperative records', 'Produce traceability and buyer platforms', 'Field data collection and operational reporting'], services: ['software-development', 'integration-automation', 'data-business-intelligence'] },
  { slug: 'public-sector-non-profit', name: 'Public Sector & Non-Profit', intro: 'Make services and programmes easier to access, administer, and account for.', applications: ['Citizen and beneficiary service portals', 'Case management and programme workflows', 'Monitoring, evaluation, and impact reporting'], services: ['software-development', 'integration-automation', 'cloud-infrastructure', 'data-business-intelligence'] },
];

export const engagements = [
  ['Assess & Plan', 'When you need a clear starting point.', 'A product discovery, cloud assessment, integration roadmap, or AI feasibility review. Agree the questions and receive a plan you can use whether or not we deliver the next phase.'],
  ['Design & Deliver', 'When there is a project to build.', 'A scoped project or phased programme with agreed deliverables, acceptance criteria, and responsibilities. Testing, migration, and handover belong in the plan.'],
  ['Embedded Expertise', 'When your team needs a specific contribution.', 'Work within an existing delivery organisation on an agreed role or workstream. Establish skills, availability, and accountability before the engagement starts.'],
  ['Operate & Improve', 'When the system needs an ongoing owner.', 'A defined agreement for cloud or application maintenance and planned changes. Specify coverage, escalation, third-party costs, and how new work is approved.'],
];

export const servicePath = (service) => `/services/${service.slug}/`;
export const contactPath = (slug, industry) => {
  const query = new URLSearchParams();
  if (slug) query.set('interest', slug);
  if (industry) query.set('industry', industry);
  return `/contact/${query.size ? `?${query}` : ''}`;
};
