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
