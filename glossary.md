# Glossary

A plain-English reference for every term used across ShunyaBar Labs documentation. Technical terms link to deeper explanations where they exist.

---

## Company & Products

| Term | Meaning |
|---|---|
| **ShunyaBar Labs** | The company. A research and product group building verifiable constraint-solving tools. |
| **Navokoj** | The production API. A MaxSAT solver customers call over HTTP. Lives at `navokoj.shunyabar.foo`. |
| **NitroSAT** | The high-performance engine inside Navokoj. Written in C99 and LuaJIT. |
| **BAHA** | Branch-Aware Holonomy Annealing. The "escape mechanism" used when the solver gets stuck in a hard region. |
| **Multiplicative PINN** | Physics-Informed Neural Network that uses multiplication instead of addition to combine constraints. |
| **Casimir SAT Solver** | A quantum-inspired solver that uses Casimir-force analogies to navigate hard SAT instances. |
| **Factor Agent** | A fault-tolerant agent runtime modeled on Erlang/OTP, with lock-preserving local repair. See [Agentic AI as a Distributed System](concepts/agentic-ai-distributed-systems.md). |
| **Authorization Lattice** | A capability system that treats permissions as p-adic numbers. |
| **Spectral-Multiplicative Framework** | A solvability predictor written in Crystal. Tells you how hard a problem is *before* you try to solve it. |
| **Arithmetic Manifold** | The unifying theory behind all of the above. Treats constraints, optimization, and physical simulation as different views of one geometric structure. |

## Engines (the spectrum)

Navokoj runs five engines. Pick the right one for the job.

| Engine | When to use | Speed | Quality |
|---|---|---|---|
| **nano** | Real-time APIs, quick checks (<100ms) | Fastest | ~94% satisfaction |
| **mini** | Balanced production work, high-stakes optimization | Slow (40s+) | ~99.77% satisfaction |
| **pro** | Mission-critical work where every fraction matters | Medium (0.1–7s) | ~99.4% satisfaction |
| **qstate** | N-ary problems (graph coloring, Sudoku, resource allocation) | Variable | ~95–100% when feasible |
| **ensemble** | Deep reasoning on very hard instances | Slowest | Highest available |
| **hybrid** | Mixes CNF and XOR constraints (cryptographic-style problems) | Variable | ~98% at scale |

Customers today use **mini** and **pro** almost exclusively. **nano** and **ensemble** are rarely picked.

## Hardware tiers

| Hardware | What it is | Use case |
|---|---|---|
| **L4** | Mid-range NVIDIA GPU | Production MaxSAT at scale |
| **H100** | Top-tier NVIDIA GPU | Deep optimization, multi-million-variable problems |

## Constraint & Optimization Terms

| Term | Meaning |
|---|---|
| **Constraint satisfaction** | The problem of finding values for variables that satisfy a set of rules. Scheduling, routing, and resource allocation are all examples. |
| **SAT** | Boolean Satisfiability. Given a list of yes/no rules, find an assignment that satisfies all of them. The canonical hard computer-science problem. |
| **MaxSAT** | A weighted version of SAT. Each rule has a cost; find the assignment that minimizes total cost. Most real business problems are MaxSAT, not SAT. |
| **UNSAT** | "Unsatisfiable." There is no assignment that satisfies all the rules. |
| **CNF** | Conjunctive Normal Form. The standard format for SAT problems: a list of "either-or" clauses joined by "and." |
| **WCNF** | Weighted CNF. Same as CNF but each clause carries a numeric weight. |
| **Q-SAT (N-ary SAT)** | Generalization of SAT where each variable can take more than two values. Useful for graph coloring, Sudoku, scheduling. |
| **XOR constraint** | A parity constraint (the sum of variables equals 0 or 1 mod 2). Common in cryptographic problems. |
| **R1CS** | Rank-1 Constraint System. The format zero-knowledge circuits use. |
| **CSP** | Constraint Satisfaction Problem. The umbrella category that includes SAT, MaxSAT, Q-SAT, and many others. |
| **CDCL** | Conflict-Driven Clause Learning. The algorithm behind most modern SAT solvers (Z3, Kissat, CaDiCaL). Excellent at pure Boolean logic. |
| **CP-SAT** | Google's constraint programming solver. Strong on general discrete optimization. |
| **Phase transition** | A sudden, qualitative change in problem behavior as problem size or density crosses a threshold. Where hard problems live. |
| **Partition function Z(β)** | A quantity from statistical mechanics that summarizes the entire energy landscape of a problem. Universal across our projects. |
| **Lambert W function** | A mathematical function that governs the bifurcation between easy and hard optimization regimes. |
| **Riemann Hypothesis** | The deepest unsolved problem in mathematics about the distribution of primes. Our solvers embed it as a stability condition. |
| **Euler product** | A formula that expresses the Riemann zeta function as a product over prime numbers. Bridges additive and multiplicative structure. |
| **Spectral gap** | A measure of how quickly information spreads across a graph or constraint system. Large gap = structured problem; small gap = hard problem. |
| **Langevin dynamics** | A way of simulating motion under noise. We use it to navigate energy landscapes. |
| **Heat kernel** | A mathematical object that describes how a "signal" propagates across a graph over time. |
| **Casimir force** | A quantum-mechanical force between closely-spaced plates. We borrow the analogy for navigation between solutions. |
| **Multiplicative vs. additive loss** | How you combine multiple objectives. Multiplicative (`L = A × B`) preserves gradient flow; additive (`L = A + B`) creates conflicts. |
| **Prime weighting** | Our technique of giving each constraint a unique prime-derived weight so no two constraints collide. |
| **p-adic ultrametric** | A way of measuring distance where "closer" means "shares more committed structure." Used for local repair. |
| **Garner's algorithm** | A 1958 algorithm for solving systems of modular equations. We use a differentiable version. |

