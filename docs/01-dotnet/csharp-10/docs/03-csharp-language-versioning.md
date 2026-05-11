---
layout: post
title: "🧠 C# 언어 버전 관리 (C# Language Versioning)"
date: 2026-04-30
categories: [C#]
tags: ['버전관리', 'Core']
nav_exclude: true
---

> .NET 대상 프레임워크(TFM)와 C# 언어 버전 간의 호환성 및 기본 버전 결정 규칙 학습.

C# 언어 버전은 프로젝트의 대상 프레임워크(TFM, Target Framework Moniker)를 기반으로 컴파일러에 의해 자동으로 결정됩니다.

## 1. .NET 버전별 C# 지원 언어 버전 (기본값)

최신 C# 컴파일러는 대상 프레임워크와 호환되는 최신 언어 버전을 기본값으로 선택합니다.

| .NET 프레임워크 유형 | 버전 | C# 언어 버전 기본값 |
| :--- | :--- | :--- |
| **.NET** | **11.x (Preview)** | **C# 15** |
| **.NET** | **10.x (Current)** | **C# 14** |
| **.NET** | **9.x** | **C# 13** |
| **.NET** | **8.x (LTS)** | **C# 12** |
| **.NET** | 7.x | C# 11 |
| **.NET** | 6.x | C# 10 |
| **.NET** | 5.x | C# 9.0 |
| **.NET Core** | 3.x | C# 8.0 |
| **.NET Core** | 2.x | C# 7.3 |
| **.NET Standard** | 2.1 | C# 8.0 |
| **.NET Standard** | 2.0 | C# 7.3 |
| **.NET Framework** | All versions | C# 7.3 |

## 2. 기본 버전 결정 규칙 (Defaults)

1. **대상 프레임워크(TFM) 기준:** 컴파일러는 프로젝트가 대상으로 하는 .NET 버전에 따라 가장 적합한 C# 버전을 선택합니다.
2. **안정성 우선:** 프레임워크에서 지원하지 않는 런타임 동작이 필요한 언어 버전을 사용하지 않도록 방지합니다.
3. **미리 보기(Preview):** 미리 보기 버전의 프레임워크를 사용할 경우, C# 언어도 자동으로 미리 보기 버전이 선택될 수 있습니다.

## 3. 언어 버전 수동 변경 (LangVersion)

Visual Studio UI에서는 언어 버전을 변경하는 옵션을 제공하지 않는 경우가 많습니다. 버전을 수동으로 지정하려면 `.csproj` 파일을 직접 편집해야 합니다.

```xml
<PropertyGroup>
   <LangVersion>latest</LangVersion>
</PropertyGroup>
```

### LangVersion 주요 설정 값
- **`default`:** 컴파일러가 대상 프레임워크를 기준으로 선택하는 기본 버전.
- **`latest`:** 설치된 컴파일러가 지원하는 최신 안정 버전.
- **`latestMajor`:** 설치된 컴파일러가 지원하는 최신 주 버전(Major version).
- **`preview`:** 설치된 컴파일러가 지원하는 최신 미리 보기 버전.
- **특정 버전 (예: `12.0`):** 특정 버전을 강제로 사용.

> [!WARNING]
> 대상 프레임워크가 권장하는 버전보다 높은 버전을 강제로 지정할 경우, 해당 프레임워크의 런타임에서 지원하지 않는 기능으로 인해 진단하기 어려운 컴파일 에러나 런타임 에러가 발생할 수 있습니다.

---
**출처:** [언어 버전 관리 - C# reference | Microsoft Learn](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/language-versioning)

---

[🔙 뒤로 가기](../index.md)
