---
layout: post
title: "🆕 [C# 11~14] 알아만 둘 문법"
date: 2026-10-16
categories: [C#]
tags: [C# 11, C# 12, C# 13, C# 14, 고성능, 라이브러리]
nav_exclude: true
---

> 일반적인 API 코드에서는 직접 쓸 일이 드물지만, 라이브러리 코드나 고성능 코드를 읽다가 만날 수 있는 C# 11~14 기능을 한 장에 모았습니다. "이런 게 있다"는 정도만 알면 됩니다.

> 빈도는 모두 ○(알아만 둠)입니다. 자주 쓰는 기능은 버전별 글([C# 11](./csharp11.md) · [C# 12](./csharp12.md) · [C# 13](./csharp13.md) · [C# 14](./csharp14.md))에 있습니다.

---

## C# 11 (.NET 7)

| 문법 | 한 줄 설명 | 만나는 곳 |
| :--- | :--- | :--- |
| UTF-8 문자열 리터럴 `"abc"u8` | `ReadOnlySpan<byte>`로 바로 | HTTP·바이트 처리 |
| 제네릭 수학 · `static abstract` 인터페이스 멤버 | `T.Zero`, `+`를 제네릭으로 (`INumber<T>`) | 수치 라이브러리 |
| `ref` 필드 · `scoped` | `ref struct` 안의 참조 필드 | `Span<T>` 내부 구현 |
| 자동 기본값 구조체 | 생성자에서 안 채운 필드를 기본값으로 | 구조체 정의 |
| 부호 없는 오른쪽 시프트 `>>>` | | 비트 연산 |
| `checked` 사용자 정의 연산자 | 오버플로 검사판 연산자 | 수치 형식 |
| 숫자 `nint` · `IntPtr` 통일 | | 네이티브 연동 |
| 상수 문자열에 `Span<char>` 패턴 매칭 | `span is "card"` | 파서 |
| 메서드 그룹 변환 캐시 | 정적 메서드 그룹의 대리자를 재사용 | 성능 (자동) |

```csharp
// 제네릭 수학 맛보기
static T Sum<T>(IEnumerable<T> values) where T : INumber<T>
{
    T total = T.Zero;
    foreach (var v in values) total += v;
    return total;
}

Sum(new[] { 1000m, 5000m });   // decimal도, int도 같은 메서드로
```

---

## C# 12 (.NET 8)

| 문법 | 한 줄 설명 | 만나는 곳 |
| :--- | :--- | :--- |
| `ref readonly` 매개변수 | 큰 구조체를 복사 없이, 수정 불가로 | 고성능 API |
| 인라인 배열 `[InlineArray]` | 구조체 안 고정 크기 버퍼 | 런타임 내부 |
| `[Experimental]` 특성 | 실험 API 사용 시 경고 | 라이브러리 |
| 인터셉터 | 컴파일 시점에 메서드 호출 바꿔치기 | 소스 생성기 (ASP.NET Core AOT 등) |

---

## C# 13 (.NET 9)

| 문법 | 한 줄 설명 | 만나는 곳 |
| :--- | :--- | :--- |
| 객체 이니셜라이저의 `^` 인덱스 | `{ Items = { [^1] = 0 } }` | 드묾 |
| async·iterator 안 `ref` 지역·`unsafe` | | 고성능 코드 |
| `ref struct` 인터페이스 구현 · `allows ref struct` | `Span<T>`을 제네릭에 | 라이브러리 |
| `OverloadResolutionPriority` 특성 | 오버로드 우선순위 지정 | 라이브러리 설계 |
| 메서드 그룹 자연 형식 개선 | | 컴파일러 동작 |

---

## C# 14 (.NET 10)

| 문법 | 한 줄 설명 | 만나는 곳 |
| :--- | :--- | :--- |
| 암시적 `Span` 변환 | 배열 → `Span<T>`/`ReadOnlySpan<T>` 자동 변환 | 성능 (대부분 자동) |
| `partial` 생성자 · `partial` 이벤트 | 선언과 구현 분리 | 소스 생성기 |
| 사용자 정의 복합 대입 연산자 | `+=`를 직접 정의 (새 객체 없이 제자리 수정) | 수치·버퍼 형식 |

---

> **참고 자료**
> - [C# 버전 기록 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/whats-new/csharp-version-history)

---

[🔙 뒤로 가기](../index.md)
