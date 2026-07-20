---
title: "Navokoj Pricing: Plans, Workloads, and Compute"
description: "How Navokoj combines monthly workload entitlements with explicit CPU and GPU compute settlement."
date: "2026-07-18"
author: "Navokoj Team"
tags: [billing, product, api]
materials:
  - label: "GitHub Sponsors (API credits)"
    href: "https://github.com/sponsors/sethuiyer"
    note: "Purchase API compute credits"
  - label: "Evidence ledger (HF)"
    href: "https://huggingface.co/buckets/sethuiyer/shunyabar-evidence-v1"
  - label: "API docs"
    href: "/docs"
  - label: "Claim API key (email)"
    href: "mailto:contact@shunyabar.foo?subject=Navokoj%20API%20key%20claim"
---

# Navokoj Pricing: Plans, Workloads, and Compute

Navokoj separates what your account can run from where it runs. A monthly plan provides SAT, Q-State, and scheduling entitlements. CPU overage and GPU execution draw from API compute credits.

## Account plans

| Plan | Monthly | SAT solves | Q-State solves | Schedules | Account concurrency |
| --- | ---: | ---: | ---: | ---: | ---: |
| Hobbyist | $0 | 300 | 25 | 10 | 1 |
| Mini Lab | $19 | 2,000 | 250 | 100 | 3 |
| Launch Pad | $199 | 10,000 | 1,000 | 500 | 10 |
| Lotus Fleet | $499 | 50,000 | 5,000 | 2,000 | 25 |

Annual pricing is $190 for Mini Lab, $1,990 for Launch Pad, and $4,990 for Lotus Fleet.

## Compute rates

| Execution | Rate |
| --- | --- |
| Included CPU | $0 while monthly entitlement remains |
| CPU overage through 1,000,000 clauses | $0.01 base + $0.02 per compute minute |
| CPU above 1,000,000 clauses | $0.05 base + $0.02 per compute minute |
| L4 GPU | $0.25 base + $0.10 per compute minute |
| H100 GPU | $1.50 base + $1.00 per compute minute |

GPU requests are paid because they reserve specialized compute. Enterprise deployments can add dedicated capacity, support, and deployment requirements by arrangement.

## Dedicated capacity

Dedicated deployments are optimized for maximum model size and throughput. They do not use shared-cloud rate limits or shared-cloud concurrency throttling; capacity is based on the hardware provisioned for the account and can substantially exceed the shared-cloud ceilings shown above. Current starting points are **L4 from $500/month** and **RTX 5090 from approximately $925/month**. Air-gapped deployments start at **$500/month**. Final pricing depends on region, availability, and provisioned hardware. Contact [contact@shunyabar.foo](mailto:contact@shunyabar.foo?subject=Navokoj%20dedicated%20capacity) to discuss capacity and deployment requirements.

This is a premium single-tenant runtime: dedicated infrastructure, a private API endpoint, no shared-plan solve quota, custom solver configuration, and deployment support. “Unlimited usage” means usage is not governed by shared-cloud plan quotas; it remains bounded by the provisioned machine and the agreed deployment contract.

## Rate-limit composition

Each request consumes four atomic windows: account burst, offering burst, hardware burst, and account hourly capacity. The effective limit is the lowest applicable ceiling. This lets a Lotus Fleet account sustain high CPU throughput without overrunning the smaller H100 queue.

`GET /v1/pricing` returns the current policy version, monthly quotas, model limits, 30-second limits, hourly limits, hardware access, and compute rates.

## What the API records

The final response records the resolved hardware, normalized billable clause count, pricing policy, runtime, and settlement result. Estimates and preauthorizations are useful before execution; the server's final ledger is authoritative after execution.

This makes cost predictable enough to put inside an application workflow while retaining the flexibility to choose a larger runtime when the decision is worth it.

## How to get an API key (GitHub Sponsors)

**Developer access via GitHub Sponsors.** Purchase **Navokoj API compute credits** through Sponsors as a developer-friendly payment rail. There is no separate card checkout on this site. Sponsor ShunyaBar Labs to receive credits at **1.5× your sponsorship amount**.

### Steps

1. **Purchase credits** at [github.com/sponsors/sethuiyer](https://github.com/sponsors/sethuiyer) (one-time or recurring).
2. **Email** [contact@shunyabar.foo](mailto:contact@shunyabar.foo?subject=Navokoj%20API%20key%20claim) with:
   - the Sponsors **transaction ID**, and
   - the **email** you used to register (or want to use) for Navokoj.
3. **Navokoj automatically provisions** an API key when the email is **new**, and loads balance at **1.5× the sponsorship amount**. That credit is what usage draws down against. Existing emails receive the same credit load against the account.

### Why 1.5×

Sponsorship amounts convert into platform compute credit at a 1.5× multiplier so more of what you pay becomes usable solve budget.

### Anytime results

If a solve hits the timeout, we still return the best partial result found so far — never an empty failure.

Usage metering still appears in the API response. The response and billing ledger are authoritative for what was consumed.

**Alpha.** Stable for experimentation and evaluation. Enterprise SLAs and dedicated capacity are available by arrangement: [contact@shunyabar.foo](mailto:contact@shunyabar.foo).
