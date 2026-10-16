---
layout: post
title: "🎯 [C# 10] 파일 범위 namespace · global using · 확장 속성 패턴"
date: 2026-10-16
categories: [C#]
tags: [C# 10, C# 6, 파일 범위 namespace, global using, 확장 속성 패턴, CallerArgumentExpression]
nav_exclude: true
---

> C# 10(.NET 6)에서 추가되어 모던 .NET 프로젝트의 모든 파일 첫 줄부터 보이는 문법들입니다. 함께 쓰이는 C# 6의 `using static`도 여기에 묶었습니다.

| 문법 | 버전 | 빈도 | 한 줄 설명 |
| :--- | :--- | :--- | :--- |
| 파일 범위 `namespace` | `C# 10+` | ★★★ | `namespace A.B;` 한 줄로 파일 전체 |
| `global using` / ImplicitUsings | `C# 10+` | ★★★ | using을 프로젝트 전체에 한 번만 |
| 확장 속성 패턴 | `C# 10+` | ★★ | `{ Owner.Id: 1 }` 점으로 중첩 속성 |
| `CallerArgumentExpression` | `C# 10+` | ★★ | 인수로 넘긴 식을 문자열로 받기 |
| 람다 개선 (자연 형식·특성·반환형) | `C# 10+` | ★ | `var f = (int x) => x * 2;` |
| `const` 보간 문자열 | `C# 10+` | ★ | 상수끼리 `$""` |
| `using static` | `C# 6+` | ★ | 정적 멤버를 클래스 이름 없이 |

> `record struct`(C# 10)는 [레코드 (record)](./record.md)에 정리되어 있습니다.

---

## 1. 파일 범위 `namespace` `C# 10+`

```csharp
// ❌ 예전: 파일 전체가 한 단계 들여쓰기
namespace Wallet.Api.Controllers
{
    public class WalletsController : ControllerBase
    {
    }
}

// ✅ 지금
namespace Wallet.Api.Controllers;

public class WalletsController : ControllerBase
{
}
```

- 파일에 namespace가 **하나만** 있을 때 씁니다. 거의 모든 파일이 그렇습니다.
- `.editorconfig`에 `csharp_style_namespace_declarations = file_scoped`를 두면 IDE가 이 방식으로 맞춰 줍니다.

---

## 2. `global using`과 ImplicitUsings `C# 10+`

```csharp
// GlobalUsings.cs (프로젝트에 하나)
global using Wallet.Domain;
global using Wallet.Application.Abstractions;
```

이제 다른 파일에서는 이 using을 쓰지 않아도 됩니다.

### ImplicitUsings

`.csproj`에 아래가 있으면 SDK가 자주 쓰는 using을 자동으로 `global using`으로 넣어 줍니다(.NET 6+ 템플릿 기본값).

```xml
<ImplicitUsings>enable</ImplicitUsings>
```

- 콘솔: `System`, `System.Collections.Generic`, `System.IO`, `System.Linq`, `System.Net.Http`, `System.Threading`, `System.Threading.Tasks`
- 웹(`Microsoft.NET.Sdk.Web`): 위에 더해 `Microsoft.AspNetCore.*`, `Microsoft.Extensions.*`의 주요 namespace

자동으로 들어간 목록은 빌드 후 `obj/` 아래의 `*.GlobalUsings.g.cs` 파일에서 확인할 수 있습니다.

---

## 3. 확장 속성 패턴 `C# 10+`

```csharp
// C# 8~9: 중첩 속성 패턴
if (tx is { Wallet: { Owner: { Grade: "VIP" } } }) { }

// ✅ C# 10: 점으로 바로
if (tx is { Wallet.Owner.Grade: "VIP" }) { }

decimal fee = tx switch
{
    { Wallet.Owner.Grade: "VIP" } => 0,
    { Amount: >= 10_000 }         => 0,
    _                             => 100,
};
```

패턴 매칭의 기본은 [switch 패턴 매칭 (버전별 정리)](./switch-patterns.md)에 있습니다.

---

## 4. `CallerArgumentExpression` `C# 10+`

호출하는 쪽이 넘긴 **식 자체를 문자열로** 받습니다. 검증 도우미의 오류 메시지에 씁니다.

```csharp
using System.Runtime.CompilerServices;

public static class Guard
{
    public static decimal Positive(decimal value,
        [CallerArgumentExpression("value")] string? expression = null)
    {
        if (value <= 0)
            throw new ArgumentOutOfRangeException(expression, $"{expression}는 0보다 커야 합니다");
        return value;
    }
}

Guard.Positive(request.Amount);
// 실패 시 메시지: "request.Amount는 0보다 커야 합니다"
```

- C# 10에서는 `"value"`처럼 문자열로 매개변수 이름을 씁니다. C# 11부터는 `nameof(value)`도 됩니다.
- .NET 6의 `ArgumentNullException.ThrowIfNull(x)`이 이 기능으로 매개변수 이름을 알아냅니다.

---

## 5. 람다 개선 `C# 10+`

```csharp
var parse = (string s) => long.Parse(s);      // 자연 형식: Func<string, long>으로 추론
var choose = object (bool b) => b ? 1 : "0";  // 반환 형식 직접 지정
var handler = [Obsolete] () => "old";         // 람다에 특성
```

C# 10 전에는 `var f = (string s) => ...;`가 형식을 알 수 없다는 오류였습니다. Minimal API의 `app.MapGet("/", () => ...)`가 이 기능 위에서 동작합니다.

---

## 6. `const` 보간 문자열 `C# 10+`

```csharp
const string Prefix = "wallet";
const string BalanceKey = $"{Prefix}:balance";   // 모든 값이 const string일 때만
```

캐시 키, 라우트 상수처럼 상수를 조합할 때 씁니다. 숫자 등 문자열이 아닌 값이 끼면 상수가 될 수 없습니다.

---

## 7. `using static` `C# 6+`

```csharp
using static System.Math;

decimal fee = Max(100m, amount * 0.01m);   // Math.Max 대신 Max
```

자주 쓰는 정적 클래스(예: `Math`, 테스트의 단언 도우미)에 씁니다. 많이 쓰면 어느 클래스 메서드인지 헷갈리므로 아껴 씁니다.

---

> **참고 자료**
> - [C# 10의 새로운 기능 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/whats-new/csharp-10)
> - [네임스페이스 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/keywords/namespace)
> - [using 지시문 (global) - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/keywords/using-directive)

---

[🔙 뒤로 가기](../index.md)
