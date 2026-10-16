---
layout: post
title: "🎯 [C# 6~8] 짧게 쓰는 메서드: 식 본문 · 로컬 함수 · throw 식"
date: 2026-10-16
categories: [C#]
tags: [C# 6, C# 7, C# 8, 식 본문 멤버, 로컬 함수, 버림, throw 식]
nav_exclude: true
---

> 메서드와 속성을 한 줄로 줄이는 문법, 메서드 안에 작은 메서드를 두는 로컬 함수, 쓰지 않는 값을 버리는 `_`, 식 안에서 바로 예외를 던지는 `throw` 식을 정리합니다.

| 문법 | 버전 | 빈도 | 한 줄 설명 |
| :--- | :--- | :--- | :--- |
| 식 본문 멤버 `=>` (메서드·읽기 전용 속성) | `C# 6+` | ★★★ | 한 줄짜리 메서드·속성을 `=>`로 |
| 식 본문 멤버 (생성자·`get`/`set` 접근자) | `C# 7+` | ★★ | 생성자와 접근자에도 `=>` |
| 로컬 함수 | `C# 7+` | ★★ | 메서드 안에서만 쓰는 메서드 |
| 버림 `_` | `C# 7+` | ★★ | 쓰지 않는 값을 무시 |
| `throw` 식 | `C# 7+` | ★★ | `??`, 삼항 연산자 안에서 바로 예외 |
| `static` 로컬 함수 | `C# 8+` | ★ | 바깥 변수를 못 쓰게 막은 로컬 함수 |

---

## 1. 식 본문 멤버 `=>` `C# 6+` / `C# 7+`

```csharp
// ❌ 예전
public decimal GetBalance()
{
    return _balance;
}
public bool IsEmpty
{
    get { return _balance == 0; }
}

// ✅ 지금
public decimal GetBalance() => _balance;           // C# 6: 메서드
public bool IsEmpty => _balance == 0;              // C# 6: 읽기 전용 속성
public Wallet(long id) => Id = id;                 // C# 7: 생성자
public string Memo { get => _memo; set => _memo = value.Trim(); }  // C# 7: 접근자
```

- 본문이 **식 하나**일 때만 쓸 수 있습니다. 여러 줄이면 예전처럼 `{ }`를 씁니다.
- 람다식의 `=>`와 모양이 같지만, 이건 멤버 정의 문법입니다.

---

## 2. 로컬 함수 `C# 7+`

```csharp
public decimal CalculateFee(IEnumerable<decimal> amounts)
{
    return amounts.Sum(Fee);

    // 이 메서드 안에서만 쓰는 계산
    decimal Fee(decimal amount) => amount >= 10_000 ? 0 : 100;
}
```

- 클래스 전체에 드러낼 필요가 없는 도우미 로직을 숨길 수 있습니다.
- 람다와 달리 **대리자 객체를 만들지 않아** 가볍고, 재귀 호출도 됩니다.
- 선언 위치가 자유로워서, 보통 메서드 맨 아래에 둡니다.

### `static` 로컬 함수 `C# 8+`

```csharp
decimal total = 0;
static decimal Double(decimal x) => x * 2;      // OK
// static decimal AddTotal(decimal x) => x + total;  // ❌ 오류: static이라 바깥 변수 total을 못 씀
```

바깥 변수를 실수로 잡아 쓰는 것(캡처)을 막고 싶을 때 씁니다.

---

## 3. 버림 `_` `C# 7+`

```csharp
_ = int.TryParse(input, out _);              // 반환값도, out 값도 쓰지 않음
var (id, _) = GetWalletSummary();            // 튜플에서 두 번째 값은 버림
_ = SendNotificationAsync();                 // "반환값을 일부러 무시한다"는 표시
```

- `_`은 변수가 아니라 "버린다"는 표시라서, 여러 번 써도 충돌하지 않습니다.
- `switch` 식의 `_ =>`(나머지 전부)와 같은 기호입니다.

---

## 4. `throw` 식 `C# 7+`

```csharp
// ❌ 예전
if (repository == null) throw new ArgumentNullException(nameof(repository));
_repository = repository;

// ✅ 지금: 대입과 검사를 한 줄로
_repository = repository ?? throw new ArgumentNullException(nameof(repository));

// 삼항 연산자 안에서도
decimal amount = request.Amount > 0 ? request.Amount : throw new ArgumentOutOfRangeException(nameof(request));
```

C# 7 전에는 `throw`가 문장이라 식 안에 쓸 수 없었습니다.

---

> **참고 자료**
> - [식 본문 멤버 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/statements-expressions-operators/expression-bodied-members)
> - [로컬 함수 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/classes-and-structs/local-functions)
> - [무시 항목 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/fundamentals/functional/discards)

---

[🔙 뒤로 가기](../index.md)
