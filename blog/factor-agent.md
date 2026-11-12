---
title: "Agents, Erlang, and the Arithmetic of Invariants"
description: "Agent harnesses are in their CODASYL era: mutable workflow DAGs compensating for lawless state. Like Codd's relational algebra, invariant-preserving harness composition is the substrate shift that scales."
date: "2026-05-20"
author: "Sethurathienam Iyer"
tags: ["distributed systems", "erlang", "agent architecture", "invariants"]
type: "Essay"
materials:
  - label: "Original"
    href: "https://sethuiyer.github.io/factor-agent/"
---

# Agents, Erlang, and the Arithmetic of Invariants

*What primes, OTP, graph cycles, local repair, and information‑flow lattices teach us about building agentic systems that survive scale.*

**The diagnosis.** Ning et al.’s *Code as Agent Harness* survey is right: production agents fail because harnesses lack transactional shared program state and multi-tier permission models. **The trap.** Like CODASYL navigational databases, the industry catalogs ever wilder self‑mutating workflow DAGs when state semantics stay weak. **The thesis.** Your DAG is a symptom. The needed move is Codd’s move: govern the substrate with invariant‑preserving algebra, not smarter graph traversal.

In the previous essay, I argued that primes are one of the rare structures that survive infinity without losing truth. They preserve identity. They decompose hierarchy. They avoid lattice regularity. They exhibit asymptotic control.

That was a mathematical argument. But the same question reappears in engineering under a different mask.

Not:

> What structure survives infinity?

But:

> What architecture survives scale?

### The Diagnosis

Ning et al. name the problem correctly.[45] Modern agents are not failing because the base model is too weak. They are failing because the **agent harness** — the code substrate around the model — lacks two primitives production systems already expect elsewhere: *transactional shared program state* and *multi-tier permissions*.

On state: when planners, coders, testers, and reviewers all read and write overlapping artifacts without declared read sets, write sets, and conflict policies, the harness’s internal belief diverges from ground truth. Ning et al. call the missing abstraction transactional shared program state — synchronization of artifacts is not enough; assumptions must compose lawfully.[45]

On permissions: tools are still invoked too blindly. Future harnesses need capability-based primitives, tiered action classes, and human-in-the-loop gates before high-risk side effects — not policy buried in prompts.[45] The fix is not “be more careful.” The fix is runtime enforcement: every merge checked, every tool call gated, every durable write governed.

### The Trap

The industry heard “multi-agent” and reached for topology. In the survey’s *Objective-driven and Adaptive Topologies* lane, systems mutate collaboration structure on the fly: dynamic DAGs, workflow rewriting, agent pool scaling, objective-driven replanning.[45] EvoMAC, SEW, and cousins add orchestration cleverness when shared state stays implicit.

Ning et al. state the structural point plainly: systems with explicit formal shared substrates use *simpler* topologies; systems without them develop *richer* adaptive topologies as a workaround.[45] That is the trap. When state is lawless, engineers compensate with self-mutating graphs. The DAG gets smarter. The substrate stays vague. Failures move from the model into the orchestration layer.

We have seen this movie before. In the 1960s, databases used navigational and hierarchical models (CODASYL and friends). To query data, developers wrote manual, step-by-step pathways through graphs of pointers. It was brittle. When the graph changed, the queries broke. Topology complexity was a symptom of *lawless data*.

### The Thesis

**Topology complexity is a symptom of lawless state.** We do not need smarter DAGs. We need a harness whose merges, permissions, memory writes, retries, and repairs are governed by invariants the runtime can check — not vibes the model might remember.

That is what this essay supplies underneath harness engineering:

*Problem → invariant (not metaphor)*

```text
Transactional shared state     →  factored harness-state objects X := (i,s,c,q,τ,a)
Multi-tier permissions         →  LCM label join + divisibility clearance
Adaptive topology sprawl       →  OTP supervision + bounded workflow graphs
Retry / delegation storms      →  Ihara cycles, spectral radius ρ(A)
Partial failure                →  local repair (z' = z + kM), not global restart
```

### The CODASYL Era of Agent Systems

In 1970, Edgar F. Codd published *A Relational Model of Data for Large Shared Data Banks*.[46] He did not offer a better pointer system. He brought set theory and first-order logic and said, in effect: stop navigating DAGs. Data is a relation. Queries are algebraic operations on those relations. People hated it at first — too mathematical, surely too slow. Codd was right. Relational algebra gave us SQL, and it conquered the world, because **invariant-preserving algebra scales; ad-hoc traversal graphs do not.**

*Code as Agent Harness* is, in effect, a field guide to the CODASYL era of AI agents.[45] It looks at OpenHands, SWE-Agent, AutoGen, and dozens of kin and documents an industry-wide fascination with complex, self‑mutating workflow DAGs — planner chains, reviewer loops, adaptive topology, runtime self‑reorganization, synchronization layers, retry orchestration. The survey is right to catalog them. The mistake would be to treat that catalog as the destination.

> Modern agent frameworks are still in the navigational-database era.

The parallel is structural, not poetic:

*Database era → agent era*

```text
Navigational DBs (CODASYL)     →  workflow-DAG agent harnesses
Pointer traversal               →  planner / reviewer / executor chains
Manual graph pathways           →  mutable orchestration topologies
Topology-dependent logic        →  harness logic encoded in graph shape
Application compensates         →  prompts + retries + memory patches
Relational algebra (Codd)       →  invariant-preserving harness algebra
SQL + declarative queries       →  lawful composition (LCM, divisibility, repair)
ACID / transactional semantics  →  transactional harness-state + capability tiers
```

Codd’s move was *not* “better graph traversal.” It was: move invariants into the substrate, make operations lawful, make composition declarative, let topology become secondary. The same category of move is needed for agents. Codd did not improve pointer chasing; he replaced it.

> Your DAG is a symptom. Stop mutating the graph. Start governing the state.

Harness state is not a chat log. It is an invariant-bearing object composed under explicit laws — joins that are LCMs, clearances that are divisibility tests, failures that are local repairs, cycles that are spectral facts on the graph you actually run. Topology should be *derived* from state laws, not hand-wired as the primary program.

Primes encode sensitivity. Erlang factorizes execution. Denning composes information flow. Ihara names closed loops on the runtime graph. The survey maps today’s navigational harnesses; this essay is the relational-algebra bet underneath them.

> **Checkpoint · Spine**
>
> **Pause here if the opening felt dense**
>
> - **Diagnosis:** harnesses lack transactional state + tiered permissions (Ning).
> - **Trap:** industry adds mutating DAGs when state is implicit (CODASYL pattern).
> - **Thesis:** govern state with algebra; topology is derived, not primary.
>
> Next: identity and factorization (§02–03), then resonance and repair.

That failure mode is not hypothetical. It is the demo-to-production cliff.

They work beautifully in the demo. One agent. One prompt. One tool call. One happy path.

Then production arrives. Now there are 70 agents. Each has memory. Each calls tools. Each needs permissions. Each can fail halfway through a task. Each can hallucinate. Each can retry. Each can mutate the world.

Suddenly the problem is no longer “how smart is the model?”

The problem is:

> How do you compose unreliable, stateful, effectful workers without losing control?

This is not a new problem. Telecom systems solved a version of it decades ago. The language was Erlang. The architecture was OTP. And the idea was brutally simple:

> Build the system from small isolated processes. Let them communicate by messages. Supervise them. Expect them to fail.

In other words:

> Erlang is prime factorization for computation.

> **Reader Map · This Essay Is Dense on Purpose.** identity → composition → cycles → resonance → failure containment → local repair → capabilities → memory → retrieval → information flow → harness invariants → factored object algebra → executable harness

This is a long, layered essay. It is not meant to be skimmed like a product announcement. If a section feels heavy, the fastest companion shelves are Codd for the substrate-shift precedent[46], Ning et al. on code as agent harness[45], Armstrong for Erlang/OTP[1], Kleppmann for distributed systems[33], Denning for information flow[17], Diffie and Hellman for key agreement[25], and Terras for graph zeta[41]. You do not need to master them first; they are the shelves this essay is pulling from.

The essay moves in that order. First we need identity, so the system can name what exists. Then hierarchy, so it can compose named units. Then non‑lattice structure, so those units do not all fail in sync. Then stability, capabilities, memory, retrieval, and information flow. The math is not decoration; it is a vocabulary for invariants that production systems already need.

## The Agentic Mistake

By “agent” I do not mean only a chat transcript with a loop around it. I mean a production worker that can read state, write state, call tools, retry, remember, and affect other people. Once an agent can do those things, it belongs to distributed systems engineering whether or not the interface looks like a prompt.

Most agent systems begin as a blob. A large model is given a task. It reasons. It calls tools. It remembers things. It decides what to do next.

At small scale, this feels magical. At production scale, it becomes terrifying. Because the agent is doing too many things at once:

*Overloaded agent*

```text
planning
reasoning
retrieval
memory
tool selection
permission interpretation
side-effect execution
error handling
self-correction
```

The failure is not that the model is stupid. The failure is that the runtime boundary is doing no work. If planning, permissions, memory, execution, and recovery are all hidden inside one opaque loop, then the system has no stable place to enforce policy or explain behavior.

This is not intelligence. This is architectural overloading.

A production agent should not be a god-object with API access. It should be one process inside a governed distributed system. The LLM can reason. But the system must decide:

*What the system owns*

```text
what the agent is allowed to see
what tools it can call
what memory it can write
what actions require approval
what failures are retryable
what must be audited
what must never happen
```

The model is not the architecture.

> The architecture is the thing that remains when the model is wrong.

The harness is not the model. The harness is the algebra the runtime must enforce.

> **Constraint 01 · Identity.** No two distinct things should collapse into the same representation. Every actor, message, and effect is addressable.

