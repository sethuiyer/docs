# FUTCache

## What It Solves

Any search that remembers everything it has visited grows state without bound; any search that forgets too eagerly commits to decisions it can never revisit. FUTCache is a **bounded-memory sufficient-state representation of explored geometry** — a metric visited-set that answers one question per candidate state: *is this future-novel relative to everything already seen?* — without storing everything already seen.

The point is not to compress a log after the fact. It is to keep a *sufficient* statistic of exploration, so novelty decisions stay correct as the frontier grows.

## Key Innovation

**Approximate metric quotienting.** Candidate states are collapsed onto representatives under a metric, so states that are near-duplicates *for the purposes of the next decision* share one entry. This is the same move as the [Behavioral Quotient](behavioral-quotients.md) — quotient by a behavioural relation, then keep the quotient — applied at runtime to a live search frontier rather than to a state machine on paper.

### Measured on real traces

| Quantity | Value |
|---|---|
| Traces | 1,000,000 (Alibaba Cloud MSCallGraph) |
| Representatives retained | 276,592 |
| Suppression | **72.34%** |
| …of which beyond exact hashing | 31,618 |

The suppression figure is reported as *measured*, not as saturation: the claim is what the run produced on real traces, not that the representation is minimal. The 31,618 representatives that exact hashing would not have caught are the interesting part — they are the near-duplicates a hash set cannot see.

### A negative result, kept in the repo

FUTCache ships with the negative result **"geometric MDL is not semantic safety"**. A geometry-aware compression criterion does not, by itself, tell you whether a state is *safe to forget* in a semantic sense. The negative result is documented next to the positive one, because the boundary between them is the whole design question.

## Architecture

```
FUTCache
├── Metric visited-set
│   ├── Candidate state → representative lookup
│   └── Novelty decision (keep / suppress)
├── Sufficient-state compression
│   └── Approximate quotienting under a task-induced metric
└── Trace instrumentation
    ├── Representatives vs. raw frontier
    └── Beyond-exact-hashing attribution
```

## Website

**Repository:** [github.com/sethuiyer/FUTCache](https://github.com/sethuiyer/FUTCache) — C

## Connection to Core Vision

FUTCache is the **runtime face of the quotient**. The [Arithmetic Manifold](../core-vision.md) describes constraint problems as geometry; FUTCache asks which parts of that geometry a running solver actually needs to remember. It is the same principle as state minimization in the [Geometry of Conditional Logic](geometry-of-conditional-logic.md) — remove distinctions that do not change the answer — but applied to *explored* state rather than *declared* state, and with a memory bound instead of an exactness guarantee.

---

## The cache dimension is a critical scale

FUTCache's formal development contains a geometric cache-growth law: with box dimension \(D\), the level-\(j\) discovery count satisfies

\[
M_j(L) \;=\; 2^{\,jD+o(j)}, \qquad D = D_{\mathrm{cache}}(L;P).
\]

The same quantity can be read as an *observer* rather than a memory budget. Index a survival-weighted observer by resolution depth — let \(1-q\) be the probability of continuing to the next resolution level:

\[
O_q \;=\; \sum_{j\ge 0} M_j(L)\,(1-q)^{j}.
\]

The ratio of successive terms is asymptotically \(2^{D}(1-q)\), so the sum converges iff \(2^{D}(1-q) < 1\), giving

\[
\boxed{\;q_c \;=\; 1-2^{-D} \;=\; 1-2^{-D_{\mathrm{cache}}(L;P)}.\;}
\]

**The cache dimension is exactly the critical survival probability of a geometric observer indexed by resolution depth.** Above \(q_c\) the observer sees a finite value; at and below it, divergence. Resolution determines memory; memory determines the survival probability below which no finite observation exists.

In the Heaps regime \(M_L(N) = N^{\alpha D + o(1)} = N^{\beta+o(1)}\), and if the exponent \(\beta\) is an integer \(m\) the same observer over the *temporal* index has finite part \(\zeta(-m) + \tfrac{1}{m+1}\) — so the index in the zeta residue is the Heaps exponent \(\beta = \alpha D\).

**Status.** Elementary — a geometric series plus the box-counting exponent. The contribution is the identification, not the arithmetic. See [Resolution STOP](../concepts/resolution-stop.md) for the derivation and the numerical tables. This is not an equivalence of categories and asserts nothing about primes.

---

## See Also

- [All Projects](index.md) — project overview
- [Behavioral Quotients](behavioral-quotients.md) — the theory this implements at runtime
- [NitroSAT](nitrosat.md) — the solver whose exploration FUTCache summarizes
- [Navokoj](navokoj.md) — the production runtime
- [The Arithmetic Manifold](../core-vision.md) — the unified theory
