# Lua Module: shunyabar.lua

The unified Lua module consolidating BAHA, Navokoj, Multiplicative PINN, Casimir SAT, and Spectral methods into a single portable file.

## Installation

```bash
# Just copy the file
curl -O https://raw.githubusercontent.com/shunyabar/shunyabar.lua/main/src/shunyabar.lua

# Or install via LuaRocks (when published)
luarocks install shunyabar
```

## Basic Usage

```lua
local shunyabar = require('shunyabar')

-- BAHA: Branch-Aware Holonomy Annealing
local solver = shunyabar.baha{
    clauses = {
        {3, -5, 2},
        {-1, 4, -3},
        {1, 2, -4}
    },
    prime_weighted = true,
    beta_max = 100,
    fracture_threshold = 0.7
}

local result = solver:solve()
```

## Modules

### shunyabar.baha

Branch-Aware Holonomy Annealing for optimization.

```lua
shunyabar.baha{
    clauses = {...},        -- CNF clauses
    prime_weighted = true, -- Use prime weights (default: true)
    beta_max = 100,        -- Maximum inverse temperature
    fracture_threshold = 0.7,  -- ρ threshold for fracture detection
    max_iterations = 5000,
    lambert_w_branches = {'W0', 'W-1'}  -- Which branches to enumerate
}
```

### shunyabar.navokoj

Prime-weighted geometric flow solver.

```lua
shunyabar.navokoj{
    n_vars = 100,
    clauses = {...},
    adiabatic = true,       -- Use adiabatic quench schedule
    cooling_rate = 0.01,
    prime_weighted = true
}
```

### shunyabar.pinn

Multiplicative constraint enforcement for neural networks (Lua approximation of PyTorch version).

```lua
shunyabar.pinn{
    constraints = {
        {type = 'poisson', p = 2},      -- Poisson equation, prime 2
        {type = 'dirichlet', p = 3},   -- Boundary condition, prime 3
    },
    multiplicative = true
}
```

### shunyabar.casimir

Langevin dynamics SAT solver.

```lua
shunyabar.casimir{
    clauses = {...},
    temperature = 0.5,
    damping = 0.1,
    noise_scale = 0.1
}
```

### shunyabar.zetagrok

Spectral entropy and multiplicative analysis.

```lua
local entropy = shunyabar.zetagrok.spectral_entropy(graph)
local twist = shunyabar.zetagrok.multiplicative_twist(partition)
```

## Utility Functions

### shunyabar.math

```lua
-- Lambert W function
local w = shunyabar.math.lambert_w(z, branch)

-- Prime generation
local primes = shunyabar.math.primes(100)

-- Prime weight
local weight = shunyabar.math.prime_weight(p)

-- Partition function derivative
local rho = shunyabar.math.log_z_derivative(beta, energies)
```

### shunyabar.softmax

```lua
local probs = shunyabar.softmax(logits)  -- Numerically stable softmax
```

## Architecture

The module is organized as:

```
shunyabar.lua
├── shunyabar.math        -- Shared math (Lambert W, primes, softmax)
├── shunyabar.baha        -- Branch-Aware Holonomy Annealing
├── shunyabar.navokoj     -- Prime-weighted geometric flow
├── shunyabar.pinn        -- Multiplicative constraint enforcement
├── shunyabar.casimir     -- Langevin SAT solver
└── shunyabar.zetagrok    -- Spectral entropy utilities
```

## Benchmarking

```lua
local bench = shunyabar.benchmark{
    algorithm = 'baha',
    instances = shunyabar.load_instances('test/cnf/'),
    trials = 10
}

print(bench.summary)
-- { time = 0.234, success_rate = 0.84, iterations = 2341 }
```

## File Location

- Source: `shunyabar.lua/src/shunyabar.lua`
- AGENTS.md: `shunyabar.lua/AGENTS.md`
- BENCHMARKS.md: `shunyabar.lua/BENCHMARKS.md`

---

## See Also

- [Quick Start](quick-start.md) — get running in 5 minutes
- [Benchmarks](benchmarks.md) — performance comparison across algorithms
- [All Projects](../projects/index.md) — deep dives into each algorithm
- [Navokoj API](../navokoj/index.md) — HTTP API for production use
