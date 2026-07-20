# Casimir SAT Solver

## What It Is

An **interactive blog/essay** exploring SAT solving through the lens of quantum vacuum fluctuations. This is the conceptual foundation — the "why" behind treating constraints as physical systems.

## Key Insight

The **Casimir effect** (quantum vacuum dynamics between conducting plates) provides a physical model for SAT solving:

> "Partial variable assignments are treated as physical microstates. 'Almost-satisfying' configurations experience attractive Casimir-like forces causing coagulation into stable solution clusters."

### The Physics

In quantum field theory, the Casimir effect arises from vacuum fluctuations — virtual particles popping in and out of existence. Between conducting plates, only certain wavelengths fit, creating a pressure differential that pushes the plates together.

In SAT solving:
- **Plates** → Satisfying variable assignments
- **Vacuum fluctuations** → Search dynamics
- **Pressure differential** → Constraint forces pulling toward satisfying assignments

### The Dynamics

Variables are probabilities \(x_i \in [0,1]\). The Langevin dynamics:

\(\frac{dx_i}{dt} = -\eta \frac{\partial E}{\partial x_i} + \sqrt{2T} \xi\)

where \(\xi\) is Gaussian noise. This samples from \(P(s) \propto e^{-\beta E(s)}\) — the partition function equilibrium distribution.

## The Blog

The essay explores:
- Why physics-inspired optimization works
- The connection between quantum vacuum and constraint satisfaction
- How "attractive forces" between almost-satisfying assignments lead to solutions

## Website

**Live:** [sethuiyer.github.io/casimir-sat-solver](https://sethuiyer.github.io/casimir-sat-solver)

## Key Files

- `casimir-sat-solver/README.md` — Overview
- DOI: [10.5281/zenodo.17394165](https://doi.org/10.5281/zenodo.17394165)

## Connection to Core Vision

The Casimir SAT Solver is the **conceptual bridge** between physics and constraint satisfaction. It provides:
- Physical intuition for why the partition function approach works
- The Casimir force as a model for constraint-guided search
- A narrative framework for understanding the Arithmetic Manifold

The "attractive force" between satisfying assignments is the physical manifestation of the multiplicative constraint factor — constraints pull solutions toward satisfaction.

---

## See Also

- [All Projects](index.md) — project overview
- [Spectral-Multiplicative](spectral-multiplicative.md) — Casimir force diagnostics in graph optimization
- [NitroSAT](nitrosat.md) — Langevin dynamics in practice
- [Partition Function](../concepts/partition-function.md) — the equilibrium distribution \(P(s) \propto e^{-\beta E(s)}\)
- [Phase Transitions](../concepts/phase-transitions.md) — Langevin crystallization at critical density
- [The Arithmetic Manifold](../core-vision.md) — the unified theory
- [Papers](../references/papers.md) — Zenodo publication DOI
