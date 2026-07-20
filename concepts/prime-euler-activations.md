# Prime Euler Activations and ZetaDrop

## Core Idea

The Multiplicative PINN framework applies an arithmetic gate at the loss level:

\[
L_{\text{mult}}=L_{\text{data}}\cdot C(v),
\]

where \(v\) measures constraint violation and \(C(v)\) rescales the optimization landscape. This preserves the main data-gradient direction while adding a structured correction through

\[
\nabla_\theta L_{\text{mult}}
=
C(v)\nabla_\theta L_{\text{data}}
+
L_{\text{data}}\nabla_\theta C(v).
\]

The same mechanism can be moved inside the network.

Instead of applying the arithmetic gate only to the final loss, we can apply it to activations, channels, attention heads, LoRA ranks, or experts:

\[
h_{l+1}
=
\sigma(W_lh_l+b_l)\odot A_\theta(z_l,c_l).
\]

The conceptual mutation is:

\[
\boxed{
\text{loss-level constraint gate}
\Rightarrow
\text{layer-level representation gate}
\Rightarrow
\text{activation-level spectral gate}.
}
\]

The resulting object is a Prime Euler activation: a neural nonlinearity whose response is modulated by a finite Euler product.

---

## Prime Euler Gated Activation

Let \(P\) be a finite set of primes. Define a positive spectral coordinate

\[
v=\operatorname{softplus}(z).
\]

The Euler gate is

\[
G(z)
=
\prod_{p\in P}
\left(1-p^{-\tau \operatorname{softplus}(z)}\right).
\]

A direct Prime Euler activation is

\[
\boxed{
\operatorname{EulerGate}(z)
=
z\prod_{p\in P}
\left(1-p^{-\tau \operatorname{softplus}(z)}\right).
}
\]

A smoother practical version uses SiLU as the base activation:

\[
\operatorname{SiLU}(z)=z\sigma(z),
\]

and gates it:

\[
\boxed{
\operatorname{PESiLU}(z)
=
\operatorname{SiLU}(z)\cdot G(z).
}
\]

Here PESiLU means **Prime Euler Gated SiLU**.

The softplus is important because the Euler product naturally wants a nonnegative coordinate:

\[
s=\tau v.
\]

Thus the activation does not merely ask whether \(z>0\), as ReLU does. It asks which arithmetic spectral coordinate the activation occupies.

---

## Residual PESiLU

The raw Euler product satisfies

\[
G(0)=0,
\]

because each factor becomes \(1-1=0\). For activations, this can over-suppress gradients. A safer version keeps the base activation alive and uses the Euler gate only as a modulation:

\[
\boxed{
\operatorname{ResidualPESiLU}(z)
=
\operatorname{SiLU}(z)
\left(1+\alpha G(z)\right).
}
\]

This gives:

\[
\text{base activation}
+
\text{prime spectral modulation}.
\]

In practice this is the first version to benchmark, because it preserves the stability of SiLU while injecting a controlled arithmetic response.

---

## Constraint-Aware Activation Gate

The activation gate can depend on a local constraint score rather than directly on \(z\).

Let

\[
v_l=\phi_l(h_l)
\]

measure local violation, salience, uncertainty, curvature, or physics inconsistency. Examples include:

\[
v_l=|\nabla_x h_l|^2
\]

for smoothness,

\[
v_l=\max(0,-h_l)
\]

for positivity,

\[
v_l=|\nabla\cdot u_l|^2
\]

for incompressibility, or a learned score

\[
v_l=\operatorname{softplus}(a^\top h_l+b).
\]

Then define

\[
\boxed{
h_{l+1}
=
\sigma(W_lh_l+b_l)\odot C(v_l).
}
\]

with

\[
C(v_l)
=
\operatorname{clamp}
\left[
\max\left(
\prod_{p\in P}(1-p^{-\tau v_l}),
e^{\gamma v_l}
\right),
\epsilon,
M
\right].
\]

This moves the Multiplicative PINN mechanism from global loss space into local representation space. The network does not wait for the final loss to punish constraint violations; it routes information differently through layers depending on constraint compatibility.

---

## Prime-Indexed Sparse Parameters

The same gate can induce structured sparsity.

Assign each neuron, channel, attention head, LoRA rank, or expert a prime:

