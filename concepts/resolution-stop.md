# Resolution STOP

*The connective invariant between the quotient, the completion, and the observer.*

## The triple

Let \(K\) be a space of histories, trajectories, or behavioural traces, equipped with nested finite-resolution indistinguishability relations \(\sim_0,\ \sim_1,\ \sim_2,\dots\), and define the finite-resolution behavioural quotients

\[
X_j \;:=\; K/\!\sim_j .
\]

The bonding maps \(\pi_{j+1,j}:X_{j+1}\to X_j\) forget distinctions visible only at resolution \(j+1\), so

\[
X_0 \leftarrow X_1 \leftarrow X_2 \leftarrow \cdots
\]

is an inverse system. Its completion is

\[
N_P(K) \;:=\; \varprojlim_j X_j ,
\]

and when the refinement system is represented by its rooted discovery tree \(T_{\mathrm{nov}}\),

\[
N_P(K) \;\simeq\; \partial T_{\mathrm{nov}} .
\]

The third object places an observer on **resolution depth** rather than chronological time. Write \(c_j := |X_j|\), and let \(q\in(0,1]\) be the **stopping probability per refinement step** — so \(1-q\) is the **survival (continuation) probability**. The resolution-STOP operator is

\[
O_q \;:=\; \sum_{j\ge 0} c_j\,(1-q)^{j} .
\]

In one line:

\[
\boxed{\;\{X_j\} \;\longrightarrow\; \varprojlim_j X_j \;\longrightarrow\; \sum_{j\ge0}|X_j|(1-q)^j \;}
\qquad\text{i.e.}\qquad
\boxed{\;\text{Quotient}\to\text{Completion}\to\text{Observer}\;}
\]

The quotient says what is distinguishable at finite resolution; the completion says what is compatible across arbitrary resolution; the observer asks how far resolution can continue before the weighted mass of distinguishable states ceases to be finite.

## The connective theorem

Define the exponential level-growth rate and the level generating function

\[
b \;:=\; \limsup_{j\to\infty} c_j^{1/j},
\qquad
C(z) \;:=\; \sum_{j\ge 0} c_j z^{j}.
\]

Cauchy–Hadamard gives radius of convergence \(R = 1/b\). Since \(O_q = C(1-q)\), the operator converges whenever \(1-q < R\). Therefore

\[
\boxed{\;q_c \;=\; 1-\frac1b\;}\quad (1<b<\infty),
\qquad\text{and in general}\qquad
\boxed{\;q_c \;=\; 1-R\;}
\]

**The STOP transition is not imposed on the refinement tower — it is determined by the asymptotic proliferation of the finite-resolution quotient states.** Note that \(b\) is a \(\limsup\): irregular trees and non-uniform refinement are already covered at this level. The dimension identity below is what needs regular covering growth.

## Boundary dimension

Equip \(\partial T_{\mathrm{nov}}\) with the visual metric \(d(\xi,\eta) = 2^{-r(\xi,\eta)}\), where \(r\) is the depth of the last common ancestor. If \(c_j \asymp b^{j}\), then the boundary is covered by \(c_j\) cylinders of diameter \(2^{-j}\), so

\[
\dim_B(\partial T_{\mathrm{nov}})
=\lim_{j\to\infty}\frac{\log c_j}{j\log 2}
=\log_2 b ,
\qquad
b = 2^{\dim_B(\partial T_{\mathrm{nov}})} ,
\]

and hence

\[
\boxed{\;q_c \;=\; 1-2^{-\dim_B(\partial T_{\mathrm{nov}})}\;}
\qquad\Longleftrightarrow\qquad
\boxed{\;\dim_B(\partial T_{\mathrm{nov}}) \;=\; -\log_2(1-q_c).\;}
\]

**Resolution-STOP Theorem.** Under exponential level growth and the visual metric \(2^{-r}\), the critical stopping probability of the resolution observer is determined by the box dimension of the discovery-tree boundary. The quotient tower therefore admits two equivalent asymptotic descriptions:

\[
\text{geometric complexity} \quad\leftrightarrow\quad \text{observer criticality}.
\]

Numerically (with \(b = 2^{D}\) so \(D = \log_2 b\)):

| \(b\) | \(D=\log_2 b\) | \(q_c = 1-1/b\) | \(O_q\) at \(q_c-0.02\) | at \(q_c+0.02\) |
|---:|---:|---:|---:|---:|
| 2 | 1.000 | 0.5000 | divergent | 25 |
| 3 | 1.585 | 0.6667 | divergent | 16.67 |
| 4 | 2.000 | 0.7500 | divergent | 12.5 |
| 8 | 3.000 | 0.8750 | divergent | 6.25 |

## Polynomial regime

