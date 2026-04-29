---
layout: post
title: "🎯 [12장] 예외 처리 (Exception Handling)"
date: 2026-04-29
categories: [C#]
tags: [예외처리, 문법, C#]
nav_exclude: true
---

# 🎯 [12장] 예외 처리 (Exception Handling)

> 프로그램 실행 중 발생하는 예기치 못한 오류를 체계적으로 관리하고, 시스템의 안정성을 확보하기 위한 try-catch-finally 메커니즘과 예외 처리 전략을 정리합니다.

## 📖 1. 개요
- 프로그램 실행 중 발생하는 예기치 못한 오류(Exception)를 감지하고 수습하는 메커니즘입니다.
- 비정상 종료를 방지하고 프로그램의 신뢰성을 높이는 데 필수적입니다.

## 🧱 2. 기본 구조: try-catch-finally
- **try**: 예외가 발생할 가능성이 있는 코드를 작성합니다.
- **catch**: 발생한 예외를 포착하여 처리합니다. 특정 예외 타입을 명시하여 세분화된 처리가 가능합니다.
- **finally**: 예외 발생 여부와 상관없이 **항상 실행**되어야 하는 리소스 해제 코드 등을 작성합니다.

> [!TIP]
> `using` 문을 사용하면 `IDisposable` 인터페이스를 구현한 객체에 대해 `finally` 블록에서 `Dispose()`를 명시적으로 호출하는 과정을 자동화할 수 있어 코드가 훨씬 간결해집니다.

## 3. 예외 던지기 (throw)
- 특정 조건에서 의도적으로 예외를 발생시켜 상위 호출자에게 상황을 알립니다.
- 예: `if (index < 0) throw new IndexOutOfRangeException("인덱스는 0 이상이어야 합니다.");`

## 4. System.Exception 클래스
모든 .NET 예외의 최상위 클래스입니다.
- **Message**: 예외 발생 원인에 대한 상세 설명을 담고 있습니다.
- **StackTrace**: 예외가 발생하기까지의 메서드 호출 이력을 담고 있어 디버깅 시 결정적인 증거가 됩니다.

---
> **참고 자료**
> - [예외 처리 기본 사항 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/fundamentals/exceptions/exception-handling)

[🔙 뒤로 가기](./index.md)
