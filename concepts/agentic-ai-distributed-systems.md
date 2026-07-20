# Beyond Prompt Engineering: Agentic AI as a Distributed System

<div class="audio-section">
<strong>Listen:</strong> Distributed Belief Engines Fix AI

<audio controls preload="metadata">
  <source src="https://cdn8.cloud.shunyabar.foo/Podcast/How_Distributed_Belief_Engines_Fix_AI.m4a" type="audio/mp4">
  Your browser does not support the audio element.
</audio>
</div>

**Tags:** `agentic-ai` `distributed-systems` `belief-engines` `factor-agent` `elixir-otp` `horde` `scylladb` `temporal-state` `lag-aware-retrieval` `capability-governance` `belief-lineage`

**Related:** [Factor Agent](../projects/factor-agent.md) · [Authorization Lattice](../projects/authorization-lattice.md) · [Geometry of Conditional Logic](../projects/geometry-of-conditional-logic.md) · [Asymptotically Fair Stopping](asymptotically-fair-stopping.md) · [The Arithmetic Manifold](../core-vision.md) · [Related Work](../references/related-work.md)

## Thesis

Agentic AI is usually framed as a prompt-engineering problem. That is the wrong abstraction for enterprise systems.

The hard failures are not usually failures of text generation. They are failures of runtime architecture:

- no transactional shared program state;
- weak temporal semantics;
- brittle scheduled continuations;
- unsafe retrieval over sensitive data;
- ungoverned tool calls;
- no durable causal lineage;
- no clean recovery path after localized failure.

The practical claim is:

\[
\boxed{
\text{enterprise agents are distributed systems, not prompt pipelines.}
}
\]

The Factor Agent architecture treats an investigation as a living, supervised process tree. Elixir/OTP runs the active processes. Horde gives cluster-level process recovery. ScyllaDB stores the serialized temporal truth. Phoenix Channels stream evolving belief projections. FactorAgent governance decides what the system is allowed to retrieve, compose, execute, and say.

---

## The Failure Mode of Prompt Pipelines

The simplest agent architecture is a prompt pipeline:

```text
user request
    -> retrieve documents
    -> call model
    -> maybe call tools
    -> return answer
```

This is useful for demos. It fails when the world is not static.

Enterprise environments are not static. A Slack incident thread may exist now. A Salesforce case may appear 40 seconds later. A Confluence RCA may be published five minutes later. A PagerDuty incident may update its severity twice while the model is already answering. Meanwhile, the user may not have clearance for all retrieved sources, and the model may ask to call a tool that the user is not authorized to invoke.

The prompt pipeline collapses all of that into one synchronous request. It treats absence as truth, permissions as prompt text, and time as a nuisance.

That produces three common failures.

First, the system hallucinates certainty from incomplete evidence:

```text
"No RCA exists."
```

when the correct statement is:

```text
"No RCA is indexed yet. The source usually lags by 90-120 seconds."
```

Second, the system leaks policy into language instead of enforcing policy in the runtime. If a model sees a restricted chunk and is instructed not to reveal it, the architecture has already failed. The model should never have received the chunk.

Third, the system loses causal history. A later document may supersede an earlier hypothesis, but the user only sees a sequence of disconnected answers. There is no durable explanation of why the belief changed.

The distributed-systems framing fixes the abstraction. The unit of work is not a prompt. It is an investigation.

An investigation has identity, state, permissions, timers, observations, claims, failure modes, and a user-facing projection. It is a process, not a string.

---

## A Concrete Running Example

Consider a user asking:

```text
Why did customer ACME see elevated API latency this morning?
```

A prompt pipeline might perform a retrieval pass across Slack, Salesforce, Confluence, Datadog, and incident tickets. Suppose only Slack has indexed the outage discussion so far. The pipeline returns a Slack-based answer.

The Factor Agent runtime instead opens an investigation:

```text
conversation_id = 9f0...
topic           = ACME elevated API latency
user            = support_engineer_17
target_channel  = customer-facing draft
```

The `ConversationCoordinator` starts probes:

