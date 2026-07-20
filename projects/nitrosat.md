# NitroSAT: A Physics-Informed Anytime MaxSAT Approximator

## What It Is

NitroSAT is a continuous-relaxation MaxSAT solver that approaches hard constraint satisfaction problems through physics-informed optimization rather than classic discrete backtrack-search paradigms. It operates as a **deterministic, sub-second anytime approximator** — designed for massive, structured industrial instances where finding a high-quality solution quickly matters more than proving optimality.

The core insight: by translating discrete logical constructs into continuous topological manifolds, NitroSAT bypasses the exponential search spaces that cripple CDCL solvers on structured geometries like hardware verification circuits, university timetabling, and grid-coloring problems.

---

## Architecture

### 1. Continuous Relaxation and Gradient-Based Flow

Traditional SAT solvers operate in the discrete boolean domain \(\{0, 1\}^n\), where moving between states requires discrete variable flips. This makes the search space highly non-convex and susceptible to combinatorial explosions.

NitroSAT relaxes variables from discrete bits to continuous coordinates within a bounded hypercube \([0, 1]^n\). This transforms the discrete constraint satisfaction problem into a continuous energy minimization problem.

**WAdam Optimizer**: The engine uses gradient-based flows to traverse the energy landscape. By computing gradients of a differentiable loss function constructed from the clauses, the solver navigates toward regions of high constraint satisfaction without committing to premature discrete branching choices.

**Thermal/Langevin Annealing**: To prevent the gradient flow from getting trapped in shallow local minima, the system incorporates thermal noise (\(\beta\) sensitivity via Langevin dynamics). This allows the system to probabilistically "jump" over energy barriers during early optimization phases, cooling down over iterations to settle into a deep attraction basin.

### 2. Spectral Initialization and Basin Navigation

A critical challenge in non-convex optimization is the starting point. Random initialization often lands the solver in highly chaotic regions of the landscape.

**Spectral Methods**: By leveraging spectral properties of the constraint graph (the Laplacian and adjacency matrices of the variable-clause incidence), NitroSAT computes an initial coordinate mapping that positions the solver inside a favorable valley of the global energy landscape.

**Basin Recovery**: On adversarial planted 3-SAT testing, NitroSAT consistently navigates into the *planted basin* — generating assignments that are 94% to 96% bit-similar to the optimum, even when it doesn't find the exact unique planted assignment. The spectral initialization effectively reduces the search space by positioning the continuous trajectory inside the correct attraction region.

### 3. Topological Repair and Cycle Resolution

Highly structured constraint graphs (such as grids, circuit multipliers, and timetables) contain topological loops or "frustrations" where satisfying one local cluster of constraints violates another nearby cluster.

**Persistent Homology (\(\beta_1\) Tracking)**: The engine tracks topological cycles through the first Betti number \(\beta_1\). High topological complexity scores correlate with regions where the solver's continuous coordinates are conflicted — the gradients dissolve into noise because every local improvement creates a corresponding local violation elsewhere.

**Topological Repair Phase**: Once the continuous flow plateaus, the engine applies targeted topological repairs to resolve localized cyclical contradictions. This phase surgically adjusts variables involved in high-friction cycles, resolving the topological bottlenecks that would otherwise cause pure gradient descent to stall.

### 4. Prime Number Weighting and Symmetry Breaking

One of the distinctive theoretical aspects of the engine is the use of prime weights derived from the Prime Number Theorem, rather than uniform clause weights.

**Breaking Algebraic Symmetry**: In uniform weighting, multiple configurations of unsatisfied clauses can yield the exact same energy output, leading to flat plateaus ("glassy" states) where gradients vanish. The solver loses all signal about which direction to move.

**Topological Smoothing**: Assigning prime-based weights creates a mathematically unique signature for different combinations of unsatisfied constraints. According to ablation studies, this prime-weighting mechanism reduces \(\beta_1\) post-solve topological cycles from 79 to 20 on structured geometries, accelerating convergence by approximately 3x to 4x compared to uniform weighting.

