# Quick Start

Get up and running with ShunyaBar Labs in 5 minutes.

## The Easiest Entry Point: shunyabar.lua

The [Lua module](lua-module.md) consolidates all algorithms into a single, portable module. This is the recommended starting point.

```lua
local shunyabar = require('shunyabar')

-- Initialize with prime-weighted SAT
local solver = shunyabar.baha({
    clauses = {
        {3, -5, 2},     -- (x3 OR NOT x5 OR x2)
        {-1, 4, -3},    -- (NOT x1 OR x4 OR NOT x3)
        -- ... more clauses
    },
    prime_weighted = true  -- Use prime weights (recommended)
})

-- Solve
local result = solver:solve()

if result.satisfiable then
    print("SAT!", result.assignment)
else
    print("UNSAT", result.conflict)
end
```

## Python Projects

### Navokoj (Geometric Flow SAT)

```bash
git clone https://github.com/shunyabar/navokoj.git
cd navokoj
pip install -e .

python -c "
import navokoj as nk

solver = nk.SATSolver(n_vars=50, clause_density=4.27)
result = solver.solve(adiabatic=True)
print(f'Success: {result.success}, Energy: {result.energy:.4f}')
"
```

### Multiplicative PINN

```bash
git clone https://github.com/shunyabar/multiplicative-pinn-framework.git
cd multiplicative-pinn-framework
pip install -e .

python -c "
import torch
from pinn import MultiplicativePINN

# Navier-Stokes equations
pinn = MultiplicativePINN(equations='navier-stokes', multiplicative=True)
pinn.train(iterations=10000)
print(f'Residual reduction: {pinn.residual_reduction():.2%}')
"
```

## C/C++ Projects

### BAHA

```bash
git clone https://github.com/shunyabar/baha.git
cd baha
mkdir build && cd build
cmake .. && make -j$(nproc)

# Run on a SAT instance
./baha --instance ../problems/graph50.col --prime-weighted
```

### NitroSAT

```bash
git clone https://github.com/shunyabar/NitroSAT.git
cd NitroSAT
make -j$(nproc)

# MaxSAT solving
./nitrosat instance.cnf --prime-weighted --baha-enabled
```

## Crystal (Spectral-Multiplicative)

```bash
git clone https://github.com/shunyabar/spectral-multiplicative-framework.git
cd spectral-multiplicative-framework
shards install
crystal build --release src/spectral.cr

./spectral --graph problem.graph --partition-k 8
```

## Next Steps

- [Lua Module Reference](lua-module.md) — Full API for shunyabar.lua
- [Benchmarks](benchmarks.md) — Performance comparison across algorithms
- [Project Pages](../projects/index.md) — Deep dive into each algorithm

---

## See Also

- [Navokoj API Reference](../navokoj/index.md) — full API docs and code examples
- [Glossary](../glossary.md) — terminology reference
- [The Arithmetic Manifold](../core-vision.md) — theory behind the solvers
