---
layout: post
title: "🎯 [13장] 대리자 (Delegate)"
date: 2026-04-29
categories: [C#]
tags: [대리자]
nav_exclude: true
---

# 🎯 [13장] 대리자 (Delegate)

> 메서드를 참조하고 데이터처럼 다룰 수 있게 해주는 대리자의 개념과 선언 방법, 그리고 여러 메서드를 동시에 호출하는 대리자 체인을 정리합니다.

## 📖 1. 개요
- 메서드를 참조하는 **형식(Type)**입니다.
- 메서드 자체를 변수에 담거나 다른 메서드의 인자로 전달할 때 사용합니다.
- C++의 함수 포인터와 유사하지만, 객체 지향적이고 타입 안정성이 보장됩니다.

## 2. 주요 용도
- **콜백(Callback)**: 특정 작업이 끝났을 때 호출될 메서드를 지정할 때 사용합니다.
- **이벤트 처리**: 사용자 입력이나 시스템의 상태 변화를 알리는 기반 기술입니다.
- **함수형 스타일**: 메서드를 데이터처럼 취급하여 보다 유연한 소프트웨어 아키텍처를 구현할 수 있습니다.

## 3. 선언 및 사용

```csharp
// 1. 대리자 선언 (반환 타입과 매개변수 시그니처 정의)
public delegate void MyDelegate(string message);

// 2. 대상 메서드 정의
void Print(string msg) => Console.WriteLine(msg);

// 3. 대리자 인스턴스 생성 및 메서드 연결
MyDelegate del = Print;

// 4. 대리자를 통한 메서드 호출
del("Hello Delegate!");
```

> [!TIP]
> 직접 `delegate`를 선언하는 대신 .NET에서 기본 제공하는 `Action`(반환값 없음)이나 `Func`(반환값 있음) 제네릭 대리자를 사용하면 코드를 더 간결하게 유지할 수 있습니다.

## 4. 대리자 체인 (Multicast Delegate)
- `+` 및 `+=` 연산자를 사용하여 하나의 대리자에 여러 메서드를 연결할 수 있습니다.
- 대리자를 호출하면 연결된 모든 메서드가 등록된 순서대로 실행됩니다.

---
> **참고 자료**
> - [대리자 사용 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/delegates/)

[🔙 뒤로 가기](../index.md)
