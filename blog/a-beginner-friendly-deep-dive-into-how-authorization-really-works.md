---
title: "A Beginner-Friendly Deep Dive Into How Authorization Really Works"
description: "I was handed a problem statement recently that looked, at first glance, like a routine backend engineering task. Permissions, users, access control , classic stuff. The kind of thing you\u2019\u2026"
date: "2026-06-03"
author: "Sethu Iyer"
tags: ["security", "authorization", "mathematics"]
type: "Essay"
materials:
  - label: "Original on Medium"
    href: "https://medium.com/@sethuiyer/a-beginner-friendly-deep-dive-into-how-authorization-really-works-641f1ccc3137"
---

*Or: How “does this user have access?” turns into 40 pages of math and why that math is actually beautiful*

I was handed a problem statement recently that looked, at first glance, like a routine backend engineering task. Permissions, users, access control , classic stuff. The kind of thing you’ve probably implemented a dozen times. A simple database table, maybe some caching, done before lunch.

I was not done before lunch.

What looked like a permissions system was secretly a research problem in disguise. By the end, I had derived from scratch that the entire thing collapses to one tiny formula. Which sounds obvious in hindsight. It never is.

This article walks through the whole journey in plain English. Every technical term gets explained when it appears. No prior math background required. Let’s go.

## First: What Even Is a Permission System?

Before we get fancy, let’s agree on what we’re building.

A permission system answers one question: **“Is this user allowed to do this thing?”**

At small scale, you solve this with a table:

