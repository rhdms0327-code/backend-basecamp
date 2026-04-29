---
title: "[CLR 심층 분석] CLR이 사용하는 메모리 구조"
parent: C#
grand_parent: .NET
nav_order: 4
---

# [CLR 심층 분석] CLR이 사용하는 메모리 구조

CLR이 관리하는 메모리는 용도에 따라 여러 구역으로 나뉩니다. 효율적인 C# 개발을 위해 이 구조를 이해하는 것이 중요합니다.

## 1. 스택 (Stack)
- **관리**: 'Thread Support'가 담당하며, 각 스레드마다 독립적으로 할당됩니다.
- **용도**: 지역 변수, 매개변수 저장.
- **특징**: 
  - 값 형식(Value Type)은 데이터 자체가 저장됩니다.
  - 참조 형식(Reference Type)은 힙에 있는 객체의 **주소값**만 저장됩니다.
  - 메서드 종료 시 해당 스택 프레임은 즉시 제거됩니다.

## 2. Loader Heaps (시스템 설계도 구역)
CLR이 프로그램을 실행하기 위한 '타입 인프라'를 보관하는 곳입니다.
- **High Frequency Heap**: static 필드, MethodTable 등 참조 빈도가 매우 높은 핵심 데이터.
- **Low Frequency Heap**: EEClass, ClassLoader 등 타입 로드 시에만 주로 사용되는 정보.
- **Stub Heap**: 외부 DLL 호출(P/Invoke) 등을 위한 대리 코드 보관.

## 3. JIT Code Heap (기계어 실행 구역)
- JIT 컴파일러가 중간 언어(IL)를 번역하여 생성한 **기계어(Native Code)**를 저장하는 캐시 공간입니다.
- 한 번 번역된 코드는 이곳에 저장되어 재사용되므로 실행 속도가 빨라집니다.

## 4. Managed Heap (사용자 데이터 구역)
- `new` 연산자로 생성된 객체 인스턴스가 거주하는 곳입니다.
- **가비지 컬렉터(GC)**가 직접 관리하며 할당과 해제를 담당합니다.
- 객체 크기에 따라 SOH(Small Object Heap)와 LOH(Large Object Heap)로 나뉩니다.

## 5. 비관리 메모리 (Unmanaged / Process Heap)
- `unsafe` 코드나 외부 C/C++ 라이브러리를 사용할 때 쓰이는 구역입니다.
- CLR은 이곳의 존재는 알지만 **직접 청소(GC)해주지 않으므로** 프로그래머가 직접 관리해야 합니다.

---
> **참고 자료**
> - [.NET Core Concepts Summary - Medium](https://medium.com/@meriffa/net-core-concepts-summary-ee6d24d3c8d4)
