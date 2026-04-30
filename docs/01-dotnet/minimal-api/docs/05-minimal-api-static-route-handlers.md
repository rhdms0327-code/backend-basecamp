---
layout: post
title: "🎯 Minimal API에서 라우트 핸들러를 static으로 만드는 이유"
date: 2026-04-30
categories: [.NET]
tags: ['Minimal API', '튜토리얼']
nav_exclude: true
---

> 

Minimal API에서 라우트 핸들러 메서드를 `static`으로 정의하는 것은 문법적인 필수 사항은 아니지만, **성능 최적화(Efficiency)**와 **설계의 명확성(Simplicity)** 측면에서 강력히 권장되는 실무 표준 패턴입니다.

## 1. 성능 최적화 (Memory & GC)
가장 큰 이유는 불필요한 인스턴스 생성을 막기 위해서입니다.

*   **인스턴스 메서드(Non-static)**: 메서드를 호출할 때마다 그 메서드가 포함된 클래스의 객체(인스턴스)가 메모리에 생성되어야 합니다. 초당 수천 건의 요청이 들어오는 서버 환경에서 매번 객체를 생성하고 버리는 것은 가비지 컬렉터(GC)에게 큰 부담을 줍니다.
*   **정적 메서드(Static)**: 클래스 인스턴스 생성 없이 메모리에 단 하나만 올라가 있으므로, 호출될 때마다 객체를 새로 만들 필요가 없어 서버 자원을 크게 절약할 수 있습니다.

## 2. 상태 비저장 (Stateless) 설계 강제
HTTP 요청은 기본적으로 **독립적(Stateless)**이어야 합니다.

라우트 핸들러 내부에서 클래스의 필드나 속성(상태)을 공유하게 되면, 여러 사용자의 동시 요청이 꼬일 위험(Thread-safety 문제)이 있습니다.
메서드를 `static`으로 선언하면 "외부 상태(인스턴스 변수)에 의존하지 말고, 필요한 모든 의존성은 파라미터로 받아라"라는 제약을 강제하게 되어 API의 안정성과 테스트 용이성이 높아집니다.

## 3. Minimal API의 구조적 특징
Minimal API는 기존 MVC 컨트롤러 방식처럼 요청마다 컨트롤러 인스턴스가 생성되는 구조가 아닙니다.

*   **기존 컨트롤러**: 라우팅 시 매 요청마다 컨트롤러 클래스의 새 인스턴스가 생성됨.
*   **Minimal API**: `app.MapGet()` 등이 실행될 때 핸들러가 델리게이트(Delegate)로 등록됩니다. 이때 `static` 메서드를 연결하면 프레임워크 차원의 인스턴스 관리 비용이 '0'에 수렴하게 됩니다.

## 4. 코드 비교: static vs non-static

**인스턴스 방식 (비효율적일 수 있음)**
```csharp
var handler = new UserHandler();
// handler 객체가 메모리에 계속 살아있거나, 요청마다 매번 생성되어야 함
app.MapGet("/users", handler.GetUsers); 
```

**static 방식 (권장)**
```csharp
app.MapGet("/users", UserHandler.GetUsers);

public static class UserHandler {
    public static IResult GetUsers(MyDb db) => TypedResults.Ok(db.Users.ToList());
}
```

## 5. 의존성 주입 (Dependency Injection) 처리
`static` 메서드는 인스턴스 필드(생성자 주입)를 사용할 수 없기 때문에 데이터베이스 컨텍스트(`DbContext`) 같은 의존성을 어떻게 사용할지 헷갈릴 수 있습니다.
.NET Minimal API는 이를 **메서드 파라미터 주입(Method Parameter Injection)**을 통해 매끄럽게 해결합니다.

```csharp
// static 메서드이지만 프레임워크가 파라미터로 명시된 MyDb(DB 컨텍스트)를 주입해 줍니다!
public static async Task<IResult> GetUser(int id, MyDb db)
{
    var user = await db.Users.FindAsync(id);
    return user is not null ? TypedResults.Ok(user) : TypedResults.NotFound();
}
```

## 결론
라우트 핸들러를 `static`으로 만드는 것은 **"이 함수는 오직 입력(Parameter)만 가지고 결과(IResult)를 내뱉는 깔끔하고 빠른 순수 함수(Pure Function)다"**라는 것을 보장하기 위함입니다.
특별한 이유가 없다면 성능 향상과 잠재적 버그 방지를 위해 핸들러를 `static`으로 작성하는 것이 좋습니다.

---

[🔙 뒤로 가기](../index.md)
