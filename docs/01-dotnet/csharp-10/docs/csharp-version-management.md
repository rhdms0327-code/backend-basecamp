---
layout: post
title: "🎯 C# 언어 버전 관리"
date: 2026-04-29
categories: [C#]
tags: [버전관리]
nav_exclude: true
---

# 🎯 C# 언어 버전 관리

> .NET SDK 버전에 따라 결정되는 C# 언어 버전의 기본 원리와 프로젝트 파일(.csproj)을 통한 수동 설정 방법을 정리합니다.

## 1. 자동 버전 설정 (권장)
- 최신 Visual Studio와 .NET SDK를 사용하면, 선택한 .NET 프레임워크 버전에 가장 적합한 C# 언어 버전이 자동으로 선택됩니다.
- 예: .NET 8.0 프로젝트는 기본적으로 C# 12.0을 사용합니다.

## 2. 수동 설정 방법 (.csproj)
특정 버전을 강제해야 하는 경우 프로젝트 파일(`.csproj`)에서 설정할 수 있습니다.

```xml
<PropertyGroup>
  <LangVersion>latest</LangVersion>
</PropertyGroup>
```

- **latest**: 설치된 SDK에서 지원하는 최신 안정 버전.
- **preview**: 미리 보기 버전 기능을 포함한 최신 버전.
- **10.0, 11.0...**: 특정 버전을 명시.

> [!TIP]
> 특별한 이유가 없다면 `latest`를 사용하는 것이 좋으며, 최신 기능을 실험해보고 싶을 때만 `preview`를 사용하는 것이 권장됩니다.

## 3. 버전 확인 방법
Visual Studio의 프로젝트 속성 빌드 탭이나, 터미널에서 `dotnet --version`을 통해 현재 환경의 SDK 버전을 확인할 수 있습니다.

---
> **참고 자료**
> - [C# 언어 버전 관리 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/configure-language-version)

[🔙 뒤로 가기](../index.md)