\[
p_1=2,\quad p_2=3,\quad p_3=5,\quad p_4=7,\dots.
\]

Then gate parameter block \(\theta_i\) by

\[
g_i(v)=1-p_i^{-\tau v},
\]

so the effective parameter is

\[
\theta_i^{\mathrm{eff}}
=
g_i(v)\theta_i.
\]

For small \(v\),

\[
p_i^{-\tau v}
\approx
1-\tau v\log p_i,
\]

and therefore

\[
g_i(v)
=
1-p_i^{-\tau v}
\approx
\tau v\log p_i.
\]

This means prime-indexed blocks open at rates controlled by \(\log p_i\).

There is also an attenuation form:

\[
a_i(v)=p_i^{-\tau v}.
\]

This gives the opposite sparsity regime:

\[
\boxed{
a_i(v)=p_i^{-\tau v}
\Rightarrow
\text{small-prime core stays active while large-prime tail sparsifies}.
}
\]

The opening form gives:

\[
\boxed{
g_i(v)=1-p_i^{-\tau v}
\Rightarrow
\text{large-prime refiners activate differently as violation grows}.
}
\]

Together these define arithmetic structured sparsity:

\[
2,3,5
=
\text{core basis},
\]

\[
7,11,13,\dots
=
\text{refinement basis},
\]

\[
\text{large primes}
=
\text{rare or high-frequency exception handlers}.
\]

---

## ZetaDrop

ZetaDrop is the dropout-like version of the idea.

Ordinary dropout randomly suppresses units. ZetaDrop suppresses channels according to an Euler-product arithmetic prior:

\[
\boxed{
\operatorname{ZetaDrop}(h_i)
=
h_i\cdot p_i^{-\tau v}.
}
\]

This is not random sparsity. It is spectral sparsity.

A channel with a small prime index remains active longer:

\[
2^{-\tau v}
>
3^{-\tau v}
>
5^{-\tau v}
>
7^{-\tau v}.
\]

Thus the network receives a deterministic hierarchy:

\[
\text{input difficulty or constraint violation}
\Rightarrow
\text{prime-indexed parameter budget}.
\]

Low-complexity inputs can use the small-prime core. Harder or higher-violation inputs can activate larger-prime refiners.

---

## Prime Mixture of Experts

A practical MoE version assigns each expert \(E_i\) a prime \(p_i\). Define

\[
g_i(x)=1-p_i^{-\tau v(x)}
\]

or normalized weights

\[
\alpha_i(x)
=
\frac{g_i(x)}{\sum_j g_j(x)}.
\]

Then

\[
y
=
\sum_i\alpha_i(x)E_i(x).
\]

Small-prime experts provide coarse correction. Larger-prime experts become fine-correction experts. This is MoE-style conditional computation, but with a deterministic arithmetic prior instead of a fully learned softmax router.

---

## Spectral Gradient Engine

The mathematical reason the gate is not an arbitrary nonlinearity is its log-gradient.

For

\[
G(v)=\prod_{p\in P}(1-p^{-\tau v}),
\]

we have

\[
\frac{d}{dv}\log G(v)
=
\tau
\sum_{p\in P}
\frac{\log p\;p^{-\tau v}}{1-p^{-\tau v}}.
\]

Expanding the denominator gives

\[
\frac{d}{dv}\log G(v)
=
\tau
\sum_{p\in P}
\sum_{k\ge1}
(\log p)p^{-k\tau v}.
\]

This is a finite-prime analogue of

