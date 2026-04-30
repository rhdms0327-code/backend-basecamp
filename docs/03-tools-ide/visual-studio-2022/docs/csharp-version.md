---
layout: post
title: "🎯 C# 언어 버전 관리하기"
date: 2025-12-05
categories: [Visual Studio 2022]
tags: [C#, .NET, 버전관리]
nav_exclude: true
---

> .NET 프레임워크 버전에 따른 C# 언어 버전 자동 설정과 `.csproj` 파일을 통한 수동 버전 지정 방법을 설명합니다.

## 자동 설정: .NET 버전에 따른 default 사용 (권장)

C# 언어 버전은 안정성과 호환성 때문에 대상 .NET 프레임워크 버전에 맞춰 자동 설정된 버전을 사용하는 것을 권장합니다.

1. **대상 프레임워크 확인**
   - 프로젝트 우클릭 ➔ 속성(Properties) ➔ 애플리케이션(Application) ➔ 대상 프레임워크 확인
2. **C# 언어 버전 확인 (자동 설정)**
   - 프로젝트 우클릭 ➔ 속성(Properties) ➔ 빌드 ➔ 고급 ➔ 언어 버전 확인
   - *드롭다운이 비활성화되어 있는 경우, .NET 버전에 맞는 기본값(default)이 자동으로 적용됨을 의미합니다. 기본 설정을 그대로 사용하는 것이 좋습니다.*

## 수동 설정: .csproj 파일 직접 편집

.NET 버전의 기본값과 관계없이 특정 C# 버전을 사용하고 싶을 때는 `<LangVersion>` 태그를 사용하여 C# 언어 버전을 변경할 수 있습니다.

**설정 방법:**
1. 솔루션 탐색기 ➔ 프로젝트 우클릭 ➔ 프로젝트 파일 편집 선택
2. `<PropertyGroup>` 태그 안에 `<LangVersion>` 속성 추가

```xml
<PropertyGroup>
  <LangVersion>10.0</LangVersion>
</PropertyGroup>
```

## 설치된 .NET 버전 확인 방법

개발자 명령 프롬프트를 사용하여 설치된 버전을 확인할 수 있습니다.
- **경로:** Visual Studio ➔ 보기 ➔ 터미널 선택 (단축키: `Ctrl + \``) ➔ 개발자 명령 프롬프트 창
- **명령어:** `dotnet --list-sdks`

## 번외: 의도치 않은 미리보기 버전 설치 문제 ⚠️

명령어 실행 결과 `.NET 9.0.xxx-preview` 같은 버전이 발견되면, 이는 Visual Studio Installer나 다른 프로그램에 의해 미리보기 SDK가 설치된 것입니다. 이것이 `latest` 설정 시 C# 13을 강제로 선택하게 하는 원인이 될 수 있습니다.
- **제거 방법:** 프로그램 추가/제거 ➔ 해당 버전(예: `Microsoft .NET SDK 9.0.xxx`) 검색 ➔ 제거

---

## 🔗 참고 자료
- [원문: Visual Studio에서 C# 언어 버전 관리하기](https://blog-34.tistory.com/20)
- [Microsoft Learn: C# 언어 버전 관리](https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/language-versioning)

---

[🔙 뒤로 가기](../index.md)
