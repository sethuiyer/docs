---
title: "Attention as Constrained Spectral Regression"
description: "Attention read as weighted kernel regression becomes a circulant operator once positions carry a cyclic symmetry, so the Fourier basis diagonalizes it into per-frequency gains. The essay derives attention as a constrained spectral estimator, from group characters and Chebyshev polynomials to the Wiener filter and the convex polytope of feasible attention spectra."
date: "2026-10-18"
author: "Sethurathienam Iyer"
tags: ["attention", "representation theory", "spectral methods", "kernel regression"]
type: "Essay"
materials:
  - label: "Original"
    href: "https://sethuiyer.github.io/eigen-attention/"
---

# Attention as Constrained Spectral Regression

## Abstract

Attention is a weighted regression operator. It uses similarities between queries and keys to calculate weights. It then uses these weights to combine values.

When the index set has a group symmetry, we can construct the similarity kernel from representations of that group. For cyclic positions, rotations provide such representations. Their traces give cosine functions. Chebyshev polynomials express higher rotation harmonics as polynomials of one fundamental cosine.

These functions form an orthogonal Fourier system. A positional attention kernel that depends only on relative position becomes a circulant matrix. The Fourier basis diagonalizes this matrix. Each eigenvalue gives the gain that attention applies to one positional frequency.

Thus, attention has two equivalent descriptions:

1. In position space, it is normalized kernel regression.
2. In frequency space, it is spectral filtering.

The second description gives a precise interpretation of attention temperature. Temperature changes the bandwidth of the kernel. Bandwidth changes the spectral gains. A narrow kernel preserves more positional variation. A broad kernel suppresses more variation.

This connection also creates a statistical optimization problem. The Wiener filter gives the optimal frequency response for a specified signal-plus-noise model. But attention cannot use arbitrary frequency gains. Its weights must be nonnegative and must sum to one.

These probability constraints couple the spectral gains. The feasible responses form a convex polytope. A softmax kernel with a small number of harmonic parameters occupies a restricted subset of this polytope.

The central result is:

\[
\boxed{\text{Attention is a constrained spectral estimator.}}
\]

The mathematical program has four parts: select the symmetry, construct the kernel, determine the feasible spectral responses, and select a response from signal statistics.

## 1. Start with three discrete positions

Take three positions:

\[
1,\quad 2,\quad 3.
\]

Replace their labels with the elements of the cyclic group

\[
G=\mathbb Z_3=\{0,1,2\}.
\]

The group operation is addition modulo three.

We want a representation that preserves this operation. Select a rotation through an angle of \(2\pi/3\):

\[
R= \begin{pmatrix} \cos(2\pi/3)&-\sin(2\pi/3)\\ \sin(2\pi/3)&\cos(2\pi/3) \end{pmatrix}.
\]

Therefore,

\[
R= \begin{pmatrix} -\frac12&-\frac{\sqrt3}{2}\\ \frac{\sqrt3}{2}&-\frac12 \end{pmatrix}.
\]

This matrix is orthogonal:

\[
R^\top R=I.
\]

It also satisfies

\[
R^3=I.
\]

Define the representation

\[
\rho(k)=R^k.
\]

Then

\[
\rho(a+b)=\rho(a)\rho(b).
\]

The representation maps discrete addition into matrix multiplication.

Select the initial vector

\[
e_1= \begin{pmatrix} 1\\0 \end{pmatrix}.
\]

The positional embedding is

\[
\phi(k)=R^ke_1.
\]

This gives

\[
\phi(0)= \begin{pmatrix}1\\0\end{pmatrix},
\]

\[
\phi(1)= \begin{pmatrix}-1/2\\ \sqrt3/2\end{pmatrix},
\]

and

\[
\phi(2)= \begin{pmatrix}-1/2\\-\sqrt3/2\end{pmatrix}.
\]

The three vectors are points on a unit circle. They form an equilateral triangle.

Collect the vectors as rows of a matrix:

\[
E= \begin{pmatrix} 1&0\\ -\frac12&\frac{\sqrt3}{2}\\ -\frac12&-\frac{\sqrt3}{2} \end{pmatrix}.
\]

Calculate

\[
E^\top E= \frac32I_2.
\]

Normalize the columns:

\[
U=\sqrt{\frac23}E.
\]

Now

\[
\boxed{U^\top U=I_2.}
\]

The two feature columns are orthonormal.

The three position vectors are not pairwise orthogonal. Their pairwise inner products are \(-1/2\).

This distinction is necessary. Three nonzero vectors cannot be pairwise orthogonal in a two-dimensional Euclidean space. But three positions can produce two orthogonal feature columns.

The construction gives a two-dimensional orthogonal feature system for three discrete positions.

## 2. Rotation traces give positional similarity

The trace of a two-dimensional rotation is

\[
\operatorname{tr}(R(\theta))=2\cos\theta.
\]

For the cyclic representation, define its character:

\[
\chi(k)=\operatorname{tr}(R^k).
\]

Thus,

\[
\chi(k)=2\cos\left(\frac{2\pi k}{3}\right).
\]

The three character values are

\[
\chi(0)=2,\qquad \chi(1)=-1,\qquad \chi(2)=-1.
\]

