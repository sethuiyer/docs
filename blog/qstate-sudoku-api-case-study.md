---
title: "Q-State Solves a 9x9 Sudoku Through the Navokoj API"
description: "A live Q-State API run solved an 81-variable Sudoku model with 100% satisfaction and zero conflicts."
date: "2026-07-19"
author: "Navokoj Team"
tags: [q-state, sudoku, api, finite-domain, case-study]
materials:
  - label: "Q-SAT API documentation"
    href: "/docs#qsat"
    note: "Finite-domain constraint types and request format"
  - label: "API contract"
    href: "/docs"
    note: "Authentication, deadlines, and result semantics"
---

# Q-State Solves a 9x9 Sudoku Through the Navokoj API

Sudoku is a compact finite-domain constraint problem: every cell has one of nine states, and each row, column, and 3x3 box must contain distinct states. This makes it a useful product-level test for Q-State because the model can stay in its native finite-domain form instead of being expanded into Boolean clauses.

## The request

The live test used:

- 81 variables, one for each Sudoku cell
- 9 states per variable, representing digits 1 through 9
- 27 `all_diff` constraints for rows, columns, and boxes
- 30 `in` constraints for the supplied givens
- 57 total constraints
- The `qstate` API engine

The request shape was:

```json
{
  "num_vars": 81,
  "num_states": 9,
  "constraints": [
    {"vars": [1, 2, 3, 4, 5, 6, 7, 8, 9], "type": "all_diff"},
    {"var": 1, "type": "in", "states": [5]}
  ],
  "engine": "qstate"
}
```

The full request generator is available in `scripts/test_qsat_sudoku.py` in the website repository. The credential is intentionally omitted from the published example.

## Observed result

The live API call completed successfully:

| Metric | Result |
| --- | ---: |
| Variables | 81 |
| States | 9 |
| Constraints | 57 |
| Satisfaction | 100% |
| Conflicts | 0 |
| Wall-clock request time | approximately 15 seconds |
| Engine selector | `qstate` |

The returned assignment was independently checked against the row, column, box, and given-cell constraints. Every constraint passed.

## Why this matters for applications

The API contract accepts the structure customers already have: finite-domain variables, allowed states, equality, inequality, and all-different rules. A planning application can therefore submit a model and deadline without first writing a bespoke CNF encoder.

The same shape applies to exam timetables, resource assignment, configuration, and other problems where each decision has a bounded set of valid states. The response reports the assignment, satisfaction, conflicts, runtime, and engine metadata so the calling application can decide whether to accept, inspect, or revise the result.

## Reproduce it

```bash
python3 frontend/website-new/scripts/test_qsat_sudoku.py
```

The script targets the live Navokoj API and expects an API key to be configured in the script or supplied through the normal access flow. Do not commit credentials or place them in browser code.

See the [Q-SAT documentation](/docs#qsat) for supported finite-domain constraint types and the [API contract](/docs) for authentication and result semantics.
