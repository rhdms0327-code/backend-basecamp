---
title: "[19장] 스레드 기본 개념 (Process vs Thread)"
parent: C#
grand_parent: .NET
nav_order: 7
---

# [19장] 스레드 기본 개념 (Process vs Thread)

## 1. 프로세스 (Process)
운영체제로부터 자원을 할당받은 **실행 중인 프로그램의 인스턴스**입니다.
- **독립성**: 각 프로세스는 독립된 메모리 영역(Code, Data, Stack, Heap)을 가집니다.
- **안정성**: 한 프로세스가 죽어도 다른 프로세스에 영향을 주지 않습니다.
- **비용**: 컨텍스트 스위칭(Context Switching) 비용이 큽니다.

## 2. 스레드 (Thread)
프로세스 내에서 실행되는 **실행 흐름의 단위**입니다.
- **자원 공유**: 프로세스 내의 Code, Data, Heap 영역을 공유합니다.
- **개별 영역**: 각 스레드는 자신만의 **Stack**과 **PC(Program Counter)** 레지스터를 가집니다.
- **효율성**: 생성 및 종료가 빠르고, 메모리 공유 덕분에 통신 비용이 적습니다.
- **취약성**: 한 스레드에서 예외가 발생하면 프로세스 전체가 영향을 받을 수 있습니다.

## 3. 프로세스의 메모리 구조
1. **Code**: 실행할 기계어 명령어 (Read-only).
2. **Data**: 전역 변수, 정적 변수 (프로그램 종료 시까지 유지).
3. **Stack**: 함수의 지역 변수, 매개변수 (LIFO 구조, 함수 종료 시 소멸).
4. **Heap**: 동적으로 생성된 객체 (GC가 관리).

## 4. C#에서 스레드 사용하기
```csharp
using System.Threading;

void DoWork() 
{
    Console.WriteLine("작업 중...");
}

// 스레드 객체 생성
Thread thread = new Thread(DoWork);

// 스레드 시작
thread.Start();

// 스레드 종료 대기
thread.Join();
```

---
> **참고 자료**
> - [관리되는 스레딩 기본 사항 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/standard/threading/managed-threading-basics)
