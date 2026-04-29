---
layout: post
title: "🎨 Razor 뷰 엔진 활용"
date: 2026-04-29
categories: [ASP.NET MVC 5]
tags: [Razor, ViewEngine, Layout]
nav_exclude: true
---

> HTML과 C# 코드를 효율적으로 조합하는 Razor 구문의 특징과 데이터 전달 방식, 그리고 레이아웃 시스템을 정리합니다.

## 1. Razor 구문 특징

Razor는 뷰 엔진이 해석하는 마크업 구문으로, `@` 기호를 사용하여 HTML 내에서 C# 코드로 전환합니다. 별도의 닫는 태그가 필요 없어 코드가 매우 깔끔합니다.

- **디자인-로직 통합**: 시각적인 흐름을 방해하지 않고 로직 삽입 가능.
- **자동 완성**: Visual Studio에서 강력한 IntelliSense 지원.

## 2. 데이터 전달 및 접근

### @model 및 @Model
- **@model**: 뷰에서 사용할 데이터 타입을 선언합니다. (파일 최상단)
- **@Model**: 컨트롤러에서 전달된 실제 데이터 객체에 접근합니다.

```razor
@model MyApp.Models.Product
<h2>@Model.Name</h2>
<p>가격: @Model.Price</p>
```

### ViewBag
- 동적(Dynamic) 속성으로, 제목이나 메시지 같은 보조 데이터를 전달할 때 유용합니다.

## 3. 레이아웃 시스템

공통 UI 구조를 정의하여 코드 중복을 제거합니다.

- **_Layout.cshtml**: 공통 틀을 정의하며, `@RenderBody()`가 위치한 곳에 자식 뷰 내용이 삽입됩니다.
- **_ViewStart.cshtml**: 모든 뷰 실행 전 호출되어 기본 레이아웃을 자동 지정합니다.
- **명명 규칙**: 레이아웃이나 부분 뷰 파일은 밑줄(`_`)로 시작하는 것이 관례입니다.

## 4. Razor 코드 블록 제어

| 문법 | 설명 |
| :--- | :--- |
| **@if / @foreach** | 조건문 및 반복문 사용 |
| **@:** | 코드 블록 내에서 한 줄 텍스트 출력 |
| **\<text>** | 코드 블록 내에서 여러 줄 텍스트 출력 (HTML 태그 생성 안 함) |

---

[🔙 뒤로 가기](../index.md)