Once architecture owns the invariants, the first invariant is simple: things that are different must remain distinguishable. Everything else in the essay depends on that. You cannot supervise, audit, authorize, repair, or route what you cannot name.

## In Arithmetic, Then in Erlang

In number theory, primes preserve identity through unique factorization. Every integer decomposes into primes in exactly one way:

\[
360 \;=\; 2^{3} \cdot 3^{2} \cdot 5
\]

*Unique factorization — identity at infinite scale*

That is not a heuristic. That is not a probability. That is identity at infinite scale.

Uniqueness matters because debugging is reverse composition. When something goes wrong, you need to recover the path from effect back to cause. If two causes collapse into the same representation, every later explanation becomes guesswork.

Agentic systems need the same property. Every component must have a stable identity:

*Addressable units*

```text
user_id
tenant_id
request_id
workflow_id
agent_id
tool_call_id
memory_id
approval_id
audit_event_id
```

Without identity, the system cannot answer basic questions:

*Questions without identity*

```text
Which agent made this decision?
Which user authorized this action?
Which document was retrieved?
Which tool call created this Jira ticket?
Which memory influenced this response?
Which approval allowed this Slack message to be sent?
```

If you cannot answer those questions, you do not have a production agentic system. You have a very confident ghost.

Erlang understood this at the process level[2][3]. An Erlang process has an identity. It owns its state. It receives messages. It can be monitored. It can crash. It can be restarted. It is not an invisible thread inside a shared heap of chaos. It is a unit.

That is the first lesson agents should steal from Erlang:

> An agent must be an addressable process, not a vague behavior inside a prompt.

A good agentic architecture should look less like this:

*Anti-pattern*

```text
Big Agent
 ├── memory
 ├── tools
 ├── reasoning
 └── vibes
```

And more like this:

*Addressable decomposition*

```text
Workflow Supervisor
 ├── Orchestrator Process
 ├── Docs Agent Process
 ├── CRM Agent Process
 ├── Memory Service
 ├── Tool Executor
 └── Audit Logger
```

Each process has identity. Each message has identity. Each side effect has identity. This is the computational equivalent of saying: *no two distinct things should collapse into the same representation*. That is identity.

> **Constraint 02 · Hierarchy.** Global behavior emerges from the composition of local irreducibles — supervised, typed, and inspectable.

## Composition of Local Irreducibles

Primes are not just isolated objects. They compose. The entire multiplicative structure of the integers emerges from them. Local irreducible units generate global arithmetic. This is the Euler product idea in architectural form:

\[
\zeta(s) \;=\; \prod_{p \text{ prime}} \frac{1}{1 - p^{-s}}
\]

*Global structure as a product over local irreducibles*

If integers compose by multiplication, systems compose as graphs. Requests move from process to process. Messages traverse edges. Retries form loops. Supervision trees branch. The same question returns in a new shape: what are the irreducible units of the topology?

There is a graph-theoretic echo of the same idea. On a finite directed graph \(G\), closed walks compose. Some loops are powers of shorter ones; the irreducible ones are *prime cycles*. The Ihara zeta function[39] packages every closed-walk count into an Euler product over those prime cycles:

\[
\zeta_G(u) \;=\; \prod_{[C]} \frac{1}{1 - u^{\ell(C)}}
\]

*Ihara zeta — one factor per primitive closed cycle \(C\) of length \(\ell(C)\)*

Hashimoto and Bass showed this is not mere poetry: \(\zeta_G^{-1}\) is a polynomial built from the adjacency matrix.[40] Topology becomes spectrum. A supervision tree, a workflow DAG, a tool-call graph — each is a \(G\). The platform is not only factorized into processes; it has a *cycle structure*, and Ihara zeta is how you name it.

\[
\zeta_G(u)^{-1} \;=\; \det(I - uA)
\]

*Determinant form (adjacency \(A\)) — global zeta from local edge data*

In that discrete setting, congruence invariance plays the role that monodromy invariance plays in topology: after transport around a cycle, the object must return with its governing identity intact. For an agent runtime, that means a message, label, permission, idempotency key, or audit identity should survive a workflow loop without mutation or ambiguity.

A retry loop is the plainest example. The second attempt may run later, on a different worker, after a transient failure. But it must return carrying the same request identity, the same permission context, and the same idempotency key. Otherwise the loop is not recovery; it is a new side effect wearing the old task’s clothes.

Agentic systems need the same decomposition. A complex request should not be executed as one giant prompt loop.

Take a request like:

> “Summarize the latest QBR deck, compare it with Salesforce numbers, identify churn risks, and draft a Slack update.”

A weak agent architecture treats this as a single blob of reasoning. A stronger architecture decomposes it into a workflow:

*Workflow DAG*

```text
Retrieve QBR Deck
        ↓
Summarize Deck
        ↓
Query Salesforce
        ↓
Compare Metrics
        ↓
Identify Risks
        ↓
Draft Slack Update
        ↓
Human Approval
        ↓
Send Slack Message
```

This is a hierarchy. Not a vague hierarchy. A typed one. Each node has:

*Per-node contract*

```text
input schema
output schema
permissions
timeout
retry policy
idempotency key
audit event
failure behavior
```

In Erlang/OTP, this shows up as supervision trees. A supervisor owns child processes. Child processes perform narrow tasks. If a child crashes, the supervisor applies a restart strategy. This is not just a runtime feature. It is an ontology.

OTP says:

> A system should know how it is decomposed.

That is exactly what most agent frameworks lack. They know the prompt. They do not know the factorization. The stronger design is:

*Supervision tree*

```text
Agent Platform Supervisor
 ├── Gateway Supervisor
 ├── Shared Services Supervisor
 │    ├── Policy Engine
 │    ├── Tool Registry
 │    ├── Memory Service
 │    └── Audit Logger
 │
 ├── Workflow Dynamic Supervisor
 │    └── Workflow Supervisor
 │         ├── Orchestrator
 │         ├── Docs Agent
 │         ├── CRM Agent
 │         ├── Data Agent
 │         └── Slack Agent
 │
 └── Background Jobs Supervisor
      ├── Evaluation Worker
      ├── Memory Compactor
      └── Embedding Refresher
```

This is agentic factorization. Each unit can fail locally. Each unit can be replaced. Each unit can be inspected. Each unit can be supervised. That is hierarchy.

> **Constraint 03 · Non‑Lattice Structure.** Avoid building a perfectly regular machine that fails perfectly regularly. Deterministic aperiodicity over rigid grids.

Decomposition alone is not enough. You can split a blob into clean parts and still arrange those parts so they all wake up, retry, compact memory, or hit the same endpoint at the same time. A factored system can still resonate.

> **Checkpoint · §03**
>
> **You just crossed Ihara + OTP**
>
> - Processes are irreducible units; supervision contains failure.
> - Workflow graphs have *prime cycles*; closed walks compose.
> - Hierarchy without cycle awareness still resonates.
>
> Next: why regular schedules synchronize failure (§04).

## Where Resonance Hides

This is the spectral shadow of the trap. When harness state stays implicit, teams add adaptive topologies — mutating DAGs, dynamic delegation, self-reconfiguring agent pools — to paper over missing invariants.[45] Those graphs can look sophisticated while amplifying the same closed loops: synchronized retries, shared evaluators, memory refresh cycles, and queue resonance. Topology complexity without lawful state is harness resonance wearing a planner costume.

The third constraint from the prime essay was non-lattice structure. Lattices are comfortable. They are regular. They are indexable. They repeat. They are also where resonance hides.

In distributed systems, lattice thinking appears everywhere:

*Hidden lattices*

```text
run every job every 5 minutes
shard by user_id % N
retry every 30 seconds
batch all tenants at midnight
assign workers in round-robin order
evaluate every model on the same fixed slice
```

Regularity is convenient until it synchronizes failure. Then you get:

*Synchronized failure*

```text
retry storms
thundering herds
hot shards
cache stampedes
coordinated job spikes
periodic latency cliffs
```

Imagine a tool endpoint returns `503` for ninety seconds. Every agent retries every thirty seconds. The first wave lands at `t+30`, the second at `t+60`, the third at `t+90`, exactly when the service is trying to recover. No agent was malicious. No model made a bad semantic choice. The outage was manufactured by regularity.

This is the systems version of lattice resonance. Agentic systems make this worse because agents multiply side effects. One retry is fine. Ten thousand agents retrying the same failed tool endpoint every 30 seconds is an outage wearing a trench coat.

So production agents need structured irregularity. Not randomness — randomness is hard to debug. But *deterministic aperiodicity* is useful. This is where the spirit of Penrose tilings enters the engineering picture. A Penrose tiling covers the plane without repeating periodically. It has local rules, but no global grid repetition.

That is exactly the kind of pattern we want for scheduling and placement:

*Properties of aperiodic schedules*

```text
deterministic locally
non-repeating globally
debuggable
resistant to synchronization
```

For example, background jobs should not all run on a fixed lattice:

