# The Bottleneck — A 7-Month Funnel Audit

> *A founder's read on 7 months of public traffic, real usage, and a hard revenue gap.*

**Author:** Sethurathienam Iyer, Founder
**Date:** 2026-06-19
**Window covered:** 2025-08-01 → 2026-06-19
**Next check-in:** 2026-09-19

---

## Executive Summary (60-second read)

> **The headline:** Over 7 months, the product handled **1,576 real solves from 13 users**. We billed **$141.66**. The runtime is doing **~9× more work than the billing layer is capturing**.
>
> **The bottleneck:** Not the engine. Not the math. Not the science. The conversion architecture between the product and the payment.
>
> **What we are at:** A "13 keys, real product, no money" stage. The product does what it says. We have not yet built a business.
>
> **What we are doing about it:** 7 specific actions in the next 90 days, ending with the only number that matters — 3 signed design partner LOIs by Sept 30.

---

## Glossary (terms used in this document)

| Term | Meaning |
|---|---|
| **Beampipe** | Our top-of-funnel web analytics. Counts visits to `sethuiyer.github.io` (research) and `navokoj.shunyabar.foo` (product). |
| **Supabase** | The database that backs the Navokoj API. Stores users, API keys, solve logs, billing rows. |
| **PostHog** | Our frontend product analytics. Tracks button clicks, pageviews, completion rates on the website. |
| **DEFEKT** | Our pre-solve hardness diagnostic. Tells customers how hard a problem is before they commit compute to it. |
| **LOI** | Letter of Intent. A signed but non-binding agreement to enter a paid engagement. |
| **mini / pro / nano / ensemble** | The four production engines. See the [pricing page](pricing.md) for details. |
| **Solve** | One API call to `/v1/solve` that returns an assignment (with or without proof). |

---

I am writing this in the founder voice because I want to remember what the data actually said, before I let the narrative drift. Three sources, three different layers. The numbers do not flatter us, and we are not going to flatter them.

---

## What we measured

### Layer 1 — Beampipe (top of funnel)

| Site | Unique visitors | Bounce rate | Top page |
|---|---|---|---|
| sethuiyer.github.io | 885 | 87% | `/casimir-sat-solver/` (29%) |
| navokoj.shunyabar.foo | ~700 (596 homepage + 94 docs) | n/a | `/` (67% of navokoj traffic) |

The personal site is the research funnel. The product site is the conversion funnel. The interesting finding is in the sources.

| Source | sethuiyer.github.io | navokoj.shunyabar.foo |
|---|---|---|
| Direct / none | 88% | 89% |
| Hacker News | 5% | 6% |
| Google | 4% | <1% |
| Reddit | <1% | 1% |
| Twitter | 1% | <1% |
| YouTube | 1% | <1% |

**Hacker News and Reddit are working. SEO is not.** 88–89% of traffic is direct, which means the people coming are people who already heard about us. We have a small, named audience. We do not have a search engine business.

Device split on navokoj: 57% desktop, 19% laptop, 13% tablet, 11% mobile. The 13% tablet share is unusual and worth asking about later, but it is not today's problem.

### Layer 2 — Supabase (the engine layer)

This is where the math hits the silicon. From 2025-11-22 (first usage) to 2026-06-18 (last usage):

| Counter | Number | Read |
|---|---|---|
| Users | 15 | Real accounts |
| API keys | 13 | Real integrations |
| Daily usage rows | 1,892 | Operational telemetry |
| Rate-limit rows | 3,315 | Free-tier activity |
| Solution rows stored | 3,368 | The work the engine did |
| DEFEKT diagnostic results | 22 | Pre-solve hardness checks, essentially unused |
| UNSAT cores produced | 3 | Proof artifacts, essentially unused |
| Audit logs | 2,188 | Real |
| **Usage-counted solves** | **1,576** | What the rate limiter saw |
| **Charged solve rows** | **176** | What got billed |
| **Total charged** | **$141.66** | Revenue |
| Compute hours | 5.81 | L4: 5.25 hr / $68.99; H100: 0.56 hr / $72.67 |

**The runtime is doing roughly 9× more work than the billing layer is capturing.** That is the headline of this document.

By engine (rate-limiter counters):

| Engine | Solves | What it means |
|---|---|---|
| mini | 975 | The default for production-feeling work |
| pro | 601 | The harder-engine path |
| nano | 0 | The free-tier engine is unused for real work |
| ensemble | 0 | The expensive engine is unused entirely |
| diagnostics | 0 | Billable diagnostic calls — not the same as DEFEKT results |

