---
layout: post
title: "🚀 프로젝트 개요: Next.js + Golang 풀스택 웹 서비스"
date: 2026-03-24
categories: [React]
tags: [Next.js, Golang, Zustand, JWT, BFF패턴, SSR]
nav_exclude: true
---

> React의 컴포넌트 기반 UI와 Next.js SSR, Golang 고성능 API를 결합한 풀스택 아키텍처 개요.
> BFF 패턴 + HttpOnly Cookie 기반 보안 인증 + Nginx Reverse Proxy 설정을 핵심으로 한다.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js (App Router)
- **Library**: React.js
- **State Management**: Zustand (가볍고 직관적인 전역 상태 관리)
- **Styling**: Tailwind CSS / CSS Modules

### Backend & Infra
- **Language**: Golang (고성능 API 서버)
- **Authentication**: JWT (HttpOnly Cookie 방식의 보안 인증)
- **Web Server**: Nginx (Reverse Proxy 및 정적 파일 서빙)
- **OS**: Linux (Ubuntu)

---

## 📐 아키텍처: BFF 패턴

프로젝트의 전체적인 데이터 흐름은 **BFF(Backend-for-Frontend)** 패턴을 따릅니다.

| 계층 | 역할 |
| :--- | :--- |
| **Client (Browser)** | 보안을 위해 JWT에 직접 접근하지 않고 쿠키를 사용 |
| **Next.js Server** | 중간 계층으로 백엔드 API와 통신하며 SSR로 초기 로딩 최적화 |
| **Golang API Server** | 비즈니스 로직 처리 및 고성능 데이터 처리 |
| **Nginx** | 외부 요청을 Next.js 또는 정적 자원으로 분배하는 게이트웨이 |

---

## 🔑 핵심 구현 포인트

### 1. Zustand를 활용한 필터링 시스템
- 각 페이지마다 독립적인 검색 필터를 관리
- 페이지 이동 시 필터 상태 유지/초기화 로직 구현
- URL Query String과 상태를 동기화하여 **공유 가능한 링크** 지원

### 2. 보안이 강화된 JWT 인증
- 로컬 스토리지 대신 **HttpOnly Cookie**에 JWT를 저장 → XSS 공격 원천 차단
- Next.js의 Middleware를 활용하여 인증되지 않은 사용자의 접근을 서버 단에서 제어

### 3. Nginx Reverse Proxy 설정
- 서버 한 대에서 여러 서비스를 효율적으로 운영
- `proxy_pass`를 통해 외부 포트(80/443)와 내부 포트(3000 등)를 안전하게 연결

---

[🔙 뒤로 가기](../index.md)
