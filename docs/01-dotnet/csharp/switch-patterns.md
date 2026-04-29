---
title: "[5장] switch 패턴 매칭 (버전별 정리)"
parent: C#
grand_parent: .NET
nav_exclude: true
nav_order: 25
---

# [5장] switch 패턴 매칭 (버전별 정리)

C# 버전이 올라감에 따라 `switch`는 단순한 분기문을 넘어 강력한 패턴 매칭 도구로 진화했습니다.

## 1. C# 7.0: switch 문 강화
- **형식 패턴**: `case int i:` 처럼 타입에 따른 분기가 가능해졌습니다.
- **케이스 가드 (when)**: `case int i when i > 10:` 처럼 추가적인 조건을 붙일 수 있습니다.

## 2. C# 8.0: switch 식 (Expression)
문장이 아닌 **결과값을 반환하는 식**으로 사용할 수 있게 되었습니다.
```csharp
string result = color switch
{
    "Red" => "Stop",
    "Green" => "Go",
    _ => "Unknown" // default 역할
};
```

## 3. C# 9.0: 관계형 및 논리 패턴
비교 연산자와 논리 연산자를 패턴 내에서 사용할 수 있습니다.
- **관계형 패턴**: `case > 10 and < 20:`
- **논리 패턴**: `not`, `and`, `or` 키워드 지원.

## 4. 장점
- 코드가 매우 간결해집니다.
- 복잡한 `if-else` 중첩을 피할 수 있어 가독성이 향상됩니다.

---
> **참고 자료**
> - [패턴 매칭 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/fundamentals/functional/pattern-matching)
