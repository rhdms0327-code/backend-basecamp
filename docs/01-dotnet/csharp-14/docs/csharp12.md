---
layout: post
title: "🆕 [C# 12] 기본 생성자 · 컬렉션 식"
date: 2026-10-16
categories: [C#]
tags: [C# 12, .NET 8, 기본 생성자, primary constructor, 컬렉션 식, using 별칭]
nav_exclude: true
---

> C# 12(.NET 8)에서 가장 많이 쓰이는 두 기능, 클래스 옆에 바로 매개변수를 쓰는 **기본 생성자**와 모든 컬렉션을 `[ ]`로 만드는 **컬렉션 식**을 정리합니다. ASP.NET Core 코드에서 매일 보게 됩니다.

| 문법 | 버전 | 빈도 | 한 줄 설명 |
| :--- | :--- | :--- | :--- |
| 기본 생성자 (클래스·구조체) | `C# 12+` | ★★★ | `class A(IFoo foo)` |
| 컬렉션 식 `[ ]` · spread `..` | `C# 12+` | ★★★ | 배열·리스트·Span을 같은 모양으로 |
| 람다 매개변수 기본값 | `C# 12+` | ★ | `(int x = 1) => x` |
| 모든 형식 `using` 별칭 | `C# 12+` | ★ | `using Pair = (long Id, decimal Amount);` |

---

## 1. 기본 생성자 `C# 12+`

```csharp
// ❌ 예전: 필드 + 생성자 + 대입, 3단계
public class WalletService
{
    private readonly IWalletRepository _repository;
    private readonly ILogger<WalletService> _logger;

    public WalletService(IWalletRepository repository, ILogger<WalletService> logger)
    {
        _repository = repository;
        _logger = logger;
    }
}

// ✅ 지금
public class WalletService(IWalletRepository repository, ILogger<WalletService> logger)
{
    public Task<Wallet?> FindAsync(long id) => repository.FindAsync(id);
}
```

### Controller에서

```csharp
[ApiController]
[Route("api/wallets")]
public class WalletsController(IWalletService walletService) : ControllerBase
{
    [HttpGet("{id:long}")]
    public async Task<IActionResult> Get(long id, CancellationToken ct)
    {
        var wallet = await walletService.GetAsync(id, ct);
        return wallet is null ? NotFound() : Ok(wallet);
    }
}
```

### 주의점 (보완)

| 항목 | 클래스의 기본 생성자 | `record`의 기본 생성자 (C# 9) |
| :--- | :--- | :--- |
| 공개 속성이 생기나 | ❌ 안 생김. 매개변수일 뿐 | ✅ 자동으로 공개 속성 |
| `readonly`인가 | ❌ 아님. 본문에서 재대입 가능 | 속성은 `init` |
| `Equals` 자동 생성 | ❌ | ✅ |

```csharp
public class WalletService(IWalletRepository repository)
{
    public void Oops() => repository = null!;   // ⚠️ 컴파일됨. 매개변수는 readonly가 아님
}
```

재대입을 막고 싶다면 필드로 한 번 옮깁니다.

```csharp
public class WalletService(IWalletRepository repository)
{
    private readonly IWalletRepository _repository = repository;
}
```

- 다른 생성자를 추가하면 그 생성자는 반드시 `this(...)`로 기본 생성자를 호출해야 합니다.
- 매개변수를 본문 메서드에서 쓰면 컴파일러가 숨은 필드에 저장합니다(캡처). 생성자에서만 쓰면 저장하지 않습니다.

---

## 2. 컬렉션 식 `[ ]` `C# 12+`

```csharp
// ❌ 예전: 컬렉션마다 모양이 다름
int[] a = new int[] { 1, 2, 3 };
List<string> b = new List<string> { "card", "bank" };
var empty = new List<long>();
var none = Array.Empty<int>();

// ✅ 지금: 모두 [ ]
int[] a2 = [1, 2, 3];
List<string> b2 = ["card", "bank"];
List<long> empty2 = [];
Span<int> span = [1, 2, 3];
```

### spread `..`

```csharp
int[] first = [1, 2];
int[] second = [3, 4];
int[] all = [..first, ..second, 5];   // [1, 2, 3, 4, 5]
```

### 받을 수 있는 형식 (보완)

| 왼쪽 형식 | 가능 |
| :--- | :--- |
| 배열 `T[]`, `List<T>`, `HashSet<T>` 등 | ✅ |
| `Span<T>`, `ReadOnlySpan<T>` | ✅ |
| `IEnumerable<T>`, `IReadOnlyList<T>`, `IList<T>` 등 인터페이스 | ✅ (컴파일러가 적절한 형식을 골라 만듦) |
| `var x = [1, 2];` | ❌ 오류. 형식을 알 수 없음 |

```csharp
public IReadOnlyList<string> AllowedMethods { get; } = ["card", "bank"];

public IEnumerable<decimal> Defaults() => [1000, 5000, 10000];
```

- `var`와는 함께 못 씁니다. 왼쪽에 형식이 있어야 합니다.
- 빈 컬렉션은 `[]` 하나로 끝납니다. `new()`, `Array.Empty<T>()` 대신 쓰는 경우가 늘었습니다.

---

## 3. 람다 매개변수 기본값 `C# 12+`

```csharp
var fee = (decimal amount, decimal rate = 0.01m) => amount * rate;

fee(10_000);          // 100
fee(10_000, 0.02m);   // 200
```

---

## 4. 모든 형식 `using` 별칭 `C# 12+`

```csharp
using ChargeResult = (long WalletId, decimal Balance);

ChargeResult Charge() => (1, 5000m);
```

C# 12 전에는 별칭에 튜플·배열 같은 형식을 쓸 수 없었습니다.

---

> **참고 자료**
> - [C# 12의 새로운 기능 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/whats-new/csharp-12)
> - [기본 생성자 자습서 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/whats-new/tutorials/primary-constructors)
> - [컬렉션 식 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/operators/collection-expressions)

---

[🔙 뒤로 가기](../index.md)
