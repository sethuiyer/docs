# Related Work

## Similar Approaches

### Physics-Inspired Optimization

| Approach | Key Idea | Relation to ShunyaBar |
|----------|----------|----------------------|
| [**Simulated Annealing**](https://doi.org/10.1126/science.220.4598.671) (Kirkpatrick 1983) | Thermodynamic cooling for optimization | BAHA extends SA with fracture detection |
| [**Quantum Annealing**](https://doi.org/10.1016/0009-2614(94)00117-0) (Finnila 1994) | Quantum tunneling for optimization | Different physical mechanism, same goal |
| [**Statistical Physics approaches**](https://doi.org/10.1126/science.1073287) (Mezard 2002) | Replica method for SAT | NitroSAT uses similar phase transition analysis |
| [**Belief Propagation**](https://cdn.aaai.org/AAAI/1982/AAAI82-032.pdf) (Pearl 1982) | Message passing on factor graphs | Related to CRT decomposition in Geometry of Logic |

### Constraint Satisfaction

| Approach | Key Idea | Relation to ShunyaBar |
|----------|----------|----------------------|
| [**WalkSAT**](https://cdn.aaai.org/AAAI/1993/AAAI93-068.pdf) (Selman 1993) | Random walk + greedy | Different search strategy |
| [**DPLL**](https://doi.org/10.1145/368273.368557) (Davis-Putnam-Logemann-Loveland) | Systematic backtracking | Foundation of modern SAT solvers |
| [**CDCL / Chaff**](https://doi.org/10.1145/378239.379017) (Moskewicz 2001) | Conflict-driven clause learning | NitroSAT uses BAHA-style learning |
| [**Survey Propagation**](https://arxiv.org/abs/cond-mat/0207194) (Mezard 2002) | Message passing for random SAT | Related to partition function analysis |

### PINNs & Physics-Informed Learning

| Approach | Key Idea | Relation to ShunyaBar |
|----------|----------|----------------------|
| [**Standard PINNs**](https://doi.org/10.1016/j.jcp.2018.10.045) (Raissi 2019) | Additive physics loss | Multiplicative PINN extends this |
| [**Hidden Fluid Mechanics**](https://doi.org/10.1126/science.aaw4741) (Raissi 2020) | Physics-constrained learning from sparse observations | Related to Euler gate approach |
| [**Deep Ritz**](https://arxiv.org/abs/1710.00211) (E 2017) | Variational formulation | Alternative to PINN |

### Number-Theoretic Algorithms

| Approach | Key Idea | Relation to ShunyaBar |
|----------|----------|----------------------|
| **CRT-based computing** | Residue number system | Geometry of Conditional Logic extends this |
| **p-adic dynamics** | ultrametric spaces | Authorization Lattice uses p-adic structure |
| **Primality testing** | AKS, Miller-Rabin | Prime weighting relies on prime distribution |

---

## Research Communities

The ShunyaBar Labs research intersects several communities:

### Theoretical Computer Science
- SAT/SMT solving
- Approximation algorithms
- Complexity theory

### Machine Learning
- Physics-informed neural networks
- Neural architecture search
- Constrained optimization

### Statistical Physics
- Spin glasses
- Disordered systems
- Phase transitions

### Number Theory
- Analytic number theory (Riemann zeta)
- p-adic analysis
- Computational number theory

### Quantum Computing
- Quantum annealing
- Quantum vacuum effects
- Casimir physics

---

## Key Differences from Prior Work

### vs. Simulated Annealing
- **SA**: Generic cooling schedule, no fracture detection
- **BAHA**: Detects and navigates fractures via Lambert W

### vs. Standard SAT Solvers
- **Traditional**: Clause weighting is uniform or heuristic
- **Prime-weighted**: Guarantees unique gradient identity

### vs. Additive PINNs
- **Additive**: Gradient conflicts, requires manual λ tuning
- **Multiplicative**: No conflicts, constraints compose factorially

### vs. Traditional ACLs
- **ACL**: String-based or hierarchical, implicit composition
- **[Authorization Lattice](../projects/authorization-lattice.md)**: Algebraically precise, guaranteed invariants

### vs. Prompt-Pipeline Agents
- **Prompt pipeline**: Retrieval, tool use, and timing are collapsed into a single model call
- **[Agentic AI as a Distributed System](../concepts/agentic-ai-distributed-systems.md)**: Agents are supervised temporal processes with durable state, lag-aware retrieval, capability-filtered tool use, and event-sourced belief lineage

---

## How to Cite

If you use ShunyaBar Labs algorithms in your research, please cite:

```bibtex
@misc{shunyabar2025,
  author = {Sethurathienam Iyer},
  title = {ShunyaBar Labs: The Arithmetic Manifold},
  year = {2025--2026},
  publisher = {Zenodo},
  howpublished = {\url{https://github.com/shunyabar}}
}
```

For specific projects, use the DOIs from the [Papers](papers.md) page.

---

## See Also

- [Papers](papers.md) — ShunyaBar publications and DOIs
- [All Projects](../projects/index.md) — project deep dives
- [Research Report](../research-report.md) — technical assessment
- [Limitations](../limitations.md) — honest comparison boundaries
- [Glossary](../glossary.md) — terminology
