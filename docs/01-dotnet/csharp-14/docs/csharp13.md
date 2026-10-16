---
layout: post
title: "🆕 [C# 13] params 컬렉션 · Lock · partial 속성"
date: 2026-10-16
categories: [C#]
tags: [C# 13, .NET 9, params, Lock, partial 속성]
nav_exclude: true
---

> C# 13(.NET 9)은 큰 기능보다 작은 개선이 많은 버전입니다. 실무에서 마주칠 만한 `params` 컬렉션, 새 `Lock` 형식, `partial` 속성을 정리합니다.

| 문법 | 버전 | 빈도 | 한 줄 설명 |
| :--- | :--- | :--- | :--- |
| `params` 컬렉션 | `C# 13+` | ★ | `params`에 배열 말고 `Span`·`List`·`IEnumerable` |
| `System.Threading.Lock` | `C# 13+` / .NET 9 | ★ | `lock`용 전용 형식 |
| `partial` 속성·인덱서 | `C# 13+` | ★ | 선언과 구현을 나눈 속성 (소스 생성기용) |
| `\e` 이스케이프 | `C# 13+` | ○ | ESC 문자 (콘솔 색상) |

---

## 1. `params` 컬렉션 `C# 13+`

```csharp
// ❌ 예전: params는 배열만
public void Log(params string[] messages) { }

// ✅ 지금: 다른 컬렉션도
public void Log(params ReadOnlySpan<string> messages) { }   // 배열 할당 없이 전달 가능
public void Sum(params IEnumerable<decimal> amounts) { }

Log("charge", "wallet=1", "amount=5000");
```

- 호출하는 쪽 코드는 그대로입니다. 받는 쪽 형식만 넓어졌습니다.
- `ReadOnlySpan<T>`로 받으면 호출할 때마다 배열을 새로 만들지 않아 성능에 유리합니다. .NET 9의 `string.Join`, `Task.WhenAll` 등에 이런 오버로드가 추가되었습니다.

---

## 2. `System.Threading.Lock` `C# 13+` / .NET 9

```csharp
// ❌ 예전: 아무 object나 잠금 대상으로
private readonly object _gate = new();

// ✅ 지금: 잠금 전용 형식
private readonly Lock _gate = new();

public void Charge(decimal amount)
{
    lock (_gate)          // 컴파일러가 Lock 전용의 빠른 경로로 바꿔 줌
    {
        _balance += amount;
    }
}
```

- `lock` 문 모양은 같습니다. 대상이 `Lock` 형식이면 C# 13 컴파일러가 `Lock.EnterScope()`를 쓰는 코드로 바꿉니다.
- 잠금 기본 개념은 [스레드 동기화](../../csharp-10/docs/thread-synchronization.md)에 있습니다. 여러 서버에 걸친 잠금(분산 락)은 이걸로 해결되지 않습니다.

---

## 3. `partial` 속성·인덱서 `C# 13+`

```csharp
public partial class WalletValidator
{
    [GeneratedRegex(@"^W-\d{4}$")]
    private static partial Regex CodePattern { get; }   // 선언만. 구현은 소스 생성기가 만듦
}
```

- C# 3부터 있던 `partial` 메서드를 속성까지 넓힌 기능입니다.
- 직접 구현할 일은 드물고, .NET 9의 `[GeneratedRegex]`처럼 **소스 생성기가 구현을 채우는** 곳에서 만납니다.

---

## 4. `\e` 이스케이프 `C# 13+`

```csharp
Console.WriteLine("\e[32m충전 완료\e[0m");   // 콘솔 초록색 (예전: \u001b)
```

---

## 나머지 C# 13 기능

객체 이니셜라이저의 `^` 인덱스, async 메서드 안 `ref` 지역 변수, `allows ref struct`, `OverloadResolutionPriority` 등은 [C# 11~14 알아만 둘 문법](./advanced.md)에 있습니다.

---

> **참고 자료**
> - [C# 13의 새로운 기능 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/whats-new/csharp-13)
> - [lock 문 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/statements/lock)

---

[🔙 뒤로 가기](../index.md)
