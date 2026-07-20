export interface NavItem {
  label: string;
  path: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navigation: NavGroup[] = [
  {
    label: 'Start here',
    items: [
      { label: 'Home', path: '/' },
      { label: 'Blog', path: '/blog/' },
      { label: 'Quick Start', path: '/getting-started/quick-start/' },
      { label: 'Research Report', path: '/research-report/' }
    ]
  },
  {
    label: 'Writing',
    items: [
      { label: 'Multiplicative Archaeology', path: '/blog/multiplicative-archaeology/' },
      { label: 'Navokoj Launch', path: '/blog/navokoj-launch/' },
      { label: 'Road to Enterprise', path: '/blog/road-to-enterprise/' },
      { label: 'The Seven Seals', path: '/blog/seven-seals-navokoj/' },
      { label: 'The Six Research Tribes', path: '/blog/six-research-tribes/' }
    ]
  },
  {
    label: 'Core vision',
    items: [
      { label: 'The Arithmetic Manifold', path: '/core-vision/' },
      { label: 'Axiom Architecture', path: '/axiom-architecture/' },
      { label: 'Partition Function', path: '/concepts/partition-function/' },
      { label: 'Prime Weighting', path: '/concepts/prime-weighting/' },
      { label: 'Multiplicative vs Additive', path: '/concepts/multiplicative-vs-additive/' },
      { label: 'Agentic AI as Distributed Systems', path: '/concepts/agentic-ai-distributed-systems/' },
      { label: 'Prime Euler Activations', path: '/concepts/prime-euler-activations/' },
      { label: 'Phase Transitions', path: '/concepts/phase-transitions/' },
      { label: 'Riemann Hypothesis', path: '/concepts/riemann-hypothesis/' },
      { label: 'Asymptotically Fair Stopping', path: '/concepts/asymptotically-fair-stopping/' },
      { label: 'STOP Operators', path: '/concepts/stop-operator-manuscript/' }
    ]
  },
  {
    label: 'Projects',
    items: [
      { label: 'Projects Overview', path: '/projects/' },
      { label: 'BAHA', path: '/projects/baha/' },
      { label: 'NitroSAT', path: '/projects/nitrosat/' },
      { label: 'Navokoj', path: '/projects/navokoj/' },
      { label: 'Multiplicative PINN', path: '/projects/multiplicative-pinn/' },
      { label: 'Spectral Multiplicative', path: '/projects/spectral-multiplicative/' },
      { label: 'Geometry of Conditional Logic', path: '/projects/geometry-of-conditional-logic/' },
      { label: 'Casimir SAT Solver', path: '/projects/casimir-sat-solver/' },
      { label: 'Factor Agent', path: '/projects/factor-agent/' },
      { label: 'Thermodynamic Number Line', path: '/projects/thermodynamic-number-line/' },
      { label: 'Authorization Lattice', path: '/projects/authorization-lattice/' }
    ]
  },
  {
    label: 'Navokoj',
    items: [
      { label: 'Why Navokoj', path: '/marketing/' },
      { label: 'Use Cases', path: '/marketing/use-cases/' },
      { label: 'Pricing', path: '/marketing/pricing/' },
      { label: 'Results', path: '/marketing/results/' },
      { label: 'Competition', path: '/marketing/competition/' },
      { label: 'The Bottleneck', path: '/marketing/bottleneck/' },
      { label: "Pragmatist's Guide", path: '/marketing/monetization-guide/' },
      { label: 'Customer Monetization', path: '/marketing/customer-monetization/' }
    ]
  },
  {
    label: 'Developer guide',
    items: [
      { label: 'Navokoj API', path: '/navokoj/' },
      { label: 'Full API Documentation', path: '/navokoj/api-documentation/' },
      { label: 'Quick Start', path: '/getting-started/quick-start/' },
      { label: 'Lua Module', path: '/getting-started/lua-module/' },
      { label: 'Benchmarks', path: '/getting-started/benchmarks/' }
    ]
  },
  {
    label: 'Resources',
    items: [
      { label: 'Product Strategy', path: '/product-strategy/' },
      { label: 'Papers', path: '/references/papers/' },
      { label: 'Related Work', path: '/references/related-work/' },
      { label: 'Limitations & Boundaries', path: '/limitations/' },
      { label: 'Roadmap', path: '/TODO/' },
      { label: 'Glossary', path: '/glossary/' },
      { label: 'Design Philosophy', path: '/design-philosophy/' }
    ]
  },
  {
    label: 'Zenodo',
    items: [
      { label: 'All Records', path: '/zenodo/' },
      { label: 'Casimir SAT Solver', path: '/zenodo/solving-sat-quantum-vacuum-dynamics/' },
      { label: 'Spectral Multiplicative', path: '/zenodo/spectral-multiplicative-framework/' },
      { label: 'Spectral–Arithmetic', path: '/zenodo/shunyabar-spectral-arithmetic-phase-transitions/' },
      { label: 'Multiplicative Calculus BAHA', path: '/zenodo/multiplicative-calculus-hardness-detection/' },
      { label: 'NitroSAT', path: '/zenodo/nitrosat-physics-informed-maxsat/' },
      { label: 'Emergent Stochasticity', path: '/zenodo/emergent-stochasticity-serialized-concurrency/' }
    ]
  }
];

export const primaryNavigation: NavItem[] = [
  { label: 'Writing', path: '/blog/' },
  { label: 'Research', path: '/research-report/' },
  { label: 'Projects', path: '/projects/' },
  { label: 'Developers', path: '/getting-started/quick-start/' }
];

export const orderedPages = navigation.flatMap((group) => group.items);