*Lattice schedule (don't)*

```text
00:00 memory compaction
00:00 embedding refresh
00:00 eval batch
00:00 cache warmup
```

That is how systems punch themselves in the face. A better architecture uses deterministic aperiodic offsets:

*Aperiodic offsets*

```text
tenant_1 memory compaction → 03:17
tenant_2 memory compaction → 11:42
tenant_3 memory compaction → 26:05
tenant_4 memory compaction → 44:31
```

The goal is not literal Penrose geometry. The goal is:

> Avoid building a perfectly regular machine that fails perfectly regularly.

Erlang contributes here too. Because Erlang systems are not built around one synchronized global control loop. They are built from independent processes with mailboxes. Each process reacts to messages. Each process can be scheduled independently. Each process can fail independently. The topology is not a rigid grid. It is a living supervised network. That is non-lattice architecture.

But a network still has loops. A fixed retry interval is a clock; on the call graph it is a *closed walk* of fixed length, repeated forever. Ten thousand agents sharing that interval are not ten thousand independent failures — they are one prime cycle, amplified. Ihara zeta is the bookkeeping for those cycles: which loops are primitive, which are powers, how they multiply into global walk counts.[41] The engineering question is spectral: does perturbation die out or resonate?

\[
\rho(A) \;=\; \max_i |\lambda_i| \qquad\text{(spectral radius of the interaction graph)}
\]

*When \(\rho(A)\) is large, small periodic disturbances amplify; when the gap is healthy, they dissipate*

Read \(\rho(A)\) informally as an echo test. If a small disturbance keeps finding high‑gain loops, it comes back louder. If the topology spreads and damps the disturbance, the same failure becomes boring telemetry instead of a platform event.

That is why aperiodic offsets matter. They break exact repetition of the same closed walk. They do not remove cycles from the graph — nothing does — but they prevent the platform from tuning every process to the same resonant frequency. Non-lattice scheduling is the operational cousin of asking for a graph whose Ihara zeta does not concentrate pathology in a few dominant modes.

> **Constraint 04 · Asymptotic Stability.** Failure does not scale into confusion. The system becomes more predictable as it grows, not less.

> **Checkpoint · §04**
>
> **Resonance = topology without lawful state**
>
> - Fixed retries are closed walks; shared intervals amplify outages.
> - Adaptive DAGs are the harness trap in graph form.
> - Watch ρ(A): does disturbance die out or echo?
>
> Next: let it crash, local repair, bounded blast radius (§05).

## Failure Without Confusion

The final constraint is the hardest. A system survives scale only if its error does not grow faster than its control mechanism. Informally:

\[
\limsup_{n \to \infty} \; \frac{\mathcal{E}(n)}{\mathcal{C}(n)} \;\leq\; 1
\]

*Error growth dominated by control growth*

Most agent systems fail this immediately.

At small scale: one agent, one memory store, one tool, one user. Everything is understandable.

At larger scale: hundreds of agents, thousands of tools, millions of memories, billions of retrieved chunks, unbounded workflows, cross-tenant permissions, human approvals, partial failures. Now correctness becomes expensive.

If every new agent increases governance complexity linearly, the platform will eventually collapse under its own coordination cost. Asymptotic stability means the system becomes more predictable as it grows, not less.

Erlang’s answer is supervision. Do not prevent every failure. Contain failure. A process crashes. Its supervisor notices. The restart policy applies. The system continues. This is the famous Erlang idea:

> Let it crash.[1]

But that phrase is often misunderstood. It does not mean “be careless.” It means:

> Design the system so failure is local, observable, and recoverable.

That is exactly what agentic systems need. A CRM agent fails because Salesforce times out.

Bad architecture:

*Confused failure*

```text
The whole agent loop crashes.
The user gets a vague error.
The system loses intermediate state.
A retry may duplicate side effects.
```

Good architecture:

*Contained failure*

```text
CRM node fails.
Retry policy applies.
Independent DAG nodes continue.
Workflow checkpoint is preserved.
Duplicate writes are prevented by idempotency keys.
Audit log records the failure.
User receives partial progress.
```

There is one more requirement: repair should be local. A failed node should not force the platform to recompute the whole workflow, rewrite every memory, or reshuffle every already‑valid assignment. In the companion lock‑preserving repair experiments[42], the arithmetic form is deliberately simple:

\[
z' \;=\; z + kM
\]

*Repair jump: move to a new state while preserving locked commitments encoded in \(M\)*

Here \(M\) is the product of commitments that must not change. Choosing \(k\) correctly lets the system alter one disturbed residue while every locked residue remains congruent to its previous value. Engineering translation: the repair radius is the blast radius. A good agent runtime should be able to say not only *what failed*, but *which commitments were preserved*, *which ones moved*, and *how far the repair propagated*.

In the CRM example, the failed Salesforce call should not invalidate the documents already retrieved, the human approval already granted, or the draft already checkpointed. The repair should touch the CRM node and the dependent comparison step, not the entire workflow. That is what local repair buys: continuity without pretending nothing happened.

That is asymptotic stability. Not “nothing fails.” Something much better:

> Failure does not scale into confusion.

This is where production agent systems need OTP more than they need another prompt template.

If failure needs local boundaries, side effects need them even more. A read error can be retried. A duplicated customer email, payment, deletion, or support ticket cannot be hand‑waved away. The next boundary is therefore not intelligence; it is capability.

## Tools Are Capabilities, Not Functions

The most dangerous word in agent frameworks is “tool.” It sounds harmless. A tool sounds like a function.

*Looks like a function*

```text
search_docs()
query_salesforce()
send_slack_message()
create_jira_ticket()
```

But these are not just functions. They are *capabilities*. Some tools read data. Some tools mutate the world. Some tools contact customers. Some tools spend money. Some tools create compliance risk.

A sales assistant should be allowed to draft a renewal note. It should not automatically update the CRM stage, create a discount approval, email procurement, and notify finance because a prompt inferred urgency. In SaaS, “tool use” is rarely just computation. It is workflow mutation with money, compliance, and customer trust attached.

An agent should not “have tools” in the casual sense. It should be granted capabilities under policy[23][24]. Ning et al. survey the same gap from the harness side: current systems invoke tools too blindly, and future harnesses need multi-tier permission models, capability-based primitives, and human-in-the-loop gates before risky side effects execute.[45] A production harness needs a tool registry that behaves like a capability registry:

*Capability schema*

```text
ToolCapability {
  name
  allowed_agents
  required_user_permission
  input_schema
  output_schema
  risk_level
  timeout
  retry_policy
  approval_required
}
```

The agent does not call Salesforce directly. It sends a message:

*Capability request*

```text
I request capability: query_salesforce_account
with user_ctx: X
for account_id: Y
```

Then the system checks:

*Policy gate*

```text
Is this tool approved?
Is this agent allowed to request it?
Is this user allowed to access that account?
Is this tenant boundary respected?
Is human approval required?
Is the input valid?
Is the action idempotent?
```

Only then does the tool executor run.

This is very Erlang in spirit. Processes communicate by messages. They do not reach into each other’s memory. They do not mutate the world invisibly. A tool call should be a supervised message to a controlled process. Not a spontaneous side effect from a language model.

## Memory Is State, and State Must Be Governed

Agent memory is usually discussed as if it were a magical notebook. It is not. Memory is state. And state is where systems go to die quietly.

There are at least four kinds of memory in an agentic platform:

*Four memories*

```text
session memory
workflow memory
agent-local working memory
durable user/team memory
```

These should not be treated the same. An Erlang-style design separates them naturally. The orchestrator process can own workflow-local memory:

*Workflow memory*

```text
current DAG state
partial results
retrieved documents
tool outputs
pending approvals
```

A sub-agent can own ephemeral working memory:

*Working memory*

```text
current task context
temporary reasoning state
local cache
```

But durable memory should go through a centralized governed service:

*Durable write path*

```text
Agent
 ↓
Memory Service
 ↓
Policy Engine
 ↓
Storage
 ↓
Audit Log
```

A bad durable write is not just bad data. It becomes future context. If an agent stores “Acme approved the discount” without a source, permission, expiry, and audit trail, that sentence can be retrieved weeks later as if it were fact. Memory bugs are time‑delayed side effects.

One bad memory write can quietly poison a quarter. A support agent summarizes a call, misreads “pending legal review” as “approved by legal,” and stores the sentence in team memory. Two weeks later a sales agent retrieves it, drafts an order form, and the approval appears to have provenance because it came from memory. The original mistake has become institutional state.

Why? Because durable memory has consequences. It can leak permissions. It can preserve bad assumptions. It can become stale. It can bias future workflows. It can violate deletion requirements. It can cross tenant boundaries.

Ning et al. name this the *implicit harness-state* failure: when multiple agents, or the same agent over time, write to memory without a formal substrate, the harness’s internal belief diverges from ground truth. Their proposed fix is *transactional shared program state* — reads, writes, and conflict policies declared explicitly rather than smuggled through prompts.[45] Ultrametric repair distance and governed durable writes are one way to supply that substrate without collapsing memory into an undifferentiated vector store.

The rule should be simple:

> Agents may hold temporary state. Durable memory writes require governance.

This mirrors the deeper prime-like principle:

> Irreducible units are allowed to compose, but composition must be lossless, inspectable, and reversible where required.

Durable memory also needs a distance function. Vector similarity asks which memories are semantically nearby. That is useful, but it is not the same as asking which memories preserve the deepest commitment structure. An ultrametric memory layer ranks memories by preserved hierarchy: user identity, tenant boundary, active workflow, prior commitments, then surface tokens.[42]

\[
d_R(M, M') \;=\; \alpha^{-v_R(M,M')}
\]

*Repair distance: closer memories preserve deeper commitment layers*

For example: user identity is deeper than trip context; trip context is deeper than the current restaurant recommendation task; the task is deeper than a surface phrase like “Thai food.” A good memory system should know that changing cuisine preference is a shallow update, while changing allergy information or tenant identity is not.

The important number is \(v_R\): how many layers survived unchanged. A memory update that changes a restaurant preference but preserves user identity, travel context, and workflow role is shallow repair. A memory update that mutates identity or tenant scope is deep repair and should trigger stronger governance.

If a system cannot explain why it remembers something, it should not remember it.

> **Checkpoint · §05–07**
>
> **Stability, capabilities, memory**
>
> - Let it crash; repair locally (`z' = z + kM`).
> - Tools are capabilities under policy, not raw functions.
> - Durable memory is governed state, not chat history.
>
> Next: retrieval must intersect structure before semantics (§08).

