---
layout: post
title: "🎯 [C# 7~9] 작은 편의 문법: new() · default · 숫자 구분자"
date: 2026-10-16
categories: [C#]
tags: [C# 7, C# 7.1, C# 9, 대상 형식 new, default 리터럴, 숫자 구분자, 람다 버림]
nav_exclude: true
---

> 하나하나는 작지만 매일 쓰는 편의 문법을 모았습니다. 형식을 두 번 쓰지 않게 하는 `new()`, 형식 이름 없는 `default`, 읽기 쉬운 숫자 `1_000_000`, 람다의 버림 매개변수입니다.

| 문법 | 버전 | 빈도 | 한 줄 설명 |
| :--- | :--- | :--- | :--- |
| 대상 형식 `new()` | `C# 9+` | ★★★ | 왼쪽에 형식이 있으면 오른쪽은 `new()` |
| `default` 리터럴 | `C# 7.1+` | ★★ | `default(T)` 대신 `default` |
| 숫자 구분자 `_` | `C# 7+` | ★ | `1_000_000` |
| 이진 리터럴 `0b` | `C# 7+` | ★ | `0b1010` |
| 람다 버림 매개변수 `(_, _) =>` | `C# 9+` | ★ | 쓰지 않는 람다 매개변수 |
| 대상 형식 조건식 | `C# 9+` | ○ | 삼항 연산자의 형식을 왼쪽에서 추론 |

---

## 1. 대상 형식 `new()` `C# 9+`

```csharp
// ❌ 예전: 형식을 두 번 씀
Dictionary<long, List<WalletTransaction>> byWallet = new Dictionary<long, List<WalletTransaction>>();

// var로 줄이기 (C# 3)
var byWallet2 = new Dictionary<long, List<WalletTransaction>>();

// ✅ C# 9: 왼쪽 형식을 보고 오른쪽을 추론
Dictionary<long, List<WalletTransaction>> byWallet3 = new();

// 필드·속성 초기화에서 특히 유용 (필드에는 var를 못 씀)
private readonly List<string> _logs = new();
public Wallet Wallet { get; set; } = new(1);
```

- `var`는 오른쪽을 보고 왼쪽을, `new()`는 왼쪽을 보고 오른쪽을 정합니다.
- 메서드 인수에도 씁니다: `Process(new() { Id = 1 })`
- C# 12부터는 컬렉션에 `[]`(컬렉션 식)도 쓸 수 있습니다. → [🆕 C# 14](../../csharp-14/index.md) 메뉴의 [C# 12] 글

---

## 2. `default` 리터럴 `C# 7.1+`

```csharp
// ❌ 예전
public Task<Wallet?> FindAsync(long id, CancellationToken ct = default(CancellationToken))

// ✅ 지금
public Task<Wallet?> FindAsync(long id, CancellationToken ct = default)
```

형식이 분명한 곳에서는 형식 이름을 생략합니다. 비동기 메서드의 `CancellationToken ct = default`가 가장 흔한 예입니다.

---

## 3. 숫자 구분자 · 이진 리터럴 `C# 7+`

```csharp
decimal dailyLimit = 1_000_000m;   // 백만 원. 1000000m보다 읽기 쉬움
int flags = 0b0000_0101;           // 이진수
long big = 9_223_372_036_854_775_807;
```

`_`는 값에 영향을 주지 않는 표시입니다. 금액·한도 상수에 쓰면 자릿수 실수를 줄일 수 있습니다.

---

## 4. 람다 버림 매개변수 `C# 9+`

```csharp
// 이벤트 처리기에서 sender, e를 둘 다 안 씀
button.Click += (_, _) => Refresh();
```

C# 9 전에는 `_`를 두 번 쓰면 이름 충돌 오류였습니다.

---

## 5. 대상 형식 조건식 `C# 9+`

```csharp
int? limit = hasLimit ? 1000 : null;   // C# 9 전에는 (int?)null로 써야 했음
```

---

> **참고 자료**
> - [new 연산자 (대상 형식 new) - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/operators/new-operator)
> - [default 값 식 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/operators/default)

---

[🔙 뒤로 가기](../index.md)
