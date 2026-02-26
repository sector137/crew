# Architecture Patterns Reference

## System Architecture Patterns

### Monolith vs. Services

| Pattern | Choose when | Avoid when |
|---------|-------------|------------|
| **Monolith** | Team < 10 engineers, early-stage product, bounded domain | Scaling bottleneck is per-service, need polyglot, team > 20 |
| **Modular monolith** | Want clean boundaries without operational overhead | Already need independent deployment |
| **Microservices** | Teams need to deploy independently, bounded contexts are clear | < 3 teams, CRUD-heavy app, operational maturity is low |
| **Serverless** | Spiky or unpredictable load, event-driven workloads | Long-running processes, low-latency requirements, complex state |

**Default**: Start monolith, extract services when you feel the pain. Don't distribute prematurely.

---

### Data Architecture

#### Relational (PostgreSQL, MySQL)
- Default choice for most applications
- ACID guarantees, mature tooling, flexible queries
- Scales further than most teams think (vertical scaling + read replicas gets you far)

#### Document (MongoDB, Firestore)
- Good for: flexible schema, hierarchical data, rapid iteration on data model
- Watch out for: joins become application-level logic, consistency harder to reason about

#### Key-Value (Redis, DynamoDB)
- Good for: caching, sessions, leaderboards, simple lookup patterns
- Watch out for: querying beyond the key requires scan (expensive)

#### Time-Series (InfluxDB, TimescaleDB)
- Good for: metrics, events, IoT data, anything with a timestamp as primary dimension
- Avoid unless time is the core access pattern

#### Search (Elasticsearch, Algolia)
- Good for: full-text search, faceted filtering, relevance ranking
- Not a primary store — sync from primary DB, accept eventual consistency

**Rule of thumb**: Use PostgreSQL until you have a specific reason not to. Extensions (pgvector, TimescaleDB) push the boundaries further.

---

### API Design

#### REST
- Good for: CRUD resources, public APIs, browser clients
- Use when the client controls the request shape and caches matter

#### GraphQL
- Good for: complex, interconnected data with varied client needs, mobile apps with bandwidth concerns
- Watch out for: N+1 query problems, complexity of schema management, caching harder

#### gRPC / Protocol Buffers
- Good for: internal service-to-service communication, high-throughput, strongly-typed contracts
- Requires: code generation tooling, HTTP/2 support

#### Webhooks / Event streaming
- Good for: async notifications, fan-out to multiple consumers, decoupling producers/consumers
- Watch out for: delivery guarantees, retry logic, ordering

**Rule of thumb**: REST for external APIs. Internal async communication via events when you need decoupling, direct calls when you don't.

---

### Caching Strategy

**Cache invalidation is one of the hard problems.** Be explicit about:

| Type | Where cache lives | Invalidation strategy |
|------|------------------|----------------------|
| **CDN cache** | Edge nodes | TTL + cache-busting on deploy |
| **Application cache** | In-process (memory) | TTL, explicit invalidation on write |
| **Distributed cache** | Redis | TTL, write-through or write-around |
| **Database query cache** | DB layer | Automatic (careful with stale reads) |

**Pattern**: Cache reads, invalidate on writes. Write-through cache keeps cache and DB in sync. Read-through lazy-loads.

---

### Authentication & Authorization

#### Authentication approaches

| Approach | When to use |
|----------|-------------|
| **Session cookies** | Web apps, server-rendered, single domain |
| **JWT (stateless)** | APIs, mobile, multi-domain, microservices |
| **OAuth 2.0 / OIDC** | Third-party login, delegated access |
| **API keys** | Machine-to-machine, developer APIs |

**Warning on JWTs**: Can't revoke without a denylist (defeats stateless benefit). Use short expiry + refresh tokens.

#### Authorization models

| Model | Best for |
|-------|----------|
| **RBAC (Role-Based)** | Clear role hierarchy, enterprise apps |
| **ABAC (Attribute-Based)** | Fine-grained, context-dependent rules |
| **ReBAC (Relationship-Based)** | Sharing models (Google Docs style), social graphs |

---

### Async Processing

#### When to go async
- Operation takes > 200ms from user perspective
- Operation is not blocking the user flow
- Work needs to fan out to multiple consumers
- Retry logic and failure isolation matter

#### Queue options

| Tool | Best for |
|------|----------|
| **Redis / BullMQ** | App-layer queues, simple retry, low ops overhead |
| **Postgres (pg-boss, PGMQ)** | Already using PG, transactional enqueue, moderate scale |
| **Kafka** | High throughput (100k+ events/s), event log, replay |
| **SQS** | AWS-native, simple at-least-once delivery |
| **Celery + RabbitMQ** | Python ecosystem standard |

**Default**: For most apps, use Postgres as a queue (transactional guarantees, no new infra) or BullMQ on Redis. Kafka when you're sure you need it.

---

## Performance Trade-offs

### Consistency vs. Availability (CAP theorem simplified)

Choose two: **consistency**, **availability**, **partition tolerance**

In practice for web apps: you're usually choosing between:
- **Strong consistency** (all reads see latest write) — requires coordination, adds latency
- **Eventual consistency** (reads catch up) — better availability, lower latency, harder to reason about

Most apps should default to strong consistency and optimize later.

### Latency budget breakdown (rough guide)

| Operation | Typical latency |
|-----------|----------------|
| In-process function call | < 1 μs |
| Redis read/write | 0.5–2 ms |
| PostgreSQL query (indexed) | 1–10 ms |
| HTTP call (same region) | 5–50 ms |
| CDN cache hit | 5–20 ms |
| External API call | 50–500 ms |

A user-facing response should stay under 200ms. Work backwards from your latency budget.

---

## Common Architecture Mistakes

1. **Premature microservices** — distributed systems multiply failure modes; monolith is fine until you can feel the pain
2. **Storing everything in one table** — "EAV pattern" (Entity-Attribute-Value) trades schema clarity for nightmare queries
3. **Synchronous chains** — A calls B calls C means A's latency = B+C; break with async where you can
4. **Ignoring idempotency** — any operation that can be retried must be idempotent (especially payments, emails)
5. **N+1 queries** — fetch 100 users, then loop to fetch each user's posts = 101 queries; use JOIN or batch
6. **Not indexing foreign keys** — instant perf cliff as data grows
7. **Storing secrets in code** — environment variables minimum, secrets manager preferred
8. **No circuit breakers on external calls** — one slow downstream cascades to your whole system
