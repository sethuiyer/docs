# Novelty Geometry

## What It Solves

A process that keeps producing states does not, by itself, tell you how novelty accumulates, how two histories should be compared, or what an observer with finite information can know about the whole process. *The Geometry of Endless Discovery* gives "there is always something new" a concrete mathematical shape.

## Key Innovation

**Resolution-depth ordered-discovery completion.** The central move is to replace *elapsed-time depth* by *resolution depth*: at every spatial scale, record the order in which new regions are first discovered. Compatible records across all scales form an inverse limit carrying a natural ultrametric.

> **Main result:** metric completion of ordered novelty = inverse-limit completion = hyperbolic boundary.

### The construction

- A traversal becomes a **ray in a prefix tree**; the tree boundary records complete infinite histories.
- Finite alphabets produce compact Cantor-like boundaries; countably infinite alphabets produce noncompact Baire space.
- The **ordered novelty word** `D_j(L)` lists partition cells in the order they are first encountered at resolution `j` — dwell and revisits disappear, first-discovery order remains.
- Under the finite-profile extension property, the compatible discovery words are *literally* the metric completion of realizable ordered-novelty profiles **and** the boundary of an explicit locally finite Gromov-hyperbolic tree.

### Minimal online novelty memory

Minimal online novelty memory is characterized by a **Myhill–Nerode future-equivalence quotient** — the same quotient that organizes [Behavioral Quotients](behavioral-quotients.md). This is where the geometry meets the operating constraint.

### What is standard, stated plainly

Most of the underlying machinery is classical: Poincaré recurrence, profinite and Gromov boundaries, Kolmogorov ε-entropy and capacity, p-adic prefix completion, Fisher/Nerode equivalence. The paper says so, and claims only the resolution-depth ordered-discovery completion as its central construction.

## Architecture

```
Novelty Geometry
├── Traversal space
│   ├── Prefix tree  K^{<ω}
│   └── Boundary: complete infinite histories
├── Ordered novelty
│   ├── D_j(L): first-encounter order at resolution j
│   └── Compatible discovery words → inverse limit
├── Completions (equal)
│   ├── Metric completion of ordered novelty
│   ├── Inverse-limit completion
│   └── Gromov-hyperbolic boundary
└── Memory
    └── Minimal online novelty memory (Myhill–Nerode quotient)
```

## Website

**Zenodo DOI:** [10.5281/zenodo.22058736](https://doi.org/10.5281/zenodo.22058736)
**Live:** [sethuiyer.github.io/novelty-geometry](https://sethuiyer.github.io/novelty-geometry/) — includes a glossary, a companion note on [boundary-object machines](https://github.com/sethuiyer/novelty-geometry/blob/main/boundary-machine.md), and an audio lecture.

## Connection to Core Vision

Novelty Geometry is the **geometry underneath the quotient**. [Behavioral Quotients](behavioral-quotients.md) says *which distinctions may be forgotten*; Novelty Geometry says *what shape the space of not-yet-seen distinctions has*, and when that space is complete. [FUTCache](futcache.md) is the runtime version of the same question — novelty decisions under a memory bound, on a live frontier rather than on a boundary object.

---

## See Also

- [All Projects](index.md) — project overview
- [Resolution STOP](../concepts/resolution-stop.md) — geometric stopping over resolution depth on this tree
- [Behavioral Quotients](behavioral-quotients.md) — the quotient these boundaries support
- [FUTCache](futcache.md) — online novelty decisions under a memory bound
- [The Arithmetic Manifold](../core-vision.md) — the unified theory
- [Partition Function](../concepts/partition-function.md) — the universal mathematical object
