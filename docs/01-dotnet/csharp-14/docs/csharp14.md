---
layout: post
title: "🆕 [C# 14] field · 확장 멤버 · null 조건 대입"
date: 2026-10-16
categories: [C#]
tags: [C# 14, .NET 10, field, 확장 멤버, extension, null 조건 대입]
nav_exclude: true
---

> 현재 최신 버전인 C# 14(.NET 10)의 신규 기능입니다. 속성 안에서 숨은 필드를 바로 쓰는 `field`, 확장 메서드를 속성·정적 멤버까지 넓힌 **확장 멤버**, `?.`로 대입까지 하는 **null 조건 대입**이 핵심입니다.

| 문법 | 버전 | 빈도 | 한 줄 설명 |
| :--- | :--- | :--- | :--- |
| `field` 키워드 | `C# 14+` | ★★ | 속성 안에서 자동 생성 필드에 접근 |
| 확장 멤버 (`extension` 블록) | `C# 14+` | ★★ | 확장 속성, 정적 확장 메서드 |
| null 조건 대입 `a?.B = x` | `C# 14+` | ★★ | 앞이 null이 아닐 때만 대입 |
| 열린 제네릭 `nameof` | `C# 14+` | ★ | `nameof(List<>)` |
| 람다 매개변수 한정자 | `C# 14+` | ★ | `(text, out result) =>` 형식 생략 |

---

## 1. `field` 키워드 `C# 14+`

```csharp
// ❌ 예전: 검사 로직을 넣으려면 필드를 직접 선언
private decimal _balance;
public decimal Balance
{
    get => _balance;
    set => _balance = value >= 0 ? value : throw new ArgumentOutOfRangeException(nameof(value));
}

// ✅ 지금: 자동 속성처럼 쓰면서 set에만 로직
public decimal Balance
{
    get;
    set => field = value >= 0 ? value : throw new ArgumentOutOfRangeException(nameof(value));
}
```

- `field`는 컴파일러가 만든 숨은 필드를 가리킵니다. 필드 선언 한 줄과 `get` 본문이 사라집니다.
- 이미 `field`라는 이름의 멤버가 있는 클래스에서는 그 멤버를 `this.field` 또는 `@field`로 구분합니다.

### 지연 초기화

```csharp
public List<string> Logs
{
    get => field ??= [];
}
```

### nullable과 함께 (보완)

`field`의 null 가능 여부는 속성 형식을 따릅니다. 위 지연 초기화처럼 `get`이 null을 돌려주지 않는다고 컴파일러가 판단할 수 있으면 경고가 없지만, 판단이 안 되는 복잡한 로직에서는 nullable 경고가 날 수 있습니다. 경고가 나면 `!`로 덮지 말고 로직을 단순하게 바꿉니다.

---

## 2. 확장 멤버 `C# 14+`

예전 확장 메서드(C# 3)는 `this` 매개변수가 있는 정적 메서드만 가능했습니다. C# 14는 `extension` 블록으로 **확장 속성**과 **정적 확장 멤버**까지 만듭니다.

```csharp
// ❌ 예전 (C# 3~13): 메서드만
public static class WalletExtensions
{
    public static bool IsEmpty(this Wallet wallet) => wallet.Balance == 0;
}
wallet.IsEmpty();   // 메서드 호출 모양

// ✅ C# 14
public static class WalletExtensions
{
    extension(Wallet wallet)                 // 인스턴스 확장
    {
        public bool IsEmpty => wallet.Balance == 0;              // 확장 속성
        public decimal BalanceWithFee(decimal fee) => wallet.Balance - fee;
    }

    extension(Wallet)                        // 정적 확장 (받는 변수 없음)
    {
        public static Wallet Empty(long id) => new(id, 0m);
    }
}

bool empty = wallet.IsEmpty;     // 속성처럼
var w = Wallet.Empty(1);         // Wallet의 정적 메서드처럼
```

- 기존 `this` 확장 메서드는 그대로 동작합니다. 둘을 섞어 써도 됩니다.
- 내가 만들지 않은 형식(라이브러리, 프레임워크 형식)에 속성을 붙이고 싶을 때 씁니다.

---

## 3. null 조건 대입 `C# 14+`

```csharp
// ❌ 예전
if (wallet is not null)
{
    wallet.Memo = "충전";
}

// ✅ 지금
wallet?.Memo = "충전";            // wallet이 null이면 아무 일도 안 함
wallet?.Balance += 1000m;         // 복합 대입도 가능
```

- 왼쪽이 null이면 **오른쪽 식도 실행하지 않습니다.**
- `++`, `--`는 쓸 수 없습니다.
- C# 6의 `?.`(읽기)를 쓰기로 넓힌 것입니다. → [null 연산자](../../csharp-10/docs/v-null-operators.md)

---

## 4. 열린 제네릭 `nameof` `C# 14+`

```csharp
string a = nameof(List<int>);   // "List"  (예전에도 가능)
string b = nameof(List<>);      // "List"  (C# 14부터. 형식 인수를 안 써도 됨)
```

---

## 5. 람다 매개변수 한정자 `C# 14+`

```csharp
delegate bool TryParse<T>(string text, out T result);

// ❌ C# 13: out을 쓰려면 형식까지 다 적어야 함
TryParse<long> p1 = (string text, out long result) => long.TryParse(text, out result);

// ✅ C# 14: 한정자만 쓰고 형식은 생략
TryParse<long> p2 = (text, out result) => long.TryParse(text, out result);
```

---

## 나머지 C# 14 기능

암시적 `Span` 변환, `partial` 생성자·이벤트, 사용자 정의 복합 대입 연산자는 [C# 11~14 알아만 둘 문법](./advanced.md)에 있습니다.

---

> **참고 자료**
> - [C# 14의 새로운 기능 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/whats-new/csharp-14)
> - [field 키워드 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/keywords/field)
> - [확장 멤버 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/classes-and-structs/extension-methods)

---

[🔙 뒤로 가기](../index.md)
