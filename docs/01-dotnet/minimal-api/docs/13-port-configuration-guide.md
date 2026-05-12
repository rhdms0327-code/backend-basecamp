---
layout: post
title: "🌐 포트 설정"
date: 2026-05-12
categories: [Minimal API]
tags: [포트 설정, ASPNETCORE_URLS]
nav_exclude: true
---

> - 애플리케이션이 외부와 통신하는 첫 관문인 포트(Port) 설정은 개발 환경과 운영 환경의 유연성을 결정짓는 중요한 요소입니다.
> - Minimal API에서 포트를 제어하는 다양한 방법과 실무적 주의사항을 정리했습니다.

---

## 1. 📍 코드 기반의 포트 명시
가장 직관적인 방법은 `app.Run()` 메서드에 주소를 직접 전달하거나 `Urls` 속성을 사용하는 방식입니다.

- **단일 포트 설정**: `app.Run("http://localhost:3000")`과 같이 호출하여 특정 포트를 점유합니다.
- **다중 포트 수신**: 하나 이상의 엔드포인트가 필요할 경우 `app.Urls` 컬렉션을 활용합니다.

```csharp
var app = WebApplication.Create(args);

// 여러 포트에서 응답하도록 설정했습니다.
app.Urls.Add("http://localhost:3000");
app.Urls.Add("http://localhost:4000");

app.MapGet("/", () => "Hello World");
app.Run();
```

> ⚠️ **Visual Studio 개발 시 주의사항**  
> Visual Studio는 `Properties/launchSettings.json`에 정의된 포트를 기준으로 디버거를 연결합니다. 만약 코드에서 이와 다른 포트를 강제하면 'Unable to connect to web server' 오류가 발생할 수 있습니다. 이 경우 명령줄(CLI)에서 직접 실행하는 것이 권장됩니다.

---

## 2. 📍 런타임 및 명령줄(CLI) 인수 활용
소스 코드를 수정하거나 다시 빌드하지 않고 실행 시점에 포트를 변경해야 할 때 유용합니다.

- **--urls 인수**: `dotnet run` 명령 시 `--urls` 옵션을 통해 즉석에서 주소를 주입합니다.
    - 예: `dotnet run --urls="https://localhost:7777"`
- **우선순위**: 만약 `appsettings.json`에 Kestrel 엔드포인트 설정이 별도로 존재한다면, 해당 설정값이 우선적으로 적용됩니다.

---

## 3. 📍 환경 변수를 통한 유연한 인프라 대응
클라우드 플랫폼이나 도커(Docker) 컨테이너 환경에서는 환경 변수를 통해 포트를 주입받는 것이 표준입니다.

- **커스텀 변수 읽기**: 플랫폼에서 제공하는 `PORT` 변수를 직접 조회하여 바인딩할 수 있습니다.

```csharp
var app = WebApplication.Create(args);
// 환경 변수가 없을 경우를 대비해 Null 병합 연산자로 기본값을 설정했습니다.
var port = Environment.GetEnvironmentVariable("PORT") ?? "3000";

app.Run($"http://localhost:{port}");
```

- **표준 변수 ASPNETCORE_URLS**: 프레임워크가 기본적으로 인식하는 예약 변수입니다. 세미콜론(`;`)을 구분자로 사용하여 여러 프로토콜과 주소를 동시에 지정할 수 있습니다.
    - 예: `ASPNETCORE_URLS=http://localhost:3000;https://localhost:5000`

---

## 💡 실무 요약 및 권장 전략

| 설정 방식 | 소스 수정 여부 | 유연성 | 권장 시나리오 |
| :--- | :--- | :--- | :--- |
| **코드 직접 지정** | 필요 | 낮음 | 특정 환경 고정 테스트 |
| **명령줄 인수** | 불필요 | 중간 | 로컬 환경에서의 임시 포트 변경 |
| **환경 변수** | 불필요 | 매우 높음 | CI/CD, 도커, 클라우드 배포 |

> "로컬에서는 `launchSettings.json`을 통해 편리하게 개발하되, 외부 배포 시에는 `ASPNETCORE_URLS` 환경 변수를 활용하여 환경 변화에 유연하게 대응하는 설계가 가장 바람직합니다."

---

[🔙 뒤로 가기](../index.md)
