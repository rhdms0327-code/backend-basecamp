---
layout: post
title: "🎯 Minimal API JSON 직렬화 옵션 구성 (JSON Serialization Options)"
date: 2026-04-30
categories: [.NET]
tags: ['Minimal API', '튜토리얼']
nav_exclude: true
---

> 

Minimal API는 기본적으로 JSON 응답을 생성하거나 들어오는 요청을 파싱할 때 `System.Text.Json`의 **Web defaults** (`JsonSerializerDefaults.Web`) 설정을 사용합니다. (예: 낙타 표기법(Camel Case) 기본 적용 등)

이러한 기본 직렬화 옵션을 변경해야 할 경우, **전역(Global) 설정**과 **엔드포인트별(Per-Endpoint) 설정** 두 가지 방식을 사용할 수 있습니다.

## 1. 전역(Global) 직렬화 옵션 구성
앱 내의 모든 Minimal API 엔드포인트에 일괄적으로 적용할 JSON 옵션을 설정하려면 `builder.Services.ConfigureHttpJsonOptions`를 사용합니다.

```csharp
var builder = WebApplication.CreateBuilder(args);

// 모든 Minimal API에 전역으로 적용될 JSON 옵션 설정
builder.Services.ConfigureHttpJsonOptions(options =>
{
    // JSON 응답을 보기 좋게 들여쓰기 (디버깅 시 유용)
    options.SerializerOptions.WriteIndented = true; 
    
    // 프로퍼티(Property)뿐만 아니라 public 필드(Field)도 직렬화 대상에 포함
    options.SerializerOptions.IncludeFields = true; 
});

var app = builder.Build();
```

*   **참고:** 이 설정은 기존 MVC 컨트롤러에서 사용하는 `AddJsonOptions`와는 완전히 별개의 파이프라인입니다. Minimal API 전용 설정이라는 점을 기억해야 합니다.

## 2. 엔드포인트별(Per-Endpoint) 직렬화 옵션 구성
앱 전체가 아닌 **특정 엔드포인트**에서만 일회성으로 다른 직렬화 규칙을 적용하고 싶다면, `Results.Json` (또는 `TypedResults.Json`) 호출 시 두 번째 파라미터로 `JsonSerializerOptions` 객체를 전달하면 됩니다.

```csharp
using System.Text.Json;

var app = WebApplication.Create();

// Web 기본값을 바탕으로 커스텀 옵션 객체 생성
var customOptions = new JsonSerializerOptions(JsonSerializerDefaults.Web) 
{ 
    WriteIndented = true 
};

// 이 엔드포인트에만 커스텀 JSON 옵션 적용
app.MapGet("/", () => 
    Results.Json(new Todo { Name = "Walk dog", IsComplete = false }, customOptions)
);

app.Run();
```

### 💡 (참고) HttpContext를 직접 다루는 경우
만약 `IResult`를 반환하는 대신 `HttpContext`를 이용해 응답 스트림에 직접 쓰는 방식을 사용 중이라면, `WriteAsJsonAsync` 확장 메서드에 옵션을 넘겨줄 수도 있습니다.

```csharp
app.MapGet("/", (HttpContext context) => 
    context.Response.WriteAsJsonAsync<Todo>(
        new Todo { Name = "Walk dog", IsComplete = false }, 
        customOptions
    )
);
```

---

[🔙 뒤로 가기](../index.md)
