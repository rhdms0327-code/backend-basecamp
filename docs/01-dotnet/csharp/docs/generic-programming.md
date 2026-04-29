---
layout: post
title: "🎯 [11장] 일반화 프로그래밍 (Generic Programming)"
date: 2026-04-29
categories: [C#]
tags: [제네릭, 문법, C#]
nav_exclude: true
---

# 🎯 [11장] 일반화 프로그래밍 (Generic Programming)

> 데이터 타입을 매개변수화하여 코드의 재사용성을 극대화하고, 박싱/언박싱 없는 고성능 타입 안정성을 확보하는 제네릭 프로그래밍을 정리합니다.

## 📖 1. 개요
- 데이터 타입을 확정하지 않고 **타입 매개변수(T)**를 사용하여 클래스나 메서드를 정의하는 방식입니다.
- 실제 사용할 때 구체적인 타입을 지정함으로써 하나의 로직으로 다양한 타입을 처리합니다.

## 2. 장점
- **재사용성**: 동일한 로직을 타입별로 중복 구현할 필요가 없습니다.
- **타입 안정성**: 컴파일 시점에 엄격하게 타입을 체크하여 런타임 에러를 방지합니다.
- **성능**: `object` 기반의 범용 프로그래밍에서 발생하는 **박싱/언박싱** 부하가 전혀 없어 매우 빠릅니다.

## 3. 사용 예시

```csharp
// 일반화 메서드: 어떤 타입이든 값 교환 가능
public void Swap<T>(ref T a, ref T b)
{
    T temp = a;
    a = b;
    b = temp;
}

// 일반화 클래스: 특정 타입의 데이터를 저장하는 커스텀 리스트
public class MyList<T>
{
    private T[] _array;
    // ...
}
```

> [!TIP]
> 제네릭을 사용하면 코드 가독성이 좋아지고 IntelliSense의 지원을 완벽하게 받을 수 있어 개발 생산성이 크게 향상됩니다.

## 4. 형식 매개변수 제약 (where)
`where` 키워드를 사용하여 타입 매개변수 `T`에 들어올 수 있는 형식을 제한할 수 있습니다.
- `where T : struct`: 값 형식(Value Type)으로 제한.
- `where T : class`: 참조 형식(Reference Type)으로 제한.
- `where T : new()`: 반드시 기본 생성자가 있어야 함.
- `where T : InterfaceName`: 특정 인터페이스를 구현해야 함.

---
> **참고 자료**
> - [제네릭 소개 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/generics/)

[🔙 뒤로 가기](../index.md)
