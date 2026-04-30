---
layout: post
title: "🛠️ 💡 시니어의 꿀팁: `.vscode/settings.json`으로 관리하기"
date: 2026-04-30
categories: [Tools & IDE]
tags: ['VSCode', 'C#']
nav_exclude: true
---

> 시니어의 꿀팁 - .vscode/settings.json을 이용한 파일 숨김 처리 가이드

만약 프로젝트마다 숨기고 싶은 게 다르다면, 아예 프로젝트 루트에 설정 파일을 두는 게 더 아키텍트답습니다.
프로젝트 최상위에 `.vscode` 폴더를 만듭니다. (이미 있을 수도 있습니다.)

그 안에 `settings.json` 파일을 만들고 아래 내용을 넣으세요.

```json
{
  "files.exclude": {
    "**/bin": true,
    "**/obj": true,
    "**/.vs": true,
    "**/.vscode": false,
    "**/Extensions": true
  }
}
```

---

[🔙 뒤로 가기](../index.md)
