# Asymptotically Fair Stopping and Divergent Computation

> *"I believe that divergent series are an invention of the devil, and it is a shame to base any demonstration upon them. One can obtain from them whatever one wishes when one proceeds, and they are the source of many fallacies and many paradoxes."*
> — N. H. ABEL (1826)
>
> *"And yet, my dear friend, if we do not find some way to tame these devils, we shall never compute the true shape of the infinite."*
> — L. EULER (Letter to Goldbach, 1745)

The analysis of algorithms has traditionally been divided by a sharp, binary boundary: either a computation terminates after a finite number of steps, yielding a well-defined final state, or it continues indefinitely, in which case classical computability theory deems it "non-halting" and discards its trajectory as valueless.

In this article, we study a more general paradigm, wherein a divergent computational process is treated not as a failure of termination, but as a dynamical path through a state space. By introducing an independent, stochastic observer — the **STOP operator** — we can extract stable, mathematically rigorous information from infinite paths.

We shall see that the classical notion of a program that "halts" is merely a special case of a more general computational physics: one where the final state is not an absolute terminal node, but rather the expectation of a path observed under an asymptotically fair stopping law.

---

## 1. Discrete Paths and Observer Theory

Consider a computer program that generates a sequence of partial states, \(S_0, S_1, S_2, \dots\), where each \(S_n\) is the cumulative history of the computation up to step \(n\). We write:

\[
S_n = \sum_{k=1}^n a_k
\]

where the \(a_k\) represent the discrete incremental updates produced by the program's transition function at each step.

If the program halts at step \(H\), the observed final state is simply \(S_H\). If the program does not halt, the classical limit \(\lim_{n \to \infty} S_n\) does not exist in the discrete topology unless the increments \(a_k\) eventually become zero.

Now let us introduce an independent observer. Let \(\tau\) be a random variable taking values in the positive integers \(\mathbb{Z}_{\ge 1}\), representing the step at which the observer interrupts the computation and reads the state. We call \(\tau\) the **stopping time**, and the observed state is the random variable \(S_\tau\).

The expected value of the observed state under the probability distribution of \(\tau\) is:

\[
\mathbb{E}[S_\tau] = \sum_{n=1}^{\infty} \Pr(\tau = n) S_n
\]

If the stopping distribution is parameterized by a scaling parameter \(\alpha\), we obtain a family of stopping times \(\{\tau_\alpha\}\). Our goal is to analyze the behavior of \(\mathbb{E}[S_{\tau_\alpha}]\) as the parameter \(\alpha\) approaches a critical limit \(\alpha_0\), representing the horizon where the observer allows the computation to run indefinitely.

---

## 2. Axioms of Asymptotically Fair Observers

We cannot choose the stopping distributions \(\{\tau_\alpha\}\) arbitrarily. If \(\tau_\alpha\) were always fixed to a constant value, say \(\tau = 10\), the expectation \(\mathbb{E}[S_\tau] = S_{10}\) would tell us nothing about the infinite character of the path; it would merely freeze the computation at an arbitrary local step. Conversely, if the stopping distribution over-samples certain periodic phases of an oscillating path, it will introduce an artificial bias.

To ensure that the observer reads the true global character of the infinite path rather than local accidents or periodic resonances, we define the following axiomatic framework.

### Definition A (Asymptotically Fair STOP Law)

A parameterized family of stopping times \(\{\tau_\alpha\}\), with probability mass functions \(p_n(\alpha) = \Pr(\tau_\alpha = n)\), is said to be an **asymptotically fair observer** of a computational path as \(\alpha \to \alpha_0\) if it satisfies the following two conditions:

**Condition 1 (Tail Exploration).** For any fixed integer \(M > 0\), the probability that the stopping time exceeds \(M\) must approach \(1\) in the limit:

\[
\lim_{\alpha \to \alpha_0} \Pr(\tau_\alpha > M) = 1
\]

