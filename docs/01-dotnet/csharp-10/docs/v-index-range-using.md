---
layout: post
title: "🎯 [C# 6·8] 인덱스·범위와 using 선언"
date: 2026-10-16
categories: [C#]
tags: [C# 6, C# 8, 인덱스, 범위, using 선언, 인덱스 이니셜라이저]
nav_exclude: true
---

> 배열을 뒤에서부터 세거나 잘라내는 `^`·`..`, 중괄호 없이 자원을 정리하는 `using` 선언, 사전을 `[키] = 값`으로 초기화하는 인덱스 이니셜라이저를 정리합니다.

| 문법 | 버전 | 빈도 | 한 줄 설명 |
| :--- | :--- | :--- | :--- |
| 인덱스 `^` | `C# 8+` | ★★★ | 뒤에서 몇 번째 |
| 범위 `..` | `C# 8+` | ★★ | 구간 잘라내기 |
| `using` 선언 | `C# 8+` | ★★★ | 블록 끝에서 자동 `Dispose` |
| 인덱스 이니셜라이저 `[키] = 값` | `C# 6+` | ★ | 사전·인덱서 초기화 |

---

## 1. 인덱스 `^` `C# 8+`

```csharp
int[] amounts = { 1000, 5000, 10000, 50000 };

int last   = amounts[^1];   // 50000 (뒤에서 첫 번째)
int second = amounts[^2];   // 10000

// ❌ 예전
int lastOld = amounts[amounts.Length - 1];
```

- `^1`이 마지막입니다. `^0`은 "끝 바로 다음"이라 접근하면 예외가 납니다.
- 배열, 문자열, `List<T>`, `Span<T>`에서 씁니다.

---

## 2. 범위 `..` `C# 8+`

```csharp
int[] amounts = { 1000, 5000, 10000, 50000 };

int[] firstTwo = amounts[..2];    // { 1000, 5000 }  (0, 1번)
int[] middle   = amounts[1..3];   // { 5000, 10000 } (1, 2번)
int[] lastTwo  = amounts[^2..];   // { 10000, 50000 }

string code = "WALLET-0001";
string number = code[7..];        // "0001"
```

- `a..b`는 **a는 포함, b는 제외**입니다.
- 배열과 문자열은 잘라낸 **복사본**을 만듭니다. 복사 없이 보려면 `Span<T>`를 씁니다.
- `List<T>`는 `^`는 되지만 `..`는 안 됩니다. 리스트를 자를 때는 `GetRange`나 LINQ를 씁니다.

---

## 3. `using` 선언 `C# 8+`

```csharp
// ❌ 예전: 중괄호 블록이 하나 더 생김
using (var connection = new SqlConnection(connectionString))
{
    await connection.OpenAsync();
    // ...
}

// ✅ 지금: 이 변수가 속한 블록이 끝날 때 Dispose
using var connection = new SqlConnection(connectionString);
await connection.OpenAsync();
// ... 메서드가 끝나면 connection.Dispose() 자동 호출
```

- 들여쓰기가 한 단계 줄어듭니다. 여러 개를 연달아 선언하면 **선언의 역순**으로 정리됩니다.
- 정리 시점이 "블록 끝"이므로, 빨리 닫아야 하는 자원은 예전 `using ( ) { }` 블록이 더 적합합니다.
- 비동기 정리는 `await using var x = ...;`를 씁니다.

---

## 4. 인덱스 이니셜라이저 `C# 6+`

```csharp
// 컬렉션 이니셜라이저 (C# 3): Add 호출
var fees = new Dictionary<string, decimal> { { "card", 100 }, { "bank", 0 } };

// 인덱스 이니셜라이저 (C# 6): 인덱서 대입
var fees2 = new Dictionary<string, decimal>
{
    ["card"] = 100,
    ["bank"] = 0,
};
```

- 같은 키가 두 번 나오면, 위쪽(`Add`)은 예외가 나고 아래쪽(인덱서)은 덮어씁니다.

---

> **참고 자료**
> - [인덱스 및 범위 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/tutorials/ranges-indexes)
> - [using 문 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/statements/using)

---

[🔙 뒤로 가기](../index.md)
