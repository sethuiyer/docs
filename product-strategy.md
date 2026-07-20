# ShunyaBar Labs — Product Strategy, H2 2026

**Author:** CPO
**Status:** Decision document. Not a wishlist.

**Anchored in:** 60+ live API tests, MSE 2022 benchmark validation, depth-4 Merkle root-cause diagnostic, engine spectrum analysis.

---

## Plain-English Summary (read this first)

> **One sentence:** We sell a verifiable MaxSAT API. Zero-knowledge (ZK) cryptography is the trust layer behind our proof certificates — not the front door of our marketing.
>
> **The hard truth this document confronts:** We have a working product (Navokoj API, live, stable, four engines) and 13 real users who have run 1,576 solves. We have billed $141.66 in 6 months. The bottleneck is not the engine — it is the conversion architecture between the product and the payment.
>
> **What we are betting on:**
> 1. **Wedge A** — Verifiable MaxSAT API as the primary product, targeting scheduling and decision optimization. Target: $300K ARR by end of 2027.
> 2. **Wedge B** — ZK pre-processor as a sidecar business, integrated with snarkjs/gnark. Target: $150K ARR.
> 3. **Kill** — Hybrid AI inference routing. Latency requirements we can't meet today.
>
> **What we are explicitly NOT doing:**
> - Leading with "ZK" on the homepage until we have a paying ZK customer
> - Building a ZK DSL (Circom, gnark, Noir own this)
> - Competing in generic SAT (Z3, Kissat, CaDiCaL dominate)
> - Hiring a ZK engineer in Q3 (premature)
>
> **The single most important thing:** Get 3 signed design partner LOIs by end of Q3. Revenue feedback is the only signal that validates our wedges.

---

## 1. State of the Union (What We Actually Know)

### What Works Today

- Navokoj API live and stable: `/v1/solve`, `/v1/diagnose`, hybrid XOR+CNF modes, batch, Q-SAT (N-ary)
- Engines form a real spectrum: nano (94% / 870ms) → nitro (99.4% / 830ms) → pro (99.4% / 0.1–7s) → mini (99.77% / 40s+)
- Per-instance engine choice matters: pro beats nitro on multi-constraint chains; mini is the high quality fallback
- Soundness preserved: UNSAT detection is correct on certified benchmarks (8/10 MSE 2022 WCNF matched optimal)
- Honest limits: 1,000 vars / 5,000 clauses / 100 req/hr on free tier

### What Doesn't Work Today

- **Depth-4+ ZK Merkle paths fail across every engine.** Root-caused: not the mult chain (engine handles it in 150ms when exactly-one is removed), it's the one-hot "exactly-one" constraints choking local search at this constraint density
- **No real ZK customer can use us.** 254-bit field circuits need 254 Boolean vars per R1CS var — 25M+ vars for a typical circuit, vs our 1K ceiling
- **No native modular arithmetic at the API.** Everything goes through CNF enumeration, which doesn't scale
- **Gadget-layer quality is on the user.** Bit-blasting, witness extraction, and ZK framing are the user's problem today

---

## 2. The Honest Product Read

We're a local-search MaxSAT engine company that **leads with MaxSAT, not ZK**. ZK is not a marketing layer — it is the long-term trust and settlement layer that makes "verifiable" defensible.

The engine is real and interesting — hybrid systematic+local-search is genuinely a research contribution. But ZK as a headline product is aspirational, not operational. Three reasons:

1. **Tier math doesn't work.** Real ZK needs 10⁶–10⁸ Boolean ops per proof. Our free tier is 5×10³ clauses. That's 5 orders of magnitude off.
2. **Latency math doesn't work.** Real ZK proofs need <1s. Our pro engine hits 7s on small chains. mini takes 40s+.
3. **Soundness UX doesn't work.** The 99.4% accuracy on single-shot means ~0.6% of proofs are wrong. For ZK that's catastrophic. mini gets to 99.77% but at 40s — still wrong 0.23% of the time, and 40s is unusable for proving.

The ZK story isn't dead — and ZK isn't optional. **ZK should stop being the front door. It should become the vault door** (i.e., ZK should be hidden behind the proof artifact and product strategy copy, not the headline of the homepage). It is in the stack from day one as the trust layer; the 2027+ bet is on whether ZK earns a separate product line, not on whether ZK is in the company. The 100% verifiable certificate path requires it.

