---
layout: post
title: "🚀 TypedResults 활용하기"
date: 2026-05-12
categories: [.NET]
tags: [TypedResults, Results, Minimal API, 유닛 테스트]
nav_exclude: true
---

> Minimal API에서 결과를 반환할 때 `Results` 클래스 대신 `TypedResults`를 사용하면 얻을 수 있는 구조적 이점과 실무적 가치를 정리했습니다.

---

## 📌 1. TypedResults의 정의

- **강력한 형식의 결과 반환**: `IResult` 인터페이스를 구현하면서도, 구체적인 반환 형식을 명시적으로 선언할 수 있게 해주는 API입니다.
- **컴파일 타임 체크**: 실행 시점이 아닌 컴파일 시점에 반환 데이터의 형식을 검증할 수 있어 런타임 오류를 사전에 방지합니다.

---

## 🏛️ 2. Results vs TypedResults 비교

| 특징 | Results (기존 방식) | TypedResults (권장 방식) |
| :--- | :--- | :--- |
| **반환 타입** | `IResult` (추상적) | `Ok<T>`, `Created<T>` 등 (구체적) |
| **유닛 테스트** | 결과값 확인을 위해 형변환이 필요함 | 별도의 형변환 없이 속성에 직접 접근 가능 |
| **OpenAPI 연동** | `[ProducesResponseType]` 특성 필요 | 자동으로 응답 형식을 유추하여 문서화함 |

---

## 🚀 3. 주요 도입 효과

1. **단위 테스트(Unit Testing) 최적화**: `TypedResults`를 사용하면 테스트 코드에서 `results.Value`와 같이 결과 데이터에 즉시 접근할 수 있어 테스트 작성이 매우 간결해집니다.
2. **OpenAPI(Swagger) 자동화**: 별도의 메타데이터 설정 없이도 OpenAPI 규격에 응답 모델과 HTTP 상태 코드가 정확하게 반영됩니다.
3. **가독성 및 유지보수**: 메서드 시그니처만 보고도 해당 API가 어떤 데이터를 반환하는지 명확히 파악할 수 있어 협업 효율이 상승합니다.

---

## 🛠️ 4. 경로 처리기(Route Handler) 분리 기법

Minimal API가 성장함에 따라 `Program.cs`의 가독성을 유지하기 위해 로직을 별도의 메서드로 추출하는 것이 실무의 정석입니다.

### 4.1 구조적 차이와 설계 의도
- **기존 방식 (인라인 람다)**: 간단한 프로토타이핑에는 좋지만, 로직이 길어지면 가독성이 떨어지고 단위 테스트가 어렵습니다.
- **개선 방식 (명명된 메서드)**: 로직을 독립된 메서드로 분리합니다. 메서드 이름 자체가 API의 의도를 설명하는 **Self-documenting** 코드가 되며, 재사용성과 테스트 용이성이 확보됩니다.

### 4.2 소스 코드 비교

#### 1) 인라인 람다 방식 (이전 단계)
```csharp
todoItems.MapGet("/", async (TodoDb db) =>
    await db.Todos.ToListAsync());
```

#### 2) 경로 처리기 메서드 방식 (개선)
```csharp
// 1. 엔드포인트 매핑부: "무엇을 실행할지" 이름만 명시합니다.
todoItems.MapGet("/", GetAllTodos);

// 2. 로직 구현부: 실제 동작을 메서드로 정의합니다.
static async Task<IResult> GetAllTodos(TodoDb db)
{
    return TypedResults.Ok(await db.Todos.ToListAsync());
}
```

### 4.3 실무적 관점: 왜 이렇게 하나요?
- **가독성(Readability)**: `Program.cs` 상단만 봐도 서비스가 제공하는 전체 API 지도를 한눈에 파악할 수 있습니다.
- **관심사 분리**: 라우팅 설정(주소)과 비즈니스 로직(동작)을 분리합니다.
- **유닛 테스트**: `static` 메서드로 분리된 `GetAllTodos`는 테스트 프로젝트에서 직접 호출하여 결과를 검증하기 매우 용이합니다.

---

## 💻 5. 종합 예제: TypedResults와 MapGroup이 적용된 Program.cs

지금까지 배운 모든 기법(`TypedResults`, `MapGroup`, `Route Handler 분리`)이 적용된 완성된 형태의 `Program.cs` 예제입니다.

```csharp
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<TodoDb>(opt => opt.UseInMemoryDatabase("TodoList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "TodoAPI";
    config.Title = "TodoAPI v1";
    config.Version = "v1";
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "TodoAPI";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}

// MapGroup을 이용한 라우팅 구조화
var todoItems = app.MapGroup("/todoitems");

// 명명된 메서드(Route Handler)를 이용한 엔드포인트 매핑
todoItems.MapGet("/", GetAllTodos);
todoItems.MapGet("/complete", GetCompleteTodos);
todoItems.MapGet("/{id}", GetTodo);
todoItems.MapPost("/", CreateTodo);
todoItems.MapPut("/{id}", UpdateTodo);
todoItems.MapDelete("/{id}", DeleteTodo);

app.Run();

// --- 로직 구현부 (Route Handlers) ---

static async Task<IResult> GetAllTodos(TodoDb db)
{
    return TypedResults.Ok(await db.Todos.ToArrayAsync());
}

static async Task<IResult> GetCompleteTodos(TodoDb db)
{
    return TypedResults.Ok(await db.Todos.Where(t => t.IsComplete).ToListAsync());
}

static async Task<IResult> GetTodo(int id, TodoDb db)
{
    return await db.Todos.FindAsync(id)
        is Todo todo
            ? TypedResults.Ok(todo)
            : TypedResults.NotFound();
}

static async Task<IResult> CreateTodo(Todo todo, TodoDb db)
{
    db.Todos.Add(todo);
    await db.SaveChangesAsync();

    return TypedResults.Created($"/todoitems/{todo.Id}", todo);
}

static async Task<IResult> UpdateTodo(int id, Todo inputTodo, TodoDb db)
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null) return TypedResults.NotFound();

    todo.Name = inputTodo.Name;
    todo.IsComplete = inputTodo.IsComplete;

    await db.SaveChangesAsync();

    return TypedResults.NoContent();
}

static async Task<IResult> DeleteTodo(int id, TodoDb db)
{
    if (await db.Todos.FindAsync(id) is Todo todo)
    {
        db.Todos.Remove(todo);
        await db.SaveChangesAsync();
        return TypedResults.NoContent();
    }

    return TypedResults.NotFound();
}
```

---

> **Summary**: `TypedResults`는 코드의 명확성을 높이고 테스트 자동화 및 API 문서화 과정을 획기적으로 단순화하는 Minimal API의 필수 요소입니다.

---

[🔙 뒤로 가기](../index.md)
