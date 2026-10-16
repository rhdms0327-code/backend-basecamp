---
layout: post
title: "🧭 [개요] 1단계 모던 .NET 기반 — Wallet API 스펙과 진행 계획"
date: 2026-10-16
categories: [ASP.NET Core API]
tags: [.NET 10, C# 14, ASP.NET Core, Controller, 개요]
nav_exclude: true
---

> .NET 10 + ASP.NET Core Controller 방식으로 Wallet(재화 충전·차감) API를 만드는 1단계의 스펙, 진행 방식, 카드별 완료 기준을 정리합니다.

---

## 왜 이 프로젝트를 하는가

개념만 읽어서는 남는 것이 적어서, Wallet(재화 충전·차감) 프로젝트 하나를 단계별로 키우며 모던 .NET 도구를 직접 써보는 방식으로 학습합니다.

- 새 개념은 필요한 시점에 공부하고 바로 프로젝트에 적용합니다.
- 개인 프로젝트라도 PR 단위로 작업하고, 단계마다 "문제 → 원인 → 해결 → 결과"를 남깁니다.
- 일정은 날짜 없이 순서와 완료 기준으로만 관리합니다.

**1단계 완료 기준**: PR을 올리면 테스트가 자동으로 돌고, 인증을 포함한 충전·차감·조회 API가 통과한다.

---

## 스펙

| 영역 | 선택 | 버전 | 이유 |
| :--- | :--- | :--- | :--- |
| 런타임 | .NET | 10 (LTS) | 2028-11까지 지원. .NET 8·9는 2026-11-10에 지원 종료 |
| 언어 | C# | 14 | .NET 10 기본 언어 버전 |
| 웹 | ASP.NET Core (Controller) | 10 | 전통적인 Controller 방식으로 Core의 구조(필터·모델 바인딩·라우팅)를 먼저 익힘 |
| 조회 | EF Core | 10 | 모델·마이그레이션·변경 추적 학습 |
| 거래 | Dapper + Stored Procedure | 2.1.x | 트랜잭션과 락을 SQL에서 직접 통제. ORM과 SQL 매퍼를 언제 쓰는지 비교 |
| DB | SQL Server | 2022+ | 이후 잠금 실습(UPDLOCK)과 맞음. 선택 근거는 ADR-001로 기록 |
| 테스트 | xUnit v3 + Testcontainers | v3 / 4.x | 실제 DB 컨테이너로 통합 테스트 |
| CI | GitHub Actions | — | PR마다 빌드·테스트 |
| 인증 | JWT Bearer | 10.x | 토큰의 사용자 ID로 지갑 소유자 확인 |

> 패치 버전은 도입 시점의 최신 안정판을 확인해 고정합니다. 거래는 SP + Dapper, 조회는 EF Core로 나눈 이유는 1-2 카드에서 ADR-001로 남깁니다.

---

## 진행 방식

카드 하나마다 **[공부] → [플젝]** 순서로 글을 씁니다.

1. **[공부]**: 카드에 필요한 개념만 Microsoft Learn에서 보고 정리합니다. Controller·라우팅·필터처럼 이미 널리 알려진 부분은 빠르게 보고, 모던 .NET에서 달라진 부분(내장 DI, 미들웨어, `Program.cs`, EF Core)에 시간을 씁니다.
2. **[플젝]**: 공부한 내용을 Wallet에 적용하고, 막힌 점과 해결 과정을 남깁니다.
3. 카드의 완료 기준을 만족하면 다음 카드로 넘어갑니다.

---

## 카드별 계획

| 카드 | 주제 | 핵심 내용 | 완료 기준 |
| :--- | :--- | :--- | :--- |
| **0** | C# 문법 따라잡기 | C# 9 이후 달라진 문법 (`record`, `required`, nullable) | 콘솔에서 잔액 충전·차감 예제를 새 문법으로 작성, nullable 경고 0개 |
| **1-1** | ASP.NET Core 뼈대 | `Program.cs`, 미들웨어, Controller, DI 수명 | Scalar에서 API 3개 호출, DI 수명 버그를 재현해 원인 설명 |
| **1-2** | 데이터 연결 | EF Core, 마이그레이션, Dapper + SP | 충전·차감은 SP, 조회는 EF Core로 동작. 마이그레이션으로 빈 DB 재생성 |
| **1-3** | 테스트와 CI | xUnit, Testcontainers, GitHub Actions | PR마다 테스트 자동 실행, 실패 시 병합 차단 |
| **1-4** | 인증과 마무리 | JWT Bearer, `[Authorize]`, CLAUDE.md | 인증 포함 API 통과, 1단계 정리 |

---

## 이 단계의 산출물

| 산출물 | 위치 | 시점 |
| :--- | :--- | :--- |
| 단계별 README | 저장소 `README.md` | 카드마다 갱신 |
| ADR-001 (DB 선택) | 저장소 `docs/adr/` | 1-2 |
| CLAUDE.md (AI 코딩 도구 규칙) | 저장소 루트 | 1-4 |
| Git 저장소 | 생성 후 기입 | 0 시작 전 |

---

## 다음 단계

2단계에서는 같은 API를 Docker로 감싸고 AWS(ECS + RDS)에 배포해, 외부에서 호출할 수 있게 만듭니다.

---

[🔙 뒤로 가기](../index.md)