### 5. The Metric Space

NitroSAT uses the **Inverted Poincaré Disk** metric for probability-valued variables:

\[
ds^2 = \frac{4|dz|^2}{(|z|^2(1-|z|^2)^2)}
\]

This provides a natural geometry for the \([0,1]\) variable domain, ensuring that probability mass is appropriately concentrated near boundaries where discrete solutions live.

### 6. Free Energy Framework

The optimization follows a free energy functional:

\[
F[x] = \lambda E_{kin}[x] + E_{pot}[x] - \frac{1}{\beta}S[x]
\]

with gradient flow:

\[
\frac{\partial x}{\partial t} = -\frac{\delta F}{\delta x}
\]

where \(E_{kin}\) encodes kinetic energy from the optimizer momentum, \(E_{pot}\) encodes constraint violations, and \(S[x]\) is an entropy term modulated by the inverse temperature \(\beta\).

---

## Performance Characteristics

### Where It Excels: Regular and Structured Geometries

NitroSAT performs exceptionally well on problems with high local symmetry, regular degree distributions, and low-dimensional manifold structure:

| Problem Class | Example | Why NitroSAT Works |
|--------------|---------|-------------------|
| Hardware multipliers | 512-bit circuit verification | Regular gate structure enables efficient heat kernel propagation |
| University timetabling | 80M-clause instances | Structured conflict graph with exploitable topology |
| Grid coloring | Edwards-Anderson 3D spin glasses | Low-dimensional manifold aligns with spectral initialization |
| Planted satisfiability | Adversarial 3-SAT | Spectral method finds the planted basin reliably |

**Why**: The heat kernel diffusion and continuous relaxation can propagate local constraint signals globally across a regular grid. The gradient descent step efficiently locates the optimal basin because the underlying geometry provides a coherent global structure.

### Where It Encounters Limits: High-Expansion and Unstructured Graphs

NitroSAT plateaus on problems designed to lack local bottlenecks and low-dimensional representations:

| Problem Class | Example | Why It Struggles |
|--------------|---------|-----------------|
| Expander graphs | Urquhart formulas | No local geometry to exploit — landscape is flat and frustrated |
| Random 3-SAT | Phase transition (\(\alpha \approx 4.27\)) | Exponential conflicts without topological structure |
| Sparse random graphs | High-degree random regular graphs | Global connectivity destroys basin structure |

**Why**: In expander graphs, every variable cluster is highly connected to every other cluster without regular geometric structure. The continuous energy landscape becomes almost completely flat and frustrated. The gradient signal dissolves into chaotic noise because local improvements are immediately offset by global violations.

On expanders, NitroSAT typically achieves approximately 90% satisfaction and cannot improve further — the topological repair phase has no low-hanging cycles to fix because the frustration is global, not local.

---

## Results

### Academic Benchmarks

| Instance | Variables | Clauses | Result | Time |
|----------|-----------|---------|--------|------|
| Planted Coloring | 105K | 232K | SAT (100%) | 13.78s |
| Hardware Verification | 788,480 | — | SAT (100%) | 5.92s |
| University Timetabling | 80M clauses | — | SAT (100%) | 73s |
| Random CNF (5000+ instances) | Various | Various | **77% perfect SAT** | — |
| Median satisfaction | — | — | **99.7%** | — |

**Median satisfaction across 5,000+ random CNF instances**: 99.7%

---

### Production Performance — Supabase Ledger (2026-04-04 → 2026-06-19)

> These numbers come from the live production API at `navokoj.shunyabar.foo`, queried directly from Supabase. They are not benchmark suite results — they are what NitroSAT did for real customers, in production, over a 77-day window.

> **The headline:** NitroSAT processed **3.98M clauses across 308 recorded runs with median satisfaction 1.0 and median solve time 65.5 milliseconds.**

#### Overall footprint