```text
SlackProbe       -> found incident thread
SalesforceProbe  -> miss_expected
ConfluenceProbe  -> miss_expected
DatadogProbe     -> found metrics anomaly
PagerDutyProbe   -> found related incident
```

The important distinction is that two misses are not treated equally.

If Salesforce has a p50 indexing lag of 35 seconds and the event is only 8 seconds old, a Salesforce miss is expected. If Confluence has a p99 lag of 180 seconds and the RCA is absent after 20 minutes, that absence is diagnostic.

The coordinator can therefore stream a partial answer:

```text
Current evidence points to API latency correlated with deploy D.
Salesforce and Confluence evidence are still inside expected indexing windows.
I will refresh Salesforce in 28 seconds and Confluence in 2 minutes.
```

That answer is not merely a model response. It is a belief projection over a live process.

When Salesforce later indexes a customer case, the probe fires, claims the work, retrieves the ticket, persists the observation, reconciles the belief graph, and streams an update. If the Confluence RCA later contradicts the Slack hypothesis, the belief graph records supersession rather than overwriting history.

This is why the architecture needs a real runtime. The agent is not "thinking longer." It is maintaining an explicit temporal contract with a changing enterprise world.

---

## Runtime Model

Most Python-first agent frameworks compensate for weak state semantics by building increasingly complex dynamic DAGs. That helps with orchestration, but it does not solve the deeper problem: an enterprise agent is a stateful, temporal, permissioned, failure-prone process.

In the Factor Agent model, every active conversation or investigation is instantiated as an independent supervised process tree:

```text
ConversationCoordinator
├── ProbeSupervisor
│   ├── SlackProbe
│   ├── SalesforceProbe
│   └── ConfluenceProbe
├── BeliefReconciler
├── PolicyEvaluator
└── ChannelProjector
```

The coordinator owns partial result state, manages pending probes, records durable intents, and enforces causal execution order.

Elixir/OTP is a natural fit because BEAM processes are lightweight actors with supervised lifecycle semantics. A deferred continuation such as "check Salesforce again in 31 seconds" is not a special external workflow. It is a timer:

```elixir
Process.send_after(self(), {:fire_probe, probe_id}, 31_000)
```

Fan-out to external systems can run concurrently with runtime-enforced latency ceilings:

```elixir
Task.async_stream(sources, &query_source/1, timeout: 2_000)
```

The important point is not the syntax. The important point is that the runtime gives agents process identity, local state, timers, message passing, supervision, and crash recovery as first-class primitives.

---

## Process Lifecycle

The lifecycle of a conversation is explicit.

```text
start
  -> create conversation_id
  -> load user grants and target-channel policy
  -> spawn ConversationCoordinator
  -> write initial investigation event
  -> launch probes
  -> stream partial projections
  -> schedule continuations
  -> reconcile new observations
  -> expire or archive process
```

The coordinator does not need to live forever. It only needs to live while the investigation is active. When the conversation is idle, the process can shut down after checkpointing its durable state. A later user action or deferred probe can rehydrate the process from ScyllaDB.

This is the key memory distinction:

| State type | Location | Reason |
| --- | --- | --- |
| active timers | BEAM process | cheap, local, reconstructible |
| current partial projection | BEAM process | low-latency UI update |
| observations | ScyllaDB | durable audit record |
| deferred probes | ScyllaDB | crash recovery |
| policy labels | ScyllaDB / policy service | must survive restart |
| source lag priors | ETS cache backed by ScyllaDB | fast reads, durable refresh |

The process is therefore not the source of truth. It is the active interpreter of truth.

If the coordinator crashes, the supervisor restarts it. If the node dies, Horde restarts it elsewhere. If no process exists at all, a pending probe or user request can recreate it from durable state. This is the same mental model used in resilient telecom systems: processes are disposable; messages and durable facts are not.

This also changes how we reason about "memory." The model's context window is not memory. It is a temporary projection. Real memory is the event log plus the governed belief graph. The model receives a carefully assembled, policy-filtered view of that memory for a specific generation step.

---

## Cluster Recovery with Horde

A single BEAM node gives strong local concurrency, but timers and process identity are local. If Node 1 owns a conversation and crashes, a timer scheduled on Node 1 will not fire on Node 2 unless the conversation is rehydrated elsewhere.

