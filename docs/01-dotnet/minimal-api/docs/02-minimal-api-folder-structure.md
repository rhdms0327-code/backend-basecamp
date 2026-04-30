---
layout: post
title: "🎯 현대적 Minimal API 표준 폴더 구조"
date: 2026-04-30
categories: [.NET]
tags: ['Minimal API', '튜토리얼']
nav_exclude: true
---

> 현대적이고 확장 가능한 Minimal API 표준 폴더 구조 가이드.

비주얼 스튜디오에서 아래와 같이 폴더를 구성해 보세요. 이 구조는 나중에 서비스를 쪼개거나 MSA로 완전히 전환할 때도 그대로 가져갈 수 있습니다.

## 📂 폴더 구조 및 역할

- **Program.cs**: 프로젝트의 시작점. 여기서는 설정(Configuration)과 조립(Assembly)만 담당합니다.
- **Endpoints/**: 핵심. Program.cs에 몰려있던 API 경로들을 기능별로 나누어 관리하는 곳입니다. (예: `UserEndpoints.cs`, `AdminEndpoints.cs`)
- **Models/**:
    - **Entities/**: DB 테이블과 1:1 매칭되는 클래스.
    - **DTOs/**: 프론트엔드와 주고받는 데이터 가공용 클래스.
- **Services/**: 비즈니스 로직(계산, 유효성 검사 등)이 담기는 곳입니다.
- **Data/**: Dapper 연결이나 EF Core의 DbContext가 위치합니다.
- **Extensions/**: 의존성 주입(DI) 설정 등을 깔끔하게 모아두는 곳입니다.

---

[🔙 뒤로 가기](../index.md)
