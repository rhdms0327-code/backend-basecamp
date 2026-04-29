---
layout: post
title: "🎯 [9장] 프로퍼티 (Property)"
date: 2026-04-29
categories: [C#]
tags: [C#]
---

> - 필드에 대한 접근자(`get`, `set`)를 제공하여 데이터를 캡슐화하고 관리하는 C#의 기능입니다.

- 외부에서는 변수처럼 보이지만, 내부적으로는 메서드로 동작합니다.

## 2. 자동 구현 프로퍼티 (Auto-Implemented Property)
별도의 백킹 필드(private 변수)를 선언하지 않고 컴파일러가 자동으로 생성하게 하는 방식입니다.
```csharp
public class User
{
    public string Name { get; set; } // 컴파일러가 _name 필드를 자동으로 생성
}
```

## 3. 프로퍼티의 장점
- **캡슐화**: 유효성 검사 로직을 `set`에 넣을 수 있습니다.
- **가독성**: `getName()`, `setName()` 대신 `user.Name`으로 직관적인 접근이 가능합니다.
- **인터페이스 호환**: 인터페이스에 프로퍼티를 정의할 수 있습니다.

## 4. 읽기 전용 프로퍼티
- `set` 접근자를 생략하거나 `private set`으로 설정하여 읽기 전용으로 만들 수 있습니다.
- **C# 9.0+**: `init` 키워드를 사용하여 객체 초기화 시점에만 값을 설정하도록 제한할 수 있습니다.

---
> **참고 자료**
> - [프로퍼티 사용 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/classes-and-structs/properties)

---
[🔙 뒤로 가기](./index.md)
