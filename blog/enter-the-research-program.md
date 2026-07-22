---
title: "The Product Is the Surface. The Research Goes Deeper."
description: "Navokoj is one operational expression of a larger research program. A guide for readers who want to follow the mathematics into ShunyaBar Labs' research site."
date: "2026-07-22"
author: "ShunyaBar Labs"
type: "Field guide"
tags: [research, mathematics, shunyabar, navokoj]
materials:
  - label: "Enter the research program"
    href: "https://research.shunyabar.foo"
    note: "Long-form mathematics, computational experiments, audio, visualizations, and open questions"
  - label: "ShunyaBar theory portal"
    href: "https://theory.shunyabar.foo"
    note: "The spectral-arithmetic system and its formal architecture"
  - label: "BAHA"
    href: "https://sethuiyer.github.io/baha/"
    note: "Branch-aware optimization and basin hopping"
  - label: "Casimir SAT Solver"
    href: "https://sethuiyer.github.io/casimir-sat-solver/"
    note: "Quantum-vacuum-inspired Boolean dynamics"
  - label: "NitroSAT"
    href: "https://sethuiyer.github.io/NitroSAT/"
    note: "Open-source physics-informed SAT and MaxSAT"
  - label: "Multiplicative PINN Framework"
    href: "https://sethuiyer.github.io/multiplicative-pinn-framework/"
    note: "Multiplicative constraint enforcement for physics-informed learning"
---

# The Product Is the Surface. The Research Goes Deeper.

Most people first encounter ShunyaBar Labs through Navokoj.

That is a reasonable place to begin. Navokoj presents a concrete operating contract: provide a constrained decision and a time boundary, then receive the best available assignment together with its feasibility state, remaining conflicts, and execution context.

But the product is only one expression of the work.

Behind it is a larger research program studying a recurring question:

> What happens when discrete structure is treated as geometry, dynamics, and interaction rather than only as a search tree?

That question has led through Boolean constraints, prime-weighted systems, phase transitions, multiplicative loss design, symbolic Fock spaces, structural diagnostics, fractal constructions, and arithmetic models inspired by statistical mechanics.

