---
title: "Kubernetes Placement: 2 Million Constraints, 100% Satisfaction"
description: "Navokoj, the Fault-Tolerant Constraint Intelligence Engine, delivers a case study in placement safety and outage prevention with 5,000 variables and 2 million constraints."
date: "2025-12-28"
author: "Navokoj Research Team"
tags: [engineering, cloud, verification]
materials:
  - label: "Placement figure"
    href: "/blog/navokoj-k8s-placement.png"
  - label: "Evidence ledger"
    href: "https://huggingface.co/buckets/sethuiyer/shunyabar-evidence-v1"
---

# Kubernetes Placement: 2 Million Constraints, 100% Satisfaction

Engineering note on placement safety and outage prevention using Navokoj, the Fault-Tolerant Constraint Intelligence Engine.

### A practical stress test on microservices scheduling

> **Abstract.** Kubernetes schedulers make placement decisions under pressure: which node gets which pod? Real clusters face competing constraints. capacity limits, anti-affinity rules, availability zone requirements. that compound into millions of interacting conditions. We tested Navokoj on a synthetic but realistic scenario: 100 microservices across 50 nodes, with full constraint encoding. The result was 2,061,600 clauses, all satisfied.

---

## The Problem

Kubernetes cluster operators often rely on the default scheduler, which uses heuristics to place pods. These heuristics work well for simple cases but struggle when constraints stack up:

- **Exactly-one placement:** Each service must run on exactly one node
- **Anti-affinity:** Critical service pairs (e.g., database replicas) must not share a node
- **Capacity limits:** Nodes have finite CPU and memory
- **Availability zones:** Some services must stay in specific regions

A greedy scheduler processes these one at a time, making locally optimal choices that can violate global constraints. The result: pods stuck in Pending, manual intervention, or silent anti-affinity violations that surface during outages.

## The Encoding

We modeled the placement problem as Boolean satisfiability. Each variable represents a possible assignment: "service S runs on node N." The constraints translate directly:

```text
Services:           100
Nodes:              50
Variables:          5,000   (one per service-node pair)
Exactly-one:        127,400 clauses
Anti-affinity:      1,000   clauses (20 pairs × 50 nodes)
Capacity:           1,933,200 clauses (combinatorial limits)
────────────────────────────────
Total:              2,061,600 clauses
```

The capacity constraints dominate. Encoding "at most K services per node" requires enumerating combinations of K+1 services and asserting that at least one must be absent. This is where the clause count explodes.

## Results

### Benchmark: 100 Services → 50 Nodes

| Metric | Value |
| :--- | :---: |
| Variables | 5,000 |
| Clauses | 2,061,600 |
| Satisfied | **2,061,600 / 2,061,600** |
| Satisfaction Rate | **100.00%** |
| Solve Time | ~17 minutes |
| Compute Cost | ~$2 USD |

> **Important:** Every constraint satisfied. All 100 services placed on exactly one node each. All anti-affinity pairs separated. All capacity limits respected.

## The Cost of Certainty

Let's put this in perspective. The solve ran on a cloud GPU for about 17 minutes. At current cloud rates, that's roughly **$2 in compute**.

Two dollars to verify. with mathematical certainty. that your placement satisfies every constraint. No silent anti-affinity violations. No capacity overcommits. No "it worked in staging" surprises.

Compare that to the cost of a single outage caused by a bad placement decision:
- Engineering hours debugging why two replicas ended up on the same node
- Customer-facing downtime while pods reschedule
- Post-mortems, follow-up tickets, trust erosion

A placement outage easily costs $10,000–$100,000 in direct and indirect impact. The decision to run a constraint check before deploying costs $2. That's not a tradeoff. it's table stakes for critical infrastructure.

## What This Means

The standard Kubernetes scheduler was not designed for global constraint satisfaction. It makes greedy decisions and hopes for the best. Navokoj takes the full constraint set and finds an assignment that works. or reports exactly which constraints conflict.

[Try the API →](/docs)
[View Pricing](/#pricing)

**28 December, 2025**
The Navokoj Research Team, ShunyaBar Labs
