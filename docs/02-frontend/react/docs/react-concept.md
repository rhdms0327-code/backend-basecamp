---
layout: post
title: "🧠 React 핵심 개념: DOM, Virtual DOM, SPA"
date: 2026-03-24
categories: [React]
tags: [Virtual DOM, SPA, CSR, 렌더링원리]
nav_exclude: true
---

> 리액트는 브라우저 안에서 실행되며 가상 DOM을 통해 UI를 효율적으로 업데이트한다.
> 서버사이드 템플릿 엔진과 클라이언트사이드 렌더링의 차이를 이해하는 것이 핵심이다.

---

## 📍 리액트는 어디서 실행되나?

- **장소**: 브라우저 안에서 실행
- **역할**: 브라우저 메모리 위에서 가상 DOM을 만들고 화면을 그림
- **특징**: 서버가 JS 파일을 보내주면 브라우저가 받아서 실행하는 구조

---

## 📊 DOM vs Virtual DOM

### 1. DOM (Document Object Model)
- **정의**: 브라우저가 HTML 코드를 읽은 뒤 메모리에 만들어 놓은 **실제 화면 구성 요소들의 객체 트리**
- **오버헤드**: 노드 변경 시 브라우저는 Reflow(레이아웃 계산)와 Repaint(화면 그리기)를 수행
- **문제**: 복잡한 SPA에서 잦은 DOM 조작은 성능 저하의 결정적 원인

### 2. Virtual DOM (가상 DOM)
- **정의**: 실제 DOM을 가볍게 복제한 In-memory 자바스크립트 객체
- **구조**: `type`, `props`, `children` 등의 필드를 가진 JS 객체 트리
- **장점**: 브라우저 API를 호출하지 않으므로 생성 및 수정 비용이 매우 저렴

---

## 🔑 핵심 용어

### JSX (JavaScript XML)
- 자바스크립트 안에서 HTML 코드를 쓰는 방식
- **Babel**이라는 번역기가 순수 자바스크립트로 변환

### SPA (Single Page Application)
- 하나의 HTML 페이지 위에서 필요한 부분만 교체하며 구동
- 서버로부터 데이터(JSON)만 받아 브라우저가 직접 화면을 그리는 **CSR** 방식
- 페이지 이동 시 새로고침(깜빡임)이 없음

---

## ⚙️ 렌더링 방식 비교

| 구분 | Server-side Template | Client-side (SPA) |
| :--- | :--- | :--- |
| 컴파일 시점 | 서버 런타임 | 브라우저 JS 엔진 |
| 전송 객체 | HTML 문서 전체 | 초기 JS 번들 + 이후 JSON만 |
| 상태 변경 | 전체 페이지 리로드 | 필요한 부분만 비동기 갱신 |
| 성능 | 네트워크 오버헤드 큼 | 전환 성능 극대화 |

---

[🔙 뒤로 가기](../index.md)
