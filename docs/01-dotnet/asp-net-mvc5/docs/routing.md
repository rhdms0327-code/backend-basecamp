---
layout: post
title: "🌐 URL 라우팅"
date: 2026-04-29
categories: [ASP.NET MVC 5]
tags: [라우팅, RouteData, MapRoute]
nav_exclude: true
---

> URL 요청을 특정 컨트롤러의 액션 메서드에 매핑하는 라우팅 시스템의 핵심 원리와 설정 방법을 상세히 다룹니다. 세그먼트 변수, 제약 조건, 어트리뷰트 라우팅 등 실무에서 필수적인 개념을 정리합니다.

## 1. URL 라우팅 개요

URL 라우팅은 브라우저의 요청 URL을 어떤 컨트롤러의 어떤 액션으로 연결할지 결정하는 규칙입니다. 물리적 파일 경로가 아닌 논리적 URL 구조를 가능하게 하여 SEO와 사용자 경험을 개선합니다.

- **프로세스**: 브라우저 요청 → Routing Engine → Controller / Action 매핑
- **세그먼트**: URL에서 `/`로 구분되는 각 경로 조각

## 2. 라우트 등록 (RouteConfig)

애플리케이션 시작 시 `Global.asax.cs`에서 라우트를 등록합니다. `RouteTable.Routes` 전역 컬렉션에 한 번 설정되면 모든 요청이 이를 기준으로 처리됩니다.

```csharp
// Global.asax.cs
public class MvcApplication : System.Web.HttpApplication {
    protected void Application_Start() {
        RouteConfig.RegisterRoutes(RouteTable.Routes);
    }
}
```

### MapRoute 헬퍼 메서드
URL 패턴을 컨트롤러/액션으로 매핑하는 가장 일반적인 방법입니다.

```csharp
routes.MapRoute(
    name: "Default",
    url: "{controller}/{action}/{id}",
    defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
);
```

## 3. 세그먼트 변수와 RouteData

URL 템플릿에서 `{}`로 감싼 부분은 세그먼트 변수입니다. `controller`, `action`, `area`는 예약어이며 나머지는 사용자 정의 변수입니다.

- **RouteData**: 라우팅 결과로 생성된 객체로, URL 세그먼트 값을 키-값 형태로 보관합니다.
- **컨트롤러에서 접근**: `RouteData.Values["id"]`
- **뷰에서 접근**: `@ViewContext.RouteData.Values["controller"]`

## 4. 제약 조건 (Constraints)

세그먼트 변수에 허용되는 조건을 지정하여 매칭 여부를 제어합니다.

- **정규식**: `new { year = @"\d{4}" }`
- **HTTP 메서드**: `new { httpMethod = new HttpMethodConstraint("GET") }`
- **사용자 정의 제약**: `IRouteConstraint` 인터페이스를 구현하여 복잡한 로직(예: 짝수만 허용) 적용 가능.

## 5. 어트리뷰트 라우팅 (Attribute Routing)

컨트롤러나 액션 메서드에 특성(Attribute)을 사용하여 URL 경로를 직접 지정합니다.

```csharp
[RoutePrefix("products")]
public class ProductController : Controller {
    [Route("{id:int}")] // products/123
    public ActionResult Detail(int id) { ... }

    [Route("~/special/{id}")] // 루트부터 시작: special/123
    public ActionResult Special(int id) { ... }
}
```

> [!TIP]
> 어트리뷰트 라우팅을 사용하려면 `RouteConfig`에서 `routes.MapMvcAttributeRoutes()`를 반드시 호출해야 합니다.

---

[🔙 뒤로 가기](../index.md)
