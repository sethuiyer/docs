# Benchmarks

Comprehensive performance results across all ShunyaBar Labs algorithms.

## Summary Table

| Algorithm | Domain | Success Rate | Speedup | Key Metric |
|-----------|--------|--------------|---------|------------|
| **BAHA** | Optimization | 84% (26 domains) | 4169% vs SA | Spin Glass |
| **NitroSAT** | MaxSAT | 77% perfect SAT | — | 788K vars |
| **Navokoj** | 3-SAT | 99.4% | — | Critical density |
| **Multiplicative PINN** | Navier-Stokes | 99.64% residual red. | 100,000x vs CFD | Monotonicity |
| **Spectral-Multiplicative** | Graph partitioning | 100% | $1.4M savings | 15K nodes |
| **Geometry of Conditional Logic** | Incremental repair | 100% | 847x-12,495x | Sudoku |

---

## BAHA Benchmarks

### Spin Glass (64 spins)

| Solver | Success Rate | Time |
|--------|--------------|------|
| Simulated Annealing | 6% | — |
| **BAHA** | **100%** | — |
| Improvement | **4169%** | — |

### Graph Isomorphism (N=50)

| Solver | Success Rate |
|--------|--------------|
| Standard SA | 40% |
| **BAHA** | **100%** |

### 26 Problem Domains

| Domain | BAHA Pass | BAHA Mean Score |
|--------|-----------|----------------|
| Random K-SAT | ✓ | 0.91 |
| Graph Coloring | ✓ | 0.89 |
| MaxCut | ✓ | 0.94 |
| Spin Glass | ✓ | 1.00 |
| Graph Isomorphism | ✓ | 1.00 |
| Portfolio (avg) | **84%** | 0.87 |

---

## NitroSAT Benchmarks

### Large-Scale Verification

| Instance | Variables | Clauses | Result | Time |
|----------|-----------|---------|--------|------|
| Planted Coloring | 105,000 | 232,000 | SAT | 13.78s |
| Hardware Check | 788,480 | — | SAT | 5.92s |
| Random CNF | 5,000+ instances | Various | **77% perfect** | — |

### Median Satisfaction

Across 5,000+ random CNF instances:
- **Perfect satisfaction**: 77%
- **Median satisfaction**: 99.7%

---

## Navokoj Benchmarks

### 3-SAT at Critical Density (α = 4.27)

| Variables | Clauses | Success Rate |
|-----------|---------|--------------|
| 20 | ~85 | 100% |
| 50 | ~215 | 99.4% |
| 100 | ~427 | 98.1% |

### Graph Coloring

| Nodes | Colors | Success Rate |
|-------|--------|--------------|
| 20 | 3 | 100% |
| 50 | 4 | 100% |

### AI Escargot Sudoku

- **Variables**: 729
- **Clauses**: 8,850
- **Success Rate**: 99.85%

---

## Multiplicative PINN Benchmarks

### Navier-Stokes Equations

| Metric | Standard (Additive) | Multiplicative PINN |
|--------|---------------------|-------------------|
| Residual reduction | baseline | **99.64%** |
| Monotonicity violations | 31.31% | **0%** |
| Training time | 24 hours (CFD) | **0.86 seconds** |
| Speedup | 1x | **100,000x** |

---

## Spectral-Multiplicative Benchmarks

### Cloud Infrastructure Optimization

| Metric | Before | After |
|--------|--------|-------|
| Partition balance | 60/40 | **50/50** |
| Constraint violations | Many | **0** |
| Cross-region traffic | High | **Minimized** |
| Annual cost | baseline | **$1.4M savings** |

### 15,000-Node Graph

| Metric | Value |
|--------|-------|
| Constraint satisfaction | **100%** |
| Spectral-Multiplicative correlation | **0.996** |
| Runtime | < 1 minute |

---

## Geometry of Conditional Logic

### Sudoku Repair

| Perturbation | Full Restart | CRT Incremental | Speedup |
|--------------|--------------|-----------------|---------|
| 1 cell | baseline | 847x | **847x** |
| 3 cells | baseline | 9,234x | **9,234x** |
| 5 cells | baseline | 12,495x | **12,495x** |

### Solution Preservation

| k (perturbations) | Preservation Rate |
|-------------------|-------------------|
| k ≤ 2 | **100%** |
| k ≤ 5 | **100%** |
| k > 5 | Degrades |

---

## Prime Weighting Ablation

| Weight Scheme | Speedup vs Uniform | Topological Complexity |
|---------------|-------------------|----------------------|
| Uniform | 1x (baseline) | High |
| Random | 2x | Medium |
| **Prime** | **4x** | **75% reduction** |

Prime weighting is **causal**, not decorative — the 4x speedup and 75% complexity reduction are reproduced consistently.

---

## See Also

- [All Projects](../projects/index.md) — per-project benchmark deep dives
- [Prime Weighting](../concepts/prime-weighting.md) — ablation study details
- [Limitations](../limitations.md) — where performance degrades
- [Marketing: Results](../marketing/results.md) — production benchmark data
- [Competition](../marketing/competition.md) — comparison with other solvers
- [Research Report](../research-report.md) — empirical evaluation methodology
