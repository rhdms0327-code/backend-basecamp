---
layout: post
title: "🎯 [19장] 동기 / 비동기 / 블로킹 / 논블로킹"
date: 2026-04-29
categories: [C#]
tags: [병렬처리, 비동기]
nav_exclude: true
---

# 🎯 [19장] 동기 / 비동기 / 블로킹 / 논블로킹

> 프로그래밍의 효율성을 결정짓는 동기/비동기, 블로킹/논블로킹의 개념 차이를 명확히 이해하고, C#의 async/await를 통한 구현 방법을 학습합니다.

## 1. 동기(Sync) vs 비동기(Async)
핵심은 **"호출되는 함수의 작업 완료 여부를 신경 쓰는가?"**입니다.
- **동기(Sync)**: 함수 A가 함수 B를 호출했을 때, B의 결과가 나올 때까지 기다리거나 계속 확인하며 순서대로 처리합니다. (시간을 맞춤)
- **비동기(Async)**: 함수 A가 함수 B를 호출하면서 콜백 함수를 전달하고, B의 완료 여부와 상관없이 자기 일을 계속합니다. B는 작업이 끝나면 콜백을 실행합니다.

## 2. 블로킹(Blocking) vs 논블로킹(Non-blocking)
핵심은 **"제어권을 누가 가지고 있는가?"**입니다.
- **블로킹(Blocking)**: 함수 A가 B를 호출하면 제어권을 B에게 넘깁니다. B가 작업을 마칠 때까지 A는 멈춰 있습니다.
- **논블로킹(Non-blocking)**: 함수 A가 B를 호출해도 제어권을 자기가 계속 가지고 있습니다. B는 작업을 시작만 하고 바로 리턴하며, A는 멈추지 않고 다음 코드를 실행합니다.

> [!WARNING]
> 비동기(Async)와 논블로킹(Non-blocking)은 혼용되기 쉽지만, 비동기는 '결과 통지 방식'에 초점이 있고 논블로킹은 '제어권 유지'에 초점이 있는 별개의 개념입니다.

## 3. C#에서의 비동기 (async / await)
C#은 `async`와 `await` 키워드를 통해 비동기 프로그래밍을 직관적으로 지원합니다.

### async 키워드
- 메서드 선언부에 붙여 비동기 메서드임을 알립니다.
- 반드시 `Task`, `Task<T>`, `void`(이벤트 핸들러용) 중 하나를 반환해야 합니다.

### await 연산자
- 비동기 작업이 완료될 때까지 기다리되, 스레드를 차단(Blocking)하지 않고 제어권을 호출자에게 반환합니다.
- 작업이 완료되면 중단되었던 지점부터 다시 실행을 이어갑니다.

```csharp
async Task<int> GetLuckyNumberAsync() 
{ 
    // Task.Delay는 스레드를 점유하지 않고 대기하는 비동기 메서드입니다.
    await Task.Delay(100); 
    return 7; // 실제로는 Task<int>로 포장되어 반환됨
}

// 사용 시
// await 연산자를 사용하여 비동기 작업의 결과를 추출합니다.
int number = await GetLuckyNumberAsync(); 
```

---
> **참고 자료**
> - [비동기 프로그래밍 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/programming-guide/concepts/async/)

[🔙 뒤로 가기](../index.md)
