---
layout: post
title: "🧠 .NET 10 SDK 설치 및 환경 확인"
date: 2026-04-30
categories: [.NET]
tags: ['Minimal API', 'Core']
nav_exclude: true
---

> .NET 10 SDK 설치 여부 확인 방법 및 설치 가이드.

.NET 10 기반의 애플리케이션을 개발하기 위해서는 시스템에 최신 .NET SDK가 설치되어 있어야 합니다.

## 1. 현재 설치된 SDK 확인

터미널(PowerShell)에서 다음 명령어를 실행하여 현재 설치된 .NET 버전을 확인합니다.

### 설치된 버전 확인
```powershell
dotnet --version
```
- 예시 출력: `10.0.203` (현재 시스템에 설치된 최신 버전이 출력됨)

### 설치된 전체 SDK 목록 확인
시스템에 여러 버전의 SDK가 설치되어 있을 수 있습니다.
```powershell
dotnet --list-sdks
```
- 예시 출력:
  ```text
  8.0.417 [C:\Program Files\dotnet\sdk]
  9.0.309 [C:\Program Files\dotnet\sdk]
  10.0.203 [C:\Program Files\dotnet\sdk]
  ```

## 2. .NET 10 SDK 설치 가이드

만약 위 명령어 실행 시 `10.x` 버전이 보이지 않는다면 아래 절차에 따라 설치합니다.

1. **공식 다운로드 페이지 접속:** [.NET 10 다운로드](https://dotnet.microsoft.com/ko-kr/download/dotnet/10.0)
2. **SDK 선택:** 본인의 OS(Windows, Linux, macOS)에 맞는 **SDK** 빌드를 선택합니다. (개발 시에는 Runtime이 아닌 SDK가 필요합니다.)
3. **설치 프로그램 실행:** 다운로드된 `.exe` 또는 패키지 파일을 실행하여 설치를 완료합니다.
4. **터미널 재시작:** 설치 완료 후에는 터미널을 껐다가 다시 켜서 `dotnet --version` 명령어로 확인합니다.

## 3. 관련 팁

- **Visual Studio 사용 시:** Visual Studio 2022 버전의 최신 업데이트를 설치하면 .NET 10 SDK가 함께 포함되어 설치되는 경우가 많습니다.
- **Global.json:** 특정 프로젝트에서 특정 SDK 버전만 사용하도록 강제하려면 프로젝트 루트에 `global.json` 파일을 생성하여 설정할 수 있습니다.

---
**현재 상태:** 시스템에 .NET 10.0.203 SDK가 정상적으로 설치되어 있음을 확인했습니다.

---

[🔙 뒤로 가기](../index.md)