## Retrieval Needs Identity Before Intelligence

Modern agentic systems rely heavily on retrieval. Vector stores are useful. Embeddings are useful. Semantic search is useful. But retrieval is not just a relevance problem. In enterprise systems, retrieval is a permission problem first.

The user asks: *“Summarize Acme’s renewal risk.”*

The system may find semantically relevant documents. But semantic relevance does not imply authorization.

A concrete failure looks boring. The model retrieves public earnings-call notes, an internal churn score, a private Salesforce field, and a Slack thread containing PII. The generated sentence says only: “Acme is at elevated renewal risk.” It sounds harmless, but the answer is now a composition of public, confidential, customer, and PII-bearing factors. If it is sent to an external model or logged into a low-trust analytics sink, the leak already happened.

The retrieval stack should look like this:

*Retrieval pipeline*

```text
Vector search finds candidates
Keyword search finds exact matches
ACL filter removes unauthorized documents
Freshness filter removes stale documents
Ranker selects final context
LLM receives only allowed chunks
```

This is where structures like Roaring bitmaps matter[35]. A document can be represented by an integer ID. Permissions become compressed sets:

*Compressed permission sets*

```text
user_accessible_docs
tenant_docs
source_docs
recent_docs
project_docs
```

Retrieval becomes fast set intersection:

\[
\text{safe\_context} \;=\; S_{\text{sem}} \,\cap\, D_{\text{user}} \,\cap\, D_{\text{tenant}} \,\cap\, F_{\text{fresh}}
\]

*Bounded composition over identified sets*

Roaring bitmaps are the sparse structural side of this system. They preserve gigantic membership relations without forcing the platform to pay dense costs: which documents a user may see, which memories belong to a tenant, which workflow outputs remain in scope, which audit events attach to a request. The container strategy — arrays for sparse chunks, bitmaps for dense chunks, runs for long intervals — is an adaptive topology for permission space.

But the ranker should not stop at semantic score. A production RAG system needs a second pass for *structural compatibility*. Embeddings are good at broad recall; ultrametric reranking is good at preserving the hierarchy that matters: same tenant, same role, same workflow phase, same policy regime, same dependency topology. The query “deploy canary, monitor, rollback on failure” should retrieve plans with the same causal shape, not just documents containing the words deploy, monitor, and rollback.

*Hybrid retrieval rule*

```text
semantic search      → broad candidate recall
permission filters   → remove impossible context
ultrametric rerank   → prefer deepest preserved structure
final context        → relevant, allowed, structurally compatible
```

The important part is *timing*. Unauthorized data must be filtered *before* it enters the model context. Not after. Post-filtering the final answer is too late — the system already exposed the data internally.

That is identity and hierarchy again. Each document has identity. Each permission scope has identity. The final context is a controlled composition. No collisions. No accidental blending. No unauthorized memory ghosts.

Retrieval safety is therefore one instance of a larger information‑flow problem. Once data is allowed to compose, the system must preserve the constraints carried by every input. That is where security stops being a perimeter check and becomes algebra.

Arithmetic Security Architecture — major section

> **Section 09 / Interlude · Arithmetic Security Architecture.** An older problem returns: Denning's information‑flow lattice, made executable as squarefree integer arithmetic. Composition becomes LCM. Clearance becomes divisibility. Declassification becomes exact factor removal under proof.

## An Older Problem, Newly Executable

There is an older name for this problem. In information‑flow security, Dorothy Denning’s 1976 lattice model[17][19] says that security labels form an ordered structure. When two pieces of information combine, the result must inherit the least upper bound of their sensitivities.

In plain English:

> If public data mixes with confidential data, the result is confidential.

This is the high‑water‑mark rule. The composed object rises to the sensitivity of its most constrained inputs.

Agentic RAG systems rediscover this immediately. A user asks:

> “Compare our internal churn data with public market benchmarks.”

That query is not purely public. It is not purely private. It is a composition. So the system needs to preserve the sensitivity of every information factor through the whole computation. This is where prime encoding stops being a metaphor and becomes representation.

The compliance nightmare is not usually a dramatic exfiltration. It is a helpful answer routed to the wrong place. A renewal summary gets posted in a shared channel because the final text does not visibly contain an SSN, even though the model used an internal PII-bearing note to produce it. The leak is in the dependency chain, not in the surface words.

Assign each atomic policy label a distinct prime:

*Prime label catalog*

```text
public        = 2
confidential  = 3
pii           = 5
finance       = 7
eu_region     = 11
customer_data = 13
```

Then encode a sensitivity label set as a *squarefree integer* — a product of distinct primes, one per label. That squarefree condition is the load‑bearing invariant.

There is no such thing as \(\text{confidential}^{2}\). A document is either confidential or it is not. The exponent does not mean “more confidential.” If exponents ever appear, the semantics have already rotted.

So:

\[
\text{confidential} \,\cdot\, \text{pii} \;=\; 3 \cdot 5 \;=\; 15
\]

*Label set encoded as a squarefree product*

The dot is not ordinary multiplication of quantities. It means: *this object carries the label set \(\{\text{confidential},\, \text{pii}\}\)*.

### The Isomorphism

Under this squarefree restriction, the divisor lattice of these integers is order‑isomorphic to the Boolean lattice of label sets:

\[
\bigl(\, \mathbb{N}_{\text{sqfree}},\; \mathrm{lcm},\; \gcd,\; \mid \,\bigr) \;\;\cong\;\; \bigl(\, 2^{L},\; \cup,\; \cap,\; \subseteq \,\bigr)
\]

*An actual isomorphism — not analogy, not “spirit of”*

That is the precise claim. Every operation lands:

| | Arithmetic | Lattice | Bitwise |
|---|---|---|---|
| Join | lcm(A, B) | union of labels | A \| B (OR) |
| Meet | gcd(A, B) | intersection of labels | A & B (AND) |
| Order | A \| B (divides) | subset containment | A & B == A |

So if:

*Two labeled objects*

```text
A = confidential × pii      = 3 × 5  = 15
B = finance × eu_region     = 7 × 11 = 77
```

then the sensitivity of their composition is:

\[
\mathrm{Sens}(A \oplus B) \;=\; \mathrm{lcm}(15,\, 77) \;=\; 3 \cdot 5 \cdot 7 \cdot 11
\]

*Lattice join, expressed as LCM*

The operation is *LCM*, not ordinary multiplication. The two only coincide when the label sets are disjoint. Cross‑document composition is not \(A \cdot B\); it is \(\mathrm{lcm}(A, B)\). That distinction matters — it’s the difference between correct semantics and a class of subtle bugs.

### Clearance Is Divisibility

A runtime, tool, or agent capability is also encoded as a squarefree product of the labels it is allowed to handle:

*Runtime capabilities*

```text
external_llm_capability    = public = 2

on_prem_runtime_capability = confidential × pii × finance × eu_region × customer_data
                           = 3 × 5 × 7 × 11 × 13
```

A runtime can process an object only if the object’s sensitivity divides the runtime’s capability:

\[
\mathrm{allowed}(R,\, O) \;\;\iff\;\; \mathrm{Sens}(O) \,\Big|\, \mathrm{Cap}(R)
\]

*Clearance as a divisibility check*

So \(\mathrm{Cap}(\text{external\_llm}) \bmod \mathrm{Sens}(\text{conf} \cdot \text{pii}) \neq 0\) → denied. But \(\mathrm{Cap}(\text{on\_prem}) \bmod \mathrm{Sens}(\text{conf} \cdot \text{pii}) = 0\) → allowed. That is not vibes‑based routing. That is exact containment.

Diffie‑Hellman belongs one layer below this policy model.[25] The label lattice decides whether two principals are allowed to share a context; key agreement is one way they can derive the cryptographic material for that context without exposing it on the wire. Divisibility answers *may this runtime know it?* Diffie‑Hellman answers *can these parties establish the secret needed to read it?* The two layers should reinforce each other, not pretend to be the same thing.

ChaCha lives in the same lower layer as fast secure state evolution.[26] Its quarter‑rounds are local, invertible, diffusion‑heavy, cache‑friendly, and streamable. That makes an interesting contrast with Roaring bitmaps: Roaring preserves sparse structure so permissions remain distinguishable; ChaCha destroys exploitable structure so session material becomes unpredictable. One optimizes set algebra. The other optimizes entropy diffusion.

*Structure and diffusion stack*

```text
Prime labels         → semantic invariants
Roaring bitmaps      → scalable sparse realization
ChaCha streams       → secure dynamic propagation
OTP supervision      → local fault containment
Ihara cycles         → topology of recurrence
```

### Why Bitsets Are Not Just Similar

In production, you probably would not store label catalogs as giant prime products. The primorial of the first 200 primes is enormous — around \(10^{530}\). A 200‑label bitset is 200 bits, or 25 bytes. The bigint arithmetic is what you pay for the conceptual clarity.

So the practical implementation is almost certainly bitsets, Roaring bitmaps, or policy‑engine label sets. But the important point is that bitsets are not merely “similar” to the prime encoding.

> They are the same lattice in different notation.

The prime encoding is pedagogically powerful because it turns abstract lattice operations into familiar arithmetic. The bitset version is what you deploy. The prime version is what helps people finally see the structure.

### OLAP Was Already Doing This

Database systems have lived with a sibling of this structure for decades. OLAP cubes, star schemas, bitmap indexes, cuboids, and `GROUP BY` lattices are all ways of navigating factored discrete dimensions efficiently.[43][44] A fact table row is not just a record. It is a point in a product of dimensions: region, quarter, product, segment, channel, tenant, and time.

Assign each dimension a distinct prime, and a cuboid gets a canonical squarefree name:

