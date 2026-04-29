---
title: "[10장] 배열 (Array)"
parent: C#
grand_parent: 01. .NET
nav_order: 17
---

# [10장] 배열 (Array)

## 1. 개요
- 동일한 타입의 데이터 요소들이 **연속된 메모리 공간**에 저장된 자료구조입니다.
- 가장 기본적이고 원시적인 형태의 컬렉션입니다.

## 2. 주요 특징
- **동일 타입**: 모든 요소의 데이터 타입이 같아야 합니다.
- **고정 크기**: 선언 시 결정된 크기를 실행 중에 변경할 수 없습니다.
- **인덱스 접근**: 0부터 시작하는 인덱스를 사용하여 데이터에 매우 빠르게 접근할 수 있습니다.

## 3. 선언 및 초기화
```csharp
// 선언과 동시에 크기 지정
int[] scores = new int[5];

// 선언과 동시에 초기화
int[] numbers = new int[] { 1, 2, 3, 4, 5 };

// 더 간결한 초기화
string[] names = { "Kim", "Lee", "Park" };
```

## 4. 다차원 및 가변 배열
- **2차원 배열**: `int[,] matrix = new int[3, 3];` (행렬 구조)
- **가변 배열 (Jagged Array)**: `int[][] jagged = new int[3][];` (배열의 배열, 행마다 크기가 다를 수 있음)

---
> **참고 자료**
> - [배열 개요 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/arrays/)
