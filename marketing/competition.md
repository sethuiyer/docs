# Competitive Landscape

## Why Navokoj Wins

---

## Market Comparison

| Capability | Navokoj | Gurobi/CPLEX | OR-Tools | Classical CDCL |
|------------|---------|--------------|----------|----------------|
| **Variables** | Up to 1M+ | 100M+ | 1M+ | 1M |
| **Millisecond solve** | ✅ | ❌ | ❌ | ❌ |
| **Hardness prediction** | ✅ DEFEKT | ❌ | ❌ | ❌ |
| **Always returns result** | ✅ Anytime | ❌ Timeout | ❌ Timeout | ❌ UNSAT |
| **XOR-native** | ✅ | ❌ | ❌ | ❌ |
| **GPU-accelerated** | ✅ H100 | Partial | ❌ | ❌ |
| **Developer API** | ✅ REST | ❌ SDK | ✅ | ✅ |
| **Pay-per-use** | ✅ | ❌ License | ❌ License | ❌ |

---

## Gurobi vs Navokoj

**Gurobi** is the industry standard for mathematical optimization. It's excellent for:
- Linear/quadratic programming
- MILP (mixed integer linear programming)
- Continuous variable optimization

**Navokoj** excels where Gurobi struggles:
- Boolean satisfiability at scale
- Problems with complex logical constraints
- Real-time decisioning (< 1 second)
- Problems where hardness is unknown

| Scenario | Gurobi | Navokoj |
|----------|--------|---------|
| 10k variable routing | 10-60s | **< 1s** |
| Million-variable placement | May timeout | **347ms** |
| Complex boolean logic | Requires translation | **Native** |
| Unknown hardness | No visibility | **DEFEKT** |
| UNSAT instance | Fails | **Best effort** |

---

## OR-Tools vs Navokoj

**OR-Tools** (Google) is open-source and widely used for:
- Vehicle routing
- Scheduling
- Integer programming

**Navokoj** provides advantages:
- Native boolean SAT
- Much higher satisfaction rates
- Physics-inspired optimization
- DEFEKT pre-solve diagnostics

| Scenario | OR-Tools | Navokoj |
|----------|----------|---------|
| 5k vehicle routing | 30s-5min | **< 1s** |
| Complex boolean logic | Requires CP-SAT | **Native** |
| Satisfaction guarantee | Best effort | **92.57% industrial** |
| Hardness visibility | None | **DEFEKT** |

---

## Classical CDCL SAT Solvers

**Kissat, CaDiCaL, Maplesat** are competition-grade CDCL solvers. They excel at proving UNSAT and finding exact solutions on structured problems.

**Navokoj** differs fundamentally:
- **CDCL** = Systematic search through boolean assignment space
- **Navokoj** = Continuous optimization on arithmetic manifold

| Capability | CDCL Solvers | Navokoj |
|------------|--------------|---------|
| Structured industrial (multipliers, timetabling) | Strong | **Strong** |
| Expander / random hard | Strong | ~90% plateau |
| XOR constraints | Gaussian elimination | **Continuous** |
| Real-time (< 100ms) | ❌ | **✅** |
| Always returns result | ❌ UNSAT/timeout | **Anytime** |
| Million-variable scale | On structured problems | **On structured problems** |
| GPU acceleration | Rare | **H100** |

> CDCL solvers are exact solvers — when they find a solution or prove UNSAT, the answer is certified. Navokoj is an anytime approximator — it always returns a result, but doesn't produce unsatisfiability proofs. Choose based on your requirement: certify correctness (CDCL) or get the best available result fast (Navokoj).

---

## Our Differentiation

### 1. Real-Time Anytime

Classical solvers: **UNSAT** → Done, no partial result.
Navokoj: Always returns the best available assignment.

### 2. Structured Industrial Scale

On problems with regular structure (hardware multipliers, timetabling, grid problems), Navokoj achieves:

| Problem | Scale | Satisfaction | Time |
|---------|-------|-------------|------|
| Hardware multiplier | 788K vars, 2.6M clauses | **100%** | 5.92s |
| Enterprise timetabling | 147K vars, 80M clauses | **100%** | 73s |
| Grid coloring | 4M vars, 15M clauses | **100%** | 475s |

> CDCL solvers are strong on structured problems too — these aren't cherry-picked comparisons. The difference is that Navokoj delivers high satisfaction consistently within a time bound, while CDCL may timeout or require exponential time on unfavorable instances.

### 3. Hardness Visibility

Before you solve, DEFEKT tells you:

```json
{
  "solvability_score": 84,
  "status": "likely_solvable",
  "recommendation": "Use pro-deepthink on H100 GPU"
}
```

No other solver offers this.

### 4. Anytime Algorithm Guarantee

Classical solvers: **UNSAT** → Done, no result.

Navokoj: **Always returns the best partial assignment.**

```json
{
  "success": true,
  "satisfiable": false,
  "satisfaction_rate": 0.985,
  "timeout_budget_hit": true,
  "assignment": [true, false, ...]
}
```

---

## When to Use What

| Use Case | Recommended |
|----------|-------------|
| Linear programming | Gurobi |
| MILP with continuous vars | Gurobi/CPLEX |
| Vehicle routing (simple) | OR-Tools |
| **Boolean SAT at scale** | **Navokoj** |
| **Real-time decisioning** | **Navokoj** |
| **Complex logical constraints** | **Navokoj** |
| **Unknown problem hardness** | **Navokoj** |
| **Must have partial result** | **Navokoj** |

---

## The Bottom Line

| Requirement | Solution |
|-------------|----------|
| Speed matters | Navokoj |
| Scale matters | Navokoj |
| Hardness unknown | Navokoj |
| Can't afford empty results | Navokoj |
| Complex boolean logic | Navokoj |
| MILP with continuous vars | Gurobi |
| Linear programming | Gurobi |
| Simple VRP | OR-Tools |

**Start free at [navokoj.shunyabar.foo](https://navokoj.shunyabar.foo)**

---

## See Also

- [Marketing: Why Navokoj](index.md) — product overview
- [Results](results.md) — verified performance data
- [Pricing](pricing.md) — cost comparison
- [Limitations](../limitations.md) — where competitors have advantages
- [Benchmarks](../getting-started/benchmarks.md) — algorithm-level comparison
