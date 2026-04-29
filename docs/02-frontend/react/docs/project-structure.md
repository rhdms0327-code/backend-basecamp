---
layout: post
title: "📁 Next.js 프로젝트 전체 구조"
date: 2026-03-24
categories: [React]
tags: [Next.js, 프로젝트구조, App Router, TypeScript]
nav_exclude: true
---

> Next.js(App Router) 프로젝트의 폴더 및 파일 구조와 각 역할을 정리.
> `src/app/` 폴더가 라우팅의 핵심이며, `package.json`이 프로젝트의 설계도 역할을 한다.

---

## 📁 프로젝트 전체 구조

```
my-app/
├── .next/           # 빌드 결과물 (자동 생성)
├── node_modules/    # 설치된 패키지 코드 (용량 괴물)
├── public/          # 이미지, 폰트 등 정적 파일
├── src/
│   └── app/         # 라우팅 및 페이지 컴포넌트 (App Router)
├── .eslintrc.json
├── next.config.mjs
├── package.json     # 프로젝트 정보 및 패키지 명세서
├── tailwind.config.ts
└── tsconfig.json    # TypeScript 컴파일 설정
```

---

## 📍 핵심 파일 & 폴더

### 1. `src/app/` (App Router)
폴더 구조가 곧 웹사이트의 URL이 됩니다.

| 파일 | 역할 |
| :--- | :--- |
| `layout.tsx` | 모든 페이지 공통 틀 (헤더, 푸터) |
| `page.tsx` | 실제 화면 내용 |
| `globals.css` | 전체 스타일 시트 |

### 2. `package.json`
- `scripts`: `npm run dev` 등 명령어 정의
- `dependencies`: 필요한 라이브러리 목록

### 3. `tsconfig.json`
- 컴파일 규칙, 파일 범위, 타입 검사 수준 결정

---

## ⚙️ 워크플로우

1. `npm run dev` 로 개발 서버 실행
2. `src/app/page.tsx` 수정하며 실시간 확인
3. 새 페이지는 `src/app/about/page.tsx` 형태로 추가

---

[🔙 뒤로 가기](../index.md)
