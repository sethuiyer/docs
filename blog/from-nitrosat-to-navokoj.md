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
