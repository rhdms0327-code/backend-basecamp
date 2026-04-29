---
title: "[7장] 상속 및 다형성 (Inheritance & Polymorphism)"
parent: C#
grand_parent: .NET
nav_exclude: true
nav_order: 21
---

# [7장] 상속 및 다형성 (Inheritance & Polymorphism)

## 1. 상속 (Inheritance)
- 한 클래스(파생 클래스)가 다른 클래스(기반 클래스)의 멤버를 물려받아 코드를 재사용하는 기능입니다.
- **문법**: `class 파생_클래스 : 기반_클래스 { }`
- **특징**: C#은 **단일 상속**만 지원합니다. (인터페이스는 다중 구현 가능)

## 2. 다형성 (Polymorphism)
- 하나의 객체가 여러 가지 형태를 가질 수 있는 성질입니다.
- **virtual / override**: 기반 클래스의 메서드를 파생 클래스에서 재정의하여 각자 다른 동작을 수행하게 합니다.

## 3. 핵심 키워드
- **virtual**: 파생 클래스에서 재정의할 수 있도록 허용하는 메서드 표시.
- **override**: 기반 클래스의 가상 메서드를 실제로 재정의.
- **sealed**: 클래스나 메서드의 상속/재정의를 더 이상 못 하도록 봉인.
- **base**: 기반 클래스의 멤버나 생성자에 접근할 때 사용.

## 4. readonly vs const
- **const**: 컴파일 타임 상수. 선언 시에만 초기화 가능.
- **readonly**: 런타임 상수. 생성자에서도 초기화 가능.

---
> **참고 자료**
> - [C#의 상속 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/fundamentals/object-oriented/inheritance)
