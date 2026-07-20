# Solving SAT with Quantum Vacuum Dynamics

**Casimir-effect navigation of the Boolean satisfiability landscape.**

**Record type:** Proposal (paper + interactive site) — published v1, October 20, 2025
**DOI:** [10.5281/zenodo.17394165](https://doi.org/10.5281/zenodo.17394165)
**Record URL:** [https://zenodo.org/records/17394165](https://zenodo.org/records/17394165)
**All-versions DOI:** [10.5281/zenodo.17394164](https://doi.org/10.5281/zenodo.17394164)
**License:** [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/)
**Authors / Creators:** Sethurathienam Iyer — [ORCID: 0009-0008-5446-2856](https://orcid.org/0009-0008-5446-2856)

---

## Description

A radical reimagining of SAT solving through the lens of **quantum vacuum fluctuations** and the **Casimir effect**. We explore how partial variable assignments can be treated as **physical microstates** in an energy landscape, with "almost-satisfying" configurations experiencing attractive **Casimir-like forces** that cause coagulation into stable solution clusters.

It's a new way of thinking about computation as a physical process. The integration of quantum vacuum dynamics into Boolean logic is as imaginative as it is rigorous. With minor theoretical tightening and hybridization for structured problems, **this could become a foundational approach in the next generation of constraint-solving algorithms.**

- **Live site:** [sethuiyer.github.io/casimir-sat-solver](https://sethuiyer.github.io/casimir-sat-solver/)
- **Implementation:** [github.com/sethuiyer/casimir-sat-solver](https://github.com/sethuiyer/casimir-sat-solver)

---

## Core Idea

In the Casimir effect, two uncharged conducting plates in a vacuum attract each other because the quantum vacuum between them has fewer modes than the vacuum outside. Energy gradients create real forces.

In SAT, partial assignments live in a high-dimensional Boolean space. Most of that space is energetically hostile — clauses unsatisfied, contradictions everywhere. But **near-satisfying** configurations are like the vacuum between plates: lower-energy, attractive to other near-satisfying configurations.

The Casimir SAT Solver treats this **as a real physical force**:

1. **Encode** each partial assignment as a microstate with a Casimir-style potential.
2. **Detect** near-satisfying clusters where the Casimir force is strong.
3. **Coagulate** neighboring near-satisfying configurations toward a stable fixed point.
4. **Certify** the fixed point as a satisfying assignment (or fall back to CDCL if needed).

---

## Why This Matters

Classical SAT solvers navigate Boolean space through **discrete search** — DPLL backtracking, CDCL clause learning, local-search flips. Each move is a logical event, not a physical one.

The Casimir view reframes the search as **physics**: the energy landscape *itself* contains gradient information that pulls near-satisfying configurations together. The solver no longer searches — it lets the dynamics run, and the dynamics finds the solution cluster.

This is particularly powerful for:

- **Structured SAT instances** where clause learning loses meaning.
- **High-k SAT** (k ≫ 3) where local minima dominate.
- **Smoothed complexity** regimes where the landscape has continuous structure.

---

## The Casimir-Force Analogy

In the physical Casimir effect, the force per unit area between two perfectly conducting plates separated by distance \(a\) is:

\[
F_{\text{Casimir}} \;=\; -\frac{\pi^2 \hbar c}{240\, a^4}
\]

The \(1/a^4\) scaling — exponential sensitivity to separation — is what makes the effect real and measurable. In the Casimir SAT Solver, "separation" between partial assignments is measured in Hamming distance, and the analogous inverse-power scaling creates **strong attraction between similar near-satisfying configurations**.

The result: a solver that **doesn't search** but instead lets Casimir-like forces assemble satisfying assignments from nearby microstates.

---

## Files in the Archive

| File | Size | MD5 |
|---|---|---|
| `index.html` | 1.5 MB | `c12a30690840ca5c6dcc9c8c46a560bb` |
| `LICENSE` | 17.9 kB | `a9f6b92abe21bdeb9ee26542305faf9c` |
| `blog.css` | 17.3 kB | `0f122c1b8f5bbde29df0b61918aaf599` |
| `CITATION.bib` | 2.3 kB | `ccd27db9a875eff2cdfabf1c0b16225b` |
| `CITATION.cff` | 1.3 kB | `70c494db31f5064d2b13b8c9efa70e63` |
| `README.md` | 1.1 kB | `2e43abc26e399643be82e42216398365` |

**Total:** 1.5 MB across 6 files.

---

## Citation

### BibTeX

```bibtex
@article{CasimirSAT2025,
  author    = {Iyer, Sethurathienam},
  title     = {{Solving SAT with Quantum Vacuum Dynamics}},
  year      = {2025},
  publisher = {Zenodo},
  version   = {1},
  doi       = {10.5281/zenodo.17394165},
  url       = {https://doi.org/10.5281/zenodo.17394165},
  license   = {CC-BY-4.0}
}
```

### APA

> Sethurathienam, I. (2025). *Solving SAT with Quantum Vacuum Dynamics* (Version 1). Zenodo. https://doi.org/10.5281/zenodo.17394165

---

## Versions

| Version | DOI | Date |
|---|---|---|
| v1 | [10.5281/zenodo.17394165](https://doi.org/10.5281/zenodo.17394165) | Oct 20, 2025 |

**Cite-all DOI** (always resolves to latest): [10.5281/zenodo.17394164](https://doi.org/10.5281/zenodo.17394164)

---

## Indexed In

- **OpenAIRE**
- **Zenodo** (publisher)
- **CERN Data Centre** (infrastructure)

**Keywords:** SAT · quantum vacuum dynamics · Casimir effect

---

## Metadata

| Field | Value |
|---|---|
| Resource type | Proposal |
| Publisher | Zenodo |
| Language | English |
| Created | October 20, 2025 |
| Modified | October 20, 2025 |
| License | CC-BY-4.0 |

---

## See Also

- [Zenodo Records](index.md) — all ShunyaBar Labs Zenodo records
- [Casimir SAT Solver project](../projects/casimir-sat-solver.md) — implementation walkthrough
- [Spectral-Multiplicative Framework](spectral-multiplicative-framework.md) — heat-kernel cousin
- [Partition Function](../concepts/partition-function.md) — energy landscape Z(β)
- [Phase Transitions](../concepts/phase-transitions.md) — where Casimir forces matter
- [Papers & Citations](../references/papers.md) — full publication list
- **Live site:** [sethuiyer.github.io/casimir-sat-solver](https://sethuiyer.github.io/casimir-sat-solver/)