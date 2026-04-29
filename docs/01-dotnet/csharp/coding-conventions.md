---
title: "C# 코딩 규칙 (Coding Conventions)"
parent: C#
grand_parent: .NET
nav_exclude: true
nav_order: 26
---

# C# 코딩 규칙 (Coding Conventions)

일관된 코딩 규칙은 팀 협업과 유지보수의 핵심입니다. Microsoft에서 권장하는 기본 스타일을 준수하는 것이 좋습니다.

## 1. 중괄호 스타일 (Brace Styles)
- **Allman 스타일 (권장)**: 여는 중괄호와 닫는 중괄호를 새로운 줄에 배치합니다.
  ```csharp
  if (condition)
  {
      // Do something
  }
  ```
- **K&R 스타일**: 여는 중괄호를 문장 끝에 배치합니다. (C#에서는 주로 Allman 스타일을 더 선호합니다.)

## 2. 명명 규칙 (Naming Conventions)
- **PascalCase**: 클래스, 메서드, 프로퍼티, public 필드.
- **camelCase**: 지역 변수, 메서드 매개변수.
- **_camelCase**: 전역 private 필드.

## 3. 코드 레이아웃
- 한 줄에 하나의 문장만 작성합니다.
- 들여쓰기는 탭이 아닌 **공백 4칸**을 사용합니다.
- 사용하지 않는 `using` 문은 제거합니다.

## 4. 언어 키워드 활용
- 시스템 타입 대신 언어 키워드를 사용합니다 (예: `Int32` 대신 `int`, `String` 대신 `string`).
- 타입이 명확할 때는 `var`를 사용하여 코드를 간결하게 유지합니다.

---
> **참고 자료**
> - [C# 코딩 규칙 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/fundamentals/coding-style/coding-conventions)