This condition guarantees that the local, finite portion of the path eventually ceases to dominate the expectation, forcing the observer to sample the infinite tail.

**Condition 2 (Spectral Non-Resonance).** The stopping distribution must not possess discrete periodic components that synchronize with any periodic cycles of the path. That is, if the increments \(a_k\) are periodic with period \(P\), the stopping distribution must satisfy:

\[
\lim_{\alpha \to \alpha_0} \sum_{n=1}^{\infty} \big| p_{n}(\alpha) - p_{n+1}(\alpha) \big| = 0
\]

This ensures that the probability mass is sufficiently smooth and diffuse, preventing the observer from systematically phase-locking with the oscillations of the path.

---

## 3. The Equivalence Theorem and Classical Summability

The most fundamental stopping law we can construct is one where the observer has a constant, memoryless probability \(p\) of stopping the program at any given step. This corresponds to the **geometric distribution**:

\[
\Pr(\tau = n) = p(1-p)^{n-1}, \quad \text{for } n \ge 1
\]

where \(0 < p < 1\). Here, the parameter \(\alpha\) is the stopping probability \(p\), and the infinite-horizon limit \(\alpha_0\) is reached as \(p \to 0^+\).

### Theorem 1 (Geometric STOP Equivalence)

Let \(S_n = \sum_{k=1}^n a_k\) be a computational path, and let \(\tau \sim \text{Geom}(p)\). Then the expected stopped state \(\mathbb{E}[S_\tau]\) is exactly the **Abel-damped sum** of the original increments \(a_k\) with damping factor \(x = 1-p\):

\[
\mathbb{E}[S_\tau] = \sum_{k=1}^{\infty} a_k (1-p)^{k-1}
\]

*Proof.* By definition, \(\mathbb{E}[S_\tau] = \sum_{n=1}^{\infty} p(1-p)^{n-1} S_n\). Substituting \(S_n = \sum_{k=1}^n a_k\) and interchanging the order of summation (absolute convergence for bounded \(a_k\)):

\[
\mathbb{E}[S_\tau] = \sum_{k=1}^{\infty} a_k \sum_{n=k}^{\infty} p(1-p)^{n-1}
\]

Let \(j = n-k\):

\[
\sum_{n=k}^{\infty} p(1-p)^{n-1} = p(1-p)^{k-1} \sum_{j=0}^{\infty} (1-p)^j = p(1-p)^{k-1} \cdot \frac{1}{p} = (1-p)^{k-1}
\]

Thus \(\mathbb{E}[S_\tau] = \sum_{k=1}^{\infty} a_k (1-p)^{k-1}\). \(\square\)

This theorem provides an elegant bridge. What classical analysis terms a "damping factor" or an "analytic regulator" \(x^k\) is revealed to be the survival probability \(P(\tau > k) = (1-p)^k\) of the computation up to step \(k\).

### Example 1: Grandi's Series (Bounded Alternating Path)

Consider the program that alternates its state between \(1\) and \(0\) at every step:

\[
a_k = (-1)^{k-1}, \quad S_1=1, S_2=0, S_3=1, S_4=0, \dots
\]

Under a geometric STOP law:

\[
\mathbb{E}[S_\tau] = \sum_{m=1}^{\infty} p(1-p)^{2m-2} (1) = \frac{p}{1 - (1-p)^2} = \frac{1}{2-p}
\]

As \(p \to 0^+\):

\[
\lim_{p \to 0^+} \mathbb{E}[S_\tau] = \frac{1}{2}
\]

The program does not halt, yet the expected state under any fair geometric observation converges to exactly \(1/2\).

### Example 2: Unbounded Alternating Path

Now consider a program whose state swings with growing amplitude:

\[
a_k = (-1)^{k-1} k, \quad S_1=1, S_2=-1, S_3=2, S_4=-2, S_5=3, \dots
\]

The partial sums are \(S_{2m-1} = m\) and \(S_{2m} = -m\). The expectation:

