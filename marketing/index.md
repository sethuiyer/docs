# Navokoj — Verifiable MaxSAT for Hard Planning Problems

**The shortest description:** Navokoj is a constraint-solving API that returns the best possible answer **plus a proof you can verify offline**.

---

## What Navokoj Solves

Every enterprise solves constraint-satisfaction problems under time pressure. Navokoj handles the ones where:

- The problem is **structured** (regular schedules, grids, hardware circuits, large graph partitions — not random SAT)
- **Speed matters** (real-time decisions, batch re-runs, what-if analysis)
- **Verifiability matters** (regulated industries, audit trails, security-sensitive workflows)
- **Disruptions happen** (a nurse calls in sick, a truck breaks down, a GPU fails) and you need to repair without restarting

If that sounds like your problem, [read the use cases](use-cases.md).

---

## The Three Things That Make Us Different

### 1. Proofs, not promises

Every Pro+ response includes a structured **proof artifact** — assignment + UNSAT cores + derivation graph. Our verifier is [open source](../glossary.md#verification-trust). You don't trust us. You download our verifier, run it against our response, and confirm offline. That is the trust model.

For comparison: classical solvers (Gurobi, CPLEX, OR-Tools) give you an answer and ask you to take it on faith. CDCL SAT solvers (Z3, Kissat, CaDiCaL) give you proof artifacts but choke on million-variable industrial problems. We do both.

### 2. Lock-preserving repair

When the world changes, we don't restart from scratch. We preserve the parts of your schedule that already work and adjust only what changed. **847×–12,495× faster than recomputation**, with 95%+ of prior decisions untouched.

This is the wedge for [hospital scheduling](use-cases.md#2-healthcare-workforce-scheduling), [fleet routing](use-cases.md#1-logistics-transportation), and [GPU cluster allocation](use-cases.md#3-cloud-infrastructure-devops).

### 3. Honest numbers, everywhere

We benchmark against certified optimal solutions and report the gaps. Our [`mini` engine](../limitations.md) hits 99.77% satisfaction; we tell you that's not 100%. We tell you where our solver plateaus (expander graphs, ~90% wall) and where it doesn't apply (random unstructured SAT). [Read the limitations page](../limitations.md).

---

## What Customers Run It On

### Academic benchmarks (peer-reviewed test suites)

| Use case | Example scale | Result |
|---|---|---|
| **University timetabling** | 147K variables, 80M clauses | 100% solved in 73 seconds |
| **Hardware verification** | 512×512 multiplier, 788K variables | 100% in 5.9 seconds |
| **Graph coloring (planted)** | 105K variables, 232K clauses | 100% in 13.78 seconds |
| **Grid / lattice** | 1000×1000 coloring | 100% in 475 seconds |
| **Spin glass (frustrated)** | 64 spins | 99.47% in 4.3 seconds |
| **Fluid simulation** | 2D Navier-Stokes | 99.64% residual reduction, 100,000× faster than CFD |

### Production performance (live API, 2026-04-04 → 2026-06-19)

> **308 production runs. 3.98M clauses processed. Median satisfaction 1.0. Median solve time 65.5 ms.**

| Production instance | Scale | Result |
|---|---|---|
| **Largest clause-density ever recorded** | 10K vars / 1.65M clauses (165× ratio) | 100% in 278 seconds |
| **Sub-second structural monster** | 2.5K vars / 122K clauses (49× ratio) | **100% in 0.296 seconds** |
| **Massive variable count** | 49K vars / 73.5K clauses | 100% in 0.291 seconds |
| **Quality at scale** | 308 production runs | 79.87% at ≥99% satisfaction; 54.22% perfect |

These are not benchmark suite numbers. They are what real customers ran through the Navokoj API over 77 days. Full ledger with all 13 monster runs and the three-modes analysis: [NitroSAT production data →](../projects/nitrosat.md#production-performance-supabase-ledger-2026-04-04-2026-06-19)

[Detailed benchmark methodology →](../research-report.md)

---

## What It Is Not

- **Not a general SAT solver.** If your problem is random Boolean SAT at the phase transition, use Z3 or Kissat. We win on weighted, structured MaxSAT.
- **Not a ZK proving system.** Zero-knowledge is a 2027+ wedge that builds on top of our solver. The proof artifact today is a derivation graph, not a SNARK.
- **Not a real-time control system.** Our fastest engine hits ~94% satisfaction in milliseconds. If you need <10ms deterministic response for embedded control, look elsewhere.
- **Not a generic constraint solver for continuous problems.** If your objective is differentiable, use gradient descent. We specialize in discrete commitment allocation.

---

## Pricing

| Tier | Price | What you get |
|---|---|---|
| **Free** | $0 | 1K vars, 5K clauses, 500 req/hr |
| **Dev** | $99/mo | 10K vars, 50K clauses, 5K req/hr |
| **Pro** | $499/mo | 100K vars, 500K clauses, 50K req/hr, **proof artifacts included** |
| **Enterprise** | Custom ($5K+/mo) | Unlimited, on-prem optional, SOC2 in flight |

[Full pricing details →](pricing.md)

---

## Get Started

```bash
# Free tier — no credit card
curl -X POST https://api.navokoj.shunyabar.foo/v1/solve \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"num_vars": 1000, "clauses": [[1,2,3],[-1,4]], "engine": "mini"}'
```

- **Free tier**: Sign up at [navokoj.shunyabar.foo](https://navokoj.shunyabar.foo)
- **Design partner pilots ($5K–$20K)**: Email contact@shunyabar.foo
- **Press / partnership**: Same address

---

## For the technical reader

- [The Arithmetic Manifold (theory)](../core-vision.md) — the unified mathematical framework
- [Navokoj launch post](../blog/navokoj-launch.md) — how the theory becomes a production API
- [Axiom Architecture essay](../axiom-architecture.md) — the rigorous deep-dive
- [Research report](../research-report.md) — per-project technical assessment
- [Limitations](../limitations.md) — where we work and where we don't
- [Glossary](../glossary.md) — every term defined
- [Product strategy](../product-strategy.md) — H2 2026 roadmap

---

## See Also

- [Use Cases](use-cases.md) — verticals where Navokoj excels
- [Navokoj Launch](../blog/navokoj-launch.md) — launch narrative and solver-engine map
- [Pricing](pricing.md) — tier comparison and engine guide
- [Results](results.md) — verified benchmarks
- [Competition](competition.md) — comparison with Gurobi, OR-Tools, CDCL
- [The Bottleneck](bottleneck.md) — conversion funnel audit
- [Limitations](../limitations.md) — where Navokoj plateaus
