---
layout: post
title: "🚀 WebApplication vs WebApplicationBuilder"
date: 2026-05-12
categories: [Minimal API]
tags: [WebApplication, WebApplicationBuilder]
nav_exclude: true
---

> - ASP.NET Core Minimal API에서 앱을 초기화하는 두 가지 방식(`CreateBuilder` vs `Create`)의 차이와 설계 의도를 학습합니다.

---

## 1. 개요
ASP.NET Core Minimal API에서 앱을 초기화하는 두 가지 방식은 단순한 코드 양의 차이를 넘어, 제어권의 범위와 설계의 유연성에서 뚜렷한 차이를 보입니다.

---

## 2. 📍 WebApplication.CreateBuilder(args) : 표준 확장형
가장 권장되는 표준 문법이며, 설정(Configuration)과 실행(Execution) 단계를 명확히 분리한 구조입니다.

- **설계 의도**: `Build()` 메서드를 호출하기 전까지 앱의 구성을 자유롭게 조작할 수 있도록 설계되었습니다.
- **주요 역할**:
    - **서비스 등록**: `builder.Services`를 통해 DB Context, Repository, 외부 라이브러리 등 의존성 주입(DI)을 수행합니다.
    - **환경 설정**: 환경 변수나 `appsettings.json` 외의 커스텀 설정 소스를 추가하거나 로깅 공급자를 변경합니다.
- **실무 관점**: 비즈니스 로직이 복잡해지고 외부 모듈과의 연동이 필수적인 확장 가능한 애플리케이션 개발에 적합합니다.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```


---

## 3. 📍 WebApplication.Create(args) : 인라인 축약형
빌더 과정을 내부적으로 캡슐화하여 서비스 등록 단계를 생략하고 즉시 `app` 인스턴스를 반환받는 방식입니다.

- **설계 의도**: 별도의 커스텀 설정이 필요 없는 환경에서 보일러플레이트 코드를 극한으로 줄이기 위해 존재합니다.
- **주요 특징**:
    - 기본적인 로깅, 설정, 환경 변수 로드 등은 백그라운드에서 프레임워크가 자동으로 처리합니다.
    - 추가적인 의존성 주입 과정 없이 엔드포인트 정의로 바로 진입할 수 있습니다.
- **실무 관점**: 마이크로서비스의 상태 체크(Health Check) 전용 API나 아주 단순한 기능만 수행하는 초경량 프록시 서버, 프로토타이핑에 최적화되어 있습니다.

```csharp
var app = WebApplication.Create(args);

app.MapGet("/", () => "Hello World!");

app.Run();
```


---

> **참고 자료**
> - [WebApplication.CreateBuilder vs WebApplication.Create - Microsoft Learn](https://learn.microsoft.com/ko-kr/aspnet/core/fundamentals/minimal-apis/webapplication?view=aspnetcore-10.0)

---

[🔙 뒤로 가기](../index.md)