\[
\mathrm{cuboid}(D) \;=\; \prod_{d \in D} p_d
\]

*A cuboid as a squarefree product of dimensions*

Then the OLAP lattice lands in the same arithmetic:

\[
D_1 \subseteq D_2 \;\;\iff\;\; \mathrm{cuboid}(D_1) \mid \mathrm{cuboid}(D_2)
\]

*Aggregation compatibility as divisibility*

*OLAP lattice arithmetic*

```text
drilldown          = multiply by a dimension prime
rollup             = divide by a dimension prime
shared dimensions  = gcd(A, B)
combined slice     = lcm(A, B)
compatible rollup  = divisibility
```

For example, \(\mathrm{Sales}(\text{region}, \text{quarter}, \text{product})\) carries \(2 \cdot 3 \cdot 5 = 30\). \(\mathrm{Sales}(\text{region}, \text{quarter})\) carries \(2 \cdot 3 = 6\). Since \(6 \mid 30\), the detailed cuboid can roll up into the coarser one without changing semantic axes. Database people call this aggregation. The algebra says factor removal under a lawful projection.

### The General Object Algebra

At this point the pattern is bigger than security labels. A production object is not a blob; it is a factored tuple:

\[
X := (i,\; s,\; c,\; q,\; \tau,\; a)
\]

*identity, sensitivity, capability, quantity, topology, audit provenance*

Composition should respect each coordinate instead of flattening them into prose. Identities compose into traceable compound identity. Sensitivities join by LCM. Capability requirements join by LCM. Quantity or risk mass accumulates. Topological position composes along the workflow graph. Audit provenance hashes forward.

\[
X \otimes Y =
\bigl(i_X \oplus i_Y,\; \mathrm{lcm}(s_X,s_Y),\; \mathrm{lcm}(c_X,c_Y),\; q_X + q_Y,\; \tau_X \circ \tau_Y,\; H(a_X \Vert a_Y)\bigr)
\]

*Lawful composition over factored production objects*

This is where this essay has to point outward. OLAP cuboids, bitmap indexes, permission lattices, cryptographic stream state, workflow topology, and audit chains all suggest a more general algebra of factored objects. That deserves its own essay. For now, the important point is narrower: agent systems should not collapse these coordinates into one string of context and hope the model remembers the laws.

### Declassification Is Exact Factor Removal — Sometimes

Prime encoding gives a clean model for one kind of declassification. Suppose raw data carries:

*Before transformation*

```text
raw_data = confidential × pii × customer_data
         = 3 × 5 × 13
```

A verified anonymization process claims to remove PII. Then:

\[
\mathrm{declassified} \;=\; \frac{\mathrm{raw\_data}}{\,\mathrm{pii}\,} \;=\; \frac{3 \cdot 5 \cdot 13}{5} \;=\; 3 \cdot 13
\]

*Declassification as exact factor removal*

This is valid only if \(\mathrm{raw\_data} \bmod \mathrm{pii} = 0\), and only if the transformation is approved, audited, and tied to a proof artifact. So the system records:

*Audited declassification record*

```text
before_sensitivity
transformation_id
removed_factor
proof_or_policy_reference
after_sensitivity
approver
audit_event
```

No magic downgrade. No “trust me bro” masking. No vibes‑based declassification.

But this division model only handles *absolute declassification* — the label is gone for everyone, forever, after a verified transformation. Real systems often need *relational declassification*:

*Conditional regimes*

```text
PII to marketing, aggregate-safe to research
confidential until 2030, public afterward
shareable in region A, forbidden in region B
visible to this tenant, invisible to that tenant
```

Those are not simple factor removals. They depend on receiver, time, purpose, jurisdiction, or context. That requires a richer model — closer to receiver‑labeled policies such as Myers and Liskov’s Decentralized Label Model[20]. Prime divisibility gives the clean base lattice. It does not solve every policy regime alone.

### Confidentiality Is Only One Lattice

There is another scope boundary worth stating. This section is about *confidentiality*: preventing high‑sensitivity information from flowing into lower‑trust sinks. But information‑flow systems also care about *integrity*.

Confidentiality asks: *can secret data flow downward?* Integrity asks: *can low‑trust data flow upward into high‑trust decisions?*

A public web page may be low‑confidentiality but also low‑integrity. You may be allowed to read it, but not allowed to let it directly update a financial forecast, compliance report, or customer‑facing action without verification.

So a complete label is better modeled as a pair:

\[
\mathrm{Label} \;=\; \bigl(\, \mathrm{Conf}_{\text{prod}},\; \mathrm{Integ}_{\text{prod}} \,\bigr)
\]

*Two lattices, same algebraic discipline*

For hybrid RAG, that means public data is not automatically “safe.” It may be safe to send outward, but unsafe to trust inward. A public source can poison an internal workflow through prompt injection, stale data, or malicious content. So the architecture needs both:

*Two flow directions*

```text
confidentiality controls
  → what data may leave

integrity controls
  → what data may influence
```

Different lattices. Different failures. Same algebraic discipline.

### Quantity Still Needs Another Layer

The prime model captures label presence. It does not capture quantity. One customer record and ten thousand customer records both carry \(\text{customer\_data} \cdot \text{pii}\) — but they do not carry the same risk.

Quantity matters for k‑anonymity, re‑identification risk, breach‑notification thresholds, aggregation safety, differential‑privacy budgets, and bulk export controls. So the full risk model needs three orthogonal axes:

\[
\mathrm{risk} \;=\; f\bigl(\, \mathrm{labels}_{\text{sqfree}},\; \mathrm{quantity},\; \mathrm{receiver},\; \mathrm{purpose},\; \mathrm{context} \,\bigr)
\]

*Type, magnitude, and context — layered, not collapsed*

Prime encoding handles irreducible label identity. It intentionally flattens quantity. That is a feature for the label lattice, but a limit for risk modeling.

### The Production RAG Rule

Now the hybrid RAG architecture becomes precise. Every retrieved chunk, intermediate summary, model call, tool output, and generated answer carries a sensitivity product. Composition uses LCM. Routing uses divisibility. Declassification uses audited exact factor removal when valid. Implementation almost certainly uses bitsets.

So the architecture becomes:

*Hybrid RAG with arithmetic security*

```text
User Query
 ↓
Query Factorizer
 ↓
Sensitivity Labeler
 ↓
Public Retrieval Path  +  Internal Retrieval Path
 ↓
LCM Join of Sensitivities
 ↓
Policy Engine
 ↓
Allowed Runtime Selection
 ↓
On-Prem Synthesis  if confidential factors exist
 ↓
Output Guardrails
 ↓
Audit Log
```

If confidential information participates in the composition, the composed answer inherits that factor:

\[
\text{public} \,\oplus\, \text{confidential} \;=\; \text{confidential}
\]

*Not a policy preference — the lattice law*

Prime encoding just makes the law executable enough to wire into routing.

> Agentic systems leak information not because they cannot reason, but because they compose context without preserving the algebra of its constraints.

Arithmetic security architecture fixes that specific failure class: every sensitivity is a squarefree factor set, every composition is an LCM, every clearance check is divisibility, and every declassification must prove the exact factor it removed.

> **Checkpoint · §09**
>
> **Arithmetic security + OLAP lattice**
>
> - Join = LCM; clearance = divisibility; declass = factor removal.
> - Roaring preserves structure; ChaCha diffuses secrets.
> - Cuboids are squarefree products; rollups are divisibility.
>
> Next: production harness topology + invariant layers (§10).

## The Real Agentic Architecture

If we put all of this together, a production-grade agentic system should not look like a giant brain. It should look like an OTP system:

*Production topology*

```text
Agent Platform Supervisor
 ├── Gateway
 ├── Auth Service
 ├── Policy Engine
 ├── Workflow Supervisor
 │    ├── Orchestrator
 │    ├── Docs Agent
 │    ├── CRM Agent
 │    ├── Data Agent
 │    └── Slack Agent
 │
 ├── Tool Registry
 ├── Tool Executor Pools
 ├── Memory Service
 ├── Retrieval Service
 ├── ACL Bitmap Service
 ├── Human Approval Service
 ├── Audit Logger
 └── Evaluation Workers
```

Every request becomes a workflow. Every workflow becomes a supervised process tree. Every sub-agent is a bounded worker. Every tool is a capability. Every side effect is audited. Every risky action can be suspended for approval. Every failure is local, typed, and recoverable.

That is not less agentic.

> That is what makes agency safe enough to matter.

## Invariant Layers for Agent Harnesses

Ning et al. organize harness engineering into interface, mechanism, and multi-agent scaling layers.[45] This essay adds a fourth layer underneath all three: *invariant structure* — the same move Codd made beneath navigational databases.[46] See The CODASYL Era of Agent Systems. The harness interface can be elegant. The planning loop can be clever. If composition does not preserve identity, sensitivity, topology, and provenance, scale will still break the system.

The mapping is direct. Each open harness problem has a practice the industry already uses — and an invariant this essay argues should be enforced by the runtime, not hoped for in the prompt:

*Harness problem → invariant layer*

```text
Harness problem              Current practice                 Invariant layer
─────────────────────────────────────────────────────────────────────────────────
Multi-agent orchestration    planner / coder / reviewer       OTP supervision topology
Permissioning                tool ACLs, RBAC strings          prime divisibility lattice
Memory & shared state        vector stores, chat history      ultrametric repair geometry
Workflow retries             fixed backoff, jitter heuristics   spectral cycle damping (ρ)
Shared composition           context concat, blackboards        factor-preserving LCM joins
Verification                 eval harnesses, unit tests       executable divisibility checks
```

