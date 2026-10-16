---
layout: post
title: "🎯 [C# 8] nullable 참조 형식 (string?)"
date: 2026-10-16
categories: [C#]
tags: [C# 8, C# 9, nullable, null 안전성]
nav_exclude: true
---

> `string`과 `string?`을 구분해서, "여기는 null이 올 수 있다"를 코드에 적고 컴파일러가 null 실수를 경고하게 하는 기능입니다. .NET 6 이후 새 프로젝트 템플릿은 기본으로 켜져 있습니다.

| 문법 | 버전 | 빈도 | 한 줄 설명 |
| :--- | :--- | :--- | :--- |
| nullable 참조 형식 `string?` | `C# 8+` | ★★★ | 참조 형식에도 null 가능 여부를 표시 |
| null 허용 연산자 `!` | `C# 8+` | ★★ | "여기는 null이 아니다"라고 컴파일러에게 알려 경고를 끔 |
| `is null` / `is not null` | `C# 9+` (`is not`) | ★★★ | null 검사. `==` 재정의의 영향을 받지 않음 |

> 기존 글 [상수, 열거형, Nullable](./constants-enum-nullable.md)은 값 형식의 `int?`(`Nullable<T>`)를 다룹니다. 이 글은 **참조 형식**(`string`, 클래스)의 null 표시입니다. 둘은 이름이 비슷하지만 다른 기능입니다.

---

## 1. 무엇이 달라지나

```csharp
string name = null;      // ⚠️ 경고 CS8600: null을 null이 될 수 없는 형식에 넣음
string? memo = null;     // OK: ?가 "null일 수 있다"는 표시

int length = memo.Length; // ⚠️ 경고 CS8602: null일 수 있는 값을 역참조
int safe = memo?.Length ?? 0; // OK
```

- `string`은 "null이 아니다", `string?`은 "null일 수 있다"는 **약속**입니다.
- 실행 결과는 바뀌지 않습니다. **컴파일 경고**만 생깁니다. 그래서 경고를 무시하면 예전처럼 실행 중에 `NullReferenceException`이 날 수 있습니다.

---

## 2. 켜는 방법

새 프로젝트의 `.csproj`에는 이미 들어 있습니다.

```xml
<PropertyGroup>
  <Nullable>enable</Nullable>
</PropertyGroup>
```

파일 하나만 켜거나 끌 때는 `#nullable enable` / `#nullable disable`을 씁니다.

---

## 3. 자주 만나는 경고와 해결

| 경고 | 뜻 | 해결 |
| :--- | :--- | :--- |
| `CS8600` | null 또는 null일 수 있는 값을 null 불가 형식으로 변환 | 받는 쪽을 `string?`으로 하거나 null 검사 |
| `CS8602` | null일 수 있는 값을 역참조 | `?.`, `is not null` 검사 후 사용 |
| `CS8618` | 생성자가 끝날 때 null 불가 속성이 비어 있음 | 생성자에서 채우기, `required`(C# 11), 기본값 지정 |
| `CS8625` | null 리터럴을 null 불가 형식에 넣음 | 형식을 `?`로 바꾸기 |

### CS8618 예시 (가장 많이 만남)

```csharp
public class Wallet
{
    public string OwnerName { get; set; }   // ⚠️ CS8618
}

// 해결 1: 기본값
public string OwnerName { get; set; } = "";

// 해결 2: null을 허용
public string? OwnerName { get; set; }

// 해결 3: 반드시 채우게 강제 (C# 11 required)
public required string OwnerName { get; set; }
```

---

## 4. `!` null 허용 연산자

```csharp
string memo = FindMemo()!;  // "이건 절대 null이 아니다"라고 단언 → 경고 사라짐
```

- 경고만 끄고, 실제 검사는 하지 않습니다. 틀리면 실행 중에 터집니다.
- 확실한 근거가 있을 때만 쓰고, 쓸 때는 이유를 주석으로 남깁니다.

---

## 5. `is null` / `is not null` `C# 9+`

```csharp
if (wallet is null) return NotFound();
if (wallet is not null) { /* ... */ }
```

- `is null`은 항상 "참조가 진짜 null인가"만 확인하는 가장 확실한 비교입니다. `== null`은 클래스가 `==`를 재정의했다면 결과가 달라질 수 있습니다(아래 참고).
- `is null`은 C# 7부터, `is not null`은 C# 9의 `not` 패턴부터 가능합니다.

> 💡 **참고: 왜 `is null`이 더 확실한가**
>
> C#에서는 클래스가 `==`의 동작을 직접 바꿔 쓸 수 있습니다(연산자 재정의). 업무 코드에서 일부러 재정의하는 일은 드물지만, 재정의된 형식에서는 `== null`이 진짜 null 검사가 아닐 수 있습니다.
>
> ```csharp
> public class Weird
> {
>     // == 를 재정의: 비교 대상이 null이어도 항상 true를 반환
>     public static bool operator ==(Weird? a, Weird? b) => true;
>     public static bool operator !=(Weird? a, Weird? b) => false;
>
>     public override bool Equals(object? obj) => true;
>     public override int GetHashCode() => 0;
> }
>
> Weird w = new Weird();          // null이 아닌 진짜 객체
>
> Console.WriteLine(w == null);   // True  ← 객체가 있는데도 true (재정의된 ==가 실행됨)
> Console.WriteLine(w is null);   // False ← 재정의와 상관없이 진짜 null인지만 확인
> ```
>
> 그래서 null 검사에는 `is null` / `is not null`을 쓰는 것이 더 확실합니다. 재정의하지 않은 일반 클래스에서는 `== null`과 결과가 같으므로 헷갈릴 일은 거의 없습니다.

---

> **참고 자료**
> - [nullable 참조 형식 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/nullable-references)
> - [null 허용 경고 해결 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/compiler-messages/nullable-warnings)

---

[🔙 뒤로 가기](../index.md)
