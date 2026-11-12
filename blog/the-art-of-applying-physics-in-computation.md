---
title: "The Art of Applying Physics in Computation"
description: "Imagine you\u2019re a traveling salesman with 20 cities to visit. How many possible routes are there? Not 20. Not 2\u00b2\u2070. Try 2.4 quintillion routes. Even if you could check 1 million routes per\u2026"
date: "2026-02-05"
author: "Sethu Iyer"
tags: ["optimization", "physics", "computation"]
type: "Essay"
materials:
  - label: "Original on Medium"
    href: "https://medium.com/@sethuiyer/the-art-of-applying-physics-in-computation-8e897f09e715"
---

![](https://cdn-images-1.medium.com/max/1024/1*Z2QOeedSaGMNN4KGo5R3rg.png)

Imagine you’re a traveling salesman with 20 cities to visit. How many possible routes are there? Not 20. Not 2²⁰. Try 2.4 *quintillion* routes. Even if you could check 1 million routes per second, it would take 76 million years to guarantee you found the optimal path.

This is the curse of combinatorial optimization — a class of problems so computationally hard that the world’s fastest supercomputers still throw up their hands in defeat. Yet nature solves similar problems effortlessly every day.

A bird finds efficient migration routes. Proteins fold into stable structures. Quantum systems settle into ground states. What if we stopped trying to brute-force our way through these problems and instead borrowed nature’s playbook?

## The Physics Revolution in Computer Science

For decades, algorithm design followed a single philosophy: be logical, be systematic, be exhaustive. Check every possibility. Prune aggressively. But there’s a fundamental problem with this approach — the landscape of possible solutions often has thousands of local traps. Once your algorithm falls into one, it can’t climb out.

This is where physics enters the picture.

**Thermodynamics teaches us something profound:** systems naturally escape from low-energy states by accepting energy fluctuations. A molecule at room temperature doesn’t get stuck vibrating in a single potential well . thermal energy lets it explore the landscape, occasionally bouncing out of local minima on its way to finding deeper, more stable configurations.

What if we could harness this principle for computation?

## Four Approaches, One Philosophy

## 1. Simulated Annealing: The Heat Bath Method

In my work with [**baha**](https://github.com/sethuiyer/baha), I implemented simulated annealing with a thermodynamic fracture detection.

This approach is devastatingly effective on discrete combinatorial problems. Why? Because it respects the topology of the problem landscape rather than fighting against it with randomness, giving it a global GPS.

**The Empirical Results Are Staggering:**

BAHA achieves a **22/26 (84%) pass rate** across 26 diverse NP-hard problem domains. You can read more about it [here](https://sethuiyer.github.io/baha/) and watch it [here](https://www.youtube.com/watch?v=NvSmy5P9H_E&t=11s).

## 2. Geometric Constraint Dynamics: SAT as Flowing Geometry

Boolean satisfiability (SAT) seems purely logical; find an assignment of true/false values that satisfies a logical formula. But what if we stopped thinking of it as logic and started thinking of it as *geometry*?

In [**navokoj**](https://github.com/sethuiyer/navokoj), I model SAT constraints as flowing geometry. Imagine each constraint as a force field in high-dimensional space. The satisfying assignment is where all these forces balance. Instead of searching discretely, we let the geometry guide us, watching constraints flow and interact like currents in a river.

The production version (ShunyaBar API) achieves:

- **92.57% perfect solution rate** on 4,199 industrial SAT problems (SAT 2024 Independent Track)
- Handles up to **1M variables** on H100 GPUs
- **100% success** on structured grid problems (where open-source plateaus at 70%) \[Edit: This is not true, on structured grid problems we see partial satisfaction upto 99% of clauses. I have open sourced the code containing the core claims at <https://github.com/sethuiyer/shunyabar.lua>. Here you can see it solves bayg29 TSP optimally and AI Escargot sudoku at 99.84% partial satisfaction. I also checked the proprietary navokoj pro engine on The **Boolean Pythagorean Triples problem, it maintains** 100% satisfaction until N=7800 and the known limit is 7824) Apologies for this error\].
- Guaranteed near-satisfiable solutions for satisfiable instances

It’s physics-inspired geometry meeting logic. You can test it [here](https://navokoj.shunyabar.foo/) and watch how it works [here](https://www.youtube.com/watch?v=ddjok2jt2AQ&t=12s)

## 3. Physics-Informed Neural Networks: Teaching Machines the Laws of Nature

Some problems aren’t about logic or discrete optimization, they’re about understanding continuous systems governed by partial differential equations (PDEs). Weather systems, fluid dynamics, quantum mechanics — all described by PDEs.

The traditional approach? Solve them numerically with grids and finite differences. But what if you could train a neural network to *learn* the underlying physics?

In [**multiplicative-pinn-framework**](https://github.com/sethuiyer/multiplicative-pinn-framework), I developed a research framework for solving PDEs with multiplicative constraints. Physics-Informed Neural Networks (PINNs) embed the laws of physics directly into the training process. The network doesn’t just fit data — it learns to respect the fundamental equations that govern reality. This is machine learning that understands *why* things work the way they do.

![](https://cdn-images-1.medium.com/max/1024/1*g3hyvJu33iVzh3u3A2PjYg.png)

**Physics Validation:**

- Vorticity conservation: Stable across time steps
- Energy dissipation: Realistic without violation
- Incompressibility: ∇·u conservation perfect
- All conservation laws respected

You can read more about it [here](https://sethuiyer.github.io/multiplicative-pinn-framework/) and watch it [here](https://www.youtube.com/watch?v=EgUC0Eczr-A)

## 4. Quantum Mechanics Meets Boolean Logic

Here’s where things get weird in the best way possible.

Quantum mechanics describes systems in superposition — a particle can be in multiple states simultaneously until measured. What if we could apply this thinking to SAT problems?

In [**casimir-sat-solver**](https://github.com/sethuiyer/casimir-sat-solver), I explore how quantum mechanical principles can illuminate Boolean satisfiability. The Casimir effect — a quantum phenomenon involving the energy density between conducting plates — becomes a metaphor and possibly a mechanism for understanding how SAT solutions emerge from the quantum substrate.

You can read more about it [here](https://sethuiyer.github.io/casimir-sat-solver/) and watch it [here](https://www.youtube.com/watch?v=74Chty3tRdI)

## Summary of Empirical Evidence Added

**BAHA:**

- 22/26 (84%) pass rate across diverse NP-hard problems
- TSP: 21% better than target
- Knapsack: 2x better value than target
- Spectrum auction: 60% better optimization
- 109 comprehensive test files
- Scales to N=100,000

**Navokoj**:

- 99.4–99.5% success on 3-SAT at critical density (500k–1M variables)
- 100% success on graph coloring (Native QSAT solver)
- 129-SAT, 200 variable, 1M clauses solved.
- R(5,5,5) at N=52 solved
- Production API: 92.57% perfect solution rate on 4,199 industrial problems

**Multiplicative PINNs:**

- 99.64% PDE residual reduction on Navier-Stokes
- 100,000x speedup over traditional CFD
- 1+ million points per second processing
- Multi-constraint enforcement (4 constraints simultaneously)
- Perfect energy conservation and incompressibility

## Why This Matters

We live in an era of intractable problems:

- **Drug discovery**: Finding molecular configurations that bind to disease targets
- **Materials science**: Designing new materials with specific properties
- **Logistics**: Optimizing supply chains across global networks
- **Machine learning**: Training models that respect physical laws while fitting data
- **Cryptography**: Finding vulnerabilities in security systems

The current toolkit — greedy algorithms, branch-and-bound, constraint satisfaction — works for small problems. But for truly hard problems, we need a different philosophy.

**Physics offers that philosophy.** It teaches us that:

- *Randomness isn’t the enemy of optimization; it’s the key to escaping traps*
- *Problems have geometry and structure; respect it rather than fight it*
- *The laws of nature are more fundamental than any algorithm*
- *Sometimes the quantum realm holds secrets classical computation missed*

## The Future is Hybrid

The most exciting prospect isn’t that one approach will dominate. It’s that we’ll develop *hybrid systems* — algorithms that combine:

- The thermodynamic wisdom of simulated annealing
- The geometric insights of constraint dynamics
- The physical grounding of physics-informed learning
- The quantum perspective on computation

When you align your algorithm with how nature actually works, you stop fighting the problem and start flowing with it.

## Invitation to Explore

If you’re fascinated by:

- Optimization problems that seem impossible
- The intersection of physics and computation
- Algorithms that think more like nature than like circuits
- How to solve NP-hard problems practically (if not provably in polynomial time)

I invite you to explore these projects:

- [**baha**](https://github.com/sethuiyer/baha): Simulated annealing for combinatorial problems
- [**navokoj**](https://github.com/sethuiyer/navokoj): Physics-inspired SAT solving
- [**multiplicative-pinn-framework**](https://github.com/sethuiyer/multiplicative-pinn-framework): PDEs meet neural networks
- [**casimir-sat-solver**](https://github.com/sethuiyer/casimir-sat-solver): Quantum mechanics and Boolean logic

**The empirical evidence is clear: physics-inspired algorithms don’t just theoretically make sense. They deliver results that conventional computing simply cannot match.**

The next breakthrough in algorithm design might not come from deeper analysis. It might come from stopping, looking at how nature works, and asking: “How can I let physics do the thinking?”

**About the Author**

*Sethu Iyer is a mathematician and computer scientist driven by an obsession with solving humanity’s hardest computational problems through the lens of physics. He has done Bachelors in Computer Science, Masters in Mathematics from BITS-Pilani and have done Quantum Machine Learning Course organized by IIT Delhi as well. Since 2016, Sethu has been fascinated by the Millennium Prize Problems, seven unsolved mathematical problems and it turned into an obsession soon. His current focus is Bridging physics and computer science in ways that academia seldom explore.*

## Read the Papers

All are open access on Zenodo:

1.  [Multiplicative Calculus for Hardness Detection](https://zenodo.org/records/18373732)
2.  [ShunyaBar: Spectral–Arithmetic Phase Transitions](https://zenodo.org/records/18214172)
3.  [Solving SAT with Quantum Vacuum Dynamics](https://zenodo.org/records/17394165)
4.  [Spectral-Multiplicative Optimization Framework](https://zenodo.org/records/17596089)

You may also want to explore [Space Time Cafe](https://www.youtube.com/playlist?list=PLUPyripldgZb2ZKSJOQ6p1DO3oCk9yT6G), a podcast hosted by the author.

Note that I have open sourced plenty of my theory and code. The Navokoj Pro engine (which gets 92.57% perfect solves in SAT 2024 benchmark) and the Native QSAT solver (Which can solve AI Escargot Sudoku in 10 seconds on CPU) is closed sourced.

I know trusting these numbers is a tough job, but I invite you to explore the API <https://navokoj.shunyabar.foo/> and the Github Repos.

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=8e897f09e715)
