---
title: "This High School Math Problem Is a Secret Portal to Deeper Physics"
description: "How can something as simple as a few dots spaced evenly on a circle hide profound complexity? We often see patterns in nature \u2014 spirals in a shell, hexagons in a honeycomb \u2014 and sense a d\u2026"
date: "2025-09-20"
author: "Sethu Iyer"
tags: ["geometry", "physics", "polynomials"]
type: "Essay"
materials:
  - label: "Original on Medium"
    href: "https://medium.com/@sethuiyer/this-high-school-math-problem-is-a-secret-portal-to-deeper-physics-3c53f686284b"
---

![](https://cdn-images-1.medium.com/max/988/1*uj5uKZ0MiBzmkDmkUXc-ew.png)

*Problem: https://gist.github.com/sethuiyer/52b81032ea83b96fb304cac4b99a3058*

How can something as simple as a few dots spaced evenly on a circle hide profound complexity? We often see patterns in nature — spirals in a shell, hexagons in a honeycomb — and sense a deep order underneath. But it’s a special delight when a simple pattern, explored with basic math, reveals the blueprints of much bigger ideas in physics and number theory.

This is the story of one such pattern, born from a math competition problem so elegant it acts as a portal. We won’t need any “heavy artillery” or “special-function incantations” to walk through it. We will start with a simple question: what can we learn by looking only at the horizontal positions of dots placed evenly around a circle?

It turns out, these numbers behave like the resonant frequencies of a musical instrument. They have an “acoustic signature” — a hidden structure that sings a song of integers, perfect squares, and magical polynomials. Together, we’ll explore four astonishing discoveries that emerge from these simple numbers — four notes in a song that hint at the universe’s mathematical score.

**A Seemingly Random List of Numbers Hides a Perfect, Integer Structure**

Let’s begin by generating our list of numbers. For a circle with *n* evenly spaced points, we take the horizontal position of each one (ignoring the point at “3 o’clock”). This gives us a list of numbers, each calculated by the simple formula x_k = 2*cos(2πk/n). If you calculate these for, say, n=7, you get a messy-looking list of decimals. If you then build a polynomial from these numbers, you would intuitively expect its coefficients to be equally messy.

But the first surprise is that this polynomial, F_n(X), *always* has simple, whole-number coefficients. This is deeply unexpected. The reason is a profound concept that can be understood intuitively as "shuffling symmetry." Any permutation of the dots that respects the circle's even spacing just shuffles the list of our x_k values. The polynomial's coefficients are the *elementary symmetric polynomials* of these numbers—combinations like their sum, their sum of pairs, and so on. By definition, these combinations are immune to shuffling, which forces them to be clean, whole integers. These integer coefficients are not just a curiosity; they are the secret keepers of the system's global properties, as we're about to see.

“This problem beautifully demonstrates the connection between… Global invariants… Spectral polynomials… \[and\] Harmonic analysis… making advanced mathematical ideas accessible through elementary methods.”

**A Complex Multiplication Collapses into a Perfect Square**

The second discovery comes from a “global” measurement of our entire system of numbers. What happens if, for every number x_k in our list, we calculate the value 2 - x_k (which is the term 2 - 2cos(2πk/n) from the original problem) and then multiply all of these results together? This involves multiplying a long string of seemingly unrelated decimal numbers. The result should be chaos.

Instead, the answer is astonishingly simple: the product is always exactly n². This isn't an approximation; it's a perfect, integer result. This single number acts as a "global invariant" or the "acoustic signature" of the system. It’s like striking a drum and finding that its total vibrational energy is always a perfect square, determined only by the number of beads on its rim. This result is directly encoded within the coefficients of our integer polynomial, F_n(X).

“Product and sum — global invariants — are the “acoustic signature” of the spectrum. One measures multiplicative resonance, the other measures an additive resolvent-like statistic. Together they are complete in a surprising way…”

**An Obscure Sum of Fractions Unveils Another Elegant Formula**

The third takeaway is perhaps the most counter-intuitive. Having multiplied, we now try adding. But instead of adding the numbers themselves, we add their *reciprocals*: 1 / (2 - x_k), which corresponds to the sum of 1 / (2 - 2cos(2πk/n)). This creates a sum of awkward, messy-looking fractions. Surely, this will not simplify.

And yet, it does. The sum always collapses into another perfectly clean formula: (n² - 1) / 12. The appearance of this beautiful, simple rational number is a sign that we've stumbled upon something deep. This "trace-like sum" can be thought of as a measure of the system's total "resistance." This elegant number, like the product n², is fundamentally a property of our integer-coefficient polynomial, F_n(X). The fact that such a strange calculation yields a tidy result is a hallmark of truly great mathematical problems—they hide profound beauty just beneath the surface.

“The answers to parts (b) and © are remarkably clean: n² and (n²-1)/12. Such simple integer/rational results often hide profound mathematical beauty, which is a hallmark of great competition problems."

**There’s a “Shortcut” Formula That Generates the Entire System**

So far, the polynomial F_n(X) with its integer coefficients has been our central object, but it has remained abstract. We know its roots are our cosine values, but is there a way to write it down directly, without calculating all the roots first?

The final, unifying takeaway is yes. The entire polynomial is perfectly described by a famous family of “magical” polynomials called **Chebyshev polynomials**. Think of a Chebyshev polynomial as a “harmonic wave generator.”

By using it in a simple construction, we can generate our polynomial F_n(X) instantly. This isn't just a neat party trick; it's the "structural reveal" that ties all the previous discoveries together.

The Chebyshev polynomial provides a "pre-baked chord sheet" that contains all the notes and explains why their acoustic properties—the product and the sum—are so elegant.

“This is the point. T_n gives us a closed-form generator for the spectrum’s characteristic polynomial. That’s precisely how orthogonal polynomials tend to behave in spectral problems: they collect frequencies into an algebraic object whose coefficients have number-theoretic meaning.”

![](https://cdn-images-1.medium.com/max/708/1*kzIRXHOR6c2sPG5zMLnyWA.png)

**The Universe Whispers in Patterns**

Our journey began with simple dots on a circle. From their horizontal positions, we uncovered what amounts to a “microcosm of a big theory.” We found a spectrum of frequencies (x_k), a characteristic polynomial with integer coefficients (F_n(X)), and two global invariants—a product (n²) and a sum ((n²-1)/12)—that define the system's acoustic signature. This is no mere coincidence. In the language of advanced physics and spectral theory, this product acts like a system's determinant, and the sum acts like its trace—two fundamental measurements that capture the essence of complex systems. Finally, we found the master blueprint in the form of a Chebyshev polynomial.

## The Circle’s Secret: Why Modern AI Also Sings

As beautiful as this circle problem is for mathematics, it’s even more astonishing when you realize it secretly powers one of the most important innovations in today’s artificial intelligence: **positional embeddings** in transformer models.

**But what is a positional embedding, and what does it have to do with singing circles?**

## Encoding Position as Vibration

When a transformer — a kind of neural network that’s revolutionized natural language processing — reads a sentence, it doesn’t just see a bag of words. It needs to know where each word appears in the sequence. But how do you “encode” the *position* of a word so the model can work with it?

The answer: **by projecting each position onto a circle using sines and cosines** .

This “circle of cosines” isn’t just a coincidence — it’s a universal trick. By encoding positions as vibrations, both mathematics and AI achieve:

**Periodicity**: The circle wraps around, so information about “distance” and “relative location” is preserved.

**Uniqueness**: Each position projects to a unique signature — just as no two \(x_k\) values coincide.

**Compositionality**: Combining positions (or moving around the circle) gives rise to harmonic patterns — just as combining notes creates music.

The same mathematical machinery that gives our circle problem such beautiful integer results is what lets AI models “hear” the position of every word in a sentence.

**From Circles to Spectra: The Fourier Transform Connection**

You might wonder, why do these sines and cosines keep showing up — from contest polynomials to AI to the vibrations of a drum? The answer is that the circle is the natural home of the Fourier transform.

**The Circle as a Finite Fourier Playground**

The Fourier transform is, at its heart, a way of taking any pattern — be it a sound wave, a string of numbers, or a sentence — and expressing it as a combination of basic vibrations, called frequencies. For periodic patterns, these basic frequencies are sines and cosines spaced evenly around a circle.

In our circle problem, the numbers \(x_k = 2\cos\left(2\pi k/n\right)\) are exactly the real parts of these circle-based vibrations — the frequencies themselves. When you construct the polynomial \(F_n(X)\) from these \(x_k\), you are, in a sense, building an algebraic object that captures all the “notes” (frequencies) present in your system.

**Positional Embeddings as Discrete Fourier Codes**

When a transformer encodes position with sines and cosines, it’s performing a discrete Fourier transform on the sequence positions. Each position is mapped onto the circle of frequencies — every word in a sentence, every time-step in a sequence, gets its own unique Fourier code. This allows the model to recognize patterns, distances, and periodicities, regardless of where they occur.

In fact, any function on a circle — whether it’s a sound wave or the arrangement of points in our problem — can be decomposed into its constituent cosines and sines. This decomposition is the essence of the Fourier transform.

**Why It Matters**

The magic of the Fourier transform is that it translates geometry into frequency, and order into resonance.

In math competitions, this lets you uncover integer structure hidden in decimals.

In AI, it lets a model “hear” the position and rhythm of words.

In physics, it lets you study vibrations, waves, and quantum states — all as sums of harmonics.

The circle is the stage, and the Fourier transform is the musical score.  
Whenever you see a circle, cosines, and sines — you’re seeing Fourier’s fingerprint.

Read about the problem and the solution here! <https://gist.github.com/sethuiyer/52b81032ea83b96fb304cac4b99a3058>

**The circle sings — whether it’s in a high school math contest or at the heart of artificial intelligence.**

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=3c53f686284b)
