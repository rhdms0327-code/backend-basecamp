---
title: "[16장] 리플렉션 (Reflection)"
parent: C#
grand_parent: .NET
nav_exclude: true
nav_order: 10
---

# [16장] 리플렉션 (Reflection)

## 1. 개요
- 프로그램이 실행 중(런타임)에 **자신의 구조를 스스로 조사하고 조작**하는 메커니즘입니다.
- 어셈블리 내의 타입 정보(클래스, 인터페이스 등)를 알아내고 동적으로 조작할 수 있습니다.

## 2. 핵심 클래스: System.Type
모든 타입의 정보를 담고 있는 핵심 객체입니다.
- **GetType()**: 인스턴스로부터 타입 정보 획득.
- **typeof()**: 타입 이름으로부터 타입 정보 획득.

## 3. 주요 기능
- **멤버 조사**: 타입이 가진 메서드, 속성, 필드, 생성자 목록 확인.
- **동적 생성**: `Activator.CreateInstance()`를 통해 런타임에 객체 생성.
- **동적 호출**: `MethodInfo.Invoke()`를 통해 메서드 실행.
- **애트리뷰트 읽기**: 코드에 부여된 애트리뷰트 정보를 확인하여 로직 처리.

## 4. 활용 사례
- **플러그인 시스템**: 실행 중에 외부 DLL을 로드하여 기능을 확장.
- **직렬화 라이브러리**: 객체의 필드 정보를 읽어 JSON 등으로 변환.
- **DI 컨테이너**: 의존성을 주입할 타입을 찾고 생성.

---
> **참고 자료**
> - [리플렉션 개요 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/framework/reflection-and-codedom/reflection)
