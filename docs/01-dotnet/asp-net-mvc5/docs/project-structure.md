---
layout: post
title: "📂 프로젝트 구조와 명명 규약"
date: 2026-04-29
categories: [ASP.NET MVC 5]
tags: [프로젝트구조, 컨벤션, ActionResult]
nav_exclude: true
---

> ASP.NET MVC 5 프로젝트의 핵심 폴더 구성과 컨트롤러, 뷰, 모델 간의 명명 규약(Convention) 및 데이터 전달 방식을 상세히 살펴봅니다.

## 1. 컨트롤러 (Controller) 규약

- **위치**: 반드시 `Controllers` 폴더 내에 존재해야 합니다.
- **명명**: 클래스 이름은 반드시 `Controller` 접미사로 끝나야 합니다. (예: `HomeController`)
- **액션 메서드**: 컨트롤러 내부의 `public` 메서드로, URL 요청에 의해 호출됩니다.

## 2. 뷰 (View) 규약

- **위치**: `Views/{Controller}/{Action}.cshtml` 구조를 따릅니다.
- **Razor**: C#과 HTML을 혼합할 수 있는 `.cshtml` 확장자를 사용합니다.
- **강력한 형식의 뷰**: `@model`을 통해 데이터 타입을 명시하여 안정성을 높입니다.

## 3. 모델 (Model) 규약

- **위치**: 주로 `Models` 폴더에 위치하며, 도메인별로 하위 폴더를 가질 수 있습니다.
- **명명**: 보통 명사 단수형을 사용하며, 역할에 따라 `ViewModel`, `Dto` 등의 접미사를 붙이기도 합니다.

## 4. 데이터 전달 방식

### ViewBag
- **동적 속성**: `dynamic` 타입을 사용하여 런타임에 타입을 결정합니다.
- **용도**: 컨트롤러에서 뷰로 소량의 보조 데이터를 단방향으로 전달할 때 사용합니다.

### ActionResult
- 컨트롤러 액션의 추상 반환 타입입니다.
- `View()`, `Json()`, `Redirect()` 등 다양한 결과 객체의 부모 클래스입니다.

## 5. 라우트 (Route) 기본값

URL 패턴 `/{controller}/{action}/{id}`에서 기본값은 다음과 같습니다.
- `controller`: `Home`
- `action`: `Index`
- `id`: `UrlParameter.Optional`

---

[🔙 뒤로 가기](../index.md)
