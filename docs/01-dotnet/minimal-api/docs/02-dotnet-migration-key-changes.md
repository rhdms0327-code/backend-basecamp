---
layout: post
title: "🚀 .NET Framework -> .NET Core 주요 변경사항"
date: 2026-04-30
categories: [.NET]
tags: ['Minimal API', '기초']
nav_exclude: true
---

> .NET Framework에서 .NET Core/10으로 전환 시 핵심 변경 사항 정리.

.NET Framework(Legacy) 환경에 익숙한 개발자가 현대적인 .NET(Core/10) 환경으로 넘어올 때 가장 먼저 체감하게 될 결정적인 차이점 5가지를 정리합니다.

## 1. Global.asax의 종말: 모든 것은 Program.cs에서 시작된다

과거 .NET Framework는 IIS가 애플리케이션을 구동할 때 `Global.asax`의 이벤트들을 호출했습니다. 이제는 그 구조가 완전히 바뀌었습니다.

- **차이점:** 이제 웹 서비스도 하나의 **콘솔 애플리케이션**입니다. `Program.cs`의 `Main` 함수(또는 Top-level statements)에서 서버 설정, 서비스 등록, 파이프라인 구성을 코드로 직접 작성합니다.
- **체감 포인트:** 설정이 여러 곳에 흩어져 있지 않고 한 파일에 모여 있어 훨씬 직관적입니다.

## 2. 빌트인 의존성 주입 (Built-in Dependency Injection)

과거에는 Unity, Autofac 같은 별도 라이브러리를 써야 했던 **DI(의존성 주입)**가 이제는 프레임워크의 핵심(심장)으로 들어왔습니다.

- **차이점:** 프레임워크 자체가 DI를 강제합니다. DB Context, 로그 객체, 비즈니스 로직 클래스 등을 모두 `builder.Services.Add...`로 등록하고 생성자에서 주입받아 사용해야 합니다.
- **체감 포인트:** 처음엔 번거로울 수 있으나, 객체 생성을 직접 `new` 하지 않으므로 결합도가 낮아지고 테스트하기 매우 유리해집니다.

## 3. web.config (XML) → appsettings.json (JSON)

지긋지긋한 XML 설정 파일과 작별할 시간입니다.

- **차이점:** 모든 설정은 이제 **JSON 형식**으로 관리합니다. 환경(Development/Production)에 따라 `appsettings.Development.json` 등으로 나누어 관리하기가 매우 쉽습니다.
- **체감 포인트:** 설정 읽어오는 코드가 간결해졌고, 환경 변수(Environment Variables)와 결합하여 유연하게 사용할 수 있습니다.

## 4. 미들웨어 파이프라인 (Middleware)

.NET Framework의 `HTTP Module`이나 `HTTP Handler`가 사라지고 **미들웨어(Middleware)**로 통합되었습니다.

- **차이점:** 요청이 들어오고 나가는 통로에 내가 만든 필터(인증, 로깅, 에러 처리)를 순서대로 끼워 넣는 방식입니다. `app.UseAuthentication()`, `app.UseAuthorization()` 처럼 조립하여 사용합니다.
- **체감 포인트:** 기능을 레고 블록처럼 조립하는 느낌이며, 호출 순서가 매우 중요해졌습니다.

## 5. 크로스 플랫폼 & 고성능

내부 엔진이 완전히 다시 설계되었습니다.

- **차이점:** 클라우드와 고성능을 목표로 설계되었습니다. 문자열 처리(`Span<T>`), 비동기 처리(`Async/Await`) 등이 극도로 최적화되어 있어, .NET Framework보다 훨씬 적은 리소스로 더 많은 트래픽을 견딥니다.
- **체감 포인트:** 서버 메모리 점유율이 확연히 줄어들고 응답 속도가 빨라진 것을 체감할 수 있습니다.

## 📊 요약 비교표

| 항목 | .NET Framework (Legacy) | .NET 10 (Modern) |
| :--- | :--- | :--- |
| **진입점** | Global.asax | Program.cs |
| **설정 파일** | web.config (XML) | appsettings.json (JSON) |
| **의존성 주입** | 선택 (외부 라이브러리) | **기본 내장 (필수)** |
| **로직 파이프라인** | HTTP Modules / Handlers | **Middleware** |
| **배포 방식** | IIS 설치 필수 | Self-contained (.exe 하나로 끝) |

---

[🔙 뒤로 가기](../index.md)
