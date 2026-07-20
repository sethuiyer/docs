# Factor Agent

## What It Solves

Multi-agent system architecture using **prime factorization as the decomposition principle**. Agents are structured like factors of a number — each has a distinct identity, and compositions are computed through multiplication.

## Key Innovation

**Prime Factorization as Architectural Decomposition**:

Just as every integer factors uniquely into primes, every agent capability factors into prime-weighted primitives. This guarantees:
- **Unique identity**: No two agents have the same prime factor signature
- **Composable authority**: Agent capabilities combine through multiplication, not addition
- **Invariant preservation**: The Fundamental Theorem of Arithmetic ensures no authority is lost or duplicated

### OTP Supervision as Computational Factorization

The Elixir/OTP supervision tree implements:
- **Factor decomposition**: Processes are organized hierarchically by prime weight
- **Restart strategies**: Failed factors are replaced without disrupting the whole system
- **Message passing**: Inter-agent communication respects factor boundaries

### The Repair Mechanism

When a perturbation arrives, the system computes:

\(z' = z + kM, \text{ where } M = \prod_{p \in S} p\)

This is **identical to the CRT repair** in Geometry of Conditional Logic! The same safe-corridor mathematics applies to multi-agent repair.

## Architecture

```
TransactionalHarness
├── Compositional Invariants
├── Prime Factor Decomposition
└── Region-Based Repair (z' = z + kM)

Agent Primitives
├── p₁: Authentication
├── p₂: Authorization
├── p₃: Computation
└── pₙ: Custom capabilities
```

For the full distributed runtime architecture, including Elixir/OTP process trees, Horde recovery, ScyllaDB temporal state, lag-aware probes, and FactorAgent governance, see [Agentic AI as a Distributed System](../concepts/agentic-ai-distributed-systems.md).

## Website

**Live:** [sethuiyer.github.io/factor-agent](https://sethuiyer.github.io/factor-agent)

## Connection to Core Vision

Factor Agent extends the Arithmetic Manifold to **multi-agent systems**. Prime factorization provides:
- A principled way to decompose agent capabilities
- Guaranteed compositionality (multiplicative, not additive)
- The same CRT-based repair mechanism as Geometry of Conditional Logic

The "factorization" of authority mirrors the "factorization" of constraints in the multiplicative PINN framework — both use the Euler product structure to ensure compositional correctness.

---

## See Also

- [All Projects](index.md) — project overview
- [Agentic AI as a Distributed System](../concepts/agentic-ai-distributed-systems.md) — full Factor Agent runtime architecture
- [Geometry of Conditional Logic](geometry-of-conditional-logic.md) — same CRT repair mechanism
- [Authorization Lattice](authorization-lattice.md) — capability composition via prime factorization
- [Multiplicative PINN](multiplicative-pinn.md) — Euler product structure in constraint enforcement
- [Prime Weighting](../concepts/prime-weighting.md) — how primes enable factor decomposition
- [The Arithmetic Manifold](../core-vision.md) — the unified theory
