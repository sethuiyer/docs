# Multiplicative Calculus for Hardness Detection and Branch-Aware Optimization

**Record type:** Working paper (with code) — published v1, January 26, 2026
**DOI:** [10.5281/zenodo.18373732](https://doi.org/10.5281/zenodo.18373732)
**Record URL:** [https://zenodo.org/records/18373732](https://zenodo.org/records/18373732)
**All-versions DOI:** [10.5281/zenodo.18373730](https://doi.org/10.5281/zenodo.18373730)
**License:** [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/)
**Authors / Creators:** Sethurathienam Iyer ([ORCID: 0009-0008-5446-2856](https://orcid.org/0009-0008-5446-2856))

---

## Description

**A Computational Framework for Detecting Phase Transitions via Non-Integrable Log-Derivatives.**

We present a novel computational framework that characterizes algorithmic hardness through the lens of **multiplicative calculus**.

Unlike classical additive calculus, where derivatives measure smooth local change, multiplicative calculus monitors the **log-derivative of partition functions** and detects fractures.

**Fractures** are the points where the integral of \(|Z'/Z|\) diverges. At these fractures, standard optimization methods fail because the control parameter lives on a **multi-sheeted analytic surface**. We introduce a **branch-aware optimizer** that uses the **Lambert W function** to navigate between sheets, reducing complexity from **exponential to linear** in the number of fractures.

We demonstrate this framework on:

- **Spin glass models**
- **Synthetic game trees**
- **Neural network-guided game search**
- **Traveling Salesman Problem (TSP)**

Showing that fracture detection reliably identifies phase transitions and enables principled pruning of search spaces.

- **GitHub:** [github.com/sethuiyer/baha](https://github.com/sethuiyer/baha)
- **Live site:** [sethuiyer.github.io/baha](https://sethuiyer.github.io/baha/)

---

## Core Contributions

### 1. Multiplicative Calculus as a Diagnostic

The log-derivative \(Z'/Z\) acts as a **complexity seismograph**. Where additive derivatives vanish (extrema) the system is calm; where \(|Z'/Z|\) diverges, the optimization landscape **fractures**. The integral

\[
\mathcal{F} \;=\; \int_{\beta_a}^{\beta_b} \left| \frac{Z'(\beta)}{Z(\beta)} \right|\, d\beta
\]

diverges precisely at phase transitions.

### 2. Lambert W Branch-Aware Navigation

When the control parameter \(\beta\) crosses a fracture, the system jumps to a new analytic sheet of the multi-valued Lambert W function. Standard optimizers get stuck on the original sheet. **BAHA** detects the sheet change and continues optimization on the new branch — recovering a linear-in-fractures complexity profile.

### 3. Cross-Domain Validation

| Domain | What we measure | What we show |
|---|---|---|
| Spin glass models | Energy fracture density | Linear scaling in number of fractures |
| Synthetic game trees | Branch-point count | Principle pruning reduces search tree depth |
| Neural-guided game search | Log-derivative divergence | Pruning enabled by fracture detection |
| Traveling Salesman Problem | Lambert W sheet crossings | Phase-transition-aware search beats classical heuristics |

---

## Repository

The accompanying code is available at [github.com/sethuiyer/baha](https://github.com/sethuiyer/baha).

- **Version:** 1.0.0
- **Languages:** Python, Lua
- **Type:** Research paper + reference implementation

---

## Keywords

`multiplicative calculus` · `algorithmic hardness` · `phase transitions` · `optimization` · `Lambert-W function` · `fractals` · `computational complexity`

---

## Abstract

This working paper introduces **BAHA** — Branch-Aware Holonomy Annealing — a computational framework for hardness detection and branch-aware optimization grounded in multiplicative calculus. The framework treats phase transitions as **analytic fractures** of the partition function \(Z(\beta)\) and exploits the **Lambert W function** to navigate multi-sheeted control surfaces. Across spin-glass benchmarks, synthetic game trees, NN-guided game search, and TSP, the framework reliably identifies phase transitions and enables principled, fracture-aware pruning of the search space. The reference implementation in Python and Lua is attached.

---

## Files in the Archive

| File | Size | MD5 |
|---|---|---|
| `research_paper.zip` | 2.2 MB | `0e8e7c2520ffb8ad222a5b1eb9fda6ff` |

**Total:** 2.2 MB across 1 file.

---

## Citation

### BibTeX

```bibtex
@article{MultiplicativeCalculusBAHA2026,
  author    = {Iyer, Sethu},
  title     = {{Multiplicative Calculus for Hardness Detection and Branch-Aware Optimization: A Computational Framework for Detecting Phase Transitions via Non-Integrable Log-Derivatives}},
  year      = {2026},
  publisher = {Zenodo},
  version   = {v1},
  doi       = {10.5281/zenodo.18373732},
  url       = {https://doi.org/10.5281/zenodo.18373732},
  license   = {CC-BY-4.0}
}
```

### APA

> Sethurathienam Iyer. (2026). *Multiplicative Calculus for Hardness Detection and Branch-Aware Optimization: A Computational Framework for Detecting Phase Transitions via Non-Integrable Log-Derivatives* (Version v1). Zenodo. https://doi.org/10.5281/zenodo.18373732

---

## Versions

| Version | DOI | Date |
|---|---|---|
| v1 | [10.5281/zenodo.18373732](https://doi.org/10.5281/zenodo.18373732) | Jan 26, 2026 |

**Cite-all DOI** (always resolves to latest): [10.5281/zenodo.18373730](https://doi.org/10.5281/zenodo.18373730)

---

## Indexed In

- **OpenAIRE**
- **Zenodo** (publisher)
- **CERN Data Centre** (infrastructure)

---

## Metadata

| Field | Value |
|---|---|
| Resource type | Working paper |
| Publisher | Zenodo |
| Language | English |
| Created | January 26, 2026 |
| Modified | January 27, 2026 |
| License | CC-BY-4.0 |

---

## See Also

- [Zenodo Records](index.md) — all ShunyaBar Labs Zenodo records
- [BAHA project](../projects/baha.md) — implementation walkthrough
- [Phase Transitions](../concepts/phase-transitions.md) — log-derivative fracture theory
- [Riemann Hypothesis](../concepts/riemann-hypothesis.md) — ζ(β) log-derivative connection
- [Papers & Citations](../references/papers.md) — full publication list
- **Live site:** [sethuiyer.github.io/baha](https://sethuiyer.github.io/baha/)