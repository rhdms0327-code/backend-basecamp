---
layout: post
title: "🛠️ 🔨 Code Lens(Reference) 안 보이게 하는 방법"
date: 2026-04-30
categories: [Tools & IDE]
tags: ['VSCode', 'C#']
nav_exclude: true
---

> VS Code에서 Code Lens(Reference)를 비활성화하여 에디터를 깔끔하게 만드는 방법.

코드 상단에 나타나는 'n개 참조' 같은 정보(Code Lens)가 시야를 가린다면, 아래 방법으로 깔끔하게 끌 수 있습니다.

## 1. 가장 확실한 방법 (설정 창 이용)

1. VS Code에서 `Ctrl + ,` (콤마)를 눌러 설정을 엽니다.
2. 상단 검색창에 **"codelens"**라고 입력합니다.
3. 아래 항목을 찾아 체크 해제하세요.
   - **Editor: Code Lens**: 이걸 끄면 모든 언어에서 코드 렌즈가 사라집니다. (가장 깔끔합니다.)

---

[🔙 뒤로 가기](../index.md)
