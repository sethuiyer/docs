# Behavioral Quotients

## What It Solves

Computational systems face one tension: retain exhaustive history and state grows without bound; discard it prematurely and you make commitments you cannot take back. *Behavioral Quotients as a Design Principle for Computation* formalizes state reduction as a **quotient of histories by future indistinguishability** — two histories are identified exactly when no future can tell them apart.

The paper is a **unifying lens and a design criterion**, not a new minimality theorem. Its contribution is to put one construction underneath several fields, and to state honestly which bridges are proven, which are analogies, and which are still conjectures.

## Key Innovation

**One quotient, several names.** The minimal sufficient state is the quotient, and it satisfies the universal factorization property of a coequalizer. In specific regimes this *is*:

| Regime | What the quotient is |
|---|---|
| Finite deterministic | Myhill–Nerode congruence |
| Stochastic | Causal states (computational mechanics) |
| MDP | Exact state aggregation |
| Categorical | Coequalizer / final-coalgebra universal property |

The generated geometry is the Gromov visual metric on a tree boundary and the Fisher–Rao geometry of a statistical manifold.

### Evidence tiers, stated up front

The paper marks every cross-regime bridge as a **consequence**, an **analogy**, or a **conjecture** — and says what would upgrade it:

- **Conjectural:** prime weighting (§5.2) and the Riemann "asymptotic lock" (§5.3).
- **Externally verified:** the solver line's correctness results — witnesses checked against the original instances by separate verifiers.
- **Informal:** the Laplace-horizon derivation.

This tiering is deliberate: the theory does not borrow the solver's verification, and the solver does not borrow the theory's novelty.

### A reference implementation

The solver line is a reference implementation of the design criterion. The same quotient principle appears in [NitroSAT](nitrosat.md)'s state reduction, in [Geometry of Conditional Logic](geometry-of-conditional-logic.md)'s CRT repair, and at runtime in [FUTCache](futcache.md).

## Architecture

```
Behavioral Quotient
├── Histories
│   └── H  ~  H'   iff no future distinguishes them
├── Quotient (minimal sufficient state)
│   └── universal factorization / coequalizer
├── Generated geometry
│   ├── Gromov visual metric (tree boundary)
│   └── Fisher–Rao (statistical manifold)
└── Instantiations
    ├── KV cache: answer-preserving compression
    ├── Continuous solvers
    └── Commitment / repair
```

## Website

**Paper:** [sethuiyer.github.io/behavioral-quotients](https://sethuiyer.github.io/behavioral-quotients/)
**PDF:** [paper.pdf](https://sethuiyer.github.io/behavioral-quotients/paper.pdf)

Distill-style rendering of the source manuscript, with a continuous-verification pipeline that proves the page corresponds to the paper 1:1 — nothing added, dropped, reordered or reworded.

## Connection to Core Vision

The Arithmetic Manifold is a statement about the *geometry* of constraint systems. Behavioral Quotients is a statement about **which distinctions that geometry is allowed to keep**. It is the general form of the move the rest of the lab makes in specific settings: remove the distinctions that do not change the answer, then search the residual space.

---

## See Also

- [All Projects](index.md) — project overview
- [Resolution STOP](../concepts/resolution-stop.md) — the observer bridge added as §7.7
- [FUTCache](futcache.md) — the runtime implementation of quotienting explored state
- [Geometry of Conditional Logic](geometry-of-conditional-logic.md) — state minimization in an incremental solver
- [NitroSAT](nitrosat.md) — the reference solver line
- [The Arithmetic Manifold](../core-vision.md) — the unified theory
- [Partition Function](../concepts/partition-function.md) — the universal mathematical object