---

## 3. Where We Play (Positioning)

Three plausible wedges. Pick one, kill the others.

### Wedge A: "The Verifiable MaxSAT API" ✓ Primary

| | |
|---|---|
| **What** | Sell Navokoj as a MaxSAT solver with optional proof-of-optimality (UNSAT core + assignment witness) |
| **Why** | Crowded field (MaxHS, SATLike, RC2) but our engine is competitive on speed/quality, and the proof artifact is a real differentiator |
| **Customer** | Decision optimization teams, scheduling, planning systems, ML feature selection |
| **Price** | Free tier → Pro $499/mo (500K clauses) → Enterprise $5K/mo+ (custom) |
| **12-mo ARR target** | $300K (60 enterprise customers, conservative) |

### Wedge B: "ZK Pre-Processor" ✓ Secondary

| | |
|---|---|
| **What** | Don't solve ZK. Be the best-in-class offline gadget that decomposes a ZK circuit into MaxSAT-shaped subproblems |
| **Why** | Every ZK project has a gadget bottleneck (hash functions, range proofs, lookups). We can be useful without being the proving system |
| **Customer** | ZK circuit engineers, snarkjs/gnark users, audit teams |
| **Price** | Per-circuit pricing, $50–$500 per decomposition |
| **12-mo ARR target** | $150K (low base, but real ZK $ flow) |

### Wedge C: "Hybrid AI Inference Routing" ❌ Kill

| | |
|---|---|
| **What** | Local-search for fuzzy/cost-sensitive decisions, fallback to exact solver for verification |
| **Why** | Real demand, but <50ms p99 latency required — we can't deliver this today |
| **Customer** | Robotics, real-time bidding, ad ranking, supply chain |
| **Verdict** | Kill for now — it's a feature, not a company |

### Wedge Evaluation: CENTS Test

| Wedge | Control | Entry | Need | Time Leverage | Scale | Score |
|-------|---------|-------|------|--------------|-------|-------|
| **Scheduling / Timetabling** | High | Medium | Very High | High | High | **Strong** |
| **ZK Pre-Processor / Auditing** | Medium | High | High | Medium | Very High | Good |
| **Agent Guardrails** | Medium | Low | Medium | High | Medium | Weak — kill |

**Scheduling wins.** Clear pain, paying customers who understand value immediately, strongest proof point (80M clauses in 73s).

---

## 4. The Proof-of-Optimality API Contract

### Design Principles

The `proof_artifact` is the core technical moat. **Schema rules:**

1. **Weights must be positive integers.** Floats create precision issues that make `primal_cost == dual_lower_bound` true by accident. Fractional weights invalidate the optimality certificate.
2. **Derivation graphs, not strings.** `resolution_chain` must be a structured derivation tree — clause IDs and resolution steps. The verifier reconstructs the proof, not parses English.
3. **Three response cases.** Optimal, feasible-with-gap, infeasible. The client must be able to distinguish all three.

### POST `/v1/solve` Request Payload

```json
{
  "num_vars": 8,
  "clauses": [
    [1, 2],
    [-1, 3],
    [-2, -3],
    [4, 5],
    [-4, 6],
    [-5, -6],
    [7, 8],
    [-7, -8]
  ],
  "weights": [1000, 1000, 1000, 1000, 1000, 1000, 1, 1],
  "engine": "pro",
  "timeout_budget_seconds": 5.0,
  "generate_proof": true
}
```

> **Note:** `weights` must be positive integers. The WCNF format requires integer arithmetic for the dual bound to be mathematically sound.

### Response: Optimal Case

```json
{
  "success": true,
  "satisfiable": true,
  "satisfaction_rate": 0.875,
  "solve_time_seconds": 0.042,
  "engine_used": "pro-geometric-l4",
  "assignment": [true, false, true, true, false, true, true, false],
  "proof_artifact": {
    "primal_cost": 2,
    "dual_lower_bound": 2,
    "optimality_proven": true,
    "unsat_cores": [
      {
        "core_index": 0,
        "clause_ids": [6],
        "weight": 1,
        "derivation": {
          "type": "trivial",
          "input_clauses": [6]
        }
      },
      {
        "core_index": 1,
        "clause_ids": [7],
        "weight": 1,
        "derivation": {
          "type": "trivial",
          "input_clauses": [7]
        }
      }
    ],
    "verification_command": "navokoj-verify --assignment instance.assignment --wcnf instance.wcnf --proof proof.json"
  }
}
```

