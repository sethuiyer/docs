---
title: "Colliding Branch Points: Five Descriptions of One Degeneration"
description: "An expository note on a corner in a limit: the degeneration of an elliptic curve, the model branch point of Lambert W, and branch-aware annealing."
date: "2026-11-12"
author: "Sethurathienam Iyer"
tags: [mathematics, elliptic curves, tropical geometry]
type: "Research note"
materials:
  - label: "BAHA: Branch-Aware Holonomy Annealing"
    href: "https://sethuiyer.github.io/baha"
    note: "Lambert-W branch enumeration in annealing"
---

# Colliding branch points

*Five descriptions of one degeneration*

For integers \(n\ge1\), consider the functions \(f_n(x)=\sqrt{x^2+1/n}\) on the real line, with the positive square root. Each \(f_n\) is smooth, and for large \(n\) its graph is uniformly close to the V-shaped graph of \(|x|\); the disagreement is concentrated near the origin, where the limit has a corner. The corner belongs to no single \(f_n\). It is produced in the limit by two complex singularities, at distance \(n^{-1/2}\) from the origin, which move toward it as \(n\) grows.

This note follows that single event through five descriptions and records how they translate into one another. In analysis it is the statement that the radius of convergence shrinks like \(n^{-1/2}\). In geometry it is a degeneration: for \(n\ge2\), the elliptic curve \(y^2=(x^2+1/n)(x^2+1)\) has four branch points — the zeros of the right-hand side, where the two sheets \(y=\pm\sqrt{\cdot}\) meet — and two of them collide as \(n\) grows. In modular terms it is the growth rate of the curve's \(j\)-invariant. After a logarithmic change of scale it becomes a piecewise-linear corner, of the kind studied in tropical geometry. In the language of partition functions it is a pair of zeros approaching the real axis.

No prior exposure to elliptic curves, tropical geometry, or statistical mechanics is assumed; each object is defined where it is used, and the analytic prerequisites are those of a first course in complex analysis. What the note does assume is patience with normalization: the constants are the content, and dropping a factor of two changes the constants downstream. The main quantitative result is \(j(E_n)R_n^2\to16\), which says that the invariant grows like the inverse square of the radius of convergence. The note is also explicit about where the analogy stops: the reduction modulo \(p\) is independent of the limit \(n\to\infty\), and the most natural product built from the moving zeros fails to have a tropical limit.

## 1. Introduction and summary

We now fix notation. Let \(n\ge 2\) and put \(\varepsilon=n^{-1/2}\), \(R_n=\varepsilon\). All logarithms are natural. We consider two objects. The first is

\[
f_n(x)=\sqrt{x^2+\varepsilon^2},\qquad x\in\mathbb R,
\]

with the positive branch. The second is the projective closure of

\[
C_n:\; y^2=(x^2+\varepsilon^2)(x^2+1).
\]

The zeros \(\pm i\varepsilon\) and \(\pm i\) of the right-hand side are the branch points of the double cover \(C_n\to\mathbb P^1\). For \(n\ge2\) they are distinct, and \(C_n\) is an elliptic curve \(E_n\) with origin at infinity. The organising observation of this note is that the distance from \(0\) to the nearest branch point of \(f_n\) equals \(\varepsilon\), and that the same \(\varepsilon\) controls the rate at which \(E_n\) degenerates.

We now state the results precisely.

> **Theorem 1.1 (Summary).** For \(n\ge2\) the following hold.
>
> 1. \(f_n\to|\cdot|\) uniformly on \(\mathbb R\), with \(0\le f_n(x)-|x|\le R_n\); the radius of analyticity of \(f_n\) at \(0\) is exactly \(R_n\), and no holomorphic continuation exists on any fixed neighbourhood of \(0\) (§2).
> 2. With \(\omega=dx/y\) and cycles chosen as in §4, the periods satisfy \(a_n\to2\pi i\) and \(b_n=-\log n-\log16+o(1)\); hence \(\operatorname{Im}\tau_n=\frac{1}{2\pi}\log(16n)+o(1)\) (§4).
> 3. \(j(E_n)=16(n^2+14n+1)^3/\bigl(n(n-1)^4\bigr)\), so \(j(E_n)R_n^2\to16\) (§5).
> 4. After the substitution \(x=n^{-u}\), the rescaled height of \(f_n\) converges uniformly to \(\min(u,\tfrac12)\), with error \(O(1/\log n)\) (§7).
> 5. The model \(Z_\beta(z)=e^{\beta z}+e^{-\beta z}\) has free energy converging uniformly to \(|x|\) while its zeros approach the real axis (§8).

Statements (i)–(iii) are three readings of one computation, and the translation between them is exact. Statement (iv) is a theorem about \(f_n\) in logarithmic coordinates; it is not obtained by taking logarithms of periods, and it makes no assertion about \(E_n\). Statement (v) is a model problem which shares a mechanism with (i) but is not implied by it.

Section 9 records the model branch point. The Lambert \(W\) function, the inverse of \(w\mapsto we^w\), satisfies a defining equation with the same repeated root in the fibre variable as (i); its two real branches collide with the same exponent \(1/2\). It is a model of the local form, not a sixth description of the degeneration of \(E_n\). Section 10 records where that normal form is put to computational use, in a branch-enumeration step for annealing.