If you only need the API, the product documentation is the right surface. If that underlying question stays with you, the next place to go is [research.shunyabar.foo](https://research.shunyabar.foo).

## The institutional thesis

ShunyaBar Labs is an independent foundational-computation lab with a connected theoretical, experimental, open-source, and commercial stack.

Its central mathematical thesis is:

> Computation can be modeled as the evolution of geometry under arithmetic constraints, with solutions appearing as stable phases of coherent interaction.

Three structures recur throughout the program:

\[
\boxed{
\text{Arithmetic identity}
+
\text{Geometric motion}
+
\text{Thermodynamic transition}
}
\]

**Arithmetic identity** allows individual constraints and interactions to remain distinguishable inside a larger system. Prime-indexed weights, Euler products, and multiplicative constructions are used because multiplication can preserve composition where ordinary additive aggregation often erases it.

**Geometric motion** lifts a discrete problem into a continuous space. Graph spectra, Laplacians, heat flow, differentiable energies, and correlation-controlled dynamics let the system move through global structure before returning to a discrete assignment.

**Thermodynamic transition** describes changes in computational regime. Constraint density, temperature, symmetry breaking, frustration, and competing basins determine when coherent solutions form, when they become unstable, and when the requested state is structurally unavailable.

The theory develops these objects. The experimental program turns them into algorithms, generators, computational campaigns, and reusable corpora. The open-source work publishes implementations that others can run and extend. Navokoj is the runtime through which these mechanisms participate in real decisions under deadlines, hardware limits, policies, and deployment requirements.

These are not four unrelated activities. They are stages through which an idea becomes an operational capability:

```text
Mathematical structure
    → computational mechanism
        → experimental system
            → open implementation
                → operated runtime
```

That connected path is the institutional thesis of ShunyaBar Labs.

## Obstruction before optimization

The operational form of that thesis begins with a distinction optimization systems routinely blur:

> A solver can fail because it searched badly, or because the state it was asked to find does not exist.

The first failure is computational. The second is structural. More restarts, a longer deadline, or a different continuous trajectory may help with the first; none can create a state excluded by the constraints themselves.

ShunyaBar therefore places diagnosis before dynamics. **DEFEKT** is the diagnostic layer: determine whether the requested zero set exists, identify an obstruction when it does not, estimate the lowest structurally attainable residual, and test whether a continuous relaxation has erased a discrete obstruction. Only after that diagnosis should an optimizer such as SUTRA navigate the remaining landscape.

The smallest complete example is a triangle whose three binary vertices must all differ from their neighbors. No assignment satisfies all three edges. Its minimum residual is one violated edge.

Over \(\mathbb F_2\), write a vertex assignment as a 0-cochain \(s\in C^0(G;\mathbb F_2)\) and the requested edge parities as a 1-cochain \(c\in C^1(G;\mathbb F_2)\). The constraint system asks whether

\[
\delta s=c.
\]

For the triangle, \(c=(1,1,1)\) is not a coboundary. Equivalently,

\[
[c]\neq 0\qquad\text{in}\qquad H^1(G;\mathbb F_2).
\]

The graph supplies a cycle; the constraint data places nontrivial parity around it. In signed-graph language, the product of edge signs around the loop is negative. This is the classical balance/frustration condition expressed as a cohomological obstruction ([Harary, 1953](https://doi.org/10.1307/mmj/1028989917); [Toulouse, 1977](https://hal.science/jpa-00217487)).

Once zero is unavailable, the correct target is the lowest representative of the residual coset

\[
c+B^1,
\qquad B^1=\operatorname{im}\delta.
\]

With positive edge weights, the residual floor is

\[
r^\star=\min_s|c-\delta s|_w
=\operatorname{dist}_w(c,B^1).
\]

This makes the division of labor precise. Testing whether \([c]=0\) is linear-time for graph parity systems. Finding the exact minimum-weight representative of a nonzero coset is a nearest-codeword or coset-leader problem and is hard in general ([Berlekamp, McEliece and van Tilborg, 1978](https://doi.org/10.1109/TIT.1978.1055873)). For an all-antiferromagnetic graph,

\[
r^\star=|E|-\operatorname{MaxCut}(G),
\]

connecting the floor problem to classical combinatorial and Ising complexity ([Karp, 1972](https://doi.org/10.1007/978-1-4684-2001-2_9); [Barahona, 1982](https://doi.org/10.1088/0305-4470/15/10/028)). Semidefinite relaxations provide one route to useful certified bounds when exact computation is unavailable ([Goemans and Williamson, 1995](https://doi.org/10.1145/227683.227684)).

The same coset supports several readings without making those readings identical:

- its cohomology class determines whether exact satisfaction is possible;
- its minimum weight determines the discrete residual floor;
- its weight enumerator determines the partition function;
- the kernel of \(\delta\) determines assignment multiplicity;
- cut/cycle duality connects it to coding theory and MacWilliams-type transforms ([MacWilliams, 1963](https://doi.org/10.1002/j.1538-7305.1963.tb04003.x));
- Möbius inversion recovers exact violation counts from cumulative intersections ([Rota, 1964](https://doi.org/10.1007/BF00531932)).

This also exposes a representational failure that can occur before search. A continuous relaxation may possess a zero-energy interior point even when the Boolean problem has \(r^\star>0\). Define the obstruction-erasure gap

\[
\Delta_R=min_{x\in X}C(x)-\inf_{x\in\operatorname{conv}(X)}R(x).
\]

When \(\Delta_R>0\), the optimizer may solve the relaxed problem perfectly while solving the wrong representation. Floor-faithful relaxations satisfy \(\Delta_R=0\). Concavity over the exact convex hull is one sufficient condition because a concave minimum is attained at an extreme point; it is not a necessary condition and does not remove the underlying combinatorial hardness ([Rockafellar, 1970](https://press.princeton.edu/books/paperback/9780691015866/convex-analysis)).

The resulting diagnostic contract is:

\[
\boxed{
\begin{array}{rcl}
\text{Does the zero set exist?} &\longleftrightarrow& [c]=0,\\[1mm]
\text{What floor does the discrete structure impose?} &\longleftrightarrow& \operatorname{dist}(c,B^1),\\[1mm]
\text{Did the relaxation erase that floor?} &\longleftrightarrow& \Delta_R>0.
\end{array}
}
\]

The exact cohomological statement currently applies to graph-based XOR and parity systems. General SAT clauses do not canonically define graph 1-cochains; extending the theory may require hypergraph, cellular, sheaf-theoretic, or higher-degree consistency structures. That is a theorem frontier, not a solved equivalence.

## Where the ShunyaBar contribution begins

The individual ingredients—signed-graph balance, cohomological consistency, syndrome decoding, cut/cycle duality, frustrated Ising systems, Möbius inversion, and KAM persistence—have established mathematical histories. The ShunyaBar thesis is not that these subjects are newly discovered or secretly identical. It is that they can be organized into an operational diagnostic architecture: detect whether the requested zero set exists, characterize the residual class and its attainable floor, test whether a relaxation preserves that floor, and only then invoke continuous optimization.

The arithmetic and KAM directions begin beyond this established core. Möbius inversion belongs to incidence algebra, while MacWilliams duality arises from Fourier analysis on finite groups; a common arithmetic operator compatible with both remains a research question. Likewise, KAM theory establishes that arithmetic non-resonance can govern persistence under perturbation, but a ShunyaBar constraint-response spectrum and a theorem coupling manifold persistence to preservation of a discrete obstruction class remain conjectural ([Moser, 1962](https://www.jstor.org/stable/2372960)).

This is the more disciplined meaning of **obstruction before optimization**: do not promise that diagnosis makes every hard problem easy. Use diagnosis to determine which problem actually exists, which residual is structurally unavoidable, and where genuine optimization hardness begins.

## What changes at the research site

The product documentation begins with utility. The research site begins with mechanisms.

It does not ask only whether a solver produced a useful assignment. It asks why continuous dynamics can reveal structure in a discrete problem, how arithmetic identities can control an optimization process, where phase transitions appear, and whether the same mathematical architecture recurs in apparently unrelated domains.

The articles are longer because the objects need room to develop. Many include equations, executable experiments, plots, audio discussions, implementation sketches, limitations, and open questions. Some present mature computational frameworks. Others explore hypotheses whose consequences are still being worked out.

The site is not a prerequisite for using Navokoj. It is where motivated readers can understand the intellectual machinery that made Navokoj possible—and the directions that extend beyond it.

## Choose the question that pulls you in

There is no single required reading order. Enter through the problem that feels most alive to you.

### If you came for optimization

Begin with **The Hidden Manifold Where Geometry Meets Arithmetic** and **Mathematical Mechanism**.

These develop the self-stabilizing optimizer through an exponential-sum manifold, spectral penalties, prime-indexed arithmetic penalties, a correlation guard, and a closed-loop controller. The companion TSP article then maps those components onto a familiar combinatorial problem.

The important idea is not that every hard problem becomes easy. It is that an optimizer can monitor and preserve structural invariants while it moves, rather than treating every candidate state as an unrelated guess.

### If you came for machine learning or differential equations

Read **A Multiplicative Axis for Constraint Enforcement in Machine Learning**, followed by **The Multiplicative Axis: A New Approach to Navier–Stokes with Prime Number Gates**.

This path studies constraint enforcement beyond the conventional additive penalty. Multiplicative gates can attenuate optimization outside useful regions, while exponential barriers amplify violations near hard boundaries. The Navier–Stokes work applies that design language to gradient conflict in physics-informed models.

### If you came for number theory

Start with **The Dynamic Prime Cantor Set** or **The Prime Walk**.

The first constructs a fractal whose geometry evolves with the primes. The second defines a random walk over prime powers and studies its symmetry breaking, recurrence, heavy-tailed behavior, and relationship to the zeta function.

From there, **The Quantum Rhythm Hypothesis** and the Majorana article explore more speculative physical interpretations of arithmetic spectra.

### If you came for systems and diagnosis

Read **The Hidden Laws of Imbalance**.

It asks a question that ordinary optimization language often misses: what if poor performance is not caused by bad parameters, but by a structural defect in the system itself?

Variance floors, contiguity costs, spectral diagnostics, and the DEFEKT framework are used to distinguish a system that needs better optimization from one that needs architectural change. This line of work connects directly to Navokoj's diagnostic ambitions.

### If you came for symbolic computation

Read **Fock Space Computation**.

It treats symbolic objects as states acted on by creation and annihilation operators, then applies that representation to parsing and version-control merging. The central theme is the separation of content from structure: transformations can preserve meaning while reorganizing the space in which meaning is represented.

## One program, not one analogy

Across these paths, the vocabulary changes but several structures recur:

- continuous geometry carrying a discrete problem;
- arithmetic weights preserving identity;
- energy or action governing evolution;
- phase transitions separating operating regimes;
- multiplicative interaction rather than purely additive accumulation;
- diagnostics that identify structural limits before more computation is spent;
- a final return from continuous state to a discrete, inspectable object.

These recurrences are the research program.

Navokoj is where several of them meet operational constraints: deadlines, hardware, APIs, assignments, policies, and decisions. The research site follows the same structures into domains where there may not yet be a product boundary—and where the right question is still being formed.

## Follow the implemented systems

The research program is also expressed through project-specific sites. Each one follows a different part of the shared mathematics into an implemented system.

### [BAHA →](https://sethuiyer.github.io/baha/)

BAHA studies branch-aware movement between optimization basins. It uses Lambert-W branch structure to replace undirected random restarting with explicit alternative continuations through a difficult landscape.

### [Casimir SAT Solver →](https://sethuiyer.github.io/casimir-sat-solver/)

Casimir SAT explores Boolean computation through vacuum-inspired dynamics, treating partial assignments as interacting physical states rather than isolated points in a search tree.

### [NitroSAT →](https://sethuiyer.github.io/NitroSAT/)

NitroSAT is the open-source SAT and MaxSAT line. It is the most direct place to study, compile, run, and extend the physics-informed constraint-solving mechanisms that feed into the wider Navokoj lineage.

### [Multiplicative PINN Framework →](https://sethuiyer.github.io/multiplicative-pinn-framework/)

The Multiplicative PINN Framework carries the multiplicative constraint axis into physics-informed machine learning, where competing differential-equation residuals and boundary conditions can otherwise fight through an additive loss.

Together, these sites show that the institutional thesis is not confined to one application. Branch structure, physical evolution, arithmetic identity, and multiplicative enforcement become different computational instruments across the program.

## For readers who want to work, not just browse

The most useful way to engage is to choose one article and challenge it constructively.

Reproduce a computational example. Translate a functional into another domain. Test a claimed invariant outside the original workload. Identify a missing boundary condition. Compare the mechanism with a neighboring body of literature. Turn an implementation plan into an experiment. Follow an open question far enough that it becomes precise.

The work is public because it is meant to be read at that depth.

You do not need to accept the entire framework before exploring one component. You only need enough curiosity to stay with the mathematics past the first analogy.

## Foundational references

1. F. Harary, “On the Notion of Balance of a Signed Graph,” *Michigan Mathematical Journal* 2, 1953. [DOI](https://doi.org/10.1307/mmj/1028989917)
2. G. Toulouse, “Theory of the Frustration Effect in Spin Glasses: I,” *Communications on Physics* 2, 1977. [Record](https://hal.science/jpa-00217487)
3. F. J. MacWilliams, “A Theorem on the Distribution of Weights in a Systematic Code,” *Bell System Technical Journal* 42, 1963. [DOI](https://doi.org/10.1002/j.1538-7305.1963.tb04003.x)
4. E. Berlekamp, R. McEliece, and H. van Tilborg, “On the Inherent Intractability of Certain Coding Problems,” *IEEE Transactions on Information Theory* 24, 1978. [DOI](https://doi.org/10.1109/TIT.1978.1055873)
5. R. M. Karp, “Reducibility Among Combinatorial Problems,” in *Complexity of Computer Computations*, 1972. [DOI](https://doi.org/10.1007/978-1-4684-2001-2_9)
6. F. Barahona, “On the Computational Complexity of Ising Spin Glass Models,” *Journal of Physics A* 15, 1982. [DOI](https://doi.org/10.1088/0305-4470/15/10/028)
7. M. X. Goemans and D. P. Williamson, “Improved Approximation Algorithms for Maximum Cut and Satisfiability Problems Using Semidefinite Programming,” *Journal of the ACM* 42, 1995. [DOI](https://doi.org/10.1145/227683.227684)
8. G.-C. Rota, “On the Foundations of Combinatorial Theory I: Theory of Möbius Functions,” *Zeitschrift für Wahrscheinlichkeitstheorie* 2, 1964. [DOI](https://doi.org/10.1007/BF00531932)
9. R. T. Rockafellar, *Convex Analysis*, Princeton University Press, 1970. [Publisher](https://press.princeton.edu/books/paperback/9780691015866/convex-analysis)
10. J. Moser, “On Invariant Curves of Area-Preserving Mappings of an Annulus,” *Nachrichten der Akademie der Wissenschaften in Göttingen*, 1962. [JSTOR](https://www.jstor.org/stable/2372960)

## Enter when you are ready

Navokoj answers: **What decision can this system make now?**

The research program asks: **What structure makes such decisions possible, and where else does that structure appear?**

If the second question is the one you cannot leave alone, continue at:

## [research.shunyabar.foo →](https://research.shunyabar.foo)
