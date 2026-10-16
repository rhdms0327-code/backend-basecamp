---
layout: post
title: "🆕 [C# 11] required · 원시 문자열 · 리스트 패턴"
date: 2026-10-16
categories: [C#]
tags: [C# 11, .NET 7, required, 원시 문자열, 리스트 패턴, file, 제네릭 특성]
nav_exclude: true
---

> C# 11(.NET 7)의 신규 기능 중 실무에서 자주 쓰는 것을 정리합니다. 가장 중요한 것은 값을 빠뜨리면 컴파일 오류를 내는 `required`입니다.

| 문법 | 버전 | 빈도 | 한 줄 설명 |
| :--- | :--- | :--- | :--- |
| `required` 멤버 | `C# 11+` | ★★★ | 객체를 만들 때 반드시 채우게 강제 |
| 원시 문자열 리터럴 `"""` | `C# 11+` | ★★ | 이스케이프 없이 SQL·JSON을 그대로 |
| 리스트 패턴 `[a, .., b]` | `C# 11+` | ★ | 배열·리스트 모양으로 패턴 매칭 |
| 보간 `{ }` 안 줄바꿈 | `C# 11+` | ★ | 긴 식을 여러 줄로 |
| `file` 접근 한정자 | `C# 11+` | ★ | 그 파일 안에서만 보이는 형식 |
| 제네릭 특성 | `C# 11+` | ★ | `[Validator<T>]` |
| `nameof` 범위 확장 | `C# 11+` | ★ | 특성 안에서 매개변수 `nameof` |

> 알아만 둘 C# 11 기능(UTF-8 리터럴, 제네릭 수학 등)은 [C# 11~14 알아만 둘 문법](./advanced.md)에 있습니다.

---

## 1. `required` 멤버 `C# 11+`

```csharp
public class Wallet
{
    public required long Id { get; init; }
    public required string OwnerName { get; init; }
    public decimal Balance { get; set; }      // 선택
}

var ok  = new Wallet { Id = 1, OwnerName = "kim" };   // ✅
var bad = new Wallet { Id = 1 };                       // ❌ 오류 CS9035: OwnerName을 설정해야 함
```

- nullable 경고 `CS8618`(생성자가 끝날 때 속성이 비어 있음)을 해결하는 가장 깔끔한 방법입니다.
- `init`과 함께 쓰면 "만들 때 반드시 넣고, 이후엔 못 바꾼다"가 됩니다.

### 생성자와 함께 쓸 때 (보완)

생성자에서 이미 값을 채운다면, 컴파일러에게 그 사실을 알려야 합니다. 안 그러면 생성자를 써도 객체 이니셜라이저에서 또 채우라고 합니다.

```csharp
using System.Diagnostics.CodeAnalysis;

public class Wallet
{
    public required long Id { get; init; }

    public Wallet() { }

    [SetsRequiredMembers]            // "이 생성자가 required를 모두 채운다"
    public Wallet(long id) => Id = id;
}

var w = new Wallet(1);   // ✅ 이니셜라이저 없이 OK
```

### `required` vs 생성자 vs 기본 생성자(C# 12)

| 방식 | 강제 시점 | 어울리는 곳 |
| :--- | :--- | :--- |
| 생성자 매개변수 | 호출할 때 | 도메인 엔티티 (규칙 검사가 필요한 곳) |
| `required` + `init` | 객체 이니셜라이저 | DTO, 설정 클래스 |
| 기본 생성자 (C# 12) | 호출할 때 | 서비스·컨트롤러의 DI |

---

## 2. 원시 문자열 리터럴 `"""` `C# 11+`

```csharp
// ❌ 예전: 따옴표·줄바꿈 이스케이프
string json = "{\n  \"walletId\": 1,\n  \"amount\": 5000\n}";

// ✅ 지금: 보이는 그대로
string json2 = """
    {
      "walletId": 1,
      "amount": 5000
    }
    """;

string sql = """
    SELECT Id, Balance
    FROM dbo.Wallet
    WHERE Id = @id
    """;
```

- 닫는 `"""`의 들여쓰기 위치만큼 각 줄 앞 공백이 잘려 나갑니다. 코드 들여쓰기에 맞춰 써도 결과는 깔끔합니다.
- 보간은 `$"""..."""`. JSON처럼 `{`가 많으면 `$$"""..."""`로 쓰고 값은 `{{ }}`로 넣습니다.

```csharp
string body = $$"""
    { "walletId": {{walletId}}, "amount": {{amount}} }
    """;
```

통합 테스트의 요청 본문, Dapper에 넘기는 SQL에서 자주 씁니다.

---

## 3. 리스트 패턴 `C# 11+`

```csharp
int[] amounts = { 1000, 5000, 10000 };

bool r1 = amounts is [1000, 5000, 10000];   // 정확히 이 값들
bool r2 = amounts is [1000, ..];            // 첫 값이 1000
bool r3 = amounts is [_, _, _];             // 길이 3
bool r4 = amounts is [];                    // 비어 있음

if (amounts is [var first, .., var last])
    Console.WriteLine($"{first} ~ {last}");
```

명령줄 인수, 짧은 고정 형식 데이터 검사에 씁니다.

---

## 4. 보간 `{ }` 안 줄바꿈 `C# 11+`

```csharp
string message = $"수수료: {
    amount >= 10_000
        ? 0
        : 100
}원";
```

C# 11 전에는 일반 보간 문자열의 `{ }` 안에서 줄을 바꿀 수 없었습니다.

---

## 5. `file` 접근 한정자 `C# 11+`

```csharp
// WalletMapper.cs
file class MappingHelper     // 이 파일 밖에서는 보이지 않음
{
    public static string Mask(string name) => name[0] + "**";
}
```

같은 이름의 도우미 클래스가 여러 파일에 있어도 충돌하지 않습니다. 소스 생성기가 만드는 코드에서 많이 씁니다.

---

## 6. 제네릭 특성 `C# 11+`

```csharp
// ❌ 예전: Type을 매개변수로
[Validator(typeof(ChargeRequestValidator))]

// ✅ 지금: 형식 매개변수로
public class ValidatorAttribute<T> : Attribute { }

[Validator<ChargeRequestValidator>]
public record ChargeRequest(long WalletId, decimal Amount);
```

---

## 7. `nameof` 범위 확장 `C# 11+`

```csharp
// C# 10: 문자열로 써야 했음
public static void Positive(decimal value, [CallerArgumentExpression("value")] string? expr = null) { }

// C# 11: 매개변수 이름에 nameof
public static void Positive2(decimal value, [CallerArgumentExpression(nameof(value))] string? expr = null) { }
```

---

> **참고 자료**
> - [C# 11의 새로운 기능 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/whats-new/csharp-11)
> - [required 한정자 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/keywords/required)
> - [원시 문자열 리터럴 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/tokens/raw-string)

---

[🔙 뒤로 가기](../index.md)
