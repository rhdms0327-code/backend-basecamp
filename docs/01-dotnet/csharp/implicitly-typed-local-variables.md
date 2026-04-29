---
layout: post
title: "🎯 암시적 형식 지역 변수 (Implicitly Typed - var)"
date: 2026-04-29
categories: [C#]
tags: [암시적형식, 문법, C#]
nav_exclude: true
---

# 🎯 암시적 형식 지역 변수 (Implicitly Typed)

> C#의 `var` 키워드를 활용하여 컴파일러가 변수의 타입을 자동으로 추론하게 함으로써 코드의 간결성을 높이고 익명 타입을 처리하는 방법을 정리합니다.

## 📖 1. 개요
- **var** 키워드를 사용하여 변수의 형식을 명시적으로 선언하지 않고, 컴파일러가 대입 연산자 우변의 초기화 식을 보고 타입을 추론하도록 하는 기능입니다.
- **컴파일 타임 결정**: `var`는 실행 중에 타입이 변하는 `dynamic`과 달리 컴파일 시점에 타입이 고정되므로 타입 안정성이 완벽하게 유지됩니다.

## 2. 주요 특징
- **강력한 타입 추론**: 선언과 동시에 반드시 초기화가 이루어져야 타입 추론이 가능합니다.
- **익명 타입 지원**: LINQ 쿼리 결과 등 이름을 정의할 수 없는 익명 타입을 다룰 때 필수적입니다.
- **코드 간결성**: `Dictionary<int, List<string>>`과 같이 타입 이름이 매우 길 때 가독성을 획기적으로 개선합니다.

## 3. 사용 예시

```csharp
// i는 int 타입으로 확정됨
var i = 5;

// s는 string 타입으로 확정됨
var s = "Hello";

// 암시적 배열 생성 (int[] 타입)
var a = new[] { 0, 1, 2 };

// 익명 타입 (Anonymous Type) 처리 시 유일한 방법
var anon = new { Name = "Terry", Age = 34 };
```

> [!WARNING]
> `var`를 남발하면 코드 가독성을 해칠 수 있습니다. 변수 이름만으로 타입을 유추하기 어렵거나, 우변에서 생성되는 타입이 명확하지 않은 경우에는 명시적 타입 선언을 권장합니다.

## 4. 제약 사항
- **지역 변수 전용**: 클래스의 필드(Field) 멤버로는 사용할 수 없습니다.
- **즉시 초기화**: 선언만 하고 나중에 값을 대입하는 방식은 불가능합니다.
- **null 초기화 불가**: `var x = null;`은 타입을 추론할 수 없으므로 컴파일 에러가 발생합니다.

---
> **참고 자료**
> - [암시적 형식 지역 변수 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/classes-and-structs/implicitly-typed-local-variables)

[🔙 뒤로 가기](./index.md)
