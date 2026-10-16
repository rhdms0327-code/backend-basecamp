---
layout: post
title: "🎯 자주 쓰는 함수 모음"
date: 2026-10-16
categories: [코딩테스트]
tags: []
nav_exclude: true
---

> 코테 풀이에 자주 쓰는 C# 함수를 분류별로 한 표에 모았습니다. 자세한 사용법은 주제별 글(문자열, 숫자 변환, 콘솔 입출력)에 있습니다.

---

## 함수 표

채점 환경의 C# 버전에 따라 일부 최신 함수는 없을 수 있습니다. 컴파일 오류가 나면 오래된 방식으로 바꿉니다.

| 분류 | 함수 | 설명 |
| :--- | :--- | :--- |
| 정렬 | `Array.Sort(arr)` · `list.Sort()` | 제자리 정렬. 원본이 바뀜 |
| 정렬 | `Array.Sort(arr, (a, b) => b - a)` | 비교 함수로 내림차순 등 지정 |
| 정렬 | `arr.OrderBy(x => x).ToArray()` | 원본은 두고 새로 정렬 (`using System.Linq;`) |
| 문자열 | `string.Join(",", arr)` | 배열을 문자열로 이어 붙이기 |
| 문자열 | `s.ToCharArray()` · `new string(chars)` | 문자 배열로 바꿔 수정 후 다시 문자열로 |
| 문자열 | `s.Split(' ')` · `s.Substring(i, len)` | 쪼개기, 자르기 |
| 문자열 | `StringBuilder.Append` | 반복해서 이어 붙일 때 (`using System.Text;`) |
| 변환 | `int.Parse(s)` · `n.ToString()` · `c - '0'` | 문자열·숫자·숫자 문자 변환 |
| 수학 | `Math.Max` · `Min` · `Abs` · `Sqrt` · `Pow` | `Sqrt` · `Pow`는 실수 반환, `(int)` 변환 필요 |
| Dictionary | `ContainsKey` · `TryGetValue` · `dict[key]++` | 개수 세기. 없는 키를 읽기 전에 확인 |
| 집합 | `HashSet<T>.Add` · `Contains` | 중복 제거, O(1) 포함 검사 |
| 큐·스택 | `Queue.Enqueue/Dequeue` · `Stack.Push/Pop` | BFS, 괄호 검사 |
| 우선순위 큐 | `PriorityQueue<T, P>` | .NET 6 이상. 채점 환경에서 컴파일되는지 먼저 확인 |
| 배열 | `new int[n, m]` · `Array.Fill` | 2차원 배열, 초기화 |
| LINQ | `Sum` · `Max` · `Where` · `Select` · `Distinct` | 짧게 쓰기 좋지만 반복문 안에서는 느려질 수 있음 |

## 주제별 글

- [문자열 (string) 다루기](./string.md)
- [숫자 변환과 계산 (실수 → 정수)](./number.md)
- [콘솔 입출력 (Console)](./console.md)

---

[🔙 뒤로 가기](../index.md)
