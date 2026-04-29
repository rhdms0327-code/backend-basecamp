---
layout: post
title: "🎯 [2장] Hello World 코드 분석"
date: 2026-04-29
categories: [C#]
tags: []
nav_exclude: true
---

# 🎯 [2장] Hello World 코드 분석

> C# 프로그램의 가장 기본이 되는 Hello World 예제 코드를 한 줄씩 분석하며 네임스페이스, 클래스, 그리고 프로그램의 시작점인 Main 메서드의 역할을 이해합니다.

## 1. using System;
- `System`이라는 **네임스페이스** 안에 정의된 클래스들을 코드에서 자유롭게 사용하겠다고 선언하는 문장입니다.
- 예: 콘솔 출력을 담당하는 `System.Console` 클래스를 간단히 `Console`로 호출하기 위해 필요합니다.

## 2. namespace Hello { }
- 성격이 비슷한 클래스들을 하나의 논리적인 그룹으로 묶는 단위입니다.
- 대규모 프로젝트에서 클래스 이름이 서로 겹치는 '이름 충돌' 문제를 방지해 줍니다.

## 3. class Program { }
- C#은 순수한 객체 지향 언어로, 모든 코드는 반드시 **클래스**라는 설계도 내부에 존재해야 합니다.
- `Program`은 관습적으로 진입점 메서드를 담고 있는 클래스의 이름으로 사용됩니다.

## 4. static void Main(string[] args)
- 프로그램의 **진입점(Entry Point)**입니다.
- 프로그램이 실행되면 런타임은 가장 먼저 이 `Main` 메서드를 찾아 실행을 시작합니다.

> [!TIP]
> 최신 C# 버전(C# 9.0 이상)에서는 '최상위 문(Top-level statements)' 기능을 통해 네임스페이스와 클래스 선언 없이 바로 코드를 작성하여 동일한 동작을 수행할 수 있습니다.

## 5. Console.WriteLine("Hello World!");
- 표준 출력 장치(콘솔)에 문자열을 출력하고 자동으로 줄 바꿈을 수행하는 메서드 호출입니다.

---
> **참고 자료**
> - [C# 프로그램 구조 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/inside-a-program/hello-world-your-first-program)

[🔙 뒤로 가기](../index.md)