## Verification & Trust

| Term | Meaning |
|---|---|
| **Proof of optimality** | A mathematical certificate that the answer returned is the best possible, not just a good guess. |
| **Proof artifact** | A structured data object (JSON, derivation graph) that a verifier can check offline. Our differentiator. |
| **UNSAT core** | A small subset of clauses that, taken alone, are unsatisfiable. Proves a problem has no solution. |
| **Derivation graph** | A tree of resolution steps that reconstructs a proof. We use these instead of English-language proof strings. |
| **Infeasibility proof** | A proof that no solution exists for a problem. Distinct from "engine gave up." |
| **ZK (Zero-Knowledge)** | A cryptographic technique that lets one party prove a statement is true without revealing the underlying data. |
| **ZK Pre-Processor** | A tool that breaks a ZK circuit into MaxSAT-shaped subproblems before the main ZK proving step. Our 2027 enterprise wedge. |

## Business & Operations

| Term | Meaning |
|---|---|
| **ARR** | Annual Recurring Revenue. The standard SaaS revenue metric. |
| **LOI** | Letter of Intent. A signed (but not yet legally binding) agreement to do business. |
| **SDK** | Software Development Kit. Libraries that make our API easier to call from common languages. |
| **SOC2** | A security compliance certification required by most enterprise customers. |
| **RBAC** | Role-Based Access Control. Permissions tied to user roles, not individual accounts. |
| **On-prem** | Software that runs on the customer's own servers, not in our cloud. Enterprise tier requirement. |
| **Pilot** | A short (30–60 day) paid engagement to validate fit before a full annual contract. |

## Internal Systems

| Term | Meaning |
|---|---|
| **Beampipe** | Our top-of-funnel web analytics. Counts visits to `sethuiyer.github.io` and `navokoj.shunyabar.foo`. |
| **Supabase** | The database that backs the Navokoj API. Stores users, API keys, solve logs, billing. |
| **PostHog** | Our frontend product analytics. Tracks button clicks, pageviews, and completion rates. |
| **DEFEKT** | Our pre-solve hardness diagnostic. Tells you how hard a problem is before you commit compute to it. |
| **EA (Edwards-Anderson)** | A model from statistical physics used as a benchmark for frustrated optimization. |
| **CFD** | Computational Fluid Dynamics. The traditional way of simulating fluids; we benchmark against it. |
| **PDE** | Partial Differential Equation. The class of equations describing physical systems. |

## Pricing Tiers

| Tier | Price | Designed for |
|---|---|---|
| **Free** | $0 | Hobbyists, CI testing |
| **Dev** | $99/mo | Indie developers, small apps |
| **Pro** | $499/mo | Startups, mid-market teams |
| **Enterprise** | Custom (typically $5K+/mo) | Large teams, regulated industries |

---

*If a term is missing, [open an issue](https://github.com/sethuiyer/shunyabar/issues) or email contact@shunyabar.foo.*

---

## See Also

- [The Arithmetic Manifold](core-vision.md) — the unified theory behind the terms
- [Concepts: Prime Weighting](concepts/prime-weighting.md) · [Partition Function](concepts/partition-function.md) · [Multiplicative vs Additive](concepts/multiplicative-vs-additive.md) · [Phase Transitions](concepts/phase-transitions.md) · [Riemann Hypothesis](concepts/riemann-hypothesis.md)
- [All Projects](projects/index.md) — where these terms come to life
- [Product Strategy](product-strategy.md) — business terminology
