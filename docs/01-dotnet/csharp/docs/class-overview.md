---
layout: post
title: "🎯 [7장] 클래스 및 멤버 개요 (Class & Members)"
date: 2026-04-29
categories: [C#]
tags: [객체지향, 클래스, C#]
nav_exclude: true
---

# 🎯 [7장] 클래스 및 멤버 개요 (Class & Members)

> 객체 지향 프로그래밍의 핵심인 클래스의 개념과 멤버 구성, 접근 한정자의 종류를 정리하여 탄탄한 기초 설계를 돕습니다.

## 1. 클래스 (Class)
- 객체 지향 프로그래밍(OOP)의 기본 단위로, 객체를 만들기 위한 **설계도**입니다.
- **속성(상태)**과 **기능(동작)**을 하나의 단위로 묶습니다.

## 2. 멤버 구성
- **필드 (Field)**: 객체의 내부 데이터를 저장하는 변수. (주로 `private`)
- **메서드 (Method)**: 객체의 행위를 정의하는 코드 블록.
- **생성자 (Constructor)**: 객체가 생성될 때 호출되어 초기화를 담당하는 특별한 메서드.
- **종료자 (Finalizer)**: 객체가 소멸될 때 호출 (직접 사용하는 경우는 드묾).

## 3. 접근 한정자 (Access Modifiers)
- **public**: 어디서든 접근 가능.
- **private**: 클래스 내부에서만 접근 가능 (기본값).
- **protected**: 클래스 내부 및 상속받은 파생 클래스에서 접근 가능.
- **internal**: 동일한 어셈블리(프로젝트) 내에서만 접근 가능.

> [!TIP]
> 캡슐화 원칙에 따라 필드는 `private`으로 선언하고, 필요한 경우에만 `Property`를 통해 외부로 노출하는 것이 객체지향 설계의 기본입니다.

## 4. static 멤버
- 클래스의 인스턴스가 아닌 **클래스 자체**에 속하는 멤버입니다.
- 모든 객체가 공유하며, 인스턴스 생성 없이 클래스 이름으로 직접 접근합니다.

---
> **참고 자료**
> - [클래스 개요 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/fundamentals/types/classes)

[🔙 뒤로 가기](../index.md)
