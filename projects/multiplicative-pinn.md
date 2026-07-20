# Multiplicative PINN Framework

## What It Solves

Physics-informed neural networks (PINNs) suffer from gradient conflicts when enforcing physical laws. Standard PINNs use additive penalty terms — this causes the physics loss to fight the data loss, leading to oscillations, slow convergence, and monotonicity violations.

## Key Innovation

**Multiplicative Constraint Enforcement** replaces additive penalties:

```
Traditional: Loss = DataLoss + λ × PhysicsLoss  (additive)
            ↓ (causes gradient conflicts)
Arithmetic Manifold: Loss = DataLoss × ConstraintFactor(PhysicsLoss)  (multiplicative)
```

The **Euler Gate**:
\(G(\mathbf{v}) = \prod_{c} (1 - p_c^{-\tau v_c})\)

The **Exponential Barrier**:
\(B(\mathbf{v}) = \exp(\gamma \|\mathbf{v}\|_2^2)\)

Combined: \(C(\mathbf{v}) = G(\mathbf{v}) \times B(\mathbf{v})\)

### Why It Works

When constraints are satisfied, \(G(\mathbf{v}) \to 1\) and \(B(\mathbf{v}) \approx 1\). When violated, \(G(\mathbf{v}) \to 0\) and \(B(\mathbf{v}) \to \infty\). The product **zeroes out** any solution that violates a constraint.

The deeper reason is that multiplicative enforcement changes the geometry of constraint learning.

Standard PINNs use additive penalties:

\[
L_{\text{add}}
=
L_{\text{data}}
+\lambda_1L_{\text{physics},1}
+\lambda_2L_{\text{physics},2}
+\cdots.
\]

The optimizer therefore sees a vector sum of gradients. If the data gradient and physics gradients point against each other, they can cancel, oscillate, or distort the loss landscape.

The multiplicative loss instead uses

\[
L_{\text{mult}}=L_{\text{data}}\cdot C(v),
\]

so

\[
\nabla_\theta L_{\text{mult}}
=
C(v)\nabla_\theta L_{\text{data}}
+
L_{\text{data}}\nabla_\theta C(v).
\]

The first term preserves the data-gradient direction and rescales it. The second term adds a structured correction toward constraint satisfaction. This is the main geometric shift: constraints are not added as competing forces; they become an observer kernel over the gradient flow.

In the reported experiments, this structure enforced multiple constraints simultaneously, including monotonicity, Lipschitzness, positivity, and convexity. The showcased monotonicity experiment reached \(0.00\%\) violations. For Navier-Stokes, the residual improved from approximately \(2.8\times10^{-3}\) to \(10^{-5}\), a \(99.64\%\) reduction.

The incompressibility result is partly architectural. Using a streamfunction

\[
u=\frac{\partial\psi}{\partial y},
\qquad
v=-\frac{\partial\psi}{\partial x},
\]

gives

\[
\nabla\cdot u
=
\frac{\partial^2\psi}{\partial x\partial y}
-
\frac{\partial^2\psi}{\partial y\partial x}
=0
\]

up to numerical precision, because mixed partials cancel. Thus incompressibility is not merely learned; it is built into the representation.

The performance claim should be read as a benchmark result rather than a universal theorem: the implementation reports about \(1{,}000{,}908\) physics-informed states per second and \(8000\) time steps in roughly \(8\) ms. The mathematical point is independent of the exact benchmark number: multiplicative PINNs preserve the main descent direction while using constraint violations to reshape the measure of the loss landscape.

### STOP/Mellin Interpretation

The Euler gate is not only a prime-weighted penalty. It is a finite reciprocal Euler product.

For a finite set of primes \(P\), define

\[
\zeta_P(s)=\prod_{p\in P}(1-p^{-s})^{-1}.
\]

Then the gate

\[
G(v)=\prod_{p\in P}(1-p^{-\tau v})
\]

is

\[
G(v)=\frac{1}{\zeta_P(\tau v)}.
\]

So the optimizer does not see the violation coordinate \(v\) linearly. It sees it through the Euler-product coordinate

