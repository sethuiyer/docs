---
title: "What Happens When the Deadline Arrives?"
description: "Navokoj is designed for deadline-bounded decisions: here is what an application receives when a solve cannot finish perfectly."
date: "2026-07-18"
author: "Navokoj Team"
tags: [product, anytime, api]
materials:
  - label: "API result semantics"
    href: "/docs"
  - label: "Evidence ledger"
    href: "https://huggingface.co/buckets/sethuiyer/shunyabar-evidence-v1"
---

# What Happens When the Deadline Arrives?

Operational software rarely has unlimited time. A dispatch decision, policy check, or schedule change usually has a response budget measured in seconds or minutes.

Navokoj is an anytime runtime. It keeps the best-known assignment during execution and returns it when the budget expires.

## The response has meaning

Applications should distinguish:

- `solved`: every constraint satisfied;
- `feasible`: every hard constraint satisfied, even if soft preferences remain;
- `partial`: a best-known assignment with residual violations;
- `timeout`: the budget ended before a complete result;
- `error`: the request could not be processed.

This is different from returning an empty failure. A partial result is not silently presented as a valid plan; it carries its remaining conflicts so the caller can decide whether to retry, escalate, or ask for human review.

## Why this matters

The deadline is part of the product contract. Customers can choose a fast response for interactive workflows, a longer budget for planning, or a dedicated deployment for workloads that need more capacity. The same model can therefore serve a dashboard and a batch planning job without pretending they have the same operating requirements.

The result also records runtime and billing information so the decision can be reconciled after execution.
