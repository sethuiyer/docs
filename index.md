<div class="sb-thesis-title">
<h1>ShunyaBar Labs</h1>
<div class="sb-subtitle">Physics-informed constraint intelligence &amp; proof-aware optimization</div>
<div class="sb-tagline">Logic should be a utility.</div>
</div>

<div class="sb-abstract">

ShunyaBar Labs builds **Navokoj** — an industrial SAT / MaxSAT engine that replaces combinatorial search with **continuous phase transitions** grounded in non-commutative geometry. Our [spectral-arithmetic framework](projects/spectral-multiplicative.md) handles million-clause industrial instances in seconds, with **downloadable proof artifacts** so you can verify every assignment offline. We are a research lab and a product company: open preprints on [Zenodo](zenodo/index.md), a production API at `navokoj.shunyabar.foo`, and six shipped projects — all unified by one theory, the **Arithmetic Manifold**.

</div>

## Why approximate MaxSAT matters

Real systems are often overconstrained: every hard rule, cost target, preference, and safety condition cannot always be satisfied at once. SAT asks whether every constraint can be made true. MaxSAT asks for the best tradeoff when that is impossible: which assignment satisfies the most valuable constraints, and which violations remain.

Approximate MaxSAT is useful because exact optimality can be too expensive at industrial scale. A fast solver that returns a high-quality assignment, the violated clauses, reproducible objective values, and proof or audit artifacts can turn messy scheduling, placement, planning, verification, and policy-routing problems into practical optimization workflows.

---

## By the numbers

| 3.7 ms | 90.1% | 5,140 | 113M | 10M |
|:---:|:---:|:---:|:---:|:---:|
| SUTRA median latency | SUTRA complete-SAT | SUTRA workload runs | NitroSAT V3 clauses | Q-State constraints |

Distinct campaigns — [open the evidence ledger](https://huggingface.co/buckets/sethuiyer/shunyabar-evidence-v1).

---

## Start here

| Path | Read this if… |
|---|---|
| [**Navokoj Launch**](blog/navokoj-launch.md) | You want product context first — what the solver does, how it performs. |
| [**The Arithmetic Manifold**](core-vision.md) | You want the math — how prime weighting, phase transitions, and Bost-Connes truncation compose into one theory. |
| [**Quick Start**](getting-started/quick-start.md) | You want to send a problem to the API in the next ten minutes. |

---

## NitroSAT — open-source benchmarks

[**NitroSAT**](projects/nitrosat.md) is the open-source solver (Apache 2.0) that backs Navokoj's [`pro` engine](glossary.md#engines-the-spectrum). The full benchmark suite — **358 instances across 19 problem types, every result reproducible from the attached code** — ships inside the [NitroSAT Zenodo record](zenodo/nitrosat-physics-informed-maxsat.md).

| 358 | 19 | 99.58% | 354,890 | 0.0000% |
|:---:|:---:|:---:|:---:|:---:|
| benchmark instances | problem types (graph coloring, Ramsey, scheduling, N-Queens, XOR-SAT, mutilated chessboard, …) | average clause satisfaction | clauses solved at 100% on `cliquecol` | std-dev across 20 variable renumberings (perfectly permutation-invariant) |

Verified instances include `129sat_n200` (1M clauses, 100%), `pyth_n5000` (100%), `ramsey_n52` (100%), `3sat_100k` (94.9%). Independent verification: `python3 verify_reproducibility.py`.

---

<!-- latest-articles-widget -->

---

## From the blog

- [The Road to Enterprise — June 2026 Milestone](blog/navokoj-road-to-enterprise.md)
- [The Seven Seals of Navokoj](blog/seven-seals-navokoj.md) — security architecture
- [The Six Research Tribes of ShunyaBar](blog/six-research-tribes.md) — internal pipeline

---

## Projects

- [NitroSAT](projects/nitrosat.md) — Lua solver, 358-instance benchmark, 99.58% average satisfaction
- [BAHA](projects/baha.md) — branch-aware annealer, the engine behind the proof
- [Multiplicative PINN](projects/multiplicative-pinn.md) — physics-informed learning
- [All projects →](projects/index.md)

---

## Three reader lanes

### For builders — *ship a feature this week*

- [Quick Start](getting-started/quick-start.md)
- [Navokoj Developer Guide](navokoj/index.md)
- [Lua Module](getting-started/lua-module.md)
- [Pricing](marketing/pricing.md)

### For integrators — *build a vertical SaaS*

- [Pragmatist's Guide to Monetizing ShunyaBar](marketing/monetization-guide.md)
- [Customer Monetization Enablement](marketing/customer-monetization.md)
- [Use Cases](marketing/use-cases.md)
- [Results](marketing/results.md)

### For researchers — *read the math*

- [The Arithmetic Manifold](core-vision.md)
- [Axiom Architecture](axiom-architecture.md)
- [Partition Function](concepts/partition-function.md) · [Prime Weighting](concepts/prime-weighting.md) · [Phase Transitions](concepts/phase-transitions.md)
- [Research Report](research-report.md)
- [Glossary](glossary.md) · [Design Philosophy](design-philosophy.md)

---

## Companion sites

The docs you are reading are the **product and engineering surface**. The longer-form scholarship lives elsewhere.

### [research.shunyabar.foo](https://research.shunyabar.foo/) — long-form essays

| Section | Representative essays |
|---|---|
| **Core Theory & Foundations** | The Proximity-Identity Functional · Convergence Frontiers · Exponential Functions in Complex Systems |
| **Number Theory & Arithmetic Physics** | The Dynamic Prime Cantor Set · The Prime Walk · Quantum Rhythm Hypothesis · Majorana Topological Superconductors |
| **Optimization & Control Systems** | The Hidden Manifold · Mathematical Mechanism of the Self-Stabilizing Optimizer · TSP on the Self-Stabilizing Optimizer · Hidden Laws of Imbalance |
| **Machine Learning & Computation** | Fock Space Computation · The Multiplicative Axis (constraint enforcement · Navier-Stokes with prime gates) |

### [navokoj.shunyabar.foo](https://navokoj.shunyabar.foo/) — production API

The customer-facing product. `/v1/solve`, `/v1/schedule`, `/v1/audit`, pricing tiers, account dashboard.

### [shunyabar.foo](https://shunyabar.foo/) — company

Front door. Mission, team, contact.

---

## Outside the docs

- [Sethu Iyer on Medium](https://medium.com/@sethuiyer) — selected essays on SAT, AGI geometry, and the Riemann Hypothesis.
- [Sethu Iyer on YouTube](https://www.youtube.com/@SethuIyer95/videos) — talks on divergent computation, primes as curvature, and NitroSAT.

---

*Authored by [Sethurathienam Iyer](https://orcid.org/0009-0008-5446-2856), Founder, ShunyaBar Labs.*
*Commercial contact: `contact@shunyabar.foo`*
