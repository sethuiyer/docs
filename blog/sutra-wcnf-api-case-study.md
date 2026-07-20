---
title: "SUTRA on the API: A Small Weighted Constraint Problem, Solved End to End"
description: "A concrete WCNF-style API request using engine:nitro, with hard-feasibility, soft preferences, routing, and verification metadata in one response."
date: "2026-07-19"
author: "Navokoj Team"
tags: [sutra, wcnf, api, verification, product]
materials:
  - label: "API contract"
    href: "/docs"
    note: "Request and response semantics"
  - label: "Evidence ledger"
    href: "https://huggingface.co/buckets/sethuiyer/shunyabar-evidence-v1"
    note: "Public benchmark and verification artifacts"
---

# SUTRA on the API: A Small Weighted Constraint Problem, Solved End to End

Customers should not need to know which internal solver implementation is active. They should be able to submit rules, preferences, and a deadline, then receive a decision they can inspect.

This example shows that contract with a small scheduling-style WCNF model. The request uses `engine: "nitro"`; that is the public API selector for the production SUTRA engine.

## The model

The model has four Boolean decisions:

| Variable | Meaning |
| --- | --- |
| `x1` | Assign option A |
| `x2` | Assign option B |
| `x3` | Enable the dependent resource for A |
| `x4` | Enable the dependent resource for B |

The first three clauses are hard requirements. The final two are weighted preferences.

```json
{
  "num_vars": 4,
  "clauses": [
    [1, 2],
    [-1, 3],
    [-2, 4],
    [-3, -4],
    [1, -4]
  ],
  "weights": [1000, 1000, 1000, 10, 5],
  "hard_clause_mask": [true, true, true, false, false],
  "engine": "nitro",
  "timeout_budget_seconds": 5.0,
  "min_satisfaction": 1.0
}
```

The hard-clause mask makes the semantics explicit:

- At least one of A or B must be selected.
- Selecting A requires its dependent resource.
- Selecting B requires its dependent resource.
- The remaining rules are preferences, with weights 10 and 5.

This is the useful distinction in an operational model: hard feasibility comes first; soft cost is optimized only within the feasible region.

## The API call

```bash
curl -X POST https://api.navokoj.shunyabar.foo/v1/solve \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d @request.json
```

The credential is intentionally omitted from the example. The API key is supplied by the caller and is never part of the evidence record or application logs published in this article.

## The result

The live request returned the following relevant fields:

```json
{
  "success": true,
  "completed": true,
  "solution": {
    "assignment": [1, 0, 1, 0],
    "satisfaction_rate": 1.0,
    "solve_time_seconds": 0.008189,
    "status": "optimal",
    "solved": true,
    "feasible": true,
    "satisfied_constraints": 5,
    "total_constraints": 5,
    "hard_constraints": 3,
    "hard_satisfied": 3,
    "hard_unsatisfied": 0
  },
  "engine_used": "nitro",
  "routing": {
    "requested_engine": "nitro",
    "resolved_engine": "nitro",
    "attested": true
  },
  "engine_trace": [
    {
      "engine": "nitro",
      "hardware": "cpu",
      "duration_ms": 8,
      "satisfaction_after": 1.0
    }
  ]
}
```

The assignment satisfies every clause. In particular, the three hard requirements are all satisfied, and both soft preferences are satisfied as well. The API also returns the route and hardware metadata needed to understand how the decision was produced.

## What this means for an application

The application does not have to implement solver selection, hard-versus-soft bookkeeping, timeout handling, or result interpretation itself. It sends a model and a deadline, then checks:

1. `feasible` to confirm every hard rule is satisfied.
2. `solved` and `satisfaction_rate` to determine whether every clause is satisfied.
3. `engine_used` and `routing` for execution provenance.
4. `hard_unsatisfied` and residual fields when the problem is only partially solved.

For a larger schedule, the same contract can carry coverage, rest, certification, availability, fairness, and preference rules. The model becomes richer; the integration does not.

## The product lesson

SUTRA is the production engine. `engine: "nitro"` is the stable API contract that selects it. This separation lets Navokoj improve the production runtime without forcing customers to rewrite their integration every time the underlying execution path evolves.

The result customers care about is simple: a verified decision, returned within the requested budget, with enough metadata to inspect and act on it.
