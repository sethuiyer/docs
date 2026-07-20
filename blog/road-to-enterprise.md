---
title: "The Road to Enterprise: From Spectral Phase Transitions to a Production Runtime"
description: "How Navokoj evolved from a differentiable SAT experiment into a production constraint runtime with SUTRA, GPU routing, verification, usage billing, and customer-controlled deployment."
date: "2026-07-20"
author: "Sethurathienam Iyer, CEO, ShunyaBar Labs"
tags: [company, enterprise, deployment, runtime]
materials:
  - label: "Evidence ledger"
    href: "https://huggingface.co/buckets/sethuiyer/shunyabar-evidence-v1"
  - label: "API documentation"
    href: "/navokoj/api-documentation/"
  - label: "Contact"
    href: "mailto:contact@shunyabar.foo"
---

# The Road to Enterprise: From Spectral Phase Transitions to a Production Runtime

At ShunyaBar Labs, we built Navokoj on one stubborn premise: **logic should be a utility**.

The first version was a differentiable SAT experiment. The current system is a production constraint runtime: it accepts SAT, MaxSAT, weighted CNF, XOR, QBF, Q-State, and scheduling workloads; selects an execution path; returns a best-effort or hard-feasible assignment within a time budget; and records the verification and billing evidence around that decision.

This is the development that matters for enterprise users. Navokoj is no longer just an optimizer hidden behind an API. It is now a runtime with explicit engines, hardware-aware routing, account limits, usage accounting, and a customer-controlled deployment path.

## The runtime we have now

The public API exposes a stable set of workload families:

- **SUTRA / Nitro** for fast SAT, MaxSAT, WCNF, and hard-first constraint solving. NitroSAT V3 is integrated as the high-throughput runtime with a fallback path for older solver environments.
- **Native XOR handling** so multi-way XOR chains do not expand into an exponential CNF representation before solving.
- **QBF and Q-State** support for quantified and quantum-state-style constraint workloads, with tier-specific node and state limits.
- **Scheduling** with strict hard-constraint priority and hard-feasible repair. The scheduling path now defaults to the physics-informed Nitro engine instead of treating scheduling as a thin wrapper around a generic solver.
- **Batch solving and diagnostics** for repeated workloads, DEFEKT-style feasibility checks, verification metadata, and evidence-oriented responses.

The API keeps the engine choice explicit (`nano`, `mini`, `nitro`, `pro`, or `ensemble`) while allowing `auto` to select the appropriate route. The result includes the selected engine, hardware, solve timing, satisfaction information, and verification fields rather than returning an opaque Boolean.

## Hardware is part of the product

Navokoj now routes workloads by model size, constraint density, XOR dimensions, schedule size, and account entitlement.

- **CPU** is the frictionless entry point for ordinary SAT, MaxSAT, and scheduling workloads.
- **L4 GPU** is available to Launch Pad and Lotus Fleet accounts and is also used by the controlled preview program.
- **H100 GPU** is available to Lotus Fleet and approved evaluation accounts for the largest supported workloads.

Users can request hardware explicitly, or let the runtime select it. When a problem is larger than the requested tier allows, the API reports the selected hardware and the reason for an upgrade instead of silently changing the economics. GPU execution is usage-billed, while included subscription capacity remains visible as a separate billing source.

Current hardware pricing is intentionally legible: L4 starts at **$0.25 plus $0.10 per minute**, and H100 starts at **$1.50 plus $1.00 per minute**. CPU remains included within the plan and becomes usage-priced above the free clause threshold. Failed requests do not consume solve quotas.

## Plans are now a policy, not a promise in a slide deck

The July 19 pricing policy is a single contract imported by the API, middleware, routing layer, and public pricing endpoint:

| Plan | Included SAT solves | Maximum model | Hardware |
|---|---:|---:|---|
| **Hobbyist** | 300 / month | 10k variables, 100k clauses | CPU |
| **Mini Lab** | 2,000 / month | 100k variables, 1M clauses | CPU |
| **Launch Pad** | 10,000 / month | 1M variables, 8M clauses | CPU, L4 eligibility |
| **Lotus Fleet** | 50,000 / month | 2M variables, 12M clauses | CPU, L4, H100 eligibility |

The same policy defines per-engine quotas, batch size, concurrent requests, Q-State limits, schedule resources, burst limits, and hardware access. A sponsor preview tier can be provisioned for research evaluation with wallet-backed usage and the 1.5× sponsorship-credit promotion described in the API guide.

## Evidence instead of adjectives

The benchmark program has expanded from the original SAT Industrial Track comparison into constructive, reproducible stress tests:

- Reversible pebbling at 300,000 clauses reached **99.39% satisfaction**.
- A height-16 pebbling workload reached **2.4 million clauses** on an L4 with **97.55% satisfaction**.
- A 129-SAT stress problem reached **zero violations** on an H100 run.
- Ramsey, Sokoban, XOR, QBF, scheduling, and WCNF cases now have dedicated runners, proof artifacts, or verification paths.

These numbers are not a claim that every workload is solved perfectly. They define the boundary honestly: Navokoj returns the best verified assignment found within the budget, reports residual violations when they exist, and preserves the artifacts needed to reproduce or audit the result.

## Enterprise deployment is customer-controlled

The enterprise path is no longer “contact us when the GPU tier exists.” The repository now contains a release procedure for a customer-controlled image:

1. Build an immutable enterprise image from a clean tree.
2. Generate a release manifest from the exact image digest.
3. Produce an SBOM and vulnerability scan, then sign and verify the image with Cosign.
4. Transfer the signed image, manifest, SBOM, scan report, and license materials into the customer environment.
5. Run the health check and CNF/WCNF smoke tests before switching traffic.

Disconnected installations use Docker Compose and local license files. The signing private key is not part of the customer bundle. Updates are installed beside the previous digest, and rollback restores the last accepted image without requiring internet access.

## What changed under the hood

The production work has been as much about boring correctness as solver novelty:

- Sanic workers and background ledger/telemetry paths keep HTTP request handling responsive.
- Supabase-backed account, quota, wallet, and audit operations are isolated from the solver execution path.
- API keys are masked in logs and routed through a unified authentication and attestation layer.
- Modal routing is explicit for L4/H100 workloads, while local CPU paths remain available for smaller tiers.
- NitroSAT V3 output handling, WCNF weights, hard-feasibility repair, and engine selection are tested at the API boundary rather than only inside individual solvers.

That is the real road to enterprise: a solver that can be measured, a runtime that can be operated, and a deployment that can be inspected by the customer.

## The next threshold

The next milestone is not another slogan about replacing search. It is operational confidence across real teams: stable integrations, clearer evidence contracts, repeatable capacity planning, and customer-owned release records.

If you are evaluating scheduling, formal verification, agentic planning, graph problems, or large weighted constraints, request the current preview or enterprise path at **contact@shunyabar.foo**.

---

**— Sethurathienam Iyer, CEO, ShunyaBar Labs**
