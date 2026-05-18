---
layout: post
title: "🚀 DI 컨테이너 액세스"
date: 2026-05-13
categories: [Minimal API]
tags: [DI, CreateScope]
nav_exclude: true
---

> **애플리케이션 시작 단계나 엔드포인트에서 DI(Dependency Injection) 컨테이너에 직접 접근하여 서비스를 가져오는 방법과 키(Keyed) 서비스를 사용하는 방법을 학습합니다.**

---

## 🛠️ 애플리케이션 시작 시 DI 서비스 액세스

애플리케이션이 실행되기 전(`app.Run()` 호출 전)이나 초기화 단계에서 DI 컨테이너에 등록된 서비스를 직접 가져와야 하는 경우가 있습니다. 이때는 `WebApplication.Services`를 통해 `IServiceProvider`에 접근할 수 있습니다.

특히 **Scoped** 서비스의 경우, 직접 `CreateScope()`를 호출하여 범위를 생성한 뒤 서비스를 가져와야 합니다.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddScoped<SampleService>();

var app = builder.Build();

app.MapControllers();

// DI 컨테이너에서 Scope를 생성하여 서비스 가져오기
using (var scope = app.Services.CreateScope())
{
    var sampleService = scope.ServiceProvider.GetRequiredService<SampleService>();
    sampleService.DoSomething();
}

app.Run();
```

프레임워크가 알아서 관리해 주는 자동화된 컨텍스트(HTTP 요청)가 없는 곳에서, 개발자가 직접 DI 컨테이너의 혜택을 누리기 위해 임시로 열어두는 **수동 작업 공간**이라고 보시면 됩니다.

*   **안전한 생명주기 관리**: `using` 블록을 탈출하는 순간, 이 작업 공간 안에서 만들어진 모든 Scoped 객체(예: DB Context)의 `Dispose()`가 호출되어 메모리에서 깔끔하게 정리됩니다.
*   **실무적 활용**: 주로 애플리케이션 시작 시 데이터베이스 마이그레이션을 실행하거나, 초기 기초 데이터를 밀어 넣는(**Data Seeding**) 작업에 이 패턴을 표준적으로 사용합니다.

---

## HTTP 요청 vs 수동 생성

평소 Minimal API나 Controller에서 Scoped 서비스를 주입받을 수 있었던 이유는 프레임워크가 보이지 않는 곳에서 대신 범위를 만들어 주었기 때문입니다.

| 구분 | HTTP 요청 (자동) | CreateScope (수동) |
| :--- | :--- | :--- |
| **생성 주체** | ASP.NET Core 프레임워크 | 개발자 (직접 호출) |
| **시작 시점** | 브라우저가 API를 호출할 때 | `app.Services.CreateScope()` 실행 시 |
| **종료 시점** | 응답(Response)이 나갈 때 | `using` 블록이 끝날 때 |
| **목적** | 단일 요청 내 데이터 일관성 | 요청 외부(배치, 초기화)에서 Scoped 서비스 사용 |

---

## 🔑 키기반 서비스(Keyed Services) 액세스

.NET 8부터 도입된 **Keyed Services** 기능을 사용하면, 동일한 인터페이스를 여러 개의 키로 구분하여 등록하고 가져올 수 있습니다. Minimal API에서는 `[FromKeyedServices]` 특성을 사용하여 특정 키에 해당하는 서비스를 주입받습니다.

```csharp
var builder = WebApplication.CreateBuilder(args);

// 키를 지정하여 서비스 등록 (big, small)
builder.Services.AddKeyedSingleton<ICache, BigCache>("big");
builder.Services.AddKeyedSingleton<ICache, SmallCache>("small");

var app = builder.Build();

// [FromKeyedServices] 특성을 사용하여 특정 키의 서비스 주입
app.MapGet("/big", ([FromKeyedServices("big")] ICache bigCache) => bigCache.Get("date"));

app.MapGet("/small", ([FromKeyedServices("small")] ICache smallCache) => smallCache.Get("date"));

app.Run();

public interface ICache
{
    object Get(string key);
}

public class BigCache : ICache
{
    public object Get(string key) => $"Resolving {key} from big cache.";
}

public class SmallCache : ICache
{
    public object Get(string key) => $"Resolving {key} from small cache.";
}
```

---

## 💡 실무적 활용 시나리오 (Keyed Services)

하나의 인터페이스(Interface)에 대해 여러 개의 구현체(Implementation)가 존재할 때, 이를 명확하게 구분하여 주입받기 위해 사용합니다.

#### 1. 동일한 기능을 수행하지만 메커니즘이 다른 경우
결제 시스템에서 `IPaymentService`를 구현하는 `CardPayment`, `BankTransfer`, `PointsPayment`를 각각의 키로 등록하고, 사용자의 선택에 따라 적절한 서비스를 주입받을 수 있습니다.

#### 2. 저장소 전략의 분리
데이터의 성격에 따라 `IStorageService`를 `LocalStorage`와 `CloudStorage`로 나누어 등록합니다. 예를 들어 일반적인 로그는 로컬에 저장하고, 사용자의 업로드 파일은 클라우드에 저장하도록 엔드포인트마다 다르게 설정할 수 있습니다.

---

[🔙 뒤로 가기](../index.md)