Horde provides the distributed process registry and supervisor:

```text
[Node 1] ConversationCoordinator A
[Node 2] ConversationCoordinator B
[Node 3] idle capacity

        ↓ Node 1 fails

Horde membership detects loss
        ↓
ConversationCoordinator A restarts on Node 3
        ↓
ScyllaDB rehydrates durable probes and observations
```

Horde makes agent processes location-transparent across the Elixir cluster. The cluster behaves more like a single computational layer than a set of manually routed machines.

The main risk is split brain. A network partition could cause two sides of the cluster to believe they own the same conversation. The architecture does not rely on the process registry alone for correctness. Horde's CRDT registry helps cluster convergence, but durable side effects are protected by ScyllaDB Compare-and-Swap claims and idempotency keys.

\[
\boxed{
\text{Horde recovers processes; ScyllaDB arbitrates durable effects.}
}
\]

---

## Failure Semantics

The architecture separates three failure classes.

### Local Probe Failure

A Slack API request may timeout. That should not kill the investigation. The `SlackProbe` child can fail, retry under policy, and report a structured error observation:

```text
source_system  = slack
result_status  = probe_error
error_class    = timeout
retry_after    = 5s
```

The coordinator can still project a partial answer from other sources.

### Coordinator Failure

If the coordinator crashes because of a bug, the supervisor restarts it. On restart, it reloads:

- recent observations for the conversation;
- pending deferred probes;
- target channel metadata;
- active user grants;
- current belief graph head.

The process tree may be new, but the investigation identity is stable because `conversation_id` is stable.

### Node Failure

If the whole BEAM node dies, Horde restarts the coordinator on another node. The replacement process reads durable rows and re-arms timers. Any timer that should already have fired is treated as overdue work and claimed through ScyllaDB.

The invariant is:

\[
\boxed{
\text{failure may delay work, but it must not erase intent.}
}
\]

This is why `deferred_probes` is not an optimization. It is the durable representation of future intent.

---

## ScyllaDB as Temporal State Fabric

The BEAM owns ephemeral runtime truth: active timers, in-flight probes, local state, and supervised process identity.

ScyllaDB owns serialized truth: observations, scheduled intents, claims, provenance, and belief lineage.

The invariant is simple:

\[
\boxed{
\text{anything devastating to lose lives in ScyllaDB.}
}
\]

Anything reconstructible can live in the BEAM.

This produces a clean runtime split:

| Layer | Responsibility |
| --- | --- |
| BEAM / OTP | active processes, timers, supervision, local state |
| Horde | distributed process registry and restart placement |
| ScyllaDB | durable observations, deferred probes, lineage, claims |
| Phoenix Channels | real-time belief projection to the client |
| FactorAgent | policy algebra, capability checks, governed composition |

---

## Why ScyllaDB Instead of a Generic Queue

The `deferred_probes` table looks like a queue, but the workload is not a normal queue.

A normal queue asks:

```text
what work should be processed next?
```

The Factor Agent runtime asks:

```text
what future temporal commitments exist for this source, status, and time window?
```

It also needs to answer:

```text
what probes belong to this conversation after restart?
what claims already fired?
which observations were known at this query time?
which source misses were expected given lag priors?
```

That makes the database a temporal fabric rather than a simple broker.

ScyllaDB is a good fit because the writes are append-heavy and access patterns can be shaped around partition keys. The design should avoid cross-partition transactions, large unbounded partitions, and ad hoc analytical queries on hot tables. The tables are optimized for runtime operations; analytics can be fed from change streams or downstream storage.

For example, `observation_log` is partitioned by `conversation_id` because the coordinator commonly reloads the recent history of a single investigation. `deferred_probes` is partitioned by `(status, source_system)` because workers need to scan pending probes for a source in fire-time order.

This is not "one schema to answer every question." It is a set of write-optimized temporal indexes.

In practice, production versions may use companion tables:

```text
deferred_probes_by_conversation
observations_by_source_time
belief_edges_by_conversation
active_conversations_by_user
```

