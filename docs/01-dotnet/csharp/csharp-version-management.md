---
title: "C# 언어 버전 관리"
parent: C#
grand_parent: .NET
nav_order: 27
---

# C# 언어 버전 관리

C# 언어 버전은 기본적으로 대상 .NET SDK 버전에 따라 결정됩니다.

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

## 3. 버전 확인 방법
Visual Studio의 프로젝트 속성 빌드 탭이나, 터미널에서 `dotnet --version`을 통해 현재 환경의 SDK 버전을 확인할 수 있습니다.

---
> **참고 자료**
> - [C# 언어 버전 관리 - Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/configure-language-version)
