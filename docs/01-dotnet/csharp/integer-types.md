---
title: "[3장] 정수 계열 (Integer Type)"
parent: C#
grand_parent: .NET
nav_exclude: true
nav_order: 33
---

# [3장] 정수 계열 (Integer Type)

C#에서 정수를 표현하기 위한 다양한 데이터 형식들입니다.

## 1. 정수 형식 표
| 형식 | 크기 | 범위 | 비고 |
| :--- | :--- | :--- | :--- |
| **byte** | 1바이트 | 0 ~ 255 | 부호 없는 8비트 |
| **sbyte** | 1바이트 | -128 ~ 127 | 부호 있는 8비트 |
| **short** | 2바이트 | -32,768 ~ 32,767 | 16비트 |
| **int** | 4바이트 | 약 -21억 ~ 21억 | 32비트 (가장 많이 사용) |
| **uint** | 4바이트 | 0 ~ 약 42억 | 부호 없는 32비트 |
| **long** | 8바이트 | 약 -922경 ~ 922경 | 64비트 |

## 2. 선택 기준
- 일반적으로 정수 계산에는 **int**를 가장 많이 사용합니다.
- 다루는 데이터의 범위가 `int`를 넘어서는 경우 `long`을 사용합니다.
- 메모리 효율이 극도로 중요한 대용량 배열이나 바이너리 데이터 처리 시에는 `byte`나 `short`를 고려합니다.

## 3. 오버플로 (Overflow)
- 변수가 담을 수 있는 최대 범위를 넘어서는 값을 저장하면, 다시 최소값으로 돌아가는 현상이 발생합니다.
- `checked` 키워드를 사용하여 오버플로 발생 시 예외를 던지도록 설정할 수 있습니다.

---
> **참고 자료**
> - [정수 숫자 형식 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/builtin-types/integral-numeric-types)
