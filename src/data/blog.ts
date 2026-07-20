export interface BlogDetails {
  publishedAt: string;
  type: string;
  tags: string[];
  featured?: boolean;
  description: string;
}

export const blogDetails: Record<string, BlogDetails> = {
  'blog/multiplicative-archaeology': {
    publishedAt: '2026-06-23',
    type: 'Essay',
    tags: ['Arithmetic', 'Number theory', 'Computation'],
    featured: true,
    description:
      'A framework for treating numbers as structured histories, connecting digit topology, interaction cost, and the archaeology of factorization.'
  },
  'blog/navokoj-launch': {
    publishedAt: '2026-06-19',
    type: 'Product note',
    tags: ['Navokoj', 'MaxSAT', 'Product'],
    description:
      'How Navokoj turns discrete constraint problems into continuous geometric flow, with production benchmarks and verifiable results.'
  },
  'blog/navokoj-road-to-enterprise': {
    publishedAt: '2026-01-24',
    type: 'Technical report',
    tags: ['Navokoj', 'Enterprise', 'Roadmap'],
    description:
      'The physics behind Navokoj, the barriers already crossed, and the engineering path from public beta to enterprise readiness.'
  },
  'blog/seven-seals-navokoj': {
    publishedAt: '2026-06-22',
    type: 'Reference',
    tags: ['Security', 'Navokoj', 'Architecture'],
    description:
      'Seven layers of privacy, supply-chain integrity, offline licensing, and binary protection behind the Navokoj deployment model.'
  },
  'blog/six-research-tribes': {
    publishedAt: '2026-06-22',
    type: 'Field note',
    tags: ['Research', 'Architecture', 'ShunyaBar'],
    description:
      'Six research cohorts compose into one pipeline: weight, transform, satisfy, relax, observe, and coordinate.'
  }
};
