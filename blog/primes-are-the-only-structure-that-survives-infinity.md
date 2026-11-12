---
title: "Primes Are the Only Structure That Survives Infinity"
description: "Most engineers never ask this. They patch the drift, shard the database, tune the hyperparameters, and ship. The system works until it doesn\u2019t. And when it doesn\u2019t, spectacularly, catastr\u2026"
date: "2026-05-06"
author: "Sethu Iyer"
tags: ["number theory", "infinity"]
type: "Essay"
materials:
  - label: "Original on Medium"
    href: "https://medium.com/@sethuiyer/primes-are-the-only-structure-that-survives-infinity-6dc6fa666107"
---

![](https://cdn-images-1.medium.com/max/661/1*ZrNMhyJxj0SvXtg5t-LhqQ.png)

There is a question hiding inside every system that has ever failed at scale.

Not a hardware question. Not a budget question. A *mathematical* one.

**What kind of structure can be pushed toward infinity without losing truth?**

Most engineers never ask this. They patch the drift, shard the database, tune the hyperparameters, and ship. The system works until it doesn’t. And when it doesn’t, spectacularly, catastrophically, we write a post-mortem and blame the edge case.

But some failures aren’t edge cases. Some failures are the system telling you something fundamental about the math underneath it.

## The Patriot Missile Already Answered This

On February 25, 1991, a US Patriot missile battery in Dhahran failed to intercept an incoming Scud. 28 soldiers were killed.

The cause? A floating-point rounding error. The system’s internal clock accumulated a tiny truncation error, 0.0000001343 seconds per tick. After 100 hours of continuous operation, that error had grown to 0.34 seconds. Enough to lose a missile.

This wasn’t a bug. It was floating-point arithmetic doing exactly what floating-point arithmetic does. The system drifted. At scale. Irreversibly.

The question is: what would have *not* drifted?

## Four Constraints That Filter Everything

If you want a system that genuinely survives infinite scale ; not approximately, not with error bars, but *exactly* it has to satisfy four constraints simultaneously.

**1. Identity**

No two distinct inputs can produce the same internal representation. Ever. At any depth, at any scale.

Hash tables fail this immediately. Collisions are not bugs, they are design. The moment you accept collisions, you accept the possibility that the system cannot distinguish between two different things. At small scale, this is manageable. At infinite scale, it is fatal.

Floating point fails this too. 0.1 + 0.2 ≠ 0.3. These are different numbers being treated as the same. The system has lost identity, silently, at the third decimal place.

**2. Hierarchy**

The system must be able to compress structure *and fully reconstruct it*. Lossless, reversible, all the way down.

This rules out entropy-based compression, probabilistic data structures, and anything that trades precision for efficiency. You cannot reverse a Bloom filter. You cannot decompress a lossy encoding back to ground truth. These structures consume information. They are one-way.

A system that can’t reconstruct its own history can’t verify its own correctness.

**3. Non-Lattice Structure**

A lattice is a periodic grid. Regular spacing, repeating patterns, symmetric in every direction.

Lattices are comfortable. They’re easy to index, easy to cache, easy to reason about. They’re also traps.

Any system built on a regular lattice will eventually hit resonance, frequencies that the grid reinforces until they dominate. Neural networks trained on grid-structured data develop grid-aligned artifacts. Cryptographic systems built on lattice assumptions are vulnerable to lattice attacks. Physical simulations on regular meshes accumulate numerical artifacts at grid boundaries.

The structure you chose for convenience becomes the structure that breaks you.

Non-lattice systems — aperiodic, irregular, without repeating units — don’t have this failure mode. Penrose tilings cover infinite planes without ever repeating. Quasicrystals diffract light with perfect five-fold symmetry that no periodic crystal can produce. Irregularity, at the right depth, is a feature.

**4. Asymptotic Stability**

As the system scales toward infinity, its behavior must converge. Not stabilize-ish. Not plateau with acceptable variance. *Converge.*

This is what separates a system that works from a system that *continues* to work. Most systems are asymptotically unstable ; they accumulate error, drift from ground truth, or require increasing intervention to maintain behavior. The cost of correctness grows with scale.

A system with asymptotic stability has the opposite property. The larger it gets, the more precisely its behavior is characterized. It doesn’t need more maintenance at scale. It needs less.

## Run Every Modern System Through the Filter

This is where it gets uncomfortable.

**Floating point:** Fails Identity (0.1 + 0.2 ≠ 0.3) and Asymptotic Stability (the Patriot Missile). The system drifts with time and scale.

**Hash tables:** Fail Identity by design. Collisions are an accepted engineering tradeoff. At infinite scale, that tradeoff becomes a structural guarantee of confusion.

**Random number generators:** Fail Hierarchy. Entropy is not reversible. You cannot reconstruct what the system decided from the output alone.

**Regular grids and lattices:** Fail Non-Lattice, obviously. Periodic structure creates resonance traps. The geometry of the grid becomes the geometry of the failure mode.

**Neural networks with floating-point weights:** Fail Identity, fail Asymptotic Stability. Gradient noise accumulates. Precision collapses at scale. Quantization is a patch on a mathematical wound.

The question becomes: is there anything that passes all four?

## Primes Walk Through All of Them

This is not mysticism. This is structure.

**Multiplicative independence.** Every integer has a unique prime factorization. This is the Fundamental Theorem of Arithmetic. Two different numbers cannot have the same prime decomposition. Identity is guaranteed — not probabilistically, not with high confidence, but *provably*, for every integer, forever.

**Hierarchical factorization.** The prime factorization of a number is a complete, reversible encoding of that number’s multiplicative structure. You can compress a number into its prime factors and reconstruct it exactly. The hierarchy is lossless by definition.

**Non-lattice irregular spacing.** Prime gaps are aperiodic. There is no repeating unit, no periodic structure, no grid. The primes are distributed with a controlled irregularity that provably escapes every regular pattern. This is not randomness — it is something more structured than randomness and less constrained than periodicity.

**Global spectral theory.** The Riemann zeta function encodes the entire distribution of primes as a spectral object. The zeros of ζ(s) are the “frequencies” of the prime distribution. Selberg-type dualities connect the geometry of hyperbolic spaces to prime-length geodesics. This is a complete analytical theory of the global structure — not a simulation, not a statistical model, but an exact spectral characterization.

And then the line that makes all of this an engineering argument rather than a mathematical curiosity:

**All of this exists natively on finite hardware as integers.**

You don’t approximate primes. You don’t cast them to float32 and hope. An integer is an integer. The unique factorization theorem holds on your laptop with the same force it holds in the infinite case. There is no implementation tax. No precision budget. No gap between the mathematical object and the computational one.

This is the property that nothing else has.

Quasicrystals give you non-lattice structure but you can’t run a quasicrystal natively on a CPU. Complex analysis gives you the spectral theory but it lives in ℂ, which you have to approximate with floating point. Random number generators give you irregularity — but they fail hierarchy and they aren’t actually random.

Primes are the intersection of all four constraints *and* they live on the machine as first-class citizens.

## What This Implies

The Euler Product Formula is the bridge:

![](https://cdn-images-1.medium.com/max/281/1*9QdhtBuUsA4dsKokljhOWg.png)

On the left: a sum over all integers. On the right: a product over primes only.

This says that the primes *generate* the integers, multiplicatively and completely. Every integer is reachable from the primes. The local structure (individual primes) determines the global structure (all of arithmetic). This is what a spectral theory means — local behavior determines global behavior, exactly, with no residual.

The Riemann Hypothesis, reframed through this lens, is not a statement about where zeros land on a line. It is a statement about whether the prime distribution is asymptotically stable. Whether the spectral theory is well-posed. Whether the global structure converges.

If RH is true — and all computational evidence says it is — then the prime distribution achieves the tightest possible asymptotic stability. The error term in the prime counting function is as small as it can possibly be. The system converges.

If RH is false, the prime distribution has large-scale oscillations. The spectral theory breaks down. The system doesn’t converge.

The Riemann Hypothesis might be the oldest open question about asymptotic stability in the history of mathematics.

What if the structures that survive computation *without approximation* are telling us something about the structure of reality itself?

This is not a claim that “primes run the universe.”

It is a more careful claim: **the structures that can survive infinity without losing truth are rare, and we have found one, and it is already inside every integer your computer has ever processed.**

Sethu Iyer writes about the intersection of mathematics, physics, and computation. He is the author of NitroSAT, Casimir-SAT, and the BAHA framework. His research is available on Zenodo.

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=6dc6fa666107)
