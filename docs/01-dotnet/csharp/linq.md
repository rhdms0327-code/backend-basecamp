---
layout: post
title: "🎯 [15장] LINQ (Language Integrated Query)"
date: 2026-04-29
categories: [C#]
tags: [문법, LINQ, C#]
---

# 🎯 [15장] LINQ (Language Integrated Query)

> 다양한 데이터 소스를 C# 표준 문법으로 다루는 LINQ의 철학과 쿼리/메서드 구문의 차이점, 그리고 데이터를 효율적으로 필터링하는 핵심 키워드를 정리합니다.

## 📖 1. 개요
- C# 언어 내부에 통합된 질의(Query) 기능을 의미합니다.
- 객체 컬렉션(LINQ to Objects), 데이터베이스(LINQ to SQL/Entities), XML 등 서로 다른 성격의 데이터를 **단일한 문법**으로 조작할 수 있게 해줍니다.

## 2. 장점
- **일관성**: 데이터 소스가 바뀌어도 코드를 배우는 비용이 줄어듭니다.
- **타입 안정성**: 문자열 기반의 SQL과 달리 컴파일 시점에 문법 오류와 타입 체크가 이루어집니다.
- **생산성**: 선언적 프로그래밍 스타일을 통해 복잡한 중첩 반복문을 단 몇 줄의 쿼리로 대체합니다.

## 🎯 3. 문법 구분
### 쿼리 구문 (Query Syntax)
- SQL 질의문과 유사한 형태를 띠며, 복잡한 조인(Join)이나 그룹화가 필요한 경우 가독성이 좋습니다.

### 메서드 구문 (Method Syntax)
- 확장 메서드와 람다식을 조합한 형태입니다. 쿼리 구문보다 더 많은 연산자를 지원하며 실무에서 가장 보편적으로 사용됩니다.

> [!TIP]
> LINQ는 기본적으로 '지연 실행(Deferred Execution)' 방식을 따릅니다. 즉, 쿼리를 정의한 시점이 아니라 `foreach` 등으로 결과를 실제로 순회하거나 `ToList()` 등을 호출하는 시점에 쿼리가 실행됩니다.

## 4. 주요 키워드
- **from**: 검색 대상이 되는 데이터 소스를 지정합니다.
- **where**: 특정 조건에 맞는 데이터만 걸러냅니다.
- **orderby**: 데이터를 오름차순 또는 내림차순으로 정렬합니다.
- **select**: 최종적으로 추출할 데이터의 형태(프로젝션)를 결정합니다.

---
> **참고 자료**
> - [LINQ 개요 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/concepts/linq/)

[🔙 뒤로 가기](./index.md)