\[
s=\tau v.
\]

The log-gradient of the gate is

\[
\frac{d}{dv}\log G(v)
=
\tau
\sum_{p\in P}
\frac{\log p \, p^{-\tau v}}{1-p^{-\tau v}}.
\]

Expanding each geometric factor,

\[
\frac{p^{-\tau v}}{1-p^{-\tau v}}
=
\sum_{k\ge1}p^{-k\tau v},
\]

gives

\[
\frac{d}{dv}\log G(v)
=
\tau
\sum_{p\in P}
\sum_{k\ge1}
(\log p)p^{-k\tau v}.
\]

This is the finite-prime analogue of

\[
-\frac{\zeta'(s)}{\zeta(s)}
=
\sum_{p,k\ge1}
\frac{\log p}{p^{ks}}
=
\sum_{n\ge1}
\frac{\Lambda(n)}{n^s}.
\]

Thus the gradient correction from the Euler gate is a truncated von Mangoldt, or prime-power, spectral signal.

In STOP/Mellin language:

\[
\text{constraint violation }v
\longmapsto
\text{Euler observer coordinate }s=\tau v
\longmapsto
\text{prime-power spectral response}.
\]

This gives a precise mathematical role to the prime gate:

\[
\boxed{
\text{Euler products define multiplicative observer kernels, and their log-gradients generate prime-power spectral correction fields.}
}
\]

The exponential barrier plays a complementary role. The Euler gate is spectral/arithmetic:

\[
G(v)=1/\zeta_P(\tau v),
\]

while the barrier is geometric/convex:

\[
B(v)=e^{\gamma v}.
\]

The gate supplies structured phase-space filtering near the constraint manifold. The barrier supplies survival pressure when violations are large. Clamping the gate near \(v=0\) acts as a renormalization floor: it prevents the finite Euler product from annihilating the gradient at the satisfied-constraint boundary.

### Superconducting Phase

At critical \(\beta = 1\), the Riemann zeta function diverges:
\(\zeta(1) = \infty\)

This nucleates a "superconducting phase" where constraints propagate without dissipation — gradients flow freely when physics is satisfied.

## Results

| Metric | Additive (Standard) | Multiplicative PINN |
|--------|---------------------|---------------------|
| Residual reduction (Navier-Stokes) | baseline | **99.64%** |
| Monotonicity violations | 31.31% | **0%** |
| Speedup over CFD | 1x | **100,000x** |

## Website

**Live:** [sethuiyer.github.io/multiplicative-pinn-framework](https://sethuiyer.github.io/multiplicative-pinn-framework)

## Key Files

- `multiplicative-pinn-framework/README.md` — Overview
- `multiplicative-pinn-framework/docs/RESULTS_SUMMARY.md` — Detailed benchmarks
- DOI: [10.5281/zenodo.18214172](https://doi.org/10.5281/zenodo.18214172)

## Connection to Core Vision

The Multiplicative PINN is the **proof of concept** that multiplicative constraint enforcement works in neural networks. It demonstrates:
- The Euler gate structure eliminates gradient conflicts
- The Riemann zeta divergence creates a superconducting phase
- The approach scales to real PDEs (Navier-Stokes)

---

## See Also

- [All Projects](index.md) — project overview
- [NitroSAT](nitrosat.md) — applies multiplicative principles to MaxSAT
- [Spectral-Multiplicative](spectral-multiplicative.md) — multiplicative constraints in graph optimization
- [Multiplicative vs Additive](../concepts/multiplicative-vs-additive.md) — the mathematical foundation
- [Prime Weighting](../concepts/prime-weighting.md) — prime-weighted physics constraints
- [Prime Euler Activations and ZetaDrop](../concepts/prime-euler-activations.md) — activation-level Euler gates and prime-indexed sparsity
- [Partition Function](../concepts/partition-function.md) — local partition function per constraint
- [STOP Operators as Resolution Flows](../concepts/stop-operator-manuscript.md) — Mellin observer view of Euler-product gates
- [Benchmarks](../getting-started/benchmarks.md) — Navier-Stokes results comparison
