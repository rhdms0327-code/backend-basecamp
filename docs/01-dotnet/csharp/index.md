---
layout: default
title: C# 공부
parent: .NET
has_children: true
nav_order: 1
---

# 📘 C# Deep Dive: Core & Advanced
> **참고 서적:** [이것이 C#이다 (yes24 링크)](https://www.yes24.com/product/goods/118685906)
> - **대상 버전:** C# 10.0 (.NET 6)
> - **학습 목표:** C# 최신 문법과 CLR의 심층적인 내부 동작 원리를 체계적으로 학습합니다.

---

## 📂 주제별 학습 리스트 (Accordion)
*클릭하면 세부 게시글 리스트가 나타납니다.*

<details open>
  <summary><b>1. C# 기초 및 언어의 핵심 (Syntax & Types)</b></summary>
  <div style="padding-left: 20px; margin-top: 10px;">
    <ul>
      <li><a href="./what-is-dotnet.md">.NET이란 무엇인가?</a> <code>#Platform</code> <code>#Architecture</code></li>
      <li><a href="./dotnet-history-features.md">.NET의 역사와 주요 특징</a> <code>#History</code></li>
      <li><a href="./dotnet-terminology.md">.NET 필수 용어 정리</a> <code>#Glossary</code></li>
      <li><a href="./dotnet-framework-installation.md">.NET Framework 설치 가이드</a></li>
      <li><a href="./csharp-environment-setup.md">C# 개발 환경 구성 및 프로젝트 구조</a> <code>#Setup</code></li>
      <li><a href="./visual-studio-shortcuts.md">비주얼 스튜디오 필수 단축키</a> <code>#Productivity</code></li>
      <li><a href="./hello-world-creation.md">Hello World 콘솔 앱 프로젝트 생성</a></li>
      <li><a href="./hello-world-analysis.md">Hello World 소스 코드 구조 분석</a></li>
      <li><a href="./csharp-version-management.md">C# 언어 버전 관리 방법</a></li>
      <li><a href="./coding-conventions.md">C# 공식 코딩 규칙 정리</a> <code>#CleanCode</code></li>
      <li><a href="./integer-types.md">[3장] 정수 계열 (Integer Type)</a> <code>#Integer</code></li>
      <li><a href="./floating-point.md">[3장] 부동 소수점 형식 (Floating Point)</a> <code>#Precision</code></li>
      <li><a href="./char-bool.md">[3장] 문자 및 논리 형식 (Char & Bool)</a></li>
      <li><a href="./object-boxing-unboxing.md">[3장] Object 형식과 박싱/언박싱</a> <code>#Boxing</code></li>
      <li><a href="./constants-enum-nullable.md">[3장] 상수, 열거형(Enum), Nullable</a> <code>#Nullable</code></li>
      <li><a href="./string.md">[3장] 문자열 (String)</a> <code>#Immutability</code></li>
      <li><a href="./implicitly-typed-local-variables.md">[3장] 암시적 형식 지역 변수 (var)</a></li>
      <li><a href="./operators-expressions.md">[4장] 연산자, 식, 문 (Syntax)</a></li>
      <li><a href="./switch-patterns.md">[5장] switch 패턴 매칭</a> <code>#PatternMatching</code></li>
      <li><a href="./method-params.md">[6장] 메서드 매개변수 전달 (ref, out)</a></li>
      <li><a href="./property.md">[9장] 프로퍼티 (Property)</a> <code>#Encapsulation</code></li>
      <li><a href="./array.md">[10장] 배열 (Array)</a></li>
      <li><a href="./collections.md">[11장] 주요 컬렉션 클래스 비교</a> <code>#Collections</code></li>
    </ul>
  </div>
</details>

<details>
  <summary><b>2. CLR 심층 분석 및 메모리 관리 (Memory & CLR)</b></summary>
  <div style="padding-left: 20px; margin-top: 10px;">
    <ul>
      <li><a href="./clr-memory-structure.md"><b>[CLR 심층 분석]</b> CLR이 사용하는 메모리 구조</a> <code>#Stack</code> <code>#Heap</code></li>
      <li><a href="./garbage-collection.md"><b>[CLR 심층 분석]</b> 가비지 컬렉션(GC) 원리</a> <code>#GC</code> <code>#LOH</code></li>
      <li><a href="./clr-deep-dive.md"><b>[CLR 심층 분석]</b> CLR의 내부 동작 및 역할</a> <code>#Runtime</code></li>
      <li><a href="./programming-basic-concepts.md">프로그래밍 기본 개념 정리</a></li>
      <li><a href="./programming-history.md">프로그래밍 언어 역사</a></li>
    </ul>
  </div>
</details>

<details>
  <summary><b>3. 비동기 프로그래밍 (Async & Concurrency)</b></summary>
  <div style="padding-left: 20px; margin-top: 10px;">
    <ul>
      <li><a href="./async-sync-blocking-nonblocking.md">동기/비동기 개념 및 async/await</a> <code>#Async</code> <code>#Await</code></li>
      <li><a href="./thread-basics.md">프로세스와 스레드(Thread)의 기본 개념</a> <code>#Concurrency</code></li>
      <li><a href="./thread-synchronization.md">스레드 동기화(lock, Monitor) 기법</a> <code>#Lock</code></li>
    </ul>
  </div>
</details>

<details>
  <summary><b>4. 고급 기능 및 메타 프로그래밍 (Advanced Features)</b></summary>
  <div style="padding-left: 20px; margin-top: 10px;">
    <ul>
      <li><a href="./class-overview.md">[7장] 클래스 개요 (Class & Member)</a></li>
      <li><a href="./inheritance-polymorphism.md">[7장] 상속, 다형성 및 OOP 키워드</a> <code>#OOP</code></li>
      <li><a href="./struct-tuple.md">[7장] 구조체 및 튜플 (Struct & Tuple)</a></li>
      <li><a href="./interface.md">[8장] 인터페이스 (Interface)</a> <code>#Interface</code></li>
      <li><a href="./generic-programming.md">[12장] 제네릭(Generic)과 형식 제약</a> <code>#Generic</code></li>
      <li><a href="./exception-handling.md">[14장] 예외 처리 (Exception Handling)</a></li>
      <li><a href="./delegate.md">[13장] 대리자 (Delegate)</a> <code>#Callback</code></li>
      <li><a href="./lambda-expression.md">[13장] 람다식 (Lambda Expression)</a></li>
      <li><a href="./linq.md">[15장] LINQ (Language Integrated Query)</a> <code>#LINQ</code></li>
      <li><a href="./reflection.md">[16장] 리플렉션 (Reflection)</a> <code>#Metadata</code></li>
      <li><a href="./attribute.md">[16장] 애트리뷰트 (Attribute)</a></li>
      <li><a href="./stream.md">[18장] 스트림 (Stream) 및 파일 I/O</a></li>
    </ul>
  </div>
</details>

---

## 🛠️ 실무 트러블슈팅 인덱스 (Quick Link)
*문제 상황에 맞는 글을 빠르게 찾아보세요.*

- **메모리 누수가 의심될 때:** [CLR 메모리 구조](./clr-memory-structure.md), [가비지 컬렉션 원리](./garbage-collection.md)
- **성능 최적화가 필요할 때:** [박싱/언박싱 최소화](./object-boxing-unboxing.md), [LINQ 활용](./linq.md)
- **비동기 데드락 발생 시:** [async/await 개념](./async-sync-blocking-nonblocking.md)

---
<div align="center">
  <span style="color: #666;">© 2026 rhdms0327 Backend Basecamp. All rights reserved.</span>
</div>