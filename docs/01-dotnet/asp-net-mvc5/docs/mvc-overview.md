---
layout: post
title: "🏗️ MVC 개요 및 CoC"
date: 2026-04-29
categories: [ASP.NET MVC 5]
tags: [MVC, CoC, 규약]
nav_exclude: true
---

> ASP.NET MVC 5의 핵심 철학인 CoC(Convention over Configuration)와 프레임워크가 요구하는 폴더 및 명명 규약(Convention)을 정리합니다.

## 1. CoC (Convention over Configuration)

CoC는 **"정해진 규칙(관례)을 따르면 설정을 거의 안 해도 자동으로 동작하게 하는 원칙"**입니다. ASP.NET MVC는 이 원칙을 강력하게 적용하여 개발자가 반복적인 설정 작업을 줄이고 비즈니스 로직에 집중할 수 있게 합니다.

## 2. 컨트롤러(Controller) 규약

- **위치**: 반드시 `Controllers` 폴더 내에 위치해야 합니다.
- **명명**: 클래스 이름은 반드시 `Controller` 접미사로 끝나야 합니다. (예: `HomeController`)
- **액션**: `Controller` 클래스를 상속받은 클래스의 `public` 메서드는 자동으로 액션 메서드로 인식됩니다.

## 3. 뷰(View) 규약

- **위치**: 기본적으로 `/Views/{Controller}/{Action}.cshtml` 경로에서 탐색합니다.
- **탐색 순서**:
    1. Action 이름과 동일한 뷰 자동 탐색
    2. 실패 시 `/Views/Shared/{Action}.cshtml` 탐색
- **명시적 호출**: `return View("CustomName")`을 통해 특정 뷰를 지정할 수 있습니다.

## 4. 레이아웃 규약

- **파일명**: 밑줄(`_`)로 시작하는 것이 관례입니다. (예: `_Layout.cshtml`)
- **_ViewStart.cshtml**: 모든 뷰가 렌더링되기 전에 실행되어 공통 레이아웃을 설정합니다.
- **레이아웃 해제**: 특정 페이지에서 레이아웃을 쓰지 않으려면 `Layout = null;`을 명시합니다.

## 5. 디버깅 모드 비교

| 구분 | Visual Studio (빌드) | IIS (실행) |
| :--- | :--- | :--- |
| **설정 방법** | Build → Debug 선택 | Web.config 설정 |
| **특징** | C# 컴파일러가 .pdb 생성 | IIS가 디버그 모드 실행 |
| **핵심 질문** | dll을 어떻게 만들까? | dll을 어떻게 실행할까? |

---

[🔙 뒤로 가기](../index.md)
