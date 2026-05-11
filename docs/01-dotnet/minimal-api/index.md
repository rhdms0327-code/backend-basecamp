---
layout: page
title: "🚀 Minimal API"
has_children: true
parent: ".NET"
nav_order: 2
---

# 🚀 Minimal API

> .NET 10 기반의 가볍고 빠른 Minimal API 구축 아카이브

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

## 📂 리스트 (총 7건)

### 📌 Chapter 01: Minimal API 시작

| 제목 | 키워드 |
| :--- | :--- |
| **[🚀 운영 서버 스펙 (Production Server Specs)](./docs/01-production-server-specs.private.md)** | `기초` |
| **[🚀 .NET Framework -> .NET Core 주요 변경사항](./docs/02-dotnet-migration-key-changes.md)** | `기초` |
| **[🚀 프로젝트 기술 스펙 및 학습 목표](./docs/04-project-spec-and-goals.md)** | `기초` |
| **[🚀 .NET 10 SDK 설치 및 환경 확인](./docs/05-dotnet-installation-guide.md)** | `기초` |
| **[🚀 Minimal API와 Controller-based API 비교](./docs/06-minimal-api-overview.md)** | `API 방식 비교` `Controller-based API` |

### 📌 Chapter 02: MS 공식 문서로 공부하기

| 제목 | 키워드 |
| :--- | :--- |
| **[🚀 Tutorial: Create a Minimal API](./docs/07-minimal-api-tutorial.md)** | `최소 API 만들기` `튜토리얼` |
| **[🚀 현대적 Minimal API 표준 폴더 구조](./docs/02-minimal-api-folder-structure.md)** | `Minimal API` `튜토리얼` |


