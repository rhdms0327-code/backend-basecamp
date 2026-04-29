---
layout: post
title: "🎯 [CLR 심층 분석] CLR이 사용하는 메모리 구조"
date: 2026-04-29
categories: [C#]
tags: [CLR, 메모리관리, C#]
nav_exclude: true
---

# 🎯 [CLR 심층 분석] CLR이 사용하는 메모리 구조

> CLR이 관리하는 메모리의 각 구역(스택, 힙, 시스템 구역 등)의 역할과 데이터 저장 방식을 상세히 정리하여 효율적인 메모리 설계의 기초를 다집니다.

## 1. 스택 (Stack)
- **관리**: 각 스레드마다 독립적으로 할당되며 Thread Support가 담당합니다.
- **용도**: 지역 변수, 매개변수 저장.
- **특징**: 
  - 값 형식(Value Type)은 데이터 자체가 저장됩니다.
  - 참조 형식(Reference Type)은 힙에 있는 객체의 **주소값**만 저장됩니다.
  - 메서드 종료 시 해당 구역은 즉시 제거됩니다.

## 2. Loader Heaps (시스템 설계도 구역)
CLR이 프로그램을 실행하기 위한 '타입 인프라'를 보관하는 곳입니다.
- **High Frequency Heap**: static 필드, MethodTable 등 참조 빈도가 매우 높은 핵심 데이터 보관.
- **Low Frequency Heap**: 타입 로드 시에만 주로 사용되는 정보 보관.

## 3. JIT Code Heap (기계어 실행 구역)
- JIT 컴파일러가 중간 언어(IL)를 번역하여 생성한 **기계어(Native Code)**를 저장하는 캐시 공간입니다.
- 실행 중인 프로그램의 속도를 비약적으로 높여주는 핵심 구역입니다.

## 4. Managed Heap (사용자 데이터 구역)
- `new` 연산자로 생성된 객체 인스턴스가 거주하는 곳입니다.
- **가비지 컬렉터(GC)**가 직접 관리하며 할당과 해제를 담당합니다.

> [!TIP]
> 힙은 스택보다 할당 속도가 느리고 GC 오버헤드가 발생하므로, 크기가 작고 생명 주기가 짧은 데이터는 구조체(struct)를 활용해 스택에 할당하는 것이 성능상 유리할 수 있습니다.

## 5. 비관리 메모리 (Unmanaged / Process Heap)
- `unsafe` 코드나 외부 C/C++ 라이브러리를 사용할 때 쓰이는 구역입니다.
- CLR이 직접 관리하지 않으므로 프로그래머가 메모리 누수가 발생하지 않도록 주의해야 합니다.

---
> **참고 자료**
> - [.NET Core Concepts Summary - Medium](https://medium.com/@meriffa/net-core-concepts-summary-ee6d24d3c8d4)

[🔙 뒤로 가기](./index.md)
