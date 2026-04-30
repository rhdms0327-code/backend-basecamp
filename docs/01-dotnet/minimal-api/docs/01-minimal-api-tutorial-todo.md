---
layout: post
title: "🎯 첫 번째 Minimal API 프로젝트 구축 (Todo API)"
date: 2026-04-30
categories: [.NET]
tags: ['Minimal API', '튜토리얼']
nav_exclude: true
---

> Microsoft 공식 튜토리얼을 기반으로 한 첫 번째 Minimal API(Todo 앱) 구축 과정 정리.

이 문서는 Microsoft 공식 튜토리얼을 따라 간단한 **Todo API**를 구축하는 과정을 정리합니다. 메모리 내 데이터베이스(In-memory DB)를 사용하여 CRUD 기능을 구현합니다.

> [!NOTE]
> **공식 튜토리얼:** [Tutorial: Create a minimal API with ASP.NET Core | Microsoft Learn](https://learn.microsoft.com/en-us/aspnet/core/tutorials/min-web-api?view=aspnetcore-10.0)

## 1. 프로젝트 생성 (Create Project)

터미널에서 아래 명령어를 실행하여 새로운 Minimal API 프로젝트를 생성합니다.

```powershell
dotnet new web -o TodoApi
cd TodoApi
code -r ../TodoApi
```

## 2. 필수 패키지 추가 (Add NuGet Packages)

데이터베이스 및 진단 도구를 지원하기 위해 필요한 NuGet 패키지를 설치합니다.

```powershell
# Entity Framework Core 메모리 DB 및 진단 패키지 설치
dotnet add package Microsoft.EntityFrameworkCore.InMemory
dotnet add package Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore
dotnet add package NSwag.AspNetCore
```

## 3. 모델 및 DB 컨텍스트 작성 (Model & DB Context)

데이터를 정의할 **Model**과 이를 관리할 **DB Context** 클래스를 생성합니다.

### Todo.cs (Model)
```csharp
public class Todo
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public bool IsComplete { get; set; }
}
```

### TodoDb.cs (DbContext)
```csharp
using Microsoft.EntityFrameworkCore;

class TodoDb : DbContext
{
    public TodoDb(DbContextOptions<TodoDb> options) : base(options) { }
    public DbSet<Todo> Todos => Set<Todo>();
}
```

## 4. API 엔드포인트 구현 (CRUD Implementation)

`Program.cs`에서 모든 서비스 등록과 엔드포인트를 구성합니다.

### Program.cs 핵심 코드
```csharp
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// DB Context를 DI 컨테이너에 등록 (In-Memory DB 사용)
builder.Services.AddDbContext<TodoDb>(opt => opt.UseInMemoryDatabase("TodoList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

// Swagger 서비스 등록 (NSwag)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config => {
    config.DocumentName = "TodoAPI";
    config.Title = "TodoAPI v1";
    config.Version = "v1";
});

var app = builder.Build();

// Swagger UI 사용 설정
if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(config => {
        config.Path = "/swagger";
    });
}

// 1. 전체 목록 조회 (GET)
app.MapGet("/todoitems", async (TodoDb db) => await db.Todos.ToListAsync());

// 2. 상세 조회 (GET)
app.MapGet("/todoitems/{id}", async (int id, TodoDb db) =>
    await db.Todos.FindAsync(id) is Todo todo ? Results.Ok(todo) : Results.NotFound());

// 3. 항목 생성 (POST)
app.MapPost("/todoitems", async (Todo todo, TodoDb db) => {
    db.Todos.Add(todo);
    await db.SaveChangesAsync();
    return Results.Created($"/todoitems/{todo.Id}", todo);
});

// 4. 항목 수정 (PUT)
app.MapPut("/todoitems/{id}", async (int id, Todo inputTodo, TodoDb db) => {
    var todo = await db.Todos.FindAsync(id);
    if (todo is null) return Results.NotFound();
    todo.Name = inputTodo.Name;
    todo.IsComplete = inputTodo.IsComplete;
    await db.SaveChangesAsync();
    return Results.NoContent();
});

// 5. 항목 삭제 (DELETE)
app.MapDelete("/todoitems/{id}", async (int id, TodoDb db) => {
    if (await db.Todos.FindAsync(id) is Todo todo) {
        db.Todos.Remove(todo);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    return Results.NotFound();
});

app.Run();
```

## 5. 실행 및 테스트 (Run & Test)

1.  **실행:** 터미널에서 `dotnet run` 명령어를 실행합니다.
2.  **Swagger 접속:** 브라우저에서 `https://localhost:<port>/swagger`로 접속합니다.
3.  **테스트:** Swagger UI를 통해 각 엔드포인트(GET, POST, PUT, DELETE)가 정상 동작하는지 확인합니다.

## 6. MapGroup API 활용 (Use the MapGroup API)

URL 접두사가 반복되는 것을 방지하기 위해 `MapGroup` 메서드를 사용하여 엔드포인트를 그룹화할 수 있습니다. 

### Program.cs 변경
`app.MapGet` 등에서 반복되는 `/todoitems` URL을 `MapGroup`으로 묶어 코드를 최적화합니다.

```csharp
var todoItems = app.MapGroup("/todoitems");

todoItems.MapGet("/", async (TodoDb db) => await db.Todos.ToListAsync());
todoItems.MapGet("/complete", async (TodoDb db) => await db.Todos.Where(t => t.IsComplete).ToListAsync());
todoItems.MapGet("/{id}", async (int id, TodoDb db) =>
    await db.Todos.FindAsync(id) is Todo todo ? Results.Ok(todo) : Results.NotFound());
todoItems.MapPost("/", async (Todo todo, TodoDb db) => {
    db.Todos.Add(todo);
    await db.SaveChangesAsync();
    return Results.Created($"/todoitems/{todo.Id}", todo);
});
todoItems.MapPut("/{id}", async (int id, Todo inputTodo, TodoDb db) => {
    var todo = await db.Todos.FindAsync(id);
    if (todo is null) return Results.NotFound();
    todo.Name = inputTodo.Name;
    todo.IsComplete = inputTodo.IsComplete;
    await db.SaveChangesAsync();
    return Results.NoContent();
});
todoItems.MapDelete("/{id}", async (int id, TodoDb db) => {
    if (await db.Todos.FindAsync(id) is Todo todo) {
        db.Todos.Remove(todo);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    return Results.NotFound();
});
```

## 7. TypedResults 반환 (Return TypedResults rather than Results)

`Results` 대신 `TypedResults`를 반환하면 테스트 가능성이 향상되고, OpenAPI에 대한 응답 형식 메타데이터가 자동으로 반환됩니다. 또한 라우트 핸들러를 람다 대신 일반 메서드로 추출하여 가독성을 높일 수 있습니다.

```csharp
var todoItems = app.MapGroup("/todoitems");

todoItems.MapGet("/", GetAllTodos);
todoItems.MapGet("/complete", GetCompleteTodos);
todoItems.MapGet("/{id}", GetTodo);
todoItems.MapPost("/", CreateTodo);
todoItems.MapPut("/{id}", UpdateTodo);
todoItems.MapDelete("/{id}", DeleteTodo);

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
    return await db.Todos.FindAsync(id) is Todo todo ? TypedResults.Ok(todo) : TypedResults.NotFound();
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

## 8. DTO (Data Transfer Object) 적용 및 과도한 게시(Over-posting) 방지

현재 샘플 앱은 전체 `Todo` 객체를 그대로 노출하고 있습니다. 하지만 실제 운영 환경에서는 보안 및 데이터 무결성을 위해 입력 및 반환 가능한 데이터를 제한하여 모델의 일부만 사용하는 경우가 많습니다. 이러한 용도로 사용되는 객체를 보통 **DTO(Data Transfer Object)**, 입력 모델, 또는 뷰 모델이라고 부릅니다.

**DTO를 사용하는 주요 목적:**
*   **과도한 게시(Over-posting) 방지**: 클라이언트가 수정해서는 안 되는 필드까지 강제로 덮어쓰는 취약점을 막습니다.
*   **민감한 속성 숨김**: 클라이언트가 볼 수 없도록 해야 하는 속성(예: `Secret` 필드 등)을 안전하게 숨깁니다.
*   **페이로드 크기 감소**: 불필요한 속성을 생략하여 네트워크 전송량을 줄입니다.
*   **객체 그래프 평면화**: 중첩된 객체를 포함하는 복잡한 데이터 구조를 평면화하여 클라이언트가 다루기 편하게 만듭니다.

이 튜토리얼에서는 DTO 접근 방식을 명확히 설명하기 위해, 내부 엔터티인 `Todo` 클래스에 외부에 노출되면 안 되는 비밀 필드(`Secret`)가 추가되어 있다고 가정하고 DTO를 설계합니다.

### TodoItemDTO.cs 생성
클라이언트에게 노출할 필드만 포함하는 DTO 클래스를 작성합니다.
```csharp
public class TodoItemDTO
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public bool IsComplete { get; set; }

    public TodoItemDTO() { }
    public TodoItemDTO(Todo todoItem) => 
        (Id, Name, IsComplete) = (todoItem.Id, todoItem.Name, todoItem.IsComplete);
}
```

### Program.cs 업데이트 (DTO 적용)
엔드포인트에서 내부 모델인 `Todo` 대신 `TodoItemDTO`를 사용하여 입출력을 처리하도록 코드를 변경합니다.
```csharp
static async Task<IResult> GetAllTodos(TodoDb db)
{
    return TypedResults.Ok(await db.Todos.Select(x => new TodoItemDTO(x)).ToArrayAsync());
}