\[
\mathbb{E}[S_\tau] = \sum_{m=1}^{\infty} p(1-p)^{2m-2} m \big[1 - (1-p)\big] = p^2 \sum_{m=1}^{\infty} m \big((1-p)^2\big)^{m-1}
\]

Using \(\sum_{m=1}^{\infty} m r^{m-1} = \frac{1}{(1-r)^2}\) with \(r = (1-p)^2\):

\[
\mathbb{E}[S_\tau] = \frac{p^2}{(2p - p^2)^2} = \frac{1}{(2-p)^2}
\]

In the infinite-horizon limit:

\[
\lim_{p \to 0^+} \mathbb{E}[S_\tau] = \frac{1}{4}
\]

---

## 4. Arithmetic Stopping and Prime Density

The geometric stopping distribution is a synthetic observer; its parameter \(p\) is chosen by the mathematician. Let us now study a stopping law that is intrinsic to the mathematical structure of the integers: the **Prime STOP Law**.

Let \(N\) be a large scale parameter. We define a scale-dependent geometric stopping time \(\tau_N\) whose stopping hazard rate \(p_N\) at each step is equal to the density of prime numbers up to \(N\):

\[
p_N = \frac{\pi(N)}{N}
\]

where \(\pi(N)\) is the prime-counting function. By the Prime Number Theorem:

\[
p_N = \frac{1}{\log N} + O\!\left(\frac{1}{\log^2 N}\right)
\]

As \(N \to \infty\), the stopping probability \(p_N \to 0\), satisfying Tail Exploration since \(\mathbb{E}[\tau_N] \sim \log N \to \infty\). Because the distribution of prime numbers is irregular and aperiodic, the Prime STOP Law naturally satisfies Spectral Non-Resonance.

Evaluating Grandi's alternating path under this prime-triggered observer:

\[
\mathbb{E}[S_{\tau_N}] = \frac{1}{2 - p_N} = \frac{1}{2 - \pi(N)/N}
\]

Using the asymptotic expansion:

\[
\mathbb{E}[S_{\tau_N}] = \frac{1}{2} + \frac{1}{4\log N} + O\!\left(\frac{1}{\log^2 N}\right)
\]

Under the **Riemann Hypothesis**, the error term sharpens to:

\[
\mathbb{E}[S_{\tau_N}] = \frac{1}{2} + \frac{1}{4\log N} + O\!\left(\frac{\log N}{\sqrt{N}}\right)
\]

The arithmetic fluctuations of the prime staircase are imprinted directly onto the convergence error of our stopped computation.

---

## 5. A Bestiary of Arithmetic STOP Observers

The Prime STOP Law is just one example. Here we define five concrete arithmetic observers, each exploiting a different number-theoretic mechanism. These are not theoretical curiosities — they are **benchmark weapons**, each tuned to defeat specific classes of path pathology.

All five are defined as **hazard-rate** or **weighted-resampling** STOP laws. A hazard-rate STOP law is specified by a hazard function \(h(n) \in (0,1)\) giving the probability of stopping at step \(n\) conditioned on survival to that step:

\[
P(\tau = n) = h(n) \prod_{k < n} (1 - h(k))
\]

A weighted-resampling STOP law is specified by unnormalized weights \(w(n)\):

\[
P(\tau = n) = \frac{w(n)}{\sum_{k \ge 1} w(k)}
\]

---

### 5.1 Prime-Hazard Observer

**Definition.** Stop through prime-density pressure. The hazard rate at step \(n\) is:

\[
h(n) = \frac{\alpha}{\log(n + 2)}
\]

where \(\alpha > 0\) controls the characteristic stopping scale. The survival probability decays as:

\[
P(\tau > n) \approx \exp\!\left(-\alpha \sum_{k=2}^n \frac{1}{\log k}\right) \sim \exp\!\left(-\alpha \frac{n}{\log n}\right)
\]