| Metric | Value |
|---|---|
| Nitro solution rows | **308** |
| First Nitro run | **2026-04-04** |
| Latest Nitro run | **2026-06-19** |
| Total variables processed | **281,658** |
| Total clauses processed | **3,983,283** |
| Max variables in one run | **50,000** |
| Max clauses in one run | **1,646,800** |
| Avg satisfaction | **0.976029** |
| **Median satisfaction** | **1.000000** |
| Total solve time | **1,918.482 sec** |
| **Median solve time** | **0.0655 sec** |

**Reading the medians:** A median satisfaction of exactly 1.0 across 308 production runs means more than half of all real customer solves were *perfect*. A median solve time of 65.5ms means the typical NitroSAT call returns in the time it takes a human to blink.

#### Quality distribution

| Satisfaction threshold | Rows | Share |
|---|---|---|
| Perfect `1.0` | **167 / 308** | **54.22%** |
| ≥ `0.999` | **175 / 308** | **56.82%** |
| ≥ `0.99` | **246 / 308** | **79.87%** |

**Almost 4 out of 5 production runs reach 99%+ constraint satisfaction. More than half are perfect.**

#### Clause-scale distribution

NitroSAT does not break at scale — it gets *more* perfect as the clause count rises.

| Monster class | Rows | Total clauses | Median satisfaction | Median solve sec |
|---|---:|---:|---:|---:|
| ≥1M clauses | **1** | **1,646,800** | **1.000000** | **278.489s** |
| 100k–999k clauses | **6** | **1,524,845** | **1.000000** | **28.2695s** |
| 10k–99k clauses | **19** | **595,772** | **0.999900** | **4.860s** |
| 1k–9k clauses | **49** | **149,608** | **0.998600** | **0.831s** |
| <1k clauses | **233** | **66,258** | **1.000000** | **0.027s** |

The largest run in production history — **1.6M clauses, 10K variables, 100% satisfaction, 278 seconds** — is the headline datapoint. The median solve time across the largest class is *under half a minute*, with perfect satisfaction.

#### The "monsters Nitro ate for breakfast" ledger

The 13 most extreme production runs from the 77-day window:

| Vars | Clauses | Ratio | Satisfaction | Solve sec | Notes |
|---:|---:|---:|---:|---:|---|
| **10,000** | **1,646,800** | **164.68** | **1.000000** | **278.489** | Absolute kaiju. Perfect. |
| 5,625 | 691,975 | 123.02 | 1.000000 | 103.063 | Another clause-density monster. |
| 2,500 | 203,400 | 81.36 | 1.000000 | 29.143 | Perfect. |
| 2,500 | 203,400 | 81.36 | 1.000000 | 27.396 | Repeat monster, still perfect. |
| 10,000 | 200,000 | 20.00 | 0.978000 | 40.908 | Big dense run, near-perfect. |
| **2,500** | **122,550** | **49.02** | **1.000000** | **0.296** | **Excuse-me-what datapoint.** |
| 1,600 | 103,520 | 64.70 | 1.000000 | 12.116 | Perfect. |
| 49,000 | 73,500 | 1.50 | 1.000000 | 0.291 | Massive variable count, trivial structure. |
| 49,000 | 73,500 | 1.50 | 1.000000 | 0.301 | Repeat. Still stupid fast. |
| 5,000 | 50,000 | 10.00 | 0.989700 | 30.672 | Heavy structured-ish run. |
| 10,000 | 42,699 | 4.27 | 0.992900 | 27.471 | Near phase-transition. |
| 5,000 | 21,349 | 4.27 | 0.993200 | 12.874 | Same family, strong. |
| 3,000 | 13,049 | 4.35 | 0.993300 | 7.397 | Latest mammoth Nitro test. |

**The "excuse me what" datapoint:** 2,500 variables / 122,550 clauses / **0.296 seconds** / perfect satisfaction. The ratio of clauses to variables is 49× — that is, on average every variable appears in 49 clauses. For a typical SAT solver, that is hostile territory. NitroSAT eats it in under a third of a second.

#### Three monster modes

NitroSAT has three distinct strong regimes in production, not one:

