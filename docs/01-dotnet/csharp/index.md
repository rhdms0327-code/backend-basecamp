---
title: C#
parent: .NET
has_children: true
nav_order: 1
---

# 🔷 C# 지식 저장소

C#의 기초 문법부터 객체 지향 프로그래밍, 그리고 CLR 내부 동작 원리까지 체계적으로 학습한 내용을 정리합니다.

<br>

## 🌱 1. 기초 문법 및 환경 설정 (Core Syntax & Environment)

| 📑 포스팅 제목 (Link) | 📝 핵심 요약 (Summary) | 🏷️ Keywords |
| :--- | :--- | :--- |
| **[[.NET 분석] .NET이란 무엇인가?](./what-is-dotnet.md)** | .NET 플랫폼의 정의와 주요 구성 요소 개요 | `#Platform` `#Architecture` |
| **[.NET의 역사와 주요 특징](./dotnet-history-features.md)** | .NET Framework부터 .NET 9까지의 발전 과정 | `#History` `#Evolution` |
| **[.NET 필수 용어 정리](./dotnet-terminology.md)** | Managed Code, CLR, BCL 등 핵심 용어 해설 | `#Glossary` `#Runtime` |
| **[C# 개발 환경 구성 및 프로젝트 구조](./csharp-environment-setup.md)** | 개발 환경 세팅 및 C# 솔루션/프로젝트 구조 이해 | `#Setup` `#ProjectStructure` |
| **[비주얼 스튜디오 필수 단축키 정리](./visual-studio-shortcuts.md)** | 생산성을 높여주는 IDE 단축키 및 팁 | `#IDE` `#Productivity` |
| **[Hello World 코드로 보는 C# 프로그램 구조](./hello-world-analysis.md)** | 네임스페이스, 클래스, Main 메서드 분석 | `#BasicCode` `#Structure` |
| **[정수 계열 데이터 형식 및 오버플로 이해](./integer-types.md)** | int, long 등 정수 타입의 범위와 오버플로 처리 | `#Integer` `#Overflow` |
| **[부동 소수점 형식 비교](./floating-point.md)** | float, double, decimal의 정밀도 차이와 용도 | `#Precision` `#Decimal` |
| **[문자(Char) 및 논리(Bool) 데이터 형식](./char-bool.md)** | 유니코드 문자와 참/거짓 값을 다루는 기본 형식 | `#PrimitiveTypes` |
| **[Object 형식과 박싱/언박싱](./object-boxing-unboxing.md)** | 모든 형식의 조상 Object와 성능에 미치는 영향 | `#Boxing` `#HeapStack` |
| **[상수, 열거형(Enum), Nullable 형식](./constants-enum-nullable.md)** | 변하지 않는 값과 선택적 값을 다루는 방법 | `#Enum` `#Nullable` |
| **[문자열(String) 형식과 주요 메서드 활용](./string.md)** | 불변(Immutable) 문자열의 특징과 조작법 | `#String` `#Immutability` |
| **[var 키워드와 암시적 형식 지역 변수](./implicitly-typed-local-variables.md)** | 타입 추론을 통한 코드 간결화와 주의사항 | `#TypeInference` `#var` |
| **[연산자, 식(Expression), 문(Statement) 개요](./operators-expressions.md)** | C#의 다양한 연산자와 구문 실행 단위 | `#Operators` `#Syntax` |
| **[C# 버전별 switch 패턴 매칭 진화 과정](./switch-patterns.md)** | 최신 C#에서 강화된 패턴 매칭과 switch 식 | `#PatternMatching` `#C#Versions` |

<br>

## 🚀 2. 객체지향 프로그래밍 및 데이터 구조 (OOP & Data Structures)

| 📑 포스팅 제목 (Link) | 📝 핵심 요약 (Summary) | 🏷️ Keywords |
| :--- | :--- | :--- |
| **[메서드 매개변수 전달 방식 (ref, out, in)](./method-params.md)** | 참조에 의한 전달과 출력 전용 매개변수 활용 | `#Ref` `#Out` `#Parameters` |
| **[클래스의 정의와 멤버 개요](./class-overview.md)** | 필드, 메서드, 생성자 등 클래스 구성 요소 | `#Class` `#Constructor` |
| **[상속, 다형성 및 접근 제한자](./inheritance-polymorphism.md)** | 코드 재사용과 객체지향의 핵심 원리 | `#Inheritance` `#Polymorphism` |
| **[구조체(Struct)와 튜플(Tuple) 데이터 구조](./struct-tuple.md)** | 값 형식 기반의 데이터 묶음과 효율적인 활용 | `#Struct` `#Tuple` |
| **[인터페이스(Interface)의 역할과 기본 구현](./interface.md)** | 객체 간의 계약 정의와 느슨한 결합 | `#Interface` `#Contract` |
| **[프로퍼티(Property)와 자동 구현 프로퍼티](./property.md)** | 데이터 캡슐화와 접근 제어를 위한 프로퍼티 | `#Encapsulation` `#Property` |
| **[C# 배열 선언, 초기화 및 다차원 배열](./array.md)** | 동일 타입의 연속된 데이터 관리 기법 | `#Array` `#MultiDimensional` |
| **[주요 컬렉션 클래스 비교](./collections.md)** | List, Queue, Stack, Hashtable의 용도별 선택 | `#Collections` `#List` `#DataStructure` |

<br>

## ⚡ 3. 고급 문법 및 비동기 프로그래밍 (Advanced & Async)

| 📑 포스팅 제목 (Link) | 📝 핵심 요약 (Summary) | 🏷️ Keywords |
| :--- | :--- | :--- |
| **[일반화 프로그래밍(Generic)과 형식 제약](./generic-programming.md)** | 타입에 구애받지 않는 코드 작성과 제약 조건 | `#Generic` `#Constraints` |
| **[예외 처리(Exception Handling)](./exception-handling.md)** | try-catch-finally를 이용한 안정적인 에러 대응 | `#Exception` `#Reliability` |
| **[대리자(Delegate) 개념 및 멀티캐스트](./delegate.md)** | 메서드를 참조하는 변수와 이벤트의 기초 | `#Delegate` `#Callback` |
| **[람다식(Lambda Expression)과 제네릭 대리자](./lambda-expression.md)** | 익명 함수와 Func, Action 활용법 | `#Lambda` `#Functional` |
| **[LINQ 기본 사용법](./linq.md)** | 데이터를 질의하는 강력한 쿼리 구문 | `#LINQ` `#Query` |
| **[리플렉션(Reflection)을 통한 타입 정보 탐색](./reflection.md)** | 실행 중에 객체 정보를 분석하고 조작하는 기술 | `#Reflection` `#Metadata` |
| **[애트리뷰트(Attribute)를 이용한 메타데이터](./attribute.md)** | 코드 요소에 부가 정보를 부여하는 기능 | `#Attribute` `#Annotations` |
| **[동기/비동기 개념 및 async/await](./async-sync-blocking-nonblocking.md)** | 비차단(Non-blocking) 프로그래밍의 핵심 원리 | `#Async` `#Await` `#NonBlocking` |

<br>

## 🧠 4. CLR 심층 분석 및 시스템 (CLR & System)

| 📑 포스팅 제목 (Link) | 📝 핵심 요약 (Summary) | 🏷️ Keywords |
| :--- | :--- | :--- |
| **[[CLR 심층 분석] CLR이 사용하는 메모리 구조](./clr-memory-structure.md)** | Stack, Managed Heap, Loader Heap 분석 | `#Memory` `#StackHeap` |
| **[[CLR 심층 분석] 가비지 컬렉션(GC) 원리](./garbage-collection.md)** | 세대별 관리 전략과 LOH/SOH 구분 | `#GC` `#GarbageCollection` |
| **[[CLR 심층 분석] CLR의 내부 동작 및 역할](./clr-deep-dive.md)** | 타입 로딩, JIT 컴파일러, 예외 처리 메커니즘 | `#CLR` `#Runtime` `#JIT` |
| **[데이터 스트림(Stream)과 파일 I/O](./stream.md)** | 바이트 기반의 순차적 데이터 입출력 처리 | `#Stream` `#FileIO` |
| **[프로세스와 스레드(Thread)의 기본 개념](./thread-basics.md)** | 다중 작업 처리를 위한 실행 단위의 이해 | `#Process` `#Thread` `#Concurrency` |
| **[스레드 동기화(lock, Monitor) 기법](./thread-synchronization.md)** | 공유 자원 접근 제어와 레이스 컨디션 방지 | `#Synchronization` `#Lock` `#ThreadSafety` |

---
> **참고 자료**
> - [C# 가이드 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/)
