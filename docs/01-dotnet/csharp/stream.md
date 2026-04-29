---
title: "[18장] 스트림 (Stream)"
parent: C#
grand_parent: 01. .NET
nav_order: 8
---

# [18장] 스트림 (Stream)

## 1. 스트림의 개념
- 데이터를 연속적인 바이트(Byte)의 흐름으로 취급하는 방식입니다.
- 파일, 메모리, 네트워크 등 데이터의 소스나 목적지에 관계없이 동일한 인터페이스로 데이터를 주고받을 수 있게 해줍니다.

## 2. System.IO.Stream 클래스
모든 스트림 클래스의 조상인 추상 클래스입니다.
- **CanRead / CanWrite / CanSeek**: 현재 스트림의 상태 확인.
- **Read() / Write()**: 데이터 읽기 및 쓰기.
- **Flush()**: 버퍼의 데이터를 목적지로 강제 전송.
- **Close() / Dispose()**: 자원 반납.

## 3. 주요 파생 클래스
- **FileStream**: 디스크 내 파일을 읽고 쓸 때 사용.
- **MemoryStream**: RAM 메모리에 데이터를 임시로 저장.
- **NetworkStream**: 네트워크 소켓을 통해 데이터를 주고받을 때 사용.

## 4. 보조 클래스 (Helper Classes)
바이트 단위의 스트림을 더 편리하게 다루기 위한 도구들입니다.
- **StreamReader / StreamWriter**: 텍스트 데이터를 읽고 쓸 때 사용.
- **BinaryReader / BinaryWriter**: 이진 데이터를 읽고 쓸 때 사용.

---
> **참고 자료**
> - [파일 및 스트림 I/O - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/standard/io/)
