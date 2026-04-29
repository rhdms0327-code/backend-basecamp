---
title: "[.NET 분석] .NET Framework 설치 가이드"
parent: C#
grand_parent: 01. .NET
nav_order: 35
---

# [.NET 분석] .NET Framework 설치 가이드

## 1. 설치 유형 구분
- **런타임 (Runtime)**: 실제 프로그램을 실행하는 데 필요합니다. CLR과 기본 라이브러리가 포함됩니다.
- **개발자 팩 (Developer Pack)**: 특정 버전의 .NET Framework를 타겟으로 앱을 개발(빌드)할 때 필요합니다. 타겟팅 팩과 SDK가 포함됩니다.

## 2. 버전별 특징
- **.NET Framework 3.5**: 1.0부터 3.5까지의 이전 세대 기능을 포함합니다. Windows 기능 켜기/끄기를 통해 설치하는 경우가 많습니다.
- **.NET Framework 4.8.x**: Windows 전용 .NET Framework의 마지막 메이저 버전입니다. 안정성이 높고 현재 많은 엔터프라이즈 환경에서 사용됩니다.

## 3. 설치 주의사항
- 상위 버전 런타임은 일반적으로 하위 버전의 런타임 역할을 수행할 수 있습니다 (In-place update).
- 개발 시에는 본인이 타겟팅하는 프레임워크 버전의 **개발자 팩**이 설치되어 있는지 반드시 확인해야 합니다.

---
> **참고 자료**
> - [.NET Framework 설치 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/framework/install/)