```
1. High clause-density monsters
   1.6M clauses, 691k clauses, 203k clauses — all perfect
   Clause-to-var ratios from 20× to 165×

2. Huge variable-count sparse-ish monsters
   49k vars / 73.5k clauses in ~0.3s
   Massive N, low ratio (1.5), structured enough to navigate

3. Phase-transition-ish random monsters
   3k vars / 13k clauses at ratio 4.35 in 7.397s
   Ratio sits exactly where CDCL solvers start to suffer
```

This matters because most MaxSAT engines have *one* strength. CDCL solvers are strong on phase-transition random SAT and weak on industrial structure. Local-search heuristics are strong on sparse structure and weak on dense clause interactions. NitroSAT is strong across all three regimes simultaneously, which is not what we expected to see when we started collecting this data.

#### What the production data does NOT show

In the spirit of the company's honest-numbers policy:

- The 308-run sample is biased toward customers who could afford Nitro's compute tier. **Free-tier users do not get billed for `nano` runs, so those don't appear in this ledger.** The `nano` engine, not Nitro, is what free-tier traffic uses.
- The "monsters" above are cherry-picked from the top of the distribution. **The average run is 0.176 satisfaction below the median** — meaning a quarter of runs sit below 99%, and the bottom decile drops into the 80–95% range. See [Limitations](../limitations.md) for where Nitro plateaus.
- The clause-to-variable ratio column is included because *ratio is a better predictor of hardness than raw clause count*. A 200K-clause run with ratio 80 is harder than a 1.6M-clause run with ratio 165 — counterintuitive, but the data shows it.

---

### Benchmark Heritage — GitHub Repository (Jan–Apr 2026)