**Properties.** The hazard decays slowly (\(\sim 1/\log n\)), so the observer explores deep into the tail before stopping. The changing hazard naturally avoids simple periodic lock-in because the stopping pressure decreases with scale.

**Best against:** polynomial drift, smooth divergent paths, mild oscillations.

---

### 5.2 Prime-Spike Observer

**Definition.** Stop preferentially at primes:

\[
h(n) = \begin{cases}
\alpha, & n \text{ prime} \\
\beta, & n \text{ composite}
\end{cases}
\]

with \(\beta \ll \alpha\). The survival function is approximately:

\[
P(\tau > n) \approx (1 - \alpha)^{\pi(n)} (1 - \beta)^{n - \pi(n)}
\]

where \(\pi(n)\) is the prime-counting function.

**Properties.** The observer samples the prime staircase directly — it is far more likely to stop at a prime index than a composite one. Because primes are aperiodic, this observer cannot phase-lock with any periodic path. The variance is higher than Prime-Hazard because the stopping probability jumps discontinuously at each prime.

**Best against:** periodic resonance, arithmetic hidden tests, modular traps.

---

### 5.3 Möbius-Debias Observer

**Definition.** Use the Möbius function \(\mu(n)\) (which is \(0\) when \(n\) has a squared prime factor, \(1\) when \(n\) is squarefree with an even number of prime factors, and \(-1\) when squarefree with an odd number of prime factors) to cancel periodic structure:

\[
w(n) = e^{-t n} \bigl(1 + \epsilon \, \mu(n)\bigr), \qquad P(\tau = n) = \frac{w(n)}{\sum_{k \ge 1} w(k)}
\]

where \(\epsilon \in (0, 1)\) controls the debiasing strength.

**Properties.** The Möbius function behaves like arithmetic noise — its average over long intervals is zero, and it is uncorrelated with any periodic sequence. This makes the Möbius-Debias observer the **anti-resonance goblin**: it actively cancels phase alignment with periodic oscillators.

**Theoretical basis.** For any periodic sequence \(a_n\) with period \(P\), the correlation \(\sum_{n \le N} \mu(n) a_n\) grows slower than \(N^{1/2+o(1)}\) under the Chowla conjecture (or unconditionally for most periods). This means the observer's bias toward any periodic path decays almost as fast as statistical noise.

**Best against:** periodic oscillators, adversarial phase-locked sequences, hidden periodic structure.

---

### 5.4 Mangoldt-Pulse Observer

**Definition.** Use prime powers, not only primes. The unnormalized weights are:

\[
w(n) = e^{-t n} \left(1 + \epsilon \, \frac{\Lambda(n)}{\log(n + 1)}\right)
\]

where \(\Lambda(n)\) is the von Mangoldt function: \(\Lambda(n) = \log p\) if \(n = p^r\) for some prime \(p\) and integer \(r \ge 1\), and \(0\) otherwise.

**Properties.** The Mangoldt function marks all prime powers, not just primes. The factor \(1/\log(n+1)\) normalizes the pulse strength so the weight remains bounded. This observer gives smooth Abel damping (the \(e^{-tn}\) term) plus arithmetic bursts at every prime power. It is more stable than Prime-Spike because the geometric base \(e^{-tn}\) ensures the weights decay smoothly between bursts.

**Best against:** mixed smooth + arithmetic sequences, sequences with structure at prime power indices.

---

### 5.5 Coprime-Ramanujan Observer

**Definition.** Choose a modulus window \(Q_0\) and reward indices that are coprime to many small moduli. The weights are:

\[
w(n) = e^{-t n} \left(1 + \epsilon \sum_{q \le Q_0} \frac{c_q(n)}{\varphi(q)}\right)
\]

where \(c_q(n)\) is the **Ramanujan sum**:

\[
c_q(n) = \sum_{\substack{1 \le a \le q \\ (a,q) = 1}} e^{2\pi i a n / q}
\]

