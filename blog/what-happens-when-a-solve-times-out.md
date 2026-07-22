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

## A request and its result

```json
{
  "num_vars": 224,
  "clauses": [[22, 43, 64], [-1, -22, -43]],
  "weights": [1000, 5],
  "hard_clause_mask": [true, false],
  "engine": "nitro",
  "timeout_budget_seconds": 0.5
}
```

The real model would contain the complete clause set; this abbreviated request highlights the fields that govern result interpretation. The corresponding response vocabulary can look like:

```json
{
  "success": true,
  "solution": {
    "status": "FEASIBLE",
    "solved": false,
    "feasible": true,
    "hard_satisfied": 1757,
    "hard_constraints": 1757,
    "soft_unsatisfied": 31,
    "solve_time_seconds": 0.001789
  },
  "engine_used": "nitro",
  "engine_trace": [
    {
      "engine": "sutra",
      "budget_mode": "engine-bounded",
      "runtime_ms": 1.789
    }
  ]
}
```

`solved: false` does not mean the result is unusable. Here it means not every soft preference was satisfied. `feasible: true` says every explicitly hard rule holds, which is the property an application normally requires before executing the schedule.

## Status and quality are different axes

| Field | Question |
| --- | --- |
| `success` | Did the API process the request? |
| `status` | How did the selected engine classify the outcome? |
| `solved` | Were all submitted constraints satisfied? |
| `feasible` | Were all explicit hard constraints satisfied? |
| Satisfaction / soft cost | How good is the candidate beyond feasibility? |
| Engine trace | Which controls and execution path produced it? |

An HTTP 200 response can contain a partial assignment. A timeout can contain a hard-feasible assignment. A fast engine completion can still leave soft cost. These fields should not be collapsed into one application Boolean.

## Engine-specific budget behavior

`timeout_budget_seconds` is the caller's requested decision budget. The runtime translates it into the controls supported by the selected engine.

Those controls are not identical:

- some paths support a wall-clock deadline directly;
- some use iteration, node, or repair limits derived from the requested budget;
- an engine may converge or exhaust its configured work before the requested time;
- requesting ten seconds does not require an engine to remain busy for ten seconds;
- a longer request budget does not guarantee a better assignment.

The current SUTRA alpha path translates the request into engine-supported bounded-work controls rather than a native wall-clock deadline. For that path, the engine trace is essential: it identifies the budget mode and measured runtime used to interpret the request. Exact internal tuning parameters are intentionally not part of the public API contract.

The honest contract is therefore:

> The caller supplies an end-to-end decision budget; the response reports the engine-specific work and result actually produced within the runtime's supported controls.

## What the application should do

| Result | Safe default |
| --- | --- |
| `solved=true` | Execute after domain checks |
| `feasible=true`, `solved=false` | Execute if soft compromises are acceptable |
| `partial`, hard violations remain | Do not execute as a valid plan; retry, revise, or escalate |
| `timeout`, feasible assignment present | Treat according to feasibility and quality policy |
| `error` | Fail closed and preserve the request identifier |

For a scheduling workflow, a useful policy might be:

```python
if result["feasible"]:
    publish_for_review(result["assignment"], result["violations_summary"])
elif can_retry_with_more_capacity(result):
    enqueue_planning_retry()
else:
    escalate_to_scheduler(result["violations_summary"])
```

## What not to infer

A deadline-bounded result does not automatically establish:

- global MaxSAT optimality;
- general UNSAT proof;
- uniqueness of the assignment;
- monotonic improvement for every larger budget;
- permission to execute a partial plan.

It establishes exactly what the response and verifier show: the status of the returned assignment under the submitted model and the execution controls recorded for that run.
