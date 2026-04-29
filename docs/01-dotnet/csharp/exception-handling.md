---
title: "[12장] 예외 처리 (Exception Handling)"
parent: C#
grand_parent: .NET
nav_order: 14
---

# [12장] 예외 처리 (Exception Handling)

## 1. 개요
- 프로그램 실행 중 발생하는 예기치 못한 오류(Exception)를 감지하고 수습하는 메커니즘입니다.
- 비정상 종료를 방지하고 프로그램의 안정성을 유지하는 데 필수적입니다.

## 2. 기본 구조: try-catch-finally
- **try**: 예외가 발생할 가능성이 있는 코드를 감쌉니다.
- **catch**: 발생한 예외를 잡아 처리합니다. (로깅, 사용자 알림 등)
- **finally**: 예외 발생 여부와 상관없이 **무조건 실행**되어야 하는 정리 코드를 넣습니다. (파일 닫기, DB 연결 해제 등)

## 3. 예외 던지기 (throw)
- 프로그래머가 명시적으로 예외를 발생시킬 때 사용합니다.
- 예: `if (value < 0) throw new ArgumentException("음수는 허용되지 않습니다.");`

## 4. System.Exception 클래스
모든 예외의 조상 클래스입니다.
- **Message**: 예외의 원인을 설명하는 문자열.
- **StackTrace**: 예외가 발생한 지점까지의 호출 경로 정보.

---
> **참고 자료**
> - [예외 처리 기본 사항 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/fundamentals/exceptions/exception-handling)
