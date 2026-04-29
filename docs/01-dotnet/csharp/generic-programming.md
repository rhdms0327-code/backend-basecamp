---
title: "[11장] 일반화 프로그래밍 (Generic Programming)"
parent: C#
grand_parent: .NET
nav_exclude: true
nav_order: 15
---

# [11장] 일반화 프로그래밍 (Generic Programming)

## 1. 개요
- 데이터 타입을 확정하지 않고 **타입 매개변수(T)**를 사용하여 클래스나 메서드를 정의하는 방식입니다.
- 실제 사용할 때 구체적인 타입을 지정하여 코드를 재사용합니다.

## 2. 장점
- **재사용성**: 하나의 코드로 다양한 타입을 처리할 수 있습니다.
- **타입 안정성**: 컴파일 시점에 타입을 체크하므로 잘못된 타입 사용을 방지합니다.
- **성능 향상**: `object` 타입을 사용할 때 발생하는 **박싱/언박싱(Boxing/Unboxing)** 오버헤드가 없습니다.

## 3. 사용 예시
```csharp
// 일반화 메서드
public void Swap<T>(ref T a, ref T b)
{
    T temp = a;
    a = b;
    b = temp;
}

// 일반화 클래스
public class MyList<T>
{
    private T[] _array;
    // ...
}
```

## 4. 형식 매개변수 제약 (where)
`where` 키워드를 사용하여 `T`에 들어올 수 있는 타입을 제한할 수 있습니다.
- `where T : struct`: 값 형식만 가능.
- `where T : class`: 참조 형식만 가능.
- `where T : new()`: 매개변수 없는 생성자가 있어야 함.
- `where T : BaseClass`: 특정 클래스를 상속받아야 함.

---
> **참고 자료**
> - [제네릭 소개 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/generics/)
