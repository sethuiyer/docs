---
title: "The Persistent Discovery Index"
description: "PDI is an observability library for AI agents that keeps two ledgers at every resolution of a behavioural quotient tower: the distinctions the presentation makes, and the number that survive. This long-form narrative derives why the tower is forced, why the two ledgers cannot be merged, and exactly which claims are proved, computed, or open."
date: "2026-09-15"
author: "Sethurathienam Iyer"
tags: ["AI agents", "discovery cost", "quotient tower", "measurement"]
type: "Essay"
materials:
  - label: "Original"
    href: "https://gist.github.com/shunyabarlabs/ec39c0ad4ee105d283a914b7b0a99aed"
  - label: "Source"
    href: "https://github.com/sethuiyer/persistent-discovery-index/blob/main/MATH.md"
---

# The Persistent Discovery Index

The whole chain, in one narrative: why the tower is forced, why the two
ledgers cannot be merged, and exactly which claims are proved, computed, or
open. Claim-by-claim status is the ledger in [`SPINE.md`](https://github.com/sethuiyer/persistent-discovery-index/blob/main/SPINE.md) §0.

*Prefer to watch? The author's walkthrough of this narrative —
[The Hidden Cost of AI Discovery](https://www.youtube.com/watch?v=tkPmvU6x_bc) —
covers the same chain, ending on why benchmark scores hide the discovery cost.*

*Two ledgers, a tower, and the mathematics of what a finite observation licenses*

## Two runners and a bad metric

Two agents are given the same puzzle. The first tries twenty approaches and finds the answer. The second
tries two thousand and finds the same answer. Our dashboards say: both succeeded, success rate 1.0,
nothing to discuss. The difference — a hundredfold difference in how much work was needed to discover
the same structure — is invisible, because we collapsed the whole trajectory into a terminal bit.

This is the problem the Persistent Discovery Index (PDI) is built around, and the interesting part is
not that we can count steps. Counting is easy. The interesting part is that the quantity you want to
measure, discovery cost, is not a property of the answer. It is a property of the search, and search has
structure that changes with the resolution at which you look at it. So before we can measure anything,
we need a mathematical object that keeps both the structure found and the structure wasted, at every
resolution, without conflating them.

That object turns out to be a refining tower of quotients, and almost everything else in this software
is a consequence of taking the tower seriously.

## The tower

Let H be a set of histories — finite sequences of abstracted states, one per agent run. For each level j
= 1, …, J let Qⱼ : H → Xⱼ be a surjection onto a finite set of behaviour classes, where the levels
refine:

\[
Q_{j+1}(x) = Q_{j+1}(y) \implies Q_j(x) = Q_j(y). \tag{1}
\]

Equation (1) is the whole skeleton. It says that if two histories are indistinguishable at the finer
resolution j+1, they were already indistinguishable at the coarser resolution j. Equivalently, Qⱼ
factors through Qⱼ₊₁. The classes form a tree: level j's classes are unions of level (j+1)'s.

This is not a novel construction. It is the linear-time/branching-time spectrum of van Glabbeek, the
bisimulation quotients of Kanellakis and Smolka, the refinement orderings of process algebra. What PDI
does with it is the next section. But it is worth pausing on why (1) is the right axiom and not merely a
convenient one.

Without (1), the Xⱼ are just an unrelated list of feature spaces. You could compute a number at each
level and plot them, but the numbers would not be comparable, because there is no statement relating
what two adjacent levels are talking about. The refinement law is what makes the levels a tower — a
single object observed at many scales — rather than a bag of independent measurements. In code this is
enforced, not assumed: QuotientTower.validate raises TowerViolation if a pair of histories violates (1).
You cannot build the object without the proof.

## Two ledgers

Fix a distinguished subset P ⊆ H of histories that reach a successful outcome. Define

\[
n_j = |X_j|, \qquad L_j = |Q_j(P)|. \tag{2}
\]

nⱼ counts every distinction the presentation makes at resolution j. Lⱼ counts how many of those
distinctions are inhabited by successful histories — what survived.

Two observations. First, nⱼ = |H/ ∼ⱼ| exactly: it is a class count, not an estimate. Second, Lⱼ is
non-decreasing in j at fixed horizon, because the refining maps are surjective and P is fixed.

The design decision — the one that matters — is to keep both numbers and never merge them. Most systems
that deal with transient structure delete it. DFA minimisation trims unreachable states; symbolic
dynamics keeps only the essential part; bisimulation discards non-bisimilar branches; a cache evicts
misses. Each of these is the same move: intersect with the set of things that survive. PDI's claim is
that the gap between what was explored and what survived is itself the measurement, and you cannot see a
gap if you have already thrown away one side of it.

There is a subtlety here that costs people time. nⱼ is a survival-free quantity: it is determined by the
node set, not by the success predicate. You can verify this by fixing the histories and flipping the
success marks; nⱼ does not move. This means nⱼ is not a translation of "what survives" into another
language. It is an independent coordinate. The tower has two axes, and they are genuinely two.

## Exponents

Now we do what one always does with a growing sequence: rate it. Let εⱼ be the physical resolution at
level j, decreasing to zero, and define

\[
D = \limsup_j \frac{\log L_j}{-\log \varepsilon_j}, \qquad S = \limsup_j \frac{\log n_j}{-\log \varepsilon_j}, \qquad \Delta = S - D. \tag{3}
\]

Call them persistent complexity, exploration complexity, and discovery overhead. The claim that D means
something intrinsic rests on a covering argument. Build the discovery tree from the histories, put the
visual metric d = 2⁻ʳ on its boundary ∂ T, where r is the level. Level-j cylinders cover the boundary,
and distinct level-j cylinders are separated by 2 · 2⁻ʲ, so no ball of diameter 2⁻ʲ meets two of them.
Hence the minimal covering number is exactly the live count:

\[
N(\partial T,\, 2^{-j}) = L_j, \qquad \dim_B(\partial T) = \limsup_j \frac{\log L_j}{-\log \varepsilon_j}. \tag{4}
\]

So D is a box dimension. It is a covering count, a function of physical scale. It is invariant under
reindexing **provided the subsampled mesh is asymptotically dense in log-scale** — `s_{m+1}/s_m → 1`
with `s = -log ε`. Under that hypothesis a monotone sandwich pins the intermediate ratios and both D
and S are preserved; cofinality on its own is a statement about the set of levels, not their spacing,
and is not sufficient.

S has no such interpretation, and this is not a defect of the definition but a fact about what it
counts. Dead ends cover nothing. There is no set whose covering number is nⱼ, because the transient
branches do not survive to be covered. So S is intrinsically a shell-indexed sequence with no scale-free
meaning, and Δ = S - D inherits that. Under a **sparse** cofinal subsample it need not be preserved.
Concretely, with k_m = 2^(2^m), Lⱼ = 2ʲ and nⱼ = 2ʲ + 2^(2k_m) on k_m ≤ j < k_{m+1} (both counts
non-decreasing), the full tower gives D = 1, S = 2, Δ = 1, while the subsample j_m = k_m - 1 gives
D = 1, S = 1, Δ = 0. The mesh ratio (k_{m+1}-1)/(k_m-1) → ∞, so this is outside the dense-mesh theorem
— which is exactly why the theorem has to name its hypothesis.

This is the interpretive core of the instrument. D is a property of the task — how much structure there
is to find. Δ is a property of the algorithm — how much of its walk was wasted. Δ is a legitimate
algorithm comparison precisely when the task is held fixed, and is meaningless otherwise.

## The honest problem: a window is not a limit

Everything above concerns limsups over infinitely many scales. On real data you have finitely many
levels, and you compute a maximum over what you observed. These are different statistics, and the
difference is not noise.

Consider nⱼ = 1 + w(j-1). The ratio log nⱼ / j decays to zero, so the true S = 0. But the
observed-window maximum is log₂(1+w)/2, attained at j = 2, and it does not decrease no matter how deep
you go. The window statistic is not a noisy estimate of S; it is a different statistic that happens to
agree when growth is geometric.

The response is structural, not cosmetic. The instrument reports two layers. The finite-scale layer is
exact on the observed corpus: yield Lⱼ/nⱼ, class counts, and the onset j*, the first level at which
yield falls below a threshold. None of that involves asymptotics. The asymptotic layer reports the
moving tail Mₘ = sup[j≥m] sⱼ together with a convergence status: STABLE, TRENDING_UP, TRENDING_DOWN,
UNRESOLVED, or NONE.

The status matters more than the number, because of a small theorem. Since limsup = inf[m] Mₘ, no finite
prefix determines the limit: any observation is consistent with continuations whose limsup lies anywhere
from 0 to the prefix supremum. This is why every bound label in the system carries its hypothesis —
"lower bound if the tail stays monotone" — rather than asserting a bound outright. The number is not
forbidden; it is required to state the condition under which it means what it says. I will return to
this idea at the end, because it is the software's real thesis.

## Transport: from labels to loops

Now change the question. Instead of asking how much structure a search discovered, ask whether a closed
loop of presentations moves the persistent structure.

We need a stateful process. Let F be a finite state space and consider xₜ₊₁ = run(xₜ, λₜ, steps), where
λₜ is a presentation parameter and run is a deterministic local search with memory. For a closed loop γ
: λ₀ → λ₁ → ⋯ → λ₀, define the transport

\[
T_\gamma : F \to F, \qquad T_\gamma(x) = \text{state after traversing } \gamma. \tag{5}
\]

The memory requirement is not decorative. A memoryless solver has x = f(λ), so every closed loop returns
f(λ₀) and T_γ = id by construction. There is no transport question to ask. The memory — a tabu list, in
our implementation — is what makes "which branch are we on" a question with a nontrivial answer.

But now T_γ need not be well-defined on any meaningful partition. Two states "near the same optimum" can
be sent to different places. The fix is to construct the coarsest partition on which T is a map. Call π
T-stable if

\[
x \sim_\pi y \implies T(x) \sim_\pi T(y). \tag{6}
\]

Starting from any partition, iterate the refinement key

\[
\kappa(x) = \bigl(\text{block}(x),\; \text{block}(T(x))\bigr) \tag{7}
\]

to a fixpoint. Refinement is monotone and bounded by the discrete partition on a finite set, so it
terminates; at the fixpoint (6) holds by construction, and coarseness follows because any T-stable
refinement of the initial partition must separate states on which κ differs. This is ordinary partition
refinement — DFA minimisation, bisimulation quotienting — applied to a transport map instead of a
transition relation, and it compresses hard: from 4096 states down to 4–40 blocks, depending on tabu
length and step count.

## The recurrent core, and invertibility that is earned

Every finite map decomposes its functional graph into a recurrent core R — the union of its cycles — and
transient trees feeding into it. On R, the map is a permutation, by definition.

This is the first place in the whole construction where invertibility is not posited but earned. A cycle
is a permutation because a cycle is a permutation. Nothing was assumed. And it is exactly where the
structure lives: in one computation, a 24-block quotient split into 16 transient blocks and 8 recurrent
ones, with cycle lengths (1,1,2,4).

It is worth saying what this is not. One can build invertibility for free by working over a prime field:
let F = Fₚ^× and Tₐ(x) = ax mod p. Every nonzero a is invertible, so every Tₐ is a permutation, and a
loop with edge labels a₁, …, aₖ has residual h = ∏ aᵢ of finite order dividing p-1. Since Fₚ^× is
cyclic, h = gᵏ for a generator g, and

\[
\varphi(g^k) = \exp\!\left(\frac{2\pi i k}{p-1}\right) \tag{8}
\]

is a genuine character into U(1). All of that is correct, and all of it is circular as an answer to our
problem. Tₐ is invertible because we defined it as a group action. The residual h is a property of
labels we chose, not of any search. It models the target; it does not produce it. The earned statement
is narrower: the recurrent core of the real transport is invertible, and when its cycle lengths divide
p-1 — as 4 divides 4 and 12, as 2 divides 2, 4, 6 — the character exists for the structure we actually
found.

## Irreversibility is structural

The transport is many-to-one, and for a while that was an empirical observation: zero injective loops
among 216 tested. It is now a theorem, and the proof is short enough to give in full, because the
mechanism is the point.

Write the search state as x ∈ {0,1}ⁿ, let E be the number of uncut edges, and let the atomic step be a
min-conflicts flip

\[
g(x) = x \oplus e_{v(x)}, \qquad v(x) = \operatorname*{argmin}_v \bigl(\delta(x,v),\; |v - \lambda(n-1)|\bigr), \tag{9}
\]

where δ(x,v) = E(x ⊕ eᵥ) - E(x) and the comparison is lexicographic. Note that g minimises δ without
requiring it to be negative. It is a min-conflicts step, not gradient descent.

Lemma. Let z be a global optimum. Then for all a, b,

\[
\delta(z^{e_a}, b) = E(z^{e_a e_b}) - E(z^{e_a}) \;\ge\; E(z) - E(z^{e_a}) \;=\; \delta(z^{e_a}, a), \tag{10}
\]

because E(z) is the global minimum. So a is always an argmin at z^(eₐ) — undoing a perturbation of an
optimum is never worse than any alternative. Verified on 8096/8096 triples.

Theorem. Let S(z) = {a : v(z^(eₐ)) = a} and d₂(z) = #{z' optimal, z' ≠ z : d_H(z,z') = 2}. Then

\[
|g^{-1}(z)| = |S(z)| \ge n - 2\,d_2(z). \tag{11}
\]

The count is clean: a ∈ argmin[b] δ(z^(eₐ), b) always, and the argmin is a singleton except when some
other optimum sits at Hamming distance two from z using bit a; at most 2 d₂(z) bits can be so involved,
so at least n - 2d₂(z) bits win their tie-break outright.

Corollary. For n ≥ 2d₂(z) + 2, |g⁻¹(z)| ≥ 2: the one-step map is not injective.

The composition lemma is fine: if T = fₖ ∘ ⋯ ∘ f₁ is injective then f₁ is injective. The next step was
wrong. `run( · , λ, steps)` has `g` as its first step because the tabu list is empty there — but the
first step also *writes* the tabu list, so `run = h' ∘ G` with `G(x) = (g(x), tabu₁(x))`, and `G` is
injective: the same `g(x)` and the same tabu forces `x = y`. The collision in `g` exists only because
`run` projects the memory away. Of 1600 tested `g`-collisions, **528 re-separate** within a few steps,
so non-injectivity does **not** compose. What remains proved is the single step; the leg and schedule
claims are **empirical** (0 injective loops among 216; 475/475 tested legs non-injective), and O2 is
reopened. A valid proof must argue on the augmented map `(x, tabu)`.

The tabu-length fact survives and is explained by the same observation: the one-step image size is
identical across tabu lengths, because the first step is tabu-free.

The moral is not that the search is bad. It is that the map collapses hardest exactly where the search
is trying to go. You cannot have a contraction without a collision. And the recurrent core is therefore
not merely where invertibility happens to survive — it is the maximal place where it can.

## A square that almost commutes

Deleting things has an order, and the order matters. Let Sᵣₑₛ delete what does not survive refinement
(take the inverse limit), and S_dyn delete what does not survive iteration (take the recurrent core).
The defect is Ω = defect(A, B) where A = S_dyn Sᵣₑₛ and B = Sᵣₑₛ S_dyn.

On PDI's own axis — a tower of quotients of one finite set with surjective, T-invariant bonding maps —
the square commutes, Ω = 0, and it does so degenerately: both arms are "intersect with a fixed set," and
a finite tower of quotients has inverse limit equal to its finest level, so nothing is discarded by
Sᵣₑₛ. Over 1,204,224 systems at n ≤ 4, zero mismatches. This is a negative result about a candidate
invariant: Ω has no content as a PDI quantity.

On the other axis — a filtration that is not T-invariant, as in topological data analysis — Ω is
genuinely nonzero, with an exact characterisation: Ω ≠ 0 if and only if some periodic point of the
system lies in the filter while its orbit leaves it. Verified as an iff over all 3,754 pairs at n ≤ 4,
with zero failures among the 1,139 whose filter is T-invariant. The minimal witness is two states: X =
{0,1}, T the swap, F = {0}. Refine first and the cycle dies; iterate first and it survives the clip. The
dividing line is precisely T-invariance of the refinement axis.

## What the ledger cannot see

Here the construction turns on itself. Two tries built from four traces each:

\[
A = \texttt{((()())(()())),} \qquad B = \texttt{((()()())(()))}. \tag{12}
\]

These are different rooted trees — `A`'s root splits the four leaves two-and-two, `B`'s splits them
three-and-one. But nⱼ = (2,4) and Lⱼ = (2,4) for both. Every scalar PDI reports is a level-size profile, and a
level-size profile is a projection. This one is not injective. The information lives in the edges.

This is a good place to be honest about what a "summary" is. It is tempting to read a two-ledger result
as capturing the structure. It captures how much is transient at each resolution; it never captures how
the transients are arranged. The data structure retains the trie, so the edges are there to be queried —
but the headline numbers are lossy, and the loss is not recoverable from them.

That raises an obvious question: is there a compact invariant that does better — something that is
sensitive to edges without storing the whole graph? This is a natural place to reach for a zeta
function. The Ihara zeta of a graph is

\[
Z_G(u) = \prod_{[P]} \left(1 - u^{\ell(P)}\right)^{-1} \tag{13}
\]

over primitive non-backtracking closed cycles, with the Ihara–Bass closed form

\[
Z_G(u)^{-1} = (1-u^2)^{|E|-|V|} \det\!\left(I - uA + u^2(D-I)\right). \tag{14}
\]

It is a beautiful object, and it fails at the very witness that motivated it, for a structural reason.
The pair in (12) is a tree. A tree has no non-backtracking closed walk, so the product is empty and Z =
1 for both; the determinant is 1 - u² for both. The zeta family is identically blind here, because zeta
listens to edges only through cycles, and edges are not cycles. Computed across every forest tested, the
determinant is

\[
\det\!\left(I - uA + u^2(D-I)\right) = (1-u^2)^{\#\text{components}}, \tag{15}
\]

a function of the component count alone. Zero shape information.

That is not a failure of zeta; it is a location. On graphs with cycles it is sharp: C₃ ⊔ C₃ and C₆ share
a degree sequence and (|V|, |E|) = (6,6), yet Z⁻¹ = (1-u³)⁴ versus (1-u⁶)². So the routing law is:

\[
\text{transient arrangement} \to \text{edge/tree invariants (AHU)}, \qquad \text{recurrent arrangement} \to \text{cycle invariants } (Z_G). \tag{16}
\]

Keeping the edges does not mean every edge-derived invariant preserves what the ledger lost. Projecting
G → {primitive cycles} deliberately destroys the forest.

## The last strand, and why it closes on the central problem

The natural next hope is to decorate cycles with transport data. On the recurrent core, a closed cycle P
could carry a holonomy χ(P) ∈ U(1), and one forms the twisted product

\[
Z_{G,\chi}(u) = \prod_{[P]}\left(1 - \chi(P) u^{\ell(P)}\right)^{-1}. \tag{17}
\]

This has content if and only if χ does not factor through the cycle length: if χ(P) = f(ℓ(P)), the
product is a function of the length multiset, which Z_G already determines. Operational form: χ must
take two values on prime cycles of the same length.

PDI has no such gain. The character of (8) is built on C_L, hence through the cycle order. The other
reading — χ(P) as the holonomy of the transport itself — runs into the sharpest question in the
construction:

\[
\rho : \pi_1(\text{presentation space}) \to \mathrm{Sym}(R), \qquad \rho([\gamma]) = T_\gamma|_R. \tag{18}
\]

Is ρ a representation? We ran it. Composition holds exactly, on every state and hence on R: T_(γ₁γ₂) =
T_(γ₂) ∘ T_(γ₁), because the transport is literally built as a composition of legs. So ρ is a monoid
homomorphism. But the inverse axiom fails on R — T_(γ⁻¹) ∘ T_γ ≠ id on core(γ), and T_(γ⁻¹) does not
even preserve it — and this persists on the core, so it is not contamination from transient trees.
Worse, the codomain is not well-defined: |R| takes values 6, 8, 10, 12, 16 across six loops, and the
intersection of all six cores is two states out of 1024. There is no single R for π₁ to act on.

So there is no character on π₁, and the twisted zeta has nothing to twist by. The strand closes — and it
closes not on a defect of the attempt but on the repository's central open problem, O1: is the stable
quotient presentation-independent? Transport monodromy needs a canonical core. Canonicity is exactly
what we do not have.

## The Persistence Stability Score: a counting metric that reads the answer key

The last four sections built the *instrument*. This section is what the instrument does on a corpus
where the answer key is already on the table — τ-bench, where each run carries an independent
correctness bit (`reward`, a DB-match plus a communication check) and each task is run \(k\) times
(\(k=4\) for gpt-4o, \(k=8\) for sonnet-3-5). The ground truth per task is the **pass rate**
\((1/k)\sum_i \mathbf{1}[r_i=1]\), which is the pass^k target: a *stability* quantity, not a single-run
bit. So the right instrument is one invariant to *which* trials happened to succeed — structure, not
the lucky run.

**The objects.** A *trajectory* is the ordered sequence of tool calls it issued. A *behavioural class
at resolution \(j\)* is a nested, *refining* hash of that structure:

| \(j\) | key | captures |
|---|---|---|
| 2 | sorted count-vector of tool *names* | which tools, how many, order ignored |
| 3 | \(+\) the name *sequence* | the above and the order |
| 4 | \(+\) the per-call *arg class* | the above and where each tool was pointed |

Refinement holds by construction — each finer key *concatenates* the coarser key with more structure —
which is the same invariant `quotient_tower.validate` enforces for the general tower. For a fixed \(j\)
let \(n_j(c)\) be the number of trials whose class is \(c\).

**The three measured quantities.** (A) **Entropy** \(H_j = -\sum_c (n_j(c)/k)\log(n_j(c)/k)\) — how
spread out the trials are across classes; high \(H\) is *wandering*. (B) **Persistent yield**
\(Y_j = |\mathcal{P}_j \cap \mathcal{C}_j|/|\mathcal{C}_j|\), where the *persistent set* \(\mathcal{P}_j\) is
the classes touched by a successful trial (supervised mode) or the classes recurring across \(\ge \lceil k/2\rceil\)
trials (label-free mode). (C) **Cross-trial variance** \(V = \operatorname{Var}_i\,\mathbf{1}[Q_4(T_i)\in\mathcal{P}_4]\)
— the *flakiness*: how much success and failure interleave within shared structure. (A fourth, minor
term measures coarse→fine entropy *shrink*.)

**The discipline that makes the number earned.** The no-leak mode uses classes that *exclude* the
outcome bit, so the label is used only to *check* the correlation, never to *build* \(Y\). If you do leak
(\(Q_4\) includes \(r_i\)), then \(\mathcal{P}_4\) is the success classes by definition and \(Y_4\) **is** the pass
rate — we produced this first and got \(\rho = 1.000\) before we caught it. The no-leak class is what makes
the number below a property of the structure, not an artefact.

**Theorem (the mechanism, informal).** *A solvable task has a compact success core: its successful
trials concentrate into a small set of canonical classes, its failures scatter across many transient
ones. Then \(Y_4\) is high. An unsolvable task has no such core — successes (rare, lucky) and failures
draw from the same scattered structure — and \(Y_4\) is low.*

*Proof sketch.* Let \(\mathcal{C}_S\) be the classes touched by successes. If a short near-unique
procedure exists, \(\mathcal{C}_S\) is small and sits tightly inside \(\mathcal{C}_j\), so
\(Y=|\mathcal{C}_S|/|\mathcal{C}_j|\) is high because the denominator is dominated by the compact core.
Without such a procedure, \(\mathcal{C}_S\) and the failure classes overlap heavily and both are large;
the "core" is diffuse and \(Y\) is low. So \(Y\) is high **iff** a compact success core exists **iff** the
task is reliably solvable. The label only names *which* classes are the core; the *compactness* is
already in the structure.

**What was measured (the only claims that follow).** On τ-bench, \(Y_4\) against the per-task pass rate:

| | gpt-4o | sonnet-3-5 |
|---|---|---|
| **airline** (50 tasks) | \(\rho=0.971\) | \(\rho=0.965\) |
| **retail** (115 tasks) | \(\rho=0.972\) | \(\rho=0.918\) |

That is the *same* number on a different domain and toolset — the correlation is a property of the
process class, not of one benchmark. The controls sit where they must: entropy alone \(\rho\approx -0.2\)
to \(-0.44\), total tool calls \(\rho\approx -0.19\) to \(-0.47\). The **label-free** \(Y_4\) (frequency
persistence, no `reward`) plateaus at \(\rho\approx 0.24\) to \(0.52\) — *the same ceiling as raw entropy*.
That gap is the content of the mechanism: without the label, "a class recurs" is ambiguous — it recurs
because it is the *correct* solution **or** because it is a *hard task everyone stumbles identically
on* — and concentration cannot tell those apart. The outcome bit is the disambiguator; it is worth
\(\approx 0.5\,\rho\) on top of the label-free signal.

**Orthogonality, measured.** \(\operatorname{corr}(H_4, V) \approx 0.2\) — the two axes are nearly
independent, not redundant. The residual of \(V\) after regressing out \(H_4\) still correlates with
pass rate at \(\rho \approx 0.3\)–\(0.35\): **variance carries information entropy cannot see.** A task can
be low-entropy-but-flaky (same two routes, sometimes right sometimes wrong). This is what makes the
variance *gate* below a real meta-signal rather than a restatement of entropy — the meta-policy form of
"a distinction is information only if it is not recoverable from either half."

**The signal also *controls*.** Used as a per-fork policy — steer to the reward-branch only when the
cross-trial *flakiness gap* is high, else fall back to the frequency branch — the gated policy matches
the oracle (the true best-reward branch) and beats both the label-free frequency policy and the naive
reward policy, on both models in both domains. On sonnet-3-5 the naive reward policy is *worse than
frequency* (it overfits a lucky prior trial at \(k=8\)); the gate is what recovers it. See
`usecases/09`. This is the across-run capability a within-run router (an entropix-style token sampler)
is structurally blind to.

**The no-circularity check.** `tau_simulate.py` builds an agent with a *dialled* success probability
\(p\) (we hold the answer key), runs \(Y_4\) over \(300\) tasks per \(p\) at each of \(11\) levels, and reads it
back: \(Y_4\) climbs monotonically \(0.000\to1.000\) as \(p\) goes \(0.0\to1.0\), \(\rho=1.000\) against the known
truth. The metric recovers a controlled answer key from structure alone — the closest a descriptive
metric gets to a proof.

**Limits, stated.** The correlation is *descriptive*, not causal — \(Y\) and pass rate both read the same
underlying solvability; \(Y\) does not cause correctness. It assumes the agent's success is *compact*
(a single canonical procedure); a poly-solver with many equally-good diverse solutions would be
high-entropy *and* correct, and \(Y\) would misread it. The offline fork test shows the signal *carries*
decision value, not that feeding it to the model moves pass^k (that is one live run away). And the
composite weights are a dashboard convenience; the *measured* signal is \(Y_4\) alone.

The one-line version: **PSS is a counting metric — it hashes each trial into a nested behavioural class,
and \(Y_4\) is the fraction of behavioural space the persistent (successful) core occupies. It reads the
answer key at \(\rho\approx0.97\) because solvable tasks have a compact success core and unsolvable ones
don't; the no-leak class keeps the \(0.97\) from being a \(1.000\) artefact; and it runs in \(O(N)\) over the
corpus — a counting algorithm, no sort, no pairwise compare.**

## Coda: the discipline is the mathematics

Notice what happened across those last four sections. A seductive idea arrived (zeta separates what the
ledger cannot), a witness killed it, a positive control kept the negative from being vacuous, the domain
was located, a decorated version was proposed, and its premise — an earned gain — was shown absent. Each
step produced a statement with a stated warrant, and several of the outputs were negative: a projection
is not injective, an invariant is identically zero, a family is blind, a homomorphism is not a
representation.

That is the actual mathematical content of this system, and it is why the code carries its own ledger.
Every claim is labelled proved, computed, negative, open, or conjecture; negatives state their search
bounds ("none among the 216 tested," never "none exists"); and quantities that depend on the
presentation say so. This is not modesty. It is a theorem about finite observation — no finite prefix
determines a limsup — applied to the software's own output.

The open problems are few and sharp. O1 asks whether a presentation-independent fibre exists; everything
about phases and monodromy is blocked behind it. O2 — is any schedule injective? — is **reopened**: the
single step is proved non-injective, but the composition to legs is not (the first step writes the tabu
list), so what remains at schedule level is empirical. O3 asks whether any finite augmentation makes the
dynamics invertible, and the single-step collision theorem says any such augmentation must separate
states at the attractor. O4 asks for an outcome-independent diagnostic tower: its synthetic half is
discharged, its real-data usefulness is open. And a pattern — that survival, to a horizon or under
iteration, is the condition under which canonical structure exists — is recorded as a conjecture,
because the two decompositions are of different objects and no common construction has been exhibited.

The instrument compresses a search into a curve of waste, locates where the waste begins, and is
explicit about which of its numbers are allowed to say what. That last property is not decoration on top
of the mathematics. It is the mathematics.