Each table exists because the runtime has a specific access pattern. The price is denormalized writes. The benefit is predictable latency and explicit recovery behavior.

---

## Core Schemas

These schemas are intentionally workload-shaped. They are not normalized relational models; they are access-pattern tables for temporal agent execution.

### Observation Log

The `observation_log` is an immutable freshness ledger. Every source query is recorded, including hits and misses.

```sql
CREATE TABLE observation_log (
    conversation_id     UUID,
    artifact_type       TEXT,       -- 'slack_thread' | 'sf_ticket' | 'rca_doc'
    source_system       TEXT,
    t_event             TIMESTAMP,  -- when the real-world event happened
    t_queried           TIMESTAMP,  -- when the agent checked
    result_status       TEXT,       -- 'found' | 'miss_expected' | 'miss_diagnostic'
    p_indexed           FLOAT,      -- Bayesian estimate at query time
    payload             TEXT,       -- JSON payload or compact reference

    -- FactorAgent policy metadata
    policy_identity     TEXT,
    policy_sensitivity  TEXT,
    policy_capability   TEXT,
    policy_topology     TEXT,
    policy_audit        TEXT,

    PRIMARY KEY ((conversation_id), t_queried, artifact_type)
) WITH CLUSTERING ORDER BY (t_queried DESC);
```

This table is append-only by design. It preserves what the system knew, when it knew it, and under what governance envelope it observed the artifact.

### Deferred Probes

The `deferred_probes` table is the durable task broker. It stores scheduled intents and uses Compare-and-Swap claims to prevent duplicate execution.

```sql
CREATE TABLE deferred_probes (
    probe_id          UUID,
    conversation_id   UUID,
    artifact_type     TEXT,
    source_system     TEXT,
    fire_at           TIMESTAMP,   -- t_event + expected lag + margin
    max_attempts      INT,
    attempt_number    INT,
    query_params      TEXT,        -- JSON: what to search for
    callback_channel  TEXT,        -- websocket id, SSE channel, or webhook URL
    status            TEXT,        -- 'pending' | 'fired' | 'resolved' | 'expired'

    PRIMARY KEY ((status, source_system), fire_at, probe_id)
) WITH CLUSTERING ORDER BY (fire_at ASC);
```

Before a BEAM timer is armed, the durable probe row must exist. If the node dies, a replacement coordinator can scan pending probes and re-arm the correct timers.

### System Lag Models

The `system_lag_models` table stores statistical priors about source freshness. It is small enough to cache in ETS at runtime.

```sql
CREATE TABLE system_lag_models (
    source_system   TEXT,
    artifact_type   TEXT,
    percentile_50   DURATION,
    percentile_84   DURATION,
    percentile_99   DURATION,
    sample_count    BIGINT,
    last_updated    TIMESTAMP,

    PRIMARY KEY (source_system, artifact_type)
);
```

The coordinator uses this table to distinguish expected misses from diagnostic misses.

---

### Belief Graph

The belief graph records claims, support edges, contradictions, and supersessions.

One possible shape is:

```sql
CREATE TABLE belief_graph_edges (
    conversation_id   UUID,
    edge_type         TEXT,       -- 'supports' | 'contradicts' | 'supersedes'
    from_node_id      UUID,
    to_node_id        UUID,
    t_asserted        TIMESTAMP,
    confidence        FLOAT,
    policy_audit      TEXT,

    PRIMARY KEY ((conversation_id), t_asserted, edge_type, from_node_id, to_node_id)
) WITH CLUSTERING ORDER BY (t_asserted DESC);
```

The nodes themselves can be stored as governed artifacts:

```sql
CREATE TABLE belief_nodes (
    conversation_id     UUID,
    node_id             UUID,
    node_type           TEXT,      -- 'observation' | 'hypothesis' | 'projection'
    payload             TEXT,
    created_at          TIMESTAMP,
    superseded          BOOLEAN,

    policy_identity     TEXT,
    policy_sensitivity  TEXT,
    policy_capability   TEXT,
    policy_topology     TEXT,
    policy_audit        TEXT,

    PRIMARY KEY ((conversation_id), created_at, node_id)
) WITH CLUSTERING ORDER BY (created_at DESC);
```

