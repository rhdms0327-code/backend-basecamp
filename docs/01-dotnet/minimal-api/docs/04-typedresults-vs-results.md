---
layout: post
title: "🎯 TypedResults vs Results (Minimal API 응답 반환)"
date: 2026-04-30
categories: [.NET]
tags: ['Minimal API', '튜토리얼']
nav_exclude: true
---

> 

ASP.NET Core Minimal API에서 HTTP 응답을 반환할 때 사용되는 `Results`와 `TypedResults` 정적 클래스의 차이점과 `TypedResults` 사용의 장점을 정리합니다.

## 1. Minimal API의 3가지 반환 방식

① **문자열 (string)**
*   가장 단순한 형태입니다. 프레임워크는 이를 `text/plain` 콘텐츠 타입으로 간주하고 상태 코드 `200 OK`와 함께 내보냅니다.
*   **특징**: 복잡한 로직 없이 메시지만 전달할 때 사용합니다.

② **객체 (T / Plain Old CLR Object)**
*   사용자 정의 클래스나 익명 객체를 직접 반환합니다. 프레임워크가 이를 자동으로 JSON으로 직렬화하고 `200 OK`를 반환합니다.
*   **특징**: 데이터 중심의 API에서 가장 흔히 사용되지만, 상태 코드를 동적으로 바꾸기 어렵습니다.

③ **IResult (결과 인터페이스)**
*   HTTP 상태 코드, 헤더, 본문을 세밀하게 제어해야 할 때 사용합니다. 아래에서 설명할 `Results`와 `TypedResults`가 바로 이 `IResult`를 생성하는 도구들입니다.

## 2. Results vs TypedResults (IResult의 두 얼굴)

두 클래스 모두 HTTP 응답을 만들지만, **"누구를 위한 정보인가"**에서 차이가 납니다. Microsoft 공식 문서에서는 실무 시 `TypedResults` 사용을 강력히 권장합니다.

### Results (유연함 위주)
*   제공되는 모든 헬퍼 메서드의 반환 타입이 무조건 `IResult`입니다.
*   컴파일러는 이 안에 `Ok`가 들었는지 `BadRequest`가 들었는지 모릅니다. Swagger 메타데이터 제공을 위해 `.Produces<T>()`를 수동으로 붙여주어야 합니다.
*   **용도**: 아주 간단한 API나, 반환 타입을 굳이 명시할 필요가 없는 빠른 프로토타이핑.

### TypedResults (명확함 위주)
*   반환 타입이 `Ok<T>`, `NotFound` 등 구체적인 강타입(Strongly-typed) 클래스입니다.
*   **용도 및 장점**:
    *   **Swagger(OpenAPI)**: Swagger가 코드를 읽어서 "아, 이 API는 200이랑 404를 반환하는구나!"라고 알아채어 메타데이터를 자동으로 문서화해 줍니다. (`.Produces<T>()` 불필요)
    *   **단위 테스트**: 테스트 코드에서 `var result = GetUser();`를 호출했을 때, `IResult`에서 다운캐스팅할 필요 없이 바로 `result.Value`를 확인할 수 있어 편리합니다.
    *   **안정성**: 런타임 오류가 줄어들고 컴파일 타임에 타입 체크가 확실해집니다.

## 3. 코드 진화 과정으로 이해하기 (T -> Results -> TypedResults)

보통 강의나 공식 문서의 초기 튜토리얼을 따라가다 보면 다음과 같은 순서로 코드가 발전합니다. 각 단계별로 프레임워크와 문서화 도구(Swagger)가 어떻게 반응하는지 살펴보면 차이를 쉽게 이해할 수 있습니다.

### 단계 1: 초기 방식 (T / 객체 직접 반환)
가장 처음 배우는 직관적이고 단순한 형태입니다.

```csharp
app.MapGet("/users", async (MyDb db) =>
    await db.Users.ToListAsync()); // 리턴 타입: Task<List<User>> (즉, T)
```

*   **동작**: .NET 프레임워크가 알아서 "리스트를 반환하네? 그럼 상태 코드는 `200 OK`로 하고, 내용은 JSON으로 직렬화해야지"라고 판단합니다.
*   **특징**: 코드가 엄청 짧고 직관적입니다. 하지만 DB에 데이터가 없을 때 `404 Not Found`를 내보내고 싶어도 상태 코드를 직접 제어하기가 어렵습니다.
*   **문서화**: Swagger는 `User` 객체 리스트가 반환될 것이라는 걸 알아챕니다.

### 단계 2: 상태 코드 제어 (Results 사용)
상태 코드를 세밀하게 제어하기 위해 `IResult`를 반환하도록 변경합니다.

