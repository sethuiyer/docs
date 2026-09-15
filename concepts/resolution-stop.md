# Resolution STOP

*The connective result between the quotient, the completion, and the observer.*

## The question

Three constructions in this lab sit next to each other:

- [The quotient](../core-vision.md) — minimal state is histories modulo future indistinguishability, \(M^* = H/{\sim_W}\).
- [The completion](../projects/novelty-geometry.md) — the space of those quotients is `N_P(K) = lim←_j (X_j, q_{j+1,j})`, simultaneously a metric completion, an inverse limit, and a hyperbolic boundary.
- [The observer](stop-operator-manuscript.md) — a path at finite resolution is a survival-weighted observable, \(\mathcal{O}_\tau(S) = \mathbb{E}[S_\tau]\).

Quotient, completion, expectation are **three different operations on related objects**. The natural question is whether a theorem connects them, or whether the shared theme is only thematic.

There is one. It is elementary. This page states it, derives it, and marks its status honestly.

## The construction: STOP over resolution depth instead of time

The STOP operator stops in **time** — a random horizon \(\tau\) on the path index. The discovery tree is indexed by **resolution depth** \(j\). So put the STOP operator on the resolution index.

Let \(X_j\) be the level-\(j\) state space (the set of resolution-\(j\) discovery words; equivalently, histories quotiented by agreement of their discovery word at resolution \(j\)). Write

\[
c_j = |X_j|
\]

for the number of distinct resolution-\(j\) profiles, and let \(1-q\) be the observer's survival probability **per resolution level**. Define the **resolution-STOP observable**

\[
\boxed{\;O_q \;=\; \sum_{j\ge 0} c_j\,(1-q)^{j}\;}
\]

\(O_q\) is the ordinary generating function of the level counts. Its singularities are therefore governed by the growth rate of the discovery tree — which is exactly the quantity that determines the boundary geometry.

## Regime A — exponential growth

Suppose the tree branches at rate \(b\):

\[
c_j \;\sim\; b^{\,j}.
\]

Under the visual metric \(d = 2^{-r}\) on the boundary, the level-\(j\) count and the Hausdorff dimension are related by

\[
\dim(\partial T_{\text{nov}}) \;=\; \lim_{j\to\infty}\frac{\log c_j}{\log 2^{j}} \;=\; \log_2 b .
\]

The resolution-STOP sum is geometric:

\[
O_q \;=\; \sum_j \bigl(b(1-q)\bigr)^{j},
\]

which converges iff \(b(1-q) < 1\). Hence

\[
\boxed{\;q_c \;=\; 1-\frac{1}{b} \;=\; 1-2^{-\dim(\partial T_{\text{nov}})}\;}
\]

**The critical survival probability of a geometric observer is fixed by the dimension of the boundary.** For \(q > q_c\) the observer's resolution-STOP value is finite; at and below \(q_c\) it diverges.

Numerically:

| \(b\) | \(\dim = \log_2 b\) | \(q_c = 1-1/b\) | \(O_q\) at \(q_c-0.02\) | at \(q_c+0.02\) |
|---:|---:|---:|---:|---:|
| 2 | 1.000 | 0.5000 | divergent | 25 |
| 3 | 1.585 | 0.6667 | divergent | 16.67 |
| 4 | 2.000 | 0.7500 | divergent | 12.5 |
| 8 | 3.000 | 0.8750 | divergent | 6.25 |

## Regime B — polynomial growth

Suppose instead \(c_j \sim (j+1)^m\). Then the resolution-STOP sum is the exact object of the STOP manuscript's residue theorem, with the resolution index playing the role of the time index:

\[
\operatorname{FP}_{t\to 0}\sum_{k\ge 1} k^{m} e^{-t(k-1)}
\;=\; \zeta(-m) + \frac{1}{m+1}.
\]

Verified symbolically for \(m = 0,\dots,6\):

| \(m\) | finite part | \(\zeta(-m)+\frac{1}{m+1}\) |
|---:|---|---|
| 0 | \(1/2\) | \(1/2\) |
| 1 | \(5/12\) | \(5/12\) |
| 2 | \(1/3\) | \(1/3\) |
| 3 | \(31/120\) | \(31/120\) |
| 4 | \(1/5\) | \(1/5\) |
| 5 | \(41/252\) | \(41/252\) |
| 6 | \(1/7\) | \(1/7\) |

So the STOP residue theorem is the **sub-exponential case** of resolution-STOP: polynomial growth gives a zeta residue, exponential growth gives a dimension pole.

## The chain

| Step | Object | Operation |
|---|---|---|
| 1 | \(X_j\) — resolution-\(j\) profiles | quotient of histories (and refining \(j\) is monotone coarsening) |
| 2 | \(N_P(K) = \lim_{\leftarrow j} X_j\) | completion — inverse limit and hyperbolic boundary |
| 3 | \(O_q = \sum_j \lvert X_j\rvert (1-q)^j\) | observer — rescaled at resolution depth |

The connective statement:

> **The resolution-STOP residue is the singularity of the level generating function, i.e. the growth rate of the discovery tree. In the sub-exponential regime it reduces to the zeta residue theorem.**

## Status — what is and is not claimed

**Standard (used, not invented):**

- Geometric series and radius of convergence; Abel/geometric summability.
- Box-counting dimension and the visual metric on a tree boundary.
- Pringsheim's theorem: the radius of convergence is the reciprocal of the growth rate.
- The STOP residue theorem \(\mathrm{FP} = \zeta(-m) + \tfrac{1}{m+1}\).

**Stated here:**

- That **resolution depth, not time, is the correct index** for a STOP observer on the discovery tree.
- The resulting critical survival \(q_c = 1 - 2^{-\dim(\partial T_{\text{nov}})}\).
- The identification of the STOP residue theorem as the sub-exponential case of resolution-STOP.

**Not claimed:**

- No equivalence of categories. There is no functor here, and none is asserted.
- No theorem about primes or observer-invariant arithmetic structure.
- No depth. This is roughly one page of geometric series and box-counting; the contribution is the *statement of the bridge*, not the arithmetic.

## See also

- [STOP Operator Manuscript](stop-operator-manuscript.md) — the observer framework
- [Novelty Geometry](../projects/novelty-geometry.md) — the discovery tree and its boundary
- [Behavioral Quotients](../projects/behavioral-quotients.md) — the quotient at each resolution
- [Partition Function](partition-function.md) — the universal mathematical object
- [Phase Transitions](phase-transitions.md) — critical scales elsewhere in the program
