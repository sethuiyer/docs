# Authorization Lattice

## What It Solves

**Capability-based execution** with mathematical permission composition. Permissions are not strings or ACLs — they're lattice elements with precise algebraic structure.

## Key Insight

**Permissions as p-adic Numbers**:

The same p-adic / ultrametric structure underlying CRT encoding appears in capability lattices. This is not a coincidence — it's the same mathematics appearing in two different domains.

### Why Lattices?

A lattice is a partially ordered set where any two elements have a unique greatest lower bound and least upper bound. For permissions:
- **Join (∨)**: Greatest lower bound = most permissive common permission
- **Meet (∧)**: Least upper bound = most restrictive combined permission

### Prime Weighting in Capabilities

Each capability receives a prime weight. The **divisibility relation** determines permission inheritance:

\(p_a | p_b \iff \text{capability } a \subseteq \text{capability } b\)

This is **exact** — no ambiguity, no override rules, no special cases.

### Lock-Preserving Semantics

The same "lock-preserving" property from Geometry of Conditional Logic applies:
- Locked commitments (root capabilities) are never changed
- Only invalid regions are repaired
- The CRT safe-corridor maps to the lattice "meet" operation

## The Essay

The Authorization Lattice blog post explores:

- "Authorization Lattice Mathematics and the Ownerless Object Problem"
- How to have permissions without an owner
- The algebraic structure of capability systems

## Website

**Live:** [sethuiyer.github.io/authorization-lattice](https://sethuiyer.github.io/authorization-lattice)

## Key Files

- `authorization-lattice/index.html` — Full blog post
- `authorization-lattice/LICENSE` — GPL v3

## Connection to Core Vision

Authorization Lattice extends the Arithmetic Manifold to **security and permissions**. The same principles apply:
- Prime factorization provides unique capability identity
- CRT provides invariant-preserving repair
- Lattice structure ensures compositional correctness

The p-adic numbers are already lurking in CRT — Authorization Lattice makes the connection explicit.

In the Factor Agent runtime, this permission algebra becomes an operational rule: retrieval is filtered before model context construction, and tool calls are checked as capability requests. See [Agentic AI as a Distributed System](../concepts/agentic-ai-distributed-systems.md) for the full runtime architecture.

---

## See Also

- [All Projects](index.md) — project overview
- [Geometry of Conditional Logic](geometry-of-conditional-logic.md) — CRT and p-adic ultrametrics
- [Factor Agent](factor-agent.md) — capability decomposition via prime factorization
- [Agentic AI as a Distributed System](../concepts/agentic-ai-distributed-systems.md) — runtime governance for capability-filtered agents
- [Prime Weighting](../concepts/prime-weighting.md) — how primes compose in capability systems
- [The Arithmetic Manifold](../core-vision.md) — the unified theory
