---
layout: post
title: "🛠️ C# 코딩 규칙 정리"
date: 2025-12-05
categories: [Style Guide]
tags: [C#]
nav_exclude: true
---

> Microsoft 가이드라인을 기반으로 한 C#의 중괄호(Brace) 스타일과 주요 코딩 규칙을 정리합니다.

## 1. 중괄호 스타일 (Brace Styles)

C#에서는 가독성을 위해 중괄호 배치 방식에 대한 명확한 권장 사항이 있습니다.

- **Allman Style (BSD)**: Microsoft가 공식적으로 권장하는 스타일입니다. 모든 중괄호를 새로운 줄에 배치하여 코드의 계층 구조를 명확하게 시각화합니다.
- **K&R Style**: 제어문과 같은 줄에 중괄호를 배치하는 방식입니다. Java나 JavaScript 개발자들에게 익숙한 방식이지만, C# 표준 가이드라인에서는 Allman 스타일을 우선시합니다.

### 코드 예시 (Allman Style)

```csharp
if (condition)
{
    // 중괄호를 다음 줄에 배치하여 가독성을 높임
    DoSomething();
}
```

## 2. 권장 사항

가급적 Microsoft의 표준 가이드라인인 **Allman Style**을 준수하여 프로젝트의 일관성을 유지하는 것이 좋습니다.

---

## 🔗 참고 자료
- [원문: C# 코딩 규칙 정리](https://blog-34.tistory.com/21)

---

[🔙 뒤로 가기](../index.md)
