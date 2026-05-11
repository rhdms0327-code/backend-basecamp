---
layout: post
title: "🎯 Tutorial: Create a Minimal API"
date: 2026-05-11
categories: [.NET]
tags: ['최소 API 만들기', '튜토리얼']
nav_exclude: true
---

> MS 공식 문서 튜토리얼을 기반으로 한 Minimal API 생성 가이드 (작성 중)

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

## 앱 실행

다음 명령을 실행하여 HTTPS 개발 인증서를 신뢰합니다.

```bash
dotnet dev-certs https --trust
```

**실행** `Ctrl+F5` (디버깅 없이)

**중지**: `Shift+F5`

기본 브라우저는 다음 URL `https://localhost:<port>`를 사용하여 시작됩니다. 

## NuGet 패키지 추가

이 튜토리얼에서 사용되는 데이터베이스 및 진단 기능을 지원하려면 NuGet 패키지를 추가해야 합니다.

다음 명령을 실행하여 패키지를 설치합니다.

```bash
dotnet add package Microsoft.EntityFrameworkCore.InMemory                # DB 대신 RAM(메모리)을 저장소로 사용
dotnet add package Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore  # 에러를 브라우저에 친절하게 설명해줌
```

## 모델 및 데이터베이스 컨텍스트 클래스

프로젝트 폴더에서 다음 코드가 포함된 `Todo.cs`라는 파일을 만듭니다.

```csharp
public class Todo
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public bool IsComplete { get; set; }
}
```

앞의 코드는 이 앱에 대한 모델을 만듭니다. 모델은 앱에서 관리하는 데이터를 나타내는 일련의 클래스입니다.

다음 코드를 사용하여 `TodoDb.cs`라는 파일을 만듭니다.

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

[🔙 뒤로 가기](../index.md)
