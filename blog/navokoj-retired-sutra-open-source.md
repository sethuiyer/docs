---
title: "Navokoj Is Retired. SUTRA Is Open Source."
description: "The hosted Navokoj runtime is closed. The core solver is public at github.com/sethuiyer/sutra — anytime, witness-first, and competitive with Aperture after the crossover."
date: "2026-11-12"
author: "Sethurathienam Iyer"
tags: ["Navokoj", "SUTRA", "MaxSAT", "Open source"]
type: "Announcement"
materials:
  - label: "SUTRA source"
    href: "https://github.com/sethuiyer/sutra"
  - label: "Aperture"
    href: "https://github.com/YamSln/Aperture"
  - label: "MaxSAT Evaluation 2026"
    href: "https://zenodo.org/records/21358014"
---

# Navokoj Is Retired. SUTRA Is Open Source.

Two changes, effective today.

**Navokoj, the hosted runtime, is retired.** The API is closed to new keys. The pricing, deployment, and case-study posts on this blog remain as an archive of what was built, not as product documentation. No further product posts will be added.

**The core solver is public.** SUTRA — *Search Under Time, Recounted, Attested* — is at [github.com/sethuiyer/sutra](https://github.com/sethuiyer/sutra): parser, repair core, certificate checker, checkpoint code, tests, and benchmark harness in one C repository.

The interesting artifact was never the endpoint. It was the solver and the verification discipline around it: the witness was recounted, the infeasibility claim was certified, and the incumbent survived the deadline. A hosted runtime made all three harder to inspect. The source does not.

## What SUTRA is

An anytime weighted MaxSAT approximator. It returns a verified assignment and its cost as fast as it can, keeps improving while the budget lasts, and does not claim optimality.

```
status      meaning
SAT         every clause satisfied (cost 0)
FEASIBLE    hard clauses satisfied, soft cost > 0
UNKNOWN     budget exhausted; incumbent still valid
UNSAT       hard core proven unsatisfiable — only with --proof
```

Build with `make`; check with `make test` (17 checks: certificates, soundness, negative controls). A run looks like:

```
./sutra instance.wcnf --time-budget-seconds 30
```

The output is one JSON line, and every number in it is recomputed from the returned assignment before printing — the solver's own bookkeeping is never trusted. `--solution` writes a DIMACS witness that any checker can recount; `--proof` emits a `gfp` or DRAT refutation for an unsatisfiable hard core, checked by `sutracert` or `drat-trim`; `--checkpoint` salvages the incumbent after `SIGKILL`; `--kissat` delegates general CNF to an external CDCL and accepts nothing on faith.

## Competitive with Aperture

[Aperture](https://github.com/YamSln/Aperture) is a complete SAT-based MaxSAT optimizer and a 2026 state-of-the-art baseline. On the ten MaxSAT instances in the repository at a 30-second budget, SUTRA is ahead on five, tied on five, and behind on none:

| instance | Aperture | SUTRA |
|---|---:|---:|
| contested_5000 | 10 | **6** |
| contested_20000 | 68 | **14** |
| random 20k vars / 80k clauses | 97 | **46** |
| random 50k / 200k | 286 | **191** |
| contested_1000 | 0 | 0 |
| pdense / twobasin / phard / plw | 0 | 0 |
| lsm_18_5 | 373 | 373 |

The claim is false under a short clock. On `contested_20000` the crossover is about seven seconds:

| budget | Aperture | SUTRA |
|---|---:|---:|
| 1 s | **158** | 423 |
| 5 s | **68** | 75 |
| 15 s | 68 | **20** |
| 30 s | 68 | **14** |

Below roughly five seconds, Aperture is the better approximator; SUTRA spends its first second building an assignment. And the evidence is ten instances, one seed, one configuration. It is directional evidence, not a benchmark suite.

The division of labour is therefore explicit:

- Aperture proves optimality; SUTRA reports a cost.
- SUTRA proves infeasibility of a hard core when asked; Aperture optimizes.
- Under a tight wall clock, prefer Aperture.
- With an anytime budget, a recountable witness, or parity-structured refutations, SUTRA is the one to try.

On parity-structured instances the gap is not marginal: the repository reports `UNSAT` in 2 ms with a certificate on Tseitin instances where a resolution-based solver times out past 30 s. That is a statement about the certificate format, not a claim of general superiority.

## What changes for Navokoj users

- API keys and endpoints stop working; there is no hosted replacement.
- The solver is local: build `./sutra` and pass the same WCNF instances.
- Responses are replaced by one JSON line with `status`, `soft_cost`, `hard_unsatisfied`, and `verified` fields.
- Checkpointing is handled by the repository's `--checkpoint` flag; the old hosted response format does not carry over.
- The older Navokoj posts remain as an archive. Where they describe a hosted workflow, read them historically.

## Links

- SUTRA: [github.com/sethuiyer/sutra](https://github.com/sethuiyer/sutra)
- Aperture: [github.com/YamSln/Aperture](https://github.com/YamSln/Aperture)
- MaxSAT Evaluation 2026: [Zenodo record](https://zenodo.org/records/21358014)

Corrections, if any, will be appended here rather than silently edited.
