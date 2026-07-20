# Emergent Stochasticity from Serialized Concurrency

**A Constructive Theory of Uniform Measure on Interleaving Space.**

**Record type:** Thesis (paper + proofs + executable simulations) — published v2, April 3, 2026
**DOI:** [10.5281/zenodo.19571762](https://doi.org/10.5281/zenodo.19571762)
**Record URL:** [https://zenodo.org/records/19571762](https://zenodo.org/records/19571762)
**All-versions DOI:** [10.5281/zenodo.19564056](https://doi.org/10.5281/zenodo.19564056)
**License:** [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/)
**Authors / Creators:** Sethurathienam Iyer (Researcher) — [ORCID: 0009-0008-5446-2856](https://orcid.org/0009-0008-5446-2856)

---

## Description

This repository contains the **preprint, mathematical proofs, and executable simulations** for a novel physical and computational ontology that **completely reformulates the nature of randomness**.

Rather than treating stochasticity as an axiomatic primitive of the universe, this paper postulates that **uniform randomness is an emergent artifact** — the invariant measure generated when a massively concurrent, deterministic system is forced through a sequential, capacity-limited interface (the **serialization bottleneck**).

- **Talk / Video:** [YouTube](https://www.youtube.com/watch?v=PLZZELJfns)

---

## Key Contributions

### 1. Theoretical Framework

Formulates the **Interleaving Space** representing concurrent tie-blocks of simultaneous events as products of symmetric groups:

\[
\Omega \;=\; \prod_{i} S_{n_i}
\]

Each tie-block is a maximal set of events that occur "simultaneously" in the concurrent system. When forced through a serializing interface, these tie-blocks become **interleavings** — and the space of all possible interleavings is \(\Omega\).

### 2. Formal Proofs

Implements the **Kendall tau distance** and the **Perron-Frobenius theorem** to mathematically prove that minimal-change transport over these tie-blocks induces an **irreducible, aperiodic Markov chain** whose unique invariant measure is **strictly uniform**.

The mixing time bounds are exponential in the size of the tie-block:

\[
t_{\text{mix}} \;\leq\; O(n \log n)
\]

and the total-variation distance between the empirical distribution and the uniform distribution vanishes at exactly the rate predicted by coupling arguments.

### 3. Berry Holonomy

Demonstrates that stochastic shuffling is **geometrically equivalent to the phase shift accumulated over constraint permutations**, proving that the limiting Boltzmann entropy converges exactly to

\[
\lim_{N \to \infty} \frac{S_N}{N} \;=\; \log 2
\]

This is the same entropy as a fair coin — but **derived constructively from a deterministic system**, not postulated axiomatically.

### 4. Algorithm Instantiation (BAHA)

Establishes that **BAHA** (Branch-Aware Holonomy Annealing) — a core module of the [NitroSAT](../projects/nitrosat.md) solver — is a direct, **physical realization of this concurrency theory**. By traversing thermodynamic fractures on NP-hard landscapes using the **Lambert W function**, BAHA achieves **linear-time optimization** in the number of fractures, turning a known exponential bottleneck into a tractable one.

---

## The Central Claim

> Randomness is not fundamental. It is the **invariant measure of a deterministic dynamical system viewed through a serializing interface.**

Concretely:

| Classical view | This paper's view |
|---|---|
| Stochasticity is axiomatic | Stochasticity is emergent |
| Random processes require randomness | Deterministic processes on concurrency space produce uniform measure |
| Entropy is postulated | Entropy is **derived** from constraint-permutation holonomy |
| Mixing time is empirical | Mixing time has a provable bound |

---

## Included Files & Artifacts

| File | Size | MD5 |
|---|---|---|
| `emergent_stochasticity.pdf` | 383.9 kB | `a35c8d114e45a1cdd94c5f10593ea292` |
| `toy_simulation.py` | 30.5 kB | `d9f303e42c8215569cf7f7ca7ea1053c` |
| `emergent_stochasticity_numpy.py` | 27.0 kB | `3e9981da0333c3b105b9b72730e680ec` |

**Total:** 441.4 kB across 3 files.

- **`emergent_stochasticity.pdf`** — The complete academic paper detailing the mathematical proofs, mixing time bounds, and the formal theory.
- **`toy_simulation.py`** — An executable Python environment that successfully validates the emergence of uniform measures (total variation distance → 0) from strictly deterministic, exchangeable constraints.
- **`emergent_stochasticity_numpy.py`** — Vectorized NumPy implementation of the same simulation at scale.

---

## Validation

The paper ships **executable proofs**, not just formal ones. Running `toy_simulation.py` confirms:

- The empirical distribution over tie-block orderings converges to **uniform**.
- The total-variation distance decays as \(O(1/\sqrt{n})\) — exactly as predicted by concentration bounds.
- The Berry holonomy phase shifts reproduce the fair-coin entropy \(\log 2\) in the limit.

---

## License & Attribution

- **License:** Creative Commons Attribution 4.0 International (CC BY 4.0)
- **Author:** Sethurathienam Iyer ([ShunyaBar Labs](https://shunyabar.foo))

---

## Citation

### BibTeX

```bibtex
@article{EmergentStochasticity2026,
  author    = {Iyer, Sethu},
  title     = {{Emergent Stochasticity from Serialized Concurrency: A Constructive Theory of Uniform Measure on Interleaving Space}},
  year      = {2026},
  publisher = {Zenodo},
  version   = {v2},
  doi       = {10.5281/zenodo.19571762},
  url       = {https://doi.org/10.5281/zenodo.19571762},
  license   = {CC-BY-4.0}
}
```

### APA

> Sethurathienam Iyer. (2026). *Emergent Stochasticity from Serialized Concurrency: A Constructive Theory of Uniform Measure on Interleaving Space* (Version v2). Zenodo. https://doi.org/10.5281/zenodo.19571762

---

## Versions

| Version | DOI | Date |
|---|---|---|
| v2 | [10.5281/zenodo.19571762](https://doi.org/10.5281/zenodo.19571762) | Apr 3, 2026 |
| v1 | [10.5281/zenodo.19564057](https://doi.org/10.5281/zenodo.19564057) | Apr 14, 2026 |

**Cite-all DOI** (always resolves to latest): [10.5281/zenodo.19564056](https://doi.org/10.5281/zenodo.19564056)

---

## Indexed In

- **OpenAIRE**
- **Zenodo** (publisher)
- **CERN Data Centre** (infrastructure)

---

## Metadata

| Field | Value |
|---|---|
| Resource type | Thesis |
| Publisher | Zenodo |
| Language | English |
| Created | April 14, 2026 |
| Modified | April 14, 2026 |
| License | CC-BY-4.0 |

---

## See Also

- [Zenodo Records](index.md) — all ShunyaBar Labs Zenodo records
- [Multiplicative Calculus / BAHA](multiplicative-calculus-hardness-detection.md) — the algorithm this theory grounds
- [NitroSAT](nitrosat-physics-informed-maxsat.md) — solver that uses BAHA
- [Riemann Hypothesis](../concepts/riemann-hypothesis.md) — ζ(s) connection to concurrency entropy
- [Papers & Citations](../references/papers.md) — full publication list
- **Talk:** [YouTube](https://www.youtube.com/watch?v=PLZZELJfns)