**Derivation types:**

| Type | Fields | Use |
|------|--------|-----|
| `trivial` | `input_clauses: [id]` | Single unsatisfied clause is its own core |
| `resolution` | `left: core_id, right: core_id, resolvent: clause_id` | Multi-clause UNSAT core via resolution |

### Response: Infeasible Case (UNSAT)

```json
{
  "success": true,
  "satisfiable": false,
  "satisfaction_rate": 0.0,
  "solve_time_seconds": 0.031,
  "engine_used": "pro-geometric-l4",
  "proof_artifact": {
    "dual_lower_bound": 10000,
    "infeasibility_proven": true,
    "hard_clause_unsat_core": [0, 1, 2],
    "derivation": {
      "type": "resolution",
      "left": {
        "type": "resolution",
        "left": {"type": "trivial", "input_clauses": [0]},
        "right": {"type": "trivial", "input_clauses": [1]},
        "resolvent": 10
      },
      "right": {"type": "trivial", "input_clauses": [2]},
      "resolvent": 11
    }
  }
}
```

> Hard clauses (weight = 0 in WCNF) form an unsatisfiable core. If the dual bound equals total hard weight, no feasible solution exists. This is critical for the audit wedge — clients must distinguish "optimal" from "infeasible" from "engine gave up."

---

## 5. Open-Source Strategy (Corrected)

### The Flaw in the Original Split

Putting proof generation in the closed layer is structurally weak. UNSAT core extraction is well-known — anyone with the open-source core can write their own. And "trust our closed-source proof checker" defeats the entire purpose of verification for security auditors.

### The Correct Split

| Layer | License | Contents |
|-------|---------|----------|
| **Verifier + Proof Format** | **Open (Apache 2.0)** | Proof format spec, verifier implementation, example clients. Security auditors download this and run it offline. |
| **Engine Core** | **Open (Apache 2.0)** | Local-search relaxation loop, parsing, CNF/XOR primitives, basic heuristics. Community contribution path. |
| **Proof Generation** | **Closed (Commercial)** | Which search trajectories produce good UNSAT cores. Telemetry. RBAC + audit logging. On-prem runtime. Advanced ZK pre-processing heuristics. |

**Rationale:** The verifier being open-source is what makes the proof artifact trustworthy. "Download our open-source verifier, run it on the proof we gave you, confirm offline" — that's the security property the audit wedge requires. The closed layer is "our secret sauce for finding good proofs fast," not "our secret proof checker."

---

## 6. 12-Month Roadmap (Specific Bets, Dates)

### Q3 2026 (now → Sept)

- [ ] **Ship Wedge A MVP.** MaxSAT-first homepage, no ZK framing
- [ ] **Fix API schema.** Integer weights only, derivation graphs, infeasibility case
- [ ] **Pricing:** Lock Dev $99/mo, Pro $499/mo. Free tier → 500 req/hr
- [ ] **3 design partner LOIs signed** (1 per wedge we intend to keep)
- [ ] **First hire: Solutions Engineer** — 30-day plan: prospect list, pilot template, first 10 outreach calls
- [ ] **ARR target:** $20K (early enterprise pilots)

### Q4 2026

- [ ] Ship **Wedge B (ZK Pre-Processor)** sidecar
- [ ] **Proof-of-optimality artifact** in API response (UNSAT cores + derivation graph)
- [ ] **Open-source verifier + proof format** (Apache 2.0)
- [ ] Partner with snarkjs or gnark for "use NitroSAT as preprocessor" integration
- [ ] **Second hire: DevRel** — open-source community, README + SDK docs
- [ ] **ARR target:** $80K cumulative

### Q1 2027

- [ ] Launch **Enterprise tier** — on-prem + SOC2 in flight
- [ ] **Open-source engine core** — parsing, CNF/XOR, basic local-search loop
- [ ] First paid ZK audit firm pilot (~$25K contract)
- [ ] **ARR target:** $250K cumulative

### Q2 2027

**ZK product-line decision gate** — requires ALL three:
- [ ] 100% verifiable solver (mini audit: 40-60% there today)
- [ ] <1s p99 latency on depth-4-equivalent
- [ ] At least one paying ZK customer in production