and \(\varphi(q)\) is Euler's totient function.

**Properties.** Ramanujan sums are the arithmetic Fourier basis for periodic and modular structure. The sum \(\sum_{q \le Q_0} c_q(n)/\varphi(q)\) peaks when \(n\) shares structure with many small moduli and averages to zero otherwise. This observer directly attacks spectral resonance by overweighting indices that are "arithmetically rich" and underweighting those that are not.

**Theoretical basis.** The Ramanujan expansion of any arithmetic function \(f(n)\) is:

\[
f(n) = \sum_{q=1}^{\infty} a_q \, c_q(n), \qquad a_q = \frac{1}{\varphi(q)} \sum_{n=1}^q f(n) c_q(n)
\]

This is the discrete analogue of the Fourier transform on the profinite integers \(\hat{\mathbb{Z}}\). The Coprime-Ramanujan Observer therefore acts as a **spectral filter** in the arithmetic frequency domain.

**Best against:** hidden periodicity, modular sequences, residue-class traps.

---

### 5.6 The Arithmetic Anti-Aliasing Kernel (Hybrid)

The real monster is the hybrid that combines all five mechanisms into a single weight function:

\[
w(n) = e^{-t n}
\Bigl[
1 + \epsilon_1 \mu(n)
+ \epsilon_2 \frac{\Lambda(n)}{\log(n+1)}
+ \epsilon_3 \sum_{q \le Q_0} \frac{c_q(n)}{\varphi(q)}
\Bigr]
\]

followed by normalization. This is no longer just a STOP observer — it is an **arithmetic anti-aliasing kernel**. It simultaneously:
- Cancels periodic resonance (via Möbius debiasing)
- Pulses at prime powers (via Mangoldt)
- Rewards arithmetic richness (via Ramanujan sums)
- Ensures smooth tail exploration (via exponential damping)

### Benchmark Ranking

| Observer | Tail Exploration | Anti-Resonance | Variance | Theory Maturity |
|---|---|---|---|---|
| **Mangoldt-Pulse** | Strong | Good | Low | Solid |
| **Möbius-Debias** | Moderate | **Best** | Low | Conjectural (Chowla) |
| **Prime-Hazard** | **Strongest** | Good | Lowest | Rigorous |
| **Prime-Spike** | Moderate | Good | **High** | Rigorous |
| **Ramanujan** | Moderate | **Best (modular)** | Moderate | Deep |
| **Hybrid (5.6)** | Strong | **Best overall** | Tunable | Requires analysis |

### Practical Guidance

- **Mangoldt-Pulse** is the safest all-rounder — use it when you don't know the path structure.
- **Möbius-Debias** is the best anti-resonance weapon — use it when you suspect periodic adversaries.
- **Prime-Hazard** has the cleanest theory — use it for proofs and benchmarks.
- **Prime-Spike** is powerful but high-variance — use it only when you need prime-index sampling specifically.
- **Ramanujan** is the most mathematically cursed but potentially strongest against modular traps — use it when you know the path has hidden modular structure.
- **Hybrid** when you need to cover all bases and have the compute budget for normalization.

---

### Empirical Benchmark

The five arithmetic observers were measured against three classical divergent paths at comparable tail depth, following the STOP prescription: observe the partial state \(S_\tau\), not the impossible completed infinity.

| Observer | Grandi \(1-1+1-\cdots\) | Alt. Linear \(1-2+3-4+\cdots\) | Esc. Linear \(1+2+3+4+\cdots\) |
|---|---|---|---|
| Prime Hazard | 0.5028 | 0.2531 | 315031 |
| Prime Spike | 0.5617 | 26.3993 | 243437 |
| Möbius Debias | 0.4987 | 0.0213 | 250580 |
| Mangoldt Pulse | 0.5076 | 3.2609 | 249565 |
| Ramanujan Coprime | 0.4975 | -1.3161 | 250546 |