static async Task<IResult> GetTodo(int id, TodoDb db)
{
    return await db.Todos.FindAsync(id) is Todo todo
        ? TypedResults.Ok(new TodoItemDTO(todo))
        : TypedResults.NotFound();
}

static async Task<IResult> CreateTodo(TodoItemDTO todoItemDTO, TodoDb db)
{
    var todoItem = new Todo
    {
        IsComplete = todoItemDTO.IsComplete,
        Name = todoItemDTO.Name
    };

    db.Todos.Add(todoItem);
    await db.SaveChangesAsync();

    todoItemDTO = new TodoItemDTO(todoItem);

    return TypedResults.Created($"/todoitems/{todoItem.Id}", todoItemDTO);
}

static async Task<IResult> UpdateTodo(int id, TodoItemDTO todoItemDTO, TodoDb db)
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null) return TypedResults.NotFound();

    todo.Name = todoItemDTO.Name;
    todo.IsComplete = todoItemDTO.IsComplete;

    await db.SaveChangesAsync();

    return TypedResults.NoContent();
}
```

---
**학습 출처:** [Microsoft Learn - Tutorial: Create a minimal API](https://learn.microsoft.com/en-us/aspnet/core/tutorials/min-web-api?view=aspnetcore-10.0)
**업데이트 날짜:** 2026-04-27

---

[🔙 뒤로 가기](../index.md)