Notice what this table does *not* claim. It does not say primes are a metaphor for agents. It says squarefree encodings, LCM joins, and divisibility checks are *operational semantics* — the same way a type system is not a metaphor for integers. When two harness artifacts merge, sensitivity must join by \(\mathrm{lcm}\), not by string concatenation. When a runtime authorizes a tool call, clearance must be \(\mathrm{rem}(\mathrm{cap}, \mathrm{sens}) = 0\), not a model’s guess. When a workflow step fails, repair radius should equal blast radius, not platform-wide restart.

Harness-state objects make this concrete. Every durable artifact in a production harness — a workflow step, a retrieved chunk, a tool result, an audit event — should carry factored coordinates rather than collapsing into prose:

\[
X := (i,\; s,\; c,\; q,\; \tau,\; a)
\]

*identity, sensitivity, capability, quantity, topology, audit provenance*

Composition is then a harness transition, not a chat append:

\[
X \otimes Y =
\bigl(i_X \oplus i_Y,\; \mathrm{lcm}(s_X,s_Y),\; \mathrm{lcm}(c_X,c_Y),\; q_X + q_Y,\; \tau_X \circ \tau_Y,\; H(a_X \Vert a_Y)\bigr)
\]

*Lawful merge over harness-state objects*

The full algebra of factored objects deserves its own essay. For harness engineering, the immediate lesson is narrower: **do not let the LLM be the only place where invariants live.** The harness runtime must enforce them on every merge, every tool call, every memory write, and every retry.

> **Checkpoint · §10a**
>
> **Harness invariants mapped**
>
> - Every harness problem has a runtime invariant, not a prompt fix.
> - `X := (i,s,c,q,τ,a)`; merge = LCM + provenance hash.
> - CODASYL → relational move: govern state, derive topology.
>
> Next: six-pillar bridge, then executable proof (§11–12).

## The Prime–Erlang Bridge

Now the connection becomes visible. Primes are irreducible units of arithmetic. Erlang processes are irreducible units of computation. Denning labels are irreducible units of information flow. SOLID responsibilities are irreducible units of software design. CAP replicas are irreducible units of distributed state. Prime cycles on the runtime graph are irreducible units of closed behavior. All six are trying to solve the same abstraction problem:

> How do you build large, complex, potentially infinite behavior from small units that preserve identity under composition?

| | Primes | Erlang[1] | Denning[17] | SOLID[27] | CAP[16] | Ihara[39] |
|---|---|---|---|---|---|---|
| Unit | prime | process | label atom | responsibility | replica | prime cycle |
| Composition | multiplication | messages + supervision | lattice join (LCM) | typed interfaces | replication under partition | closed-walk concatenation |
| Global structure | integers | distributed system | flow lattice | maintainable software | distributed datastore | graph zeta \(\zeta_G\) |
| Guarantee | unique factorization | fault isolation | non-leaky composition | substitutability under change | explicit tradeoff under partition | cycles readable in spectrum |

This is why the analogy matters. Not because agent systems literally run on prime numbers. Not because Erlang is secretly number theory. Every column above describes the same shape: irreducible units, lawful composition, preserved invariants.

Every durable engineering principle in this essay is a constraint on lawful composition. Primes constrain how integers compose. OTP constrains how processes compose. Denning constrains how labels compose. SOLID constrains how modules compose. CAP names what cannot compose under partition. Ihara zeta names how closed loops accumulate on the topology you actually run. Different battlefields, same problem: *how do local truths survive global assembly?*

OLAP cuboids belong in the same family, even though the vocabulary comes from databases instead of distributed runtimes. They are factored dimensions, lawful rollups, sparse set realization, and aggregation lattices. The next essay will pull on that thread directly: what happens when every agent object is treated as a factored coordinate with identity, sensitivity, quantity, topology, and provenance?

> Systems that survive scale are built from units that cannot be confused with each other.

FactorAgent — runnable artifact

> **Section 12 / Artifact · FactorAgent.** A minimal invariant-preserving harness runtime. Elixir, OTP, prime labels, LCM composition, divisibility clearance, audit log — the smallest legit version of everything above. The abstraction holds if the abstraction compiles.

## A Hundred Lines of Arithmetic Security

Everything above is a claim. This section is a proof — or at least the smallest non‑trivial executable artifact the claim can be reduced to. The language is Elixir, because OTP is the runtime the essay has been pointing at the whole time, and Elixir is the friendliest dialect of it. The system is called *FactorAgent*. It is not a toy chatbot. It is a tiny governed agent runtime that the essay's prose can stand on. **Runnable source:** `artifacts/factor_agent/` (with `lattice_lab.py` and `harness_compose.py` for the algebra slices).

