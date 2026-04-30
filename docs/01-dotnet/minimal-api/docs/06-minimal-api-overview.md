---
layout: post
title: "🧠 Minimal API Overview"
date: 2026-04-30
categories: [.NET]
tags: ['Minimal API', 'Core']
nav_exclude: true
---

> ASP.NET Core API 접근 방식 개요 (Minimal APIs vs Controller-based APIs 비교).

ASP.NET Core는 HTTP API를 구축하기 위해 **Minimal APIs**와 **Controller-based APIs**라는 두 가지 주요 접근 방식을 제공합니다. Microsoft는 신규 프로젝트에서 Minimal APIs 사용을 권장합니다.

## 1. Minimal APIs (Recommended)

Minimal APIs는 최소한의 코드와 설정만으로 API를 구축할 수 있는 단순화된 고성능 접근 방식입니다.

### Key Features
- **Simplified Syntax:** Controller에 비해 보일러플레이트(Boilerplate) 코드가 획기적으로 적습니다.
- **Better Performance:** 전통적인 MVC Controller 파이프라인을 건너뛰어 오버헤드를 줄이고 성능을 높였습니다.
- **Fluent Declaration:** `MapGet`, `MapPost` 등을 사용하여 직관적으로 Route와 Action을 선언합니다.

### Basic Example
```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

## 2. Controller-based APIs

`ControllerBase`를 상속받는 클래스를 사용하는 전통적인 방식입니다. 객체 지향 패턴을 따르며 MVC 패턴에 익숙한 팀에게 친숙합니다.

### When to use Controllers
- 비즈니스 로직이 매우 복잡하고 규모가 큰 애플리케이션.
- **JsonPatch**나 **OData**와 같은 MVC 전용 기능이 필요한 경우.
- 고급 Model Binding이나 Validation 확장성이 필요한 경우.

## 3. Choosing Between Approaches

| Feature | Minimal APIs | Controller-based APIs |
| :--- | :--- | :--- |
| **Setup Complexity** | 매우 낮음 (단일 파일 가능) | 보통 (여러 파일/클래스 필요) |
| **Performance** | **매우 높음** (낮은 오버헤드) | 표준 |
| **Boilerplate** | 최소화됨 | 높음 (Controllers, Actions, Attributes) |
| **Learning Curve** | 낮음 | 보통 (MVC 패턴 이해 필요) |
| **Extensibility** | Middleware / Filters | Filters / Model Binders / App Model |

## 4. Why Minimal APIs for .NET 10?

Minimal APIs는 단순히 "작은" 앱만을 위한 것이 아닙니다. 현대적이고 가벼운 프레임워크의 성능 이점을 유지하면서도, 대규모의 복잡한 시스템으로 확장할 수 있는 설정과 사용자 정의 기능을 모두 지원합니다.

---
**Source:** [APIs overview | Microsoft Learn (ASP.NET Core 10.0)](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/apis?view=aspnetcore-10.0)

---

[🔙 뒤로 가기](../index.md)
