---
title: "Building a Constraint Runtime, Not Just a Solver"
description: "The product architecture behind deadline-bounded decisions: models, execution, repair, verification, and evidence."
date: "2026-07-18"
author: "ShunyaBar Labs"
tags: [company, product, architecture]
materials:
  - label: "Evidence ledger"
    href: "https://huggingface.co/buckets/sethuiyer/shunyabar-evidence-v1"
  - label: "API docs"
    href: "/docs"
---

# Building a Constraint Runtime, Not Just a Solver

A solver answers one narrow question. A runtime has to support the whole decision loop.

## The operating surface

Navokoj accepts models from applications, chooses an execution path, respects a deadline, keeps the best-known state, repairs residual conflicts where possible, verifies the returned assignment, and records what happened. Billing and deployment are part of the same product because compute is an operating cost, not an afterthought.

This architecture lets customers start with a small interactive request and grow into large weighted, finite-domain, or streaming workloads without rebuilding their integration.

## The company direction

ShunyaBar Labs is building the infrastructure for expensive decisions: workforce scheduling, logistics, configuration, verification, policy enforcement, cloud placement, and agent planning.

The mathematics matters because it creates new operating regions. The product matters because customers need those regions expressed as a reliable contract: submit constraints, receive the best verified decision available before the deadline, and understand the result afterward.
