---
layout: post
title: "🚀 Minimal API 파라미터 바인딩 핵심 요약"
date: 2026-05-18
categories: [Minimal API]
tags: [유추 기반 바인딩, FromBody, FromForm, AsParameters]
nav_exclude: true
---

> 최소 API (Minimal API) 파라미터 바인딩은 클라이언트가 보낸 다양한 형태의 데이터를 C# 메서드의 매개변수(Parameter)로 알아서 매칭(Binding)해 주는 규칙입니다.

---

## 💡 한눈에 보는 바인딩 4대장 (핵심 요약)

어떤 상황에 어떤 바인딩 특성을 써야 할지 헷갈린다면 아래의 기준만 기억하세요.

- **데이터가 크고 복잡하다 (JSON)?** ➡️ `[FromBody]`
- **주소창에 ID가 박혀있다 (`/123`)?** ➡️ `[FromRoute]`
- **주소창 뒤에 조건이 붙어있다 (`?page=2`)?** ➡️ `[FromQuery]`
- **이미지나 파일을 올려야 한다?** ➡️ `[FromForm]` + `IFormFile`

---

## 🔍 자동으로 데이터를 찾아오는 4대 출처 (유추 규칙)

개발자가 따로 지정하지 않아도 .NET은 아래 순서대로 눈치껏 데이터를 찾아옵니다.

- **Route Values (경로 값)**: URL 주소 자체에 포함된 값 (`/user/{id}`)
- **Query String (쿼리 스트링)**: URL 뒤에 `?`로 붙는 데이터 (`/search?query=abc`)
- **Body (본문)**: `POST`/`PUT` 요청 시 넘어오는 복잡한 JSON 객체
- **Services (DI 서비스)**: 서버 내부에 등록된 DB Context 등의 의존성 객체

## 🛠️ 출처 명시하기 (Explicit Binding)

대상을 명확히 강제하고 싶을 때는 매개변수 앞에 특성(Attribute)을 붙여줍니다.

```csharp
app.MapGet("/products/{id}", (
    [FromRoute] int id,                      // 주소창에서 매칭
    [FromQuery(Name = "q")] string? search,  // 쿼리 스트링 ?q= 에서 매칭
    [FromHeader(Name = "X-Key")] string? key // HTTP 헤더에서 매칭
) => { ... });
```

## 🚨 [중요] GET, DELETE 메서드와 [FromBody]

> *"HTTP 메서드 GET, HEAD, OPTIONS, DELETE는 본문(Body)에서 암시적으로 바인딩되지 않습니다."*

### ❓ 왜 안 될까?
HTTP 글로벌 표준 스펙상 `GET`, `HEAD`, `OPTIONS`, `DELETE`는 주소창이나 헤더를 통해 데이터를 주고받는 게 기본 약속입니다. 네트워크 장비(프록시, 방화벽)에 따라 `GET` 요청에 본문(Body)이 들어있으면 강제로 지워버리기도 합니다.

따라서 .NET은 안전을 위해 이 메서드들이 들어오면 본문 데이터를 아예 읽지 않고 패스합니다.

### ✔️ 해결책
만약 복잡한 검색 조건 등으로 인해 굳이 `GET`/`DELETE` 요청의 본문(JSON)을 읽어야 한다면, `[FromBody]` 특성을 명시적으로 붙여서 *".NET아, 이건 내가 의도한 거니까 군말 말고 본문 읽어줘"*라고 강제해야 합니다.

```csharp
// 예시: 복잡한 검색 조건을 GET 본문으로 받을 때
app.MapGet("/search", ([FromBody] ComplexCondition condition) => {
    return Results.Ok(condition);
});
```

## 📝 [FromForm] 양식 값에서 명시적 바인딩

`[FromForm]`은 클라이언트가 HTTP 요청을 보낼 때, 본문(Body)의 데이터 포맷을 일반적인 JSON이 아니라 `application/x-www-form-urlencoded` 또는 `multipart/form-data`(양식 데이터 형태)로 보냈을 때 이를 C# 객체나 변수에 매칭해 주는 특성입니다.

### ❓ JSON(`[FromBody]`)과의 결정적인 차이점
- **`[FromBody]` (기본값)**: 주로 단일 JSON 데이터 구조를 받을 때 사용합니다. **파일 전송이 불가능합니다.**
- **`[FromForm]`**: 주로 HTML 폼 페이지에서 submit 버튼을 눌러 데이터를 보낼 때 사용합니다. 이미지, PDF 같은 **파일(`IFormFile`) 전송이 가능합니다.**

### 💻 실무 코드 예시: 단순 텍스트 양식 데이터 받기
사용자가 이름과 이메일을 입력하고 제출했을 때 받는 방법입니다.

```csharp
app.MapPost("/submit-form", ([FromForm] string name, [FromForm] string email) =>
{
    return Results.Ok($"받은 데이터 - 이름: {name}, 이메일: {email}");
});
```

## 🎒 `[AsParameters]`를 활용한 복합 양식 데이터 바인딩

원래 Minimal API에서는 여러 개의 `[FromForm]`이나 다른 데이터들을 받으려면 메서드 괄호 안이 끝도 없이 길어졌습니다.
- **예**: `([FromForm] string name, [FromForm] Visibility visibility, IFormFile? attachment, TodoDb db, ...)`

이렇게 매개변수가 주렁주렁 달리는 걸 방지하기 위해, 하나의 데이터 전송용 가방(`Record Struct`)을 만들고 거기에 `[AsParameters]` 특성을 달아줍니다.

### 🔍 코드 구조 쪼개보기

#### 1) 데이터를 담을 가방 정의 (`NewTodoRequest`)
원래 메서드 매개변수 자리에 적었어야 할 내용들을 레코드 구조체(`record struct`)의 속성으로 몰아넣었습니다.
속성 하나하나에 `[FromForm]`을 적어주어, 이 객체 안의 값들이 JSON 본문이 아니라 Form 데이터(양식 값)에서 들어올 것임을 엔진에게 알려줍니다.

```csharp
public record struct NewTodoRequest(
    [FromForm] string Name,             // 폼 데이터에서 Name 읽어줘
    [FromForm] Visibility Visibility,   // 폼 데이터에서 Visibility 읽어줘
    IFormFile? Attachment               // 파일 업로드 (IFormFile은 FromForm 안 써도 눈치껏 인식)
);
```

#### 2) API 내부에서 사용 (`[AsParameters]`)
매개변수 자리에 `[AsParameters] NewTodoRequest request`라고 적어두면, .NET 라우팅 엔진이 요청을 받았을 때 *"아, 이 객체는 덩어리 JSON이 아니라 내부 속성들을 각각 파트별로(Form, Query, Route 등) 알아서 쪼개서 매칭해야 하는구나!"* 하고 인식합니다.

```csharp
app.MapPost("/ap/todos", async ([AsParameters] NewTodoRequest request, TodoDb db) => {
    // 1. 가방(request)에서 데이터를 쏙쏙 꺼내서 사용
    var todo = new Todo { Name = request.Name, Visibility = request.Visibility };

    // 2. 파일이 들어왔다면 서버(wwwroot)에 저장하는 로직
    if (request.Attachment is not null) { /* ... */ }
    
    // 3. DB에 저장
    db.Todos.Add(todo);
    await db.SaveChangesAsync();
    return Results.Ok();
});
```

---

[🔙 뒤로 가기](../index.md)
