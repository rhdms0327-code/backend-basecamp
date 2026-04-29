---
title: "[2장] Hello World 코드 분석"
parent: C#
grand_parent: .NET
nav_order: 39
---

# [2장] Hello World 코드 분석

가장 기본적인 C# 프로그램의 구조를 살펴봅니다.

## 1. using System;
- `System`이라는 **네임스페이스** 안에 있는 클래스들을 사용하겠다고 선언하는 것입니다.
- 예: `System.Console` 클래스를 사용하기 위해 필요합니다.

## 2. namespace Hello { }
- 관련 있는 클래스들을 하나의 이름으로 묶는 단위입니다.
- 프로젝트 내에서 이름이 겹치는 것을 방지(이름 충돌 방지)해 줍니다.

## 3. class Program { }
- C#의 모든 코드는 반드시 **클래스** 내부에 존재해야 합니다.
- `Program`은 이 클래스의 이름입니다.

## 4. static void Main(string[] args)
- 프로그램의 **시작 지점(Entry Point)**입니다.
- 프로그램이 실행되면 운영체제는 가장 먼저 이 `Main` 메서드를 찾아 호출합니다.

## 5. Console.WriteLine("Hello World!");
- 표준 출력(콘솔 창)에 문자열을 출력하고 줄을 바꾸는 명령입니다.

---
> **참고 자료**
> - [C# 프로그램 구조 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/inside-a-program/hello-world-your-first-program)