This is intentionally not a graph database claim. The graph is scoped to a conversation or investigation, and the runtime usually needs the recent causal neighborhood, not arbitrary global graph traversals.

The key point is that the system stores structured belief transitions:

```text
observation supports hypothesis
hypothesis supersedes earlier hypothesis
new evidence contradicts previous claim
projection was emitted from these source nodes
```

That makes final answers auditable. A projection is not just text. It is text plus a causal receipt.

---

## Architecture Diagram

```text
[ Browser / Client ]
        ↕
        ↕ full-duplex stream: partial answers update live
        ↕
[ Phoenix Channels Edge ]
        ↕
================================================================================
                       ELIXIR / BEAM CLUSTER
================================================================================
[ Horde Registry ]
        ↓ location-transparent PID registry and failover
[ Supervised Process Trees ]
        ↓ each conversation is a ConversationCoordinator
[ Lag Estimator / ETS Cache ]
        ↓ expected_soon vs missing temporal reasoning
[ FactorAgent Policy Engine ]
        ↓ ACL-first retrieval and capability-based tool access
================================================================================
        ↕ write-before-schedule / write-then-broadcast
================================================================================
                         SCYLLADB
================================================================================
[ Deferred Probes ]  durable task broker with CAS claims
[ Observation Log ]  immutable freshness ledger
[ Belief Graph ]     event-sourced DAG of attestations
```

This is the core architectural shift:

\[
\boxed{
\text{agents become supervised temporal processes backed by durable state.}
}
\]

---

## Reading the Diagram from Simple to Complex

The diagram can be read in three layers.

The first layer is the user interaction layer:

```text
Browser -> Phoenix Channel -> ConversationCoordinator
```

This is the part the user experiences. They ask a question and receive a stream of updates. The user does not need to know that some evidence is delayed, some probes are pending, and some claims have not settled.

The second layer is the active runtime:

```text
ConversationCoordinator -> probes -> reconciler -> projector
```

This layer owns the live investigation. It handles timers, source calls, partial states, and process supervision.

The third layer is durable temporal truth:

```text
deferred_probes
observation_log
belief_graph
```

This is the layer that survives crashes. It is also the layer that makes audit possible. If a user asks why the answer changed, the system can show the sequence of observations and supersession edges.

The complexity is gradual because each layer answers a different question:

| Layer | Question |
| --- | --- |
| Phoenix / UI | What should the user see now? |
| BEAM runtime | What is currently happening? |
| ScyllaDB | What must never be forgotten? |
| FactorAgent policy | What is allowed to happen? |
| Belief graph | Why did the answer change? |

This separation is what prevents the architecture from becoming a giant prompt.

---

## FactorAgent Governance

Enterprise agents fail when sensitive enterprise state is flattened into plain text and handed to a model as if permissions were a post-processing concern.

FactorAgent governance treats every durable artifact as a governed harness-state object. Each object carries a policy tuple:

\[
(i,s,c,q,\tau,a)
\]

where:

| Symbol | Meaning |
| --- | --- |
| \(i\) | identity |
| \(s\) | sensitivity |
| \(c\) | capability requirement |
| \(q\) | quantity or risk mass |
| \(\tau\) | topology or workflow position |
| \(a\) | audit provenance |

The system obeys ACL-first retrieval:

\[
\boxed{
\text{filter unauthorized chunks before they enter model context.}
}
\]

If a user asks for a root cause analysis, the system may retrieve:

- a Slack thread labeled `confidential × customer_data`;
- a Salesforce ticket labeled `confidential × customer_data × support_case`;
- a Confluence document labeled `confidential × engineering_internal`.

The composed answer inherits a computed governance envelope. If the target channel lacks clearance, the response is blocked or downgraded before generation.

Tool calls are also governed. A model does not execute raw functions. It requests capabilities. The tool registry stores capability closures in a partially ordered set, and the policy engine verifies whether the requested tool belongs to the user's granted downward set.

---

## Capability Algebra

Capability-based tool access is more precise than role-based tool access.

A role says:

```text
support_engineer
```

A capability says:

