---
layout: page
title: "🚀 Minimal API"
has_children: true
parent: ".NET"
nav_order: 2
---

# 🚀 Minimal API

> .NET 10 기반의 가볍고 빠른 Minimal API 구축 아카이브

**🏃‍♂️ Current Sprint: Sprint 1 (05/11 ~ 05/24)**  
*API 기초 - Minimal API 심화 학습 및 프로젝트 환경 완벽 세팅*

### 📅 상세 일정

| 기간 | 학습 주제 | MS Learn 참고 메뉴 (왼쪽 사이드바 기준) |
| :--- | :--- | :--- |
| **5/12 (화)** | [오전] 기초 공사 및 DI<br>[오후] 라우팅 및 데이터 바인딩 | - Tutorial: Create a minimal API<br>- WebApplication and WebApplicationBuilder<br>- Route handlers<br>- Parameter binding<br>- Create responses |
| **5/13 (수)** | 미들웨어 기반 다지기 | - Middleware |
| **5/14 (목)** | 전역 예외 처리 및 로깅 | - Handle errors |
| **5/15 (금)** | 보안 기초 (Auth) | - Authentication and authorization |
| **5/18 ~ 5/22** | 아키텍처 고도화 및 회고 | 위 문서들을 종합하여 Service/DTO 레이어 분리 및 Dapper 연동 준비 |

---

## 🎯 Sprint 1: 학습 목표 및 계획

### 1. 🏁 목표 (Goals)
- .NET 10 Minimal API 표준 아키텍처 정립
- Sprint 2(Dapper 연동) 진입을 위한 API 스켈레톤 완성

### 2. 📚 핵심 학습 범위 (Study Areas)
- Tutorial: Create a Minimal API
- WebApplication and WebApplicationBuilder
- Route Handlers
- Parameter binding
- Create responses
- Middleware
- Handle errors
- Authentication and authorization

### 3. 💡 집중 포인트 (Key Points)
- **구조 전환**: 기존 Controller 방식이 아닌 Minimal API 매핑 방식 내재화
- **실무 설계**: MS Learn 학습 내용을 프로젝트 레이어(Service, DTO)에 즉시 적용
- **확장성**: Dapper/EF Core를 얹을 수 있는 의존성 주입(DI) 구조 확보

### 4. 📦 결과물 (Deliverables)
- **API Skeleton**: .NET 10 프로젝트 기본 구조 및 솔루션 구성
- **Dummy Endpoints**: 조회·수행 로직이 포함될 가짜(Mock) API 3~5개
- **Standard Logic**: 전역 예외 처리기 및 로깅 미들웨어
- **Configuration**: 환경별 `appsettings.json` 설정 및 서비스 등록 체계 완료

---

## 📂 리스트 (총 16건)

### 📌 Chapter 01: Minimal API 시작

| 제목 | 키워드 |
| :--- | :--- |
| **[🚀 운영 서버 스펙 (Production Server Specs)](./docs/01-production-server-specs.private.md)** | `기초` |
| **[🚀 .NET Framework -> .NET Core 주요 변경사항](./docs/02-dotnet-migration-key-changes.md)** | `기초` |
| **[🚀 프로젝트 기술 스펙 및 학습 목표](./docs/04-project-spec-and-goals.md)** | `기초` |
| **[🚀 .NET 10 SDK 설치 및 환경 확인](./docs/05-dotnet-installation-guide.md)** | `기초` |
| **[🚀 Minimal API와 Controller-based API 비교](./docs/06-minimal-api-overview.md)** | `API 방식 비교` `Controller-based API` |

### 📌 Chapter 02: 🚀 Tutorial: Create a Minimal API

> 💡 **공식 레퍼런스**: 본 챕터의 문서들은 Microsoft 공식 학습 가이드인 [자습서: ASP.NET Core를 사용하여 최소 API 만들기](https://learn.microsoft.com/ko-kr/aspnet/core/tutorials/min-web-api?view=aspnetcore-10.0&tabs=visual-studio-code)를 실무 환경(VS Code)에 맞게 직접 테스트하고 지식화한 기록입니다.

| 제목 | 키워드 |
| :--- | :--- |
| **[🚀 현대적 Minimal API 표준 폴더 구조](./docs/02-minimal-api-folder-structure.md)** | `폴더 구조` `아키텍처` `엔드포인트 분리` `DTO 폴더구조` `record DTO` |
| **[🚀 Minimal API 프로젝트 생성 및 엔드포인트 기초](./docs/07-minimal-api-tutorial.md)** | `프로젝트 생성` `CRUD` `인메모리 DB` |
| **[🚀 OpenAPI와 Swagger UI 구축](./docs/08-openapi-and-swagger.md)** | `OpenAPI` `Swagger` |
| **[🚀 MapGroup으로 코드 구조화하기](./docs/09-mapgroup-structured-code.md)** | `MapGroup` |
| **[🚀 TypedResults 활용하기](./docs/10-typed-results-usage.md)** | `TypedResults` `Results` |
| **[🛡️ Over-posting 방지 전략](./docs/11-over-posting-prevention.md)** | `초과 게시` `DTO` `DTO 명명규칙` |

### 📌 Chapter 03: WebApplication and WebApplicationBuilder

> 💡 **공식 레퍼런스**: 본 챕터의 문서들은 Microsoft 공식 학습 가이드인 [WebApplication and WebApplicationBuilder in Minimal APIs](https://learn.microsoft.com/ko-kr/aspnet/core/fundamentals/minimal-apis/webapplication?view=aspnetcore-10.0)를 바탕으로 학습한 내용을 정리한 기록입니다.

| 제목 | 키워드 |
| :--- | :--- |
| **[🚀 WebApplication vs WebApplicationBuilder](./docs/12-webapplication-vs-builder.md)** | `WebApplication` `WebApplicationBuilder` |
| **[🌐 포트 설정](./docs/13-port-configuration-guide.md)** | `포트 설정` `ASPNETCORE_URLS` |
| **[🔒 HTTPS 및 인증서 설정 가이드](./docs/14-https-and-certificates.md)** | `https` `인증서 설정` |
| **[🚀 인프라 관리의 핵심 (환경, 설정, 로깅)](./docs/15-infrastructure-management.md)** | `environment` `configuration` `logging` |
| **[🚀 Spring Boot vs .NET Core: DI 스코프 비교](./docs/16-di-scope-comparison.md)** | `di` `scope` `singleton` `scoped` `request` `transient` |


