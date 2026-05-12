---
layout: post
title: "🚀 Minimal API 프로젝트 생성 및 엔드포인트 기초"
date: 2026-05-11
categories: [.NET]
tags: ['최소 API 만들기', '튜토리얼']
nav_exclude: true
---

> MS 공식 문서 튜토리얼을 기반으로 한 Minimal API 생성 가이드 (작성 중)

---

## API 프로젝트 만들기

다음 명령을 실행합니다.

```bash
dotnet new web -o TodoApi
cd TodoApi
code -r ../TodoApi
```

- `dotnet`: .NET CLI 실행 본체
- `new web`: 프로젝트 템플릿 선택 명령. `web`은 'ASP.NET Core Empty'를 의미
- `-o`: 출력(Output) 옵션. 생성할 폴더 이름을 지정
- `code`: VS Code 실행 명령
- `-r`: 현재 창 재사용(Reuse window) 옵션
- `../TodoApi`: 상위 폴더(`../`)로 나가서 `TodoApi` 폴더를 지정하는 경로

---

## Program.cs 코드

`Program.cs` 파일에는 다음 코드가 포함되어 있습니다.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

앞의 코드가 하는 역할은 다음과 같습니다.
- 미리 구성된 기본값을 사용하여 `WebApplicationBuilder` 및 `WebApplication`을 만듭니다.
- `Hello World!`를 반환하는 HTTP GET 엔드포인트 `/`를 만듭니다.

---

## 앱 실행

다음 명령을 실행하여 HTTPS 개발 인증서를 신뢰합니다.

```bash
dotnet dev-certs https --trust
```

**실행** `Ctrl+F5` (디버깅 없이)

**중지**: `Shift+F5`

기본 브라우저는 다음 URL `https://localhost:<port>`를 사용하여 시작됩니다. 

---

## NuGet 패키지 추가

이 튜토리얼에서 사용되는 데이터베이스 및 진단 기능을 지원하려면 NuGet 패키지를 추가해야 합니다.

다음 명령을 실행하여 패키지를 설치합니다.

```bash
dotnet add package Microsoft.EntityFrameworkCore.InMemory                # DB 대신 RAM(메모리)을 저장소로 사용
dotnet add package Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore  # 에러를 브라우저에 친절하게 설명해줌
```

---

## 모델 및 데이터베이스 컨텍스트 클래스

다음 코드가 포함된 `Models/Entities/Todo.cs` 파일을 만듭니다.

```csharp
public class Todo
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public bool IsComplete { get; set; }
}
```

앞의 코드는 이 앱에 대한 모델을 만듭니다. 모델은 앱에서 관리하는 데이터를 나타내는 일련의 클래스입니다.

다음 코드를 사용하여 `Data/TodoDb.cs` 파일을 만듭니다.

```csharp
using Microsoft.EntityFrameworkCore;

class TodoDb : DbContext
{
    public TodoDb(DbContextOptions<TodoDb> options)
        : base(options) { }

    public DbSet<Todo> Todos => Set<Todo>();
}
```

앞의 코드는 데이터 모델에 대한 Entity Framework 기능을 조정하는 기본 클래스인 데이터베이스 컨텍스트를 정의합니다. 이 클래스는 `Microsoft.EntityFrameworkCore.DbContext` 클래스에서 파생됩니다.

---

## API 코드 추가

`Program.cs` 파일의 내용을 다음 코드로 바꿉니다.

```csharp
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<TodoDb>(opt => opt.UseInMemoryDatabase("TodoList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
var app = builder.Build();

app.MapGet("/todoitems", async (TodoDb db) =>
    await db.Todos.ToListAsync());

app.MapGet("/todoitems/complete", async (TodoDb db) =>
    await db.Todos.Where(t => t.IsComplete).ToListAsync());

app.MapGet("/todoitems/{id}", async (int id, TodoDb db) =>
    await db.Todos.FindAsync(id)
        is Todo todo
            ? Results.Ok(todo)
            : Results.NotFound());

app.MapPost("/todoitems", async (Todo todo, TodoDb db) =>
{
    db.Todos.Add(todo);
    await db.SaveChangesAsync();

    return Results.Created($"/todoitems/{todo.Id}", todo);
});

app.MapPut("/todoitems/{id}", async (int id, Todo inputTodo, TodoDb db) =>
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null) return Results.NotFound();

    todo.Name = inputTodo.Name;
    todo.IsComplete = inputTodo.IsComplete;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/todoitems/{id}", async (int id, TodoDb db) =>
{
    if (await db.Todos.FindAsync(id) is Todo todo)
    {
        db.Todos.Remove(todo);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }

    return Results.NotFound();
});

app.Run();
```

---

### 💡 주요 서비스 등록 및 DI(의존성 주입) 이해

```csharp
builder.Services.AddDbContext<TodoDb>(opt => opt.UseInMemoryDatabase("TodoList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
```

DI 컨테이너는 데이터베이스 컨텍스트 및 기타 서비스에 대한 액세스를 제공합니다.

#### 1. AddDbContext: 데이터베이스 컨텍스트 등록 🗄️

`AddDbContext`는 Entity Framework Core(EF Core)의 핵심인 `DbContext`를 애플리케이션의 의존성 주입(DI) 컨테이너에 등록하는 역할을 수행합니다.

- **역할**: 애플리케이션 전체에서 데이터베이스 작업을 수행할 수 있도록 컨텍스트 객체의 생명주기를 관리합니다.
- **설계 의도**: 개발자가 매번 데이터베이스 연결 객체를 직접 생성하고 해제하는 보일러플레이트 코드를 제거합니다. 이를 통해 필요한 곳에서 인자로 선언하기만 하면 프레임워크가 자동으로 객체를 주입해 줍니다.

**코드 예시:**
```csharp
// 메모리 내 데이터베이스를 사용하여 "TodoList"라는 이름의 컨텍스트를 등록합니다.
builder.Services.AddDbContext<TodoDb>(opt => opt.UseInMemoryDatabase("TodoList"));
```
> `UseInMemoryDatabase`는 실제 데이터베이스 서버 설치 없이도 메모리상에서 빠르게 로직을 테스트할 수 있게 해주는 유용한 기능입니다.

#### 2. AddDatabaseDeveloperPageExceptionFilter: DB 오류 시각화 🛠️

이 메서드는 개발 단계에서 데이터베이스와 관련된 문제가 발생했을 때, 원인을 빠르게 파악할 수 있도록 돕는 안전장치입니다.

- **역할**: 데이터베이스 마이그레이션 누락이나 연결 오류 등 DB 관련 예외가 발생하면, 단순한 500 에러 대신 구체적인 해결 방법이 포함된 오류 페이지를 생성합니다.
- **설계 의도**: 개발자가 로그 파일을 일일이 뒤지지 않고도 브라우저에서 즉시 문제의 본질(예: "마이그레이션이 필요함")을 파악하게 하여 디버깅 생산성을 높입니다.
- **실무적 포인트**: 명칭에 'Developer'가 포함된 만큼, 실제 운영 환경(Production)이 아닌 개발 환경에서만 활성화되도록 구성하는 것이 보안상 안전합니다.

---

[🔙 뒤로 가기](../index.md)
