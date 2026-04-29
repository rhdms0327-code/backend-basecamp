---
layout: post
title: "🎯 [.NET 분석] .NET Framework 설치 가이드"
date: 2026-04-29
categories: [C#]
tags: []
nav_exclude: true
---

# 🎯 [.NET 분석] .NET Framework 설치 가이드

> .NET 프로그램을 실행하기 위한 런타임과 개발을 위한 개발자 팩의 차이점을 이해하고, 버전별 설치 특징과 주의사항을 정리합니다.

## 🏗️ 1. 설치 유형 구분
- **런타임 (Runtime)**: 실제 프로그램을 실행하는 데 필요합니다. CLR(공통 언어 런타임)과 기본 클래스 라이브러리가 포함됩니다.
- **개발자 팩 (Developer Pack)**: 특정 버전의 .NET Framework를 타겟으로 앱을 개발하고 빌드할 때 필요합니다. 타겟팅 팩과 SDK가 포함되어 있습니다.

## 2. 버전별 특징
- **.NET Framework 3.5**: 초기 세대의 핵심 기능을 포함하며, Windows의 '기능 켜기/끄기' 설정을 통해 주로 설치합니다.
- **.NET Framework 4.8.x**: Windows 전용 .NET Framework의 최종 메이저 버전으로, 매우 높은 안정성을 바탕으로 수많은 엔터프라이즈 환경에서 사용 중입니다.

> [!WARNING]
> .NET Framework 4.8 이후의 새로운 기능들은 .NET 5/6/7/8 등 크로스 플랫폼을 지원하는 '.NET' (구 .NET Core 기반)으로 통합되어 출시되고 있습니다. 신규 프로젝트라면 가급적 .NET 6 이상을 권장합니다.

## 🏗️ 3. 설치 주의사항
- 상위 버전 런타임은 일반적으로 하위 버전에서 빌드된 앱을 실행할 수 있습니다 (In-place update 방식).
- 개발 환경에서는 본인이 프로젝트 파일(`.csproj`)에서 지정한 `TargetFramework` 버전과 일치하는 **개발자 팩**이 설치되어 있는지 반드시 확인해야 합니다.

---
> **참고 자료**
> - [.NET Framework 설치 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/framework/install/)

[🔙 뒤로 가기](../index.md)
