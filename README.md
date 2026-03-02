# Secure AI Backend – Technical Assessment Submission

## Overview

This repository implements **Module 1 (AI Chat Module)** and **Module 2 (Subscription Bundle Module)** as part of the backend engineering assessment.

The system is a secure, production-style backend built with:

* **TypeScript**
* **Express.js**
* **PostgreSQL**
* **TypeORM**
* **Clean Architecture (DDD-inspired structure)**
* **OAuth2 / OpenID Connect authentication (Auth0)**

The focus of the implementation is **security, correctness, and clear domain modeling**, rather than unnecessary complexity.

---

## Architecture

The project follows a layered architecture with strict separation of responsibilities.

```
src/
├── domain/              # Core business entities & logic
├── application/         # Use cases
├── infrastructure/      # Security & external integrations
├── subscriptions/       # Subscription module (Module 2)
├── web/                 # Controllers, routes, middleware
└── config/              # Database configuration
```

### Layer Responsibilities

**Domain**

* Entities (Chat, Bundle, Subscription)
* Business rules
* Framework independent logic

**Application**

* Use cases orchestrating domain behavior

**Infrastructure**

* OAuth authentication
* Security middleware
* Database access

**Web Layer**

* HTTP controllers
* Request validation
* API routing

---

## Module 1 – AI Chat Module

### Features

* Secure authenticated chat endpoint
* Mocked OpenAI response with latency simulation
* Chat persistence
* Token usage tracking
* Monthly free quota (3 messages)
* Subscription bundle usage
* Atomic quota deduction using database transactions
* Concurrency-safe implementation

### Endpoint

```
POST /api/chat
```

---

## Module 2 – Subscription Bundle Module

### Subscription Management

Users can:

* Create subscription bundles
* Select billing cycle:

  * Monthly
  * Yearly
* Enable or disable auto-renew
* Cancel subscriptions (effective after billing cycle)

Each subscription includes:

* maxMessages
* price
* startDate
* endDate
* renewalDate
* status lifecycle

### Billing Simulation

A background worker simulates billing:

* Automatic renewal
* Random payment failures
* Failed payments mark subscription inactive
* Historical data preserved

---

## Authentication & Authorization

Authentication is implemented using **Auth0 (OAuth2 / OpenID Connect)**.

### Token Validation

The backend verifies:

* Token signature (RS256)
* Issuer
* Audience
* Expiration

### Additional Security Mechanism

Requests must include a timestamp header:

```
x-request-timestamp
```

Requests older than 30 seconds are rejected to prevent replay attacks.

### Authorization Model

Roles supported:

* **user** – access own chats & subscriptions
* **admin** – system-wide access (extensible)

Authorization enforced at controller level.

---

## Security Protections

Implemented protections include:

* Secure HTTP middleware
* Restricted authenticated endpoints
* Schema validation (Zod)
* Strict request validation
* Transactional quota enforcement
* Replay attack protection
* Environment-based configuration

---

## System Endpoints

### Health Check

```
GET /api/health
```

Returns service status and uptime.

### Metrics

```
GET /api/metrics
```

Returns:

* total chats
* total subscriptions

---

## Setup Instructions

### 1. Install Dependencies

```
npm install
```

### 2. Create Environment File

Create `.env` in project root:

```
JWT_SECRET=secret
AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN
AUTH0_AUDIENCE=https://ai-chat-api
AUTH0_ISSUER=https://YOUR_AUTH0_DOMAIN/
```

### 3. Create Database

Create PostgreSQL database:

```
ai_chat
```

Update credentials in:

```
src/config/data-source.ts
```

### 4. Run Server

```
npm run dev
```

Server runs at:

```
http://localhost:3000
```

---

## Design Decisions

* External authentication provider used instead of custom auth implementation.
* Subscription billing simulated as required by assessment scope.
* Clean separation between domain logic and transport layer.
* Minimal implementation prioritizing requirement completeness and security.

---

## Author

**MUHAMMAD TAHIR**
