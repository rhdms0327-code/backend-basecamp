---
layout: post
title: "🎯 [14장] 람다식 (Lambda Expression)"
date: 2026-04-29
categories: [C#]
tags: [람다]
nav_exclude: true
---

# 🎯 [14장] 람다식 (Lambda Expression)

> 익명 메서드를 혁신적으로 간결하게 표현하는 람다식의 문법과 타입 추론 방식, 그리고 실무에서 자주 쓰이는 제네릭 대리자 활용법을 정리합니다.

## 📖 1. 개요
- 익명 메서드를 더 간결하고 직관적으로 표현하기 위한 식입니다.
- **대리자(Delegate)**나 **LINQ**와 결합하여 함수형 프로그래밍 스타일을 구현하는 핵심 기술입니다.

## 🎯 2. 문법

```csharp
(매개변수_목록) => 식_또는_문장_블록
```

- **=> (람다 연산자)**: "Goes to" 연산자라고 부르며, 입력값을 로직으로 전달하는 통로 역할을 합니다.

## 3. 주요 특징
- **강력한 타입 추론**: 컴파일러가 대리자의 시그니처를 참조하여 매개변수의 타입을 자동으로 결정합니다.
- **극대화된 간결성**: 한 줄의 로직은 중괄호와 `return`을 생략하여 가독성을 높일 수 있습니다.

> [!TIP]
> 람다식 내부에서 외부 변수를 참조하는 것을 '클로저(Closure)'라고 합니다. 이때 외부 변수의 수명이 람다식 실행 시점까지 연장되므로 메모리 사용에 유의해야 합니다.

## 4. 표준 제네릭 대리자 (Built-in Delegates)
- **Action**: 반환값이 없는 메서드를 참조합니다.
- **Func**: 결과값을 반환하는 메서드를 참조합니다. (마지막 타입 매개변수가 반환 형식)
- **Predicate**: 조건을 검사하여 `bool` 값을 반환하는 특수 형식입니다.

```csharp
// Action: 인사말 출력
Action<string> print = msg => Console.WriteLine(msg);

// Func: 제곱 계산 (입력 int, 반환 int)
Func<int, int> square = x => x * x;
```

---
> **참고 자료**
> - [람다 식 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/operators/lambda-expressions)

[🔙 뒤로 가기](../index.md)
