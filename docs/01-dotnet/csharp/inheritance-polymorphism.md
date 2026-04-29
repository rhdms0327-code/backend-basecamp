---
layout: post
title: "🎯 [7장] 상속 및 다형성 (Inheritance & Polymorphism)"
date: 2026-04-29
categories: [C#]
tags: [객체지향, 상속, C#]
---

# 🎯 [7장] 상속 및 다형성 (Inheritance & Polymorphism)

> 객체 지향의 핵심 기둥인 상속을 통해 코드 재사용성을 높이고, 다형성을 활용하여 유연하고 확장 가능한 소프트웨어를 설계하는 방법을 정리합니다.

## 1. 상속 (Inheritance)
- 한 클래스(파생 클래스)가 다른 클래스(기반 클래스)의 멤버를 물려받아 코드를 재사용하는 기능입니다.
- **문법**: `class DerivedClass : BaseClass { }`
- **특징**: C#은 다이아몬드 문제를 방지하기 위해 **클래스 간의 단일 상속**만 지원합니다.

## 2. 다형성 (Polymorphism)
- 하나의 객체가 여러 가지 형태를 가질 수 있는 성질입니다.
- 기반 클래스 타입의 변수가 다양한 파생 클래스의 인스턴스를 참조할 수 있으며, 실제 객체의 타입에 맞는 동작을 수행합니다.

## 3. 핵심 키워드
- **virtual**: 파생 클래스에서 `override` 할 수 있도록 허용하는 가상 메서드 선언입니다.
- **override**: 기반 클래스의 가상 메서드를 자식 클래스에서 목적에 맞게 재정의합니다.
- **sealed**: 클래스나 메서드를 더 이상 상속하거나 재정의할 수 없도록 봉인합니다.
- **base**: 부모 클래스의 멤버나 생성자를 명시적으로 호출할 때 사용합니다.

> [!TIP]
> 다형성을 제대로 활용하려면 'IS-A' 관계가 성립하는지 확인해야 합니다. 예를 들어, "강아지는 동물이다(Dog is an Animal)"가 성립할 때 상속을 사용하는 것이 올바른 설계입니다.

## 4. readonly vs const (상수 관리)
- **const**: 컴파일 시점에 값이 결정되는 절대 상수로, 성능이 좋지만 선언과 동시에 초기화해야 합니다.
- **readonly**: 객체 생성 시점(생성자)까지 초기화를 미룰 수 있어 보다 유연한 상수 관리가 가능합니다.

---
> **참고 자료**
> - [C#의 상속 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/fundamentals/object-oriented/inheritance)

[🔙 뒤로 가기](./index.md)