Now calculate the inner product of two positional embeddings:

\[
\begin{aligned} \phi(p)^\top\phi(q) &=e_1^\top(R^p)^\top R^qe_1\\ &=e_1^\top R^{q-p}e_1\\ &=\cos\left(\frac{2\pi(q-p)}3\right). \end{aligned}
\]

Therefore,

\[
\boxed{ \phi(p)^\top\phi(q)=\frac12\chi(q-p). }
\]

The similarity depends only on relative position.

This is the first connection to attention. We can calculate positional similarity from a group character instead of assigning unrelated vectors to positions.

The character also connects to Chebyshev polynomials.

The Chebyshev polynomial of the first kind satisfies

\[
T_m(\cos\theta)=\cos(m\theta).
\]

Consequently,

\[
\operatorname{tr}(R^m)=2T_m(\cos\theta).
\]

For our positional embeddings,

\[
\boxed{ \phi(p)^\top\phi(q) = T_{q-p}\left(\cos\frac{2\pi}{3}\right). }
\]

Here \(q-p\) is an integer representative of the cyclic difference. The value does not depend on which representative we select, because the angle has period \(2\pi\).

We have obtained three descriptions of the same similarity:

\[
\boxed{ \text{Vector inner product} = \text{Half a rotation trace} = \text{Chebyshev polynomial}. }
\]

This is an algebraic identity. It is not an approximation.

## 3. Attention is nonparametric weighted regression

Standard attention uses queries \(q_i\), keys \(k_j\), and values \(v_j\).

Its output is

\[
y_i= \sum_j\alpha_{ij}v_j,
\]

where

\[
\alpha_{ij} = \frac{ \exp(q_i^\top k_j/\sqrt d) }{ \sum_\ell\exp(q_i^\top k_\ell/\sqrt d) }.
\]

Define a positive similarity kernel:

\[
K(q_i,k_j)= \exp(q_i^\top k_j/\sqrt d).
\]

Then

\[
\boxed{ y_i= \frac{ \sum_jK(q_i,k_j)v_j }{ \sum_jK(q_i,k_j) }. }
\]

This is the form of the Nadaraya–Watson kernel regression estimator.

The query is the evaluation point. The keys are the observed input locations. The values are the observations to combine.

The estimator does not calculate a new set of regression coefficients by solving a least-squares problem for each query. It uses normalized similarities directly.

The learned query, key, and value projections still contain model parameters. The term nonparametric describes the weighted regression operation, not the entire transformer.

We can now replace the ordinary positional similarity with a rotational similarity.

For positions \(p\) and \(q\), define

\[
K_\beta(p,q) = \exp\left[ \beta\cos\left(\frac{2\pi(p-q)}n\right) \right].
\]

Here \(\beta\ge0\) controls concentration.

The corresponding attention weights are

\[
\alpha_{pq} = \frac{K_\beta(p,q)} {\sum_jK_\beta(p,j)}.
\]

The output is

\[
\boxed{ \hat v_p=\sum_q\alpha_{pq}v_q. }
\]

This is nonparametric regression over a cyclic positional domain.

The kernel gives high weight to similar rotations. It gives lower weight to rotations that are far apart on the circle.

## 4. Derive the rotational Gaussian kernel

The rotational kernel also has a distance interpretation.

Define the squared Frobenius distance between two rotation matrices:

\[
d_R^2(p,q) = \|R^p-R^q\|_F^2.
\]

Expand the squared norm:

\[
\begin{aligned} d_R^2(p,q) &=\operatorname{tr} \left[ (R^p-R^q)^\top(R^p-R^q) \right]\\ &=4-2\operatorname{tr}(R^{q-p})\\ &=4-4\cos\left(\frac{2\pi(q-p)}n\right). \end{aligned}
\]

Use a Gaussian kernel:

\[
K_h(p,q)= \exp\left(-\frac{d_R^2(p,q)}{2h^2}\right).
\]

Substitute the distance:

\[
K_h(p,q) = \exp\left[ -\frac2{h^2} + \frac2{h^2}\cos\left(\frac{2\pi(q-p)}n\right) \right].
\]

The factor \(\exp(-2/h^2)\) is constant across all keys. It cancels when we normalize the weights.

Set

\[
\beta=\frac2{h^2}.
\]

The normalized kernel becomes

\[
\boxed{ \alpha_{pq} = \frac{ e^{\beta\cos(2\pi(q-p)/n)} }{ \sum_j e^{\beta\cos(2\pi(j-p)/n)} }. }
\]

This is a discrete circular analogue of the von Mises kernel.

A large \(h\) gives a small \(\beta\). The kernel is broad and performs more averaging.

A small \(h\) gives a large \(\beta\). The kernel concentrates around matching rotations.

Thus, the softmax concentration parameter is a kernel bandwidth parameter.

## 5. Calculate the complete three-position attention matrix

Return to \(n=3\).

The cosine similarity is 1 when \(p=q\). It is \(-1/2\) when \(p\ne q\).

The logit matrix is

\[
S_\beta= \beta \begin{pmatrix} 1&-1/2&-1/2\\ -1/2&1&-1/2\\ -1/2&-1/2&1 \end{pmatrix}.
\]

Apply row-wise softmax.

Let

