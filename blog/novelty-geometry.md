---
title: "The Geometry of Endless Discovery"
description: "A rigorous guide to infinite traversals, prefix trees, ordered novelty, inverse-limit completion, minimal online memory, p-adics, and hyperbolic boundaries."
date: "2026-08-20"
author: "Sethurathienam Iyer"
tags: ["topology", "novelty", "hyperbolic geometry", "memory"]
type: "Essay"
materials:
  - label: "Original"
    href: "https://sethuiyer.github.io/novelty-geometry/"
---

# The Geometry of Endless Discovery

How novelty forces a boundary—from recurrence and prefix trees to ordered completion

We searched for the structure that preserves meaning across an unbounded process. **It was keyed state.**

## Abstract

This article develops a unified mathematical framework for infinite traversals and endless discovery. A traversal becomes a ray in a prefix tree, whose boundary records complete infinite histories. Finite alphabets produce compact Cantor-like boundaries; countably infinite alphabets produce noncompact Baire space. To preserve novelty rather than raw repetition, the central construction records the order in which distinguishable regions are first discovered at every spatial resolution.

The compatible discovery words form an inverse limit with a natural ultrametric. Under the finite-profile extension property, this space is literally the metric completion of realizable ordered-novelty profiles and the boundary of an explicit locally finite Gromov-hyperbolic tree. Later sections characterize minimal online novelty memory through a Myhill–Nerode future-equivalence quotient, recover the p-adic integers from raw prefix completion, and connect sufficient memory to recurrent attention, Fenwick trees, and Apache Flink keyed state.

Main result: metric completion of ordered novelty = inverse-limit completion = hyperbolic boundary.

## Reading Roadmap

What mathematical shape does “there is always something new” have?

That question sounds philosophical, but it quickly becomes concrete. Begin with a process that keeps producing states. If the available alphabet is finite, some states must return. If the alphabet is infinite, the process may keep discovering genuinely new states. Yet a list of states does not by itself tell us how novelty accumulates, how two histories should be compared, or what an observer with only finite information can know about the whole process.

This document builds an answer in stages. First it separates *continuing forever* from *repeating forever*. Next it gives each finite history a canonical location in a prefix tree. The boundary of that tree represents complete infinite histories. Then the central move replaces elapsed-time depth by resolution depth: at every scale, record the order in which new regions are first discovered. Compatible records across all scales form an inverse limit, an ultrametric completion, and—finally—the boundary of an explicit locally finite hyperbolic tree.

**First pass · the story**

Read §§1, 4, 6, 10.3–10.4, 10.6, and 13. You will see the problem, the prefix-tree idea, the time-to-resolution swap, and the final completion theorem.

**Second pass · the topology**

Add §§3, 7, 8, and 9. These explain compactness, Cantor versus Baire boundaries, quotient-space hazards, and proper hyperbolic realization.

**Interpretive pass**

Read §§11–12 after the construction is secure. They connect the mathematics to resource-bounded observation and then mark the limits of the theological analogy.

You do not need prior geometric group theory. The essential prerequisites are sequences, sets, functions, and the idea that a metric measures distance. Whenever a technical object appears, ask two questions: *what information does it preserve?* and *what information does it deliberately forget?* Those two questions organize almost every definition below.

**The one-sentence answer**

Ordered novelty is completed by recording first discoveries at every spatial resolution; the resulting coherent inverse-limit profile is simultaneously a metric completion and the boundary of a locally finite hyperbolic tree.

**Part II · What to expect from the algorithmic layer**

After the abstract quotient and completion are established, §10.8 asks how selected novelty statistics can be maintained without replaying the traversal. For an ordered finite alphabet, the visited set becomes an indicator array; a Fenwick tree adds dynamic prefix counts, spatial ranks, and selection queries; and a separate discovery log retains temporal first-discovery order. §10.9 then lifts the same distinction into distributed stream processing: semantic sufficiency determines what state must mean, Apache Flink supplies keyed and windowed state machinery, and a data structure determines which queries are efficient. The point is not that one runtime or data structure realizes the general quotient, but that the path from semantic sufficiency to an executable online representation can be made explicit.

## Scope and Contribution

Most ingredients in this document are classical: symbolic sequence spaces, recurrence, packing numbers, prefix-tree boundaries, compact quotients, and hyperbolic approximation. The contribution is primarily *expository and architectural*. These established ingredients are organized into one framework that separates temporal completion, operational distinguishability, and multiscale ordered discovery.

Section 10 develops the document’s most specific construction: the inverse-limit completion of first-discovery words across refining resolutions. The compactness, ultrametric, density, and boundary-realization results proved there are elementary consequences of that construction and standard inverse-limit theory. We describe it as a construction developed here, not as a priority claim; establishing historical originality would require a dedicated comparison with symbolic addresses, inverse systems of finite partitions, exploration processes, and related literature.

**Established mathematics**

Sections 1–9, including recurrence, prefix trees, Cantor and Baire boundaries, compact quotients, and hyperbolic realization.

**Construction developed here**

Section 10’s compatible ordered-discovery words, discovery pseudometric, completion, and explicit novelty tree.

**Interpretation and transfer**

Sections 11–12: RBDS connections, attention-drift interpretation, and theological analogy. These are not consequences of the boundary theorems.

Accordingly, the central claim is not that a new theory replaces symbolic dynamics, topology, or hyperbolic geometry. It is that a consistent architecture makes their roles—and the information each construction preserves or forgets—visible in one place.

## 1. Traversal Space Configuration

Endless continuation and recurrence are different questions.

**Before the notation**

A *state* is simply one distinguishable condition a system can occupy. It might be a letter emitted by a machine, a room visited by a robot, a symbol in a computation, or a region detected by an instrument. The mathematics does not initially care what the state means. It cares only whether two observations count as the same state and in what order they occur.

An *alphabet* is the collection of available states. Calling it an alphabet does not require language: \(\{S,A\}\), the integers, and the interval \([0,1]\) can all serve as alphabets. A traversal is then the system's ordered diary. The subscript in \(x_n\) records the moment of observation; it does not create a new state identity. Thus \(x_3=x_8\) means that two different moments contain the same state.

Let \(K\) be a state alphabet. A *traversal* \(L\) over \(K\) is an infinite sequence of states:

Infinite sequences over a discrete alphabet form the primitive object of *symbolic dynamics*.12 In that classical setting, the alphabet is fixed and the dynamics are shifts acting on sequences. Here we instead fix one realized traversal and ask what its asymptotic structure forces.

### 1.1 Finite Dwelling vs. Infinite Halting

A traversal may remain in a single state for a strictly finite number of consecutive steps. This is a *finite dwell* of length \(m < \infty\), written \(k^m\). Halting is defined as an *infinite dwell*, where the traversal enters a single state and resides there permanently. Formally, \(L\) halts at index \(N\) if

\[
\exists\, N \in \mathbb{N},\; \forall\, n \ge N : x_n = x_{n+1}.
\]

*((1.1))*

This is equivalent to an infinite extension of a single state, denoted \(k^\omega\).

### 1.2 Infinite Traversal

An *infinite traversal* consists of an infinite succession of finite state-residence intervals. The sequence is represented as runs:

\[
L = k_{i_1}^{r_1} k_{i_2}^{r_2} k_{i_3}^{r_3} \cdots
\]

where every residence time \(r_j \in \mathbb{N}\) is finite (\(r_j < \infty\)) and the number of runs is infinite. The adjective *infinite* modifies the continuation of transitions, not the duration of occupancy. Formally, an infinite traversal satisfies

\[
\forall\, N \in \mathbb{N},\; \exists\, n > N : x_n \neq x_{n+1}.
\]

*((1.2))*

This says: however long a finite dwell becomes, there is eventually another transition.

**Toy comparison**

Let \(K=\{S,A\}\). Consider

\[
L_{\mathrm{move}}=(S,S,S,A,A,S,S,S,S,A,\ldots)
\]

and

\[
L_{\mathrm{halt}}=(S,A,S,A,A,A,A,A,\ldots).
\]

The first sequence may contain arbitrarily long runs, but every displayed run is finite and further transitions continue. The second has infinitely many written positions too, yet after its final arrival at \(A\) it never changes again. Sequence length alone therefore does not distinguish traversal from halting. What matters is whether transitions continue beyond every finite horizon.

### 1.3 Finite Alphabets Force Recurrence

If \(K\) is finite, an infinite traversal forces at least one state to recur infinitely often, by the pigeonhole principle.1 For the binary case \(K = \{S, A\}\), the decomposition into alternating runs is

\[
L = S^{r_1} A^{r_2} S^{r_3} A^{r_4} \cdots, \quad r_j < \infty.
\]

Because neither \(S\) nor \(A\) can become an infinite final residence, both necessarily recur infinitely often:

