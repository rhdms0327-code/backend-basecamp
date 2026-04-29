---
title: "[3장] 상수, 열거형, Nullable"
parent: C#
grand_parent: .NET
nav_order: 29
---

# [3장] 상수, 열거형, Nullable

## 1. 상수 (const & readonly)
- **const**: 컴파일 타임 상수. 반드시 선언과 동시에 초기화해야 하며 이후 변경할 수 없습니다.
- **readonly**: 런타임 상수. 선언 시 또는 생성자에서 초기화할 수 있습니다.

## 2. 열거형 (Enum)
- 연관된 상수의 집합을 정의하는 값 형식입니다.
- 기본적으로 `int` 형식을 가지며, 각 요소에 의미 있는 이름을 부여하여 가독성을 높입니다.
```csharp
enum DialogResult { Yes, No, Cancel }
```

## 3. Nullable 형식
- 값 형식(int, double 등)에 `null`을 할당할 수 있게 해주는 기능입니다.
- **문법**: `T?` (예: `int? a = null;`)
- **HasValue / Value**: 값이 있는지 확인하고 실제 값을 가져올 때 사용합니다.

## 4. Null 병합 연산자 (??)
- 변수가 `null`인 경우 사용할 기본값을 지정합니다.
```csharp
int? a = null;
int b = a ?? 0; // a가 null이면 0을 할당
```

---
> **참고 자료**
> - [Nullable 형식 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/builtin-types/nullable-value-types)
