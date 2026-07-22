---
title: "Why Customers Switch to Navokoj"
description: "A practical constraint runtime for decisions that are expensive, slow, opaque, or difficult to integrate."
date: "2026-07-18"
author: "Navokoj Team"
tags: [product, customer-outcomes]
materials:
  - label: "Evidence ledger"
    href: "https://huggingface.co/buckets/sethuiyer/shunyabar-evidence-v1"
  - label: "Pricing explained"
    href: "/blog/navokoj-pricing-explained"
---

# Why Customers Switch to Navokoj

Critical operational decisions often live in spreadsheets, brittle scripts, and solver projects that only one specialist understands. The cost is not just compute. It is delayed work, silent rule violations, and hours spent explaining why a plan failed.

Navokoj is built for that gap.

## The switch

Teams use Navokoj when they need a decision that is:

- feasible under mandatory rules;
- good enough under a stated deadline;
- explainable when preferences cannot all be met;
- easy to integrate into an existing service;
- recorded with the result and its execution context.

The product is an API, not a new planning department. Send a model, choose a time budget, and receive the best available assignment with result semantics your application can act on.

## What changes operationally

Instead of waiting for an opaque batch job, your application can receive a verified feasible result or a useful partial result with residual conflicts. Instead of rebuilding a model for every change, an evolving workload can be solved incrementally. Instead of treating every problem as the same, the runtime can use the execution path appropriate to its structure and resource budget.

Navokoj does not require customers to replace every exact optimizer. It can provide a fast incumbent before an exact workflow, or handle the decisions where time-to-feasible matters more than a proof of global optimality.

## The business outcome

The value is fewer manual interventions, shorter planning cycles, and decisions that can be inspected after the fact. The right evaluation is therefore not only solver speed. It is time saved, failure explained, and a workflow that becomes easier to operate.

Start with one difficult workload. Measure the baseline. Then let the runtime earn its place.

## The workflow before the switch

A constraint bottleneck rarely presents itself as “we need a new solver.” It usually appears as operational symptoms:

- a spreadsheet that only one planner understands;
- an optimizer that runs overnight and still needs manual repair;
- application code containing years of conflicting `if` statements;
- a schedule that cannot explain which preference forced an exception;
- a deployment validator that reports only pass or fail;
- a solver integration whose engine output, billing, and application state disagree.

The technical problem is embedded in a workflow. Replacing an algorithm without changing how inputs, decisions, failures, and approvals are handled will not remove the bottleneck.

## What changes after integration

| Before | With a constraint runtime |
| --- | --- |
| Rules distributed across scripts and spreadsheets | One explicit model boundary |
| A batch job returns late or fails opaquely | A typed result arrives with execution context |
| Mandatory and preferred rules are mixed together | Explicit hard mask and weighted preferences |
| A planner manually discovers conflicts | Residual violations identify the remaining tension |
| Every change triggers an informal restart | The application resubmits the updated state through one contract |
| Solver output is trusted implicitly | The returned assignment can be checked independently |
| Compute cost is detached from routing | Execution hardware and settlement remain associated |

The goal is not to remove human judgment. It is to move human attention away from reconstructing solver state and toward reviewing meaningful trade-offs.

## Three common adoption patterns

### Fast incumbent before an exact workflow

An exact optimizer remains the system of record, but Navokoj produces an early feasible candidate. The application can display or test that candidate while the exact workflow continues searching for a bound or proof.

This pattern reduces time-to-first-decision without claiming that a heuristic result replaces exact optimization.

### Decision service inside an application

The product needs a result inside an interactive or operational deadline. Navokoj becomes the runtime behind scheduling, placement, configuration, or policy decisions, with application behavior keyed to `solved`, `feasible`, and `partial` states.

### Diagnostic companion

The existing solver remains in place, while Navokoj and DEFEKT-style diagnostics help identify structural imbalance, contradictory requirements, or expensive regions before the primary solve begins.

This is often the lowest-risk starting point because it adds visibility without replacing the current production path.

## How to evaluate a switch

A credible pilot compares complete workflows rather than isolated solver timings.

| Measure | Baseline question |
| --- | --- |
| Time to first hard-feasible assignment | How long before operations has something valid to inspect? |
| Hard-feasibility rate | How often are all mandatory rules satisfied? |
| Soft cost or preference quality | Which compromises remain after feasibility? |
| End-to-end latency | What does the caller observe, including routing and transport? |
| Manual repair time | How much human work follows the machine result? |
| Explanation quality | Can the team identify why a preference or rule failed? |
| Integration effort | How much code and model transformation does the workflow require? |
| Execution cost | What did the actual CPU/GPU path cost? |
| Operational recoverability | Can the team retry, escalate, upgrade, and roll back safely? |

Run representative easy, typical, difficult, infeasible, and malformed cases. Averages alone hide the workloads most likely to cause an incident.

## When Navokoj should not replace the current solver

Do not replace an established exact workflow merely because another engine produces a fast high-satisfaction assignment.

Keep or pair the existing system when the application requires:

- a formal UNSAT certificate for every infeasible instance;
- a certified global optimum rather than a best-known feasible assignment;
- a mature domain-specific optimizer already meeting the operational SLA;
- deterministic replay guarantees beyond those supported by the selected engine;
- regulatory acceptance tied to a particular solver or proof format.

In those environments, Navokoj may still provide an incumbent, diagnostic path, or independent comparison.

## The switching criterion

The decision is justified when the complete workflow becomes measurably easier to operate:

```text
less time waiting
+ fewer invalid plans
+ less manual reconstruction
+ clearer trade-offs
+ controlled execution cost
> migration and operating cost
```

That is the practical meaning of switching to a constraint runtime. The engine must improve the decision system around it, not merely win one benchmark.
