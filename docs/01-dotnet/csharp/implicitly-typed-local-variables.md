---
title: "암시적 형식 지역 변수 (Implicitly Typed - var)"
parent: C#
grand_parent: 01. .NET
nav_order: 3
---

# 암시적 형식 지역 변수 (Implicitly Typed)

## 1. 개요
- **var** 키워드를 사용하여 변수의 형식을 명시적으로 선언하지 않고, 컴파일러가 초기화 식의 우변을 보고 타입을 추론하도록 하는 기능입니다.
- **주의**: `var`는 `dynamic`과 다릅니다. 컴파일 시점에 타입이 확정되므로 타입 안정성이 유지됩니다.

## 2. 주요 특징
- **타입 추론**: 선언과 동시에 초기화가 이루어져야 합니다.
- **익명 타입**: 이름을 가질 수 없는 익명 타입을 사용할 때 필수적입니다.
- **가독성**: 타입 이름이 길거나 명확할 때 코드를 간결하게 만들어 줍니다.

## 3. 사용 예시
```csharp
// i는 int로 컴파일됨
var i = 5;

// s는 string으로 컴파일됨
var s = "Hello";

// 암시적 배열 생성 (int[])
var a = new[] { 0, 1, 2 };

// 익명 타입 (Anonymous Type)
var anon = new { Name = "Terry", Age = 34 };
```

## 4. 제약 사항
- 지역 변수로만 사용할 수 있습니다. (클래스 필드로는 사용 불가)
- 선언과 동시에 초기화해야 합니다.
- `null`로 초기화할 수 없습니다. (타입 추론이 불가능하기 때문)

---
> **참고 자료**
> - [암시적 형식 지역 변수 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/classes-and-structs/implicitly-typed-local-variables)