**We built a 5-engine spectrum. Users picked 2.** Mini and pro are doing all the work. Nano and ensemble are zeros.

By hardware:

| Hardware | Charge rows | Hours | Effective $/hr |
|---|---|---|---|
| L4 | 150 | 5.25 | $13.14 |
| H100 | 26 | 0.56 | $129.77 |

H100 is priced roughly 10× L4. That is the right pricing shape. But only 26 H100 charges in 6 months means **H100 is a feature, not a habit.**

### Layer 3 — PostHog (the frontend)

| Metric | Number | Read |
|---|---|---|
| Unique users | 17 | Slightly more than 13 API keys — overlap is real |
| Total events | 1,027 | |
| `solve_called` | 256 | Frontend users clicked "solve" 256 times |
| `solve_completed` | 91 | **35% completion rate from the frontend** |
| `chat_query_sent` | 25 | |
| `chat_error` | 7 | **28% error rate on the chat** |
| `web_vitals` | 90 | |
| `pageview` | 198 | |
| First event | 2026-01-08 | |
| Last event | 2026-04-25 | **8 weeks of silence** |

**The frontend is decaying.** PostHog has not seen an event in 8 weeks. Either the integration broke, users stopped coming to the site, or both. We will find out which.

---

## The hard mismatch

Now we want to put the three layers next to each other and look at the gap.

| Layer | Number | What it counts |
|---|---|---|
| Beampipe — navokoj homepage visits | 596 | Top of funnel |
| Beampipe — navokoj docs visits | 94 | 16% of homepage visits read docs |
| PostHog `solve_called` | 256 | Frontend users |
| PostHog `solve_completed` | 91 | 35% of frontend calls |
| Supabase usage-counted solves | 1,576 | What the API actually ran |
| Supabase solution rows | 3,368 | What got stored |
| Supabase charged solve rows | 176 | What got billed |
| Total revenue | $141.66 | |

Three findings we did not expect to find.

