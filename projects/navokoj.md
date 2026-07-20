# Navokoj: Physics-Inspired SAT Framework

## What It Solves

Constraint satisfaction as **geometric flow** — treating constraints as flowing geometry rather than penalties to minimize. Navokoj is the reference implementation of the Arithmetic Manifold theory.

## Key Innovation

**Three-Sector Architecture**:

1. **Arithmetic Sector**: Prime-weighted operators prevent symmetry traps
2. **Geometric Sector**: Continuous manifold enables gradient flows
3. **Dynamic Sector**: Adiabatic quench implements Hamiltonian dynamics

**Core Principle**: Discrete problems → Continuous relaxation → Gradient flow → Discrete solution.

### Energy Definition

\(E = -\mathbf{w} \cdot \log P(\text{clause satisfied})\)

Each clause contributes to the energy based on its prime weight and satisfaction probability.

### Adiabatic Quench

The system is cooled slowly through the phase transition:

\(\beta(t) = \beta_0 + r t\)

"Adiabatic" means slow enough that the system stays in equilibrium — it always knows where the ground state is.

## Results

| Problem | Variables | Clauses | Success Rate |
|---------|-----------|---------|--------------|
| 3-SAT (critical density) | 50 | ~215 | **99.4%** |
| Graph Coloring | 50 nodes | — | **100%** |
| AI Escargot Sudoku | 729 | 8,850 | **99.85%** |

## Website

**Live:** [navokoj.shunyabar.foo](https://navokoj.shunyabar.foo) | **API:** [api.navokoj.shunyabar.foo](https://api.navokoj.shunyabar.foo)

For the production framing, read the [Navokoj launch post](../blog/navokoj-launch.md).

## Key Files

- `navokoj/README.md` — Overview
- `navokoj/MANIFOLD_IMPLEMENTATION.md` — The reference implementation of Arithmetic Manifold theory

## Connection to Core Vision

Navokoj is the **pure theory implementation** — it's explicitly described as "the reference implementation of the Arithmetic Manifold theory." It demonstrates that:
- Prime-weighted operators provide unique gradient identity
- Geometric flow on the manifold is superior to discrete search
- The adiabatic quench successfully navigates phase transitions

---

## See Also

- [All Projects](index.md) — project overview
- [NitroSAT](nitrosat.md) — the high-performance engine inside Navokoj
- [BAHA](baha.md) — fracture detection for Navokoj's quench schedule
- [Developer Guide](../navokoj/index.md) — API reference and code examples
- [Navokoj Launch](../blog/navokoj-launch.md) — production story and engine overview
- [Prime Weighting](../concepts/prime-weighting.md) — operator identity in the Arithmetic Sector
- [Partition Function](../concepts/partition-function.md) — energy definition for geometric flow
- [Phase Transitions](../concepts/phase-transitions.md) — adiabatic quench through critical density
- [The Arithmetic Manifold](../core-vision.md) — the theory Navokoj implements
- [Quick Start](../getting-started/quick-start.md) — run Navokoj locally
