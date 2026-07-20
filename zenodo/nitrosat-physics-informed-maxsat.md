# NitroSAT: A Physics-Informed MaxSAT Solver

**Using Heat Kernel Diffusion, Persistent Homology, and Branch-Aware Holonomy Annealing.**

**Record type:** Software (with paper + benchmarks) — published v1, February 24, 2026
**DOI:** [10.5281/zenodo.18753235](https://doi.org/10.5281/zenodo.18753235)
**Record URL:** [https://zenodo.org/records/18753235](https://zenodo.org/records/18753235)
**All-versions DOI:** [10.5281/zenodo.18753234](https://doi.org/10.5281/zenodo.18753234)
**License:** Apache License 2.0
**Authors / Creators:** Sethurathienam Iyer (Researcher) — [ORCID: 0009-0008-5446-2856](https://orcid.org/0009-0008-5446-2856)

---

## Description

NitroSAT is a novel **MaxSAT solver** that treats constraint satisfaction as a **physical dynamical system on a clause hypergraph**. It integrates four physics-inspired modules:

1. **Heat kernel gradient smoothing** via a degree-weighted multiplier \(\mu_i\) to prevent local-minima trapping.
2. **Persistent homology** (Betti numbers \(\beta_1\)) for explicit symmetry detection and breaking.
3. **Zeta-guided resonance injection** using prime harmonics and the golden ratio to escape phase-transition barriers.
4. **Branch-Aware Holonomy Annealing (BAHA)** using **Lambert-W branch enumeration** for thermodynamic phase detection.

Evaluated on **358 benchmark instances across 19 problem types** (graph coloring, Ramsey numbers, scheduling, quasigroup completion, N-Queens, XOR-SAT, pigeonhole, mutilated chessboard, and more), NitroSAT achieves **99.58% average clause satisfaction**, with **perfect solutions (100%) on instances containing up to 354,890 clauses**.

- **Live site:** [sethuiyer.github.io/NitroSAT](https://sethuiyer.github.io/NitroSAT/)
- **Demo video:** [YouTube — NitroSAT walkthrough](https://www.youtube.com/watch?v=aJhBIv3EFAM&t=10s)
- **Implementation:** [codeberg.org/sethuiyer/NitroSAT](https://codeberg.org/sethuiyer/NitroSAT)
- **BAHA module:** [github.com/sethuiyer/baha](https://github.com/sethuiyer/baha)

---

## Performance at a Glance

Performance at the random 3-SAT phase transition (ratio ≈ 4.26) is **scale-invariant**: variance **decreases** from n = 300 to n = 1000 across 80 instances. Permutation invariance is confirmed with **0.0000% standard deviation** across 20 variable renumberings.

### Results Sheet

| Category | What it shows |
|---|---|
| **Scheduling** | 6 job-scheduling instances, 100% on all SAT, 99.99% on the UNSAT 1000-job case |
| **Planted List Coloring** | 4/4 perfect — 50 to 1000 vertices, spectral init nails the planted solution |
| **CNFgen Benchmarks** | Parity, Counting, Matching, Van der Waerden — all 100%. Tiling 99.1%, Subset Cardinality 95.7% |
| **Hard Instances** | `cliquecol` 354K clauses @ **100% (5/5 seeds)**, sudoku 99.92–99.98%, extreme_numerical 95.69% |
| **Novel Problems (Zero Tuning)** | N-Queens 25 → **100%**, Exact Cover → **100%**, Planted 3-SAT → **100%**, Hamiltonian Cycle → 99.99% |
| **Phase Transition (3-SAT)** | 80/80 above 99%. **Variance SHRINKS from n=300 to n=1000.** That's the insane part. |
| **Permutation Invariance** | 20/20 perfect, **0.0000% standard deviation.** Completely encoding-agnostic. |
| **XOR-SAT Stress Test** | XOR SAT → 100%, ≈ 98 cycles detected. The physics is real. |
| **UNSAT Awareness** | PHP-19 correct plateau at 99.97%, Mirage trap detected, Mutilated Chessboard parity quantified |
| **Scaling & Resources** | Edge: 0.25ms/step, < 1MB. Titan: 906ms/step, 444MB |
| **Category Highlights** | 358 instances across 19 types, Dominating Set 26/27 perfect, 354K-clause clique in 46s |

---

## Architecture: The Four Physics-Inspired Modules

### 1. Heat Kernel Gradient Smoothing

A degree-weighted multiplier \(\mu_i\) controls the diffusion timescale per clause. The heat kernel smooths the energy landscape locally so the gradient descent cannot get trapped in shallow minima that would defeat classical local search.

\[
\mu_i \;\propto\; \frac{1}{\sqrt{\deg(v_i)}}
\]

### 2. Persistent Homology Symmetry Breaking

Betti numbers \(\beta_1\) identify topological loops in the constraint hypergraph — these correspond to **symmetries** the solver must break. NitroSAT explicitly detects and breaks them, avoiding wasted exploration of equivalent states.

### 3. Zeta-Guided Resonance Injection

Prime harmonics derived from the Riemann zeta function inject energy at carefully chosen frequencies to **escape phase-transition barriers**. The golden ratio provides the irrational driving signal that prevents resonance locking.

### 4. Branch-Aware Holonomy Annealing (BAHA)

At each phase transition, the control parameter \(\beta\) jumps to a new analytic sheet of the Lambert W function. Standard annealers get stuck on the original sheet. BAHA detects the sheet change and continues on the new branch — turning exponential blow-up at fractures into **linear-in-fractures** complexity.

---

## Validation Methodology

NitroSAT's validation is unusually thorough for an academic solver:

- **358 instances** spanning 19 problem categories.
- **3 hard regimes**: random 3-SAT phase transition, planted list coloring, mutilated chessboard parity.
- **Permutation invariance**: 20 random variable relabelings → **0.0000% standard deviation** in satisfaction rate.
- **UNSAT awareness**: PHP-19 correctly plateaus at 99.97%, Mirage trap explicitly detected.
- **Scale-invariance**: variance **shrinks** from n=300 to n=1000 across 80 phase-transition instances.

---

## Abstract

This record contains the **Lua solver implementation, full benchmark suite (358 instances), result spreadsheets, and the accompanying paper PDF** for NitroSAT — a MaxSAT solver that fuses heat-kernel diffusion, persistent homology, zeta-guided resonance injection, and BAHA. Across 358 instances NitroSAT achieves 99.58% average clause satisfaction, with perfect satisfaction on instances up to 354,890 clauses. Scale-invariance at the 3-SAT phase transition and exact permutation invariance (0.0000% std) confirm that the physics, not tuning, drives the result. The repository is published under Apache 2.0; the paper may be freely read and cited with attribution.

---

## Files in the Archive

| File | Size | MD5 |
|---|---|---|
| `NitroSAT.zip` | 55.0 MB | `2d214f741d8cb14277e279ac21e7fa20` |

**Total:** 55.0 MB across 1 file.

---

## Citation

### BibTeX

```bibtex
@software{NitroSAT2026,
  author       = {Iyer, Sethu},
  title        = {{NitroSAT: A Physics-Informed MaxSAT Solver Using Heat Kernel Diffusion, Persistent Homology, and Branch-Aware Holonomy Annealing}},
  year         = {2026},
  publisher    = {Zenodo},
  version      = {v1},
  doi          = {10.5281/zenodo.18753235},
  url          = {https://doi.org/10.5281/zenodo.18753235},
  license      = {Apache-2.0}
}
```

### APA

> Sethurathienam Iyer. (2026). *NitroSAT: A Physics-Informed MaxSAT Solver Using Heat Kernel Diffusion, Persistent Homology, and Branch-Aware Holonomy Annealing* (Version v1). Zenodo. https://doi.org/10.5281/zenodo.18753235

---

## Versions

| Version | DOI | Date |
|---|---|---|
| v1 | [10.5281/zenodo.18753235](https://doi.org/10.5281/zenodo.18753235) | Feb 24, 2026 |

**Cite-all DOI** (always resolves to latest): [10.5281/zenodo.18753234](https://doi.org/10.5281/zenodo.18753234)

---

## Archived In

- **Software Heritage:** [`swh:1:dir:d08862e30bac04228084cf7173c8be05f53300d4`](https://www.softwareheritage.org/)
- **OpenAIRE**
- **Zenodo** (publisher)
- **CERN Data Centre** (infrastructure)

**Keywords:** MaxSAT · physics-inspired optimization

---

## Metadata

| Field | Value |
|---|---|
| Resource type | Software |
| Publisher | Zenodo |
| Language | English |
| Submitted | February 24, 2026 |
| Created | February 24, 2026 |
| Modified | February 24, 2026 |
| Programming language | Lua |
| Development status | Active |
| License | Apache License 2.0 |
| Copyright | Copyright 2026 Sethu Iyer |

---

## See Also

- [Zenodo Records](index.md) — all ShunyaBar Labs Zenodo records
- [NitroSAT project](../projects/nitrosat.md) — implementation walkthrough
- [BAHA / Multiplicative Calculus](multiplicative-calculus-hardness-detection.md) — branch-aware annealer Zenodo record
- [Phase Transitions](../concepts/phase-transitions.md) — fracture theory underpinning BAHA
- [Persistent Homology](https://en.wikipedia.org/wiki/Persistent_homology) — Betti-1 symmetry breaking
- [Papers & Citations](../references/papers.md) — full publication list
- **Live site:** [sethuiyer.github.io/NitroSAT](https://sethuiyer.github.io/NitroSAT/)
- **Demo video:** [YouTube](https://www.youtube.com/watch?v=aJhBIv3EFAM&t=10s)