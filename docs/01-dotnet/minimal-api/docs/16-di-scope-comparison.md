---
layout: post
title: "🚀 Spring Boot vs .NET Core: DI 스코프(Scope) 완벽 비교"
date: 2026-05-12
categories: [Minimal API]
tags: [di, scope, singleton, scoped, request, transient]
nav_exclude: true
---

> - 의존성 주입(DI)은 객체의 생명주기를 관리하는 핵심 메커니즘입니다.
> - Java Spring Boot와 .NET Core의 설계 철학 차이에 따른 객체 수명 정의 방식을 대조하여 정리합니다.

---

## 1. 📍 Spring Boot와 .NET의 DI 스코프 매핑

| 구분 | Spring Boot (Scope) | .NET (Lifetime) | 설명 |
| :--- | :--- | :--- | :--- |
| **전역 공유** | `Singleton` | `Singleton` | 애플리케이션 수명 동안 단 하나의 인스턴스만 생성하여 공유합니다. |
| **매번 생성** | `Prototype` | `Transient` | 서비스를 요청(주입)할 때마다 항상 새로운 인스턴스를 생성합니다. |
| **요청 단위** | `Request` | `Scoped` | 하나의 HTTP 요청이 시작되어 종료될 때까지 동일한 인스턴스를 유지합니다. |
| **세션 단위** | `Session` | (직접 지원 안 함) | 사용자의 HTTP 세션 동안 인스턴스를 유지합니다. (.NET은 보통 Scoped 내에서 처리하거나 별도 구현합니다.) |

---

## 2. 📍 진영별 기본 스코프(Default Scope) 정책

Spring Boot와 .NET Core는 서비스 등록 시 수명을 결정하는 정책에서 뚜렷한 차이를 보입니다.

| 진영 | 기본 스코프 (Default) | 설계 의도 및 특징 |
| :--- | :--- | :--- |
| **Spring Boot** | `Singleton` | 별도의 설정을 하지 않으면 모든 Bean은 싱글톤으로 관리됩니다. 객체 생성 비용을 줄이고 전역적인 상태 관리를 용이하게 하려는 의도입니다. |
| **.NET Core** | (없음 / 명시적 선언) | .NET은 서비스 등록 시 `AddSingleton`, `AddScoped`, `AddTransient` 중 하나를 반드시 선택해야 합니다. 기본값이 없으므로 개발자가 의도에 맞는 수명을 직접 결정해야 합니다. |

---

## 3. 📍 .NET 명시적 서비스 등록 예시

실무에서 가장 흔히 사용하는 패턴을 기준으로 코드를 구성해 보겠습니다.

```csharp
var builder = WebApplication.CreateBuilder(args);

// 1. Singleton: 앱 전체에서 딱 하나만 생성되어 공유됩니다.
// 예: 설정 정보를 관리하는 클래스나 인메모리 캐시 매니저 등
builder.Services.AddSingleton<ICacheService, MemoryCacheService>();

// 2. Scoped: 하나의 HTTP 요청이 들어와서 끝날 때까지만 유효합니다.
// 예: 비즈니스 로직을 담은 서비스 클래스나 DB Context(Entity Framework)
builder.Services.AddScoped<IOrderService, OrderService>();

// 3. Transient: 주입될 때마다 매번 새로운 객체를 찍어냅니다.
// 예: 상태를 저장하지 않는 순수 계산용 유틸리티나 가벼운 헬퍼 클래스
builder.Services.AddTransient<ITaxCalculator, TaxCalculator>();

var app = builder.Build();

---

[🔙 뒤로 가기](../index.md)