\[
r=e^{3\beta/2}.
\]

Then

\[
\boxed{ A_\beta= \frac1{r+2} \begin{pmatrix} r&1&1\\ 1&r&1\\ 1&1&r \end{pmatrix}. }
\]

Each row sums to one. Every entry is nonnegative.

Define the projector onto constant vectors:

\[
P_0=\frac13\mathbf1\mathbf1^\top.
\]

Define the projector onto the orthogonal complement:

\[
P_\perp=I-P_0.
\]

Then

\[
\boxed{ A_\beta=P_0+\lambda_\beta P_\perp }
\]

with

\[
\boxed{ \lambda_\beta= \frac{r-1}{r+2}. }
\]

The eigenvalues are

\[
\operatorname{spec}(A_\beta) = \{1,\lambda_\beta,\lambda_\beta\}.
\]

The eigenvalue 1 belongs to the constant mode.

The two nonconstant modes have the same gain \(\lambda_\beta\).

At \(\beta=0\),

\[
r=1,\qquad\lambda_\beta=0.
\]

Thus,

\[
A_0=P_0.
\]

Every output becomes the mean of the three input values.

As \(\beta\to\infty\),

\[
\lambda_\beta\to1.
\]

Therefore,

\[
A_\beta\to I.
\]

The operator approaches identity attention.

This gives an exact relation between bandwidth and positional smoothing.

## 6. Repeated attention suppresses positional differences

Apply the same attention operator repeatedly:

\[
v^{(L)}=A_\beta^Lv^{(0)}.
\]

The projectors satisfy

\[
P_0^2=P_0,\qquad P_\perp^2=P_\perp,\qquad P_0P_\perp=0.
\]

Therefore,

\[
\boxed{ A_\beta^L=P_0+\lambda_\beta^LP_\perp. }
\]

For finite \(\beta>0\),

\[
0<\lambda_\beta<1.
\]

Thus,

\[
\lim_{L\to\infty}A_\beta^L=P_0.
\]

The output converges to the constant component of the original signal.

This is spectral smoothing.

The result applies to repeated use of the same fixed operator. A complete transformer has residual connections, learned projections, nonlinearities, and content-dependent weights. These operations change the layer-to-layer dynamics.

Nevertheless, the fixed operator gives a precise reference model for how attention suppresses positional variation.

## 7. Derive the optimal bandwidth from bias and variance

Assume that the observed scalar values contain signal and noise:

\[
y=f+\varepsilon.
\]

Let

\[
\varepsilon\sim\mathcal N(0,\sigma^2I_3).
\]

The estimator is

\[
\hat f=A_\beta y.
\]

Decompose the true signal:

\[
f=P_0f+P_\perp f.
\]

Define its nonconstant signal energy:

\[
S=\|P_\perp f\|^2.
\]

The expected estimate is

\[
\mathbb E[\hat f] = P_0f+\lambda_\beta P_\perp f.
\]

Therefore, its bias is

\[
\operatorname{Bias}(\hat f) = -(1-\lambda_\beta)P_\perp f.
\]

The squared bias is

\[
(1-\lambda_\beta)^2S.
\]

The total variance is

\[
\sigma^2\operatorname{tr}(A_\beta^2) = \sigma^2(1+2\lambda_\beta^2).
\]

The mean squared error per position is

\[
\boxed{ \operatorname{MSE}= \frac{ (1-\lambda_\beta)^2S + \sigma^2(1+2\lambda_\beta^2) }{3}. }
\]

Differentiate with respect to \(\lambda_\beta\):

\[
-2(1-\lambda_\beta)S + 4\sigma^2\lambda_\beta=0.
\]

Solve:

\[
\boxed{ \lambda^*= \frac{S}{S+2\sigma^2}. }
\]

Now invert the relation between \(\lambda_\beta\) and \(\beta\):

\[
\lambda_\beta= \frac{e^{3\beta/2}-1} {e^{3\beta/2}+2}.
\]

The optimal concentration is

\[
\boxed{ \beta^* = \frac23\log\left( 1+\frac{3S}{2\sigma^2} \right). }
\]

This is an exact oracle bandwidth formula for the specified three-position signal-plus-noise model.

When signal energy is high relative to noise, the optimal kernel becomes narrow.

When signal energy is low relative to noise, the optimal kernel becomes broad.

The bandwidth is therefore determined by the signal-to-noise ratio.

## 8. Estimate the bandwidth from observed data

The oracle formula contains the unknown quantity \(S\).

We observe \(y\), not \(f\).

Define

\[
Q=\|P_\perp y\|^2.
\]

Expand:

\[
Q= \|P_\perp(f+\varepsilon)\|^2.
\]

Take expectations:

\[
\mathbb E[Q] = S+\sigma^2\operatorname{tr}(P_\perp).
\]

Since

\[
\operatorname{tr}(P_\perp)=2,
\]

we obtain

\[
\boxed{ \mathbb E[Q]=S+2\sigma^2. }
\]

This gives the noise-corrected estimator

\[
\hat S=(Q-2\sigma^2)_+,
\]

where \((x)_+=\max(x,0)\).

The resulting shrinkage estimate is

\[
\boxed{ \hat\lambda= \left(1-\frac{2\sigma^2}{Q}\right)_+ }
\]

