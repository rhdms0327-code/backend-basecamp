---
layout: post
title: "⚙️ 개발 환경 설정: Node.js, npm, npx, TypeScript"
date: 2026-03-24
categories: [React]
tags: [Node.js, npm, npx, TypeScript, 개발환경]
nav_exclude: true
---

> 리액트 개발을 시작하기 위한 런타임 환경과 패키지 관리 도구의 역할 및 차이를 정리.
> npm vs npx의 결정적 차이(설치 vs 일회성 실행)를 이해하는 것이 핵심이다.

---

## Node.js와 npm의 관계

| 도구 | 역할 |
| :--- | :--- |
| **Node.js** (node) | 자바스크립트를 브라우저 외부(서버, 로컬)에서 실행하는 런타임 환경 |
| **npm** (Node Package Manager) | Node.js 설치 시 자동 동봉되는 패키지 관리 도구 |

---

## 환경 확인 및 버전 체크

```bash
node -v    # Node.js 버전 확인 (Next.js 권장: v18.17.0 이상)
npm -v     # npm 버전 확인
```

> [!TIP]
> 버전 숫자가 출력되지 않고 '명령어를 찾을 수 없음'이 뜬다면 공식 홈페이지에서 설치 필요

---

## npm vs npx: 결정적 차이

| 구분 | npm | npx |
| :--- | :--- | :--- |
| 방식 | 패키지를 컴퓨터/프로젝트에 **저장(Install)** | 최신 버전을 **즉석에서 실행(Execute)** 후 삭제 |
| 버전 관리 | 시간이 지나면 구형(Outdated)이 됨 | 항상 최신 버전 보장 |
| 디스크 | 영구 저장 | 임시 파일 삭제 |
| 용도 | 매일 수십 번 쓰는 도구 | 가끔 쓰는 스캐폴딩 도구 (CRA, CNA 등) |

```bash
# npx 활용 예 - 항상 최신 Next.js 프로젝트 생성
npx create-next-app@latest my-app
```

---

## TypeScript

TypeScript는 자바스크립트에 타입 기능을 얹은 언어로, 브라우저는 순수 JS만 이해하므로 컴파일러가 필요하다.

- **번역기(tsc)**: TypeScript 코드 → 일반 자바스크립트로 변환
- **설치**: `npm install typescript` (`typescript` 패키지 안에 번역기 포함)

---

## 독립 실행 프로그램 (Scaffolding 도구)

- **CRA** (create-react-app) / **CNA** (create-next-app): 프로젝트 전체 구조와 초기 설정을 자동 생성
- **작동 원리**: 패키지 내부 `bin` 필드에 실행 파일 경로가 지정되어 터미널 명령어처럼 동작

> [!NOTE]
> 이런 스캐폴딩 도구들은 프로젝트의 '부품'이 아니라, 프로젝트를 만들기 위한 '공구' 역할

---

[🔙 뒤로 가기](../index.md)
