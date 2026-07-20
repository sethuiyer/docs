# Results & Case Studies

## Verified Performance on Industrial Benchmarks

All results are verifiable. Download proof JSONs and run the benchmarks yourself.

---

## SAT 2024 Industrial Track

Tested on **4,199 real-world industrial SAT instances**:

| Engine | Satisfaction Rate | Speed | Quality |
|--------|-----------------|-------|---------|
| **Pro** | 92.57% | 7.90/sec | 99.92% |
| **Mini** | 31.37% | 10.64/sec | 99.55% |
| **Nano** | 3.24% | Ultra-fast | 96.41% |

---

## Real-World Results

### Ultra-High-Density SAT (129-SAT)

Mean-field regime where CDCL search fails.

| Metric | Value |
|--------|-------|
| Variables | 200 |
| Clauses | 1,000,000 |
| Satisfaction | **100.0000%** |
| Compute Time | 9-10 min |
| Cost | $10.10 |
| Per million clauses | ~$0.01 |

---

### Ramsey-Style Graph (K₅-free 52-vertex)

Finding a (K₅, K₅)-free graph on 52 vertices — no monochromatic K₅ in red or blue. This is a verification instance, not a Ramsey number proof.

| Metric | Value |
|--------|-------|
| Variables | 2.6M K₅ Cliques |
| Clauses | 7.8M |
| Satisfaction | **100.0000%** |
| Compute Time | 17 min |
| Cost | $17.10 |

> Note: R(5,5,5) is unknown. This finds one valid coloring, not a mathematical proof of a Ramsey bound.

---

### Random 3-SAT (1M Scale)

Critical density at α=4.26, industrial benchmark.

| Metric | Value |
|--------|-------|
| Variables | 1,000,000 |
| Clauses | 4.26M |
| Satisfaction | 92.15% |
| Compute Time | 171s |
| Cost | $3.35 |
| Per million clauses | ~$0.79 |

---

### Supply Chain Optimization

Real-world logistics and inventory constraints.

| Metric | Value |
|--------|-------|
| Variables | 435,000 |
| Clauses | 1.3M |
| Satisfaction | 97.18% |
| Compute Time | 67.7s |
| Cost | $2.63 |
| Per million clauses | ~$2.02 |

---

### Ramsey R(3,3,3) N=20

Frustrated regime.

| Metric | Value |
|--------|-------|
| Variables | 4,180 |
| Clauses | 3 Violations |
| Satisfaction | 99.93% |
| Compute Time | 17 min |
| Cost | $16.89 |

---

## Clause Density vs Performance

How solve time scales with problem complexity (clauses ÷ variables):

| Density | Median Time | Requests | Satisfaction |
|---------|-------------|----------|--------------|
| 1-2 (sweet spot) | 39ms | 249 | 97.8% |
| 2-3 | 189ms | 259 | 99.8% |
| 3-4 | 684ms | 70 | 98.9% |
| 4-5 (phase transition) | 1.93s | 107 | 98.2% |
| 5-10 | 7.47s | 59 | 99.7% |
| 10-25 (Very Hard) | 14.1s | 31 | 95.4% |
| 50+ (Monster) | 16.2s | 9 | 92.57%* |

*\*Density 50+ includes 77,000-clause problems solved with 92.57% perfect solves.*

---

## Enterprise Cloud Allocation

**15,000 VMs across 10 regions:**

| Metric | Value |
|--------|-------|
| VMs | 15,000 |
| Regions | 10 |
| Co-location/HA constraints | 300 |
| Cost Savings | **$1.4M/year** |
| Cost Reduction | 99.6% |
| Constraint Satisfaction | **100%** |
| Solve Time | 10.8 seconds |

> ✅ **Cloud infrastructure optimization at scale.**

---

## Industrial-Scale MaxSAT (The Real Headline)

These are the results that matter for enterprise constraint optimization:

### 80M-Clause Timetabling (v2)
**100% satisfaction in 73 seconds** on 147,600 variables, 80,278,884 clauses — on a laptop CPU.

| Metric | Value |
|--------|-------|
| Variables | 147,600 |
| Clauses | 80,278,884 |
| Satisfaction | **100%** |
| Solve Time | 73 seconds |
| Throughput | 1.1M clauses/sec |
| Hardware | AMD Ryzen 5 5600H (single core, laptop) |

