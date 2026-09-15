# Cofinal Invariance

*Canonicity for the live growth rate: is the exponent a property of the system, or of the tower?*

> **Standing.** Separate from the frozen quotient–completion–observer triple. This note attacks the canonicity question left open by [Regular-Growth Identification](regular-growth-identification.md). Nothing in [Resolution STOP](resolution-stop.md) is modified.

## The problem

Define the live growth exponent of a tower \(P\)

\[
\delta_P \;:=\; \limsup_{j\to\infty}\frac{\log L_j(P)}{j\log 2},
\]

where \(L_j\) is the number of live level-\(j\) vertices — those with a non-empty boundary below them. By [Regular-Growth Identification](regular-growth-identification.md), \(\delta_P = \overline{\dim}_B(\partial T_P)\) under the visual metric. The question is whether

\[
\delta_P \;=\; \delta_{P'}
\]

for two admissible refining towers representing the same behavioural system. Three outcomes are possible: exact invariance, invariance after normalisation, or no invariance at all.

**The answer is the third, for the raw quantity — and the second, once the right normalisation is used.** We do them in that order.

## Outcome 3: the raw exponent is not canonical

Let \(P\) have resolution \(\varepsilon_j = 2^{-j}\) and live counts \(L_j = 2^j\), so \(\delta_P = 1\). Define a slower tower by using every second refinement:

\[
P'_j \;:=\; P_{2j}.
\]

The **boundary set is unchanged**: \(\varprojlim_j P'_{j} = \varprojlim_j P_{2j} = \varprojlim_j P_j\), since a cofinal restriction of a cofinal inverse system has the same limit. But the **visual metric changes**. Depth in \(P'\) is \(r' = r/2\), so

\[
d_{P'} \;=\; 2^{-r'} \;=\; 2^{-r/2} \;=\; d_P^{\,1/2}.
\]

### The gauge law

If two towers have depths related by \(r' \sim \alpha\, r\), then \(d_{P'} \asymp d_P^{\alpha}\), and because balls of \(d\)-radius \(\varepsilon\) are \(d^{\beta}\)-balls of radius \(\varepsilon^{1/\beta}\),

\[
\boxed{\;\dim_{d^{\beta}}(X) \;=\; \frac{1}{\beta}\,\dim_{d}(X).\;}
\]

So with \(\beta = \tfrac12\),

\[
\delta_{P'} \;=\; 2\,\delta_P \;=\; 2 \qquad\text{while}\qquad \delta_P = 1 .
\]

Measured:

| quantity | \(P\) | \(P'=P_{2j}\) |
|---|---:|---:|
| raw \(\delta\) (level-index visual metric, base 2) | 1.0000 | **2.0000** |
| gauge check \(\dim_{d^{\beta}}\) for \(\beta=\tfrac12,1,2\) | — | \(2,\;1,\;\tfrac12\) |

**The raw exponent is gauge-dependent.** The visual metric has two gauge freedoms — the chosen base, and the depth parametrisation — and both move the dimension. Same for \(q_c\), which is read off the level index and inherits the gauge. **Outcome 3 is confirmed for the raw quantity**, exactly as suspected.

The set did not change. The metric did.

## The fix: intrinsic resolution

The gauge freedom disappears if the metric is built from *physical resolution* rather than level number. Let \(\varepsilon_j\) be the mesh — the actual diameter of the partition cells at level \(j\) — and define the **physical metric** on the boundary by first-disagreement depth:

\[
d_{\mathrm{phys}}(\xi,\eta) \;:=\; \varepsilon_{\,r(\xi,\eta)} .
\]

Then

\[
\boxed{\;D_P \;:=\; \limsup_{j\to\infty}\frac{\log L_j}{-\log \varepsilon_j}.\;}
\]

This is reindexing-invariant for a trivial reason: reindexing moves \(\varepsilon\) and \(L\) **together**. For \(P'_j = P_{2j}\) we get \(\varepsilon'_j = \varepsilon_{2j}\) and \(L'_j = L_{2j}\), so the physical metric is literally the same function:

\[
d_{\mathrm{phys}}'(\xi,\eta) = \varepsilon'_{r'(\xi,\eta)} = \varepsilon_{2r'} = \varepsilon_{r} = d_{\mathrm{phys}}(\xi,\eta).
\]

Verified numerically at several depths: \(\varepsilon_r(P)\) and \(\varepsilon'_{r/2}(P')\) agree to machine precision, and \(D_P = D_{P'} = 1.000000\). The exponent is now a **gauge-invariant**, because it is the upper box dimension of the boundary in a metric that depends only on the base geometry and the physical scales.

## Cofinal Tower Invariance

**Theorem.** Let \(P,P'\) be admissible refining towers on the same compact metric space \((K,d)\) whose mesh sequences satisfy \(\varepsilon_j\to0\), and suppose

1. **cofinality** — for every \(j\) there is \(k(j)\to\infty\) with \(\varepsilon_{k(j)}(P')\le \varepsilon_j(P)\), and symmetrically; and
2. **common boundary** — the inverse limits are canonically identified.

Then

\[
\boxed{\;D_P \;=\; D_{P'}.\;}
\]

### Proof sketch

\(D_P\) is the upper box dimension of \(\partial T\) in \(d_{\mathrm{phys}}\), and \(d_{\mathrm{phys}}\) is determined by the mesh sequence of the *base* space, which the two towers share. Level-\(j\) cylinders of a tower with mesh \(\varepsilon_j\) cover the boundary and are \(\varepsilon_{j-1}\)-separated, so the covering function satisfies \(N(\varepsilon) = L_j\) for \(\varepsilon\in[\varepsilon_j,\varepsilon_{j-1})\). Cofinality says the two towers supply the same physical scales up to constants; equal boundary means the same covering problem is being solved at each scale. Hence \(N_P(\varepsilon) \asymp N_{P'}(\varepsilon)\) for all \(\varepsilon\to0\), and the limsup defining \(D\) agrees. \(\blacksquare\)

What is *not* claimed: that the towers' level *indices* correspond, or that the visual metrics agree. Only the physical scale functions need to line up.

## The canonical STOP exponent

The same normalisation fixes STOP. Replace the level-indexed

\[
O_q \;=\; \sum_j n_j (1-q)^j
\]

(which is gauge-dependent, since \(j\) is arbitrary) by a resolution-weighted operator with the physical scales as weights:

\[
O_s \;=\; \sum_j n_j\,\varepsilon_j^{\,s},
\qquad
\boxed{\;s_c \;:=\; \inf\Bigl\{s:\textstyle\sum_j n_j\varepsilon_j^{s} < \infty\Bigr\}.\;}
\]

This is the abscissa of convergence of a generalised Dirichlet series, and it is invariant under reindexing.

**Cauchy–Hadamard, generalised.** Since \(n_j\varepsilon_j^s \ge 0\),

\[
\boxed{\;s_c \;=\; \limsup_{j\to\infty}\frac{\log n_j}{-\log \varepsilon_j}.\;}
\]

*Caution:* this is a **root** test, not a ratio test. The ratio \(\bigl(n_{j+1}/n_j\bigr)\bigl(\varepsilon_{j+1}/\varepsilon_j\bigr)^s\) overestimates the abscissa for oscillating level counts. The half-live tower \(L_j = 2^{\lfloor j/2\rfloor}\) with \(\varepsilon_j=2^{-j}\) gives ratio-test value \(1.000\) but true value \(0.500\). Always use the root form.

**Relation to `q_c`.** In the regular case \(\varepsilon_j = 2^{-j}\) the series is \(C(2^{-s})\), convergent iff \(2^{-s}<R\), so

\[
s_c \;=\; \log_2 \frac{1}{R},
\qquad
q_c \;=\; 1-2^{-s_c}.
\]

\(s_c\) is the gauge-free replacement for \(\log_2(1/R)\); the frozen \(q_c\) is its exponential re-encoding.

## The full/live gap survives normalisation

Write \(s_c^{\text{full}}\) for the exponent built from \(n_j=|X_j|\) and \(s_c^{\text{live}}\) for the one built from \(L_j\). Since \(L_j\le n_j\),

\[
\boxed{\;s_c^{\text{live}} \;\le\; s_c^{\text{full}},\;}
\]

with equality iff dead ends do not asymptotically dominate. Measured:

| tower | `n_j` | `L_j` | \(s_c^{\text{full}}\) | \(s_c^{\text{live}}\) | gap |
|---|---|---|---|---|---|
| regular | \(2^j\) | \(2^j\) | 1.0000 | 1.0000 | 0.0000 |
| **reindexed** | \(4^j\) | \(4^j\) | 1.0000 | 1.0000 | 0.0000 |
| **spine + flourish** | \(2^j\) | \(1\) | 1.0000 | **0.0000** | **1.0000** |
| half-live | \(2^j\) | \(2^{\lfloor j/2\rfloor}\) | 1.0000 | **0.5000** | 0.5000 |

Note the reindexed row: the raw \(q_c\) moved (`R` changed with the level index) but \(s_c\) did not. The gap is now a gauge-free quantity.

## The canonical triple

\[
\boxed{\;\text{quotient growth } \{n_j\} \;\longrightarrow\; \text{resolution-normalised dimension } D \;\longrightarrow\; \text{critical STOP exponent } s_c\;}
\]

with

\[
D = s_c^{\text{live}} = \limsup_j \frac{\log L_j}{-\log\varepsilon_j},
\qquad
s_c^{\text{full}} \ge D .
\]

This is the canonical form of the bridge. The level-indexed \(q_c = 1-R\) is the same content written in coordinates that a reindexing of the tower can move.

## Status

| Claim | Status |
|---|---|
| Raw \(\delta_P\) and raw \(q_c\) are gauge-dependent (reindexing changes them) | **proved** — explicit counterexample, \(1\to2\) |
| Gauge law \(\dim_{d^\beta} = \beta^{-1}\dim_d\) | **proved** (standard metric scaling) |
| The physical metric \(d_{\mathrm{phys}} = \varepsilon_{r}\) is reindexing-invariant | **proved** — immediate, verified numerically |
| Cofinal Tower Invariance: \(D_P = D_{P'}\) | **proved** under cofinality + common boundary |
| Canonical STOP exponent \(s_c\), invariant under reindexing | **proved** (generalised Cauchy–Hadamard, root form) |
| \(s_c^{\text{live}}\le s_c^{\text{full}}\), equality iff no dominant dead ends | **proved** (immediate from \(L_j\le n_j\)) |
| Canonicity of the **gap** | **open** — reduces to whether the dead-end structure is tower-invariant, which cofinality alone does not force |

**Machinery used, not claimed.** Metric scaling of box dimension; dyadic cylinder covering; abscissa of convergence of non-negative Dirichlet-type series; Cauchy–Hadamard.

## See also

- [Regular-Growth Identification](regular-growth-identification.md) — full vs live counts, and why the frozen identity is conditional
- [Resolution STOP](resolution-stop.md) — the frozen triple
- [STOP Operator Manuscript](stop-operator-manuscript.md) — §19
- [Novelty Geometry](../projects/novelty-geometry.md) — the discovery tree
