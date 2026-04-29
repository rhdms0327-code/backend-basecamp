---
layout: post
title: "📦 npm 주요 명령어 및 옵션 요약"
date: 2026-03-24
categories: [React]
tags: [npm, 패키지관리]
nav_exclude: true
---

> npm의 핵심 명령어와 자주 쓰는 옵션을 한눈에 정리한 레퍼런스.
> `-g`, `-D`, `-y` 옵션의 정확한 의미를 파악하는 것이 중요하다.

---

## 🛠️ npm 주요 명령어 및 옵션 요약

| 명령어 (줄임) | 설명 | 주요 옵션 |
| :--- | :--- | :--- |
| **npm install** (i) | 패키지 설치 또는 package.json 의존성 일괄 설치 | `-g`: 시스템 전체(Global) 설치 \| `-D`: 개발 환경용 설치 \| `-O`: 선택적 의존성 설치 |
| **npm uninstall** (un) | 설치된 패키지 삭제 및 기록 제거 | `-g`: 글로벌 패키지 삭제 |
| **npm run** | package.json의 scripts 실행 | `--`: 뒤에 오는 인자를 스크립트로 전달 |
| **npm init** | 새로운 프로젝트(package.json) 초기화 | `-y`: 모든 질문에 'yes'로 응답하여 즉시 생성 |

---

## 옵션 상세

### `-D` (--save-dev)
개발 환경에서만 필요한 패키지를 설치합니다. 빌드 결과물에는 포함되지 않습니다.

```bash
npm install -D prettier eslint typescript
```

### `-g` (--global)
시스템 전체에 설치합니다. 어느 폴더에서든 명령어로 사용 가능합니다.

```bash
npm install -g nodemon
```

### `-y` (--yes)
`npm init` 시 모든 질문을 건너뛰고 기본값으로 즉시 생성합니다.

```bash
npm init -y
```

---

[🔙 뒤로 가기](../index.md)
