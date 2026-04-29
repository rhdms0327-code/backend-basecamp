---
title: "[3장] 문자열 (String)"
parent: C#
grand_parent: .NET
nav_order: 28
---

# [3장] 문자열 (String)

C#의 `string`은 유니코드 문자의 시퀀스를 나타내는 참조 형식입니다.

## 1. 주요 메서드
| 메서드 | 설명 |
| :--- | :--- |
| **Compare()** | 두 문자열을 비교하여 정렬 순서 반환. |
| **Concat()** | 여러 문자열을 하나로 결합. |
| **IsNullOrEmpty()** | null이거나 빈 문자열인지 확인. |
| **IsNullOrWhiteSpace()** | null, 빈 문자열, 또는 공백만 있는지 확인. |
| **Join()** | 배열 요소를 구분 기호로 연결. |
| **Contains()** | 특정 문자열 포함 여부 확인. |

## 2. 문자열 불변성 (Immutability)
- `string` 객체는 한 번 생성되면 그 내용을 변경할 수 없습니다.
- 문자열을 수정하는 것처럼 보이는 연산은 사실 **새로운 문자열 객체**를 생성하는 것입니다.
- 반복적인 문자열 수정이 필요한 경우 성능을 위해 `StringBuilder`를 권장합니다.

## 3. 문자열 보간 (String Interpolation)
`$` 기호를 사용하여 문자열 내에 변수나 식을 직접 삽입할 수 있습니다.
```csharp
string name = "Terry";
int age = 34;
Console.WriteLine($"Name: {name}, Age: {age}");
```

---
> **참고 자료**
> - [문자열 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/strings/)
