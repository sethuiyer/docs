# Prime Weighting

## In Plain English

Every constraint in a problem is different — a clause in a SAT formula is not the same as an edge-cut constraint in graph partitioning. But traditional algorithms treat constraints all the same, which causes problems: two constraints can create the same gradient direction, leading to **gradient resonance** and catastrophic interference.

Prime weighting solves this by giving every constraint a unique mathematical identity, like assigning each person a unique fingerprint. The assignment uses prime numbers because primes have a special property: they're **multiplicatively independent**. You can't create one prime by multiplying other primes together.

**Why this matters**: When each constraint has a unique prime weight, no two constraints ever produce the same gradient signature. The system always knows which constraint is causing which gradient. This eliminates an entire class of failure modes.

---

## The Mathematics

Each constraint \(c\) receives a prime \(p_c\) and weight:

\(W(p_c) = \frac{1}{1 + \ln(p_c)}\)

**Key properties**:

- **Monotonic**: Larger primes → smaller weights (refinement, not dominance)
- **Logarithmic suppression**: Prevents large primes from vanishing entirely
- **Prime Number Theorem**: The \(K\)-th prime \(p_K \sim K \ln K\), so weights scale consistently

### Why This Formula?

The weight formula \(W(p) = 1/(1 + \ln p)\) emerges from the **Prime Number Theorem**:

\(p_K \sim K \ln K\)

This means:
\(\frac{1}{1 + \ln p_K} \sim \frac{1}{1 + \ln K + \ln \ln K}\)

So the \(K\)-th constraint receives weight \(\approx 1/K\) — a natural harmonic scaling that matches the structure of modular arithmetic.

---

## The Euler Product Connection

The prime weights connect to the Riemann zeta function via the **Euler product**:

\(\zeta(s) = \prod_{p \text{ prime}} \frac{1}{1 - p^{-s}}\)

When constraints compose multiplicatively:

\(P_{\text{mult}} = \prod_{v} \left(1 - \frac{1}{p_v^2}\right) \approx \prod_{p} \left(1 - \frac{1}{p^{2}}\right) = \frac{1}{\zeta(2)} = \frac{6}{\pi^2}\)

The constraint satisfaction probability approaches \(\zeta(2)^{-1}\) — a constant! This is the **multiplicative bootstrap** that makes the system stable.

---

## Why Primes Are Special

### Fundamental Theorem of Arithmetic

Every integer factors uniquely into primes. This means:

- **Multiplicative independence**: No prime can be expressed as a product of other primes
- **Unique factorization**: Each constraint's gradient signature is distinct
- **No collisions**: The mapping \(c \to p_c\) is injective

### Contrast with Uniform Weights

| Weight Scheme | Gradient Collision Probability | Scaling |
|---------------|-------------------------------|---------|
| Uniform | High (many constraints share weights) | O(1) |
| Random | Medium (birthday paradox) | O(√K) |
| Prime | Zero (guaranteed unique) | O(1) |

---

## Ablation Results

From the NitroSAT benchmarks:

> Ablation studies show 4x speedup and 75% reduction in topological complexity when using prime weights vs. uniform weights.

The prime-weighted system:
- Detects phase transitions earlier and more reliably
- Navigates fractures without losing progress
- Scales better to large clause counts

---

## Prime Weighting in Practice

### BAHA
Each clause gets a prime weight; the fracture detector monitors the free energy gradient \(\rho(\beta)\).

### Navokoj
The Arithmetic Sector uses prime-weighted operators as the identity kernel — each constraint flows along its own geometric path.

### Multiplicative PINN
Each physics constraint (Navier-Stokes, Poisson, etc.) receives a distinct prime weight, enabling multiplicative enforcement without gradient conflicts.

### Spectral-Multiplicative Framework
Graph partitioning constraints receive prime weights that maintain \(\rho \geq 0.99\) correlation between spectral and multiplicative functionals.

---

## Key Insight

Prime weighting is **causal, not decorative**. It's not a heuristic — it's a mathematical guarantee of uniqueness that emerges from the Fundamental Theorem of Arithmetic. Every other approach to constraint satisfaction has to deal with gradient collisions somehow; prime weighting eliminates them at the source.

---

## See Also

- [Partition Function](partition-function.md) — how prime weights connect to the statistical mechanics of constraint satisfaction
- [Multiplicative vs Additive](multiplicative-vs-additive.md) — why multiplicative enforcement preserves prime weight advantages
- [Phase Transitions](phase-transitions.md) — how prime weighting enables earlier fracture detection
- [Riemann Hypothesis](riemann-hypothesis.md) — the asymptotic stability condition for prime-weighted systems
- [Asymptotically Fair Stopping](asymptotically-fair-stopping.md) — how prime density provides an intrinsic stopping law
- [The Arithmetic Manifold](../core-vision.md) — the unified theory behind prime weighting
- [BAHA](../projects/baha.md) — prime-weighted fracture detection in optimization
- [NitroSAT](../projects/nitrosat.md) — prime weight ablation results (4× speedup)
- [Multiplicative PINN](../projects/multiplicative-pinn.md) — prime-weighted physics constraints
- [Benchmarks](../getting-started/benchmarks.md) — prime weighting ablation data