```text
can_read_salesforce_case(customer_id)
can_open_jira_ticket(project_id)
can_post_customer_facing_update(channel_id)
can_query_datadog(metric_scope)
```

The model should not be handed a generic `run_tool` function. It should request a capability closure:

```text
request_capability(
  action: "read_salesforce_case",
  scope: "customer:ACME",
  purpose: "incident_root_cause_analysis"
)
```

The policy engine then evaluates whether this requested capability is inside the user's granted downward set.

The partial order matters. A user who can read all ACME support cases can read one ACME support case. A user who can post internal updates cannot necessarily post customer-facing updates. A user who can summarize a confidential incident internally cannot necessarily export that summary to a public Slack channel.

This is where FactorAgent connects to ShunyaBar's broader arithmetic theme. Capabilities compose. Authority is not a flat string. It has structure, containment, and constraints.

The model can suggest actions, but the runtime grants authority.

\[
\boxed{
\text{the LLM proposes; the capability lattice disposes.}
}
\]

---

## Lag-Aware Retrieval

Enterprise data is eventually consistent.

An incident may appear in Slack immediately, a Salesforce ticket 30 seconds later, and a Confluence RCA two minutes later. A naive RAG agent queries all three systems, sees only Slack, and incorrectly says "no RCA exists."

That is not a search failure. It is a temporal observability failure.

The system uses lag priors to classify misses:

| Query result | Meaning |
| --- | --- |
| `found` | artifact exists and was retrieved |
| `miss_expected` | absence is expected because the source is still inside its lag window |
| `miss_diagnostic` | absence is meaningful because the source should have indexed by now |

If Salesforce is queried 5 seconds after an event and its p50 lag is 30 seconds, the coordinator should not treat a miss as evidence. It should record:

```text
result_status = 'miss_expected'
p_indexed     = low
```

and schedule a continuation:

```text
check again at t_event + percentile_84(source_system, artifact_type)
```

This turns retrieval from a one-shot query into an asynchronous temporal contract.

---

## Expected Misses as First-Class Observations

The most important subtlety is that a miss is still an observation.

If the system checks Confluence for an RCA and finds nothing, the result is not empty. The result is:

```text
source      = confluence
artifact    = rca_doc
t_event     = 14:00
t_queried   = 14:01
status      = miss_expected
p_indexed   = 0.22
```

That row matters. It says the system looked, when it looked, and how much evidential weight the absence should carry.

At 14:10, the same miss may become diagnostic:

```text
source      = confluence
artifact    = rca_doc
t_event     = 14:00
t_queried   = 14:10
status      = miss_diagnostic
p_indexed   = 0.99
```

Now absence has meaning. The system can say:

```text
No RCA is currently indexed, and the source is beyond its p99 expected lag.
```

This is a completely different epistemic state from:

```text
No RCA is indexed yet, but the source is still inside its normal lag window.
```

The difference is not language. It is state.

This is why temporal metadata belongs in the harness, not the prompt. The model should not be asked to guess whether a miss is meaningful. The runtime should compute the status and pass the model a governed observation.

---

## Timeline Example

Here is the same incident over time:

```text
14:00:00  API latency event begins
14:00:05  Slack thread appears
14:00:08  User asks for root cause
14:00:09  SlackProbe found
14:00:09  SalesforceProbe miss_expected
14:00:09  ConfluenceProbe miss_expected
14:00:10  partial answer streamed
14:00:37  Salesforce continuation fires
14:00:38  Salesforce ticket found
14:00:39  belief graph updated
14:00:39  user receives revised projection
14:02:15  Confluence RCA continuation fires
14:02:16  RCA found
14:02:17  earlier hypothesis superseded
14:02:17  user receives final projection with lineage
```

The important part is that the user experience remains simple while the backend preserves the complexity. The user sees a developing answer. The system sees a temporally indexed DAG of observations, claims, permissions, probes, and projections.

---

## Event-Sourced Belief Lineage

Truth changes as delayed evidence arrives.

At 14:02, the agent may produce a partial hypothesis from Slack. At 14:06, a formal RCA may supersede that hypothesis. A normal system overwrites the answer or spams the user with disconnected updates.

