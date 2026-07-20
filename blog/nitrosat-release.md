---
title: "Introducing NitroSAT: A High-Performance, Physics-Informed MaxSAT Solver Now Available via Navokoj API"
description: "ShunyaBar Labs is proud to announce the public release of NitroSAT — a next-generation MaxSAT approximator that achieves exceptional satisfaction rates on massive, real-world constraint problems while maintaining linear scaling in the number of clauses."
date: "2026-05-11"
author: "Navokoj Team"
tags: [open-source, engineering, product]
materials:
  - label: "NitroSAT on GitHub"
    href: "https://github.com/sethuiyer/NitroSAT"
  - label: "Evidence ledger"
    href: "https://huggingface.co/buckets/sethuiyer/shunyabar-evidence-v1"
  - label: "NitroSAT paper (Zenodo)"
    href: "https://doi.org/10.5281/zenodo.18753235"
---

# Introducing NitroSAT: A High-Performance, Physics-Informed MaxSAT Solver Now Available via Navokoj API

**ShunyaBar Labs** is proud to announce the public release of **NitroSAT** — a next-generation MaxSAT approximator that achieves exceptional satisfaction rates on massive, real-world constraint problems while maintaining linear scaling in the number of clauses.

Built on a novel physics-informed continuous relaxation framework, NitroSAT treats satisfiability as a dynamical system on a Riemannian manifold. It combines spectral methods, prime-weighted clause learning, heat-kernel diffusion, Branch-Aware Holonomy Annealing (BAHA), and persistent homology to deliver robust performance where traditional CDCL solvers struggle.

### Why NitroSAT Matters

Modern agentic systems, scheduling engines, hardware verifiers, and optimization workloads increasingly demand fast, reliable solutions to NP-hard constraint problems. NitroSAT delivers:

- **Linear scaling**: O(M) time complexity relative to the number of clauses  
- **High satisfaction**: 99.5%+ median satisfaction across 5,000+ diverse CNF instances  
- **Massive scale**: Proven on instances exceeding 80 million clauses and 4 million variables  
- **Structural awareness**: Native UNSAT detection via thermodynamic phase transitions and topological signals  
- **Practical anytime behavior**: Returns the best feasible assignment within any user-specified time budget  

### Selected Benchmark Highlights (April 2026)

| Problem Type                  | Variables     | Clauses        | Satisfaction | Time          |
|-------------------------------|---------------|----------------|--------------|---------------|
| Enterprise Timetabling        | 147,600      | 80,278,884    | 100%        | 73 seconds   |
| Grid Coloring (1,000×1,000)   | 4,000,000    | 14,992,000    | 100%        | 475 seconds  |
| Titan Ramsey R(5,5)           | 780          | 1,316,016     | 99.995%     | 3,403 seconds|
| Planted Coloring              | 105,000      | 232,043       | 100%        | 13.78 seconds|
| Edwards-Anderson 3D Spin Glass| 64,000       | 188,666       | 99.47%      | 4.3 seconds  |
| Adversarial Pitfall Trap      | 2,950        | 1,047,620     | 100%        | ~400 seconds |

Full benchmark suite and raw results are available in the [NitroSAT repository](https://github.com/sethuiyer/NitroSAT).

### Performance Benchmarks: Challenging Instances

NitroSAT's physics-informed approach provides consistent performance on dense, highly-constrained problems. In our testing of random 3-SAT instances situated in the critical phase transition zone and beyond, the **nitro** engine demonstrated the following characteristics:

- **Instance A (50 variables, 250 clauses, α=5)**: Solved in **19.7 milliseconds** with a **99.2%** satisfaction rate.
- **Instance B (2,000 variables, 14,000 clauses, α=7)**: Solved in **3.42 seconds** with a **97.57%** satisfaction rate.

These benchmarks confirm the engine's ability to deliver high-quality approximations for overconstrained problems with sub-second to low-second latency, even at industrial scale. This performance is a key enabler for agentic control planes and real-time resource allocation where binary "UNSAT" results are not actionable.

### Production Access via Navokoj API

NitroSAT is now live as the core engine behind the **Navokoj Constraint Intelligence Platform**. Developers and enterprises can call it instantly through a simple REST API at:

**Base URL:** `https://api.navokoj.shunyabar.foo`

**API access:** request credentials through the approved access process; never expose keys in public pages.  
`YOUR_API_KEY`

> **Note:** The **nitro** and **nitroqstate** engines are available now!

The API supports:
- Standard CNF and weighted MaxSAT
- Natural boolean expressions with full logical operators
- Q-SAT (N-ary state satisfaction / generalized coloring)
- Hybrid XOR+CNF workloads
- Specialized scheduling endpoint
- DEFEKT diagnostics for rapid solvability prediction
- Multiple engine tiers (`nano`, `mini`, `pro`) for real-time vs. maximum-accuracy trade-offs

Full [API documentation](https://navokoj.shunyabar.foo/docs) and ready-to-run Python, JavaScript, and cURL examples are available.

### Open Source Core

The core solver is released under the **Apache 2.0 license**. You can compile and run it locally with a single command:

```bash
gcc -O3 -march=native -std=c99 nitrosat.c -o nitrosat -lm
./nitrosat problem.cnf
```

The complete source, LuaJIT implementation, mathematical theory (MATH.md), and reproducibility dataset are available on GitHub: [sethuiyer/NitroSAT](https://github.com/sethuiyer/NitroSAT).

### Looking Ahead

NitroSAT is the foundational engine powering Navokoj’s vision of a constraint-governed control plane for agentic systems. By making high-quality SAT/MaxSAT solving fast, reliable, and accessible via API, we are enabling the next generation of trustworthy autonomous workflows in coding agents, enterprise scheduling, hardware verification, and beyond.

We invite researchers, developers, and enterprises to explore NitroSAT today — whether through the open-source release, the public API, or a private pilot engagement.

**Get started now** at [api.navokoj.shunyabar.foo](https://api.navokoj.shunyabar.foo) or visit the [GitHub repository](https://github.com/sethuiyer/NitroSAT).

Questions or collaboration ideas? Reach out at contact@shunyabar.foo.

—  
**ShunyaBar Labs**  
*Constraint Intelligence for the Agentic Era*
