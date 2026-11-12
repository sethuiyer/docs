---
title: "The Intern, the Ellipsoid, and the Clock That Might Be Hiding Inside Another Clock"
description: "A mathematical essay on optical phase space, caustics, formally verified memory, and why the wrong address map can invent a clock."
date: "2026-10-22"
author: "Sethurathienam Iyer"
tags: ["optics", "phase space", "memory", "verification"]
type: "Essay"
materials:
  - label: "Original"
    href: "https://sethuiyer.github.io/phantom-clock/"
---

# The Intern, the Ellipsoid, and the Clock That Might Be Hiding Inside Another Clock

*A mathematical adventure through geometric optics, caustics, phase-space geometry, formally verified memory, and an unreasonable four-day deadline. It starts as a five-dimensional array-addressing problem and arrives at a theory of how a computational representation can manufacture apparent physical instability: a scientific instrument can lie to you because of how you store its measurements. Memory layout becomes part of the measurement physics.*

## Central claim

The optimal representation is *not* the one that stores the fewest coordinates or minimizes a single timing error. It is the least expensive representation that *preserves every distinction the instrument may need to make.*

Compactness is a storage property. Locality is a geometric property. Stability is a temporal property. They are not interchangeable.

## Evidence key

- **(A) Mathematical identities.** Proved. Snell’s law from Fermat’s principle, the law of total variance, the encoder’s range bound.
- **(B) Synthetic numerical results.** Demonstrated under stated models and sample sizes — controlled failure modes, not atomic-clock measurements.
- **(C) Formally verified claims.** These need a proof transcript (e.g. GNATprove). A transcript is presented in Appendix A for the released encoder, its chart table, and its contract structure only.

Every claim in this essay is tagged. “Proved” means (A). “The simulation shows” means (B). “We have not proved” means (C) is missing. That distinction is the essay’s immune system.

## The memory layout is part of the measurement

Written around an intern given four days to build an Ada memory prototype for an optical system-on-chip that probes femtosecond atomic-clock fluctuations, this essay turns a five-dimensional array-indexing task into a constrained information-theoretic instrument-design problem. Its thesis is narrow and uncomfortable: an inadequate memory representation can *manufacture* apparent physical instability, making a stable clock read as noisy simply because the address map merged two optical histories the instrument needed to keep apart.

1.  **From naive indexing to phase-space topology.** Row-major arrays assume a Cartesian grid, but the measurement volume is progressively elliptical: the scale factors are \(a(\rho)=1+\alpha\rho^2\) and \(c(\rho)=1-\beta\rho^2\), so the semiaxes are \(\rho a(\rho)\) and \(\rho c(\rho)\). Because \(\mathrm{d}x/\mathrm{d}\rho=1+3\alpha\rho^2\) while \(\mathrm{d}z/\mathrm{d}\rho=1-3\beta\rho^2\), uniform radial steps produce a \(4{:}1\) disparity in physical displacement at the boundary for \(\alpha=\beta=0.2\). Worse, Fermat's principle and the eikonal equation produce caustics where distinct rays share a position, so a spatial array merges different propagation histories. Imposing the dispersion constraint \(\lvert\mathbf{p}\rvert=n_p(\mathbf{x},\omega_0)/c\) places the state on a five-dimensional contact manifold \(\mathcal{M}_{\omega_0}\) parameterised by \((x,y,z,\theta,\phi)\), and the two direction angles are exactly what separates the colliding branches.

2.  **Verification, and the two refractive indices.** Local charts with canonical cell ownership give \(E(k,r)=B_k+r\), a contiguous collision-free encoding released as an Ada/SPARK specification: 47 proof obligations discharged, 0 unproved, for that three-chart instance and its contract structure. At \(1\,\mathrm{fs}\approx 300\,\mathrm{nm}\) of light travel, the phase index \(n_p\) generates the rays while the group index \(n_g=n_p+\omega\,\partial_\omega n_p\) governs arrival time along them; conflating the two injects a systematic \(\approx 40\,\mathrm{fs}\) error over a \(1\,\mathrm{mm}\) dispersive path.

3.  **Cells are a budget.** With a finite cell budget \(K_{\max}\) and finite calibration samples \(M\), allocation becomes task-aware quantization:

    \[
    \min_{\mathcal{P},\{m_k\}} \mathbb{E}\!\left[\operatorname{Var}\!\left(T_g \mid B_{\mathcal{P}}(Q)\right)\right] + \sum_{k=1}^{K}\frac{p_k v_k}{m_k}
    \]

    Five synthetic experiments populate this objective. Merging 20,000 converging rays into a spatial address inflates the timing residual from the \(0.30\,\mathrm{fs}\) detector floor to \(2.87\,\mathrm{fs}\) (\(9.55\times\)), manufacturing a false stochastic signal that a 128-bin lifted representation resolves by \(99.7\%\). Omitting chart identifiers makes 384 of 1,024 ranks collide. Under a \(K=64\) budget, chart-legal dynamic programming beats uniform angular binning by \(1.75\times\), while an unconstrained scalar Lloyd–Max optimum reaches \(10.6\times\) only by fragmenting the angular domain into 91 non-contiguous runs — pricing the address-structure cost of identity instead of asserting it.

4.  **What the geometry forbids.** Accumulated delay around a closed ray is a non-trivial dynamical cocycle, \(D(x,T+S)=D(x,T)+D(\phi^{T}x,S)\), and cannot be written as an instantaneous-state coboundary \(u(\phi^{T}x)-u(x)\); history variables such as a lap counter are therefore mandatory rather than an optimisation. Unresolved Markovian branch switching generates a Lorentzian-like spectrum whose Allan variance differs by \(94.6\times\) at \(\tau=256\) between independent and near-persistent (\(\rho=0.99\)) branches, and the ranking *reverses* with averaging window. Preserving \(J\) equiprobable branches costs exactly \(J^2\) in MSE — the per-bit price of identity, \(4\times\) per reserved address bit, exact when \(J\) is a power of two (\(16\times\) rather than \(9\times\) at \(J=3\), because address bits are integral) — while noisy calibration caps useful resolution at \(K_{\mathrm{opt}}\propto M^{1/3}\). Packaging closed-ray delays into an optical Euler product \(Z_{\mathrm{opt}}(s)\) reaches the prime number theorem's orbit proliferation (\(h\approx1\)) yet shows essentially zero correlation (\(-0.04\) on first differences) with prime-counting fluctuations, separating exponential orbit growth from Riemann-zero arithmetic structure.

All of it condenses into a single **observable-sufficiency criterion**: an encoder \(E\) is admissible for an observable \(Y\) exactly when \(E(H_1)=E(H_2)\Rightarrow Y(H_1)=Y(H_2)\) over all admissible histories — equivalently, the coarsest encoding whose fibres respect the distinctions the instrument must make. See Appendix E.

## 1. A Monday morning assignment

Imagine that you are an intern at a company building optical instrumentation. It is Monday morning. Your supervisor gives you a seemingly straightforward assignment.

> “We’re designing a custom system-on-chip. We need a memory structure for measurements that live in three spatial dimensions and two rotational dimensions. The measurements occupy a volume, but the geometry becomes progressively more elliptical toward the boundary. We want contiguous storage, not five separate coordinate arrays. And we’re using Ada.”
>
> Then comes the purpose of the device: “We want to detect femtosecond-scale fluctuations in an atomic clock, to investigate whether there is a subtler timing structure beneath the one we’re currently measuring.”
>
> “Oh, and we’d like a prototype in four days.”

This is the kind of problem that makes computer science interesting, because almost every noun in the assignment conceals another discipline. *Memory* conceals topology. *Ellipsoid* conceals differential geometry. *Optics* conceals Hamiltonian mechanics. *Femtosecond* conceals precision metrology. *Ada* conceals formal verification. And *four days* conceals a very unfortunate weekend.

Our goal is to construct a useful prototype without pretending that four days is enough to solve the underlying physics. We will not discover a new clock in this essay. We will discover why a *wrong memory layout can invent one*.

### The design problem, formally

The paper’s main technical contribution can be stated as a single constrained optimization problem before any of its components are derived. Let \(Q\) be an optical state drawn from the instrument’s operating distribution \(\mu\) on the fixed-frequency manifold \(\mathcal{M}_{\omega_0}\), let \(T_g(Q)\) be its group-delay correction, and let \(B_{\mathcal{P}}(Q)\) denote the cell of a partition \(\mathcal{P} = \{C_1,\ldots,C_K\}\) containing \(Q\). The design problem is

\[
\boxed{\begin{aligned}
          \min_{\mathcal{P},\{m_k\}} \quad
          & \mathbb{E}\!\left[\operatorname{Var}\!\left(T_g(Q)\mid B_{\mathcal{P}}(Q)\right)\right]
            + \sum_{k=1}^{K} \frac{p_k v_k}{m_k} \\[2pt]
          \text{subject to}\quad
          & |\mathcal{P}| \le K_{\max}, \\
          & \textstyle\sum_{k=1}^{K} m_k \le M, \\
          & \text{each cell has one canonical chart owner and one address,} \\
          & \text{addresses are contiguous and collision-free (Theorem 1),} \\
          & \text{required ray-branch distinctions are preserved (Theorem 4),} \\
          & \text{the chart table is frozen per acquisition batch,}
          \end{aligned}}
\]

where \(p_k = \mathbb{P}(Q \in C_k)\), \(v_k = \operatorname{Var}(T_g \mid C_k)\), \(K_{\max}\) is the address budget, and \(M\) is the calibration budget. The objective’s first term is the geometric distortion resolved by the partition (exactly decomposed by the law of total variance, §12); the second is the statistical cost of estimating each cell’s correction from \(m_k\) calibration samples. The constraints encode the architectural requirements that are not tradeable: representation correctness (contiguity, uniqueness, frozen versioning) and preservation of the optical distinctions the measurement needs.

Everything that follows — the manifold geometry, the encoder, the rate–distortion analysis, and the experiments — is in service of this problem. Making it explicit up front also makes the central claim precise: the optimum is not the partition that minimizes timing distortion alone; it is the *cheapest partition in the feasible set*.

Sources & neighbors

This essay stands on a few shoulders: Fermat’s principle and the eikonal equation as treated by Born & Wolf; Hamiltonian characteristics, phase-space flows and Liouville’s theorem by Arnold; caustic morphologies by Berry & Upstill; contact structure of the fixed-frequency hypersurface by Geiges; atomic-frequency-standard statistics by Allan; rate–distortion foundations by Shannon, Lloyd, Gray & Neuhoff; functional quantization by Misra, Goyal & Varshney; nonparametric rates by Stone; perturbation analysis by Bonnans & Shapiro; and SPARK methodology by McCormick & Chapin. The full bibliography, including the author’s prior frameworks, is at the end.

## 2. Why an ordinary array is the wrong starting point

A conventional multidimensional array is just a convenient interpretation of linear memory. Suppose we index by three integers

\[
(i,j,k), \qquad 0 \le i \lt N_x, \quad 0 \le j \lt N_y, \quad 0 \le k \lt N_z.
\]

Row-major representation uses

\[
A(i,j,k) = (iN_y + j)N_z + k.
\]

This is beautiful because it is simple, collision-free, and invertible. Add two angular coordinates, discretized into \(N_\theta\) and \(N_\phi\) bins, and we obtain

\[
A(i,j,k,p,q) = ((((iN_y+j)N_z+k)N_\theta+p)N_\phi+q).
\]

Five dimensions have become one integer. Problem solved?

Not remotely.

This formula assumes that the logical domain is a Cartesian product \(X \times Y \times Z \times \Theta \times \Phi\). But an ellipsoidal volume is not a rectangular box, and a progressively deforming ellipsoidal volume is not naturally described by uniformly sampled Cartesian slices.

We could allocate the bounding box and leave unused cells outside the valid domain. That wastes memory. We could enumerate valid lattice points and give them consecutive ranks. That saves memory — but does not guarantee that neighboring optical states are stored near one another.

And this distinction is central. A *compact address map* answers: “Can I store every admissible state without wasting addresses?” An optical memory architecture must answer a harder question: “Can I store states so that the geometry relevant to the measurement survives discretization?”

**Compactness is a storage property. Locality is a geometric property. They are not interchangeable.**

Consider two measurements that are close in Euclidean space but have very different propagation delays, because they arrived along different ray branches. A compact spatial rank will put them together. An optical memory that cares about timing should *not* necessarily put them together. Conversely, two measurements that are far apart in space but share the same group delay may be natural comparison partners for timing analysis — a spatial layout will put them far apart.

The intern’s first mistake, if he is not careful, will be to optimize the wrong thing: to make the array *small*, rather than to make it *faithful*.

## 3. A progressively elliptical domain

Let’s construct a toy model of progressive ellipticity. Introduce a normalized radial parameter \(0 \le \rho \le 1\) and a unit direction \(\mathbf{u} \in S^2\), and define

\[
\mathbf{x}(\rho,\mathbf{u}) = \rho
          \begin{pmatrix} a(\rho) & 0 & 0 \\ 0 & b(\rho) & 0 \\ 0 & 0 & c(\rho) \end{pmatrix}
          \mathbf{u},
          \qquad
          a(\rho) = 1 + \alpha\rho^2, \quad b(\rho) = 1, \quad c(\rho) = 1 - \beta\rho^2,
\]

with the restrictions

\[
\boxed{\alpha \gt 0, \qquad 0 \lt \beta \lt \tfrac13.}
\]

These are not cosmetic. The semiaxes of the shell at radial parameter \(\rho\) are

\[
s_x(\rho) = \rho + \alpha\rho^3, \qquad s_y(\rho) = \rho, \qquad s_z(\rho) = \rho - \beta\rho^3.
\]

**Proposition 1 (Nesting).**

For \(\alpha \gt 0\) and \(0 \lt \beta \lt 1/3\), the family \(\{\mathbf{E}_\rho\}_{0 \le \rho \le 1}\) is strictly nested: each shell encloses the preceding one, and the construction extends continuously to the center, where the shell at \(\rho = 0\) degenerates to a point.

> **Proof.**
>
> Differentiate: \(\frac{ds_x}{d\rho} = 1 + 3\alpha\rho^2 \gt 0\), \(\frac{ds_y}{d\rho} = 1 \gt 0\), and \(\frac{ds_z}{d\rho} = 1 - 3\beta\rho^2 \gt 0\), the final inequality following from \(\beta \lt 1/3\). Strictly increasing semiaxes imply each shell is interior to the next. (A)

Near the center, the three axes are approximately equal. Near the boundary, their ratios differ. We have produced a family of increasingly elliptical shells.

However, this is only a geometric model. It does not establish that light propagates along those shells, or that the shells are surfaces of equal optical travel time. To determine that, we need optics — and this is where a seventeenth-century mathematician enters the data-structure design meeting.

## 4. Fermat’s principle as an address generator

Fermat’s principle says that physical rays follow paths for which optical travel time is stationary under suitable variations. For a refractive-index field \(n(\mathbf{x})\), the travel-time functional is

\[
\mathcal{T}[\gamma] = \frac1c \int_\gamma n(\mathbf{x}) \, d\ell,
\]

where \(\ell\) is physical arc length along the path. A physical ray satisfies

\[
\boxed{\delta \mathcal{T} = 0.}
\]

“Stationary” is more precise than “minimum”: a ray path need not be a strict global minimum.

Why should a memory engineer care? Because the device is not primarily interested in where a measurement sits in Euclidean space. It is interested in the *phase and arrival time* of optical information. Two spatially nearby measurements can have different propagation delays; two spatially distant measurements can share the same optical phase or travel-time surface.

Introduce a phase-travel-time field \(T_p(\mathbf{x})\). For isotropic geometric optics at a fixed frequency, away from singularities, it satisfies the eikonal equation:

\[
\boxed{\left|\nabla T_p(\mathbf{x})\right|^2 = \frac{n_p^2(\mathbf{x},\omega_0)}{c^2}.}
\]

The level sets \(\Sigma_\tau = \{\mathbf{x} : T_p(\mathbf{x}) = \tau\}\) are equal-phase wavefronts at the chosen frequency. Now the memory problem changes character. Instead of asking which Cartesian cells belong inside an ellipsoid, we ask which optical states belong to each propagation-related layer. If the actual optical medium produces increasingly elliptical wavefronts, the resulting memory organization can reflect that deformation.

Conditional

Progressive ellipticity must come from the optical model or measured calibration data. Fermat’s principle does not guarantee it. Using optical propagation geometry as an organizing principle — rather than treating the ellipsoidal boundary as a Boolean mask — is our first architectural improvement. And it creates a new problem: what happens when two rays arrive at the same place?

## 5. The Cauchy problem, or why rays refuse to behave like array indices

Suppose we specify an initial wavefront, together with its initial phase and propagation directions. Propagating this initial data through the medium is a Cauchy problem: determine the subsequent solution from appropriate initial conditions.

The eikonal equation belongs to the Hamilton–Jacobi family. Its characteristic curves can be obtained from a Hamiltonian. For the moment, fix the optical frequency and suppress it from the notation. Define

\[
H(\mathbf{x},\mathbf{p}) = \frac12 \left( |\mathbf{p}|^2 - \frac{n_p^2(\mathbf{x})}{c^2} \right).
\]

Optical rays lie on \(H = 0\) and evolve according to Hamilton’s equations:

\[
\boxed{\frac{d\mathbf{x}}{ds} = \frac{\partial H}{\partial \mathbf{p}} = \mathbf{p}}, \qquad
          \boxed{\frac{d\mathbf{p}}{ds} = -\frac{\partial H}{\partial \mathbf{x}} = \frac{n_p(\mathbf{x})}{c^2} \nabla n_p(\mathbf{x})},
\]

where \(s\) is a characteristic parameter, not physical time. On \(H = 0\), \(|\mathbf{p}| = n_p/c\), hence \(\left|d\mathbf{x}/ds\right| = n_p/c\) and \(ds = (c/n_p)\,d\ell\), giving

\[
\boxed{s - s_0 = c \int_{\ell_0}^{\ell} \frac{d\ell'}{n_p(\ell')}.}
\]

This parameter is neither physical time nor optical travel time \(T_p = \int \frac{n_p}{c}\, d\ell\); its normalization changes traversal speed but not the geometric ray trajectory.

Given an initial wavefront parameterized by two coordinates \((u,v)\), the ray family \(\mathbf{X}(s,u,v)\) locally provides three coordinates for three-dimensional space. That looks promising. Unfortunately, nature has invented caustics.

### The caustic problem

When sunlight passes through a glass of water, bright curves appear on the table because neighboring rays concentrate. Mathematically, the map \((s,u,v) \mapsto \mathbf{X}(s,u,v)\) may cease to be locally invertible. Define the Jacobian

\[
J = \det \left[ \frac{\partial \mathbf{X}}{\partial s},\;
          \frac{\partial \mathbf{X}}{\partial u},\; \frac{\partial \mathbf{X}}{\partial v} \right].
\]

**Proposition 2 (Caustic signature).**

The spatial ray-coordinate map loses local invertibility exactly where \(J = 0\).

> **Proof.**
>
> Immediate from the inverse function theorem: local invertibility of the parametrization requires a nonsingular Jacobian matrix. (A)

