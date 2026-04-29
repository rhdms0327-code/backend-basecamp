---
title: "[10장] 자료구조 (컬렉션 - Collections)"
parent: C#
grand_parent: .NET
nav_exclude: true
nav_order: 16
---

# [10장] 자료구조 (컬렉션 - Collections)

## 1. 개요
- 데이터를 효율적으로 저장하고 관리하기 위해 제공되는 클래스 라이브러리입니다.
- 고정 크기인 배열과 달리 **동적 크기** 조절이 가능하며 다양한 데이터 관리 방식을 지원합니다.

## 2. 주요 컬렉션 종류
- **List<T>**: 가장 많이 쓰이는 가변 배열. 인덱스로 접근 가능.
- **Dictionary<TKey, TValue>**: 키(Key)와 값(Value)의 쌍으로 저장. 빠른 검색 속도.
- **Queue<T>**: 선입선출 (FIFO).
- **Stack<T>**: 후입선출 (LIFO).
- **HashSet<T>**: 중복을 허용하지 않는 집합.

## 3. 배열 vs 컬렉션
| 구분 | 배열 (Array) | 컬렉션 (Collection) |
| :--- | :--- | :--- |
| **크기** | 고정 크기 | 가변 크기 (동적 조절) |
| **성능** | 인덱스 접근이 가장 빠름 | 기능에 따라 성능 차이 발생 |
| **유연성** | 낮음 | 높음 (추가, 삭제 용이) |

## 4. 선택 가이드
- 순차적 접근과 빠른 인덱스 조회가 필요하면 `List<T>`.
- 데이터의 유일성이 중요하면 `HashSet<T>`.
- 키 값을 이용한 빠른 조회가 필요하면 `Dictionary<TKey, TValue>`.

---
> **참고 자료**
> - [컬렉션 및 데이터 구조 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/standard/collections/)
