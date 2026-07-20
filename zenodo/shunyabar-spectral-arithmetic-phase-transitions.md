# ShunyaBar: Spectral–Arithmetic Phase Transitions for Combinatorial Optimization

**Record type:** Preprint (software + paper bundle) — published v2, December 31, 2025
**DOI:** [10.5281/zenodo.18214172](https://doi.org/10.5281/zenodo.18214172)
**Record URL:** [https://zenodo.org/records/18214172](https://zenodo.org/records/18214172)
**All-versions DOI:** [10.5281/zenodo.18096757](https://doi.org/10.5281/zenodo.18096757)
**License:** [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/)
**Authors / Creators:** Sethurathienam Iyer ([ORCID: 0009-0008-5446-2856](https://orcid.org/0009-0008-5446-2856))

---

## Description

**ShunyaBar: Differentiable Combinatorial Optimization using Arithmetic Symmetry Breaking.**

ShunyaBar is a dynamical optimization framework grounded in non-commutative geometry and quantum statistical mechanics. The system is formalized as a **spectral triple** encoding the arithmetic and geometric structure of the SAT phase space.

The associated partition function factorizes over the adèlic ring as:

\[
Z(\beta) \;=\; \zeta(\beta) \cdot \mathrm{Tr}\!\left(e^{-\beta L}\right)
\]

where \(\zeta(\beta)\) is the Riemann zeta function and \(L\) is the constraint graph Laplacian.

### Core Mechanism

We prove that the corresponding Kubo–Martin–Schwinger (KMS) states undergo a phase transition at inverse temperature \(\beta = 1\), exhibiting full one-step Replica Symmetry Breaking (1-RSB). Applied to combinatorial optimization — such as random 3-SAT near the critical density — a quasi-static Renormalization Group (RG) sweep across \(\beta = 1\) produces dramatic speedups. These are bounded only by the Quantum Adiabatic Theorem, rather than by exponential search.

### Method Summary

ShunyaBar does **not** perform combinatorial search. Instead, it:

1. **Continuously relaxes** Boolean constraints into a global dynamical system.
2. **Destroys illegal regions** of state space by making them energetically unstable.
3. **Forces a phase transition** via an arithmetic singularity at \(\beta = 1\).
4. **Freezes into a discrete Boolean assignment** once full satisfaction is achieved.
5. **Terminates immediately** upon reaching 100% satisfaction (no repair phase).

This approach replaces backtracking and clause learning with **global consistency enforcement**.

- **Blog Post:** [theory.shunyabar.foo](https://theory.shunyabar.foo/)
- **Live API:** [navokoj.shunyabar.foo](https://navokoj.shunyabar.foo/)

---

## Performance & Industrial Benchmarks

### SAT 2024 Industrial Track

Navokoj (the implementation of ShunyaBar) achieved a **92.57% perfect solution rate** on the SAT 2024 industrial benchmarks (4,199 problems), tested across three engines:

| Engine | Perfect Rate | Speed | Quality | Use Case |
|---|---|---|---|---|
| **PRO** | 92.57% | 7.9/sec | 99.92% | Mission-critical |
| **MINI** | 31.37% | 10.6/sec | 99.55% | Balanced |
| **NANO** | 3.24% | 12/sec | 96.41% | Real-time |

### Case Study 1: 129-SAT (Ultra-High-k Regime)

- **Problem:** \(k = 129\) SAT, \(\alpha = 1000\times\) over-constrained.
- **Challenge:** Locality is destroyed; CDCL search is ineffective as clause learning loses meaning.
- **Result:** **100% satisfaction** (0/1M violated) in ~9–10 minutes on a single H100 GPU.

### Case Study 2: Ramsey R(5,5,5) at N = 52

- **Problem:** Construct a 3-edge-coloring of \(K_{52}\) with no monochromatic subgraphs.
- **Search space:** \(\approx 3^{\binom{52}{2}} \approx 3^{1326}\).
- **Result:** Perfect 3-coloring found in ~17 minutes. This constitutes a constructive lower bound for \(R(5,5,5)\).

---

## Comparison: ShunyaBar vs. NVIDIA TurboSAT

| Aspect | NVIDIA TurboSAT | ShunyaBar |
|---|---|---|
| **Core approach** | Gradient-guided search + CDCL | Pure continuous dynamics |
| **Uses CDCL** | Yes (CPU side) | No |
| **Repair phase** | Required | None |
| **Handles High-k** | Not targeted | Native |
| **Proof output** | CDCL certificates | Boolean witness + verifier |

While TurboSAT offloads exploration to GPUs to accelerate classical SAT, ShunyaBar eliminates search entirely, operating in regimes where CDCL ceases to be meaningful.

---

## Verification & Reproducibility

| Instance | Type | Size | Satisfaction Rate | Status |
|---|---|---|---|---|
| `129sat_n200` | 129-SAT | 1,000,000 clauses | 100.00% | Verified |
| `pyth_n5000` | Pythagorean | 5,000 | 100.00% | Verified |
| `ramsey_n52` | Ramsey | \(K_{52}\) | 100.00% | Verified |
| `3sat_100k` | 3-SAT | 100,000 | 94.90% | Partial |

To verify these results independently:

```bash
python3 verify_reproducibility.py
```

This script scans the `results/` directory, regenerates instances using deterministic generators, and verifies all assignments.

**ShunyaBar replaces combinatorial search with arithmetic-spectral phase transitions, enforcing global consistency to produce verifiable witnesses in regimes where classical solvers fail.**

---

## Abstract

This record contains the paper, datasets, solver outputs, and verification artifacts accompanying ShunyaBar, a spectral–arithmetic dynamical system for combinatorial optimization.

We introduce a non-commutative spectral triple whose partition function factorizes as \(\zeta(\beta) \cdot \mathrm{Tr}(e^{-\beta L})\), exhibiting a phase transition at \(\beta = 1\). This phase transition enables **global consistency enforcement without combinatorial search**.

Included are fully verifiable witnesses for large-scale SAT instances (including 129-SAT with 1,000,000 clauses), Ramsey R(5,5,5) constructions, reversible pebbling benchmarks, and independent verification scripts. All claims are reproducible from the attached artifacts.

---

## Files in the Archive

| File | Size | MD5 |
|---|---|---|
| `arithmetic_symmentry_breaking.zip` | 193.3 MB | `647faf9a05a9bd14591e6317f0862fdd` |

**Total:** 193.3 MB across 1 file.

---

## Citation

### BibTeX

```bibtex
@article{ShunyaBarSpectralArithmetic2025,
  author    = {Iyer, Sethu},
  title     = {{ShunyaBar: Spectral--Arithmetic Phase Transitions for Combinatorial Optimization}},
  year      = {2025},
  publisher = {Zenodo},
  version   = {v2},
  doi       = {10.5281/zenodo.18214172},
  url       = {https://doi.org/10.5281/zenodo.18214172},
  license   = {CC-BY-4.0}
}
```

### APA

> Sethurathienam Iyer. (2025). *ShunyaBar: Spectral–Arithmetic Phase Transitions for Combinatorial Optimization* (Version v2). Zenodo. https://doi.org/10.5281/zenodo.18214172

---

## Versions

| Version | DOI | Date |
|---|---|---|
| v2 | [10.5281/zenodo.18214172](https://doi.org/10.5281/zenodo.18214172) | Dec 31, 2025 |
| v1 | [10.5281/zenodo.18096758](https://doi.org/10.5281/zenodo.18096758) | Dec 30, 2025 |

**Cite-all DOI** (always resolves to latest): [10.5281/zenodo.18096757](https://doi.org/10.5281/zenodo.18096757)

---

## Indexed In

- **OpenAIRE**
- **Zenodo** (publisher)
- **CERN Data Centre** (infrastructure)

**Keywords:** Boolean Satisfiability

---

## Metadata

| Field | Value |
|---|---|
| Resource type | Preprint |
| Publisher | Zenodo |
| Language | English |
| Created | January 11, 2026 |
| Modified | January 13, 2026 |
| License | CC-BY-4.0 |

---

## See Also

- [Zenodo Records](index.md) — all ShunyaBar Labs Zenodo records
- [Navokoj](../projects/navokoj.md) — production solver implementation
- [NitroSAT](../projects/nitrosat.md) — physics-informed MaxSAT engine
- [Partition Function](../concepts/partition-function.md) — ζ(β)·Tr(e^(-βL)) factorization
- [Phase Transitions](../concepts/phase-transitions.md) — β = 1 critical point
- [Papers & Citations](../references/papers.md) — full publication list