Factor Agent stores an event-sourced DAG of attestations:

```text
SlackObservation
        ↓ supports
HypothesisV1
        ↓ superseded_by
RCAObservation
        ↓ supports
HypothesisV2
```

The database does not store one monolithic truth. It stores signed observations, claims, supersession edges, and audit provenance. The final answer is a consensus projection computed dynamically from the current belief graph.

\[
\boxed{
\text{truth is a versioned projection over governed attestations.}
}
\]

This gives the user auditable lineage:

```text
At 14:02 the system believed X because Slack thread S supported it.
At 14:06 RCA document R superseded that hypothesis.
The current answer is Y.
```

---

## Real-Time Belief Projections

Phoenix Channels stream evolving answers to the client as probes resolve.

There is no polling loop and no external callback maze. The browser holds a WebSocket connection into the BEAM edge. As the coordinator receives new observations and reconciles the belief graph, it sends governed projections:

```text
partial_answer
deferred_probe_scheduled
new_evidence_observed
hypothesis_superseded
final_projection
```

Every update carries provenance and sensitivity metadata. The UI can therefore remain audit-aware without trusting the model to remember policy constraints.

---

## What the Model Actually Sees

The LLM should receive a compact, governed projection, not raw enterprise state.

Instead of dumping every retrieved chunk into a prompt, the coordinator assembles a context packet:

```json
{
  "question": "Why did ACME see elevated API latency?",
  "allowed_sources": [
    {
      "type": "slack_thread",
      "status": "found",
      "summary": "Deploy D correlated with API latency spike.",
      "policy": "confidential.customer_data"
    },
    {
      "type": "salesforce_ticket",
      "status": "miss_expected",
      "p_indexed": 0.31,
      "next_probe_at": "14:00:37"
    }
  ],
  "forbidden_sources": [
    {
      "type": "confluence_doc",
      "reason": "target channel lacks engineering_internal clearance"
    }
  ],
  "output_policy": {
    "target_channel": "customer_facing_draft",
    "max_sensitivity": "customer_shareable"
  }
}
```

The model is then asked to generate within a clearly bounded state. It does not need to infer whether Salesforce absence is meaningful. It does not need to remember access control rules from prose. It does not see forbidden source text.

This reduces hallucination pressure because the model is no longer forced to collapse uncertainty. The runtime can explicitly permit uncertainty:

```text
Say that Salesforce evidence is still pending.
Say that engineering-internal details cannot be included in the customer draft.
Do not claim that no RCA exists until Confluence is beyond p99 lag.
```

The prompt becomes a projection interface over typed state, not the state container itself.

---

## System Invariants

The architecture is held together by strict invariants.

### Write Before Schedule

A probe row must be durably written to ScyllaDB before the BEAM timer is armed.

```text
write deferred_probes row
        ↓ success
arm BEAM timer
```

If the order is reversed and the node crashes after arming the timer but before writing the row, the work is permanently lost.

### Write Then Broadcast

On probe resolution, the observation must be persisted before it is streamed to the user.

```text
write observation_log row
        ↓ success
broadcast via Phoenix Channel
```

Broadcasting first risks showing the user data that the system has no durable record of.

### ACL-First Retrieval

Unauthorized chunks are filtered before they enter model context.

```text
retrieve candidates
        ↓
policy lattice filter
        ↓
allowed context only
        ↓
model call
```

Policy is not a post-generation classifier. It is a structural precondition.

### Idempotent Probe Claims

Probe execution must be guarded by an idempotency key or CAS transition:

```sql
UPDATE deferred_probes
SET status = 'fired'
WHERE status = 'pending'
  AND source_system = ?
  AND fire_at = ?
  AND probe_id = ?
IF status = 'pending';
```

If two coordinators race after a partition or restart, only one wins the durable claim.

### Decentralized Attestations

The system stores observations and attestations, not a single global answer. Final answers are projections over the belief graph.

\[
\boxed{
\text{the database stores evidence; the runtime computes the current projection.}
}
\]

---

## Operational Rollout

The full architecture does not need to ship all at once.

### Phase 1: Single-Node OTP Harness