> **Note:** This gate validates whether ZK earns a separate product line. It does **not** validate whether ZK is in the company. ZK is in the stack from day one as the trust and settlement layer for the proof artifact. Failing this gate means we defer the spin-out, not delete the moat.

**If yes:** Spin out "Shunyabar ZK" as separate product line
**If no:** Stay MaxSAT-only; revisit spin-out in 2028. ZK remains in the verification layer regardless.

- [ ] **ARR target:** $500K cumulative

---

## 7. Hiring Sequence

> First hire is the bottleneck. Wrong first hire wastes 6 months.

| Hire | When | 30-Day Mandate | Why First |
|-------|------|----------------|-----------|
| **Solutions Engineer** | Q3, week 1 | 3 signed LOIs, pilot template ready, 10 enterprise outreach calls | Revenue requires someone who can sell + deliver. Not marketing, not engineering. |
| **DevRel** | Q4 | Open-source repo polished, SDK docs live, 3 community posts | Proof artifacts + open core need a community steward |
| **Backend Engineer** | Q4 | Metered billing, on-prem Docker, SSO/RBAC | Infrastructure for Enterprise tier |
| **ZK Engineer** | Q1 2027 | Partner integration (snarkjs/gnark), ZK preprocessor shipped | Only after ZK wedge validated |

**Don't hire:** ZK engineer in Q3. Premature. The ZK wedge isn't validated yet.

---

## 8. Pilot Template (Q3 Must-Have)

Every enterprise pilot follows this structure. Sales needs this ready before first outreach.

```
PILOT AGREEMENT
├── Problem: [What they're trying to solve]
├── Success criteria: [Measurable, e.g., "reduce scheduling compute time by 50%"]
├── Deliverable: [Proof-of-concept in 30 days, or full integration in 60 days]
├── Timeline: [Start date → demo date → decision date]
├── Pricing: [$X pilot fee, credited toward annual contract]
├── Payment: [Upfront, non-refundable]
└── IP: [Results belong to customer, we can use anonymized case study]
```

**Target pilots by Q3 end:**
- 1 scheduling / timetabling ($5K–$20K)
- 1 ML feature selection ($5K)
- 1 ZK preprocessor evaluation (free → paid conversion)

---

## 9. Kill List

Things we explicitly **are NOT** doing in the next 12 months:

| ❌ | Why |
|---|---|
| Real-time crypto / wallet / signing | Latency + audit surface |
| Build ZK DSL | Circom, gnark, Noir, ZoKrates are crowded. We integrate. |
| General SAT market | Z3, Kissat, CaDiCaL dominate. We're MaxSAT, not SAT. |
| Mobile / edge deployment | Engine footprint too big |
| Custom hardware (GPUs) | Research play, not 2027 product |
| Lead-with-ZK homepage headline | Until we have a paying ZK customer |
| Wedge C (Agent Guardrails) | CENTS test failed. Kill it. |

### Do NOT kill (Preserve)

Things we are explicitly **preserving** even when short-term data tempts us to cut:

| ✅ Preserve | Why |
|---|---|
| ZK in the company thesis and verification roadmap | ZK is the long-term moat. Cutting it turns a proof-oriented solver into a generic solver API competing against Z3, MaxHS, RC2, CaDiCaL. |
| ZK as the trust layer in the proof artifact | What makes "verifiable MaxSAT" defensible. Without it, the proof artifact is a claim, not a property. |
| Wedge B (ZK Pre-Processor) | Validated as the 2027+ enterprise audit sidecar and ZK entry point. |
| ZK product-line decision gate in Q2 2027 | Validates whether ZK earns a separate product line, not whether ZK is in the company. |

---

## 10. Pricing & Tier Strategy

| Tier | Price | Limits | Target |
|------|-------|--------|--------|
| **Free** | $0 | 1K vars, 5K clauses, 500 req/hr | Hobbyists, CI testing |
| **Dev** | $99/mo | 10K vars, 50K clauses, 5K req/hr | Indie devs, small apps |
| **Pro** | $499/mo | 100K vars, 500K clauses, 50K req/hr | Startups, mid-market |
| **Enterprise** | Custom $5K+/mo | Unlimited, on-prem optional | Large teams, regulated |

**Proof artifacts:**
- Free/Dev: assignment only (no proof)
- Pro+: assignment + UNSAT proof certificate + derivation graph
- Enterprise: + infeasibility proof when applicable

---