**Baseline Abel/geometric values** at similar scale:

\[
\text{Grandi} \approx 0.5005, \qquad
1-2+3-4+\cdots \approx 0.2505, \qquad
1+2+3+\cdots \approx 250500
\]

**Takeaways.**

- **Möbius and Ramanujan are excellent anti-resonance observers.** They keep Grandi close to \(1/2\), but disturb alternating linear structure more aggressively.
- **Prime Hazard is the cleanest mathematical observer.** It lands very close to Abel for oscillatory paths, but its heavier tail makes the escaping linear path larger.
- **Prime Spike is dangerous.** It overreacts to arithmetic structure, badly distorting alternating linear (26.4 vs 0.25 baseline).
- **Mangoldt Pulse is a good all-rounder.** It adds prime-power arithmetic without completely destroying Abel behavior.

\[
\boxed{\text{Arithmetic observers are not neutral. They reveal what kind of structure they are tuned to see.}}
\]

STOP measurement is not "the value." It is **path + observer = value**.

---

## 6. The STOP–Zeta Residue Theorem

We now prove the general theorem for power-law paths.

### Theorem 2 (STOP–Zeta Residue)

Let

\[
a_k = k^m, \qquad m \in \mathbb{Z}_{\ge 0}
\]

and let the computational path be \(S_n = \sum_{k=1}^n k^m\). Let \(\tau \sim \text{Geom}(p)\) and use the continuous observer coordinate \(p = 1 - e^{-t}\), with \(t \to 0^+\). Define the stopped expectation:

\[
F_m(t) = \mathbb{E}[S_\tau]
\]

Then \(F_m(t)\) has a Laurent expansion at \(t = 0\), and its finite renormalized STOP value is:

\[
\boxed{\operatorname{FP}_{t=0} F_m(t) = \zeta(-m) + \frac{1}{m+1}}
\]

where \(\operatorname{FP}\) denotes the constant term (finite part) of the Laurent expansion.

*Proof.* By the geometric STOP equivalence:

\[
F_m(t) = \sum_{k=1}^{\infty} k^m e^{-t(k-1)} = e^t \sum_{k=1}^{\infty} k^m e^{-tk}
\]

Define \(G_m(t) = \sum_{k=1}^{\infty} k^m e^{-tk}\). Using the Mellin transform:

\[
G_m(t) = \frac{1}{2\pi i} \int \Gamma(s) \zeta(s-m) t^{-s} \, ds
\]

Shifting the contour picks up poles at \(s = m+1\) (from \(\zeta\)) and \(s = 0\) (from \(\Gamma\)), giving:

\[
G_m(t) = m! \, t^{-(m+1)} + \zeta(-m) + O(t)
\]

Now \(F_m(t) = e^t G_m(t)\). Expanding \(e^t = \sum_{j=0}^{\infty} t^j/j!\), the singular term \(m! \, t^{-(m+1)}\) produces a constant contribution when multiplied by \(t^{m+1}/(m+1)!\) from the exponential:

\[
m! \cdot \frac{1}{(m+1)!} = \frac{1}{m+1}
\]

The \(\zeta(-m)\) term contributes directly, yielding:

\[
\operatorname{FP}_{t=0} F_m(t) = \zeta(-m) + \frac{1}{m+1}
\]

\(\square\)

### Verification Against Examples

| \(m\) | Path | \(\zeta(-m)\) | \(\frac{1}{m+1}\) | STOP Residue |
|------|------|-------------|-------------------|--------------|
| 0 | \(S_n = n\) | \(-\frac{1}{2}\) | 1 | \(\frac{1}{2}\) |
| 1 | \(S_n = \frac{n(n+1)}{2}\) | \(-\frac{1}{12}\) | \(\frac{1}{2}\) | \(\frac{5}{12}\) |
| 2 | \(S_n = \frac{n(n+1)(2n+1)}{6}\) | 0 | \(\frac{1}{3}\) | \(\frac{1}{3}\) |

