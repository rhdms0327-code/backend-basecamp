---
layout: post
title: "🎯 명명 규칙 (Naming Convention)"
date: 2025-12-16
categories: [Style Guide]
tags: [C#]
nav_exclude: true
---

> C# 프로젝트에서 일관성 있는 코드 작성을 위한 제네릭 타입 파라미터 및 열거형(Enum) 명명 규칙을 정리합니다.

## 1. 제네릭 타입 파라미터 (Generic Type Parameters)

제네릭 타입을 정의할 때 사용하는 파라미터 이름은 역할에 따라 다음과 같이 구분합니다.

- **단일 타입 파라미터**: 일반적으로 `T`를 사용합니다. (예: `List<T>`)
- **명확한 역할이 있는 경우**: `T` 접두사 뒤에 구체적인 이름을 붙입니다. (예: `TKey`, `TValue`, `TSession`)

## 2. 열거형 명명 규칙 (Enum Naming)

열거형의 이름은 해당 열거형이 비트 플래그를 사용하는지에 따라 달라집니다.

- **일반 열거형 (Non-flags)**: 단수형 명사를 사용합니다.
  - 예: `OrderStatus` (Pending, Paid, Shipped)
- **비트 플래그 열거형 ([Flags])**: 복수형 명사를 사용합니다.
  - 예: `FilePermissions` (Read, Write, Execute)

### 코드 예시

```csharp
// 일반 열거형
enum OrderStatus 
{ 
    Pending, 
    Paid, 
    Shipped 
}

// 비트 플래그 열거형
[Flags]
enum FilePermissions 
{ 
    Read = 1, 
    Write = 2, 
    Execute = 4 
}
```

---

## 🔗 참고 자료
- [원문: 명명 규칙 (Naming Convention)](https://blog-34.tistory.com/33)

---

[🔙 뒤로 가기](../index.md)