## 11. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| MaxSAT market commoditizes | Med | High | Open-source verifier + core; compete on proof artifacts + UX |
| ZK framing attracts wrong-fit customers | High | Med | Rebrand Q3; redirect to preprocessor |
| Engine accuracy claims don't hold | Med | Critical | Audit mini Q3; honest numbers if lower |
| Proof schema has bugs | High | Critical | Integer weights only; derivation graph not string; infeasibility case |
| Research team leaves | Low | Critical | Open-source verifier + core; reduce single-point-of-failure |
| Competitor ships 100% verifiable MaxSAT first | Med | High | Invest in proof artifacts NOW (Q3-Q4) |
| Funding / runway | Med | Critical | <$50K/mo burn; $300K ARR by end of 2027 |

---

## 12. The Single Most Important Thing

> **Get to 3 signed design partner LOIs by end of Q3.**

Everything else is feature roadmap. Revenue feedback is the only signal that validates wedges. The proof artifact, the API schema, the open-source split — none of it matters if we don't have paying customers in the loop by Q4.

**The sequence:**
1. Get LOIs first (Q3)
2. Then build the proof artifact (Q4)
3. Then open-source the verifier (Q4)

Not the other way around.

---

## 13. Honest Verdicts

1. **ZK should stop being the front door. It should become the vault door.** Cut lead-with-ZK framing from the homepage in Q3, but keep ZK in the stack as the long-term trust and auditability layer. Killing ZK from the company thesis would turn a differentiated proof-oriented solver into a generic solver API competing against Z3 and MaxHS.
2. **The engine is real but undersold.** The hybrid local-search + systematic architecture is novel. Open-source verifier + core in Q4 to drive adoption.
3. **We're not a ZK company yet.** 2028+ if the verifiable proofs land. MaxSAT is now.
4. **First hire is Solutions Engineer.** Not DevRel, not ZK engineer. Revenue requires someone who can sell.
5. **The depth-4 Merkle result is research, not product.** Valuable IP. But nobody's paying for it yet.

---

## Glossary of Internal Terms Used in This Document

| Term | Meaning |
|---|---|
| **Wedge** | A go-to-market positioning. We pick one primary, one secondary, and explicitly kill the rest. |
| **Wedge A** | "The Verifiable MaxSAT API" — our primary product positioning. |
| **Wedge B** | "ZK Pre-Processor" — a sidecar business integrated with snarkjs/gnark. |
| **Wedge C** | "Hybrid AI Inference Routing" — explicitly killed. |
| **Vault Door Principle** | Keep ZK in the technical stack as the trust and auditability layer, but don't lead with it on the homepage. |
| **Front door** | The first thing a customer reads on our marketing surface. Should be the primary wedge, not a future product. |
| **CENTS Test** | A 5-axis evaluation framework: **C**ontrol (how much say we have over pricing/positioning), **E**ntry (barrier to customer adoption), **N**eed (intensity of customer pain), **T**ime Leverage (does the value compound), **S**cale (does the market grow). |
| **LOI** | Letter of Intent. A signed but non-binding agreement to enter a paid engagement. |
| **Design partner** | A pilot customer (typically <5) who gives product feedback in exchange for early access and preferred pricing. |
| **Proof artifact** | The structured JSON object returned by Navokoj containing the assignment, UNSAT cores, and derivation graph. The customer can verify this offline with our open-source verifier. |
| **Depth-4 Merkle** | A specific zero-knowledge circuit pattern. Our research result showed it doesn't fit current tier limits; classified as research IP, not product. |
| **UNSAT core** | A minimal subset of clauses that is unsatisfiable on its own. Used to prove a problem has no solution. |
| **MSE 2022** | MaxSAT Evaluation 2022 — the standard benchmark suite with certified optimal solutions. |

For a full glossary of all company terms, see [glossary.md](glossary.md).

---

*Assumptions: 1 founder + 4 hires by Q4, $300K seed extension in Q3, runway through Q2 2027.*

---

## See Also

- [Roadmap (TODO)](TODO.md) — phased execution plan
- [The Bottleneck](marketing/bottleneck.md) — funnel audit driving the strategy
- [Pricing](marketing/pricing.md) — tier details behind the strategy
- [Glossary](glossary.md) — internal terms defined
- [Limitations](limitations.md) — honest assessment of engine capabilities
- [Design Philosophy](design-philosophy.md) — how the strategy informs product surfaces
