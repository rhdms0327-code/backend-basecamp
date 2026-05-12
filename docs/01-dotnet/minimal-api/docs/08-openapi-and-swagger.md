---
layout: post
title: "🚀 OpenAPI와 Swagger UI 구축"
date: 2026-05-12
categories: [.NET]
tags: [OpenAPI, Swagger, Minimal API]
nav_exclude: true
---

> OpenAPI는 현대적인 웹 개발에서 API를 설계하고 문서화하는 전 세계적인 표준 규격입니다. 실무에서 흔히 혼용되는 Swagger와의 차이점과 그 중요성을 중심으로 정리했습니다.

---

## 📌 1. OpenAPI와 Swagger의 개념

RESTful API를 설계할 때 핵심이 되는 명세(OpenAPI)와 이를 활용하는 도구(Swagger)를 구분하는 것이 중요합니다.

### 1.1 OpenAPI (The Spec) 📝
- **정의**: API의 구조를 설명하는 표준화된 명세(Specification)입니다.
- **형식**: JSON 또는 YAML 파일로 표현됩니다.
- **역할**: 엔드포인트, 입력/출력 데이터 모델, 인증 방식 등을 기술하는 **설계도** 역할을 합니다.

### 1.2 Swagger (The Tooling) 🛠️
- **정의**: OpenAPI 명세를 기반으로 API를 시각화하고 테스트할 수 있도록 돕는 **도구 세트**입니다.
- **핵심 기능**: `swagger.json` 명세를 읽어 브라우저에서 인터랙티브한 테스트 UI를 생성합니다.

---

## 🏛️ 2. OpenAPI vs Swagger 비교

과거에는 규격과 도구를 모두 'Swagger'라 불렀으나, 현재는 아래와 같이 명확히 구분합니다.

| 구분 | OpenAPI | Swagger |
| :--- | :--- | :--- |
| **역할** | 표준 규격 (The Spec) | 도구 및 생태계 (The Tools) |
| **비유** | 건축 설계도 및 가이드라인 | 설계도를 그리는 펜과 시각화 도구 |
| **특징** | API의 동작 방식을 정의함 | UI 렌더링, 클라이언트 코드 생성 등 지원 |

---

## 🚀 3. Minimal API에서의 OpenAPI 활용

C# Minimal API에서는 복잡한 설정 없이도 강력한 문서화 기능을 제공합니다.

- **장점**: `WithOpenApi()` 메서드를 통해 엔드포인트마다 세부 명세를 간결하게 추가할 수 있습니다.
- **의도**: 개발자가 비즈니스 로직에 집중하면서도, 자동으로 고수준의 API 명세서를 유지하도록 돕습니다.

---

## 🎨 4. 실전: NSwag를 이용한 Swagger UI 구축

이 과정에서는 OpenAPI 사양을 준수하는 테스트 UI 생성을 위해 `NSwag.AspNetCore` 패키지를 활용합니다.

### 4.1 패키지 설치
```bash
dotnet add package NSwag.AspNetCore
```

> 💡 **NSwag.AspNetCore 패키지란?**
>
> `NSwag.AspNetCore` 패키지는 .NET 환경에서 OpenAPI 명세를 생성하고, 이를 기반으로 Swagger UI 및 클라이언트 코드를 연동하기 위한 통합 라이브러리입니다. 기존에 대중적으로 사용되던 `Swashbuckle`과 목적은 같지만, 몇 가지 구조적인 차이점이 있습니다.
>
> **1. 주요 기능 및 설치 목적**
> - **OpenAPI 명세 자동 생성**: 엔드포인트를 분석하여 `openapi.json` 또는 `swagger.json` 파일을 런타임에 자동 생성합니다.
> - **Swagger UI 제공**: 생성된 명세를 브라우저에서 시각적으로 확인하고 테스트할 수 있는 페이지를 제공합니다.
> - **클라이언트 코드 생성 도구**: 정의된 OpenAPI 규격을 바탕으로 C#이나 TypeScript 클라이언트 소스 코드를 자동으로 생성하는 강력한 기능을 내장하고 있습니다.
>
> **2. Swashbuckle과의 차이**
> - **Swashbuckle**: .NET 에코시스템에서 가장 대중적이며, 단순 UI 제공과 문서화에 최적화되어 있습니다.
> - **NSwag**: 문서화를 넘어 **'코드 생성(Code Generation)'**에 강력한 초점이 맞춰져 있습니다. 프론트엔드나 타 마이크로서비스용 SDK를 자동으로 생성하고 싶을 때 주로 선택합니다.

---

### 4.2 Swagger 서비스 및 미들웨어 구성
`Program.cs`에서 다음과 같이 설정합니다.

**1단계: 서비스 등록 (`builder.Build()` 이전)**
```csharp
// API 탐색기 및 OpenAPI 문서 생성기 등록
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "TodoAPI";
    config.Title = "TodoAPI v1";
    config.Version = "v1";
});

var app = builder.Build();
```

> 🔍 **주요 메서드 및 설정 상세 설명**
>
> **1. AddEndpointsApiExplorer()**
> Minimal API는 기존 컨트롤러 방식과 달리 엔드포인트가 `Program.cs` 곳곳에 흩어져 있습니다. 이 메서드는 프레임워크가 앱 내에 정의된 모든 매핑(`MapGet`, `MapPost` 등)을 찾아내고, 이를 OpenAPI가 이해할 수 있는 형태의 메타데이터로 변환하여 탐색할 수 있게 해줍니다. 즉, **"엔드포인트 탐지기"**를 켜는 작업입니다.
>
> **2. AddOpenApiDocument()**
> 탐지된 정보를 바탕으로 실제 OpenAPI 문서(JSON)를 생성하는 핵심 설정입니다.

**2단계: 미들웨어 파이프라인 구성 (`builder.Build()` 이후)**
```csharp
if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();    // JSON 문서 생성
    app.UseSwaggerUi(config => // UI 시각화
    {
        config.DocumentTitle = "TodoAPI";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}
```

> ⚠️ **보안 주의사항**: Swagger UI는 API의 상세 구조를 노출하므로, 운영 환경(Production)이 아닌 개발 환경(`IsDevelopment()`)에서만 활성화하는 것이 안전합니다.

---

[🔙 뒤로 가기](../index.md)