```csharp
app.MapGet("/users", async (MyDb db) => {
    var users = await db.Users.ToListAsync();
    return Results.Ok(users); // 반환 타입이 IResult로 바뀜!
})
.Produces<List<User>>(200); // Swagger를 위해 확장 메서드 추가 필요
```

*   **동작**: `Results.Ok()`를 쓰는 순간 반환 타입이 `IResult`가 됩니다.
*   **문서화**: 반환 타입이 추상적인 `IResult`이므로 Swagger는 그 안에 어떤 데이터가 들었는지 모릅니다. 이때 문서에 힌트를 주기 위해 `.Produces<List<User>>(200)` 확장 메서드를 수동으로 붙여주어야 합니다.

### 단계 3: 최종 진화형 (TypedResults 사용)
수동으로 `.Produces`를 작성하는 번거로움을 없애고, 강타입의 이점을 챙기는 권장 형태입니다.

```csharp
app.MapGet("/users", async (MyDb db) => {
    var users = await db.Users.ToListAsync();
    return TypedResults.Ok(users); // 반환 타입이 Ok<List<User>>임!
});
```

*   **동작**: 반환 타입 자체가 구체적인 `Ok<List<User>>`가 됩니다.
*   **문서화**: `.Produces`를 수동으로 호출하지 않아도 프레임워크와 Swagger가 "`Ok<List<User>>` 니까 `List<User>` 데이터가 200번 상태 코드로 나오겠구나"라고 자동으로 완벽하게 문서화해 줍니다.

> **💡 핵심 요약**
> *   `db.Users.ToListAsync()` 바로 반환: **T 반환 방식 (가장 기초)**
> *   `Results.Ok(값)` 반환: **IResult 반환 방식** (Swagger를 위해 `.Produces` 필요)
> *   `TypedResults.Ok(값)` 반환: **가장 발전된 방식** (확장 메서드 없이 문서화 자동 처리)

## 4. 한눈에 보는 요약 표

| 구분 | `string` / `T` | `Results` | `TypedResults` |
| :--- | :--- | :--- | :--- |
| **상태 코드** | 기본 200 고정 | 유동적 선택 가능 | 유동적 선택 가능 |
| **반환 타입** | `string` 또는 `T` | `IResult` | `Ok<T>`, `NotFound` 등 구체적 타입 |
| **추천 상황** | 단순 데이터 반환 | 빠른 프로토타이핑 | 실무/대형 프로젝트 (권장) |

## 5. 다중 응답 타입 반환 시 주의사항 (`Results<T1, TN>` 활용)

하나의 엔드포인트 로직 내에서 여러 조건에 따라 각기 다른 응답(예: 찾으면 200 OK, 없으면 404 Not Found)을 반환해야 할 때, 컴파일러의 반환 타입 추론 방식에 차이가 있습니다.

*   `Results.Ok()`와 `Results.NotFound()`는 모두 동일하게 `IResult`를 반환하므로, 컴파일러가 반환 타입을 `IResult`로 쉽게 묶어서 추론합니다.
*   하지만 `TypedResults.Ok()`와 `TypedResults.NotFound()`는 서로 완전히 다른 구체적 타입을 반환하기 때문에, 컴파일러가 최적의 공통 반환 타입을 자동으로 추론하지 못해 **컴파일 에러**가 발생합니다.

이 문제를 해결하고 `TypedResults`의 메타데이터 자동 제공 장점을 계속 누리려면, 제네릭 유니온 타입인 **`Results<T1, TN>`** 을 람다 식의 명시적 반환 타입으로 선언해야 합니다. (비동기인 경우 `Task<Results<T1, TN>>`)

**사용 예시:**
```csharp
app.MapGet("/todoitems/{id}", async Task<Results<Ok<Todo>, NotFound>> (int id, TodoDb db) =>
{
    if (await db.Todos.FindAsync(id) is Todo todo)
    {
        return TypedResults.Ok(todo);
    }
    return TypedResults.NotFound();
});
```

*   **효과**: `Results<T1, TN>` 유니온 타입을 사용하면 지정된 여러 응답 타입에 대한 메타데이터가 모두 OpenAPI로 자동 노출됩니다. 또한, 선언된 `Ok<Todo>`나 `NotFound` 타입 이외의 다른 값을 실수로 반환하려고 하면 컴파일러가 오류를 내어 안정성을 보장합니다.


**출처:** [Microsoft Learn - TypedResults vs Results](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis/responses?view=aspnetcore-10.0#typedresults-vs-results)

---

[🔙 뒤로 가기](../index.md)
