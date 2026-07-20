# Geometry of Conditional Logic

## What It Solves

**Lock-preserving incremental repair** — when a perturbation arrives (a constraint becomes unsatisfied), the system computes minimal repair, not full recomputation. Locked commitments are never changed; only the invalid region is modified.

## Key Innovation

**Chinese Remainder Theorem (CRT) Encoding**:

Each Boolean condition is assigned a distinct prime \(p_i\). The CRT reconstruction is:

\(z' = z + kM, \text{ where } M = \prod_{p \in S} p\)
\(k \equiv (c - z) \cdot M^{-1} \pmod{p_t}\)

This is a **"safe corridor"** — a fully differentiable path that fixes broken constraints without disturbing solved ones.

### Smooth Cosine Loss

\(L_i(z) = 1 - \cos\left(\frac{2\pi}{p_i} \cdot (z - a_i)\right)\)

Each constraint gets a smooth sinusoidal "groove" — satisfying the constraint means falling into the groove.

### Garner's Algorithm

Fully differentiable CRT reconstruction that provides the safe corridor between solution basins.

## Why CRT?

The CRT has a crucial property: **modular arithmetic is closed under composition**. If you know the solution modulo each prime, you know the solution modulo their product. This means:

- Constraints are **additively independent** (no constraint affects another)
- The solution space is a **product of circles** (continuous, no brittleness)
- Perturbations only affect the relevant prime's circle

## Results

| Scenario | Full Restart | CRT Incremental | Speedup |
|----------|-------------|-----------------|---------|
| Sudoku (single cell) | baseline | 847x | **847x** |
| Sudoku (5 cells) | baseline | 12,495x | **12,495x** |
| Preserved solutions | k ≤ 5 | **100%** | — |

## Website

**Live:** [sethuiyer.github.io/geometry-of-conditional-logic](https://sethuiyer.github.io/geometry-of-conditional-logic)

## Key Files

- `geometry-of-conditional-logic/README.md` — Overview
- `geometry-of-conditional-logic/docs/MATH.md` — Mathematical foundations
- `geometry-of-conditional-logic/docs/PADIC.md` — p-adic analysis

## Connection to Core Vision

Geometry of Conditional Logic provides the **discrete encoding** of the Arithmetic Manifold. The CRT is the discrete analog of the continuous partition function — both provide a "coordinate system" for navigating the solution space.

The CRT "safe corridor" is geometrically identical to BAHA's branch enumeration:
- BAHA: Navigate between basins via Lambert W branches
- CRT: Navigate between solutions via modular corridors

Both are instances of the same principle: **there's always a path between solutions that doesn't cross barrier regions**.

The same repair idea reappears in Factor Agent as supervised local recovery: failed probes, desynchronized tools, and stale observations are repaired locally instead of restarting the whole investigation. See [Agentic AI as a Distributed System](../concepts/agentic-ai-distributed-systems.md) for the runtime version of this idea.

---

## See Also

- [All Projects](index.md) — project overview
- [Factor Agent](factor-agent.md) — same CRT repair mechanism in multi-agent systems
- [Agentic AI as a Distributed System](../concepts/agentic-ai-distributed-systems.md) — distributed runtime version of local repair
- [Authorization Lattice](authorization-lattice.md) — p-adic ultrametric structure for permissions
- [BAHA](baha.md) — branch enumeration as the continuous analog of CRT corridors
- [Prime Weighting](../concepts/prime-weighting.md) — how primes enable the CRT encoding
- [The Arithmetic Manifold](../core-vision.md) — the unified theory
- [Benchmarks](../getting-started/benchmarks.md) — incremental repair speedup comparison
