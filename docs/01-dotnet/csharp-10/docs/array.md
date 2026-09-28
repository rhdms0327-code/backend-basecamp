---
layout: post
title: "🧠 [10장] 배열 (Array)"
date: 2026-04-29
categories: [C#]
tags: [배열, 컬렉션]
nav_exclude: true
---

# 🧠 [10장] 배열 (Array)

> 동일한 타입의 데이터 요소들을 연속된 메모리 공간에 저장하는 C#의 가장 기본적인 자료구조인 배열의 특징과 선언 방법을 정리합니다.

## 📖 1. 개요
- 동일한 타입의 데이터 요소들이 **연속된 메모리 공간**에 저장된 자료구조입니다.
- 가장 기본적이고 원시적인 형태의 컬렉션입니다.

## 🏗️ 2. 주요 특징
- **동일 타입**: 모든 요소의 데이터 타입이 같아야 합니다.
- **고정 크기**: 선언 시 결정된 크기를 실행 중에 변경할 수 없습니다.
- **인덱스 접근**: 0부터 시작하는 인덱스를 사용하여 데이터에 매우 빠르게 접근할 수 있습니다.

> [!TIP]
> 배열은 고정 크기 자료구조이므로, 크기가 유동적으로 변해야 하는 상황에서는 `List<T>`와 같은 동적 컬렉션 사용을 고려하는 것이 좋습니다.

## 🎯 3. 선언 및 초기화

```csharp
// 선언과 동시에 크기 지정
int[] scores = new int[5];

// 선언과 동시에 초기화
int[] numbers = new int[] { 1, 2, 3, 4, 5 };

// 더 간결한 초기화
string[] names = { "Kim", "Lee", "Park" };
```

## 🧱 4. 다차원 및 가변 배열

### 4.1 2차원 배열 (int[,])
`int[,]`은 행(Row)과 열(Column)로 이루어진 격자(Grid) 형태의 데이터를 다룰 때 사용하는 2차원 배열 문법입니다. 대괄호 안의 콤마(`,`) 개수가 차원의 수를 나타내며, 콤마가 두 개(`int[,,]`)이면 3차원 배열이 됩니다.

**선언 및 초기화**

```csharp
// 크기가 3행 4열인 2차원 배열 선언 및 생성
int[,] matrix = new int[3, 4];

// 선언과 동시에 값 초기화 (2행 3열)
int[,] grid = new int[,] {
    { 1, 2, 3 },
    { 4, 5, 6 }
};

// 'new int[,]'는 생략 가능
int[,] grid2 = {
    { 1, 2, 3 },
    { 4, 5, 6 }
};
```

**접근 방식**

각 요소는 `[행, 열]`처럼 행 인덱스와 열 인덱스를 콤마로 구분하여 접근합니다. 인덱스는 모두 0부터 시작합니다.

```csharp
int[,] board = new int[3, 3];

// 값 대입
board[0, 1] = 10;

// 값 읽기
int value = board[0, 1];
```

배열의 크기는 `GetLength()` 메서드로 확인합니다.
- `board.GetLength(0)`: 행의 개수
- `board.GetLength(1)`: 열의 개수

전체 순회는 보통 중첩 `for` 문을 사용합니다.

```csharp
int[,] scores = {
    { 80, 90, 100 },
    { 70, 85, 95 }
};

for (int i = 0; i < scores.GetLength(0); i++)
{
    for (int j = 0; j < scores.GetLength(1); j++)
    {
        Console.Write($"{scores[i, j]} ");
    }
    Console.WriteLine();
}
```

### 4.2 가변 배열 (int[][])
`int[][]`는 배열 안에 배열이 들어가는 가변 배열(Jagged Array)로, 행마다 열의 길이가 다를 수 있습니다.

```csharp
int[][] jagged = new int[3][];
```

> [!TIP]
> `int[,]`은 모든 행의 열 크기가 고정된 직사각형(Rectangular) 형태이고, `int[][]`는 행마다 길이가 다를 수 있는 가변 배열입니다. 격자처럼 크기가 균일하면 `int[,]`, 행마다 크기가 달라질 수 있으면 `int[][]`를 사용합니다.

---
> **참고 자료**
> - [배열 개요 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/arrays/)

[🔙 뒤로 가기](../index.md)
