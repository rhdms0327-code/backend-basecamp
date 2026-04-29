---
title: "[3장] 부동 소수점 숫자 형식"
parent: C#
grand_parent: .NET
nav_order: 32
---

# [3장] 부동 소수점 숫자 형식

실수(Real Number)를 표현하기 위한 데이터 형식들입니다.

## 1. 주요 형식 비교
| 형식 | 크기 | 정밀도 | 용도 |
| :--- | :--- | :--- | :--- |
| **float** | 4바이트 | 6~9자리 | 성능 중심의 일반 수치 계산 |
| **double** | 8바이트 | 15~17자리 | 정밀도가 필요한 과학 기술 계산 |
| **decimal** | 16바이트 | 28~29자리 | 금융, 회계 등 정확한 10진수 계산 |

## 2. decimal 형식의 중요성
- `float`와 `double`은 2진수 기반의 부동 소수점 방식을 사용하여 소수점 계산 시 미세한 오차가 발생할 수 있습니다.
- 반면 `decimal`은 10진수 기반으로 설계되어 **돈과 관련된 계산**에서 반드시 사용해야 합니다.

## 3. 리터럴 접미사
- `float`: `3.14f`
- `double`: `3.14` (기본값)
- `decimal`: `3.14m`

---
> **참고 자료**
> - [부동 소수점 숫자 형식 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/builtin-types/floating-point-numeric-types)