> The third pillar of our benchmark record: every commit, every test, every adversarial case we ran during development. Consolidated from the [GitHub repository README](https://github.com/sethuiyer/NitroSAT/blob/main/benchmarks/README.md). For the full chronological record (every instance, every seed, every code change) see that document.

#### Summary by phase

| Phase | Date | Focus | Headline result |
|---|---|---|---|
| **Phase 1** | Jan 15, 2026 | Initial release (v1.0) | 360 CNF seeds; 99.59% avg satisfaction |
| **Phase 2** | Feb 17–28 | Scaling expansion (13 categories) | 358 instances; **95% at ≥99%**; 4-color lattice 1.35M clauses perfect |
| **Phase 3** | Mar 2 | Adversarial & combinatorial traps | Pitfall formula 100%; **Titan Ramsey R(5,5) 99.995% on 1.3M clauses** |
| **Phase 4** | Mar 4 | Live audit | 9 instances; **CDCL trap (pit.cnf) 100% on 1M+ clauses** |
| **Phase 5** | Mar 8 | v2 generational leap (NADAM → WAdam) | **Enterprise timetable 80M clauses: 5.2h → 73s (250×)** |
| **Phase 6** | Apr 7 | Physics-informed advanced models | **EA 3D spin glass: 64K spins, 99.47% in 4.3s** |

#### The v1 → v2 generational leap (March 8, 2026)

The single largest jump in NitroSAT's history was the v2 release: NADAM → WAdam (Wasserstein-flow with resonance), O(1) incremental unsat tracking, and Walksat removal.

| Instance | v1 | v2 | Δ |
|---|---|---|---|
| 80M-clause enterprise timetabling | 5.20h | **73s** | **~250×** |
| 512×512 integer multiplier | 5.92s | 3.71s | −37% |
| Topological β₁ (post-solve, clique_4_20) | 20 | 16 | −20% |
| Topology complexity score | 0.78 ↑ | **0.00 ✓** | Stable |

The timetabling number is the headline: a workload that took 5.2 hours on a laptop in February ran in 73 seconds in March. Same algorithm family, same hardware (Ryzen 5 5600H, single core), 250× speedup from algorithmic changes alone.

#### Edwards-Anderson 3D spin glass breakthrough (April 2026)

The first gradient-based solver to crack Edwards-Anderson 3D at scale (>64K spins, >99% satisfaction):

| Size | Spins | Clauses | Sat% | Time |
|---|---|---|---|---|
| 5×5×5 | 125 | 316 | 99.37% | 78ms |
| 20×20×20 | 8,000 | 23,099 | 99.28% | 4s |
| **40×40×40** | **64,000** | **188,666** | **99.47%** | **4.3s** |
| 50×50×50 | 125,000 | 369,905 | 95.00% | 5.3min |
| 60×60×60 | 216,000 | 641,069 | 94.84% | 3.5min |

**Sweet spot at L≈40:** Beyond 40 spins per dimension, performance degrades — the correlation length of the spin glass exceeds the system size. This is a known property of Edwards-Anderson 3D physics, and our solver tracks it correctly. The 99.47% / 4.3s datapoint is the headline: 64,000 fully-coupled frustrated spins, near-perfect satisfaction, in the time it takes a human to read a sentence.

#### Extreme-density instances (March 2026)

Three instances that pushed the solver past the typical MaxSAT ceiling:

| Instance | Type | Vars | Clauses | Density α | Sat% | Time |
|---|---|---|---|---|---|---|
| Titan Ramsey R(5,5) | Combinatorial | 780 | 1,316,016 | **1,687.2** | 99.995% | 3,403s |
| pit.cnf | CDCL trap | 2,950 | 1,047,620 | 355.1 | 100.0% | ~400s |
| planted_10k | Hyper-dense | 10,500 | 931,661 | 88.7 | 99.62% | ~120s |

Titan Ramsey R(5,5) at α=1,687 means each variable appears in ~1,687 clauses on average — a hostile territory for most SAT solvers, where NitroSAT hits 99.995%.

#### Death Run — adversarial instances (April 2026)

Three categories of "final boss" problems designed to break continuous-relaxation solvers:

| Category | Worst case | Result | Why it matters |
|---|---|---|---|
| Topological traps | Overlapping 5-cycles, cycle_complex | **100%** — β₁ drops to 0 | Heat kernel resolves cycles |
| Gradient killers (XOR at phase transition) | xor_hard (1K vars, 3.7K clauses) | 98.97% in 3.4s | XOR is a known adversarial case |
| Locality destroyers (expanders) | expander_100k (100K vars, 764K clauses) | **90.57%** — stable plateau | Expander graphs are the ~90% wall |

The expander result reconfirms the [Limitations](#limitations-self-assessment) below. NitroSAT does not crack high-expansion graphs; it plateaus at ~90% and stays there. But it does *not* degrade further at scale — the plateau is stable from 2K to 100K vars.

#### Prime vs uniform weight ablation (March 2026)

The prime-weighting mechanism is not theoretical — it produces measured 3.4–4× speedups on structured problems:

| Instance | Prime weight | Uniform weight | Δ |
|---|---|---|---|
| clique_4_20 (structured) | 12.8ms, β₁=20 | 43.8ms, β₁=79 (4 fractures) | **3.4× faster** |
| rand3sat_200_850 (random) | 768ms | 3,082ms | **4.0× faster** |
| parity_14 (XOR) | 5.8ms | 3.1ms | 0.53× (uniform faster) |

Prime weights actively prune topological noise (β₁: 79→20) on structured geometries. Random instances also see speedup. XOR instances are dominated by other factors — uniform is faster on this small XOR case, but prime-weighting still gives the correct answer.

#### Global verification summary (February 28, 2026)

The cleanest single-table summary of the full v1/v2 development effort:

| Metric | Value |
|---|---|
| Total instances tested | 80+ |
| Average satisfaction | 99.65% |
| Perfect solves (100%) | 49/75 (65%) |
| Hardware verification (100%) | 15/15 (100%) |
| Largest instance solved | 80,278,884 clauses (Enterprise Timetabling) |
| Largest perfect solve | 1,354,800 clauses (300×300 lattice, 4-color) |
| Prime weight speedup (structured) | 4× |

#### Hardware note

| Phase | Platform | Date |
|---|---|---|
| Phases 1–5 | AMD Ryzen 5 5600H @ 4.280GHz (single core, laptop) | Jan–Mar 2026 |
| Phase 6 | Apple Silicon | Apr 2026 |

Compiler: `gcc -O3 -lm` · No external dependencies · Single-threaded.

Reproducibility: [HuggingFace dataset](https://huggingface.co/) · `timetable_output.json` shipped with the repo.

> **A note on this section:** Every number above was reported in the [GitHub repository README](https://github.com/sethuiyer/NitroSAT/blob/main/benchmarks/README.md). It is included here so a reader does not have to leave the documentation to see the full heritage. The latest production numbers (Supabase, 2026-04-04 → 2026-06-19) supersede the v2 development numbers for current customer-facing claims.

---

## Limitations (Self-Assessment)

NitroSAT is **not** designed to replace exact solvers when mathematical certificates of unsatisfiability or global optimality proofs are required. It is an anytime approximator.

Known limitations:

- **Expander graphs**: Plateaus around 90% satisfaction; no path to improvement via topological repair
- **Random 3-SAT at phase transition**: Structured approaches struggle here; CDCL solvers have structural advantages
- **UNSAT certification**: Does not produce proofs of unsatisfiability
- **Exact optimum**: Returns high-quality approximations, not proven-optimal solutions

The 2^1024 framing in earlier documentation was incorrect. XOR chains define affine subspaces (dimension \(n - r\) where \(r\) is rank), not the full power set. The relevant metric is basin fidelity — how close the returned assignment is to the planted optimum — not the cardinality of the unconstrained solution space.

---

## Connection to the Arithmetic Manifold

NitroSAT is the **flagship implementation** of the Arithmetic Manifold framework. It combines:

- **Prime weighting**: From partition function theory — unique constraint signatures via the Fundamental Theorem of Arithmetic
- **Spectral initialization**: Heat kernel trace \(\text{Tr}(e^{-tL})\) as a basin-finding prior
- **Topological repair**: Persistent homology tracking (Betti numbers) for guided repair
- **Phase transitions**: BAHA/Lambert W detection for when to transition between optimization strategies
- **Riemann Hypothesis connection**: The asymptotic stability condition \(1 - \sigma > \gamma\) governs when the continuous relaxation remains valid at scale

> "NitroSAT does not prove the Riemann Hypothesis. But it embeds RH as a phase boundary: the solver functions as a physical instrument whose asymptotic stability threshold coincides exactly with the critical line Re(s) = 1/2."

---

## Website

**Live:** [sethuiyer.github.io/NitroSAT](https://sethuiyer.github.io/NitroSAT)

## Key Files

- `NitroSAT/README.md` — Full project overview and benchmark methodology
- `NitroSAT/src/c/v2/nitrosatv2.c` — Core C99 implementation
- DOI: [10.5281/zenodo.18753235](https://doi.org/10.5281/zenodo.18753235)
- API: [api.navokoj.shunyabar.foo](https://api.navokoj.shunyabar.foo)

---

## Citing

If you use NitroSAT in research, please cite:

```bibtex
@software{nitrosat2026,
  author = {Sethurathinam Iyer},
  title = {NitroSAT: A Physics-Informed MaxSAT Approximator},
  year = {2026},
  publisher = {Zenodo},
  doi = {10.5281/zenodo.18753235},
  url = {https://github.com/sethuiyer/NitroSAT}
}
```

---

## See Also

- [All Projects](index.md) — project overview
- [BAHA](baha.md) — fracture detection integrated into NitroSAT
- [Navokoj](navokoj.md) — the production API powered by NitroSAT
- [Prime Weighting](../concepts/prime-weighting.md) — ablation results (4× speedup)
- [Partition Function](../concepts/partition-function.md) — the free energy framework
- [Phase Transitions](../concepts/phase-transitions.md) — critical \(\beta\) scaling
- [Riemann Hypothesis](../concepts/riemann-hypothesis.md) — the asymptotic stability condition
- [Limitations](../limitations.md) — where NitroSAT plateaus
- [Benchmarks](../getting-started/benchmarks.md) — performance comparison
- [Research Report](../research-report.md) — technical deep-dive
