---
layout: post
title: "🧵 [19장] 스레드 동기화 (Thread Synchronization)"
date: 2026-04-29
categories: [C#]
tags: [메모리]
nav_exclude: true
---

> 여러 스레드가 동일한 자원(메모리, 파일 등)에 동시에 접근할 때 데이터가 오염되지 않도록 순서를 제어하는 기술입니다.

## 1. 주요 개념
- **경합 조건 (Race Condition)**: 여러 스레드가 동시에 데이터를 수정하려고 경쟁하는 상황.
- **임계 영역 (Critical Section)**: 한 번에 한 스레드만 실행해야 하는 코드 영역.

## 2. lock 키워드
C#에서 가장 쉽고 흔하게 쓰이는 동기화 도구입니다.

```csharp
private readonly object _lockObj = new object();

public void SafeMethod()
{
    lock (_lockObj)
    {
        // 이곳은 한 번에 한 스레드만 진입 가능
        _sharedCounter++;
    }
}
```

- **왜 object인가?**: C#의 모든 객체는 내부에 '싱크 블록'이라는 자물쇠 정보를 기록할 공간을 가지고 있기 때문입니다.
- **주의**: `lock(this)`나 `lock(typeof(Class))`는 공용 자원을 잠그는 행위로 **교착 상태(Deadlock)** 위험이 크므로 전용 전용 `private object`를 사용하세요.

## 3. Monitor 클래스
`lock` 키워드의 실제 원형으로, 더 세밀한 제어가 가능합니다.
- `Monitor.Enter()` / `Monitor.Exit()`: 명시적으로 락 진입과 퇴장을 제어.
- `Monitor.Wait()` / `Monitor.Pulse()`: 스레드 간 협력을 위한 신호 체계.
  - **Wait**: 락을 가진 스레드가 조건이 맞지 않아 잠시 락을 놓고 대기실로 감.
  - **Pulse**: 대기실에 있는 스레드를 깨워 작업을 재개하게 함.

## 4. 스레드 상태 (ThreadState)
- **Unstarted**: 객체는 생성되었으나 `Start()` 전.
- **Running**: 현재 실행 중.
- **WaitSleepJoin**: `Sleep`, `Join`, `lock` 대기 등으로 일시 정지.
- **Stopped**: 실행 종료.

---
> **참고 자료**
> - [Monitor 클래스 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/api/system.threading.monitor)

---
[🔙 뒤로 가기](../index.md)
