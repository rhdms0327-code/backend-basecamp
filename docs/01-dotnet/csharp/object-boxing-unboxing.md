---
title: "[3장] object 형식과 박싱/언박싱"
parent: C#
grand_parent: .NET
nav_order: 30
---

# [3장] object 형식과 박싱/언박싱

## 1. object 형식
- C#의 모든 데이터 형식은 최종적으로 `System.Object`를 상속받습니다.
- 즉, `object` 타입 변수에는 어떤 종류의 데이터든 담을 수 있습니다.

## 2. 박싱 (Boxing)
- **값 형식**의 데이터를 **참조 형식**인 `object`에 담는 과정입니다.
- 이 과정에서 데이터는 힙(Heap) 영역에 복사되어 저장됩니다.

## 3. 언박싱 (Unboxing)
- `object`에 담긴 데이터를 다시 원래의 **값 형식**으로 꺼내는 과정입니다.
- 명시적 형 변환이 필요하며, 타입이 일치하지 않으면 런타임 에러가 발생합니다.

## 4. 성능 주의사항
- 박싱과 언박싱은 메모리 할당과 복사 비용이 발생하는 무거운 작업입니다.
- 빈번한 박싱/언박싱은 성능 저하와 GC 부하를 유발하므로, **제네릭(Generic)**을 사용하여 이를 방지하는 것이 좋습니다.

---
> **참고 자료**
> - [박싱 및 언박싱 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/types/boxing-and-unboxing)
