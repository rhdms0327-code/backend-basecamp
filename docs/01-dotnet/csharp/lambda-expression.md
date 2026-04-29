---
title: "[14장] 람다식 (Lambda Expression)"
parent: C#
grand_parent: .NET
nav_order: 12
---

# [14장] 람다식 (Lambda Expression)

## 1. 개요
- 익명 메서드를 더 간결하게 표현하기 위한 식입니다.
- **델리게이트(Delegate)**나 **LINQ**에서 함수형 프로그래밍 스타일을 구현할 때 핵심적인 역할을 합니다.

## 2. 문법
```csharp
(매개변수_목록) => 식_또는_문장_블록
```
- **=>**: "Goes to" 연산자라고 부릅니다. 좌측의 인수를 우측의 로직으로 전달한다는 의미입니다.

## 3. 주요 특징
- **타입 추론**: 컴파일러가 문맥을 보고 매개변수의 타입을 자동으로 알아냅니다.
- **간결성**: 한 줄짜리 코드는 중괄호(`{}`)와 `return` 키워드를 생략할 수 있습니다.

## 4. 표준 제네릭 델리게이트
람다식을 담기 위해 자주 사용되는 미리 정의된 델리게이트입니다.
- **Action**: 반환값이 없는 경우.
- **Func**: 반환값이 있는 경우.
- **Predicate**: `bool`을 반환하는 경우 (조건 검사).

```csharp
// Action 사용 예시
Action<string> print = (msg) => Console.WriteLine(msg);

// Func 사용 예시 (입력 int, 출력 int)
Func<int, int> square = x => x * x;
```

---
> **참고 자료**
> - [람다 식 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/operators/lambda-expressions)
