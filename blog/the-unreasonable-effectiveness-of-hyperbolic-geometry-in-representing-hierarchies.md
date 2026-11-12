---
title: "The Unreasonable Effectiveness of Hyperbolic Geometry in Representing Hierarchies"
description: "For decades, mathematicians, computer scientists, and more recently, machine learning practitioners have sought effective ways to represent and reason about hierarchical structures. Often\u2026"
date: "2025-04-10"
author: "Sethu Iyer"
tags: ["hyperbolic geometry", "machine learning", "hierarchies"]
type: "Essay"
materials:
  - label: "Original on Medium"
    href: "https://medium.com/@sethuiyer/the-unreasonable-effectiveness-of-hyperbolic-geometry-in-representing-hierarchies-aa3a6e8232f2"
---

![](https://cdn-images-1.medium.com/max/1024/1*1oX64wGzoTBe3uRdp4Owqw.png)

For decades, mathematicians, computer scientists, and more recently, machine learning practitioners have sought effective ways to represent and reason about hierarchical structures. Often, the go-to tool has been Euclidean space (ℝⁿ) — the familiar flat geometry of points, lines, and planes we learn about in school. We embed entities as points (vectors) and hope that geometric relationships (like distance or angle) capture the underlying hierarchical relationships. This works surprisingly well for many tasks, but it fundamentally struggles with hierarchy.

Trying to embed a tree-like structure into a flat Euclidean space inevitably leads to distortions and inefficiencies. It’s like trying to flatten an orange peel — you can do it, but you’ll stretch and tear it in the process.

Enter **hyperbolic space**. This fascinating, negatively curved geometry possesses properties that make it uniquely suited — dare I say, *natural* — for embedding hierarchies.

The core idea, as we’ll explore in depth, is that **hyperbolic space expands exponentially, just like the number of nodes in a typical hierarchy.** This post aims to unpack this statement, building intuition through geometry and mathematical formalism. We’ll explore *why* Euclidean space falls short, delve into the counter-intuitive properties of hyperbolic geometry, and mathematically demonstrate the connection between its exponential growth and the structure of trees.

## The Euclidean Bottleneck: Why Flatness Fails Hierarchies

Let’s start by understanding the limitations of Euclidean space (ℝⁿ). Consider a simple, balanced binary tree. At depth 0, we have 1 node (the root). At depth 1, 2 nodes. At depth d, we have 2^d nodes. The total number of nodes up to depth D is Σ\_{d=0}^D 2^d = 2^(D+1) - 1. This is exponential growth. Now, imagine trying to embed this tree faithfully into, say, the Euclidean plane (ℝ²). "Faithfully" might mean preserving certain properties, like:

1.  Distances between connected nodes (edge lengths) should be roughly constant.
2.  Nodes at the same depth should be somehow distinguishable and not “on top of each other.”
3.  The representation should capture the branching structure.

Let’s try a common visualization: place the root at the origin (0,0). Place its children at some distance r. Place their children at a further distance, and so on.

1.  In Euclidean space, the circumference of a circle of radius R is 2πR, and its area is πR². These grow linearly and quadratically with R, respectively.
2.  In general, the volume of an n-dimensional Euclidean ball grows polynomially, as R^n. However, the number of nodes in our tree grows exponentially with depth d. If we try to map depth d roughly to Euclidean distance R, we run into a **crowding problem**.
3.  To accommodate the 2^d nodes at depth d, we need enough "space" around the circle (or sphere in higher dimensions). Let the Euclidean distance from the root to a node at depth d be roughly R(d). The available "circumference" (or surface area of the hypersphere) grows like R(d)^(n-1), while the number of nodes grows like 2^d.
4.  If we try to keep edge lengths somewhat constant, maybe R(d) ≈ c * d for some constant c. Then the available space grows like (c*d)^(n-1), while the required space grows like 2^d.
5.  Clearly, **the exponential growth of nodes outpaces the polynomial growth of Euclidean space.** To cram all 2^d nodes at approximately distance R(d), we have two bad options:

**Shrink distances between siblings:** Nodes at the same depth become incredibly close, making them hard to distinguish.

**Distort distances:** Parent-child distances might need to vary wildly depending on the branch, or sibling distances become much larger than parent-child distances, violating the local tree structure.

This isn’t just a problem for balanced binary trees. **Any structure with branching, where the number of descendants grows rapidly with distance from a root, will face this issue**. Euclidean space simply doesn’t *expand fast enough* to naturally host these structures without significant distortion. We need a geometry where the “volume” or “surface area” at a given distance from a point grows exponentially.

**Curvature: The Shape of Space**

The difference between Euclidean space and the space we need lies in **curvature**. Euclidean space is *flat*, meaning it has zero Gaussian curvature. We can understand curvature intuitively:

- **Positive Curvature (like a sphere):** Parallel lines converge. The circumference of a circle is *less* than 2πR (where R is the radius measured along the surface). The sum of angles in a triangle is *greater* than 180 degrees. Space is locally "compressed."
- **Zero Curvature (like a plane):** Parallel lines remain parallel. Circumference is exactly 2πR. Triangle angles sum to 180 degrees. This is Euclidean geometry.
- **Negative Curvature (like a saddle point, infinitely extended):** Parallel lines diverge. The circumference of a circle is *greater* than 2πR. Triangle angles sum to *less* than 180 degrees. Space locally "expands" or "spreads out."
- This last property - negative curvature leading to space spreading out - is the key. **Hyperbolic space is the canonical example of a space with constant negative curvature.**

**A Glimpse into Hyperbolic Geometry**

To make this concrete, we need a model of hyperbolic space. There are several, all isometric (meaning they represent the same intrinsic geometry, just with different coordinate systems): the Upper Half-Plane model, the Klein model, the Jemisphere model, and the one most commonly used in machine learning: the **Poincaré Disk Model**.

**The Poincaré Disk**

![](https://cdn-images-1.medium.com/max/1024/0*MGS3fi-Ah1ZFD_Un.png)

*https://mathworld.wolfram.com/PoincareHyperbolicDisk.html*

Imagine the open unit disk in the complex plane (or ℝ²): D = {z ∈ C : \|z\| \< 1}. This disk is our *space*. The points *on* the boundary circle \|z\| = 1 are "points at infinity" and are not part of the space itself. What makes this disk hyperbolic is its **metric**, which defines how we measure distances. The standard Euclidean metric ds² = dx² + dy² gives a flat space. The Poincaré disk metric is given by: ds² = 4 * (dx² + dy²) / (1 - (x² + y²))² = 4 * \|dz\|² / (1 - \|z\|²)²

Let's break this down:

- dx² + dy² or \|dz\|² is the infinitesimal Euclidean distance.
- (1 - \|z\|²)² is the crucial conformal factor. As a point z approaches the boundary (\|z\| → 1), this factor approaches zero.
- Dividing by a number approaching zero means the *hyperbolic* distance ds blows up infinitely. This metric tells us that Euclidean distances near the center of the disk are scaled by roughly 4 * (1) = 4, but Euclidean distances near the boundary are scaled by an enormous factor. A tiny Euclidean step near the boundary corresponds to a huge hyperbolic distance. This means the boundary is infinitely far away from any point inside the disk in terms of hyperbolic distance.

In Euclidean space, the shortest path between two points is a straight line. In curved space, the shortest path is called a **geodesic**. In the Poincaré disk, geodesics are:

1.  Diameters passing through the origin (0,0).
2.  Circular arcs that intersect the boundary circle \|z\|=1 orthogonally (at 90 degrees).

![](https://cdn-images-1.medium.com/max/1024/1*Ud-IESFI3_yZYm6bCRYuyg.png)

*Conceptual diagram of Poincaré disk with geodesics*

**Hyperbolic Distance**

The distance d_H(z₁, z₂) between two points z₁, z₂ ∈ D can be calculated by integrating ds along the geodesic connecting them.

Since we are dealing with **radial planes** (like the Poincaré disk) where our **notion of distance** isn’t flat (like in Euclidean space) but *radially warped*, it’s **natural** to think of a workaround —   
**a “kernel trick” like approach** — to compute the “true” distance between two points.

Instead of calculating direct Euclidean distance,  
we **lift** the points into a *higher conceptual space* (through Möbius transformations) where the structure is hyperbolic.

In **complex analysis**, whenever we want to **move elegantly between curved geometries** and preserve conformality (angles, circles),  
the **Möbius transformation** is the secret weapon.

A **Möbius transformation** is a map that maps the complex plane to itself (or to the Riemann sphere — complex plane plus one extra point called ∞ (infinity)) and preserves the structure of circles and angles.

It is defined as

![](https://cdn-images-1.medium.com/max/1024/0*nJlTbERwTD6Uts0F.png)

For Poincaré disk, the **Möbius** transformation is

![](https://cdn-images-1.medium.com/max/1024/0*AdOegsePIa42QreV.png)

It’s **hugely beneficial** to think of the imaginary unit (i) (square root of -1) here as a **parity switch operator.** Multiplying by ( i ) rotates a point by 90 degrees. In the Möbius transformation, the (i) *twists* the geometry just enough to **flip between real and imaginary axes**.

It’s like saying Hey, the *radial symmetry* of the disk now becomes *linear symmetry* in the half-plane, is acting as the **mismatch reconciler** between the two geometric frames. This change of viewpoint lets you **calculate hyperbolic distances cleanly** because distances along geodesics (which are *circular arcs* in the disk) become simpler in the half-plane model.

In the **upper half-plane**, hyperbolic metric is simpler, and when you apply the Möbius transformation back to pull the metric back to the disk, we get the closed-form solution is: d_H(z₁, z₂) = arccosh(1 + 2 * \|z₁ - z₂\|² / ((1 - \|z₁\|²)(1 - \|z₂\|²))) Where \|…\| denotes the standard Euclidean norm/modulus, and arccosh is the inverse hyperbolic cosine function (arccosh(x) = ln(x + √(x² - 1))).

Notice the denominator (1 - \|z₁\|²)(1 - \|z₂\|²) again. If either z₁ or z₂ approaches the boundary, this term approaches zero, arccosh's argument goes to infinity, and the hyperbolic distance d_H(z₁, z₂) goes to infinity.

**Exponential Expansion: The Crucial Property**

Now, let's examine the geometry of circles in the Poincaré disk. Consider a *hyperbolic* circle centered at the origin (0,0) with *hyperbolic* radius ρ. This corresponds to a Euclidean circle {z : \|z\| = r} for some Euclidean radius r \< 1. The relationship between the hyperbolic radius ρ and the Euclidean radius r is: ρ = d_H(0, z) = arccosh(1 + 2\|z\|² / (1 - \|z\|²)) = arccosh((1 + r²) / (1 - r²)) Solving for r gives r = tanh(ρ / 2).

Now, let's calculate the **circumference** C(ρ) and **area** A(ρ) of this hyperbolic circle of hyperbolic radius ρ. In a space of constant negative curvature -κ² (for simplicity, we often set κ=1, giving curvature -1), the formulas are:

- **Circumference:** C(ρ) = 2π * (1/κ) * sinh(κρ)
- **Area:** A(ρ) = 2π * (1/κ)² * (cosh(κρ) - 1) Setting κ=1 (curvature -1):
- C(ρ) = 2π sinh(ρ)
- A(ρ) = 2π (cosh(ρ) - 1)

Recall the definitions of hyperbolic sine and cosine:

sinh(ρ) = (e^ρ - e^(-ρ)) / 2

cosh(ρ) = (e^ρ + e^(-ρ)) / 2

For large ρ (i.e., far from the origin, approaching the boundary):

- sinh(ρ) ≈ e^ρ / 2
- cosh(ρ) ≈ e^ρ / 2

Therefore, for large hyperbolic radius ρ:

- C(ρ) ≈ π e^ρ
- A(ρ) ≈ π e^ρ

**This is the payoff!** The circumference and area of a hyperbolic circle grow **exponentially** with its hyperbolic radius ρ. This is in stark contrast to the polynomial growth (2πR and πR²) in Euclidean space.

This exponential expansion is precisely what we need to embed tree-like structures naturally. If we map the depth d of a tree node to a hyperbolic radius ρ(d), the amount of available "space" (circumference or area) at that radius grows exponentially, mirroring the exponential growth in the number of nodes at that depth.

**Connecting Trees and Hyperbolic Space: The Isomorphism**

Let’s make the connection more explicit. Consider our balanced binary tree again, with 2^d nodes at depth d. We want to embed this into the Poincaré disk D.

1.  **Place the root** at the origin z=0.
2.  **Place nodes at depth** **d** roughly at a hyperbolic distance ρ(d) from the origin. A simple choice is ρ(d) = c * d for some constant c \> 0.
3.  **Position children:** For a node u at z_u with hyperbolic distance ρ(d), place its children v_i such that d_H(u, v_i) is approximately constant (representing the edge length) and d_H(0, v_i) ≈ ρ(d+1). Because the circumference C(ρ) grows exponentially (≈ π e^ρ), doubling the number of nodes (2^d to 2^(d+1)) when we increase the depth by 1 corresponds naturally to the available space.
4.  If we choose c such that e^c ≈ 2 (i.e., c ≈ ln(2)), then C(ρ(d+1)) = C(c(d+1)) ≈ π e^(c(d+1)) = π (e^c)^(d+1) ≈ π 2^(d+1).
5.  The circumference grows roughly proportionally to the number of nodes at that depth! This means we can place the 2^d nodes around the hyperbolic circle of radius ρ(d) without them getting progressively closer together in hyperbolic terms.
6.  There's enough "room" at each level. The exponential expansion of the space naturally accommodates the exponential branching of the tree.

**Visualizing the Embedding:**

In the Poincaré disk visualization:

- The root is at the center.
- Nodes at depth 1 are on a small Euclidean circle around the center.
- Nodes at depth 2 are on a larger Euclidean circle, further out.
- Nodes at depth d are on a Euclidean circle with radius r = tanh(cd/2), approaching the boundary r=1 as d → ∞. Crucially, although the nodes get visually *crowded* near the boundary in the *Euclidean* representation of the disk, their *hyperbolic* distances remain well-behaved. Why? because by the virtue of negative curvature, when even parallel lines diverge, the space keeps “expanding beneath your feet,” delaying convergence indefinitely.

The metric ds² compensates for the Euclidean crowding by magnifying distances near the boundary.

> *In a* ***fisheye lens****, things near the center look normal, but as you move outward, space gets increasingly* ***compressed visually**** — ****the “edge” looks infinitely far*** *but appears close. You can think of the Poincaré Disk like a cosmic fisheye lens*

**Gromov Hyperbolicity and δ-Hyperbolic Spaces:**

There's a deeper mathematical connection formalized by Gromov's notion of **δ-hyperbolicity**. A metric space is called *δ-hyperbolic* if every geodesic triangle is *δ-thin*.

Means:

- Pick any three points.
- Draw shortest paths (geodesics) between each pair.
- The triangle you form is “thin”: any point on one side is close to the union of the other two sides.
- **δ** controls how thin — the smaller δ is, the closer it is to being a “tripod” (three sticks meeting at a center).

This means that each side of the triangle is contained within the δ-neighborhood of the other two sides.

Intuitively, triangles in hyperbolic spaces look "thinner" than Euclidean triangles.

- Trees are **0-hyperbolic**. Any three points in a tree have a unique median point where the paths between them meet, and geodesic “triangles” degenerate into tripods. There’s no “area” inside a triangle. **The tree doesn’t need any curvature to connect three points efficiently.**
- Classical hyperbolic spaces (like the Poincaré disk) are δ-hyperbolic for some small δ (related to the curvature). The fact that trees are perfectly (0-)hyperbolic provides a strong theoretical justification for using hyperbolic geometry.
- Hyperbolic spaces are, in a precise mathematical sense, the continuous geometric objects that most resemble trees metric-wise.
- Embedding a tree into a hyperbolic space is mapping a 0-hyperbolic space into a δ-hyperbolic space, which is expected to incur much less distortion than mapping it into a 0-hyperbolic (Euclidean) space.

**Why This Matters: Applications in Machine Learning**

This isn’t just a theoretical curiosity. The realization that hyperbolic geometry naturally fits hierarchies has led to significant advancements in machine learning, particularly in **representation learning**:

1.  **Poincaré Embeddings (Nickel & Kiela, 2017):** This seminal work demonstrated that embedding hierarchical data (like WordNet noun hierarchies, or scientific collaboration networks) into a low-dimensional Poincaré disk significantly outperformed Euclidean embeddings of the same dimension. They defined a loss function based on hyperbolic distances, aiming to place related entities closer together. For hierarchical relationships (like hyponymy: “dog” is a hyponym of “mammal”), distance from the origin naturally captures generality (root = most general), and relative hyperbolic distance captures semantic similarity/relatedness.
2.  **Network Embeddings:** Many real-world networks (social, biological, technological) exhibit hierarchical or tree-like backbones, often combined with some “horizontal” connections. Hyperbolic embeddings can capture the core hierarchical structure efficiently, often needing far fewer dimensions than Euclidean methods to achieve similar performance on tasks like link prediction or node classification.
3.  **Natural Language Processing (NLP):** Beyond WordNet, syntactic parse trees are inherently hierarchical. Hyperbolic representations are being explored for sentence embeddings, capturing compositional structure, and modeling semantic hierarchies implicit in word meanings.
4.  **Recommender Systems:** User preferences and item taxonomies can often be modeled hierarchically. Hyperbolic geometry offers a new lens for collaborative filtering and content-based recommendation.
5.  **Graph Neural Networks (GNNs):** Researchers are developing GNN architectures that operate directly on hyperbolic manifolds, allowing them to leverage the geometric prior for graph-structured data with underlying hierarchies.
6.  **Efficiency:** The key advantage is often **embedding dimension**. Because hyperbolic space intrinsically “fits” hierarchies, you can often achieve high-fidelity representations in very low dimensions (e.g., 2, 5, or 10 dimensions), whereas Euclidean embeddings might require hundreds or thousands of dimensions to capture the same structure without significant distortion, suffering from the “curse of dimensionality” and computational inefficiency.

## Hyperbolic KNN for Hierarchical Data: A Real-World Analogy

Imagine you run a large e-commerce platform with thousands of product categories:

- **Level 1**: High-level parent categories (like “Electronics,” “Clothing,” “Furniture,” etc.).
- **Level 2**: Subcategories under each parent (like under “Electronics,” you might have “Smartphones,” “Laptops,” and so on).

You notice that some product subcategories — say, “Flagship Smartphones” and “Mid-range Smartphones” — are closely related but *only* within their parent category. In Euclidean space, items at the “edges” of different sibling categories might appear deceptively close, incorrectly lumping them together. But in hyperbolic space, sibling categories are more accurately placed at distinct “branches” of the hierarchy.

Our synthetic dataset simulates precisely this phenomenon by placing points in a 2D Poincaré disk in a tree-like arrangement:

- The **origin** (0,0) represents the global root.
- **Parent nodes** are placed outward from the origin (at a smaller radius).
- **Subclasses** (subcategories) are placed even further out near the boundary of the disk.

In hyperbolic geometry, distances grow faster near the boundary, so sibling nodes remain appropriately separated despite both being “far from the root.”

So we can run K-Nearest Neighbours on the Hyperbolic Space, Off-the-shelf algorithms (like scikit-learn’s KNeighborsClassifier) are typically Euclidean-based. Switching to hyperbolic distance often requires a custom function (like HyperbolicKNN).

**Mathematical Nuances and Algorithmic Challenges**

Working with hyperbolic geometry isn’t without its challenges:

- **Optimization:** Standard gradient descent assumes a Euclidean vector space. Optimizing parameters that represent points in hyperbolic space requires **Riemannian optimization** techniques. Algorithms like Riemannian Stochastic Gradient Descent (RSGD) adapt SGD to work on curved manifolds by using operations defined in the tangent space at each point (like exponential maps to move along geodesics and logarithmic maps to compute gradients). While mathematically elegant, these can be computationally more involved than their Euclidean counterparts, although efficient approximations exist.
- **Choice of Model:** While the Poincaré disk is popular, other models like the Lorentz (or Hyperboloid) model offer certain advantages, particularly for numerical stability and simpler geodesic computations. Choosing the right model depends on the specific application and computational trade-offs.
- **Curvature:** Real-world data might not be perfectly hierarchical or might have varying degrees of “tree-likeness.” Some research explores models with learned or variable curvature, or product spaces (e.g., Hyperbolic x Euclidean) to capture mixed geometric structures. Selecting the optimal curvature (if treated as a hyperparameter) is also crucial.
- **Numerical Stability:** Calculations involving terms like 1 - \|z\|² can become unstable when points are very close to the boundary. Careful implementation using techniques like tangent space updates in the Lorentz model can mitigate these issues.

**Conclusion: Geometry as a Prior**

The success of hyperbolic embeddings is a beautiful example of how choosing the right **geometric prior** can dramatically improve our ability to model complex data. Euclidean geometry, with its flat, polynomial nature, imposes a structure that clashes with the exponential branching inherent in hierarchies. Hyperbolic geometry, characterized by its constant negative curvature and consequent exponential volume growth, provides a mathematically principled and surprisingly effective alternative.

By understanding the fundamental properties of hyperbolic space — its metric, geodesics, and especially its exponential expansion — we gain insight into *why* it serves as such a natural habitat for trees and hierarchies.

It reminds us that sometimes, the structure of our data is best understood not by forcing it onto a flat canvas, but by finding the curved space it naturally calls home.

**Further Reading & References:**

- \[The (Unreasonable) Effectiveness of (Hyperbolic) Geometry — Igor Rivin\](<https://www.youtube.com/watch?v=_Wd7c1mCpJ4>)
- Nickel, M., & Kiela, D. (2017). Poincaré Embeddings for Learning Hierarchical Representations. *Advances in Neural Information Processing Systems (NIPS)*.
- Sala, F., De Sa, C., Gu, A., & Ré, C. (2018). Representation Tradeoffs for Hyperbolic Embeddings. *International Conference on Machine Learning (ICML)*.
- Ganea, O., Bécigneul, G., & Hofmann, T. (2018). Hyperbolic Neural Networks. *Advances in Neural Information Processing Systems (NIPS)*.
- Krioukov, D., Papadopoulos, F., Kitsak, M., Vahdat, A., & Boguñá, M. (2010). Hyperbolic geometry of complex networks. *Physical Review E*.
- Cannon, J. W., Floyd, W. J., Kenyon, R., & Parry, W. R. (1997). Hyperbolic geometry. *Flavors of Geometry*, 31, 59–115. (Mathematical background)
- Bridson, M. R., & Haefliger, A. (1999). *Metric spaces of non-positive curvature*. Springer Science & Business Media. (Advanced mathematical treatment of curvature and hyperbolic spaces)

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=aa3a6e8232f2)