Start with one BEAM node and one ScyllaDB cluster. Implement:

- `ConversationCoordinator`;
- source probes;
- `observation_log`;
- `deferred_probes`;
- Phoenix streaming;
- write-before-schedule;
- write-then-broadcast.

This already improves over a prompt pipeline because scheduled continuations and observation history become durable.

### Phase 2: Lag-Aware Retrieval

Add `system_lag_models` and classify misses:

- `found`;
- `miss_expected`;
- `miss_diagnostic`;
- `probe_error`.

At this stage, the system stops hallucinating certainty from early misses.

### Phase 3: FactorAgent Governance

Add policy tuples to artifacts and enforce ACL-first retrieval. Then add capability checks for tool execution.

This is the enterprise threshold. Before this phase, the system may be useful. After this phase, it can begin to be trusted with governed data.

### Phase 4: Horde Recovery

Add Horde once the process model is stable. The goal is not just horizontal scale. The goal is conversation recovery across node loss.

### Phase 5: Belief Graph and Supersession

Add event-sourced belief lineage. This turns changing answers into auditable state transitions rather than confusing edits.

The rollout order matters. Do not start with distributed clustering if the local state model is unclear. First define what must be durable, what can be reconstructed, and what invariants must never be violated.

---

## Design Tradeoffs

This architecture is not free.

It adds more moving parts than a Python notebook agent. It requires discipline around data modeling, idempotency, policy, and process lifecycle. It also pushes teams to distinguish runtime state from durable state, which is initially harder than storing a JSON blob in Postgres.

The trade is worthwhile when the agent must operate in an enterprise environment where:

- evidence arrives late;
- permissions matter;
- users need audit trails;
- tool calls have consequences;
- partial answers must update in real time;
- failures must be localized;
- scheduled work must survive node crashes.

If the agent only summarizes public webpages, this architecture is probably too heavy. If the agent investigates incidents, customer state, regulated workflows, financial operations, security events, or internal engineering systems, a prompt pipeline is too weak.

The line is simple:

\[
\boxed{
\text{if the answer has consequences, the harness needs systems semantics.}
}
\]

---

## Stack Mapping

| Architectural concern | Implementation |
| --- | --- |
| Runtime concurrency | Elixir / BEAM supervised processes |
| Distributed process registry | Horde |
| Shared context and handoff | ScyllaDB with CAS claims |
| Task brokering | ScyllaDB `deferred_probes` |
| Freshness memory | ScyllaDB `observation_log` |
| Lag priors | ScyllaDB table cached in ETS |
| Reconciliation | BeliefReconciler process |
| Async user updates | Phoenix Channels |
| Retrieval governance | FactorAgent policy lattice |
| Tool governance | MCP-poset capability checks |

---

## Relationship to ShunyaBar

This architecture is the runtime counterpart of the Arithmetic Manifold.

The solver work focuses on constraint geometry, prime-weighted identity, and multiplicative composition. Factor Agent applies the same ideas to agent systems:

- process identity replaces prompt identity;
- capability algebra replaces ad hoc tool access;
- supervised local repair replaces global workflow restart;
- event-sourced attestations replace overwritten answers;
- policy composition replaces plaintext context stuffing;
- lag-aware continuations replace one-shot retrieval.

The core move is the same across ShunyaBar:

\[
\boxed{
\text{make hidden structure explicit, typed, and compositional.}
}
\]

For Factor Agent, that structure is the distributed runtime itself.

---

## See Also

- [Factor Agent](../projects/factor-agent.md) — multi-agent runtime architecture using factorized capability identity
- [Authorization Lattice](../projects/authorization-lattice.md) — capability composition and ACL-first retrieval
- [Geometry of Conditional Logic](../projects/geometry-of-conditional-logic.md) — local repair and invariant-preserving recovery
- [Asymptotically Fair Stopping](asymptotically-fair-stopping.md) — temporal observation of non-final computational paths
- [The Arithmetic Manifold](../core-vision.md) — the broader typed, compositional structure behind ShunyaBar
- [Related Work](../references/related-work.md) — context for agents, distributed systems, and governed retrieval