![](https://cdn-images-1.medium.com/max/365/1*cmk65Ir7caPoDQ9LbpCtyQ.png)

This works fine for a startup with 3 users and 5 actions.

It falls apart the moment reality arrives. Enterprises have thousands of users, hundreds of permission types, and complex rules like “if you can restart the production server, you obviously can also read its logs.” Storing every implied permission explicitly becomes a nightmare of duplication, inconsistency, and bugs.

So engineers reach for **role-based access control (RBAC)** — assign users to roles, and roles carry permissions. Better. But RBAC has a famous problem: **role spaghetti**. After a few years, you have 847 roles, nobody knows what half of them mean, and every new feature requires a new role because the existing ones don’t quite fit.

The system I’m about to describe is the mathematical way out of that maze.

## Step 1: The Poset — A Fancy Word for “Permissions Have a Family Tree”

Let’s use a concrete example. Imagine a SaaS platform with these 8 permissions:

![](https://cdn-images-1.medium.com/max/695/1*yEa7LmdaUyTKSniuyptfKQ.png)

Now notice something obvious: **some permissions imply others.**

If you can restart production (prod.restart), you can obviously read its logs (prod.logs). And reading logs implies you can read the system at all (prod.read). And being able to read production means you're at least a basic member (tenant.member).

So we can write this as a chain:

prod.restart ≥ prod.logs ≥ prod.read ≥ tenant.member

The ≥ here means "is more powerful than or equal to." Similarly:

billing.admin ≥ billing.read ≥ tenant.member  
tenant.admin ≥ user.invite ≥ tenant.member

When you draw this as a diagram, with arrows pointing upward toward more powerful permissions, you get:

![](https://cdn-images-1.medium.com/max/375/1*n_FPlYpBl0mVmTOYnXu_RQ.png)

This diagram is called a **Hasse diagram** (named after mathematician Helmut Hasse). It shows the *direct* implication relationships — the immediate “one step up” connections.

The whole structure — the set of permissions plus these implication relationships — is called a **partially ordered set**, or **poset** for short. “Partial” because not every permission compares to every other: billing.admin and prod.restart have no direct relationship with each other. They're incomparable. Neither implies the other.

## Step 2: The Downward Closure — Why “What You Can Do” Is a Set, Not a Point

Here’s where the key insight lives.

When a user is granted prod.restart, they don't just get that one permission. They get **everything implied by it** too. In our poset, that means they also automatically have:

prod.logs, prod.read, tenant.member

The full set of permissions a user actually has — the generator plus everything it implies — is called the **downward closure** (or **downset** or **ideal**).

We write it as ↓G where G is the user's granted permissions.

If a user has G = { prod.restart }, then:

↓G = { prod.restart, prod.logs, prod.read, tenant.member }

Because restart → logs → read → member, so all four are included.

## Step 3: The Authorization Check — One Beautiful Formula

Now we can state the authorization check cleanly.

A request requires a set of permissions R. The user has authority ↓G. The request is **authorized** if and only if:

↓R ⊆ ↓G

In plain English: **every permission required by the action is covered by the user’s authority.**

Let’s work through a concrete example.

**Example 1: Access Granted**

Action requires: R = { prod.logs }

The downward closure of the request:

↓R = { prod.logs, prod.read, tenant.member }

User has G = { prod.restart }, so:

↓G = { prod.restart, prod.logs, prod.read, tenant.member }

Is ↓R ⊆ ↓G? Yes — every element in ↓R is also in ↓G. **Access granted. ✅**

**Example 2: Access Denied — With an Explanation**

Action requires: R = { billing.admin }

The downward closure of the request:

↓R = { billing.admin, billing.read, tenant.member }

User still only has G = { prod.restart }, so ↓G is the same as before.

What’s missing? Compute ↓R minus ↓G:

Missing = { billing.admin, billing.read }

And this is where it gets interesting. Instead of just saying “403 Forbidden”, we can say something smart:

- **First blocker** (the lowest missing permission): billing.read

This is where the chain first breaks. The user doesn’t even have basic billing read access.

- **Minimal fix** (the smallest grant that would fix everything): billing.admin
- If you grant billing.admin, its downward closure covers billing.read too. One grant fixes everything.

So the denial response becomes:

{  
“allow”: false,  
“missing”: \[“billing.read”, “billing.admin”\],  
“first_blockers”: \[“billing.read”\],  
“minimal_fix_grants”: \[“billing.admin”\]  
}

That’s an **algebraically-derived remediation proof** — the system is telling you exactly what went wrong and the most efficient way to fix it. This is miles beyond what most real-world RBAC systems provide.

## Step 4: Bitsets — Making This Fast at Runtime

Here’s where theory meets engineering.

We assign each permission a bit position:

Bit 0 → tenant.member  
Bit 1 → prod.read  
Bit 2 → prod.logs  
Bit 3 → prod.restart  
Bit 4 → billing.read  
Bit 5 → billing.admin  
Bit 6 → user.invite  
Bit 7 → tenant.admin

Now we can represent any set of permissions as a number — a **bitset**. Each bit is either 0 (don’t have it) or 1 (have it).

The downward closure of prod.restart (which covers bits 0-3) becomes:

00001111 (in binary, bits 0–3 are set)

The downward closure of billing.admin (which covers bits 0, 4, 5) becomes:

00110001

The authorization check ↓R ⊆ ↓G now becomes a bitwise operation:

(request & ~grant) == 0

Decoded: “take the request bitset, AND it with the inverse of the grant bitset, and check if the result is zero.” If it’s zero, every bit in the request is covered by the grant. If it’s nonzero, some permissions are missing.

This runs in a single CPU instruction cycle. Hardware-grade speed.

## Step 5: Frontier Compression — Storing Only What Matters

Now for the elegant storage insight.

Suppose a user has been granted:

{ prod.restart, prod.logs, prod.read, tenant.member }

Do you need to store all four? No. Because prod.restart already *implies* the other three. Storing the others is redundant — like listing "can sit in car" and "can open car door" separately when you already know they have the car key.

The **frontier** (also called the **antichain**) is the minimal set of maximal generators that represents the user’s authority. In this case:

frontier = { prod.restart }

That one element completely describes the user’s authority. Everything else is derivable.

> ***What’s an antichain?*** *In our permission hierarchy, an antichain is a set where no element in the set implies another element in the set.* *{ prod.restart, billing.admin } is an antichain because neither implies the other.* *{ prod.restart, prod.logs } is NOT an antichain because* *prod.restart implies* *prod.logs — one dominates the other, making* *prod.logs redundant.*

This has a beautiful mathematical guarantee behind it (from **Birkhoff’s representation theorem**, which we’ll mention but not fully derive): every downward-closed set of permissions is uniquely represented by its maximal antichain. The frontier is the canonical, compressed, exact representation. It’s not an approximation. It’s mathematically equivalent.

## Step 6: Private Proofs — Revealing Only What You Need To

Here’s a surprisingly deep bonus feature of this architecture.

Suppose a service asks: “Does this user have prod.logs?"

The user has frontier = { prod.restart }. They could answer by revealing their entire frontier. But what if they also have billing.admin and tenant.admin in their frontier, and they don't want to reveal those capabilities to this particular service?

Because our authorization check is ↓R ⊆ ↓G, the proof is simple:

Show that ↓(prod.logs) ⊆ ↓(prod.restart)

The user can reveal *just* prod.restart as the witness. The verifier confirms that yes, prod.restart covers prod.logs and everything it implies. Authorization is proven.

The user’s billing admin powers and tenant admin powers never need to be disclosed. This is called a **minimal witness** — the smallest slice of the frontier that proves the claim.

> ***Why this matters:*** *In real distributed systems, services often need to verify each other’s authority without exposing full permission details. This structure makes that possible by design, not by bolting on extra machinery.*

## The Part Where Reality Fights Back

Okay. The beautiful theory is done. Now let’s talk about why real enterprise systems make this complicated.

## Problem 1: Negative Permissions

Real enterprises sometimes say things like:

> *“This user can restart production, but specifically NOT view logs.”*

Our lattice breaks here. If prod.restart ≥ prod.logs in our hierarchy, then having restart *necessarily* implies logs. That's what "≥" means. You can't have the top without the bottom in a downward closure.

So **negative permissions don’t fit naturally into this model.**

This is actually a feature, not a bug — it forces architects to think carefully before adding “DENY” semantics. Many systems that use “DENY” heavily end up in a maintenance nightmare because deny rules interact with each other in unexpected ways. Our framework is basically nudging you toward cleaner permission design.

When you genuinely need negative permissions (and sometimes you do), they must live as a separate layer on top of the lattice — an orthogonal rule engine that runs after the structural check.

## Problem 2: Separation of Duty

Example: “No one person can both approve AND audit the same invoice.”

This is a **non-monotone constraint** — meaning that *more permissions can make you less authorized* in certain situations. Having both approve-invoices and audit-invoices disqualifies you from doing either for the same document.

Our lattice is fundamentally monotone: more grants always means more authority, never less. So separation-of-duty constraints cannot live inside the permission lattice. They’re a separate concern.

The architecture becomes:

structural lattice (monotone authority)  
+  
constraint engine (separation of duty, time windows, etc.)

Both layers are necessary. They just handle different concerns.

## Problem 3: Context-Dependent Access

Example: “Can restart production, but only during on-call rotation” or “billing access only from the office network.”

Time, location, device trust level, MFA status, approval tickets — none of these are intrinsic to the permission structure. They’re **external attestations** — facts about the world at request time that aren’t baked into the poset.

The right architecture treats these as a separate gate:

structural authority check (↓R ⊆ ↓G)  
AND  
contextual attestation check (is it 2am on a Wednesday? is the user on VPN?)

Separating these is actually one of the strongest design choices in this architecture, because it keeps the structural check fast and the contextual check flexible.

## But Here’s the Thing: Most of Enterprise Auth IS Monotone

After all those caveats, step back and ask: what percentage of real authorization complexity is actually the structural, monotone kind?

A lot of it:

- **Org hierarchy** — managers inherit certain authorities of their teams
- **Tenant ownership** — owning a resource implies read/write/delete access
- **Environment inheritance** — prod access implies staging access implies dev access
- **Service scopes** — admin scope implies read scope implies basic scope
- **Kubernetes namespaces** — namespace admin implies pod management implies pod viewing
- **Cloud resource trees** — project owner implies bucket admin implies object read
- **Operational escalation** — on-call engineer inherits elevated permissions during incident

All of these are naturally expressible as posets. All of them benefit from the lattice model. And these are exactly the cases where RBAC turns into role spaghetti today — because RBAC has no way to express implication, only explicit assignment.

The lattice model is not a replacement for all of authorization. It’s the **canonical model for monotone structural authority** — which turns out to be a huge fraction of what you actually need to express.

## What Changes at Scale (But What Stays the Same)

As systems grow, the representations evolve:

![](https://cdn-images-1.medium.com/max/547/1*7oy3_B78Z2b-Q6WCJZiFlg.png)

But across all of these, the **algebra stays the same.** The authorization check is still ↓R ⊆ ↓G. The frontier is still an antichain. The hierarchy is still a poset. The mathematics is invariant. Only the implementation details evolve.

> ***What’s a Bloom filter?*** *A space-efficient probabilistic data structure. You ask it “is X in this set?” It can say “definitely not” (100% accurate) or “probably yes” (might be wrong). For authorization, a negative answer is a fast early reject. A positive answer triggers the full exact check. It dramatically reduces the number of expensive lookups.*

> ***What’s a Merkle commitment?*** *A cryptographic fingerprint of a sorted list of items. If you take your frontier antichain, sort it alphabetically, and hash the result, you get a Merkle commitment. Two identical frontiers produce the same hash. One changed permission produces a completely different hash. This lets you verify frontier integrity without revealing the contents.*

## The Punchline

After all of this — the poset theory, the downward closures, the antichains, the bitsets, the Bloom filters, the Merkle commitments, the private proofs — you arrive at the authorization check:

↓R ⊆ ↓G

The set of things the action requires must be contained in the set of things the user has.

That’s it. That was always it. Every piece of machinery exists to evaluate this one containment check efficiently, incrementally, privately, and at scale.

The problem is a masterclass in how a simple question — “is this user allowed?” — can expand into an entire systems engineering challenge the moment you attach realistic requirements: large user bases, dynamic permission hierarchies, privacy constraints, audit proofs, and the need for useful error messages instead of bare 403s.

## What This Teaches (That Every Engineer Should Know)

**1. Name your mathematical object first.** The moment you recognize that user permissions form an *order ideal in a poset* rather than just “a set of strings,” you unlock 150 years of mathematical results that tell you exactly how to store, query, and manipulate them efficiently.

**2. Compression follows from structure.** The antichain frontier isn’t a clever hack. It’s the mathematically canonical representation of a downward-closed set. Birkhoff’s theorem guarantees the correspondence is exact and lossless.

**3. “More is less” in permission design.** Every DENY rule, every non-monotone constraint, every context dependency makes your permission model harder to reason about. The lattice model nudges you toward cleaner, simpler permission design by making monotone authority easy and everything else explicit.

**4. Useful denials are an underrated feature.** Most systems say “403 Forbidden” and stop. Knowing the first blocker and the minimal fix grant transforms a frustrating dead end into an actionable remediation. The math to compute this is the same math you’re doing anyway.

**5. Privacy falls out for free.** Because the proof of authorization is just ↓R ⊆ ↓G, you can reveal only the minimal slice of your frontier needed to prove any given check. You don't need extra machinery — the structure gives you witness minimization for free.

## Closing Thought

The cruelest thing about this problem is its modesty. It introduces itself as an access control system. Just permissions. Very relatable. And then, gradually, it reveals that correctly implementing “does this user have permission?” at scale and with correctness guarantees requires you to independently rediscover:

- Posets and partial orders
- Downward closures and order ideals
- Antichain representation of authority frontiers
- Bitset compilation for fast runtime checks
- Bloom filter acceleration
- Merkle commitments for integrity
- Minimal witness generation for private proofs
- Separate constraint engines for non-monotone policies

Any one of these is a solid engineering challenge. Strung together, they form a gauntlet.

The gap between “correct” and “correct AND efficient AND private AND dynamic AND useful on denial” is enormous. And when you finally close that gap, when you’ve built the whole machine, the authorization check is still just:

↓R ⊆ ↓G

The lattice is not the entirety of authorization.  
It is the canonical model for monotone structural authority.

Which, after all this, is kind of beautiful.

*New to some of these terms? Here’s a quick glossary:*

- **Poset**: A set of things where some things are “bigger than” others, but not everything needs to be comparable.
- **Hasse diagram**: A picture of a poset showing only the direct “one step up” connections.
- **Downward closure (↓G)**: All permissions implied by a set of grants, including the grants themselves.
- **Antichain**: A set of permissions where none implies another — no redundancy.
- **Frontier**: The minimal antichain that completely describes a user’s authority.
- **Bitset**: A row of on/off switches (bits) representing set membership. Enables hardware-speed set operations.
- **Bloom filter**: A fast probabilistic check — “definitely not in the set” or “probably in the set.”
- **Merkle commitment**: A cryptographic hash of a sorted list, used to verify integrity.
- **Monotone**: A property where “more grants = more authority, never less.”
- **Separation of duty**: A policy where having multiple related permissions disqualifies you from certain actions.

Hope you enjoyed the article. You can Check out my other articles which are similarly applied math heavy.

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=641f1ccc3137)
