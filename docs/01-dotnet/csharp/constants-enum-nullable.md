---
layout: post
title: "🎯 [3장] 상수, 열거형, Nullable"
date: 2026-04-29
categories: [C#]
tags: [데이터형식, 문법, C#]
---

# 🎯 [3장] 상수, 열거형, Nullable

> 코드의 안정성을 높여주는 상수(const, readonly), 의미 있는 그룹을 만드는 열거형(Enum), 그리고 값 형식의 null 허용을 돕는 Nullable 형식을 정리합니다.

## 1. 상수 (const & readonly)
- **const**: 컴파일 타임 상수입니다. 반드시 선언과 동시에 초기화해야 하며 이후 변경할 수 없습니다.
- **readonly**: 런타임 상수입니다. 선언 시 또는 생성자에서 초기화할 수 있어 유연성이 높습니다.

## 2. 열거형 (Enum)
- 연관된 상수의 집합을 정의하는 값 형식입니다.
- 기본적으로 `int` 형식을 가지며, 각 요소에 의미 있는 이름을 부여하여 코드 가독성과 유지보수성을 높입니다.
```csharp
enum DialogResult { Yes, No, Cancel }
```

## 3. Nullable 형식
- 원래 null을 가질 수 없는 값 형식(int, double 등)에 `null`을 할당할 수 있게 해주는 기능입니다.
- **문법**: `T?` (예: `int? a = null;`)
- **HasValue / Value**: 값이 있는지 확인하고 실제 값을 가져올 때 사용합니다.

> [!TIP]
> Nullable 형식을 다룰 때는 `Value` 속성에 접근하기 전 반드시 `HasValue`로 확인하거나, `GetValueOrDefault()` 메서드를 사용하는 것이 런타임 에러 방지에 안전합니다.

## 4. Null 병합 연산자 (??)
- 변수가 `null`인 경우 사용할 기본값을 간결하게 지정합니다.
```csharp
int? a = null;
int b = a ?? 0; // a가 null이면 0을 할당하고, 아니면 a의 값을 할당
```

---
> **참고 자료**
> - [Nullable 형식 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/builtin-types/nullable-value-types)

[🔙 뒤로 가기](./index.md)