\[
-\frac{\zeta'(s)}{\zeta(s)}
=
\sum_{p,k\ge1}
\frac{\log p}{p^{ks}}
=
\sum_{n\ge1}\frac{\Lambda(n)}{n^s}.
\]

So each gated neuron or parameter block receives a gradient correction shaped like a truncated prime-power spectrum.

Normal activations have simple response curves:

\[
\text{ReLU}=\text{threshold},
\]

\[
\text{GELU/SiLU}=\text{smooth probabilistic gate}.
\]

Prime Euler activations add a new layer:

\[
\boxed{
\text{activation}
=
\text{smooth gate}
+
\text{arithmetic spectral hierarchy}.
}
\]

---

## Arithmetic Feature Grammar

Prime-indexed parameters also suggest a factorization grammar for neural features.

Atomic channels are assigned primes:

\[
p_i=\text{atomic feature}.
\]

Composite interactions are represented by products:

\[
p_ip_j=\text{pairwise interaction},
\]

\[
p_ip_jp_k=\text{higher-order interaction}.
\]

Prime powers represent repeated self-interactions:

\[
p_i^k=\text{repeated self-interaction}.
\]

This mirrors the logarithmic derivative of the Euler product:

\[
-\frac{\zeta'}{\zeta}
=
\sum_{p,k}
\frac{\log p}{p^{ks}}.
\]

The architectural claim is that a network can separate atomic features, pairwise composites, and higher-order interactions using the arithmetic topology of primes and composites.

---

## Practical Design

A concrete layer-level design is

\[
h_{l+1}
=
\sum_{i=1}^{m}
p_i^{-\tau v_l}
\cdot
\sigma(W_{l,i}h_l).
\]

Add a budget penalty:

\[
\Omega
=
\lambda
\sum_i
(\log p_i)^\alpha
\|W_{l,i}\|_F^2.
\]

or

\[
\Omega
=
\lambda
\sum_i
p_i^\beta
\|W_{l,i}\|_1.
\]

This makes high-prime parameter blocks more expensive. The model learns to use small-prime blocks unless large-prime blocks are necessary.

In this sense the prime hierarchy acts as an arithmetic Occam prior:

\[
\boxed{
\text{small primes}=\text{cheap universal features}
}
\]

\[
\boxed{
\text{large primes}=\text{expensive rare corrections}.
}
\]

---

## PyTorch Sketch

```python
import torch
import torch.nn as nn
import torch.nn.functional as F


class PrimeEulerGate(nn.Module):
    def __init__(self, primes=(2, 3, 5, 7, 11), tau=3.0, eps=1e-6, max_val=1e6):
        super().__init__()
        self.register_buffer(
            "log_primes",
            torch.log(torch.tensor(primes, dtype=torch.float32)),
        )
        self.tau = tau
        self.eps = eps
        self.max_val = max_val

    def forward(self, z):
        v = F.softplus(z)
        terms = 1.0 - torch.exp(-self.tau * v.unsqueeze(-1) * self.log_primes)
        gate = torch.prod(terms, dim=-1)
        return torch.clamp(gate, self.eps, self.max_val)


class PESiLU(nn.Module):
    def __init__(self, primes=(2, 3, 5, 7, 11), tau=3.0):
        super().__init__()
        self.gate = PrimeEulerGate(primes=primes, tau=tau)

    def forward(self, z):
        return F.silu(z) * self.gate(z)


class ResidualPESiLU(nn.Module):
    def __init__(self, primes=(2, 3, 5, 7, 11), tau=3.0, alpha=0.1):
        super().__init__()
        self.gate = PrimeEulerGate(primes=primes, tau=tau)
        self.alpha = nn.Parameter(torch.tensor(float(alpha)))

    def forward(self, z):
        return F.silu(z) * (1.0 + self.alpha * self.gate(z))
```

The first experiment should compare ReLU, GELU, SiLU, PESiLU, and ResidualPESiLU on:

1. PINN toy PDEs.
2. Monotonic regression.
3. Classification calibration.
4. Sparse feature routing.
5. Mixture-of-experts routing.

---

## Claim

Prime Euler gated activations introduce a multiplicative spectral modulation whose log-gradient is a finite von Mangoldt expansion. This creates hierarchical activation sensitivity while preserving a stable base nonlinearity.

In one line:

\[
\boxed{
\text{Multiplicative PINN gates can become activation-level observer kernels.}
}
\]

ZetaDrop is the sparsity version:

\[
\boxed{
\text{dropout becomes deterministic spectral sparsity over prime-indexed parameters.}
}
\]

---

## See Also

- [Multiplicative PINN](../projects/multiplicative-pinn.md) — the loss-level Euler gate that this concept extends into activations
- [Prime Weighting](prime-weighting.md) — the foundational prime-weighting mechanism
- [STOP Operators as Resolution Flows](stop-operator-manuscript.md) — the observer-theoretic justification for arithmetic gating
- [Partition Function](partition-function.md) — the broader free-energy object this activation structure lives inside
- [The Arithmetic Manifold](../core-vision.md) — the unified theory

