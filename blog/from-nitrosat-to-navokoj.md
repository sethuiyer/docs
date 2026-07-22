---
title: "From NitroSAT Research to the Navokoj Runtime"
description: "Why ShunyaBar Labs keeps an open research release while building a commercial constraint runtime around it."
date: "2026-07-18"
author: "ShunyaBar Labs"
tags: [open-source, product, company]
materials:
  - label: "NitroSAT repository"
    href: "https://github.com/sethuiyer/NitroSAT"
  - label: "Evidence ledger"
    href: "https://huggingface.co/buckets/sethuiyer/shunyabar-evidence-v1"
---

# From NitroSAT Research to the Navokoj Runtime

NitroSAT is the open research and engineering release from ShunyaBar Labs. It gives developers and researchers a concrete way to explore the solver lineage, reproduce experiments, and build on the public work.

Navokoj is the product layer around difficult operational decisions.

## The product boundary

Navokoj adds the pieces a company needs when solving becomes part of an application: API access, workload routing, finite-domain and scheduling surfaces, diagnostics, verification metadata, streaming execution, billing, deployment options, and operational support.

That boundary is intentional. Open research creates participation and trust. The commercial runtime packages the engineering required to turn a hard model into a dependable service.

## One ecosystem, different jobs

NitroSAT is for learning, research, local experiments, and public reproducibility. Navokoj is for teams that need to submit real workloads, receive a decision under a deadline, and operate the result as part of a business system.

The two surfaces strengthen each other without pretending they are the same product.

## Capability boundary

| Concern | NitroSAT | Navokoj |
| --- | --- | --- |
| Primary role | Open solver research and local execution | Operated constraint-decision runtime |
| Distribution | Source, binaries, benchmarks, and examples | Hosted API plus dedicated/private deployment paths |
| Core workloads | SAT and MaxSAT solver lineage | SAT, weighted CNF, XOR, QBF, Q-State, scheduling, batch, and diagnostics |
| Caller identity | Local process ownership | API keys, accounts, plans, quotas, and audit context |
| Routing | User chooses and runs a binary | Runtime selects eligible engine and hardware paths |
| Result interpretation | Native solver output and assignment | Stable `solved`, `feasible`, `partial`, verification, routing, and billing fields |
| Operations | User owns compilation and capacity | Shared, dedicated, private, and disconnected operation |
| Economics | Apache-licensed local computation | Subscription entitlement plus actual compute settlement |

NitroSAT exposes the engine lineage. Navokoj preserves a decision contract around that lineage while the implementation, hardware, and account context change.

## What happens to one request

An application submitting `engine: "nitro"` is not invoking a source filename directly. It is selecting the stable public contract for the production Nitro/SUTRA path.

The runtime must then:

1. validate the Boolean or weighted model;
2. preserve the explicit hard/soft mask;
3. admit the request against account and workload policy;
4. choose an eligible execution path;
5. execute the selected engine behind its adapter boundary;
6. verify the candidate assignment against the submitted model;
7. return stable result semantics and execution metadata;
8. reconcile resource use with quota and billing records.

Only one of those steps is the native solver invocation.

## Why the stable selector matters

The solver family has moved through multiple implementations and operating regimes: early differentiable prototypes, in-memory NitroSAT versions, bounded-memory streaming, and the SUTRA production engine.

If customers integrated directly against every native command, flag, and output format, each engine improvement would become a migration event. The API selector decouples application code from that evolution.

That does not mean all engines behave identically. Budget controls, proof capabilities, supported formats, and hardware paths remain engine-specific. The runtime's responsibility is to expose those differences honestly while keeping the outer request and result vocabulary coherent.

## What remains valuable in the open release

The open solver is not merely a historical snapshot. It supports several jobs that a managed service cannot replace:

- reading and modifying the implementation;
- compiling for local hardware;
- constructing new workload generators;
- running private experiments without a network dependency;
- comparing engine generations;
- studying failure regimes and structural limitations;
- integrating solver ideas into other research systems.

The public repositories, project sites, Zenodo records, and artifact corpora provide different levels of that research surface.

## What the runtime adds economically

Companies rarely pay only for access to an optimization loop. They pay to avoid owning all of the surrounding work:

- authentication and quota enforcement;
- deployment and capacity management;
- engine compatibility;
- workload routing;
- response normalization;
- hardware procurement;
- usage accounting;
- upgrades, rollback, and operational support.

Navokoj commercializes that operated boundary. NitroSAT keeps the underlying research legible and locally useful.

## The relationship in one line

```text
NitroSAT develops and exposes solver mechanisms.
Navokoj makes constrained decisions operable as infrastructure.
```
