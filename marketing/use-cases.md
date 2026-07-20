# Use Cases & Target Customers

## Who Navokoj Is For

Navokoj solves **discrete commitment allocation under hard constraints** — where partial decisions must be preserved, and the cost of mistakes is high.

> **A note on our "Example Result" callouts:** Until we have published case studies with named customers, every result on this page is a *modeled outcome* from internal benchmarks, not a customer testimonial. We've written them this way intentionally: we don't want to claim a Fortune 500 customer quote that we don't have. When we ship our first paid pilot (target Q3 2026), we'll update this page with the real numbers and the real attribution.

---

## Primary Verticals

### 1. Logistics & Transportation

**Problems Solved:**
- Vehicle routing with time windows
- Warehouse bin packing
- Fleet assignment
- Delivery slot optimization

**Decision Variables:**
- Each vehicle chooses one of a few legal routes
- Each package chooses one of a few eligible delivery windows

**Why It Fits:**
- Small legal choice set per decision
- Locked relationships matter (existing routes, driver preferences)
- Local repair needed when disruptions occur

**Why They Pay:**
- Fuel costs are directly measurable
- Customer SLA improvements are trackable
- Driver hours affect compliance

**Example Result:**

> *Modeled outcome on a 5,000-vehicle routing benchmark: 45-second baseline optimization reduced to 347ms with Navokoj's [`pro` engine](../glossary.md#engines-the-spectrum), enabling real-time re-routing during disruption events rather than nightly batch runs.*

---

### 2. Healthcare Workforce Scheduling

**Problems Solved:**
- Nurse rostering with skill mix requirements
- Doctor shift scheduling with legal constraints
- Operating room allocation
- Equipment booking

**Decision Variables:**
- Each nurse/doctor chooses shifts from a legal set
- Each patient procedure chooses an OR slot

**Why It Fits:**
- Small legal shift set per person (5-7 days)
- Contractual constraints are hard (rest periods, max hours)
- Fairness constraints require explainable outputs

**Why They Pay:**
- Agency nurse costs are $100-200/hr
- Compliance violations carry legal risk
- Staff retention correlates with scheduling fairness

**Example Result:**

> *Modeled outcome on a 200-nurse, 14-day roster benchmark: 40% reduction in unscheduled shift swaps (a proxy for agency-nurse dependency) at solver runtime under 5 seconds per repair. Internal simulation; production customer data pending.*

---

### 3. Cloud Infrastructure & DevOps

**Problems Solved:**
- VM placement across physical hosts
- Container orchestration with affinity rules
- Network path optimization
- GPU cluster scheduling

**Decision Variables:**
- Each VM chooses one of a few eligible hosts
- Each container chooses one of a few legal pods

**Why It Fits:**
- Co-location, anti-affinity, and resource constraints
- Hardware heterogeneity matters
- Live migration constraints must be respected

**Why They Pay:**
- GPU idle time is pure cost ($3-4/hr per H100)
- 30% higher density = millions in savings
- Cloud margin improvement is C-suite visible

**Example Result:**

> *Modeled outcome on a 15,000-VM placement benchmark (Spectral-Multiplicative framework + Navokoj [`pro` engine](../glossary.md#engines-the-spectrum)): 100% of affinity, anti-affinity, and resource constraints satisfied in 10.8 seconds. Projected savings: ~$1.4M/year for a mid-size cloud operator at industry-typical GPU idle-cost ratios.*

---

### 4. Financial Services

**Problems Solved:**
- Portfolio rebalancing with constraints
- Trade execution sequencing
- Credit limit allocation
- Insurance underwriting rules

**Decision Variables:**
- Each asset chooses rebalancing targets
- Each trade chooses execution timing

**Why It Fits:**
- Regulatory constraints are hard
- Risk limits must be strictly enforced
- Explainability required for audits

**Why They Pay:**
- Regulatory fines are massive
- Best-execution is legally mandated
- Risk management is existential

---

### 5. Telecom & Spectrum

**Problems Solved:**
- Spectrum auction optimization
- Network frequency allocation
- Cell tower placement
- Signal interference constraints

**Decision Variables:**
- Each bidder chooses one of a few legal packages
- Each frequency chooses one of a few channels

**Why It Fits:**
- Billions of dollars in play
- Interference constraints are physical
- Synergies between adjacent bands matter

**Why They Pay:**
- Revenue optimization is directly measurable
- Regulatory constraints are non-negotiable
- Speed enables dynamic pricing

**Example Result:**

> *Modeled outcome on a synthetic FCC-style spectrum auction benchmark: $2.4B revenue achieved vs $1.18B greedy baseline (102% improvement) in 1.657ms solver runtime. The benchmark is synthetic; production auction performance depends on regulatory structure and bidder dynamics specific to each market.*

---

### 6. Manufacturing & Supply Chain

**Problems Solved:**
- Production scheduling with changeover costs
- Inventory allocation across warehouses
- Order promising with ATP/CTP
- Supplier selection with constraints

**Decision Variables:**
- Each order chooses one of a few fulfillment sources
- Each production run chooses one of a few schedules

**Why It Fits:**
- Capacity constraints are hard
- Customer commitments are already locked
- Local repair needed for disruptions

**Why They Pay:**
- Working capital tied up in inventory
- Expediting costs are massive
- Fill rate directly affects revenue

---

## Problem Categories

Beyond specific verticals, Navokoj excels at:

| Category | Examples |
|----------|----------|
| **Assignment Problems** | Task-worker, asset-location, resource-time |
| **Scheduling** | Shifts, production runs, maintenance windows |
| **Configuration** | Quote construction, plan selection, bundle rules |
| **Routing** | Vehicle, network flow, signal path |
| **Placement** | VM- host, facility-location, inventory positioning |
| **Matching** | Marketplace, auction, exchange |

---

## Not a Fit For

Navokoj is **not** the right tool when:

- Problems are continuous (use gradient-based optimization)
- Real-time control systems require sub-millisecond deterministic response (embedded systems)
- All constraints are soft preferences (multi-objective evolutionary algorithms may suffice)
- Problems have no discrete structure (pure simulation/Monte Carlo)

---

## See Also

- [Marketing: Why Navokoj](index.md) — product overview
- [Pricing](pricing.md) — tier selection by use case
- [Results](results.md) — benchmarks by problem type
- [Limitations](../limitations.md) — where Navokoj is not a fit
- [Glossary](../glossary.md) — engine selection guide
