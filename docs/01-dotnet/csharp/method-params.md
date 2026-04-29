---
title: "[6장] 메서드 매개변수 (ref, out)"
parent: C#
grand_parent: .NET
nav_exclude: true
nav_order: 23
---

# [6장] 메서드 매개변수 (ref, out)

## 1. 값에 의한 전달 vs 참조에 의한 전달
- **값에 의한 전달 (Pass by Value)**: 매개변수의 값을 복사하여 전달합니다. 메서드 내부에서 값을 바꿔도 원본은 변하지 않습니다. (C#의 기본값)
- **참조에 의한 전달 (Pass by Reference)**: 매개변수의 메모리 주소를 전달합니다. 메서드 내부에서의 변경이 원본에 직접 반영됩니다.

## 2. ref 키워드
- 메서드 호출 전 변수가 반드시 **초기화**되어 있어야 합니다.
- 메서드 내부에서 값을 수정하지 않아도 컴파일 에러가 발생하지 않습니다.
- 양방향(입력 및 출력)으로 데이터를 주고받을 때 사용합니다.

## 3. out 키워드
- 메서드 호출 전 초기화가 필수가 아닙니다.
- 메서드 내부에서 반드시 **값을 할당**해야 합니다.
- 메서드의 반환값 외에 추가적인 출력값이 필요할 때 주로 사용합니다. (예: `int.TryParse`)

## 4. 선택 가이드
- 원본 데이터를 직접 수정해야 하거나 큰 구조체의 복사 비용을 아끼고 싶을 때 `ref`.
- 메서드에서 결과물로 값을 내보내고 싶을 때 `out`.
- 최신 C#에서는 여러 값을 반환하기 위해 `Tuple`을 사용하는 방식이 더 권장되기도 합니다.

---
> **참고 자료**
> - [매개변수 전달 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/classes-and-structs/passing-parameters)
