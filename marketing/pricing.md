# Pricing

**Start free. Pay when you scale. No per-minute metering. No surprise bills.**

Navokoj is sold as a monthly subscription. Every paid tier includes unlimited API calls within the tier's variable and clause limits. If you exceed your tier, the request returns a `402` with a clear upgrade prompt — no silent overage charges.

---

## Tier Comparison

| | Free | Dev | Pro | Enterprise |
|---|---|---|---|---|
| **Price** | $0 | **$99/mo** | **$499/mo** | Custom (typically **$5K+/mo**) |
| **Variables per request** | 1,000 | 10,000 | 100,000 | Unlimited |
| **Clauses per request** | 5,000 | 50,000 | 500,000 | Unlimited |
| **API requests / hour** | 500 | 5,000 | 50,000 | Custom |
| **Engines available** | mini | nano, mini, pro | All | All + dedicated instances |
| **Proof artifacts** | ❌ | ❌ | ✅ | ✅ + infeasibility proof |
| **Open-source verifier access** | ✅ | ✅ | ✅ | ✅ |
| **SLA** | Best-effort | Best-effort | 99.5% target | Custom contract |
| **Support** | Community | Community + email | Email, 24h response | Dedicated CSM |
| **On-prem deployment** | — | — | — | ✅ |
| **SOC2** | — | — | In flight | Required |

---

## What's a "proof artifact"?

On the Pro tier and above, every `/v1/solve` response includes a structured `proof_artifact` object: the assignment, UNSAT cores (if any), and the derivation graph that proves optimality. You can verify it offline using our [open-source verifier](../glossary.md#verification-trust) without trusting our servers.

This is what makes Navokoj a *verifiable* MaxSAT API rather than a black-box optimizer. For audit-sensitive workloads (security, compliance, financial reporting), this is the differentiator.

---

## Sample monthly bills

These are typical bills for production-shaped workloads:

| Use case | Tier | Typical monthly volume | Monthly cost |
|---|---|---|---|
| **Indie developer, CI testing** | Free | < 500 req/hr | $0 |
| **Small SaaS, internal scheduling** | Dev | 5K req/hr × 200 hrs | $99 |
| **Hospital scheduling, 30K variables** | Pro | 50K req/hr × 200 hrs | $499 |
| **Logistics company, 100K-var routing** | Pro + burst | 50K req/hr × 400 hrs | $499 + overage on request |
| **Multi-tenant platform, 1M+ variables** | Enterprise | Custom | $5K–$25K |

For workloads that genuinely exceed Pro tier limits, contact us for an Enterprise quote — we typically price on committed monthly clauses, not per-request.

---

## Engine guide

Pick the right engine for the job. Most production traffic uses **mini** and **pro**.

| Engine | Best for | Speed | Quality |
|---|---|---|---|
| **nano** | Real-time APIs (<100ms), quick checks | Fastest (~870ms typical) | ~94% satisfaction |
| **mini** | Balanced production work | Slow (40s+, but high quality) | ~99.77% satisfaction |
| **pro** | Mission-critical work, multi-constraint chains | Medium (0.1–7s) | ~99.4% satisfaction |
| **qstate** | N-ary problems (graph coloring, Sudoku, resource allocation) | Variable | ~95–100% when feasible |
| **ensemble** | Deep reasoning on hardest instances | Slowest | Highest available |

> **What "satisfaction rate" means:** the percentage of hard constraints the engine successfully satisfies on structured industrial benchmarks (MSE 2022, NIST, internal). It is not a measure of speed or cost. For real-world deployment, the right metric is *does it solve my specific problem*. We recommend running our [benchmarks on your own data](../limitations.md) before committing.

---

## See Also

- [Use Cases](use-cases.md) — which tier fits your problem
- [Results](results.md) — verified benchmarks per tier
- [Competition](competition.md) — how pricing compares
- [Product Strategy](../product-strategy.md) — pricing rationale
- [The Bottleneck](bottleneck.md) — conversion funnel analysis

---

## Why pay for Navokoj?

| Free or cheap alternatives | Navokoj |
|---|---|
| Generic SAT solvers (Z3, Kissat, CaDiCaL) — strong on random Boolean, choke on million-variable industrial | Tuned for weighted, structured MaxSAT at scale |
| Black-box answers — trust the solver | Proof artifacts you can verify offline |
| 10K–100K variable ceiling | 100K (Pro) to unlimited (Enterprise) |
| Compute-heavy exact solvers | Lock-preserving repair, 847×–12,495× faster than recomputation |
| No SLA, no support | Email support on Pro, dedicated CSM on Enterprise |

---

## Get started

```bash
# Free tier — no credit card required
curl -X POST https://api.navokoj.shunyabar.foo/v1/solve \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"num_vars": 1000, "clauses": [[1,2,3],[-1,4]], "engine": "mini"}'
```

- **Free & Dev**: Sign up at [navokoj.shunyabar.foo](https://navokoj.shunyabar.foo)
- **Pro**: Upgrade from your dashboard
- **Enterprise / pilots ($5K–$20K)**: Email contact@shunyabar.foo

---

## Service guarantees

- **30-minute hard timeout** on every solve. Best partial result is always returned.
- **Per-request billing** on Enterprise tier (Pro tier is flat monthly).
- **Never an empty error.** If we can't solve, you get the best assignment found plus diagnostics.
- **Availability**: Best-effort during alpha on self-serve tiers. Enterprise contracts include custom SLA.

> **Alpha status note:** Until SOC2 is complete (Q1 2027 target), self-serve tiers operate best-effort. Enterprise customers negotiate their own SLA. We disclose this honestly rather than over-promise.

---

## Frequently asked questions

**Can I switch tiers mid-month?**
Yes. Upgrades take effect immediately; downgrades take effect at the next billing cycle.

**What happens if I exceed my tier's variable limit?**
The request returns `402 Payment Required` with an upgrade prompt. We do not silently bill overages on self-serve tiers.

**Do you offer annual contracts?**
Yes — Enterprise tier is annual by default. Self-serve tiers are monthly; annual discounts (2 months free) available on Pro.

**Is there a free trial of Pro?**
Yes — 14 days, no credit card. Trigger from your dashboard.

**What if my problem doesn't fit any of these tiers?**
Email contact@shunyabar.foo. We have a custom-design process for unusual workloads.