We also record two negative results, because both are easy to get wrong. In §6 we explain why the reduction of \(E_n\) modulo \(p\) carries no information about the degeneration as \(n\to\infty\), despite depending on the same parameter \(n\). In §12 we show that the product \(\prod_{k\le N}(z^2+1/k)\), whose zeros are exactly the moving branch points, does *not* have the tropical limit one might expect; the obstruction is a normalization, not a missing theorem.

**Three quantities.** The note is organised around three numbers, related by the identities proved below:

\[
R_n=n^{-1/2},\qquad \operatorname{Im}\tau_n=\frac{\log 16n}{2\pi}+o(1),\qquad j(E_n)R_n^2\to16.
\]

**Conventions.** The positive branch of the square root is used on \(\mathbb R\); branches in \(\mathbb C\) are specified when a continuation is discussed. The modular parameter \(\tau_n=b_n/a_n\) is taken in the upper half-plane, which fixes the orientation of the \(b\)-cycle. Constants in \(O(\cdot)\) are absolute; we do not attempt to optimize error terms. Numerical values quoted in §5 were computed from the closed forms to the precision shown.

## 2. The analytic estimate

> **Lemma 2.1 (Uniform convergence).** For all \(x\in\mathbb R\) and \(n\ge2\),
>
> \[
> 0\;\le\; f_n(x)-|x| \;=\; \frac{\varepsilon^2}{f_n(x)+|x|} \;\le\; \varepsilon.
> \]
>
> In particular \(f_n\to|\cdot|\) uniformly on \(\mathbb R\), and the bound is attained at \(x=0\).

*Proof.* Multiplying by the conjugate gives \(f_n(x)-|x|=(x^2+\varepsilon^2-x^2)/(f_n(x)+|x|)\). Since \(f_n(x)\ge\varepsilon\), the denominator is at least \(\varepsilon\), whence the bound. At \(x=0\) one has \(f_n(0)=\varepsilon\). □

> **Proposition 2.2 (No continuation past the branch point).** The radius of analyticity of \(f_n\) at \(0\) is exactly \(\varepsilon\). Moreover, there is no neighbourhood \(U\) of \(0\) and no holomorphic \(F\) on \(U\) such that \(F=f_n\) on \(U\cap\mathbb R\).

