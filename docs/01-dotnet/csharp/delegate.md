---
title: "[13장] 대리자 (Delegate)"
parent: C#
grand_parent: .NET
nav_order: 13
---

# [13장] 대리자 (Delegate)

## 1. 개요
- 메서드를 참조하는 **형식(Type)**입니다.
- 메서드 자체를 변수에 담거나 다른 메서드의 인자로 전달할 때 사용합니다.
- C++의 함수 포인터와 유사하지만, 객체 지향적이고 타입 안정성이 보장됩니다.

## 2. 주요 용도
- **콜백(Callback)**: 특정 작업이 끝났을 때 호출될 메서드를 지정.
- **이벤트 처리**: 사용자 입력이나 상태 변화 알림.
- **함수형 스타일**: 메서드를 데이터처럼 취급하여 유연한 로직 구현.

## 3. 선언 및 사용
```csharp
// 1. 대리자 선언 (시그니처 정의)
public delegate void MyDelegate(string message);

// 2. 대상 메서드 정의
void Print(string msg) => Console.WriteLine(msg);

// 3. 대리자 인스턴스 생성 및 연결
MyDelegate del = new MyDelegate(Print);
// 또는 간결하게
MyDelegate del2 = Print;

// 4. 호출
del("Hello Delegate!");
```

## 4. 대리자 체인 (Multicast Delegate)
- `+` 연산자를 사용하여 하나의 대리자에 여러 메서드를 연결할 수 있습니다.
- 대리자를 호출하면 연결된 모든 메서드가 순차적으로 실행됩니다.

---
> **참고 자료**
> - [대리자 사용 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/delegates/)
