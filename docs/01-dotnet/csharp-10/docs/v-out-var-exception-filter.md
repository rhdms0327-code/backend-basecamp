---
layout: post
title: "🎯 [C# 6~7] out 변수 인라인과 예외 필터"
date: 2026-10-16
categories: [C#]
tags: [C# 6, C# 7, out 변수, 예외 필터, when, await]
nav_exclude: true
---

> `out` 변수를 호출하는 자리에서 바로 선언하는 방법과, 조건이 맞을 때만 예외를 잡는 `catch ... when`, `catch`·`finally` 안의 `await`를 정리합니다.

| 문법 | 버전 | 빈도 | 한 줄 설명 |
| :--- | :--- | :--- | :--- |
| `out` 변수 인라인 `out var x` | `C# 7+` | ★★★ | 호출하면서 바로 변수 선언 |
| 예외 필터 `catch ... when` | `C# 6+` | ★★ | 조건이 참일 때만 catch |
| `catch`·`finally` 안 `await` | `C# 6+` | ★ | 예외 처리 중에도 비동기 호출 |

> `ref`·`out`의 기본 개념은 [메서드 매개변수 (ref, out)](./method-params.md)에 있습니다.

---

## 1. `out` 변수 인라인 `C# 7+`

```csharp
// ❌ 예전: 변수를 먼저 선언
long walletId;
if (long.TryParse(input, out walletId)) { /* ... */ }

// ✅ 지금: 호출 자리에서 선언
if (long.TryParse(input, out var walletId))
{
    Console.WriteLine(walletId);
}

// 쓰지 않는 out 값은 버림
bool ok = long.TryParse(input, out _);
```

- 선언한 변수는 `if` 문 **바깥에서도** 쓸 수 있습니다(같은 블록 범위).
- `TryParse`, `Dictionary.TryGetValue`에서 가장 많이 씁니다.

```csharp
if (_balances.TryGetValue(walletId, out var balance))
    return balance;
```

---

## 2. 예외 필터 `catch ... when` `C# 6+`

```csharp
try
{
    await connection.ExecuteAsync("dbo.usp_Wallet_Charge", parameters, commandType: CommandType.StoredProcedure);
}
catch (SqlException ex) when (ex.Number == 1205)   // 1205 = SQL Server 교착 상태(deadlock)
{
    // 교착 상태일 때만 재시도
}
```

### `catch` 안에서 `if`로 거르는 것과 무엇이 다른가

```csharp
// ❌ 잡고 나서 다시 던지기
catch (SqlException ex)
{
    if (ex.Number != 1205) throw;   // 이미 잡은 뒤라 디버깅 정보가 흐려질 수 있음
}
```

- `when`이 거짓이면 **처음부터 잡지 않은 것**으로 처리됩니다. 예외가 원래 위치 그대로 위로 올라가서, 디버거와 로그에서 원인 추적이 쉽습니다.
- 같은 예외 형식을 조건별로 나눠 여러 `catch`를 둘 수 있습니다.

---

## 3. `catch`·`finally` 안 `await` `C# 6+`

```csharp
try
{
    await ProcessAsync();
}
catch (Exception ex)
{
    await _logger.WriteErrorAsync(ex);   // C# 6 전에는 불가
    throw;
}
finally
{
    await connection.CloseAsync();
}
```

---

> **참고 자료**
> - [out 매개변수 한정자 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/keywords/out)
> - [예외 처리 문 (when) - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/statements/exception-handling-statements)

---

[🔙 뒤로 가기](../index.md)