The key observation: the rays themselves need not cease to exist. What fails is our attempt to identify a ray using spatial position alone. Suppose two rays reach the same spatial point, \(\mathbf{x}_1 = \mathbf{x}_2\); they can still have different momenta, \(\mathbf{p}_1 \ne \mathbf{p}_2\). A spatial-only address merges them. An optical state-space address can keep them separate.

This is why the two rotational degrees of freedom in the original specification are potentially far more important than they first appear: they can encode the propagation direction that distinguishes ray branches.

## 6. The five-dimensional escape hatch

In ordinary Hamiltonian mechanics, a particle in three-dimensional space has a six-dimensional phase space \((x,y,z,p_x,p_y,p_z)\). In our isotropic fixed-frequency optical model, the Hamiltonian constraint determines the magnitude of optical momentum,

\[
|\mathbf{p}| = \frac{n_p(\mathbf{x},\omega_0)}{c},
\]

leaving only its direction free. A direction in three dimensions requires two angular coordinates:

\[
\mathbf{p} = \frac{n_p(\mathbf{x},\omega_0)}{c}
          \begin{pmatrix} \sin\theta\cos\phi \\ \sin\theta\sin\phi \\ \cos\theta \end{pmatrix}.
\]

We arrive at the boxed state tuple

\[
\boxed{(x,y,z,\theta,\phi)}
\]

— three spatial dimensions, two rotational dimensions. Exactly the five degrees of freedom from the assignment, under the interpretation that the rotations are propagation directions. This is the most natural reading for fixed-frequency propagation in an isotropic medium, but not the only physical interpretation: a polarization-frame orientation or an aperture sampling scheme could introduce different angular variables. Our construction specifically uses propagation direction because it distinguishes intersecting ray branches.

The natural mathematical object is the fixed-frequency constraint manifold

\[
\mathcal{M}_{\omega_0} = \left\{ (\mathbf{x},\mathbf{p}) : |\mathbf{p}| = \frac{n_p(\mathbf{x},\omega_0)}{c} \right\}.
\]

**Proposition 3 (The fixed-frequency manifold).**

For a smooth positive refractive index \(n_p\), \(\mathcal{M}_{\omega_0}\) is a five-dimensional manifold, and the projection \(\pi : \mathcal{M}_{\omega_0} \rightarrow \mathbb{R}^3\) may fail to distinguish distinct states: two rays can occupy the same spatial point but remain distinct points of \(\mathcal{M}_{\omega_0}\) because their directions differ.

> **Proof.**
>
> Write \(F(\mathbf{x},\mathbf{p}) = |\mathbf{p}|^2 - n_p(\mathbf{x},\omega_0)^2/c^2\). Then \(\partial_{\mathbf{p}} F = 2\mathbf{p} \neq 0\) on \(F = 0\) (since \(n_p \gt 0\) forces \(|\mathbf{p}| \gt 0\)), so the regular level set theorem applies in the six-dimensional ambient space, yielding dimension 5. The failure of \(\pi\) to be injective is witnessed by any pair \((\mathbf{x},\mathbf{p}_1) \neq (\mathbf{x},\mathbf{p}_2)\) with \(|\mathbf{p}_i| = n_p(\mathbf{x},\omega_0)/c\) and \(\mathbf{p}_1 \neq \mathbf{p}_2\), which exists whenever \(\mathbf{x}\) admits two distinct propagation directions. (A)

This does not mean a five-dimensional coordinate chart is globally nonsingular. Angular coordinates have poles and seams, and complicated geometry may require multiple charts. Nor does it mean that every ray branch is uniquely identified by quantized position and direction: distinct samples can occupy the same discrete cell, requiring an additional sample sequence or branch identity.

Nevertheless, the correct basic representation has emerged: *store optical states on the constrained phase-space manifold*, rather than storing spatial cells and attaching orientation as an afterthought.

## 7. Constructing the contiguous address space

We want a single memory arena \(M_0, M_1, \ldots, M_{N-1}\) — no giant five-dimensional rectangular allocation. Instead, construct a finite partition of the admissible optical state manifold. Call the cells \(C_0, C_1, \ldots, C_{N-1}\). Each cell represents a small region of position–direction space. The encoder is a map

\[
E : \mathcal{M}_{\mathrm{discrete}} \rightarrow \{0,\ldots,N-1\}.
\]

We require **uniqueness** — \(E(q_1) = E(q_2) \implies q_1 = q_2\) for canonical discrete cell identities; **coverage** — every admitted cell has an address; **stability** — the address map remains well-defined near caustics and deformed boundaries; and, where practical, **geometric locality** — optically nearby states should occupy nearby addresses. That last requirement is an optimization objective, not a consequence of compact indexing.

### Multiple optical charts

A single global chart is fragile. Instead, divide the manifold into local patches and assign each physical cell a canonical chart owner. For each chart \(k\), store its base offset \(B_k\), cell count \(N_k\), calibration version, and mapping from canonical cell identities to local ranks. Define

\[
\boxed{E(k,r) = B_k + r, \qquad 0 \le r \lt N_k,}
\]

with consecutive intervals \(B_0 = 0\), \(B_{k+1} = B_k + N_k\). This produces contiguous storage without gaps. Charts may overlap geometrically, but their canonical ownership must not — otherwise the same logical cell could acquire multiple addresses.

There is also a crucial distinction between unique cells and unique continuous states. Finite digital storage identifies quantized cells, not every real-valued point inside them. The quantization error must be bounded relative to the measurement requirements.

### The address budget does not survive refinement unchanged

A caustic is a warning that the spatial projection becomes singular. It does not automatically mean every nearby cell must be refined. Refinement is justified where an error estimator, ray-branch separation criterion, or measurement sensitivity requires it. And refinement is not free: if the SoC has a fixed address budget, allocating more cells near a difficult region reduces the budget available elsewhere.

Two failure modes follow. First, smooth regions become under-resolved, potentially corrupting timing analysis where the system was expected to behave quietly. Second, allocation becomes calibration-dependent: two runs with different optical configurations may generate different chart tables, changing what a given address means. That is a reproducibility hazard disguised as a memory optimization.

The four-day compromise: fix the global cell budget, allocate it by a documented rule, freeze the resulting chart table during acquisition, and record its version with every measurement batch. Changing the allocation rule is a change to the instrument, not merely a software optimization.

## 8. Why Ada suddenly makes sense

At this point, a conventional programmer might say: “Fine. Let’s put everything in a hash table.” The senior infrastructure engineer asks a more unpleasant question. “Can you prove that the encoder never produces an invalid address?” Then another. “Can you prove that two distinct canonical cells never alias?” And another. “What happens when an interrupt arrives during a geometry-table update?”

Now Ada becomes interesting. Ada offers strong typing, constrained ranges, contracts, and explicit representation controls. SPARK, its formally analyzable subset, can establish selected program properties. For precision instrumentation this matters because a silent indexing error can produce a *plausible but physically meaningless* measurement. We do not merely want the program to avoid crashing; we want it to avoid silently turning one optical state into another.

### The encoder’s proof obligations

Assume an offline geometry preprocessor has constructed canonical charts and assigned local ranks. The essential range obligation is easy to understand. We need \(B_k + r \lt N\) for every valid rank \(r\). Given \(B_k + N_k \le N\), we obtain \(B_k + r \lt B_k + N_k \le N\), so the address is in bounds.

**Proof Obligation 1 (Range bound).**

For all valid chart identifiers \(k\) and ranks \(0 \le r \lt N_k\): \(B_k + r \lt N\).

But range safety is not injectivity.

**Theorem 1 (Injectivity).**

If the chart intervals \([B_k, B_k+N_k)\) are pairwise disjoint, then \(E(k,r) = B_k + r\) is injective on \(\{(k,r) : 0 \le r \lt N_k\}\); if the intervals additionally cover the complete address range consecutively, \(E\) is a bijection onto that range.

> **Proof.**
>
> Suppose \(E(i,r) = E(j,s)\). If \(i \ne j\), disjoint intervals make equality impossible, so \(i = j\); then \(B_i + r = B_i + s\) implies \(r = s\). Surjectivity follows from the consecutive-covering hypothesis by induction over the interval sequence. (A)

Two obligations, one encoder — and now a transcript

The range bound concerns a single call to `Encode`; injectivity compares arbitrary pairs of valid inputs and is a *relational* property requiring its own proof, whether by a mathematical argument or a SPARK ghost lemma. The released specification (Appendix A) supplies the invariant structure, and its GNATprove transcript discharges **all 47 obligations with no unproved checks** — initialization (2), run-time checks (29), assertions (9), functional contracts (6), termination (1) — covering `Encode`, `Decode`, and the ghost injectivity lemma. This machine-checked result applies to the released chart table and contract structure; it is not claimed for arbitrary chart tables or for the geometry preprocessor, and the general statement remains Theorem 1.

There is also a deeper missing proof: nothing in this encoder establishes that the geometry preprocessor constructed the correct optical partition. The solver establishes *what the cells mean*; the verification-ready encoder establishes *where they live*; the acquisition pipeline establishes *which measurements belong to them*. Keeping these responsibilities separate is what makes the system auditable. Formal verification is not a property of the author’s intentions; it is a claim that must survive actual proof obligations — which is why the transcript is released alongside the specification. (C)

## 9. The IIT-JEE-style mathematical hammer

Let’s temporarily forget the intimidating terminology and attack the central ideas using calculus, vectors, and algebra.

### Problem 1 — Derive Snell’s law from Fermat’s principle

Light travels from point \(A\) in a medium of refractive index \(n_1\) to point \(B\) in a medium of index \(n_2\), through a horizontal interface. Let \(h_1, h_2\) be the perpendicular distances, \(L\) the horizontal separation, and \(x\) the crossing coordinate. Travel time:

\[
T(x) = \frac{n_1}{c}\sqrt{x^2+h_1^2} + \frac{n_2}{c}\sqrt{(L-x)^2+h_2^2}.
\]

Differentiating and setting to zero:

\[
\frac{n_1 x}{\sqrt{x^2+h_1^2}} = \frac{n_2(L-x)}{\sqrt{(L-x)^2+h_2^2}},
\]

and recognizing \(\sin\theta_1 = \frac{x}{\sqrt{x^2+h_1^2}}\), \(\sin\theta_2 = \frac{L-x}{\sqrt{(L-x)^2+h_2^2}}\):

\[
\boxed{n_1 \sin\theta_1 = n_2 \sin\theta_2.}
\]

Snell’s law appears directly from stationary travel time. The lesson: physically meaningful trajectories arise from the optical variational principle, and a programmer’s coordinate grid has no reason to respect those trajectories automatically. (A)

### Problem 2 — Why a caustic destroys spatial invertibility

Consider the two-dimensional toy family of rays

\[
x(t,u) = u(1-t), \qquad y(t,u) = t,
\]

where \(u\) labels the initial ray and \(t\) parameterizes its evolution. At \(t = 1\), \(x(1,u) = 0\) for every \(u\): all rays meet at \((0,1)\). The Jacobian is

\[
J = \det \begin{pmatrix} \partial_t x & \partial_u x \\ \partial_t y & \partial_u y \end{pmatrix}
          = \det \begin{pmatrix} -u & 1-t \\ 1 & 0 \end{pmatrix} = t-1,
          \qquad \boxed{J = 0 \quad \text{at} \quad t=1.}
\]

The inverse mapping fails precisely at the focus: away from \(t = 1\), \(u = \frac{x}{1-y}\), whose denominator vanishes at \(y = 1\). This is a mathematical failure of the coordinates, not a floating-point accident.

Now examine the ray tangent \(\frac{\partial(x,y)}{\partial t} = (-u,1)\): at the focus, rays with different \(u\) have different directions. Their spatial positions coincide, but their lifted position–direction states remain distinguishable — which is why storing orientation alongside position preserves information that a spatial address loses.

### Problem 3 — Quantify the danger of a progressively elliptical boundary

Return to \(x = \rho(1+\alpha\rho^2)u_x\), \(y = \rho u_y\), \(z = \rho(1-\beta\rho^2)u_z\). Along the positive \(x\)-axis, \(x(\rho) = \rho + \alpha\rho^3\) and \(\frac{dx}{d\rho} = 1 + 3\alpha\rho^2\), approaching \(1\) at the center and

\[
\left.\frac{dx}{d\rho}\right|_{\rho=1} = 1+3\alpha
\]

at the boundary; for \(\alpha = 0.2\) this is \(1.6\). A fixed radial increment produces approximately \(60\%\) more physical displacement near the outer boundary along this axis than near the center. Along the \(z\)-axis, \(z(\rho) = \rho - \beta\rho^3\) and \(\frac{dz}{d\rho} = 1 - 3\beta\rho^2\); for \(\beta = 0.2\) the boundary value is \(0.4\). Uniform increments in \(\rho\) are not uniform physical distances, nor necessarily uniform optical travel-time increments.

The enclosed volume is

\[
V(\rho) = \frac{4\pi}{3}\rho^3 a(\rho)b(\rho)c(\rho),
\]

and the nesting conditions of Proposition 1 ensure these are actual nested ellipsoids with increasing enclosed volumes. Differentiating:

\[
\frac{dV}{d\rho} = 4\pi\rho^2 abc + \frac{4\pi}{3}\rho^3 (a'bc + ab'c + abc'),
\]

whose first term resembles ordinary radial growth and whose second term comes from the changing ellipsoidal shape. A shell-indexing scheme that ignores this contribution misrepresents the volume distribution — before accounting for refractive index, ray focusing, or directional sampling. A compact spatial-rank lookup can give every cell a unique number; it cannot, by itself, ensure those numbers respect the physics.

## 10. The femtosecond connection

One femtosecond is \(10^{-15}\,\mathrm{s}\). Light travels

\[
c\Delta t = (3\times10^8)(10^{-15}) = 3\times10^{-7}\,\mathrm{m} = \boxed{300\,\mathrm{nm}}
\]

during that interval. A propagation-delay error of this scale can contaminate a measurement intended to resolve femtosecond timing structure. But now we must confront a subtlety that a simple geometric-optics treatment hides.

### Phase velocity, group velocity, and why one refractive index is not enough

The eikonal equation of §4 uses the phase refractive index \(n_p\), whose level sets describe equal phase. For a continuous-wave interferometric measurement, phase is a natural observable. For a pulse-arrival measurement, however, group delay becomes important. In a time-independent isotropic medium the dispersion relation is

\[
|\mathbf{k}| = \frac{n_p(\mathbf{x},\omega)\omega}{c}, \qquad
          v_p = \frac{\omega}{|\mathbf{k}|} = \frac{c}{n_p},
\]

and differentiating,

\[
\boxed{v_g = \frac{\partial\omega}{\partial|\mathbf{k}|} = \frac{c}{n_p + \omega\partial_\omega n_p} = \frac{c}{n_g},}
          \qquad n_g = n_p + \omega\partial_\omega n_p.
\]

It would be tempting to replace \(n_p\) with \(n_g\) inside the eikonal Hamiltonian. That is generally wrong: the phase dispersion relation determines the rays; the group index is derived from that dispersion relation, not a replacement for it.

### The extended Hamiltonian

Introduce

\[
\boxed{\mathcal{H}(\mathbf{x},\mathbf{k},\omega) = c^2|\mathbf{k}|^2 - n_p^2(\mathbf{x},\omega)\omega^2 = 0,}
\]

a seven-dimensional description with a codimension-one dispersion constraint. For a canonical Hamiltonian treatment of propagation and timing, include the time coordinate \(t\) conjugate to \(\omega\), giving an eight-dimensional extended phase space before imposing the constraint. Because the medium is time-independent, frequency is conserved along rays, \(d\omega/d\tau = 0\); at fixed \(\omega_0\) the dispersion constraint reduces to the five-dimensional manifold of §6. Group delay is computed along the phase-generated ray trajectories: for a narrowband pulse propagating along a specified ray branch \(\gamma\),

\[
\boxed{T_g(A,B;\omega_0) = \int_\gamma \frac{n_g(\mathbf{x},\omega_0)}{c}\, d\ell,}
\]

assuming an appropriate isotropic stationary-medium setting and a well-defined ray branch. The state manifold remains phase-defined; what changes is the functional used to organize measurements. A group-delay-sensitive memory layout may benefit from grouping states according to \(T_g\) rather than \(T_p\). *State space and organizing coordinate are separate architectural decisions.*

### Caustics do not move merely because the observable changes

Changing the indexing functional from phase delay to group delay does not change the physical ray family at a fixed frequency, and therefore does not independently move the physical caustics, which are determined by the spatial projection of the phase-generated rays. A group-delay coordinate may, however, introduce its own representation difficulties: it may fail to distinguish certain states or become multivalued when projected onto physical space. Those are coordinate or branch-selection problems, not new physical caustics.

A caustic itself is not necessarily a breakdown of ray dynamics — rays can remain smooth while their spatial projection becomes singular. What fails in elementary geometrical optics is often the naive amplitude approximation, which can diverge at an ideal caustic; uniform asymptotic methods, including Airy-type approximations for folds and Pearcey-type approximations for cusps, describe caustic neighborhoods without a complete Maxwell simulation. When wavelength-scale material structure or strong scattering invalidates the approximation, more complete wave modeling may be necessary.

### The bandwidth problem

The time-bandwidth product is constrained by the pulse shape: \(\Delta\omega\,\Delta t \gtrsim O(1)\), with the numerical constant depending on how duration and spectral width are defined. At optical frequencies, a transform-limited pulse lasting a few femtoseconds has substantial relative bandwidth; a chirped pulse of the same temporal duration can have a different spectral width, and chirp alone does not establish a narrower bandwidth. For a broadband pulse, evaluating \(n_g\) only at \(\omega_0\) may be inadequate: higher-order dispersion, spectral phase, and pulse reshaping can affect the measured arrival time.

The four-day prototype therefore assumes a narrowband regime, uses \(T_g\) as a leading-order organizing functional, and explicitly records that this approximation may not hold for the intended instrument. If the device sweeps frequency, chart tables may need versioning per band, or frequency may need to become an additional state coordinate.

The phase dispersion relation generates the rays; group delay describes a timing observable along those rays. Confusing these roles would mean building the correct data structure around the wrong physical quantity.

### The measurement model

A simplified timing measurement can be written

\[
t_{\mathrm{obs}} = t_{\mathrm{clock}} + T_g + t_{\mathrm{electronics}} + \epsilon.
\]

After calibration,

\[
r = t_{\mathrm{obs}} - \widehat{T}_g - \widehat{t}_{\mathrm{electronics}},
\]

and the objective is to investigate whether \(r\) contains structure beyond expected noise and known clock behavior. Our memory architecture can help preserve the information required for propagation corrections and comparisons; it cannot manufacture measurement precision. If the detector, digitizer, reference oscillator, or acquisition electronics cannot resolve the relevant fluctuations, a more sophisticated address mapping cannot recover information that was never captured.

There is also a subtle question of locality. Two samples may be spatially distant yet share similar calibrated group delays, making them natural comparison partners for some analyses. A possible analysis-oriented distance is

\[
d^2(q_1,q_2) = (T_1 - T_2)^2 + w_\Omega d_{S^2}^2(\Omega_1,\Omega_2)
          + \frac{\|\mathbf{x}_1-\mathbf{x}_2\|^2}{v_g^2},
\]

where \(w_\Omega\) has units of time squared. This is a design metric, not a physical law: the weights encode which differences matter for a particular analysis, must be calibrated against the measurement objective, and should not be mistaken for universal constants of optical geometry.

## 11. What can actually be built in four days?

We now have enough mathematics to propose a sensible engineering plan. The trick is to resist implementing everything. A four-day prototype should establish the architecture’s critical invariants and expose unresolved physics rather than concealing it. The geometry computation need not initially run on the SoC: it can be performed offline and exported as immutable calibration tables, separating an expensive numerical solver from a bounded runtime address lookup. We distinguish three levels of success.

**Tier 1: Representation correctness.**

Every canonical cell has one valid address, and decoding reconstructs its identity.

**Tier 2: Geometric correctness.**

The cells cover the intended optical state space with quantified approximation errors, including near difficult boundaries and caustics.

**Tier 3: Measurement usefulness.**

The representation improves or preserves timing-analysis accuracy relative to a suitable baseline.

Day four can demonstrate Tier 1 on a completed test implementation and begin evaluating Tier 2 on synthetic data; Tier 3 is explicitly outside the four-day scope. Passing Tier 1 does not imply Tier 2, and passing Tier 2 does not imply Tier 3. The chart-table version must be frozen during an acquisition batch: updating the optical partition mid-measurement could change what an address means, so a calibration version is part of the sample’s interpretation even if recorded only once per batch. This is the sort of mundane detail that distinguishes an engineering prototype from a mathematical sketch.

### A detour worth recording: contact geometry

The fixed-frequency optical manifold carries a beautiful mathematical structure — a natural contact form whose Reeb flow follows the optical rays — and it explains why five dimensions arise so naturally. The full treatment moved to Appendix B; it is a deeper research direction, not a four-day deliverable.

## 12. From optical geometry to rate–distortion theory

The preceding sections establish that a spatial-only representation can introduce false timing variation, while a finite-resolution phase-space representation preserves much of the missing information. But a new problem emerges: how should a limited number of memory cells be distributed across optical phase space? Uniform spatial sampling is not necessarily appropriate; nor uniform angular sampling; nor even refining wherever the ray-coordinate Jacobian becomes small. The correct allocation depends on what the instrument is trying to measure.

### The loss function

Let \(Q\) be an optical state drawn from the instrument’s operating distribution \(\mu\), and let \(T_g(Q)\) denote its group-delay correction. A partition \(\mathcal{P} = \{C_1, \ldots, C_K\}\) assigns each optical state to a discrete cell \(B_{\mathcal{P}}(Q)\). Within each cell, the optimal constant group-delay estimate under squared error is \(\widehat{T}_g(C_k) = \mathbb{E}[T_g(Q) \mid Q \in C_k]\). The resulting distortion is

\[
\boxed{\mathcal{L}(\mathcal{P}) = \mathbb{E}\!\left[ \operatorname{Var}\!\left(T_g(Q) \mid B_{\mathcal{P}}(Q)\right) \right],}
\]

so for a fixed SoC cell budget \(K_{\max}\) the design problem becomes

\[
\boxed{\begin{aligned}
          \mathcal{P}^\star &= \underset{\mathcal{P}}{\arg\,\min}\ \mathcal{L}(\mathcal{P}), \\
          \text{subject to} \quad |\mathcal{P}| &\le K_{\max}.
          \end{aligned}}
\]

Additional hardware constraints may require contiguous chart regions, bounded lookup latency, canonical ownership, minimum spatial resolution, or fixed per-chart allocations. This is a *task-aware quantization* problem: unlike conventional geometric meshing, its objective is not merely to approximate the shape of the optical manifold but to minimize unresolved timing error.

### Why the variance decomposition matters

The law of total variance gives

\[
\operatorname{Var}(T) = \operatorname{Var}(\mathbb{E}[T \mid B]) + \mathbb{E}[\operatorname{Var}(T \mid B)].
\]

The first term measures geometric timing variation resolved by the partition; the second measures timing variation remaining inside cells. Therefore

\[
\boxed{\text{Resolved fraction} = 1 - \frac{\mathcal{L}(\mathcal{P})}{\operatorname{Var}(T)}.}
\]

In one simulation, the empirical decomposition was \(\operatorname{Var}(T) = \operatorname{Var}(\mathbb{E}[T\mid B]) + \mathcal{L}(\mathcal{P})\), and the partition resolved approximately \(92\%\) of the simulated geometric-delay variance. This percentage uses the empirical total variance from that experiment and should not be confused with the fraction obtained from earlier finite samples with different residual estimates. The distinction matters because the loss is an expectation over the operating distribution, while experiments only estimate that expectation from finite samples.

### Calibration is part of the budget

The optimal cell correction is a conditional expectation, which in practice must be estimated from calibration data. Suppose cell \(k\) contains \(m_k\) independent calibration observations with conditional variance \(v_k\), and its correction is estimated by the sample mean. Then \(\operatorname{Var}(\widehat{T}_k \mid C_k) = v_k/m_k\), and under independent calibration and evaluation data the expected timing mean-squared error becomes

\[
\boxed{\operatorname{MSE} = \sigma^2 + \sum_{k=1}^{K} p_k \left( v_k + \frac{v_k}{m_k} \right),}
\]

where \(p_k = \mathbb{P}(Q \in C_k)\), \(v_k = \operatorname{Var}(T_g \mid C_k)\), and \(\sigma^2\) is evaluation detector-noise variance. (If calibration measurements also contain detector noise, that contribution must be included in the calibration estimator variance.) This creates a second resource constraint: more cells can reduce within-cell distortion but also require more calibration observations to estimate their corrections reliably. With a fixed calibration budget \(M\), the design problem becomes a joint optimization over the partition and its calibration allocation:

\[
\boxed{\min_{\mathcal{P},\{m_k\}} \left[ \mathcal{L}(\mathcal{P}) + \sum_k p_k \frac{v_k}{m_k} \right]}
          \qquad\text{subject to } |\mathcal{P}| \le K_{\max},\ \sum_k m_k \le M.
\]

The instrument must budget both memory and calibration effort: a cell that is cheap to allocate in silicon may be expensive to calibrate.

**Proposition 4 (Optimal calibration allocation).**

If the cell probabilities \(p_k\) and conditional variances \(v_k\) are known, then the calibration allocation minimizing the total estimator-variance contribution under a total sample budget \(M\) is, in the continuous relaxation,

\[
\boxed{m_k \propto \sqrt{p_k v_k}.}
\]

> **Proof.**
>
> Lagrange multipliers: minimize \(\sum_k p_k v_k / m_k\) subject to \(\sum_k m_k = M\). The stationarity condition \(-p_k v_k / m_k^2 + \lambda = 0\) gives \(m_k = \sqrt{p_k v_k/\lambda}\); summing and enforcing the constraint fixes \(\lambda\). (A)

So even calibration rays should not necessarily be allocated uniformly — a direct consequence of the multiplier calculation.

### The central optimization

Putting it all together, with the constraints explicit:

\[
\boxed{\begin{aligned}
          \min_{\mathcal{P},\{m_k\}} \quad & \mathbb{E}[\operatorname{Var}(T_g \mid B_{\mathcal{P}})] + \sum_k \frac{p_k v_k}{m_k} \\
          \text{subject to} \quad & |\mathcal{P}| \le K_{\max}, \\
          & \sum_k m_k \le M, \\
          & \mathcal{P} \text{ preserves chart ownership,} \\
          & \mathcal{P} \text{ preserves required branch identity,}
          \end{aligned}}
\]

with contiguous angular cells as an additional constraint for the dynamic-programming experiment of §13. This formulation makes the central tradeoff explicit: timing distortion, memory capacity, calibration effort, and optical identity cannot be optimized independently. For scalar \(T_g\) with squared error, the unconstrained problem is Lloyd–Max quantization; with contiguity, chart ownership, and branch-identity constraints, it becomes constrained weighted quantization. Lloyd–Max provides the foundation, not automatically the global solution: the unconstrained optimum may merge distinct branches, which is why it cannot be deployed even when its timing number looks better.

The classical rate–distortion problem asks how much information must be retained to achieve a desired reconstruction accuracy; here the distortion measure is physically meaningful — unresolved group-delay variation. The hardware imposes a finite set of addresses, the optical model imposes geometric constraints, and calibration imposes a statistical cost. The resulting partition is not merely a data structure; it is part of the measurement system.

## 13. Five experiments: when the wrong address becomes a false clock

We evaluated five synthetic experiments designed to isolate the consequences of spatial projection, anisotropic geometry, dispersive propagation, chart-aware memory addressing, and task-aware allocation. All are evidence type (B) except where an identity is marked (A). (B)

### Experiment 1 — A caustic can manufacture timing structure

We generated \(20{,}000\) rays converging to a common spatial location. Each ray retained a distinct propagation direction and a direction-dependent group delay. Let \(U\) denote the ray’s initial direction parameter, and let the measured arrival time be

\[
Y = T_g(U) + \varepsilon,
\]

where \(\varepsilon\) is independent detector noise with \(\mathbb{E}[\varepsilon]=0\), \(\operatorname{Var}(\varepsilon)=\sigma^2\). A spatial-only representation merges rays arriving at the same position; if the reconstruction subtracts a single mean delay, its residual is \(R_{\mathrm{merged}} = T_g(U) - \mathbb{E}[T_g(U)] + \varepsilon\). By independence,

\[
\boxed{\operatorname{Var}(R_{\mathrm{merged}}) = \operatorname{Var}_U(T_g) + \sigma^2.}
\]

The first term is not clock noise; it is unresolved geometric delay variation. A phase-space representation retains ray direction, allowing the correct branch-dependent delay to be subtracted:

\[
R_{\mathrm{lifted}} = Y - T_g(U) = \varepsilon,
          \qquad \boxed{\operatorname{Var}(R_{\mathrm{lifted}}) = \sigma^2.}
\]

- **std of branch delays:** 2.85 fs (direction-dependent \(T_g(U)\))
- **detector noise σ:** 0.30 fs (ideal floor)
- **merged residual:** 2.87 fs · 8.21 fs² (std · variance)
- **binned lifted residual:** 0.31 fs · 0.093 fs² (K = 128 bins)
- **merged ÷ noise floor:** 9.55× std · 91× var (versus ideal σ)

The difference between those ratios matters: the first compares to the ideal floor \(\sigma = 0.30\,\mathrm{fs}\); the second compares to the practical floor \(\sqrt{\sigma^2 + \operatorname{Var}(T_g \mid B)} \approx 0.31\,\mathrm{fs}\). The binned lifted residual is not \(\sigma\); it is \(\sigma\) plus within-bin geometry \(\operatorname{Var}(T_g \mid B)\). Thus the binned representation resolves \(1 - 0.0016/8.09 = 99.98\%\) of the geometric-delay variance in that sample, leaving \(\operatorname{Var}(T_g \mid B) = 0.0016\,\mathrm{fs}^2\) unresolved — approximately \(0.02\%\).

The experiment demonstrates a specific failure mode: spatial merging can turn deterministic, branch-dependent propagation delays into apparent stochastic timing fluctuations. It does not demonstrate a new clock; it demonstrates how a false clock-like signal can arise.

**Figure 1.** The merged residual is broad; the corrected residual is not

Schematic of the reported statistics: the merged distribution is broad and asymmetric (skew \(0.42\), excess kurtosis \(-0.85\)); the corrected distribution is concentrated near the detector-noise scale but remains binning-limited (skew \(0.05\), excess kurtosis \(0.51\)); the Shapiro–Wilk test rejects exact normality on \(n = 20{,}000\) at \(p \lt 10^{-6}\). Noise-and-binning-limited, not an honest Gaussian.

### Experiment 2 — Uniform shell indices are not uniform physical sampling

We evaluated the progressively ellipsoidal shell family of §3 with \(\alpha = 0.2\), \(\beta = 0.2\). At the outer boundary, \(dx/d\rho = 1.6\) and \(dz/d\rho = 0.4\): the selected parameters produce a \(4{:}1\) ratio between the physical displacements generated by equal radial increments along the two axes. (At \(\rho = 0.5\) the ratio is \(1.15{:}0.85 \approx 1.35\), recovering \(\approx 1\) in the central nearly spherical region.) Therefore uniformly spaced \(\rho\)-bins do not correspond to uniform physical sampling.

This is not an address-collision problem: every cell may still have a unique integer address. It is a geometric-resolution problem: identical index increments represent substantially different physical displacements. A chart allocator must therefore account for geometric distortion, using Jacobian information or an appropriate error-based refinement criterion. Volume check: \(V(1) = \frac{4\pi}{3}(1.2)(1)(0.8) \approx 4.82\) versus the sphere’s \(\frac{4\pi}{3} \approx 4.19\) — shape distortion shifts the enclosed volume distribution beyond naive radial estimates.

### Experiment 3 — Phase delay and group delay are not interchangeable

We evaluated a synthetic dispersive medium with a prescribed frequency-dependent phase index, stated for reproducibility:

\[
n_p(\omega) = 1.401 + 0.006\,(\omega/\omega_0)^2,
          \qquad
          \omega_0 = 2\pi \times 405\,\mathrm{THz},
          \qquad
          L = 1\,\mathrm{m},
\]

an explicitly anomalous model chosen so that \(\omega\,\partial_\omega n_p \gt 0\). Then \(n_p(\omega_0) = 1.407\) exactly, and \(\omega_0\,\partial_\omega n_p(\omega_0) = 2(0.006) = 0.012\), giving \(n_g = n_p + \omega\,\partial_\omega n_p = 1.419\). For a homogeneous path, \(T_p = n_p L / c\) and \(T_g = n_g L / c\); using phase delay to correct a group-delay measurement introduces

\[
(n_g - n_p) L / c \approx 4.0\times10^{-14}\,\mathrm{s} = 40\,\mathrm{fs}.
\]

The synthetic configuration thus produced a \(\approx 0.85\%\) relative timing discrepancy per fixed path length when defined as \((n_g-n_p)/n_g\), and \(\approx 0.86\%\) when defined as \((n_g-n_p)/n_p\); the denominator is stated so the number is reproducible. This is not a numerical indexing error; it is a mismatch between the modeled observable and the measured one.

### Experiment 4 — Canonical chart ownership prevents address aliasing

We tested the three-chart address table with \((B_0, N_0) = (0, 512)\), \((B_1, N_1) = (512, 256)\), \((B_2, N_2) = (768, 256)\); the arena contains \(N = 1024\) addresses. For each valid chart–rank pair we computed \(E(k,r) = B_k + r\). Exhaustive enumeration produced \(1{,}024\) addresses, all unique, covering the complete integer interval \([0, 1024)\). Therefore, for this concrete table, the encoder is a bijection between valid chart–rank pairs and arena addresses — instantiating Theorem 1 for a finite case. (B)

The experiment also illustrates why the chart identifier is essential: if local ranks are used as global addresses, cells belonging to different charts alias — in this table, ignoring the chart id yields \(384\) duplicate ranks. The released runtime test (test_encoder.adb) additionally enumerates all 1,024 chart–rank pairs, confirms no duplicate addresses, checks that the union covers \([0, 1024)\), and verifies the decode round trip. This exhaustive test establishes the bijection for the tested finite table. It does not constitute a general SPARK proof for arbitrary chart tables, nor does it validate the optical correctness of the chart partition. (C)

### Experiment 5 — Uniform bins versus task-aware allocation, held out

We compared alternative partitions under the same cell budget \(K = 64\). The tested delay function \(T_g(\Omega)\) varied slowly over one part of the angular domain and rapidly over another. A uniform partition allocated equal resolution to both angular regions; a dynamic-programming partition optimized contiguous angular cells to minimize \(\mathcal{L}(\mathcal{P})\) on training data, subject to the chart-legality constraints — contiguity, one interval per branch, branch identity recoverable from the address. From \(300{,}000\) rays per seed under a deterministic SHA-256 80/20 split we used the first \(200{,}000\) of the \(\approx240{,}000\) available training rays and all \(\approx60{,}000\) held-out rays (\(60{,}016\pm223\) across seeds; \(60{,}170\) at the reference seed).

Exact held-out improvement for the chart-legal DP partition:

\[
\frac{0.000423}{0.000242} = 1.748 \approx \mathbf{1.75\times}
\]

#### What the headline number does and does not mean

A single ratio invites over-reading, so we report three controls, all at released replication cost (12 seeds, \(t_{11} = 2.201\); code/scaling.py).

**First, the improvement is a property of the budget as much as of the method.**

**Table.** Held-out distortion and DP improvement vs uniform, across address budgets

| \(K\) (cells/branch) | uniform \(\mathrm{fs}^2\) | DP \(\mathrm{fs}^2\) | ratio        | 95% CI       |
|-----------------------------|----------------------|-----------------|--------------|--------------|
| \(16\) (\(8\)) | \(6.406\times10^{-3}\)         | \(2.658\times10^{-3}\)    | \(2.410\) | \(\pm 0.011\) |
| \(32\) (\(16\)) | \(1.677\times10^{-3}\)         | \(8.195\times10^{-4}\)    | \(2.046\) | \(\pm 0.007\) |
| \(64\) (\(32\)) | \(4.231\times10^{-4}\)         | \(2.421\times10^{-4}\)    | \(1.748\) | \(\pm 0.009\) |
| \(128\) (\(64\)) | \(1.059\times10^{-4}\)         | \(6.689\times10^{-5}\)    | \(1.583\) | \(\pm 0.005\) |
| \(256\) (\(128\)) | \(2.649\times10^{-5}\)         | \(1.757\times10^{-5}\)    | \(1.508\) | \(\pm 0.007\) |

The advantage decays with budget and converges towards the generic value in the next table. Any single-budget figure is a statement about that budget.

**Second, most of the gain is ordinary optimal nonuniform quantization.** At \(K = 64\) (32 cells per branch) the same code applied to other delay laws gives:

**Table.** Controls at \(K=64\): the same estimator on four delay laws

| delay law    | interpretation              | ratio        | 95% CI       |
|--------------|-----------------------------|--------------|--------------|
| \(A_0\theta\) | affine in \(\Omega\)      | \(0.997\) | \(\pm 0.002\) |
| \(A_0\sin 2\theta\) | one smooth regime, no split | \(1.504\) | \(\pm 0.006\) |
| \(A_0 A\sin 4\theta\) | the released two-regime law | \(1.748\) | \(\pm 0.009\) |
| \(A_0\sin 8\theta\) | one fast regime             | \(1.889\) | \(\pm 0.004\) |

The affine row is the control that matters most: uniform bins are optimal when the observable is affine, so the estimator is not simply favouring itself, and \(0.997\times\) is the expected null. The smooth-sinusoid row shows that a delay law with *no* slow/rapid structure at all already delivers \(1.50\times\) at the same budget. The two-regime structure adds to a generic effect rather than causing it, and the honest summary is that this experiment confirms the standard result — optimal nonuniform quantization beats uniform binning on any curved observable — inside an architecture that must also carry optical identity.

**Third, the sample is not doing the work it appears to do.** The released delay law is known in closed form, so the identical dynamic program can be run on an analytic quadrature grid with zero sampled rays. It reaches \(2.4192\times10^{-4}\,\mathrm{fs}^2\) against the sample-estimated \(2.4208\times10^{-4}\,\mathrm{fs}^2\), a relative gap of \(0.07\%\), with cell boundaries agreeing to within 1–3 grid points out of 1024. The partition is a function of the delay law; the \(200{,}000\) rays estimate it and add a little noise. We therefore describe this procedure as partition optimization *estimated from samples*, not as learning from data.

**Chart legality is an address-structure cost, not a moral one.** The sharpest way to price the chart-legal constraint is to compute what it forbids. Optimizing the scalar observable alone — the classical optimal scalar quantizer of \(T_g\), precisely the prior work this essay cites — with \(32\) cells reaches \(4.0019\times10^{-5}\,\mathrm{fs}^2\), a \(10.6\times\) improvement over uniform binning rather than \(1.75\times\). That solution is not incorrect; it is *unrepresentable*. Its cells are contiguous in \(T_g\) but not in \(\Omega\), and scanning \(\Omega\) they fragment into \(91\) runs, so realizing them requires \(\approx2.8\times\) the chart-address structure of the \(32\) contiguous angular cells we are permitted.

**Figure 2.** What chart legality costs

Both non-uniform rows use 32 scalar cells per branch, but they are not the same representation. The scalar optimum reconstructs \(6\times\) better and costs \(\approx2.8\times\) the address structure, because its cells are contiguous in \(T_g\) rather than in \(\Omega\) and so fragment into 91 angular runs. Bar length shows address runs, not distortion.

This yields the result we consider the paper’s sharpest statement about representation cost. The scalar optimum is dramatically better and the chart-legal optimum is dramatically worse, and the difference is not a moral judgement but a measurable requirement for address structure. Consequently the design objective of §12 is correctly specified: one cannot price a representation by scalar reconstruction error alone, because topology, identity, address count, calibration, and distortion are coupled resources. Theorem 11 prices one analytic instance of that coupling; the \(91/32\) measurement prices a geometric instance of the same coupling, and the two are independent routes to the same conclusion.

The released reference generator reproduces both headline distortions (\(4.230\times10^{-4}\) and \(2.423\times10^{-4}\,\mathrm{fs}^2\)) and the \(1.746\pm0.005\) ratio over 30 seeds, byte-identically; the scaling, control, and scalar-optimum tables above are regenerated by code/scaling.py.

**One clarification about scope.** The released delay law is branch-independent and is not \(\pi\)-symmetric: \(T_g(\theta) \neq T_g(\pi-\theta)\) for all \(\theta \neq \pi/2\). This generator therefore *cannot* exhibit a \(\theta \leftrightarrow \pi-\theta\) branch collision, and any contiguous angular partition preserves branch identity trivially on it. Branch identity is accordingly a theoretical architectural constraint throughout this essay (§7, Theorem 11), not a quantity Experiment 5 measures; what Experiment 5 measures is chart-legal contiguous quantization of a scalar observable. An earlier draft of this essay claimed a released transform-based partition merged \(\theta = 0.35\pi\) with \(\theta = 0.65\pi\) because they share a delay value; the released model does not support that, and the claim has been withdrawn.

#### Repeated-seed statistics and released reproduction artifacts

The original Experiment 5 run was not replicated, so no uncertainty was originally reported. We therefore calibrated and released a reference generator (code/generate.py) whose two calibration constants are documented: an amplitude fixing the uniform-bin distortion at \(4.23\times10^{-4}\,\mathrm{fs}^2\) and a heterogeneity parameter fixing the DP ratio at the documented value. Over \(30\) independent sampling seeds — 300k rays each under a deterministic SHA-256 80/20 split, from which the first 200k training rays and all \(\approx60\)k held-out rays are used, exact DP on a 1024-point boundary grid, branch identity enforced by \(K/2\) addresses per branch — the mean held-out distortions were

\[
\overline{D}_{\mathrm{uniform}} = 4.230\times10^{-4} \pm 9.0\times10^{-7},
          \qquad
          \overline{D}_{\mathrm{DP}} = 2.423\times10^{-4} \pm 4.2\times10^{-7}
\]

(95% CI, \(t_{29}\)), giving a per-seed improvement ratio \(\mathbf{1.746 \pm 0.005}\) (95% CI). The ratio is stable across seeds; the absolute distortion scale is set by the calibrated amplitude, and the confidence interval quantifies split and sampling variability under the released model, *not* model-selection uncertainty. All per-seed values are in code/results_exp5_seeds.csv.

The result illustrates why a purely geometric refinement heuristic can fail: a small ray-coordinate Jacobian may indicate a caustic, but it does not by itself quantify the benefit of adding a memory cell. The relevant quantity is the reduction in expected distortion achieved by refinement,

\[
\boxed{\Delta\mathcal{L}(C) = \mathcal{L}(\mathcal{P}) - \mathcal{L}(\mathcal{P} \text{ with } C \text{ refined}),}
\]

and for a fixed memory budget, refinement should prioritize cells with the greatest expected reduction in timing distortion per unit of additional storage, subject to coverage and hardware constraints.

### Calibration allocation at large and small M

Using the uniform-\(T_g\) bins, with \(p_k\) and \(v_k\) estimated from training data and the continuous relaxation of Proposition 4: the optimal allocation offers negligible improvement when calibration is abundant but becomes consequential when samples are scarce, because the calibration term \(p_k v_k / m_k\) grows as \(1/m_k\) while the within-cell term stays fixed. At \(M = 10^6\), optimal \(\{m_k\}\) is nearly uniform; at \(M = 256\), optimal allocations deviate strongly from uniformity — the continuous relaxation breaks down and integer allocation is required. Finite-calibration simulation for the binned lifted estimator with floor variance \(0.093\,\mathrm{fs}^2\) (calibration-term inflation \(v_k/m_k\), \(v_k \approx 0.093\)): \(m = 1\) gives \(+100\%\) (variance \(0.234\,\mathrm{fs}^2\)), \(m = 2\) gives \(+50\%\), \(m = 4\) gives \(+25\%\), and \(m = 16\) gives \(+6.25\%\). A cell cheap in silicon may be expensive to calibrate.

## 14. The final surprise: the memory problem was never just about memory

Let’s collect the reasoning. We began with five logical dimensions and a contiguous memory requirement. Ordinary row-major indexing solved the dimensionality problem but ignored the domain’s geometry. A compact spatial-rank lookup solved wasted allocation but did not establish the locality and sampling properties needed by the optical application.

Progressive ellipticity forced us to examine the geometry itself. Fermat’s principle introduced optical travel time. The eikonal equation produced equal-phase wavefronts. The Cauchy problem and Hamiltonian characteristics described how those wavefronts propagate. Caustics showed why spatial ray coordinates can lose invertibility. The fixed-frequency optical phase space explained the natural appearance of three positional and two directional degrees of freedom. A multi-chart partition provided a route to contiguous, collision-free digital addresses. Ada and SPARK gave us tools to express — and potentially verify — the discrete representation’s invariants. And the phase-versus-group-delay distinction forced the separation between the manifold, generated by the phase dispersion relation, and group delay, a different observable computed along its rays.

The memory layout must choose which functional it organizes by: for a pulse-arrival observable, group delay is a natural leading-order choice, but that does not license rebuilding the manifold from the group index. State space and organizing coordinate are separate decisions. And the atomic-clock application explains why all this matters: the system must not confuse geometric propagation effects with genuine timing fluctuations.

There is one last mathematical distinction worth appreciating. Hamiltonian evolution preserves symplectic structure in full phase space; under suitable conditions, Liouville’s theorem tells us that phase-space volume is preserved by the flow. But preservation of full phase-space volume does not mean spatial volume is preserved: a ray bundle can focus dramatically in position space while spreading in momentum directions. That is why caustics are compatible with well-behaved Hamiltonian evolution, and it is why a representation that keeps only spatial coordinates can become inadequate.

The mathematics was quietly telling us where to put the missing information: not in another arbitrary array — in the *directions of the rays*.

### Interpretation of all five experiments

The five experiments expose five different failure modes at different layers of the system; fixing one does not automatically fix the others.

- **Spatial projection** can manufacture apparent timing fluctuations by merging physically distinct ray branches (Exp. 1).
- **Uniform logical sampling** can misrepresent physical resolution in an anisotropic domain (Exp. 2).
- A **phase-versus-group-delay mismatch** can introduce systematic timing error even when the data structure itself is correct (Exp. 3).
- Omitting **canonical chart ownership** can produce actual memory-address collisions (Exp. 4).
- **Unconstrained task-aware optimization** can improve a single timing number while destroying branch identity (Exp. 5).

The central experimental conclusion is therefore not that a five-dimensional array is inherently superior to a three-dimensional array. It is that preserving the optical state variables required by the measurement prevents information loss that a spatial-only representation cannot recover after projection. The experiments establish this result in controlled synthetic settings; physical validation, broadband propagation modeling, and machine-checked verification remain separate obligations.

## 15. Five theoretical extensions

Five results follow from the model of the preceding sections, with each additional assumption stated explicitly. The first limits the five-dimensional representation itself.

### Extension 1 — The closed-ray obstruction

Suppose an admitted ray returns to the same position *and* direction after a complete circuit, with positive group index along the circuit.

**Theorem 2 (Closed-ray obstruction).**

Accumulated group delay cannot be represented by a single-valued function of the instantaneous five-dimensional optical state on any domain that includes repeated circuits.

> **Proof.**
>
> Let \(q(s)\) denote the position–direction state, with \(q(P) = q(0)\) after one circuit of period \(P\). If accumulated delay were a state function \(G(q)\), returning to the same state would imply \(G(q(P)) - G(q(0)) = 0\). But propagation around the circuit accumulates \(\Delta T_g = \oint_\gamma \frac{n_g}{c}\,d\ell \gt 0\). The same difference would have to be both zero and positive — a contradiction. (A)

This is a continuous-state obstruction: increasing angular or spatial resolution cannot fix it. The caustic argument of §6 distinguishes rays with different directions; this result identifies a further ambiguity — two visits can have identical position and direction but different travel times. The five-dimensional representation can identify the instantaneous ray state while failing to identify the measurement’s *history*, so a recirculating instrument needs additional information such as a lap counter, launch-event identity, or accumulated delay. Single-pass acquisition avoids this obstruction by selecting one traversal from an entry surface.

### Extension 2 — Hidden branches can manufacture an entire clock-like noise spectrum

The essay proves that unresolved geometry adds variance. A stronger result concerns its *temporal structure*. Suppose two branches share one stored address with delays \(T_g(Z_t) = T_0 + aZ_t\), \(Z_t \in \{-1,+1\}\), where the branch sequence is a stationary symmetric Markov chain satisfying \(\Pr(Z_{t+1} = Z_t) = \frac{1+\rho}{2}\), \(0 \lt \rho \lt 1\). Assume a perfectly stable clock and independent white detector noise \(\varepsilon_t\) of variance \(\sigma^2\). After subtracting the merged-cell correction \(T_0\), the residual is \(R_t = aZ_t + \varepsilon_t\).

**Theorem 3 (Clock-like spectrum).**

The residual has autocovariance and discrete-frequency power spectrum

\[
\boxed{
              \operatorname{Cov}(R_t,R_{t+h}) = a^2\rho^{|h|}+\sigma^2\mathbf{1}_{\{h=0\}},
              \qquad
              S_R(\Omega) = \sigma^2 + a^2\frac{1-\rho^2}{1-2\rho\cos\Omega+\rho^2}.
              }
\]

> **Proof.**
>
> The transition rule gives \(\mathbb{E}[Z_{t+h} \mid Z_t] = \rho^h Z_t\). Since \(\mathbb{E}[Z_t] = 0\) and \(Z_t^2 = 1\), the covariance follows directly; Fourier transforming the geometric sequence gives the spectrum. (A)

At zero frequency the geometric contribution is \(S_{\mathrm{geom}}(0) = a^2\frac{1+\rho}{1-\rho}\): as branch persistence approaches one, substantial low-frequency power appears even though the clock is perfect. There is also an identifiability consequence. Without additional restrictions or branch observations, the explanations (i) stable clock with fluctuating unresolved branch delay \(aZ_t\), and (ii) constant propagation delay with clock fluctuation \(aZ_t\), produce exactly the same recorded residual process. Temporal correlation alone cannot distinguish hidden optical geometry from clock fluctuations; validation should therefore test autocorrelation and spectra after branch correction, alongside the residual variance already considered — using the metrological machinery of Allan statistics.

### Extension 3 — Preserving branch identity has an exact distortion cost

Consider a controlled model: \(J\) equally probable branches, delay \(T\) uniformly distributed over an interval of width \(W\) on every branch, branch identity independent of delay, \(K\) total addresses with \(K\) divisible by \(J\), one reconstructed delay per address, and branch identity recoverable from the address. For a uniform scalar, the optimal \(k\)-cell squared-error distortion is \(W^2/(12k^2)\), obtained by equal intervals and midpoint reconstruction.

**Theorem 4 (Branch-preservation cost).**

Subject only to exact branch preservation, \(D^\star_{\mathrm{preserve}}(K) = \frac{J^2 W^2}{12 K^2}\); if branch identity may be discarded, \(D^\star_{\mathrm{discard}}(K) = \frac{W^2}{12K^2}\); consequently

\[
\boxed{\frac{D^\star_{\mathrm{preserve}}}{D^\star_{\mathrm{discard}}} = J^2.}
\]

> **Proof.**
>
> Exact branch recovery requires disjoint address sets. Let branch \(b\) receive \(K_b\) addresses with \(\sum_{b=1}^J K_b = K\); its conditional distortion is at least \(W^2/(12K_b^2)\), so \(D \ge \frac{W^2}{12J}\sum_{b=1}^J \frac{1}{K_b^2}\). Convexity of \(x^{-2}\) makes equal allocation \(K_b = K/J\) optimal; substitution proves the result, and equal delay intervals attain it. (A)

In this model, preserving four independent branch identities costs a factor of **16 in MSE** — or 4 in RMS error — at the same total address capacity. An inadmissible method can therefore win a timing benchmark by a large factor purely because it discards required information: the counterexample of Experiment 5 has an exact theoretical counterpart. The budget must count the combined identity; storing branch labels separately consumes additional bits even when correction tables can be shared. This places the branch-constrained design inside the functional-quantization conversation, where quantizers minimize the error of a computed function rather than a raw reconstruction.

### Extension 4 — Refinement has a calibration threshold, and useful resolution grows only as \(M^{1/3}\)

For partition \(\mathcal{P}\) define \(p_k = \Pr(Q \in C_k)\) and \(v_k = \operatorname{Var}(T_g \mid C_k)\); let each correction be estimated from \(m_k\) independent calibration observations, each carrying additional independent noise of variance \(\nu^2\), and write \(D(\mathcal{P}) = \sum_k p_k v_k\) and \(S(\mathcal{P}) = \sum_k \sqrt{p_k(v_k + \nu^2)}\).

**Theorem 5 (Calibration threshold).**

Under a total calibration budget \(\sum_k m_k = M\), the continuous allocation optimum is

\[
\boxed{
              R^\star(\mathcal{P}) = \sigma^2 + D(\mathcal{P}) + \frac{S(\mathcal{P})^2}{M},
              }
\]

where \(\sigma^2\) is evaluation detector-noise variance.

> **Proof.**
>
> Independent calibration and evaluation give \(R = \sigma^2 + D + \sum_k \frac{p_k(v_k+\nu^2)}{m_k}\). Cauchy–Schwarz yields \(\bigl(\sum_k \sqrt{p_k(v_k+\nu^2)}\bigr)^2 \le \bigl(\sum_k \frac{p_k(v_k+\nu^2)}{m_k}\bigr)\bigl(\sum_k m_k\bigr)\), with equality for \(m_k = M\,\frac{\sqrt{p_k(v_k+\nu^2)}}{S(\mathcal{P})}\), the continuous relaxation of Proposition 4 extended by \(\nu^2\); actual sample counts require integer allocation. (A)

Consequently, a refinement \(\mathcal{P} \to \mathcal{P}'\) improves the relaxed total error *if and only if*

\[
\boxed{
          D(\mathcal{P}) - D(\mathcal{P}') \gt \frac{S(\mathcal{P}')^2 - S(\mathcal{P})^2}{M}.
          }
\]

Reducing geometric distortion alone is insufficient. For an exact counterexample, let the true delay be constant everywhere: with \(K\) equally probable cells, separate sample-mean calibration gives \(R - \sigma^2 = K\nu^2/M\) — every additional cell increases error while providing no geometric benefit.

A useful scaling law follows for an equal-probability design family with within-cell variance \(A/K^2\). Equal calibration allocation gives \(R(K) - \sigma^2 = \frac{A}{K^2} + \frac{A}{MK} + \frac{\nu^2 K}{M}\); when \(K \ll M\) and \(\nu^2 \gt 0\), balancing the dominant terms gives

\[
\boxed{
          K_{\mathrm{opt}} \approx \left(\frac{2AM}{\nu^2}\right)^{1/3},
          }
\]

subject to memory and sampling feasibility. Doubling useful resolution therefore requires approximately eight times the calibration budget, and the \(M^{-2/3}\) error scaling connects to classical nonparametric estimation rates. The refinement rule of §7 should thus optimize expected *measurement-error* reduction after calibration, rather than geometric distortion reduction alone.

### Extension 5 — Ray-path sensitivity contributes to dispersion through an inverse Hessian

This strengthens the phase-versus-group-delay discussion of §10. Parameterize admissible fixed-endpoint paths by a finite vector \(z\) with redundant coordinates removed, and define the accumulated phase

\[
\Phi(z,\omega) = \frac{\omega}{c}\int_{\gamma_z} n_p(\mathbf{x},\omega)\,d\ell.
\]

A smooth physical branch satisfies \(\nabla_z \Phi(z_\star(\omega),\omega) = 0\); assume the path Hessian \(H = \Phi_{zz}\) is invertible. For the stationary-path phase \(\phi(\omega) = \Phi(z_\star(\omega),\omega)\), group delay is \(\phi'(\omega)\) and group-delay dispersion is \(\phi''(\omega)\).

**Theorem 6 (Dispersion sensitivity).**

On the stationary branch,

\[
\boxed{
              T_g = \phi'(\omega) = \Phi_\omega = \int_{\gamma_{z_\star}} \frac{n_g}{c}\,d\ell,
              \qquad
              \frac{dT_g}{d\omega} = \Phi_{\omega\omega} - \Phi_{\omega z} H^{-1} \Phi_{z\omega}.
              }
\]

> **Proof.**
>
> Differentiating stationarity: \(H z_\star'(\omega) + \Phi_{z\omega} = 0\), so \(z_\star' = -H^{-1}\Phi_{z\omega}\). The first derivative of the stationary-path phase is \(\phi' = \Phi_\omega + \Phi_z z_\star' = \Phi_\omega\) because \(\Phi_z = 0\) on the stationary branch. Differentiating once more and substituting \(z_\star'\) proves the dispersion formula. (A)

The important asymmetry: path variation cancels from the *first* phase derivative but returns in the *second*. If \(H\) has a small eigenvalue \(\lambda\), with corresponding unit eigenvector \(e\), the path contribution includes \(-|e^\top \Phi_{z\omega}|^2/\lambda\), which can become large when frequency couples to a weakly constrained path deformation. The formula applies while the branch remains nondegenerate; at singularity, a different local treatment is needed.

Assessing bandwidth using material dispersion alone can therefore miss sensitivity caused by frequency-dependent ray bending. For a smooth branch over \(|\omega - \omega_0| \le h\), the mean-value theorem supplies the practical bound

\[
\boxed{
          \left|T_g(\omega) - T_g(\omega_0)\right| \le
          h \sup_{\text{band}} \left|\Phi_{\omega\omega} - \Phi_{\omega z} H^{-1} \Phi_{z\omega}\right|,
          }
\]

and requiring this to stay below the timing tolerance gives a concrete criterion for when one frequency-specific calibration table is adequate and when the frequency partition of §10 needs refinement.

### What the extensions change in the design

- **Extension 1:** recirculating instruments need history variables (lap counter, launch identity, or accumulated delay) beyond the five-dimensional state.
- **Extension 2:** validation must test autocorrelation and spectra after branch correction, not only residual variance; clock-like spectra can be geometric artifacts.
- **Extension 3:** the benchmark budget must count branch identity exactly; \(J\) branches cost \(J^2\) in MSE relative to identity-discarding compression.
- **Extension 4:** refinement must clear the calibration threshold of Theorem 5; the refinement rule should target post-calibration error, and constant-delay cells are strictly harmful.
- **Extension 5:** bandwidth assessment needs the inverse-Hessian dispersion sensitivity, not material dispersion alone.

## 16. Epilogue: Thursday afternoon

It is now Thursday afternoon. The intern has not discovered a new fundamental clock. The custom SoC is not fabricated. Nobody has proved that nature contains a subtler clock beneath the atomic clock. But something worthwhile has happened.

There is a reproducible optical model, a finite phase-space partition, a contiguous Ada memory arena, an explicit set of address invariants, and a test harness designed to send rays through a caustic. The prototype knows the difference between two rays meeting at the same place. It knows that the outer shells do not behave like the inner shells. It knows that the phase index and the group index are not interchangeable. And it knows that a successful memory lookup is not proof of a successful physical measurement.

The supervisor walks over. “Did you finish the five-dimensional array?”

The intern looks at the screen. “Well, technically, it’s a chart-aware discretization of a constrained Hamiltonian phase-space manifold, with canonical cell ownership, group-delay-aware indexing, and formally specified address bounds.”

The supervisor stares.

“Does it fit in memory?”

“Yes.”

“Does it work?”

“The encoder passes its current tests. The full proof and metrology validation are still pending.”

“Excellent. Can you make the boundary more elliptical?”

The intern closes their eyes. Somewhere, Fermat smiles. Somewhere else, Cauchy begins sharpening a pencil. And Ada, being Ada, asks whether the pencil is within its declared range.

### Three things the prototype does not settle

**1. Implementation verification scope.**

The released Ada/SPARK specification is machine-checked by GNATprove — 47/47 proof obligations discharged, 0 unproved, for the released three-chart encoder instance and its contract structure (Appendix A) — which closes Tier 1 for the released chart table. The chart table is a three-entry literal, so injectivity holds there by construction; the table-consistency predicate is not used as any subprogram’s precondition, the ghost `Global_Rank` entry point is an unimplemented stub, and the exhaustive bijection test is executed rather than verified. This does not cover the geometry preprocessor, the interrupt-time chart-table update path, or arbitrary chart tables; those remain outside the transcript’s scope and are stated as such. (C)

**2. Geometric preprocessing quality.**

The quality of the geometric preprocessing — quantified cell coverage and approximation error near caustics and deformed boundaries — is a numerical question the four-day schedule does not close (Tier 2, §11).

**3. Metrological benefit.**

Whether this architecture improves a real femtosecond measurement over a simpler baseline is a scientific question no data structure can answer on its own (Tier 3).

These are not failures of the prototype. They are the specific, testable claims on which it must eventually be judged. The intern writes them down. The supervisor reads the list. Then, after a long silence, asks one final question.

“Can you have those by Monday?”

Somewhere, Hamilton stops smiling. And the intern discovers a sixth dimension.

Overtime.

But now the intern also has a better answer than he had on Monday. *The optimal representation is not the one that stores the fewest coordinates or minimizes a single timing error. It is the least expensive representation that preserves every distinction the instrument may need to make.*

That is the paper. The intern started with an array and ended up with a constrained information-theoretic instrument-design problem.

## 17. Coda: six threads, one problem

Six threads were running in parallel: the caustic experiment, the branch-identity cost, the closed-ray obstruction, the calibration law, the hidden-branch spectrum, and the Allan-variance model. On the last page they turn out to be one problem.

The problem in one sentence: **a scientific instrument can lie to you because of how you store its measurements.** An optimization procedure that looks entirely successful under a conventional error metric can select a representation that is dramatically worse for the actual scientific measurement — because the metric never asked what the representation must *preserve*.

Optical state → Preserved identity → Residual dynamics → Clock stability

A memory representation does not merely store an instantaneous state. It decides which *histories* remain distinguishable. Those distinctions determine the residual after correction — and the residual’s temporal structure, not its variance alone, is what a clock feels.

This is the transition that changes what an optimal partition means. The distortion objective of §12 is a function of the distribution of optical states and their delays. A stability objective depends on how hidden branch identities *evolve over time*. Two partitions with identical one-sample distortion can therefore differ by orders of magnitude in measured instability at the averaging times the instrument actually uses.

### The two-branch model, carried one step further

Theorem 3 gave the spectrum of the two-branch residual \(R_t = aZ_t + \varepsilon_t\). What it implies for Allan variance is closed-form. For averaging time \(\tau\) (in samples), the expected Allan variance of the time residuals is

\[
\sigma_y^2(\tau) = \frac{\sigma^2}{\tau} + \frac{a^2\,\Phi(\rho,\tau)}{\tau^2},
          \qquad
          \Phi(\rho,\tau) = \tau + 2\sum_{h=1}^{\tau-1}(\tau-h)\rho^{h} - \rho\,\frac{(1-\rho^\tau)^2}{(1-\rho)^2}.
\]

with clean limits: \(\Phi \to \tau\) as \(\rho \to 0\) (independent branches — pure white residual, \(\sigma_y^2 = (a^2+\sigma^2)/\tau\)), and \(\Phi \to 0\) as \(\rho \to 1\) (a frozen branch is a DC offset, invisible to the second difference). The instability lives *between* the limits. (A)

A two-million-sample simulation agrees with the closed form to within 3% at every tested averaging time from \(\tau = 1\) to \(\tau = 1024\). (B) The consequence is brutal: with **identical MSE**, a near-persistent branch chain (\(\rho = 0.99\)) and independent branches (\(\rho = 0\)) differ by **94.6×** in Allan variance at \(\tau = 256\) — and the ranking *reverses* with the averaging window: at \(\tau = 8\) the persistent chain looks 0.2× *better* than a \(\rho = 0.5\) chain; at \(\tau = 256\) it is 31.7× worse. A cell that is benign at one averaging time is catastrophic at another.

Allan variance of the two-branch residual — σ²ₚ(τ) on log–log§17 · Extension 2 ρ — branch persistence

0.99

vs independent branches at τ = 256**—** vs ρ = 0.5 at τ = 256**—** crosses ρ = 0.5 at**—**

The partition optimizer therefore needs *temporal transition statistics* — not independent samples of \((Q,T_g)\). The pair \((a^2,\rho)\) is the compact expression of that requirement in the two-branch model; the refinement rule of §7 must target the pair, not the variance. An optical memory representation must preserve not only distinctions that affect instantaneous timing error, but also distinctions whose temporal persistence affects measured clock stability.

### The stability-aware objective

\[
\boxed{\begin{aligned}
          \min_{\mathcal{P},\{m_k\}} \quad
          & \mathbb{E}\!\left[(T_g - \widehat{T}_g)^2\right] \\
          \text{subject to} \quad
          & |\mathcal{P}| \le K_{\max}, \quad \textstyle\sum_{k=1}^{K} m_k \le M, \\
          & \mathcal{P} \text{ preserves chart ownership and required branch identity,} \\
          & \sigma_y^2(\tau) \le b(\tau) \qquad \text{for } \tau \in \mathcal{T},
          \end{aligned}}
\]

where \(\mathcal{T}\) is the instrument’s averaging window and \(b(\tau)\) its stability budget. Every ingredient already exists in this essay: Theorem 3 supplies the spectrum, Theorem 5 the calibration cost, and the two-branch model above the computable constraint. The winding-invariant of §15 supplies the same lesson from the other side — preserving instantaneous direction may not preserve accumulated path history, and the integer counters price exactly that history.

The correct representation of a physical measurement is determined by what distinctions the instrument must *preserve* — including distinctions that affect future temporal behavior — not just instantaneous reconstruction error.

**The decisive experiment (Averaging-time-dependent reversal).**

Hold instantaneous MSE fixed across two merged-cell corrections. Vary hidden-branch persistence \(\rho\). Demonstrate that the relative metrological performance of the two representations *reverses* as the averaging time \(\tau\) passes through a crossover. That is a much more informative result than increasing the \(1.75\times\) improvement — it shows the partition optimizer must be told the instrument’s averaging window, and it turns the six threads into one falsifiable statement.

That unification can be stated as a single criterion rather than five observations. An encoder *E* is **observable sufficient** for a required observable \(Y\) exactly when equal encodings imply equal observables, \(E(H_1)=E(H_2)\Rightarrow Y(H_1)=Y(H_2)\) — equivalently, exactly when some decoder can recover \(Y\) from memory at all. Under that one condition the caustic failure, finite-resolution aliasing, and the closed-ray obstruction are the same condition violated at three levels; preserving \(J\) branch identities costs exactly \(J^2=4^{\log_2 J}\), which is the per-bit price of identity rather than a separate phenomenon; and reserving history bits is free whenever calibration rather than address width is the binding resource. The full development, with the \((p_jC_j)^{1/3}\) allocation law and the open joint bound, is Appendix E.

The paper-level statement is now the unification of the caustic experiment, the branch-identity cost, the closed-ray obstruction, the calibration law, and the Allan-variance model. The intern’s Monday problem — where should the measurements live? — has become: *which histories must remain distinguishable for the clock to be read honestly?*

Memory layout is not a storage decision. It is part of the measurement physics.

## Appendix A — The released encoder and its GNATprove transcript

The released Ada/SPARK specification (chart_encoder.ads, body chart_encoder.adb) encodes the paper’s design intent: \(E(k,r) = B_k + r\) with consecutive intervals, the range bound, injectivity via a ghost lemma, and bijectivity from consecutiveness. The chart table is the immutable Experiment 4 table — \((B_0,N_0) = (0,512)\), \((B_1,N_1) = (512,256)\), \((B_2,N_2) = (768,256)\).

Specification — `chart_encoder.ads`

    --  Chart-aware contiguous memory encoder for discretized optical phase space.
    --  Companion artifact to "Chart-Aware Contiguous Memory for Discretized Optical
    --  Phase Space" (Sethurathienam Iyer, 2026).
    --
    --  Design intent (paper Sections 7-8):
    --    * E(k, r) = B(k) + r   with consecutive intervals B(0) = 0,
    --      B(k+1) = B(k) + N(k).
    --    * Range bound        : every address produced is < Arena_Size.
    --    * Injectivity        : distinct (chart, rank) pairs yield distinct addresses
    --      (relational property, proved via ghost lemma in body).
    --    * Coverage/bijectivity follows from consecutiveness of the intervals.
    --
    --  The chart table below is the concrete table used in Experiment 4:
    --  (B0, N0) = (0, 512), (B1, N1) = (512, 256), (B2, N2) = (768, 256).

    package Chart_Encoder with SPARK_Mode is

       Chart_Count : constant := 3;
       Arena_Size  : constant := 1024;

       type Chart_Id  is new Natural range 0 .. Chart_Count - 1;
       type Rank      is new Natural range 0 .. Arena_Size - 1;
       type Address   is new Natural range 0 .. Arena_Size - 1;

       --  Chart table (immutable at acquisition time; versioned per batch).
       Base     : constant array (Chart_Id) of Natural := (0, 512, 768);
       Cells    : constant array (Chart_Id) of Natural := (512, 256, 256);

       --  Contract on the raw table: intervals are consecutive and in bounds.
       Table_Is_Consistent : constant Boolean :=
         Base (0) = 0
         and then (for all J in Chart_Id =>
                     Base (J) + Cells (J) <= Arena_Size)
         and then (for all J in Chart_Id'First .. Chart_Id'Last - 1 =>
                     Base (Chart_Id'Succ (J)) = Base (J) + Cells (J));

       --  Total number of cells across all charts.
       Cell_Total : constant := 512 + 256 + 256;  --  = Arena_Size

       type Valid_Rank is new Natural range 0 .. Cell_Total - 1;

       --  The map from linear ranks within a chart to addresses is injective
       --  globally: this predicate expresses that (K, R) corresponds to a
       --  unique global rank, hence a unique address.
       function Global_Rank (K : Chart_Id; R : Valid_Rank) return Natural with
         Pre     => Natural (R) < Cells (K),
         Global    => null,
         Import,
         Ghost;
       --  Encoder: the ONLY address-producing primitive.
       --  The rank must lie within the chart's own cell count; the range bound
       --  then follows from the consecutive-interval table invariant.
       function Encode (K : Chart_Id; R : Valid_Rank) return Address with
         Pre  => Natural (R) < Cells (K)
                   and then Base (K) + Natural (R) < Arena_Size,
         Post => Natural (Encode'Result) = Base (K) + Natural (R);

       --  Decoder: reconstructs the canonical cell identity from an address.
       --  Establishes Tier 1 representational correctness: round trip.
       procedure Decode
         (A : Address;
          K : out Chart_Id;
          R : out Valid_Rank) with
         Post => Encode (K, R) = A;

    end Chart_Encoder;

The body adds a ghost lemma `Injectivity_Lemma(K1,R1,K2,R2)` whose precondition includes the pairwise-disjoint consecutive-interval table invariant and whose postcondition concludes \(K_1=K_2 \wedge R_1=R_2\).

GNATprove 14.1.1 — cvc5, Alt-Ergo, Z3

    Summary of SPARK analysis
    ---------------------------------------------------------------------------------
    SPARK Analysis results        Total      Flow      Provers   Justified   Unproved
    ---------------------------------------------------------------------------------
    Initialization                    2         2            .           .          .
    Run-time Checks                  29         .    29 (CVC5)           .          .
    Assertions                        9         .     9 (CVC5)           .          .
    Functional Contracts              6         .     6 (CVC5)           .          .
    Termination                       1         1            .           .          .
    ---------------------------------------------------------------------------------
    Total                            47    3 (6%)     44 (94%)           .          .

      Chart_Encoder          flow analyzed and proved (4 checks)
      Chart_Encoder.Encode   flow analyzed and proved (13 checks)
      Chart_Encoder.Decode   flow analyzed and proved (6 checks)
      Chart_Encoder.Injectivity_Lemma  analyzed and proved (21 checks)

The exhaustive runtime test (test_encoder.adb) additionally enumerates all 1,024 chart–rank pairs, confirms no duplicate addresses, checks that the union covers \([0,1024)\), and verifies the decode round trip. Both the specification and the transcript are released with the essay (code/chart_encoder.\*, code/gnatprove-transcript.txt). Scope: the proof applies to this chart table and contract structure; it does not cover the geometry preprocessor or the interrupt-time update path (§16).

## Appendix B — Contact geometry of the fixed-frequency manifold

The fixed-frequency optical manifold \(\mathcal{M}_{\omega_0}\) is a regular hypersurface in the cotangent bundle of three-dimensional space. The ambient cotangent bundle has a canonical one-form \(\lambda = \mathbf{p} \cdot d\mathbf{x}\); restrict it to the hypersurface, \(\alpha = \lambda|_{\mathcal{M}_{\omega_0}}\). For a smooth positive isotropic refractive index, this defines a *contact form*: its kernel is a maximally non-integrable four-dimensional plane field on the five-dimensional manifold. The associated Reeb vector field is tangent to the optical characteristic flow, its trajectories coinciding with the phase-generated ray trajectories up to reparameterization. The full six-dimensional phase space is symplectic, while its fixed-frequency optical hypersurface carries a natural contact structure; the relationship can be understood through symplectization, the positive radial extension of the contact hypersurface.

This explains why five dimensions arise so naturally: they are not merely the result of deleting one momentum coordinate from a six-dimensional array. They are the dimension of a contact manifold whose distinguished flow describes optical rays. None of this is necessary for the four-day prototype, but it suggests a deeper research direction — whether a discrete optical state representation can preserve useful contact-geometric invariants with controlled approximation error — which is far more ambitious than whether an Ada array can store five indices. It also explains why chart-aware addressing is geometrically natural, even though contact geometry alone does not prescribe a unique or optimal memory layout.

## Appendix C — Phase 2: after tea break

Phase 2 · after tea break · speculative

The main essay ends with an address map. Phase 2 is where the bullock cart gets hitched to something larger: the closed rays of §14.1 become periodic orbits, periodic orbits become a dynamical zeta function, the zeta function meets the primes, and a small graph is built and then broken on purpose. None of this is needed for the four-day prototype. The point is to mark exactly where a simple construction stops working, because that boundary is the only part of this that is worth anything.

### C.1 It started with a clock that wasn't broken

Two rays arrive at the same position from different directions. A three-dimensional index records their positions as identical. If the rays have different optical histories they carry different accumulated group delays, the memory merges them, the calibration subtracts a single correction, and a residual appears. The clock looks noisy. The clock is fine. The representation manufactured the noise.

The remedy is to store not merely where a ray is but where it is going, giving the five-dimensional state \(q=(x,y,z,\theta,\phi)\). The prototype assigned such states contiguous addresses in Ada/SPARK and discharged 47 proof obligations for a concrete encoder instance, and a synthetic partitioning experiment found a \(1.746\)-fold reduction in timing distortion against uniform angular binning. Both are reproducible. Both were audited, and the audit found that much of the \(1.75\times\) was ordinary nonuniform quantization rather than anything optical (§13); the paper now reports the budget sweep and the controls that bound it.

None of that was the strange part. The strange part appeared when we asked what happens when light comes back.

### C.2 The ray that returned home with more time

A ray in a closed trajectory returns to precisely the same position and propagation direction. Its instantaneous five-dimensional state is unchanged, \(q(t_1)=q(t_2)\). But it has travelled, and the journey took time, so its accumulated group delay has increased by one period

\[
G_\gamma=\oint_\gamma \frac{n_g(x,\omega)}{c}\,d\ell .
\]

After \(m\) circuits it has increased by \(mG_\gamma\), and the instantaneous state is still exactly the same. This is a deeper limitation than the caustic problem. At a caustic, two *directions* share a position, and moving from three coordinates to five distinguishes them. A closed orbit creates two different *histories* with the same position *and* the same direction. No instantaneous five-dimensional address can distinguish the number of completed circuits. Something must retain history — a lap counter, an accumulated-delay variable, a launch-event identity — and that is the first unexpected bridge to another mathematical world, because mathematics has an entire language for closed trajectories, their repetitions, and the information in their periods.

### C.3 The geometry hiding behind the light

At fixed optical frequency \(\omega_0\) the dispersion relation constrains \(\lvert p\rvert = n_p(x,\omega_0)/c\), so the fixed-frequency manifold is five-dimensional. On the cotangent bundle the canonical one-form is \(\lambda = p\cdot dx\); restricted to the manifold it gives \(\alpha=\lambda|_{M_{\omega_0}}\), which under the regularity assumptions of Appendix B is a contact form. Its Reeb field satisfies \(\alpha(R_\alpha)=1\) and \(\iota_{R_\alpha}d\alpha=0\), and its trajectories follow the characteristic rays up to reparameterization.

So a closed Reeb orbit already has a canonical period, and it is not a quantity we have to invent:

\[
\boxed{\;T_\gamma^{(p)}=\oint_\gamma\alpha=\oint_\gamma\frac{n_p}{c}\,d\ell\;}
\]

the closed-orbit phase travel time. The observable supplies a second invariant on the same orbits, \(G_\gamma=\oint_\gamma (n_g/c)\,d\ell\). These are related, not independent. With \(r(q)=n_g/n_p>0\),

\[
G_\gamma=\int_0^{T_\gamma^{(p)}} r\!\left(\phi^t q\right)dt,
\]

so group delay is a *weighted period* of the same flow: the group-delay spectrum is the phase spectrum pushed through the dispersion ratio. An innocent memory problem has produced two spectra of orbit invariants.

### C.4 A zeta function made from light

Let \(\mathcal P\) be the primitive closed optical trajectories — orbits that are not repetitions of a shorter one. For each, take the positive group-delay period \(G_\gamma\), fix a reference time \(T_*\), and form the Euler product

\[
\boxed{\;Z_{\mathrm{opt}}(s)=\prod_{\gamma\in\mathcal P}\left(1-e^{-sG_\gamma/T_*}\right)^{-1}\;}
\]

For suitable systems such products converge in a right half-plane and may continue analytically; for a general optical Reeb flow those properties have to be established, not assumed. The reason to use this particular expression is that it records repetitions automatically:

\[
\log Z_{\mathrm{opt}}(s)=\sum_{\gamma\in\mathcal P}\sum_{m=1}^{\infty}\frac{e^{-smG_\gamma/T_*}}{m},
          \qquad
          -\frac{Z'_{\mathrm{opt}}(s)}{Z_{\mathrm{opt}}(s)}=\sum_{\gamma\in\mathcal P}\sum_{m=1}^{\infty}\frac{G_\gamma}{T_*}e^{-smG_\gamma/T_*}.
\]

The index \(m\) counts traversals. Define the periodic-orbit delay distribution \(\Theta_{\mathrm{opt}}(t)=\sum_\gamma\sum_{m\ge1}G_\gamma\,\delta(t-mG_\gamma)\); its Laplace transform is proportional to the logarithmic derivative. So the zeta function *is* the packaging of closed-ray delays, and its logarithmic derivative recovers the primitive orbits with their repetitions.

Notice the reversal. The memory architecture struggled because the instantaneous state forgot how many circuits had occurred. The dynamical zeta function is organized entirely around that repetition information. The missing historical distinction that broke the address map is the central index of the orbit description.

### C.5 The primes enter the room

For \(\Re(s)>1\) the Riemann zeta function is \(\zeta(s)=\prod_p(1-p^{-s})^{-1}\), with logarithmic derivative \(-\zeta'/\zeta=\sum_p\sum_m(\log p)p^{-ms}\). Put the two side by side and the architecture is the same:

**Table.** Optical dynamics and arithmetic occupy corresponding positions

| Optical dynamics                    | Arithmetic               |
|-------------------------------------|--------------------------|
| primitive closed orbit \(\gamma\) | prime \(p\)       |
| repeated orbit \(\gamma^m\)         | prime power \(p^m\) |
| dimensionless period \(G_\gamma/T_*\)   | \(\log p\)             |
| optical Euler product               | Riemann Euler product    |

If a closed orbit had \(G_{\gamma_p}=T_*\log p\) its Euler factor would be exactly \((1-p^{-s})^{-1}\). That is the first precise connection — not that rays *are* primes, but that primitive orbits and primes occupy corresponding positions in two Euler-product constructions. The correspondence is well established in dynamical systems, Selberg theory and quantum chaos. The interesting question is whether it can be made into a useful model.

So we built one.

### C.6 The first bullock cart: one loop per prime

Assign one optical loop to each prime, with length \(L_p=(cT_*/n_g)\log p\). Its group-delay period is then \(G_p=T_*\log p\), so the Euler product over these loops is exactly the truncated Riemann product \(Z_N(s)=\prod_{p\le p_N}(1-p^{-s})^{-1}\). For \(T_*=1\) ns and \(n_g=1.5\):

**Table.** One loop per prime, \(T_*=1\,\mathrm{ns}\), \(n_g=1.5\)

| prime | loop length |
|-------|-------------|
| 2     | 13.85 cm    |
| 3     | 21.96 cm    |
| 5     | 32.17 cm    |
| 7     | 38.89 cm    |
| 11    | 47.92 cm    |
| 13    | 51.26 cm    |

This looks exciting for about five seconds. We encoded the primes into the loop lengths by hand. The system did not discover them; it was handed them. And a finite Euler product cannot reproduce the nontrivial zeros of the analytically continued \(\zeta(s)\). The construction demonstrates the dictionary and nothing else. The real question is whether a small network can generate prime-like orbit lengths *automatically*.

### C.7 A three-loop machine, and an exact obstruction

Take a bouquet: one junction, three loops of lengths \(\ell_1,\ell_2,\ell_3\). A trajectory follows symbolic sequences — \(a\), \(b\), \(ab\), \(abc\), \(aab\), \(abac\) — and a closed word has length \(L(w)=n_1\ell_1+n_2\ell_2+n_3\ell_3\). Identify cyclic rotations and exclude words that repeat a shorter block, and the primitive cyclic words model primitive periodic orbits. Three numbers now generate infinitely many orbits; we no longer need one loop per prime.

But every orbit length lies in the additive group \(\Lambda=\mathbb Z\ell_1+\mathbb Z\ell_2+\mathbb Z\ell_3\), while the logarithms of distinct primes are linearly independent over the rationals. Suppose \(\sum_j q_j\log p_j=0\) for rational \(q_j\); clear denominators and exponentiate to get \(\prod_j p_j^{m_j}=1\), and unique factorization forces every \(m_j=0\). So a finite-rank additive length system cannot exactly contain the logarithms of arbitrarily many distinct primes.

> **Theorem (finite-graph obstruction).** No finite optical graph with additive edge-length weights realizes \(C\log p\) as orbit periods for all primes. Any exact construction must leave the finite-metric-graph, additive-travel-time regime. (A)

This is the first bullock-cart casualty, and it is a good one: it tells us exactly which kind of system cannot possibly work. The escapes are an infinite graph, a non-additive or state-dependent weight, or an operator whose spectrum encodes arithmetic without the classical lengths literally being \(\log p\).

### C.8 Fitting the first fifty prime logarithms

Finite-window approximation still survives, so we tested it. Enumerating primitive cyclic words to word-length eleven (25,486 orbits) and optimizing only the three lengths against \(\log 2,\log 3,\log 5,\dots\) gives

\[
\ell_1=0.71745,\qquad \ell_2=1.13196,\qquad \ell_3=1.66210,
\]

with RMS relative error \(1.48\%\) and worst case \(4.96\%\) over the first fifty primes. These are dimensionless lengths specific to the chosen enumeration. The fit is a shallow local optimum — independent restarts land at \((0.7185,1.1309,1.6672)\) with \(1.49\%\) and \(h=0.99903\) rather than \(1.00013\) — so the lengths are determined to about three figures and the entropy to about \(0.1\%\). (B)

The next observation explained why such a fit works at all. For a three-symbol suspension the topological entropy solves \(e^{-h\ell_1}+e^{-h\ell_2}+e^{-h\ell_3}=1\), and the fitted lengths give \(h\approx1.00013\). Remarkably close to one.

### C.9 The prime number theorem hiding in orbit growth

Why does one matter? Because the prime number theorem says \(\pi(x)\sim x/\log x\); substitute \(x=e^T\) and it becomes \(\pi(e^T)\sim e^T/T\). For a hyperbolic flow the prime-orbit theorem gives \(N_{\mathrm{orb}}(T)\sim e^{hT}/(hT)\). At \(h=1\) both leading laws are \(\boxed{N(T)\sim e^T/T}\).

That is the real explanation for the success of the finite-window fit, and it is a classical result, not a discovery. Inverting these counting functions produces approximately logarithmic growth for the ordered orbit periods and for the logarithms of successive primes; the two sequences have compatible large-scale structure. A tiny three-loop model can imitate the coarse growth of prime logarithms.

It was tempting to report \(h\approx1\) as evidence that the system self-organises to the entropy the primes require. It is not, and this is worth stating precisely because it is the error most likely to be published.

> **Proposition (\(h=1\) is forced, not found).** Suppose a hyperbolic flow satisfies \(\pi_{\mathrm{orb}}(T)\sim e^{hT}/(hT)\) and its primitive periods satisfy \(L_n\sim\log p_n\). Then \(h=1\).
>
> *Proof.* Evaluate the counting function at \(T=\log p_n\). The left side is \(n\); the right side is \(e^{h\log p_n}/(h\log p_n)=p_n^{h}/(h\log p_n)\). Since \(n\sim p_n/\log p_n\), agreement requires \(p_n^{h}/h\sim p_n\), i.e. \(p_n^{h-1}\sim h\), which forces \(h=1\). (A)

The optimiser was handed the answer. Matching \(L_n\) to \(\log p_n\) forces the counting law to agree asymptotically, and the counting law is what pins \(h\). The departure from unity is the finite window, not signal. The methodological lesson is the useful part: **leading-order agreement is automatic and therefore worthless as evidence**, so anything real has to live in the fluctuation.

### C.10 Where the machine broke

So we tested the fluctuation. At \(T=11.8\), with \(e^T=133{,}252\), the leading counts are close: \(\pi(e^T)=12{,}434\), \(\operatorname{Li}(e^T)=12{,}481\), and \(12{,}496\) primitive orbits below \(T\). The orbit count sits within \(0.12\%\) of \(\operatorname{Li}\) — exactly as the entropy argument predicts.

The residual structure does not agree. Comparing \(R_{\mathrm{prime}}(T)=\pi(e^T)-\operatorname{Li}(e^T)\) with \(R_{\mathrm{orb}}(T)=N_{\mathrm{orb}}(T)-\operatorname{Li}(e^T)\) after normalizing the graph entropy to one:

**Table.** Correlation between prime-counting and orbit-counting residuals

| comparison                  | correlation |
|-----------------------------|-------------|
| raw counting residuals      | +0.13       |
| normalized residuals        | +0.12       |
| first-differenced residuals | −0.04       |

The first-difference correlation is the decisive one, and it is zero. (We no longer report a log-power spectral correlation: binned log spectra of two smooth residuals correlate almost arbitrarily depending on the binning, so it is not a well-defined statistic.) The graph reproduces the coarse growth and none of the arithmetic fluctuation. (B)

> **The separation this establishes.** Exponential orbit proliferation \(\neq\) Riemann-zero arithmetic structure. Topological entropy controls the leading proliferation of periodic orbits; it does not produce the delicate correlations encoded by the nontrivial zeros. RH is not a statement that primes grow at roughly the right rate — it is a statement about where the zeros sit, with consequences for the error term in prime counting.

Three-loop machine: prime number theorem's neighbourhood reached, Riemann Hypothesis not reached. That distinction is the most valuable result in Phase 2, because it is the one that prevents a seductive false conclusion.

### C.11 From optical orbits to a wave spectrum

Optics is a wave phenomenon, so the real question is whether the orbit structure survives into a wave spectrum. Quantum graphs answer it exactly. A metric graph with a self-adjoint Laplacian has a secular equation \(\det(I-U(k))=0\) combining bond propagation phases with vertex scattering, and admits an exact periodic-orbit trace formula splitting the density of states into a smooth Weyl part and an oscillatory orbit sum:

\[
\delta\rho(k)=\frac1\pi\operatorname{Re}\sum_{\gamma}\sum_{m\ge1}L_\gamma A_\gamma^m e^{imkL_\gamma}.
\]

For the three-loop bouquet with Kirchhoff–Neumann conditions at the single vertex the secular equation collapses to something we can write down:

\[
\sum_{i=1}^{3}\tan\!\left(\frac{k\ell_i}{2}\right)=0 .
\]

Counting roots below \(k=1200\) with \(L=\sum\ell_i=3.51151\): the Weyl law predicts \(LK/\pi=1341.30\) eigenvalues counted with multiplicity, and enumeration gives \(1340\). The distinct wavenumbers number \(670\), against \(LK/(2\pi)=670.65\) — the factor two being root multiplicity, worth stating because "number of resonances" is otherwise ambiguous by exactly that factor. (A)

Subtract the smooth Weyl density and Fourier-transform the spectral residual, and peaks appear in the length domain. The first twenty prime-log targets matched detected peaks to \(1.94\%\) RMS, primitive-orbit support for the first thirty to \(1.74\%\), and a control set of 500 random entropy-one three-loop length assignments gave a median error of \(5.66\%\) with none outperforming the tuned graph. (B)

These are *optimised numerical agreements*, not evidence for RH: the lengths were fitted using prime information, and nearest-peak matching is sensitive to spectral crowding, degeneracy and resolution. What the experiment does establish is narrower and still useful — **the designed classical length structure leaves an observable fingerprint in the wave spectrum**, which is the classical-to-wave correspondence any real optical experiment would need.

### C.12 Why blackbody radiation suddenly made sense

A blackbody's Planck law is usually written as a smooth function of frequency, but underneath it lies a count of modes. With occupation \(\bar E(\omega,T)=\hbar\omega/(e^{\hbar\omega/k_BT}-1)\) and density of states \(\rho=\bar\rho_{\mathrm{Weyl}}+\delta\rho_{\mathrm{orbit}}\),

\[
u(\omega,T)=u_{\mathrm{smooth}}(\omega,T)+\bar E(\omega,T)\,\delta\rho_{\mathrm{orbit}}(\omega).
\]

The smooth part reflects average mode density; the correction carries geometry-dependent spectral structure. A cavity's closed trajectories influence its wave spectrum, its wave spectrum influences its equilibrium thermal energy, and the thermal spectrum can therefore carry information about closed rays. Broadening the graph's discrete resonances with Gaussians and using occupation \(\omega/(e^{\omega/T}-1)\), the illustrative residual was about \(43\%\) of the smooth component's RMS at \(T=55\), \(\sigma=0.45\). (B)

That percentage is not a physical prediction — it depends on arbitrary broadening, temperature, window, coupling, and on things we did not model at all (emissivity, loss, port coupling, detector response). The surviving point is conceptual: a thermal spectrum *can* inherit the periodic-orbit fingerprint of the underlying wave system. The parallel with the primes is the shared architecture — a smooth counting law, a discrete underlying spectrum, and corrections carrying geometric or arithmetic information — not any identity of laws.

### C.13 The Ihara–Bass detour, and why the critical line does not transfer

Graphs carry a second zeta function whose product over primitive non-backtracking cycles becomes a finite determinant:

\[
\boxed{\;Z_G(u)^{-1}=(1-u^2)^{m-n}\det\!\left(I-uA+u^2(D-I)\right)=\det(I-uB)\;}
\]

with \(A\) adjacency, \(D\) degree, and \(B\) the non-backtracking Hashimoto matrix. An infinite-looking product over primitive cycles becomes a finite-dimensional determinant — precisely the orbit-to-spectrum move one wants. For a \((q+1)\)-regular graph the Ihara zeta has a Riemann-Hypothesis analogue: in the Ramanujan case the nontrivial poles lie on \(\lvert u\rvert=q^{-1/2}\), and under \(u=q^{-s}\) that circle becomes \(\Re(s)=\tfrac12\). (A)

It is essential that this is *not* a consequence of unitarity of a scattering matrix. The graph-theoretic critical-line statement depends on a specific spectral bound tied to the Ramanujan property, and the secular determinant of a self-adjoint quantum graph and the Ihara–Bass determinant are related members of one spectral-graph family, not interchangeable formulas. A shared critical-line notation obtained by substituting \(u=q^{-s}\) transports no proof. What would be needed is a genuine identity between the analytic continuations of the relevant spectral objects.

This is the guardrail that stops us from accidentally proving RH by changing variables.

### C.14 The mysterious one-half

Still, the factor \(\tfrac12\) turns out to be cheap to manufacture. If each edge traversal carries magnitude \(e^{-\ell_e/2}\), an orbit traversing several edges has \(\lvert A_\gamma\rvert=\prod_e\lvert a_e\rvert=e^{-L_\gamma/2}\). With \(L_\gamma=\log p\) and an oscillatory phase,

\[
A_\gamma e^{-itL_\gamma}=p^{-1/2-it},
\]

which is exactly the arithmetic exponent on the critical line. So a graph can generate the attenuation automatically through multiplicative propagation.

Three caveats, and they matter. It is *not* automatically compatible with unitary quantum-graph scattering: orbit amplitudes are products of scattering-matrix entries, and their magnitudes cannot be assigned independently without checking the constraints. And inserting \(e^{-L/2}\) does not show that any determinant's zeros lie on the critical line — it reproduces one formal piece of the desired arithmetic weighting. In the Ihara and Selberg settings the exponent comes *out* of a spectral bound; here we *put it in*. That is the difference between a consequence and a parameter.

So there are three separate engineering objectives: generate appropriate primitive lengths, generate appropriate amplitudes and phases, and construct a spectral determinant with the required analytic and self-adjoint structure. The first two are inverse-design problems. The third is where the Riemann Hypothesis becomes genuinely formidable.

### C.15 Why Hilbert–Pólya is still a mountain

The idea asks whether the nontrivial zeros can be read as the spectrum of a self-adjoint operator: if \(H\psi_n=\gamma_n\psi_n\) and every nontrivial zero has the form \(\rho_n=\tfrac12+i\gamma_n\), self-adjointness forces the \(\gamma_n\) real and proves RH. The difficulty is not finding a self-adjoint operator with an interesting spectrum — those are abundant. It is establishing the exact correspondence with *all* nontrivial zeros, with the correct multiplicities and no unwanted spectral objects.

Our graph has a self-adjoint Laplacian, real eigenvalues, a periodic-orbit trace formula, a dynamical zeta function, and lengths tunable to resemble prime logarithms over a finite range. None of that identifies its spectral determinant with the completed zeta function. The explicit formula carries precise prime-power weights, zero contributions, analytic continuation, functional-equation structure and correction terms; a generic graph trace formula acquires none of these from having many orbits or unit entropy.

The residual experiment made the limitation visible. We matched the leading growth remarkably well and the fluctuations not at all. That is a miniature demonstration of the difference between reproducing a prime-number-theorem-like asymptotic and reproducing the arithmetic information associated with the zeros.

### C.16 What the experiments actually established

Separating the mathematics from the numerics:

**Table.** Status of each element

| element                                                               | status                     |
|-----------------------------------------------------------------------|----------------------------|
| contact description of optical characteristics; additivity of periods | established (A)          |
| finite-graph obstruction                                              | exact, elementary (A)    |
| \(h=1\) forced by the objective                                  | exact, elementary (A)    |
| quantum-graph trace formula; Weyl counting; Ihara–Bass identity       | prior literature (A)     |
| three-loop fit; spectral peak matching; thermal residual              | exploratory numerics (B) |
| fluctuation failure                                                   | negative result (B)      |
| connection to the Riemann Hypothesis                                  | analogy and direction      |

The most useful outcome was not an apparent triumph. It was finding exactly where a simple construction stopped. A model matching the prime number theorem's leading term but failing its fluctuations says exponential orbit proliferation is insufficient. A finite edge-length module that cannot contain every prime logarithm says exact arithmetic encoding cannot emerge from that architecture. A weighted graph reproducing \(p^{-1/2-it}\) formally still owes an operator-theoretic account of its zeros. Each obstruction narrows the search, which is productive.

And the next experiments should stop fitting more prime logarithms — that only polishes a finite-window fit. The objective should move from orbit locations to spectral structure: optimize a trace-formula residual with terms for lengths, amplitudes, phases and spectrum, subject to actual scattering constraints rather than free amplitudes, and penalize unmatched short orbits, because matching a few desired trajectories means nothing if the graph also produces a far larger population of undesired ones. Two directions are more deeply founded than a small bouquet: hyperbolic surfaces, where Selberg's trace formula ties closed geodesics to Laplacian eigenvalues rigorously; and a return to optics, building a refractive-index field with a controlled family of closed rays and studying its resonances.

### C.17 The unexpected return to memory

After all this, the strangest realization is that we have come back to the original problem. At a caustic, different directions share a position. On a closed orbit, different traversal histories share an instantaneous state. Both failures have the same shape: the representation identifies objects the measurement needs to distinguish, and the remedy is not more numerical precision but the correct state distinctions.

The periodic-orbit viewpoint says it again in another language. A primitive orbit and its repetitions are not interchangeable, and the distinction between \(\gamma,\gamma^2,\gamma^3,\dots\) is exactly what the Euler product organizes — just as primes and prime powers play distinct roles in the logarithmic derivative. The analogy does not make optical rays arithmetic objects. It does exhibit a shared principle: **the identities and repetitions of fundamental objects matter, and a representation that collapses them discards information that cannot be recovered afterwards.** In the instrument that loss appears as false timing noise; in a periodic-orbit calculation it destroys the orbit spectrum; in a spectral determinant incorrect multiplicities produce an entirely different analytic function.

> **The clock was never broken. The memory was.** And while fixing the memory, we ended up staring at the primes.

Technical note: the three-loop fits, spectral counts, residual correlations and thermal values above are exploratory numerical results from the toy models discussed. They are not independent confirmations, and the RH-adjacent constructions are not proofs or new claims about the nontrivial zeros.

## Appendix D — Memory is a cocycle

Phase 2b · the rigorous core

Everything in Appendix C was motivated by a speculation about primes. This appendix drops the speculation entirely and shows that the original memory problem already contains a rigorous theorem. The closed-ray obstruction is not a software limitation and does not need RH to be interesting: it is a statement in cohomology.

### D.1 The closed-orbit delay obstruction

Let \(M\) be a smooth optical state manifold, \(\phi^t:M\to M\) the smooth ray flow generated by a vector field \(X\), and \(f:M\to(0,\infty)\) a continuous delay accumulation rate, with accumulated delay

\[
D(x,T)=\int_0^T f(\phi^t x)\,dt .
\]

> **Theorem.** If the flow has a periodic orbit \(\gamma\) of period \(P>0\), there is no globally defined \(C^1\) function \(u:M\to\mathbb R\) satisfying \(Xu=f\). (A)
>
> *Proof.* Suppose such a \(u\) exists. Along the periodic orbit, \(\frac{d}{dt}u(\phi^t x)=(Xu)(\phi^t x)=f(\phi^t x)\). Integrating over one period gives \(u(\phi^P x)-u(x)=\int_0^P f(\phi^t x)\,dt\). But \(\phi^P x=x\), so the left side is zero, while the right side is strictly positive because \(f>0\). Therefore \(0=\int_0^P f\,dt>0\), a contradiction. ∎

The consequence is immediate: no instantaneous-state potential can reproduce positive accumulated delay along every trajectory when a closed ray exists. This is not an implementation bug. It is a mathematical impossibility under the stated assumptions, and it holds for any positive delay rate — no optical modelling required.

### D.2 Memory is a cocycle

Accumulated delay satisfies

\[
D(x,T+S)=D(x,T)+D(\phi^T x,S),
\]

the additive *cocycle* identity. If the delay could be expressed entirely through instantaneous states it would have the form \(D(x,T)=u(\phi^T x)-u(x)\), which is called a *coboundary*. The theorem above proves that positive delay around a closed ray is not a coboundary. Hence:

> **Accumulated delay is a nontrivial dynamical cocycle.** The optical state tells us where the ray is; the cocycle tells us what it has accumulated getting there. Those are fundamentally different kinds of information, and no amount of address refinement converts one into the other.

### D.3 A concrete example

Take the simplest closed optical trajectory: a circle. Let \(M=S^1\) with \(\dot\theta=1\), and a nonuniform but everywhere-positive delay rate

\[
f(\theta)=1+0.2\cos\theta+0.1\sin(2\theta).
\]

The cosine and sine terms integrate to zero over a full revolution, so

\[
D(\theta,2\pi)=\int_0^{2\pi} f(\theta+t)\,dt=2\pi,
          \qquad
          D(\theta,6\pi)=6\pi,
\]

while the state returns to exactly the same angle after each revolution. Numerical integration confirms \(6.283185307179586\), matching \(2\pi\) to machine precision. The example is elementary, and that is the point: the mechanism needs no complicated optical assumptions.

### D.4 The connection to Livšic theory

Here the mathematics deepens. For certain hyperbolic systems, Livšic-type theorems establish that vanishing integrals over *every* periodic orbit are sufficient — under appropriate regularity and dynamical hypotheses — for a function to be a coboundary:

\[
\left[\;\forall\gamma,\;\oint_\gamma f\,dt=0\;\right]\;\Longrightarrow\;f=Xu .
\]

Our positive group delay fails that hypothesis immediately, so it is obstructed. But the theorem also suggests a constructive decomposition. Pick a reference accumulation rate \(a\) and ask whether \(f-a=Xu\). If it holds, then

\[
\boxed{\;D(x,T)=\underbrace{aT}_{\text{elapsed history}}+\underbrace{u(\phi^T x)-u(x)}_{\text{state-dependent correction}}\;}
\]

For a periodic orbit of period \(P\) this requires \(\oint_\gamma f\,dt=aP\). So a single constant \(a\) works only if every periodic orbit has the same mean delay rate. More generally, the periodic-orbit averages constrain precisely which history-dependent components can be eliminated by a change of representation.

That is a design principle for the original problem: **remove the coboundary component, but retain enough history to reconstruct the non-coboundary component.** It also explains why the four-day prototype could not have done better than it did — a general flow need not admit a single lap counter, nor any finite-dimensional history variable valid for all trajectories, unless those periodic-orbit mean rates are degenerate, which for a genuinely dispersive medium they are not.

We should be careful to distinguish a mathematically minimal representation from a physically practical one, and correspondingly to state what is proved from what is proposed. The theorem above and the cocycle identity are proved under only smoothness and positivity. The Livšic-based characterisation of the removable component requires hyperbolicity and regularity hypotheses we have not verified for the optical flow, and a memory-minimality theorem would need the encoder and reconstruction requirements formalised — which the prototype does not do.

But this much is settled, and it is a stronger foundation than the prime-number excursion: **the optical memory problem leads on its own to a cohomological obstruction, and the periodic-orbit machinery supplies the language for stating exactly which information cannot be discarded.**

## Appendix E — One criterion instead of three techniques

The framework · observable-sufficient representation

Everything above reads like four separate techniques: a geometric lifting, an encoder, a rate–distortion allocation, and a history obstruction. This appendix shows they are one statement. That matters, because a list of techniques is a toolkit while a single criterion is a theory.

### E.1 The criterion

Let \(\mathcal H\) be a set of admissible physical *histories* — the datum a real acquisition records: a trajectory segment, its initial state, its accumulated propagation, and any branch label. Let \(E:\mathcal H\to\mathcal A\) be the encoder into memory, and \(Y:\mathcal H\to\mathcal Y\) the observable the instrument must actually report. The instantaneous five-dimensional state \(q\) is only a *summary* of a history, never the whole of it.

> **Theorem (exact observable factorization).** There exists a decoder \(g:E(\mathcal H)\to\mathcal Y\) with \(Y=g\circ E\) if and only if
>
> \(E(H_1)=E(H_2)\;\Longrightarrow\;Y(H_1)=Y(H_2)\)
>
> for all admissible histories \(H_1,H_2\). (A)
>
> *Proof.* If \(Y=g\circ E\) and \(E(H_1)=E(H_2)\), then \(Y(H_1)=g(E(H_1))=g(E(H_2))=Y(H_2)\). Conversely, if the implication holds, define \(g(a)=Y(H)\) for any \(H\) with \(E(H)=a\); the hypothesis makes \(g\) well defined on \(E(\mathcal H)\), and \(Y=g\circ E\) by construction. ∎

Call \(E\) *observable sufficient* for \(Y\) when that hypothesis holds. The theorem is elementary — it is the universal property of factoring a map through a quotient — but it draws the exact boundary of admissible compression: **an encoder may merge two histories precisely when the instrument cannot tell them apart in the quantity it must report, and not one history more.**

When several outputs are mandatory, take \(Y=(T_g,B,Q,\dots)\) with \(B\) the ray-branch identity and \(Q\) any further invariant. That single move converts "preserve physical identity" from a slogan into a reconstruction contract, and it is the reason the branch constraint in §13 could be stated as a constraint at all rather than as good intentions.

### E.2 The two failures are the same failure

*Spatial aliasing.* At a caustic two histories share a position, so \(E_{3\mathrm D}(H_1)=E_{3\mathrm D}(H_2)\), but different directions give different delays, so \(Y(H_1)\neq Y(H_2)\). The three-dimensional encoder fails the theorem. The residual it induces is exactly the \(\operatorname{Var}_U(T_g)\) of Experiment 1, which the instrument reports as timing noise. Lifting to the five-dimensional \(\mathcal M_{\omega_0}\) restores sufficiency for single-pass geometry.

*Historical aliasing.* On a closed trajectory \(q(P)=q(0)\), so even \(E_{5\mathrm D}(H_1)=E_{5\mathrm D}(H_2)\) — while \(Y(H_2)-Y(H_1)=\oint_\gamma (n_g/c)\,d\ell>0\). The five-dimensional encoder fails the same theorem. And Appendix D says why no refinement of it can ever succeed: the delay is a nontrivial cocycle, so the required decoder does not exist for *any* encoding that factors through the instantaneous state.

*Finite resolution.* Distinct states share a cell, so the encoder merges histories whose delays differ within the cell. Same condition, violated at a representational rather than geometric level.

**Table.** Three aliasing modes, one criterion

| limitation            | violated condition                                        | response                   |
|-----------------------|-----------------------------------------------------------|----------------------------|
| spatial aliasing      | \(E_{3\mathrm D}\) merges histories with different \(Y\) | lift to \(\mathcal M_{\omega_0}\)       |
| quantization aliasing | finite cells merge distinguishable states                 | constrained allocation     |
| historical aliasing   | cocycle does not factor through \(q\)              | retain a history invariant |

Three rows, one condition, and in each row the engineering response is forced rather than chosen.

### E.3 Identity costs bits, and that is the whole of \(J^2\)

Theorem 11 was stated for \(J\) equal branches carrying a uniform delay of width \(W\). It generalizes. Suppose branch \(j\) has probability \(p_j\), and that at high rate the squared-error distortion of a scalar quantizer with \(K_j\) cells on branch \(j\) is \(C_jK_j^{-2}\) (for a uniform width-\(W\) branch, \(C_j=W^2/12\)).

> **Proposition (general branch-preservation cost).** Under a total cell budget \(\sum_j K_j=K\), the optimal allocation is \(K_j\propto(p_jC_j)^{1/3}\), giving
>
> \(\displaystyle D_{\mathrm{branch}}^\star(K)=\frac{\left(\sum_{j=1}^{J}(p_jC_j)^{1/3}\right)^{3}}{K^{2}} .\)
>
> *Proof.* Minimize \(\sum_j p_jC_jK_j^{-2}\) subject to \(\sum_jK_j=K\). Stationarity gives \(-2p_jC_jK_j^{-3}=\lambda\), hence \(K_j\propto(p_jC_j)^{1/3}\); substituting \(K_j=K(p_jC_j)^{1/3}/S\) with \(S=\sum_i(p_iC_i)^{1/3}\) yields \(D^\star=S^3/K^2\). ∎ (A)

Equiprobable branches with a common \(C\) give \(S=J^{2/3}C^{1/3}\), so \(D^\star_{\mathrm{branch}}/D_{\mathrm{pooled}}=J^2\) — Theorem 11 recovered as a corollary.

State the qualification plainly, because it is what makes the result defensible: this is a *high-rate* result for squared-error scalar quantization of overlapping branch distributions under a shared cell budget. It is not a universal penalty for preserving identity, and it does not apply when branch-conditioned distributions are disjoint, where pooling is already lossless.

Now the part we did not expect to find. Distinguishing \(J\) branches needs \(\lceil\log_2 J\rceil\) bits of the address, so the effective cell count falls from \(K\) to \(K/J\) and distortion rises by exactly \((K/(K/J))^2=J^2=2^{2\log_2 J}\). So \(J^2\) is not a new phenomenon at all: **it is the per-bit price of identity**, evaluated at \(b=\log_2 J\) bits. The branch preservation result and the history-bit result below are one theorem wearing two costumes.

### E.4 What a history bit actually costs

Reserve \(b\) bits of a fixed \(B\)-bit address for a history invariant — say a lap counter with \(b=\lceil\log_2(R+1)\rceil\) for up to \(R\) traversals. Then \(K\le 2^{B-b}\), and the calibration model of §11 reads \(R(K)-\sigma^2=A/K^2+A/(MK)+\nu^2K/M\).

It is tempting to conclude that each history bit multiplies distortion by four, since \(K\mapsto K/2\) doubles the \(A/K^2\) term. That conclusion is only sometimes right. Compare the reserved bit against the calibration-optimal cell count \(K_{\mathrm{opt}}\approx(2AM/\nu^2)^{1/3}\):

> **Proposition (cost of history bits).**
>
> **(i)** If \(K_{\mathrm{opt}}\le 2^{B-b}\) the address budget does not bind, the optimal cell count is \(K_{\mathrm{opt}}\), and the optimal error is *independent of \(b\)*. Reserved history bits are free — calibration, not address width, is what limits resolution.
>
> **(ii)** If \(K_{\mathrm{opt}}>2^{B-b}\) the address binds and \(K=2^{B-b}\), so
>
> \(\displaystyle R(b)-\sigma^2=\frac{A\,2^{2b}}{2^{2B}}+\frac{A\,2^{b}}{2^{B}M}+\frac{\nu^2}{M}2^{B-b}.\)
>
> The quantization term grows by exactly \(2^{2b}\), but the calibration term *decays* by \(2^{-b}\). The net penalty is therefore strictly below \(2^{2b}\), and is *negative* for sufficiently large \(\nu^2\). (A) (B)

Part (i) is the practically important one, and it resolves an apparent tension: **adding a lap counter is often nearly free, because the binding constraint was never the address width.** Part (ii) is stranger still — coarsening a partition can *reduce* total measurement error when calibration is noisy, which is the same mechanism as the constant-delay counterexample in §15, seen from the other direction. Cells cost calibration samples, and that cost can dominate the resolution they buy.

So the four-line slogan "each bit costs 4×" is really a statement about the address-limited, calibration-free regime. Outside that regime it is wrong in a way that matters for design.

### E.5 The thesis, and the honest gap

The whole paper now condenses into one sentence and one constrained program:

> **A scientifically valid measurement representation is an encoding of histories whose fibres respect the required observable equivalence classes, subject to finite hardware and calibration resources.**

\[
\begin{aligned}
          \min_{E,\,g,\,K,\,b,\,\{m_k\}}\quad & \mathbb{E}\bigl[d(Y,g(E(H)))\bigr]+\sum_k\frac{p_kv_k}{m_k}\\
          \text{subject to}\quad & E(H_1)=E(H_2)\Rightarrow Y(H_1)=Y(H_2),\\
          & \log_2K+b\le B,\qquad \sum_k m_k\le M .
          \end{aligned}
\]

Equivalently, by the factorization theorem: *choose the coarsest encoding whose fibres sit inside the level sets of \(Y\), then spend the remaining address and calibration budget optimally.* On this reading topology, branch identity, address capacity, calibration budget and observable distortion are not independent knobs but coupled resources — which is exactly the claim of §13 made precise rather than asserted.

What is missing is a single lower bound coupling all four. The components are individually known: \(J^2\) for identity, \(2^{2b}\) for reserved history bits in the address-limited regime, and the \(M^{-2/3}\) law for calibration. But their *joint* optimum, where \(J\), \(R\), \(B\) and \(M\) trade against one another, is not derived here — and §E.4 shows the answer is not simply the product of the individual factors, since the calibration term enters with the opposite sign. Getting that bound, and identifying which of the four resources binds for a given instrument class, is the natural quantitative continuation.

That is the honest position. One criterion, three instances, two exact costs, and one open law still to be found.

## Appendix F — Why the exponent survives, and why the timescale matters

The next phase · effective dimension, joint budget, timescale sufficiency

Three results sharpen Appendix E. The first explains why a *five*-dimensional problem produced a one-dimensional error law, and turns the 91-run measurement into a consequence of a quotient rather than an anecdote. The second couples identity, history, calibration and dimension into one budget and shows where each resource binds. The third shows that pointwise distortion and metrological stability can rank the same two encoders in opposite orders — the strongest available argument that sufficiency has to be stated at the timescale the instrument actually uses.

### F.1 Effective dimension: why \(K^{-2}\) survives

Let \(T_g:\mathcal{M}_{\omega_0}\to\mathbb{R}\) be smooth with \(\nabla T_g\neq 0\). Its level sets foliate the five-dimensional manifold into four-dimensional hypersurfaces. An unconstrained scalar quantizer ignores that structure entirely: it slices the *range* of \(T_g\), so the partition is effectively one-dimensional and Zador's theorem gives squared-error distortion \(\asymp K^{-2}\) — even though \(\nabla T_g\) has nonzero components in all five coordinates. The relevant dimension is not the manifold's, but that of the quotient by the level-set foliation. Call it the **effective dimension** \(d_{\mathrm{eff}}\); here \(d_{\mathrm{eff}}=1\).

Chart legality breaks the quotient, because cells must be contiguous in \(\Omega\) and can no longer slice cleanly along level sets. Two outcomes are possible, and only one changes the exponent:

**Table.** What chart legality actually costs

| outcome                                              | exponent     | cost of legality |
|------------------------------------------------------|--------------|------------------|
| stays 1-D in \(\Omega\), *folds* across level sets | \(K^{-2}\) | constant factor  |
| must resolve \(d\) independent directions     | \(K^{-2/d}\) | exponent change  |

The released experiment is the first case, and it is checkable. Fitting the chart-legal DP distortions gives local log–log slopes \(1.70, 1.76, 1.86, 1.93\) across \(K=16\to256\), with a global slope of \(1.81\); the uniform baseline gives \(1.98\). Both are consistent with \(d_{\mathrm{eff}}=1\), approaching exponent \(2\) with a slowly vanishing finite-\(K\) correction. (B)

So chart legality costs a *constant*, not an exponent. Three constants, in fact, and they should never be conflated:

**Table.** Three different costs of the same constraint

| quantity                 | value        | what it measures                            |
|--------------------------|--------------|---------------------------------------------|
| distortion gap           | \(6.05\times\) | chart-legal vs unconstrained at equal cells |
| address-structure cost   | \(2.84\times\) | \(91/32\) runs needed to realize it      |
| improvement over uniform | \(10.6\times\) | scalar optimum vs uniform binning           |

The general lesson: **hardware and identity constraints determine \(d_{\mathrm{eff}}\), not the calculus of \(T_g\) alone.**

### F.2 The joint budget, and where the 4× comes from

Now couple everything. An encoder must be sufficient for \(J\) equiprobable branches and \(R+1\) history states, with \(K\le 2^B\) addresses, \(M\) calibration rays of noise \(\nu^2\), and effective dimension \(d\). Each of the \(A\equiv J(R+1)\) classes gets \(K/A\) cells, so within-class distortion is \(C_d(A/K)^{2/d}\), while calibration is charged on all \(K\) cells globally:

\[
R(K;A,M,d)-\sigma^2 = C_d\left(\frac{A}{K}\right)^{2/d} + \frac{\nu^2 K}{M}, \qquad K\le 2^B.
\]

Be precise about what this is: a **two-term model** — Zador's asymptotic quantization term plus the calibration variance of §11 — not a minimax lower bound over all encoders, since no matching converse is proved and Zador's constant is asymptotic. The optimum is exact *for the model*:

\[
K_{\mathrm{opt}} = \left(\frac{2C_d}{d\,\nu^2}M A^{2/d}\right)^{\frac{d}{d+2}}, \qquad R^\star-\sigma^2 = \left(1+\frac{d}{2}\right)\left(\frac{2C_d}{d}\right)^{\frac{d}{d+2}} A^{\frac{2}{d+2}}\left(\frac{\nu^2}{M}\right)^{\frac{2}{d+2}}.
\]

We checked this against direct numerical optimization for \(d\in\{1,2,3,5\}\) — agreeing to \(10^{-10}\) in \(K_{\mathrm{opt}}\) and machine precision in \(R^\star\) — and against a symbolic stationarity computation. Two regimes follow, and they resolve the tension from Appendix E:

**Table.** Two regimes, and what one reserved bit costs

| regime                          | binding resource | identity exponent | cost per bit (\(d=1\)) |
|---------------------------------|------------------|-------------------|-----------------------------|
| memory-bound, \(2^B\ll K_{\mathrm{opt}}\)      | address width    | \(A^{2/d}=A^2\)      | \(4\times\)                |
| calibration-bound, \(2^B\ge K_{\mathrm{opt}}\) | sample budget    | \(A^{2/(d+2)}=A^{2/3}\)      | \(2^{2/3}\approx1.59\times\)                |

In the calibration-bound regime one bit costs \(1.59\times\), not \(4\times\), because the optimizer raises \(K_{\mathrm{opt}}\propto A^{2/3}M^{1/3}\) to absorb the identity pressure — trading calibration variance against quantization variance. So Appendix E's "\(4\times\) per bit" and the branch penalty \(J^2\) are *memory-bound* statements, and the coupled optimum is far more forgiving. At \(d=1\) this also reproduces the \(M^{-2/3}\) and \(K_{\mathrm{opt}}\propto M^{1/3}\) laws of §15, which are therefore the \(d=1\), \(A=1\) instance. (A)

### F.3 Timescale sufficiency: when the ranking reverses

Everything so far optimizes a single-sample functional. That is not what a clock specification asks for. Let \(\delta_t\) be the unresolved delay residual — a zero-mean wide-sense-stationary *per-sample frequency-error* process, independent of the ideal instrument error, with autocovariance \(C(h)\). Take non-overlapping block means and the excess Allan variance

\[
\mathcal{D}_\tau(E) = \tfrac12\,\mathbb{E}\left[(\bar\delta_{k+1,\tau}-\bar\delta_{k,\tau})^2\right].
\]

One definition, used throughout. An earlier draft mixed this with the second difference of adjacent block averages, which gives \((3R_B(0)-4R_B(1)+R_B(2))/\tau^2\) and is *not* equivalent; every result here uses the block-difference form, and \(\delta_t\) must be read as a frequency-error process rather than a raw phase residual.

> **Theorem (exact trajectory distortion).** \(\displaystyle \mathcal{D}_\tau(E)=\frac{1}{\tau^{2}}\sum_{i,j=0}^{\tau-1}\left[C(j-i)-C(\tau+j-i)\right]\). If \(C(h)=a^2\rho^{|h|}\) this reduces to
>
> \(\displaystyle \mathcal{D}_\tau=\frac{a^{2}}{\tau^{2}}\left[\tau+2\sum_{h=1}^{\tau-1}(\tau-h)\rho^{h}-\frac{\rho(1-\rho^{\tau})^{2}}{(1-\rho)^{2}}\right]=\frac{\mathcal{L}_1(E)}{\tau^{2}}\Phi(\rho,\tau)\)
>
> with \(\mathcal{L}_1(E)=a^2\) the pointwise distortion. (A)

Verified against the direct double sum for six parameter sets spanning \(\rho\in\{0,0.5,0.9,0.99,0.999\}\) and \(\tau\in\{1,\dots,1024\}\): relative error below \(2\times10^{-15}\), and the boundary cases \(\Phi(\rho,1)=1-\rho\) and \(\Phi(0,\tau)=\tau\) exact.

**Iso-distortion divergence.** Take two independent symmetric Markov branches with equal amplitudes \(a_1=a_2=a\) and persistences \(\rho_1=0<\rho_2<1\), with a budget that resolves exactly one. Then \(\mathcal{L}_1(E_1)=\mathcal{L}_1(E_2)=a^2\) by construction, yet

\[
\frac{\mathcal{D}_\tau(E_1)}{\mathcal{D}_\tau(E_2)}=\frac{\Phi(\rho_2,\tau)}{\Phi(0,\tau)}=\frac{\Phi(\rho_2,\tau)}{\tau}.
\]

Maximizing over \(\rho_2\) for \(\tau\in\{16,\dots,4096\}\), the supremum is attained at \(1-\rho_2\approx1.89/\tau\) and equals

\[
\sup_{\rho_2}\frac{\mathcal{D}_\tau(E_1)}{\mathcal{D}_\tau(E_2)}\sim c\,\tau,\qquad c=0.3811,
\]

so the divergence is \(\Theta(\tau)\). The constant is \(c=\max_\alpha\psi(\alpha)\) with \(\psi(\alpha)=[2(\alpha-1+e^{-\alpha})-(1-e^{-\alpha})^2]/\alpha^2\), maximized at \(\alpha^\star=1.8926\). We note both routes because a draft of this material quoted \(c=0.4053\): recomputing by (a) direct maximization of \(\Phi(\rho,\tau)/\tau\) in \(\rho\) and (b) numerical quadrature of \(\psi\) both give \(0.3811\), so the earlier constant was in error by 6%.

Two qualifications. The supremum requires persistence to grow with the averaging window; for fixed \(\rho<1\) the ratio eventually decays as \(O(\tau^{-1})\), so \(\Theta(\tau)\) is a supremum over \(\rho\), not a claim about any fixed chain. And the divergence is in *excess* Allan variance — the ideal instrument error is common to both encoders.

**Ranking reversal.** Let \(a_1>a_2\) with \(1<a_1^2/a_2^2<\Phi(\rho_2,\tau_{\text{long}})/\Phi(\rho_1,\tau_{\text{long}})\), and \(\rho_2\) close enough to 1 that \((1-\rho_2)/(1-\rho_1)<a_1^2/a_2^2\). At \(\tau=1\), \(\Phi(\rho,1)=1-\rho\), so \(E_1\) wins both pointwise and at short windows. At \(\tau_{\text{long}}\) the inequality reverses and \(E_2\) wins. The mechanism is worth saying plainly: at \(\tau=1\) a highly persistent branch is nearly a DC offset, so its first difference almost vanishes; at long windows that same persistence is exactly what fails to average down.

This is the trajectory-level counterpart of Appendix E's factorization theorem: pointwise sufficiency is the \(\tau\to0\) idealization, and an encoder can be pointwise sufficient while being metrologically inadequate at the window the specification names.

### F.4 The obstruction: the cell-additive objective is not generally right

For a partition \(\mathcal{P}\) with residual covariance \(C_{\mathcal{P}}(h)\), the trajectory-correct objective is

\[
\min_{\mathcal{P}}\ \frac{1}{\tau^{2}}\sum_{i,j=0}^{\tau-1}\left[C_{\mathcal{P}}(j-i)-C_{\mathcal{P}}(\tau+j-i)\right]
\]

subject to chart legality, branch preservation, address capacity and calibration. Replacing \(v_k\) by the effective weight \(v_k\Phi_k(\tau)/\tau^2\) in the DP of §13 gives a cell-additive surrogate that prefers splitting cells whose residuals are persistent even when their static variance is small.

But it is **not** generally separable over cells. Residuals from different cells can be correlated — a ray leaving a persistent branch contaminates its neighbours — so the global Allan distortion need not equal a sum of independently weighted within-cell variances. The surrogate is defensible only when cross-cell covariance vanishes or is explicitly bounded, and supplying that bound is what a covariance-aware algorithm would have to do. Standard interval dynamic programming does not apply directly, because the cost of one cell may depend on the rest of the partition.

That is the open problem, and it is sharper than the one it replaces: **the optimum encoder is not determined by the distribution of ray delays alone.** It depends on the temporal dynamics of the unresolved branches and on the estimator downstream.

### F.5 The encoder, now universal and actually machine-checked

Appendix A verified injectivity for one three-entry literal table. That is superseded. code/verified/ contains a parameterized encoder where the chart table is a discriminated record passed as a value, so the contracts quantify over *all* consistent tables rather than one:

\[
\texttt{Is\_Consistent}(T)\ \Longrightarrow\ \texttt{Encode}(T,K_1,R_1)=\texttt{Encode}(T,K_2,R_2)\Rightarrow K_1=K_2\wedge R_1=R_2.
\]

Three changes were needed, and each is a defect in the instance form. **First**, the adjacency condition cannot be written with a range ending at `K_Max - 1`: with a symbolic `K_Max` that expression underflows the index subtype when `K_Max = 0`, so the tiling is expressed with a guarded if-expression that never evaluates `Base(K+1)` at `K = K_Max`. **Second**, the lemmas need bodies — a specification alone proves nothing. **Third**, the monotonicity lemma is load-bearing: it bridges the pairwise identity `Base(J)+Cells(J)=Base(J+1)` to an arbitrary gap \(K_1<K_2\), which the solvers will not chain.

**Table.** GNATprove 14.1.1, CVC5 / Z3 / Alt-Ergo

| package                        | obligations | proved | unproved |
|--------------------------------|-------------|--------|----------|
| released instance (Appendix A) | 47          | 44     | 0        |
| parameterized (Appendix F)     | 97          | 93     | 0        |

Removing the inductive body of the monotonicity lemma leaves exactly *one* unproved obligation — its own postcondition — and the injectivity proof then rests on an unproved callee contract. That confirms the lemma is doing the real work. The exhaustive runtime driver additionally checks bijectivity, arena coverage and decode round trips on four table shapes, including the degenerate single-chart table `K_MAX=0` that the instance form could not express, plus five negative controls for gaps, overlaps, short tilings, nonzero origins and empty charts. (C) (B)

That last point is the honest one. Appendix A's "47/47" was true but instance-bound; this is the same claim for a class, and it was checked by running the prover rather than by asserting a transcript. The remaining gap is the covariance-aware objective of F.4, which is where a metrology-aware rate–distortion theory would begin.

## Bibliography

1.  D. W. Allan, “Statistics of Atomic Frequency Standards,” *Proceedings of the IEEE*, 54(2), 221–230, 1966. DOI
2.  G. B. Airy, “On the Intensity of Light in the Neighbourhood of a Caustic,” *Transactions of the Cambridge Philosophical Society*, 6, 379–403, 1838.
3.  V. I. Arnold, *Mathematical Methods of Classical Mechanics*, 2nd ed., Springer, New York, 1989. DOI
4.  J. Barnes, *Programming in Ada 2012*, Cambridge University Press, 2014. DOI
5.  M. V. Berry and C. Upstill, “Catastrophe Optics: Morphologies of Caustics and Their Diffraction Patterns,” *Progress in Optics*, 18, 257–346, 1980. DOI
6.  J. F. Bonnans and A. Shapiro, *Perturbation Analysis of Optimization Problems*, Springer, New York, 2000. DOI
7.  M. Born and E. Wolf, *Principles of Optics*, 7th expanded ed., Cambridge University Press, 1999. DOI
8.  T. M. Cover and J. A. Thomas, *Elements of Information Theory*, 2nd ed., Wiley-Interscience, 2006. DOI
9.  P. de Fermat, “Synthèse pour les réfractions,” (Correspondence), 1662.
10. H. Geiges, *An Introduction to Contact Topology*, Cambridge University Press, 2008. DOI
11. R. M. Gray and D. L. Neuhoff, “Quantization,” *IEEE Transactions on Information Theory*, 44(6), 2325–2383, 1998. DOI
12. Y. A. Kravtsov and Y. I. Orlov, *Geometrical Optics of Inhomogeneous Media*, Springer, Berlin, 1990. DOI
13. J. Liouville, “Note sur la théorie de la variation des constantes arbitraires,” *Journal de Mathématiques Pures et Appliquées*, 3, 342–349, 1838.
14. S. P. Lloyd, “Least Squares Quantization in PCM,” *IEEE Transactions on Information Theory*, 28(2), 129–137, 1982. DOI
15. J. Max, “Quantizing for Minimum Distortion,” *IRE Transactions on Information Theory*, 6(1), 7–12, 1960. DOI
16. J. W. McCormick and P. C. Chapin, *Building High Integrity Applications with SPARK*, Cambridge University Press, 2015. DOI
17. V. Misra, V. K. Goyal, and L. R. Varshney, “Distributed Scalar Quantization for Computing: High-Resolution Analysis and Extensions,” *IEEE Transactions on Information Theory*, 57(8), 5298–5325, 2011. DOI
18. T. Pearcey, “The Structure of an Electromagnetic Field in the Neighbourhood of a Cusp of a Caustic,” *Philosophical Magazine*, 37(272), 311–317, 1946. DOI
19. C. E. Shannon, “Coding Theorems for a Discrete Source with a Fidelity Criterion,” *IRE International Convention Record*, 7, 142–163, 1959.
20. S. S. Shapiro and M. B. Wilk, “An Analysis of Variance Test for Normality (Complete Samples),” *Biometrika*, 52(3/4), 591–611, 1965. DOI
21. AdaCore and Altran UK, “SPARK 2014: The Next Generation of High Integrity Software,” 2014. Site
22. C. J. Stone, “Optimal Global Rates of Convergence for Nonparametric Regression,” *The Annals of Statistics*, 10(4), 1040–1053, 1982. DOI
23. S. L. Braunstein and C. M. Caves, “Information-Theoretic Analysis of Interferometric Measurements,” in *Interferometric Measurements*, Academic Press, 1989.
24. S. Iyer, “NitroSAT: A Physics-Informed MaxSAT Solver…,” Zenodo, 2025. DOI
25. S. Iyer, “Multiplicative Calculus for Hardness Detection and Branch-Aware Optimization…,” Zenodo, 2025. DOI
26. S. Iyer, “ShunyaBar: Spectral–Arithmetic Phase Transitions for Combinatorial Optimization,” Zenodo, 2025. DOI
27. S. Iyer, “banzhaf-ensemble-thesis: V1.0,” Zenodo, 2025. DOI
28. S. Iyer, “Spectral-Multiplicative Optimization Framework,” Zenodo, 2025. DOI
29. S. Iyer, “Solving SAT with Quantum Vacuum Dynamics,” Zenodo, 2025. DOI
30. S. Iyer, “Image Captioning-Based Image Search Engine: An Alternative to Retrieval by Metadata,” in *Proc. SoCPaR*, Springer, 2017. DOI
31. M. C. Gutzwiller, *Chaos in Classical and Quantum Mechanics*, Springer, New York, 1990. DOI
32. A. Selberg, “Harmonic Analysis and Discontinuous Groups in Weakly Symmetric Riemannian Spaces with Applications to Dirichlet Series,” *J. Indian Math. Soc.*, 20, 47–87, 1956.
33. Y. Ihara, “On Discrete Subgroups of the Two by Two Projective Linear Group over *p*-adic Fields,” *J. Math. Soc. Japan*, 18, 219–235, 1966. DOI
34. H. Bass, “The Ihara–Selberg Zeta Function of a Tree Lattice,” *Internat. J. Math.*, 3(6), 717–797, 1992. DOI
35. K. Hashimoto, “Zeta Functions of Finite Graphs and Representations of *p*-adic Groups,” *Adv. Stud. Pure Math.*, 15, 211–280, 1989.
36. T. Kottos and U. Smilansky, “Periodic Orbit Theory and Spectral Statistics for Quantum Graphs,” *Ann. Phys.*, 274(1), 76–124, 1999. DOI
37. D. Ruelle, “Dynamical Zeta Functions and Transfer Operators,” *Notices Amer. Math. Soc.*, 49(8), 887–895, 2002.
38. A. N. Livšic, “Cohomology of Dynamical Systems,” *Math. USSR-Izv.*, 6(6), 1277–1301, 1972. DOI
39. M. V. Berry and J. P. Keating, “*H = xp* and the Riemann Zeros,” in *Supersymmetry and Trace Formulae*, Kluwer/Plenum, New York, 355–367, 1999. DOI
40. M. Planck, “Über das Gesetz der Energieverteilung im Normalspectrum,” *Ann. Phys.*, 309(3), 553–563, 1901. DOI

### Note on tools

A lightweight headless browser and a web-search CLI were used during the preparation of this essay for source retrieval and bibliographic verification. The text, the mathematics, and the synthetic experiments are the author’s.

### Data & code availability

The released artifacts accompany this essay: the synthetic ray generator and deterministic split rule (code/generate.py), the uniform and chart-legal DP partition code with 30-seed evaluation (code/partition.py), the per-seed results (code/results_exp5_seeds.csv), the budget-scaling, control and chart-legality analysis (code/scaling.py, code/results_exp5_scaling.csv), the Ada/SPARK encoder with its exhaustive runtime test (code/chart_encoder.\*, code/test_encoder.adb), and the GNATprove transcript (code/gnatprove-transcript.txt). The two calibration constants of the reference generator are documented in its source; the chart table is the immutable table of Experiment 4.

The full manuscript is available as paper/main.pdf (LaTeX source alongside it). An independent audit of these artifacts — including an earlier claim it prompted us to withdraw — is released as code/AUDIT.md.