A companion research repository, [Geometry of Conditional Logic](https://github.com/sethuiyer/geometry-of-conditional-logic), explores the adjacent repair problem: how to preserve locked commitments exactly while repairing only the disturbed part of a structured discrete system.[42] FactorAgent uses the smaller security slice of that idea. The broader lesson is the same: state changes should be local, auditable, rollbackable, and governed by invariants rather than vibes.

The minimum it has to prove:

*Must demonstrate*

```text
Agents are supervised workers
Tools are capabilities, not direct functions
Data carries squarefree sensitivity labels
Composition uses LCM
Runtime and tool access use divisibility
Every action emits an audit event
```

> **Checkpoint · §12**
>
> **The essay compiles here**
>
> - FactorAgent = minimal invariant-preserving harness runtime.
> - Denial is `rem(cap, sens) ≠ 0`, not model judgment.
> - Run: `cd artifacts/factor_agent && mix run -e "FactorAgent.Demo.run()"`
>
> Skim the Elixir below, or run the artifact and read the audit trace.

### Architecture

One OTP application, one top‑level supervisor, a flat set of named GenServers. No clever metaprogramming. Easy to read; easy to crash; easy to restart:

*Supervision tree*

```text
FactorAgent.Application
 └── Supervisor
      ├── AuditLog
      ├── PolicyEngine
      ├── ToolRegistry
      ├── MemoryService
      ├── Orchestrator
      └── AgentSupervisor
           ├── DocsAgent
           ├── PublicAgent
           └── SynthesisAgent
```

### Prime Labels

The label catalog is a single module. Every policy atom is a distinct prime; the empty label set encodes to `1`, which makes *public* the lattice identity by construction — any runtime divides `1`, so public information flows everywhere without special‑casing. `join/2` is LCM. `allowed?/2` is divisibility. `remove_factor/2` is exact division with an existence check — declassification under proof.

*lib/factor_agent/labels.ex*

```elixir
defmodule FactorAgent.Labels do
  @labels %{
    confidential:  3,
    pii:           5,
    finance:       7,
    eu_region:    11,
    customer_data: 13
  }

  # Empty label set → 1 (lattice identity, "public")
  def encode([]),     do: 1
  def encode(labels), do:
    labels
    |> Enum.uniq()
    |> Enum.map(&Map.fetch!(@labels, &1))
    |> Enum.product()

  # Lattice join over squarefree integers = LCM
  def join(a, b), do: div(a * b, Integer.gcd(a, b))

  # Object's sensitivity must divide the runtime's capability
  def allowed?(object_sensitivity, runtime_capability) do
    rem(runtime_capability, object_sensitivity) == 0
  end

  # Exact factor removal — only valid if the factor is present
  def remove_factor(sensitivity, label) do
    factor = Map.fetch!(@labels, label)
    if rem(sensitivity, factor) == 0 do
      {:ok, div(sensitivity, factor)}
    else
      {:error, :factor_not_present}
    end
  end
end
```

Two notes on this. First, `:public` is intentionally not in the catalog. The essay frames public as the absence of restrictions, not a restriction of its own; the bottom of the lattice, not an element peer to confidential. Encoding it as `1` makes that exact: a public chunk has sensitivity `1`, every runtime capability is divisible by `1`, public information flows everywhere by construction. Second, the catalog is also missing an integrity dimension — a complete label is really `(Conf_prod, Integ_prod)`. The minimum demo handles only confidentiality; `// TODO: integrity lattice` is left as a marker, not waved away.

### Tool Registry

Tools are not function pointers. They are *capabilities*: a name, an owning agent, a capability product, a risk class. The registry is defined as a function rather than a module attribute so the label encodings happen at call time — a clean dependency rule that avoids compile‑time ordering surprises.

*lib/factor_agent/tool_registry.ex*

```elixir
defmodule FactorAgent.ToolRegistry do
  use GenServer
  alias FactorAgent.Labels

  def start_link(_), do: GenServer.start_link(__MODULE__, nil, name: __MODULE__)

  def init(_), do: {:ok, tools()}

  def get(tool), do: GenServer.call(__MODULE__, {:get, tool})

  def handle_call({:get, tool}, _from, tools) do
    {:reply, Map.fetch(tools, tool), tools}
  end

  defp tools do
    %{
      public_search: %{
        agent:      :public_agent,
        capability: Labels.encode([]),                     # 1 — flows anywhere
        risk:       :low
      },
      internal_docs_search: %{
        agent:      :docs_agent,
        capability: Labels.encode([:confidential, :customer_data]),
        risk:       :medium
      },
      synthesize_answer: %{
        agent:      :synthesis_agent,
        capability: Labels.encode([
          :confidential, :pii, :finance, :eu_region, :customer_data
        ]),
        risk:       :medium
      }
    }
  end
end
```

### Audit Log

Every meaningful action in the system emits one event. The audit log is a process that prepends to an in‑memory list and prints to stdout — trivial enough to read in a terminal, structured enough that swapping the cast for an append‑only writer changes one function:

*lib/factor_agent/audit_log.ex*

```elixir
defmodule FactorAgent.AuditLog do
  use GenServer

  def start_link(_), do: GenServer.start_link(__MODULE__, [], name: __MODULE__)

  def init(events), do: {:ok, events}

  def emit(event) do
    GenServer.cast(__MODULE__, {:emit, Map.put(event, :ts, DateTime.utc_now())})
  end

  def all, do: GenServer.call(__MODULE__, :all)

  def handle_cast({:emit, event}, events) do
    IO.inspect(event, label: "AUDIT")
    {:noreply, [event | events]}
  end

  def handle_call(:all, _from, events) do
    {:reply, Enum.reverse(events), events}
  end
end
```

### Agents

Three workers: one fetches from public sources, one from internal docs, one composes. Each emits an audit event when it completes. Each tags its own output with a sensitivity product. The synthesis agent is the only one that performs the LCM join — nobody else is allowed to compose information from different trust regimes.

*lib/factor_agent/agents.ex*

```elixir
defmodule FactorAgent.PublicAgent do
  use GenServer
  alias FactorAgent.{Labels, AuditLog}

  def start_link(_), do: GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  def init(state),   do: {:ok, state}

  def run(query), do: GenServer.call(__MODULE__, {:run, query})

  def handle_call({:run, query}, _from, state) do
    result = %{
      text:        "Public benchmark: churn rises with support volume.",
      sensitivity: Labels.encode([])    # public → 1
    }
    AuditLog.emit(%{event: :public_agent_completed, query: query,
                    sensitivity: result.sensitivity})
    {:reply, result, state}
  end
end

defmodule FactorAgent.DocsAgent do
  use GenServer
  alias FactorAgent.{Labels, AuditLog}

  def start_link(_), do: GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  def init(state),   do: {:ok, state}

  def run(query), do: GenServer.call(__MODULE__, {:run, query})

  def handle_call({:run, query}, _from, state) do
    result = %{
      text:        "Internal docs: Acme has rising tickets and delayed renewal.",
      sensitivity: Labels.encode([:confidential, :customer_data])    # 3 × 13 = 39
    }
    AuditLog.emit(%{event: :docs_agent_completed, query: query,
                    sensitivity: result.sensitivity})
    {:reply, result, state}
  end
end

defmodule FactorAgent.SynthesisAgent do
  use GenServer
  alias FactorAgent.{Labels, AuditLog}

  def start_link(_), do: GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  def init(state),   do: {:ok, state}

  def run(parts), do: GenServer.call(__MODULE__, {:run, parts})

  def handle_call({:run, parts}, _from, state) do
    sensitivity =
      parts
      |> Enum.map(& &1.sensitivity)
      |> Enum.reduce(1, &Labels.join/2)             # LCM fold

    text = parts |> Enum.map(& &1.text) |> Enum.join("\n\n")

    result = %{text: "Combined answer:\n\n" <> text, sensitivity: sensitivity}

    AuditLog.emit(%{event: :synthesis_completed,
                    input_count: length(parts),
                    output_sensitivity: sensitivity})
    {:reply, result, state}
  end
end
```

### Orchestrator

The orchestrator runs the workflow, joins sensitivities, and checks the divisibility clearance against the runtime the caller declared. If the composed answer's sensitivity does not divide the runtime's capability, the response is `:denied` — with the offending sensitivity returned, so the caller can see exactly which factors made the answer untransmittable.

*lib/factor_agent/orchestrator.ex*

```elixir
defmodule FactorAgent.Orchestrator do
  use GenServer
  alias FactorAgent.{PublicAgent, DocsAgent, SynthesisAgent, Labels, AuditLog}

  def start_link(_), do: GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  def init(state),   do: {:ok, state}

  def ask(query, runtime_capability) do
    GenServer.call(__MODULE__, {:ask, query, runtime_capability})
  end

  def handle_call({:ask, query, runtime_capability}, _from, state) do
    AuditLog.emit(%{event: :workflow_started, query: query,
                    runtime_capability: runtime_capability})

    public   = PublicAgent.run(query)
    internal = DocsAgent.run(query)
    composed = SynthesisAgent.run([public, internal])

    response =
      if Labels.allowed?(composed.sensitivity, runtime_capability) do
        %{status: :ok,
          answer: composed.text,
          sensitivity: composed.sensitivity}
      else
        %{status: :denied,
          reason: :insufficient_runtime_clearance,
          sensitivity: composed.sensitivity}
      end

    AuditLog.emit(%{event: :workflow_completed,
                    status: response.status,
                    final_sensitivity: composed.sensitivity})

    {:reply, response, state}
  end
end
```

### Application Supervisor

One supervisor, `one_for_one` restart strategy. Any worker can crash without taking the rest with it — the OTP claim the essay was making, now actually wired up:

*lib/factor_agent/application.ex*

```elixir
defmodule FactorAgent.Application do
  use Application

  def start(_type, _args) do
    children = [
      FactorAgent.AuditLog,
      FactorAgent.PolicyEngine,
      FactorAgent.ToolRegistry,
      FactorAgent.PublicAgent,
      FactorAgent.DocsAgent,
      FactorAgent.SynthesisAgent,
      FactorAgent.Orchestrator
    ]
    Supervisor.start_link(children, strategy: :one_for_one, name: FactorAgent.Supervisor)
  end
end
```

### The Demo

Two runs of the same query, against two different runtimes. Same agents, same data, same workflow. Different verdicts, because the arithmetic disagrees about who is allowed to see the answer.

*Run 1 — query routed to an external LLM*

```elixir
alias FactorAgent.{Labels, Orchestrator}

external_llm = Labels.encode([])    # 1 — public only

Orchestrator.ask(
  "Compare internal churn data with public market benchmarks",
  external_llm
)
```

The audit log prints each step. The composed answer's sensitivity is the LCM of `1` (public) and `3 × 13 = 39` (confidential customer data) — which is `39`. The clearance check asks whether `39` divides `1`. It does not. Verdict:

*Run 1 trace*

```text
public_agent_completed → sensitivity = 1
docs_agent_completed → sensitivity = 39 # confidential × customer_data
synthesis_completed → lcm(1, 39) = 39
clearance check → rem(1, 39) = 1 ≠ 0 × FAIL

verdict: denied — insufficient runtime clearance (sensitivity 39)
```

*Run 2 — same query, routed to on-prem runtime*

```elixir
on_prem = Labels.encode([
  :confidential, :customer_data, :pii, :finance, :eu_region
])    # 3 × 5 × 7 × 11 × 13 = 15015

Orchestrator.ask(
  "Compare internal churn data with public market benchmarks",
  on_prem
)
```

Same sensitivity (`39`). New runtime (`15015`). Now the check asks whether `39` divides `15015`. It does — both `3` and `13` are present as factors of the runtime's capability. Verdict:

*Run 2 trace*

```text
public_agent_completed → sensitivity = 1
docs_agent_completed → sensitivity = 39
synthesis_completed → lcm(1, 39) = 39
clearance check → rem(15015, 39) = 0 ✓ PASS

verdict: allowed — answer transmittable; sensitivity 39 carried forward
```

That is the whole abstraction, executing. The composed answer inherits the highest sensitivity of its factors. Runtimes only see information they have clearance for. The denial is not a vibes call — it is one `rem/2` evaluating to a non‑zero integer.

### An Executable Harness

Ning et al. conclude by calling for a new science of harness engineering: systems that are executable, inspectable, stateful, and governed.[45] One of their hardest open problems is local policy enforcement — safety and clearance decided by the harness substrate, not inferred from model confidence. *FactorAgent* is a minimal invariant-preserving harness runtime: not a chatbot, but the smallest OTP application where divisibility, LCM composition, and audit emission are the control plane.

*Harness survey → FactorAgent runtime*

```text
Planning / orchestration     → Orchestrator GenServer
Tool governance              → ToolRegistry + capability products
Verification / policy        → Labels.allowed?/2 (divisibility)
Shared harness state         → sensitivity tags carried on every agent output
Runtime isolation            → Application supervisor, :one_for_one
Auditability                 → AuditLog GenServer on every action
```

### What the Demo Buys

Every column of the bridge above now has a counterpart in code:

*Bridge → runtime*

```text
Primes          → label catalog as distinct primes
LCM             → SynthesisAgent's reduce/3 over join/2
Divisibility    → Orchestrator's allowed?/2 check
OTP             → Application supervisor, one_for_one strategy
Tool registry   → ToolRegistry GenServer with capability fields
Audit log       → AuditLog GenServer, every action emits
→ Orchestrator    → coordinator; sole composer
→ Agents          → bounded workers; sensitivity-tagged outputs
```

What this artifact is not: a production system. There is no real LLM, no real retrieval, no integrity lattice, no relational declassification, no quantity tracking, no persistence, no clustering. Each of those is a layer the essay has named and deferred. The point of FactorAgent is narrower — to show that the algebra the essay leans on for sixty pages of prose collapses into a single small OTP application, and that the application's behavior is determined by the algebra alone, not by anyone's confidence about what should and should not flow.

> If the abstraction is correct, the abstraction compiles.

This one does.

At this point the loop closes. Primes gave us identity. OTP gave us supervised processes. Ihara gave us cycles. Denning gave us information flow. The repair calculus gave us bounded change. The article has been saying one thing in several dialects: durable systems preserve invariants while allowing local motion.

> **Checkpoint · Finish line**
>
> **You made it through the monograph**
>
> - CODASYL harnesses → invariant algebra (Codd move).
> - FactorAgent proves the security slice; more artifacts welcome experiments.
>
> Optional: research agenda (§12a) and coda (§13).

## Toward Invariant-Preserving Harness Engineering

The harness literature has mapped the territory. This essay proposes the invariant layer beneath it. The next steps are falsifiable:

*Open research directions*

```text
Spectral metrics for workflow stability (ρ(A), prime-cycle counts on harness graphs)
Algebraic capability enforcement in production runtimes (LCM joins, divisibility gates)
Ultrametric memory repair with explicit blast-radius bounds
Ihara-zeta analysis of retry and delegation topology under load
Local-repair execution semantics (z' = z + kM) for workflow steps, not full restarts
Transactional harness-state objects with declared read/write conflict policies
Constraint-preserving workflow mutation under human approval gates
OTP-style supervised agent harnesses at multi-tenant scale
Typed executable provenance chains (H(a_t ‖ event_t)) across tool and memory writes
```

Each item is a buildable experiment, not a slogan. The question for the field is no longer whether agents need harnesses. Ning et al. have settled that.[45] The question is whether the next era looks like more CODASYL — richer traversal, mutating graphs, orchestration-as-debugging — or like Codd: a substrate where composition is lawful and topology is derived.[46]

## The Final Lesson

The next generation of AI systems will not be won by the largest agent loop. It will be won by the cleanest decomposition.

The systems that survive will be the ones that know:

*Knowable in production*

```text
where identity lives
where state lives
where memory lives
where permissions live
where side effects happen
where failure is contained
where auditability begins
where human approval interrupts autonomy
```

This is the old lesson returning in new clothes. Primes taught it in arithmetic. Erlang taught it in telecom. Agentic AI is being forced to learn it in production.

A demo agent can be a blob. A production agent must be factored.

> At small scale, intelligence impresses. At large scale, structure survives.

## References

### Erlang, OTP & Actor Systems

1. Joe Armstrong. *Programming Erlang: Software for a Concurrent World*. Pragmatic Bookshelf, 2nd ed., 2013.
2. Joe Armstrong. *Making Reliable Distributed Systems in the Presence of Software Errors*. PhD thesis, KTH Royal Institute of Technology, 2003.
3. Ericsson OTP Team. *OTP Design Principles*. Official Erlang documentation. [erlang.org](https://www.erlang.org/doc/system/design_principles.html)
4. Francesco Cesarini & Simon Thompson. *Erlang Programming*. O’Reilly, 2009.
5. Martin Logan, Eric Merritt & Richard Carlsson. *Erlang and OTP in Action*. Manning, 2010.
6. Gul Agha. *Actors: A Model of Concurrent Computation in Distributed Systems*. MIT Press, 1986.
7. Carl Hewitt, Peter Bishop & Richard Steiger. “*A Universal Modular ACTOR Formalism for Artificial Intelligence*.” IJCAI, 1973.
8. Carl Hewitt. “*Viewing Control Structures as Patterns of Passing Messages*.” Artificial Intelligence 8(3), 1977.

### Distributed Systems Foundations

9. Leslie Lamport. “*Time, Clocks, and the Ordering of Events in a Distributed System*.” Communications of the ACM 21(7), 1978.
10. Leslie Lamport. “*The Part-Time Parliament*.” ACM Transactions on Computer Systems 16(2), 1998.
11. Nancy Lynch. *Distributed Algorithms*. Morgan Kaufmann, 1996.
12. Maarten van Steen & Andrew Tanenbaum. *Distributed Systems*. Pearson, 3rd ed., 2017.
13. Jim Gray & Andreas Reuter. *Transaction Processing: Concepts and Techniques*. Morgan Kaufmann, 1992.
14. Pat Helland. “*Life Beyond Distributed Transactions*.” CIDR, 2007.
15. Werner Vogels. “*Eventually Consistent*.” Communications of the ACM 52(1), 2009.
16. Eric Brewer. “*CAP Twelve Years Later: How the ‘Rules’ Have Changed*.” IEEE Computer 45(2), 2012.

### Information Flow Security & Lattice Theory

17. Dorothy E. Denning. “*A Lattice Model of Secure Information Flow*.” Communications of the ACM 19(5), 1976. [pdf](https://faculty.nps.edu/dedennin/publications/lattice76.pdf)
18. Dorothy E. Denning & Peter J. Denning. “*Certification of Programs for Secure Information Flow*.” Communications of the ACM 20(7), 1977.
19. David Bell & Leonard LaPadula. *Secure Computer Systems: Mathematical Foundations*. MITRE Technical Report 2547, 1973.
20. Andrew C. Myers & Barbara Liskov. “*A Decentralized Model for Information Flow Control*.” SOSP, 1997.
21. Andrei Sabelfeld & Andrew C. Myers. “*Language-Based Information-Flow Security*.” IEEE Journal on Selected Areas in Communications 21(1), 2003.
22. Joseph A. Goguen & José Meseguer. “*Security Policies and Security Models*.” IEEE Symposium on Security and Privacy, 1982.
23. Butler Lampson. “*Protection*.” ACM Operating Systems Review 8(1), 1974. (Originally 1971 Princeton conference.)
24. Mark S. Miller, Ka-Ping Yee & Jonathan Shapiro. “*Capability Myths Demolished*.” Johns Hopkins University SRL technical report, 2003.
25. Whitfield Diffie & Martin E. Hellman. “*New Directions in Cryptography*.” IEEE Transactions on Information Theory 22(6), 1976.
26. Daniel J. Bernstein. “*ChaCha, a variant of Salsa20*.” Workshop Record of SASC 2008.

### Fault Tolerance & Reliability

27. David Parnas. “*On the Criteria To Be Used in Decomposing Systems into Modules*.” Communications of the ACM 15(12), 1972.
28. Michael Nygard. *Release It!: Design and Deploy Production-Ready Software*. Pragmatic Bookshelf, 2nd ed., 2018.
29. Richard I. Cook. “*How Complex Systems Fail*.” Cognitive Technologies Laboratory, University of Chicago, 1998.
30. Sidney Dekker. *Drift Into Failure*. Ashgate, 2011.
31. Betsy Beyer, Chris Jones, Jennifer Petoff & Niall Murphy (eds.). *Site Reliability Engineering: How Google Runs Production Systems*. O’Reilly, 2016.

### Workflow Orchestration & Deterministic Execution

32. Gregor Hohpe & Bobby Woolf. *Enterprise Integration Patterns*. Addison-Wesley, 2003.
33. Martin Kleppmann. *Designing Data-Intensive Applications*. O’Reilly, 2017.
34. Bernd Rücker. *Practical Process Automation*. O’Reilly, 2021.

### Retrieval, Bitmap & Index Structures

35. Daniel Lemire et al. “*Roaring Bitmaps: Implementation of an Optimized Software Library*.” Software: Practice and Experience 48(4), 2018. [arXiv:1709.07821](https://arxiv.org/abs/1709.07821)
36. Samy Chambi, Daniel Lemire, Owen Kaser & Robert Godin. “*Better Bitmap Performance with Roaring Bitmaps*.” Software: Practice and Experience 46(5), 2016. [arXiv:1402.6407](https://arxiv.org/abs/1402.6407)
37. Daniel Lemire et al. “*Consistently Faster and Smaller Compressed Bitmaps with Roaring*.” 2016. [arXiv:1603.06549](https://arxiv.org/abs/1603.06549)

### Agents & Modern Context

38. Timo Schick et al. “*Toolformer: Language Models Can Teach Themselves to Use Tools*.” NeurIPS, 2023. [arXiv:2302.04761](https://arxiv.org/abs/2302.04761)

### Graph Zeta & Spectral Methods

39. Yasuro Ihara. “*On the Zeta-Functions of a Finite Graph*.” in *Advanced Studies in Pure Mathematics* 11 (1986); preprint circulation 1966.
40. Hyman Bass. “*Ihara’s Zeta Function and a Tower of Intermediate Jacobians Associated with a Discrete Group*.” Inventiones Mathematicae 109(1), 1992.
41. Audrey Terras. *Zeta Functions of Graphs: A Stroll Through the Garden*. Cambridge University Press, 2010.

### Companion Research Artifacts

42. Sethu Iyer. *Geometry of Conditional Logic*. ShunyaBar Labs research repository, 2026. [GitHub](https://github.com/sethuiyer/geometry-of-conditional-logic)

### OLAP, Cubes & Aggregation Lattices

43. Jim Gray, Surajit Chaudhuri, Adam Bosworth, Andrew Layman, Don Reichart, Murali Venkatrao, Frank Pellow & Hamid Pirahesh. “*Data Cube: A Relational Aggregation Operator Generalizing Group-By, Cross-Tab, and Sub-Totals*.” Data Mining and Knowledge Discovery 1(1), 1997.
44. Venky Harinarayan, Anand Rajaraman & Jeffrey D. Ullman. “*Implementing Data Cubes Efficiently*.” SIGMOD, 1996.

### Agent Harnesses & Executable Substrates

45. Xuying Ning, Katherine Tieu, Dongqi Fu, Tianxin Wei, Zihao Li, Yuanchen Bei, Jiaru Zou, Mengting Ai, Zhining Liu, Ting-Wei Li, Lingjie Chen, Yanjun Zhao, Ke Yang, Bingxuan Li, Cheng Qian, Gaotang Li, Xiao Lin, Zhichen Zeng, Ruizhong Qiu, Sirui Chen, Yifan Sun, Xiyuan Yang, Ruida Wang, Rui Pan, Chenyuan Yang, Dylan Zhang, Liri Fang, Zikun Cui, Yang Cao, Pan Chen, Dorothy Sun, Ren Chen, Mahesh Srinivasan, Nipun Mathur, Yinglong Xia, Hong Li, Hong Yan, Pan Lu, Lingming Zhang, Tong Zhang, Hanghang Tong & Jingrui He. “*Code as Agent Harness*.” arXiv:2605.18747, 2026. [arXiv:2605.18747](https://arxiv.org/abs/2605.18747)

### Data Models & Substrate Shifts

46. Edgar F. Codd. “*A Relational Model of Data for Large Shared Data Banks*.” Communications of the ACM 13(6), 1970. [doi:10.1145/362384.362685](https://doi.org/10.1145/362384.362685)
