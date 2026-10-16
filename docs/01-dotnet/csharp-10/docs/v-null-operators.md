---
layout: post
title: "🎯 [C# 6·8] null 연산자: ?. · ??= · nameof"
date: 2026-10-16
categories: [C#]
tags: [C# 6, C# 8, null 조건 연산자, null 병합 할당, nameof]
nav_exclude: true
---

> null 검사를 짧게 쓰는 연산자 2개와, 이름을 문자열 대신 컴파일러가 확인하게 하는 `nameof`를 정리합니다. 셋 다 실무 코드에서 거의 매일 보입니다.

| 문법 | 버전 | 빈도 | 한 줄 설명 |
| :--- | :--- | :--- | :--- |
| `?.` `?[]` null 조건 연산자 | `C# 6+` | ★★★ | 앞이 null이면 멈추고 null을 돌려준다 |
| `nameof` | `C# 6+` | ★★★ | 멤버·변수 이름을 문자열로. 이름을 바꾸면 같이 바뀐다 |
| `??=` null 병합 할당 | `C# 8+` | ★★★ | 왼쪽이 null일 때만 대입한다 |

> 빈도: ★★★ 거의 매일 · ★★ 자주 · ★ 특정 상황 · ○ 알아만 둠. `??`(null 병합)는 [상수, 열거형, Nullable](./constants-enum-nullable.md)에 정리되어 있습니다.

---

## 1. `?.` `?[]` null 조건 연산자 `C# 6+`

### ❌ 예전

```csharp
string ownerName = null;
if (wallet != null && wallet.Owner != null)
{
    ownerName = wallet.Owner.Name;
}
```

### ✅ 지금

```csharp
string? ownerName = wallet?.Owner?.Name;          // 중간에 null이 있으면 결과가 null
string display   = wallet?.Owner?.Name ?? "없음"; // ??와 함께 기본값 지정
int? firstAmount = transactions?[0].Amount;       // 배열·리스트는 ?[]
```

- 왼쪽이 null이면 **오른쪽은 실행하지 않습니다.** 메서드 호출도 마찬가지입니다.
- 결과 형식이 값 형식이면 nullable이 됩니다. `wallet?.Balance`의 형식은 `decimal`이 아니라 `decimal?`입니다.
- 이벤트·대리자 호출에도 씁니다: `OnCharged?.Invoke(amount);`

---

## 2. `nameof` `C# 6+`

```csharp
// ❌ 예전: 문자열이라 속성 이름을 바꾸면 여기는 그대로 남음
throw new ArgumentException("amount는 0보다 커야 합니다", "amount");

// ✅ 지금: 이름을 바꾸면 컴파일러가 같이 바꿔 준다
throw new ArgumentException($"{nameof(amount)}는 0보다 커야 합니다", nameof(amount));

string name = nameof(Wallet.Balance);  // "Balance"
```

- 결과는 마지막 이름만 나옵니다. `nameof(Wallet.Balance)`는 `"Wallet.Balance"`가 아니라 `"Balance"`입니다.
- 로그 메시지, 예외의 매개변수 이름, `[Route]`·`CreatedAtAction(nameof(Get), ...)` 같은 곳에서 자주 씁니다.

---

## 3. `??=` null 병합 할당 `C# 8+`

```csharp
// ❌ 예전
if (_cache == null)
{
    _cache = new Dictionary<long, decimal>();
}

// ✅ 지금
_cache ??= new Dictionary<long, decimal>();
```

- 왼쪽이 null일 때만 오른쪽을 실행하고 대입합니다. null이 아니면 오른쪽은 실행되지 않습니다.
- 지연 초기화(처음 쓸 때 만들기)에 자주 씁니다.

---

> **참고 자료**
> - [멤버 액세스 연산자 (?. ?[]) - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/operators/member-access-operators)
> - [nameof 식 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/operators/nameof)
> - [?? 및 ??= 연산자 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/operators/null-coalescing-operator)

---

[🔙 뒤로 가기](../index.md)