**1. Frontend users convert at roughly 5× the rate of API users.** PostHog shows 91 completes; Supabase shows 176 charges. If we assume most of the 176 came from the 91 frontend completes (a fair assumption given PostHog's 256 calls map to 91 completes, and 176 is the same order of magnitude), then **frontend users convert at ~52% to paid**, versus the **11% overall conversion** from rate-limited to billed. The web UI is a paid funnel, not a free funnel. The API is the other way around.

This is a real signal. The thing that costs us the most time to build (the website) is the thing that makes us the most money per visitor. The thing we have not been investing in (the API UX, the upgrade moment) is the thing that bleeds conversion.

**2. The frontend stopped.** We assumed users would come back to the website after their first API call. They do not. Once they have a key, they wire it into a script and the site becomes a stale tab. **8 weeks of PostHog silence means the website is a brochure, not a product surface.** The product is the API. The site is the marketing layer over it.

**3. Chat is broken 28% of the time.** 7 errors out of 25 queries. Whatever the chat does, it gets wrong 1 in 4 times. This is on us. We have not fixed it. We have not even measured it carefully until now.

---

## The diagnosis

There is exactly one bottleneck, and we want to write it down so we do not confuse it with other problems.

> **The runtime exists. The charge / accounting layer is much smaller than the runtime layer. The product is not what the marketing says it is. The website is a brochure, not a product surface.**

Specifically:

1. **The free tier is too generous, or the upgrade trigger is too weak.** 1,400+ solves ran for free. 11% conversion is the smoking gun. The 6-week gap between first usage (2025-11-22) and first charge (2026-01-03) means **users get real value before they ever see a paywall**, and once they have it, the upgrade moment is invisible.
2. **The "differentiators" are documented but not demanded by the user.** DEFEKT: 22 calls. Proof artifacts: 3 UNSAT cores. Ensemble engine: 0 solves. **These cost engineering time to maintain and confuse the marketing.** Either ship them as first-class features with in-product prompts and success stories, or stop selling them.
3. **The schema has known bugs** (per the product strategy: integer weights only, derivation graphs not strings, infeasibility case). These may be silently failing paid requests. **If a paid request gets rejected by the schema and counted as "free," that is a direct revenue leak.**
4. **The chat is broken 28% of the time.** This is a credibility problem and a fix-it-or-remove-it decision.
5. **The website is not the product.** The product is the API. The website has to either become a product surface (account dashboard, quota, results visualization, success stories) or stop pretending to be one.
6. **The data is internally inconsistent.** The engine taxonomy in storage (`pro-deepthink`, `mini-deepthink`, `adaptive-deepthink`, `Navokoj Nano Plan`, `nitro`, `nano`) does not match the engine taxonomy in rate-limiting (`solves_nano`, `solves_mini`, `solves_pro`, `solves_ensemble`, `Diagnostics`). We have 6 engines named 6 different ways across 3 tables. This is **billing / observability debt**, and it is hiding the truth about which engines customers are actually using.

---

## What we are doing about it

In the next 90 days, in order:

1. **Audit the 1,576 → 176 pipeline.** We will trace every billed vs unbilled solve to find the leak. If the schema bugs are dropping paid requests, fix the schema. If the rate limiter is over-counting free usage, fix the rate limiter. If the upgrade trigger is invisible, add a hard wall at 100,000 clauses for free tier and a "you have used X% of your free tier this month" banner.
2. **Fix or remove the chat.** 28% error rate is not a feature. We will either rebuild it against the actual `/v1/solve` API or remove it from the site. Half a broken feature is worse than no feature.
3. **Reconcile the engine taxonomy.** One engine, one name, one counter, one table. If `mini-deepthink` and `solves_mini` are the same engine, they need the same name in storage, in rate-limiting, in billing, in the API, in the docs, and in the marketing. Right now the same engine has at least three names.
4. **Decide on the differentiators.** Either DEFEKT, proof artifacts, and ensemble become first-class (with in-product prompts, sample requests, success stories, and at least one paying customer using them) or they get cut from the marketing copy. Right now they are both marketed and ignored, which is the worst of both worlds.
5. **Build a real product surface.** API key, account dashboard, recent solves, success rate, cost per solve, quota. Give users a reason to come back to the site. The fact that frontend users convert at 52% versus API users at 11% is the entire business case for this work.
6. **Get 3 design partner LOIs signed** before we run these numbers again. The strategy doc calls for this. The data confirms why. $141.66 over 6 months is not a business. 3 LOIs at $5–20K each is the next number on this page.
7. **Stop selling things that are not there.** Drop "ZK" from the homepage. Drop "DEFEKT" from the marketing if we are not going to ship it as a first-class feature. Drop "proof artifact" from the pricing page until the schema is fixed and the request rate matches the documentation.

---

## What this is, and what it is not

**This is not a failure.** We built a working API. We shipped engines that customers actually use. We wrote a real limitations page. We have 13 paying-tier-or-near-paying-tier users, and they ran 1,576 real solves. The product does what it says it does. Most products never get past zero. We are past zero.

**This is not a success.** We have not yet built a business. $141.66 over 6 months is below the threshold where a runway conversation becomes serious. The 11% conversion is a structural gap, not a launch glitch. The product-market fit story is not yet written.

**This is a stage.** We are at the "13 keys, real product, no money" stage. The math works. The product works. The strategy is sharp. The bottleneck is the conversion architecture between runtime and billing. The next 90 days are about closing that gap.

---

## The next check-in

I am writing this in public because I want to be accountable to it. On **2026-09-19**, three months from now, we will run these numbers again. The numbers we want to see change:

| Metric | Today (2026-06-19) | Target (2026-09-19) |
|---|---|---|
| Navokoj homepage visits | 596 | 2,000+ |
| Navokoj docs visits | 94 | 400+ |
| Usage-counted solves | 1,576 | 10,000+ |
| Charged solve rows | 176 | 1,000+ |
| Total revenue | $141.66 | $5,000+ |
| Signed design partner LOIs | 0 | 3+ |
| DEFEKT calls | 22 | 200+ (or DEFEKT removed from marketing) |
| Chat error rate | 28% | <5% |
| Frontend solve completion rate | 35% | 60%+ |
| Frontend ↔ billing ratio | 52% | 60%+ |
| Engine taxonomy | 6 names / 3 tables | 1 name / 1 table |

If those numbers do not move, the bottleneck is not the conversion architecture — it is the product. And that is a different conversation.

If they do move, the bottleneck is what we said it is, and this is the document that told us so.

---

## Change log

| Date | Change |
|---|---|
| 2026-06-19 | First version. 7-month funnel audit from 2025-08-01 to 2026-06-19. |
| _next check-in_ | _2026-09-19: re-run all metrics; update target table; add or remove sections based on what changed._ |

*Authored by Sethurathienam Iyer, Founder, ShunyaBar Labs*
*Published 2026-06-19*

---

## See Also

- [Product Strategy](../product-strategy.md) — the strategy this audit informs
- [Roadmap (TODO)](../TODO.md) — Q3 2026 targets from this audit
- [Pricing](pricing.md) — pricing strategy and tiers
- [Glossary](../glossary.md) — terms used in this document
- [Design Philosophy](../design-philosophy.md) — why we publish internal audits openly
