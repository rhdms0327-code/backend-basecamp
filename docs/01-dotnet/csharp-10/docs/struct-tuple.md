---
layout: post
title: "🎯 [7장] 구조체 및 튜플 (Struct & Tuple)"
date: 2026-04-29
categories: [C#]
tags: []
nav_exclude: true
---

> - 데이터를 캡슐화할 수 있는 **값 형식(Value Type)**입니다.

- **특징**:
  - **스택(Stack)**에 저장되어 GC의 부하를 줄입니다.
  - 상속이 불가능합니다.
  - 작은 크기의 불변 데이터를 다룰 때 성능상 유리합니다.

## 🧱 2. 구조체 vs 클래스

| 특징 | 구조체 (Struct) | 클래스 (Class) |
| :--- | :--- | :--- |
| **타입** | 값 형식 (Value Type) | 참조 형식 (Reference Type) |
| **저장 위치** | 스택 (Stack) | 힙 (Heap) |
| **복사 방식** | 값 전체 복사 (Deep Copy) | 참조 주소 복사 (Shallow Copy) |

## 3. 튜플 (Tuple)
여러 개의 데이터를 가볍게 묶어서 전달할 때 사용하는 구조입니다.
- **ValueTuple**: C# 7.0에서 도입된 값 형식 튜플로, 이름 있는 요소를 가질 수 있습니다.

```csharp
// 튜플 반환 예시
(int count, string name) GetInfo() 
{
    return (10, "Terry");
}

// 사용
var info = GetInfo();
Console.WriteLine(info.name);
```

---
> **참고 자료**
> - [구조체 형식 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/builtin-types/struct)

---
[🔙 뒤로 가기](../index.md)
