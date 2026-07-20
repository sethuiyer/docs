---
title: "Sponsor Preview: Fund the Research, Run the Solver"
description: "How GitHub Sponsors supports NitroSAT research and unlocks Navokoj compute credits for evaluation."
date: "2026-07-20"
author: "Sethurathienam Iyer"
tags: [sponsorship, nitrosat, navokoj, product]
---

# Sponsor Preview: Fund the Research, Run the Solver

ShunyaBar Labs builds large-scale combinatorial optimizers that treat constraint spaces as thermodynamic systems — letting solutions flow toward feasibility rather than searching every branch.

This is a practical sponsorship preview for researchers and engineers who want to support the work and evaluate the resulting systems.

## What the work covers

The research spans three connected projects:

- [NitroSAT](https://github.com/sethuiyer/NitroSAT) — an open-source $O(M)$ MaxSAT approximator that handles millions of clauses on consumer hardware under Apache 2.0.
- [BAHA](https://github.com/sethuiyer/baha) — a combinatorial optimizer using complex-plane branch enumeration and Lambert-W structure to escape local minima.
- [Navokoj](https://navokoj.shunyabar.foo/) — a production API for large-scale MaxSAT, Max-QSAT, and XOR-SAT with global geometry awareness and a generous free tier.

If you work on scheduling, chip verification, logistics, graph theory, or biological constraints at scale, these tools are built for your problems.

Sponsorship funds GPU acceleration, larger benchmark suites, and new problem domains. The core remains open; sponsors make the research faster.

## Sponsor preview

Sponsor NitroSAT research and receive **1.5× your verified sponsorship amount** as Navokoj compute credits for evaluation.

To claim credits:

1. Sponsor the project through [GitHub Sponsors](https://github.com/sponsors/sethuiyer).
2. Email [contact@shunyabar.foo](mailto:contact@shunyabar.foo) with your GitHub username and sponsorship amount.
3. We verify the sponsorship and provision a Navokoj API key.

## Compute credits

Credits can be used for CPU, L4, and H100 compute:

| Hardware | Base fee | Per minute | Minimum charge |
| --- | ---: | ---: | ---: |
| CPU | $0.01 | $0.02 | $0.01 |
| L4 GPU | $0.25 | $0.10 | $0.25 |
| H100 GPU | $1.50 | $1.00 | $1.50 |

The final settlement uses the resolved hardware, normalized clause count, measured runtime, and active entitlement. Business invoices, procurement, dedicated infrastructure, and air-gapped deployments are available separately as Navokoj moves toward beta.

## Free preview access

Free preview access is available for research and evaluation. Email [contact@shunyabar.foo](mailto:contact@shunyabar.foo?subject=Navokoj%20free%20preview) to request access and receive the current shared preview key.

The shared key is limited to **10,000 solves per month** across the preview program. It is intended for lightweight testing, demonstrations, and reproducible experiments—not production workloads. Keep the key server-side and ask for a replacement if it is exposed.

The NitroSAT research release remains open source under Apache 2.0; Navokoj production engines and hosted infrastructure are commercial.

## What sponsorship makes possible

The near-term goal is to fund interns and research operators who can expand benchmark coverage, maintain proof artifacts, and help move Navokoj from evaluation toward a dependable production service.

Support the work through [GitHub Sponsors](https://github.com/sponsors/sethuiyer), review the [evidence ledger](https://huggingface.co/buckets/sethuiyer/shunyabar-evidence-v1), and explore the [Navokoj API documentation](/navokoj/api-documentation/).