*Proof.* Write \(f_n(z)=\varepsilon\sqrt{1+z^2/\varepsilon^2}\). The radicand vanishes to first order at \(z=\pm i\varepsilon\), so \(f_n\) is analytic on the disc \(|z|<\varepsilon\) and not beyond it. For the second assertion, suppose \(F\) were holomorphic on a disc \(U\) containing \(i\varepsilon\) and equal to \(f_n\) on \(U\cap\mathbb R\). By the identity theorem, \(F(z)^2=z^2+\varepsilon^2\) on \(U\). The right side vanishes at \(i\varepsilon\), hence \(F(i\varepsilon)=0\); differentiating the identity and evaluating at \(i\varepsilon\) gives \(2F(i\varepsilon)F'(i\varepsilon)=2i\varepsilon\), that is, \(0=2i\varepsilon\), a contradiction. □

<figure>
<svg viewBox="0 0 720 340" role="img" aria-label="The branch points at plus and minus i divided by square root n close on the origin; the dashed circle has radius R sub n.">
  <g stroke="var(--ink-faint)" stroke-width="1">
    <line x1="60" y1="190" x2="660" y2="190"/>
    <line x1="360" y1="40" x2="360" y2="320"/>
  </g>
  <text x="664" y="208" font-family="Inter, sans-serif" font-size="12" fill="var(--ink-faint)" text-anchor="end">Re</text>
  <text x="370" y="52" font-family="Inter, sans-serif" font-size="12" fill="var(--ink-faint)">Im</text>
  <circle cx="360" cy="190" r="52" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="5 5"/>
  <text x="392" y="140" font-family="Inter, sans-serif" font-size="12" fill="var(--ink-soft)">Rₙ</text>
  <circle cx="360" cy="70" r="4" fill="currentColor"/>
  <circle cx="360" cy="310" r="4" fill="currentColor"/>
  <text x="374" y="66" font-family="Inter, sans-serif" font-size="14" fill="currentColor">i</text>
  <text x="374" y="318" font-family="Inter, sans-serif" font-size="14" fill="currentColor">−i</text>
  <circle cx="360" cy="138" r="4" fill="currentColor"/>
  <circle cx="360" cy="242" r="4" fill="currentColor"/>
  <text x="346" y="133" font-family="Inter, sans-serif" font-size="12" fill="var(--ink-soft)" text-anchor="end">i/√n</text>
  <text x="346" y="250" font-family="Inter, sans-serif" font-size="12" fill="var(--ink-soft)" text-anchor="end">−i/√n</text>
  <text x="360" y="336" font-family="Inter, sans-serif" font-size="12" fill="var(--ink-soft)" text-anchor="middle">the two inner branch points approach 0 as n → ∞</text>
</svg>
<figcaption>Fig. 1 — the singularity of fₙ is a pair of branch points; analyticity fails at their distance from the origin.</figcaption>
</figure>

> **Remark 2.3.** The uniformity in Lemma 2.1 does not contradict the Weierstrass theorem, because that theorem requires a fixed domain. The natural domains here are the discs \(|z|<\varepsilon\), which shrink to \(\{0\}\). The failure is not an artefact of the choice of cut: by Proposition 2.2 it persists for every choice.

> **Remark 2.4.** The proof uses only the parity of the multiplicity of the zero. A holomorphic square root would force the zero of \(z^2+\varepsilon^2\) to have even order, and a simple zero cannot be repaired by moving a cut.

## 3. The associated curve

Let \(E_n\) denote the smooth projective model of \(C_n\), with origin at infinity.

> **Lemma 3.1 (Genus one).** For \(n\ge2\), \(E_n\) is smooth of genus \(1\). For \(n=1\) the affine equation becomes \(y^2=(x^2+1)^2\), which is reducible.

*Proof.* The four branch points \(\pm i\varepsilon,\pm i\) are distinct for \(n\ge2\), and \(C_n\to\mathbb P^1\) is a double cover branched exactly over them. Riemann–Hurwitz gives \(2g-2=2\cdot(-2)+4=0\), so \(g=1\). At \(n=1\) the equation factors. □

> **Remark 3.2.** As \(n\to\infty\) with \(x\) fixed, \(C_n\) tends to \(y^2=x^2(x^2+1)\), a nodal cubic whose node is at the origin with tangent lines \(y=\pm x\). Geometrically, the collision of two branch points produces a node; the double cover forgets which of the two points was which.

The graph of \(f_n\) is the upper branch of the reducible curve \(y^2=x^2+\varepsilon^2\), whose two branch points are the colliding pair. Passing to \(C_n\) multiplies by the fixed factor \(x^2+1\), adding branch points at \(\pm i\), and raises the genus to \(1\). The lattice of \(E_n\) is what makes the collision measurable; the fixed pair \(\pm i\) contributes an additive constant to the periods, discussed in §4.

## 4. The two periods

Let \(\omega=dx/y\). Let \(a_n\) be the period of \(\omega\) over a loop encircling \(\pm i\varepsilon\), and \(b_n\) the period over a loop encircling \(i\varepsilon\) and \(i\). We choose orientations so that \(\operatorname{Im}(b_n/a_n)>0\).

> **Lemma 4.1 (The small period).**
>
> \[
> a_n=4iK(\varepsilon),\qquad K(k)=\int_0^{\pi/2}\frac{d\theta}{\sqrt{1-k^2\sin^2\theta}},
> \]
>
> and consequently \(a_n\to 2\pi i\).

*Proof.* Substitute \(x=i\varepsilon\sin\varphi\). Then \(x^2+\varepsilon^2=\varepsilon^2\cos^2\varphi\) and \(x^2+1=1-\varepsilon^2\sin^2\varphi\), so

\[
y=\varepsilon\cos\varphi\,\sqrt{1-\varepsilon^2\sin^2\varphi},\qquad \frac{dx}{y}=\frac{i\,d\varphi}{\sqrt{1-\varepsilon^2\sin^2\varphi}}.
\]

The loop traverses both sides of the cut, each contributing a factor \(2iK(\varepsilon)\); hence \(a_n=4iK(\varepsilon)\). Since \(K(0)=\pi/2\), the limit follows. □

> **Lemma 4.2 (The large period).**
>
> \[
> b_n=-2K\!\left(\sqrt{1-\varepsilon^2}\right).
> \]
>
> The modulus is \(\sqrt{1-\varepsilon^2}\), so the complementary modulus is \(\varepsilon\).

The computation is the standard reduction of a period over a cycle enclosing two branch points to a complete integral, followed by the normalizations fixed above. We record it rather than reproduce it, as it is not used elsewhere; the sign is the one specified by the orientation of §4.

> **Lemma 4.3 (Asymptotics of the complete integral).**
>
> \[
> K\!\left(\sqrt{1-\varepsilon^2}\right)=\int_0^{\pi/2}\frac{d\theta}{\sqrt{\sin^2\theta+\varepsilon^2\cos^2\theta}} =\log\frac{4}{\varepsilon}+o(1).
> \]

*Proof.* Put \(J_\varepsilon=\int_0^{\pi/2}d\theta/\sqrt{\theta^2+\varepsilon^2}=\operatorname{arsinh}\bigl(\pi/(2\varepsilon)\bigr)\), so that \(J_\varepsilon=\log(\pi/\varepsilon)+o(1)\). On \((0,\pi/2]\) the integrands of \(K\) and \(J_\varepsilon\) converge pointwise to \(\csc\theta\) and \(1/\theta\) respectively, and a two-epsilon argument (split at \(\delta\), use uniform convergence on \([\delta,\pi/2]\), then let \(\delta\to0\)) gives

\[
\lim_{\varepsilon\to0}\bigl(K-J_\varepsilon\bigr) =\int_0^{\pi/2}\left(\frac{1}{\sin\theta}-\frac{1}{\theta}\right)d\theta =\log\frac{4}{\pi}.
\]

The last integral is evaluated by integrating \(d\log\tan(\theta/2)-d\log\theta\) and using \(\tan(\theta/2)\sim\theta/2\) at \(0\). Combining the two asymptotics gives the claim. □

> **Corollary 4.4 (Period height).**
>
> \[
> b_n=-\log n-\log16+o(1),\qquad \operatorname{Im}\tau_n=\frac{1}{2\pi}\log(16n)+o(1).
> \]

*Proof.* By Lemma 4.3, \(K(\sqrt{1-\varepsilon^2})=\log(4/\varepsilon)+o(1)\), and \(\log(4/\varepsilon)=\tfrac12\log n+\log4+o(1)\). Multiplying by \(-2\) gives the first display. For the second, \(\tau_n=b_n/a_n=iK(\sqrt{1-\varepsilon^2})/(2K(\varepsilon))\) and \(K(\varepsilon)=\pi/2+O(\varepsilon^2)\), so

\[
\operatorname{Im}\tau_n=\frac{K(\sqrt{1-\varepsilon^2})}{2K(\varepsilon)} =\frac{1}{\pi}\log\frac{4}{\varepsilon}+o(1) =\frac{1}{2\pi}\log(16n)+o(1).
\]

□

> **Remark 4.5.** The factor \(2\) in \(b_n=-2K\) must be retained before any limit is taken. Reading \(K\sim\log(1/\varepsilon)=\tfrac12\log n+\log4\) and forgetting the factor gives \(b_n\sim-\tfrac12\log n-\log4\), which is off by a factor of two throughout. With the factor, \(b_n=-2\bigl(\tfrac12\log n+\log4\bigr)=-\log n-\log16\), and every constant below is consistent.

> **Remark 4.6.** The additive constant \(-\log16\) is not universal to the degeneration: it records that the fixed branch points sit at \(\pm i\), at unit distance. Moving that pair changes the constant, though not the leading term. The leading term \(-\log n\) depends only on the collision scale \(\varepsilon=n^{-1/2}\).

## 5. The modular invariant

Let \(q_n=e^{2\pi i\tau_n}\). Combining Lemma 4.1 and Corollary 4.4,

\[
|q_n|=e^{-2\pi\operatorname{Im}\tau_n}=\frac{1}{16n}\bigl(1+o(1)\bigr).
\]

The \(q\)-expansion \(j=q^{-1}+744+O(q)\) therefore already predicts \(j(E_n)\sim16n\). The exact algebra supplies the constant and the correction term.

> **Proposition 5.1 (Closed form).** With \(\lambda=\bigl(\tfrac{1-\varepsilon}{1+\varepsilon}\bigr)^2\), the curve \(E_n\) is isomorphic to the Legendre curve \(v^2=u(u-1)(u-\lambda)\), and
>
> \[
> j(E_n)=256\,\frac{(1-\lambda+\lambda^2)^3}{\lambda^2(1-\lambda)^2} =16\,\frac{(n^2+14n+1)^3}{n\,(n-1)^4}.
> \]

*Proof.* The Möbius map \(u=\tfrac{1-\varepsilon}{1+\varepsilon}\cdot\tfrac{x-i\varepsilon}{x+i\varepsilon}\) sends the branch points to \(0,\infty,1,\lambda\). Shifting \(u\) to remove the quadratic term puts the cubic in the form \(v^2=w^3+Aw+B\) with \(A=-(1-\lambda+\lambda^2)/3\). Since \(c_4=-48A\) and \(\Delta=16\lambda^2(1-\lambda)^2\), the displayed expression for \(j=c_4^3/\Delta\) follows; substituting \(\varepsilon^2=1/n\) and simplifying gives the second form. □

> **Corollary 5.2 (The product limit).**
>
> \[
> j(E_n)R_n^2=16\left(1+\frac{46}{n}+O(n^{-2})\right)\longrightarrow16.
> \]

*Proof.* Write \(x=1/n\). Then \(jR_n^2=16(1+14x+x^2)^3/(1-x)^4\). The quotient has value \(1\) and derivative \(46\) at \(x=0\), giving the expansion. □

| \(n\) | \(j(E_n)\) | \(jR_n^2\) | \(\operatorname{Im}\tau_n\) | \(\log(16n)/2\pi\) |
| ---: | ---: | ---: | ---: | ---: |
| \(10^2\) | 2468.357 | 24.6836 | 1.173408 | 1.174207 |
| \(10^3\) | 16748.39 | 16.7484 | 1.540595 | 1.540675 |
| \(10^4\) | 160737.2 | 16.0737 | 1.907134 | 1.907142 |
| \(10^6\) | \(1.6000736\times10^{7}\) | 16.00074 | 2.640078 | 2.640078 |
| \(10^8\) | \(1.600000074\times10^{9}\) | 16.000007 | 3.373014 | 3.373014 |

*Table 5.1 — values computed from the closed forms. Reproduce with `mpmath.ellipk`, noting that it takes \(m=k^2\) rather than \(k\).*

> **Remark 5.3.** The cross-ratio \(\lambda\) depends on the ordering of the branch points, but \(j\) is invariant under the anharmonic group generated by \(\lambda\mapsto1-\lambda\), \(\lambda\mapsto1/\lambda\), and \(\lambda\mapsto1/(1-\lambda)\). The ordering chosen above is the one for which \(\lambda\to1\) as \(n\to\infty\).

> **Remark 5.4.** Two computations agree: the \(q\)-expansion gives the leading term \(j\sim16n\), and the exact algebra gives the constant \(46\) in the correction. The first is the cheaper route to the rate; the second is needed for \(jR_n^2\to16\) with an explicit error.

## 6. Reduction modulo p

Let \(p\) be an odd prime with \(p\equiv1\pmod4\) and \(p\nmid n(n-1)\). The second condition ensures that the four branch points remain distinct modulo \(p\), so the reduction is smooth; the first ensures that \(-1\) is a square, so that \(x^2=-1/n\) reduces to a condition on \(n\) alone.

> **Proposition 6.1 (When the pair is rational).** The points \(\pm i/\sqrt n\) are defined over \(\mathbb F_p\) if and only if \(n\) is a nonzero quadratic residue modulo \(p\).

*Proof.* The squares of their \(x\)-coordinates are \(-1/n\). Since \(p\equiv1\pmod4\), \(\bigl(\tfrac{-1}{p}\bigr)=1\), hence

\[
\left(\frac{-n^{-1}}{p}\right)=\left(\frac{-1}{p}\right)\left(\frac{n}{p}\right)=\left(\frac{n}{p}\right).
\]

Thus \(-1/n\) is a square exactly when \(n\) is. □

> **Proposition 6.2 (Frobenius swaps the pair).** If \(\bigl(\tfrac{n}{p}\bigr)=-1\), then \(\alpha^2=-1/n\) has no solution in \(\mathbb F_p\), but has solutions \(\pm\alpha\) in \(\mathbb F_{p^2}\setminus\mathbb F_p\) with \(\alpha^p=-\alpha\). Consequently Frobenius interchanges the two points, which form a single Galois orbit.

*Proof.* The quadratic \(\alpha^2+n^{-1}\) is irreducible over \(\mathbb F_p\), so a root generates \(\mathbb F_{p^2}\). Since \(\alpha^2\in\mathbb F_p\) is a nonsquare in the cyclic group \(\mathbb F_p^\times\), \(\alpha^{p-1}=(\alpha^2)^{(p-1)/2}=-1\), whence \(\alpha^p=-\alpha\). □

> **Remark 6.3.** Three clarifications are in order.
>
> (i) For \(p\equiv1\pmod4\) every such prime already splits in \(\mathbb Z[i]\). The splitting therefore cannot distinguish the two cases of Proposition 6.1; the distinguishing character is \(\bigl(\tfrac{n}{p}\bigr)\).
>
> (ii) The curve \(E_n\) is not a CM curve with complex multiplication by \(\mathbb Z[i]\): that would force \(j=1728\), whereas \(j(E_n)\) is a nonconstant rational function of \(n\). (At \(n=2\) one finds \(j=66^3=287496\), the class-number-one invariant of discriminant \(-16\); this coincidence plays no role in the degeneration.)
>
> (iii) Neither proposition bears on the limit \(n\to\infty\). They concern fields of definition for fixed \(n\) and \(p\), and share only the parameter \(n\) with §4–§5.

## 7. Tropical rescaling

For \(u\in\mathbb R\) put \(x=n^{-u}\) and define the rescaled height

\[
T_n(u)=-\frac{\log f_n(n^{-u})}{\log n}.
\]

> **Proposition 7.1 (Uniform piecewise-linear limit).** Set \(m=\min(u,\tfrac12)\). Then
>
> \[
> T_n(u)=m-\frac{1}{2\log n}\log\bigl(1+n^{-|2u-1|}\bigr),
> \]
>
> and therefore
>
> \[
> 0\;\le\;m-T_n(u)\;\le\;\frac{\log2}{2\log n}
> \]
>
> for every \(u\in\mathbb R\). In particular \(T_n\to\min(\cdot,\tfrac12)\) uniformly on \(\mathbb R\).

*Proof.* Since \(f_n(n^{-u})^2=n^{-2u}+n^{-1}\), factor out the larger of the two terms. For \(u\le\tfrac12\) the first dominates:

\[
T_n(u)=u-\frac{1}{2\log n}\log\!\left(1+n^{2u-1}\right),
\]

and for \(u\ge\tfrac12\) the second does:

\[
T_n(u)=\tfrac12-\frac{1}{2\log n}\log\!\left(1+n^{1-2u}\right).
\]

In both cases the logarithm is nonnegative and at most \(\log2\), which gives the bound. □

> **Remark 7.2.** Proposition 7.1 is the algebraic content of the Maslov dequantization identity \(-h\log(e^{-a/h}+e^{-b/h})\to\min(a,b)\) as \(h\to0\), applied to the two terms \(n^{-2u}\) and \(n^{-1}\). The breakpoint \(u=\tfrac12\) is the statement \(x^2\asymp n^{-1}\), that is, \(x\asymp R_n\): the corner occurs exactly at the collision scale. The limit concerns \(f_n\) in the coordinates \((u,\log f/\log n)\), and it makes no assertion about the lattice of \(E_n\).

<figure>
<svg viewBox="0 0 760 330" role="img" aria-label="The rescaled height T sub n converges to min of u and one half, with the single breakpoint at u equal to one half.">
  <g stroke="var(--ink-faint)" stroke-width="1">
    <line x1="70" y1="270" x2="720" y2="270"/>
    <line x1="70" y1="270" x2="70" y2="40"/>
  </g>
  <text x="728" y="288" font-family="Inter, sans-serif" font-size="12" fill="var(--ink-faint)" text-anchor="end">u</text>
  <text x="62" y="46" font-family="Inter, sans-serif" font-size="12" fill="var(--ink-faint)" text-anchor="end">T(u)</text>
  <polyline points="70,270 380,170 680,170" fill="none" stroke="currentColor" stroke-width="3"/>
  <path d="M70.0,274.1 L85.0,269.6 L100.0,265.1 L115.0,260.7 L130.0,256.4 L145.0,252.1 L160.0,247.9 L175.0,243.8 L190.0,239.7 L205.0,235.8 L220.0,231.9 L235.0,228.2 L250.0,224.6 L265.0,221.0 L280.0,217.6 L295.0,214.4 L310.0,211.2 L325.0,208.2 L340.0,205.4 L355.0,202.7 L370.0,200.1 L385.0,197.7 L400.0,195.4 L415.0,193.2 L430.0,191.2 L445.0,189.4 L460.0,187.6 L475.0,186.0 L490.0,184.6 L505.0,183.2 L520.0,181.9 L535.0,180.8 L550.0,179.7 L565.0,178.8 L580.0,177.9 L595.0,177.1 L610.0,176.4 L625.0,175.7 L640.0,175.1 L655.0,174.6 L670.0,174.1" fill="none" stroke="var(--ink-faint)" stroke-width="1.4" stroke-dasharray="6 5"/>
  <line x1="380" y1="270" x2="380" y2="202" stroke="var(--ink-faint)" stroke-width="1" stroke-dasharray="3 4"/>
  <text x="70" y="288" font-family="Inter, sans-serif" font-size="12" fill="var(--ink-faint)" text-anchor="middle">0</text>
  <text x="380" y="288" font-family="Inter, sans-serif" font-size="12" fill="var(--ink-soft)" text-anchor="middle">½</text>
  <text x="680" y="288" font-family="Inter, sans-serif" font-size="12" fill="var(--ink-faint)" text-anchor="middle">1</text>
  <text x="392" y="162" font-family="Inter, sans-serif" font-size="12" fill="var(--ink-soft)">min(u, ½)</text>
  <text x="470" y="218" font-family="Inter, sans-serif" font-size="11" fill="var(--ink-faint)">Tₙ, n = 10</text>
  <text x="380" y="312" font-family="Inter, sans-serif" font-size="11" fill="var(--ink-faint)" text-anchor="middle">breakpoint at x ≍ Rₙ</text>
</svg>
<figcaption>Fig. 2 — the rescaled height for n = 10 (dashed) and its limit (solid). The distance between the two curves is at most log 2 / (2 log n), so the corner is approached uniformly, not merely pointwise.</figcaption>
</figure>

## 8. A zero-pinching model

The following elementary model exhibits the same mechanism without any elliptic curve.

> **Proposition 8.1 (Zeros pinching the axis).** For \(\beta>0\) and \(z\in\mathbb C\), set \(Z_\beta(z)=e^{\beta z}+e^{-\beta z}\). For real \(x\),
>
> \[
> \frac1\beta\log Z_\beta(x)=|x|+\frac1\beta\log\!\left(1+e^{-2\beta|x|}\right),
> \]
>
> so \(0\le \frac1\beta\log Z_\beta(x)-|x|\le\frac{\log2}{\beta}\). The zeros are \(z_k=(2k+1)\pi i/(2\beta)\), \(k\in\mathbb Z\).

*Proof.* For \(x\ge0\), \(Z_\beta(x)=e^{\beta x}(1+e^{-2\beta x})\); the formula follows, and the bound from \(0\le\log(1+t)\le t\). For the zeros, \(e^{2\beta z}=-1\), so \(2\beta z=(2k+1)\pi i\). □

> **Remark 8.2.** The mechanism — a family of entire functions whose zeros approach the real axis while the real-axis limit is uniform — is the same as in §2 and §7: the nearest pair of zeros approaches at distance \(\pi/(2\beta)\to0\). The model is nevertheless distinct. No period or invariant enters, and we do not assert any implication from Proposition 8.1 to the statements of §4–§6.

## 9. The model branch point

The collision of §2 has a transcendental model which isolates its local form. Let \(W\) denote the multivalued inverse of \(w\mapsto we^w\), the Lambert \(W\) function. Two real branches are relevant: \(W_0:[-1/e,\infty)\to[-1,\infty)\), increasing, and \(W_{-1}:(-1/e,0)\to(-\infty,-1)\), decreasing. They meet at the endpoint \(z=-1/e\).

> **Proposition 9.1 (A repeated root in the fibre).** Let \(F(w,z)=we^w-z\). At \((w,z)=(-1,-1/e)\),
>
> \[
> F=0,\qquad F_w=e^{w}(1+w)=0,\qquad F_{ww}=e^{w}(2+w)=\frac1e\neq0.
> \]
>
> Thus \(w=-1\) is a double root of \(F(\cdot,z)\) at \(z=-1/e\), and the two real branches collide there.

The mechanism is the one of Proposition 2.2: in each case the defining equation has a repeated root in the fibre variable, and two sheets meet with exponent \(1/2\). For \(f_n\) the equation is \(w^2=z^2+\varepsilon^2\), and at \(z=i\varepsilon\) the root \(w=0\) is double. The local forms are computed in the same way.

> **Proposition 9.2 (Normal form).** As \(s=z+1/e\to0\),
>
> \[
> W_{0,-1}\!\left(-\frac1e+s\right)=-1\pm\sqrt{2es}-\frac{2e}{3}s+O(s^{3/2}),
> \]
>
> the sign distinguishing the two branches.

*Proof.* Write \(w=-1+\delta\). Then

\[
we^w=\frac1e(-1+\delta)e^{\delta} =\frac1e\left(-1+\frac{\delta^2}{2}+\frac{\delta^3}{3}+O(\delta^4)\right),
\]

so \(s=e^{-1}\bigl(\delta^2/2+\delta^3/3+O(\delta^4)\bigr)\). Put \(u=\sqrt{2es}\) and \(\delta=u+bu^2+O(u^3)\). Substitution gives \(s=s+e^{-1}\bigl(b+\tfrac13\bigr)u^3+O(u^4)\), hence \(b=-\tfrac13\) and \(\delta=\sqrt{2es}-\tfrac{2e}{3}s+O(s^{3/2})\). □

> **Remark 9.3.** The exponent \(1/2\) is not an accident of this example. If \(F(w,z)\) is holomorphic and \(F=0\), \(F_w=0\), \(F_{ww}\neq0\) at a point, the Weierstrass preparation theorem reduces \(F\) near that point to a quadratic in \(w\), and the quadratic formula exhibits the two branches as \(\pm\sqrt{\cdot}\). Propositions 2.2 and 9.2 are two instances of this normal form.

> **Remark 9.4.** The principal branch \(W_0\) is analytic at \(0\) with radius exactly \(1/e\), the distance to the branch point: the same statement as Proposition 2.2 with \(\varepsilon\) replaced by \(1/e\). Nothing further carries over. No lattice, period, or invariant is attached to \(W\), and we do not present it as a sixth description of the degeneration of \(E_n\).

> **Proposition 9.5 (Tropical leading balance).** As \(x\to+\infty\),
>
> \[
> W_0(x)=\log x-\log\log x+O\!\left(\frac{\log\log x}{\log x}\right).
> \]

*Proof.* Put \(y=\log x\) and \(w=W_0(x)\), so that \(w+\log w=y\). Since \(w\to\infty\),

\[
w=y-\log w=y-\log(y-\log w)=y-\log y+O\!\left(\frac{\log w}{y}\right),
\]

and \(\log w=O(\log y)\). □

For instance \(W_0(10^{12})=24.4350\ldots\), while \(\log 10^{12}-\log\log 10^{12}=24.3121\ldots\). Near the branch point, \(\bigl(W_0(-1/e+s)+1\bigr)/\sqrt{2es}=0.99992\) at \(s=10^{-8}\), consistent with the correction \(-(2e/3)s\) in Proposition 9.2.

> **Remark 9.6.** The leading term \(\log x\) is the solution of the tropical balance \(\max(w,\log w)=y\): of the two terms of \(w+\log w=y\), the larger dominates. The correction \(-\log\log x\) is precisely what the tropical limit discards, just as \(T_n\) discards the term \((2\log n)^{-1}\log(1+n^{-|2u-1|})\) in Proposition 7.1. As there, the statement is an asymptotic theorem about its own object and implies nothing about \(E_n\).

## 10. A connection with branch-aware annealing

These notes are expository, but the normal form of §9 is used in a computational setting, and the correspondence is exact rather than figurative. In [*BAHA: Branch-Aware Holonomy Annealing*](https://sethuiyer.github.io/baha) (Iyer, 2026), a simulated annealing schedule is augmented by monitoring the log-partition function \(\Phi(\beta)=\log Z(\beta)\). When a *fracture*—a sharp change in \(\Phi\)—is detected, the algorithm computes candidate continuations from the two real branches of \(W\).

Near a critical inverse temperature \(\beta_c\), the self-consistency equation is reduced in that work to

\[
u e^u=\xi,\qquad u=\beta-\beta_c,
\]

where \(\xi\) is a driving parameter computed from the curvature of the energy histogram. This is the defining equation of \(W\), so the two real solutions are \(u_k=W_k(\xi)\), \(k\in\{0,-1\}\), and the candidate temperatures are \(\beta_k=\beta_c+u_k\).

Read against §9, this is not an analogy. At \(\xi=-1/e\) the two solutions \(u=-1\) merge; the derivative of \(ue^u-\xi\) vanishes there and the second derivative does not, so the collision is the double root of Proposition 9.1, with the normal form of Proposition 9.2. Enumerating \(W_0\) and \(W_{-1}\) is the same act as following the two sheets through a branch point: one principal continuation and one alternate one, meeting where the implicit equation loses a root. In the annealing language, standard simulated annealing follows the principal branch; the algorithm's premise is that the better solution may lie on the alternate one.

Two further contacts are structural. A fracture of \(\Phi\) is a non-analyticity of a free energy, and the model of §8 is a minimal instance: zeros of \(Z_\beta\) pinch the real axis at distance \(\pi/(2\beta)\), and the real-axis limit \(|x|\) is not analytic at the pinch point. Separately, the zero-temperature limit of the free energy is the tropical limit of §7: with \(h=1/\beta\), the quantity \(-\beta^{-1}\log\sum_x e^{-\beta E(x)}\) tends to the minimum energy, which is the Maslov dequantization used in Proposition 7.1.

We are careful about what this does and does not establish. The reported benchmarks in BAHA are empirical, and its branch-completeness statement is proved for mean-field self-consistency rather than in general. The identities of §4–§5 do not transfer to the optimization setting; no period or invariant appears there. What transfers is the local mechanism: a repeated root in the defining equation, two sheets meeting with exponent \(1/2\), and a continuation that is single-valued only after a branch has been chosen.

> **Remark 10.1.** The correspondence is between local models, not global objects. The branch point of \(W\) models a fracture; it is not a description of any particular optimization landscape, and no elliptic curve arises in the annealing problem as stated. The direction of the analogy runs one way: from the normal form of §9 to the branch enumeration of the algorithm.

## 11. Comparison of descriptions

| Setting | Object | Statement |
| --- | --- | --- |
| Real analysis | \(f_n(x)=\sqrt{x^2+1/n}\) | \(R_n=n^{-1/2}\), uniform convergence, no continuation |
| Elliptic geometry | \(E_n: y^2=(x^2+\varepsilon^2)(x^2+1)\) | \(\operatorname{Im}\tau_n=\frac{1}{2\pi}\log(16n)+o(1)\) |
| Modular algebra | \(j(E_n)\) | \(jR_n^2=16(1+46/n+O(n^{-2}))\to16\) |
| Tropical algebra | \(T_n(u)=-\log f_n(n^{-u})/\log n\) | \(T_n\to\min(u,\tfrac12)\), error \(\le\frac{\log2}{2\log n}\) |
| Zero pinching | \(Z_\beta(z)=e^{\beta z}+e^{-\beta z}\) | \(\frac1\beta\log Z_\beta\to\lvert x\rvert\), zeros at \((2k+1)\pi i/(2\beta)\) |

*Table 11.1 — five descriptions of one collision. Only the first three are related by exact identities.*

The status of the translations is as follows.

- **(a)** Proposition 2.2, Corollary 4.4 and Corollary 5.2 form a single chain: the radius, the period height and the invariant are connected by identities, and the constants agree exactly. The equality \(\operatorname{Im}\tau_n=\frac1\pi\log(4/R_n)+o(1)\) is the same statement as Corollary 4.4 after substituting \(R_n=n^{-1/2}\).
- **(b)** Proposition 7.1 is a theorem about \(f_n\) after a rescaling of the argument and the height. The breakpoint occurs at the collision scale \(x\asymp R_n\), but no period enters the proof.
- **(c)** Propositions 6.1–6.2 concern fixed \(n\) and \(p\). They neither imply nor are implied by the degeneration as \(n\to\infty\).
- **(d)** Proposition 8.1 is a separate model sharing a mechanism with (a) and (b).
- **(e)** The Lambert \(W\) function of §9 is not a sixth description but the model of the local form: it exhibits the same repeated root in the fibre variable and the same exponent \(1/2\). Its tropical asymptotic is a theorem about \(W\), not about \(E_n\).
- **(f)** The branch enumeration of §10 is an application of that normal form. It inherits the multivaluedness at the same double root, but none of the identities of §4–§5.

In particular, we do not assert that the non-analyticity of \(|x|\), the divergence of \(\operatorname{Im}\tau_n\), and the accumulation of zeros are equivalent statements. Each is true in its own setting; the implications between them would require additional structure which these notes do not supply.

## 12. A normalization that fails

It is natural to try to construct the tropical limit directly from the moving zeros. Since the zeros of \(z^2+1/k\) are \(\pm i/\sqrt k\), consider

\[
P_N(z)=\prod_{k=1}^{N}\left(z^2+\frac1k\right), \qquad \Phi(z)=\lim_{N\to\infty}\frac{1}{\log N}\log|P_N(z)|.
\]

> **Proposition 12.1 (Expansion of the product).** For fixed \(z\neq0\),
>
> \[
> \log|P_N(z)|=2N\log|z|+\operatorname{Re}\!\left(\frac1{z^2}\right)\log N+O_z(1).
> \]

*Proof.* Each factor contributes \(2\log|z|+\log|1+1/(kz^2)|\). Summing the second term and using \(\log(1+w)=\operatorname{Re}w+O(|w|^2)\) for small \(w\), together with \(\sum_{k\le N}1/k=\log N+O(1)\), gives the display. □

> **Corollary 12.2 (No tropical limit).** The quotient \(\frac{1}{\log N}\log|P_N(z)|\) tends to \(+\infty\) for \(|z|>1\) and to \(-\infty\) for \(0<|z|<1\). After subtracting \(2N\log|z|\), the limit is \(\operatorname{Re}(z^{-2})\), which is harmonic and not piecewise linear.

*Proof.* The term \(2N\log|z|\) dominates \(\log N\) in both cases. For \(|z|=1\) the remaining term is \(\operatorname{Re}(z^{-2})\). □

> **Remark 12.3.** The zeros are in the correct place; the normalization is not. A limit of analytic functions need not be a tropical object, and no choice of normalization turns a harmonic function into a piecewise-linear one. The repair is either the rescaling of §7, which keeps the corner and discards the product, or the change of model in §8.

## 13. Concluding remarks

Each of the five descriptions is a coordinate system adapted to a different part of the same event. Real analysis records the radius; elliptic geometry records the period height; modular algebra records the invariant; tropical algebra records the breakpoint; and the zero-pinching model records the approach of singularities to the real axis. The substantive content lies in the identities of §4–§5, which are exact, and in the negative statements of §6 and §12, which delimit the analogy.

The model branch point of §9 supplies the local mechanism in isolation; it is included for that reason, and not as a sixth description. Its normal form is the same square root, and its tropical asymptotic exhibits the same division of labour between a leading balance and a correction.

Two methodological points seem worth stating explicitly. First, a repeated root is an event without coordinates; the work is in choosing coordinates in which it becomes a computable statement, and then in verifying the translation rather than asserting it. Second, the constants carry information: the factor \(2\) in \(b_n=-2K\) and the additive constant \(-\log16\) are not bookkeeping, and dropping either changes the conclusions.

**Exercises.**

1. Show that the bound in Lemma 2.1 is attained only at \(x=0\), and compute the first correction to \(f_n(x)-|x|\) for fixed \(x\neq0\).
2. Supply the details of the two-epsilon argument in Lemma 4.3, including a dominating bound for the difference of the integrands.
3. Verify the anharmonic invariance of \(j\) stated in Remark 5.3 by direct substitution in \(256(1-\lambda+\lambda^2)^3/(\lambda^2(1-\lambda)^2)\).
4. Determine the analogue of Proposition 6.1 for primes \(p\equiv3\pmod4\). (The character \(\bigl(\tfrac{-1}{p}\bigr)\) now contributes a sign.)
5. Prove the expansion in Corollary 5.2 with the explicit \(O(n^{-2})\) term, and check that \(n\,(jR_n^2-16)\to736\).
