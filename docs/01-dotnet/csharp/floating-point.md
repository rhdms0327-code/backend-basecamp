---
layout: post
title: "🎯 [3장] 부동 소수점 숫자 형식"
date: 2026-04-29
categories: [C#]
tags: [정밀도, 데이터형식, C#]
---

# 🎯 [3장] 부동 소수점 숫자 형식

> C#에서 실수를 표현하는 다양한 방식(float, double, decimal)의 차이점과 금융 계산 등 정밀도가 중요한 상황에서의 올바른 선택 기준을 정리합니다.

## 1. 주요 형식 비교
| 형식 | 크기 | 정밀도 | 용도 |
| :--- | :--- | :--- | :--- |
| **float** | 4바이트 | 6~9자리 | 성능 중심의 그래픽스나 일반 수치 계산 |
| **double** | 8바이트 | 15~17자리 | 높은 정밀도가 필요한 과학 기술 계산 (기본형) |
| **decimal** | 16바이트 | 28~29자리 | 금융, 회계 등 한 치의 오차도 없어야 하는 10진수 계산 |

## 2. decimal 형식의 중요성
- `float`와 `double`은 2진수 기반의 부동 소수점 방식을 사용하여 소수점 계산 시 미세한 오차가 발생할 수 있습니다 (예: 0.1을 여러 번 더할 때).
- 반면 `decimal`은 10진수 기반으로 설계되어 **금액 계산**과 같은 비즈니스 로직에서 반드시 사용해야 합니다.

> [!WARNING]
> `double`과 `decimal`은 서로 다른 내부 구조를 가지므로 연산 시 암시적 형변환이 불가능합니다. 명시적으로 형변환하거나 처음부터 동일한 타입을 사용해야 합니다.

## 3. 리터럴 접미사
- `float`: `3.14f`
- `double`: `3.14` (접미사가 없으면 기본적으로 double로 인식)
- `decimal`: `3.14m`

---
> **참고 자료**
> - [부동 소수점 숫자 형식 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types)

[🔙 뒤로 가기](./index.md)
