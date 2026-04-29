---
layout: post
title: "🌟 ASP.NET 웹 개발 프레임워크"
date: 2026-04-29
categories: [ASP.NET MVC 5]
tags: [ASP.NET, Core, WebForms, WebPages]
nav_exclude: true
---

> ASP.NET 생태계의 다양한 프레임워크(Web Pages, Web Forms, MVC, Web API)를 비교하고, 기존 ASP.NET과 최신 ASP.NET Core의 차이점을 정리합니다.

## 1. ASP.NET vs ASP.NET Core

| 항목 | ASP.NET | ASP.NET Core |
| :--- | :--- | :--- |
| **플랫폼** | Windows 전용 | 크로스 플랫폼 (Win/Linux/macOS) |
| **실행 기반** | .NET Framework | .NET (Core/5+) |
| **웹 서버** | IIS 의존 | Kestrel (내장형 고성능 서버) |
| **성능** | 중간 | 매우 높음 |
| **상태** | 유지보수 단계 | 현대적 표준 플랫폼 |

## 2. 주요 웹 개발 프레임워크 4가지

### 1) ASP.NET Web Pages
- **컨셉**: "Easy & Fast".
- **특징**: HTML과 C#을 하나의 `.cshtml` 파일에 작성하는 직관적인 방식입니다. 소규모 사이트나 프로토타입에 적합합니다.

### 2) ASP.NET Web Forms
- **컨셉**: "Drag & Drop".
- **특징**: 윈도우 앱 개발처럼 서버 컨트롤을 배치하고 이벤트 중심으로 동작합니다. 대규모 기업용 사내 시스템(ERP)에 많이 쓰였습니다.

### 3) ASP.NET MVC
- **컨셉**: "Clean & Control".
- **특징**: M-V-C 구조로 역할을 엄격히 분리하여 테스트와 유지보수가 용이합니다. 현대 웹 개발의 표준 방식입니다.

### 4) ASP.NET Web API
- **컨셉**: "Data-Only".
- **특징**: 화면 없이 JSON/XML 데이터만 주고받는 RESTful 서비스 구축에 최적화되어 있습니다.

> [!NOTE]
> ASP.NET MVC는 프레임워크 몸체에 포함되지 않고 **NuGet 패키지** 형태로 독립적으로 배포되었습니다. 이는 OS 업데이트와 상관없이 최신 기술을 빠르게 공급하기 위한 MS의 전략이었습니다.

---

[🔙 뒤로 가기](../index.md)