for \(Q>0\).

Then

\[
\boxed{ \hat\beta= \frac23\log \left( \frac{1+2\hat\lambda}{1-\hat\lambda} \right). }
\]

This makes bandwidth selection data-dependent.

It is a plug-in estimator, not the exact oracle. It assumes that we know or can estimate the noise variance. It can also have high sampling variability when only three observations are available.

The important result is that the oracle theory gives a computable rule after we supply a noise estimate.

## 9. Generalize to the cyclic group \(\mathbb Z_n\)

For \(n\) positions, define the complex Fourier characters

\[
\psi_m(p)=e^{2\pi imp/n}, \qquad m=0,\ldots,n-1.
\]

They satisfy orthogonality:

\[
\frac1n\sum_{p=0}^{n-1} \psi_m(p)\overline{\psi_\ell(p)} = \delta_{m\ell}.
\]

These characters form a complete orthonormal basis for functions on \(\mathbb Z_n\).

Define the kernel

\[
K_\beta(p,q)= e^{\beta\cos(2\pi(p-q)/n)}.
\]

It depends only on the difference \(p-q\).

Therefore, the kernel matrix is circulant.

Its row sum is constant:

\[
Z_\beta= \sum_{r=0}^{n-1} e^{\beta\cos(2\pi r/n)}.
\]

The normalized attention matrix is

\[
A_\beta(p,q)=\frac{K_\beta(p,q)}{Z_\beta}.
\]

Every Fourier character is an eigenvector:

\[
\boxed{ A_\beta\psi_m = \lambda_m(\beta)\psi_m. }
\]

The eigenvalues are

\[
\boxed{ \lambda_m(\beta)= \frac{ \sum_{r=0}^{n-1} e^{\beta\cos(2\pi r/n)} \cos(2\pi mr/n) }{ Z_\beta }. }
\]

Thus, we know the complete spectrum of the attention operator.

For an input signal

\[
v(p)=\sum_m\hat v_m\psi_m(p),
\]

the output is

\[
(A_\beta v)(p) = \sum_m\lambda_m(\beta)\hat v_m\psi_m(p).
\]

Therefore,

\[
\boxed{ \widehat{A_\beta v}_m = \lambda_m(\beta)\hat v_m. }
\]

Attention multiplies each positional Fourier coefficient by a spectral gain.

This is the exact frequency-space description of the regression operator.

## 10. Bessel functions give the spectral gains

The exponential cosine function has the Fourier expansion

\[
e^{\beta\cos\theta} = \sum_{k=-\infty}^{\infty} I_k(\beta)e^{ik\theta}.
\]

Here \(I_k\) is a modified Bessel function of the first kind.

Sampling the function at \(n\) equally spaced angles causes frequency aliasing.

Consequently,

\[
\boxed{ \lambda_m(\beta)= \frac{ \sum_{\ell\in\mathbb Z}I_{m+\ell n}(\beta) }{ \sum_{\ell\in\mathbb Z}I_{\ell n}(\beta) }. }
\]

This formula is exact for the finite cyclic group.

For fixed \(m\) and \(\beta\), as \(n\) increases,

\[
\lambda_m(\beta) \longrightarrow \frac{I_m(\beta)}{I_0(\beta)}.
\]

Thus, Bessel ratios describe the spectral response of the continuous circular kernel.

The relationship is now complete:

Chebyshev polynomials construct the rotation harmonics. Fourier characters diagonalize the kernel. Bessel functions determine the gains.

## 11. The general optimal filter is the Wiener filter

Assume the signal and noise have independent Fourier components.

For frequency \(m\), let the signal power be \(S_m\) and the noise variance be \(\sigma^2\).

Suppose we apply a real spectral gain \(g_m\).

The risk for that frequency is

\[
R_m(g_m) = (1-g_m)^2S_m+\sigma^2g_m^2.
\]

Differentiate:

\[
\frac{dR_m}{dg_m} = -2(1-g_m)S_m+2\sigma^2g_m.
\]

Set the derivative to zero:

\[
\boxed{ g_m^*= \frac{S_m}{S_m+\sigma^2}. }
\]

This is the Wiener shrinkage rule.

It gives the optimal gain for each frequency under the specified squared-error model.

But our rotational attention kernel does not have independent gains. It uses one concentration parameter \(\beta\), which determines every \(\lambda_m(\beta)\).

Therefore, its total risk is

\[
\boxed{ R(\beta)= \sum_m \left[ (1-\lambda_m(\beta))^2S_m + \sigma^2\lambda_m(\beta)^2 \right]. }
\]

The constant mode has gain 1 and contributes a term independent of \(\beta\).

Differentiate the risk:

\[
R'(\beta) = 2\sum_m\lambda_m'(\beta) \left[ (\lambda_m(\beta)-1)S_m + \sigma^2\lambda_m(\beta) \right].
\]

An interior optimum satisfies

