---
layout: post
title: "🛠️ VS Code 메뉴에 안잡힘"
date: 2026-05-11
categories: [.NET]
tags: []
nav_exclude: true
---

> VS Code에서 .NET 프로젝트 실행(Run) 및 디버깅 메뉴가 보이지 않거나 활성화되지 않을 때의 해결 방법입니다.

## 🚨 문제 현상
Visual Studio Code에서 프로젝트를 열었는데 좌측 디버그 탭이나 상단 메뉴에 **실행(Run)** 관련 항목이 보이지 않거나 작동하지 않는 현상.

## 💡 해결 방법

### 1. 프로젝트 폴더 직접 열기
VS Code가 솔루션이나 `.csproj` 파일 구조를 제대로 인식하려면, 해당 파일이 있는 **루트 폴더**를 열어야 합니다.
상위 폴더를 열어두었다면 터미널에서 프로젝트 폴더로 직접 이동한 후 다시 엽니다.
```bash
cd TodoApi
code .
```

### 2. 빌드 및 디버그 자산(Assets) 수동 생성
설정 파일(`.vscode/launch.json`, `tasks.json`)이 자동 생성되지 않아 메뉴가 활성화되지 않은 경우, 수동으로 강제 생성할 수 있습니다.
1. `Ctrl + Shift + P`를 눌러 **Command Palette(명령 팔레트)**를 엽니다.
2. `> .NET: Generate Assets for Build and Debug`를 입력하고 선택합니다.
3. 프롬프트가 나타나면 대상 프로젝트를 선택합니다.

### 3. C# 확장 프로그램 확인
* 좌측 확장(Extensions) 아이콘을 클릭하여 **C# Dev Kit** 또는 **C#** 확장이 올바르게 설치 및 활성화되어 있는지 확인합니다.
* 문제가 지속된다면 확장을 다시 로드하거나 VS Code를 재시작해 보세요.

---

[🔙 뒤로 가기](../index.md)
