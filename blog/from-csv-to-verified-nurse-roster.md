---
title: "From Workforce Data to a Verified Nurse Roster"
description: "How a scheduling workflow turns staffing data, policies, and preferences into a time-bounded operational decision."
date: "2026-07-18"
author: "Navokoj Team"
tags: [scheduling, product, customer-outcomes]
materials:
  - label: "Hospital scheduling assets"
    href: "https://huggingface.co/buckets/sethuiyer/shunyabar-evidence-v1"
    note: "Roster-related evidence and figures in the public ledger"
  - label: "API schedule docs"
    href: "/docs#schedule"
---

# From Workforce Data to a Verified Nurse Roster

Nurse rostering is not one optimization objective. It is a collection of requirements that must hold together: coverage, qualifications, rest, availability, overtime, fairness, and preferences.

Navokoj treats the roster as a decision service.

## The workflow

1. Provide nurses, shifts, qualifications, demand, and policy rules.
2. Mark clinical, legal, and safety requirements as hard constraints.
3. Mark preferences, stability, fairness, and cost as weighted objectives.
4. Set a deadline for the schedule.
5. Receive the best available assignment, hard-feasibility status, residual conflicts, and execution metadata.

The result is useful even when the input changes. A sickness absence or a new demand forecast becomes an incremental update rather than a manual restart.

## Hard first, preferences second

The runtime treats feasibility as the first question. A schedule that violates mandatory coverage is not rescued by a better preference score. Once the hard region is reached, the remaining budget improves soft quality: preferences, fairness, stability, and cost.

That separation makes the output easier for an operations team to review. It also makes acceptance criteria concrete: all mandatory rules satisfied, then compare preference quality against the current process.

## The pilot

The best first deployment is a narrow one: one planning horizon, one export format, and one agreed baseline. The team can validate the schedule independently before it reaches production, then expand the model as the workflow earns trust.

## A complete reference model

ShunyaBar Labs now maintains a concrete seven-day reference workload with:

| Model property | Value |
| --- | ---: |
| Nurses | 8 |
| Shifts per day | 3 |
| Planning days | 7 |
| Decision and auxiliary variables | 224 |
| Hard clauses | 1,757 |
| Soft clauses | 446 |
| Total clauses | 2,203 |

The model requires exactly two nurses on every morning, evening, and night shift. Each nurse can work at most one shift per day. Nurse 3 cannot work nights, Nurse 7 cannot work weekends, and every nurse must receive at least one complete day off.

Soft clauses discourage consecutive workdays and discourage evening or night assignments for Nurse 1.

## Why the encoding matters

Scheduling prose must eventually become precise Boolean semantics. Several superficially plausible encodings express the wrong problem.

### Exactly two means two separate cardinality directions

For eight candidate nurses, at-most-two is encoded using negative triples:

\[
\neg x_i \lor \neg x_j \lor \neg x_k
\]

for every triple of distinct nurses. Pairwise negative clauses would encode at-most-one and make the coverage model contradictory when combined with at-least-two.

### Consecutive-day preferences require shift pairs

Avoiding consecutive workdays requires clauses for all nine combinations between the three shifts on day \(d\) and the three shifts on day \(d+1\). A clause that repeats mutually exclusive same-day variables can become tautological under the one-shift-per-day rule and impose no real preference.

### A day off needs a day-level variable

The model uses auxiliary variables to represent whether a nurse works at least one shift on a given day. A weekly clause over individual negated shift variables merely says the nurse does not work every one of the 21 shifts; it does not guarantee one complete day off.

### Hardness is explicit

The API request carries a `hard_clause_mask` with one Boolean per clause. Large weights express preference strength; they do not silently define hardness. This keeps API semantics and native WCNF serialization aligned.

## Observed result

Local SUTRA 0.4.0 returned:

| Metric | Result |
| --- | ---: |
| Status | `FEASIBLE` |
| All constraints solved | No |
| Every hard constraint feasible | **Yes** |
| Hard violations | **0** |
| Soft violations | 31 |
| Soft cost | 147 |
| Native solver time | 1.789 ms |
| Capture wall time | 2.873 ms |

The distinction is the product behavior this workload is meant to demonstrate. The roster is operationally feasible under every mandatory rule, while 31 weighted preference clauses remain unsatisfied. The run does not claim a globally optimal soft cost.

## Returned roster

`M`, `E`, and `N` mean morning, evening, and night. A dot is a complete day off.

| Nurse | D1 | D2 | D3 | D4 | D5 | D6 | D7 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | N | · | · | · | · | M | E |
| 2 | N | · | · | M | · | N | E |
| 3 | M | E | E | M | E | E | · |
| 4 | M | M | M | E | M | · | N |
| 5 | · | E | E | N | E | M | M |
| 6 | E | N | N | · | N | E | N |
| 7 | E | N | N | N | N | · | · |
| 8 | · | M | M | E | M | N | M |

An independent checker confirmed:

- every shift/day pair contains exactly two nurses;
- no nurse works multiple shifts on one day;
- Nurse 3 has no night assignment;
- Nurse 7 has no weekend assignment;
- every nurse has at least one complete day off;
- the returned Boolean assignment satisfies all 1,757 hard clauses.

## What operations receives

The useful output is not just the roster grid. A consuming application can retain:

- the hard-feasibility state;
- weighted soft violations;
- the exact input model or its hash;
- solver and engine version;
- engine profile and work limits;
- the complete assignment;
- independent verification output;
- human acceptance or modification.

That lets a scheduler distinguish “safe but imperfect” from “missing mandatory coverage.” Both can have high aggregate satisfaction, but only the former is a publishable candidate.

## Reproduce the reference workload

The public evidence ledger contains the deterministic generator, API-shaped request, native WCNF, raw solver output, assignment, environment metadata, and independent verifier under:

`navokoj/solve-artifacts/navokoj-nitro-nurse-wcnf-2026-07-22`

The verification command is:

```bash
python3 verify_assignment.py
```

The expected output is `passed: true`, zero hard violations, 31 soft violations, and soft cost 147.

## What this reference does not establish

This is a synthetic eight-nurse contract workload, not a claim of production hospital deployment. It establishes that the corrected hard/soft model has a valid witness and that the result semantics can be checked independently.

A real pilot must add local labor rules, qualifications, demand variation, leave, contract hours, skill coverage, fairness policy, export formats, and human approval. The reference model supplies the technical starting point and the acceptance pattern: mandatory rules first, preference quality second, independent checking before publication.
