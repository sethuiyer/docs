# Where Navokoj Works (and Where It Doesn't)

NitroSAT (the engine inside Navokoj) is an anytime MaxSAT approximator. Knowing where it works and where it doesn't is essential for productive use.

> **How to read this page:** If your problem is structured (schedules, grids, hardware verification, large graph partitioning), this engine is a strong fit. If your problem is random or unstructured SAT at the phase transition, use Z3 or Kissat instead. We benchmark against certified optimal solutions and report the gaps honestly.

---

## Where It Works Well

### Structured Industrial Problems

NitroSAT excels on problems with regular geometric or algebraic structure:

| Problem Class | Example | Performance |
|--------------|---------|-------------|
| Hardware verification | 512×512 multiplier, 788K vars | 100% in 5.92s |
| University timetabling | 147K vars, 80M clauses | 100% in 73s |
| Grid / lattice problems | 1000×1000 coloring | 100% in 475s |
| Edwards-Anderson spin glass | 40³, 64K spins | 99.47% in 4.3s |
| Graph coloring (planted) | 105K vars, 232K clauses | 100% in 13.78s |
| XOR / parity chains | Up to 100K vars | 100% when consistent |

**Why**: Regular structures have large spectral gaps and algebraic symmetry. The heat kernel propagates constraint signals efficiently across the geometry.

### Weighted MaxSAT with Structured Clauses

On WCNF instances with certified optima (MSE 2022 benchmarks): **8/10 matched certified optimal** at 7-34ms internal time. Weighted constraints up to 10¹⁸ are handled correctly.

### CDCL Trap Instances

The pitfall formula (Buss & Nordström) is engineered to exploit CDCL weaknesses. NitroSAT solves it via continuous relaxation — no branch commitment means no unit-propagation trap.

---

## Where It Plateaus

### Expander Graphs (The ~90% Wall)

High-expansion graphs are the hardest case for continuous-relaxation methods:

| Instance | Vars | Satisfaction | Time |
|----------|------|-------------|------|
| expander_2k | 2,000 | 92.08% | 1.3s |
| expander_5k | 5,000 | 90.24% | 7.2s |
| expander_20k | 20,000 | 91.56% | 31s |
| expander_50k | 50,000 | 90.61% | 1m 41s |
| expander_100k | 100,000 | 90.57% | 3m 24s |

The plateau is stable from 2K to 100K vars. This is a structural limitation — expander graphs lack the low-dimensional manifold structure that the heat kernel exploits. There is no gradual degradation; the algorithm hits a hard wall at ~90%.

### High-Weight-Ratio MaxSAT

On instances with extreme weight ratios (one clause weight = 10⁶, others = 1), NitroSAT can miss the provable optimum. One MSE 2022 instance returned 1.67B vs certified optimum of 1 — a local optimum trap where the sharp optimum requires finding a specific structural configuration.

**Mitigation**: Use the `mini` engine for high-stakes optimization where every fraction of cost matters.

### Dense Random 3-SAT (α > 10)

At very high density (clauses-per-variable > 10), the constraint landscape becomes globally frustrated. NitroSAT achieves ~92-95% satisfaction on these instances. The gap from 100% is the energy cost of the clustering barrier — consistent with spin glass theory.

> **Production reality check (2026-04-04 → 2026-06-19):** Across 308 real customer runs, the median satisfaction is **exactly 1.0** and **54% of runs are perfect**. This includes high-density instances with clause-to-variable ratios of 49×, 80×, 123×, and 165× — all of which solved perfectly in production. The "92-95% on dense random 3-SAT" claim above describes *unstructured random* density; structured dense workloads behave differently. See the [NitroSAT production ledger](projects/nitrosat.md#production-performance-supabase-ledger-2026-04-04-2026-06-19) for the full data.

### Deep Sequential Arithmetic Chains

Long chains of dependent arithmetic constraints (e.g., ripple-carry adders with >64 bits) can exceed the topological repair's recovery capacity. The continuous relaxation approaches the solution but may not fully converge.

---

## What NitroSAT Is Not

### Not an Exact Solver

NitroSAT does not produce unsatisfiability proofs. It does not return certificates of optimality. It returns high-quality assignments with a satisfaction rate.

- **For UNSAT certification**: Use CDCL solvers (Kissat, CaDiCaL)
- **For optimality proof**: Use exact MaxSAT solvers (MaxHS, Pacose, RC2)
- **For high-quality fast approximation**: Use NitroSAT

### Not a General-Purpose CSP Solver

On dense constraint satisfaction problems (e.g., 9×9 Sudoku with few givens), the `qstate` engine achieves ~95-99% — not a complete solve. CSP problems with tight cardinality constraints are harder than SAT-flavored problems.

### Not a Universal Replacement for CDCL

On random unstructured SAT at the phase transition (α ≈ 4.27), CDCL solvers are strong. NitroSAT's advantage is structured problems, not raw SAT performance.

---

## Engine Selection Guide

| Use Case | Recommended Engine | Expect |
|----------|-------------------|--------|
| Real-time API (< 100ms) | `nano` | ~94% satisfaction |
| Production MaxSAT (balanced) | `nitro` | ~99.4% in < 1s |
| High-stakes optimization | `mini` | ~99.8%, slower |
| Graph coloring, Sudoku | `qstate` | ~95-100% when feasible |
| Hybrid XOR+CNF | `hybrid` | ~98% at scale |
| Pre-solve diagnostics | `diagnostic` | Instant hardness estimate |

---

## The Honest Summary

| Property | Status |
|----------|--------|
| Structured industrial (multipliers, timetabling, grids) | Strong |
| Expander / high-expansion graphs | ~90% plateau |
| CDCL trap instances | Resists |
| Weighted MaxSAT (moderate) | 80% at certified optimal |
| Weighted MaxSAT (extreme ratios) | Can miss optimum |
| UNSAT certification | Not supported |
| Real-time (< 100ms) | Supported via `nano` |

Defining failure modes is not weakness — it's how real optimization systems earn trust. If your problem matches NitroSAT's strengths, you'll get fast, high-quality results. If it doesn't, you'll get an honest degradation, not a silent failure.

---

## See Also

- [NitroSAT Production Ledger](projects/nitrosat.md) — real production data across 308 runs
- [Marketing: Results](marketing/results.md) — benchmark data with honest limits
- [Competition](marketing/competition.md) — comparison with CDCL and exact solvers
- [Benchmarks](getting-started/benchmarks.md) — expander graph plateau data
- [Glossary](glossary.md) — engine terminology
- [Design Philosophy](design-philosophy.md) — why we publish failure modes openly
