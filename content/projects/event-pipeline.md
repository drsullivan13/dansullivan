---
title: Distributed Event Pipeline
description: Fault-tolerant event processing system handling billions of events daily.
technologies:
  - Kafka
  - Flink
  - Kubernetes
  - Go
role: Systems Engineer
timeframe: Q1 2024
architecture: Event-Driven + Stream Processing
---

Architected a fault-tolerant event processing system using Kafka and Flink. Handles 10M+ events per second with sub-100ms latency. Implemented custom partitioning strategy for optimal throughput.

## Scale

- **10M+ events/second** peak throughput
- **< 100ms** end-to-end latency
- **99.99%** uptime SLA
- **Zero data loss** guarantee

## Technical Decisions

1. **Custom Partitioner**: Events routed by tenant ID to ensure ordering guarantees while maximizing parallelism
2. **Exactly-Once Semantics**: Achieved via Kafka transactions and Flink checkpointing
3. **Backpressure Handling**: Automatic scaling based on consumer lag metrics
