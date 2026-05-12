---
layout: post
title: "🧠 Minimal API와 Controller-based API 비교"
date: 2026-04-30
categories: [.NET]
tags: ['API 방식 비교', 'Controller-based API']
nav_exclude: true
---

> ASP.NET Core API 접근 방식 개요 (Minimal APIs vs Controller-based APIs 비교).

ASP.NET Core는 HTTP API를 구축하기 위해 **Minimal APIs**와 **Controller-based APIs**라는 두 가지 주요 접근 방식을 제공합니다. Microsoft는 신규 프로젝트에서 Minimal APIs 사용을 권장합니다.

## 📝 ASP.NET Core: MVC vs Minimal API 구조 비교

.NET 10 환경에서 API 아키텍처를 설계할 때 가장 먼저 마주하는 선택지는 기존의 MVC(Controller) 방식과 현대적인 Minimal API 방식입니다. 두 방식의 구조적 차이와 설계 의도를 정리했습니다.

### 1. 기존 MVC 방식 (Classic Approach) 🏛️

기존 MVC 방식은 엄격한 클래스 기반의 구조를 가집니다. API 하나를 추가하기 위해 컨트롤러 클래스 생성, 상속, 생성자 정의 등 여러 단계의 **보일러플레이트(Boilerplate)** 코드가 수반됩니다. 객체 지향 패턴을 따르며 MVC 패턴에 익숙한 팀에게 친숙합니다.
> 📌 **보일러플레이트(Boilerplate) ?**
> 
> **정의**: 비즈니스 로직과 직접적인 관련은 없으나, 시스템 구조 유지를 위해 반복적으로 작성해야 하는 규격화된 코드입니다. 📝
> 
> **유래**: 19세기 신문사에서 광고 등 고정된 내용을 인쇄하기 위해 사용했던 복제용 철판에서 시작되었습니다. 🏗️

- **특징**: 클래스 단위의 코드 관리, 속성 라우팅(Attribute Routing) 사용.
- **적합한 경우**:
  - 비즈니스 로직이 매우 복잡하고 규모가 큰 애플리케이션
  - **JsonPatch**나 **OData**와 같은 MVC 전용 기능이 필요한 경우
  - 고급 Model Binding이나 Validation 확장성이 필요한 경우

**코드 예시:**
```csharp
[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private readonly ITodoService _service;

    public TodoController(ITodoService service) // 생성자를 통한 의존성 주입
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() 
    {
        var todos = await _service.GetListAsync();
        return Ok(todos);
    }
}
```

### 2. Minimal API 방식 (Modern Approach) 🚀

Minimal API는 .NET 6부터 도입되어 .NET 10에서 더욱 완성되었습니다. 불필요한 클래스 선언을 배제하고 `Program.cs`에서 직접 엔드포인트를 정의하는 방식입니다. 최소한의 코드와 설정만으로 API를 구축할 수 있는 단순화된 고성능 접근 방식입니다. (Microsoft 권장 방식)

- **특징**: 함수형 프로그래밍 스타일, 핸들러 단위의 의존성 주입, 낮은 오버헤드.

**코드 예시:**
```csharp
// 서비스 등록 및 빌드 과정은 생략 (Program.cs 내부)
app.MapGet("/api/todo", async (ITodoService service) => 
    Results.Ok(await service.GetListAsync()));
```

## 3. Choosing Between Approaches

| Feature | Minimal APIs | Controller-based APIs |
| :--- | :--- | :--- |
| **Setup Complexity** | 매우 낮음 (단일 파일 가능) | 보통 (여러 파일/클래스 필요) |
| **Performance** | **매우 높음** (낮은 오버헤드) | 표준 |
| **Boilerplate** | 최소화됨 | 높음 (Controllers, Actions, Attributes) |
| **Learning Curve** | 낮음 | 보통 (MVC 패턴 이해 필요) |
| **Extensibility** | Middleware / Filters | Filters / Model Binders / App Model |

---
**Source:** [APIs overview | Microsoft Learn (ASP.NET Core 10.0)](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/apis?view=aspnetcore-10.0)

---

[🔙 뒤로 가기](../index.md)
