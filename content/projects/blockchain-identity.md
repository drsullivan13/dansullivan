---
title: Blockchain Identity System
description: Decentralized identity verification using smart contracts and zero-knowledge proofs.
technologies:
  - Solidity
  - Ethereum
  - IPFS
  - React
role: Blockchain Developer
timeframe: Q3 2023
architecture: Decentralized + Smart Contracts
---

Developed a decentralized identity platform using smart contracts and zero-knowledge proofs. Users maintain control of their data while enabling verifiable credentials.

## Privacy First

Zero-knowledge proofs allow users to prove attributes (e.g., "I am over 18") without revealing the underlying data (their birthdate).

## Architecture

- **Identity Contract**: Manages identity anchors and delegation
- **Credential Registry**: Stores credential hashes and revocation status
- **IPFS Storage**: Encrypted credential payloads stored off-chain
- **ZK Circuit**: Groth16 proofs for selective disclosure
