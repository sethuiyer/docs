# The Six Research Tribes of ShunyaBar

*The internal architecture: how the projects compose into a unified pipeline*

---

> The architecture of ShunyaBar is not a random collection of projects, but a highly orchestrated pipeline. Internal documentation reveals that the ecosystem is divided into **six distinct "cohorts" or research tribes**, each with its own focus, vocabulary, and core philosophy.
>
> Together, they form a unified pipeline:
>
> **Weight → Transform → Satisfy → Relax → Observe → Compose**

---

## 1. The Arithmetic Cohort
*Language of Unique Structure*

This is the foundational layer, focused on the question: **What unique structure exists in the integers?**

It treats arithmetic as geometry waiting to be discovered. Its core vocabulary revolves around:

- **Prime Weighting**
- **Euler Products**
- **Möbius Function**
- **Riemann Zeta function**
- **Unique Factorization**

## 2. The Thermodynamic Cohort
*Language of Energy and Phase*

Operating as the physics layer, this tribe explores **what happens when computation becomes a physical system**.

It views the SAT solver as a physical material, utilizing concepts like:

- **Partition Function**
- **Free Energy**
- **Phase Transitions**
- **Casimir Force**

## 3. The Constraint Intelligence Cohort
*Language of Solving*

This is the commercializable solver layer, designed to turn impossible combinatorics into actionable decisions.

It focuses on whether constraints can be solved through **fluid flow rather than discrete search**. It encompasses the practical MaxSAT tools:

- **[NitroSAT](../projects/nitrosat.md)** — tailored for enterprise scheduling and optimization.
- **[Navokoj](../projects/navokoj.md)** — production-grade SAT API.
- **[BAHA](../projects/baha.md)** — branch-aware annealer.

## 4. The Continuity Bridge Cohort
*Language of Relaxation*

The bridge layer connects discrete logic to continuous mathematics.

It is highly mathematically distinctive, asking **how discrete rules can become differentiable objects**. Core concepts include:

- **Continuous Relaxations**
- **Spectral Embeddings**
- **Gradient Flow**
- **Multiplicative PINNs**
- **Topological Repair**

## 5. The Observer Cohort
*Language of Measurement*

Initially the "hidden" sixth layer of the architecture, the Observer Cohort is ShunyaBar's **epistemology layer**.

It sits above the solvers to answer: **What does it mean to observe a computation?**

It relies on:

- **STOP operators**
- **Prime-Hazard STOP Law**
- **Asymptotically fair stopping**

To ensure infinite computational paths are sampled fairly without bias.

## 6. The Coordination / Systems Cohort
*Language of Composition*

This is the distributed intelligence layer where the arithmetic theory escapes SAT solving to become **networking infrastructure**.

It focuses on how independent entities coordinate safely. Utilizing the [Factor Agent](../projects/factor-agent.md), it treats organizational capabilities as **prime factor identities**, ensuring secure composability via the **Chinese Remainder Theorem**.

---

## The Pipeline

Each tribe feeds the next. A Navokoj customer problem flows:

```
[Arithmetic]              [Thermodynamic]            [Constraint Intelligence]
Prime weighting    →      Z(β) heat kernel    →     NitroSAT / Navokoj / BAHA
                                                                            ↓
[Continuity Bridge]        [Observer]                 [Coordination]
Continuous relax    →      STOP sampling        →    Factor Agent / CRT
```

The pipeline is **Weight → Transform → Satisfy → Relax → Observe → Compose**. No tribe operates in isolation; each one's vocabulary borrows from the layer below and seeds the layer above.

---

## See Also

- [The Arithmetic Manifold](../core-vision.md) — the unifying theory
- [Axiom Architecture](../axiom-architecture.md) — formal axiom system
- [All Projects](../projects/index.md) — where each tribe materializes
- [Launch post](navokoj-launch.md) · [Road to Enterprise](navokoj-road-to-enterprise.md) · [Seven Seals](seven-seals-navokoj.md)