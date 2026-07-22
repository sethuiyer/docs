export const editorialFormats = [
  {
    id: 'product-explainer',
    label: 'Product explainers',
    shortLabel: 'Product',
    description: 'What Navokoj does, who it serves, and how the runtime changes an operational workflow.'
  },
  {
    id: 'engineering-case-study',
    label: 'Engineering case studies',
    shortLabel: 'Case study',
    description: 'Concrete workloads, API paths, deployment patterns, and implementation decisions.'
  },
  {
    id: 'experimental-report',
    label: 'Experimental reports',
    shortLabel: 'Report',
    description: 'Measured campaigns, benchmark results, failure modes, and reproducible observations.'
  },
  {
    id: 'mathematical-framework',
    label: 'Mathematical frameworks',
    shortLabel: 'Framework',
    description: 'The formal structures and computational mechanisms behind the lab\'s systems.'
  },
  {
    id: 'exploratory-hypothesis',
    label: 'Exploratory hypotheses',
    shortLabel: 'Hypothesis',
    description: 'Forward-looking connections and research directions that are still being developed.'
  }
] as const;

export type EditorialFormat = (typeof editorialFormats)[number]['id'];

export interface BlogDetails {
  publishedAt: string;
  type: string;
  format: EditorialFormat;
  tags: string[];
  featured?: boolean;
  description: string;
}

export const blogDetails: Record<string, BlogDetails> = {
  'blog/multiplicative-archaeology': {
    publishedAt: '2026-06-23',
    type: 'Essay',
    format: 'mathematical-framework',
    tags: ['Arithmetic', 'Number theory', 'Computation'],
    featured: true,
    description:
      'A framework for treating numbers as structured histories, connecting digit topology, interaction cost, and the archaeology of factorization.'
  },
  'blog/navokoj-launch': {
    publishedAt: '2026-06-19',
    type: 'Product note',
    format: 'product-explainer',
    tags: ['Navokoj', 'MaxSAT', 'Product'],
    description:
      'How Navokoj turns discrete constraint problems into continuous geometric flow, with production benchmarks and verifiable results.'
  },
  'blog/navokoj-road-to-enterprise': {
    publishedAt: '2026-01-24',
    type: 'Technical report',
    format: 'product-explainer',
    tags: ['Navokoj', 'Enterprise', 'Roadmap'],
    description:
      'The physics behind Navokoj, the barriers already crossed, and the engineering path from public beta to enterprise readiness.'
  },
  'blog/seven-seals-navokoj': {
    publishedAt: '2026-06-22',
    type: 'Reference',
    format: 'engineering-case-study',
    tags: ['Security', 'Navokoj', 'Architecture'],
    description:
      'Seven layers of privacy, supply-chain integrity, offline licensing, and binary protection behind the Navokoj deployment model.'
  },
  'blog/six-research-tribes': {
    publishedAt: '2026-06-22',
    type: 'Field note',
    format: 'mathematical-framework',
    tags: ['Research', 'Architecture', 'ShunyaBar'],
    description:
      'Six research cohorts compose into one pipeline: weight, transform, satisfy, relax, observe, and coordinate.'
  }
};

export const editorialFormatById: Record<string, EditorialFormat> = {
  'blog/agent-control-plane': 'product-explainer',
  'blog/building-a-constraint-runtime': 'product-explainer',
  'blog/constraint-intelligence-for-ai-agents': 'product-explainer',
  'blog/deploying-navokoj-in-private-environments': 'engineering-case-study',
  'blog/enter-the-research-program': 'mathematical-framework',
  'blog/from-csv-to-verified-nurse-roster': 'engineering-case-study',
  'blog/from-nitrosat-to-navokoj': 'product-explainer',
  'blog/github-sponsors-preview': 'product-explainer',
  'blog/k8s-placement': 'engineering-case-study',
  'blog/multiplicative-archaeology': 'mathematical-framework',
  'blog/navokoj-launch': 'product-explainer',
  'blog/navokoj-pricing-explained': 'product-explainer',
  'blog/navokoj-road-to-enterprise': 'product-explainer',
  'blog/nitrosat-release': 'product-explainer',
  'blog/physics-engine-for-logic': 'mathematical-framework',
  'blog/qbf-solving': 'experimental-report',
  'blog/qstate-sudoku-api-case-study': 'engineering-case-study',
  'blog/ramsey-limit': 'experimental-report',
  'blog/road-to-enterprise': 'product-explainer',
  'blog/seven-seals-navokoj': 'engineering-case-study',
  'blog/shipped-api-verification': 'experimental-report',
  'blog/six-research-tribes': 'mathematical-framework',
  'blog/sutra-wcnf-api-case-study': 'engineering-case-study',
  'blog/the-future-of-sure-thing-computing': 'exploratory-hypothesis',
  'blog/training-dynamics': 'mathematical-framework',
  'blog/what-happens-when-a-solve-times-out': 'product-explainer',
  'blog/why-customers-switch-to-navokoj': 'product-explainer'
};
