---
layout: post
title: "🎯 C# 코딩 규칙 (Coding Conventions)"
date: 2026-04-29
categories: [C#]
tags: [코딩규칙, 클린코드, C#]
---

# 🎯 C# 코딩 규칙 (Coding Conventions)

> 팀 협업과 유지보수의 효율을 극대화하기 위해 Microsoft에서 권장하는 C#의 공식 코딩 스타일과 명명 규칙을 정리합니다.

## 1. 중괄호 스타일 (Brace Styles)
- **Allman 스타일 (권장)**: 여는 중괄호와 닫는 중괄호를 새로운 줄에 배치합니다.
  ```csharp
  if (condition)
  {
      // 새로운 줄에 중괄호를 배치하여 가독성을 높입니다.
      DoSomething();
  }
  ```

## 2. 명명 규칙 (Naming Conventions)
- **PascalCase**: 클래스, 메서드, 프로퍼티, public 필드에 사용합니다.
- **camelCase**: 지역 변수, 메서드 매개변수에 사용합니다.
- **_camelCase**: 전역 private 필드에 접두사 `_`를 붙여 구분합니다.

## 3. 코드 레이아웃
- 한 줄에 하나의 문장만 작성합니다.
- 들여쓰기는 탭이 아닌 **공백 4칸**을 권장합니다.
- 사용하지 않는 `using` 문은 제거하여 컴파일 성능과 가독성을 확보합니다.

> [!TIP]
> 비주얼 스튜디오나 VS Code의 `EditorConfig` 파일을 활용하면 팀원 모두가 동일한 코딩 스타일을 자동으로 유지할 수 있습니다.

## 4. 언어 키워드 활용
- 시스템 타입 대신 언어 키워드를 사용합니다 (예: `Int32` 대신 `int`, `String` 대신 `string`).
- 타입이 명확할 때는 `var`를 사용하여 코드를 간결하게 유지합니다.

---
> **참고 자료**
> - [C# 코딩 규칙 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/fundamentals/coding-style/coding-conventions)

[🔙 뒤로 가기](./index.md)
