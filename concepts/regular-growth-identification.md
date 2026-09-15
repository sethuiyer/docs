# Regular-Growth Identification

*When does the observer's critical scale actually equal the boundary dimension?*

> **Standing.** This note is deliberately separate from the frozen quotient–completion–observer triple. It does not modify [Resolution STOP](resolution-stop.md) or §19 of the [STOP manuscript](stop-operator-manuscript.md). The triple asserts `q_c = 1 − 2^{−dim_B}`; this note determines exactly when that assertion is available, and what holds when it is not.

## The question

The frozen triple identifies

\[
q_c \;=\; 1-2^{-\dim_B(\partial T_{\mathrm{nov}})} .
\]

The frozen page already qualifies that identity — *"under regular covering growth"*. This note makes that condition **exact**, and making it exact means separating two growth rates:

- the growth of the **full** resolution-\(j\) quotient count \(n_j := |X_j|\), which is what Cauchy–Hadamard sees, and
- the growth of the **live** level-\(j\) count — those vertices with a non-empty boundary below them — which is what covering the boundary requires.

These are not the same number in general. The purpose of this note is to separate them, prove the general inequality, and give a sharp criterion for equality.

## Two counts

Let \(T\) be the discovery tree of a refining tower \(P\), and define

\[
n_j \;:=\; |X_j|,
\qquad
L_j \;:=\; \#\{v\in X_j : v \text{ has an infinite extension in } T\}.
\]

A vertex with no infinite extension below it is a **dead end**. Every dead end contributes to \(n_j\) and nothing to the boundary. Clearly \(L_j \le n_j\), and the boundary is the disjoint union of the level-\(j\) cylinders over live vertices:

\[
\partial T \;=\; \bigsqcup_{v \text{ live at level } j} C_j(v).
\]

## The theorem

Equip \(\partial T\) with the visual metric \(d(\xi,\eta) = 2^{-r(\xi,\eta)}\), where \(r\) is the depth of the last common ancestor.

**Theorem.** For every refining tower \(P\),

\[
\dim_B^{\mathrm{upper}}(\partial T) \;=\; \limsup_{j\to\infty} \frac{\log L_j}{j\log 2},
\qquad
\dim_B^{\mathrm{lower}}(\partial T) \;=\; \liminf_{j\to\infty} \frac{\log L_j}{j\log 2}.
\]

Consequently, whenever the limit exists,

\[
\boxed{\;\dim_B(\partial T) \;=\; \lim_{j\to\infty}\frac{\log L_j}{j\log 2}.\;}
\]

### Proof

Two facts about level-\(j\) cylinders.

*(i) They cover.* Every boundary point passes through exactly one live level-\(j\) vertex, so the family \(\{C_j(v)\}_{v \text{ live}}\) covers \(\partial T\).

*(ii) They are dyadically separated.* If \(\xi,\eta\) lie in distinct level-\(j\) cylinders, their last common ancestor has depth \(< j\), so \(r(\xi,\eta)\le j-1\) and

\[
d(\xi,\eta) \;\ge\; 2^{-(j-1)} \;=\; 2\cdot 2^{-j}.
\]

Hence **no set of diameter \(\le 2^{-j}\) can meet two distinct level-\(j\) cylinders**. So any cover of \(\partial T\) by sets of diameter \(\le 2^{-j}\) needs at least \(L_j\) members, and (i) supplies a cover with exactly \(L_j\). Therefore

\[
N(\partial T, 2^{-j}) \;=\; L_j .
\]

Moreover \(N(\partial T,\varepsilon) = L_j\) for every \(\varepsilon \in [2^{-j},\,2^{-(j-1)})\): a set of diameter \(<\ 2^{-(j-1)}\) still cannot straddle two level-\(j\) cylinders, while level-\((j-1)\) cylinders have diameter \(2^{-(j-1)} > \varepsilon\) and are no longer usable. So \(N\) is constant on each dyadic band, and

\[
\dim_B^{\mathrm{upper}}(\partial T)
= \limsup_{j}\frac{\log N(2^{-j})}{\log 2^{j}}
= \limsup_{j}\frac{\log L_j}{j\log 2},
\]

with the analogous \(\liminf\) statement. \(\blacksquare\)

## The equality criterion

Since \(L_j\le n_j\), the theorem immediately gives the general inequality

\[
\boxed{\;\dim_B(\partial T) \;\le\; \limsup_{j\to\infty}\frac{\log |X_j|}{j\log 2}\;}
\]

and, applying Cauchy–Hadamard to the full count,

\[
q_c \;=\; 1-2^{-\limsup_j (\log n_j)/(j\log 2)}
\;\ge\;
1-2^{-\dim_B(\partial T)} .
\]

**Equality holds if and only if dead ends do not asymptotically dominate:**

\[
\boxed{\;q_c = 1-2^{-\dim_B(\partial T)}
\quad\Longleftrightarrow\quad
\limsup_{j}\frac{\log n_j}{j\log 2} = \limsup_{j}\frac{\log L_j}{j\log 2}.\;}
\]