Now let the exponential rate collapse: \(\limsup_j c_j^{1/j} = 1\), so \(R=1\) and there is **no interior STOP threshold** — \(q_c = 0\). The behaviour as \(q\downarrow 0\) still carries information. Put \(1-q = e^{-t}\), \(t\downarrow 0\). For polynomial level growth \(c_j = (j+1)^m\),

\[
O(t) \;=\; \sum_{j\ge 0}(j+1)^m e^{-tj},
\]

and under the same finite-part convention as the chronological STOP operator,

\[
\boxed{\;\operatorname{FP}_{t\to0}\sum_{j\ge 0}(j+1)^m e^{-tj} \;=\; \zeta(-m)+\frac{1}{m+1}.\;}
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

So replacing chronological depth by resolution depth **preserves the STOP residue structure**. The two regimes carry different information: exponential growth gives a nontrivial critical stopping probability; polynomial growth has \(q_c = 0\) but a finite-part invariant in its singular expansion.

## Pringsheim

Because every \(c_j \ge 0\), the generating function \(C(z)=\sum_j c_j z^j\) has non-negative coefficients. When \(R<\infty\), **Pringsheim's theorem** places a singularity at the positive real point \(z=R\). The resolution observer evaluates this same generating function along \(z = 1-q\), so it reaches the first positive singularity exactly when \(1-q = R\). Hence \(q_c = 1-R\): the STOP transition **is** the positive-real singularity of the quotient tower's level generating function, written in observer coordinates.

## The connective chain

| Step | Object | Role |
|---|---|---|
| I. Quotient | \(X_j = K/\!\sim_j\) | the distinctions visible at resolution \(j\) |
| II. Completion | \(N_P(K)=\varprojlim_j X_j \simeq \partial T_{\mathrm{nov}}\) | states compatible across all resolutions |
| III. Observer | \(O_q=\sum_j \lvert X_j\rvert(1-q)^j\) | a stopping observer on resolution depth |

The singularity of the observer detects the exponential growth of the tower:

\[
R^{-1} = \limsup_{j\to\infty}|X_j|^{1/j},
\qquad
R = 2^{-\dim_B(\partial T_{\mathrm{nov}})},
\qquad
q_c = 1-R = 1-2^{-\dim_B(\partial T_{\mathrm{nov}})}.
\]

\[
\boxed{\;\text{growth of finite quotients}\;\Longleftrightarrow\;\text{dimension of the completion}\;\Longleftrightarrow\;\text{criticality of the observer}\;}
\]

## What is proved — and what is not

**Proved here.** A precise relationship between (1) the growth of finite-resolution quotient spaces, (2) the dimension of the associated discovery boundary, and (3) the convergence of a geometrically stopped resolution observer.

**Not established.** No equivalence of categories. No canonical functor among arbitrary quotient systems. No prime invariance. No tower independence.

In particular, if the completion depends on the chosen refinement tower \(P\), then both \(\dim(\partial T_P)\) and \(q_c(P)\) may depend on \(P\). This is the **canonicity problem**:

\[
\boxed{\;q_c(P) \;=\; q_c(P')\;? \;}
\]

for admissible towers \(P, P'\) representing the same underlying behavioural system. A positive result would promote \(q_c\) from a tower statistic to an intrinsic invariant. It is open.

## Open regimes

Between exponential and polynomial growth sits real territory. For example \(c_j \sim e^{\sqrt j}\) still has \(\limsup c_j^{1/j}=1\), so \(q_c = 0\) — yet its singular behaviour near \(q=0\) is unlike any polynomial tower. So \(q_c\) captures exponential complexity but not the whole asymptotic geometry, which suggests a hierarchy:

\[
\text{radius of convergence} \;\to\; \text{singularity type} \;\to\; \text{regularized finite part}.
\]

The first detects exponential growth; the second distinguishes sub-exponential growth classes; the third may carry information invisible to dimension alone.

## Status

**Standard, used and not claimed as new.** Cauchy–Hadamard; Pringsheim's theorem; box-counting dimension and the visual metric on a tree boundary; the STOP residue identity \(\zeta(-m)+\tfrac{1}{m+1}\).

**Stated here.** That **resolution depth is a legitimate stopping axis**; that the resulting critical stopping probability is \(q_c = 1-R\), with \(R\) the radius of convergence of the level generating function; and the geometric corollary \(q_c = 1-2^{-\dim_B(\partial T_{\mathrm{nov}})}\) under regular covering growth.

**Not claimed.** Depth. This is geometric series plus box-counting; the contribution is the *coordinate change* — applying STOP to refinement depth — not the arithmetic.

## See also

- [STOP Operator Manuscript](stop-operator-manuscript.md) — the observer framework (see §19)
- [Novelty Geometry](../projects/novelty-geometry.md) — the discovery tree and its boundary
- [Behavioral Quotients](../projects/behavioral-quotients.md) — the quotient at each resolution
- [FUTCache](../projects/futcache.md) — the same invariant as a cache dimension
- [Partition Function](partition-function.md) — the universal mathematical object