**Theorem 1.1.** For \(K = \{S, A\}\), an infinite traversal satisfies \(\#L(S) = \#L(A) = \infty\).

This uses only the non-halting condition and \(|K|=2\); no further hypothesis on the run lengths is needed.

**Figure 1.** Run decomposition of a binary traversal. *Top*: alternating finite runs \(S^{r_1}A^{r_2}S^{r_3}A^{r_4}\cdots\) with all \(r_j < \infty\) — an infinite traversal. *Bottom*: an infinite run \(S^\omega\) — halting at \(S\), excluded by the definition.

## 2. Infinite Alphabets and the Separation of Recurrence and Novelty

Infinite state spaces let novelty continue, but not every new state is geometrically far away.

If \(K\) is countably infinite, \(K = \{k_1, k_2, k_3, \dots\}\), the implication that infinite traversal forces recurrence no longer holds. An infinite traversal may satisfy the non-halting condition by continually escaping through *novel* states rather than revisiting old ones.

This is the first conceptual fork in the document. Over a finite alphabet, continued motion eventually reuses available symbols because there are only finitely many. Over an infinite alphabet, continued motion has another option: spend a new symbol at every step. The question changes from “must something return?” to “what kind of structure does continual discovery produce?”

### 2.1 Zero-Recurrence Traversals

Consider the traversal \(L = (k_1, k_2, k_3, k_4, \dots)\). Every residence is finite (specifically, \(r_j = 1\)). The traversal never halts. Yet every state occurs exactly once:

\[
\#L(k_i) = 1 \quad \forall\, i \in \mathbb{N}.
\]

Define the *exact point recurrent support* as

\[
R_{\text{pt}}(L) = \{x \in K : \#\{n : x_n = x\} = \infty\}.
\]

For this traversal, \(R_{\text{pt}}(L) = \emptyset\). Two concepts that coincided in the finite-alphabet case now separate: *unbounded traversal* and *recurrence*. The traversal can remain infinite by consuming novel states.

**Worked traversal · the first ten reciprocal states**

Take \(K=[0,1]\) and \(x_n=1/(n+1)\). The first ten states are

\[
1,\ \frac12,\ \frac13,\ \frac14,\ \frac15,\ \frac16,\ \frac17,\ \frac18,\ \frac19,\ \frac1{10}.
\]

Every entry is new, so the exact recurrent support is empty. Because the sequence decreases, the nearest earlier state to \(x_n\) is \(x_{n-1}\), and for \(n\ge1\) (the gap \(\delta_n\) is defined formally in §4),

\[
\delta_n
=\left|\frac1n-\frac1{n+1}\right|
=\frac1{n(n+1)}.
\]

| \(n\) | \(x_n\) | nearest-history gap \(\delta_n\) |
|-------------|-------------|---------------------------------|
| 1           | \(1/2\) | \(1/2\)                     |
| 2           | \(1/3\) | \(1/6\)                     |
| 3           | \(1/4\) | \(1/12\)                     |
| 4           | \(1/5\) | \(1/20\)                     |
| 9           | \(1/10\) | \(1/90\)                     |

The gaps shrink toward zero, and the states converge to \(0\). Hence

\[
R_{\mathrm{pt}}(L)=\varnothing,
\qquad
\omega(L)=\{0\}.
\]

Nothing repeats exactly, but the path has a very strong asymptotic shape. This single example already shows why “number of distinct states” is too crude: it records endless novelty but misses the organized accumulation at \(0\).

### 2.2 Cardinality of Zero-Recurrence Traversals

The phenomenon is structurally large. For a countably infinite alphabet, the space of all infinite traversals is \(K^\omega\). Its cardinality is2

\[
|K^\omega| = \aleph_0^{\aleph_0} = 2^{\aleph_0} = \mathfrak{c}.
\]

*((2.1))*

There are continuum-many distinct infinite zero-recurrence traversals over a countably infinite alphabet. This is established Cantor theory, not novel construction.7

**Remark.** Countable cardinality of \(K\) determines neither the density nor the asymptotic structure of any particular traversal: \(\mathbb N\) escapes, \(\{1/n : n \ge 1\}\) accumulates at a single point, and \(\mathbb Q \cap [0,1]\) is dense, yet all three are countable. Cardinality answers how many traversals exist, not how one traversal arranges them; geometry and measure make those distinctions.

## 3. Measure and Topological Extensions of Recurrence

Accumulation is not repetition: a path can return near a region without revisiting a point.

Cardinality alone does not describe the geometric novelty of a traversal. A countably infinite alphabet can be represented as a discrete escaping set \(\{1, 2, 3, \dots\}\), an accumulating set \(\{1, \tfrac{1}{2}, \tfrac{1}{3}, \dots\}\), or a dense set \(\mathbb{Q} \cap [0,1]\). All have cardinality \(\aleph_0\). To analyze novelty properly, \(K\) requires additional structure: a metric \(d\), a topology \(\tau\), or a measure \(\mu\).

### 3.1 Nonatomic Measure Spaces

**Continuous sampling in plain language**

A measure is *nonatomic* when no individual point carries positive weight. Imagine choosing a real number uniformly from \([0,1]\). Any particular target—say exactly \(1/3\)—has probability zero, but an interval such as \([0.30,0.40]\) has positive probability. Exact-point recurrence and region recurrence therefore become different questions. The instrument can almost surely avoid repeating an exact reading while returning to the same coarse region indefinitely.

Let \((K, \Sigma, \mu)\) be a nonatomic measure space, such as \(([0,1], \mathcal{B}, \lambda)\) with Lebesgue measure. In such a space, individual states satisfy \(\mu(\{x\}) = 0\). This is the natural setting in which the classical recurrence theorem of Poincaré and Birkhoff applies.1314

A traversal can therefore encounter a different exact state at every step (\(x_i \neq x_j\) for \(i \neq j\)) while remaining inside the same finite-measure region. For independent continuous sampling, exact repeats occur with probability zero. However, positive-measure regions can be revisited repeatedly.

**Theorem 3.1 (Exact Novelty with Regional Return).** For independent samples with a nonatomic probability law \(\mu\), exact repeats occur with probability zero. For each fixed measurable set \(B\) with \(\mu(B)>0\), the traversal visits \(B\) infinitely often almost surely. Thus one may have

\[
R_{\text{pt}}(L)=\emptyset
\]

while any specified positive-measure region recurs indefinitely.

For independent sampling, the regional-return statement follows from repeated positive-probability trials. Poincaré recurrence is the dynamical analogue: in a finite-measure system whose evolution preserves measure, almost every point that begins in a measurable region returns to that region infinitely often. The theorem does not say that one countable trajectory hits *every* positive-measure measurable set; indeed, the complement of its countable range can still have full measure. The modern dynamical treatments are due to Furstenberg,4 Walters, and Katok–Hasselblatt.15 For the topological recurrence viewpoint used in this section, see Alongi and Nelson.61

The beginner's takeaway is simple: “this exact point appeared again” is a microscopic statement, while “the trajectory returned to this region” is a finite-resolution statement. Nonatomic spaces let the second happen repeatedly without the first ever happening.

### 3.2 Limit Sets and Accumulation

Define the topological limit (or \(\omega\)-limit) set of a traversal as

\[
\omega(L) = \left\{ x \in K : \exists\, n_j \to \infty \text{ such that } x_{n_j} \to x \right\}.
\]

**Figure 2.** Three regimes of infinite traversal. All three satisfy the non-halting condition. They differ entirely in their asymptotic geometry: the recurrent regime revisits states exactly; the accumulating regime approaches a finite limit point with zero exact repetition; the escaping regime leaves every compact subset entirely.

Consider three traversals over \(K = [0,1]\):

- \(x_n = 1, 2, 1, 2, \dots\) on a discrete \(\{1,2\}\): \(R_{\text{pt}}(L) = \{1,2\}\), \(\omega(L) = \{1,2\}\) — exact recurrence.
- \(x_n = 1/(n+1)\): \(R_{\text{pt}}(L) = \emptyset\), but \(\omega(L) = \{0\}\) — interior accumulation.
- A dense non-repeating traversal of \([0,1]\): \(R_{\text{pt}}(L) = \emptyset\), but \(\omega(L) = [0,1]\).
- \(x_n = n\) in \(\mathbb{R}\): \(R_{\text{pt}}(L) = \emptyset\) and \(\omega(L) = \emptyset\) — escape from every compact subset.

Zero exact recurrence does not determine asymptotic geometry. Novelty requires *asymptotic structure*, not merely the counting of new symbols.

## 4. The Geometry of Novelty

Resolution turns “new” from a binary intuition into a geometric quantity.

**Novel to whom?**

Exact novelty treats every unequal point as equally new. A measuring instrument never does. At one-meter resolution, two positions a millimeter apart are indistinguishable; at micron resolution they are different. The parameter \(\varepsilon\) turns novelty into an operational question: is the new state farther than the observer's current resolving power from everything already seen?

To formalize novelty in a metric space \((K, d)\), define the distance of the current state from its previous history at step \(n\):

\[
\delta_n = \inf_{j < n} d(x_n, x_j).
\]

(Here \(\inf \varnothing := +\infty\), equivalently \(d(x, \varnothing) := +\infty\), so \(\delta_0 = +\infty\): the opening state is novel at every resolution.)

Exact novelty requires \(x_n \notin \{x_0, \dots, x_{n-1}\}\), i.e., \(\delta_n > 0\). *Geometric* novelty asks how large \(\delta_n\) is. A state is novel at resolution \(\varepsilon > 0\) when \(\delta_n > \varepsilon\).

### 4.1 Resolution-Dependent Novelty

Let \(P(K, \varepsilon)\) denote the packing number of \(K\), the maximum cardinality of an \(\varepsilon\)-separated subset:

\[
P(K, \varepsilon) = \max\bigl\{|E| : E \subset K,\; d(x,y) > \varepsilon \text{ for } x \neq y \in E\bigr\}.
\]

Picture placing non-overlapping safety bubbles around discovered points. If every pair of centers must stay more than \(\varepsilon\) apart, then bubbles of radius roughly \(\varepsilon/2\) cannot overlap. The packing number asks for the largest number of such mutually separated centers that fit inside \(K\). On \([0,1]\), the answer grows on the order of \(1/\varepsilon\): coarse resolution admits only a few distinguishable locations, while fine resolution admits many.

**Theorem 4.1 (Resolution Exhaustion).** If \(K\) is compact, then \(P(K, \varepsilon) < \infty\) for every \(\varepsilon > 0\). Consequently, an infinite zero-recurrence traversal satisfies \(\liminf_{n \to \infty} \delta_n = 0\).

Compactness forces arbitrarily close approximation but not exact repetition. This is the standard finite-resolution counterpart of the pigeonhole argument. The quantity \(P(K,\varepsilon)\) is the input to the entropy functionals of Kolmogorov–Sinai (measure-theoretic) and Adler–Konheim–McAndrew / Dinaburg–Bowen (topological), which quantify information-production rates of dynamics at scale \(\varepsilon\).5161718 Standard dimension texts treat the covering, packing, and separated-set estimates behind this resolution picture.495051

**Why compactness caps novelty at a fixed scale**

Compactness means that for every \(\varepsilon>0\), finitely many balls of radius \(\varepsilon/2\) cover \(K\). An \(\varepsilon\)-separated set can place at most one point inside each such ball, so it must be finite. Consequently a traversal may discover infinitely many exact points, but it cannot make infinitely many discoveries that all remain more than one fixed \(\varepsilon\) apart.

The escape hatch is to refine the question. After coarse novelty is exhausted, reduce \(\varepsilon\). This creates a *resolution ladder*:

\[
\varepsilon_0>\varepsilon_1>\varepsilon_2>\cdots\downarrow0.
\]

At every rung, only finitely many regions are distinguishable. Across infinitely many rungs, however, new distinctions may continue forever. That observation will later replace time depth by resolution depth.

**Figure 3.** Packing number \(P(K,\varepsilon)\) on \([0,1]\) at three resolutions. For compact \(K\), \(P(K,\varepsilon) < \infty\) for each fixed \(\varepsilon\), but \(P(K,\varepsilon) \to \infty\) as \(\varepsilon \to 0\). A traversal can remain exact-novel forever while exhausting novelty at every positive resolution.

### 4.2 The Three Regime Classification

An infinite traversal over a metric alphabet \(K\) falls into one of three mutually exclusive classes:

1.  *Exact recurrence*: \(R_{\mathrm{pt}}(L) \neq \varnothing\). At least one state is revisited infinitely often.
2.  *Novelty with accumulation*: \(R_{\mathrm{pt}}(L) = \varnothing\) but \(\omega(L) \neq \varnothing\). Nothing repeats exactly, yet some subsequence converges. This class includes accumulation at a point (\(x_n = 1/(n+1)\), \(\omega(L) = \{0\}\)), on a proper subset, and on the whole space (a dense non-repeating traversal of \([0,1]\), \(\omega(L) = [0,1]\)).
3.  *Escape*: \(R_{\mathrm{pt}}(L) = \varnothing\) and \(\omega(L) = \varnothing\). No subsequence converges; the trajectory eventually leaves every compact subset of \(K\) (\(x_n = n\) in \(\mathbb{R}\)).

These are qualitatively different asymptotic behaviors. The first forces replication; the second can occur within a compact region; the third requires noncompact room to leave.

Two calibrations. On compact \(K\), escape is impossible — sequential compactness gives \(\omega(L) \neq \varnothing\) for every traversal — and Theorem 4.1 sharpens regime 2: a zero-recurrence traversal on compact \(K\) satisfies \(\liminf_{n \to \infty} \delta_n = 0\). Uniform separation is sufficient but not necessary for escape: \(\delta_n \ge c > 0\) makes the sequence \(c\)-separated, so no subsequence converges; but \(x_n = \log(n+1)\) escapes with \(\delta_n = \log(1 + 1/n) \to 0\). Escape is the absence of accumulation, not a lower bound on the novelty gap.

## 5. Occurrence Space and Replication

State identity is not occurrence identity when a process revisits the same state.

For traversals that do exhibit recurrence (\(R_{\text{pt}}(L) \neq \emptyset\)), state identity alone is insufficient to identify an occurrence. The system requires an *occurrence space* \(\mathcal{O}\) to track individual instances of recurrent states.

For a recurrent state \(k \in R_{\text{pt}}(L)\), the occurrence space contains an infinite set of indexed instances:

\[
\mathcal{O}_k = \{k_1, k_2, k_3, \dots\}.
\]

The total occurrence space is the union over all recurrent states:

\[
\mathcal{O} = \bigcup_{k \in R_{\text{pt}}(L)} \mathcal{O}_k.
\]

### 5.1 Projection and Distinguishability

Define a projection map \(\pi : \mathcal{O} \to K\) with \(\pi(k_i) = k\). Elements in \(\mathcal{O}\) share state identity but maintain distinct occurrence identities. For any two occurrences \(k_i, k_j \in \mathcal{O}\) with \(i \neq j\):

\[
k_i \neq k_j \quad \text{(distinct as occurrences)}, \qquad \pi(k_i) = \pi(k_j) = k \quad \text{(identical under projection)}.
\]

The traversal \(L\) induces a strict total order \(<_L\) on \(\mathcal{O}\). Representation must therefore preserve three logically distinct pieces of information:

**Representation Requirements.** A representation map \(\Phi : \mathcal{O} \to X\) must preserve:

1.  **State identity**: occurrences of the same state share a recognizable feature.
2.  **Occurrence distinguishability**: distinct occurrences map to distinct images.
3.  **Traversal order**: the order \(<_L\) on \(\mathcal{O}\) corresponds to an order on the image.

**Figure 4.** The projection \(\pi : \mathcal{O} \to K\) collapses many distinct occurrences \(S_1, S_2, S_3, \dots\) onto the single state \(S\), recovering state identity at the cost of position. A representation \(\Phi\) must reverse this loss while preserving order.

## 6. Canonical Prefix Geometry

Infinite histories become rays in a prefix tree, and rays become boundary points.

The traversal should first generate its own geometry. Hyperbolic realization is a later question, not an input.

**A 30-second tree recap**

A tree is a collection of vertices joined by edges with exactly one simple route between any two vertices. There are no loops: once two routes split, they cannot meet again without creating a cycle. A *rooted* tree chooses one vertex as the beginning and organizes every other vertex by its distance from that root.

The key modeling choice is that a vertex will not mean “the current state.” It will mean “the entire history so far.” Two traversals that currently occupy the same state can therefore sit at different vertices if they arrived there through different histories. This is exactly the distinction the occurrence space in Section 5 demanded.

Let \(K\) be a discrete alphabet and define the *prefix tree*

\[
T_K := K^{<\omega} = \bigcup_{n<\omega} K^n.
\]

The empty word \(\varnothing\) is the root. A vertex \(u=(x_0,\ldots,x_{n-1})\) is joined by an edge of length one to each one-symbol extension \(u^\frown x_n\). Thus a traversal \(L=(x_0,x_1,\ldots)\) determines the ray

\[
\varnothing \to (x_0) \to (x_0,x_1) \to (x_0,x_1,x_2) \to \cdots.
\]

At depth \(n+1\), the vertex is exactly the accessible prefix \(I_n(L)=(x_0,\ldots,x_n)\). Order is encoded by depth, and distinct finite histories are distinct vertices. No auxiliary state labels or arbitrarily chosen geodesics are needed.

**Two histories, one current state**

Over \(K=\{S,A\}\), the prefixes \((S,A,S)\) and \((A,A,S)\) both end at state \(S\). A state-only picture would collapse them. The prefix tree does not:

\[
(S,A,S)\ne(A,A,S).
\]

Their final letters agree, but their vertices lie on different branches because their earlier decisions differ. State identity survives in the final coordinate; occurrence identity and order survive in the whole word.

**Proposition 6.1 (Intrinsic Hyperbolicity).** With its path metric, \(T_K\) is a geodesic \(0\)-hyperbolic space: every geodesic triangle is a tripod. Hyperbolicity therefore arises from the branching structure of traversal itself.3 Standard treatments of hyperbolic spaces and their boundaries include the expository volumes of Ghys–de la Harpe and Coornaert–Delzant–Papadopoulos.5455

Why a tripod? Choose any three vertices \(u,v,w\). The unique paths between them share a central branching vertex \(b\). Traveling from \(u\) to \(v\), from \(v\) to \(w\), and from \(w\) back to \(u\) merely traverses the three arms meeting at \(b\). There is no open triangular interior. In the language of hyperbolic geometry, the triangle is as thin as possible: it is \(0\)-thin.

**Figure 5.** The highlighted ray is \(L=(S,A,A,\ldots)\). Its vertices are not merely locations: each one is the entire finite history observed so far.

**Figure 5A.** *Left:* unique paths force a geodesic triangle to collapse onto three arms meeting at \(b\). *Right:* longer prefixes carve out nested cylinders that shrink to one boundary point.

### 6.1 Rays and the Canonical Boundary

Every infinite word selects exactly one successor at each depth, and every rooted ray determines exactly one infinite word. Hence the endpoint map

\[
F:K^\omega \longrightarrow \partial T_K, \qquad L \longmapsto \xi_L=[\gamma_L],
\]

is a canonical bijection. This repairs the central defect of the earlier direct embedding into \(\mathbb H^2\): the tree geometry itself remembers the complete traversal.

The word *boundary* can be misleading on first encounter. The endpoint \(\xi_L\) is not an additional vertex sitting one step after every finite prefix. There is no “last edge” from a very distant vertex to \(\xi_L\). Instead, \(\xi_L\) is the equivalence class of the entire ray: it records the direction in which the rooted path continues forever. Boundary points describe infinite behavior rather than locations reached in finite time.

### 6.2 Cylinders and the Prefix Metric

For a finite word \(u\in K^{<\omega}\), the boundary points compatible with \(u\) form the cylinder

\[
[u] := \{\xi_L\in\partial T_K : u \text{ is a prefix of } L\}.
\]

If \(u_N=I_N(L)\), then finite information identifies \([u_N]\), not a single endpoint. The cylinders refine exactly:

\[
[x_0] \supset [x_0x_1] \supset [x_0x_1x_2] \supset \cdots,
\]

\[
\bigcap_{N=0}^{\infty}[I_N(L)] = \{\xi_L\}.
\]

*((6.1))*

Let \(\ell(L,L')\) be the number of symbols in the longest common prefix, with \(\ell(L,L)=\infty\). For any \(a>1\), define

\[
d_a(L,L') := a^{-\ell(L,L')}, \qquad a^{-\infty}:=0.
\]

**Convention.** All sequences and all resolution levels in this document are indexed from \(0\), and agreement length always means the first disagreement index: \(\ell(x,y) = \min\{j : x_j \neq y_j\}\), with \(\min \varnothing := \infty\). Agreement through index \(N\) is therefore \(\ell \ge N+1\) and distance at most \(a^{-(N+1)}\).

**Proposition 6.2 (Prefix Ultrametric).** The function \(d_a\) is an ultrametric inducing the product topology on \(K^\omega\). A cylinder fixed through \(x_N\) is a closed ball of radius \(a^{-(N+1)}\). Thus every finite prefix leaves positive geometric uncertainty, while these radii converge to zero.

This nested-ball geometry is also the basic language of ultrametric analysis; the \(p\)-adic identification in §7.1 is one arithmetic instance of the same pattern.52

**Distance means shared history**

Let

\[
L=(S,A,S,S,\ldots),
\qquad
L'=(S,A,A,S,\ldots).
\]

They agree on the first two symbols and split at the third, so \(\ell(L,L')=2\) and \(d_a(L,L')=a^{-2}\). If another traversal agreed with \(L\) for one hundred symbols before splitting, its distance from \(L\) would be \(a^{-100}\)—tiny even if the later tails become completely different.

This is not the usual numerical distance between symbols. It is a distance between *complete histories*. The ultrametric inequality says that if two pairs each share a long initial history, the remaining pair cannot suddenly be much farther apart. Nested cylinders behave like nested envelopes: opening one more envelope reveals one more symbol and reduces the set of possible completions.

### 6.3 Halting as a Boundary Property

The boundary \(\partial T_K\) contains every infinite sequence, including eventually constant ones such as \((S,A,A,A,\ldots)\). The non-halting traversal space is therefore the boundary subset

\[
\mathcal T_\infty = \{L\in K^\omega : L \text{ is not eventually constant}\}.
\]

Recurrence does not create the boundary; it classifies particular rays inside it. For \(K=\{S,A\}\), a non-halting ray has infinitely many finite runs and therefore alternates between \(S\)-runs and \(A\)-runs indefinitely.

## 7. Boundary Topology and Alphabet Size

Finite branching gives Cantor-like compactness; countable branching gives Baire-space behavior.

The topology of \(\partial T_K\cong K^\omega\) changes sharply with the branching capacity of the alphabet. That transition is the first rigorous connection between symbolic novelty and boundary geometry.

Compactness is best read here as a statement about escaping descriptions. In a compact boundary, no sequence of candidate completions can keep fleeing every possible limiting pattern; some subsequence must stabilize prefix by prefix. Noncompactness means that even the first symbol can keep changing so that no such stabilization begins.

### 7.1 Finite Alphabets: Cantor Space

Suppose \(K\) is finite and \(2\le |K|=q<\infty\). Then \(T_K\) is the rooted \(q\)-ary tree, with \(q^n\) vertices at depth \(n\). The product space \(K^\omega\), equivalently the prefix-ultrametric boundary, is compact, totally disconnected, and perfect. Up to homeomorphism it is Cantor space.25

**Proposition 7.1 (Finite-Branching Compactness).** For finite discrete \(K\), every sequence of boundary rays has a subsequence whose prefixes stabilize at every finite depth. Consequently, \(\partial T_K\) is compact.

This is a diagonal form of compactness: finite branching permits the repeated extraction of an infinite subsequence through one common successor. It does *not* say that individual symbols cannot be novel for long stretches; it says the space of all infinite completions is topologically bounded.

**The diagonal extraction, slowly**

Take any infinite list of binary rays. Infinitely many of them must begin with the same first symbol—keep those and discard the rest. Among the surviving rays, infinitely many share a second symbol—keep those. Repeat. The first chosen symbol, then the second, then the third, define a limiting ray. At stage \(J\), every sufficiently late member of the diagonal subsequence agrees with that ray through depth \(J\).

The argument works because each stage offers only finitely many successors. It is the infinite-sequence version of repeatedly choosing a drawer that contains infinitely many remaining objects.

#### Exact anchor: the \(p\)-adic integers

The prefix-boundary construction already contains a standard number-theoretic object. Fix a prime \(p\) and take the digit alphabet

\[
K_p=\{0,1,\ldots,p-1\}.
\]

For a finite word \(w=(x_0,\ldots,x_{n-1})\in K_p^n\), define

\[
\Phi_n(w)
=
\sum_{i=0}^{n-1}x_i p^i
\pmod{p^n}
\in\mathbb Z/p^n\mathbb Z.
\]

This is a bijection. More importantly, it respects the parent maps: deleting the newest tree digit \(x_n\) corresponds exactly to reducing a residue modulo \(p^{n+1}\) to one modulo \(p^n\). Thus the diagram

\[
\begin{array}{ccc}
K_p^{n+1} & \longrightarrow & K_p^n\\
\downarrow\scriptstyle{\Phi_{n+1}} && \downarrow\scriptstyle{\Phi_n}\\
\mathbb Z/p^{n+1}\mathbb Z & \longrightarrow & \mathbb Z/p^n\mathbb Z
\end{array}
\]

commutes. Passing to inverse limits gives the exact chain

\[
\boxed{
\partial T_{K_p}
\cong
K_p^\omega
\cong
\varprojlim_n K_p^n
\cong
\varprojlim_n\mathbb Z/p^n\mathbb Z
\cong
\mathbb Z_p.
}
\]

The connection between the full \(p\)-ary tree, infinite words, nested \(p\)-adic balls, and \(\mathbb Z_p\) is classical.31 It is an exact example of the raw prefix boundary developed in §6, not an application of the ordered-novelty construction in §10.

When the digit stream is generated by a finite automaton, this address-space picture also meets the theory of automatic sequences: finite-state generation can constrain the infinite word without changing the underlying prefix boundary.53

**Digit orientation is essential.** The identification reads a traversal in increasing \(p\)-adic place value:

\[
\Phi(x_0,x_1,\ldots)=\sum_{n=0}^{\infty}x_np^n.
\]

Thus \(x_n\) is the coefficient of \(p^n\). A depth-\(r\) prefix fixes the residue modulo \(p^r\). Interpreting \(x_0\) as a most-significant digit would not be compatible with the inverse system \(\mathbb Z/p^{n+1}\mathbb Z\to\mathbb Z/p^n\mathbb Z\).

If two digit rays first disagree at index \(r\), their images agree modulo \(p^r\) but not modulo \(p^{r+1}\). Therefore

\[
v_p\!\left(\Phi(x)-\Phi(y)\right)=r,
\]

and Proposition 6.2 with base \(a=p\) becomes the \(p\)-adic metric exactly:

\[
\boxed{
d_{\partial}(x,y)
=p^{-\ell(x,y)}
=p^{-v_p(\Phi(x)-\Phi(y))}
=d_p(\Phi(x),\Phi(y)).
}
\]

**Why Section 10 is still necessary**

The \(p\)-adic anchor preserves every digit, including repetition. Repeated digits carry arithmetic information: \(1111\ldots\) and \(1010\ldots\) are different \(p\)-adic integers. Ordered novelty asks a different question and deliberately deletes repeated visits after their first discovery at each resolution. Raw prefix completion therefore models situations in which repetition is semantic; novelty completion is needed precisely when repetition should instead be quotiented away.

The profinite integers provide a broader companion example:

\[
\widehat{\mathbb Z}
=
\varprojlim_{n\in(\mathbb N,\mid)}\mathbb Z/n\mathbb Z
\cong
\prod_{p}\mathbb Z_p,
\]

where the index set ranges over all positive moduli ordered by divisibility and the product decomposition follows from the Chinese remainder theorem. Unlike a single \(\mathbb Z_p\), this is not literally the boundary of one fixed finite-alphabet prefix tree; it assembles all prime-power completions into a profinite product. Its role here is to demonstrate the broader inverse-limit pattern, while \(N_P(K)\) remains the traversal-specific construction whose coordinates are ordered finite-resolution discoveries.

### 7.2 Countable Alphabets: Baire Space

For \(K=\mathbb N\) with the discrete topology, every vertex has countably many children and

\[
\partial T_{\mathbb N}\cong\mathbb N^\omega,
\]

the classical Baire space. It is completely metrizable, separable, and totally disconnected, but not compact.25 Indeed, the first-symbol cylinders \([n]\) form an open cover with no finite subcover:

\[
\mathbb N^\omega=\bigcup_{n\in\mathbb N}[n].
\]

**Proposition 7.2 (Branching–Properness Correspondence).** The countably branching tree \(T_{\mathbb N}\) remains \(0\)-hyperbolic but is not proper: its closed radius-one ball about the root contains infinitely many pairwise separated vertices. Correspondingly, its natural boundary is noncompact. **Structural transition.**

\[
\text{unbounded local novelty}\quad\longleftrightarrow\quad
\text{failure of properness}\quad\longleftrightarrow\quad
\text{noncompact raw boundary}.
\]

This is a literal statement about branching, bounded balls, and boundary topology—not an analogy.

**Figure 5B.** Finite branching forces repeated choices from which a diagonal limit can be extracted. Countably many first-level branches allow a sequence of rays to escape before any prefix stabilizes.

## 8. Novelty Quotients

Forgetting detail is safe only when the identification preserves the topology of future behavior.

**Collapsing descriptions that count as the same**

A quotient space is what remains after declaring some points equivalent and treating each equivalence class as one new point. A street map quotients away building interiors; a color-blind sensor may quotient many wavelengths into one reading. The operation is powerful because it removes distinctions judged irrelevant—but dangerous because careless identifications can damage the topology.

Here the raw boundary remembers every exact infinite traversal. A novelty quotient asks for less: perhaps two traversals should count as the same when they have the same limiting measure, the same accumulation set, or the same multiscale discovery profile.

Prefix completion and novelty identification are distinct operations. First, the full traversal determines its canonical endpoint \(\xi_L\in\partial T_K\). Only then does a chosen invariant identify endpoints that carry the same asymptotic novelty information:

\[
L\longmapsto\xi_L\in\partial T_K
\longmapsto [\xi_L]_{\mathrm{nov}}.
\]

Let \(\mathcal N_\infty\) be an asymptotic invariant and define

\[
L\sim_{\mathrm{nov}}L'
\iff \mathcal N_\infty(L)=\mathcal N_\infty(L').
\]

The resulting space is

\[
Q_{\mathrm{nov}}:=\partial T_K/{\sim}_{\mathrm{nov}}.
\]

**Figure 6.** Hyperbolic geometry does not perform the novelty quotient. It can realize the topology that remains after the invariant has done so.

### 8.1 Closed Equivalence Relations

For finite \(K\), the raw boundary \(K^\omega\) is already compact metric. The quotient is well behaved precisely when novelty equivalence does not acquire new identifications only in the limit. Write

\[
R_{\mathrm{nov}}:=\{(L,L')\in K^\omega\times K^\omega:L\sim_{\mathrm{nov}}L'\}.
\]

**Theorem 8.1 (Closed Novelty Quotient).** If \(K\) is finite and \(R_{\mathrm{nov}}\) is closed in \(K^\omega\times K^\omega\), then \(Q_{\mathrm{nov}}\) is compact and metrizable. **Proof.** The quotient of a compact space is compact. A closed equivalence relation on a compact Hausdorff space has Hausdorff quotient; a Hausdorff quotient of a compact metrizable space by such a relation is again metrizable.20 \(\blacksquare\)

Closedness prevents a limiting-behavior trap. Suppose pairs \((L_m,L'_m)\) are equivalent for every \(m\) and converge to \((L,L')\). If the relation is closed, the limiting pair remains equivalent. If it is not closed, classes that looked consistently glued together can tear apart at the limit, and the quotient may fail to distinguish points topologically.

**Preview of the failure repaired in §10.4 (Definition 10.4)**

Over \(K=\{0,1\}\), let \(A_T=0^T1^\omega\) and let \(B=010^\omega\). If the invariant remembers only the order in which distinct symbols first appear, both have profile \((0,1)\). Yet \(A_T\to0^\omega\) in the prefix topology, while \(B\) remains fixed; the limit profile of \(0^\omega\) is only \((0)\). Equivalent pairs can therefore converge to a nonequivalent pair. This is why ordered novelty eventually receives its own discovery topology instead of being forced through the prefix quotient.

### 8.2 Novelty Compactification Criterion

For a countably infinite alphabet, quotienting can change the decisive topological property. Begin with the noncompact Baire boundary \(K^\omega\). Suppose there is a compact metric target \(Z\) and a continuous surjective *quotient map*

\[
\mathcal N_\infty:K^\omega\twoheadrightarrow Z.
\]

**Theorem 8.2 (Novelty Compactification Criterion).** Define \(L\sim_{\mathrm{nov}}L'\) exactly when \(\mathcal N_\infty(L)=\mathcal N_\infty(L')\). Then the induced map

\[
\overline{\mathcal N}_\infty:Q_{\mathrm{nov}}\longrightarrow Z
\]

is a homeomorphism. In particular, the novelty quotient is compact metrizable. **Why “quotient map” matters.** A continuous surjection from a noncompact space need not be a quotient map with the intended topology under every reformulation. The explicit quotient-map hypothesis is what makes the conclusion immediate and prevents topology from being smuggled into the claim.

In everyday terms, a quotient map guarantees that the topology on \(Z\) is exactly the topology seen after collapsing the fibers of \(\mathcal N_\infty\). It rules out giving the target an unrelated topology after the fact. The theorem is therefore not merely saying “there is a surjection onto a compact set”; it says the compact set is genuinely the topological space of equivalence classes.

## 9. Proper Hyperbolic Realization

A compact metric novelty space can be realized as the boundary of a proper hyperbolic space.

Only after the canonical boundary and the novelty quotient have been defined should one ask whether the result occurs as the Gromov boundary of another space.

**What the Poincaré disk is doing**

The Poincaré disk draws the infinite hyperbolic plane inside an ordinary Euclidean circle. Hyperbolic distances stretch dramatically near the rim: points that look visually close to the circle are still infinitely far from the center in the hyperbolic metric. The rim is therefore not part of the plane. It records ideal directions in which geodesics can escape.

That makes the disk a natural picture for an infinite ray, but a picture is not yet a representation theorem. We must first know which boundary topology the traversal construction produces and whether that topology can occur as the boundary of a *proper* hyperbolic space.

### 9.1 The Compactness Obstruction

**Theorem 9.1 (Necessary Boundary Condition).** If \(X\) is a proper geodesic Gromov-hyperbolic space and \(\partial X\cong Q_{\mathrm{nov}}\), then \(Q_{\mathrm{nov}}\) is compact and metrizable.22

Therefore a noncompact novelty quotient cannot be the boundary of a *proper* geodesic hyperbolic space. In particular,

\[
\partial T_{\mathbb N}\cong\mathbb N^\omega
\]

cannot itself be such a boundary. There is no contradiction: \(T_{\mathbb N}\) is hyperbolic but not proper, exactly as Proposition 7.2 records.

Properness is the local finiteness condition needed here: every closed bounded region must be compact. A countably branching root already violates it, because the radius-one ball contains infinitely many children separated from one another. The noncompact Baire boundary is the asymptotic shadow of that local explosion. A proper hyperbolic space cannot have such a noncompact Gromov boundary.

### 9.2 Realization After Quotienting

**Theorem 9.2 (Compact Metric Realization).** Every compact metrizable space \(Z\) occurs, up to homeomorphism, as the boundary of a proper visual Gromov-hyperbolic space obtained by a hyperbolic approximation construction.26 Bonk and Schramm provide a complementary embedding theorem for Gromov-hyperbolic spaces.56

Combining Theorems 8.1 or 8.2 with Theorem 9.2 gives the rigorous pipeline

\[
K^\omega\longrightarrow Q_{\mathrm{nov}}
\cong Z\longrightarrow\partial X.
\]

Hyperbolicity does not solve infinite novelty. The invariant first compresses the raw, possibly noncompact completion space into a compact asymptotic object; hyperbolic geometry can then realize that object.

The hyperbolic-approximation theorem can be read constructively: start from a compact metric space \(Z\), place vertices representing sets visible at successively finer scales, and connect fine sets to nearby coarse parents. The resulting graph expands resolution into depth. Its large-scale geometry is hyperbolic, and its ideal boundary reconstructs \(Z\). In Section 10, the ordered novelty construction becomes even more explicit because its compatible finite profiles already form the required tree.

### 9.3 What the Poincaré Disk Represents

For finite \(K\), the regular tree \(T_K\) admits a quasi-isometric realization by a bounded-valence tree in \(\mathbb H^2\). Its boundary is Cantor space, whereas \(\partial\mathbb H^2\cong S^1\). Consequently the traversal boundary occupies a Cantor-like subset of the circle at infinity, not the entire circle.9 Beardon is a standard reference for the Möbius, Fuchsian, and Poincaré-disk geometry behind this picture.57

**Correct role of \(\mathbb H^2\).** The Poincaré disk is a possible realization of a bounded-branching traversal geometry. It is not the definition of completion, and it does not automatically realize a countably branching boundary or an arbitrary novelty quotient.

**Figure 6A.** A bounded-valence tree can live quasi-isometrically in \(\mathbb H^2\), but its rays approach a totally disconnected subset of the circle. The whole circle contains many directions not represented by traversal branches.

## 10. Candidate Novelty Invariants

Ordered first discoveries across refining resolutions form the completed novelty space.

The remaining mathematical choice is substantive: what asymptotic information should survive quotienting? Different invariants retain different geometries.

**Three summaries of one endless path**

Imagine two traversals that eventually visit the same states. One discovers them immediately in the order \(a,b,c,d,\ldots\); the other spends long intervals revisiting \(a\) before revealing \(b\), then \(c\), then \(d\). Their visited sets can agree even though the experience of discovery is different.

An empirical measure asks *how often* regions are occupied. An accumulation set asks *where* the tail keeps returning or approaching. Ordered novelty asks *which new distinction appeared first, second, third, and at what scale*. None is universally best; each is a deliberate forgetting operation.

### 10.1 Empirical Measures

For a traversal in a compact metric alphabet \(K\), define the empirical measures

\[
\mu_N^L:=\frac1N\sum_{n=1}^{N}\delta_{x_n}.
\]

(\(\delta_x\) is the Dirac mass at \(x\); the novelty gap of §4 never appears with a point subscript.)

On the domain \(\mathcal T_\mu\subseteq K^\omega\) where \(\mu_N^L\) converges weakly, let \(\mathcal N_\infty(L)=\mu_L\). Equality of \(\mu_L\) forgets order and exact path while retaining asymptotic occupancy frequencies. The target \(\mathcal P(K)\) of Borel probability measures is compact metrizable in the weak topology when \(K\) is compact metric.27

Read \(\mu_N^L\) as a histogram made from the first \(N\) observations. It assigns mass \(1/N\) to each observation, counting repeats with multiplicity. Weak convergence means that, when tested against continuous measurements, these histograms settle toward a stable probability distribution. Shuffling a long block barely changes the histogram, which is precisely why temporal order disappears.

**Continuity caveat.** Compactness of \(\mathcal P(K)\) does not by itself prove that \(L\mapsto\mu_L\) is continuous or quotient for the prefix topology; in general it is not continuous. The invariant supplies a compact *target*, while Theorem 8.2 still requires its topological hypotheses to be checked on the chosen domain and topology.

### 10.2 Accumulation Sets

Another invariant retains where the path accumulates:

\[
\mathcal N_\infty(L):=\omega(L).
\]

If \(K\) is compact metric, then \(\omega(L)\) is a nonempty compact subset of \(K\). The hyperspace \(\mathcal K(K)\) of nonempty compact subsets, equipped with the Hausdorff metric, is compact metric.28 This quotient forgets visitation frequencies but retains the topological locus of recurrent approximation.

For \(L=(1,1/2,1/3,\ldots)\), the accumulation set is only \(\{0\}\). It remembers the destination of the shrinking tail but forgets the entire ordered ladder \(1,1/2,1/3,\ldots\). A different sequence converging to \(0\) receives the same accumulation set. That is useful when only limiting location matters and unacceptable when discovery order is the object of study.

**A second continuity caveat.** The map \(L\mapsto\omega(L)\) is also not generally continuous in the prefix topology. Small prefix distance allows arbitrary changes in the tail, and the tail controls the limit set. The compact hyperspace is a candidate codomain, not a completed proof of the quotient criterion.

### 10.3 The Ordered Novelty Process

Empirical measures and accumulation sets destroy the temporal order of discovery. To preserve it, define the first-discovery indices recursively. Put \(\tau_0=0\) and, whenever another unseen state exists, let

\[
\tau_{m+1}:=\min\{n>\tau_m:x_n\notin\{x_0,\ldots,x_{n-1}\}\}.
\]

The ordinary clock advances at every \(n\). The discovery clock advances only at the indices \(\tau_m\). If

\[
L=(a,a,a,b,a,a,c,a,d,\ldots),
\]

then the discovery clock reads \(\tau_0=0\), \(\tau_1=3\), \(\tau_2=6\), \(\tau_3=8\), and the corresponding spine is \((a,b,c,d,\ldots)\). Repeated dwell and revisits remain part of the original traversal but vanish from this particular summary.

The *ordered discovery spine* is the sequence of states seen for the first time:

\[
\mathcal N_{\mathrm{ord}}(L):=(x_{\tau_0},x_{\tau_1},x_{\tau_2},\ldots).
\]

For metric \(K\), attach the geometric scale of each discovery: for \(m \ge 1\),

\[
\delta_m:=d\!\left(x_{\tau_m},\{x_{\tau_0},\ldots,x_{\tau_{m-1}}\}\right),
\]

and \(\delta_0 = d(x_{\tau_0}, \varnothing) = +\infty\) by the convention of §4. Every state occurring before \(\tau_m\) is a repeat of an earlier discovery, so \(\{x_j : j < \tau_m\} = \{x_{\tau_0}, \ldots, x_{\tau_{m-1}}\}\) as sets, and therefore \(\delta_m = \delta_{\tau_m}\): the discovery-scale sequence is the nearest-history gap sequence of §4 sampled at the discovery clock.

The resulting ordered novelty object is

\[
\mathcal N^*(L):=\bigl((x_{\tau_0},\delta_0),(x_{\tau_1},\delta_1),\ldots\bigr).
\]

This core object preserves which novelty appears, its order, and its geometric separation while discarding redundant revisits. If discovery *pace* must also survive, augment it with the gaps \(g_m:=\tau_m-\tau_{m-1}\). Keeping \(g_m\) distinguishes a rapid sequence of discoveries from the same discoveries separated by long dwell periods; omitting it deliberately quotients those dwell periods out.

This distinction prevents a subtle overclaim. The sequence \((\delta_m)\) measures geometric separation between successive discoveries; it does not by itself say how quickly discoveries occur in ordinary time. Pace belongs to \((g_m)\) or to the two-variable statistic \(M_L(\varepsilon,N)\) introduced later. Geometry, order, and rate are three different coordinates of novelty.

**Definition 10.1 (Exact Tail Equivalence).** Two infinite ordered novelty processes are tail-equivalent if there exist offsets \(r,s\ge0\) such that

\[
\forall j\ge0:\quad
(x_{\tau_{r+j}},\delta_{r+j})=(x'_{\tau'_{s+j}},\delta'_{s+j}).
\]

This forgets finite initial discoveries while preserving the complete order and scale of the remaining process. **Topological warning.** Exact tail equivalence is generally not closed in the prefix topology: equivalence may begin farther and farther out along a convergent sequence of pairs and disappear in the limit.25 Its quotient can therefore fail to be Hausdorff, so Theorem 8.1 does not apply automatically. A successful novelty completion must either strengthen the topology, replace exact tail matching by a closed asymptotic relation, or map the ordered process continuously into a compact metric target.

The obstruction concerns the *prefix topology*, not ordered novelty itself. A compact encoding becomes possible once depth records spatial resolution rather than elapsed time.

**Figure 7A.** Each \(A_T=0^T1^\omega\) eventually discovers \(1\), but the discovery occurs beyond every fixed prefix as \(T\to\infty\). The prefix limit \(0^\omega\) never discovers \(1\), so complete discovery profile is discontinuous in prefix topology.

### 10.4 Resolution-Depth Completion

Let \((K,d)\) be compact metric. Fix a **refining partition tower** \(\mathcal P = (\mathcal P_j)_{j\ge 0}\): finite partitions with \(\mathcal P_{j+1}\) refining \(\mathcal P_j\), parent maps \(p_j : \mathcal P_{j+1} \to \mathcal P_j\), and \(\operatorname{mesh}(\mathcal P_j) \le \varepsilon_j \downarrow 0\). Everything constructed in §§10.4–10.6 depends on \(\mathcal P\). We write \(N_P(K)\) and \(C^P_{\mathrm{nov}}\) when the dependence matters and suppress the superscript while a single tower is fixed.

At resolution \(j\), scan \(L\) chronologically and retain a cell only on its first occurrence. The resulting finite injective word

\[
D_j(L)=(P_{j,r_1},P_{j,r_2},\ldots,P_{j,r_m})
\]

records the order in which new \(\varepsilon_j\)-regions are discovered. Dwell and revisits disappear, but discovery order remains. A fixed-\(\varepsilon\) discovery tree cannot do this job: total boundedness bounds every \(\varepsilon\)-separated branch by the packing number, so that tree has finite depth and empty boundary. The scale must refine with depth.

Given a word over \(\mathcal P_{j+1}\), apply \(p_j\) to each letter and delete every repeated parent after its first appearance. Denote this parent-and-reduce operation by \(q_{j+1,j}\). First entry into a coarse cell is necessarily first entry into some previously unseen fine cell inside it; hence

**Lemma 10.2 (Coarse-Graining Compatibility).** For every traversal \(L\) and every \(j\),

\[
D_j(L)=q_{j+1,j}\!\left(D_{j+1}(L)\right).
\]

**Coarse and fine discovery words by hand**

Partition \([0,1]\) first into left and right halves, then into four quarter-cells \(Q_1,Q_2,Q_3,Q_4\). For

\[
L=(0.8,0.1,0.7,0.2,0.4,\ldots),
\]

the half-scale itinerary is right, left, right, left, left, so its first-discovery word is

\[
D_1(L)=(R,L).
\]

At quarter scale the itinerary begins \(Q_4,Q_1,Q_3,Q_1,Q_2\), giving

\[
D_2(L)=(Q_4,Q_1,Q_3,Q_2).
\]

Sending quarters to their half-parents produces \((R,L,R,L)\); deleting later repeats leaves \((R,L)=D_1(L)\). Fine resolution reveals extra internal discoveries without changing the first time each coarse region appeared.

**Figure 7.** Fine discoveries are not merely forgotten: they are projected to parent cells, and the first occurrence fixes the coarse discovery order.

Let \(X_j\) be the finite discrete set of nonempty injective words over \(\mathcal P_j\). The parent-and-reduce maps form an inverse system. Define the associated ordered novelty space

\[
N_P(K):=\varprojlim_j(X_j,q_{j+1,j})
=\left\{(D_0,D_1,\ldots):q_{j+1,j}(D_{j+1})=D_j\right\}.
\]

**Theorem 10.3 (Compact Ordered Novelty Space).** For any refining tower \(\mathcal P\), the space \(N_P(K)\) is compact, metrizable, and zero-dimensional. If

\[
r(\mathbf D,\mathbf E):=\min\{j\ge0:D_j\ne E_j\},
\]

with \(r=\infty\) when \(\mathbf D=\mathbf E\), then

\[
d_{\mathrm{nov}}(\mathbf D,\mathbf E):=
\begin{cases}0,&\mathbf D=\mathbf E,\\2^{-r(\mathbf D,\mathbf E)},&\mathbf D\ne\mathbf E,
\end{cases}
\]

is a compatible ultrametric.

**Indexing.** The convention of §6.2 applies: \(r(\mathbf D,\mathbf E) = \min\{j : D_j \neq E_j\}\) is the first disagreement index, so agreement through level \(J\) is \(r \ge J+1\) and \(d_{\mathrm{nov}}(\mathbf D,\mathbf E) \le 2^{-(J+1)}\).

Indeed, \(\prod_jX_j\) is a countable product of finite discrete spaces, and the compatibility equations define a closed subset. This is the classical inverse-limit/Stone-space pattern for finite discrete approximants.5859 The ultrametric says that two profiles are close precisely when their ordered discoveries agree through many levels of spatial resolution. The accompanying zero-dimensional compact-space perspective belongs to the classical dimension theory of Hurewicz and Wallman.60

The map

\[
C^P_{\mathrm{nov}}:K^\omega\longrightarrow N_P(K),
\qquad L\longmapsto(D_0(L),D_1(L),\ldots),
\]

is generally *not* continuous in the prefix topology. For \(K=\{0,1\}\), let \(A_T=0^T1^\omega\) and \(B=010^\omega\). Once the partitions separate \(0\) and \(1\), every pair \((A_T,B)\) has the same ordered profile \((0,1)\), but \(A_T\to0^\omega\), whose profile is only \((0)\). Thus the kernel of \(C^P_{\mathrm{nov}}\) is not closed in the original prefix topology.

**Definition 10.4 (Discovery Topology and Completion).** Equip traversals with the coarsest topology making every coordinate \(D_j\) continuous. Equivalently, use the pseudometric

\[
\rho_{\mathrm{disc}}(L,L'):=d_{\mathrm{nov}}\!\left(C^P_{\mathrm{nov}}(L),C^P_{\mathrm{nov}}(L')\right).
\]

After identifying zero-distance traversals, the discovery space embeds isometrically as

\[
R:=C^P_{\mathrm{nov}}(K^\omega)\subseteq N_P(K),
\]

and its metric completion is the compact space \(\overline R\subseteq N_P(K)\).

The topology has now changed its question. In prefix topology, two traversals are close when their first many *moments* agree. In discovery topology, they are close when their complete first-discovery orders agree through many *resolutions*. A late discovery can be invisible to every short prefix yet decisive to a coarse discovery word; conversely, enormous dwell-time differences disappear if they do not change which cells are first encountered.

\[
\boxed{
\begin{array}{rcl}
\text{prefix distance} &:& \text{How long do the histories agree?}\\[2mm]
\text{discovery distance} &:& \text{How finely do their novelty structures agree?}
\end{array}}
\]

This completion also has an explicit hyperbolic realization. Form a rooted tree \(T_R\) whose level-\(j\) vertices are the compatible blocks \((D_0,\ldots,D_j)\) occurring as initial blocks of profiles in \(R\), and join each block to its one-coordinate extension. When the realizable blocks span the full compatibility tree — under finite-profile extension, §10.6 — we write \(T_{\mathrm{nov}}(\mathcal P)\) for \(T_R\). Every level is finite, so \(T_R\) is locally finite; with unit edges it is proper, geodesic, and \(0\)-hyperbolic. A ray is exactly a coherent profile whose every finite block is realizable, which is exactly the product-topology closure of \(R\). Therefore

**Theorem 10.5 (Explicit Novelty Boundary).**

\[
\boxed{\partial T_R\cong\overline{C^P_{\mathrm{nov}}(K^\omega)}}.
\]

The construction preserves identity up to resolution, distinguishability between cells, and discovery order. If the partition tower separates points, state identity becomes exact in the infinite-resolution limit. **Pointwise realization versus density.** Not every formally coherent element of \(N_P(K)\) need be realized by one traversal. The boundary is therefore stated first as \(\overline R\). Section 10.6 proves that for the full traversal class every finite compatible block is realizable, so \(\overline R=N_P(K)\) even when \(R\ne N_P(K)\). Research lineage · Dynamic Prime Cantor Set

An earlier construction, the *Dynamic Prime Cantor Set*, already explored the same refinement–compatibility–boundary architecture in a concrete setting: a prime-indexed, nonstationary subdivision rule generates finite interval choices whose compatible infinite addresses form a Cantor-like limit object. That construction refines *space*; the present one refines *information* by replacing spatial addresses with ordered first-discovery profiles.

The DPC construction is therefore a concrete ancestor of the geometric intuition here, not a proof of the present completion theorem. If its prime-driven refinement is treated as a tower \(\mathcal P^{\mathrm{prime}}\) and a traversal is then observed through that tower, the current machinery produces the corresponding \(N_{\mathcal P^{\mathrm{prime}}}(K)\).

https://research.shunyabar.foo/posts/dynamic-prime-cantor-set.html

### 10.5 The Reciprocal-Sequence Computation

Take \(K=[0,1]\), dyadic partitions of width \(2^{-j}\), and \(L=(1,1/2,1/3,\ldots)\). Put \(N=2^j\) and \(M_j:=|D_j(L)|\). Apart from an endpoint convention affecting at most a constant number of cells, \(M_j\) is the number of distinct integer values of \(\lfloor N/n\rfloor\).

**Lemma 10.6 (Reciprocal Discovery Count).**

\[
M_j=\Theta(2^{j/2}).
\]

Consequently,

\[
\lim_{j\to\infty}\frac{\log M_j}{\log 2^j}=\frac12.
\]

**Proof.** Let \(m=\lfloor\sqrt N\rfloor\). For \(n\le m\), there are at most \(m\) quotient values. For \(n>m\), every quotient \(\lfloor N/n\rfloor\) lies in \(\{0,1,\ldots,m\}\), giving at most \(m+1\) further values. Hence \(M_j=O(\sqrt N)\). Conversely, every integer \(q\le m-1\) occurs: choosing \(n=\lfloor N/q\rfloor\) gives \(\lfloor N/n\rfloor=q\) because \(q(q+1)\le N\). Thus \(M_j=\Omega(\sqrt N)\), proving the claim. \(\blacksquare\)

The exponent \(1/2\) is real, but it must be named correctly. The scalar \(M_j\) forgets discovery order and records the eventual dyadic covering complexity of the visited set \(\{1/n:n\ge1\}\); it is a box-counting exponent, not a temporal discovery-rate exponent.29 It differs from that set's Hausdorff dimension \(0\) and from the ambient dimension \(1\), while the full words \(D_j(L)\) still distinguish different enumerations of the same set.

To measure pace without choosing a partition tower, retain time as a second variable. For example, let

\[
M_L(\varepsilon,N):=\max\left\{|E|:
E\subseteq\{x_0,\ldots,x_N\}\text{ is }\varepsilon\text{-separated}\right\}.
\]

The function \(N\mapsto M_L(\varepsilon,N)\) measures how quickly a traversal realizes spatial complexity, and the inverse discovery time

\[
T_L(\varepsilon,m):=\min\{N:M_L(\varepsilon,N)\ge m\}
\]

records how long the \(m\)th scale-\(\varepsilon\) discovery takes. Thus the architecture separates three kinds of information cleanly:

\[
\boxed{\text{ordered profile }(D_j)
\quad+\quad\text{spatial count }M_j
\quad+\quad\text{temporal pace }M_L(\varepsilon,N).}
\]

### 10.6 Density of Realizable Profiles

Let \(\mathcal T\subseteq K^\omega\) be an admissible traversal class and write

\[
R_{\mathcal T}:=C^P_{\mathrm{nov}}(\mathcal T)\subseteq N_P(K).
\]

For \(\mathbf D=(D_0,D_1,\ldots)\in N_P(K)\), the level-\(J\) cylinder is

\[
U_J(\mathbf D):=
\{\mathbf E:E_i=D_i\text{ for every }i\le J\}.
\]

Compatibility makes this equivalent to fixing the single coordinate \(E_J=D_J\). These cylinders are the clopen balls of the novelty ultrametric.

**Theorem 10.7 (Finite-Profile Density Criterion).** Let \(\pi_J:N_P(K)\to X_J\) be the coordinate projection. For any inverse system of finite discovery spaces,

\[
\boxed{
\overline{R_{\mathcal T}}=N_P(K)
\iff
\forall J\ \forall w\in\pi_J(N_P(K))\ \exists L\in\mathcal T:
D_J(L)=w.
}
\]

In the present system, where every partition cell is nonempty and \(X_j\) contains all nonempty injective words over \(\mathcal P_j\), every bonding map is surjective. Consequently

\[
\pi_J(N_P(K))=X_J,
\]

so the criterion reduces to testing every \(w\in X_J\). **Proof.** In the inverse-limit topology, the nonempty basic level-\(J\) cylinders are indexed precisely by the indefinitely extendable words

\[
w\in\pi_J(N_P(K)).
\]

A subset is dense exactly when it intersects every such cylinder, and intersection with the cylinder indexed by \(w\) is equivalent to the existence of \(L\in\mathcal T\) with \(D_J(L)=w\). For the present discovery spaces, each parent-and-reduce map is surjective: for a coarse word \((P_1,\ldots,P_m)\), choose one fine child \(Q_i\subseteq P_i\) for each letter. Then

\[
q_{j+1,j}(Q_1,\ldots,Q_m)=(P_1,\ldots,P_m).
\]

Recursively lifting any \(w\in X_J\) produces a compatible infinite thread, so \(\pi_J(N_P(K))=X_J\). \(\blacksquare\) **Corollary 10.8 (Three Admissible Classes).** For the present surjective discovery system, the density criterion specializes as follows:

1.  For \(\mathcal T=K^\omega\), one always has

    \[
    \overline{C^P_{\mathrm{nov}}(K^\omega)}=N_P(K).
    \]

2.  For the non-halting class \(\mathcal T_{\mathrm{nh}}\), density holds exactly when

    \[
    |P|\ge2\qquad\forall j,\ P\in\mathcal P_j.
    \]

3.  For the injective class \(\mathcal T_{\mathrm{inj}}=\{L:x_m\ne x_n\text{ for }m\ne n\}\), density holds exactly when

    \[
    |P|=\infty\qquad\forall j,\ P\in\mathcal P_j.
    \]

For the first claim, given \(w=(P_1,\ldots,P_m)\in X_J\), choose \(x_i\in P_i\) and use

\[
L^{(J)}=(x_1,\ldots,x_m,x_m,x_m,\ldots).
\]

For non-halting traversals, alternate forever between two already discovered points; the one-cell word \((P)\) shows why every cell must contain two points. For injective traversals, continue through unused points of an already discovered cell; again the one-cell word shows why infinitude of every cell is necessary.

**Theorem 10.9 (Metric Completion of an Admissible Class).** For \(\mathcal T\subseteq K^\omega\), define

\[
L\sim_0L'
\iff
\rho_{\mathrm{disc}}(L,L')=0
\iff
C^P_{\mathrm{nov}}(L)=C^P_{\mathrm{nov}}(L').
\]

Let \(\overline\rho_{\mathrm{disc}}\) be the induced metric on \(\mathcal T/{\sim_0}\). Then

\[
\boxed{
\widehat{\left(\mathcal T/{\sim_0},
\overline\rho_{\mathrm{disc}}\right)}
\cong
\overline{C^P_{\mathrm{nov}}(\mathcal T)}
\subseteq
N_P(K).
}
\]

If \(\mathcal T\) has the finite-profile extension property of Theorem 10.7, then

\[
\boxed{
\widehat{\left(\mathcal T/{\sim_0},
\overline\rho_{\mathrm{disc}}\right)}
\cong N_P(K)
\cong\partial T_{\mathrm{nov}}(\mathcal P).
}
\]

The quotient \(\mathcal T/{\sim_0}\) embeds isometrically as \(C^P_{\mathrm{nov}}(\mathcal T)\). Its metric completion is therefore the closure of that image inside the compact, hence complete, ultrametric space \(N_P(K)\). Under finite-profile extension, every finite compatible block occurs, so the tree spanned by realizable blocks is the full compatibility tree \(T_{\mathrm{nov}}(\mathcal P)\).

**The moment the constructions coincide**

Three objects that were introduced for different reasons are now the same object up to their natural identifications. Cauchy sequences in the discovery metric converge to coherent all-resolution profiles. Those profiles are exactly threads in the inverse limit. The same threads are exactly infinite rays through the compatibility tree.

\[
\boxed{
\text{metric completion of ordered novelty over }\mathcal P
=
\text{inverse-limit completion }N_P(K)
=
\text{hyperbolic boundary }\partial T_{\mathrm{nov}}(\mathcal P).
}
\]

The equal signs summarize the theorem under finite-profile extension; they do not erase the constructions. The metric side explains approximation, the inverse-limit side explains compatibility across scale, and the tree side explains hyperbolic geometry.

**Completion adds coherent but unrealized profiles.** Density does not imply surjectivity. For dyadic half-open partitions of \([0,1]\), let

\[
P_j^*:=(0,2^{-j}]
\]

and take the coherent one-letter profile \(D_j=(P_j^*)\). No traversal realizes it, because every visited point would have to belong to

\[
\bigcap_jP_j^*=\varnothing.
\]

Nevertheless, its first \(J\) coordinates are realized by the constant traversal \((2^{-J})^\omega\). It is therefore a genuine completion point: finitely approximable at every resolution, but not represented by any single traversal. **Dependence on the resolution system.** The notation \(N_P(K)\) makes the dependence explicit. The ideal point above exists in \(N_P(K)\) for the half-open dyadic tower \(\mathcal P\); a tower whose relevant cell threads are nested nonempty compact sets does not add it. The partition tower controls not only the metric on novelty profiles but also which ideal points the completion adds.

### 10.7 Memory as a Sufficient Statistic for Novelty

Novelty is not a property of a candidate state alone. It is a comparison between that candidate and information retained from the past. This observation turns memory from a cognitive metaphor into a precise factorization problem.

Let

\[
\mathcal H=K^{<\omega}=\bigsqcup_{n\ge0}K^n
\]

be the space of finite histories, including the empty history. For a traversal \(L\), write \(H_n=(x_0,\ldots,x_n)\). A *novelty predicate* is a map

\[
\mathsf{Nov}:K\times\mathcal H\longrightarrow\{0,1\},
\]

where \(\mathsf{Nov}(x\mid H)=1\) means that \(x\) is judged novel relative to \(H\). Exact first-occurrence novelty and metric novelty at scale \(\varepsilon>0\) are respectively

\[
\mathsf{Nov}_{\mathrm{exact}}(x\mid H)
=
\mathbf 1[x\notin V(H)],
\qquad
\mathsf{Nov}_{\varepsilon}(x\mid H)
=
\mathbf 1[d(x,V(H))>\varepsilon],
\]

where \(V(H)\) is the set of states appearing in \(H\), with \(V(\varnothing)=\varnothing\). We use the convention \(d(x,\varnothing)=+\infty\) when metric novelty is evaluated before any state has been observed. Therefore

\[
\boxed{
\text{novelty}
=
\text{comparison of a candidate state against retained history}.
}
\]

**Definition 10.10 (Decision-Sufficient Memory).** A memory map \(M:\mathcal H\to\mathcal M\) is *sufficient for the novelty decision* if there exists

\[
\widetilde{\mathsf{Nov}}:K\times\mathcal M\to\{0,1\}
\]

such that

\[
\mathsf{Nov}(x\mid H)
=
\widetilde{\mathsf{Nov}}(x\mid M(H))
\]

for every \(H\in\mathcal H\) and \(x\in K\).

The terminology is a factorization-style analogue of a sufficient statistic: once \(M(H)\) is known, the original history can be discarded for this particular decision problem. It is not the full Fisher–Neyman probabilistic notion unless a statistical model and parameter are also supplied.32

The canonical one-step memory is obtained by quotienting histories according to the decisions they induce. Define

\[
H\sim_{\mathrm{mem}}H'
\iff
\forall x\in K,\quad
\mathsf{Nov}(x\mid H)=\mathsf{Nov}(x\mid H'),
\]

and let

\[
\mathcal M_{\mathrm{nov}}
=
\mathcal H/{\sim_{\mathrm{mem}}}.
\]

The quotient map \(H\mapsto[H]\) is sufficient because

\[
\widetilde{\mathsf{Nov}}(x\mid[H])
:=
\mathsf{Nov}(x\mid H)
\]

is well-defined.

**Proposition 10.11 (Minimality of One-Step Novelty Memory).** If \(M:\mathcal H\to\mathcal M\) is sufficient for \(\mathsf{Nov}\), then

\[
M(H)=M(H')
\quad\Longrightarrow\quad
H\sim_{\mathrm{mem}}H'.
\]

Consequently there is a unique map

\[
\phi:M(\mathcal H)\to\mathcal M_{\mathrm{nov}}
\]

satisfying

\[
[H]=\phi(M(H)).
\]

Thus every sufficient representation refines the canonical novelty classes. **Proof.** If \(M(H)=M(H')\), sufficiency gives, for every \(x\in K\),

\[
\mathsf{Nov}(x\mid H)
=
\widetilde{\mathsf{Nov}}(x\mid M(H))
=
\widetilde{\mathsf{Nov}}(x\mid M(H'))
=
\mathsf{Nov}(x\mid H').
\]

Hence \(H\sim_{\mathrm{mem}}H'\). The factor map \(\phi\) is therefore well-defined by \(\phi(M(H))=[H]\), and uniqueness follows because every point of \(M(\mathcal H)\) has the form \(M(H)\). \(\blacksquare\)

#### Exact and metric memory

For exact novelty,

\[
H\sim_{\mathrm{mem}}H'
\iff
V(H)=V(H').
\]

Equality of visited sets clearly gives the same decisions. Conversely, if the sets differ, any state in their symmetric difference is novel relative to exactly one history. The minimal exact memory is therefore

\[
\boxed{M_{\mathrm{exact}}(H)=V(H).}
\]

Dwell times and visitation order are unnecessary for the binary question “has this exact state appeared before?”

At a fixed metric scale, let

\[
V(H)^{(\varepsilon)}
=
\{x\in K:d(x,V(H))\le\varepsilon\}.
\]

Then

\[
\mathsf{Nov}_{\varepsilon}(x\mid H)
=
\mathbf 1[x\notin V(H)^{(\varepsilon)}],
\]

so two histories induce the same decisions exactly when their closed \(\varepsilon\)-neighborhoods agree. Hence

\[
\boxed{
M_{\varepsilon}(H)=V(H)^{(\varepsilon)}
}
\]

is a canonical model of the one-step memory quotient at scale \(\varepsilon\). The family \(\{M_\varepsilon\}_{\varepsilon>0}\) compares what must be retained at different resolutions. For an arbitrary metric space these memories do not automatically form a refinement inverse system; the nested partition tower of §10.4 supplies the explicit bonding maps needed for that stronger structure.

#### From one decision to reusable online memory

**One-step equivalence is not automatically an update state.** For a general novelty predicate, \(H\sim_{\mathrm{mem}}H'\) guarantees identical decisions for the next candidate, but it need not imply

\[
H\mathbin{\smallfrown}(x)\sim_{\mathrm{mem}}
H'\mathbin{\smallfrown}(x).
\]

Without this right-congruence property, the quotient class \([H]\) does not determine a well-defined memory state after observing \(x\).

To model every future decision under repeated updates, define the novelty-output word along a finite continuation \(w=(y_1,\ldots,y_m)\) by

\[
\mathsf{Out}(H;w)
=
\bigl(
\mathsf{Nov}(y_i\mid H\mathbin{\smallfrown}(y_1,\ldots,y_{i-1}))
\bigr)_{i=1}^{m}.
\]

Now set

\[
H\sim_{\mathrm{fut}}H'
\iff
\forall w\in K^{<\omega},\quad
\mathsf{Out}(H;w)=\mathsf{Out}(H';w).
\]

**Theorem 10.12 (Minimal Online Novelty Memory).** The relation \(\sim_{\mathrm{fut}}\) is a right congruence:

\[
H\sim_{\mathrm{fut}}H'
\Longrightarrow
H\mathbin{\smallfrown}(x)\sim_{\mathrm{fut}}
H'\mathbin{\smallfrown}(x)
\qquad\forall x\in K.
\]

Consequently the update

\[
U([H]_{\mathrm{fut}},x)
:=
[H\mathbin{\smallfrown}(x)]_{\mathrm{fut}}
\]

and the output map

\[
\lambda([H]_{\mathrm{fut}},x)
:=
\mathsf{Nov}(x\mid H)
\]

are well-defined. Moreover, every memory representation that reproduces all continuation outputs and admits deterministic updates factors onto

\[
\mathcal H/{\sim_{\mathrm{fut}}}.
\]

Hence

\[
\boxed{
\mathcal M_{\mathrm{fut}}
:=
\mathcal H/{\sim_{\mathrm{fut}}}
}
\]

is the minimal deterministic memory state space preserving every future novelty judgment. **Proof.** Assume \(H\sim_{\mathrm{fut}}H'\) and fix \(x\in K\). For every continuation \(w\), the output after the updated histories is the tail of the output along the concatenated continuation \((x,w)\). Equality of

\[
\mathsf{Out}(H;(x,w))
\quad\text{and}\quad
\mathsf{Out}(H';(x,w))
\]

therefore gives

\[
\mathsf{Out}(H\mathbin{\smallfrown}(x);w)
=
\mathsf{Out}(H'\mathbin{\smallfrown}(x);w).
\]

Hence \(\sim_{\mathrm{fut}}\) is a right congruence and \(U\) is well-defined. Taking the one-letter continuation \((x)\) shows that equivalent histories give the same next output, so \(\lambda\) is well-defined. If another deterministic memory has equal states after \(H\) and \(H'\), applying the same continuation produces equal updated states and outputs at every step. Thus \(H\sim_{\mathrm{fut}}H'\), so the same factorization argument as in Proposition 10.11 applies. \(\blacksquare\)

This is the novelty analogue of the future-indistinguishability quotient underlying minimal deterministic state representations. The Myhill–Nerode tradition supplies the corresponding finite-automaton perspective on indistinguishable continuations.4344 Exact and fixed-scale metric novelty already satisfy the update requirement:

\[
U_{\mathrm{exact}}(V,x)=V\cup\{x\},
\]

\[
U_{\varepsilon}\!\left(V^{(\varepsilon)},x\right)
=
V^{(\varepsilon)}\cup\overline B(x,\varepsilon).
\]

Equipped with its transition and output maps, the quotient is a deterministic output machine

\[
\boxed{
\mathcal A_{\mathrm{nov}}
=
(\mathcal M_{\mathrm{fut}},K,U,\lambda).
}
\]

Memory is the state, the next observation is the input, novelty is the output, and the transition carries the compressed state forward. This is categorically stronger than a retrospective summary that answers only the present query.

#### Connection to recurrent neural memory

Modern linear-attention architectures provide a concrete engineering instance of the same compression problem, without constituting a realization theorem for the quotient above. A conventional transformer KV cache retains separate key–value representations of earlier tokens, so its stored context grows with sequence length. Recurrent linear attention instead compresses the processed context into a fixed-dimensional state matrix \(S_t\), reads from that state, and updates it online:

\[
H_t\longmapsto S_t,
\qquad
o_{t+1}=\mathcal R(q_{t+1},S_t),
\qquad
S_{t+1}=F(S_t,k_{t+1},v_{t+1}).
\]

DeltaNet-style updates first query the association currently stored at the incoming key and then write a correction. In one common orientation,

\[
S_t
=
S_{t-1}
+\beta_t k_t
\bigl(v_t-S_{t-1}^{\mathsf T}k_t\bigr)^{\mathsf T}.
\]

The residual term changes an association in light of what the memory already predicts instead of blindly adding another outer product. Gated DeltaNet adds broad learned decay, while Kimi Delta Attention uses finer-grained gating to control the finite recurrent state. The linked architectural essay traces this progression from growing KV history through linear attention, delta updates, gated forgetting, and Kimi-style attention; the Kimi Linear paper describes KDA as an extension of Gated DeltaNet designed to use limited finite-state RNN memory more effectively.33 The primary technical lineage includes linear attention as recurrent computation,45 fast-weight programming and delta updates,46 Gated DeltaNet,47 and selective state spaces in Mamba.48

| Abstract novelty system       | Recurrent attention architecture     |
|-------------------------------|--------------------------------------|
| Full history \(H_t\)     | Processed token context              |
| Compressed class \([H_t]_{\mathrm{fut}}\) | Learned recurrent state \(S_t\) |
| Output \(\lambda([H],x)\)           | Query-dependent read \(\mathcal R(q,S)\)    |
| Update \(U([H],x)\)           | Recurrent update \(F(S,k,v)\)        |

The parallel is structural, not identificatory. A learned matrix state is finite-dimensional, approximate, task-dependent, and optimized from data. Nothing in the architecture proves that \(S_t\) equals the canonical class \([H_t]_{\mathrm{fut}}\), that it is minimal, or that the model’s output task is a novelty predicate. Rather, recurrent attention confronts the engineering version of the theorem’s question:

\[
\boxed{
\text{What distinctions must a bounded memory retain so that future computation remains correct?}
}
\]

In this sense, modern recurrent attention attempts to learn a useful finite online memory, while Theorem 10.12 characterizes exact task-sufficient online memory abstractly once the required output behavior has been specified. Forgetting then becomes controlled loss of distinctions: targeted replacement, decay, or gating is useful only insofar as the discarded differences are irrelevant to later outputs.

#### Connection to ordered discovery

At partition level \(j\), let \(P_j(x)\) denote the cell containing \(x\) and let \(S_j(H)\) be the set of cells already visited. The next-step decision

\[
\mathbf 1[P_j(x)\notin S_j(H)]
\]

needs only the unordered set \(S_j(H)\). The full discovery word \(D_j(H)\) retains strictly more: it remembers the order in which those cells first appeared. That extra information is unnecessary for the binary next-step novelty judgment but essential to the ordered-novelty invariant studied in this section.

The two constructions therefore form a deliberate pair:

\[
\boxed{
\text{novelty asks what is new;}
\qquad
\text{memory stores what must be retained to answer;}
\qquad
D_j\text{ additionally preserves discovery order}.
}
\]

#### Symmetry and forgetting

Let a group \(G\) act on \(K\) and hence componentwise on histories. If

\[
\mathsf{Nov}(gx\mid gH)=\mathsf{Nov}(x\mid H)
\qquad
\forall g\in G,
\]

then \(H\sim_{\mathrm{mem}}H'\) implies \(gH\sim_{\mathrm{mem}}gH'\), and the action descends equivariantly to the memory quotient:

\[
g[H]=[gH].
\]

For metric novelty, every isometry has this property because \(d(gx,gV)=d(x,V)\). In this precise sense, novelty is a symmetry-invariant comparison against memory.

**Forgetting, stated mathematically**

To forget for a specified task is to quotient histories that the task can no longer distinguish. One-step novelty produces \(\mathcal H/{\sim_{\mathrm{mem}}}\); reusable prediction over arbitrary continuations produces the finer quotient \(\mathcal H/{\sim_{\mathrm{fut}}}\). What counts as “unnecessary memory” is therefore never absolute—it is determined by the future decisions the system is required to preserve.

### 10.8 Algorithmic Realization: Fenwick-Indexed Novelty

The quotient theorem identifies which distinctions are semantically necessary. It does not prescribe a data structure. Once a particular sufficient statistic and a family of online queries have been chosen, a separate algorithmic question begins: how should that statistic be represented and updated efficiently? This is the same broad resource question studied by bounded-memory streaming algorithms, where exactness, approximation, and state size must be traded explicitly.6263

#### Finite ordered alphabets

Let

\[
K=[m]=\{1,\ldots,m\}
\]

with its given order. For exact first-occurrence novelty, Theorem 10.12 reduces the minimal online state to the visited set. Since every subset of \([m]\) is realizable by a finite history,

\[
\mathcal M_{\mathrm{fut}}
\cong
2^{[m]}.
\]

Represent \(V(H_t)\) by its occupancy vector

\[
b_i(t)
=
\begin{cases}
1,&i\in V(H_t),\\
0,&i\notin V(H_t).
\end{cases}
\]

Then

\[
\mathsf{Nov}_{\mathrm{exact}}(x\mid H_t)=1-b_x(t).
\]

A bitset or direct Boolean array answers this membership query in \(O(1)\) time. If membership is the only required operation, a Fenwick tree is unnecessary. It becomes useful when the order on \(K\) gives meaning to cumulative questions.

Define the discovered prefix mass

\[
F_t(x)=\sum_{i\le x}b_i(t).
\]

A Fenwick tree—also called a binary indexed tree—stores an implicit decomposition of this cumulative-frequency array and supports point updates and prefix-sum queries in logarithmic time.34 On the first occurrence of \(x\), perform

\[
b_x:0\longrightarrow1,
\qquad
\operatorname{update}(x,+1).
\]

Before that update, the spatial rank of the new state among discovered states is

\[
r_t(x)
=
1+F_t(x-1).
\]

This is a rank in the underlying state order, not the time at which \(x\) was discovered.

**Proposition 10.13 (Fenwick Realization of Ordered Exact-Novelty Statistics).** For \(K=[m]\), the pair consisting of a membership bitset and a Fenwick index over \(b(t)\) supports:

| Operation    | Meaning                                   | Time                                 |
|--------------|-------------------------------------------|--------------------------------------|
| \(\operatorname{seen}(x)\) | Has state \(x\) appeared?          | \(O(1)\) with the bitset         |
| \(\operatorname{insert}(x)\) | Record a first discovery                  | \(O(\log m)\)                         |
| \(F_t(x)\) | Discovered states at indices \(\le x\) | \(O(\log m)\)                         |
| \(r_t(x)\) | Spatial rank of a newly discovered state  | \(O(\log m)\)                         |
| \(\operatorname{select}(q)\) | Smallest \(r\) with \(F_t(r)\ge q\)   | \(O(\log m)\)                         |
| \(C_t\) | Total number of discovered states         | \(O(1)\) with a separate counter |

The structure uses \(O(m)\) storage.

The Fenwick representation is lossless for the occupancy vector because

\[
b_x(t)=F_t(x)-F_t(x-1).
\]

It is not a smaller semantic quotient than \(V(H_t)\); it is a dynamic index over one representative of that quotient. Its advantage is the additional family of ordered cumulative queries.

**Corollary 10.14 (Memory-State and Bit Lower Bound).** Suppose the minimal online novelty quotient is finite with

\[
\left|\mathcal M_{\mathrm{fut}}\right|=q.
\]

Every exact deterministic online memory preserving all future novelty outputs requires at least \(q\) distinguishable internal states and therefore at least

\[
\boxed{\left\lceil\log_2q\right\rceil}
\]

bits in the worst case. If \(\mathcal M_{\mathrm{fut}}\) is infinite, no finite-state machine can preserve the specified behavior exactly. For exact novelty on \(K=[m]\),

\[
\mathcal M_{\mathrm{fut}}\cong2^{[m]},
\qquad
\left|\mathcal M_{\mathrm{fut}}\right|=2^m,
\]

so at least \(m\) bits are necessary. The occupancy bitset attains this information-theoretic bound; a Fenwick index adds structure or redundancy in exchange for faster cumulative queries. **Proof.** By Theorem 10.12, every exact deterministic sufficient memory factors onto \(\mathcal M_{\mathrm{fut}}\), so its state set has cardinality at least \(q\). An encoding using \(B\) bits represents at most \(2^B\) states; hence \(2^B\ge q\) and \(B\ge\lceil\log_2q\rceil\). For \(K=[m]\), every subset of \([m]\) occurs as the visited set of some finite history, giving exactly \(2^m\) future-equivalence classes. \(\blacksquare\)

#### Multiresolution occupancy

Now suppose the finite partition at resolution \(j\) is ordered:

\[
\mathcal P_j=(P_{j,1},\ldots,P_{j,N_j}).
\]

Define

\[
b_{j,r}(t)
=
\mathbf 1[
P_{j,r}\text{ has been encountered by time }t
].
\]

If \(r_j(x)\) is the index of the cell containing \(x\), then the resolution-\(j\) novelty output is

\[
n_j(x\mid H_t)
=
1-b_{j,r_j(x)}(t).
\]

A candidate can therefore be old at a coarse scale and novel at a finer one. For a computational cutoff \(J\), one observation produces the multiresolution signature

\[
\mathbf n_t^{(J)}(x)
=
\bigl(n_0(x\mid H_t),\ldots,n_J(x\mid H_t)\bigr).
\]

The infinite signature is a mathematical idealization; an implementation must truncate, evaluate levels lazily, or exploit the shared path of \(x\) through the refinement tree.

Let \(\mathrm{BIT}_j\) be the Fenwick index over \(b_j\). Its prefix query

\[
F_{j,t}(r)
=
\sum_{s\le r}b_{j,s}(t)
\]

measures cumulative discovered mass in the chosen spatial order. The time-dependent number of cells discovered at scale \(\varepsilon_j\) is

\[
M_L(\varepsilon_j,t)
=
\sum_{r=1}^{N_j}b_{j,r}(t).
\]

This is the temporal statistic deliberately absent from the eventual quantity \(|D_j(L)|\). The curve

\[
t\longmapsto M_L(\varepsilon_j,t)
\]

records how novelty saturates over time at resolution \(j\). Its current total can be maintained by an \(O(1)\) scalar counter; Fenwick is needed only when prefix mass, spatial rank, or selection queries are also required.

#### Occupancy is not discovery order

Fenwick does not by itself retain the ordered novelty word \(D_j\). The following four objects answer different questions:

| Object       | Information retained                               |
|--------------|----------------------------------------------------|
| \(b_{j,r}\) | Whether cell \(r\) has ever been discovered |
| \(\mathrm{BIT}_j(b_j)\) | Spatial prefix counts, ranks, and order statistics |
| \(D_j\) | Temporal order of first discoveries                |
| \(M_L(\varepsilon_j,t)\) | Total discovered-cell count by time \(t\)   |

A complete online implementation at active level \(j\) may therefore maintain

\[
\boxed{
(\texttt{seen}_j,\ \texttt{Fenwick}_j,\ \texttt{discoveryLog}_j).
}
\]

The bitset answers cell membership, the Fenwick index answers spatial cumulative queries, and the append-only log records \(D_j\). Whenever a cell is first encountered, all three states update: mark the bit, add one to the index, and append the cell identifier to the log.

Across levels \(0,\ldots,J\), a direct implementation uses

\[
O\!\left(\sum_{j=0}^{J}N_j\right)
\]

storage and at most

\[
O\!\left(\sum_{j=0}^{J}\log N_j\right)
\]

time per observation for membership/index work, before accounting for the cost of locating each cell. Sparse Fenwick maps, compressed bitsets, or the shared refinement tree can be preferable when most cells remain undiscovered.

#### Where the bridge stops

Fenwick requires an ordered, indexable domain and an additive prefix statistic. It is not canonical for a general metric space, graph, or arbitrary future-equivalence quotient. Other regimes naturally lead to other representations: a bitset for pure finite membership, a segment tree for richer interval aggregates, a trie for symbolic prefixes, a spatial or cover tree for metric queries, the refinement tree for nested partitions, or an approximate sketch when exact memory is too large.

The hierarchy is therefore

\[
\boxed{
\text{semantic quotient}
\longrightarrow
\text{sufficient statistic}
\longrightarrow
\text{chosen observables}
\longrightarrow
\text{dynamic data structure}.
}
\]

The quotient determines what information must survive. Geometry determines which multiscale distinctions are meaningful. The data structure determines how selected statistics are maintained without replaying history.

**Algorithmic question opened by the theory**

For which novelty predicates and state geometries does the minimal online state

\[
\mathcal H/{\sim_{\mathrm{fut}}}
\]

admit a compact, efficiently updatable representation? Fenwick trees answer one ordered additive case. The general classification remains open.

### 10.9 Streaming Systems Interpretation: Apache Flink

The quotient theorem has a direct systems interpretation in unbounded stream processing. A runtime such as Apache Flink does not recompute an operator from the complete event history after every arrival. It exposes updateable operator and keyed state—including primitives such as `ValueState` and `MapState`—so that each event can read, update, and checkpoint a state associated with the current stream key.35 The streaming literature supplies the broader one-pass state-complexity context.6263 For a key \(k\), the computational shape is

\[
H_t^{(k)}
\longmapsto
S_t^{(k)},
\qquad
S_{t+1}^{(k)}
=
F\!\left(S_t^{(k)},x_{t+1}\right).
\]

This resembles online novelty memory, but the roles must remain distinct. Flink provides a fault-tolerant state substrate; it does not derive the minimal quotient. For exact novelty, a keyed map or set can represent the visited states \(V(H_t^{(k)})\). Inside that state, a bitset, Fenwick tree, trie, refinement tree, or sketch may support the chosen observables. The architecture is therefore

\[
\boxed{
\text{future-behavior quotient}
\longrightarrow
\text{streaming state}
\longrightarrow
\text{dynamic data structure}
\longrightarrow
\text{runtime persistence and recovery}.
}
\]

The quotient supplies a correctness criterion. If two histories produce the same stored state, they must be future-equivalent for the intended output process:

\[
\boxed{
S(H)=S(H')
\Longrightarrow
H\sim_{\mathrm{fut}}H'.
}
\]

A representation may distinguish more histories than necessary and remain correct, although it stores redundant information. If it merges histories that are not future-equivalent, some continuation must eventually expose an error.

#### TTL is a semantic choice, not merely cleanup

Flink can assign time-to-live policies to keyed state, including per-entry expiration for collection state. With a never-return-expired visibility policy, an expired value behaves as absent even before physical cleanup finishes. Mathematically, expiration applies an additional identification to histories. It is safe only when that identification preserves the future behavior required by the application:

\[
\boxed{
S_{\mathrm{expired}}(H)=S_{\mathrm{expired}}(H')
\Longrightarrow
H\sim_{\mathrm{fut}}H'.
}
\]

For global exact novelty, a finite TTL is generally unsafe: after an old state expires, its next occurrence may be reported as novel even though it appeared earlier. TTL can be correct for a bounded-retention or window-relative predicate. A privacy policy may also require expiration, but then it intentionally overrides global novelty semantics rather than preserving them.

#### Windows change the predicate

A sliding, tumbling, or session window does not merely optimize global novelty. It defines a different question, such as window-relative novelty

\[
\mathsf{Nov}_{W}(x,t\mid H)
=
\mathbf1\!\left[x\notin V(H_{t-W:t})\right].
\]

The minimal sufficient state must therefore support both insertion and expiration. A plain visited set may no longer suffice: if the same state occurs twice inside a sliding window, expiring the older occurrence must not erase the newer one. Counts, last-seen times, queues, or timestamped maps may be required depending on event-time ordering and the window definition.

**Systems bridge.** The theorem says which distinctions are semantically necessary. Flink determines how state is partitioned, updated, checkpointed, and expired. Fenwick or another data structure determines which queries over that state are efficient. These are three views of the same information-retention problem, but they are not interchangeable layers.

### 10.10 Boundary-Object Machines

A nonterminating machine run can retain a structured boundary object rather than collapsing to a single symbol such as \(\bot\).

**A candidate semantics for nontermination**

Let \(M\) be a deterministic machine with input \(x\), and let \(\gamma(M,x)=(C_0,C_1,C_2,\ldots)\) be its configuration sequence. Extend a halting run constantly, so halting becomes an infinite dwell. If the configuration space \(K\) is compact metric and \(\mathcal P\) is a refining finite-partition tower, then the ordered-discovery construction gives

\[
B_P(M,x):=C^P_{\mathrm{nov}}(\gamma(M,x))\in N_P(K).
\]

This object always exists coordinatewise: each \(D_j(\gamma)\) is finite and the parent-and-reduce maps enforce compatibility. No convergence of the configuration sequence is required. For each fixed \(j\) and fixed run, the finite approximation \(D_j^t(\gamma)\) eventually stabilizes, but no effective certificate or uniformly computable modulus tells an observer when it is safe to declare that stabilization complete. Under the raw temporal-prefix representation, \(C^P_{\mathrm{nov}}\) can also be discontinuous whenever arbitrarily long prefixes may still be extended by a previously unseen cell. Restricting the run class can restore local determination of fixed coordinates; it does not automatically restore uniform computability.

**Well-posedness**What counts as a finite observational distinction on configuration space? **Realizability**Which coherent profiles come from actual machine runs? **Canonicity**When do two configuration towers produce equivalent completions? **Computability**Can finite execution prefixes determine the completed discovery object?

This is a candidate boundary semantics, not a new theorem about computation. Domain theory records nontermination as \(\bot\) in the denotational tradition of Scott–Strachey and its modern domain-theoretic treatments;3738 the present construction retains more structure whenever two runs have different discovery profiles. But distinct runs may still collapse to the same point because dwell time and repeated visits are deliberately forgotten. Any claim that the resulting object is computable from a temporal stream belongs to represented-space computable analysis, where the representation matters and computability entails continuity under the represented topology.39 The source note for this extension is `boundary-machine.md`.

When configurations are encoded over a finite alphabet, the run \(\gamma(M,x)\) is also an infinite word. That places the construction beside \(\omega\)-automata and the theory of infinite-word languages, although §10.10 introduces no acceptance condition and claims no automata-theoretic equivalence.404142

**A possible arithmetic bridge · Bost–Connes**

A natural comparison point is the Bost–Connes system, introduced by Jean-Benoît Bost and Alain Connes as a quantum statistical dynamical system related to the distribution of prime numbers.36 It combines an algebra of observables with a time evolution and studies equilibrium (KMS) states and phase transitions.

The connection is structural, not an identification. \(B_P(M,x)\) is an inverse-limit discovery object and, after hyperbolic realization, a boundary point; it is not presently a C\*-algebra, a time evolution, or a KMS state. A future construction could ask whether cylinder observables on discovery profiles carry a natural semigroup action or time evolution whose partition function or KMS states reflect the boundary geometry. No such action or phase-transition theorem is claimed here.

## 11. RBDS Companion Lecture

Finite resources induce operational quotients: what can be seen depends on the available distinctions.

The companion lecture *Why AI Hallucinates (It’s the Same Math as Gravity)* develops the broader framework of **Resource-Bounded Distinction Systems** (RBDS): order requires distinguishable states, observations consume resources, and a finite observer acts on an operational quotient rather than on objective state space directly.30 The present paper supplies a canonical traversal geometry for that thesis. This section states the connection precisely and separates exact algebra from cross-domain interpretation.

**Observation as a budgeted instrument**

Imagine a microscope with a finite resolving budget. At low power, several nearby states produce the same reading; at higher power, some of them split into distinct classes. The objective sample has not changed. What changed is the observer's ability to witness distinctions. RBDS treats the classes visible at budget \(B\) as the observer's operational reality \(Q_B\).

The partition tower from Section 10 is exactly this story with budgets indexed by resolution level. Increasing \(j\) buys finer cells. Ordered discovery then records not merely which objective points exist, but the order in which operationally distinguishable regions become available to the observer.

**Why AI Hallucinates (It’s the Same Math as Gravity)** Sethu Iyer · Space Time Cafe · approximately 48 minutes Watch on YouTube ↗

### 11.1 Budgeted Operational Quotients

Let \(\mathcal O\) be a family of observations on an objective state space \(X\) (not the occurrence space of §5; the two objects never co-occur), and let \(c(o)\) be the cost of observation \(o\). At budget \(B\), the admissible observations and the resulting observation signature are

\[
\mathcal O_B:=\{o\in\mathcal O:c(o)\le B\},
\qquad
\Sigma_B(x):=(o(x))_{o\in\mathcal O_B}.
\]

Define budgeted indistinguishability by equality of every accessible observation:

\[
x\sim_B y
\iff
\Sigma_B(x)=\Sigma_B(y),
\]

and define the operational state space

\[
Q_B:=X/{\sim_B}.
\]

**Proposition 11.1 (Budget Refinement).** If \(B\le B'\) implies \(\mathcal O_B\subseteq\mathcal O_{B'}\), then

\[
\sim_{B'}\ \subseteq\ \sim_B.
\]

Consequently there is a canonical coarse-graining map

\[
q_{B',B}:Q_{B'}\longrightarrow Q_B,\qquad [x]_{B'}\longmapsto[x]_B.
\]

This is the RBDS form of the partition tower in Section 10.4. Each partition \(\mathcal P_j\) represents the equivalence classes visible at a resolution budget \(B_j\); the word \(D_j(L)\) records the order in which those operational classes are first encountered. The compatibility map \(q_{j+1,j}\) is therefore not merely a spatial convenience—it is the quotient map from a more discriminating observer to a less discriminating one.

Budget monotonicity is automatic once the admissible observation families are nested. A larger budget never removes a test that was previously affordable, so it can split an old equivalence class but cannot merge two classes that an earlier observer already distinguished. The arrow therefore points from fine quotients to coarse quotients:

\[
B\le B'
\quad\Longrightarrow\quad
Q_{B'}\longrightarrow Q_B.
\]

When the budgets increase and the partitions separate points, the ordered novelty completion

\[
\overline{C^P_{\mathrm{nov}}(K^\omega)}
\subseteq
\varprojlim_j X_j
\]

is a coherent infinite-budget limit of finite operational descriptions. Exact identity appears only in the limit; every finite level retains resource-bounded equivalence classes.

### 11.2 The Conceptual Bridge

| Lecture concept               | Traversal formulation                                                               | What is retained                                                                          |
|-------------------------------|-------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| Order requires distinction    | Different finite histories are different vertices of \(T_K\).                  | Identity and temporal precedence are encoded by branching and depth.                      |
| Budgeted indistinguishability | \(x\sim_B y\) when no admissible observation separates them.                         | Finite resources determine a partition of objective state space.                          |
| Operational quotient          | \(Q_B=X/{\sim_B}\) and \(\mathcal P_j\) are finite operational state spaces.                  | The observer acts on classes, not inaccessible representatives.                           |
| Observation has a cost        | \(M_L(\varepsilon,N)\) carries both resolution \(\varepsilon\) and time budget \(N\).     | Spatial precision and temporal evidence remain separate resources.                        |
| Hallucination                 | A claim selects information that is not constant across all accessible completions. | The distinction is between evidence-supported invariants and unsupported representatives. |
| Causality as feedback         | The next partition may depend on discoveries made at the current level.             | Observation changes the future distinction system rather than merely reading it.          |

This gives a precise non-identifiability criterion for model claims. Given accessible evidence \(E_{N,B}\)—a finite prefix together with budget-\(B\) observations—let \(\mathcal C(E_{N,B})\) be the set of compatible complete traversals. A property \(h:K^\omega\to H\) is identifiable from that evidence exactly when

\[
h(L)=h(L')
\qquad
\forall\,L,L'\in\mathcal C(E_{N,B}).
\]

If \(h\) varies across \(\mathcal C(E_{N,B})\), then choosing one value of \(h\) requires information not contained in the accessible evidence. In this formal sense, hallucination is not merely “being wrong”; it is presenting a non-identifiable representative as though the operational quotient had selected it uniquely. This finite-evidence limitation sits next to the broader algorithmic-information treatment of description, inference, and asymptotic uncertainty.64

### 11.3 The Attention-Drift Identity

The lecture's physics–transformer bridge begins with an exact transport identity. Let \(A\in\mathbb R^{n\times n}\) be row-stochastic, as a softmax attention matrix is, let \(V\in\mathbb R^{n\times d}\) contain value vectors, and let

\[
Y=AV.
\]

Define column imbalance relative to unit receipt by

\[
\Delta:=A^\mathsf T\mathbf 1-\mathbf 1.
\]

**Proposition 11.2 (Aggregate Attention Drift).** The aggregate change in the represented values is

\[
\boxed{\mathbf 1^\mathsf T(Y-V)=\Delta^\mathsf T V.}
\]

**Proof.** Since \(Y=AV\),

\[
\mathbf 1^\mathsf T(Y-V)
=\bigl(\mathbf 1^\mathsf T A-\mathbf 1^\mathsf T\bigr)V
=\bigl(A^\mathsf T\mathbf 1-\mathbf 1\bigr)^\mathsf T V
=\Delta^\mathsf T V.
\qquad\blacksquare
\]

Row normalization conserves the amount allocated by each source, but it does not force equal total receipt by each destination. The vector \(\Delta\) measures that column imbalance, and \(\Delta^\mathsf T V\) is the resulting aggregate displacement. The same algebra can describe directed redistribution in attention, active-matter interactions, or other asymmetric transport systems.

In sentence form: every token distributes one unit of attention, but some tokens can receive more total attention than others. Multiplying that receipt imbalance by the value vectors tells us the net shift in the aggregate representation. The formula is short because the accounting identity is simple; the difficult scientific question is what that shift means in a particular model.

**Scope of the “same mathematics” claim.** The matrix identity is exact. Its physical or cognitive meaning depends on how \(A\), \(V\), and the conserved quantity are defined in each domain. The identity alone does not prove that gravity and transformer hallucination share a physical cause, nor that attention imbalance is sufficient to explain every hallucination. The lecture's stronger unification should therefore be read as a proposed transfer principle built around shared algebra.

### 11.4 Causality as Adaptive Refinement

The construction in Section 10 uses a fixed partition tower. RBDS suggests a stronger, observer-inclusive model in which current discoveries determine which distinctions become affordable or relevant next:

\[
\mathcal P_{j+1}
=F\!\left(\mathcal P_j,D_j(L),B_j\right),
\qquad
B_{j+1}
=G\!\left(B_j,D_j(L)\right).
\]

The causal architecture is then a loop,

\[
\boxed{
\text{accessible distinctions}
\longrightarrow Q_{B_j}
\longrightarrow\text{observation or action}
\longrightarrow\text{new evidence}
\longrightarrow\text{future distinctions}.
}
\]

The fixed inverse limit developed earlier is the nonadaptive baseline. An adaptive RBDS would replace predetermined bonding maps by history-dependent maps and ask when the resulting path-dependent completion remains compact, metrizable, and realizable by a proper hyperbolic boundary. That is the natural next extension connecting ordered novelty to learning systems whose observations change their future state space.

## 12. Interpretive Coda: Boundary and Totality

A boundary point is a completed history, not a terminal event waiting at infinity.

The mathematics above admits a theological analogy, but not a theological theorem. If the word “God” is used here at all, it should not denote a state \(x_n\), a final symbol, or an event waiting at the end of time. The closest mathematical analogue is either a completed asymptotic object, the total space of such completions, or the coherent structure generating that space.

### 12.1 Completion Is Not a Terminal State

A traversal determines an ordered novelty profile

\[
L=(x_0,x_1,\ldots)
\longmapsto
C^P_{\mathrm{nov}}(L)
=(D_0(L),D_1(L),\ldots)
=:\xi_L\in\partial T_{\mathrm{nov}}(\mathcal P).
\]

The point \(\xi_L\) is not a state reached at \(t=\infty\). It is the coherent organization of the traversal across every level of distinguishability. Ordinary prefix completion asks how much additional *time* has been revealed; novelty completion asks how much finer *resolution* has been revealed:

\[
\boxed{
\text{time depth}
\quad\longrightarrow\quad
\text{resolution depth}.
}
\]

At finite resolution \(J\), an observer determines only the cylinder

\[
U_J(\xi_L)
=\{\mathbf D\in N_P(K):D_i=D_i(L)\text{ for }i\le J\}.
\]

Whenever \(|U_J(\xi_L)|>1\), that finite description does not identify the completed profile. This makes the central distinction precise:

\[
\boxed{\text{boundary object}\ne\text{future terminal state}.}
\]

### 12.2 World, Boundary, and Generator

A single completed traversal and the space of every possible completion occupy different mathematical levels:

| Mathematical level | Precise role                                                       | Optional metaphor                                          |
|--------------------|--------------------------------------------------------------------|------------------------------------------------------------|
| \(x_n\in K\)       | One state or event inside a traversal.                             | A local occurrence within a world.                         |
| \(\xi_L\in\partial T_{\mathrm{nov}}(\mathcal P)\)       | The completed ordered novelty structure of one traversal.          | One completed world or history.                            |
| \(N_P(K)\cong\partial T_{\mathrm{nov}}(\mathcal P)\)       | The compact space of all coherent completion profiles.             | The totality of admissible completed worlds.               |
| \((X_j,q_{j+1,j})\)       | The inverse system whose compatibility law generates the boundary. | The structure or law by which possible completions cohere. |

Thus, if the analogy is insisted upon, a world is closer to a boundary point, while “God” is closer to the entire boundary space or to the generative compatibility structure:

\[
\boxed{
\text{world}\sim_{\mathrm{analogy}}\xi_L,
\qquad
\text{totality}\sim_{\mathrm{analogy}}N_P(K),
\qquad
\text{generative law}\sim_{\mathrm{analogy}}(X_j,q_{j+1,j}).
}
\]

The mathematics itself does not choose among those metaphors. It only makes their levels distinct.

**One ordinary example: a chess game**

Chess keeps these four levels separate without requiring any metaphysics. A single board position is an *event-level state*: it says where the pieces are now. A completed legal game is a whole ordered history: changing the order of two moves generally changes the game, even if a later board happens to look the same. The space of all completed legal games is larger again—it contains this game, every game that branched away from it, and games nobody has yet played. Finally, the rules of chess are not one more game inside that space. They are the compatibility law deciding which finite positions can extend which others.

| Chess level                | Novelty construction | What changes when we move up a level?                             |
|----------------------------|----------------------|-------------------------------------------------------------------|
| One board position         | \(x_n\)         | We know one local configuration, not its whole history.           |
| One completed game         | \(\xi_L\)         | Order and continuation are included as one coherent history.      |
| Every legal completed game | \(\partial T_{\mathrm{nov}}(\mathcal P)\)         | One history becomes a point inside a space of alternatives.       |
| The rules of legal play    | \((X_j,q_{j+1,j})\)         | The object is now the law of extension, not a particular outcome. |

The analogy is imperfect—chess games terminate, while our boundary rays are infinite—but it blocks the most common category error. A position is not a completed game; a game is not the space of every game; and that space is not the rule system generating it. Likewise, a boundary point, a boundary space, and its inverse system are mathematically different objects. The interpretive question begins only after those distinctions are secure.

### 12.3 Immanence and Relative Transcendence

Suppose a completed alphabet \(K^*\) with \(K\subseteq K^*\) admits an encoding

\[
\iota:N_P(K)\longrightarrow K^*.
\]

If \(\iota(N_P(K))\subseteq K\), then completion objects are internally representable as states: the boundary is *immanent* in the enlarged alphabet. Yet internal representability does not imply finite identifiability. If

\[
|U_J(\xi_L)|>1
\qquad\text{for every finite }J,
\]

then no finite-resolution observation determines which completion is present. In the metaphorical vocabulary, the same object is immanent as a representable element and transcendent *relative to every finite observer*.

**Interpretive boundary.** Nothing in the construction proves the existence, uniqueness, agency, consciousness, or divinity of any object. The result is narrower and more useful: it supplies a precise mathematical distinction between an event, a completed history, the space of all completions, and the law organizing that space. The theological language is an interpretation of those levels, not evidence added to the theorems.

## 13. Conclusion

Completion, inverse limit, and boundary coincide under the stated extension hypotheses.

The construction now separates five logically distinct layers:

1.  **Traversal:** an infinite word \(L\in K^\omega\) determines a canonical ray in the prefix tree \(T_K\).
2.  **Completion:** that ray determines one boundary point \(\xi_L\in\partial T_K\), while each finite prefix determines a positive-radius cylinder.
3.  **Operational observation:** a resource budget replaces objective states by distinguishability classes in \(Q_B\).
4.  **Novelty:** a chosen invariant may produce a quotient of the prefix boundary, or ordered discovery may instead require its own resolution-depth topology.
5.  **Realization:** compact metrizability is decisive in general; for ordered novelty, \(T_R\) realizes the closure of an admissible class and finite-profile extension promotes it to the full tree \(T_{\mathrm{nov}}\).

The three principal distinctions worth retaining are:

\[
\boxed{\;
\begin{array}{rcl}
|K|<\infty &\Rightarrow& \partial T_K \text{ is compact Cantor-like}\\[4pt]
K\cong\mathbb N \text{ (discrete)} &\Rightarrow& \partial T_K \text{ is noncompact Baire space}\\[4pt]
Q_{\mathrm{nov}} \text{ compact metric} &\Rightarrow& Q_{\mathrm{nov}}\cong\partial X
\text{ for some proper hyperbolic }X
\end{array}\;}
\]

For the ordered construction, the central identity is sharper:

\[
\boxed{
\widehat{\left(\mathcal T/{\sim_0},
\overline\rho_{\mathrm{disc}}\right)}
\cong
\overline{C^P_{\mathrm{nov}}(\mathcal T)}
\subseteq
N_P(K),
}
\]

and under finite-profile extension,

\[
\boxed{
\widehat{\left(\mathcal T/{\sim_0},
\overline\rho_{\mathrm{disc}}\right)}
\cong
N_P(K)
\cong
\partial T_{\mathrm{nov}}(\mathcal P).
}
\]

The multiscale construction therefore resolves the first topological obstruction: ordered novelty has a literal metric completion and an explicit proper hyperbolic realization once resolution, rather than prefix length, supplies the depth coordinate. RBDS supplies the observer layer: every finite resolution is an operational quotient determined by available distinctions. What remains open is canonicity—how much the result depends on the chosen partition or observation tower—and how adaptive observation changes the completion it is trying to infer.

**If you skipped the technical middle**

Here is the entire journey in ordinary language. First, write a history as an endless list of states. Second, represent every finite beginning of that history as a vertex in a tree. An endless history then becomes a ray through the tree, and its asymptotic completion becomes a boundary point. Third, notice that a finite observer cannot distinguish every state: a limited budget groups nearby or operationally equivalent states together. Fourth, if we care specifically about novelty, record the order in which those distinguishable regions are first encountered. Repeat that recording at finer and finer resolutions. Finally, assemble the compatible records into one infinite-resolution profile.

That profile is not a prediction of the final event. It is a completed description of how novelty is organized across scale. Profiles that agree through many resolution levels are close; profiles that first differ at a coarse level are far apart. This rule gives a genuine metric after indistinguishable traversals are identified. Completing that metric space adds any ideal profiles approached by increasingly precise finite descriptions. The same compatible finite descriptions form a locally finite tree, so those completed profiles are also exactly the tree’s hyperbolic boundary.

### 13.1 The Result in Five Plain Questions

1.  **What happened?** The traversal \(L\) records the states in temporal order.
2.  **What can a finite observer tell apart?** A budget or resolution replaces exact states by operational cells.
3.  **What was discovered, and in what order?** The word \(D_j(L)\) removes dwell and revisits while retaining first-discovery order at scale \(j\).
4.  **What survives every refinement?** The coherent profile \((D_0,D_1,\ldots)\) records ordered novelty across all resolutions.
5.  **Where does the completed profile live?** In the metric completion \(N_P(K)\), equivalently on the boundary \(\partial T_{\mathrm{nov}}(\mathcal P)\) when finite profiles extend.

This is why the final equality is not merely a chain of suggestive analogies. Its three terms arise from three independent constructions: Cauchy completion from a metric, inverse limit from compatible finite-resolution data, and Gromov boundary from infinite rays in a proper hyperbolic tree. The theorem says those constructions identify the same points under the stated extension hypotheses.

### 13.2 What Remains to Be Learned

**Problem (Canonicity of the discovery completion).** Let \(\mathcal P\) and \(\mathcal Q\) be admissible refining partition towers on the same compact metric space \((K,d)\), both with mesh tending to zero.

\(i\) Find conditions on the pair \((\mathcal P, \mathcal Q)\) under which there exists a homeomorphism \(\Phi : N_P(K) \to N_Q(K)\) intertwining the completions, \(\Phi \circ C^P_{\mathrm{nov}} = C^Q_{\mathrm{nov}}\) on \(K^\omega\). Since \(N_P(K)\) and \(N_Q(K)\) are compact, metrizable, and zero-dimensional, they may be abstractly homeomorphic for uninteresting reasons (both Cantor, for instance); the question is equivalence *as completions of the same traversals*, not as abstract compacta.

\(ii\) When no such \(\Phi\) exists, determine the natural weaker notion: equivalence generated by common refining towers, or an explicit re-coding condition on the bonding maps \((q^{\mathcal P}, q^{\mathcal Q})\) and the interleaving of meshes that transports threads of one tower to threads of the other.

The construction of §10 fixes a tower first; nothing there answers either part. Three further questions matter as well. *Realizability:* which coherent infinite-resolution profiles come from one actual traversal, and which appear only after completion because every finite demand is satisfiable while the whole demand is not? *Adaptivity:* what changes when an observer’s earlier discoveries alter the distinctions, costs, or partitions available later?

In beginner’s language: does the answer depend on the microscope, can every ideal description happen in the world, and what if looking changes what can be seen next? The present construction does not settle those questions. It gives them a precise home.

## Glossary: 33 Terms That Carry the Argument

This glossary is deliberately local: each definition says what the term means *in this document*. Hover or focus the underlined first-use term in each article section for a short definition; the section link points to the place where the idea is motivated or used formally. The definitions mirror `glossary.md`.

Alphabet  
The state set \(K\) from which a traversal takes its values. It may be finite, countably infinite, or a metric space with continuously many points. §1

State  
One possible value \(x\in K\). A state is a local configuration, not a complete history or a boundary point. §1

Traversal  
An infinite ordered sequence \(L=(x_0,x_1,\ldots)\in K^\omega\). Repetitions are allowed unless an admissible class explicitly forbids them. §1

Prefix  
A finite initial history \(I_N(L)=(x_0,\ldots,x_N)\). It narrows possible completions but generally does not determine one. §6

Dwell  
A consecutive run in which the traversal remains at the same state. A finite dwell ends; an infinite dwell is a halt. §1.1

Halting  
Eventual constancy: after some index \(N\), every later state is the same. Halting is stronger than merely revisiting a state often. §1.1

Recurrence  
Return of a state, region, or neighborhood under a specified notion of observation. Exact-point recurrence and regional recurrence are different claims. §3

Exact recurrent support  
The set \(R_{\mathrm{pt}}(L)\) of exact states occurring infinitely many times. It can be empty even when the traversal accumulates somewhere. §2.1

\(\omega\)-limit set  
The points approached by subsequences arbitrarily far along the traversal. It retains where the path accumulates but forgets the order of first discovery. §3.2

Nonatomic measure  
A measure assigning zero mass to every individual point. Continuous sampling may therefore avoid exact repeats even while returning infinitely often to positive-measure regions. §3.1

Metric  
A distance function satisfying positivity, symmetry, and the triangle inequality. Different metrics here measure different things: state distance, prefix agreement, or discovery agreement. §4

\(\varepsilon\)-separated set  
A collection whose distinct points remain at least \(\varepsilon\) apart. It models how many observations can still be distinguished at resolution \(\varepsilon\). §4.1

Packing number  
The largest size of an \(\varepsilon\)-separated subset, up to the convention used. It measures distinguishable capacity at a fixed spatial scale. §4.1

Prefix tree  
The rooted tree \(T_K=K^{\lt\omega}\) whose vertices are finite histories and whose edges append one state. It makes temporal order part of the geometry. §6

Ray  
An infinite geodesic path beginning at the root. In a prefix tree, a ray chooses exactly one state at every successive depth. §6.1

Cylinder  
The set of all infinite traversals sharing a specified finite prefix—or, later, all novelty profiles sharing specified resolution coordinates. Cylinders are the basic observable neighborhoods. §6.2

Ultrametric  
A metric satisfying \(d(x,z)\le\max\{d(x,y),d(y,z)\}\). Agreement until the first differing level naturally produces this stronger triangle law. §6.2

Gromov-hyperbolic  
A geodesic space whose triangles are uniformly thin. Trees are the exact case: every geodesic triangle is a tripod, so a tree is \(0\)-hyperbolic. §6.1

Boundary  
The space of asymptotic ray directions, with rays identified when they remain a bounded distance apart. It is a completion object, not a final vertex reached at infinite time. §9

Proper space  
A metric space in which every closed bounded set is compact. Locally finite unit-edge trees are proper; infinitely branching discrete trees are not. §9.1

Compact  
A topological finiteness condition: every open cover has a finite subcover, equivalently in metric spaces every sequence has a convergent subsequence. Proper hyperbolic boundaries are compact. §7

Metrizable  
Having a topology generated by some metric. A compact metrizable novelty space can be handled with sequences, distances, and Cauchy completion. §8

Quotient space  
A space formed by treating equivalent points as one point. A closed equivalence relation is crucial when the starting space is compact metric and the quotient is expected to remain Hausdorff. §8

Ordered novelty word  
The finite word \(D_j(L)\) listing partition cells in the order they are first encountered at resolution \(j\). Dwell and revisits disappear; first-discovery order remains. §10.3

Partition tower  
A sequence of finite partitions \(\mathcal P_0,\mathcal P_1,\ldots\) whose cells shrink and refine one another. Its depth represents improving distinguishability rather than passing time. §10.3

Bonding map  
The coarse-graining map \(q_{j+1,j}\): send fine cells to parents, then remove repeated parents after their first appearance. It enforces consistency across resolutions. §10.3

Inverse limit  
The space \(N_P(K)\) of all coordinate sequences compatible under every bonding map. It stores a complete coherent discovery profile across all resolutions. §10.4

Discovery topology  
The topology in which two traversals are close when their ordered novelty words agree to fine resolution. It differs from the prefix topology, which measures agreement through time. §10.5

Metric completion  
The complete metric space obtained by adding limits of all Cauchy sequences after zero-distance points are identified. Here it adds coherent ideal novelty profiles. §10.6

RBDS  
A Resource-Bounded Distinction System: an observer model in which limited resources determine which objective states are operationally distinguishable. Increasing budget refines the quotient. §11

Sufficient memory  
A compressed history representation retaining everything required for a specified novelty decision. One-step sufficiency and deterministic online updating require different equivalence relations in general. §10.7

Fenwick tree  
A binary indexed tree for dynamic prefix sums. Here it indexes an ordered occupancy vector, adding spatial rank and cumulative-count queries without replacing the separate discovery-order log. §10.8

Keyed streaming state  
Updateable state scoped to a stream key. It is an implementation substrate for online memory, not automatically the minimal future-equivalence quotient. §10.9

## Core Synthesis: The Smallest Memory That Preserves Novelty

### Core Question

A system moves through an indefinitely growing sequence of states,

\[
H_t=(x_0,x_1,\ldots,x_t).
\]

At each step it may need to decide whether a candidate state \(x\) is genuinely new relative to what it has already encountered. The naive solution is to retain the entire history \(H_t\), but the required storage grows as \(t\to\infty\). The central question is therefore:

What is the smallest memory state that preserves every future novelty judgment?

Equivalently:

\[
\boxed{
\text{What can a system safely forget without changing what it will later regard as novel?}
}
\]

This is a general problem in online computation, recurrent systems, and finite-capacity memory.

Modern recurrent-attention architectures confront its engineering form. Standard attention retains growing token-specific memories; recurrent attention compresses the past into a fixed-dimensional state. Finite capacity creates interference, requiring learned preservation, overwrite, decay, or routing. Delta-style updates read an existing key association and write a correction rather than only accumulating another one.

### Core Math

Let \(K\) be a state space and

\[
\mathcal H=K^{<\omega}
\]

the set of finite histories. Define a novelty predicate

\[
\mathsf{Nov}:K\times\mathcal H\longrightarrow\{0,1\},
\]

where \(\mathsf{Nov}(x\mid H)=1\) means that \(x\) is novel relative to \(H\). For exact novelty,

\[
\mathsf{Nov}_{\mathrm{exact}}(x\mid H)
=
\mathbf 1[x\notin V(H)],
\]

where

\[
V(H)=\{y:y\text{ occurs in }H\}.
\]

For metric novelty at scale \(\varepsilon>0\),

\[
\mathsf{Nov}_{\varepsilon}(x\mid H)
=
\mathbf 1[d(x,V(H))>\varepsilon].
\]

The essential point is relational:

\[
\boxed{
\text{novelty is not a property of }x\text{ alone;}
\quad
\text{it compares }x\text{ with retained information about the past}.
}
\]

#### One-step sufficient memory

A memory map

\[
M:\mathcal H\longrightarrow\mathcal M
\]

is sufficient for one-step novelty if there exists

\[
\widetilde{\mathsf{Nov}}:K\times\mathcal M\longrightarrow\{0,1\}
\]

such that

\[
\mathsf{Nov}(x\mid H)
=
\widetilde{\mathsf{Nov}}(x\mid M(H))
\]

for every \(x\) and \(H\). This induces the equivalence relation

\[
H\sim_{\mathrm{mem}}H'
\iff
\forall x\in K,\quad
\mathsf{Nov}(x\mid H)=\mathsf{Nov}(x\mid H').
\]

The quotient

\[
\mathcal M_{\mathrm{nov}}
=
\mathcal H/{\sim_{\mathrm{mem}}}
\]

is the minimal information required to reproduce the next novelty decision. For exact novelty,

\[
H\sim_{\mathrm{mem}}H'
\iff
V(H)=V(H'),
\]

so the entire ordered history can be compressed to its visited set:

\[
\boxed{M_{\mathrm{exact}}(H)=V(H).}
\]

Order and dwell time are irrelevant if the only question is, “Have I seen this exact state before?” At fixed metric resolution, the corresponding decision memory is the closed neighborhood

\[
M_\varepsilon(H)=V(H)^{(\varepsilon)}.
\]

### Why One-Step Sufficiency Is Not Enough

Suppose two histories give the same answer for every possible next state. That does not yet guarantee that, after observing that next state, their compressed memories can still be updated identically. A reusable online system needs a stronger equivalence.

For a finite continuation \(u=(u_1,\ldots,u_m)\), let \(\mathsf{Out}(H;u)\) be the entire sequence of novelty outputs produced while appending \(u\) to \(H\). Define

\[
\boxed{
H\sim_{\mathrm{fut}}H'
\iff
\forall u\in K^{<\omega},\quad
\mathsf{Out}(H;u)=\mathsf{Out}(H';u).
}
\]

This is the Myhill–Nerode-style strengthening. It has the crucial right-congruence property

\[
H\sim_{\mathrm{fut}}H'
\Longrightarrow
H\mathbin{\smallfrown}(x)
\sim_{\mathrm{fut}}
H'\mathbin{\smallfrown}(x)
\qquad
\forall x\in K.
\]

Therefore

\[
\mathcal M_{\mathrm{fut}}
=
\mathcal H/{\sim_{\mathrm{fut}}}
\]

admits the deterministic update

\[
U([H],x)
=
[H\mathbin{\smallfrown}(x)]
\]

and novelty output

\[
\lambda([H],x)
=
\mathsf{Nov}(x\mid H).
\]

Hence

\[
\boxed{
(\mathcal M_{\mathrm{fut}},K,U,\lambda)
}
\]

is the minimal deterministic online machine preserving all future novelty behavior. The distinction can be stated without notation:

| Requirement                            | Question it answers                                                                         |
|----------------------------------------|---------------------------------------------------------------------------------------------|
| One-step sufficient memory             | Is the next candidate novel?                                                                |
| Online sufficient memory               | Can this compressed state be updated forever while preserving every later novelty decision? |
| Ordered discovery profile \(D_j\) | In what order were distinguishable regions first discovered?                                |

### Core Answer

Memory should preserve exactly the distinctions in history that can affect future novelty judgments. Everything else is forgettable. More precisely,

\[
\boxed{
\text{minimal online novelty memory}
=
\mathcal H/{\sim_{\mathrm{fut}}}.
}
\]

This gives a task-relative definition of forgetting:

\[
\boxed{
\text{forgetting}
=
\text{identifying histories that no future novelty test can distinguish}.
}
\]

Memory does not need to preserve the past literally. It must preserve the past only up to future behavioral relevance.

The same distinction clarifies recurrent neural memory. A growing KV cache retains token-specific historical structure explicitly. A recurrent architecture instead computes

\[
H_t\longmapsto S_t,
\qquad
S_{t+1}=F(S_t,x_{t+1}),
\]

and must learn whether \(S_t\) preserves the distinctions required by later computation. Modern gated and delta-rule architectures introduce selective overwrite, decay, and retrieval because purely additive finite memory eventually suffers interference. The cited Kimi architectural history describes this as the need for learned control over what survives in a fixed-capacity associative state, while the primary Kimi Linear work presents KDA as a mechanism for using limited finite-state memory more effectively.33

The mathematical quotient provides an idealized target:

\[
\boxed{
S_t\approx[H_t]_{\mathrm{fut}}.
}
\]

This is a conceptual approximation sign, not an architectural theorem. A learned recurrent state is not guaranteed to equal the quotient, to be minimal, or even to solve a novelty task. It is attempting the same kind of compression: discard historical detail while retaining distinctions needed for future behavior.

#### From quotient to data structure

For exact novelty on the ordered finite alphabet \(K=[m]=\{1,\ldots,m\}\), the quotient and its natural occupancy representation are

\[
\mathcal M_{\mathrm{fut}}\cong2^{[m]},
\qquad
b_i(t)=\mathbf1[i\in V(H_t)].
\]

A bitset answers membership in \(O(1)\) and uses the information-theoretic minimum \(m=\log_2(2^m)\) bits.

A Fenwick tree does not shrink the quotient; it indexes the occupancy vector so that

\[
F_t(x)=\sum_{i\le x}b_i(t),
\qquad
r_t(x)=1+\sum_{i\lt x}b_i(t)
\]

support prefix-count, spatial-rank, and select queries in \(O(\log m)\):

\[
\boxed{
\text{bitset is information-optimal;}
\qquad
\text{Fenwick is cumulative-query-efficient}.
}
\]

| State        | Role                                                            |
|--------------|-----------------------------------------------------------------|
| \(b_{j,r}\) | Discovered-cell occupancy                                       |
| \(\mathrm{Fenwick}(b_j)\) | Spatial cumulative queries                                      |
| \(D_j\) | Temporal first-discovery order                                  |
| \(M_L(\varepsilon_j,t)\) | Total discovered by time \(t\); one scalar is sufficient |

A complete per-resolution implementation may maintain

\[
\boxed{
(\texttt{seen}_j,\ \texttt{Fenwick}_j,\ \texttt{discoveryLog}_j).
}
\]

Fenwick maintains occupancy, not the temporal word \(D_j\). Across levels \(0,\ldots,J\), its per-observation update cost is

\[
O\!\left(\sum_{j=0}^{J}\log N_j\right),
\]

assuming the containing cell at every resolution is already known; cell-location cost is additional.

The governing chain is

\[
\boxed{
\text{semantic quotient}
\longrightarrow
\text{sufficient statistic}
\longrightarrow
\text{chosen observables}
\longrightarrow
\text{dynamic data structure}.
}
\]

In distributed stream processing, the representative may live as keyed runtime state. State TTL is behavior-preserving only when expiration respects the chosen future-equivalence relation; a window instead changes the novelty predicate itself. See §10.9.

The open algorithmic question is which novelty predicates admit compact, efficiently updatable representations of \(\mathcal H/{\sim_{\mathrm{fut}}}\).

The entire result can therefore be compressed to one line:

\[
\boxed{
\text{Novelty requires memory, and optimal memory is history quotiented by future novelty indistinguishability.}
}
\]

------------------------------------------------------------------------

## References

1.  Poincaré, H. (1890). *Sur le problème des trois corps et les équations de la dynamique*. Acta Mathematica, 13, 1–270. The original recurrence theorem: measure-preserving dynamics return almost every point arbitrarily close to itself.
2.  Cantor, G. (1891). *Über eine elementare Frage der Mannigfaltigkeitslehre*. Jahresbericht der Deutschen Mathematiker-Vereinigung, 1, 75–78. Establishes \(\aleph_0^{\aleph_0} = 2^{\aleph_0}\).
3.  Bridson, M. R., & Haefliger, A. (1999). *Metric Spaces of Non-Positive Curvature*. Springer. Grundlehren der mathematischen Wissenschaften, 319. Standard reference for trees, geodesic spaces, and non-positive-curvature boundary constructions.
4.  Furstenberg, H. (1981). *Recurrence in Ergodic Theory and Combinatorial Number Theory*. Princeton University Press. M. B. Porter Lectures. The definitive treatment of measure-theoretic recurrence and its topological extensions.
5.  Kolmogorov, A. N., & Tikhomirov, V. M. (1959). *\(\varepsilon\)-entropy and \(\varepsilon\)-capacity of sets in function spaces*. Uspekhi Matematicheskikh Nauk, 14(2), 3–86. Foundational paper on metric entropy, packing numbers, and resolution-dependent complexity.
6.  Hausdorff, F. (1936). *Mengenlehre*. 3rd ed., Dover reprint. The classical treatment of compactification via quotient by equivalence.
7.  Halmos, P. R. (1960). *Naive Set Theory*. Van Nostrand. Accessible exposition of Cantor's theorem and the cardinality of sequence spaces.
8.  Mac Lane, S. (1998). *Categories for the Working Mathematician*. 2nd ed., Springer. Graduate Texts in Mathematics, 5. Quotient constructions as universal properties.
9.  Poincaré, H. (1882). *Théorie des groupes fuchsiens*. Acta Mathematica, 1, 1–62. Origin of the disk model for hyperbolic geometry. See also Stillwell, J. (1992), *Geometry of Surfaces*, Springer, for a modern textbook treatment.
10. Eberlein, P. (1996). *Geometry of Nonpositively Curved Manifolds*. In: Ferreira, M. et al. (eds.), *Geometry of Nonpositively Curved Manifolds*. CIME Lectures, Springer. Comprehensive treatment of ideal boundaries and visibility manifolds.
11. Cover, T. M., & Thomas, J. A. (2006). *Elements of Information Theory*. 2nd ed., Wiley. Chapter on prediction and non-identifiability in infinite-horizon sequences.
12. Morse, M., & Hedlund, G. A. (1938). *Symbolic Dynamics II: Sturmian Trajectories*. American Journal of Mathematics, 62(1), 1–42. The foundational paper establishing the study of infinite sequences over discrete alphabets as a self-contained mathematical discipline. See also Lind, D. A., & Marcus, B. (1995), *An Introduction to Symbolic Dynamics and Coding*, Cambridge University Press, for the modern textbook treatment.
13. Birkhoff, G. D. (1931). *Proof of the Ergodic Theorem*. Proceedings of the National Academy of Sciences USA, 17(12), 656–660. Together with von Neumann, J. (1932), *Proof of the Quasi-ergodic Hypothesis*, Proc. Natl. Acad. Sci. USA 18(1), 70–82, this establishes the modern measure-theoretic foundation of recurrence.
14. Carathéodory, C. (1919). *Über den Wiederkehrsatz von Poincaré*. Sitzungsberichte der Preussischen Akademie der Wissenschaften, 580–584. The first rigorous proof of Poincaré recurrence for Lebesgue measure on a bounded region.
15. Walters, P. (1982). *An Introduction to Ergodic Theory*. Graduate Texts in Mathematics 79, Springer. The standard graduate textbook covering both measure-theoretic and topological recurrence. See also Katok, A., & Hasselblatt, B. (1995), *Introduction to the Modern Theory of Dynamical Systems*, Cambridge University Press, Encyclopedia of Mathematics and its Applications 54.
16. Sinaĭ, Ya. G. (1959). *On the Notion of Entropy of a Dynamical System*. Doklady Akademii Nauk SSSR, 124, 768–771. The definition of metric (Kolmogorov–Sinaĭ) entropy of a measure-preserving transformation.
17. Adler, R. L., Konheim, A. G., & McAndrew, M. H. (1965). *Topological Entropy*. Transactions of the American Mathematical Society, 114(2), 309–319. The original definition of topological entropy via open covers.
18. Bowen, R. (1971). *Entropy for Group Endomorphisms and Homogeneous Spaces*. Transactions of the American Mathematical Society, 153, 401–414. Together with Dinaburg, E. I. (1970), *Relationship between Topological Entropy and Metric Entropy*, Dokl. Akad. Nauk SSSR 170, 19–22, this establishes the variational principle \(h_{\text{top}}(T) = \sup_\mu h_\mu(T)\).
19. Stone, M. H. (1937). *Applications of the Theory of Boolean Rings to General Topology*. Transactions of the American Mathematical Society, 41(3), 375–481. Čech, E. (1937). *On Bicompact Spaces*. Annals of Mathematics, 38(4), 823–844. The original constructions of the Stone–Čech compactification.
20. Munkres, J. R. (2000). *Topology*. 2nd ed., Prentice Hall. Standard reference for compactifications and quotient topologies.
21. Hopf, E. (1939). *Statistik der geodätischen Linien in Mannigfaltigkeiten negativer Krümmung*. Berichte über die Verhandlungen der Sächsischen Akademie der Wissenschaften zu Leipzig, 91, 261–304. The ergodic theory of geodesic flows on negatively curved manifolds. See also Fomin, S. V., & Gelfand, I. M. (1952), *Geodesic Flows on Manifolds of Constant Negative Curvature*, Uspekhi Mat. Nauk 7(1), 118–137.
22. Gromov, M. (1987). *Hyperbolic Groups*. In S. M. Gersten (ed.), *Essays in Group Theory*, Mathematical Sciences Research Institute Publications 8, Springer, pp. 75–263. Introduces \(\delta\)-hyperbolic groups and their Gromov boundary, abstracting the Poincaré-disk boundary construction to arbitrary Gromov-hyperbolic spaces. See also Cannon, J. W. (1994), *The Combinatorial Riemann Mapping Theorem*, Acta Mathematica 173(2), 155–234.
23. Solomonoff, R. (1964). *A Formal Theory of Inductive Inference, Parts I and II*. Information and Control, 7(1–2), 1–22, 224–254. Introduces algorithmic probability — the foundational observation that an information-bounded observer cannot uniquely determine an asymptotic object from finite prefixes alone.
24. Kolmogorov, A. N. (1965). *Three Approaches to the Quantitative Definition of Information*. Problems of Information Transmission, 1(1), 1–7. The introduction of Kolmogorov complexity and the basis for the rigorous treatment of finite-prefix limitations on inferring asymptotic structure.
25. Kechris, A. S. (1995). *Classical Descriptive Set Theory*. Graduate Texts in Mathematics 156, Springer. Standard reference for Cantor space, Baire space, Polish spaces, and their universal topological characterizations.
26. Buyalo, S., & Schroeder, V. (2007). *Elements of Asymptotic Geometry*. EMS Monographs in Mathematics. The hyperbolic approximation construction realizes complete bounded metric spaces as boundaries of visual hyperbolic spaces; compact input yields a proper approximation.
27. Billingsley, P. (1999). *Convergence of Probability Measures*. 2nd ed., Wiley. Standard treatment of weak convergence and compactness for spaces of Borel probability measures over compact metric spaces.
28. Nadler, S. B., Jr. (1978). *Hyperspaces of Sets*. Marcel Dekker. Standard reference for the Hausdorff-metric hyperspace of nonempty compact subsets and its compactness over compact metric spaces.
29. Fraser, J. M. (2020). *Assouad Dimension and Fractal Geometry*. Cambridge Tracts in Mathematics 222, Cambridge University Press. Section 1.2 explains the equivalence, for box dimension, of covering numbers, separated-set counts, packings, and mesh cubes.
30. Iyer, S. (2026). *Why AI Hallucinates (It’s the Same Math as Gravity)*. Space Time Cafe. Companion lecture introducing Resource-Bounded Distinction Systems, operational quotients, asymmetric attention drift, and observation–causality feedback.
31. Gouvêa, F. Q. (1997). *p-adic Numbers: An Introduction*. 2nd ed., Universitext, Springer. See also Cobos, A., & Navas, L. M. (2021). *Tilings of the Infinite p-ary Tree and Cantor Homeomorphisms*. Mediterranean Journal of Mathematics, 18, 226, for the explicit identification of \(p\)-ary words with \(p\)-adic balls and paths in the full \(p\)-ary tree.
32. The analogy combines two classical ideas. Fisher, R. A. (1922). *On the Mathematical Foundations of Theoretical Statistics*. Philosophical Transactions of the Royal Society A, 222, 309–368, introduced statistical sufficiency. Nerode, A. (1958). *Linear Automaton Transformations*. Proceedings of the American Mathematical Society, 9, 541–544, is the classical source for quotienting input histories by indistinguishable continuation behavior in deterministic state minimization.
33. ali [@waterloo_intern]. (2026, July 27). *22580: From GPT2 to Kimi3, Explained* [X article]. This expository architecture history motivates the comparison made here. For the primary technical source, see Kimi Team et al. (2025). *Kimi Linear: An Expressive, Efficient Attention Architecture*, which introduces Kimi Delta Attention as a finite-state linear-attention module extending Gated DeltaNet. Neither source claims the exact quotient characterization of Theorem 10.12.
34. Fenwick, P. M. (1994). *A New Data Structure for Cumulative Frequency Tables*. Software: Practice and Experience, 24(3), 327–336. Introduces the binary indexed tree for compact dynamic cumulative-frequency maintenance, with operations constant or logarithmic in the table size.
35. Apache Flink Project. *Working with State* and *Windows*. Official documentation for key-scoped state primitives, state time-to-live behavior, and tumbling, sliding, and session-window semantics. The cited DataStream V2 window API is marked experimental; the mathematical comparison concerns the documented state and window semantics rather than API stability.
36. Bost, J.-B., & Connes, A. (1995). *Hecke algebras, type III factors and phase transitions with spontaneous symmetry breaking in number theory*. *Selecta Mathematica*, 1(3), 411–457. The original Bost–Connes quantum statistical system, with prime-number arithmetic, time evolution, KMS states, and phase-transition structure.
37. Scott, D. S., & Strachey, C. (1971). *Toward a Mathematical Semantics for Computer Languages*. Oxford University Computing Laboratory, Programming Research Group Technical Monograph PRG-6. Foundational source for denotational semantics and the mathematical treatment of recursive computation.
38. Abramsky, S., & Jung, A. (1994). *Domain Theory*. In *Handbook of Logic in Computer Science*, Vol. 3, pp. 1–168, Oxford University Press. Standard account of domains, approximation, and recursive meanings.
39. Weihrauch, K. (2000). *Computable Analysis: An Introduction*. Springer. Reference for represented spaces, type-2 effectivity, and the continuity constraints on computable maps.
40. Büchi, J. R. (1962). “On a Decision Method in Restricted Second Order Arithmetic.” In *Logic, Methodology and Philosophy of Science*, Proceedings of the 1960 International Congress, pp. 1–11, Stanford University Press. Foundational source for finite-automaton methods on infinite words.
41. Landweber, L. H. (1969). “Decision Problems for \(\omega\)-Automata.” *Mathematical Systems Theory*, 3(4), 376–384. Early systematic treatment of decision problems for automata reading infinite words.
42. Thomas, W. (1997). “Languages, Automata, and Logic.” In G. Rozenberg & A. Salomaa (eds.), *Handbook of Formal Languages*, Vol. 3, pp. 389–455, Springer. Survey of the logic and automata theory of infinite-word languages.
43. Myhill, J. (1957). *Finite Automata and the Representation of Events*. WADC Technical Report TR 57-624, pp. 112–137. The missing Myhill half of the Myhill–Nerode finite-state distinguishability tradition.
44. Hopcroft, J. E., Motwani, R., & Ullman, J. D. (2006). *Introduction to Automata Theory, Languages, and Computation*, 3rd ed. Pearson. Standard textbook treatment of Myhill–Nerode theory and deterministic automata.
45. Katharopoulos, A., Vyas, A., Pappas, N., & Fleuret, F. (2020). “Transformers are RNNs: Fast Autoregressive Transformers with Linear Attention.” *Proceedings of ICML*, PMLR 119, 5156–5165. Primary source for the recurrent formulation of linear attention.
46. Schlag, I., Irie, K., & Schmidhuber, J. (2021). “Linear Transformers Are Secretly Fast Weight Programmers.” *Proceedings of ICML*, PMLR 139. Primary source for the fast-weight and delta-rule interpretation of linear attention.
47. Yang, S., Kautz, J., Hatamizadeh, A., et al. (2024). “Gated Delta Networks: Improving Mamba2 with Delta Rule.” arXiv:2412.06464. Primary source for the Gated DeltaNet update mechanism.
48. Gu, A., & Dao, T. (2023). “Mamba: Linear-Time Sequence Modeling with Selective State Spaces.” arXiv:2312.00752. Primary source for selective state-space sequence modeling.
49. Falconer, K. (2014). *Fractal Geometry: Mathematical Foundations and Applications*, 3rd ed. Wiley. Standard reference for Hausdorff, box-counting, and related fractal dimensions.
50. Mattila, P. (1995). *Geometry of Sets and Measures in Euclidean Spaces: Fractals and Rectifiability*. Cambridge University Press. Reference for covering measures, Hausdorff geometry, and separated-set arguments.
51. Heinonen, J. (2001). *Lectures on Analysis on Metric Spaces*. Springer, Universitext. Background on covering theorems and analysis in general metric spaces.
52. Schikhof, W. H. (1984). *Ultrametric Calculus: An Introduction to p-Adic Analysis*. Cambridge Studies in Advanced Mathematics 4, Cambridge University Press. Standard reference for ultrametric spaces and \(p\)-adic analysis.
53. Allouche, J.-P., & Shallit, J. (2003). *Automatic Sequences: Theory, Applications, Generalizations*. Cambridge University Press. Reference for finite-automaton generation of infinite words and its number-theoretic connections.
54. Ghys, É., & de la Harpe, P. (eds.) (1990). *Sur les groupes hyperboliques d’après Mikhael Gromov*. Progress in Mathematics 83, Birkhäuser. Book-length exposition of Gromov-hyperbolic groups and spaces.
55. Coornaert, M., Delzant, T., & Papadopoulos, A. (1990). *Géométrie et théorie des groupes: Les groupes hyperboliques de Gromov*. Lecture Notes in Mathematics 1441, Springer.
56. Bonk, M., & Schramm, O. (2000). “Embeddings of Gromov Hyperbolic Spaces.” *Geometric and Functional Analysis*, 10(2), 266–306. Complementary reference for embedding hyperbolic spaces and controlling their boundaries.
57. Beardon, A. F. (1983). *The Geometry of Discrete Groups*. Graduate Texts in Mathematics 91, Springer. Reference for Möbius transformations, Fuchsian groups, and hyperbolic-disk geometry.
58. Johnstone, P. T. (1982). *Stone Spaces*. Cambridge Studies in Advanced Mathematics 3, Cambridge University Press. Standard reference for Stone spaces, profinite objects, and the finite/inverse-limit viewpoint.
59. Eilenberg, S., & Steenrod, N. (1952). *Foundations of Algebraic Topology*. Princeton University Press. Classical reference for inverse systems and limits in algebraic topology.
60. Hurewicz, W., & Wallman, H. (1941). *Dimension Theory*. Princeton University Press. Classical source for the dimension-theoretic background to zero-dimensional compact spaces.
61. Alongi, J. M., & Nelson, G. S. (2007). *Recurrence and Topology*. Graduate Studies in Mathematics 85, American Mathematical Society. Modern treatment of topological recurrence and recurrent sets.
62. Alon, N., Matias, Y., & Szegedy, M. (1999). “The Space Complexity of Approximating the Frequency Moments.” *Journal of Computer and System Sciences*, 58(1), 137–147. Foundational bounded-memory streaming result.
63. Muthukrishnan, S. (2005). *Data Streams: Algorithms and Applications*. *Foundations and Trends in Theoretical Computer Science*, 1(2). Survey of streaming models, algorithms, and space tradeoffs.
64. Li, M., & Vitányi, P. (2008). *An Introduction to Kolmogorov Complexity and Its Applications*, 3rd ed. Springer. Modern reference for algorithmic information, description, and inference from finite data.