> v1 took 5.2 hours. v2 (WAdam optimizer + Wasserstein flow) achieved 250× speedup on the same instance.

### Edwards-Anderson 3D Spin Glass
First gradient-based solver to crack EA 3D at scale — a genuinely hard NP-complete problem used in physics research:

| Size | Spins | Clauses | Satisfaction | Time |
|------|-------|---------|-------------|------|
| 40×40×40 | 64,000 | 188,666 | **99.47%** | 4.3s |
| 30×30×30 | 27,000 | 79,035 | **99.98%** | 16s |
| 50×50×50 | 125,000 | 369,905 | 95.00% | 5.3 min |

> Sweet spot: L≈40 spins per dimension. Beyond that, correlation length exceeds system size.

### Real MSE 2022 Benchmarks
Tested on 10 real MaxSAT Evaluation 2022 WCNF instances with certified optimal values:

| Result | Count |
|--------|-------|
| Matched certified optimal | **8/10 (80%)** |
| Internal solve time | 7-34ms |
| Weighted MaxSAT (up to 10¹⁸) | ✓ Handled correctly |

> These are certified results — the optimum is provably correct. Matching 80% at sub-50ms is competitive with state-of-the-art anytime solvers.

---

## Where It Plateaus (Honest Limits)

NitroSAT is an anytime approximator. It has known failure modes:

| Problem Class | Performance | Why |
|--------------|-------------|-----|
| Expander graphs (Urquhart) | ~90% stable, 2K-100K vars | No low-dimensional structure to exploit |
| High-weight-ratio MaxSAT | Can miss sharp optima | Local optimum traps on extreme weight ratios |
| Dense random 3-SAT (α > 10) | ~92-95% | Global frustration without local basins |

> The expander graph plateau is stable from 2,000 to 100,000 variables — it's a structural limitation of continuous relaxation on expansion graphs, not a bug.

---

## Quantum XOR Performance (H100 GPU)

64-way XOR chains where classical CDCL engines fail:

| Configuration | Variables | Clauses | Satisfaction | Time |
|--------------|-----------|---------|-------------|------|
| 16-way × 4 chains | 133 | 286 | **100%** | 0.93s |
| 32-way × 8 chains | 521 | 1,132 | **100%** | 1.35s |
| 64-way × 16 chains | 2,065 | 4,504 | **100%** | 1.44s |

> XOR chains define affine subspaces — not full power sets. The relevant metric is basin fidelity (how close the returned assignment is to the planted optimum), not the cardinality of the unconstrained solution space. These instances are SAT because the XOR constraints are consistent, not because there are 2^1024 solutions.

---

## PSPACE Problems

| Problem | Variables | Satisfaction | Navokoj Time | Classical Time |
|---------|-----------|-------------|--------------|----------------|
| QBF (Quantified Boolean Formulas) | 8.6M | 129-SAT solved | 347ms median | 45s |
| Sokoban | Variable | Solvable | Minutes | Hours |
| Pebbling | Variable | Verified | Minutes | Infeasible |

---

## Download Proofs

Every result above includes a verifiable proof JSON:

- [Download R(5,5,5) Proof JSON](https://navokoj.shunyabar.foo/proofs/r55-proof.json)
- [Download 1M-var 3SAT Proof JSON](https://navokoj.shunyabar.foo/proofs/1m-3sat-proof.json)
- [Download XOR Chain Proofs](https://navokoj.shunyabar.foo/proofs/xor-chains-proof.json)

---

## Run Your Own Benchmarks

```bash
git clone https://github.com/shunyabar/navokoj-tests.git
cd navokoj-tests
pip install -r requirements.txt
python main.py --engine pro --problems 100
```

Benchmark suite includes:
- UNSAT Core Analysis
- Gradient Dynamics
- Hub-Tension Collapse
- Chain Propagation
- Dual-Hub Competition

---

## See Also

- [Marketing: Why Navokoj](index.md) — product overview
- [Pricing](pricing.md) — tier costs for production workloads
- [Competition](competition.md) — performance comparison with other solvers
- [Limitations](../limitations.md) — where results plateau
- [Benchmarks](../getting-started/benchmarks.md) — algorithm-level comparison
- [NitroSAT Production Ledger](../projects/nitrosat.md) — 308-run Supabase data