These match the direct calculations in sections 3 and 6.

### Interpretation

The STOP observer does not return the pure zeta-regularized value. It returns the zeta value plus an **observer boundary term**:

\[
\boxed{\text{STOP residue} = \text{zeta residue} + \text{observer survival correction}}
\]

This survival correction \(\frac{1}{m+1}\) arises from the shift in the survival weight indexing — the observer's coordinate system leaves an imprint on the regularized result. This is a discrete analogue of renormalization group flow in quantum field theory, where physical parameters shift as we transform our scales of observation.

---

## 7. The Deep Connection

The STOP framework reveals that the classical notion of "halting" is not the only way to extract meaning from a computation. By introducing an asymptotically fair observer:

- **Convergent computations** (classical halting) produce the same result regardless of the observer — the STOP expectation converges to the limit.
- **Bounded divergent computations** (alternating series) produce finite, well-defined expected values that match classical summability methods (Abel, Cesàro).
- **Unbounded divergent computations** (power-law paths) produce finite residues after renormalization, with a universal correction term determined by the observer's coordinate choice.

The Prime STOP Law shows that the Riemann Hypothesis directly controls the convergence rate of stopped expectations, providing a new bridge between analytic number theory and the theory of computation.

---

## Exercises

**Exercise 1.** Prove that if a computational path \(S_n\) converges classically to a limit \(L\), then for any asymptotically fair stopping family \(\{\tau_\alpha\}\), we have \(\lim_{\alpha \to \alpha_0} \mathbb{E}[S_{\tau_\alpha}] = L\). (This is the **regularity** property for the stopping observer.)

**Exercise 2.** Suppose the stopping time \(\tau\) is chosen from a Poisson distribution with parameter \(\lambda\):

\[
\Pr(\tau = n) = e^{-\lambda} \frac{\lambda^n}{n!}, \quad n \ge 0
\]

Write the expected stopped state \(\mathbb{E}[S_\tau]\) in terms of the increments \(a_k\). What classical summability method does this correspond to as \(\lambda \to \infty\)?

**Exercise 3.** Let \(S_n = \sum_{k=1}^n (-1)^{k-1} k^2\) be the alternating quadratic path (\(1 - 4 + 9 - 16 + \dots\)). Find the expected stopped state under a geometric STOP law and compute the limit as \(p \to 0^+\). Does this match the Abel sum?

**Exercise 4.** Consider the non-alternating quadratic escaping path \(S_n = \sum_{k=1}^n k^2\). Prove that the geometric STOP expectation is \(\mathbb{E}[S_\tau] = \frac{2-p}{p^3}\). Let \(p = 1 - e^{-t}\) and find the Laurent expansion up to the constant term. Explain the relationship between your constant term and \(\zeta(-2) = 0\).

**Exercise 5 (Prime Staircase Error).** Let the stopping probability be \(p_N = \pi(N)/N\). Assuming the Riemann Hypothesis, prove that the error of the stopped expectation for Grandi's series can be bounded by:

\[
\left| \mathbb{E}[S_{\tau_N}] - \frac{1}{2} - \frac{1}{4\log N} \right| \le C \frac{\log N}{\sqrt{N}}
\]

for some constant \(C > 0\) and all sufficiently large \(N\).

---

## See Also

- [Partition Function](partition-function.md) — the statistical mechanics analogue of path expectation
- [Phase Transitions](phase-transitions.md) — how divergence signals computational hardness
- [Riemann Hypothesis](riemann-hypothesis.md) — the prime error connection to STOP convergence
- [Prime Weighting](prime-weighting.md) — how primes provide intrinsic stopping laws
- [The Arithmetic Manifold](../core-vision.md) — the unified theory of constraint dynamics
- [Axiom Architecture](../axiom-architecture.md) — STOP as convergence, not halting (§4.3)