**A sufficient condition.** If the tower satisfies the *finite-profile extension property* — every compatible level-\(j\) block extends to an infinite compatible profile — then every vertex is live, \(L_j = n_j\) for all \(j\), and the identity holds. Equivalently: the two counts coincide, and hence the observer criticality and the boundary dimension coincide, whenever \(X_j\) is defined as the set of **realizable** profiles of actual traversals rather than the combinatorial set of compatible blocks.

## The criterion is sharp

The spine-with-flourish tower makes the gap as large as possible. At each level the single live vertex takes children so that the level has full size \(2^j\), while only one child continues:

\[
n_j = 2^j, \qquad L_j = 1 \quad \text{for all } j.
\]

The boundary is a single point, so \(\dim_B(\partial T)=0\). Yet the full count is exponential. Measured:

| Tower | \(n_j\) | \(L_j\) | \(D_{\text{full}}\) | \(\dim_B\) | \(q_c\) | \(1-2^{-\dim_B}\) | gap |
|---|---|---|---|---|---|---|---|
| regular 2-ary | \(2^j\) | \(2^j\) | 1.0000 | 1.0000 | 0.5000 | 0.5000 | 0.0000 |
| regular 3-ary | \(3^j\) | \(3^j\) | 1.5850 | 1.5850 | 0.6667 | 0.6667 | 0.0000 |
| regular 4-ary | \(4^j\) | \(4^j\) | 2.0000 | 2.0000 | 0.7500 | 0.7500 | 0.0000 |
| **spine + flourish** | \(2^j\) | \(1\) | 1.0000 | **0.0000** | 0.5000 | 0.0000 | **0.5000** |
| **half-live** | \(2^j\) | \(2^{\lfloor j/2\rfloor}\) | 1.0000 | **0.5000** | 0.5000 | 0.2929 | **0.2071** |

In the spine case the frozen identity would claim \(q_c=0\); the true value is \(1/2\). The discrepancy is entirely dead ends.

Every pair \((n_j, L_j)\) with \(n_{j+1}\ge L_j\) is realizable by such a tree, so the counterexample is not degenerate — it is the generic behaviour once dead ends are permitted.

## What this does to the frozen triple

Nothing in the frozen triple is withdrawn, and nothing in it was wrong. The conditional corollary was already stated there in prose ("under regular covering growth"); what changes here is that the condition becomes **exact and checkable**:

| Statement | Status |
|---|---|
| \(R = 1/\limsup_j |X_j|^{1/j}\), \(q_c = 1-R\) | unconditional (Cauchy–Hadamard) |
| \(\dim_B(\partial T) = \limsup_j \log L_j/(j\log 2)\) | unconditional (proved above) |
| \(q_c \ge 1-2^{-\dim_B(\partial T)}\) | unconditional |
| \(q_c = 1-2^{-\dim_B(\partial T)}\) | **holds iff** dead ends do not asymptotically dominate — the frozen page's "regular covering growth" made exact — in particular under the finite-profile extension property |

So the honest reading of the frozen formula is: *it is the extension-property case* — already flagged there as "regular covering growth", now stated exactly. Where the tower is realized by actual traversals — so that every compatible block is live — the formula is a theorem. Where the tower is a purely combinatorial inverse system, it is an upper bound on the geometry, and the true geometry is governed by the live count.

## A sharper canonicity question

The canonicity problem in [Resolution STOP](resolution-stop.md) asks whether \(q_c\) is tower-independent. This note explains why that is the delicate place to ask: **\(q_c\) is computed from the full count \(n_j\), while \(\dim_B\) is computed from the live count \(L_j\).** The live count is a property of the boundary object; the full count also counts vertices that the boundary never sees. So \(q_c\) is *a priori* the more tower-sensitive of the two invariants, and a canonicity theorem for \(\dim_B\) would not automatically give one for \(q_c\). The natural sharpened question is therefore two-part:

\[
\dim_B(\partial T_P) \overset{?}{=} \dim_B(\partial T_{P'}),
\qquad
\frac{\limsup_j \log L_j^{(P)}}{j\log 2} \overset{?}{=} \frac{\limsup_j \log L_j^{(P')}}{j\log 2}
\]

for admissible towers \(P,P'\) representing the same behavioural system — and only after those, whether the full counts agree.

## Status

**Proved here.** The box-dimension formula in terms of the live count \(L_j\) (upper and lower); the general inequality \(\dim_B \le \limsup_j \log n_j/(j\log 2)\); the equality criterion; and the sharpness of that criterion by explicit realizable counterexample.

**Still open.** Whether \(\dim_B\) (equivalently, the live growth rate) is a tower-invariant; whether the full count is; and the general sub-exponential classification.

**Machinery used, not claimed.** Cylinder covers and dyadic separation in ultrametric tree boundaries; Cauchy–Hadamard; the standard identification of box dimension with dyadic covering growth.

## See also

- [Resolution STOP](resolution-stop.md) — the frozen triple (read §3 with this note in hand)
- [STOP Operator Manuscript](stop-operator-manuscript.md) — §19
- [Novelty Geometry](../projects/novelty-geometry.md) — the discovery tree and its boundary
- [Behavioral Quotients](../projects/behavioral-quotients.md) — the level-\(j\) quotients \(X_j\)
