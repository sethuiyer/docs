# Navokoj Developer Guide

## Overview

**Navokoj** is a constraint intelligence engine for finding coherent structure inside astronomically large discrete spaces. It treats Boolean satisfiability and combinatorial optimization as continuous physical systems rather than discrete search problems.

```
Actionable failures. Best-effort success.
When perfect is impossible, we return the closest possible solution with precise diagnostics.
```

## Key Value Propositions

| Capability | What It Means |
|------------|---------------|
| **Up to 1M+ variables** | Scale to million-variable industrial problems |
| **< 2 second typical response** | First results in milliseconds, not minutes |
| **100% when satisfiable** | If a solution exists, we find it |
| **Anytime algorithm** | Always return best-effort results before timeout |

## Engines

Choose the right engine for your problem type:

| Engine | Use Case | Best For |
|--------|----------|----------|
| **Nano** | Real-time APIs, massive scale (N=100k+) | Quick checks, validation |
| **Mini** | Balanced optimization | General purpose workloads |
| **Pro** | Mission-critical verification | Complex optimization, 100% accuracy |
| **Nitro** | High-performance MaxSAT | PSPACE problems |
| **QState** | N-ary state satisfaction | Scheduling, graph coloring |

## Quick Start

### 1. Get Your API Key

Sign up at [navokoj.shunyabar.foo](https://navokoj.shunyabar.foo) to get your API key.

```bash
# Your Public Beta Key (expires June 2026)
nvkj_CG3kWXy7A61WHQ8WwlNnuBdkur+akKsa7EKdsoYfj1c
```

### 2. Your First Solve

**Python:**
```python
import requests

response = requests.post(
    'https://api.navokoj.shunyabar.foo/v1/solve',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    json={
        'num_vars': 10,
        'clauses': [[1, 2, 3], [-1, 4], [2, -3, 5], [-4, -5, 6]],
        'engine': 'nano'
    }
)

result = response.json()
print(f"Satisfaction: {result['satisfaction_rate']}")
print(f"Time: {result['solve_time_seconds']}s")
```

**cURL:**
```bash
curl -X POST https://api.navokoj.shunyabar.foo/v1/solve \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"num_vars": 10, "clauses": [[1,2,3],[-1,4]], "engine": "nano"}'
```

**JavaScript:**
```javascript
const response = await fetch('https://api.navokoj.shunyabar.foo/v1/solve', {
  method: 'POST',
  headers: {'Authorization': 'Bearer YOUR_API_KEY'},
  body: JSON.stringify({
    expression: '(server_a | server_b) & (db_primary -> cache_warm)',
    engine: 'mini'
  })
});

const result = await response.json();
console.log(result.assignment);
```

## Input Formats

### CNF Format (Recommended for Complex Problems)

```python
{
    "num_vars": 168,  # 8 employees × 3 shifts × 7 days
    "clauses": [
        [1, 2, 3],      # At least one morning shift
        [-1, -2],       # Can't work both morning AND afternoon
        [-2, -3],       # Can't work both afternoon AND evening
        [-1, -3]        # Can't work morning AND evening same day
    ],
    "engine": "nano"
}
```

### Boolean Expression Format (Simpler Problems)

```python
{
    "expression": "(employee_a | employee_b) & (shift_morning -> manager_present)",
    "engine": "mini"
}
```

**Supported Operators:**

| Operator | Symbols | Example |
|----------|---------|---------|
| AND | `&`, `&&`, `AND` | `A & B` |
| OR | `\|`, `\|\|`, `OR` | `A \| B` |
| NOT | `~`, `!`, `NOT` | `~A` |
| XOR | `^`, `XOR` | `A ^ B` |
| Implication | `->`, `=>` | `A -> B` |
| Biconditional | `<->`, `<=>` | `A <-> B` |

### Q-SAT (N-ary / Multi-valued)

For problems like scheduling, Sudoku, graph coloring:

```python
{
    "num_vars": 81,           # 9×9 Sudoku cells
    "num_states": 9,          # Values 1-9
    "constraints": [
        {"vars": [1, 2], "type": "neq"},           # Cell 1 ≠ Cell 2
        {"vars": [1, 10, 19], "type": "eq"},      # Same row all different
        {"var": 5, "type": "in", "states": [1, 3, 5]}  # Pre-filled cell
    ],
    "engine": "qstate"
}
```

## Performance Benchmarks

Based on 4,199 industrial SAT instances from SAT 2024 Industrial Track:

| Engine | Satisfaction | Speed | Best Use Case |
|--------|-------------|-------|---------------|
| **Pro** | 92.57% | 7.90/sec | Mission-critical |
| **Mini** | 31.37% | 10.64/sec | Balanced |
| **Nano** | 3.24% | Ultra-fast | Real-time feedback |

### Real-World Results

| Problem | Variables | Clauses | Satisfaction | Time |
|---------|-----------|---------|--------------|------|
| 3-SAT Critical (α=4.26) | 1,000,000 | 4.26M | 92.15% | 171s |
| K8s Placement | 2M | 1.3M | 21/21 perfect | — |
| PSPACE (QBF, Sokoban) | 8.6M vars | — | 347ms median | vs 45s classical |
| 129-SAT Ultra-High-k | 200 | 1,000,000 | **100%** | 9-10 min |

## Diagnostic Intelligence: DEFEKT

Before running expensive solves, use DEFEKT to predict solvability:

```bash
curl -X POST https://api.navokoj.shunyabar.foo/v1/diagnose \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"num_vars": 1000, "clauses": [[1,2,3],[-1,4],...]}'
```

**Returns:**
```json
{
  "solvability_score": 84,
  "status": "likely_solvable",
  "recommendation": "Use pro-deepthink on H100 GPU for optimal satisfaction"
}
```

**Use DEFEKT for:**
- **Cost Control** — Avoid solver runs on likely unsatisfiable instances
- **Constraint Debugging** — Identify exactly why your problem is failing
- **Smart Routing** — Automatically select the right hardware and engine

## Real-World Examples

### Employee Scheduling

```python
import requests

def create_schedule_problem():
    clauses = []

    # 8 employees, 3 shifts per day, 7 days = 168 variables
    for emp in range(8):
        for day in range(7):
            shifts = [day*24 + emp*3 + s + 1 for s in range(3)]
            clauses.append(shifts)  # At least one shift
            clauses.append([-shifts[0], -shifts[1]])  # No double-booking
            clauses.append([-shifts[0], -shifts[2]])
            clauses.append([-shifts[1], -shifts[2]])

    return {"num_vars": 168, "clauses": clauses, "engine": "nano"}

response = requests.post(
    'https://api.navokoj.shunyabar.foo/v1/solve',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    json=create_schedule_problem()
)
print(f"Solved in {response.json()['solve_time_seconds']}s")
```

### Microservices Deployment

```bash
curl -X POST https://api.navokoj.shunyabar.foo/v1/solve \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "expression": "((gateway & (db_primary | db_replica)) -> services_ok)
                 & ((auth ^ legacy) & (auth -> cache))
                 & ((payment & fraud) <-> checkout)
                 & ((orders | maint) & ~(orders & maint))",
    "engine": "pro"
  }'
```

**Response:** 26 constraints, 100% satisfied, 1ms

### Smart Grid Power Distribution

```javascript
const response = await fetch('https://api.navokoj.shunyabar.foo/v1/solve', {
  method: 'POST',
  headers: {'Authorization': 'Bearer YOUR_API_KEY'},
  body: JSON.stringify({
    "expression": "(((solar_online | wind_online | grid_backup) & (battery_charged -> storage_available)) \
                 & ((peak_demand & ~storage_available) -> grid_import) \
                 & ((hospital_critical | datacenter_priority) -> uninterruptible) \
                 & ((grid_healthy & voltage_ok) <-> grid_stable))",
    "engine": "pro"
  })
});
// Returns: 35 variables, 38 constraints, 100% satisfied, 1ms
```

## Anytime Algorithm Behavior

Navokoj solvers are **anytime algorithms** — they continuously improve until timeout:

```python
{
    "num_vars": 1000,
    "clauses": [...],
    "engine": "nano",
    "timeout_budget_seconds": 0.5  # 500ms max
}
```

**If timeout is hit:**
```json
{
    "success": true,
    "satisfiable": false,
    "assignment": [true, false, ...],
    "satisfaction_rate": 0.985,
    "timeout_budget_hit": true
}
```

> **Key insight:** A good answer now beats a perfect answer never. For real-time applications (games, UI, schedulers), this is critical.

## Batch Solving

Solve multiple problems in one request:

```python
{
    "problems": [
        {"num_vars": 20, "clauses": [[1,2,3],[-1,4]], "engine": "nano"},
        {"num_vars": 30, "clauses": [[1,2],[-2,3,4]], "engine": "nano"},
        {"num_vars": 50, "clauses": [[1,-2,3],[4,5,-6]], "engine": "mini"}
    ]
}
```

**Response:**
```json
{
    "batch_id": "batch_789xyz",
    "total": 3,
    "successful": 3,
    "throughput": 83.5
}
```

## Pricing Tiers

| Tier | Price | Variables | Clauses | Concurrency |
|------|-------|-----------|---------|-------------|
| **Free** | $0 (until Jun 2026) | 5,000 | 35,000 | 2 |
| **L4 GPU** | $0.25 + $0.10/min | 100,000 | 300,000 | 3 |
| **H100 GPU** | $1.50 + $1.00/min | 1,000,000 | 8,000,000 | 4 |

## Common Error Responses

```json
// 401 - Missing/invalid key
{"error": "Authentication required"}

// 400 - Bad input
{"error": "Invalid clauses format"}

// 429 - Rate limited
{"error": "Rate limit exceeded", "retry_after": 60}

// 503 - Timeout
{"error": "Request timeout", "message": "Try smaller problem or different engine"}
```

## Next Steps

- [Benchmark Suite](https://github.com/shunyabar/navokoj-tests) — Run your own benchmarks
- [Arithmetic Manifold Theory](../projects/navokoj.md) — The math behind Navokoj
- [Navokoj Launch](../blog/navokoj-launch.md) — production overview and engine map

## Get Started

```bash
# Get your free API key at https://navokoj.shunyabar.foo
export NAVOKOJ_KEY="your_key_here"

# Try it now
curl -X POST https://api.navokoj.shunyabar.foo/v1/diagnose \
  -H "Authorization: Bearer $NAVOKOJ_KEY" \
  -d '{"num_vars": 100, "clauses": [[1,2,3],[-1,4]]}'
```

---

## See Also

- [Navokoj Project Page](../projects/navokoj.md) — the theory behind the API
- [Navokoj Launch](../blog/navokoj-launch.md) — product narrative and Mermaid architecture map
- [NitroSAT Project Page](../projects/nitrosat.md) — the engine inside Navokoj
- [Quick Start](../getting-started/quick-start.md) — get running in 5 minutes
- [Glossary](../glossary.md) — terminology reference
- [Pricing](../marketing/pricing.md) — tier comparison
