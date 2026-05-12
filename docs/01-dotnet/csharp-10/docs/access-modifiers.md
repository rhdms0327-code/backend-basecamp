---
layout: post
title: "🎯 접근 한정자 (Access Modifiers)"
date: 2026-05-12
categories: [C#]
tags: [접근 한정자, public, private, internal, protected]
nav_exclude: true
---

> - 타입이나 멤버의 **가시성(Visibility)**을 제어하여 캡슐화를 구현하는 핵심 도구입니다.
> - 불필요한 외부 노출을 제한함으로써 객체의 무결성을 보호하고 결합도를 낮춥니다.

---

## 1. C# 타입 및 멤버 접근 한정자

| 대상 | 사용 가능한 한정자 |
| :--- | :--- |
| **class / record** | `internal` (Default), `public` |
| **struct** | `internal` (Default), `public` |
| **interface** | `internal` (Default), `public` |
| **Type Members** (필드, 메서드 등) | `private` (Default), `public`, `internal`, `protected`, `protected internal`, `private protected` |

---

## 2. 접근 한정자 요약

- **public**: 모든 코드에서 접근 가능합니다.
- **private**: 선언된 클래스 또는 구조체 내부에서만 접근 가능합니다. (기본값)
- **protected**: 해당 클래스 및 상속받은 파생 클래스에서 접근 가능합니다.
- **internal**: 동일한 어셈블리(프로젝트) 내에서만 접근 가능합니다.
- **protected internal**: 동일 어셈블리 내 혹은 다른 어셈블리의 파생 클래스에서 접근 가능합니다.
- **private protected**: 동일 어셈블리 내의 파생 클래스에서만 접근 가능합니다.

---

> **참고 자료**
> - [접근 한정자 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/classes-and-structs/access-modifiers)

---

[🔙 뒤로 가기](../index.md)
