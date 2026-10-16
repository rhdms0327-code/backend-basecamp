---
layout: page
title: "🌐 ASP.NET Core API (Controller)"
has_children: true
parent: ".NET"
nav_order: 3
---

# 🌐 ASP.NET Core API (Controller)

> .NET 10 + ASP.NET Core Controller 방식으로 Wallet(재화 충전·차감) API를 만들며, 필요한 개념을 공부하고 바로 프로젝트에 적용한 기록입니다.

---

## 📋 프로젝트 스펙

| 항목 | 내용 | 비고 |
| :--- | :--- | :--- |
| **런타임** | .NET 10 (LTS) | 2028-11까지 지원 |
| **언어** | C# 14 | Nullable 활성 |
| **웹 프레임워크** | ASP.NET Core 10 | Controller 방식 (`[ApiController]`) |
| **데이터** | EF Core 10 + Dapper | 거래(충전·차감)는 SP + Dapper, 조회는 EF Core |
| **DB** | SQL Server | 선택 근거는 ADR-001 |
| **테스트** | xUnit v3 + Testcontainers | 실제 DB로 통합 테스트 |
| **CI** | GitHub Actions | PR마다 테스트 자동 실행 |
| **Git 저장소** | 생성 후 기입 | Public 예정 |

---

## 🧭 진행 방식

카드 하나마다 **[공부] → [플젝]** 순서로 글을 씁니다.

1. **[공부]**: 카드에 필요한 개념만 Microsoft Learn에서 보고 정리합니다.
2. **[플젝]**: 공부한 내용을 Wallet 프로젝트에 적용하고, 막힌 점과 해결 과정을 남깁니다.
3. 카드의 완료 기준을 만족하면 다음 카드로 넘어갑니다.

---

## 📂 리스트

### 📌 개요

| 제목 | 키워드 |
| :--- | :--- |
| **[🧭 [개요] 1단계 모던 .NET 기반 — Wallet API 스펙과 진행 계획](./docs/00-overview.md)** | `개요` `스펙` `카드 계획` |

### 📌 카드 0: C# 문법 따라잡기 (C# 9 → 14)

**완료 기준**: 콘솔에서 잔액 충전·차감 계산 예제를 새 문법으로 작성했고, nullable 경고가 0개다.

| 구분 | 제목 | 키워드 |
| :--- | :--- | :--- |
| [공부] | 작성 예정 | `record` `required` `primary constructor` `컬렉션 식` `nullable` |
| [플젝] | 작성 예정 | `콘솔 예제` |

### 📌 카드 1-1: ASP.NET Core 뼈대

**완료 기준**: Scalar 화면에서 조회·충전·차감 API 3개를 호출할 수 있고, DI 수명 버그를 재현해 원인을 설명할 수 있다.

| 구분 | 제목 | 키워드 |
| :--- | :--- | :--- |
| [공부] | 작성 예정 | `Program.cs` `미들웨어` `Controller` `라우팅` `모델 바인딩` `DI 수명` |
| [플젝] | 작성 예정 | `메모리 저장소 API` `DI 수명 버그` `Problem Details` |

### 📌 카드 1-2: 데이터 연결

**완료 기준**: 충전·차감은 SP, 조회는 EF Core로 동작한다. 마이그레이션만으로 빈 DB를 다시 만들 수 있다.

| 구분 | 제목 | 키워드 |
| :--- | :--- | :--- |
| [공부] | 작성 예정 | `EF Core` `DbContext` `마이그레이션` `변경 추적` `Dapper` |
| [플젝] | 작성 예정 | `SQL Server` `SP` `ADR-001` |

### 📌 카드 1-3: 테스트와 CI

**완료 기준**: PR을 올리면 단위·통합 테스트가 자동으로 돌고, 테스트가 실패하면 병합이 막힌다.

| 구분 | 제목 | 키워드 |
| :--- | :--- | :--- |
| [공부] | 작성 예정 | `xUnit` `NSubstitute` `Testcontainers` `WebApplicationFactory` |
| [플젝] | 작성 예정 | `GitHub Actions` `브랜치 보호` |

### 📌 카드 1-4: 인증과 마무리

**완료 기준**: PR을 올리면 테스트가 자동으로 돌고, 인증을 포함한 충전·차감·조회 API가 통과한다.

| 구분 | 제목 | 키워드 |
| :--- | :--- | :--- |
| [공부] | 작성 예정 | `JWT Bearer` `Authorize` |
| [플젝] | 작성 예정 | `소유자 검증` `CLAUDE.md` `1단계 정리` |
