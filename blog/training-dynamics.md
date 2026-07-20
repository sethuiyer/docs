---
title: "Training Dynamics for Discrete Constraint Satisfaction"
description: "Examining the parallel between gradient-based neural network training and continuous optimization for NP-hard constraint problems."
date: "2025-12-15"
author: "Navokoj Research Team"
tags: [research, optimization]
materials:
  - label: "Evidence ledger"
    href: "https://huggingface.co/buckets/sethuiyer/shunyabar-evidence-v1"
  - label: "Research site"
    href: "https://research.shunyabar.foo"
---

# Training Dynamics for Discrete Constraint Satisfaction

### Continuous training dynamics can discover exact solutions to discrete NP-hard problems without explicit search

> **Abstract.** Modern neural network training optimizes billions of continuous parameters through gradient descent to minimize differentiable loss functions. Constraint satisfaction problems, conversely, require finding exact discrete assignments that satisfy hard Boolean conditions. We examine the structural parallels between these processes and demonstrate that continuous optimization dynamics. when properly constructed. can solve NP-hard constraint problems through mechanisms analogous to neural network training: symmetry breaking, phase transitions, and convergence to low-entropy configurations.

---

## Two Optimization Paradigms

Consider two seemingly distinct computational processes:

| Property | LLM Training | Constraint Solving |
| :--- | :--- | :--- |
| **Parameters** | Billions of continuous weights | Continuous embeddings over variables |
| **Loss function** | Smooth, differentiable proxy | Smooth relaxation of Boolean constraints |
| **Objective** | Minimize expected token error | Minimize constraint violation energy |
| **Outcome** | Frozen weight configuration | Frozen discrete assignment |
| **Mechanism** | Gradient descent + symmetry breaking | Gradient flow + phase transitions |

Both systems begin in high-entropy random states, undergo symmetry breaking through continuous dynamics, and settle into low-entropy attractors. Neither performs explicit search over the discrete space of solutions.

## Shared Dynamical Structure

The training process in both domains exhibits common phases:

1. **Random initialization** .  Parameters (weights or variable embeddings) start in a high-entropy configuration with no structure.
2. **Gradient-driven flow** .  The system follows the local geometry of a smooth loss landscape, making coordinated updates across all parameters simultaneously.
3. **Symmetry breaking** .  As optimization progresses, the system spontaneously breaks initial symmetries, committing to specific patterns or structures.
4. **Phase transition** .  At critical points in the optimization trajectory, the system undergoes rapid reorganization, transitioning between qualitatively different regimes.
5. **Frozen configuration** .  The system converges to a low-entropy state where further perturbations cause degradation rather than improvement.

## The Critical Difference

Neural network training operates on forgiving loss landscapes. Token prediction allows:

- **Local convexity:** The loss surface is approximately convex in local neighborhoods
- **Dense gradients:** Every weight receives informative gradient signals
- **Data smoothing:** Training data provides interpolation across the parameter space

Constraint satisfaction, by contrast, operates on maximally hostile terrain:

- **Rugged landscapes:** NP-hard problems exhibit exponentially many local minima
- **Discontinuous feasibility:** The boundary between satisfiable and unsatisfiable is fractal
- **Catastrophic gradients:** Small perturbations can cause global constraint violations

Ramsey problems exemplify this hardness. A single edge flip can propagate violations across arbitrarily distant vertex subsets.

## Unsupervised Structure Discovery

In the absence of labeled training data, both systems must discover structure through dynamics alone:

**Neural networks** discover:
- Feature hierarchies from pixel correlations
- Attention patterns from token dependencies
- Compositional representations from data geometry

**Constraint engines** discover:
- Variable roles from clause co-occurrence
- Long-range correlations from constraint propagation
- Global structure from symmetry breaking

Neither system has access to ground truth solutions during optimization. The loss landscape itself encodes the structure to be discovered.

## Empirical Evidence

Across the problems documented in this blog:

| Problem Domain | Constraint Complexity | Search Space | Result |
| :--- | :--- | :--- | :--- |
| **Ramsey R(5,5,5)** | 1.97M clauses | 10^372 | **Solution Found** |
| **Rew. Pebbling** | 300k clauses | PSPACE-complete | **60-step Seq.** |
| **K8s Placement** | 2.06M clauses | High-dim Bin Packing | **Optimal (100%)** |
| **5-SAT** | 211k clauses | Critical $\alpha \approx 21.1$ | **98.83% Sat** |

In each case, the engine:

1. Initialized in a random continuous state
2. Followed gradients without explicit search
3. Underwent phase transitions at critical optimization epochs
4. Converged to discrete solutions via continuous dynamics

## Frozen States and Structural Validity

The concept of a "frozen state" is central to both training paradigms:

**In neural networks:** Weight convergence indicates that further gradient updates produce diminishing improvements. The model has learned a representation that generalizes to held-out data. Perturbing individual weights degrades performance globally.

**In constraint solving:** Assignment convergence indicates that variable values have stabilized around discrete attractors (0 or 1). Further optimization cannot improve satisfaction without violating other constraints. Perturbing individual assignments propagates violations globally.

This structural rigidity is not a bug. it is evidence that the system has discovered a globally consistent solution.

## Theoretical Boundaries

This work does not claim that:
- SAT solving is equivalent to machine learning
- Continuous dynamics "learn" to solve NP-hard problems in general
- The approach generalizes to arbitrary unseen instances without problem-specific dynamics

Rather, we observe that:

> Continuous training dynamics, when constructed with appropriate energy functions and symmetry-breaking mechanisms, can discover exact solutions to discrete NP-hard constraints without explicit enumeration of the solution space.

This statement is empirically verifiable, philosophically interesting, and technically defensible.

## Implications for Optimization

The parallel suggests that tools developed for neural network training. adaptive learning rates, momentum methods, batch normalization analogues. may transfer to constraint optimization. Conversely, techniques from SAT solving. clause learning, symmetry breaking, backbone detection. may inform neural architecture design.

## References

1. LeCun, Y., et al. (2015). Deep learning. *Nature*, 521(7553), 436-444.
2. Achlioptas, D. (2009). Random satisfiability. *Handbook of Satisfiability*, 185, 245-270.
3. Mezard, M., Parisi, G., & Zecchina, R. (2002). Analytic and algorithmic solution of random satisfiability problems. *Science*, 297(5582), 812-815.

The K₃₅ R(6,6) test demonstrates this concretely. The 3.2 million clauses encode combinatorial rigidity: each of 1.6 million six-vertex subsets imposes two constraints. Yet continuous dynamics discovered a valid assignment in finite time, without enumerating combinations.

That capability. finding needles in haystacks of size 10^600 through gradient descent. is the defining characteristic of both modern machine learning and this class of constraint engines.

[Explore the API →](/docs)

**15 December, 2025**
The Navokoj Research Team, ShunyaBar Labs
