---
layout: post
title: "🎯 Minimal API 예외 처리 및 오류 응답 (Error Handling)"
date: 2026-04-30
categories: [.NET]
tags: ['Minimal API', '튜토리얼']
nav_exclude: true
---

> 

.NET 10 Minimal API 환경에서 오류를 처리하고, 표준화된 에러 응답(RFC 7807)을 클라이언트에게 제공하는 방법에 대해 알아봅니다.

## 1. 개발자 예외 페이지 (Developer Exception Page)

> 💡 **간단 메모**
> - 예외 발생 시 개발자가 볼 수 있는 HTML 페이지를 제공합니다.
> - ASP.NET Core 앱은 다음 조건을 모두 만족할 때 기본적으로 이 페이지를 활성화합니다:
>   1. 개발(`Development`) 환경에서 실행 중일 때
>   2. 최신 템플릿(`WebApplication.CreateBuilder`)을 사용하여 앱이 생성되었을 때
> - 하지만 실무에서는 **거의 사용하지 않으며, 주로 로그(Log)를 통하여 예외를 확인**합니다.

---

## 2. 예외 처리 (Exception Handler)

Production 환경에서는 `UseExceptionHandler` 미들웨어를 사용하여 에러를 안전하게 캐치하고 커스텀 오류 페이로드를 생성해야 합니다. 
주로 `Results.Problem()`을 사용하여 클라이언트에게 RFC 7807 규격의 페이로드를 응답합니다.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// 개발 환경이 아닐 경우 예외 처리기 등록
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler(exceptionHandlerApp => 
        exceptionHandlerApp.Run(async context => 
            await Results.Problem().ExecuteAsync(context)));
}

app.MapGet("/exception", () => 
{
    throw new InvalidOperationException("샘플 예외 발생");
});

app.Run();
```

---

## 3. 상태 코드 페이지 (Status Code Pages) 처리

예외가 발생하지는 않았지만, 라우팅 오류(404 Not Found)나 권한 없음(401 Unauthorized)과 같이 빈 본문(Body)으로 상태 코드만 반환되는 경우가 있습니다.
이때 `UseStatusCodePages` 미들웨어를 사용하면 빈 오류 응답에 대해 일관된 본문 콘텐츠(예: Problem Details)를 채워줄 수 있습니다.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// 빈 응답이 나갈 때 상태 코드를 가로채서 Problem 형식으로 반환
app.UseStatusCodePages(async statusCodeContext =>
    await Results.Problem(statusCode: statusCodeContext.HttpContext.Response.StatusCode)
                 .ExecuteAsync(statusCodeContext.HttpContext));

app.MapGet("/users/{id:int}", (int id) => id <= 0 ? Results.BadRequest() : Results.Ok(new User(id)));

app.Run();

public record User(int Id);
```

---

## 4. API 에러의 국제 표준: Problem Details (RFC 7807) 완벽 정리

API 개발을 하다 보면 고민에 빠지는 순간이 있습니다. *"에러가 났을 때 어떤 형식으로 응답을 줘야 프론트엔드 개발자가 좋아할까?"* 
그동안 회사마다, 개발자마다 제각각이었던 에러 응답 형식을 하나로 통일하기 위해 등장한 표준이 바로 **RFC 7807 (Problem Details for HTTP APIs)**입니다.

### 4.1. Problem Details(RFC 7807)란?
과거에는 에러 발생 시 단순히 `404 Not Found` 숫자만 던지거나, `{"error": "bad"}` 처럼 제각각인 JSON을 반환했습니다.
RFC 7807은 HTTP 응답 본문에 에러에 대한 상세 정보를 담는 공통 기계 판독형(machine-readable) 형식을 정의합니다. 쉽게 말해, "전 세계 모든 API 에러 메시지 양식을 통일하자!"라는 약속입니다.

### 4.2. 표준 JSON 필드 구성
표준에서 정의하는 주요 필드는 5가지입니다.

- **`type`**: 에러 유형을 설명하는 문서의 URI (문제가 뭔지 더 자세히 알려주는 주소).
- **`title`**: 발생한 문제에 대한 짧고 읽기 쉬운 요약.
- **`status`**: HTTP 상태 코드 (예: 400, 404).
- **`detail`**: 이 에러가 왜 발생했는지 설명하는 구체적인 메시지.
- **`instance`**: 에러가 발생한 구체적인 엔드포인트 경로 (예: `/users/123`).

**예시 데이터:**
```json
{
  "type": "https://example.com/probs/out-of-stock",
  "title": "재고 부족",
  "status": 400,
  "detail": "요청하신 상품의 재고가 현재 0개입니다.",
  "instance": "/api/orders/99"
}
```

### 4.3. 왜 사용해야 할까? (장점)
- **협업 효율 향상**: 프론트엔드 개발자가 API마다 다른 에러 구조를 분석할 필요가 없습니다. 공통 에러 핸들러 하나로 모든 처리가 가능해집니다.
- **도구 지원**: Swagger(OpenAPI) 같은 도구들이 이 표준을 잘 이해하므로, 문서화가 자동으로 깔끔하게 이루어집니다.
- **확장성**: 표준 필드 외에 필요한 커스텀 필드(예: errorCode, traceId)를 자유롭게 추가할 수 있습니다.

### 4.4. .NET Minimal API에서의 활용법
.NET 7/8 이상부터는 마이크로소프트가 이 표준을 기본으로 밀어주고 있습니다. 전역 `AddProblemDetails()` 서비스와 결합하여 사용할 수 있습니다.

#### ① TypedResults 사용하기
`TypedResults.Problem()`을 호출하면 자동으로 RFC 7807 규격의 응답을 만듭니다.

```csharp
app.MapGet("/users/{id}", (int id) => {
    if (id <= 0) {
        return TypedResults.Problem(
            detail: "ID는 0보다 커야 합니다.",
            statusCode: StatusCodes.Status400BadRequest
        );
    }
    return TypedResults.Ok(new User(id));
});
```

#### ② 공통 미들웨어 설정 및 서비스 등록
모든 에러 응답(400, 404 등)을 자동으로 이 표준으로 감싸고 싶다면 `Program.cs`에 다음을 추가합니다. 앞서 설명한 `UseStatusCodePages`와 함께 시너지를 냅니다.

```csharp
var builder = WebApplication.CreateBuilder(args);

// Problem Details 전역 서비스 등록
builder.Services.AddProblemDetails();

var app = builder.Build();

app.UseExceptionHandler();
app.UseStatusCodePages(async statusCodeContext =>
    await Results.Problem(statusCode: statusCodeContext.HttpContext.Response.StatusCode)
                 .ExecuteAsync(statusCodeContext.HttpContext));

app.MapGet("/users/{id:int}", (int id) => id <= 0 ? Results.BadRequest() : Results.Ok(new User(id)));

app.Run();
```

### 4.5. 현실 세계의 API (토스, 구글 등)
물론 토스페이먼츠처럼 자체 규격을 쓰는 곳도 많습니다. 이는 표준이 나오기 전부터 자체 생태계를 구축했기 때문입니다. 하지만 신규 프로젝트를 시작하거나 글로벌 표준을 따르고 싶다면 RFC 7807은 가장 안전하고 강력한 선택지입니다.

---

### 참고 자료
- [ASP.NET Core API에서 오류 처리 | Microsoft Learn](https://learn.microsoft.com/ko-kr/aspnet/core/fundamentals/error-handling-api?view=aspnetcore-10.0#developer-exception-page)

---

[🔙 뒤로 가기](../index.md)