\[
\boxed{ \sum_m\lambda_m'(\beta) \left[ (1-\lambda_m(\beta))S_m - \sigma^2\lambda_m(\beta) \right]=0. }
\]

For three positions, the two nonconstant modes have the same gain. This gives the closed-form bandwidth derived earlier.

For general \(n\), different frequencies compete for the same bandwidth.

One value of \(\beta\) must control many spectral gains.

This is a constrained spectral allocation problem.

## 12. Use multiple rotation harmonics

A single bandwidth gives limited control.

We can use several rotation harmonics:

\[
c_m(r)=\cos\frac{2\pi mr}{n}.
\]

Select a set of frequencies \(\mathcal M\).

Define

\[
s_{\boldsymbol\beta}(r) = \sum_{m\in\mathcal M}\beta_m c_m(r).
\]

The normalized kernel is

\[
\boxed{ \pi_{\boldsymbol\beta}(r)= \frac{ \exp\left(\sum_{m\in\mathcal M}\beta_m c_m(r)\right) }{ Z(\boldsymbol\beta) }. }
\]

The partition function is

\[
Z(\boldsymbol\beta) = \sum_r \exp\left(\sum_m\beta_m c_m(r)\right).
\]

This is a finite exponential family.

Its spectral gains are moments:

\[
\boxed{ \lambda_k= \mathbb E_{\pi_{\boldsymbol\beta}}[c_k]. }
\]

The parameters \(\beta_m\) control the harmonic statistics of the kernel.

With distinct, independent cosine bands, the exponential family has one natural parameter per selected band.

If we use all independent cosine bands, we can represent every strictly positive symmetric probability distribution on the cyclic group. If we use fewer bands, the family is more restrictive.

## 13. The spectral Jacobian is Fisher information

Differentiate a spectral moment with respect to a harmonic parameter:

\[
\frac{\partial\lambda_k}{\partial\beta_m} = \frac{\partial}{\partial\beta_m} \mathbb E_\pi[c_k].
\]

The exponential-family derivative identity gives

\[
\boxed{ \frac{\partial\lambda_k}{\partial\beta_m} = \operatorname{Cov}_\pi(c_k,c_m). }
\]

Use the product-to-sum identity:

\[
\cos a\cos b = \frac12[\cos(a+b)+\cos(a-b)].
\]

Then

\[
\mathbb E_\pi[c_kc_m] = \frac12(\lambda_{k+m}+\lambda_{k-m}).
\]

Therefore,

\[
\boxed{ \frac{\partial\lambda_k}{\partial\beta_m} = \frac12(\lambda_{k+m}+\lambda_{k-m}) -\lambda_k\lambda_m. }
\]

Indices are taken modulo \(n\), with

\[
\lambda_{-j}=\lambda_j.
\]

For a single fundamental harmonic,

\[
\boxed{ \lambda_k' = \frac12(\lambda_{k-1}+\lambda_{k+1}) -\lambda_1\lambda_k. }
\]

This is an exact derivative formula. We do not need to evaluate derivatives of Bessel functions separately.

Now restrict the Jacobian to the selected independent bands:

\[
J_{km} = \frac{\partial\lambda_k}{\partial\beta_m}.
\]

Then

\[
\boxed{ J=\nabla^2\log Z = \operatorname{Cov}_\pi(c_{\mathcal M}). }
\]

This matrix is the Fisher information matrix of the exponential family.

For a minimal parameterization with strictly positive probabilities, the Fisher matrix is positive definite.

It describes how changes in harmonic parameters change the spectral moments.

The geometry of bandwidth selection is therefore an information-geometric problem.

## 14. Solve the inverse moment problem

Suppose we want the selected spectral moments to equal a target vector \(\boldsymbol\mu\).

We seek parameters satisfying

\[
\boldsymbol\lambda_{\mathcal M}(\boldsymbol\beta) = \boldsymbol\mu.
\]

Define the objective

\[
\boxed{ F(\boldsymbol\beta) = \log Z(\boldsymbol\beta) - \boldsymbol\beta^\top\boldsymbol\mu. }
\]

Its gradient is

\[
\nabla F = \boldsymbol\lambda_{\mathcal M}-\boldsymbol\mu.
\]

Its Hessian is

\[
\nabla^2F=J.
\]

Because \(J\) is positive semidefinite, the objective is convex.

For a minimal exponential family and a target in the interior of its moment polytope, there is a unique finite parameter solution.

Newton's method gives

\[
\boxed{ \boldsymbol\beta_{\mathrm{new}} = \boldsymbol\beta - J^{-1} (\boldsymbol\lambda_{\mathcal M}-\boldsymbol\mu). }
\]

This is a moment-matching algorithm.

The resulting distribution is the maximum-entropy distribution that matches the selected moments.

This is an important distinction: matching selected moments is a convex problem, but minimizing the full Wiener risk over the same exponential-family parameters is not necessarily convex.

The two objectives are related, but they are not identical.

## 15. Nonnegative attention creates a feasible spectral region

Now consider the most important restriction.

An attention row is a probability vector:

\[
\pi_r\ge0, \qquad \sum_r\pi_r=1.
\]

For a symmetric circulant kernel,

\[
\pi_r=\pi_{-r}.
\]

Its spectral gains are

\[
g_k= \sum_r\pi_r\cos\frac{2\pi kr}{n}.
\]

The gains cannot be chosen independently.

Define the feasible set

\[
\boxed{ \mathcal P_n= \left\{ \boldsymbol g: g_k=\sum_r\pi_r c_k(r),\ \pi_r\ge0,\ \sum_r\pi_r=1,\ \pi_r=\pi_{-r} \right\}. }
\]

This is a convex polytope.

Its vertices are generated by the cosine vectors associated with the distinct position differences.

This follows because the spectral-gain vector is a linear image of the probability simplex, with the symmetry constraint imposed.

Every feasible gain vector must satisfy the Fourier consistency conditions of a nonnegative probability kernel.

The gains are also bounded:

\[
-1\le g_k\le1.
\]

But these individual bounds are not sufficient. The gains must be jointly consistent.

For example, suppose we want to preserve one nonconstant frequency \(k_0\) and suppress every other nonconstant frequency.

For a nondegenerate frequency pair, the inverse Fourier transform gives

\[
\pi_r= \frac1n \left[ 1+2a\cos\frac{2\pi k_0r}{n} \right],
\]

where \(a\) is the desired gain at that pair.

Nonnegativity requires

\[
1+2a\min_r c_{k_0}(r)\ge0.
\]

If the sampled cosine reaches \(-1\), then

\[
a\le\frac12.
\]

Thus, a high gain at one isolated frequency can be impossible when all other nonconstant gains must be zero.

The exact bound depends on the cyclic group and the frequency.

For \(n=3\), the minimum sampled cosine is \(-1/2\), and the corresponding upper bound is 1.

The restriction is not that attention can never preserve a frequency strongly. Identity attention preserves every frequency with gain 1.

The restriction is that attention cannot freely preserve one frequency while suppressing all others.

This is a consequence of nonnegative normalized weights.

## 16. Project the Wiener filter onto the feasible region

The unconstrained Wiener target is

\[
g_k^*=\frac{S_k}{S_k+\sigma^2}.
\]

But this target vector may not belong to \(\mathcal P_n\).

We must find the best feasible approximation.

Complete the square in the spectral risk:

\[
(1-g_k)^2S_k+\sigma^2g_k^2 = (S_k+\sigma^2)(g_k-g_k^*)^2+C_k,
\]

where \(C_k\) does not depend on \(g_k\).

Therefore, the optimal symmetric stochastic circulant kernel solves

\[
\boxed{ \min_{\boldsymbol g\in\mathcal P_n} \sum_k (S_k+\sigma^2)(g_k-g_k^*)^2. }
\]

This is a convex quadratic optimization problem.

It is a weighted projection of the Wiener filter onto the feasible spectral polytope.

The weights

\[
S_k+\sigma^2
\]

form the risk metric.

Errors at frequencies with more signal or noise power receive greater weight.

This gives a precise definition of the best attainable spectral response.

We can now distinguish three levels of filtering:

| Filter class                          | Available spectral responses                          |
| ------------------------------------- | ----------------------------------------------------- |
| Unconstrained linear filter           | Independent frequency gains                           |
| Symmetric stochastic circulant kernel | Gains inside \(\mathcal P_n\)                       |
| Restricted multi-band softmax kernel  | Gains on a parameterized subset of \(\mathcal P_n\) |

This distinction is central.

The Wiener filter gives the statistical target. The probability simplex gives the hard constraints. The exponential-family parameterization gives the implementation constraints.

## 17. Generalize from cyclic groups to arbitrary symmetries

The cyclic group is only one possible index symmetry.

Let a finite group \(G\) act transitively on an index set \(X\).

We can write

\[
X=G/H,
\]

where \(H\) is the stabilizer of a reference point.

Let

\[
\rho:G\to U(V)
\]

be a unitary representation.

Select a vector \(v\in V\) fixed by every element of \(H\):

\[
\rho(h)v=v \qquad\text{for all }h\in H.
\]

Define

\[
\phi(gH)=\rho(g)v.
\]

This is well-defined because the vector is \(H\)-fixed.

Construct the kernel

\[
\boxed{ K(gH,g'H) = \langle\rho(g)v,\rho(g')v\rangle. }
\]

It is positive semidefinite because it is a Gram kernel.

It is invariant because the representation is unitary:

\[
K(ax,ay)=K(x,y).
\]

For a finite group acting on itself, a character also gives a positive-semidefinite kernel:

\[
K(g,h)= \chi_\rho(g^{-1}h).
\]

Indeed,

\[
\chi_\rho(g^{-1}h) = \operatorname{tr}(\rho(g)^*\rho(h)).
\]

This is a Hilbert–Schmidt inner product between representation matrices.

A character kernel on \(G\) does not automatically define a kernel on \(G/H\). The \(H\)-fixed feature construction supplies the required consistency.

## 18. Invariant kernels give equivariant attention

Suppose a group acts on a finite index set \(X\).

Let the kernel satisfy

\[
K(gx,gy)=K(x,y).
\]

Define the row sum

\[
Z(x)=\sum_{y\in X}K(x,y).
\]

Then

\[
\begin{aligned} Z(gx) &=\sum_yK(gx,y)\\ &=\sum_zK(gx,gz)\\ &=\sum_zK(x,z)\\ &=Z(x). \end{aligned}
\]

Therefore, \(Z\) is constant on each group orbit.

If the action is transitive, \(Z\) is constant across the entire index set.

If the action is not transitive, \(Z\) can differ between orbits.

Define normalized attention:

\[
A(x,y)=\frac{K(x,y)}{Z(x)}.
\]

Assume \(Z(x)>0\).

Then

\[
\boxed{ A(gx,gy)=A(x,y). }
\]

Thus, the normalized attention operator is equivariant.

Transitivity is sufficient for a global constant row sum, but it is not necessary for equivariance.

The unnormalized invariant kernel operator is already equivariant when the underlying measure is invariant. Normalization makes it a stochastic operator while preserving that property.

Masks also require care.

An invariant mask preserves equivariance. A mask that does not respect the selected group action can break it.

For example, a causal mask is compatible with appropriate translations on an infinite ordered sequence. It is not compatible with arbitrary permutations of positions.

## 19. Schur's lemma determines the spectral blocks

Let the permutation representation of \(G\) on the index space decompose into irreducible components:

\[
\mathbb C^X = \bigoplus_{\sigma} V_\sigma\otimes\mathbb C^{m_\sigma}.
\]

Here \(V_\sigma\) is an irreducible representation of dimension \(d_\sigma\), and \(m_\sigma\) is its multiplicity.

An equivariant linear operator commutes with the group representation.

By Schur's lemma, it has the form

\[
\boxed{ A= \bigoplus_\sigma I_{d_\sigma}\otimes B_\sigma. }
\]

The matrix \(B_\sigma\) acts on the multiplicity space.

For abelian groups, irreducible representations are one-dimensional. The decomposition reduces to Fourier modes.

For nonabelian groups, the blocks can be matrix-valued.

Eigenvalues of \(B_\sigma\) appear with multiplicity at least \(d_\sigma\), counting algebraic multiplicities.

This gives a structural prediction for any equivariant attention operator.

The group determines which spectral blocks exist. The kernel determines the operator within those blocks.

## 20. Symmetry controls expressivity

The choice of symmetry is a modeling decision.

Consider the full permutation group \(S_n\) acting on \(n\) positions.

Its natural permutation representation decomposes into two parts:

\[
\mathbb R^n = \operatorname{span}\{\mathbf1\} \oplus\mathbf1^\perp.
\]

Every linear operator that commutes with all permutations has the form

\[
\boxed{ A=aI+b\mathbf1\mathbf1^\top. }
\]

Such an operator has only two distinct spectral gains.

It can distinguish the mean from deviations around the mean. It cannot assign an independent gain to each positional frequency.

Now reduce the symmetry to cyclic shifts.

The admissible linear operators become circulant matrices:

\[
A_{pq}=f(q-p).
\]

These operators have a full Fourier spectral description.

They permit substantially more independent frequency responses.

This creates a tradeoff.

Too much imposed symmetry restricts the operator family.

Too little symmetry removes useful structure and can increase the amount of information the model must learn.

The correct symmetry depends on the task and index structure.

For ordered sequences, translations can be useful.

For sets, permutations are natural.

For graphs, graph automorphisms or local structural symmetries can be useful.

For geometric data, rotations and other spatial transformations can be useful.

A model must select the symmetry that preserves the relationships relevant to its task.

## 21. RoPE gives content-dependent rotational similarity

Rotary Positional Embeddings use rotation matrices to transform queries and keys.

Let

\[
a_p=W_Qx_p,\qquad b_q=W_Kx_q.
\]

Apply positional rotations:

\[
Q_p=R_pa_p,\qquad K_q=R_qb_q.
\]

The attention logit is

\[
s_{pq} = \frac{Q_p^\top K_q}{\sqrt d}.
\]

Use orthogonality:

\[
R_p^\top R_q=R_{q-p}.
\]

Therefore,

\[
\boxed{ s_{pq} = \frac{a_p^\top R_{q-p}b_q}{\sqrt d}. }
\]

For one two-dimensional rotation block,

\[
R_\Delta = \cos(\Delta\theta)I+ \sin(\Delta\theta)J,
\]

where

\[
J= \begin{pmatrix} 0&-1\\ 1&0 \end{pmatrix}.
\]

Then

\[
\boxed{ s_{pq} = \frac{ (a_p^\top b_q)\cos(\Delta\theta) + (a_p^\top Jb_q)\sin(\Delta\theta) }{\sqrt d}. }
\]

This is the exact RoPE logit decomposition for one block.

The cosine and sine functions are rotational harmonics.

But their coefficients depend on content.

Thus, an individual RoPE attention matrix is generally not circulant.

This does not mean that the full RoPE attention map loses translation equivariance. When we shift the content and positions together, the relative displacement remains unchanged, subject to compatible domain and mask conditions.

The important distinction is:

A fixed positional kernel has an exact Fourier eigenbasis.

A content-dependent RoPE operator generally does not have that same fixed eigenbasis for each input.

## 22. Bound the effect of content perturbations

Take a fixed positional logit matrix \(S^0\).

Add a content-dependent perturbation:

\[
S=S^0+\epsilon G,
\]

where

\[
|G_{pq}|\le M.
\]

Define

\[
\delta=|\epsilon|M.
\]

Let

\[
A^0=\operatorname{softmax}_{row}(S^0)
\]

and

\[
A=\operatorname{softmax}_{row}(S).
\]

The perturbation changes the normalized weights by exponential reweighting.

For each row,

\[
\boxed{ \|A_{p,:}-A^0_{p,:}\|_1 \le2\tanh(\delta/2). }
\]

Therefore,

\[
\|A-A^0\|_F \le2\sqrt n\tanh(\delta/2).
\]

Since the operator norm is bounded by the Frobenius norm,

\[
\boxed{ \|A-A^0\|_2 \le2\sqrt n\tanh(\delta/2). }
\]

The reference rotational attention matrix \(A^0\) is symmetric and circulant, so it is normal.

Every eigenvalue \(\mu\) of \(A\) must lie within distance

\[
2\sqrt n\tanh(\delta/2)
\]

of at least one eigenvalue of \(A^0\).

Thus,

\[
\boxed{ \min_k|\mu-\lambda_k(A^0)| \le2\sqrt n\tanh(\delta/2). }
\]

This gives spectral inclusion, not a guaranteed one-to-one matching of eigenvalues.

The singular values satisfy the corresponding perturbation bound:

\[
\boxed{ |\sigma_k(A)-\sigma_k(A^0)| \le2\sqrt n\tanh(\delta/2). }
\]

For small \(\delta\),

\[
2\sqrt n\tanh(\delta/2) \approx\sqrt n\,\delta.
\]

The result gives a quantitative relation between a stationary positional reference kernel and a content-modulated attention matrix.

It does not require the content-dependent matrix to be symmetric.

## 23. The three engineering problems

The theory identifies three separate decisions.

First: select the symmetry.

Choose the group action and representation that match the structure of the task.

This determines the admissible kernel family and the available spectral decomposition.

Second: select the spectral response.

Use signal and noise statistics to calculate a target frequency response.

Project this target onto the feasible spectral region.

Then fit kernel parameters to realize an appropriate response.

Third: control content dependence.

Allow queries and keys to change attention according to content.

Measure or bound how much the resulting operator differs from its positional reference.

These problems interact, but they are not identical.

Symmetry determines the operator class.

Statistics determines the preferred response.

Content determines the input-specific operator.

## 24. Final mathematical formulation

We can summarize the complete construction with five equations.

The first equation defines the representation-based positional kernel:

\[
\boxed{ K(x,y)=\langle\phi(x),\phi(y)\rangle. }
\]

The second defines normalized kernel attention:

\[
\boxed{ A_{xy}= \frac{e^{\beta K(x,y)}} {\sum_z e^{\beta K(x,z)}}. }
\]

The third gives the spectral action for a cyclic stationary kernel:

\[
\boxed{ \widehat{Av}_m=g_m\hat v_m. }
\]

The fourth gives the statistically optimal unconstrained response:

\[
\boxed{ g_m^*=\frac{S_m}{S_m+\sigma^2}. }
\]

The fifth gives the constrained optimization:

\[
\boxed{ \min_{\boldsymbol g\in\mathcal P_n} \sum_m (S_m+\sigma^2)(g_m-g_m^*)^2. }
\]

The feasible region \(\mathcal P_n\) is determined by the requirement that the attention kernel be a nonnegative normalized probability kernel with the selected symmetry.

A restricted softmax parameterization imposes additional constraints.

The Fisher information matrix gives the local relation between harmonic parameters and spectral moments:

\[
\boxed{ J_{km} = \frac12(g_{k+m}+g_{k-m})-g_kg_m. }
\]

This completes the mathematical connection between symmetry, rotation, orthogonal harmonics, kernel regression, spectral filtering, and bandwidth selection.

## Conclusion

We started with three integers.

We mapped these integers to rotations in two dimensions. The rotations produced orthogonal feature columns. Their traces gave cosine characters. Chebyshev polynomials expressed higher harmonics from a fundamental cosine.

We used the character similarity to construct a positive kernel. Normalization converted the kernel into attention weights. The resulting operation was Nadaraya–Watson regression.

For cyclic positions, the kernel was circulant. Fourier characters diagonalized the attention operator. Its eigenvalues described the attenuation of each positional frequency.

The three-position example gave an exact bias–variance optimum and an oracle bandwidth formula. A noise-corrected signal-energy estimate provided a data-driven bandwidth rule.

For longer sequences, the Wiener filter supplied the optimal unconstrained spectral target. Nonnegative normalized attention imposed joint constraints on the frequency gains. These constraints produced a convex feasible spectral region.

Multi-band rotational kernels formed an exponential family. Their spectral moments had a Fisher-information Jacobian. Moment matching became a convex maximum-entropy problem.

Group representation theory extended the construction beyond cyclic positions. It determined the invariant subspaces and spectral blocks of equivariant operators.

Content-dependent attention then introduced a perturbation of the fixed positional reference operator. This separated exact stationary spectral theory from the behavior of individual content-dependent attention matrices.

The final result is:

\[
\boxed{ \begin{gathered} \text{Symmetry determines the admissible operator.}\\ \text{Probability determines the feasible spectrum.}\\ \text{Statistics determines the target response.}\\ \text{Bandwidth selects an attainable response.}\\ \text{Content adapts the operator to the input.} \end{gathered} }
\]

Attention is a constrained spectral estimator.

This is the central mathematical interpretation.
