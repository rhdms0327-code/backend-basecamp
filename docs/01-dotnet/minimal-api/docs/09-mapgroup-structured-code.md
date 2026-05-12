---
layout: post
title: "🚀 MapGroup으로 코드 구조화하기"
date: 2026-05-12
categories: [.NET]
tags: [MapGroup, 라우팅, 코드 구조화, Minimal API]
nav_exclude: true
---

> Minimal API 프로젝트가 커지면 `Program.cs`에 수많은 엔드포인트가 나열되어 가독성이 떨어지게 됩니다. Microsoft는 이를 해결하기 위해 엔드포인트를 논리적으로 그룹화하는 `MapGroup` 기능을 제공합니다.

---

## 📌 1. MapGroup의 정의 및 목적

- **논리적 그룹화**: 공통된 URL 접두사(Prefix)를 가진 엔드포인트들을 하나의 그룹으로 묶어 관리합니다.
- **중복 제거**: 동일한 인증 설정, 미들웨어, 데이터 유효성 검사 등을 그룹 전체에 한 번에 적용하여 보일러플레이트 코드를 획기적으로 줄입니다.
- **유지보수 향상**: API의 구조가 명확해지며, 특정 도메인(예: Todo, User)과 관련된 로직을 한눈에 파악하기 쉬워집니다.

---

## 🏛️ 2. 주요 활용 사례

### 2.1 URL 접두사 통합
`/todoitems`, `/todoitems/{id}`와 같이 반복되는 경로를 `/todoitems` 그룹으로 묶어 코드를 간결하게 유지합니다.

**코드 예시:**
```csharp
var todoItems = app.MapGroup("/todoitems");

todoItems.MapGet("/", GetAllTodos);
```

### 2.2 공통 보안 적용
그룹 전체에 `.RequireAuthorization()`을 추가하여 해당 그룹의 모든 API에 인증을 일괄 적용할 수 있습니다.

### 2.3 OpenAPI 메타데이터 설정
`.WithTags("TodoGroup")` 등을 그룹 단위로 지정하여 Swagger UI에서 API들이 특정 카테고리로 묶여 보이도록 구성합니다.

---

[🔙 뒤로 가기](../index.md)
