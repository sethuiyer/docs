---
title: "Deploying Navokoj in Private and Air-Gapped Environments"
description: "A deployment model for teams that need constraint execution close to their data, networks, and operational controls."
date: "2026-07-18"
author: "Navokoj Platform Team"
tags: [deployment, enterprise, security]
materials:
  - label: "Request private deployment"
    href: "mailto:contact@shunyabar.foo?subject=Navokoj%20private%20deployment"
  - label: "Evidence ledger"
    href: "https://huggingface.co/buckets/sethuiyer/shunyabar-evidence-v1"
---

# Deploying Navokoj in Private and Air-Gapped Environments

Some constraint workloads cannot leave the customer's network. Scheduling data, hardware designs, policies, and infrastructure topology may be too sensitive for a public service.

Navokoj supports a deployment conversation that starts with data boundaries rather than forcing every customer into the same hosting model.

## The deployment choices

Teams can evaluate hosted API execution, private networking, or an on-premise and air-gapped package depending on the workload and governance requirements. The important properties remain the same: explicit resource budgets, inspectable results, controlled credentials, and reproducible execution metadata.

Private deployments separate the solver workload from the public product surface. Credentials, logs, artifacts, and update packages can be managed inside the customer's controls. Air-gapped updates are delivered as signed, versioned packages rather than requiring a runtime phone-home path.

## What an evaluation covers

An enterprise evaluation should define the model boundary, required hardware, expected throughput, verification process, update path, and operational owner. That creates a deployment plan grounded in the customer's actual constraints instead of a generic infrastructure diagram.
