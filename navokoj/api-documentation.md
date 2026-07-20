---
title: "API Documentation — Navokoj Constraint Runtime"
description: "Integrate Navokoj: solve, schedule, diagnose. Model + deadline → verified assignment. Auth, billing via GitHub Sponsors, endpoints, and result semantics."
---

# API Documentation

Integrate Navokoj’s constraint runtime: send a model and a time budget, get the best verified assignment available by your deadline.

> **Base URL:** `https://api.navokoj.shunyabar.foo`

<a id="access" aria-hidden="true"></a>

## Get an API key

**Developer access via GitHub Sponsors.** Purchase **Navokoj API compute credits** through Sponsors as a developer-friendly payment rail. Sponsor ShunyaBar Labs to receive credits at **1.5× your sponsorship amount**. There is no separate card checkout on this site.

1. **Purchase credits** at [github.com/sponsors/sethuiyer](https://github.com/sponsors/sethuiyer) (one-time or recurring).
2. **Email** [contact@shunyabar.foo](mailto:contact@shunyabar.foo?subject=Navokoj%20API%20key%20claim&body=GitHub%20Sponsors%20transaction%20ID%3A%0AEmail%20for%20API%20key%20%28register%20or%20existing%29%3A%0A) with:
   - the Sponsors **transaction ID**, and
   - the **email** you used to register (or want to use) for Navokoj.
3. **Navokoj automatically provisions** an API key for **new** email IDs and loads balance at **1.5× the sponsorship amount**. Existing emails receive the same credit load against that account.

Keep keys server-side. Rotate if exposed. For product bugs or account issues, open a ticket on [Customer issues](https://github.com/shunyabarlabs/shunyabarlabs/issues).

<a id="authentication" aria-hidden="true"></a>

## Authentication

All API requests require a Bearer token in the Authorization header.

**Header Format:**

```http
Authorization: Bearer YOUR_API_KEY
```

Use the key returned after the Sponsors claim flow. Do not embed keys in public frontends.

<a id="billing" aria-hidden="true"></a>

## Billing and usage

### Plans

| Plan | Monthly | SAT solves | Q-State solves | Schedules |
| --- | ---: | ---: | ---: | ---: |
| Hobbyist | $0 | 300 | 25 | 10 |
| Mini Lab | $19 | 2,000 | 250 | 100 |
| Launch Pad | $199 | 10,000 | 1,000 | 500 |
| Lotus Fleet | $499 | 50,000 | 5,000 | 2,000 |

### Compute settlement

| Execution | Rate |
| --- | --- |
| Included CPU | $0 while the selected workload entitlement remains |
| CPU overage, up to 1,000,000 billable clauses | $0.01 base + $0.02 / compute minute |
| CPU above 1,000,000 billable clauses | $0.05 base + $0.02 / compute minute |
| L4 GPU | $0.25 base + $0.10 / compute minute |
| H100 GPU | $1.50 base + $1.00 / compute minute |

Runtime is billed **per-second** (fractional). Metering uses the server’s authoritative normalized clause count, resolved hardware, measured runtime, and active entitlement. The API response is the source of truth for the final charge.

Rate limits are enforced across the account, offering, and selected hardware. The effective ceiling is the lowest applicable value. Use `GET /v1/pricing` for the current machine-readable policy.

### Dedicated capacity

Dedicated deployments are optimized for maximum model size and throughput. They do not use shared-cloud rate limits or shared-cloud concurrency throttling; capacity is determined by the hardware provisioned for the account. Current starting points are **L4 from $500/month** and **RTX 5090 from approximately $925/month**. Air-gapped deployments start at **$500/month**. Final pricing depends on region, availability, and the provisioned hardware. Contact [contact@shunyabar.foo](mailto:contact@shunyabar.foo?subject=Navokoj%20dedicated%20capacity) for capacity and deployment requirements.

Dedicated capacity includes a private API endpoint, a private workload boundary, usage on the provisioned machine without shared-plan solve quotas, custom solver configuration, and deployment support. It is a premium single-tenant runtime; usage remains subject to the capacity and safeguards of the provisioned hardware.

> **Anytime runtime:** If a solve hits the timeout, we still return the best partial result found so far — never an empty failure. Residual violations and provenance travel with the assignment.

Sponsorship amounts are converted to API compute credit at **1.5×**; usage draws down that balance. Alpha: stable for experimentation and evaluation. Enterprise SLAs and dedicated capacity are available by arrangement.

Before production integration, use estimate or preauthorization responses when available to surface expected cost to your users.



<a id="solve" aria-hidden="true"></a>

## Solve Endpoint

The main endpoint for solving SAT problems. Supports both CNF format and boolean expressions.

### Timeout Controls (NEW!)

Control exactly how long the solver runs with the `timeout_budget_seconds` parameter. This feature gives you complete control over computation time vs. solution quality trade-offs.

**Real-time Mode**: Set a strict timeout (e.g., `0.1` for 100ms) for consistent response times in interactive applications.

**Optimization Mode**: Set longer timeouts (e.g., `10.0` for 10 seconds) to allow for deeper optimization.

**Anytime Algorithm Behavior**: Our solvers are "Anytime Algorithms" - they continuously improve the solution quality until the timeout is reached, then return the best solution found so far.

### CNF Format (Recommended)

For complex problems, use Conjunctive Normal Form (CNF) with numbered variables.

**POST /v1/solve**

```bash
curl -X POST https://api.navokoj.shunyabar.foo/v1/solve \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "num_vars": 10,
    "clauses": [
      [1, 2, 3],
      [-1, 4],
      [2, -3, 5],
      [-4, -5, 6]
    ],
    "weights": [1.0, 2.0, 0.5, 1.0],
    "engine": "nano",
    "timeout_budget_seconds": 2.0
  }'
```

> **✅ Result:** 4 constraints, 100% satisfied, 18ms

```json
{
  "success": true,
  "satisfiable": true,
  "assignment": [true, true, false, true, false, true, ...],
  "satisfaction_rate": 1.0,
  "solve_time_seconds": 0.011,
  "engine_used": "nano",
  "request_id": "abc123def456",
  "timeout_budget_hit": false
}
```

### Anytime Solving (Partial Results)

Navokoj solvers are "Anytime Algorithms". If you specify a `timeout_budget_seconds` (e.g., `0.5`), the solver will respect that deadline. If it hits the timeout before finding a perfect solution, it gracefully halts and returns the **best partial assignment** found so far, along with `timeout_budget_hit: true`.

**Example Response (Timeout Hit):**
```json
{
  "success": true,
  "satisfiable": false,
  "assignment": [true, false, ...],  // Best effort assignment
  "satisfaction_rate": 0.985,         // 98.5% of constraints satisfied
  "solve_time_seconds": 0.501,
  "timeout_budget_hit": true,
  "engine_used": "nano"
}
```

This is ideal for real-time applications (games, UI, schedulers) where a good-enough answer now is better than a perfect answer later.

### Boolean Expression Format

For simpler problems, use natural boolean syntax with named variables. The parser supports both C-style and Python-style operators.

**POST /v1/solve**

```bash
curl -X POST https://api.navokoj.shunyabar.foo/v1/solve \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "expression": "(employee_a | employee_b) & (shift_morning -> manager_present)",
    "engine": "mini"
  }'
```

#### Supported Syntax

| Operator | Symbols | Aliases |
|---|---|---|
| **AND** | `&`, `&&` | `AND`, `and` |
| **OR** | `\|`, `\|\|` | `OR`, `or` |
| **NOT** | `~`, `!` | `NOT`, `not` |
| **XOR** | `^` | `XOR`, `xor` |
| **Implication** | `->`, `=>` | `implies` |
| **Biconditional** | `<->`, `<=>` | `iff` |
| **FORALL** | `!`, `∀` | `FORALL`, `forall` |
| **EXISTS** | `?`, `∃` | `EXISTS`, `exists` |

> **🔬 Advanced: Quantified Logic (QBF)**
>
> Navokoj natively supports high-order logic verification. Nested quantifiers are automatically expanded using efficient linear-time encoding, enabling sub-second verification of complex protocols and hardware specs.

> **⚠️ Limitations:**
>
> - **No Arithmetic:** Expressions like `A + B > 5` are NOT supported. Use pure boolean logic only.



<a id="batch" aria-hidden="true"></a>

## Batch Solving

Solve multiple problems in a single request for higher throughput.

**POST /v1/solve (Batch Mode)**

```bash
curl -X POST https://api.navokoj.shunyabar.foo/v1/solve \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "problems": [
      {"num_vars": 20, "clauses": [[1,2,3], [-1,4]], "weights": [1.0, 2.0], "engine": "nano"},
      {"num_vars": 30, "clauses": [[1,2], [-2,3,4]], "engine": "nano"},
      {"num_vars": 50, "clauses": [[1,-2,3], [4,5,-6]], "engine": "mini"}
    ]
  }'
```

> **✅ Result:** 3 problems, 100% success, 36ms

```json
{
  "success": true,
  "batch_id": "batch_789xyz",
  "results": [
    {"problem_id": 0, "success": true, "satisfaction_rate": 1.0},
    {"problem_id": 1, "success": true, "satisfaction_rate": 1.0},
    {"problem_id": 2, "success": true, "satisfaction_rate": 1.0}
  ],
  "total": 3,
  "successful": 3,
  "throughput": 83.5
}
```



<a id="hybrid" aria-hidden="true"></a>

## Hybrid XOR+CNF

For cryptographic and ZK-circuit problems with parity constraints.

**POST /v1/solve (Hybrid Mode)**

```bash
curl -X POST https://api.navokoj.shunyabar.foo/v1/solve \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "num_vars": 50,
    "clauses": [[1,2,3], [-1,-2,4], [5,-6,7]],
    "xor_constraints": [
      {"vars": [1, 2, 3], "target": 0},
      {"vars": [4, 5, 6], "target": 1}
    ],
    "strategy": "auto"
  }'
```

> **✅ Result:** 5 constraints, 100% satisfied, 8ms

```json
{
  "success": true,
  "solution": {
    "assignment": [true, false, true, ...],
    "cnf_satisfaction": {"rate": 1.0},
    "xor_satisfaction": {"rate": 1.0},
    "overall_rate": 1.0
  },
  "solve_time_seconds": 0.001,
  "method": "unified"
}
```



<a id="qsat" aria-hidden="true"></a>

## Q-SAT (N-ary Satisfaction)

Our proprietary Q-SAT engine, now live via API.

**POST /v1/solve (Q-SAT)**

```bash
curl -X POST https://api.navokoj.shunyabar.foo/v1/solve \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "num_vars": 81,
    "num_states": 9,
    "constraints": [
      {"vars": [1, 2], "type": "neq"},
      {"vars": [1, 10, 19], "type": "eq"},
      {"var": 5, "type": "in", "states": [1, 3, 5]}
    ],
    "engine": "qstate"
  }'
```

#### Supported Constraints

| Type | Key | Description |
|---|---|---|
| **Inequality** | `neq` | Variables must have different states (Standard coloring). |
| **Equality** | `eq` | Variables must have the exact same state. |
| **Domain** | `in` | Variable must be one of the specified states (Pre-fills). |
| **All-Different** | `all_diff` | All variables in the list must have unique states. |

> **✅ Result:** 81 variables, 9 states, 100% satisfied

```json
{
  "success": true,
  "solution": {
    "assignment": {"1": 5, "2": 3, "3": 9, ...},
    "satisfaction_rate": 1.0,
    "conflicts": 0
  },
  "engine_used": "qstate-geometric-l4"
}
```



<a id="schedule" aria-hidden="true"></a>

## Schedule API

A specialized endpoint for automated resource and shift scheduling. It handles complex workforce constraints and returns optimized schedules in milliseconds.

**POST /v1/schedule**

```bash
curl -X POST https://api.navokoj.shunyabar.foo/v1/schedule \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "resources": ["Alice", "Bob"],
    "days": 2,
    "shifts_per_day": 2,
    "constraints": [
      {
        "type": "max_shifts_per_day",
        "params": {"max_shifts": 1},
        "priority": "critical"
      },
      {
        "type": "min_coverage",
        "params": {"min_resources": 1},
        "priority": "critical"
      }
    ],
    "engine": "pro"
  }'
```

#### Supported Schedule Constraints

| Constraint Type | Parameters | Description |
|---|---|---|
| `max_shifts_per_day` | `max_shifts` | Limits the number of shifts a resource can work in a single day. |
| `min_coverage` | `min_resources` | Ensures a minimum number of resources are assigned to each shift. |
| `max_consecutive_days` | `max_days` | Prevents resources from working too many consecutive days. |
| `min_rest_between_shifts` | `min_hours` | Ensures a minimum rest period between two shifts for a resource. |

> **✅ Result:** Optimized Schedule, 100% satisfaction

```json
{
  "success": true,
  "schedule": {
    "Alice": {"0": [0], "1": [0]},
    "Bob": {"0": [1], "1": [1]}
  },
  "satisfaction_rate": 1.0,
  "solve_time_ms": 26,
  "request_id": "sched_123456"
}
```



<a id="defekt" aria-hidden="true"></a>

## DEFEKT Diagnostics

DEFEKT is a fast diagnostic that predicts whether a SAT/CNF instance is likely solvable, borderline, or structurally unsatisfiable—before you spend time/credits running heavy solvers. 

Think of it as an **MRI scan for constraints**: it doesn't solve; it tells you what kind of problem you have and what to do next.

**POST /v1/diagnose**

```bash
curl -X POST https://api.navokoj.shunyabar.foo/v1/diagnose \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "num_vars": 1000,
    "clauses": [[1, 2, 3], [-1, 4], ...],
    "engine": "nano"
  }'
```

#### Returns
| Field | Type | Description |
|---|---|---|
| `solvability_score` | `number` | A score from 0–100 combining multiple signals into a single "how likely this is to be solvable" indicator. |
| `status` | `string` | A label: `likely_solvable`, `borderline`, `likely_unsat`, or `definitely_unsat`. |
| `recommendation` | `string` | Advice on what to try next (e.g., "Use pro engine", "Relax constraints"). |
| `alerts` | `array` | Short, actionable reasons for the specific diagnosis. |

#### Use Cases
- **Cost Control:** Avoid wasting solver runs on instances that are likely unsatisfiable.
- **Debugging:** Understand why a problem is failing to find a solution.
- **Routing:** Decide which engine (nano, mini, pro) or tier (cpu, h100) to use based on predicted difficulty.

> **ℹ️ Note:** DEFEKT is a heuristic difficulty/consistency estimator, not a SAT certificate engine. When correctness matters, the solver remains the source of truth—DEFEKT just helps you choose the right next step.


<a id="engines" aria-hidden="true"></a>

## Engines

Choose the right engine for your problem type.

### Mini — "The Truth"
**Best For:** General purpose, balanced workloads

### Pro — "The Mind"
**Best For:** Complex optimization and higher-budget workloads; result quality remains workload-dependent

### Nano — "The Flow"
**Best For:** Real-time APIs, massive scale (N=100k+)

**Fun Fact:** Nano can even handle 5-SAT, N=100 at alpha=30 and give best possible assignment within 5 seconds, on a single core of CPU.

### Nitro — "The Extreme"
**Best For:** High-performance MaxSAT approximating, massive scale

### NitroQState — "The Generalized"
**Best For:** N-ary state satisfaction & generalized Q-SAT


## Real-World Examples

### Employee Scheduling

**Python Example:**

```python
import requests

# 8 employees, 3 shifts, 7 days = 168 variables
def create_schedule_problem():
    clauses = []
    
    # Each employee works exactly one shift per day
    for emp in range(8):
        for day in range(7):
            shifts = [day*24 + emp*3 + s + 1 for s in range(3)]
            clauses.append(shifts)  # At least one shift
            # No two shifts same day
            clauses.append([-shifts[0], -shifts[1]])
            clauses.append([-shifts[0], -shifts[2]])
            clauses.append([-shifts[1], -shifts[2]])
    
    return {"num_vars": 168, "clauses": clauses, "engine": "nano"}

response = requests.post(
    "https://api.navokoj.shunyabar.foo/v1/solve",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json=create_schedule_problem()
)

result = response.json()
print(f"Solved in {result['solve_time_seconds']}s")
```

### Sudoku Engine (Q-SAT)

Solve a Sudoku puzzle by representing cells as variables and using domain constraints for pre-filled values. This example uses the CPU engine for instant results on small puzzles.

**Python Example (Sudoku):**

```python
import requests

# 4x4 Sudoku (16 variables, 4 states)
constraints = []
# ... add row/col/block neq constraints ...

# Pre-filled cells using Domain Constraints
domain_constraints = [
    {"var": 1, "type": "in", "states": [1]},   # Cell 1 = 1
    {"var": 8, "type": "in", "states": [2]},   # Cell 8 = 2
]

payload = {
    "problem_type": "qstate-geometric",
    "num_vars": 16,
    "num_states": 4,
    "constraints": constraints + domain_constraints,
    "hardware": "cpu"  # Use CPU for small puzzles
}

response = requests.post(
    "https://api.navokoj.shunyabar.foo/v1/solve",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json=payload
)

result = response.json()
print(result['solution']['assignment'])
```

### University Exam Scheduling (Q-SAT)

Schedule 500 exams for 5,000 students into 10 time slots such that no student has overlapping exams. This is a massive graph coloring problem solved in seconds.

**Python Example (Q-SAT):**

```python
import requests

# 500 courses, 10 time slots
payload = {
    "problem_type": "qstate-geometric",
    "num_vars": 500,
    "num_states": 10,
    "constraints": [
        # Conflict: Course 1 and Course 2 share students
        {"vars": [1, 2], "type": "neq"},
        # ... thousands of other conflict pairs
    ],
    "hardware": "l4"
}

response = requests.post(
    "https://api.navokoj.shunyabar.foo/v1/solve",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json=payload
)

result = response.json()
print(f"Solved 500-course schedule in {result['solution']['solve_time_seconds']}s")
```

### Resource Allocation

**JavaScript Example:**

```js
const response = await fetch('https://api.navokoj.shunyabar.foo/v1/solve', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    expression: '(server_a | server_b) & (db_primary -> cache_warm)',
    engine: 'mini'
  })
});

const result = await response.json();
console.log(`Assignment: ${JSON.stringify(result.assignment)}`);
// Output: {"server_a": 1, "server_b": 0, "db_primary": 1, "cache_warm": 1}
```

### Microservices Deployment Orchestrator

A fintech startup validates 26 deployment constraints in 39ms instead of 45 minutes of manual runbook checking.

**Complex Boolean Expression (All Operators):**

```bash
curl -X POST https://api.navokoj.shunyabar.foo/v1/solve \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
  "expression": "
    ((gateway & (db_primary | db_replica)) -> services_ok)
    & ((auth ^ legacy) & (auth -> cache))
    & ((payment & fraud) <-> checkout)
    & ((checkout & inventory) -> orders)
    & ((orders | maint) & ~(orders & maint))
    & ((lb & ssl) -> routing)
    & ((routing & health) <-> live)
    & (live -> (monitor & alerts))
    & ((canary ^ rollback) & ~(canary & rollback))
    & ((flags & experiments) | static_config)",
  "engine": "pro"
}'
```

**What this validates:**

| Constraint | Operator | Business Rule |
|---|---|---|
| `auth ^ legacy` | XOR | Either new auth OR legacy, never both |
| `auth -> cache` | Implication | If new auth, cache must be warm |
| `payment & fraud <-> checkout` | Biconditional | Checkout ON iff payment+fraud ready |
| `orders | maint & ~(orders & maint)` | XOR pattern | Orders OR maintenance, never both |
| `routing & health <-> live` | Biconditional | System live iff routing+health OK |

> **✅ Result:** 26 constraints, 100% satisfied, 1ms

```json
{
  "success": true,
  "assignment": {
    "auth": 1, "legacy": 0, "cache": 1,
    "payment": 1, "fraud": 1, "checkout": 1,
    "orders": 1, "maint": 0,
    "canary": 0, "rollback": 1,
    "static_config": 1
  },
  "satisfaction_rate": 1.0,
  "solve_time_seconds": 0.001
}
```

### Smart Grid Power Distribution

A utility company optimizes power routing across solar, wind, battery, and grid sources while maintaining hospital/datacenter priority and carbon limits. **35 variables, 38 constraints, solved in 1ms.**

**Complex Energy Grid Logic:**

```js
// Power Sources & Storage
((solar_online | wind_online | grid_backup) & (battery_charged -> storage_available))

// Peak Demand Management
& ((peak_demand & ~storage_available) -> grid_import)
& ((solar_online & wind_online) <-> renewable_surplus)
& ((renewable_surplus ^ grid_import) | emergency_mode)

// Load Balancing
& ((factory_a_demand | factory_b_demand | residential_load) -> power_needed)
& ((power_needed & ~renewable_surplus) -> fossil_backup)
& ((fossil_backup & carbon_limit) -> offset_required)

// Critical Infrastructure Priority
& ((hospital_critical | datacenter_priority) -> uninterruptible)
& ((uninterruptible & ~battery_charged) -> generator_start)
& ((generator_start ^ grid_stable) & (grid_stable -> generator_standby))

// EV Demand Response
& ((ev_charging_active & peak_demand) -> ev_throttle)
& ((ev_throttle <-> demand_response_active) & (demand_response_active -> customer_notify))

// Grid Health & Islanding
& ((frequency_stable & voltage_ok) <-> grid_healthy)
& ((grid_healthy -> ~emergency_mode) & (~grid_healthy -> island_mode))
& ((island_mode & battery_charged) -> microgrid_active)
& ((microgrid_active | grid_healthy) & ~(microgrid_active & grid_import))

// Maintenance Scheduling
& ((maintenance_window & ~critical_load) -> scheduled_outage)
& ((scheduled_outage -> customer_notify) & (scheduled_outage -> backup_routing))
```

**POST /v1/solve (Complex Logic):**

```bash
curl -X POST https://api.navokoj.shunyabar.foo/v1/solve \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "expression": "(((A ^ B) -> (C & D & (E | F))) & ((G <-> H) & (~I | J) & ((K & L & M & N) -> (O ^ P ^ Q)))) & ((R & S & T & U & V) -> (W & X & Y & Z)) & ((admin & root) -> ~(guest | locked_out)) & ((cluster_a & cluster_b & cluster_c) -> ((node1 | node2 | node3) & (replica1 & replica2))) & ((((alpha | beta | gamma) & ~(delta & epsilon)) <-> (omega ^ sigma)) & ((pi & rho & tau & chi) -> (~theta | phi)))",
    "engine": "pro"
  }'
```

> **✅ Result:** 62 constraints, 100% satisfied, 91ms

```json
{
  "success": true,
  "solution": {
    "satisfaction_rate": 1.0,
    "solve_time_seconds": 0.091,
    "satisfied_constraints": 62,
    "assignment": {
      "A": 0, "B": 1, "C": 1, "D": 1, "E": 1, "F": 1,
      "admin": 0, "root": 0, "guest": 0, "locked_out": 0
    }
  }
}
```

> **ℹ️ Note:** Demonstrates handling of deeply nested logic, mixed operators (XOR, IFF, IMPLIES), and semantic variable names.

## Cookbook Examples

### 1. Logistics Route Optimization (TSP)

Encode a Traveling Salesman Problem for 5 cities to find the optimal route under 500km.

**Python (TSP Encoding):**

```python
import requests

# 5 cities, 5 positions = 25 variables
# x_i_j means city i is at position j
payload = {
    "num_vars": 25,
    "clauses": [
        # Each city must be visited exactly once
        [1, 2, 3, 4, 5], 
        [-1, -2], [-1, -3], [-1, -4], [-1, -5],
        # ... (full encoding omitted for brevity)
    ],
    "engine": "pro"
}

response = requests.post(
    "https://api.navokoj.shunyabar.foo/v1/solve",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json=payload
)
```

> **✅ Result:** 25 variables, 50 constraints, 100% satisfied, 31ms

```json
{
  "success": true,
  "assignment": [1, 0, 0, 0, 0, ...],
  "satisfaction_rate": 1.0,
  "solve_time_seconds": 0.031
}
```

### 2. Protein Folding Stability

Validate if a protein configuration satisfies steric constraints.

**cURL:**

```bash
curl -X POST https://api.navokoj.shunyabar.foo/v1/solve \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
  "expression": "(residue_1_alpha & residue_2_beta) -> ~clash_1_2",
  "engine": "zeta"
}'
```

> **✅ Result:** 1 expression, 100% satisfied, 1ms

```json
{
  "success": true,
  "assignment": {"residue_1_alpha": 1, "residue_2_beta": 0, ...},
  "satisfaction_rate": 1.0,
  "solve_time_seconds": 0.001
}
```

### 3. Financial Portfolio Rebalancing

Select assets to minimize risk while maintaining sector diversity.

**Node.js:**

```js
const axios = require('axios');

const constraints = [
    [1, 2, 3], // At least one tech stock
    [-1, -4],  // Not both Apple and Microsoft (example)
    [5, 6]     // At least one bond
];

await axios.post('https://api.navokoj.shunyabar.foo/v1/solve', {
    num_vars: 100,
    clauses: constraints,
    engine: "mini"
}, {
    headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
});
```

> **✅ Result:** 100 variables, 3 constraints, 100% satisfied, 3ms

```json
{
  "success": true,
  "assignment": [1, 0, 0, 1, ...],
  "satisfaction_rate": 1.0,
  "solve_time_seconds": 0.003
}
```

## Why This Matters

One unified API handles what others need multiple tools for.

### Constraint Categories

| Category | Constraints | Logic Used |
|---|---|---|
| Power Sources | Renewable priority, battery fallback | `->` `<->` |
| Load Balancing | Factory, residential, carbon limits | `&` `\|` `->` |
| Critical Infrastructure | Hospital/datacenter uninterruptible | `^` `->` |
| Demand Response | EV throttling, customer notification | `<->` `&` |
| Grid Islanding | Microgrid activation, emergency mode | `~` `^` `<->` |

> **✅ Result:** 35 variables, 38 constraints, 1ms

```json
{
  "solar_online": 1, "wind_online": 1, "renewable_surplus": 1,
  "battery_charged": 0, "storage_available": 1,
  "grid_healthy": 0, "island_mode": 1, "microgrid_active": 1,
  "hospital_critical": 0, "uninterruptible": 1,
  "generator_start": 1, "generator_standby": 1,
  "ev_throttle": 1, "demand_response_active": 1,
  "customer_notify": 1,
  "satisfaction_rate": 1.0, "solve_time": "1ms"
}
```

> **💡 Real Impact:** Traditional SCADA systems take 5-10 seconds to recompute optimal power routing. Navokoj delivers the same decision in 1ms, enabling real-time grid balancing during renewable fluctuations.

### What The Engine Decided (Analysis)

The solution mirrors **exactly** how California ISO, ERCOT Texas, and Tesla Megapack systems handle grid emergencies:

| System State | Decision | Real-World Equivalent |
|---|---|---|
| **Power Sources** | solar=1, wind=1, fossil_backup=1 | Renewables primary + fossil stabilization |
| **Grid Health** | grid_healthy=0, island_mode=1 | Fault detected, microgrid takeover |
| **Critical Load** | uninterruptible=1, generator_start=1 | Hospital/datacenter protection mode |
| **Demand Response** | ev_throttle=1, customer_notify=1 | Shed non-critical, notify customers |
| **Carbon Compliance** | carbon_limit=0, offset_required=1 | Fossil triggered offsets automatically |

> **🚨 Emergency Response Sequence (Solved in 1ms)**
>
> Grid unstable → Switch to backup + microgrid → Shed non-critical load → Protect hospitals/datacenters → Notify customers → Throttle EV charging → Maintain renewable > fossil but allow temporary fossil → Trigger carbon offsets
>
> **Same logic used by:** California ISO, ERCOT Texas, India Smart Grid Mission, Tesla Megapack, Schneider EcoStruxure

### Cryptographic Constraint Cascade

Multi-way XOR chains with biconditional feedback loops - the kind of constraints found in **zero-knowledge proofs and hash function verification**. 24 variables, 347 clauses, 99.44% satisfaction.

**ZK-Style Constraint System:**

```js
// 4-way XOR chains with biconditional outputs
((a ^ b ^ c ^ d) <-> e) & ((f ^ g ^ h ^ i) <-> j)

// Cross-product implications
& ((a & f) -> (k ^ l)) & ((b & g) -> (m ^ n))
& ((c & h) -> (o ^ p)) & ((d & i) -> (q ^ r))

// Aggregation with biconditionals
& ((k | m | o | q) <-> x) & ((l | n | p | r) <-> y)
& ((x & y) <-> z) & ((~x & ~y) -> z)

// Feedback constraints
& (z -> (s & t & u & v))
& (s <-> (a | d | g)) & (t <-> (b | e | h))
& (u <-> (c | f | i)) & (v <-> (j | k | l))

// Mutual exclusion patterns
& ((x & ~y) -> ~(s & t)) & ((y & ~x) -> ~(u & v))
& ((s ^ t ^ u ^ v) -> ~(x & y))

// Negation loop (circular dependency!)
& (a <-> ~s) & (b <-> ~t) & (c <-> ~u) & (d <-> ~v)
```

> **✅ Result:** 24 vars, 347 clauses, 99.44% satisfied, 0.82s

```js
// Circular negation constraints resolved:
a=0, s=1 (a <-> ~s ✓)   b=0, t=1 (b <-> ~t ✓)
c=1, u=0 (c <-> ~u ✓)   d=1, v=0 (d <-> ~v ✓)
```

### 5-Way XOR Explosion

The ultimate stress-inducer: **5-way XOR chains** that explode into 7,902 CNF clauses. This is what ZK-SNARK circuit engines face. **100% satisfaction in 4.2 seconds.**

**Circuit Verification Pattern:**

```js
// Three parallel 5-way XOR channels
((a ^ b ^ c ^ d ^ e) <-> p)
& ((f ^ g ^ h ^ i ^ j) <-> q)
& ((k ^ l ^ m ^ n ^ o) <-> r)

// XOR cascade output
& ((p ^ q ^ r) <-> z)

// Cross-channel OR aggregation
& ((a | f | k) <-> t) & ((b | g | l) <-> u)
& ((c | h | m) <-> v) & ((d | i | n) <-> w)
& ((e | j | o) <-> x)

// At-most-one constraint + implication chain
& (~t | ~u | ~v | ~w | ~x)
& ((t & u & v & w & x) -> y)
& (y <-> z)
```

> **✅ Result:** 25 vars, 7,902 clauses, 100% satisfied, 4.2s

```js
// XOR chain verification:
a^b^c^d^e = 0^0^1^1^1 = 1 = p ✓
f^g^h^i^j = 0^1^1^0^0 = 0 = q ✓
k^l^m^n^o = 0^1^0^1^0 = 0 = r ✓
p^q^r = 1^0^0 = 1 = z ✓
y <-> z = 1 <-> 1 ✓
```

> **ℹ️ Why This Matters:** 5-way XOR creates 2^5 = 32 possible states per chain. Three chains = 32,768 combinations. Traditional SAT engines choke on XOR because it doesn't decompose cleanly to CNF. Navokoj's continuous relaxation handles XOR natively.

### 64-Way XOR Hell (H100 GPU)

Pure XOR constraints are **poison for classical CDCL engines**—they destroy learned-clause heuristics and cause exponential CNF blow-ups. Most SAT engines either special-case XORs with Gaussian elimination or choke badly.

We tested **64-way XOR chains × 16 parallel channels** on an NVIDIA H100. The solution space has cardinality **2^1024**—a number with 309 digits.

| Configuration | Solution Space | Variables | Clauses | Satisfaction | CUDA Time |
|---|---|---|---|---|---|
| 16-way × 4 chains | 2^64 | 133 | 286 | 100% | 0.93s |
| 32-way × 8 chains | 2^256 | 521 | 1,132 | 100% | 1.35s |
| **64-way × 16 chains** | **2^1024** | **2,065** | **4,504** | **100%** | **1.44s** |

> **ℹ️ What This Means:** Navokoj solved XOR systems whose *solution space* has size 2^1024 in ~1.4 seconds, **without explicit Gaussian elimination**. The engine isn't enumerating states—it's finding one valid assignment in an astronomically large affine space via continuous optimization.
>
> The energy landscape for XOR is flat but constrained. Once gradients align, convergence is fast. Size of solution space ≠ difficulty of finding *a* solution.
>
> [Download Proof JSON](https://navokoj.shunyabar.foo/proofs/xor_64x16_h100_20251227_193518.json)

### Mixed Regime Stress Tests

We fused both cascades plus 13 new bridge constraints to create a single **8,302-clause** hybrid monster. The unified hybrid engine still delivered **0.999 satisfaction in 4.04s**, proving Navokoj can keep XOR-native speed even when CNF explodes.

**Hybrid Mega Expression:**

```bash
# Two XOR cascades + bridge system (abridged for readability)
curl -X POST https://api.navokoj.shunyabar.foo/v1/solve \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
        "engine": "hybrid",
        "expression": "((a^b^c^d)<->e) & ... & ((bridge1^bridge2^bridge3)<->mega_sync)
                       & ((~mega_sync)->(~bridge1 | ~bridge2 | ~bridge3))"
      }'
```

> **✅ Result:** 8,302 clauses, 0.999 satisfaction, 4.04s (engine = hybrid)

```json
{
  "request_id": "92edeb9d1596431d",
  "satisfaction_rate": 0.9990,
  "engine_used": "hybrid",
  "solve_time_seconds": 4.04
}
```

We also pushed a batch of mixed CNF+XOR problems through `/v1/solve` with `engine: auto`. The selector routed jobs to the best engine and reported fine-grained satisfaction:

| Problem | Vars / CNF / XOR | Engine (auto result) | Satisfaction | Solve Time |
|---|---|---|---|---|
| **hybrid_lockdown_bridge** | 12 / 13 / 3 | hybrid (unified) | 0.875 | 37 ms |
| **xor_matrix_chain** | 16 / 10 / 4 | mini | 1.0 | 92 ms |
| **parity_guard_ring** | 8 / 8 / 2 | hybrid | 0.8 | 14 ms |

> **Tuning Tip:** Longer budgets can improve an anytime result, but no heuristic setting guarantees a perfect or optimal solution. Check `solved`, `feasible`, and verification fields in the response.


## Rate Limits

| Plan | Requests / hour | Account concurrency | Requests / 30 sec |
|---|---:|---:|---:|
| Hobbyist | 120 | 1 | 5 |
| Mini Lab | 1,000 | 3 | 15 |
| Launch Pad | 10,000 | 10 | 40 |
| Lotus Fleet | 50,000 | 25 | 80 |

Account concurrency spans hardware pools. Each pool also applies a ceiling: CPU allows 60 requests per 30 seconds and 8 concurrent requests; L4 allows 6 and 3; H100 allows 3 and 2. Batch requests consume one batch unit plus one account, hardware, hourly, and solver-offering unit per submitted model. Per-offering limits are returned by `GET /v1/pricing`; admission requires capacity in every applicable dimension.


## Error Handling

**Common Error Responses:**

```json
// 401 Unauthorized
{"error": "Authentication required"}

// 400 Bad Request
{"error": "Invalid clauses format"}

// 429 Too Many Requests
{"error": "Rate limit exceeded", "retry_after": 60}

// 503 Timeout
{"error": "Request timeout", "message": "Try smaller problem or different engine"}
```

> **⚠️ Tip:** For large problems (>50K clauses), use the `nano` engine and allow for longer timeouts.


## Benchmarks

A comprehensive test suite with real-world SAT problem benchmarks is available on Codeberg.

**Test Suite Repository:**

```bash
git clone https://github.com/shunyabar/navokoj-tests.git
cd navokoj-rest-tests
pip install -r requirements.txt
python main.py
```

The test suite includes:

| Category | Tests | Description |
|---|---|---|
| UNSAT Core Analysis | Gradient dynamics | Impossible constraint detection |
| Hub-Tension Collapse | Star topology | Gravity well phenomena |
| Chain Propagation | 5-variable chain | Cascade symmetry breaking |
| Dual-Hub Competition | 7-variable tug-of-war | Gradient centrality tests |



## Advanced Usage Patterns

### Constraint Weighting: Soft vs Hard Constraints

Real-world problems often have preferences rather than absolute requirements. Use constraint weights to express soft constraints that can be violated if necessary.

**Weighted Constraint Optimization:**

```bash
curl -X POST https://api.navokoj.shunyabar.foo/v1/solve \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "num_vars": 20,
    "clauses": [
      [1, 2, 3],      // Hard constraint: must satisfy
      [4, 5, 6],      // Hard constraint: must satisfy  
      [7, 8, 9],      // Soft constraint: prefer to satisfy
      [10, 11, 12],   // Soft constraint: prefer to satisfy
      [13, 14, 15]    // Soft constraint: prefer to satisfy
    ],
    "weights": [1000, 1000, 100, 50, 10],
    "engine": "pro",
    "min_satisfaction": 0.95
  }'
```

> **✅ Result:** Weighted optimization, 98% satisfaction, 12ms

```json
{
  "success": true,
  "satisfiable": true,
  "assignment": [true, false, true, ...],
  "satisfaction_rate": 0.98,
  "weighted_satisfaction": 0.996,
  "constraint_breakdown": {
    "hard_constraints": {"satisfied": 2, "total": 2, "rate": 1.0},
    "soft_constraints": {"satisfied": 2, "total": 3, "rate": 0.67}
  },
  "solve_time_seconds": 0.012
}
```

> **⚠️ Note:** Weights express preference strength. Hard-feasibility takes priority over soft-cost improvement; weighted results are heuristic unless an independent exact optimizer proves optimality.

#### Production Example: Cloud Resource Allocation

A cloud provider allocates VMs across data centers with varying priority levels:

**Multi-Tier Constraint System:**

```python
import requests

# VM allocation with priority weights
def allocate_cloud_resources():
    clauses = [
        [1, 2, 3, 4],           # US-East: must have capacity (weight: 1000)
        [5, 6, 7, 8],           # US-West: must have capacity (weight: 1000)  
        [9, 10, 11, 12],        # EU-Central: must have capacity (weight: 1000)
        [13, 14, 15, 16],       # Backup zone: prefer availability (weight: 500)
        [17, 18, 19, 20],       # Premium tier: high priority (weight: 200)
        [21, 22, 23, 24],       # Standard tier: normal priority (weight: 100)
        [25, 26, 27, 28],       # Budget tier: low priority (weight: 50)
        [29, 30, 31, 32]        # Development: minimal priority (weight: 10)
    ]
    
    weights = [1000, 1000, 1000, 500, 200, 100, 50, 10]
    
    return {
        "num_vars": 32,
        "clauses": clauses,
        "weights": weights,
        "engine": "pro",
        "min_weighted_satisfaction": 0.95
    }

response = requests.post(
    "https://api.navokoj.shunyabar.foo/v1/solve",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json=allocate_cloud_resources()
)

result = response.json()
print(f"Weighted satisfaction: {result['weighted_satisfaction']}")
print(f"Hard constraints met: {result['constraint_breakdown']['hard_constraints']['rate']}")
```

### Problem Decomposition: Breaking Down Complex Constraints

For very large problems, decompose into smaller sub-problems and combine solutions strategically.

**Hierarchical Problem Solving:**

```python
import requests

class HierarchicalEngine:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.navokoj.shunyabar.foo/v1/solve"
    
    def solve_large_problem(self, master_constraints, subproblems):
        """Solve large problem by decomposing into manageable subproblems"""
        
        # Step 1: Solve subproblems independently
        subproblem_solutions = []
        for i, subproblem in enumerate(subproblems):
            result = self.solve_subproblem(subproblem, i)
            if not result["success"]:
                return {"success": False, "error": f"Subproblem {i} failed"}
            subproblem_solutions.append(result)
        
        # Step 2: Check master constraints with subproblem solutions
        combined_assignment = self.combine_solutions(subproblem_solutions)
        master_check = self.verify_master_constraints(master_constraints, combined_assignment)
        
        if master_check["valid"]:
            return {
                "success": True,
                "assignment": combined_assignment,
                "satisfaction_rate": master_check["satisfaction_rate"],
                "subproblem_count": len(subproblems)
            }
        
        # Step 3: If master constraints violated, resolve with tighter coupling
        return self.resolve_with_coupling(master_constraints, subproblems, subproblem_solutions)
    
    def solve_subproblem(self, subproblem, index):
        """Solve individual subproblem"""
        response = requests.post(
            self.base_url,
            headers={"Authorization": f"Bearer {self.api_key}"},
            json={
                "num_vars": subproblem["num_vars"],
                "clauses": subproblem["clauses"],
                "engine": "mini",  # Fast for subproblems
                "max_steps": 2000
            }
        )
        return response.json()

# Usage example
engine = HierarchicalEngine("YOUR_API_KEY")

# Large scheduling problem decomposed by department
master_constraints = [
    [1, 2, 3],     # Global resource constraint
    [-1, 4],      # Cross-department dependency
    [5, 6, -7]   # Priority constraint
]

subproblems = [
    {"num_vars": 10, "clauses": [[1, 2], [-1, 3], [4, 5]]},  # Engineering dept
    {"num_vars": 8, "clauses": [[6, 7], [-6, 8]]},           # Sales dept
    {"num_vars": 12, "clauses": [[9, 10], [11, 12]]}     # Operations dept
]

result = engine.solve_large_problem(master_constraints, subproblems)
print(f"Hierarchical solution: {result['satisfaction_rate']} satisfaction")
```

### Solution Verification: Client-Side Validation

Always verify solutions, especially for critical applications.

**Client-Side Solution Verification:**

```python
def verify_solution(num_vars, clauses, assignment):
    """Verify that an assignment satisfies all clauses"""
    satisfied_clauses = 0
    violated_clauses = []
    
    for i, clause in enumerate(clauses):
        clause_satisfied = False
        
        for literal in clause:
            var_idx = abs(literal) - 1
            if var_idx < len(assignment):
                literal_value = assignment[var_idx] if literal > 0 else not assignment[var_idx]
                if literal_value:
                    clause_satisfied = True
                    break
        
        if clause_satisfied:
            satisfied_clauses += 1
        else:
            violated_clauses.append({
                "clause_index": i,
                "clause": clause
            })
    
    return {
        "valid": satisfied_clauses == len(clauses),
        "satisfaction_rate": satisfied_clauses / len(clauses) if clauses else 0,
        "satisfied_clauses": satisfied_clauses,
        "total_clauses": len(clauses),
        "violated_clauses": violated_clauses
    }

# Usage
num_vars = 8
clauses = [
    [1, 2, -3],
    [-1, 4],
    [3, -4, 5],
    [-2, -5]
]

# Get solution from API
response = requests.post(
    "https://api.navokoj.shunyabar.foo/v1/solve",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={"num_vars": num_vars, "clauses": clauses, "engine": "mini"}
)

result = response.json()
assignment = result["assignment"]

# Verify the solution
verification = verify_solution(num_vars, clauses, assignment)
print(f"Solution valid: {verification['valid']}")
print(f"Satisfaction rate: {verification['satisfaction_rate']}")
```

> **ℹ️ Verification Best Practices:**
>
> - **Always verify critical solutions** - especially in financial, medical, or safety-critical applications
> - **Implement client-side validation** for critical workflows and retain the returned verification metadata
> - **Log verification results** for audit trails and compliance reporting
> - **Implement business logic validation** in addition to SAT verification
> - **Set verification timeouts** for real-time applications
